import { readFile, mkdir, writeFile } from "node:fs/promises";

const cutoff = "2026-10-04";
const root = new URL(
  "../app/research/micron-complete-fundamental-analysis/",
  import.meta.url,
);
const headers = { "User-Agent": "Hobite Research contact@hobite.vercel.app" };
async function json(url) {
  const r = await fetch(url, { headers });
  if (!r.ok) throw new Error(`${r.status}: ${url}`);
  return r.json();
}
const secUrl = (a, doc) =>
  `https://www.sec.gov/Archives/edgar/data/723125/${a.replaceAll("-", "")}/${doc}`;
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
    "RevenueFromContractWithCustomerExcludingAssessedTax",
    "SalesRevenueNet",
    "Revenues",
  ],
  costOfSales: [
    "CostOfRevenue",
    "CostOfGoodsAndServicesSold",
    "CostOfGoodsSold",
  ],
  operatingIncome: ["OperatingIncomeLoss"],
  netIncome: ["NetIncomeLoss"],
  dilutedEps: ["EarningsPerShareDiluted"],
  dilutedShares: ["WeightedAverageNumberOfDilutedSharesOutstanding"],
  operatingCashFlow: [
    "NetCashProvidedByUsedInOperatingActivities",
    "NetCashProvidedByUsedInOperatingActivitiesContinuingOperations",
  ],
  capex: ["PaymentsToAcquirePropertyPlantAndEquipment"],
  depreciation: ["DepreciationDepletionAndAmortization", "Depreciation"],
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
  debtCurrent: ["LongTermDebtCurrent", "DebtCurrent"],
  debtNoncurrent: [
    "LongTermDebtAndCapitalLeaseObligations",
    "LongTermDebtNoncurrent",
  ],
  inventory: ["InventoryNet"],
  receivables: ["AccountsReceivableNetCurrent"],
  ppe: ["PropertyPlantAndEquipmentNet"],
  spotShares: ["CommonStockSharesOutstanding"],
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
  "stockComp",
];
const instants = Object.keys(tags).filter((k) => !flow.includes(k));
const days = (r) =>
  r.start ? (Date.parse(r.end) - Date.parse(r.start)) / 86400000 : 0;
const submissions = await json(
  "https://data.sec.gov/submissions/CIK0000723125.json",
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
  "https://data.sec.gov/api/xbrl/companyfacts/CIK0000723125.json",
);
function fact(key, end, min = 0, max = 0, accession) {
  const unit =
    key === "dilutedEps"
      ? "USD/shares"
      : ["dilutedShares", "spotShares"].includes(key)
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
            `https://www.sec.gov/Archives/edgar/data/723125/${r.accn.replaceAll("-", "")}/`,
        },
      };
    }
  }
  return { value: null, provenance: null };
}
const ratio = (a, b) => (a != null && b ? (a / b) * 100 : null);
function derived(r) {
  r.grossProfit =
    r.revenue != null && r.costOfSales != null
      ? r.revenue - r.costOfSales
      : null;
  r.freeCashFlow =
    r.operatingCashFlow != null && r.capex != null
      ? r.operatingCashFlow - r.capex
      : null;
  r.debt =
    r.debtCurrent != null && r.debtNoncurrent != null
      ? r.debtCurrent + r.debtNoncurrent
      : null;
  r.balanceOutsideEquity =
    r.assets != null && r.liabilities != null && r.totalEquity != null
      ? r.assets - r.liabilities - r.totalEquity
      : null;
  r.grossMargin = ratio(r.grossProfit, r.revenue);
  r.operatingMargin = ratio(r.operatingIncome, r.revenue);
  r.netMargin = ratio(r.netIncome, r.revenue);
  r.fcfMargin = ratio(r.freeCashFlow, r.revenue);
  r.roe = ratio(r.netIncome, r.equity);
  return r;
}
function row(f, year, quarter) {
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
const annual = filings
  .filter((f) => f.form === "10-K" && f.end >= "2011-01-01")
  .map((f) => derived(row(f, Number(f.end.slice(0, 4)))));
const quarters = [];
for (const f of filings.filter(
  (f) => f.form === "10-Q" && f.end >= "2010-10-01",
)) {
  const month = Number(f.end.slice(5, 7));
  const quarter = month >= 11 ? 1 : month <= 3 ? 2 : 3;
  const year = Number(f.end.slice(0, 4)) + (quarter === 1 ? 1 : 0);
  if (year < 2011) continue;
  const r = row(f, year, quarter);
  for (const key of flow.filter(
    (k) => !["dilutedEps", "dilutedShares"].includes(k),
  )) {
    if (r[key] != null) continue;
    const ytd = fact(key, f.end, quarter * 80, quarter * 100);
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
const snapshot = JSON.parse(
  await readFile(
    new URL("./data/micron-latest-release.json", import.meta.url),
    "utf8",
  ),
);
if (snapshot.cutoff !== cutoff)
  throw new Error("Reverify release snapshot for new cutoff");
function releaseRow(data, quarter) {
  const r = {
    year: 2026,
    quarter: quarter ?? null,
    period: quarter ? "FY2026 Q4" : "FY2026",
    end: snapshot.end,
    filed: snapshot.filed,
    form: "8-K exhibit",
    source: snapshot.source,
    accessionNumber: "0000723125-26-000018",
    status: snapshot.status,
    provenance: {},
  };
  for (const k of Object.keys(tags)) r[k] = null;
  for (const [k, v] of Object.entries(data)) {
    r[k] = k === "dilutedEps" ? v : v * 1e6;
    r.provenance[k] = {
      source: snapshot.source,
      filed: snapshot.filed,
      end: snapshot.end,
      unit:
        k === "dilutedEps"
          ? "USD/shares"
          : k === "dilutedShares"
            ? "shares"
            : "USD",
      method: "Curated unaudited release table",
    };
  }
  return derived(r);
}
if (annual.some((r) => r.year === 2026))
  throw new Error("FY2026 10-K now available: replace unaudited snapshot path");
annual.push(releaseRow(snapshot.annual));
quarters.push(releaseRow(snapshot.quarter, 4));
quarters.sort((a, b) => a.end.localeCompare(b.end));
const priceSource = `https://query1.finance.yahoo.com/v8/finance/chart/MU?period1=1283299200&period2=${Date.parse(cutoff) / 1000}&interval=1d&events=splits`;
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
const financialType = `export type FinancialRow = {year:number;quarter:number|null;period:string;end:string;filed:string;form:string;source:string;accessionNumber:string;status:string;provenance:Record<string,{tag?:string;unit?:string;start?:string|null;end?:string;filed?:string;source?:string;method?:string;priorSources?:string[]}|null>;${[...Object.keys(tags), "grossProfit", "freeCashFlow", "debt", "balanceOutsideEquity", "grossMargin", "operatingMargin", "netMargin", "fcfMargin", "roe"].map((k) => `${k}:number|null;`).join("")}longTermSecurities?:number;capexSaleProceeds?:number;governmentIncentives?:number;customerDeposits?:number;noncurrentContractLiabilities?:number;};\n`;
await writeFile(
  new URL("annualFinancials.ts", root),
  financialType +
    `export const MU_ANNUAL:FinancialRow[] = ${JSON.stringify(annual, null, 2)};\n`,
);
await writeFile(
  new URL("quarterlyFinancials.ts", root),
  `import type {FinancialRow} from "./annualFinancials";\nexport const MU_QUARTERLY:FinancialRow[] = ${JSON.stringify(quarters, null, 2)};\n`,
);
await writeFile(
  new URL("filings.ts", root),
  `export const MU_FILINGS = ${JSON.stringify(filings, null, 2)};\n`,
);
await writeFile(
  new URL("valuationHistory.ts", root),
  `export const MU_PRICE_SOURCE = ${JSON.stringify(priceSource)};\nexport const MU_LATEST_PRICE = ${JSON.stringify(prices.at(-1))};\nexport const MU_VALUATION_HISTORY = ${JSON.stringify(history, null, 2)};\n`,
);
await writeFile(
  new URL("operatingMetrics.ts", root),
  `export const MU_RELEASE = ${JSON.stringify(snapshot, null, 2)};\n`,
);
console.log(
  JSON.stringify(
    {
      annual: annual.length,
      quarters: quarters.length,
      filings: filings.length,
      latestPrice: prices.at(-1),
      lastFiledAnnual: annual.at(-2)?.source,
      lastFiledQuarter: quarters.at(-2)?.source,
    },
    null,
    2,
  ),
);
