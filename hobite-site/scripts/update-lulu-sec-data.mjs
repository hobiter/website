import { mkdir, writeFile } from "node:fs/promises";
const cutoff = "2026-10-11";
const root = new URL(
  "../app/research/lululemon-complete-fundamental-analysis/",
  import.meta.url,
);
const headers = { "User-Agent": "Hobite Research contact@hobite.vercel.app" };
async function json(url) {
  const r = await fetch(url, { headers });
  if (!r.ok) throw Error(`${r.status} ${url}`);
  return r.json();
}
const url = (a, d) =>
  `https://www.sec.gov/Archives/edgar/data/1397187/${a.replaceAll("-", "")}/${d}`;
const rows = (r) =>
  r.accessionNumber.map((a, i) => ({
    accession: a,
    form: r.form[i],
    filed: r.filingDate[i],
    end: r.reportDate[i],
    source: url(a, r.primaryDocument[i]),
  }));
const sub = await json("https://data.sec.gov/submissions/CIK0001397187.json");
const all = rows(sub.filings.recent);
for (const f of sub.filings.files ?? [])
  all.push(...rows(await json(`https://data.sec.gov/submissions/${f.name}`)));
const filings = [
  ...new Map(
    all
      .filter(
        (f) => f.filed <= cutoff && /^(10-K|10-Q|8-K|S-1)(\/A)?$/.test(f.form),
      )
      .map((f) => [f.accession, f]),
  ).values(),
].sort((a, b) => a.filed.localeCompare(b.filed));
const company = await json(
  "https://data.sec.gov/api/xbrl/companyfacts/CIK0001397187.json",
);
const tags = {
  revenue: [
    "RevenueFromContractWithCustomerExcludingAssessedTax",
    "RevenueFromContractWithCustomerIncludingAssessedTax",
    "SalesRevenueNet",
    "Revenues",
  ],
  grossProfit: ["GrossProfit"],
  operatingIncome: ["OperatingIncomeLoss"],
  netIncome: ["NetIncomeLoss"],
  eps: ["EarningsPerShareDiluted"],
  shares: ["WeightedAverageNumberOfDilutedSharesOutstanding"],
  ocf: ["NetCashProvidedByUsedInOperatingActivities"],
  capex: ["PaymentsToAcquirePropertyPlantAndEquipment"],
  sbc: ["ShareBasedCompensation"],
  buybacks: ["PaymentsForRepurchaseOfCommonStock"],
  cash: [
    "CashAndCashEquivalentsAtCarryingValue",
    "CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents",
  ],
  assets: ["Assets"],
  liabilities: ["Liabilities"],
  equity: ["StockholdersEquity"],
  inventory: ["InventoryNet"],
  leases: ["OperatingLeaseLiabilityNoncurrent"],
  leaseCurrent: ["OperatingLeaseLiabilityCurrent"],
};
const flows = [
  "revenue",
  "grossProfit",
  "operatingIncome",
  "netIncome",
  "eps",
  "shares",
  "ocf",
  "capex",
  "sbc",
  "buybacks",
];
const duration = (r) =>
  r.start ? (Date.parse(r.end) - Date.parse(r.start)) / 86400000 : 0;
function fact(key, end, min = 0, max = 0, accession) {
  const unit =
    key === "eps" ? "USD/shares" : key === "shares" ? "shares" : "USD";
  for (const tag of tags[key]) {
    const hits = (company.facts["us-gaap"][tag]?.units[unit] ?? [])
      .filter(
        (r) =>
          r.filed <= cutoff &&
          ["10-K", "10-Q"].includes(r.form) &&
          r.end === end &&
          (!accession || r.accn === accession) &&
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
          url(r.accn, ""),
      };
    }
  }
  return { value: null };
}
const get = (p, k) => p[k]?.value ?? null;
function derived(p) {
  const val = (k) => get(p, k);
  const ratio = (a, b) => (a != null && b ? (100 * a) / b : null);
  return {
    fcf:
      val("ocf") != null && val("capex") != null
        ? val("ocf") - val("capex")
        : null,
    grossMargin: ratio(val("grossProfit"), val("revenue")),
    operatingMargin: ratio(val("operatingIncome"), val("revenue")),
    netMargin: ratio(val("netIncome"), val("revenue")),
    roe: ratio(val("netIncome"), val("equity")),
  };
}
const annual = [];
for (const f of filings.filter(
  (f) => f.form === "10-K" && f.end >= "2016-01-01",
)) {
  const p = Object.fromEntries(
    Object.keys(tags).map((k) => [
      k,
      fact(k, f.end, flows.includes(k) ? 350 : 0, 380, f.accession),
    ]),
  );
  if (get(p, "revenue") == null) continue;
  annual.push({
    fy: Number(f.end.slice(0, 4)) - 1,
    end: f.end,
    source: f.source,
    p,
    ...derived(p),
  });
}
const quarters = [];
for (const a of annual.filter((a) => a.fy >= 2020)) addYear(a.fy, a);
const latestYear = Number(
  filings
    .filter((f) => f.form === "10-Q")
    .at(-1)
    ?.end.slice(0, 4),
);
if (latestYear > annual.at(-1).fy) addYear(latestYear, null);
function addYear(fy, a) {
  const qs = filings
    .filter((f) => f.form === "10-Q" && f.end.startsWith(String(fy)))
    .sort((x, y) => x.end.localeCompare(y.end));
  let previous = {};
  let q = 0;
  for (const f of qs) {
    q++;
    const cumulative = {};
    const p = {};
    for (const k of flows) {
      if (["ocf", "capex", "sbc", "buybacks"].includes(k)) {
        const c = fact(k, f.end, 70, 300, f.accession);
        cumulative[k] = c;
        const old = previous[k];
        p[k] =
          q === 1
            ? c
            : {
                ...c,
                value:
                  c.value != null && old?.value != null
                    ? c.value - old.value
                    : null,
                derivation: "current YTD minus previous YTD",
                previous: old ?? null,
              };
      } else p[k] = fact(k, f.end, 70, 105, f.accession);
    }
    for (const k of Object.keys(tags).filter((k) => !flows.includes(k)))
      p[k] = fact(k, f.end, 0, 0, f.accession);
    quarters.push({ fy, q, end: f.end, source: f.source, p, ...derived(p) });
    previous = cumulative;
  }
  if (a && q === 3) {
    const p = {};
    for (const k of flows) {
      const prior = quarters.filter((r) => r.fy === fy);
      const v = get(a.p, k);
      p[k] = {
        value: ["eps", "shares"].includes(k)
          ? null
          : v != null && prior.every((r) => get(r.p, k) != null)
            ? v - prior.reduce((s, r) => s + get(r.p, k), 0)
            : null,
        derivation: "annual minus Q1 Q2 Q3",
        source: a.source,
        components: prior.map((r) => r.p[k]),
      };
    }
    for (const k of Object.keys(tags).filter((k) => !flows.includes(k)))
      p[k] = a.p[k];
    quarters.push({ fy, q: 4, end: a.end, source: a.source, p, ...derived(p) });
  }
}
await mkdir(root, { recursive: true });
await writeFile(
  new URL("secData.ts", root),
  `// Generated from SEC submissions/companyfacts; USD millions except EPS.\nexport const CUTOFF=${JSON.stringify(cutoff)};\nexport const FILINGS=${JSON.stringify(filings, null, 2)};\nexport const ANNUAL=${JSON.stringify(annual, null, 2)};\nexport const QUARTERLY=${JSON.stringify(quarters, null, 2)};\n`,
);
const priceSource = `https://query1.finance.yahoo.com/v8/finance/chart/LULU?period1=1420070400&period2=${Date.parse(cutoff) / 1000}&interval=1d&events=splits`;
const market = (await json(priceSource)).chart.result[0];
if (Object.keys(market.events?.splits ?? {}).length)
  throw Error("Reconcile stock splits before publishing valuation history");
const prices = market.timestamp
  .map((ts, i) => ({
    date: new Date(ts * 1000).toISOString().slice(0, 10),
    close: market.indicators.quote[0].close[i],
  }))
  .filter((p) => p.close > 0 && p.date <= cutoff);
const history = annual.map((a) => {
  const p = prices.filter((p) => p.date <= a.end).at(-1);
  const cap = p && get(a.p, "shares") ? p.close * get(a.p, "shares") : null;
  return {
    fy: a.fy,
    fiscalEnd: a.end,
    priceDate: p?.date ?? null,
    price: p?.close ?? null,
    cap,
    ps: cap ? cap / get(a.p, "revenue") : null,
    pe: cap && get(a.p, "netIncome") > 0 ? cap / get(a.p, "netIncome") : null,
    fcfYield: cap && a.fcf != null ? (a.fcf / cap) * 100 : null,
  };
});
await writeFile(
  new URL("valuationHistory.ts", root),
  `export const PRICE_SOURCE=${JSON.stringify(priceSource)};\nexport const LATEST_PRICE=${JSON.stringify(prices.at(-1))};\nexport const VALUATION_HISTORY=${JSON.stringify(history, null, 2)};\n`,
);
console.log({
  annual: annual.length,
  quarters: quarters.length,
  latest: quarters.at(-1)?.end,
});
