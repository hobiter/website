import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import ts from "typescript";
import { adapt, mirror } from "./mirror-lly-research.mjs";
const root = new URL(
    "../app/research/eli-lilly-complete-fundamental-analysis/",
    import.meta.url,
  ),
  modules = new Map();
async function load(name) {
  if (modules.has(name)) return modules.get(name);
  let code = ts.transpileModule(
    await readFile(new URL(name + ".ts", root), "utf8"),
    {
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
      },
    },
  ).outputText;
  for (const m of [...code.matchAll(/from ["']\.\/([^"'\n]+)["']/g)])
    code = code.replace(m[0], `from "${await load(m[1])}"`);
  const url = `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`;
  modules.set(name, url);
  return url;
}
const get = async (n) => import(await load(n));
const { LLY_ANNUAL: a } = await get("annualFinancials"),
  { LLY_QUARTERLY: q } = await get("quarterlyFinancials");
const {
  LLY_OPERATING: op,
  LLY_PRODUCTS: products,
  LLY_THERAPEUTIC: therapy,
} = await get("operatingMetrics");
const {
  LLY_MODEL_INPUTS: i,
  LLY_FORECASTS: f,
  LLY_DCF_CASES: c,
  llyDcf,
} = await get("forecastModel");
const { LLY_VALUATION_HISTORY: h, LLY_LATEST_PRICE: p } =
  await get("valuationHistory");
const close = (a, b) =>
  assert.ok(
    Math.abs(a - b) <= Math.max(1e-6, Math.abs(b) * 1e-9),
    `${a} != ${b}`,
  );
assert.equal(a.length, 15);
assert.equal(q.length, 62);
assert.equal(new Set(q.map((r) => r.period)).size, q.length);
assert.equal(a.at(-1).year, 2025);
assert.equal(q.at(-1).period, "FY2026 Q2");
assert.equal(p.date, "2026-10-02");
const latest = q.at(-1);
const first = q.find((r) => r.period === "FY2011 Q1");
close(first.iprd, 388e6);
close(first.operatingIncome, 1285.1e6);
close(first.capex, 101.4e6);
for (const [key, val] of Object.entries({
  revenue: 22974e6,
  grossProfit: 19706e6,
  operatingIncome: 8978e6,
  netIncome: 7095e6,
  debt: 54908e6,
  cash: 8950e6,
  capex: 2933e6,
  operatingCashFlow: 10690e6,
  freeCashFlow: 7757e6,
  depreciation: 534e6,
  iprdCash: 3282e6,
  acquisitionCash: 8747e6,
  dilutedShares: 8937e5,
  dilutedEps: 7.94,
}))
  close(latest[key], val);
close(a.at(-1).revenue, 65179e6);
close(a.at(-1).netIncome, 20640e6);
close(a.at(-1).freeCashFlow, 8972e6);
close(a.at(-1).spotShares, 9448e5 - 50e6);
for (const r of [...a, ...q]) {
  assert.ok(r.filed <= "2026-10-04");
  assert.match(r.source, /^https:\/\/www.sec.gov\//);
  for (const k of ["revenue", "costOfSales", "netIncome", "operatingCashFlow"])
    assert.ok(r[k] != null, `${r.period} missing ${k}`);
  if (r.capex != null) close(r.freeCashFlow, r.operatingCashFlow - r.capex);
  else assert.equal(r.freeCashFlow, null);
  close(r.grossProfit, r.revenue - r.costOfSales);
  if (r.operatingIncome != null) {
    assert.ok(r.provenance.operatingIncome);
    if (
      [r.research, r.marketing, r.iprd, r.specialCharges].every(
        (v) => v != null,
      )
    )
      close(
        r.operatingIncome,
        r.revenue -
          r.costOfSales -
          r.research -
          r.marketing -
          r.iprd -
          r.specialCharges,
      );
  }
  if (r.assets != null && r.liabilities != null && r.totalEquity != null)
    close(r.assets, r.liabilities + r.totalEquity);
  if (r.equity <= 0) assert.equal(r.roe, null);
  if (r.spotShares != null && r.issuedShares != null && r.trustShares != null)
    close(r.spotShares, r.issuedShares - r.trustShares);
  if (r.quarter === 4) {
    assert.equal(r.dilutedEps, null);
    assert.equal(r.dilutedShares, null);
  }
  for (const [key, v] of Object.entries(r.provenance))
    if (v?.unit)
      assert.equal(
        v.unit,
        ["dilutedShares", "spotShares", "issuedShares", "trustShares"].includes(
          key,
        )
          ? "shares"
          : key === "dilutedEps"
            ? "USD/shares"
            : "USD",
      );
}
for (const r of a) {
  const rows = q.filter((p) => p.year === r.year);
  assert.equal(rows.length, 4);
  for (const k of [
    "revenue",
    "costOfSales",
    "netIncome",
    "operatingIncome",
    "operatingCashFlow",
    "capex",
    "research",
    "marketing",
    "iprdCash",
    "acquisitionCash",
  ]) {
    if (r[k] != null && rows.every((p) => p[k] != null))
      close(
        rows.reduce((s, p) => s + p[k], 0),
        r[k],
      );
  }
}
const h1 = q.filter((r) => r.year === 2026);
for (const [key, val] of Object.entries({
  revenue: 42773e6,
  operatingCashFlow: 16023e6,
  capex: 5259e6,
  iprdCash: 3486e6,
  acquisitionCash: 9805e6,
  depreciation: 1043e6,
}))
  close(
    h1.reduce((s, r) => s + r[key], 0),
    val,
  );
close(op.h1Cfo - op.h1Capex, 10764);
close(op.h1Cfo - op.h1Capex - op.h1IprdCash, 7278);
close(op.h1Cfo - op.h1Capex - op.h1IprdCash - op.h1Acquisitions, -2527);
close(
  op.q2Revenue -
    op.q2Cost -
    op.q2Research -
    op.q2Marketing -
    op.q2Iprd -
    op.q2Special,
  op.q2Operating,
);
close(op.q2Operating + op.q2OtherIncome, op.q2Pretax);
close(
  op.q2Net +
    op.q2Amortization +
    op.q2Special -
    op.q2InvestmentGains +
    op.q2TaxAdjustment,
  op.q2AdjustedNet,
);
close(
  therapy.reduce((s, r) => s + r.q2, 0),
  op.q2Revenue,
);
assert.ok(Math.abs(therapy.reduce((s, r) => s + r.h1, 0) - op.h1Revenue) <= 1);
close(products[0].q2 + products[1].q2, 14871);
close(op.q2Us + op.q2International, op.q2Revenue);
for (const s of ["bear", "base", "bull"]) {
  assert.equal(f[s].length, 10);
  assert.equal(f[s][0].year, 2027);
  assert.equal(f[s][9].year, 2036);
  for (const r of f[s])
    close(
      r.fcff,
      r.nopat + r.depreciation - r.capex - r.workingCapital - r.pipelineCash,
    );
  assert.ok(
    c[s].terminalNetCapex > 0 &&
      c[s].terminalWorkingCapital > 0 &&
      c[s].terminalPipelineCash > 0,
  );
  close(c[s].enterpriseValue, c[s].pvStub + c[s].pvCash + c[s].pvTerminal);
  close(c[s].equityValue, c[s].enterpriseValue + i.cash - i.debt);
  close(c[s].valuePerShare, c[s].equityValue / c[s].shares);
  assert.ok(
    llyDcf(s, 0.12, 0.02).valuePerShare < llyDcf(s, 0.09, 0.02).valuePerShare,
  );
}
assert.ok(
  c.bear.valuePerShare < c.base.valuePerShare &&
    c.base.valuePerShare < c.bull.valuePerShare,
);
assert.ok(
  llyDcf("base", 0.09, 0.025, 0.4, 0, 0.03).valuePerShare >
    llyDcf("base", 0.09, 0.025, 0.4, 0, 0.07).valuePerShare,
);
assert.ok(
  llyDcf("base", 0.09, 0.025, 0.4, 0).valuePerShare >
    llyDcf("base", 0.09, 0.025, 0.4, 0.03).valuePerShare,
);
assert.ok(
  llyDcf("base", 0.09, 0.035).valuePerShare >
    llyDcf("base", 0.09, 0.015).valuePerShare,
);
assert.throws(() => llyDcf("base", 0.03, 0.03));
assert.throws(() => llyDcf("base", NaN));
assert.throws(() => llyDcf("base", 0.09, 0.025, NaN));
assert.throws(() => llyDcf("base", 0.09, 0.025, 0.4, -1));
assert.throws(() => llyDcf("base", 0.09, 0.025, 0.4, 0, -0.1));
for (const r of h) {
  assert.ok(r.date <= r.end);
  if (r.marketCap != null) close(r.marketCap, r.close * r.shares);
  if (a.find((a) => a.year === r.year).netIncome <= 0)
    assert.equal(r.priceToEarnings, null);
}
const { LLY_REPORT: report } = await get("reportContent");
assert.equal(report.length, 13);
for (const r of report) {
  assert.ok(r.en.length > 200 && r.zh.length > 60);
  assert.equal(new URL(r.source).protocol, "https:");
}
const view = await readFile(new URL("LillyResearchView.tsx", root), "utf8");
for (const id of [
  "report",
  "charts",
  "forecast",
  "valuation",
  "operations",
  "annual",
  "quarterly",
  "audit",
])
  assert.ok(view.includes(`id="${id}"`));
async function files(url, prefix = "") {
  let result = [];
  for (const e of await readdir(url, { withFileTypes: true })) {
    if (e.isDirectory())
      result.push(
        ...(await files(new URL(e.name + "/", url), prefix + e.name + "/")),
      );
    else result.push(prefix + e.name);
  }
  return result;
}
const names = await files(root);
assert.equal(names.length, 14);
for (const name of names) {
  const source = await readFile(new URL(name, root), "utf8");
  assert.equal(
    (await readFile(new URL(name, mirror), "utf8")).replaceAll("\r\n", "\n"),
    adapt(source).replaceAll("\r\n", "\n"),
    `mirror mismatch ${name}`,
  );
  for (const m of source.matchAll(/https:\/\/[^\s"'<>`]+/g))
    assert.ok(!m[0].includes("]("));
}
const library = await readFile(
  new URL("../app/research/page.tsx", import.meta.url),
  "utf8",
);
assert.ok(
  library.includes("/research/eli-lilly-complete-fundamental-analysis/zh"),
);
for (const path of [
  "src/content/researchArticles.ts",
  "src/content/richResearchPages.ts",
]) {
  const s = await readFile(
    new URL(`../../../svim-labs/project-albatross/${path}`, import.meta.url),
    "utf8",
  );
  assert.ok(
    s.includes('"eli-lilly-complete-fundamental-analysis"') &&
      s.includes('"zh-eli-lilly-complete-fundamental-analysis"'),
  );
}
console.log(
  "PASS 15 annuals, 62 quarters, GAAP/cash bridges, pharmaceutical model, EN/ZH and 14-module mirror",
  Object.fromEntries(
    Object.entries(c).map(([k, v]) => [k, v.valuePerShare.toFixed(2)]),
  ),
);
