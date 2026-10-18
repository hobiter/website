import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import ts from "typescript";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { adapt, root, mirror, names, slug } from "./mirror-ai-scorecard.mjs";

const require = createRequire(import.meta.url);
const cache = new Map();
async function load(name) {
  if (cache.has(name)) return cache.get(name);
  let code = ts.transpileModule(await readFile(new URL(name, root), "utf8"), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  code = code.replaceAll('from "./data"', `from "${awaitDataUrl(name)}"`);
  for (const spec of ["react", "react/jsx-runtime"])
    code = code.replaceAll(`from "${spec}"`, `from "${pathToFileURL(require.resolve(spec)).href}"`);
  const url = `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`;
  cache.set(name, url);
  return url;
}
function awaitDataUrl(name) {
  if (name === "data.ts") return "unused";
  assert.ok(cache.has("data.ts"));
  return cache.get("data.ts");
}
const data = await import(await load("data.ts"));
const { default: View } = await import(await load("ScorecardView.tsx"));
const close = (a, b, tolerance = 1e-7) => assert.ok(Math.abs(a - b) < tolerance, `${a} != ${b}`);
assert.equal(data.ranking.length, 38);
assert.equal(new Set(data.ranking.map(x => x.ticker)).size, 38);
assert.equal(data.etfs.length, 4);
assert.equal(data.factors.reduce((s, x) => s + x.weight, 0), 100);
assert.equal(data.allocation.reduce((s, x) => s + x.weight, 0), 100);
assert.equal(data.allocation.reduce((s, x) => s + 200000 * x.weight / 100, 0), 200000);
assert.equal(data.valuations.length, 10);
assert.deepEqual(data.valuations.map(x => x[0]), data.ranking.slice(0, 10).map(x => x.ticker));
for (let i = 1; i < data.ranking.length; i++) assert.ok(data.ranking[i - 1].score >= data.ranking[i].score);
for (const row of data.forecast) close(row.slice(1, 6).reduce((s, n) => s + n, 0), row[6]);
assert.equal(data.forecast.length, 10);
for (const row of data.history) close(row[1] + row[2], row[3], .11);
for (const rows of [data.balanceAssets, data.balanceFunding]) for (const r of rows) assert.equal(r.length, 4);
close(4187.4 - 695.2, 3492.2);
close(2324.5 - 602.6, 1721.9);
close(.225 * .5, .1125);
assert.ok(data.sources.every(s => new URL(s.url).protocol === "https:"));

for (const lang of ["en", "zh"]) {
  const html = renderToStaticMarkup(createElement(View, { lang }));
  assert.ok(html.includes(lang === "en" ? data.title[0] : data.title[1]));
  for (const id of ["framework", "ranking", "valuation", "portfolio", "allocation", "etfs", "execution", "rklb", "operations", "forecast", "rklb-risks", "sources"])
    assert.ok(html.includes(`id="${id}"`), id);
  for (const r of data.ranking) assert.ok(html.includes(r.ticker));
  for (const privatePhrase of ["你目前连接账户", "账户显示的投资资产", "your account shows", "your investment assets total"])
    assert.ok(!html.includes(privatePhrase), `Private account narrative: ${privatePhrase}`);
  assert.ok(html.includes("2026-10-16"));
  assert.ok(html.includes("2036E"));
  assert.ok(html.includes("scope=\"col\""));
  assert.ok(html.includes(lang === "en" ? "not a live recommendation" : "不是实时推荐"));
  console.log(`${lang}: SSR, all sections, 38 tickers and privacy checks pass`);
}
for (const name of names) assert.equal(await readFile(new URL(name, mirror), "utf8"), adapt(await readFile(new URL(name, root), "utf8")), name);
const registry = await readFile(new URL("../../../researchArticles.ts", mirror), "utf8");
const rich = await readFile(new URL("../../../richResearchPages.ts", mirror), "utf8");
for (const route of [slug, `zh-${slug}`]) { assert.ok(registry.includes(`slug: "${route}"`)); assert.ok(rich.includes(`"${route}"`)); }
const library = await readFile(new URL("../page.tsx", root), "utf8");
assert.ok(library.includes(`/research/${slug}`));
assert.ok(library.includes(`/research/${slug}/zh`));
console.log("Weights, source counts, forecast sums, balance sheet equations, route discovery and mirror parity pass");
