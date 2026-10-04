import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import ts from "typescript";
import { adapt, mirror } from "./mirror-amazon-research.mjs";
const root = new URL(
  "../app/research/amazon-complete-fundamental-analysis/",
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
  for (const m of [...code.matchAll(/from "\.\/([^"\n]+)"/g)])
    code = code.replace(m[0], `from "${await load(m[1])}"`);
  const url = `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`;
  modules.set(name, url);
  return url;
}
const get = async (name) => import(await load(name));
const { AMZN_ANNUAL: annual } = await get("annualFinancials");
const { AMZN_QUARTERLY: quarters } = await get("quarterlyFinancials");
const { AMZN_SEGMENTS: segments, AMZN_CHANNELS: channels } =
  await get("segmentEconomics");
const {
  AMZN_FORECASTS: forecasts,
  AMZN_DCF_CASES: cases,
  AMZN_MODEL_INPUTS: inputs,
  AMZN_ASSUMPTIONS: assumptions,
  AMZN_DCF_SENSITIVITY: sensitivity,
  amazonDcf,
} = await get("forecastModel");
const { AMZN_LATEST_PRICE: price, AMZN_VALUATION_HISTORY: history } =
  await get("valuationHistory");
const { AMZN_CASH_BRIDGE: bridge, AMZN_OPERATING: operating } =
  await get("operatingMetrics");
const { AMZN_REPORT: memo } = await get("reportContent");
const { AMZN_FILINGS: filings } = await get("filings");
const close = (a, b) =>
  assert.ok(
    Math.abs(a - b) < Math.max(1e-8, Math.abs(b) * 1e-12),
    `${a} != ${b}`,
  );
assert.equal(annual.length, 15);
assert.equal(quarters.length, 62);
assert.equal(filings.length, 123);
assert.equal(annual.at(-1).revenue, 716.924e9);
assert.equal(annual.at(-1).operatingIncome, 79.975e9);
assert.equal(annual.at(-1).freeCashFlow, 11.194e9);
assert.equal(annual.find((r) => r.year === 2016).netCapex, 6.737e9);
assert.equal(annual.find((r) => r.year === 2016).capex, null);
assert.equal(annual.find((r) => r.year === 2016).freeCashFlow, 9.706e9);
assert.equal(annual.find((r) => r.year === 2017).capex, 11.955e9);
assert.equal(annual.find((r) => r.year === 2017).freeCashFlow, 8.376e9);
assert.equal(quarters.at(-1).period, "2026 Q2");
assert.equal(quarters.at(-1).revenue, 200.606e9);
assert.equal(quarters.at(-1).netIncome, 62.647e9);
assert.equal(quarters.at(-1).dilutedEps, 5.75);
assert.equal(
  quarters.slice(-2).reduce((s, r) => s + r.operatingCashFlow, 0),
  71.419e9,
);
assert.equal(
  quarters.slice(-4).reduce((s, r) => s + r.freeCashFlow, 0),
  -7.604e9,
);
for (const r of [...annual, ...quarters]) {
  if (r.capex != null && r.capexProceeds != null)
    assert.equal(r.netCapex, r.capex - r.capexProceeds);
  if (r.freeCashFlow != null)
    assert.equal(r.freeCashFlow, r.operatingCashFlow - r.netCapex);
  if (r.quarter === 4) {
    assert.equal(r.dilutedEps, null);
    const a = annual.find((a) => a.year === r.year),
      q = quarters.filter((q) => q.year === r.year && q.quarter < 4);
    for (const key of [
      "revenue",
      "operatingIncome",
      "operatingCashFlow",
      "capex",
    ])
      if (r[key] != null)
        assert.equal(r[key], a[key] - q.reduce((s, r) => s + r[key], 0));
  }
}
for (const r of annual) {
  assert.ok(r.dilutedShares > 8e9 && r.dilutedShares < 12e9);
  if (r.assets != null && r.equity != null)
    assert.equal(r.liabilities, r.assets - r.equity);
}
assert.equal(annual.find((r) => r.year === 2021).dilutedEps, 64.81 / 20);
for (const r of Object.values(bridge)) {
  assert.equal(r.freeCashFlow, r.operatingCashFlow - r.grossCapex + r.proceeds);
  assert.equal(
    r.afterPrincipal,
    r.freeCashFlow - r.financePrincipal - r.financingPrincipal,
  );
}
assert.equal(channels.length, 7);
assert.equal(
  channels.reduce((s, r) => s + r.revenue, 0),
  200.606e9,
);
for (const period of new Set(segments.map((r) => r.period))) {
  const group = segments.filter((r) => r.period === period);
  assert.equal(group.length, 3);
  const consolidated = period.startsWith("FY")
    ? annual.find((r) => `FY${r.year}` === period)
    : quarters.find((r) => r.period === period);
  if (consolidated) {
    assert.equal(
      group.reduce((s, r) => s + r.revenue, 0),
      consolidated.revenue,
    );
    assert.equal(
      group.reduce((s, r) => s + r.operatingIncome, 0),
      consolidated.operatingIncome,
    );
  }
}
assert.equal(price.date, "2026-10-02");
close(price.close, 251.52000427246094);
assert.equal(inputs.liquidAssetsProForma, 101.688e9);
assert.equal(inputs.debtClaims, 155.315e9);
assert.equal(inputs.investmentReference, 240.4e9);
assert.equal(inputs.shares, operating.dilutedSharesQ2);
for (const [scenario, result] of Object.entries(cases)) {
  const rows = forecasts[scenario],
    a = assumptions[scenario];
  assert.equal(rows.length, 10);
  assert.equal(rows[9].year, 2035);
  assert.equal(result.terminalGrowth, a.terminal);
  for (const row of rows) {
    close(row.revenue, row.northAmerica + row.international + row.aws);
    close(row.nopat, row.operatingIncome * (1 - a.tax));
    close(
      row.freeCashFlow,
      row.nopat + row.depreciation - row.investment - row.workingCapital,
    );
  }
  const fraction =
      (Date.UTC(2026, 11, 31) - Date.UTC(2026, 9, 4)) / (365.25 * 86400000),
    r = a.discount / 100,
    g = a.terminal / 100,
    last = rows[9];
  const cash = rows.reduce(
    (s, row, i) =>
      s +
      (i === 0 ? row.freeCashFlow / 4 : row.freeCashFlow) /
        (1 + r) ** (fraction + i),
    0,
  );
  const terminalCash =
    (last.nopat + last.depreciation - last.investment) * (1 + g) -
    last.revenue * g * a.workingCapital;
  const terminal = terminalCash / (r - g) / (1 + r) ** (fraction + 9);
  const option = 240.4e9 * a.investmentRecovery * 0.8 - 15e9;
  close(result.pvFcf, cash);
  close(result.pvTerminal, terminal);
  close(result.investmentValue, option);
  close(result.coreEquity, cash + terminal + 101.688e9 - 155.315e9);
  close(result.valuePerShare, (result.coreEquity + option) / 10.903e9);
  close(result.upsidePercent, (result.valuePerShare / price.close - 1) * 100);
}
assert.ok(
  cases.bear.valuePerShare < cases.base.valuePerShare &&
    cases.base.valuePerShare < cases.bull.valuePerShare,
);
assert.ok(forecasts.base[0].freeCashFlow < 0);
close(sensitivity[1].values[1], cases.base.valuePerShare);
for (const row of sensitivity)
  assert.ok(row.values[0] < row.values[1] && row.values[1] < row.values[2]);
assert.ok(
  sensitivity[0].values[1] > sensitivity[1].values[1] &&
    sensitivity[1].values[1] > sensitivity[2].values[1],
);
assert.throws(() => amazonDcf("base", 3, 3));
assert.equal(history.find((r) => r.year === 2022).priceToEarnings, null);
assert.ok(filings.every((r) => r.filed <= "2026-10-04"));
assert.equal(memo.length, 13);
for (const r of memo) {
  assert.ok(r.thesisZh.length > 30);
  assert.equal(r.bullets.length, r.bulletsZh.length);
}
async function parity(directory, relative = "") {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const file = relative + item.name;
    if (item.isDirectory()) {
      await parity(new URL(`${item.name}/`, directory), `${file}/`);
      continue;
    }
    const expected = adapt(
        await readFile(new URL(item.name, directory), "utf8"),
      ),
      actual = await readFile(new URL(file, mirror), "utf8");
    assert.equal(
      actual.replaceAll("\r\n", "\n"),
      expected.replaceAll("\r\n", "\n"),
      `Mirror: ${file}`,
    );
  }
}
await parity(root);
const library = await readFile(
  new URL("../app/research/page.tsx", import.meta.url),
  "utf8",
);
assert.ok(
  library.includes('href: "/research/amazon-complete-fundamental-analysis"'),
);
assert.ok(
  library.includes('href: "/research/amazon-complete-fundamental-analysis/zh"'),
);
const registry = await readFile(
  new URL(
    "../../../svim-labs/project-albatross/src/content/researchArticles.ts",
    import.meta.url,
  ),
  "utf8",
);
for (const slug of [
  "amazon-complete-fundamental-analysis",
  "zh-amazon-complete-fundamental-analysis",
])
  assert.ok(registry.includes(`slug: "${slug}"`));
if (process.argv.includes("--built")) {
  for (const [file, heading] of [
    ["amazon-complete-fundamental-analysis.html", "Amazon (AMZN)"],
    ["amazon-complete-fundamental-analysis/zh.html", "亚马逊（AMZN）"],
  ]) {
    const html = await readFile(
      new URL(`../.next/server/app/research/${file}`, import.meta.url),
      "utf8",
    );
    assert.ok(html.includes(heading));
    assert.ok(html.includes("$251.52"));
    assert.ok(html.includes("2026-10-04"));
    assert.ok(html.includes("171.90"));
    assert.ok(html.includes("217.3%"));
    assert.ok(html.includes("3.5%"));
  }
  console.log(
    "PASS: English and Chinese production HTML includes verified inputs and computed valuations.",
  );
}
console.log(
  "PASS: Amazon financial, split, segment/channel, cash bridge, independent DCF, translation and SVIM parity checks.",
);
console.log(
  Object.fromEntries(
    Object.entries(cases).map(([s, r]) => [
      s,
      { valuePerShare: r.valuePerShare, terminalWeight: r.terminalWeight },
    ]),
  ),
);
