import { mkdir, writeFile } from "node:fs/promises";
import { XMLParser } from "fast-xml-parser";

const cutoff = "2026-10-04";
const root = new URL(
  "../app/research/eli-lilly-complete-fundamental-analysis/",
  import.meta.url,
);
const headers = { "User-Agent": "Hobite Research contact@hobite.vercel.app" };
async function json(url) {
  const r = await fetch(url, { headers });
  if (!r.ok) throw new Error(`${r.status}: ${url}`);
  return r.json();
}
const secUrl = (a, doc) =>
  `https://www.sec.gov/Archives/edgar/data/59478/${a.replaceAll("-", "")}/${doc}`;
const submissionRows = (r) =>
  r.accessionNumber.map((a, i) => ({
    accessionNumber: a,
    form: r.form[i],
    filed: r.filingDate[i],
    end: r.reportDate[i],
    source: secUrl(a, r.primaryDocument[i]),
  }));
const tags = {
  revenue: [
    "Revenues",
    "SalesRevenueNet",
    "RevenueFromContractWithCustomerExcludingAssessedTax",
  ],
  costOfSales: [
    "CostOfRevenue",
    "CostOfGoodsAndServicesSold",
    "CostOfGoodsSold",
  ],
  operatingIncome: ["OperatingIncomeLoss"],
  netIncome: ["NetIncomeLoss"],
  dilutedEps: ["EarningsPerShareDiluted", "EarningsPerShareBasicAndDiluted"],
  dilutedShares: ["WeightedAverageNumberOfDilutedSharesOutstanding"],
  operatingCashFlow: [
    "NetCashProvidedByUsedInOperatingActivities",
    "NetCashProvidedByUsedInOperatingActivitiesContinuingOperations",
  ],
  capex: [
    "PaymentsToAcquireOtherPropertyPlantAndEquipment",
    "PaymentsToAcquirePropertyPlantAndEquipment",
    "PaymentsForProceedsFromProductiveAssets",
  ],
  depreciation: [
    "DepreciationDepletionAndAmortization",
    "DepreciationAndAmortization",
  ],
  otherDa: ["OtherDepreciationAndAmortization", "Depreciation"],
  acquiredAmortization: ["AmortizationOfIntangibleAssets"],
  research: [
    "ResearchAndDevelopmentExpenseExcludingAcquiredInProcessCost",
    "ResearchAndDevelopmentExpense",
  ],
  marketing: ["SellingGeneralAndAdministrativeExpense"],
  iprd: [
    "ResearchAndDevelopmentAssetAcquiredOtherThanThroughBusinessCombinationWrittenOff",
  ],
  specialCharges: ["RestructuringSettlementAndImpairmentProvisions"],
  iprdCash: ["PaymentsToAcquireInProcessResearchAndDevelopment"],
  acquisitionCash: [
    "OtherPaymentsToAcquireBusinesses",
    "PaymentsToAcquireBusinessesNetOfCashAcquired",
  ],
  dividends: ["PaymentsOfDividends", "PaymentsOfDividendsCommonStock"],
  buybacks: ["PaymentsForRepurchaseOfCommonStock"],
  stockComp: ["ShareBasedCompensation"],
  cash: ["CashAndCashEquivalentsAtCarryingValue"],
  securities: [
    "ShortTermInvestments",
    "AvailableForSaleSecuritiesCurrent",
    "MarketableSecuritiesCurrent",
  ],
  assets: ["Assets"],
  liabilities: ["Liabilities"],
  equity: ["StockholdersEquity"],
  totalEquity: [
    "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
    "StockholdersEquity",
  ],
  debtCurrent: ["DebtCurrent", "LongTermDebtCurrent"],
  debtNoncurrent: ["LongTermDebtNoncurrent", "LongTermDebt"],
  reportedDebt: ["DebtLongtermAndShorttermCombinedAmount"],
  goodwill: ["Goodwill"],
  intangibles: ["IntangibleAssetsNetExcludingGoodwill"],
  commitments: ["UnrecordedUnconditionalPurchaseObligationBalanceSheetAmount"],
  inventory: ["InventoryNet"],
  receivables: ["AccountsReceivableNetCurrent"],
  ppe: ["PropertyPlantAndEquipmentNet"],
  spotShares: ["CommonStockSharesOutstanding"],
  issuedShares: ["CommonStockSharesIssued"],
  trustShares: ["CommonStockSharesHeldInEmployeeTrustShares"],
};
const flow = [
  "revenue",
  "costOfSales",
  "operatingIncome",
  "netIncome",
  "dilutedEps",
  "dilutedShares",
  "operatingCashFlow",
  "capex",
  "depreciation",
  "otherDa",
  "acquiredAmortization",
  "research",
  "marketing",
  "iprd",
  "specialCharges",
  "iprdCash",
  "acquisitionCash",
  "dividends",
  "buybacks",
  "stockComp",
];
const instants = Object.keys(tags).filter((k) => !flow.includes(k));
const days = (r) =>
  r.start ? (Date.parse(r.end) - Date.parse(r.start)) / 86400000 : 0;
const submissions = await json(
  "https://data.sec.gov/submissions/CIK0000059478.json",
);
const all = submissionRows(submissions.filings.recent);
for (const s of submissions.filings.files ?? [])
  all.push(
    ...submissionRows(await json(`https://data.sec.gov/submissions/${s.name}`)),
  );
const filings = [
  ...new Map(
    all
      .filter(
        (r) => r.filed <= cutoff && /^(10-K|10-Q|8-K|S-1)(\/A)?$/.test(r.form),
      )
      .map((r) => [r.accessionNumber, r]),
  ).values(),
].sort((a, b) => a.filed.localeCompare(b.filed));
const company = await json(
  "https://data.sec.gov/api/xbrl/companyfacts/CIK0000059478.json",
);
function fact(key, end, min = 0, max = 0, accession) {
  const unit =
    key === "dilutedEps"
      ? "USD/shares"
      : ["dilutedShares", "spotShares", "issuedShares", "trustShares"].includes(
            key,
          )
        ? "shares"
        : "USD";
  for (const tag of tags[key]) {
    const candidates = (
      company.facts["us-gaap"][tag]?.units[unit] ?? []
    ).filter(
      (r) =>
        r.filed <= cutoff &&
        ["10-K", "10-Q"].includes(r.form) &&
        (!accession || r.accn === accession) &&
        r.end === end &&
        (min ? days(r) >= min && days(r) <= max : !r.start),
    );
    candidates.sort((a, b) => b.filed.localeCompare(a.filed));
    if (candidates.length) {
      const r = candidates[0];
      const f = filings.find((f) => f.accessionNumber === r.accn);
      return {
        value: r.val,
        provenance: {
          tag,
          unit,
          start: r.start ?? null,
          end: r.end,
          filed: r.filed,
          source:
            f?.source ??
            `https://www.sec.gov/Archives/edgar/data/59478/${r.accn.replaceAll("-", "")}/`,
        },
      };
    }
  }
  return { value: null, provenance: null };
}
const ratio = (a, b) => (a != null && b ? (a / b) * 100 : null);
const xmlCache = new Map();
const parser = new XMLParser({ ignoreAttributes: false, parseTagValue: false });
const array = (v) => (v == null ? [] : Array.isArray(v) ? v : [v]);
async function xmlFacts(f) {
  if (xmlCache.has(f.accessionNumber)) return xmlCache.get(f.accessionNumber);
  const base = secUrl(f.accessionNumber, "");
  const index = await json(base + "index.json");
  const file = index.directory.item.find(
    (v) =>
      /^lly-?\d.*\.xml$/.test(v.name) &&
      !/(?:_cal|_def|_lab|_pre)\.xml$/.test(v.name),
  );
  if (!file) throw new Error(`No structured instance ${f.source}`);
  const response = await fetch(base + file.name, { headers });
  if (!response.ok)
    throw new Error(`Instance ${response.status}: ${base + file.name}`);
  const doc = parser.parse(await response.text());
  const x = doc.xbrl ?? doc["xbrli:xbrl"];
  const contexts = new Map(
    array(x.context ?? x["xbrli:context"]).map((c) => [c["@_id"], c]),
  );
  const units = new Map(
    array(x.unit ?? x["xbrli:unit"]).map((u) => [
      u["@_id"],
      u.measure ?? u["xbrli:measure"],
    ]),
  );
  const records = [];
  for (const tag of [
    "lly:AcquiredInProcessResearchAndDevelopment",
    "lly:PurchaseOfInProcessResearchAndDevelopment",
    "lly:PurchasesOfInProcessResearchAndDevelopment",
    "lly:AssetImpairmentsRestructuringAndOtherSpecialCharges",
  ]) {
    for (const v of array(x[tag])) {
      const c = contexts.get(v["@_contextRef"]),
        unit = units.get(v["@_unitRef"]);
      const entity = c?.entity ?? c?.["xbrli:entity"];
      if (
        !c ||
        entity?.segment ||
        entity?.["xbrli:segment"] ||
        c.scenario ||
        c["xbrli:scenario"] ||
        unit !== "iso4217:USD" ||
        v["@_xsi:nil"] === "true"
      )
        continue;
      const p = c.period ?? c["xbrli:period"];
      if (!p) continue;
      records.push({
        tag,
        start: p.startDate ?? p["xbrli:startDate"],
        end: p.endDate ?? p["xbrli:endDate"],
        value: Number(v["#text"]),
        source: base + file.name,
      });
    }
  }
  xmlCache.set(f.accessionNumber, records);
  return records;
}
async function xmlFact(key, f, min, max) {
  const candidates = {
    iprd: ["lly:AcquiredInProcessResearchAndDevelopment"],
    iprdCash: [
      "lly:PurchaseOfInProcessResearchAndDevelopment",
      "lly:PurchasesOfInProcessResearchAndDevelopment",
    ],
    specialCharges: ["lly:AssetImpairmentsRestructuringAndOtherSpecialCharges"],
  };
  if (!candidates[key]) return { value: null, provenance: null };
  const record = (await xmlFacts(f)).find(
    (v) =>
      candidates[key].includes(v.tag) &&
      v.end === f.end &&
      days(v) >= min &&
      days(v) <= max &&
      Number.isFinite(v.value),
  );
  return record
    ? {
        value: record.value,
        provenance: {
          tag: record.tag,
          unit: "USD",
          start: record.start,
          end: record.end,
          filed: f.filed,
          source: record.source,
          method:
            "Original structured XBRL instance; nondimensional USD context",
        },
      }
    : { value: null, provenance: null };
}
async function supplement(r) {
  for (const key of ["iprd", "iprdCash", "specialCharges"]) {
    if (r[key] != null) continue;
    const v = await xmlFact(
      key,
      r,
      r.quarter ? 75 : 350,
      r.quarter ? 105 : 380,
    );
    r[key] = v.value;
    r.provenance[key] = v.provenance;
  }
  return r;
}
function derived(r) {
  if (r.spotShares == null && r.issuedShares != null && r.trustShares != null) {
    r.spotShares = r.issuedShares - r.trustShares;
    r.provenance.spotShares = {
      method:
        "Issued shares less nonparticipating employee-benefit-trust shares",
      unit: "shares",
      source: r.source,
      end: r.end,
      filed: r.filed,
    };
  }
  if (
    r.operatingIncome == null &&
    [
      r.revenue,
      r.costOfSales,
      r.research,
      r.marketing,
      r.iprd,
      r.specialCharges,
    ].every((v) => v != null)
  ) {
    r.operatingIncome =
      r.revenue -
      r.costOfSales -
      r.research -
      r.marketing -
      r.iprd -
      r.specialCharges;
    r.provenance.operatingIncome = {
      method:
        "Revenue less cost of sales, internal R&D, marketing/administration, acquired IPR&D and special operating charges; excludes Other-net",
      unit: "USD",
      source: r.source,
      end: r.end,
      filed: r.filed,
    };
  }
  if (r.liabilities == null && r.assets != null && r.totalEquity != null) {
    r.liabilities = r.assets - r.totalEquity;
    r.provenance.liabilities = {
      method: "Original-context assets minus total equity",
      unit: "USD",
      source: r.source,
      end: r.end,
      filed: r.filed,
    };
  }
  r.grossProfit =
    r.revenue != null && r.costOfSales != null
      ? r.revenue - r.costOfSales
      : null;
  r.freeCashFlow =
    r.operatingCashFlow != null && r.capex != null
      ? r.operatingCashFlow - r.capex
      : null;
  r.debt =
    r.reportedDebt ??
    (r.debtCurrent != null && r.debtNoncurrent != null
      ? r.debtCurrent + r.debtNoncurrent
      : null);
  if (
    r.depreciation == null &&
    r.otherDa != null &&
    r.acquiredAmortization != null
  ) {
    r.depreciation = r.otherDa + r.acquiredAmortization;
    r.provenance.depreciation = {
      method: "Other D&A plus acquired-intangible amortization",
      unit: "USD",
      source: r.source,
      end: r.end,
      filed: r.filed,
    };
  }
  r.balanceOutsideEquity =
    r.assets != null && r.liabilities != null && r.totalEquity != null
      ? r.assets - r.liabilities - r.totalEquity
      : null;
  r.grossMargin = ratio(r.grossProfit, r.revenue);
  r.operatingMargin = ratio(r.operatingIncome, r.revenue);
  r.netMargin = ratio(r.netIncome, r.revenue);
  r.fcfMargin = ratio(r.freeCashFlow, r.revenue);
  r.roe = r.equity > 0 ? ratio(r.netIncome, r.equity) : null;
  return r;
}
function row(f, year, quarter) {
  // Older submissions may contain a report-date typo; prefer filed revenue context.
  const anchor = tags.revenue
    .flatMap((tag) => company.facts["us-gaap"][tag]?.units.USD ?? [])
    .find(
      (r) =>
        r.accn === f.accessionNumber &&
        days(r) >= (quarter ? 75 : 350) &&
        days(r) <= (quarter ? 105 : 380) &&
        Math.abs(Date.parse(r.end) - Date.parse(f.end)) <= 7 * 86400000,
    );
  f = { ...f, end: anchor?.end ?? f.end };
  const r = {
    ...f,
    year,
    quarter: quarter ?? null,
    period: quarter ? `FY${year} Q${quarter}` : `FY${year}`,
    status: f.form === "10-K" ? "Filed annual GAAP" : "Filed interim GAAP",
    provenance: {},
  };
  for (const key of Object.keys(tags)) {
    const v = fact(
      key,
      f.end,
      flow.includes(key) ? (quarter ? 75 : 350) : 0,
      quarter ? 105 : 380,
      flow.includes(key) ? undefined : f.accessionNumber,
    );
    r[key] = v.value;
    r.provenance[key] = v.provenance;
  }
  return r;
}
const annual = [];
for (const f of filings.filter(
  (f) => f.form === "10-K" && f.end >= "2011-01-01",
))
  annual.push(derived(await supplement(row(f, Number(f.end.slice(0, 4))))));
const quarters = [];
for (const f of filings.filter(
  (f) => f.form === "10-Q" && f.end >= "2011-01-01",
)) {
  const month = Number(f.end.slice(5, 7));
  const quarter = Math.ceil(month / 3);
  const year = Number(f.end.slice(0, 4));
  if (year < 2011) continue;
  const r = await supplement(row(f, year, quarter));
  for (const key of flow.filter(
    (k) => !["dilutedEps", "dilutedShares"].includes(k),
  )) {
    if (r[key] != null) continue;
    let ytd = fact(key, f.end, quarter * 80, quarter * 100);
    if (ytd.value == null)
      ytd = await xmlFact(key, f, quarter * 80, quarter * 100);
    const prior = quarters.filter((r) => r.year === year);
    if (
      ytd.value != null &&
      prior.length === quarter - 1 &&
      prior.every((p) => p[key] != null)
    ) {
      r[key] = ytd.value - prior.reduce((s, p) => s + p[key], 0);
      r.provenance[key] = {
        ...ytd.provenance,
        method: "YTD minus prior fiscal quarters",
        priorSources: prior.map((p) => p.source),
      };
    }
  }
  quarters.push(derived(r));
}
for (const a of annual) {
  const prior = quarters.filter((r) => r.year === a.year);
  if (prior.length !== 3) continue;
  const r = {
    ...a,
    quarter: 4,
    period: `FY${a.year} Q4`,
    status: "Derived annual minus first three fiscal quarters",
    provenance: { ...a.provenance },
    dilutedEps: null,
    dilutedShares: null,
  };
  for (const k of flow.filter(
    (k) => !["dilutedEps", "dilutedShares"].includes(k),
  )) {
    r[k] =
      a[k] != null && prior.every((p) => p[k] != null)
        ? a[k] - prior.reduce((s, p) => s + p[k], 0)
        : null;
    r.provenance[k] = {
      ...a.provenance[k],
      method: "Annual minus Q1-Q3",
      priorSources: prior.map((p) => p.source),
    };
  }
  r.provenance.dilutedEps = null;
  r.provenance.dilutedShares = null;
  quarters.push(derived(r));
}
quarters.sort((a, b) => a.end.localeCompare(b.end));
const priceSource = `https://query1.finance.yahoo.com/v8/finance/chart/LLY?period1=1283299200&period2=${Date.parse(cutoff) / 1000}&interval=1d&events=splits`;
const market = (await json(priceSource)).chart.result[0];
const splits = Object.values(market.events?.splits ?? {});
if (splits.length)
  throw new Error("Review split normalization before publishing");
const prices = market.timestamp
  .map((t, i) => ({
    date: new Date(t * 1000).toISOString().slice(0, 10),
    close: market.indicators.quote[0].close[i],
  }))
  .filter((r) => r.close != null);
const history = annual.map((r) => {
  const p = prices.filter((p) => p.date <= r.end).at(-1);
  const shares = r.spotShares;
  const marketCap = p && shares ? p.close * shares : null;
  const enterpriseValue =
    marketCap != null && r.debt != null && r.cash != null
      ? marketCap + r.debt - r.cash
      : null;
  return {
    year: r.year,
    end: r.end,
    date: p?.date ?? null,
    close: p?.close ?? null,
    shares,
    marketCap,
    enterpriseValue,
    priceToSales: marketCap != null && r.revenue ? marketCap / r.revenue : null,
    priceToEarnings:
      marketCap != null && r.netIncome > 0 ? marketCap / r.netIncome : null,
    evToSales:
      enterpriseValue != null && r.revenue ? enterpriseValue / r.revenue : null,
    fcfYield:
      marketCap != null && r.freeCashFlow != null
        ? (r.freeCashFlow / marketCap) * 100
        : null,
  };
});
await mkdir(root, { recursive: true });
const financialType = `export type FinancialRow = {year:number;quarter:number|null;period:string;end:string;filed:string;form:string;source:string;accessionNumber:string;status:string;provenance:Record<string,{tag?:string;unit?:string;start?:string|null;end?:string;filed?:string;source?:string;method?:string;priorSources?:string[]}|null>;${[...Object.keys(tags), "grossProfit", "freeCashFlow", "debt", "balanceOutsideEquity", "grossMargin", "operatingMargin", "netMargin", "fcfMargin", "roe"].map((k) => `${k}:number|null;`).join("")}};\n`;
await writeFile(
  new URL("annualFinancials.ts", root),
  financialType +
    `export const LLY_ANNUAL:FinancialRow[] = ${JSON.stringify(annual, null, 2)};\n`,
);
await writeFile(
  new URL("quarterlyFinancials.ts", root),
  `import type {FinancialRow} from "./annualFinancials";\nexport const LLY_QUARTERLY:FinancialRow[] = ${JSON.stringify(quarters, null, 2)};\n`,
);
await writeFile(
  new URL("filings.ts", root),
  `export const LLY_FILINGS = ${JSON.stringify(filings, null, 2)};\n`,
);
await writeFile(
  new URL("valuationHistory.ts", root),
  `export const LLY_PRICE_SOURCE = ${JSON.stringify(priceSource)};\nexport const LLY_LATEST_PRICE = ${JSON.stringify(prices.at(-1))};\nexport const LLY_VALUATION_HISTORY = ${JSON.stringify(history, null, 2)};\n`,
);
console.log(
  JSON.stringify(
    {
      annual: annual.length,
      quarters: quarters.length,
      filings: filings.length,
      latestPrice: prices.at(-1),
      lastFiledAnnual: annual.at(-1)?.source,
      lastFiledQuarter: quarters.at(-1)?.source,
    },
    null,
    2,
  ),
);
