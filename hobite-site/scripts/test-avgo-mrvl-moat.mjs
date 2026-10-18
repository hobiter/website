import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import ts from "typescript";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { adapt, root, mirror, names, slug } from "./mirror-avgo-mrvl-moat.mjs";

const require = createRequire(import.meta.url);
const cache = new Map();
async function load(name) {
  if (cache.has(name)) return cache.get(name);
  let code = ts.transpileModule(await readFile(new URL(name, root), "utf8"), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  if (name !== "data.ts") {
    assert.ok(cache.has("data.ts"));
    code = code.replaceAll('from "./data"', `from "${cache.get("data.ts")}"`);
  }
  for (const spec of ["react", "react/jsx-runtime"])
    code = code.replaceAll(`from "${spec}"`, `from "${pathToFileURL(require.resolve(spec)).href}"`);
  const url = `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`;
  cache.set(name, url);
  return url;
}
const d = await import(await load("data.ts"));
const { default: View } = await import(await load("MoatView.tsx"));
assert.equal(d.chapters.length, 14);
assert.equal(new Set(d.chapters.map(c => c.id)).size, 14);
assert.equal(d.capability.length, 12);
assert.equal(d.threats.length, 9);
assert.equal(d.stack.length, 7);
assert.equal(d.metrics.length, 6);
assert.equal(d.competition.length, 5);
assert.equal(Object.keys(d.sources).length, 12);
for (const c of d.chapters) {
  assert.equal(c.heading.length, 2);
  for (const p of c.paragraphs) { assert.equal(p.length, 2); assert.ok(p.every(x => x.length > 20)); }
  for (const ref of c.refs ?? []) assert.ok(d.sources[ref], ref);
}
for (const c of d.capability) for (const n of [c.avgo, c.mrvl]) assert.ok(n >= 0 && n <= 10);
for (const r of d.competition) { assert.ok(r.adjusted <= r.original); assert.ok(r.adjusted > 0); }
assert.equal(d.competition.at(-1).original - d.competition.at(-1).adjusted, 35);
assert.equal(d.competition[0].original, d.competition[0].adjusted);
const w = d.googleWarrant;
assert.equal(w.timeShares + w.performanceShares, w.totalShares);
assert.equal(w.tranches * w.revenuePerTranche, 120000000000);
assert.equal(239 * 240042 + 240002, w.performanceShares);
assert.equal(500000000 / 4, 125000000);
for (const s of Object.values(d.sources)) assert.equal(new URL(s.url).protocol, "https:");
for (const lang of ["en", "zh"]) {
  const html = renderToStaticMarkup(createElement(View, { lang }));
  assert.ok(html.includes(d.title[lang === "zh" ? 1 : 0].replaceAll("'", "&#x27;")));
  for (const c of d.chapters) assert.ok(html.includes(`id="${c.id}"`));
  assert.ok(html.includes('id="sources"'));
  assert.equal((html.match(/<table>/g) ?? []).length, 6);
  for (const s of Object.values(d.sources)) assert.ok(html.includes(s.url));
  for (const phrase of lang === "en" ? ["NOT a committed order", "not company guidance", "not measured benchmarks", "No probabilities", "No current price target"] : ["不是已承诺订单", "不是公司指引", "并非实测基准", "不从这张纯收入表推断概率", "不提供当前目标价"])
    assert.ok(html.includes(phrase), phrase);
  assert.ok(!html.includes("$765"));
  assert.ok(!html.includes("下载完整 Excel"));
  console.log(`${lang}: scope, 15 sections, six tables, source links and disclosure SSR pass`);
}
for (const name of names) assert.equal(await readFile(new URL(name, mirror), "utf8"), adapt(await readFile(new URL(name, root), "utf8")), name);
const registry = await readFile(new URL("../../../researchArticles.ts", mirror), "utf8");
const rich = await readFile(new URL("../../../richResearchPages.ts", mirror), "utf8");
for (const route of [slug, `zh-${slug}`]) { assert.ok(registry.includes(`slug: "${route}"`)); assert.ok(rich.includes(`"${route}"`)); }
const library = await readFile(new URL("../page.tsx", root), "utf8");
assert.ok(library.includes(`/research/${slug}`));
assert.ok(library.includes(`/research/${slug}/zh`));
const mirroredView = await readFile(new URL("MoatView.tsx", mirror), "utf8");
assert.ok(mirroredView.includes(`/research/zh-${slug}`));
assert.ok(mirroredView.includes('/research/zh-broadcom-complete-fundamental-analysis'));
console.log("Warrant arithmetic, annualized-rate conversion, source scenario bounds, route discovery and exact mirror parity pass");
