import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CIK = "0001067983";
const CIK_NO_LEADING_ZEROES = "1067983";
const USER_AGENT = "Hobite Research contact@hobite.vercel.app";
const TARGET_FORMS = new Set(["S-3", "S-3/A", "S-3ASR", "S-4", "S-4/A", "10-K", "10-K/A", "10-Q", "10-Q/A"]);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const outputDir = path.join(projectRoot, "app", "research", "berkshire-hathaway-complete-fundamental-analysis");

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: { Accept: "application/json", "User-Agent": USER_AGENT },
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
  }));
}

function filingUrl(row) {
  const accessionPath = row.accessionNumber.replaceAll("-", "");
  return `https://www.sec.gov/Archives/edgar/data/${CIK_NO_LEADING_ZEROES}/${accessionPath}/${row.primaryDocument}`;
}

function cleanedFiling(row) {
  return { ...row, url: filingUrl(row) };
}

function unitRows(companyFacts, tag, unit = "USD") {
  return companyFacts.facts?.["us-gaap"]?.[tag]?.units?.[unit] || [];
}

function earliestFiled(rows) {
  return [...rows].sort((a, b) => String(a.filed).localeCompare(String(b.filed)))[0] ?? null;
}

function annualFlow(companyFacts, tag, year) {
  const rows = unitRows(companyFacts, tag).filter((row) => {
    if (row.form !== "10-K" || !row.start || row.end !== `${year}-12-31`) return false;
    const durationDays = (new Date(row.end).getTime() - new Date(row.start).getTime()) / 86_400_000;
    return durationDays > 300 && durationDays < 380;
  });

  return rows.find((row) => row.frame === `CY${year}`)?.val ?? earliestFiled(rows)?.val ?? null;
}

function annualInstant(companyFacts, tag, year) {
  const rows = unitRows(companyFacts, tag).filter(
    (row) => row.form === "10-K" && !row.start && row.end === `${year}-12-31`,
  );

  return rows.find((row) => row.frame === `CY${year}Q4I`)?.val ?? earliestFiled(rows)?.val ?? null;
}

function quarterlyIncome(companyFacts, tag, year, quarter) {
  if (quarter === 4) {
    const fullYear = annualFlow(companyFacts, tag, year);
    const firstThreeQuarters = [1, 2, 3].map((item) => quarterlyIncome(companyFacts, tag, year, item));
    if (fullYear == null || firstThreeQuarters.some((value) => value == null)) return null;
    return fullYear - firstThreeQuarters.reduce((total, value) => total + value, 0);
  }

  const rows = unitRows(companyFacts, tag).filter(
    (row) => row.form === "10-Q" && row.frame === `CY${year}Q${quarter}`,
  );
  return [...rows].sort((a, b) => String(b.filed).localeCompare(String(a.filed)))[0]?.val ?? null;
}

function yearToDateFlow(companyFacts, tag, year, quarter) {
  const end = { 1: "03-31", 2: "06-30", 3: "09-30" }[quarter];
  if (!end) return null;
  const rows = unitRows(companyFacts, tag).filter(
    (row) => row.form === "10-Q" && row.start === `${year}-01-01` && row.end === `${year}-${end}`,
  );
  return earliestFiled(rows)?.val ?? null;
}

function quarterlyCashFlow(companyFacts, tag, year, quarter) {
  if (quarter === 1) return yearToDateFlow(companyFacts, tag, year, 1);
  if (quarter === 2 || quarter === 3) {
    const current = yearToDateFlow(companyFacts, tag, year, quarter);
    const prior = yearToDateFlow(companyFacts, tag, year, quarter - 1);
    return current != null && prior != null ? current - prior : null;
  }

  const fullYear = annualFlow(companyFacts, tag, year);
  const nineMonths = yearToDateFlow(companyFacts, tag, year, 3);
  return fullYear != null && nineMonths != null ? fullYear - nineMonths : null;
}

function percent(numerator, denominator) {
  if (numerator == null || denominator == null || denominator === 0) return null;
  return Number(((numerator / denominator) * 100).toFixed(1));
}

function buildAnnualFinancials(companyFacts, annualFilings) {
  return Array.from({ length: 10 }, (_, index) => 2016 + index).map((fiscalYear) => {
    const filing = annualFilings.find((item) => item.reportDate === `${fiscalYear}-12-31` && item.form === "10-K");
    const revenue = annualFlow(companyFacts, "Revenues", fiscalYear);
    const preTaxEarnings = annualFlow(
      companyFacts,
      "IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest",
      fiscalYear,
    );
    const netIncome = annualFlow(companyFacts, "NetIncomeLoss", fiscalYear);
    const operatingCashFlow = annualFlow(companyFacts, "NetCashProvidedByUsedInOperatingActivities", fiscalYear);
    const capitalExpenditures = annualFlow(companyFacts, "PaymentsToAcquirePropertyPlantAndEquipment", fiscalYear);
    const freeCashFlow =
      operatingCashFlow != null && capitalExpenditures != null ? operatingCashFlow - capitalExpenditures : null;
    const shareholdersEquity = annualInstant(companyFacts, "StockholdersEquity", fiscalYear);

    return {
      fiscalYear,
      accessionNumber: filing?.accessionNumber ?? "",
      filingDate: filing?.filingDate ?? "",
      filingUrl: filing?.url ?? "",
      revenue,
      preTaxEarnings,
      netIncome,
      operatingCashFlow,
      capitalExpenditures,
      freeCashFlow,
      totalAssets: annualInstant(companyFacts, "Assets", fiscalYear),
      totalLiabilities: annualInstant(companyFacts, "Liabilities", fiscalYear),
      shareholdersEquity,
      cashAndRestrictedCash:
        annualInstant(companyFacts, "CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents", fiscalYear) ??
        annualInstant(companyFacts, "CashAndCashEquivalentsAtCarryingValue", fiscalYear),
      equitySecurities: annualInstant(companyFacts, "EquitySecuritiesFvNi", fiscalYear),
      preTaxMargin: percent(preTaxEarnings, revenue),
      netMargin: percent(netIncome, revenue),
      freeCashFlowMargin: percent(freeCashFlow, revenue),
      gaapRoe: percent(netIncome, shareholdersEquity),
      source: "SEC XBRL company facts and Berkshire Hathaway Form 10-K",
    };
  });
}

function buildQuarterlyFinancials(companyFacts, annualFilings, quarterlyFilings) {
  const rows = [];

  for (let year = 2024; year <= 2026; year += 1) {
    for (let quarter = 1; quarter <= 4; quarter += 1) {
      if (year === 2026 && quarter > 2) continue;
      const reportDate = `${year}-${{ 1: "03-31", 2: "06-30", 3: "09-30", 4: "12-31" }[quarter]}`;
      const filing =
        quarter === 4
          ? annualFilings.find((item) => item.reportDate === reportDate && item.form === "10-K")
          : quarterlyFilings.find((item) => item.reportDate === reportDate && item.form === "10-Q");
      const revenue = quarterlyIncome(companyFacts, "Revenues", year, quarter);
      const preTaxEarnings = quarterlyIncome(
        companyFacts,
        "IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest",
        year,
        quarter,
      );
      const netIncome = quarterlyIncome(companyFacts, "NetIncomeLoss", year, quarter);
      const operatingCashFlow = quarterlyCashFlow(
        companyFacts,
        "NetCashProvidedByUsedInOperatingActivities",
        year,
        quarter,
      );
      const capitalExpenditures = quarterlyCashFlow(
        companyFacts,
        "PaymentsToAcquirePropertyPlantAndEquipment",
        year,
        quarter,
      );
      const freeCashFlow =
        operatingCashFlow != null && capitalExpenditures != null ? operatingCashFlow - capitalExpenditures : null;

      rows.push({
        period: `${year} Q${quarter}`,
        fiscalYear: year,
        fiscalQuarter: quarter,
        reportDate,
        filingUrl: filing?.url ?? "",
        revenue,
        preTaxEarnings,
        netIncome,
        operatingCashFlow,
        capitalExpenditures,
        freeCashFlow,
        preTaxMargin: percent(preTaxEarnings, revenue),
        netMargin: percent(netIncome, revenue),
        freeCashFlowMargin: percent(freeCashFlow, revenue),
        derivedFourthQuarter: quarter === 4,
      });
    }
  }

  return rows;
}

function filingsSource(registrationFilings, annualFilings, quarterlyFilings) {
  return `export type BerkshireFiling = {
  accessionNumber: string;
  form: string;
  filingDate: string;
  reportDate: string;
  primaryDocument: string;
  url: string;
};

export const BERKSHIRE_FILING_SOURCE_NOTE =
  "Generated from the SEC submissions index for Berkshire Hathaway Inc., CIK ${CIK}. Berkshire predates modern EDGAR registration history; the registration inventory therefore focuses on available S-3 and S-4 filings.";

export const BERKSHIRE_REGISTRATION_FILINGS: BerkshireFiling[] = ${JSON.stringify(registrationFilings, null, 2)};
export const BERKSHIRE_ANNUAL_FILINGS: BerkshireFiling[] = ${JSON.stringify(annualFilings, null, 2)};
export const BERKSHIRE_QUARTERLY_FILINGS: BerkshireFiling[] = ${JSON.stringify(quarterlyFilings, null, 2)};

export const BERKSHIRE_CORE_FILINGS = [
  ...BERKSHIRE_REGISTRATION_FILINGS,
  ...BERKSHIRE_ANNUAL_FILINGS,
  ...BERKSHIRE_QUARTERLY_FILINGS,
];

export const BERKSHIRE_LATEST_ANNUAL_FILING = BERKSHIRE_ANNUAL_FILINGS.filter((filing) => filing.form === "10-K").at(-1)!;
export const BERKSHIRE_LATEST_QUARTERLY_FILING = BERKSHIRE_QUARTERLY_FILINGS.filter((filing) => filing.form === "10-Q").at(-1)!;
`;
}

function annualFinancialsSource(rows) {
  return `export type BerkshireAnnualFinancial = {
  fiscalYear: number;
  accessionNumber: string;
  filingDate: string;
  filingUrl: string;
  revenue: number | null;
  preTaxEarnings: number | null;
  netIncome: number | null;
  operatingCashFlow: number | null;
  capitalExpenditures: number | null;
  freeCashFlow: number | null;
  totalAssets: number | null;
  totalLiabilities: number | null;
  shareholdersEquity: number | null;
  cashAndRestrictedCash: number | null;
  equitySecurities: number | null;
  preTaxMargin: number | null;
  netMargin: number | null;
  freeCashFlowMargin: number | null;
  gaapRoe: number | null;
  source: string;
};

export const BERKSHIRE_ANNUAL_FINANCIALS_SOURCE_NOTE =
  "FY2016-FY2025 are generated from SEC XBRL company facts for Berkshire Hathaway Inc., CIK ${CIK}, in USD. GAAP net income and margins include unrealized equity-security gains and losses and should not be treated as Berkshire's recurring operating performance. Free cash flow is a mechanical OCF-minus-capex measure, not Berkshire's reported operating earnings.";

export const BERKSHIRE_ANNUAL_FINANCIALS_COVERAGE = {
  currency: "USD",
  fromFiscalYear: ${rows[0]?.fiscalYear ?? "null"},
  throughFiscalYear: ${rows.at(-1)?.fiscalYear ?? "null"},
  latestAnnualReport: "${rows.at(-1)?.filingUrl ?? ""}",
};

export const BERKSHIRE_ANNUAL_FINANCIALS: BerkshireAnnualFinancial[] = ${JSON.stringify(rows, null, 2)};
export const BERKSHIRE_LATEST_ANNUAL_FINANCIAL = BERKSHIRE_ANNUAL_FINANCIALS[BERKSHIRE_ANNUAL_FINANCIALS.length - 1];
`;
}

function quarterlyFinancialsSource(rows) {
  return `export type BerkshireQuarterlyFinancial = {
  period: string;
  fiscalYear: number;
  fiscalQuarter: number;
  reportDate: string;
  filingUrl: string;
  revenue: number | null;
  preTaxEarnings: number | null;
  netIncome: number | null;
  operatingCashFlow: number | null;
  capitalExpenditures: number | null;
  freeCashFlow: number | null;
  preTaxMargin: number | null;
  netMargin: number | null;
  freeCashFlowMargin: number | null;
  derivedFourthQuarter: boolean;
};

export const BERKSHIRE_QUARTERLY_FINANCIALS_SOURCE_NOTE =
  "Q1 2024-Q2 2026 are generated from SEC XBRL company facts. Q4 income-statement and cash-flow values are derived as full-year minus the first three quarters. Quarterly GAAP earnings include mark-to-market investment gains and losses.";

export const BERKSHIRE_QUARTERLY_FINANCIALS = ${JSON.stringify(rows, null, 2)} satisfies BerkshireQuarterlyFinancial[];
export const BERKSHIRE_LATEST_QUARTERLY_FINANCIAL = BERKSHIRE_QUARTERLY_FINANCIALS[BERKSHIRE_QUARTERLY_FINANCIALS.length - 1];
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
    .filter((row) => ["S-3", "S-3/A", "S-3ASR", "S-4", "S-4/A"].includes(row.form))
    .slice(-8)
    .map(cleanedFiling);
  const annualFilings = targetRows
    .filter((row) => ["10-K", "10-K/A"].includes(row.form) && Number(row.reportDate.slice(0, 4)) >= 2016)
    .map(cleanedFiling);
  const quarterlyFilings = targetRows
    .filter((row) => ["10-Q", "10-Q/A"].includes(row.form) && Number(row.reportDate.slice(0, 4)) >= 2023)
    .map(cleanedFiling);
  const companyFacts = await fetchJson(`https://data.sec.gov/api/xbrl/companyfacts/CIK${CIK}.json`);
  const annualFinancials = buildAnnualFinancials(companyFacts, annualFilings);
  const quarterlyFinancials = buildQuarterlyFinancials(companyFacts, annualFilings, quarterlyFilings);

  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, "filings.ts"), filingsSource(registrationFilings, annualFilings, quarterlyFilings.slice(-12)));
  await writeFile(path.join(outputDir, "annualFinancials.ts"), annualFinancialsSource(annualFinancials));
  await writeFile(path.join(outputDir, "quarterlyFinancials.ts"), quarterlyFinancialsSource(quarterlyFinancials));

  console.log(
    `Updated Berkshire SEC data: ${annualFilings.length} annual filings, ${quarterlyFilings.length} quarterly filings, ${annualFinancials.length} annual rows, ${quarterlyFinancials.length} quarterly rows.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
