import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CIK = "0001730168";
const CIK_PLAIN = "1730168";
const USER_AGENT = "Hobite Research contact@hobite.vercel.app";
const TARGET_FORMS = new Set(["S-1", "S-1/A", "S-3", "S-3/A", "S-3ASR", "S-4", "S-4/A", "10-K", "10-K/A", "10-Q", "10-Q/A"]);
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(projectRoot, "app", "research", "broadcom-complete-fundamental-analysis");

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
  return { ...row, url: `https://www.sec.gov/Archives/edgar/data/${CIK_PLAIN}/${row.accessionNumber.replaceAll("-", "")}/${row.primaryDocument}` };
}

function facts(companyFacts, tags, unit) {
  return tags.flatMap((tag) => companyFacts.facts?.["us-gaap"]?.[tag]?.units?.[unit] || []);
}

function durationDays(row) {
  return row.start ? (new Date(row.end).getTime() - new Date(row.start).getTime()) / 86_400_000 : 0;
}

function latest(rows) {
  return [...rows].sort((a, b) => String(b.filed).localeCompare(String(a.filed)))[0] ?? null;
}

function annualFlow(companyFacts, tags, unit, fiscalYear, accessionNumber, reportDate) {
  const rows = facts(companyFacts, tags, unit).filter((row) => row.form === "10-K" && row.fy === fiscalYear && row.fp === "FY" && row.accn === accessionNumber && row.end === reportDate && durationDays(row) > 300);
  return latest(rows)?.val ?? null;
}

function instant(companyFacts, tags, unit, accessionNumber, reportDate) {
  const rows = facts(companyFacts, tags, unit).filter((row) => row.accn === accessionNumber && row.end === reportDate && !row.start);
  return latest(rows)?.val ?? null;
}

function quarterFlow(companyFacts, tags, unit, fiscalYear, fiscalQuarter, accessionNumber, reportDate) {
  const rows = facts(companyFacts, tags, unit).filter((row) => row.form === "10-Q" && row.fy === fiscalYear && row.fp === `Q${fiscalQuarter}` && row.accn === accessionNumber && row.end === reportDate && durationDays(row) >= 70 && durationDays(row) <= 110);
  return latest(rows)?.val ?? null;
}

function ytdFlow(companyFacts, tags, unit, fiscalYear, fiscalQuarter, accessionNumber, reportDate) {
  const rows = facts(companyFacts, tags, unit).filter((row) => row.form === "10-Q" && row.fy === fiscalYear && row.fp === `Q${fiscalQuarter}` && row.accn === accessionNumber && row.end === reportDate && durationDays(row) >= fiscalQuarter * 70);
  return latest(rows)?.val ?? null;
}

function percent(numerator, denominator) {
  return numerator == null || denominator == null || denominator === 0 ? null : Number(((numerator / denominator) * 100).toFixed(1));
}

const tags = {
  revenue: ["RevenueFromContractWithCustomerExcludingAssessedTax", "Revenues", "SalesRevenueNet"],
  grossProfit: ["GrossProfit"],
  operatingIncome: ["OperatingIncomeLoss"],
  netIncome: ["NetIncomeLoss", "ProfitLoss", "NetIncomeLossAvailableToCommonStockholdersBasic"],
  dilutedEps: ["EarningsPerShareDiluted"],
  operatingCashFlow: ["NetCashProvidedByUsedInOperatingActivities"],
  capex: ["PaymentsToAcquirePropertyPlantAndEquipment"],
  assets: ["Assets"],
  liabilities: ["Liabilities"],
  equity: ["StockholdersEquity", "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest"],
  cash: ["CashAndCashEquivalentsAtCarryingValue", "CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents"],
  debtCurrent: ["LongTermDebtCurrent", "LongTermDebtAndFinanceLeaseObligationsCurrent"],
  debtNoncurrent: ["LongTermDebtNoncurrent", "LongTermDebtAndFinanceLeaseObligationsNoncurrent"],
  dilutedShares: ["WeightedAverageNumberOfDilutedSharesOutstanding"],
};

function buildAnnual(companyFacts, annualFilings) {
  const predecessorRows = [
    { fiscalYear: 2016, reportDate: "2016-10-30", filingDate: "2017-12-21", filingUrl: "https://www.sec.gov/Archives/edgar/data/1649338/000164933817000158/avgo-10292017x10k.htm", revenue: 13_240_000_000, grossProfit: 5_940_000_000, operatingIncome: -409_000_000, netIncome: -1_861_000_000, dilutedEps: -4.86, operatingCashFlow: 3_411_000_000, capitalExpenditures: 723_000_000, freeCashFlow: 2_688_000_000, cash: null, totalAssets: null, totalLiabilities: null, longTermDebt: null, shareholdersEquity: null, dilutedShares: null, grossMargin: 44.9, operatingMargin: -3.1, netMargin: -14.1, freeCashFlowMargin: 20.3, source: "Audited Broadcom Limited FY2017 Form 10-K comparative statement" },
    { fiscalYear: 2017, reportDate: "2017-10-29", filingDate: "2017-12-21", filingUrl: "https://www.sec.gov/Archives/edgar/data/1649338/000164933817000158/avgo-10292017x10k.htm", revenue: 17_636_000_000, grossProfit: 8_509_000_000, operatingIncome: 2_493_000_000, netIncome: 1_894_000_000, dilutedEps: 4.27, operatingCashFlow: 6_551_000_000, capitalExpenditures: 1_069_000_000, freeCashFlow: 5_482_000_000, cash: null, totalAssets: null, totalLiabilities: null, longTermDebt: null, shareholdersEquity: null, dilutedShares: null, grossMargin: 48.2, operatingMargin: 14.1, netMargin: 10.7, freeCashFlowMargin: 31.1, source: "Audited Broadcom Limited FY2017 Form 10-K" },
  ];
  const debtFallback = { 2022: 39_245_000_000, 2023: 37_650_000_000, 2024: 67_566_000_000, 2025: 65_136_000_000 };
  const currentRows = annualFilings.filter((filing) => filing.form === "10-K" && Number(filing.reportDate.slice(0, 4)) >= 2016).slice(-10).map((filing) => {
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
    return {
      fiscalYear,
      reportDate: filing.reportDate,
      filingDate: filing.filingDate,
      filingUrl: filing.url,
      revenue,
      grossProfit,
      operatingIncome,
      netIncome,
      dilutedEps: annualFlow(companyFacts, tags.dilutedEps, "USD/shares", ...args),
      operatingCashFlow,
      capitalExpenditures,
      freeCashFlow,
      cash: instant(companyFacts, tags.cash, "USD", filing.accessionNumber, filing.reportDate),
      totalAssets: instant(companyFacts, tags.assets, "USD", filing.accessionNumber, filing.reportDate),
      totalLiabilities: instant(companyFacts, tags.liabilities, "USD", filing.accessionNumber, filing.reportDate),
      longTermDebt: debtNoncurrent == null ? debtFallback[fiscalYear] ?? null : debtCurrent + debtNoncurrent,
      shareholdersEquity: instant(companyFacts, tags.equity, "USD", filing.accessionNumber, filing.reportDate),
      dilutedShares: annualFlow(companyFacts, tags.dilutedShares, "shares", ...args),
      grossMargin: percent(grossProfit, revenue),
      operatingMargin: percent(operatingIncome, revenue),
      netMargin: percent(netIncome, revenue),
      freeCashFlowMargin: percent(freeCashFlow, revenue),
      source: "SEC XBRL company facts and Broadcom Form 10-K",
    };
  });
  return [...predecessorRows, ...currentRows];
}

function buildQuarterly(companyFacts, annualRows, quarterlyFilings) {
  const selected = quarterlyFilings.filter((filing) => filing.form === "10-Q").slice(-8);
  const rows = selected.map((filing) => {
    const fiscalYear = Number(filing.reportDate.slice(0, 4));
    const filingFacts = facts(companyFacts, tags.revenue, "USD").filter((row) => row.accn === filing.accessionNumber && row.form === "10-Q");
    const fp = filingFacts.find((row) => /^Q[123]$/.test(row.fp))?.fp;
    const fiscalQuarter = Number(fp?.slice(1));
    const args = [fiscalYear, fiscalQuarter, filing.accessionNumber, filing.reportDate];
    const revenue = quarterFlow(companyFacts, tags.revenue, "USD", ...args);
    const grossProfit = quarterFlow(companyFacts, tags.grossProfit, "USD", ...args);
    const operatingIncome = quarterFlow(companyFacts, tags.operatingIncome, "USD", ...args);
    const netIncome = quarterFlow(companyFacts, tags.netIncome, "USD", ...args);
    const operatingCashFlowYtd = ytdFlow(companyFacts, tags.operatingCashFlow, "USD", ...args);
    const capexYtd = ytdFlow(companyFacts, tags.capex, "USD", ...args);
    return { filing, fiscalYear, fiscalQuarter, revenue, grossProfit, operatingIncome, netIncome, operatingCashFlowYtd, capexYtd };
  }).filter((row) => Number.isFinite(row.fiscalQuarter));

  const result = [];
  for (const row of rows) {
    const prior = rows.find((candidate) => candidate.fiscalYear === row.fiscalYear && candidate.fiscalQuarter === row.fiscalQuarter - 1);
    const operatingCashFlow = row.fiscalQuarter === 1 ? row.operatingCashFlowYtd : row.operatingCashFlowYtd != null && prior?.operatingCashFlowYtd != null ? row.operatingCashFlowYtd - prior.operatingCashFlowYtd : null;
    const capitalExpenditures = row.fiscalQuarter === 1 ? row.capexYtd : row.capexYtd != null && prior?.capexYtd != null ? row.capexYtd - prior.capexYtd : null;
    const freeCashFlow = operatingCashFlow != null && capitalExpenditures != null ? operatingCashFlow - capitalExpenditures : null;
    result.push({
      period: `FY${row.fiscalYear} Q${row.fiscalQuarter}`,
      fiscalYear: row.fiscalYear,
      fiscalQuarter: row.fiscalQuarter,
      reportDate: row.filing.reportDate,
      filingUrl: row.filing.url,
      revenue: row.revenue,
      grossProfit: row.grossProfit,
      operatingIncome: row.operatingIncome,
      netIncome: row.netIncome,
      dilutedEps: quarterFlow(companyFacts, tags.dilutedEps, "USD/shares", row.fiscalYear, row.fiscalQuarter, row.filing.accessionNumber, row.filing.reportDate),
      operatingCashFlow,
      capitalExpenditures,
      freeCashFlow,
      grossMargin: percent(row.grossProfit, row.revenue),
      operatingMargin: percent(row.operatingIncome, row.revenue),
      netMargin: percent(row.netIncome, row.revenue),
      freeCashFlowMargin: percent(freeCashFlow, row.revenue),
      source: "SEC XBRL company facts and Broadcom Form 10-Q",
    });
  }

  for (const annual of annualRows.filter((row) => row.fiscalYear >= 2024)) {
    const firstThree = result.filter((row) => row.fiscalYear === annual.fiscalYear);
    if (firstThree.length !== 3) continue;
    const subtract = (value, key) => value == null || firstThree.some((row) => row[key] == null) ? null : value - firstThree.reduce((sum, row) => sum + row[key], 0);
    const revenue = subtract(annual.revenue, "revenue");
    const grossProfit = subtract(annual.grossProfit, "grossProfit");
    const operatingIncome = subtract(annual.operatingIncome, "operatingIncome");
    const netIncome = subtract(annual.netIncome, "netIncome");
    const operatingCashFlow = subtract(annual.operatingCashFlow, "operatingCashFlow");
    const capitalExpenditures = subtract(annual.capitalExpenditures, "capitalExpenditures");
    const freeCashFlow = operatingCashFlow != null && capitalExpenditures != null ? operatingCashFlow - capitalExpenditures : null;
    result.push({ period: `FY${annual.fiscalYear} Q4`, fiscalYear: annual.fiscalYear, fiscalQuarter: 4, reportDate: annual.reportDate, filingUrl: annual.filingUrl, revenue, grossProfit, operatingIncome, netIncome, dilutedEps: null, operatingCashFlow, capitalExpenditures, freeCashFlow, grossMargin: percent(grossProfit, revenue), operatingMargin: percent(operatingIncome, revenue), netMargin: percent(netIncome, revenue), freeCashFlowMargin: percent(freeCashFlow, revenue), source: "Derived from Broadcom Form 10-K less Q1-Q3 SEC XBRL facts" });
  }
  return result.sort((a, b) => a.fiscalYear - b.fiscalYear || a.fiscalQuarter - b.fiscalQuarter).slice(-10);
}

function filingsSource(registration, annual, quarterly) {
  return `export type BroadcomFiling = { accessionNumber: string; form: string; filingDate: string; reportDate: string; primaryDocument: string; url: string };
export const BROADCOM_FILING_SOURCE_NOTE = "Generated from SEC submissions for Broadcom Inc., CIK ${CIK}.";
export const BROADCOM_REGISTRATION_FILINGS: BroadcomFiling[] = ${JSON.stringify(registration, null, 2)};
export const BROADCOM_ANNUAL_FILINGS: BroadcomFiling[] = ${JSON.stringify(annual, null, 2)};
export const BROADCOM_QUARTERLY_FILINGS: BroadcomFiling[] = ${JSON.stringify(quarterly, null, 2)};
export const BROADCOM_LATEST_ANNUAL_FILING = BROADCOM_ANNUAL_FILINGS.filter((item) => item.form === "10-K").at(-1)!;
export const BROADCOM_LATEST_QUARTERLY_FILING = BROADCOM_QUARTERLY_FILINGS.filter((item) => item.form === "10-Q").at(-1)!;
`;
}

function annualSource(rows) {
  return `export type BroadcomAnnualFinancial = { fiscalYear: number; reportDate: string; filingDate: string; filingUrl: string; revenue: number | null; grossProfit: number | null; operatingIncome: number | null; netIncome: number | null; dilutedEps: number | null; operatingCashFlow: number | null; capitalExpenditures: number | null; freeCashFlow: number | null; cash: number | null; totalAssets: number | null; totalLiabilities: number | null; longTermDebt: number | null; shareholdersEquity: number | null; dilutedShares: number | null; grossMargin: number | null; operatingMargin: number | null; netMargin: number | null; freeCashFlowMargin: number | null; source: string };
export const BROADCOM_ANNUAL_FINANCIALS_SOURCE_NOTE = "FY2018-FY2025 are generated from SEC XBRL company facts for Broadcom Inc. FY2016-FY2017 are audited predecessor-CIK comparative figures from Broadcom Limited's FY2017 Form 10-K. Data are in USD. Broadcom uses a 52/53-week fiscal year ending on the Sunday nearest October 31. FY2024 includes VMware from November 22, 2023. Historical EPS and shares precede the July 2024 ten-for-one split unless otherwise stated.";
export const BROADCOM_ANNUAL_FINANCIALS: BroadcomAnnualFinancial[] = ${JSON.stringify(rows, null, 2)};
export const BROADCOM_LATEST_ANNUAL_FINANCIAL = BROADCOM_ANNUAL_FINANCIALS.at(-1)!;
`;
}

function quarterlySource(rows) {
  return `export type BroadcomQuarterlyFinancial = { period: string; fiscalYear: number; fiscalQuarter: number; reportDate: string; filingUrl: string; revenue: number | null; grossProfit: number | null; operatingIncome: number | null; netIncome: number | null; dilutedEps: number | null; operatingCashFlow: number | null; capitalExpenditures: number | null; freeCashFlow: number | null; grossMargin: number | null; operatingMargin: number | null; netMargin: number | null; freeCashFlowMargin: number | null; source: string };
export const BROADCOM_QUARTERLY_FINANCIALS_SOURCE_NOTE = "Recent quarters are generated from SEC XBRL company facts using Broadcom fiscal-year and fiscal-period labels. Q4 flow values are derived from the Form 10-K less Q1-Q3. Q3 FY2026 is tracked separately from the September 2 earnings release until its 10-Q is filed.";
export const BROADCOM_QUARTERLY_FINANCIALS = ${JSON.stringify(rows, null, 2)} satisfies BroadcomQuarterlyFinancial[];
export const BROADCOM_LATEST_SEC_QUARTER = BROADCOM_QUARTERLY_FINANCIALS.at(-1)!;
`;
}

function valuationSource(annualRows, marketData) {
  const result = marketData.chart.result[0];
  const timestamps = result.timestamp || [];
  const adjusted = result.indicators.adjclose?.[0]?.adjclose || result.indicators.quote[0].close;
  const priceOnOrBefore = (date) => {
    const target = new Date(`${date}T23:59:59Z`).getTime() / 1000;
    let index = -1;
    for (let item = 0; item < timestamps.length; item += 1) if (timestamps[item] <= target && adjusted[item] != null) index = item;
    return index < 0 ? null : { date: new Date(timestamps[index] * 1000).toISOString().slice(0, 10), price: adjusted[index] };
  };
  const rows = annualRows.filter((row) => row.fiscalYear >= 2020 && row.dilutedShares && row.revenue && row.freeCashFlow).map((row) => {
    const quote = priceOnOrBefore(row.reportDate);
    const splitAdjustedShares = row.fiscalYear <= 2023 ? row.dilutedShares * 10 : row.dilutedShares;
    const marketCapitalization = quote ? quote.price * splitAdjustedShares : null;
    const enterpriseValue = marketCapitalization != null && row.longTermDebt != null && row.cash != null ? marketCapitalization + row.longTermDebt - row.cash : null;
    return { fiscalYear: row.fiscalYear, priceDate: quote?.date ?? "", adjustedClose: quote?.price ?? null, splitAdjustedDilutedShares: splitAdjustedShares, marketCapitalization, enterpriseValue, priceToSales: marketCapitalization == null ? null : marketCapitalization / row.revenue, enterpriseValueToSales: enterpriseValue == null ? null : enterpriseValue / row.revenue, priceToEarnings: marketCapitalization == null || !row.netIncome || row.netIncome <= 0 ? null : marketCapitalization / row.netIncome, freeCashFlowYield: marketCapitalization == null ? null : row.freeCashFlow / marketCapitalization * 100, source: "Yahoo Finance adjusted close and Broadcom SEC filings" };
  });
  const currentPrice = result.meta.regularMarketPrice ?? adjusted.at(-1);
  const currentShares = 4_884_000_000;
  const currentMarketCap = currentPrice * currentShares;
  const currentEnterpriseValue = currentMarketCap + 59_419_000_000 - 23_975_000_000;
  rows.push({ fiscalYear: 2026, priceDate: "2026-09-03", adjustedClose: currentPrice, splitAdjustedDilutedShares: currentShares, marketCapitalization: currentMarketCap, enterpriseValue: currentEnterpriseValue, priceToSales: currentMarketCap / 105_889_000_000, enterpriseValueToSales: currentEnterpriseValue / 105_889_000_000, priceToEarnings: null, freeCashFlowYield: 45_900_000_000 / currentMarketCap * 100, source: "Yahoo Finance September 3 market snapshot and Broadcom Q3 release/FY2026 guidance" });
  return `export type BroadcomValuationHistory = { fiscalYear: number; priceDate: string; adjustedClose: number | null; splitAdjustedDilutedShares: number; marketCapitalization: number | null; enterpriseValue: number | null; priceToSales: number | null; enterpriseValueToSales: number | null; priceToEarnings: number | null; freeCashFlowYield: number | null; source: string };
export const BROADCOM_VALUATION_HISTORY_NOTE = "Historical rows combine Yahoo Finance split-adjusted closes nearest Broadcom's fiscal year-end with SEC financials and split-adjusted diluted shares. FY2026 uses the September 3, 2026 market snapshot, company Q4 revenue guidance and a Hobite full-year FCF estimate. The July 2024 ten-for-one split is normalized.";
export const BROADCOM_VALUATION_HISTORY: BroadcomValuationHistory[] = ${JSON.stringify(rows, null, 2)};
export const BROADCOM_LATEST_VALUATION = BROADCOM_VALUATION_HISTORY.at(-1)!;
`;
}

async function main() {
  const submissions = await fetchJson(`https://data.sec.gov/submissions/CIK${CIK}.json`);
  const allRows = submissionRows(submissions.filings.recent);
  for (const file of submissions.filings.files || []) allRows.push(...submissionRows(await fetchJson(`https://data.sec.gov/submissions/${file.name}`)));
  const selected = allRows.filter((row) => TARGET_FORMS.has(row.form)).sort((a, b) => a.filingDate.localeCompare(b.filingDate));
  const registration = selected.filter((row) => ["S-1", "S-1/A", "S-3", "S-3/A", "S-3ASR", "S-4", "S-4/A"].includes(row.form)).slice(-8).map(cleanFiling);
  const annual = selected.filter((row) => ["10-K", "10-K/A"].includes(row.form) && Number(row.reportDate.slice(0, 4)) >= 2016).map(cleanFiling);
  const quarterly = selected.filter((row) => ["10-Q", "10-Q/A"].includes(row.form) && Number(row.reportDate.slice(0, 4)) >= 2023).map(cleanFiling);
  const companyFacts = await fetchJson(`https://data.sec.gov/api/xbrl/companyfacts/CIK${CIK}.json`);
  const marketData = await fetchJson("https://query1.finance.yahoo.com/v8/finance/chart/AVGO?period1=1572480000&period2=1788566400&interval=1d&events=history&includeAdjustedClose=true");
  const annualRows = buildAnnual(companyFacts, annual);
  const quarterlyRows = buildQuarterly(companyFacts, annualRows, quarterly);
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, "filings.ts"), filingsSource(registration, annual.slice(-10), quarterly.slice(-12)));
  await writeFile(path.join(outputDir, "annualFinancials.ts"), annualSource(annualRows));
  await writeFile(path.join(outputDir, "quarterlyFinancials.ts"), quarterlySource(quarterlyRows));
  await writeFile(path.join(outputDir, "valuationHistory.ts"), valuationSource(annualRows, marketData));
  console.log(`Updated Broadcom SEC data: ${annualRows.length} annual rows and ${quarterlyRows.length} quarterly rows.`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
