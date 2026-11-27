import { writeFile } from "node:fs/promises";
import { TSM_ANNUAL } from "../app/research/tsmc-complete-fundamental-analysis/annualFinancials.ts";

const cut = "2026-11-27";
const config = {
  ASML: ["937966", "EUR", 2025, 2016],
  AMAT: ["6951", "USD", 2026, 2017],
  LRCX: ["707549", "USD", 2026, 2017],
  ARM: ["1973239", "USD", 2026, 2017],
  TSM: ["1046179", "TWD", 2025, 2016],
  NVDA: ["1045810", "USD", 2026, 2017],
  AVGO: ["1730168", "USD", 2025, 2016, "1649338"],
  AMD: ["2488", "USD", 2025, 2016],
};
const fields = {
  revenue: ["RevenueFromContractWithCustomerExcludingAssessedTax", "Revenues", "SalesRevenueNet", "Revenue"],
  cash: ["NetCashProvidedByUsedInOperatingActivities", "NetCashProvidedByUsedInOperatingActivitiesContinuingOperations"],
  capex: ["PaymentsToAcquirePropertyPlantAndEquipment", "PaymentsToAcquireProductiveAssets", "PaymentsToAcquirePropertyPlantAndEquipmentAndIntangibleAssets"],
  eps: ["EarningsPerShareDiluted", "DilutedEarningsLossPerShare", "DilutedEarningsLossPerShareFromContinuingOperations"],
};
const annualForms = new Set(["10-K","10-K/A","20-F","20-F/A","F-1","F-1/A"]);
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
function candidates(docs, field, unit) {
  const out = [];
  for (const {cik,facts} of docs) {
    for (const ns of ["us-gaap","ifrs-full"]) {
      for (const tag of fields[field]) {
        for (const f of facts[ns]?.[tag]?.units[unit] ?? []) {
          if (annualForms.has(f.form) && f.filed <= cut && duration(f) >= 350 && duration(f) <= 380) out.push({...f, cik, ns, tag});
        }
      }
    }
  }
  return out;
}
const preferRecent = (a,b) => b.filed.localeCompare(a.filed);
const earlyNvidiaCapex = {2017:176, 2018:593, 2019:600, 2020:489, 2021:1128};
const history = {};
for (const [ticker,[cik,currency,last,first,predecessor]] of Object.entries(config)) {
  if (ticker==="TSM") {
    history[ticker] = TSM_ANNUAL.filter(r=>r.year>=first && r.year<=last).map(r=>({
      year:r.year,end:r.end,revenue:r.revenue,fcf:r.operatingCashFlow-r.capex,eps:r.dilutedEps,currency,basis:"ifrs-full",
      evidence:Object.fromEntries(["revenue","cash","capex","eps"].map(k=>[k,
        r.provenance?.[({cash:"operatingCashFlow",eps:"dilutedEps"})[k]??k]?.url ?? r.source])),
      capexTag:"Purchases of property, plant and equipment",epsSplitFactor:1,
    }));
    continue;
  }
  const docs = [await load(cik)];
  if (predecessor) docs.push(await load(predecessor));
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
      year, end:revenue.end, revenue:revenue.val,
      fcf:cash&&capexValue!==undefined?cash.val-Math.abs(capexValue):null,
      eps:eps?eps.val/factor:null, currency, basis: revenue.ns,
      evidence:{ revenue:source(revenue), cash:cash?source(cash):null, capex:manualCapex===undefined?(capex?source(capex):null):
        (year<=2019?"https://www.sec.gov/Archives/edgar/data/1045810/000104581019000023/nvda-2019x10k.htm":"https://www.sec.gov/Archives/edgar/data/1045810/000104581021000010/nvda-20210131.htm"), eps:eps?source(eps):null },
      capexTag:manualCapex===undefined?(capex?.tag??null):"Purchases of property, equipment and intangible assets", epsSplitFactor:factor,
    });
  }
  if(ticker==="AMAT"&&!rows.some(r=>r.year===2026)) {
    const release="https://ir.appliedmaterials.com/news-releases/news-release-details/applied-materials-announces-fourth-quarter-and-fiscal-year-2026";
    rows.push({year:2026,end:"2026-10-25",revenue:34.446e9,fcf:6.196e9,eps:12.62,currency,basis:"us-gaap",
      evidence:{revenue:release,cash:release,capex:release,eps:release},capexTag:"Capital expenditures",epsSplitFactor:1});
  }
  history[ticker] = rows;
  console.log(ticker, rows.map(x=>[x.year,x.revenue/1e9,x.fcf===null?null:Math.round(x.fcf/1e7)/100,x.eps,x.basis,x.capexTag]).map(x=>x.join(":")).join(" "));
}
if (process.argv.includes("--write")) {
  await writeFile(new URL("../app/research/_chip-trends/history.json", import.meta.url), JSON.stringify(history,null,2)+"\n");
}
