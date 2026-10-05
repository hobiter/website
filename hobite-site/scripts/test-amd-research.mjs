import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import ts from "typescript";
import { adapt, mirror } from "./mirror-amd-research.mjs";
const root = new URL(
    "../app/research/amd-complete-fundamental-analysis/",
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
const { AMD_ANNUAL: a } = await get("annualFinancials"),
  { AMD_QUARTERLY: q } = await get("quarterlyFinancials");
const { AMD_SEGMENTS: segments, AMD_OPERATING: op } =
  await get("operatingMetrics");
const {
  AMD_MODEL_INPUTS: i,
  AMD_FORECASTS: f,
  AMD_DCF_CASES: c,
  amdDcf,
} = await get("forecastModel");
const { AMD_VALUATION_HISTORY: h, AMD_LATEST_PRICE: p } =
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
assert.equal(a.at(-1).revenue, 34639e6);
assert.equal(a.at(-1).netIncome, 4335e6);
assert.equal(a.at(-1).operatingIncome, 3694e6);
assert.equal(q.at(-1).revenue, 11536e6);
assert.equal(q.at(-1).grossProfit, 6203e6);
assert.equal(q.at(-1).operatingIncome, 1990e6);
assert.equal(q.at(-1).netIncome, 2297e6);
assert.equal(q.at(-1).debt, 3226e6);
assert.equal(q.at(-1).freeCashFlow, 1558e6);
assert.equal(q.at(-1).depreciation, 765e6);
assert.equal(q.find((r) => r.period === "FY2013 Q1").end, "2013-03-30");
for (const r of [...a, ...q]) {
  assert.ok(r.filed <= "2026-10-04");
  assert.match(r.source, /^https:\/\/www.sec.gov\//);
  for (const k of [
    "revenue",
    "costOfSales",
    "operatingIncome",
    "netIncome",
    "operatingCashFlow",
    "capex",
  ])
    assert.ok(r[k] != null, `${r.period} missing ${k}`);
  close(r.freeCashFlow, r.operatingCashFlow - r.capex);
  close(r.grossProfit, r.revenue - r.costOfSales);
  if (r.assets != null && r.liabilities != null && r.totalEquity != null) {
    close(r.assets, r.liabilities + r.totalEquity);
    close(r.balanceOutsideEquity, 0);
  }
  if (r.equity <= 0) assert.equal(r.roe, null);
  if (r.quarter === 4) {
    assert.equal(r.dilutedEps, null);
    assert.equal(r.dilutedShares, null);
  }
  for (const [key, v] of Object.entries(r.provenance))
    if (v?.unit)
      assert.equal(
        v.unit,
        ["dilutedShares", "spotShares"].includes(key)
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
    "operatingIncome",
    "netIncome",
    "operatingCashFlow",
    "capex",
    "research",
  ])
    close(
      rows.reduce((sum, p) => sum + p[k], 0),
      r[k],
    );
}
close(
  segments.reduce((sum, r) => sum + r.q2Revenue, 0),
  11536,
);
close(
  segments.reduce((sum, r) => sum + r.q2OperatingIncome, 0) + op.allOther,
  op.gaapOperatingIncome,
);
close(
  op.gaapOperatingIncome +
    op.stockComp +
    op.acquiredAmortization +
    op.acquisitionOther +
    op.legalContingency,
  op.nonGaapOperatingIncome,
);
close(op.h1OperatingCash - op.h1Capex, op.h1Fcf);
close(op.q2OperatingCash - op.q2Capex, op.q2Fcf);
close(
  q.filter((r) => r.year === 2026).reduce((s, r) => s + r.freeCashFlow, 0),
  op.h1Fcf * 1e6,
);
assert.equal(op.warrantSharesTotal, 320);
assert.equal(op.warrantVestedAtQuarterEnd, 0);
close(i.investmentReserve, 5);
for (const s of ["bear", "base", "bull"]) {
  assert.equal(f[s].length, 10);
  assert.equal(f[s][0].year, 2027);
  assert.equal(f[s][9].year, 2036);
  for (const r of f[s])
    close(
      r.fcff,
      r.nopat + r.otherDa + r.acquiredAmortization - r.capex - r.workingCapital,
    );
  close(f[s][9].acquiredAmortization, 0);
  assert.ok(c[s].terminalNetCapex > 0 && c[s].terminalWorkingCapital > 0);
  close(c[s].enterpriseValue, c[s].pvStub + c[s].pvCash + c[s].pvTerminal);
  close(
    c[s].equityValue,
    c[s].enterpriseValue +
      i.cash +
      i.securities -
      i.debt -
      i.investmentReserve +
      c[s].exerciseProceeds,
  );
  close(c[s].valuePerShare, c[s].equityValue / c[s].shares);
  assert.ok(
    amdDcf(s, 0.13, 0.02).valuePerShare < amdDcf(s, 0.1, 0.02).valuePerShare,
  );
}
assert.ok(
  c.bear.valuePerShare < c.base.valuePerShare &&
    c.base.valuePerShare < c.bull.valuePerShare,
);
assert.ok(
  amdDcf("base", 0.105, 0.03, 0.28, 0).valuePerShare >
    amdDcf("base", 0.105, 0.03, 0.28, 0.32).valuePerShare,
);
assert.throws(() => amdDcf("base", 0.03, 0.03));
assert.throws(() => amdDcf("base", NaN));
assert.throws(() => amdDcf("base", 0.105, 0.03, NaN));
assert.throws(() => amdDcf("base", 0.105, 0.03, 0.28, 0.4));
for (const r of h) {
  assert.ok(r.date <= r.end);
  if (r.marketCap != null) close(r.marketCap, r.close * r.shares);
  if (a.find((a) => a.year === r.year).netIncome <= 0)
    assert.equal(r.priceToEarnings, null);
}
const { AMD_REPORT: report } = await get("reportContent");
assert.equal(report.length, 13);
for (const r of report) {
  assert.ok(r.en.length > 200 && r.zh.length > 60);
  assert.ok(new URL(r.source).protocol === "https:");
}
const view = await readFile(new URL("AmdResearchView.tsx", root), "utf8");
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
    assert.ok(!m[0].includes("]("), `malformed URL ${m[0]}`);
}
const library = await readFile(
  new URL("../app/research/page.tsx", import.meta.url),
  "utf8",
);
assert.ok(library.includes("/research/amd-complete-fundamental-analysis/zh"));
for (const path of [
  "src/content/researchArticles.ts",
  "src/content/richResearchPages.ts",
]) {
  const s = await readFile(
    new URL(`../../../svim-labs/project-albatross/${path}`, import.meta.url),
    "utf8",
  );
  assert.ok(
    s.includes('"amd-complete-fundamental-analysis"') &&
      s.includes('"zh-amd-complete-fundamental-analysis"'),
  );
}
console.log(
  "PASS 15 annuals, 62 quarters, financial/model invariants, bilingual report and 14-file mirror parity",
  Object.fromEntries(
    Object.entries(c).map(([k, v]) => [k, v.valuePerShare.toFixed(2)]),
  ),
);
