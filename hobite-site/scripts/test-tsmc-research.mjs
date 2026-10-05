import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import ts from "typescript";
import { adapt, mirror } from "./mirror-tsmc-research.mjs";
const root = new URL(
  "../app/research/tsmc-complete-fundamental-analysis/",
  import.meta.url,
);
const modules = new Map();
async function load(name) {
  if (modules.has(name)) return modules.get(name);
  let code = ts.transpileModule(
    await readFile(new URL(`${name}.ts`, root), "utf8"),
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
const { TSM_ANNUAL: annual } = await get("annualFinancials");
const { TSM_QUARTERLY: quarters, TSM_TTM: ttm } = await get(
  "quarterlyFinancials",
);
const { TSM_FILINGS: filings } = await get("filings");
const {
  TSM_NODES: nodes,
  TSM_PLATFORMS: platforms,
  TSM_MONTHLY: monthly,
  TSM_OPERATING: op,
} = await get("operatingMetrics");
const {
  TSM_FORECASTS: forecasts,
  TSM_DCF_CASES: cases,
  TSM_MODEL_INPUTS: inputs,
  TSM_ASSUMPTIONS: assumptions,
  tsmDcf,
} = await get("forecastModel");
const { TSM_REPORT: memo } = await get("reportContent");
const { TSM_VALUATION_HISTORY: history, TSM_LATEST_PRICE: price } =
  await get("valuationHistory");
const close = (a, b, tolerance = 1e-10) =>
  assert.ok(
    Math.abs(a - b) <= Math.max(1e-6, Math.abs(b) * tolerance),
    `${a} != ${b}`,
  );
assert.equal(annual.length, 11);
assert.equal(quarters.length, 10);
assert.equal(annual.at(-1).revenue, 3809.0543e9);
assert.equal(annual.at(-1).netIncome, 1697.604e9);
assert.equal(annual.at(-1).dilutedEps, 65.47);
assert.equal(
  annual.at(-1).provenance.revenue.tag,
  "RevenueFromContractsWithCustomers",
);
assert.equal(annual.at(-1).provenance.revenue.filed, "2026-04-16");
assert.equal(annual.at(-1).operatingCashFlow, 2274.9756e9);
assert.equal(annual.at(-1).capex, 1272.4105e9);
for (const r of [...annual, ...quarters]) {
  close(r.freeCashFlow, r.operatingCashFlow - r.capex);
  close(r.operatingMargin, (r.operatingIncome / r.revenue) * 100);
  assert.ok(r.netIncome > 0 && r.revenue > r.netIncome);
}
for (const r of annual) {
  if (
    r.assets != null &&
    r.liabilities != null &&
    r.equity != null &&
    r.noncontrolling != null
  )
    close(r.assets, r.liabilities + r.equity + r.noncontrolling, 1e-7);
  for (const p of Object.values(r.provenance)) {
    if (p.value != null) {
      assert.ok(p.tag && p.url?.startsWith("https://www.sec.gov/"));
      assert.ok(p.filed <= "2026-10-04");
    }
  }
  if (r.dilutedShares != null)
    assert.ok(r.dilutedShares > 25e9 && r.dilutedShares < 27e9);
}
const sum = (rows, key) => rows.reduce((s, r) => s + r[key], 0);
for (const year of [2024, 2025]) {
  const rows = quarters.filter((r) => r.period.startsWith(String(year))),
    a = annual.find((r) => r.year === year);
  // Only compatible operating/cash lines reconcile; local TIFRS parent profit is deliberately different.
  for (const key of [
    "revenue",
    "grossProfit",
    "operatingIncome",
    "operatingCashFlow",
    "capex",
  ])
    assert.ok(Math.abs(sum(rows, key) - a[key]) <= 2e6);
}
assert.equal(
  sum(
    quarters.filter((r) => r.period.startsWith("2025")),
    "netIncome",
  ),
  1717.883e9,
);
assert.notEqual(
  sum(
    quarters.filter((r) => r.period.startsWith("2025")),
    "netIncome",
  ),
  annual.at(-1).netIncome,
);
assert.equal(quarters.find((r) => r.period === "2025 Q1").dilutedEps, null);
assert.equal(quarters.at(-1).dilutedEps, 27.25);
assert.equal(
  sum(quarters.slice(-2), "operatingCashFlow"),
  op.h126OperatingCashFlow,
);
assert.equal(sum(quarters.slice(-2), "revenue"), op.h126Revenue);
assert.equal(ttm.freeCashFlow, sum(quarters.slice(-4), "freeCashFlow"));
assert.equal(sum(nodes, "share"), 100);
assert.equal(sum(platforms, "share"), 100);
assert.equal(sum(monthly, "revenue"), 3386.87e9);
assert.equal(monthly.at(-1).month, "2026-08");
assert.equal(price.date, "2026-10-02");
close(price.close, 472.7799987792969);
assert.equal(inputs.adsRatio, 5);
assert.equal(inputs.fx, 32);
close(inputs.debt, 167.41e9 + 815.036716e9 + 49.226958e9);
assert.equal(inputs.cash, 3134.218e9);
for (const [scenario, rows] of Object.entries(forecasts)) {
  const a = assumptions[scenario],
    d = cases[scenario];
  assert.equal(rows.length, 10);
  for (const row of rows) {
    close(row.nopat, (row.operatingIncome - row.leaseInterest) * (1 - a.tax));
    close(
      row.freeCashFlow,
      row.nopat +
        row.depreciation -
        row.capex -
        row.workingCapital -
        row.leasePrincipal,
    );
    assert.ok(row.capex > row.depreciation && row.leasePrincipal > 0);
  }
  close(
    d.equityValue,
    d.enterpriseValue + inputs.cash - inputs.debt - inputs.noncontrolling,
  );
  close(d.adsValue, (d.ordinaryValue * 5) / 32);
  assert.ok(d.pvTerminal > 0 && d.terminalWeight < 100);
}
assert.ok(
  cases.bear.adsValue < cases.base.adsValue &&
    cases.base.adsValue < cases.bull.adsValue,
);
assert.ok(tsmDcf("base", 9, 3).adsValue > tsmDcf("base", 11, 3).adsValue);
assert.ok(tsmDcf("base", 10, 2).adsValue < tsmDcf("base", 10, 4).adsValue);
close(
  tsmDcf("base", 10, 3, 30).adsValue / tsmDcf("base", 10, 3, 34).adsValue,
  34 / 30,
);
for (const args of [
  ["base", 3, 3],
  ["base", 10, 3, 0],
  ["base", NaN, 3],
  ["base", 10, -1],
])
  assert.throws(() => tsmDcf(...args));
for (const r of history) {
  if (r.marketCap != null) {
    close(r.marketCap, r.close * r.shares);
    const a = annual.find((a) => a.year === r.year);
    close(r.pe, r.marketCap / a.netIncome);
    close(r.ps, r.marketCap / a.revenue);
    close(r.fcfYield, (a.freeCashFlow / r.marketCap) * 100);
  } else assert.equal(r.pe, null);
}
assert.equal(memo.length, 13);
for (const r of memo)
  assert.ok(
    r.en.length > 150 &&
      r.zh.length > 60 &&
      r.enTitle &&
      r.zhTitle &&
      new URL(r.source).protocol === "https:",
  );
let count = 0;
async function parity(from, to) {
  for (const f of await readdir(from, { withFileTypes: true })) {
    if (f.isDirectory())
      await parity(new URL(f.name + "/", from), new URL(f.name + "/", to));
    else {
      assert.equal(
        await readFile(new URL(f.name, to), "utf8"),
        adapt(await readFile(new URL(f.name, from), "utf8")),
        `Mirror mismatch ${f.name}`,
      );
      count++;
    }
  }
}
await parity(root, mirror);
const view = await readFile(new URL("TsmcResearchView.tsx", root), "utf8");
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
assert.ok(view.includes("max-w-full overflow-x-auto"));
const library = await readFile(
  new URL("../app/research/page.tsx", import.meta.url),
  "utf8",
);
assert.ok(library.includes("/research/tsmc-complete-fundamental-analysis/zh"));
console.log(
  `PASS: IFRS/local-TIFRS arithmetic, ADS/FX, DCF, coverage and ${count} mirrored files.`,
);
console.log(
  "DCF ADS values:",
  Object.fromEntries(
    Object.entries(cases).map(([k, v]) => [
      k,
      Math.round(v.adsValue * 100) / 100,
    ]),
  ),
);
