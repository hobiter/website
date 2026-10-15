import { mkdir, writeFile } from "node:fs/promises";

const cutoff = "2026-10-15";
const root = new URL(
  "../app/research/rocket-lab-complete-fundamental-analysis/",
  import.meta.url,
);
const headers = { "User-Agent": "Hobite Research contact@hobite.vercel.app" };
async function json(url) {
  const r = await fetch(url, { headers });
  if (!r.ok) throw Error(`${r.status}: ${url}`);
  return r.json();
}
const archive = (accn, doc = "") =>
  `https://www.sec.gov/Archives/edgar/data/1819994/${accn.replaceAll("-", "")}/${doc}`;
const records = (r) =>
  r.accessionNumber.map((a, i) => ({
    accession: a,
    form: r.form[i],
    filed: r.filingDate[i],
    end: r.reportDate[i] ?? null,
    source: archive(a, r.primaryDocument[i]),
  }));
const sub = await json("https://data.sec.gov/submissions/CIK0001819994.json");
const all = records(sub.filings.recent);
for (const f of sub.filings.files ?? [])
  all.push(
    ...records(await json(`https://data.sec.gov/submissions/${f.name}`)),
  );
const filings = [
  ...new Map(
    all
      .filter(
        (f) =>
          f.filed <= cutoff &&
          /^(10-K|10-Q|8-K|S-1|S-4|424B3|424B4)(\/A)?$/.test(f.form),
      )
      .map((f) => [f.accession, f]),
  ).values(),
].sort((a, b) => b.filed.localeCompare(a.filed));
const company = await json(
  "https://data.sec.gov/api/xbrl/companyfacts/CIK0001819994.json",
);
const tags = {
  revenue: [
    "RevenueFromContractWithCustomerExcludingAssessedTax",
    "RevenueFromContractWithCustomerIncludingAssessedTax",
  ],
  grossProfit: ["GrossProfit"],
  operatingIncome: ["OperatingIncomeLoss"],
  netIncome: ["NetIncomeLoss"],
  eps: ["EarningsPerShareDiluted", "EarningsPerShareBasicAndDiluted"],
  weightedShares: [
    "WeightedAverageNumberOfDilutedSharesOutstanding",
    "WeightedAverageNumberOfSharesOutstandingBasic",
  ],
  rd: ["ResearchAndDevelopmentExpense"],
  ocf: ["NetCashProvidedByUsedInOperatingActivities"],
  capex: ["PaymentsToAcquirePropertyPlantAndEquipment"],
  da: ["DepreciationDepletionAndAmortization", "DepreciationAndAmortization"],
  sbc: ["ShareBasedCompensation"],
  acquisitions: ["PaymentsToAcquireBusinessesNetOfCashAcquired"],
  cash: ["CashAndCashEquivalentsAtCarryingValue"],
  investmentsCurrent: ["MarketableSecuritiesCurrent"],
  investmentsNoncurrent: ["MarketableSecuritiesNoncurrent"],
  restricted: ["RestrictedCashNoncurrent"],
  assets: ["Assets"],
  liabilities: ["Liabilities"],
  equity: ["StockholdersEquity"],
  borrowings: ["LongTermDebtNoncurrent"],
  convertible: ["LongTermDebt"],
  debtCurrent: ["LongTermDebtCurrent"],
  financeLease: ["FinanceLeaseLiability"],
  financeLeaseCurrent: ["FinanceLeaseLiabilityCurrent"],
  financeLeaseNoncurrent: ["FinanceLeaseLiabilityNoncurrent"],
  commonShares: ["CommonStockSharesOutstanding"],
  preferredShares: ["PreferredStockSharesOutstanding"],
  inventory: ["InventoryNet"],
  receivables: ["AccountsReceivableNetCurrent"],
  contractAssets: [
    "ContractWithCustomerAssetNetCurrent",
    "ContractWithCustomerAssetNet",
  ],
  contractLiabilities: ["ContractWithCustomerLiabilityCurrent"],
  ppe: ["PropertyPlantAndEquipmentNet"],
  backlog: ["RevenueRemainingPerformanceObligation"],
};
const flowKeys = Object.keys(tags).slice(0, Object.keys(tags).indexOf("cash"));
const ytdKeys = ["ocf", "capex", "da", "sbc", "acquisitions"];
const duration = (r) =>
  r.start ? (Date.parse(r.end) - Date.parse(r.start)) / 86400000 : 0;
function fact(key, end, min = 0, max = 0) {
  const unit =
    key === "eps" ? "USD/shares" : /Shares$/.test(key) ? "shares" : "USD";
  for (const tag of tags[key]) {
    const hits = (company.facts["us-gaap"][tag]?.units[unit] ?? [])
      .filter(
        (r) =>
          r.filed <= cutoff &&
          /^(10-K|10-Q)(\/A)?$/.test(r.form) &&
          r.end === end &&
          (min ? duration(r) >= min && duration(r) <= max : !r.start),
      )
      .sort(
        (a, b) => b.filed.localeCompare(a.filed) || duration(b) - duration(a),
      );
    if (hits.length) {
      const r = hits[0];
      return {
        value: r.val / (key === "eps" ? 1 : 1e6),
        tag,
        start: r.start ?? null,
        end: r.end,
        filed: r.filed,
        source:
          filings.find((f) => f.accession === r.accn)?.source ??
          archive(r.accn),
      };
    }
  }
  return { value: null };
}
const val = (p, k) => p[k]?.value ?? null;
const ratio = (a, b) => (a != null && b ? a / b : null);
function derived(p) {
  const revenue = val(p, "revenue"),
    ocf = val(p, "ocf"),
    capex = val(p, "capex");
  const fcf = ocf != null && capex != null ? ocf - capex : null;
  return {
    fcf,
    grossMargin: ratio(val(p, "grossProfit"), revenue),
    operatingMargin: ratio(val(p, "operatingIncome"), revenue),
    netMargin: ratio(val(p, "netIncome"), revenue),
    fcfMargin: ratio(fcf, revenue),
    roe:
      val(p, "equity") > 0
        ? ratio(val(p, "netIncome"), val(p, "equity"))
        : null,
  };
}
function row(fy, end, min, max, quarter = null) {
  const p = Object.fromEntries(
    Object.keys(tags).map((k) => [
      k,
      fact(k, end, flowKeys.includes(k) ? min : 0, max),
    ]),
  );
  return {
    fy,
    quarter,
    end,
    source:
      p.revenue.source ??
      "https://data.sec.gov/api/xbrl/companyfacts/CIK0001819994.json",
    p,
    ...derived(p),
  };
}
const annual = [];
for (const fy of [2020, 2021, 2022, 2023, 2024, 2025]) {
  const r = row(fy, `${fy}-12-31`, 350, 380);
  // Operating revenue is required: Vector SPAC-only statements must never enter this series.
  if (val(r.p, "revenue") == null || val(r.p, "revenue") <= 0)
    throw Error(`No operating annual revenue for ${fy}`);
  annual.push(r);
}
const quarterly = [];
for (const fy of [2024, 2025, 2026])
  for (let q = 1; q <= 4; q++) {
    const end = `${fy}-${["03-31", "06-30", "09-30", "12-31"][q - 1]}`;
    if (end > "2026-06-30") continue;
    const r = row(fy, end, 75, 100, q);
    if (q === 4) {
      const a = annual.find((x) => x.fy === fy);
      for (const k of flowKeys) {
        if (["eps", "weightedShares"].includes(k)) {
          r.p[k] = { value: null };
          continue;
        }
        const nine = fact(k, `${fy}-09-30`, 260, 285);
        r.p[k] =
          val(a.p, k) != null && nine.value != null
            ? {
                value: val(a.p, k) - nine.value,
                tag: "derived: annual minus nine months",
                source: a.p[k].source,
                otherSource: nine.source,
                end,
                filed: a.p[k].filed,
              }
            : { value: null };
      }
    } else
      for (const k of ytdKeys) {
        const now = fact(k, end, q * 90 - 15, q * 92 + 10);
        const prev =
          q > 1
            ? fact(
                k,
                `${fy}-${["03-31", "06-30"][q - 2]}`,
                (q - 1) * 90 - 15,
                (q - 1) * 92 + 10,
              )
            : { value: 0 };
        r.p[k] =
          now.value != null && prev.value != null
            ? {
                ...now,
                value: now.value - prev.value,
                tag: q === 1 ? now.tag : `derived: YTD difference (${now.tag})`,
                otherSource: prev.source ?? null,
              }
            : { value: null };
      }
    Object.assign(r, derived(r.p));
    if (val(r.p, "revenue") == null) throw Error(`Missing quarter ${end}`);
    quarterly.push(r);
  }
const priceUrl =
  "https://query1.finance.yahoo.com/v8/finance/chart/RKLB?range=10y&interval=1d";
const price = (await json(priceUrl)).chart.result[0];
const quote = price.indicators.quote[0].close;
const adjusted = price.indicators.adjclose?.[0]?.adjclose ?? quote;
const prices = price.timestamp
  .map((t, i) => ({
    date: new Date(t * 1000).toISOString().slice(0, 10),
    close: quote[i],
    adjustedClose: adjusted[i],
  }))
  .filter(
    (p) =>
      p.date >= "2021-08-25" &&
      p.date <= cutoff &&
      Number.isFinite(p.close) &&
      Number.isFinite(p.adjustedClose),
  );
const latest = prices.at(-1);
if (!latest || latest.date < "2026-10-14")
  throw Error("Stale RKLB market data");
const history = annual
  .filter((a) => a.fy >= 2021)
  .map((a) => {
    const p = prices.filter((p) => p.date <= a.end).at(-1);
    const common = val(a.p, "commonShares");
    // Series A created January 2025 converts 1:1; pre-2025 there is no such class.
    const preferred = a.fy >= 2025 ? val(a.p, "preferredShares") : 0;
    const shares =
      common != null && preferred != null ? common + preferred : null;
    const marketCap = p && shares != null ? p.close * shares : null;
    const debt = ["borrowings", "convertible", "debtCurrent"].reduce(
      (s, k) => s + (val(a.p, k) ?? 0),
      0,
    );
    const liquid = [
      "cash",
      "investmentsCurrent",
      "investmentsNoncurrent",
    ].reduce((s, k) => s + (val(a.p, k) ?? 0), 0);
    const enterprise = marketCap != null ? marketCap + debt - liquid : null;
    return {
      fy: a.fy,
      priceDate: p?.date ?? null,
      price: p?.close ?? null,
      adjustedPrice: p?.adjustedClose ?? null,
      shares,
      marketCap,
      enterprise,
      ps: ratio(marketCap, val(a.p, "revenue")),
      evSales: ratio(enterprise, val(a.p, "revenue")),
      pe:
        val(a.p, "netIncome") > 0
          ? ratio(marketCap, val(a.p, "netIncome"))
          : null,
      fcfYield: ratio(a.fcf, marketCap),
      source: priceUrl,
    };
  });
await mkdir(root, { recursive: true });
const emit = async (name, content) => writeFile(new URL(name, root), content);
await emit(
  "secData.ts",
  `// Generated by scripts/update-rklb-sec-data.mjs; USD millions except EPS.\nexport const CUTOFF = ${JSON.stringify(cutoff)};\nexport type Fact = {value:number|null; tag?:string; start?:string|null; end?:string; filed?:string; source?:string; otherSource?:string|null};\nexport type FinancialRow = {fy:number;quarter:number|null;end:string;source:string;p:Record<string,Fact>;fcf:number|null;grossMargin:number|null;operatingMargin:number|null;netMargin:number|null;fcfMargin:number|null;roe:number|null};\nexport const ANNUAL: FinancialRow[] = ${JSON.stringify(annual, null, 2)};\nexport const QUARTERLY: FinancialRow[] = ${JSON.stringify(quarterly, null, 2)};\nexport const FILINGS = ${JSON.stringify(filings, null, 2)};\n`,
);
await emit(
  "valuationHistory.ts",
  `// Observed after October 15 regular-session close; not a live quote.\nexport const PRICE_SOURCE = ${JSON.stringify(priceUrl)};\nexport const LATEST_PRICE = ${JSON.stringify(latest)};\nexport const VALUATION_HISTORY = ${JSON.stringify(history, null, 2)};\n`,
);
console.log(
  JSON.stringify(
    {
      annual: annual.map((x) => [x.fy, val(x.p, "revenue"), x.fcf]),
      quarters: quarterly.length,
      filings: filings.length,
      latest,
    },
    null,
    2,
  ),
);
