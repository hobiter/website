import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";
import { sourceRoot, mirrorRoot, folders, adapt } from "./mirror-ai-size-research.mjs";
import { files } from "./mirror-ai-value-chain-research.mjs";

async function load(name) {
  const source = await readFile(new URL(`_ai-size-research/${name}.ts`,sourceRoot),"utf8");
  const { outputText } = ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}});
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}
const { COMPANIES, MARKET_DATE, RESEARCH_DATE } = await load("data");
const { forecast, CASES, CASE_INPUTS } = await load("model");
const { MID_REPORT, SMALL_REPORT } = await load("report");
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-7,`${a} != ${b}`);
assert.equal(MARKET_DATE,"2026-10-02");
assert.equal(RESEARCH_DATE,"2026-10-05");
assert.equal(new Set(COMPANIES.map(c=>c.ticker)).size,20);
for (const size of ["mid","small"]) {
  const group=COMPANIES.filter(c=>c.size===size);
  assert.equal(group.length,10);
  assert.deepEqual(group.map(c=>c.rank),[1,2,3,4,5,6,7,8,9,10]);
  for(const c of group) assert.ok(c.capM >= (size==="mid"?2000:300) && c.capM < (size==="mid"?10000:2000),`${c.ticker} cap eligibility`);
}
close(COMPANIES.find(c=>c.ticker==="POET").capM,173.04*7.79);
for(const c of COMPANIES) {
  assert.ok(c.source.startsWith("https://") && c.periodEnd<=RESEARCH_DATE);
  assert.ok(c.price>0 && c.quarterRevenueM>0);
  for(const key of ["layer","facts","thesis","catalyst","monitor","failure"]) assert.ok(c[key].length===2 && c[key].every(v=>v.length>(key==="layer"?2:8)),`${c.ticker} ${key}`);
  if(!c.modelAvailable) {assert.equal(c.ticker,"POET");assert.equal(forecast(c,"base",10),null);continue;}
  assert.throws(()=>forecast(c,"base",5,0));
  assert.throws(()=>forecast(c,"base",5,NaN));
  for(const h of [5,10]) {
    for(const s of CASES) {
      const r=forecast(c,s,h), input=CASE_INPUTS[s];
      assert.equal(r.rows.length,h);
      assert.ok(r.cagr>=-1 && Number.isFinite(r.cagr));
      const last=r.rows.at(-1);
      close(last.funding,r.funding);
      close(last.shares,c.capM/c.price*Math.pow(1+Math.max(0,c.dilution+input.dilution),h));
      const nextRevenue=last.revenue*(1+Math.max(-.15,c.growth[1]+input.growth));
      close(r.terminal,Math.max(0,nextRevenue*(c.cashMargin[1]+input.margin))*c.multiple*input.multiple);
      close(r.exitPrice,Math.max(0,r.terminal-r.funding)/last.shares);
      for(const row of r.rows) {
        assert.ok(Object.values(row).every(Number.isFinite));
        close(row.ownerCash,row.revenue*row.margin);
      }
      if(r.exitPrice>0) {
        close(forecast(c,s,h,r.hurdlePrice).cagr,r.hurdle);
        assert.ok(forecast(c,s,h,c.price*1.2).cagr<r.cagr);
      }
    }
    const bear=forecast(c,"bear",h),base=forecast(c,"base",h),bull=forecast(c,"bull",h);
    assert.ok(bear.cagr<=base.cagr && base.cagr<=bull.cagr,`${c.ticker} scenario order`);
  }
}
for(const [size,report] of [["mid",MID_REPORT],["small",SMALL_REPORT]]) {
  assert.equal(report.length,4);
  for(const chapter of report) {assert.equal(chapter.title.length,2);for(const p of chapter.paragraphs) assert.ok(p.length===2 && p.every(x=>x.length>40));}
  const words=[...report.flatMap(c=>c.paragraphs.map(p=>p[0])),...COMPANIES.filter(c=>c.size===size).map(c=>c.thesis[0])].join(" ").split(/\s+/).length;
  assert.ok(words>1100,`${size} substantive narrative ${words}`);
  console.log(`${size}: ${words} English thesis/profile words, plus financial tables and audit.`);
}
for(const folder of folders) {
  const original=await files(new URL(`${folder}/`,sourceRoot));
  assert.deepEqual((await files(new URL(`${folder}/`,mirrorRoot))).sort(),original.sort());
  for(const file of original) assert.equal(await readFile(new URL(`${folder}/${file}`,mirrorRoot),"utf8"),adapt(await readFile(new URL(`${folder}/${file}`,sourceRoot),"utf8")));
}
const meta=await readFile(new URL("../../../svim-labs/project-albatross/src/content/researchArticles.ts",import.meta.url),"utf8");
const registry=await readFile(new URL("../../../svim-labs/project-albatross/src/content/richResearchPages.ts",import.meta.url),"utf8");
for(const size of ["mid","small"]) for(const prefix of ["","zh-"]) {
  const slug=`${prefix}ai-${size}-cap-investment-outlook`;
  assert.ok(meta.includes(`slug: "${slug}"`) && registry.includes(`"${slug}": lazy`),slug);
}
console.table(COMPANIES.map(c=>({size:c.size,rank:c.rank,ticker:c.ticker,capM:c.capM.toFixed(1),base5:forecast(c,"base",5)?.cagr==null?"N/A":(forecast(c,"base",5).cagr*100).toFixed(1),base10:forecast(c,"base",10)?.cagr==null?"N/A":(forecast(c,"base",10).cagr*100).toFixed(1)})));
console.log("PASS: 20-stock eligibility, bilingual content, forecast equations/sensitivity, four route registrations and SVIM mirror parity.");
