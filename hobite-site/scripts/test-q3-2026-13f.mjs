import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { XMLParser } from "fast-xml-parser";
import ts from "typescript";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { managers, corporateActions, normalizeRows, combine, compare, top, reconcileReports } from "./lib/manager-13f.mjs";

const root = new URL("../app/research/q3-2026-13f-investment-managers/", import.meta.url);
const snapshot = JSON.parse(await readFile(new URL("snapshot.json", root), "utf8"));
const near = (a, b) => assert.ok(Math.abs(a - b) < Math.max(.01, Math.abs(b) * 1e-10), `${a} != ${b}`);
const row = (cusip, shares, value, extra = {}) => ({ cusip, shares, value, issuer: "Test Corp", title: "COM", shareType: "SH", option: "", instrument: "equity", ...extra });
const fixture = [row("000000001", 100, 1000), row("000000001", 50, 500), row("000000001", 800, 9000, { option: "CALL" }), row("000000002", 1000, 900, { shareType: "PRN" })];
assert.equal(combine(fixture).size, 1);
assert.equal(combine(fixture).get("000000001").shares, 150);
const changes = compare(combine([row("000000001", 100, 1000), row("000000002", 20, 200), row("000000004", 50, 500)]), combine([row("000000001", 125, 2500), row("000000003", 10, 100), row("000000004", 25, 300)]));
const added = changes.find(r => r.cusip === "000000001");
assert.equal(added.pct, 25);
assert.equal(added.changeProxy, 500);
assert.equal(added.valueDelta, 1500);
assert.equal(changes.find(r => r.action === "new").pct, null);
assert.equal(changes.find(r => r.action === "exit").pct, -100);
assert.equal(changes.find(r => r.action === "exit").changeProxy, -200);
assert.equal(changes.find(r => r.action === "reduce").pct, -50);
const split = compare(combine([row("000000001", 100, 2000)]), combine([row("000000001", 200, 2000)]));
assert.equal(split[0].possibleAction, true);
assert.equal(top(split, "increase").length, 0);
assert.equal(top(changes, "new").length, 1);
const original = { form: "13F-HR", rows: [fixture[0]] };
const supplement = { form: "13F-HR/A", amendmentType: "NEW HOLDINGS", rows: [fixture[1]] };
const restatement = { form: "13F-HR/A", amendmentType: "RESTATEMENT", rows: [fixture[2]] };
assert.equal(reconcileReports([original, supplement]).length, 2);
assert.deepEqual(reconcileReports([original, supplement, restatement]), restatement.rows);
assert.throws(() => reconcileReports([{ form: "13F-HR/A", amendmentType: "UNKNOWN" }]));
const parser = new XMLParser({ removeNSPrefix: true, parseTagValue: false });
const xml = '<n:informationTable xmlns:n="x"><n:infoTable><n:nameOfIssuer>Example</n:nameOfIssuer><n:titleOfClass>COM</n:titleOfClass><n:cusip>000000001</n:cusip><n:value>123</n:value><n:shrsOrPrnAmt><n:sshPrnamt>3</n:sshPrnamt><n:sshPrnamtType>SH</n:sshPrnamtType></n:shrsOrPrnAmt></n:infoTable></n:informationTable>';
assert.equal(normalizeRows(parser.parse(xml))[0].value, 123);
assert.throws(() => normalizeRows(parser.parse(xml.replace(">123<", ">invalid<"))));
assert.equal(snapshot.cutoff, "2026-11-17");
assert.equal(snapshot.completeManagers, 20);
assert.deepEqual(snapshot.failures, []);
assert.equal(new Set(managers.map(m => m.cik)).size, 20);
assert.equal(snapshot.unitChecks.length, 4);
for (const check of snapshot.unitChecks) assert.ok(check.commonSecurities > 10 && Math.abs(check.medianRatio - 1) < .01);
const excluded = new Set([...snapshot.flagged.map(r => r.cusip), ...corporateActions.filter(a => !a.to).map(a => a.from)]);
const categories = ["new", "increase", "reduce", "exit", "holdings"];
function checkRanking(rows, category) {
  assert.ok(rows.length <= 10);
  assert.equal(new Set(rows.map(r => r.cusip)).size, rows.length);
  let prior = Infinity;
  for (const r of rows) {
    assert.ok(!excluded.has(r.cusip));
    assert.equal(r.instrument, "equity");
    if (category !== "holdings") assert.equal(r.action, category);
    near(r.deltaShares, r.q3Shares - r.q2Shares);
    if (r.q2Shares) near(r.pct, r.deltaShares / r.q2Shares * 100);
    else assert.equal(r.pct, null);
    const metric = category === "holdings" ? r.q3Value : Math.abs(r.changeProxy);
    assert.ok(metric <= prior);
    prior = metric;
  }
}
for (const k of categories) {
  checkRanking(snapshot.aggregate[k], k);
  for (const r of snapshot.aggregate[k]) near(r.changeProxy, r.deltaShares * (r.q3Shares ? r.q3Value / r.q3Shares : r.q2Value / r.q2Shares));
}
for (const [k, rows] of Object.entries(snapshot.gross)) checkRanking(rows, k);
for (const m of snapshot.managers) {
  for (const k of categories) checkRanking(m.top[k], k);
  for (const q of [m.q2, m.q3]) for (const r of q.reports) {
    assert.equal(r.period, q.period);
    assert.ok(r.filed <= snapshot.cutoff);
    assert.ok(r.tables.length > 0 && r.entryCount > 0);
    assert.ok(r.tables.every(t => /^[a-f0-9]{64}$/.test(t.sha256) && t.url.startsWith("https://www.sec.gov/Archives/edgar/data/")));
    near(r.reportedValue, r.rawReportedValue * r.valueMultiplier);
    assert.ok(Math.abs(r.rawSumValue - r.rawReportedValue) <= r.entryCount);
  }
}
for (const period of ["q2", "q3"]) {
  near(snapshot.totals[`${period}Reported`], snapshot.managers.reduce((s, m) => s + m[period].reportedValue, 0));
  near(snapshot.totals[`${period}ShareValue`], snapshot.managers.reduce((s, m) => s + m[`${period}ShareValue`], 0));
}
assert.ok(snapshot.managers.find(m => m.id === "pershing").q2.reports.some(r => r.amendmentType === "NEW HOLDINGS"));
assert.ok(snapshot.managers.find(m => m.id === "citadel").q2.reports.some(r => r.amendmentType === "RESTATEMENT"));

// Optional offline re-extraction verifies original XML bytes when the local SEC cache exists.
let cachedReports = 0;
for (const m of snapshot.managers) for (const q of [m.q2, m.q3]) {
  const reports = [];
  let available = true;
  for (const r of q.reports) {
    const rows = [];
    for (const source of [{ url: r.primaryUrl, sha256: r.primarySha256, primary: true }, ...r.tables]) {
      const cachePath = new URL(`../.cache/q3-2026-13f/${createHash("sha256").update(source.url).digest("hex")}.txt`, import.meta.url);
      let text;
      try { text = await readFile(cachePath, "utf8"); }
      catch (error) { if (error.code !== "ENOENT") throw error; available = false; break; }
      assert.equal(createHash("sha256").update(text).digest("hex"), source.sha256);
      if (!source.primary) rows.push(...normalizeRows(parser.parse(text)).map(x => ({ ...x, value: x.value * r.valueMultiplier })));
    }
    if (!available) break;
    assert.equal(rows.length, r.entryCount);
    near(rows.reduce((s, x) => s + x.value, 0), r.sumValue);
    reports.push({ ...r, rows });
    cachedReports++;
  }
  if (available) {
    const rows = reconcileReports(reports);
    near(rows.reduce((s, x) => s + x.value, 0), q.reportedValue);
    near([...combine(rows).values()].reduce((s, x) => s + x.value, 0), m[`${q.period === snapshot.q2 ? "q2" : "q3"}ShareValue`]);
  }
}
const manifest = JSON.parse(await readFile(new URL("../public/research/q3-2026-13f/source-manifest.json", import.meta.url), "utf8"));
assert.equal(manifest.managers.length, 20);
for (const m of manifest.managers) {
  const actual = snapshot.managers.find(x => x.id === m.id);
  assert.deepEqual(m.q2, actual.q2);
  assert.deepEqual(m.q3, actual.q3);
}
const csv = await readFile(new URL("../public/research/q3-2026-13f/comparisons.csv", import.meta.url), "utf8");
assert.ok(csv.startsWith("manager,cusip,ticker,issuer,title,instrument,action,"));
assert.equal(csv.trimEnd().split("\n").length, 28708);
const require = createRequire(import.meta.url);
let code = ts.transpileModule(await readFile(new URL("ReportView.tsx", root), "utf8"), {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
code = code.replace('import snapshot from "./snapshot.json";', `const snapshot = ${JSON.stringify(snapshot)};`);
code = code.replaceAll('from "react/jsx-runtime"', `from "${pathToFileURL(require.resolve("react/jsx-runtime")).href}"`);
const { default: View } = await import(`data:text/javascript;base64,${Buffer.from(code).toString("base64")}`);
for (const lang of ["en", "zh"]) {
  const html = renderToStaticMarkup(createElement(View, { lang }));
  assert.equal((html.match(/<details /g) ?? []).length, 20);
  const managerTables = snapshot.managers.reduce((s, m) => s + categories.filter(k => m.top[k].length > 0).length, 0);
  assert.equal((html.match(/<table>/g) ?? []).length, 8 + managerTables);
  assert.equal((html.match(/<h1>/g) ?? []).length, 1);
  for (const phrase of lang === "en" ? ["not transaction cash flows", "NOT AUM", "not an SEC amendment", "not its net conviction"] : ["不是实际交易现金流", "并非 AUM", "并非 SEC 修订", "不等于净信念"]) assert.ok(html.includes(phrase), phrase);
  for (const m of snapshot.managers) for (const r of m.q3.reports) assert.ok(html.includes(r.primaryUrl));
  assert.ok(html.includes("comparisons.csv") && html.includes("source-manifest.json"));
}
const library = await readFile(new URL("../page.tsx", root), "utf8");
for (const suffix of ["", "/zh"]) assert.ok(library.includes(`/research/q3-2026-13f-investment-managers${suffix}"`));
console.log(`PASS: arithmetic, XML, options, amendments, 20-manager coverage, rankings, units, manifests and bilingual SSR; ${cachedReports} cached original reports re-extracted.`);
