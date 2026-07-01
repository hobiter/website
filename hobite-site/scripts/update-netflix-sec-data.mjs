import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CIK = "0001065280";
const CIK_NO_LEADING_ZEROES = "1065280";
const USER_AGENT = "Hobite Research contact@hobite.vercel.app";
const TARGET_FORMS = new Set(["S-1", "S-1/A", "10-K", "10-K/A", "10-Q", "10-Q/A"]);
const MANUAL_EARLY_ANNUAL_FINANCIALS = {
  2002: {
    revenue: 152_806_000,
    grossProfit: 74_670_000,
    operatingIncome: -10_673_000,
    netIncome: -20_948_000,
    dilutedEps: -0.74,
    operatingCashFlow: 40_114_000,
    capitalExpenditures: 2_751_000,
    cashAndEquivalents: 59_814_000,
    currentAssets: 107_075_000,
    totalAssets: 130_530_000,
    currentLiabilities: 40_426_000,
    totalLiabilities: 41_174_000,
    longTermDebt: null,
    shareholderEquity: 89_356_000,
    dilutedShares: 28_204_000,
  },
  2003: {
    revenue: 272_243_000,
    grossProfit: 123_883_000,
    operatingIncome: 4_472_000,
    netIncome: 6_512_000,
    dilutedEps: 0.1,
    operatingCashFlow: 89_792_000,
    capitalExpenditures: 8_872_000,
    cashAndEquivalents: 89_894_000,
    currentAssets: 138_946_000,
    totalAssets: 176_012_000,
    currentLiabilities: 63_019_000,
    totalLiabilities: 63_304_000,
    longTermDebt: null,
    shareholderEquity: 112_708_000,
    dilutedShares: 62_884_000,
  },
  2004: {
    revenue: 500_611_000,
    grossProfit: 168_899_000,
    operatingIncome: 19_354_000,
    netIncome: 21_595_000,
    dilutedEps: 0.33,
    operatingCashFlow: 145_269_000,
    capitalExpenditures: 15_720_000,
    cashAndEquivalents: 174_461_000,
    currentAssets: 187_346_000,
    totalAssets: 251_793_000,
    currentLiabilities: 94_910_000,
    totalLiabilities: 95_510_000,
    longTermDebt: null,
    shareholderEquity: 156_283_000,
    dilutedShares: 64_713_000,
  },
  2005: {
    revenue: 682_213_000,
    grossProfit: 216_438_000,
    operatingIncome: 2_989_000,
    netIncome: 42_027_000,
    dilutedEps: 0.64,
    operatingCashFlow: 157_507_000,
    capitalExpenditures: 27_653_000,
    cashAndEquivalents: 212_256_000,
    currentAssets: 243_691_000,
    totalAssets: 364_681_000,
    currentLiabilities: 137_587_000,
    totalLiabilities: 138_429_000,
    longTermDebt: null,
    shareholderEquity: 226_252_000,
    dilutedShares: 65_518_000,
  },
  2006: {
    revenue: 996_660_000,
    grossProfit: 369_675_000,
    operatingIncome: 65_218_000,
    netIncome: 48_839_000,
    dilutedEps: 0.71,
    operatingCashFlow: 248_190_000,
    capitalExpenditures: 27_333_000,
    cashAndEquivalents: 400_430_000,
    currentAssets: 428_418_000,
    totalAssets: 608_779_000,
    currentLiabilities: 193_447_000,
    totalLiabilities: 194_568_000,
    longTermDebt: null,
    shareholderEquity: 413_618_000,
    dilutedShares: 69_075_000,
  },
  2007: {
    revenue: 1_205_340_000,
    grossProfit: 419_172_000,
    operatingIncome: 91_773_000,
    netIncome: 66_608_000,
    dilutedEps: 0.97,
    operatingCashFlow: 277_424_000,
    capitalExpenditures: 44_256_000,
    cashAndEquivalents: 177_439_000,
    currentAssets: 432_423_000,
    totalAssets: 678_998_000,
    currentLiabilities: 208_905_000,
    totalLiabilities: 249_186_000,
    longTermDebt: null,
    shareholderEquity: 429_812_000,
    dilutedShares: 68_902_000,
  },
  2008: {
    revenue: 1_364_661_000,
    grossProfit: 454_427_000,
    operatingIncome: 121_506_000,
    netIncome: 83_026_000,
    dilutedEps: 1.32,
    operatingCashFlow: 284_037_000,
    capitalExpenditures: 43_790_000,
    cashAndEquivalents: 139_881_000,
    currentAssets: 361_447_000,
    totalAssets: 617_946_000,
    currentLiabilities: 216_017_000,
    totalLiabilities: 270_791_000,
    longTermDebt: null,
    shareholderEquity: 347_155_000,
    dilutedShares: 62_836_000,
  },
};

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
    (row) => row.form === "10-K" && row.fp === "FY" && isFullYearFact(row, year),
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
    const manual = MANUAL_EARLY_ANNUAL_FINANCIALS[year];
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
      revenue: manual?.revenue ?? revenue,
      grossProfit: manual?.grossProfit ?? grossProfit,
      operatingIncome: manual?.operatingIncome ?? operatingIncome,
      netIncome: manual?.netIncome ?? netIncome,
      dilutedEps: manual?.dilutedEps ?? durationFact(companyFacts, "EarningsPerShareDiluted", year, "USD/shares"),
      operatingCashFlow: manual?.operatingCashFlow ?? operatingCashFlow,
      capitalExpenditures: manual?.capitalExpenditures ?? capitalExpenditures,
      freeCashFlow:
        manual?.operatingCashFlow != null && manual?.capitalExpenditures != null
          ? manual.operatingCashFlow - manual.capitalExpenditures
          : freeCashFlow,
      cashAndEquivalents:
        manual?.cashAndEquivalents ??
        instantFact(companyFacts, "CashAndCashEquivalentsAtCarryingValue", year) ??
        instantFact(companyFacts, "CashCashEquivalentsAndShortTermInvestments", year),
      currentAssets: manual?.currentAssets ?? instantFact(companyFacts, "AssetsCurrent", year),
      totalAssets: manual?.totalAssets ?? instantFact(companyFacts, "Assets", year),
      currentLiabilities: manual?.currentLiabilities ?? instantFact(companyFacts, "LiabilitiesCurrent", year),
      totalLiabilities: manual?.totalLiabilities ?? instantFact(companyFacts, "Liabilities", year),
      longTermDebt:
        manual?.longTermDebt ??
        instantFact(companyFacts, "LongTermDebtNoncurrent", year) ??
        instantFact(companyFacts, "LongTermDebt", year),
      shareholderEquity: manual?.shareholderEquity ?? shareholderEquity,
      dilutedShares:
        manual?.dilutedShares ??
        durationFact(companyFacts, "WeightedAverageNumberOfDilutedSharesOutstanding", year, "shares"),
      grossMargin: percent(manual?.grossProfit ?? grossProfit, manual?.revenue ?? revenue),
      operatingMargin: percent(manual?.operatingIncome ?? operatingIncome, manual?.revenue ?? revenue),
      netMargin: percent(manual?.netIncome ?? netIncome, manual?.revenue ?? revenue),
      freeCashFlowMargin: percent(
        manual?.operatingCashFlow != null && manual?.capitalExpenditures != null
          ? manual.operatingCashFlow - manual.capitalExpenditures
          : freeCashFlow,
        manual?.revenue ?? revenue,
      ),
      roe: percent(manual?.netIncome ?? netIncome, manual?.shareholderEquity ?? shareholderEquity),
      source: manual
        ? "Manual audited 10-K statement table extraction; pending second-pass source audit"
        : "SEC XBRL company facts; pending 10-K table reconciliation",
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
  "FY2002-FY2008 are manually extracted from audited 10-K statement tables because complete early-year duration facts are not available in the SEC company facts endpoint. FY2009-FY2025 are generated from SEC XBRL company facts for CIK ${CIK}. FY2025 per-share and share counts are split-adjusted as reported by SEC XBRL.";

export const NETFLIX_ANNUAL_FINANCIALS_COVERAGE = {
  xbrlCompleteFromFiscalYear: 2009,
  xbrlCompleteThroughFiscalYear: 2025,
  manualStatementExtractionFiscalYears: [2002, 2003, 2004, 2005, 2006, 2007, 2008],
  secondPassAuditNeededFiscalYears: [2002, 2003, 2004, 2005, 2006, 2007, 2008],
};

export const NETFLIX_ANNUAL_FINANCIALS: NetflixAnnualFinancial[] = ${JSON.stringify(rows, null, 2)};

export const NETFLIX_LATEST_ANNUAL_FINANCIAL = NETFLIX_ANNUAL_FINANCIALS[NETFLIX_ANNUAL_FINANCIALS.length - 1];
`;
}

function quarterEnd(year, quarter) {
  return `${year}-${quarter === 1 ? "03-31" : quarter === 2 ? "06-30" : quarter === 3 ? "09-30" : "12-31"}`;
}

function quarterLabel(year, quarter) {
  return `${year} Q${quarter}`;
}

function quarterlyFrameFact(companyFacts, tag, year, quarter, unit = "USD") {
  const frame = `CY${year}Q${quarter}`;
  const rows = unitRows(companyFacts, tag, unit).filter((row) => row.frame === frame);

  return latestValue(rows);
}

function firstThreeQuarterSum(companyFacts, tag, year, unit = "USD") {
  let total = 0;

  for (const quarter of [1, 2, 3]) {
    const value = quarterlyFrameFact(companyFacts, tag, year, quarter, unit);
    if (value == null) return null;
    total += value;
  }

  return total;
}

function quarterlyFlowFact(companyFacts, tag, year, quarter, unit = "USD") {
  if (quarter < 4) {
    return {
      value: quarterlyFrameFact(companyFacts, tag, year, quarter, unit),
      source: "SEC XBRL quarterly frame",
    };
  }

  const annual = durationFact(companyFacts, tag, year, unit);
  const firstThree = firstThreeQuarterSum(companyFacts, tag, year, unit);

  return {
    value: annual != null && firstThree != null ? annual - firstThree : null,
    source: "Derived from SEC XBRL annual fact less Q1-Q3 quarterly frames",
  };
}

function buildQuarterlyFinancials(companyFacts, annualFilings, quarterlyFilings) {
  const rows = [];

  for (let year = 2009; year <= 2026; year += 1) {
    for (let quarter = 1; quarter <= 4; quarter += 1) {
      if (year === 2026 && quarter > 1) continue;

      const reportDate = quarterEnd(year, quarter);
      const filing =
        quarter === 4
          ? annualFilings.find((item) => item.reportDate === `${year}-12-31` && item.form === "10-K")
          : quarterlyFilings.find((item) => item.reportDate === reportDate && item.form === "10-Q");
      const revenue = quarterlyFlowFact(companyFacts, "Revenues", year, quarter);
      const operatingIncome = quarterlyFlowFact(companyFacts, "OperatingIncomeLoss", year, quarter);
      const netIncome = quarterlyFlowFact(companyFacts, "NetIncomeLoss", year, quarter);
      const operatingCashFlow = quarterlyFlowFact(
        companyFacts,
        "NetCashProvidedByUsedInOperatingActivities",
        year,
        quarter,
      );
      const capitalExpenditures = quarterlyFlowFact(
        companyFacts,
        "PaymentsToAcquirePropertyPlantAndEquipment",
        year,
        quarter,
      );
      const freeCashFlow =
        operatingCashFlow.value != null && capitalExpenditures.value != null
          ? operatingCashFlow.value - capitalExpenditures.value
          : null;
      const dilutedEps =
        quarter < 4 ? quarterlyFrameFact(companyFacts, "EarningsPerShareDiluted", year, quarter, "USD/shares") : null;

      if (revenue.value == null) continue;

      rows.push({
        period: quarterLabel(year, quarter),
        fiscalYear: year,
        fiscalQuarter: quarter,
        reportDate,
        accessionNumber: filing?.accessionNumber ?? "",
        filingDate: filing?.filingDate ?? "",
        filingUrl: filing?.url ?? "",
        revenue: revenue.value,
        operatingIncome: operatingIncome.value,
        operatingMargin: percent(operatingIncome.value, revenue.value),
        netIncome: netIncome.value,
        dilutedEps,
        operatingCashFlow: operatingCashFlow.value,
        capitalExpenditures: capitalExpenditures.value,
        freeCashFlow,
        freeCashFlowMargin: percent(freeCashFlow, revenue.value),
        source: quarter === 4 ? revenue.source : "SEC XBRL quarterly frame",
        epsSource:
          quarter < 4
            ? "SEC XBRL quarterly frame"
            : "Not derived; Q4 diluted EPS requires share-count reconciliation",
      });
    }
  }

  return rows;
}

function quarterlyFinancialsSource(rows) {
  return `export type NetflixQuarterlyFinancial = {
  period: string;
  fiscalYear: number;
  fiscalQuarter: number;
  reportDate: string;
  accessionNumber: string;
  filingDate: string;
  filingUrl: string;
  revenue: number | null;
  operatingIncome: number | null;
  operatingMargin: number | null;
  netIncome: number | null;
  dilutedEps: number | null;
  operatingCashFlow: number | null;
  capitalExpenditures: number | null;
  freeCashFlow: number | null;
  freeCashFlowMargin: number | null;
  source: string;
  epsSource: string;
};

export const NETFLIX_QUARTERLY_FINANCIALS_SOURCE_NOTE =
  "Generated from SEC XBRL company facts for CIK ${CIK}. Q1-Q3 rows use SEC quarterly frames, including later comparative frames when available. Q4 flow metrics are derived from annual full-year facts less Q1-Q3 quarterly frames; Q4 diluted EPS is left null until weighted-share reconciliation.";

export const NETFLIX_QUARTERLY_FINANCIALS_COVERAGE = {
  fromPeriod: "${rows[0]?.period}",
  throughPeriod: "${rows.at(-1)?.period}",
  directQuarterlyFramesStartPeriod: "2009 Q1",
  q4Derivation: "Annual full-year facts less Q1-Q3 quarterly frames",
};

export const NETFLIX_QUARTERLY_FINANCIALS: NetflixQuarterlyFinancial[] = ${JSON.stringify(rows, null, 2)};

export const NETFLIX_LATEST_QUARTERLY_FINANCIAL = NETFLIX_QUARTERLY_FINANCIALS[NETFLIX_QUARTERLY_FINANCIALS.length - 1];
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
  const quarterlyFinancials = buildQuarterlyFinancials(companyFacts, annualFilings, quarterlyFilings);

  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, "filings.ts"), filingsSource(registrationFilings, annualFilings, quarterlyFilings));
  await writeFile(path.join(outputDir, "annualFinancials.ts"), annualFinancialsSource(annualFinancials));
  await writeFile(path.join(outputDir, "quarterlyFinancials.ts"), quarterlyFinancialsSource(quarterlyFinancials));

  console.log(
    `Updated Netflix SEC data: ${registrationFilings.length} registration filings, ${annualFilings.length} annual filings, ${quarterlyFilings.length} quarterly filings, ${annualFinancials.length} annual financial rows, ${quarterlyFinancials.length} quarterly financial rows.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
