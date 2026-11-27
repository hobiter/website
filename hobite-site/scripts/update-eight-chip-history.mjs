import { readFile, writeFile } from "node:fs/promises";
import { TSM_ANNUAL } from "../app/research/tsmc-complete-fundamental-analysis/annualFinancials.ts";

const cut = "2026-11-27";
const config = {
  ASML: ["937966", "EUR", 2025, 2015],
  AMAT: ["6951", "USD", 2026, 2016],
  LRCX: ["707549", "USD", 2026, 2016],
  ARM: ["1973239", "USD", 2026, 2017],
  TSM: ["1046179", "TWD", 2025, 2015],
  NVDA: ["1045810", "USD", 2026, 2016],
  AVGO: ["1730168", "USD", 2025, 2016, "1649338"],
  AMD: ["2488", "USD", 2025, 2015],
};
const fields = {
  revenue: ["RevenueFromContractWithCustomerExcludingAssessedTax", "Revenues", "SalesRevenueNet", "Revenue"],
  cash: ["NetCashProvidedByUsedInOperatingActivities", "NetCashProvidedByUsedInOperatingActivitiesContinuingOperations"],
  capex: ["PaymentsToAcquirePropertyPlantAndEquipment", "PaymentsToAcquireProductiveAssets", "PaymentsToAcquirePropertyPlantAndEquipmentAndIntangibleAssets"],
  eps: ["EarningsPerShareDiluted", "DilutedEarningsLossPerShare", "DilutedEarningsLossPerShareFromContinuingOperations"],
};
const annualForms = new Set(["10-K","10-K/A","20-F","20-F/A","F-1","F-1/A"]);
const quarterlyForms = new Set([...annualForms,"10-Q","10-Q/A","8-K","6-K","6-K/A"]);
const splits = {
  NVDA: [["2021-07-20",4],["2024-06-10",10]],
  AVGO: [["2024-07-15",10]],
  LRCX: [["2024-10-03",10]],
};
function duration(f) {
  return (Date.parse(f.end) - Date.parse(f.start)) / 86400000;
}
const source = (f) => `https://www.sec.gov/Archives/edgar/data/${f.cik}/${f.accn.replaceAll("-","")}/${f.accn}-index.htm`;
async function load(cik) {
  const file = `https://data.sec.gov/api/xbrl/companyfacts/CIK${cik.padStart(10,"0")}.json`;
  const r = await fetch(file, { headers: { "User-Agent": "Hobite Capital research@hobite.capital" } });
  if (!r.ok) throw Error(`SEC ${r.status}: ${file}`);
  return { cik, facts: (await r.json()).facts };
}
function candidates(docs, field, unit, quarterly=false) {
  const out = [];
  for (const {cik,facts} of docs) {
    for (const ns of ["us-gaap","ifrs-full"]) {
      for (const tag of fields[field]) {
        for (const f of facts[ns]?.[tag]?.units[unit] ?? []) {
          if ((quarterly ? quarterlyForms : annualForms).has(f.form) && f.filed <= cut && duration(f) >= (quarterly ? 75 : 350) && duration(f) <= 380) out.push({...f, cik, ns, tag});
        }
      }
    }
  }
  return out;
}
const preferRecent = (a,b) => b.filed.localeCompare(a.filed);
const earlyNvidiaCapex = {2016:86,2017:176, 2018:593, 2019:600, 2020:489, 2021:1128};
const history = {};
const quarters = {};
const issuer = JSON.parse(await readFile(new URL("../app/research/_chip-trends/issuerQuarters.json",import.meta.url),"utf8"));
const press = (value,url,tag) => ({value,basis:"reported",links:[url],tag});
const present = (f, value=f.val, basis="reported", links=[source(f)]) => ({value,basis,links,tag:f.tag});
const recent = (a,b) => preferRecent(a,b);
function quarterlyData(docs,ticker,currency) {
  const fieldsQ = Object.fromEntries(Object.keys(fields).map(f=>[f,candidates(docs,f,f==="eps"?`${currency}/shares`:currency,true)]));
  const revenue = fieldsQ.revenue.filter(f=>duration(f)<=105 && f.end>="2020-11-01").sort(recent);
  const years = fieldsQ.revenue.filter(f=>duration(f)>=350).sort(recent);
  const dates = [...new Set([...revenue,...years.filter(f=>f.end>="2020-11-01")].map(f=>f.end))].sort();
  return dates.map(end=>{
    const direct = revenue.find(f=>f.end===end);
    const annual = years.find(f=>f.end===end);
    const fyStart = annual ?? years.find(f=>f.start<=end&&f.end>end)
      ?? fieldsQ.cash.filter(f=>f.end===end).sort((a,b)=>duration(b)-duration(a))[0];
    let start=direct?.start;
    if(!start&&annual){
      const prior=dates.filter(d=>d<end&&d>=annual.start).at(-1);
      if(prior)start=new Date(Date.parse(prior)+86400000).toISOString().slice(0,10);
    }
    if(!start)return null;
    const flows={};
    for(const key of ["revenue","cash","capex","eps"]){
      const facts=fieldsQ[key].filter(x=>x.ns===(direct??annual)?.ns).sort(recent);
      const q=facts.find(x=>x.end===end&&x.start===start&&duration(x)<=105)
        ?? facts.find(x=>x.end===end&&duration(x)<=105&&Math.abs(Date.parse(x.start)-Date.parse(start))<=86400000*3);
      if(q){
        const factor=key==="eps"?(splits[ticker]??[]).reduce((n,[date,k])=>n*(q.filed<date?k:1),1):1;
        flows[key]=present(q,q.val/factor);
      }else if(key!=="eps"&&fyStart){
        const prev=dates.filter(d=>d<end&&d>=fyStart.start).at(-1);
        const ytd=facts.find(x=>x.end===end&&x.start===fyStart.start);
        const p=ytd&&prev?facts.find(x=>x.end===prev&&x.start===fyStart.start&&x.tag===ytd.tag):null;
        if(p&&Math.abs(Date.parse(start)-Date.parse(prev)-86400000)<4*86400000)
          flows[key]=present(ytd,ytd.val-p.val,"ytd-difference",[...new Set([source(ytd),source(p)])]);
      }
    }
    const elapsed=(Date.parse(end)-Date.parse(fyStart?.start??start))/86400000;
    const q=annual?4:Math.max(1,Math.min(4,Math.round((elapsed+1)/91.3)));
    const month=Number(end.slice(5,7));
    const y=Number(end.slice(0,4));
    const fiscalYear=ticker==="NVDA"&&month>=4||ticker==="ARM"&&month>=4||ticker==="LRCX"&&month>=7?y+1:y;
    return {end,fiscalYear,quarter:q,...flows};
  }).filter(r=>r&&r.revenue);
}
for (const [ticker,[cik,currency,last,first,predecessor]] of Object.entries(config)) {
  const docs = [await load(cik)];
  if (predecessor) docs.push(await load(predecessor));
  quarters[ticker]=quarterlyData(docs,ticker,currency);
  console.log(ticker,"quarters",quarters[ticker].length,quarters[ticker].slice(-22).map(r=>r.end+":"+r.quarter+":"+(r.eps?"E":"-")+(r.cash?"O":"-")+(r.capex?"C":"-")).join(" "));
  if (ticker==="TSM") {
    history[ticker] = TSM_ANNUAL.filter(r=>r.year>=first && r.year<=last).map(r=>({
      year:r.year,end:r.end,revenue:r.revenue,cash:r.operatingCashFlow,capex:r.capex,fcf:r.operatingCashFlow-r.capex,eps:r.dilutedEps,currency,basis:"ifrs-full",
      evidence:Object.fromEntries(["revenue","cash","capex","eps"].map(k=>[k,
        r.provenance?.[({cash:"operatingCashFlow",eps:"dilutedEps"})[k]??k]?.url ?? r.source])),
      capexTag:"Purchases of property, plant and equipment",epsSplitFactor:1,
    }));
    continue;
  }
  const data = Object.fromEntries(Object.keys(fields).map(f=>[f,candidates(docs,f,f==="eps"?`${currency}/shares`:currency)]));
  const rows = [];
  for (let year=first;year<=last;year++) {
    const revenue = data.revenue.filter(f=>Number(f.end.slice(0,4))===year).sort(preferRecent)[0];
    if (!revenue) continue;
    const match = (field) => data[field].filter(f=>f.end===revenue.end && f.start===revenue.start && f.ns===revenue.ns)
      .sort((a,b)=>preferRecent(a,b) || fields[field].indexOf(a.tag)-fields[field].indexOf(b.tag))[0];
    const cash=match("cash"), capex=match("capex"), eps=match("eps");
    const factor=(splits[ticker]??[]).reduce((v,[day,n])=>v*(eps && eps.filed<day?n:1),1);
    const manualCapex=ticker==="NVDA"?earlyNvidiaCapex[year]:undefined;
    const capexValue=manualCapex===undefined ? capex?.val : manualCapex*1e6;
    rows.push({
      year, end:revenue.end, revenue:revenue.val,cash:cash?.val??null,capex:capexValue===undefined?null:Math.abs(capexValue),
      fcf:cash&&capexValue!==undefined?cash.val-Math.abs(capexValue):null,
      eps:eps?eps.val/factor:null, currency, basis: revenue.ns,
      evidence:{ revenue:source(revenue), cash:cash?source(cash):null, capex:manualCapex===undefined?(capex?source(capex):null):
        (year===2016?"https://www.sec.gov/Archives/edgar/data/1045810/000104581016000205/nvda-2016x10k.htm":year<=2019?"https://www.sec.gov/Archives/edgar/data/1045810/000104581019000023/nvda-2019x10k.htm":"https://www.sec.gov/Archives/edgar/data/1045810/000104581021000010/nvda-20210131.htm"), eps:eps?source(eps):null },
      capexTag:manualCapex===undefined?(capex?.tag??null):"Purchases of property, equipment and intangible assets", epsSplitFactor:factor,
    });
  }
  if(ticker==="AMAT"&&!rows.some(r=>r.year===2026)) {
    const release="https://ir.appliedmaterials.com/news-releases/news-release-details/applied-materials-announces-fourth-quarter-and-fiscal-year-2026";
    rows.push({year:2026,end:"2026-10-25",revenue:34.446e9,cash:8.868e9,capex:2.672e9,fcf:6.196e9,eps:12.62,currency,basis:"us-gaap",
      evidence:{revenue:release,cash:release,capex:release,eps:release},capexTag:"Capital expenditures",epsSplitFactor:1});
  }
  history[ticker] = rows;
  console.log(ticker, rows.map(x=>[x.year,x.revenue/1e9,x.fcf===null?null:Math.round(x.fcf/1e7)/100,x.eps,x.basis,x.capexTag]).map(x=>x.join(":")).join(" "));
}

for(const [ticker,rows] of Object.entries(issuer)){
  const merged = new Map(quarters[ticker].map(r=>[r.end,r]));
  for(const row of rows)merged.set(row.end,{...merged.get(row.end),...row});
  quarters[ticker]=[...merged.values()];
}
const tsmEps = {
  2021:[6.41,"https://investor.tsmc.com/english/quarterly-results/2021/q4"],
  2022:[11.41,"https://investor.tsmc.com/english/quarterly-results/2022/q4"],
  2023:[9.21,"https://investor.tsmc.com/english/quarterly-results/2023/q4"],
  2024:[14.45,"https://investor.tsmc.com/english/quarterly-results/2024/q4"],
  2025:[19.50,"https://investor.tsmc.com/english/quarterly-results/2025/q4"],
};
for(const r of quarters.TSM)if(r.quarter===4&&tsmEps[r.fiscalYear]){
  const [value,url]=tsmEps[r.fiscalYear];r.eps=press(value,url,"Diluted EPS per ordinary share");
}
for(const [ticker,years,url] of [
  ["AMAT",[[2024,2.09],[2025,2.38]],"https://ir.appliedmaterials.com/news-releases/news-release-details/applied-materials-announces-fourth-quarter-and-fiscal-year-2025"],
  ["AMD",[[2024,.29],[2025,.92]],"https://ir.amd.com/news-events/press-releases/detail/1276/amd-reports-fourth-quarter-and-full-year-2025-financial-results"],
  ["AVGO",[[2024,.90],[2025,1.74]],"https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-fourth-quarter-and-fiscal-year-2025"],
  ["NVDA",[[2025,.89],[2026,1.76]],"https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Fourth-Quarter-and-Fiscal-2026/default.aspx"],
  ["LRCX",[[2025,1.35]],"https://investor.lamresearch.com/2025-07-30-Lam-Research-Corporation-Reports-Financial-Results-for-the-Quarter-Ended-June-29%2C-2025"],
  ["LRCX",[[2026,1.81]],"https://investor.lamresearch.com/2026-07-29-Lam-Research-Corporation-Reports-Financial-Results-for-the-Quarter-Ended-June-28%2C-2026"],
]){
  for(const [year,value] of years){
    const r=quarters[ticker].find(r=>r.fiscalYear===year&&r.quarter===4);
    if(r&&!r.eps)r.eps=press(value,url,"GAAP diluted EPS");
  }
}
const oldNvidiaQ = [
  ["2022-05-01",361,"000104581022000079"],
  ["2022-07-31",794,"000104581022000147"],
  ["2022-10-30",1324,"000104581022000166"],
].map(([end,million,accession])=>({end,million,url:`https://www.sec.gov/Archives/edgar/data/1045810/${accession}/nvda-${end.replaceAll("-","")}.htm`}));
oldNvidiaQ.forEach((input,i)=>{
  const r=quarters.NVDA.find(r=>r.end===input.end);
  if(!r||r.capex)return;
  const prev=oldNvidiaQ[i-1];
  r.capex=press((input.million-(prev?.million??0))*1e6,input.url,"Purchases related to property, equipment and intangible assets");
  if(prev){r.capex.links.push(prev.url);r.capex.basis="ytd-difference";}
});
for(const [ticker,end,fiscalYear,quarter,rev,cash,capex,eps,url] of [
  ["AMAT","2026-10-25",2026,4,10409,3300,684,3.40,"https://ir.appliedmaterials.com/news-releases/news-release-details/applied-materials-announces-fourth-quarter-and-fiscal-year-2026"],
  ["NVDA","2026-10-25",2027,3,115844,48253,4422,2.70,"https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2027/default.aspx"],
]){
  if(!quarters[ticker].some(r=>r.end===end)) quarters[ticker].push({end,fiscalYear,quarter,
    revenue:press(rev*1e6,url,"Revenue"), cash:press(cash*1e6,url,"Operating cash flow"),
    capex:press(capex*1e6,url,"Capital investment"),eps:press(eps,url,"Diluted EPS")});
}
for(const rows of Object.values(quarters))rows.sort((a,b)=>a.end.localeCompare(b.end));
if (process.argv.includes("--write")) {
  await writeFile(new URL("../app/research/_chip-trends/history.json", import.meta.url), JSON.stringify(history,null,2)+"\n");
  await writeFile(new URL("../app/research/_chip-trends/quarters.json", import.meta.url), JSON.stringify(quarters,null,2)+"\n");
}
