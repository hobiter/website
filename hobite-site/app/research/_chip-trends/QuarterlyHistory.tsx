import quarterData from "./quarters.json" with { type: "json" };
import { cagr, type ChipTicker } from "./model";

type Fact = {value:number; basis:string; links:string[]; tag:string};
type Quarter = {end:string; fiscalYear:number; quarter:number; revenue:Fact; eps?:Fact; cash?:Fact; capex?:Fact};
const bound = "border-b border-zinc-200 dark:border-zinc-700";
const cell = "px-3 py-2 text-right whitespace-nowrap tabular-nums";
const fmt = (v:number|undefined, eps = false) => v === undefined ? "—" : (eps?v:v/1e9).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:eps?3:2});
const fcf = (r:Quarter) => r.cash && r.capex ? r.cash.value-r.capex.value : undefined;

export function QuarterlyHistory({ticker, currency, zh}:{ticker:ChipTicker;currency:string;zh:boolean}) {
  const rows:Quarter[] = quarterData[ticker];
  const t=(en:string,cn:string)=>zh?cn:en;
  const first = rows[0], last = rows[rows.length-1];
  const coverage = `FY${first.fiscalYear} Q${first.quarter}–FY${last.fiscalYear} Q${last.quarter}`;
  const byPeriod = new Map(rows.map(r=>[`${r.fiscalYear}/${r.quarter}`,r]));
  return <section className="space-y-3" aria-labelledby="quarterly-history">
    <h3 id="quarterly-history" className="text-xl font-semibold">{t("Quarterly financial history","季度财务历史")}</h3>
    <p className="text-sm">{coverage} · {rows.length} {t("quarters","个季度")} · {currency} {t("billions except diluted EPS per share.","十亿，稀释每股收益除外。")}
      {ticker==="ARM" && " " + t("Comparable quarterly issuer workbooks start in March 2022.","可比的发行人季度财务表始于 2022 年 3 月。")}
    </p>
    <details className="rounded-md border border-zinc-200 dark:border-zinc-700">
      <summary className="cursor-pointer p-3 font-medium">{t("Quarterly values, revenue growth and source filings","季度数值、营收同比及申报来源")}</summary>
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={t("Quarterly financial table","季度财务表")}>
        <table className="w-full text-sm">
          <thead><tr className={bound}>{[
            t("Quarter","季度"),t("Period end","期末"),t("Revenue","营收"),t("Revenue YoY","营收同比"),
            t("Operating cash flow","经营现金流"),t("Capital investment","资本投资"),"FCF",t("Diluted EPS","稀释 EPS"),t("Filings","申报来源"),
          ].map((v,i)=><th key={v} scope="col" className={i===0?"px-3 py-2 text-left":cell}>{v}</th>)}</tr></thead>
          <tbody>{[...rows].reverse().map(row=>{
            const prior = byPeriod.get(`${row.fiscalYear-1}/${row.quarter}`);
            const growth=cagr(prior?.revenue.value??null,row.revenue.value,1);
            const derived=[row.revenue,row.cash,row.capex].some(f=>f?.basis==="ytd-difference");
            const urls=[...new Set([row.revenue,row.cash,row.capex,row.eps].flatMap(f=>f?.links??[]))];
            const values=[row.end,fmt(row.revenue.value),growth===null?"—":(growth*100).toFixed(1)+"%",fmt(row.cash?.value),fmt(row.capex?.value),fmt(fcf(row)),fmt(row.eps?.value,true)];
            return <tr key={row.end} className={bound}>
              <th scope="row" className="whitespace-nowrap px-3 py-2 text-left">FY{row.fiscalYear} Q{row.quarter}{derived?" *":""}</th>
              {values.map((v,i)=><td key={i} className={cell}>{v}</td>)}
              <td className={cell}>{urls.map((url,i)=><a className="ml-2 underline underline-offset-2" key={url} href={url} aria-label={`FY${row.fiscalYear} Q${row.quarter} ${t("source","来源")} ${i+1}`}>{i+1}</a>)}</td>
            </tr>;
          })}</tbody>
        </table>
      </div>
    </details>
    <p className="text-sm">{t("* At least one flow is calculated from consecutive cumulative filing totals. FCF equals operating cash flow less disclosed capital investment. A dash means the point could not be supported by a comparable source; EPS is not derived by subtracting cumulative EPS.","* 至少一项流量由相邻累计申报数值相减得到。自由现金流为经营现金流减披露的资本投资。破折号表示没有可比数据来源；不以累计每股收益相减推算季度值。")}</p>
  </section>;
}
