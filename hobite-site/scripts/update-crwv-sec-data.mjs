import { mkdir, writeFile } from "node:fs/promises";
const cutoff = "2026-10-13";
const root = new URL(
  "../app/research/coreweave-complete-fundamental-analysis/",
  import.meta.url,
);
const headers = { "User-Agent": "Hobite Research contact@hobite.vercel.app" };
async function json(url) {
  const r = await fetch(url, { headers });
  if (!r.ok) throw Error(`${r.status}: ${url}`);
  return r.json();
}
const secUrl = (a, d) =>
  `https://www.sec.gov/Archives/edgar/data/1769628/${a.replaceAll("-", "")}/${d}`;
const records = (r) =>
  r.accessionNumber.map((a, i) => ({
    accession: a,
    form: r.form[i],
    filed: r.filingDate[i],
    end: r.reportDate[i],
    source: secUrl(a, r.primaryDocument[i]),
  }));
const sub = await json("https://data.sec.gov/submissions/CIK0001769628.json");
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
          f.filed <= cutoff && /^(10-K|10-Q|8-K|S-1|424B4)(\/A)?$/.test(f.form),
      )
      .map((f) => [f.accession, f]),
  ).values(),
].sort((a, b) => a.filed.localeCompare(b.filed));
const company = await json(
  "https://data.sec.gov/api/xbrl/companyfacts/CIK0001769628.json",
);
const tags = {
  revenue: ["RevenueFromContractWithCustomerExcludingAssessedTax"],
  costRevenue: ["CostOfGoodsAndServicesSold", "CostOfRevenue"],
  operatingIncome: ["OperatingIncomeLoss"],
  netIncome: ["NetIncomeLoss"],
  eps: ["EarningsPerShareDiluted", "EarningsPerShareBasicAndDiluted"],
  shares: ["WeightedAverageNumberOfDilutedSharesOutstanding"],
  ocf: ["NetCashProvidedByUsedInOperatingActivities"],
  capex: ["PaymentsToAcquirePropertyPlantAndEquipment"],
  da: ["DepreciationDepletionAndAmortization"],
  sbc: ["ShareBasedCompensation"],
  interestNet: ["InterestIncomeExpenseNonoperatingNet"],
  interestPaid: ["InterestPaidNet"],
  capitalizedInterest: ["InterestPaidCapitalized"],
  debtProceeds: ["ProceedsFromIssuanceOfLongTermDebt"],
  debtPayments: ["RepaymentsOfLongTermDebt"],
  financeAdditions: [
    "RightOfUseAssetObtainedInExchangeForFinanceLeaseLiability",
  ],
  cash: ["CashAndCashEquivalentsAtCarryingValue"],
  restrictedCurrent: ["RestrictedCashAndCashEquivalentsAtCarryingValue"],
  restrictedNoncurrent: ["RestrictedCashAndCashEquivalentsNoncurrent"],
  assets: ["Assets"],
  liabilities: ["Liabilities"],
  equity: ["StockholdersEquity"],
  debtPrincipal: ["DebtInstrumentCarryingAmount"],
  debtCurrent: ["LongTermDebtCurrent"],
  debtNoncurrent: ["LongTermDebtNoncurrent"],
  opLease: ["OperatingLeaseLiability"],
  financeLease: ["FinanceLeaseLiability"],
  ppe: [
    "PropertyPlantAndEquipmentAndFinanceLeaseRightOfUseAssetAfterAccumulatedDepreciationAndAmortization",
    "PropertyPlantAndEquipmentNet",
  ],
  rpo: ["RevenueRemainingPerformanceObligation"],
  deferredCurrent: ["ContractWithCustomerLiabilityCurrent"],
  deferredNoncurrent: ["ContractWithCustomerLiabilityNoncurrent"],
};
const flows = Object.keys(tags).slice(0, Object.keys(tags).indexOf("cash"));
const ytd = [
  "ocf",
  "capex",
  "da",
  "sbc",
  "interestPaid",
  "capitalizedInterest",
  "debtProceeds",
  "debtPayments",
  "financeAdditions",
];
const days = (r) =>
  r.start ? (Date.parse(r.end) - Date.parse(r.start)) / 86400000 : 0;
function fact(key, end, min = 0, max = 0) {
  const unit =
    key === "eps" ? "USD/shares" : key === "shares" ? "shares" : "USD";
  for (const tag of tags[key]) {
    const hits = (company.facts["us-gaap"][tag]?.units[unit] ?? [])
      .filter(
        (r) =>
          r.filed <= cutoff &&
          /^(10-K|10-Q|S-1|424B4)(\/A)?$/.test(r.form) &&
          r.end === end &&
          (min ? days(r) >= min && days(r) <= max : !r.start),
      )
      .sort((a, b) => b.filed.localeCompare(a.filed) || days(b) - days(a));
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
          secUrl(r.accn, ""),
      };
    }
  }
  return { value: null };
}
const val = (p, k) => p[k]?.value ?? null;
const ratio = (a, b) => (a != null && b ? (100 * a) / b : null);
const derived = (p) => ({
  fcf:
    val(p, "ocf") != null && val(p, "capex") != null
      ? val(p, "ocf") - val(p, "capex")
      : null,
  operatingMargin: ratio(val(p, "operatingIncome"), val(p, "revenue")),
  netMargin: ratio(val(p, "netIncome"), val(p, "revenue")),
  roe: ratio(val(p, "netIncome"), val(p, "equity")),
  fcfMargin:
    val(p, "ocf") != null && val(p, "capex") != null
      ? ratio(val(p, "ocf") - val(p, "capex"), val(p, "revenue"))
      : null,
});
const annual = [];
for (const fy of [2022, 2023, 2024, 2025]) {
  const end = `${fy}-12-31`;
  const p = Object.fromEntries(
    Object.keys(tags).map((k) => [
      k,
      fact(k, end, flows.includes(k) ? 350 : 0, 380),
    ]),
  );
  if (fy === 2022 && val(p, "revenue") == null) {
    const source =
      "https://www.sec.gov/Archives/edgar/data/1769628/000119312525067651/d899798d424b4.htm";
    for (const [key, value] of Object.entries({
      revenue: 15.83,
      costRevenue: 12.122,
      operatingIncome: -22.88,
      netIncome: -31.055,
      eps: -0.17,
      shares: 180.632,
      ocf: 0.91,
      capex: 72.404,
      da: 11.695,
      sbc: 1.49,
      interestNet: -9.444,
    })) {
      p[key] = {
        value,
        start: "2022-01-01",
        end,
        filed: filings.find((f) => f.source === source)?.filed ?? null,
        source,
        derivation:
          "Manual audited 424B4 F-6 and F-10 extraction; USD thousands converted to millions except EPS; OCF includes discontinued operations",
        review: "manual-extraction",
      };
    }
  }
  if (val(p, "revenue") == null) continue;
  annual.push({ fy, end, source: p.revenue.source, p, ...derived(p) });
}
const quarters = [];
for (const fy of [2025, 2026]) {
  let previous = {};
  for (const q of [1, 2, 3]) {
    const end = `${fy}-${["03-31", "06-30", "09-30"][q - 1]}`;
    const p = {},
      cumulative = {};
    const revenue = fact("revenue", end, 70, 100);
    if (revenue.value == null) continue;
    for (const k of Object.keys(tags)) {
      if (ytd.includes(k)) {
        const c = fact(k, end, 70, 300);
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
      } else p[k] = fact(k, end, flows.includes(k) ? 70 : 0, 100);
    }
    quarters.push({ fy, q, end, source: revenue.source, p, ...derived(p) });
    previous = cumulative;
  }
  const a = annual.find((r) => r.fy === fy),
    prior = quarters.filter((r) => r.fy === fy);
  if (a && prior.length === 3) {
    const p = {};
    for (const k of Object.keys(tags)) {
      p[k] = !flows.includes(k)
        ? a.p[k]
        : {
            value: ["eps", "shares"].includes(k)
              ? null
              : val(a.p, k) != null && prior.every((r) => val(r.p, k) != null)
                ? val(a.p, k) - prior.reduce((s, r) => s + val(r.p, k), 0)
                : null,
            derivation: "annual minus Q1 Q2 Q3",
            source: a.source,
            components: prior.map((r) => r.p[k]),
          };
    }
    quarters.push({ fy, q: 4, end: a.end, source: a.source, p, ...derived(p) });
  }
}
await mkdir(root, { recursive: true });
await writeFile(
  new URL("secData.ts", root),
  `// SEC sourced, USD millions except EPS; missing values are null.\nexport const CUTOFF=${JSON.stringify(cutoff)};\nexport const FILINGS=${JSON.stringify(filings, null, 2)};\nexport const ANNUAL=${JSON.stringify(annual, null, 2)};\nexport const QUARTERLY=${JSON.stringify(quarters, null, 2)};\n`,
);
const priceSource = `https://query1.finance.yahoo.com/v8/finance/chart/CRWV?period1=1743120000&period2=${Date.parse(cutoff) / 1000}&interval=1d&events=splits`;
const market = (await json(priceSource)).chart.result[0];
if (Object.keys(market.events?.splits ?? {}).length)
  throw Error("Review post-listing splits before market joins");
const prices = market.timestamp
  .map((ts, i) => ({
    date: new Date(ts * 1000).toISOString().slice(0, 10),
    close: market.indicators.quote[0].close[i],
  }))
  .filter((p) => p.close > 0 && p.date < cutoff);
const history = annual.map((a) => {
  const p = prices.filter((p) => p.date <= a.end).at(-1);
  const shares = a.fy === 2025 ? 525.688133 : null;
  const cap = p && shares ? p.close * shares : null;
  return {
    fy: a.fy,
    priceDate: p?.date ?? null,
    close: p?.close ?? null,
    sharesM: shares,
    shareDate: shares ? "2026-01-31" : null,
    shareSource: shares
      ? "https://www.sec.gov/Archives/edgar/data/1769628/000176962826000104/crwv-20251231.htm"
      : null,
    cap,
    ps: cap ? cap / val(a.p, "revenue") : null,
    pe: cap && val(a.p, "netIncome") > 0 ? cap / val(a.p, "netIncome") : null,
    fcfYield: cap && a.fcf != null ? (a.fcf / cap) * 100 : null,
  };
});
const quarterPrices = quarters.map((q) => {
  const p = prices.filter((p) => p.date <= q.end).at(-1);
  return {
    period: `${q.fy} Q${q.q}`,
    end: q.end,
    priceDate: p?.date ?? null,
    close: p?.close ?? null,
  };
});
await writeFile(
  new URL("valuationHistory.ts", root),
  `export const PRICE_SOURCE=${JSON.stringify(priceSource)};\nexport const LATEST_PRICE=${JSON.stringify(prices.at(-1))};\nexport const VALUATION_HISTORY=${JSON.stringify(history, null, 2)};\nexport const QUARTER_PRICE_HISTORY=${JSON.stringify(quarterPrices, null, 2)};\n`,
);
console.log(
  JSON.stringify(
    {
      annual: annual.map((a) => ({
        fy: a.fy,
        revenue: a.p.revenue.value,
        fcf: a.fcf,
      })),
      quarters: quarters.map((q) => ({
        fy: q.fy,
        q: q.q,
        revenue: q.p.revenue.value,
        ocf: q.p.ocf.value,
        capex: q.p.capex.value,
      })),
      latestPrice: prices.at(-1),
    },
    null,
    2,
  ),
);
