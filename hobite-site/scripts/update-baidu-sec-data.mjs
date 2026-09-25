import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CIK = "0001329099";
const CIK_PLAIN = "1329099";
const USER_AGENT = "Hobite Research contact@hobite.vercel.app";
const TARGET_FORMS = new Set(["F-1", "F-1/A", "20-F", "20-F/A", "6-K"]);
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(projectRoot, "app", "research", "baidu-complete-fundamental-analysis");

async function fetchJson(url) {
  const response = await fetch(url, { headers: { Accept: "application/json", "User-Agent": USER_AGENT } });
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  return response.json();
}

function submissionRows(table) {
  return table.accessionNumber.map((accessionNumber, index) => ({
    accessionNumber,
    form: table.form[index],
    filingDate: table.filingDate[index],
    reportDate: table.reportDate[index],
    primaryDocument: table.primaryDocument[index],
  }));
}

function cleanFiling(row) {
  return {
    ...row,
    url: `https://www.sec.gov/Archives/edgar/data/${CIK_PLAIN}/${row.accessionNumber.replaceAll("-", "")}/${row.primaryDocument}`,
  };
}

function facts(companyFacts, tags, unit) {
  return tags.flatMap((tag) => companyFacts.facts?.["us-gaap"]?.[tag]?.units?.[unit] || []);
}

const days = (row) => row.start ? (new Date(row.end).getTime() - new Date(row.start).getTime()) / 86_400_000 : 0;
const latest = (rows) => [...rows].sort((a, b) => String(b.filed).localeCompare(String(a.filed)))[0] ?? null;

function annualFlow(companyFacts, tags, unit, fiscalYear, accessionNumber, reportDate) {
  return latest(facts(companyFacts, tags, unit).filter((row) =>
    ["20-F", "20-F/A"].includes(row.form) && row.fy === fiscalYear && row.fp === "FY" &&
    row.accn === accessionNumber && row.end === reportDate && days(row) > 300,
  ))?.val ?? null;
}

function instant(companyFacts, tags, unit, accessionNumber, reportDate) {
  return latest(facts(companyFacts, tags, unit).filter((row) =>
    row.accn === accessionNumber && row.end === reportDate && !row.start,
  ))?.val ?? null;
}

const percent = (numerator, denominator) =>
  numerator == null || denominator == null || denominator === 0 ? null : Number((numerator / denominator * 100).toFixed(1));

const tags = {
  revenue: ["RevenueFromContractWithCustomerExcludingAssessedTax", "Revenues"],
  costOfRevenue: ["CostOfRevenue"],
  grossProfit: ["GrossProfit"],
  operatingIncome: ["OperatingIncomeLoss"],
  netIncome: ["NetIncomeLoss", "NetIncomeLossAvailableToCommonStockholdersBasic"],
  dilutedEps: ["EarningsPerShareDiluted"],
  operatingCashFlow: ["NetCashProvidedByUsedInOperatingActivities"],
  capex: ["PaymentsToAcquirePropertyPlantAndEquipment", "PaymentsToAcquireProductiveAssets"],
  cash: ["CashAndCashEquivalentsAtCarryingValue"],
  shortTermInvestments: ["ShortTermInvestments", "MarketableSecuritiesCurrent"],
  assets: ["Assets"],
  liabilities: ["Liabilities"],
  equity: ["StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest", "StockholdersEquity"],
  debtCurrent: ["LongTermDebtCurrent", "DebtCurrent"],
  debtNoncurrent: ["LongTermDebtNoncurrent", "LongTermDebt"],
  dilutedShares: ["WeightedAverageNumberOfDilutedSharesOutstanding"],
};

function buildAnnual(companyFacts, annualFilings) {
  return annualFilings
    .filter((filing) => filing.form === "20-F" && Number(filing.reportDate.slice(0, 4)) >= 2018)
    .slice(-8)
    .map((filing) => {
      const fiscalYear = Number(filing.reportDate.slice(0, 4));
      const args = [fiscalYear, filing.accessionNumber, filing.reportDate];
      const revenue = annualFlow(companyFacts, tags.revenue, "CNY", ...args);
      const costOfRevenue = annualFlow(companyFacts, tags.costOfRevenue, "CNY", ...args);
      const reportedGrossProfit = annualFlow(companyFacts, tags.grossProfit, "CNY", ...args);
      const grossProfit = reportedGrossProfit ?? (revenue != null && costOfRevenue != null ? revenue - costOfRevenue : null);
      const operatingIncome = annualFlow(companyFacts, tags.operatingIncome, "CNY", ...args);
      const netIncome = annualFlow(companyFacts, tags.netIncome, "CNY", ...args);
      const operatingCashFlow = annualFlow(companyFacts, tags.operatingCashFlow, "CNY", ...args);
      const capitalExpenditures = annualFlow(companyFacts, tags.capex, "CNY", ...args);
      const freeCashFlow = operatingCashFlow != null && capitalExpenditures != null ? operatingCashFlow - Math.abs(capitalExpenditures) : null;
      const debtCurrent = instant(companyFacts, tags.debtCurrent, "CNY", filing.accessionNumber, filing.reportDate) ?? 0;
      const debtNoncurrent = instant(companyFacts, tags.debtNoncurrent, "CNY", filing.accessionNumber, filing.reportDate);
      return {
        fiscalYear,
        reportDate: filing.reportDate,
        filingDate: filing.filingDate,
        filingUrl: filing.url,
        revenue,
        grossProfit,
        operatingIncome,
        netIncome,
        dilutedEps: annualFlow(companyFacts, tags.dilutedEps, "CNY/shares", ...args),
        operatingCashFlow,
        capitalExpenditures: capitalExpenditures == null ? null : Math.abs(capitalExpenditures),
        freeCashFlow,
        cash: instant(companyFacts, tags.cash, "CNY", filing.accessionNumber, filing.reportDate),
        shortTermInvestments: instant(companyFacts, tags.shortTermInvestments, "CNY", filing.accessionNumber, filing.reportDate),
        totalAssets: instant(companyFacts, tags.assets, "CNY", filing.accessionNumber, filing.reportDate),
        totalLiabilities: instant(companyFacts, tags.liabilities, "CNY", filing.accessionNumber, filing.reportDate),
        totalDebt: debtNoncurrent == null ? null : debtCurrent + debtNoncurrent,
        shareholdersEquity: instant(companyFacts, tags.equity, "CNY", filing.accessionNumber, filing.reportDate),
        dilutedOrdinaryShares: annualFlow(companyFacts, tags.dilutedShares, "shares", ...args),
        grossMargin: percent(grossProfit, revenue),
        operatingMargin: percent(operatingIncome, revenue),
        netMargin: percent(netIncome, revenue),
        freeCashFlowMargin: percent(freeCashFlow, revenue),
        source: "SEC XBRL company facts and Baidu Form 20-F",
      };
    });
}

const filingsSource = (registration, annual, sixK) => `export type BaiduFiling = { accessionNumber: string; form: string; filingDate: string; reportDate: string; primaryDocument: string; url: string };
export const BAIDU_FILING_SOURCE_NOTE = "Generated from SEC submissions for Baidu, Inc., CIK ${CIK}. Baidu is a foreign private issuer; annual reports are Form 20-F and interim/event filings are primarily Form 6-K.";
export const BAIDU_REGISTRATION_FILINGS: BaiduFiling[] = ${JSON.stringify(registration, null, 2)};
export const BAIDU_ANNUAL_FILINGS: BaiduFiling[] = ${JSON.stringify(annual, null, 2)};
export const BAIDU_SIX_K_FILINGS: BaiduFiling[] = ${JSON.stringify(sixK, null, 2)};
export const BAIDU_LATEST_ANNUAL_FILING = BAIDU_ANNUAL_FILINGS.filter((item) => item.form === "20-F").at(-1)!;
export const BAIDU_LATEST_SIX_K_FILING = BAIDU_SIX_K_FILINGS.at(-1)!;\n`;

const annualSource = (rows) => `export type BaiduAnnualFinancial = { fiscalYear: number; reportDate: string; filingDate: string; filingUrl: string; revenue: number | null; grossProfit: number | null; operatingIncome: number | null; netIncome: number | null; dilutedEps: number | null; operatingCashFlow: number | null; capitalExpenditures: number | null; freeCashFlow: number | null; cash: number | null; shortTermInvestments: number | null; totalAssets: number | null; totalLiabilities: number | null; totalDebt: number | null; shareholdersEquity: number | null; dilutedOrdinaryShares: number | null; grossMargin: number | null; operatingMargin: number | null; netMargin: number | null; freeCashFlowMargin: number | null; source: string };
export const BAIDU_ANNUAL_FINANCIALS_SOURCE_NOTE = "FY2018-FY2025 are generated from SEC XBRL company facts and Baidu Forms 20-F. Data are RMB. One BIDU ADS represents eight Class A ordinary shares.";
export const BAIDU_ANNUAL_FINANCIALS: BaiduAnnualFinancial[] = ${JSON.stringify(rows, null, 2)};
export const BAIDU_LATEST_ANNUAL_FINANCIAL = BAIDU_ANNUAL_FINANCIALS.at(-1)!;\n`;

function valuationSource(annualRows, marketData) {
  const result = marketData.chart.result[0];
  const timestamps = result.timestamp || [];
  const adjusted = result.indicators.adjclose?.[0]?.adjclose || result.indicators.quote[0].close;
  const fx = { 2016: 6.94, 2017: 6.51, 2018: 6.88, 2019: 6.96, 2020: 6.53, 2021: 6.36, 2022: 6.90, 2023: 7.10, 2024: 7.30, 2025: 7.30, 2026: 6.79 };
  const normalizedAdsShares = { 2018: 349_000_000, 2019: 350_000_000, 2020: 351_000_000, 2021: 350_000_000, 2022: 349_000_000, 2023: 346_000_000, 2024: 344_000_000, 2025: 342_654_000 };
  const priceOnOrBefore = (date) => {
    const target = new Date(`${date}T23:59:59Z`).getTime() / 1000;
    let index = -1;
    for (let i = 0; i < timestamps.length; i += 1) if (timestamps[i] <= target && adjusted[i] != null) index = i;
    return index < 0 ? null : { date: new Date(timestamps[index] * 1000).toISOString().slice(0, 10), price: adjusted[index] };
  };
  const rows = annualRows.filter((row) => row.revenue && normalizedAdsShares[row.fiscalYear]).map((row) => {
    const quote = priceOnOrBefore(row.reportDate);
    const adsShares = normalizedAdsShares[row.fiscalYear];
    const marketCapitalizationUsd = quote ? quote.price * adsShares : null;
    const marketCapitalizationRmb = marketCapitalizationUsd == null ? null : marketCapitalizationUsd * fx[row.fiscalYear];
    const liquidity = (row.cash ?? 0) + (row.shortTermInvestments ?? 0);
    const enterpriseValueRmb = marketCapitalizationRmb == null || row.totalDebt == null ? null : marketCapitalizationRmb + row.totalDebt - liquidity;
    return {
      fiscalYear: row.fiscalYear,
      priceDate: quote?.date ?? "",
      adjustedCloseUsd: quote?.price ?? null,
      adsShares,
      marketCapitalizationUsd,
      enterpriseValueRmb,
      priceToSales: marketCapitalizationRmb == null ? null : marketCapitalizationRmb / row.revenue,
      enterpriseValueToSales: enterpriseValueRmb == null ? null : enterpriseValueRmb / row.revenue,
      priceToEarnings: marketCapitalizationRmb == null || !row.netIncome || row.netIncome <= 0 ? null : marketCapitalizationRmb / row.netIncome,
      freeCashFlowYield: marketCapitalizationRmb == null || row.freeCashFlow == null ? null : row.freeCashFlow / marketCapitalizationRmb * 100,
      source: "Yahoo Finance adjusted close, year-end RMB/USD context, and Baidu SEC filings",
    };
  });
  const currentPrice = result.meta.regularMarketPrice ?? adjusted.at(-1);
  const adsShares = 342_654_000;
  const marketCapitalizationUsd = currentPrice * adsShares;
  const marketCapitalizationRmb = marketCapitalizationUsd * fx[2026];
  const enterpriseValueRmb = marketCapitalizationRmb + 93_000_000_000 - 283_100_000_000;
  rows.push({ fiscalYear: 2026, priceDate: "2026-09-24", adjustedCloseUsd: currentPrice, adsShares, marketCapitalizationUsd, enterpriseValueRmb, priceToSales: marketCapitalizationRmb / 128_000_000_000, enterpriseValueToSales: enterpriseValueRmb / 128_000_000_000, priceToEarnings: marketCapitalizationRmb / 10_000_000_000, freeCashFlowYield: 12_000_000_000 / marketCapitalizationRmb * 100, source: "Yahoo Finance September 24, 2026 snapshot, Baidu Q2 results, and Hobite FY2026 estimates" });
  return `export type BaiduValuationHistory = { fiscalYear: number; priceDate: string; adjustedCloseUsd: number | null; adsShares: number; marketCapitalizationUsd: number | null; enterpriseValueRmb: number | null; priceToSales: number | null; enterpriseValueToSales: number | null; priceToEarnings: number | null; freeCashFlowYield: number | null; source: string };
export const BAIDU_VALUATION_HISTORY_NOTE = "Historical rows combine Yahoo Finance adjusted closes nearest year-end with Baidu SEC financials, filing-normalized ADS counts, and year-end RMB/USD context. ADS counts are rounded because the XBRL history does not provide a consistent diluted-ADS series. FY2026 uses the September 24, 2026 market snapshot and Hobite estimates.";
export const BAIDU_VALUATION_HISTORY: BaiduValuationHistory[] = ${JSON.stringify(rows, null, 2)};
export const BAIDU_LATEST_VALUATION = BAIDU_VALUATION_HISTORY.at(-1)!;\n`;
}

async function main() {
  const submissions = await fetchJson(`https://data.sec.gov/submissions/CIK${CIK}.json`);
  const allRows = submissionRows(submissions.filings.recent);
  for (const file of submissions.filings.files || []) allRows.push(...submissionRows(await fetchJson(`https://data.sec.gov/submissions/${file.name}`)));
  const selected = allRows.filter((row) => TARGET_FORMS.has(row.form)).sort((a, b) => a.filingDate.localeCompare(b.filingDate));
  const registration = selected.filter((row) => ["F-1", "F-1/A"].includes(row.form)).map(cleanFiling);
  const annual = selected.filter((row) => ["20-F", "20-F/A"].includes(row.form)).map(cleanFiling);
  const sixK = selected.filter((row) => row.form === "6-K").map(cleanFiling);
  const companyFacts = await fetchJson(`https://data.sec.gov/api/xbrl/companyfacts/CIK${CIK}.json`);
  const marketData = await fetchJson("https://query1.finance.yahoo.com/v8/finance/chart/BIDU?period1=1451606400&period2=1790294400&interval=1d&events=history&includeAdjustedClose=true");
  const annualRows = buildAnnual(companyFacts, annual);
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, "filings.ts"), filingsSource(registration, annual.slice(-10), sixK.slice(-30)));
  await writeFile(path.join(outputDir, "annualFinancials.ts"), annualSource(annualRows));
  await writeFile(path.join(outputDir, "valuationHistory.ts"), valuationSource(annualRows, marketData));
  console.log(`Updated Baidu SEC data: ${annualRows.length} annual rows, ${annual.length} annual filings, and ${sixK.length} Form 6-K filings.`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
