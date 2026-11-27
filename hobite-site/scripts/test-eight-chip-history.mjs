import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { buildForecast, cagr, chipHistory, historicalFcfMargin, metrics } from "../app/research/_chip-trends/model.ts";
import quarters from "../app/research/_chip-trends/quarters.json" with { type: "json" };

const slugs={ASML:"asml",AMAT:"applied-materials",LRCX:"lam-research",ARM:"arm",TSM:"tsmc",NVDA:"nvidia",AVGO:"broadcom",AMD:"amd"};
assert.equal(cagr(-1,2,1),null);
assert.equal(cagr(1,4,2),1);
for(const [ticker,rows] of Object.entries(chipHistory)){
  if(ticker==="ARM") assert.equal(rows.length,5);
  else assert.ok(rows.length>=10,ticker);
  for(const [i,row] of rows.entries()){
    assert.ok(i===0||row.year===rows[i-1].year+1);
    for(const m of metrics) assert.ok(Number.isFinite(row[m]),ticker+" "+m);
    assert.ok(Math.abs(row.cash-row.capex-row.fcf)<1);
    for(const url of Object.values(row.evidence)) assert.match(url,/^https:\/\//);
  }
  const q = quarters[ticker];
  if(ticker==="ARM") assert.equal(q.length,19);
  else assert.ok(q.length>=20,ticker);
  for(const [i,row] of q.entries()){
    assert.ok(row.revenue.value>1e7 && row.revenue.value<(ticker==="TSM"?2e12:2e11),ticker+" "+row.end);
    assert.ok(!row.eps || (Number.isFinite(row.eps.value)&&row.eps.basis==="reported"));
    assert.ok(!row.capex || row.capex.value>=0);
    if (i) {
      const previous=q[i-1];
      assert.equal(row.fiscalYear*4+row.quarter,previous.fiscalYear*4+previous.quarter+1);
    }
    for(const fact of [row.revenue,row.eps,row.cash,row.capex].filter(Boolean)){
      for(const url of fact.links)assert.match(url,/^https:\/\//);
    }
  }
  const last=rows.at(-1), margin=historicalFcfMargin(ticker);
  const scenarios=buildForecast(ticker,{fiscalYear:last.year,salesBillions:last.revenue/1e9,sharesBillions:1,
    scenarios:[[.03,.2,.01,15],[.08,.25,0,20],[.14,.3,-.01,25]]});
  for(const s of scenarios){
    assert.equal(s.rows.length,11);
    assert.equal(s.rows[0].yearMargin,margin.latestMargin);
    assert.ok(Math.abs(s.rows[5].yearMargin-s.cashMargin)<1e-10);
    assert.ok(Math.abs(cagr(s.rows[0].revenue,s.rows[10].revenue,10)-s.growth)<1e-10);
  }
  if(process.argv.includes("--verify-build")) for(const suffix of ["","/zh"]){
    const path=`../.next/server/app/research/${slugs[ticker]}-complete-fundamental-analysis${suffix}.html`;
    const html=readFileSync(new URL(path,import.meta.url),"utf8");
    assert.ok(html.includes(`data-financial-trends="${ticker}"`),path);
    assert.ok(html.includes(suffix?"逐年预测及模型假设":"Full annual forecast and assumptions"),path);
    assert.ok(html.includes('id="quarterly-history"')&&html.includes(q.at(-1).end),path);
  }
}
console.log("Eight financial histories and forecasts verified");
