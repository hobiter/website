import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import ts from "typescript";

const root = new URL("../app/research/vistra-complete-fundamental-analysis/", import.meta.url);
const modules = new Map();
async function load(name) {
  if (modules.has(name)) return modules.get(name);
  const source = await readFile(new URL(`${name}.ts`, root), "utf8");
  let code = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
  for (const match of [...code.matchAll(/from "\.\/([^"\n]+)"/g)]) code = code.replace(match[0], `from "${await load(match[1])}"`);
  const url = `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`;
  modules.set(name, url);
  return url;
}
const { VST_ANNUAL: annual } = await import(await load("annualFinancials"));
const { VST_QUARTERLY: quarters } = await import(await load("quarterlyFinancials"));
const { VST_FORECASTS: forecasts, VST_DCF_CASES: cases, VST_MODEL_INPUTS: inputs, VST_DCF_SENSITIVITY: sensitivity } = await import(await load("forecastModel"));
const { VST_GUIDANCE: guidance } = await import(await load("operatingMetrics"));
const { VST_LATEST_PRICE: price } = await import(await load("valuationHistory"));
const { VST_REPORT: memo } = await import(await load("reportContent"));
const { VST_FILINGS: filings } = await import(await load("filings"));
const close = (a,b) => assert.ok(Math.abs(a-b) < Math.max(1e-8,Math.abs(b)*1e-12), `${a} != ${b}`);
assert.equal(annual.length, 9);
assert.equal(quarters.length, 37);
assert.equal(annual.find(r => r.year === 2017).revenue, null);
assert.equal(annual.find(r => r.year === 2024).netIncome, 2.812e9);
const fy25 = annual.at(-1);
assert.equal(fy25.revenue,17.738e9);
assert.equal(fy25.netIncome,944e6);
assert.equal(fy25.commonIncome,752e6);
assert.equal(fy25.freeCashFlow,1.318e9);
const q2 = quarters.at(-1);
assert.equal(q2.period,"2026 Q2");
assert.equal(q2.revenue,4.017e9);
assert.equal(q2.netIncome,305e6);
assert.equal(q2.commonIncome,258e6);
assert.equal(q2.dilutedEps,0.76);
assert.equal(quarters.slice(-2).reduce((s,r)=>s+r.operatingCashFlow,0),2.222e9);
assert.equal(quarters.slice(-2).reduce((s,r)=>s+r.capex,0),1.572e9);
for (const row of [...annual,...quarters]) {
  if (row.operatingCashFlow != null && row.capex != null) assert.equal(row.freeCashFlow,row.operatingCashFlow-row.capex);
  if (row.quarter === 4) assert.equal(row.dilutedEps,null);
}
assert.equal(price.date,"2026-10-02");
close(price.close,140.02000427246094);
assert.equal(inputs.netDebt,19.898e9);
assert.equal(inputs.otherClaims,3.101e9);
close(inputs.enterpriseValue,price.close*guidance.spotShares+inputs.netDebt+inputs.otherClaims);
assert.equal(forecasts.base[0].freeCashFlow,2.933e9);
assert.ok(cases.bear.valuePerShare < cases.base.valuePerShare && cases.base.valuePerShare < cases.bull.valuePerShare);
for (const [scenario,result] of Object.entries(cases)) {
  const rows = forecasts[scenario];
  assert.equal(rows.length,10);
  assert.equal(rows[0].year,2026);
  assert.equal(rows.at(-1).year,2035);
  assert.equal(rows.reduce((sum,row)=>sum+row.helixInvestment,0),1e9);
  for(const row of rows) close(row.freeCashFlow,row.fcfBeforeGrowth-row.growthInvestment-row.helixInvestment-row.preferredDistributions-row.closureCash);
  const fraction=(Date.UTC(2026,11,31)-Date.UTC(2026,9,4))/(365.25*86400000);
  const r=result.discountRate/100, g=result.terminalGrowth/100;
  const cash=rows.reduce((sum,row,index)=>sum+(index===0?row.freeCashFlow/4:row.freeCashFlow)/(1+r)**(fraction+index),0);
  const terminal=rows.at(-1).freeCashFlow*(1+g)/(r-g)/(1+r)**(fraction+9);
  close(result.pvFcf,cash); close(result.pvTerminal,terminal);
  close(result.equityValue,cash+terminal);
  close(result.valuePerShare,(cash+terminal)/guidance.dilutedShares);
  close(result.enterpriseValue,result.equityValue+inputs.netDebt+inputs.otherClaims);
  close(result.upsidePercent,(result.valuePerShare/price.close-1)*100);
}
close(sensitivity[1].values[1],cases.base.valuePerShare);
for(const row of sensitivity) assert.ok(row.values[0] < row.values[1] && row.values[1] < row.values[2]);
assert.ok(sensitivity[0].values[1] > sensitivity[1].values[1] && sensitivity[1].values[1] > sensitivity[2].values[1]);
assert.ok(filings.every(row=>row.filed <= "2026-10-04"));
assert.equal(memo.length,13);
for(const row of memo) { assert.ok(row.thesisZh.length > 30); assert.equal(row.bullets.length,row.bulletsZh.length); }

// Scope parity to this company; the whole-library checker separately reports legacy drift.
const mirror = new URL("../../../svim-labs/project-albatross/src/content/hobiteResearch/research/vistra-complete-fundamental-analysis/", import.meta.url);
async function parity(directory,relative="") {
  for(const item of await readdir(directory,{withFileTypes:true})) {
    const file=relative+item.name;
    if(item.isDirectory()) { await parity(new URL(`${item.name}/`,directory),`${file}/`); continue; }
    let expected=await readFile(new URL(item.name,directory),"utf8");
    expected=expected.replace(/^import type \{ Metadata \} from ["']next["'];?\r?\n/m,"").replace(/export const metadata: Metadata = \{[\s\S]*?\r?\n\};?\r?\n/,"");
    for(const [a,b] of [["/research/vistra-complete-fundamental-analysis/zh","/blog/zh-vistra-complete-fundamental-analysis"],["/research/vistra-complete-fundamental-analysis","/blog/vistra-complete-fundamental-analysis"],["/research","/blog"]]) expected=expected.replaceAll(`href="${a}"`,`href="${b}"`);
    const actual=await readFile(new URL(file,mirror),"utf8");
    assert.equal(actual.replaceAll("\r\n","\n"),expected.replaceAll("\r\n","\n"),`Mirror: ${file}`);
  }
}
await parity(root);
for(const name of ["vistra-complete-fundamental-analysis.html","vistra-complete-fundamental-analysis/zh.html"]) {
  const html=await readFile(new URL(`../.next/server/app/research/${name}`,import.meta.url),"utf8");
  for(const text of ["2026-10-04","$140.02","2026 Q2","2.933","1.767",name.includes("/zh") ? "3.39231" : "339.231"]) assert.ok(html.includes(text),`${name}: ${text}`);
}
console.log("Vistra checks passed: reported data, common-cash deductions, DCF, sensitivity, translations, rendered pages and company mirror parity.");
console.log(Object.fromEntries(Object.entries(cases).map(([key,value])=>[key,{valuePerShare:value.valuePerShare.toFixed(2),upside:value.upsidePercent.toFixed(1)}])));
