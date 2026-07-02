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

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "text/html,text/plain",
      "User-Agent": USER_AGENT,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#146;|&rsquo;/g, "'")
    .replace(/&#147;|&#148;|&ldquo;|&rdquo;/g, "\"")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;|&#8221;/g, "\"")
    .replace(/\s+/g, " ")
    .trim();
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

function parseMillionsValue(value) {
  const trimmed = String(value).trim();
  const isNegative = trimmed.startsWith("-") || trimmed.startsWith("(");
  const number = Number(trimmed.replace(/[(),-]/g, ""));
  return Number.isFinite(number) ? number * 1_000_000 * (isNegative ? -1 : 1) : null;
}

async function freeCashFlowRowsFromFiling(filing) {
  const text = htmlToText(await fetchText(filing.url));
  const start = text.indexOf(
    "The following table sets forth a reconciliation of net cash provided by operating activities to free cash flow",
  );
  if (start < 0) return [];

  const tableText = text.slice(start, start + 1800);
  const header = tableText.match(/Year ended March 31,\s*(\d{4})\s*(\d{4})\s*(\d{4})/);
  const operatingCashFlow = tableText.match(
    /Net cash provided by operating activities\s+(\(?-?[\d,]+\s*\)?)\s+(\(?-?[\d,]+\s*\)?)\s+(\(?-?[\d,]+\s*\)?)/,
  );
  const capitalExpenditures = tableText.match(
    /Less: Purchase of property and equipment[^)]*\)\s+(\(?-?[\d,]+\s*\)?)\s+(\(?-?[\d,]+\s*\)?)\s+(\(?-?[\d,]+\s*\)?)/,
  );
  const freeCashFlow = tableText.match(/Free cash flow\s+(\(?-?[\d,]+\s*\)?)\s+(\(?-?[\d,]+\s*\)?)\s+(\(?-?[\d,]+\s*\)?)/);

  if (!header || !operatingCashFlow || !freeCashFlow) return [];

  return [0, 1, 2].map((index) => ({
    fiscalYear: Number(header[index + 1]),
    operatingCashFlow: parseMillionsValue(operatingCashFlow[index + 1]),
    capitalExpenditures: capitalExpenditures ? Math.abs(parseMillionsValue(capitalExpenditures[index + 1]) ?? 0) : null,
    freeCashFlow: parseMillionsValue(freeCashFlow[index + 1]),
    sourceFilingYear: Number(filing.reportDate.slice(0, 4)),
  }));
}

async function buildFreeCashFlowMap(annualFilings) {
  const fcfMap = new Map();

  for (const filing of annualFilings.filter((item) => item.form === "20-F").slice(-6)) {
    for (const row of await freeCashFlowRowsFromFiling(filing)) {
      fcfMap.set(row.fiscalYear, row);
    }
  }

  return fcfMap;
}

function buildAnnualFinancials(companyFacts, annualFilings, freeCashFlowMap) {
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
    const disclosedFreeCashFlow = freeCashFlowMap.get(fiscalYear);
    const capitalExpenditures =
      disclosedFreeCashFlow?.capitalExpenditures ?? annualFact(companyFacts, "PaymentsToAcquireOtherPropertyPlantAndEquipment", fiscalYear);
    const freeCashFlow =
      disclosedFreeCashFlow?.freeCashFlow ??
      (operatingCashFlow != null && capitalExpenditures != null ? operatingCashFlow - Math.abs(capitalExpenditures) : null);
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
      operatingCashFlow: disclosedFreeCashFlow?.operatingCashFlow ?? operatingCashFlow,
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
      source: disclosedFreeCashFlow
        ? "SEC XBRL company facts and Alibaba Form 20-F; free cash flow from Alibaba non-GAAP reconciliation"
        : "SEC XBRL company facts and Alibaba Form 20-F",
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
  "FY2015-FY2026 are generated from SEC XBRL company facts for Alibaba Group Holding Limited, CIK ${CIK}, in RMB. Foreign-private-issuer disclosures differ from domestic 10-K/10-Q issuers. FY2021-FY2026 free cash flow is extracted from Alibaba's Form 20-F non-GAAP free cash flow reconciliation where available; earlier years use XBRL capex facts when consistently tagged.";

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
  const freeCashFlowMap = await buildFreeCashFlowMap(annualFilings);
  const annualFinancials = buildAnnualFinancials(companyFacts, annualFilings, freeCashFlowMap);

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
