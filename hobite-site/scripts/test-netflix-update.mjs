import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

const root = new URL("../app/research/netflix-complete-fundamental-analysis/", import.meta.url);
const modules = new Map();
async function load(name) {
  if (modules.has(name)) return modules.get(name);
  const source = await readFile(new URL(`${name}.ts`, root), "utf8");
  let code = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
  for (const match of [...code.matchAll(/from "\.\/([^"\n]+)"/g)]) {
    code = code.replace(match[0], `from "${await load(match[1])}"`);
  }
  const url = `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`;
  modules.set(name, url);
  return url;
}

const { NETFLIX_CURRENT_UPDATE: update, NETFLIX_CURRENT_VALUATION: valuation } = await import(await load("currentUpdate"));
const { NETFLIX_DCF_CASES: cases, NETFLIX_FORECASTS: forecasts } = await import(await load("forecastModel"));
const { NETFLIX_LATEST_QUARTERLY_FINANCIAL: quarter } = await import(await load("quarterlyFinancials"));
assert.equal(update.referencePrice, 67);
assert.equal(quarter.period, "2026 Q2");
assert.equal(quarter.revenue, 12_559_938_000);
assert.equal(quarter.freeCashFlow, 1_525_168_000);
assert.equal(quarter.operatingCashFlow - quarter.capitalExpenditures, quarter.freeCashFlow);
assert.equal(valuation.netDebt, 5_210_074_000);
assert.equal(valuation.dilutedEquityValue, 285_507_100_000);
assert.equal(valuation.normalizedFcf, 10_500_000_000);
assert.equal(forecasts.base[0].revenue, 51_200_000_000);
assert.ok(cases.bear.valuePerShare < cases.base.valuePerShare && cases.base.valuePerShare < cases.bull.valuePerShare);
for (const [scenario, result] of Object.entries(cases)) {
  assert.ok(Number.isFinite(result.valuePerShare) && result.valuePerShare > 0);
  assert.ok(Math.abs(result.upsidePercent - (result.valuePerShare / 67 - 1) * 100) < 1e-10);
  assert.equal(result.equityValue, result.pvFcf + result.pvTerminal);
  assert.equal(result.enterpriseValue, result.equityValue + valuation.netDebt);
  const rate = result.discountRate / 100;
  const years = (Date.UTC(2026, 11, 31) - Date.UTC(2026, 9, 4)) / (365.25 * 86_400_000);
  const remaining = (forecasts[scenario][0].freeCashFlow - 4_619_243_000) / 2;
  const expectedPv = forecasts[scenario].reduce((sum, row, i) => sum + (i === 0 ? remaining : row.freeCashFlow) / (1 + rate) ** (years + i), 0);
  assert.equal(result.pvFcf, expectedPv);
}
for (const name of ["netflix-complete-fundamental-analysis.html", "netflix-complete-fundamental-analysis/zh.html"]) {
  const html = await readFile(new URL(`../.next/server/app/research/${name}`, import.meta.url), "utf8");
  for (const text of ["2026-10-04", "$67", "2026 Q2", "$12.56B", "$1.53B", "$10.5B"]) assert.ok(html.includes(text), `${name}: missing ${text}`);
}
console.log("Netflix update checks passed: Q2 financials, normalization, share basis, DCF and both rendered routes.");
console.log(Object.fromEntries(Object.entries(cases).map(([key, value]) => [key, { valuePerShare: value.valuePerShare.toFixed(2), upside: value.upsidePercent.toFixed(1) }])));
