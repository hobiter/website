import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const asOf = "2026-10-04";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "app/research/vistra-complete-fundamental-analysis");
const headers = { "User-Agent": "Hobite Research contact@hobite.vercel.app" };
async function json(url) {
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`${response.status}: ${url}`);
  return response.json();
}
const submissionRows = (table) => table.accessionNumber.map((accessionNumber, i) => ({
  accessionNumber, form: table.form[i], filed: table.filingDate[i], end: table.reportDate[i],
  url: `https://www.sec.gov/Archives/edgar/data/1692819/${accessionNumber.replaceAll("-", "")}/${table.primaryDocument[i]}`,
}));
const tags = {
  revenue: ["Revenues", "RevenueFromContractWithCustomerExcludingAssessedTax"],
  grossProfit: ["GrossProfit"], operatingIncome: ["OperatingIncomeLoss"],
  netIncome: ["ProfitLoss", "NetIncomeLoss"], commonIncome: ["NetIncomeLossAvailableToCommonStockholdersBasic"],
  dilutedEps: ["EarningsPerShareDiluted"], dilutedShares: ["WeightedAverageNumberOfDilutedSharesOutstanding"],
  operatingCashFlow: ["NetCashProvidedByUsedInOperatingActivities"],
  capex: ["PaymentsToAcquirePropertyPlantAndEquipment"],
  cash: ["CashAndCashEquivalentsAtCarryingValue"], assets: ["Assets"], liabilities: ["Liabilities"],
  equity: ["StockholdersEquity"], debt: ["LongTermDebtAndCapitalLeaseObligationsIncludingCurrentMaturities", "LongTermDebt"],
  preferredDividends: ["PreferredStockDividendsIncomeStatementImpact"],
};
const duration = (row) => row.start ? (Date.parse(row.end) - Date.parse(row.start)) / 86400000 : 0;
function fact(company, key, end, minDays = 0, maxDays = 0, accession) {
  for (const tag of tags[key]) {
    const unit = key === "dilutedEps" ? "USD/shares" : key === "dilutedShares" ? "shares" : "USD";
    const rows = (company.facts["us-gaap"][tag]?.units[unit] || []).filter(row =>
      row.filed <= asOf && ["10-K", "10-Q"].includes(row.form) && row.end === end &&
      (accession == null || row.accn === accession) &&
      (minDays === 0 ? !row.start : duration(row) >= minDays && duration(row) <= maxDays));
    rows.sort((a, b) => b.filed.localeCompare(a.filed));
    if (rows.length) return rows[0].val;
  }
  return null;
}
const pct = (a, b) => a != null && b ? a / b * 100 : null;
function derived(row) {
  row.freeCashFlow = row.operatingCashFlow != null && row.capex != null ? row.operatingCashFlow - row.capex : null;
  row.operatingMargin = pct(row.operatingIncome, row.revenue);
  row.netMargin = pct(row.netIncome, row.revenue);
  row.fcfMargin = pct(row.freeCashFlow, row.revenue);
  row.grossMargin = pct(row.grossProfit, row.revenue);
  row.roe = pct(row.commonIncome, row.equity);
  return row;
}
async function main() {
  const submissions = await json("https://data.sec.gov/submissions/CIK0001692819.json");
  const rows = submissionRows(submissions.filings.recent);
  for (const file of submissions.filings.files || []) rows.push(...submissionRows(await json(`https://data.sec.gov/submissions/${file.name}`)));
  const filings = rows.filter(row => row.filed <= asOf && ["10-K", "10-K/A", "10-Q", "10-Q/A", "S-1", "S-1/A"].includes(row.form)).sort((a,b) => a.filed.localeCompare(b.filed));
  const company = await json("https://data.sec.gov/api/xbrl/companyfacts/CIK0001692819.json");
  const annualFilings = filings.filter(row => row.form === "10-K" && row.end >= "2017-12-31");
  const flowKeys = ["revenue", "grossProfit", "operatingIncome", "netIncome", "commonIncome", "dilutedEps", "dilutedShares", "operatingCashFlow", "capex", "preferredDividends"];
  const instantKeys = ["cash", "assets", "liabilities", "equity", "debt"];
  const annual = annualFilings.map(filing => derived({
    year: Number(filing.end.slice(0,4)), ...filing,
    ...Object.fromEntries(flowKeys.map(key => [key, fact(company, key, filing.end, 350, 380, filing.accessionNumber)])),
    ...Object.fromEntries(instantKeys.map(key => [key, fact(company, key, filing.end, 0, 0, filing.accessionNumber)])),
  }));
  const quarterly = [];
  for (const year of annual.map(row => row.year).concat(Number(asOf.slice(0,4)))) {
    for (let q = 1; q <= 4; q++) {
      const end = `${year}-${["03-31", "06-30", "09-30", "12-31"][q-1]}`;
      const filing = filings.find(row => row.end === end && row.form === (q === 4 ? "10-K" : "10-Q"));
      if (!filing) continue;
      const result = { period: `${year} Q${q}`, year, quarter:q, ...filing };
      for (const key of flowKeys.filter(key => key !== "dilutedShares")) {
        if (q === 4) {
          const fy = annual.find(row => row.year === year)?.[key];
          const first = quarterly.filter(row => row.year === year);
          result[key] = key !== "dilutedEps" && fy != null && first.length === 3 && first.every(row => row[key] != null)
            ? fy - first.reduce((sum,row) => sum+row[key],0) : null;
        } else {
          result[key] = fact(company,key,end,75,105);
          if (result[key] == null && key !== "dilutedEps") {
            const ytd = fact(company,key,end,q*80,q*100);
            const previous = quarterly.filter(row => row.year === year);
            if (ytd != null && previous.length === q-1 && previous.every(row => row[key] != null)) result[key] = ytd-previous.reduce((sum,row)=>sum+row[key],0);
          }
        }
      }
      if (result.revenue != null) quarterly.push(derived(result));
    }
  }
  const priceUrl = `https://query1.finance.yahoo.com/v8/finance/chart/VST?period1=1483228800&period2=${Date.parse(asOf)/1000}&interval=1d`;
  const market = (await json(priceUrl)).chart.result[0];
  const quotes = market.timestamp.map((t,i) => ({ date:new Date(t*1000).toISOString().slice(0,10), close:market.indicators.quote[0].close[i] })).filter(row=>row.close != null);
  const latestPrice = quotes.at(-1);
  const history = annual.map(row => {
    const price = quotes.filter(p=>p.date.slice(0,4) === String(row.year)).at(-1);
    const equityValue = price && row.dilutedShares ? price.close * row.dilutedShares : null;
    return {year:row.year,date:price?.date ?? null,close:price?.close ?? null,equityValue,
      priceToSales:equityValue && row.revenue ? equityValue/row.revenue : null,
      priceToEarnings:equityValue && row.commonIncome > 0 ? equityValue/row.commonIncome : null,
      fcfYield:equityValue && row.freeCashFlow != null ? row.freeCashFlow/equityValue*100 : null};
  });
  await mkdir(output,{recursive:true});
  const type = "export type FinancialRow = {year:number; period?:string; quarter?:number; accessionNumber:string; form:string; filed:string; end:string; url:string; revenue:number|null; grossProfit:number|null; operatingIncome:number|null; netIncome:number|null; commonIncome:number|null; dilutedEps:number|null; operatingCashFlow:number|null; capex:number|null; preferredDividends:number|null; freeCashFlow:number|null; operatingMargin:number|null; netMargin:number|null; fcfMargin:number|null; grossMargin:number|null; roe:number|null; dilutedShares?:number|null; cash?:number|null; assets?:number|null; liabilities?:number|null; equity?:number|null; debt?:number|null;};\n";
  await writeFile(path.join(output,"annualFinancials.ts"), type+`export const VST_ANNUAL: FinancialRow[] = ${JSON.stringify(annual,null,2)};\n`);
  await writeFile(path.join(output,"quarterlyFinancials.ts"), `import type { FinancialRow } from "./annualFinancials";\nexport const VST_QUARTERLY: FinancialRow[] = ${JSON.stringify(quarterly,null,2)};\n`);
  await writeFile(path.join(output,"filings.ts"), `export const VST_FILINGS = ${JSON.stringify(filings,null,2)};\n`);
  await writeFile(path.join(output,"valuationHistory.ts"), `export const VST_PRICE_SOURCE = ${JSON.stringify(priceUrl)};\nexport const VST_LATEST_PRICE = ${JSON.stringify(latestPrice)};\nexport const VST_VALUATION_HISTORY = ${JSON.stringify(history,null,2)};\nexport const VST_VALUATION_NOTE = "Daily unadjusted closing prices, paired with contemporaneous diluted weighted-average shares. Dividend-adjusted total-return prices are not used for capitalization. Values are valuation proxies, not exchange-reported market caps. No split adjustment is applied; corporate-action records must be rechecked on future refreshes. P/E is omitted for common-shareholder losses. EV history is omitted because historical preferred, financing and minority claims require a separate reconciliation.";\n`);
  console.log(`Vistra: ${annual.length} annual rows, ${quarterly.length} quarterly rows, ${filings.length} filings; latest close ${latestPrice.date}: $${latestPrice.close.toFixed(2)}`);
}
main().catch(error=>{console.error(error);process.exitCode=1;});
