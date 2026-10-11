import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";
import { root, mirror, files, adapt } from "./mirror-lulu-research.mjs";
const modules = new Map();
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
const { ANNUAL: a, QUARTERLY: q, FILINGS: f } = await get("secData");
const { forecast, SHARES, CASES } = await get("forecastModel");
const { REPORT } = await get("reportContent");
const { LATEST_PRICE: p, VALUATION_HISTORY: h } = await get("valuationHistory");
const close = (x, y) =>
  assert.ok(
    Math.abs(x - y) < Math.max(1e-7, Math.abs(y) * 1e-10),
    `${x} != ${y}`,
  );
assert.equal(a.length, 11);
assert.equal(a[0].fy, 2015);
assert.equal(a.at(-1).fy, 2025);
assert.equal(q.length, 26);
assert.equal(q.at(-1).end, "2026-08-02");
assert.equal(p.date, "2026-10-09");
close(p.close, 94.5);
assert.equal(new Set(q.map((r) => `${r.fy}-${r.q}`)).size, q.length);
for (const r of [...a, ...q]) {
  close(r.fcf, r.p.ocf.value - r.p.capex.value);
  close(r.grossMargin, (r.p.grossProfit.value / r.p.revenue.value) * 100);
  for (const v of Object.values(r.p)) {
    assert.ok(v.value == null || Number.isFinite(v.value));
    if (v.value != null)
      assert.ok(v.source?.startsWith("https://www.sec.gov/"));
  }
}
for (const r of q.filter((r) => r.q === 4)) {
  assert.equal(r.p.eps.value, null);
  assert.equal(r.p.shares.value, null);
  const year = a.find((v) => v.fy === r.fy);
  for (const key of ["revenue", "netIncome", "ocf", "capex", "sbc", "buybacks"])
    close(
      q.filter((v) => v.fy === r.fy).reduce((s, v) => s + v.p[key].value, 0),
      year.p[key].value,
    );
}
close(q.at(-1).p.ocf.value, 374.838);
close(q.at(-1).p.cash.value, 1389.737);
close(q.at(-1).p.revenue.value, 2415.631);
assert.equal(h.length, a.length);
assert.ok(h.every((r) => r.priceDate <= r.fiscalEnd));
assert.ok(f.some((r) => r.form === "S-1"));
for (const horizon of [5, 10]) {
  const values = [];
  for (const s of Object.keys(CASES)) {
    const r = forecast(s, horizon);
    values.push(r.value);
    assert.equal(r.rows.length, horizon);
    close(r.equity, r.cashPv + r.terminalPv);
    close(r.value, r.equity / SHARES);
    close(
      r.terminalValue,
      (r.rows.at(-1).cash * (1 + CASES[s].terminal)) /
        (CASES[s].discount - CASES[s].terminal),
    );
    const pvAtIrr =
      r.rows.reduce(
        (sum, v) => sum + v.cash / SHARES / (1 + r.irr) ** v.year,
        0,
      ) +
      r.terminalValue / SHARES / (1 + r.irr) ** horizon;
    close(pvAtIrr, p.close);
    assert.ok(
      forecast(s, horizon, p.close, CASES[s].discount + 0.01).value < r.value,
    );
    assert.ok(forecast(s, horizon, p.close * 2).irr < r.irr);
  }
  assert.ok(values[0] < values[1] && values[1] < values[2]);
}
assert.throws(() => forecast("base", 10, 0));
assert.throws(() => forecast("base", 10, 100, 0.02, 0.02));
assert.equal(REPORT.length, 13);
assert.ok(
  REPORT.every(
    (s) =>
      s.title.length === 2 &&
      s.paragraphs.every((p) => p.every((t) => t.length > 50)),
  ),
);
for (const name of await files(root)) {
  const source = await readFile(new URL(name, root), "utf8");
  const target = await readFile(new URL(name, mirror), "utf8");
  assert.equal(
    target.replaceAll("\r\n", "\n"),
    adapt(source).replaceAll("\r\n", "\n"),
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
assert.ok(registry.includes('"lululemon-complete-fundamental-analysis"'));
assert.ok(registry.includes('"zh-lululemon-complete-fundamental-analysis"'));
console.log(
  "PASS: SEC coverage/provenance, quarterly reconciliation, price dates, DCF/IRR identities, sensitivity, bilingual report and exact SVIM parity.",
);
console.log(
  Object.keys(CASES).map((s) => ({
    scenario: s,
    value: forecast(s).value,
    irr: forecast(s).irr,
  })),
);
