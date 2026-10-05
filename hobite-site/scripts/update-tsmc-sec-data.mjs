import { mkdir, readFile, writeFile } from "node:fs/promises";
import { XMLParser } from "fast-xml-parser";
const root = new URL(
  "../app/research/tsmc-complete-fundamental-analysis/",
  import.meta.url,
);
const asOf = "2026-10-04";
const headers = { "User-Agent": "Hobite Research contact@hobite.vercel.app" };
async function response(url) {
  const r = await fetch(url, { headers });
  if (!r.ok) throw new Error(`${r.status}: ${url}`);
  return r;
}
const json = async (url) => (await response(url)).json();
const array = (x) => (x == null ? [] : Array.isArray(x) ? x : [x]);
const submissionRows = (t) =>
  t.accessionNumber.map((accessionNumber, i) => ({
    accessionNumber,
    form: t.form[i],
    filed: t.filingDate[i],
    end: t.reportDate[i],
    url: `https://www.sec.gov/Archives/edgar/data/1046179/${accessionNumber.replaceAll("-", "")}/${t.primaryDocument[i]}`,
  }));
const sub = await json("https://data.sec.gov/submissions/CIK0001046179.json");
let filings = submissionRows(sub.filings.recent);
for (const f of sub.filings.files)
  filings.push(
    ...submissionRows(await json(`https://data.sec.gov/submissions/${f.name}`)),
  );
filings = filings
  .filter(
    (f) =>
      f.filed <= asOf &&
      /^(20-F|20-F\/A|6-K|6-K\/A|F-1|F-1\/A|F-6|F-6\/A)$/.test(f.form),
  )
  .sort((a, b) => b.filed.localeCompare(a.filed));
const company = await json(
  "https://data.sec.gov/api/xbrl/companyfacts/CIK0001046179.json",
);
const annual = filings.find((f) => f.form === "20-F" && f.end === "2025-12-31");
if (!annual) throw new Error("FY2025 20-F not found");
const xmlUrl = annual.url.replace(".htm", "_htm.xml");
const doc = new XMLParser({
  ignoreAttributes: false,
  parseTagValue: false,
  processEntities: false,
  removeNSPrefix: true,
}).parse(await (await response(xmlUrl)).text()).xbrl;
const contexts = new Map(array(doc.context).map((c) => [c["@_id"], c]));
const units = new Map(
  array(doc.unit).map((u) => [
    u["@_id"],
    u.measure ??
      `${u.divide?.unitNumerator?.measure}/${u.divide?.unitDenominator?.measure}`,
  ]),
);
const tags = {
  revenue: ["RevenueFromContractsWithCustomers", "Revenue"],
  grossProfit: ["GrossProfit"],
  operatingIncome: ["ProfitLossFromOperatingActivities"],
  netIncome: ["ProfitLossAttributableToOwnersOfParent"],
  dilutedEps: ["DilutedEarningsLossPerShare"],
  dilutedShares: ["AdjustedWeightedAverageShares"],
  operatingCashFlow: ["CashFlowsFromUsedInOperatingActivities"],
  capex: ["PurchaseOfPropertyPlantAndEquipmentClassifiedAsInvestingActivities"],
  depreciation: ["AdjustmentsForDepreciationExpense", "DepreciationExpense"],
  amortization: ["AdjustmentsForAmortisationExpense", "AmortisationExpense"],
  leasePrincipal: ["PaymentsOfLeaseLiabilitiesClassifiedAsFinancingActivities"],
  dividends: ["DividendsPaidClassifiedAsFinancingActivities", "DividendsPaid"],
  cash: ["CashAndCashEquivalents"],
  assets: ["Assets"],
  liabilities: ["Liabilities"],
  equity: ["EquityAttributableToOwnersOfParent"],
  noncontrolling: ["NoncontrollingInterests"],
  inventory: ["Inventories"],
  debtCurrent: ["CurrentPortionOfLongtermBorrowings"],
  bondsNoncurrent: ["NoncurrentPortionOfNoncurrentBondsIssued"],
  bankNoncurrent: ["LongtermBorrowings"],
  spotShares: ["NumberOfSharesIssuedAndFullyPaid"],
};
const balance = new Set([
  "cash",
  "assets",
  "liabilities",
  "equity",
  "noncontrolling",
  "inventory",
  "debtCurrent",
  "bondsNoncurrent",
  "bankNoncurrent",
  "spotShares",
]);
function fact(key, end) {
  const unit =
    key === "dilutedEps"
      ? "TWD/shares"
      : ["dilutedShares", "spotShares"].includes(key)
        ? "shares"
        : "TWD";
  for (const tag of tags[key]) {
    const row = array(doc[tag]).find((r) => {
      const c = contexts.get(r["@_contextRef"]);
      if (!c || c.entity.segment || c.scenario) return false;
      const p = c.period;
      return (
        units.get(r["@_unitRef"]) ===
          (unit === "TWD"
            ? "iso4217:TWD"
            : unit === "TWD/shares"
              ? "iso4217:TWD/shares"
              : unit) &&
        (balance.has(key)
          ? p.instant === end
          : p.endDate === end && p.startDate === `${end.slice(0, 4)}-01-01`)
      );
    });
    if (row?.["#text"] != null)
      return {
        value: Number(row["#text"]),
        tag,
        url: xmlUrl,
        filed: annual.filed,
      };
    const rows = (company.facts["ifrs-full"][tag]?.units[unit] ?? [])
      .filter(
        (r) =>
          r.filed <= asOf &&
          r.form === "20-F" &&
          r.end === end &&
          (balance.has(key)
            ? !r.start
            : r.start === `${end.slice(0, 4)}-01-01`),
      )
      .sort((a, b) => b.filed.localeCompare(a.filed));
    if (rows.length) {
      const r = rows[0],
        filing = filings.find((f) => f.accessionNumber === r.accn);
      return {
        value: r.val,
        tag,
        url:
          filing?.url ??
          `https://www.sec.gov/Archives/edgar/data/1046179/${r.accn.replaceAll("-", "")}/`,
        filed: r.filed,
      };
    }
  }
  return { value: null, tag: null, url: null, filed: null };
}
const annualRows = Array.from({ length: 11 }, (_, i) => {
  const year = 2015 + i,
    end = `${year}-12-31`,
    provenance = Object.fromEntries(
      Object.keys(tags).map((k) => [k, fact(k, end)]),
    );
  const r = Object.fromEntries(
    Object.entries(provenance).map(([k, v]) => [k, v.value]),
  );
  for (const key of [
    "revenue",
    "grossProfit",
    "operatingIncome",
    "netIncome",
    "dilutedEps",
    "operatingCashFlow",
    "capex",
  ])
    if (r[key] == null) throw new Error(`${year}: missing ${key}`);
  return {
    year,
    period: String(year),
    end,
    basis: "IFRS / SEC 20-F",
    ...r,
    freeCashFlow: r.operatingCashFlow - r.capex,
    grossMargin: (r.grossProfit / r.revenue) * 100,
    operatingMargin: (r.operatingIncome / r.revenue) * 100,
    netMargin: (r.netIncome / r.revenue) * 100,
    fcfMargin: ((r.operatingCashFlow - r.capex) / r.revenue) * 100,
    roe: r.equity ? (r.netIncome / r.equity) * 100 : null,
    source: provenance.revenue.url,
    provenance,
  };
});
const cutoff = Date.parse("2026-10-04T00:00:00Z") / 1000;
async function prices(ticker) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?period1=1420070400&period2=${cutoff}&interval=1d&events=splits`;
  const result = (await json(url)).chart.result?.[0];
  if (!result) throw new Error(`Missing prices ${ticker}`);
  return {
    url,
    rows: result.timestamp
      .map((t, i) => ({
        date: new Date(t * 1000).toISOString().slice(0, 10),
        close: result.indicators.quote[0].close[i],
      }))
      .filter((r) => Number.isFinite(r.close)),
    splits: result.events?.splits ?? {},
  };
}
const taiwan = await prices("2330.TW"),
  ads = await prices("TSM");
const valuation = annualRows.map((r) => {
  const close = taiwan.rows.filter((p) => p.date <= r.end).at(-1);
  const marketCap = close && r.spotShares ? close.close * r.spotShares : null;
  return {
    year: r.year,
    date: close?.date ?? null,
    close: close?.close ?? null,
    shares: r.spotShares,
    marketCap,
    pe: marketCap && r.netIncome > 0 ? marketCap / r.netIncome : null,
    ps: marketCap ? marketCap / r.revenue : null,
    fcfYield: marketCap ? (r.freeCashFlow / marketCap) * 100 : null,
  };
});
await mkdir(root, { recursive: true });
const emit = async (file, name, value) =>
  writeFile(
    new URL(file, root),
    `// Generated by scripts/update-tsmc-sec-data.mjs; cutoff ${asOf}.\nexport const ${name} = ${JSON.stringify(value, null, 2)};\n`,
  );
await emit("filings.ts", "TSM_FILINGS", filings);
await emit("annualFinancials.ts", "TSM_ANNUAL", annualRows);
const snapshot = JSON.parse(
  await readFile(
    new URL("./data/tsmc-quarterly-inputs.json", import.meta.url),
    "utf8",
  ),
);
if (
  snapshot.units !== "NTD millions except ordinary-share EPS" ||
  snapshot.rows.length !== 10
)
  throw new Error("Unexpected quarterly input coverage or units");
const quarters = snapshot.rows.map((input) => {
  const r = { ...input };
  for (const key of [
    "revenue",
    "grossProfit",
    "operatingIncome",
    "netIncome",
    "operatingCashFlow",
    "capex",
    "depreciation",
  ]) {
    if (!Number.isFinite(r[key]))
      throw new Error(`Invalid ${input.period} ${key}`);
    r[key] *= 1e6;
  }
  if (!r.source.startsWith("https://investor.tsmc.com/"))
    throw new Error("Unexpected quarterly source");
  return {
    ...r,
    freeCashFlow: r.operatingCashFlow - r.capex,
    grossMargin: (r.grossProfit / r.revenue) * 100,
    operatingMargin: (r.operatingIncome / r.revenue) * 100,
    netMargin: (r.netIncome / r.revenue) * 100,
    fcfMargin: ((r.operatingCashFlow - r.capex) / r.revenue) * 100,
  };
});
await writeFile(
  new URL("quarterlyFinancials.ts", root),
  `// Generated from curated issuer input snapshot; local TIFRS, not SEC annual IFRS.\nexport const TSM_QUARTER_SOURCES = ${JSON.stringify(snapshot.sources, null, 2)};\nexport const TSM_QUARTERLY = ${JSON.stringify(quarters, null, 2)};\nexport const TSM_TTM = ${JSON.stringify(Object.fromEntries(["revenue", "operatingIncome", "netIncome", "operatingCashFlow", "capex", "freeCashFlow"].map((k) => [k, quarters.slice(-4).reduce((s, r) => s + r[k], 0)])), null, 2)};\n`,
);
await writeFile(
  new URL("valuationHistory.ts", root),
  `// Year-end TWSE prices are matched to ordinary shares and IFRS annual earnings. Ex-post, not a historical trading backtest.\nexport const TSM_PRICE_SOURCES = ${JSON.stringify({ taiwan: taiwan.url, ads: ads.url }, null, 2)};\nexport const TSM_LATEST_PRICE = ${JSON.stringify(ads.rows.at(-1), null, 2)};\nexport const TSM_TAIWAN_PRICE = ${JSON.stringify(taiwan.rows.at(-1), null, 2)};\nexport const TSM_VALUATION_HISTORY = ${JSON.stringify(valuation, null, 2)};\nexport const TSM_SPLITS = ${JSON.stringify({ taiwan: taiwan.splits, ads: ads.splits }, null, 2)};\n`,
);
console.log(
  `Generated ${filings.length} filings, ${annualRows.length} IFRS years; ADS close ${JSON.stringify(ads.rows.at(-1))}`,
);
