import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { root, mirror, files, adapt } from "./mirror-crwv-research.mjs";
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
const { ANNUAL: a, QUARTERLY: q, FILINGS: f } = await get("secData");
const { forecast, SHARES, BRIDGE, CASES } = await get("forecastModel");
const { REPORT } = await get("reportContent");
const { LATEST_PRICE: p, VALUATION_HISTORY: h } = await get("valuationHistory");
const { DISCLOSURES: d } = await get("operatingMetrics");
const close = (x, y) =>
  assert.ok(
    Math.abs(x - y) < Math.max(1e-7, Math.abs(y) * 1e-9),
    `${x} != ${y}`,
  );
assert.equal(a.length, 4);
assert.equal(a[0].fy, 2022);
close(a[0].p.revenue.value, 15.83);
assert.equal(a[0].p.revenue.review, "manual-extraction");
assert.equal(
  a[0].p.revenue.filed,
  f.find((v) => v.source === a[0].p.revenue.source).filed,
);
assert.equal(q.length, 6);
assert.equal(q.at(-1).end, "2026-06-30");
assert.equal(p.date, "2026-10-12");
close(p.close, 80.26000213623047);
assert.equal(new Set(q.map((r) => `${r.fy}-${r.q}`)).size, q.length);
for (const r of [...a, ...q]) {
  close(r.fcf, r.p.ocf.value - r.p.capex.value);
  close(
    r.operatingMargin,
    (r.p.operatingIncome.value / r.p.revenue.value) * 100,
  );
  for (const v of Object.values(r.p))
    if (v.value != null) {
      assert.ok(Number.isFinite(v.value));
      assert.ok(v.source?.startsWith("https://www.sec.gov/"));
    }
}
for (const r of q.filter((r) => r.q === 4)) {
  assert.equal(r.p.eps.value, null);
  assert.equal(r.p.shares.value, null);
  const year = a.find((v) => v.fy === r.fy);
  for (const k of [
    "revenue",
    "operatingIncome",
    "netIncome",
    "ocf",
    "capex",
    "da",
    "sbc",
  ])
    close(
      q.filter((v) => v.fy === r.fy).reduce((s, v) => s + v.p[k].value, 0),
      year.p[k].value,
    );
}
close(q.at(-1).p.ocf.value, 679);
close(q.at(-1).p.capex.value, 6422);
close(q.at(-1).p.debtPrincipal.value, 35551);
close(q.at(-1).p.rpo.value, 103700);
close(
  q.at(-1).p.restrictedCurrent.value + q.at(-1).p.restrictedNoncurrent.value,
  1380,
);
close(SHARES, 551.536602);
close(BRIDGE.newNetCash, 3570.8);
close(BRIDGE.debt, 39751);
close(d.september.conversionShares, (4200 * 1000 * 10.2194) / 1e6);
assert.ok(f.some((r) => r.form === "S-1"));
assert.ok(f.some((r) => r.form === "424B4"));
assert.ok(
  h.filter((r) => r.fy < 2025).every((r) => r.close === null && r.cap === null),
);
assert.equal(h.at(-1).shareDate, "2026-01-31");
for (const horizon of [5, 10]) {
  const values = [];
  for (const s of Object.keys(CASES)) {
    const c = CASES[s],
      r = forecast(s, horizon);
    values.push(r.rawEquity);
    assert.equal(r.rows.length, horizon);
    close(r.enterprise, r.flowPv + r.terminalPv);
    close(r.flowPv, r.stub.pv + r.rows.reduce((sum, v) => sum + v.pv, 0));
    close(
      r.rawEquity,
      r.enterprise - BRIDGE.debt - BRIDGE.financeLease + BRIDGE.cash,
    );
    close(r.value, Math.max(0, r.rawEquity) / r.shares);
    close(r.shares, SHARES * (1 + c.dilution) ** horizon);
    assert.ok(r.stub.fcff < 0);
    for (const row of r.rows) {
      close(row.fcff, row.ebit - row.tax + row.da - row.capex - row.wc);
      close(row.pv, row.fcff / (1 + c.discount) ** row.time);
      assert.equal(row.time, row.year + 0.5);
    }
    const last = r.rows.at(-1),
      next = last.revenue * (1 + c.terminal);
    close(
      r.terminalCash,
      next * c.operatingMargin[1] * (1 - c.tax) -
        (next - last.revenue) * (c.capitalSales[1] + c.wc),
    );
    close(
      forecast(s, horizon, p.close, c.discount, c.terminal, BRIDGE.cash + 100)
        .rawEquity,
      r.rawEquity + 100,
    );
    assert.ok(
      forecast(s, horizon, p.close, c.discount, c.terminal, BRIDGE.cash, 0.02)
        .rawEquity < r.rawEquity,
    );
    if (r.value > 0)
      assert.ok(
        forecast(
          s,
          horizon,
          p.close,
          c.discount,
          c.terminal,
          BRIDGE.cash,
          0,
          c.dilution + 0.02,
        ).value < r.value,
      );
  }
  assert.ok(values[0] < values[1] && values[1] < values[2]);
}
assert.throws(() => forecast("base", 10, 0));
assert.throws(() => forecast("base", 10, 100, 0.02, 0.02));
assert.throws(() => forecast("base", 10, 100, 0.14, 0.02, -1));
assert.throws(() => forecast("base", 10, 100, 0.14, 0.02, 100, -0.01));
assert.equal(REPORT.length, 15);
assert.ok(
  REPORT.every(
    (s) =>
      s.title.length === 2 &&
      s.paragraphs.every((p) => p.every((t) => t.length > 60)),
  ),
);
for (const name of await files(root)) {
  const s = await readFile(new URL(name, root), "utf8");
  const target = await readFile(new URL(name, mirror), "utf8");
  assert.equal(
    target.replaceAll("\r\n", "\n"),
    adapt(s).replaceAll("\r\n", "\n"),
    name,
  );
}
const registry = await readFile(
  new URL(
    "../../../svim-labs/project-albatross/src/content/richResearchPages.ts",
    import.meta.url,
  ),
  "utf8",
);
assert.ok(registry.includes('"coreweave-complete-fundamental-analysis"'));
assert.ok(registry.includes('"zh-coreweave-complete-fundamental-analysis"'));
console.log(
  "PASS: SEC coverage/provenance, quarterly and IPO extraction checks, bridge/DCF/sensitivity, bilingual content and exact SVIM mirror.",
);
const View = (await get("CoreweaveResearchView")).default;
for (const lang of ["en", "zh"]) {
  const html = renderToStaticMarkup(createElement(View, { lang }));
  for (const id of [
    "report",
    "charts",
    "model",
    "operations",
    "financials",
    "market",
    "filings",
    "audit",
  ])
    assert.ok(html.includes(`id="${id}"`), `${lang}: ${id}`);
  assert.ok(html.includes(`lang="${lang}"`));
  assert.ok(html.includes("2026-10-12"));
  assert.ok(html.includes("80.26"));
  assert.ok(html.includes("97.85"));
  assert.ok(html.includes("52.578540"));
  assert.ok(!html.includes("undefined"));
  assert.ok((html.match(/<figure/g) ?? []).length === 6);
}
console.log(
  "PASS: English/Chinese server-rendered article sections, figures, market date and final financing terms.",
);
console.log(
  Object.keys(CASES).map((s) => ({
    scenario: s,
    ...Object.fromEntries(
      ["rawEquity", "value", "negativeFunding"].map((k) => [k, forecast(s)[k]]),
    ),
  })),
);
