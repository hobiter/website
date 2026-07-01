import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CIK = "0001065280";
const CIK_NO_LEADING_ZEROES = "1065280";
const USER_AGENT = "Hobite Research contact@hobite.vercel.app";
const TARGET_FORMS = new Set(["S-1", "S-1/A", "10-K", "10-K/A", "10-Q", "10-Q/A"]);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const outputDir = path.join(projectRoot, "app", "research", "netflix-complete-fundamental-analysis");

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": USER_AGENT,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

function rowsFromSubmissionTable(table) {
  return table.accessionNumber.map((accessionNumber, index) => ({
    accessionNumber,
    form: table.form[index],
    filingDate: table.filingDate[index],
    reportDate: table.reportDate[index],
    primaryDocument: table.primaryDocument[index],
    primaryDocDescription: table.primaryDocDescription[index],
  }));
}

function filingUrl(row) {
  const accessionPath = row.accessionNumber.replaceAll("-", "");
  return `https://www.sec.gov/Archives/edgar/data/${CIK_NO_LEADING_ZEROES}/${accessionPath}/${row.primaryDocument}`;
}

function cleanedFiling(row) {
  return {
    accessionNumber: row.accessionNumber,
    form: row.form,
    filingDate: row.filingDate,
    reportDate: row.reportDate,
    primaryDocument: row.primaryDocument,
    url: filingUrl(row),
  };
}

function unitRows(companyFacts, tag, unit = "USD") {
  return companyFacts.facts["us-gaap"][tag]?.units?.[unit] || [];
}

function isFullYearFact(unit, year) {
  if (unit.end !== `${year}-12-31`) return false;
  if (!unit.start) return true;

  const start = new Date(`${unit.start}T00:00:00Z`);
  const end = new Date(`${unit.end}T00:00:00Z`);
  const days = (end - start) / 86_400_000 + 1;

  return days >= 350 && days <= 380;
}

function latestValue(rows) {
  const sorted = [...rows].sort((a, b) => a.filed.localeCompare(b.filed));
  return sorted.at(-1)?.val ?? null;
}

function durationFact(companyFacts, tag, year, unit = "USD") {
  const rows = unitRows(companyFacts, tag, unit).filter(
    (row) => row.form === "10-K" && row.fp === "FY" && row.fy === year && isFullYearFact(row, year),
  );

  return latestValue(rows);
}

function instantFact(companyFacts, tag, year, unit = "USD") {
  const rows = unitRows(companyFacts, tag, unit).filter(
    (row) =>
      row.form === "10-K" &&
      row.end === `${year}-12-31` &&
      (row.fy === year || row.fy === year + 1 || row.fy == null),
  );

  return latestValue(rows);
}

function ratio(numerator, denominator) {
  return numerator != null && denominator ? numerator / denominator : null;
}

function rounded(value, digits = 2) {
  if (value == null || !Number.isFinite(value)) return null;
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function percent(numerator, denominator) {
  const value = ratio(numerator, denominator);
  return value == null ? null : rounded(value * 100);
}

function buildAnnualFinancials(companyFacts, annualFilings) {
  const rows = [];

  for (let year = 2002; year <= 2025; year += 1) {
    const filing =
      annualFilings.find((item) => item.reportDate === `${year}-12-31` && item.form === "10-K") ||
      annualFilings.find((item) => item.reportDate === `${year}-12-31`);
    const revenue = durationFact(companyFacts, "Revenues", year);
    const costOfRevenue = durationFact(companyFacts, "CostOfRevenue", year);
    const grossProfit =
      durationFact(companyFacts, "GrossProfit", year) ??
      (revenue != null && costOfRevenue != null ? revenue - costOfRevenue : null);
    const operatingIncome = durationFact(companyFacts, "OperatingIncomeLoss", year);
    const netIncome = durationFact(companyFacts, "NetIncomeLoss", year);
    const operatingCashFlow = durationFact(companyFacts, "NetCashProvidedByUsedInOperatingActivities", year);
    const capitalExpenditures = durationFact(companyFacts, "PaymentsToAcquirePropertyPlantAndEquipment", year);
    const freeCashFlow =
      operatingCashFlow != null && capitalExpenditures != null ? operatingCashFlow - capitalExpenditures : null;
    const shareholderEquity = instantFact(companyFacts, "StockholdersEquity", year);

    rows.push({
      fiscalYear: year,
      accessionNumber: filing?.accessionNumber ?? "",
      filingDate: filing?.filingDate ?? "",
      filingUrl: filing?.url ?? "",
      revenue,
      grossProfit,
      operatingIncome,
      netIncome,
      dilutedEps: durationFact(companyFacts, "EarningsPerShareDiluted", year, "USD/shares"),
      operatingCashFlow,
      capitalExpenditures,
      freeCashFlow,
      cashAndEquivalents:
        instantFact(companyFacts, "CashAndCashEquivalentsAtCarryingValue", year) ??
        instantFact(companyFacts, "CashCashEquivalentsAndShortTermInvestments", year),
      currentAssets: instantFact(companyFacts, "AssetsCurrent", year),
      totalAssets: instantFact(companyFacts, "Assets", year),
      currentLiabilities: instantFact(companyFacts, "LiabilitiesCurrent", year),
      totalLiabilities: instantFact(companyFacts, "Liabilities", year),
      longTermDebt:
        instantFact(companyFacts, "LongTermDebtNoncurrent", year) ?? instantFact(companyFacts, "LongTermDebt", year),
      shareholderEquity,
      dilutedShares: durationFact(companyFacts, "WeightedAverageNumberOfDilutedSharesOutstanding", year, "shares"),
      grossMargin: percent(grossProfit, revenue),
      operatingMargin: percent(operatingIncome, revenue),
      netMargin: percent(netIncome, revenue),
      freeCashFlowMargin: percent(freeCashFlow, revenue),
      roe: percent(netIncome, shareholderEquity),
      source: "SEC XBRL company facts; pending 10-K table reconciliation",
    });
  }

  return rows;
}

function filingsSource(registrationFilings, annualFilings, quarterlyFilings) {
  return `export type NetflixFiling = {
  accessionNumber: string;
  form: "S-1" | "S-1/A" | "10-K" | "10-K/A" | "10-Q" | "10-Q/A";
  filingDate: string;
  reportDate: string;
  primaryDocument: string;
  url: string;
};

export const NETFLIX_CIK = "${CIK}";

export const NETFLIX_SEC_SUBMISSIONS_URL = "https://data.sec.gov/submissions/CIK${CIK}.json";
export const NETFLIX_SEC_COMPANY_FACTS_URL = "https://data.sec.gov/api/xbrl/companyfacts/CIK${CIK}.json";

export const NETFLIX_REGISTRATION_FILINGS: NetflixFiling[] = ${JSON.stringify(registrationFilings, null, 2)};

export const NETFLIX_ANNUAL_FILINGS: NetflixFiling[] = ${JSON.stringify(annualFilings, null, 2)};

export const NETFLIX_QUARTERLY_FILINGS: NetflixFiling[] = ${JSON.stringify(quarterlyFilings, null, 2)};

export const NETFLIX_CORE_FILINGS = [
  ...NETFLIX_REGISTRATION_FILINGS,
  ...NETFLIX_ANNUAL_FILINGS,
  ...NETFLIX_QUARTERLY_FILINGS,
];

export const NETFLIX_LATEST_ANNUAL_FILING = NETFLIX_ANNUAL_FILINGS[NETFLIX_ANNUAL_FILINGS.length - 1];
export const NETFLIX_LATEST_QUARTERLY_FILING = NETFLIX_QUARTERLY_FILINGS[NETFLIX_QUARTERLY_FILINGS.length - 1];
`;
}

function annualFinancialsSource(rows) {
  return `export type NetflixAnnualFinancial = {
  fiscalYear: number;
  accessionNumber: string;
  filingDate: string;
  filingUrl: string;
  revenue: number | null;
  grossProfit: number | null;
  operatingIncome: number | null;
  netIncome: number | null;
  dilutedEps: number | null;
  operatingCashFlow: number | null;
  capitalExpenditures: number | null;
  freeCashFlow: number | null;
  cashAndEquivalents: number | null;
  currentAssets: number | null;
  totalAssets: number | null;
  currentLiabilities: number | null;
  totalLiabilities: number | null;
  longTermDebt: number | null;
  shareholderEquity: number | null;
  dilutedShares: number | null;
  grossMargin: number | null;
  operatingMargin: number | null;
  netMargin: number | null;
  freeCashFlowMargin: number | null;
  roe: number | null;
  source: string;
};

export const NETFLIX_ANNUAL_FINANCIALS_SOURCE_NOTE =
  "Generated from SEC XBRL company facts for CIK ${CIK}. FY2002-FY2008 require manual 10-K reconciliation because full-year duration facts are incomplete in the company facts endpoint. FY2025 per-share and share counts are split-adjusted as reported by SEC XBRL.";

export const NETFLIX_ANNUAL_FINANCIALS_COVERAGE = {
  xbrlCompleteFromFiscalYear: 2009,
  xbrlCompleteThroughFiscalYear: 2025,
  manualReconciliationNeededFiscalYears: [2002, 2003, 2004, 2005, 2006, 2007, 2008],
};

export const NETFLIX_ANNUAL_FINANCIALS: NetflixAnnualFinancial[] = ${JSON.stringify(rows, null, 2)};

export const NETFLIX_LATEST_ANNUAL_FINANCIAL = NETFLIX_ANNUAL_FINANCIALS[NETFLIX_ANNUAL_FINANCIALS.length - 1];
`;
}

async function main() {
  const submissions = await fetchJson(`https://data.sec.gov/submissions/CIK${CIK}.json`);
  const allRows = rowsFromSubmissionTable(submissions.filings.recent);

  for (const file of submissions.filings.files || []) {
    const shard = await fetchJson(`https://data.sec.gov/submissions/${file.name}`);
    allRows.push(...rowsFromSubmissionTable(shard));
  }

  const targetRows = allRows
    .filter((row) => TARGET_FORMS.has(row.form))
    .sort((a, b) => a.filingDate.localeCompare(b.filingDate));
  const registrationFilings = targetRows
    .filter((row) => row.form === "S-1" || row.form === "S-1/A")
    .map(cleanedFiling);
  const annualFilings = targetRows
    .filter((row) => row.form === "10-K" || row.form === "10-K/A")
    .map(cleanedFiling);
  const quarterlyFilings = targetRows
    .filter((row) => row.form === "10-Q" || row.form === "10-Q/A")
    .map(cleanedFiling);
  const companyFacts = await fetchJson(`https://data.sec.gov/api/xbrl/companyfacts/CIK${CIK}.json`);
  const annualFinancials = buildAnnualFinancials(companyFacts, annualFilings);

  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, "filings.ts"), filingsSource(registrationFilings, annualFilings, quarterlyFilings));
  await writeFile(path.join(outputDir, "annualFinancials.ts"), annualFinancialsSource(annualFinancials));

  console.log(
    `Updated Netflix SEC data: ${registrationFilings.length} registration filings, ${annualFilings.length} annual filings, ${quarterlyFilings.length} quarterly filings, ${annualFinancials.length} annual financial rows.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
