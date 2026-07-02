import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CIK = "0001577552";
const CIK_NO_LEADING_ZEROES = "1577552";
const USER_AGENT = "Hobite Research contact@hobite.vercel.app";
const TARGET_FORMS = new Set(["F-1", "F-1/A", "20-F", "20-F/A", "6-K"]);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const outputDir = path.join(projectRoot, "app", "research", "alibaba-complete-fundamental-analysis");

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
    primaryDocDescription: row.primaryDocDescription || row.form,
    url: filingUrl(row),
  };
}

function unitRows(companyFacts, tag, unit = "CNY") {
  return companyFacts.facts?.["us-gaap"]?.[tag]?.units?.[unit] || [];
}

function latestValue(rows) {
  if (!rows.length) return null;
  return rows.sort((a, b) => String(a.filed).localeCompare(String(b.filed)) || String(a.end).localeCompare(String(b.end))).at(-1).val;
}

function annualFact(companyFacts, tag, fiscalYear, unit = "CNY") {
  return latestValue(
    unitRows(companyFacts, tag, unit).filter(
      (row) => row.fy === fiscalYear && row.fp === "FY" && (row.form === "20-F" || row.form === "20-F/A"),
    ),
  );
}

function instantFact(companyFacts, tag, fiscalYear, unit = "CNY") {
  return latestValue(
    unitRows(companyFacts, tag, unit).filter(
      (row) => row.fy === fiscalYear && (row.form === "20-F" || row.form === "20-F/A"),
    ),
  );
}

function percent(numerator, denominator) {
  if (numerator == null || denominator == null || denominator === 0) return null;
  return Number(((numerator / denominator) * 100).toFixed(1));
}

function buildAnnualFinancials(companyFacts, annualFilings) {
  const rows = [];

  for (let fiscalYear = 2015; fiscalYear <= 2026; fiscalYear += 1) {
    const filing = annualFilings.find((item) => item.form === "20-F" && item.reportDate === `${fiscalYear}-03-31`);
    const revenue = annualFact(companyFacts, "Revenues", fiscalYear);
    const costOfRevenue = annualFact(companyFacts, "CostOfRevenue", fiscalYear);
    const grossProfit = revenue != null && costOfRevenue != null ? revenue - costOfRevenue : null;
    const operatingIncome = annualFact(companyFacts, "OperatingIncomeLoss", fiscalYear);
    const netIncome = annualFact(companyFacts, "NetIncomeLoss", fiscalYear);
    const operatingCashFlow =
      annualFact(companyFacts, "NetCashProvidedByUsedInOperatingActivities", fiscalYear) ??
      annualFact(companyFacts, "NetCashProvidedByUsedInOperatingActivitiesContinuingOperations", fiscalYear);
    const capitalExpenditures = annualFact(companyFacts, "PaymentsToAcquireOtherPropertyPlantAndEquipment", fiscalYear);
    const freeCashFlow =
      operatingCashFlow != null && capitalExpenditures != null ? operatingCashFlow - Math.abs(capitalExpenditures) : null;
    const cashAndEquivalents = instantFact(companyFacts, "CashAndCashEquivalentsAtCarryingValue", fiscalYear);
    const totalDebt =
      (instantFact(companyFacts, "LongTermDebtNoncurrent", fiscalYear) ?? 0) +
      (instantFact(companyFacts, "DebtCurrent", fiscalYear) ?? 0) +
      (instantFact(companyFacts, "ConvertibleDebtNoncurrent", fiscalYear) ?? 0);
    const shareholderEquity = instantFact(companyFacts, "StockholdersEquity", fiscalYear);

    if (revenue == null && !filing) continue;

    rows.push({
      fiscalYear,
      accessionNumber: filing?.accessionNumber ?? "",
      filingDate: filing?.filingDate ?? "",
      filingUrl: filing?.url ?? "",
      revenue,
      costOfRevenue,
      grossProfit,
      operatingIncome,
      netIncome,
      dilutedEps: annualFact(companyFacts, "EarningsPerShareDiluted", fiscalYear, "CNY/shares"),
      operatingCashFlow,
      capitalExpenditures: capitalExpenditures == null ? null : Math.abs(capitalExpenditures),
      freeCashFlow,
      cashAndEquivalents,
      currentAssets: instantFact(companyFacts, "AssetsCurrent", fiscalYear),
      totalAssets: instantFact(companyFacts, "Assets", fiscalYear),
      currentLiabilities: instantFact(companyFacts, "LiabilitiesCurrent", fiscalYear),
      totalLiabilities: instantFact(companyFacts, "Liabilities", fiscalYear),
      totalDebt: totalDebt || null,
      shareholderEquity,
      dilutedShares: annualFact(companyFacts, "WeightedAverageNumberOfDilutedSharesOutstanding", fiscalYear, "shares"),
      grossMargin: percent(grossProfit, revenue),
      operatingMargin: percent(operatingIncome, revenue),
      netMargin: percent(netIncome, revenue),
      freeCashFlowMargin: percent(freeCashFlow, revenue),
      roe: percent(netIncome, shareholderEquity),
      source: "SEC XBRL company facts and Alibaba Form 20-F",
    });
  }

  return rows;
}

function filingsSource(registrationFilings, annualFilings, sixKFilings) {
  return `export type AlibabaFiling = {
  accessionNumber: string;
  form: string;
  filingDate: string;
  reportDate: string;
  primaryDocument: string;
  primaryDocDescription: string;
  url: string;
};

export const ALIBABA_FILING_SOURCE_NOTE =
  "Generated from the SEC company submissions index for Alibaba Group Holding Limited, CIK ${CIK}. Alibaba is a foreign private issuer, so annual reports are Form 20-F and interim/event filings are primarily Form 6-K.";

export const ALIBABA_REGISTRATION_FILINGS: AlibabaFiling[] = ${JSON.stringify(registrationFilings, null, 2)};

export const ALIBABA_ANNUAL_FILINGS: AlibabaFiling[] = ${JSON.stringify(annualFilings, null, 2)};

export const ALIBABA_SIX_K_FILINGS: AlibabaFiling[] = ${JSON.stringify(sixKFilings, null, 2)};

export const ALIBABA_CORE_FILINGS = [
  ...ALIBABA_REGISTRATION_FILINGS,
  ...ALIBABA_ANNUAL_FILINGS,
  ...ALIBABA_SIX_K_FILINGS,
];

export const ALIBABA_LATEST_ANNUAL_FILING = ALIBABA_ANNUAL_FILINGS.filter((filing) => filing.form === "20-F").at(-1)!;
export const ALIBABA_LATEST_SIX_K_FILING = ALIBABA_SIX_K_FILINGS.at(-1)!;
`;
}

function annualFinancialsSource(rows) {
  return `export type AlibabaAnnualFinancial = {
  fiscalYear: number;
  accessionNumber: string;
  filingDate: string;
  filingUrl: string;
  revenue: number | null;
  costOfRevenue: number | null;
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
  totalDebt: number | null;
  shareholderEquity: number | null;
  dilutedShares: number | null;
  grossMargin: number | null;
  operatingMargin: number | null;
  netMargin: number | null;
  freeCashFlowMargin: number | null;
  roe: number | null;
  source: string;
};

export const ALIBABA_ANNUAL_FINANCIALS_SOURCE_NOTE =
  "FY2015-FY2026 are generated from SEC XBRL company facts for Alibaba Group Holding Limited, CIK ${CIK}, in RMB. Foreign-private-issuer disclosures differ from domestic 10-K/10-Q issuers; free cash flow fields are populated where capex facts are available and may differ from Alibaba's non-GAAP FCF reconciliation.";

export const ALIBABA_ANNUAL_FINANCIALS_COVERAGE = {
  currency: "RMB",
  fromFiscalYear: ${rows[0]?.fiscalYear ?? "null"},
  throughFiscalYear: ${rows.at(-1)?.fiscalYear ?? "null"},
  latestAnnualReport: "${rows.at(-1)?.filingUrl ?? ""}",
};

export const ALIBABA_ANNUAL_FINANCIALS: AlibabaAnnualFinancial[] = ${JSON.stringify(rows, null, 2)};

export const ALIBABA_LATEST_ANNUAL_FINANCIAL = ALIBABA_ANNUAL_FINANCIALS[ALIBABA_ANNUAL_FINANCIALS.length - 1];
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
    .filter((row) => row.form === "F-1" || row.form === "F-1/A")
    .map(cleanedFiling);
  const annualFilings = targetRows
    .filter((row) => row.form === "20-F" || row.form === "20-F/A")
    .map(cleanedFiling);
  const sixKFilings = targetRows.filter((row) => row.form === "6-K").map(cleanedFiling);
  const companyFacts = await fetchJson(`https://data.sec.gov/api/xbrl/companyfacts/CIK${CIK}.json`);
  const annualFinancials = buildAnnualFinancials(companyFacts, annualFilings);

  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, "filings.ts"), filingsSource(registrationFilings, annualFilings, sixKFilings));
  await writeFile(path.join(outputDir, "annualFinancials.ts"), annualFinancialsSource(annualFinancials));

  console.log(
    `Updated Alibaba SEC data: ${registrationFilings.length} registration filings, ${annualFilings.length} annual filings, ${sixKFilings.length} 6-K filings, ${annualFinancials.length} annual financial rows.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
