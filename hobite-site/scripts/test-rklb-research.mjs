import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import ts from "typescript";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { root, mirror, files, adapt } from "./mirror-rklb-research.mjs";
const modules = new Map();
async function load(name) {
  if (modules.has(name)) return modules.get(name);
  let code = ts.transpileModule(
    await readFile(
      new URL(name + (name.endsWith("View") ? ".tsx" : ".ts"), root),
      "utf8",
    ),
    {
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
        jsx: ts.JsxEmit.ReactJSX,
      },
    },
  ).outputText;
  const require = createRequire(import.meta.url);
  for (const spec of ["react", "react/jsx-runtime"])
    code = code.replaceAll(
      `from "${spec}"`,
      `from "${pathToFileURL(require.resolve(spec)).href}"`,
    );
  for (const m of [...code.matchAll(/from ["']\.\/([^"'\n]+)["']/g)])
    code = code.replace(m[0], `from "${await load(m[1])}"`);
  const url = `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`;
  modules.set(name, url);
  return url;
}
const get = async (n) => import(await load(n));
const { ANNUAL: a, QUARTERLY: q, FILINGS: f, CUTOFF } = await get("secData");
const { LATEST_PRICE: p, VALUATION_HISTORY: h } = await get("valuationHistory");
const { CASES, forecast, BRIDGE, BASELINE } = await get("forecastModel");
const {
  OPERATIONS,
  ECONOMICS,
  exchangeRatio,
  transactionIllustration,
  SOURCES,
} = await get("operatingMetrics");
const { REPORT } = await get("reportContent");
const close = (x, y) =>
  assert.ok(
    Math.abs(x - y) < Math.max(1e-7, Math.abs(y) * 1e-9),
    `${x} != ${y}`,
  );
assert.equal(a.length, 6);
assert.equal(q.length, 10);
assert.equal(a[0].fy, 2020);
close(a[0].p.revenue.value, 35.16);
close(a.at(-1).p.revenue.value, 601.799);
close(q.at(-1).p.revenue.value, 234.066);
close(q.at(-1).p.netIncome.value, -49.258);
assert.equal(q.at(-1).end, "2026-06-30");
assert.equal(p.date, CUTOFF);
close(p.close, 55.25);
assert.equal(new Set(q.map((x) => `${x.fy}-${x.quarter}`)).size, 10);
for (const r of [...a, ...q]) {
  close(r.fcf, r.p.ocf.value - r.p.capex.value);
  close(r.grossMargin, r.p.grossProfit.value / r.p.revenue.value);
  for (const fact of Object.values(r.p))
    if (fact.value != null) {
      assert.ok(Number.isFinite(fact.value));
      assert.ok(fact.filed <= CUTOFF);
      assert.ok(
        fact.source.startsWith(
          "https://www.sec.gov/Archives/edgar/data/1819994/",
        ),
      );
      assert.ok(f.some((x) => x.source === fact.source));
      if (fact.otherSource)
        assert.ok(f.some((x) => x.source === fact.otherSource));
    }
}
assert.equal(a[0].roe, null);
for (const fy of [2024, 2025]) {
  const yr = a.find((x) => x.fy === fy),
    qr = q.filter((x) => x.fy === fy);
  for (const k of [
    "revenue",
    "grossProfit",
    "operatingIncome",
    "netIncome",
    "ocf",
    "capex",
    "da",
    "sbc",
    "acquisitions",
  ])
    close(
      qr.reduce((sum, r) => sum + r.p[k].value, 0),
      yr.p[k].value,
    );
  assert.equal(qr.at(-1).p.eps.value, null);
  assert.equal(qr.at(-1).p.weightedShares.value, null);
}
close(BRIDGE.cash, 2129.485);
close(BRIDGE.securities, 258.105);
close(BRIDGE.shares, 639.131688);
close(BRIDGE.debtCarrying, 14.845);
close(BASELINE.revenue - BASELINE.h1Revenue, 515.586);
assert.equal(ECONOMICS.firstNeutronTarget, "2027");
assert.equal(ECONOMICS.cancelledBridgeCommitment, 3600);
assert.equal(ECONOMICS.septemberAtmGross, 1944);
assert.ok(ECONOMICS.mayAtmGrossAtJune > 0);
assert.equal(ECONOMICS.expectedClosing, "mid-2027");
close(exchangeRatio(55.25), 0.4);
close(exchangeRatio(67.5), 0.4);
close(exchangeRatio(90), 0.3);
close(exchangeRatio(112.5), 0.24);
close(exchangeRatio(150), 0.24);
assert.throws(() => exchangeRatio(0));
assert.throws(() => transactionIllustration(90, -1));
const tx = transactionIllustration(90);
close(tx.newShares, 0.3 * 105.956272);
close(tx.cashConsideration, 27 * 105.956272);
close(tx.valuePerIridiumShare, 54);
for (const r of OPERATIONS) {
  const period = r.period.startsWith("FY")
    ? a.find((x) => `FY${x.fy}` === r.period)
    : null;
  if (period) {
    close(r.launchRevenue + r.spaceRevenue, period.p.revenue.value);
    close(r.launchGP + r.spaceGP, period.p.grossProfit.value);
  }
}
close(
  OPERATIONS.at(-1).launchRevenue + OPERATIONS.at(-1).spaceRevenue,
  q.at(-1).p.revenue.value,
);
assert.notEqual(
  OPERATIONS.at(-1).launchRevenue / 6,
  OPERATIONS.at(-1).revenuePerLaunch,
);
for (const r of h) {
  assert.ok(r.priceDate <= `${r.fy}-12-31`);
  close(r.marketCap, r.price * r.shares);
  assert.equal(r.pe, null);
}
close(h.at(-1).shares, 589.525802);
for (const s of Object.values(CASES))
  for (const years of [5, 10]) {
    const r = forecast(s, years);
    assert.equal(r.rows.length, years);
    assert.equal(r.rows[0].year, 2027);
    for (const row of r.rows) {
      close(row.revenue, row.core + row.neutron);
      close(row.neutron, row.missions * s.neutronPrice);
      close(
        row.fcff,
        row.ebit - row.tax + row.depreciation - row.capex - row.workingCapital,
      );
      close(row.pv, row.fcff / (1 + s.discount) ** row.t);
      assert.ok(row.capex >= row.depreciation - 1e-8);
    }
    close(r.enterprise, r.pvFlows + r.terminalPV);
    close(r.pvFlows, r.rows.reduce((x, y) => x + y.pv, 0) + r.stubPV);
    close(
      r.terminalPV,
      r.terminalFcff /
        (s.discount - s.terminalGrowth) /
        (1 + s.discount) ** (years + 0.5),
    );
    close(
      r.rawEquity,
      r.enterprise +
        BRIDGE.cash +
        BRIDGE.securities -
        BRIDGE.debtCarrying -
        BRIDGE.financeLeaseNoncurrent -
        BRIDGE.currentLeaseReserve,
    );
    close(
      r.valuePerShare,
      Math.max(0, r.rawEquity) /
        (BRIDGE.shares * (1 + s.dilution) ** (years + 0.5)),
    );
    assert.ok(r.negativeCashNeeds >= 200);
  }
assert.ok(
  forecast({ ...CASES.base, discount: 0.15 }).valuePerShare <
    forecast({ ...CASES.base, discount: 0.11 }).valuePerShare,
);
assert.ok(
  forecast({ ...CASES.base, dilution: 0.04 }).valuePerShare <
    forecast({ ...CASES.base, dilution: 0 }).valuePerShare,
);
for (const patch of [
  { discount: 0.02 },
  { growth: NaN },
  { dilution: -0.01 },
  { matureCapex: 0.02 },
  { neutronMissions: [1] },
])
  assert.throws(() => forecast({ ...CASES.base, ...patch }));
assert.equal(REPORT.length, 15);
for (const c of REPORT) {
  assert.ok(c.en.paragraphs.length >= 2 && c.zh.paragraphs.length >= 2);
  assert.ok(c.sources.length);
}
for (const [key, url] of Object.entries(SOURCES)) {
  assert.ok(new URL(url).protocol === "https:", key);
  assert.ok(!url.includes("undefined"));
}
const View = (await get("RocketLabResearchView")).default;
for (const lang of ["en", "zh"]) {
  const html = renderToStaticMarkup(createElement(View, { lang }));
  for (const id of [
    "report",
    "charts",
    "economics",
    "valuation",
    "transaction",
    "financials",
    "filings",
    "sources",
  ])
    assert.ok(html.includes(`id="${id}"`));
  assert.equal((html.match(/<figure /g) ?? []).length, 6);
  assert.ok(html.includes('data-testid="rklb-scenario"'));
  assert.ok(html.includes("55.25"));
  assert.ok(html.includes("2027"));
  assert.ok(!html.includes("NaN"));
}
for (const name of await files(root))
  assert.equal(
    (await readFile(new URL(name, mirror), "utf8")).replaceAll("\r\n", "\n"),
    adapt(await readFile(new URL(name, root), "utf8")).replaceAll("\r\n", "\n"),
    `Mirror differs: ${name}`,
  );
for (const file of [
  "src/content/researchArticles.ts",
  "src/content/richResearchPages.ts",
]) {
  const data = await readFile(
    new URL("../../../svim-labs/project-albatross/" + file, import.meta.url),
    "utf8",
  );
  assert.ok(data.includes('"rocket-lab-complete-fundamental-analysis"'));
  assert.ok(data.includes('"zh-rocket-lab-complete-fundamental-analysis"'));
}
console.log(
  "RKLB financial provenance, quarter reconciliation, model identities, transaction collar, bilingual SSR and exact mirror passed.",
);
console.log(
  JSON.stringify(
    Object.fromEntries(
      Object.entries(CASES).map(([k, s]) => {
        const r = forecast(s);
        return [
          k,
          {
            value: r.valuePerShare,
            ev: r.enterprise,
            terminalShare: r.terminalShare,
          },
        ];
      }),
    ),
    null,
    2,
  ),
);
