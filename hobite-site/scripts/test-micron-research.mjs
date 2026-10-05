import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import ts from "typescript";
import { adapt, mirror } from "./mirror-micron-research.mjs";
const root = new URL(
    "../app/research/micron-complete-fundamental-analysis/",
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
const get = async (name) => import(await load(name));
const { MU_ANNUAL: a } = await get("annualFinancials"),
  { MU_QUARTERLY: q } = await get("quarterlyFinancials");
const { MU_CASH_BRIDGE: cash } = await get("memoryEconomics"),
  { MU_RELEASE: release } = await get("operatingMetrics");
const {
  MU_MODEL_INPUTS: i,
  MU_FORECASTS: f,
  MU_DCF_CASES: c,
  micronDcf,
} = await get("forecastModel");
const { MU_VALUATION_HISTORY: h, MU_LATEST_PRICE: p } =
  await get("valuationHistory");
const close = (a, b, tolerance = 1e-9) =>
  assert.ok(
    Math.abs(a - b) <= Math.max(1e-6, Math.abs(b) * tolerance),
    `${a} != ${b}`,
  );
assert.equal(a.length, 16);
assert.equal(q.length, 64);
assert.equal(new Set(q.map((r) => r.period)).size, q.length);
assert.equal(p.date, "2026-10-02");
assert.equal(a.at(-1).form, "8-K exhibit");
assert.equal(q.at(-1).dilutedEps, 32.87);
assert.equal(a.at(-1).revenue, 133188e6);
assert.equal(a.at(-2).revenue, 37378e6);
assert.equal(a.at(-2).debt, 14577e6);
assert.equal(q.at(-2).debt, 5722e6);
assert.equal(q.at(-2).revenue, 41456e6);
assert.equal(a.find((r) => r.year === 2023).netIncome, -5833e6);
for (const r of [...a, ...q]) {
  assert.ok(r.filed <= "2026-10-04");
  assert.match(r.source, /^https:\/\/www.sec.gov\//);
  for (const k of [
    "revenue",
    "operatingIncome",
    "netIncome",
    "operatingCashFlow",
    "capex",
  ])
    assert.ok(r[k] != null, `${r.period} missing ${k}`);
  close(r.freeCashFlow, r.operatingCashFlow - r.capex);
  if (r.grossProfit != null) close(r.grossProfit, r.revenue - r.costOfSales);
  if (r.assets != null && r.liabilities != null && r.totalEquity != null) {
    close(r.assets, r.liabilities + r.totalEquity + r.balanceOutsideEquity);
    assert.ok(r.balanceOutsideEquity >= 0 && r.balanceOutsideEquity <= 100e6);
  }
  if (r.quarter === 4 && r.form !== "8-K exhibit")
    assert.equal(r.dilutedEps, null);
  for (const [key, v] of Object.entries(r.provenance))
    if (v?.unit)
      assert.equal(
        v.unit,
        ["spotShares", "dilutedShares"].includes(key)
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
    "operatingIncome",
    "netIncome",
    "operatingCashFlow",
    "capex",
  ])
    close(
      rows.reduce((s, p) => s + p[k], 0),
      r[k],
      1e-5,
    );
}
assert.equal(
  release.segments.reduce((s, r) => s + r.q4Revenue, 0),
  54223,
); // Issuer segment rounding leaves $6M unallocated.
for (const r of cash) {
  close(r.grossFcf, r.operatingCash - r.grossCapex);
  close(r.adjustedFcf, r.grossFcf + r.sales + r.incentives);
}
close(cash[0].adjustedFcf, 62.308);
close(cash[1].adjustedFcf, 33.199);
close(i.contractReserve, 12.895);
close(i.shares, 1.147);
for (const s of ["bear", "base", "bull"]) {
  assert.equal(f[s].length, 10);
  assert.equal(f[s][0].year, 2027);
  assert.equal(f[s][9].year, 2036);
  assert.ok(f[s].some((r) => r.growth < 0));
  for (const r of f[s])
    close(
      r.fcff,
      r.nopat + r.depreciation - r.capex - r.workingCapital - r.leasedAssets,
    );
  assert.ok(c[s].terminalNetCapex > 0);
  assert.ok(c[s].terminalWorkingCapital > 0);
  close(
    c[s].equityValue,
    c[s].enterpriseValue + i.cash + i.securities - i.debt - i.contractReserve,
  );
  close(c[s].valuePerShare, c[s].equityValue / i.shares);
  assert.ok(
    micronDcf(s, 0.13, 0.02).valuePerShare <
      micronDcf(s, 0.1, 0.02).valuePerShare,
  );
}
assert.ok(
  c.bear.valuePerShare < c.base.valuePerShare &&
    c.base.valuePerShare < c.bull.valuePerShare,
);
assert.throws(() => micronDcf("base", 0.03, 0.03));
assert.throws(() => micronDcf("base", NaN));
for (const r of h) {
  assert.ok(r.date <= r.end);
  if (r.marketCap != null) close(r.marketCap, r.close * r.shares);
  if (a.find((a) => a.year === r.year).netIncome <= 0)
    assert.equal(r.priceToEarnings, null);
}
if (process.argv.includes("--data-only")) {
  console.log(
    "PASS financial/model invariants",
    Object.fromEntries(
      Object.entries(c).map(([s, r]) => [s, r.valuePerShare.toFixed(2)]),
    ),
  );
  process.exit(0);
}
const { MU_REPORT: report } = await get("reportContent");
assert.equal(report.length, 13);
for (const r of report) assert.ok(r.en.length > 100 && r.zh.length > 70);
let count = 0;
async function parity(from, to) {
  for (const f of await readdir(from, { withFileTypes: true })) {
    if (f.isDirectory())
      await parity(new URL(f.name + "/", from), new URL(f.name + "/", to));
    else {
      assert.equal(
        await readFile(new URL(f.name, to), "utf8"),
        adapt(await readFile(new URL(f.name, from), "utf8")),
        f.name,
      );
      count++;
    }
  }
}
await parity(root, mirror);
assert.equal(count, 14);
const view = await readFile(new URL("MicronResearchView.tsx", root), "utf8");
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
const library = await readFile(
  new URL("../app/research/page.tsx", import.meta.url),
  "utf8",
);
assert.ok(
  library.includes("/research/micron-complete-fundamental-analysis/zh"),
);
const registry = await readFile(
  new URL(
    "../../../svim-labs/project-albatross/src/content/richResearchPages.ts",
    import.meta.url,
  ),
  "utf8",
);
assert.ok(registry.includes('"zh-micron-complete-fundamental-analysis"'));
console.log(
  `PASS financial/model checks, bilingual coverage and ${count} mirrored files.`,
  Object.fromEntries(
    Object.entries(c).map(([s, r]) => [s, r.valuePerShare.toFixed(2)]),
  ),
);
