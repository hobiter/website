import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";
import { sourceRoot, mirrorRoot, adapt, files } from "./mirror-ai-value-chain-research.mjs";

const modules = new Map();
async function load(name) {
  if (modules.has(name)) return modules.get(name);
  let code = ts.transpileModule(await readFile(new URL(`${name}.ts`, sourceRoot), "utf8"), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
  for (const match of [...code.matchAll(/from "\.\/([^"\n]+)"/g)]) code = code.replace(match[0], `from "${await load(match[1])}"`);
  const url = `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`;
  modules.set(name, url);
  return url;
}
const get = async name => import(await load(name));
const { COMPANIES } = await get("investmentData");
const { valuation, project, irr, rankedCompanies, undervaluedCompanies, dataCentre } = await get("forecastModel");
const { REPORT, SECTORS } = await get("reportContent");
const { SOURCES } = await get("sources");
const { FINANCIAL_HISTORY } = await get("financialHistory");
const close = (a, b, tolerance = 1e-8) => assert.ok(Math.abs(a - b) < tolerance, `${a} != ${b}`);
assert.equal(COMPANIES.length, 10);
assert.equal(new Set(COMPANIES.map(c=>c.ticker)).size, 10);
close(COMPANIES.find(c=>c.ticker==="TSM").equityValue, 25.932/5*472.78);
close(irr(100, [110]), .10);
assert.equal(irr(100, [0]), null);
assert.equal(irr(100, [-10,200]), null);
for (const c of COMPANIES) {
  const rows = project(c, "base");
  assert.equal(rows.length, 20);
  for (const r of rows) {
    close(r.ownerCash, r.netIncome + r.depreciation - r.capex - r.workingCapital - r.preferred);
    close(r.ebit, r.revenue*r.margin);
    assert.ok(Object.values(r).every(Number.isFinite));
  }
  close(rows[10].margin, rows[9].margin);
  for (const h of [5,10,20]) {
    const bear = valuation(c,"bear",h), base = valuation(c,"base",h), bull=valuation(c,"bull",h);
    assert.ok(bear.value < base.value && base.value < bull.value, `${c.ticker} scenario order`);
    assert.ok(valuation(c,"base",h,c.price*1.2).irr < base.irr, `${c.ticker} price sensitivity`);
    assert.ok(valuation(c,"base",h,c.price,.15).entryPrice < base.entryPrice);
    close(valuation(c,"base",h,base.entryPrice).irr, .12);
    const next = project(c,"base",h+1)[h];
    close(base.terminal, Math.max(0,next.ownerCash)*c.terminalMultiple);
    assert.ok(base.cash.every(x=>x>=0));
    assert.ok(base.terminalShare >=0 && base.terminalShare <=1);
  }
}
const ranking=rankedCompanies();
const screen=undervaluedCompanies();
assert.equal(screen.length, COMPANIES.length);
for (const [i,r] of screen.entries()) {
  assert.ok(i===0 || screen[i-1].upside >= r.upside);
  close(r.conservativeValue, Math.min(r.five.entryPrice,r.ten.entryPrice));
  close(r.marginOfSafety,1-r.company.price/r.conservativeValue);
  assert.equal(r.qualifies,r.five.entryPrice>r.company.price && r.ten.entryPrice>r.company.price);
  assert.equal(r.five.rows.length,5);
}
console.table(screen.map(r=>({ticker:r.company.ticker,qualifies:r.qualifies,base5:(r.five.irr*100).toFixed(1),base10:(r.ten.irr*100).toFixed(1),bear5:(r.bearFive.irr*100).toFixed(1),bear10:(r.bearTen.irr*100).toFixed(1),value:r.conservativeValue.toFixed(2),gap:(r.upside*100).toFixed(1)})));
assert.ok(ranking.every((r,i)=>i===0||ranking[i-1].score>=r.score));
close(dataCentre().power, 73.584);
close(dataCentre().renewal, 950);
close(dataCentre().revenue,1625);
assert.ok(dataCentre(.5).afterTaxOwnerCash < dataCentre(.65).afterTaxOwnerCash);
const dc=dataCentre(dataCentre().breakEvenUtilization);
close(dc.afterTaxOwnerCash/dc.capex,.12);
assert.equal(REPORT.length,15);
assert.equal(SECTORS.length,8);
assert.ok(REPORT.every(c=>c.paragraphs.length===c.paragraphsZh.length));
const words=REPORT.flatMap(c=>c.paragraphs).join(" ").split(/\s+/).length;
assert.ok(words>3800, `Long report too short: ${words}`);
for(const chapter of REPORT) for(const id of chapter.sources) assert.ok(SOURCES.some(s=>s.id===id));
assert.equal(FINANCIAL_HISTORY.length,15);
for(const issuer of FINANCIAL_HISTORY) for(const row of issuer.annual) for(const value of Object.values(row)) {
  if(typeof value!=="object" || value===null) continue;
  assert.ok(value.filed<= "2026-10-04");
  assert.ok(value.end<= "2026-10-04");
  assert.ok(value.currency && value.tag && value.source.startsWith("https://www.sec.gov/"));
}
const original=(await files(sourceRoot)).sort();
assert.deepEqual((await files(mirrorRoot)).sort(),original);
for(const file of original) assert.equal(await readFile(new URL(file,mirrorRoot),"utf8"),adapt(await readFile(new URL(file,sourceRoot),"utf8")),file);
console.log(`PASS: model identities, sensitivities, ADS units, ${words}-word English report, 15-company provenance and bilingual SVIM parity.`);
console.table(ranking.map((r,i)=>({rank:i+1,ticker:r.company.ticker,base10:(r.ten.irr*100).toFixed(1),base20:(r.twenty.irr*100).toFixed(1),bear10:(r.bear.irr*100).toFixed(1),entry20:r.twenty.entryPrice.toFixed(2)})));
