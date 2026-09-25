import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CIK = "0001326801";
const CIK_PLAIN = "1326801";
const USER_AGENT = "Hobite Research contact@hobite.vercel.app";
const TARGET_FORMS = new Set(["S-1", "S-1/A", "10-K", "10-K/A", "10-Q", "10-Q/A"]);
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(projectRoot, "app", "research", "meta-complete-fundamental-analysis");

async function fetchJson(url) {
  const response = await fetch(url, { headers: { Accept: "application/json", "User-Agent": USER_AGENT } });
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  return response.json();
}

function submissionRows(table) {
  return table.accessionNumber.map((accessionNumber, index) => ({ accessionNumber, form: table.form[index], filingDate: table.filingDate[index], reportDate: table.reportDate[index], primaryDocument: table.primaryDocument[index] }));
}

function cleanFiling(row) {
  return { ...row, url: `https://www.sec.gov/Archives/edgar/data/${CIK_PLAIN}/${row.accessionNumber.replaceAll("-", "")}/${row.primaryDocument}` };
}

function facts(companyFacts, tags, unit) {
  return tags.flatMap((tag) => companyFacts.facts?.["us-gaap"]?.[tag]?.units?.[unit] || []);
}

const days = (row) => row.start ? (new Date(row.end).getTime() - new Date(row.start).getTime()) / 86_400_000 : 0;
const latest = (rows) => [...rows].sort((a, b) => String(b.filed).localeCompare(String(a.filed)))[0] ?? null;

function annualFlow(companyFacts, tags, unit, fiscalYear, accessionNumber, reportDate) {
  return latest(facts(companyFacts, tags, unit).filter((row) => row.form === "10-K" && row.fy === fiscalYear && row.fp === "FY" && row.accn === accessionNumber && row.end === reportDate && days(row) > 300))?.val ?? null;
}

function instant(companyFacts, tags, unit, accessionNumber, reportDate) {
  return latest(facts(companyFacts, tags, unit).filter((row) => row.accn === accessionNumber && row.end === reportDate && !row.start))?.val ?? null;
}

function quarterFlow(companyFacts, tags, unit, fiscalYear, fiscalQuarter, accessionNumber, reportDate) {
  return latest(facts(companyFacts, tags, unit).filter((row) => row.form === "10-Q" && row.fy === fiscalYear && row.fp === `Q${fiscalQuarter}` && row.accn === accessionNumber && row.end === reportDate && days(row) >= 70 && days(row) <= 110))?.val ?? null;
}

function ytdFlow(companyFacts, tags, unit, fiscalYear, fiscalQuarter, accessionNumber, reportDate) {
  return latest(facts(companyFacts, tags, unit).filter((row) => row.form === "10-Q" && row.fy === fiscalYear && row.fp === `Q${fiscalQuarter}` && row.accn === accessionNumber && row.end === reportDate && days(row) >= fiscalQuarter * 70))?.val ?? null;
}

const percent = (numerator, denominator) => numerator == null || denominator == null || denominator === 0 ? null : Number((numerator / denominator * 100).toFixed(1));

const tags = {
  revenue: ["RevenueFromContractWithCustomerExcludingAssessedTax", "Revenues"],
  grossProfit: ["GrossProfit"], operatingIncome: ["OperatingIncomeLoss"], netIncome: ["NetIncomeLoss"], dilutedEps: ["EarningsPerShareDiluted"],
  operatingCashFlow: ["NetCashProvidedByUsedInOperatingActivities"], capex: ["PaymentsToAcquireProductiveAssets", "PaymentsToAcquirePropertyPlantAndEquipment"],
  assets: ["Assets"], liabilities: ["Liabilities"], equity: ["StockholdersEquity"],
  cash: ["CashAndCashEquivalentsAtCarryingValue"], shortTermInvestments: ["MarketableSecuritiesCurrent", "MarketableSecurities", "ShortTermInvestments"],
  debtCurrent: ["DebtCurrent", "LongTermDebtCurrent", "LongTermDebtAndCapitalLeaseObligationsCurrent"], debtNoncurrent: ["LongTermDebtNoncurrent", "LongTermDebt", "FinanceLeaseLiabilityNoncurrent"],
  dilutedShares: ["WeightedAverageNumberOfDilutedSharesOutstanding"],
};

function buildAnnual(companyFacts, annualFilings) {
  return annualFilings.filter((filing) => filing.form === "10-K" && Number(filing.reportDate.slice(0, 4)) >= 2017).slice(-10).map((filing) => {
    const fiscalYear = Number(filing.reportDate.slice(0, 4));
    const args = [fiscalYear, filing.accessionNumber, filing.reportDate];
    const revenue = annualFlow(companyFacts, tags.revenue, "USD", ...args);
    const grossProfit = annualFlow(companyFacts, tags.grossProfit, "USD", ...args);
    const operatingIncome = annualFlow(companyFacts, tags.operatingIncome, "USD", ...args);
    const netIncome = annualFlow(companyFacts, tags.netIncome, "USD", ...args);
    const operatingCashFlow = annualFlow(companyFacts, tags.operatingCashFlow, "USD", ...args);
    const capitalExpenditures = annualFlow(companyFacts, tags.capex, "USD", ...args);
    const debtCurrent = instant(companyFacts, tags.debtCurrent, "USD", filing.accessionNumber, filing.reportDate) ?? 0;
    const debtNoncurrent = instant(companyFacts, tags.debtNoncurrent, "USD", filing.accessionNumber, filing.reportDate);
    const freeCashFlow = operatingCashFlow != null && capitalExpenditures != null ? operatingCashFlow - capitalExpenditures : null;
    return { fiscalYear, reportDate: filing.reportDate, filingDate: filing.filingDate, filingUrl: filing.url, revenue, grossProfit, operatingIncome, netIncome,
      dilutedEps: annualFlow(companyFacts, tags.dilutedEps, "USD/shares", ...args), operatingCashFlow, capitalExpenditures, freeCashFlow,
      cash: instant(companyFacts, tags.cash, "USD", filing.accessionNumber, filing.reportDate), shortTermInvestments: instant(companyFacts, tags.shortTermInvestments, "USD", filing.accessionNumber, filing.reportDate),
      totalAssets: instant(companyFacts, tags.assets, "USD", filing.accessionNumber, filing.reportDate), totalLiabilities: instant(companyFacts, tags.liabilities, "USD", filing.accessionNumber, filing.reportDate),
      totalDebt: debtNoncurrent == null ? null : debtCurrent + debtNoncurrent, shareholdersEquity: instant(companyFacts, tags.equity, "USD", filing.accessionNumber, filing.reportDate),
      dilutedShares: annualFlow(companyFacts, tags.dilutedShares, "shares", ...args), grossMargin: percent(grossProfit, revenue), operatingMargin: percent(operatingIncome, revenue), netMargin: percent(netIncome, revenue), freeCashFlowMargin: percent(freeCashFlow, revenue),
      source: "SEC XBRL company facts and Meta Form 10-K" };
  });
}

function buildQuarterly(companyFacts, annualRows, quarterlyFilings) {
  const selected = quarterlyFilings.filter((filing) => filing.form === "10-Q").slice(-8);
  const rows = selected.map((filing) => {
    const periodFact = facts(companyFacts, tags.revenue, "USD").find((row) => row.accn === filing.accessionNumber && row.form === "10-Q" && /^Q[123]$/.test(row.fp));
    const fiscalYear = periodFact?.fy;
    const fp = periodFact?.fp;
    const fiscalQuarter = Number(fp?.slice(1));
    const args = [fiscalYear, fiscalQuarter, filing.accessionNumber, filing.reportDate];
    return { filing, fiscalYear, fiscalQuarter, revenue: quarterFlow(companyFacts, tags.revenue, "USD", ...args), grossProfit: quarterFlow(companyFacts, tags.grossProfit, "USD", ...args), operatingIncome: quarterFlow(companyFacts, tags.operatingIncome, "USD", ...args), netIncome: quarterFlow(companyFacts, tags.netIncome, "USD", ...args), dilutedEps: quarterFlow(companyFacts, tags.dilutedEps, "USD/shares", ...args), dilutedShares: quarterFlow(companyFacts, tags.dilutedShares, "shares", ...args), operatingCashFlowYtd: ytdFlow(companyFacts, tags.operatingCashFlow, "USD", ...args), capexYtd: ytdFlow(companyFacts, tags.capex, "USD", ...args) };
  }).filter((row) => Number.isFinite(row.fiscalQuarter));
  const result = rows.map((row) => {
    const prior = rows.find((candidate) => candidate.fiscalYear === row.fiscalYear && candidate.fiscalQuarter === row.fiscalQuarter - 1);
    const operatingCashFlow = row.fiscalQuarter === 1 ? row.operatingCashFlowYtd : row.operatingCashFlowYtd != null && prior?.operatingCashFlowYtd != null ? row.operatingCashFlowYtd - prior.operatingCashFlowYtd : null;
    const capitalExpenditures = row.fiscalQuarter === 1 ? row.capexYtd : row.capexYtd != null && prior?.capexYtd != null ? row.capexYtd - prior.capexYtd : null;
    const freeCashFlow = operatingCashFlow != null && capitalExpenditures != null ? operatingCashFlow - capitalExpenditures : null;
    return { period: `FY${row.fiscalYear} Q${row.fiscalQuarter}`, fiscalYear: row.fiscalYear, fiscalQuarter: row.fiscalQuarter, reportDate: row.filing.reportDate, filingUrl: row.filing.url, revenue: row.revenue, grossProfit: row.grossProfit, operatingIncome: row.operatingIncome, netIncome: row.netIncome, dilutedEps: row.dilutedEps, dilutedShares: row.dilutedShares, operatingCashFlow, capitalExpenditures, freeCashFlow, grossMargin: percent(row.grossProfit, row.revenue), operatingMargin: percent(row.operatingIncome, row.revenue), netMargin: percent(row.netIncome, row.revenue), freeCashFlowMargin: percent(freeCashFlow, row.revenue), source: "SEC XBRL company facts and Meta Form 10-Q" };
  });
  for (const annual of annualRows.filter((row) => row.fiscalYear >= 2024)) {
    const firstThree = result.filter((row) => row.fiscalYear === annual.fiscalYear);
    if (firstThree.length !== 3) continue;
    const subtract = (value, key) => value == null || firstThree.some((row) => row[key] == null) ? null : value - firstThree.reduce((sum, row) => sum + row[key], 0);
    const revenue = subtract(annual.revenue, "revenue"); const grossProfit = subtract(annual.grossProfit, "grossProfit"); const operatingIncome = subtract(annual.operatingIncome, "operatingIncome"); const netIncome = subtract(annual.netIncome, "netIncome"); const operatingCashFlow = subtract(annual.operatingCashFlow, "operatingCashFlow"); const capitalExpenditures = subtract(annual.capitalExpenditures, "capitalExpenditures"); const freeCashFlow = operatingCashFlow != null && capitalExpenditures != null ? operatingCashFlow - capitalExpenditures : null;
    result.push({ period: `FY${annual.fiscalYear} Q4`, fiscalYear: annual.fiscalYear, fiscalQuarter: 4, reportDate: annual.reportDate, filingUrl: annual.filingUrl, revenue, grossProfit, operatingIncome, netIncome, dilutedEps: null, dilutedShares: null, operatingCashFlow, capitalExpenditures, freeCashFlow, grossMargin: percent(grossProfit, revenue), operatingMargin: percent(operatingIncome, revenue), netMargin: percent(netIncome, revenue), freeCashFlowMargin: percent(freeCashFlow, revenue), source: "Derived from Meta Form 10-K less Q1-Q3 SEC XBRL facts" });
  }
  return result.sort((a,b) => a.fiscalYear-b.fiscalYear || a.fiscalQuarter-b.fiscalQuarter).slice(-10);
}

const filingsSource = (registration, annual, quarterly) => `export type MetaFiling = { accessionNumber: string; form: string; filingDate: string; reportDate: string; primaryDocument: string; url: string };
export const META_FILING_SOURCE_NOTE = "Generated from SEC submissions for META Corporation, CIK ${CIK}.";
export const META_REGISTRATION_FILINGS: MetaFiling[] = ${JSON.stringify(registration,null,2)};
export const META_ANNUAL_FILINGS: MetaFiling[] = ${JSON.stringify(annual,null,2)};
export const META_QUARTERLY_FILINGS: MetaFiling[] = ${JSON.stringify(quarterly,null,2)};
export const META_LATEST_ANNUAL_FILING = META_ANNUAL_FILINGS.filter((item) => item.form === "10-K").at(-1)!;
export const META_LATEST_QUARTERLY_FILING = META_QUARTERLY_FILINGS.filter((item) => item.form === "10-Q").at(-1)!;\n`;

const annualSource = (rows) => `export type MetaAnnualFinancial = { fiscalYear: number; reportDate: string; filingDate: string; filingUrl: string; revenue: number | null; grossProfit: number | null; operatingIncome: number | null; netIncome: number | null; dilutedEps: number | null; operatingCashFlow: number | null; capitalExpenditures: number | null; freeCashFlow: number | null; cash: number | null; shortTermInvestments: number | null; totalAssets: number | null; totalLiabilities: number | null; totalDebt: number | null; shareholdersEquity: number | null; dilutedShares: number | null; grossMargin: number | null; operatingMargin: number | null; netMargin: number | null; freeCashFlowMargin: number | null; source: string };
export const META_ANNUAL_FINANCIALS_SOURCE_NOTE = "FY2017-FY2025 are generated from SEC XBRL company facts and Meta Forms 10-K. Data are USD. Meta did not have a stock split in this historical series.";
export const META_ANNUAL_FINANCIALS: MetaAnnualFinancial[] = ${JSON.stringify(rows,null,2)};
export const META_LATEST_ANNUAL_FINANCIAL = META_ANNUAL_FINANCIALS.at(-1)!;\n`;

const quarterlySource = (rows) => `export type MetaQuarterlyFinancial = { period: string; fiscalYear: number; fiscalQuarter: number; reportDate: string; filingUrl: string; revenue: number | null; grossProfit: number | null; operatingIncome: number | null; netIncome: number | null; dilutedEps: number | null; dilutedShares: number | null; operatingCashFlow: number | null; capitalExpenditures: number | null; freeCashFlow: number | null; grossMargin: number | null; operatingMargin: number | null; netMargin: number | null; freeCashFlowMargin: number | null; source: string };
export const META_QUARTERLY_FINANCIALS_SOURCE_NOTE = "Recent quarters are generated from Meta SEC XBRL facts. Q4 flow values are derived from the Form 10-K less Q1-Q3.";
export const META_QUARTERLY_FINANCIALS = ${JSON.stringify(rows,null,2)} satisfies MetaQuarterlyFinancial[];
export const META_LATEST_SEC_QUARTER = META_QUARTERLY_FINANCIALS.at(-1)!;\n`;

function valuationSource(annualRows, marketData, latestQuarter, latestBalance) {
  const result = marketData.chart.result[0]; const timestamps=result.timestamp||[]; const adjusted=result.indicators.adjclose?.[0]?.adjclose||result.indicators.quote[0].close;
  const priceOnOrBefore=(date)=>{const target=new Date(`${date}T23:59:59Z`).getTime()/1000;let index=-1;for(let i=0;i<timestamps.length;i+=1)if(timestamps[i]<=target&&adjusted[i]!=null)index=i;return index<0?null:{date:new Date(timestamps[index]*1000).toISOString().slice(0,10),price:adjusted[index]};};
  const rows=annualRows.filter((row)=>row.fiscalYear>=2018&&row.dilutedShares&&row.revenue&&row.freeCashFlow).map((row)=>{const quote=priceOnOrBefore(row.reportDate);const shares=row.dilutedShares;const marketCapitalization=quote?quote.price*shares:null;const liquidity=(row.cash??0)+(row.shortTermInvestments??0);const enterpriseValue=marketCapitalization!=null&&row.totalDebt!=null?marketCapitalization+row.totalDebt-liquidity:null;return{fiscalYear:row.fiscalYear,priceDate:quote?.date??"",adjustedClose:quote?.price??null,splitAdjustedDilutedShares:shares,marketCapitalization,enterpriseValue,priceToSales:marketCapitalization==null?null:marketCapitalization/row.revenue,enterpriseValueToSales:enterpriseValue==null?null:enterpriseValue/row.revenue,priceToEarnings:marketCapitalization==null||!row.netIncome||row.netIncome<=0?null:marketCapitalization/row.netIncome,freeCashFlowYield:marketCapitalization==null?null:row.freeCashFlow/marketCapitalization*100,source:"Yahoo Finance adjusted close and Meta SEC filings"};});
  const currentPrice=result.meta.regularMarketPrice??adjusted.at(-1);const currentShares=latestQuarter.dilutedShares??2_566_000_000;const currentMarketCap=currentPrice*currentShares;const liquidity=(latestBalance.cash??0)+(latestBalance.shortTermInvestments??0);const enterpriseValue=currentMarketCap+(latestBalance.totalDebt??0)-liquidity;
  rows.push({fiscalYear:2026,priceDate:"2026-09-24",adjustedClose:currentPrice,splitAdjustedDilutedShares:currentShares,marketCapitalization:currentMarketCap,enterpriseValue,priceToSales:currentMarketCap/250_000_000_000,enterpriseValueToSales:enterpriseValue/250_000_000_000,priceToEarnings:currentMarketCap/95_000_000_000,freeCashFlowYield:20_000_000_000/currentMarketCap*100,source:"Yahoo Finance September 24, 2026 market snapshot, Meta Q2 filing and Hobite FY2026 estimate"});
  return `export type MetaValuationHistory = { fiscalYear: number; priceDate: string; adjustedClose: number | null; splitAdjustedDilutedShares: number; marketCapitalization: number | null; enterpriseValue: number | null; priceToSales: number | null; enterpriseValueToSales: number | null; priceToEarnings: number | null; freeCashFlowYield: number | null; source: string };
export const META_VALUATION_HISTORY_NOTE = "Historical rows combine Yahoo Finance adjusted closes nearest Meta's year-end with SEC financials and diluted shares. FY2026 uses the September 24, 2026 market snapshot and Hobite full-year estimates.";
export const META_VALUATION_HISTORY: MetaValuationHistory[] = ${JSON.stringify(rows,null,2)};
export const META_LATEST_VALUATION = META_VALUATION_HISTORY.at(-1)!;\n`;
}

async function main() {
  const submissions=await fetchJson(`https://data.sec.gov/submissions/CIK${CIK}.json`);const allRows=submissionRows(submissions.filings.recent);for(const file of submissions.filings.files||[])allRows.push(...submissionRows(await fetchJson(`https://data.sec.gov/submissions/${file.name}`)));
  const selected=allRows.filter((row)=>TARGET_FORMS.has(row.form)).sort((a,b)=>a.filingDate.localeCompare(b.filingDate));const registration=selected.filter((row)=>["S-1","S-1/A"].includes(row.form)).map(cleanFiling);const annual=selected.filter((row)=>["10-K","10-K/A"].includes(row.form)&&Number(row.reportDate.slice(0,4))>=2017).map(cleanFiling);const quarterly=selected.filter((row)=>["10-Q","10-Q/A"].includes(row.form)&&Number(row.reportDate.slice(0,4))>=2023).map(cleanFiling);
  const companyFacts=await fetchJson(`https://data.sec.gov/api/xbrl/companyfacts/CIK${CIK}.json`);const marketData=await fetchJson("https://query1.finance.yahoo.com/v8/finance/chart/META?period1=1514764800&period2=1790294400&interval=1d&events=history&includeAdjustedClose=true");const annualRows=buildAnnual(companyFacts,annual);const quarterlyRows=buildQuarterly(companyFacts,annualRows,quarterly);const latestFiling=quarterly.filter((row)=>row.form==="10-Q").at(-1);const latestQuarter=quarterlyRows.at(-1);const latestBalance={cash:instant(companyFacts,tags.cash,"USD",latestFiling.accessionNumber,latestFiling.reportDate),shortTermInvestments:instant(companyFacts,tags.shortTermInvestments,"USD",latestFiling.accessionNumber,latestFiling.reportDate),totalDebt:(instant(companyFacts,tags.debtCurrent,"USD",latestFiling.accessionNumber,latestFiling.reportDate)??0)+(instant(companyFacts,tags.debtNoncurrent,"USD",latestFiling.accessionNumber,latestFiling.reportDate)??0)};
  await mkdir(outputDir,{recursive:true});await writeFile(path.join(outputDir,"filings.ts"),filingsSource(registration,annual.slice(-10),quarterly.slice(-12)));await writeFile(path.join(outputDir,"annualFinancials.ts"),annualSource(annualRows));await writeFile(path.join(outputDir,"quarterlyFinancials.ts"),quarterlySource(quarterlyRows));await writeFile(path.join(outputDir,"valuationHistory.ts"),valuationSource(annualRows,marketData,latestQuarter,latestBalance));console.log(`Updated Meta SEC data: ${annualRows.length} annual rows and ${quarterlyRows.length} quarterly rows.`);
}

main().catch((error)=>{console.error(error);process.exitCode=1;});
