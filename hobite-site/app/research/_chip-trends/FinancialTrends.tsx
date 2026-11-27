import { buildForecast, cagr, chipHistory, historicalFcfMargin, metrics, type ChipTicker, type ForecastInput, type Metric } from "./model";

type Copy = readonly [string,string];
const fmt = (v: number, digits = 2) => v.toLocaleString("en-US",{minimumFractionDigits:digits,maximumFractionDigits:digits});
const percent = (v: number | null) => v === null ? "—" : (v*100).toFixed(1)+"%";
const names: Record<Metric,Copy> = {revenue:["Revenue","营收"],fcf:["Free cash flow","自由现金流"],eps:["Diluted EPS","稀释 EPS"]};
const labels: Copy[] = [["Bear","悲观"],["Base","基准"],["Bull","乐观"]];
const colors = ["#e36c77","#199d90","#7c8aeb"];
const cell = "whitespace-nowrap px-3 py-2 text-right tabular-nums";
const line = "border-b border-zinc-200 dark:border-zinc-700";
const outer = "rounded-md border border-zinc-200 dark:border-zinc-700";
type Point = { year:number; value:number|null };

function HistoryBars({ points, label, show }: { points:Point[]; label:string; show:(n:number)=>string }) {
  const hi=Math.max(0,...points.map(p=>p.value??0));
  const lo=Math.min(0,...points.map(p=>p.value??0));
  const y=(v:number)=>28+(hi-v)*92/(hi-lo||1);
  const step=74, width=step*points.length+16;
  return <svg className="w-full" style={{minWidth: Math.max(360, width - 40)}} viewBox={`0 0 ${width} 153`} role="img" aria-label={label}>
    <line x1="8" x2={width-8} y1={y(0)} y2={y(0)} stroke="currentColor" opacity=".22" />
    {points.map(({year,value},i)=>{
      const x=45+i*step;
      const barY=value===null?y(0):Math.min(y(0),y(value));
      return <g key={year} fontSize="11" textAnchor="middle">
        {value!==null && <rect x={x-15} y={barY} width="30" height={Math.max(1,Math.abs(y(value)-y(0)))} fill={value>=0?colors[1]:colors[0]}><title>{year}: {show(value)}</title></rect>}
        <text x={x} y={value!==null&&value<0 ? y(0)-5 : barY-5} fill="currentColor">{value===null?"—":show(value)}</text>
        <text x={x} y="143" fill="currentColor">{year}</text>
      </g>;
    })}
  </svg>;
}

function ForecastLines({ sets, label, show }: { sets:Point[][]; label:string; show:(n:number)=>string }) {
  const hi=Math.max(1,...sets.flatMap(s=>s.map(p=>p.value??0)));
  const first=sets[0][0].year-1;
  const x=(year:number)=>77+(year-first)*44;
  const y=(value:number)=>137-value/hi*105;
  return <svg className="w-full min-w-[300px]" viewBox="0 0 532 170" role="img" aria-label={label}>
    {[0,.5,1].map(n=><g key={n}><line x1="77" x2="517" y1={y(hi*n)} y2={y(hi*n)} stroke="currentColor" opacity=".18"/><text x="3" y={y(hi*n)+4} fill="currentColor" fontSize="12">{show(hi*n)}</text></g>)}
    {[1,5,10].map(n=><g key={n}><line x1={x(first+n)} x2={x(first+n)} y1="24" y2="137" stroke="currentColor" opacity=".12" /><text x={x(first+n)} y="158" textAnchor={n===10?"end":"middle"} fill="currentColor" fontSize="12">{first+n}</text></g>)}
    {sets.map((points,k)=><g key={k}>
      <polyline points={points.map(p=>`${x(p.year)},${y(p.value??0)}`).join(" ")} fill="none" stroke={colors[k]} strokeWidth={k===1?3:2} strokeDasharray={k===0?"5 3":k===2?"2 3":undefined} />
      {points.filter(p=>[5,10].includes(p.year-first)).map(p=><circle key={p.year} cx={x(p.year)} cy={y(p.value??0)} r="3.5" fill={colors[k]}><title>{p.year}: {show(p.value??0)}</title></circle>)}
    </g>)}
  </svg>;
}

export function FinancialTrends({ ticker, zh, input, anchor, source }: {
  ticker:ChipTicker;zh:boolean;input:ForecastInput;anchor:Copy;source:string;
}) {
  const lang=zh?1:0;
  const t=(a:string,b:string)=>zh?b:a;
  const rows=chipHistory[ticker];
  const first=rows[0], last=rows[rows.length-1];
  const fc=historicalFcfMargin(ticker);
  const forecasts=buildForecast(ticker,input);
  const unit=(m:Metric)=>m==="eps"?`${last.currency} / ${t("share","股")}`:`${last.currency} ${t("billions","十亿")}`;
  const show=(m:Metric,v:number)=>fmt(m==="eps"?v:v/1e9,m==="eps" && Math.abs(v)<1?3:2);
  const value=(m:Metric,v:number|null)=>v===null?"—":show(m,v);
  return <section className="space-y-5" aria-labelledby="financial-trends" data-financial-trends={ticker}>
    <div>
      <h2 id="financial-trends" className="text-2xl font-semibold">{t("Financial history and outlook","财务历史与预测")}</h2>
      <p className="mt-2 text-sm">{t("Reported fiscal years","已报告财年")} {first.year}–{last.year} · {rows.length} {t("periods","个期间")}. {ticker==="ARM"?t("The comparable U.S. GAAP filing series starts in FY2022; earlier periods are not estimated.","可比美国 GAAP 申报数据从 2022 财年开始；本文未估算更早期间。"):t("Actuals and modeled results are shown separately.","实际值与模型预测分开列示。")}</p>
    </div>
    {metrics.map(m=><figure key={m} className={outer+" p-3 sm:p-4"}>
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2"><span className="font-semibold">{names[m][lang]} <small className="font-normal">· {unit(m)}</small></span><span className="text-sm font-medium">{first.year}–{last.year} CAGR: {percent(cagr(first[m],last[m],last.year-first.year))}</span></figcaption>
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={names[m][lang]}><HistoryBars points={rows.map(r=>({year:r.year,value:r[m]}))} label={names[m][lang]} show={n=>show(m,n)} /></div>
    </figure>)}
    <details className={outer}>
      <summary className="cursor-pointer p-3 font-medium">{t("Annual values, year-over-year changes, and filing links","年度数值、同比与申报文件")}</summary>
      <div className="overflow-x-auto">
        <table className="w-full text-sm"><thead><tr className={line}>{[t("Fiscal year","财年"),...metrics.flatMap(m=>[`${names[m][lang]} (${unit(m)})`,t("YoY","同比")]),t("Sources","来源")].map((v,i)=><th key={i} scope="col" className={cell}>{v}</th>)}</tr></thead>
          <tbody>{rows.map((r,i)=><tr key={r.year} className={line}><th scope="row" className={cell}>{r.year}</th>
            {metrics.map(m=>[value(m,r[m]),percent(i&&r.year-rows[i-1].year===1?cagr(rows[i-1][m],r[m],1):null)]).flat().map((v,j)=><td key={j} className={cell}>{v}</td>)}
            <td className={cell}>{Object.entries(r.evidence).filter(([,u])=>u).map(([key,url])=><a key={key} className="ml-2 underline" href={url!}>{({revenue:t("Sales","营收"),cash:t("CFO","经营现金"),capex:t("Capex","资本开支"),eps:"EPS"})[key]}</a>)}</td>
          </tr>)}</tbody>
        </table>
      </div>
    </details>
    <p className="text-sm">{t("Historical FCF is operating cash flow less the disclosed capital investment line (including intangibles where combined). It is not adjusted FCF or FCFF. EPS is split-adjusted where applicable. Growth is unavailable when either endpoint is missing or nonpositive.","历史自由现金流为经营现金流减披露的资本投资支出（若合并列报则包含无形资产），并非调整后 FCF 或 FCFF。EPS 在适用时按拆股调整。任一端点缺失或非正数时不计算增长率。")}</p>
    <h3 className="pt-3 text-xl font-semibold">{t("Filing-based 5- and 10-year forecast","基于财报的五年与十年预测")}</h3>
    <p className="text-sm"><a className="underline" href={source}>{anchor[lang]}</a> · FY{input.fiscalYear} · {last.currency} {fmt(input.salesBillions)}B. {t("FCF margin starts at the latest annual observation and moves over five years to a base target of aggregate FCF divided by aggregate sales","自由现金流率从最近年报值出发，五年内逐步趋向基准目标（历史自由现金流总额／营收总额）")} (FY{fc.first}–{fc.last}: {percent(fc.margin)}). {t("Bear and bull targets shift by −6 and +6 percentage points. Net margins and share changes remain scenario assumptions.","悲观及乐观目标分别减、加 6 个百分点。净利率与股数变化仍为情景假设。")}</p>
    <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm font-medium">{labels.map((l,i)=><span key={l[0]}><span aria-hidden style={{color:colors[i]}}>{["– –","━━","···"][i]} </span>{l[lang]}</span>)}</div>
    <div className="grid gap-3 xl:grid-cols-3">
      {metrics.map(m=><figure key={m} className={outer+" overflow-x-auto p-3"}>
        <figcaption className="font-semibold">{names[m][lang]} <small className="font-normal">· {unit(m)}</small></figcaption>
        <ForecastLines sets={forecasts.map(f=>f.rows.slice(1).map(r=>({year:r.year,value:r[m]})))} label={names[m][lang]+" "+t("forecast","预测")} show={n=>show(m,n)} />
      </figure>)}
    </div>
    <div className="overflow-x-auto" role="region" tabIndex={0} aria-label={t("Forecast checkpoints","预测节点")}>
      <table className="w-full text-sm">
        <caption className="mb-2 text-left font-semibold">{t("Year 5 and 10: values and CAGR from the normalized model base","第五与第十年：数值及相对于模型基期的 CAGR")}</caption>
        <thead><tr className={line}>{[t("Scenario / FY","情景／财年"),...metrics.flatMap(m=>[`${names[m][lang]} (${unit(m)})`,"CAGR"])].map((v,i)=><th key={i} scope="col" className={cell}>{v}</th>)}</tr></thead>
        <tbody>{forecasts.flatMap((f,i)=>[5,10].map(n=><tr className={line} key={i+":"+n}><th scope="row" className={cell}>{labels[i][lang]} · {f.rows[n].year}</th>{metrics.flatMap(m=>[value(m,f.rows[n][m]),percent(cagr(f.rows[0][m],f.rows[n][m],n))]).map((v,j)=><td key={j} className={cell}>{v}</td>)}</tr>))}</tbody>
      </table>
    </div>
    <details className={outer}>
      <summary className="cursor-pointer p-3 font-medium">{t("Full annual forecast and assumptions","逐年预测及模型假设")}</summary>
      <div className="overflow-x-auto"><table className="w-full text-sm">
        <thead><tr className={line}>{[t("Scenario","情景"),t("FY","财年"),...metrics.map(m=>`${names[m][lang]} (${unit(m)})`),t("Net margin","净利率"),t("FCF margin","自由现金流率"),t("Share CAGR","股数 CAGR")].map(v=><th key={v} scope="col" className={cell}>{v}</th>)}</tr></thead>
        <tbody>{forecasts.flatMap((f,i)=>f.rows.map((r,j)=><tr key={i+":"+r.year} className={line}><th scope="row" className={cell}>{labels[i][lang]}</th><td className={cell}>{r.year}{j===0?t(" (base)","（基期）"):""}</td>{metrics.map(m=><td key={m} className={cell}>{value(m,r[m])}</td>)}<td className={cell}>{percent(f.netMargin)}</td><td className={cell}>{percent(r.yearMargin)}</td><td className={cell}>{percent(f.shareGrowth)}</td></tr>))}</tbody>
      </table></div>
    </details>
  </section>;
}
