import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { asOf, project, reports } from "./data";

type Lang = "en" | "zh";
export type Route = { params: Promise<{ semiconductorHub: string }> };
export const staticParams = () => reports.map(({ slug }) => ({ semiconductorHub: slug }));
function lookup(slug: string) {
  return reports.find((r) => r.slug === slug) ?? notFound();
}
export async function hubMetadata({ params }: Route, lang: Lang): Promise<Metadata> {
  const r = lookup((await params).semiconductorHub);
  const path = "/research/" + r.slug;
  return {
    title: lang === "zh" ? r.name + "（" + r.ticker + "）基本面研究" : r.name + " (" + r.ticker + ") Fundamental Analysis",
    description: r.thesis[lang === "zh" ? 1 : 0],
    alternates: { canonical: path + (lang === "zh" ? "/zh" : ""), languages: { en: path, "zh-CN": path + "/zh" } },
  };
}
const num = (v: number) => v.toLocaleString("en-US", { maximumFractionDigits: 3 });
const pct = (v: number) => (v * 100).toFixed(1) + "%";
const box = "border border-zinc-200 dark:border-zinc-700 rounded-md";
const heading = "mb-3 text-xl font-semibold";
const cell = "px-3 py-2 text-right whitespace-nowrap";
const link = "underline underline-offset-4";

export async function Hub({ route, lang }: { route: Route; lang: Lang }) {
  const r = lookup((await route.params).semiconductorHub);
  const i = lang === "zh" ? 1 : 0;
  const t = (en: string, zh: string) => i ? zh : en;
  const price = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: r.currency }).format(n);
  const [period, revenue, eps] = r.quarterly[r.quarterly.length - 1];
  const historicalEps = r.annual[r.annual.length - 1][2];
  const base = r.scenarios[1];
  const requiredGrowth = (r.price * 1.1 ** 5 * r.shares * (1 + base[2]) ** 5 / (base[3] * r.modelRevenue * base[1])) ** .2 - 1;
  const marketLabels = [t("Dated close","参考收盘价"), t("Latest revenue","最新季营收"), t("Gross margin","毛利率"), "EPS"];
  function history(rows: typeof r.annual, caption: string) {
    const hasCash = rows.some((row) => row[3] !== undefined);
    const headers = [t("Period","期间"),t("Revenue","营收"),"EPS",...(hasCash ? [t("Operating cash","经营现金流"),t("Investment outflow¹","投资支出¹"),t("Cash less investment","经营现金流减投资支出")] : [])];
    return <div className="overflow-x-auto"><table className="w-full text-sm tabular-nums">
      <caption className="mb-2 text-left font-medium">{caption}</caption>
      <thead><tr className="border-b">{headers.map((h, k) => <th key={h} scope="col" className={cell + (k === 0 ? " text-left" : "")}>{h}</th>)}</tr></thead>
      <tbody>{rows.map(([p, rev, e, cash, capex]) => <tr className="border-b border-zinc-200 dark:border-zinc-700" key={p}><th scope="row" className="p-3 text-left">{p}</th>{[rev,e,...(hasCash ? [cash,capex,cash !== undefined && capex !== undefined ? cash-capex : undefined] : [])].map((v,k)=><td key={k} className={cell}>{v === undefined ? "—" : num(v)}</td>)}</tr>)}</tbody>
    </table></div>;
  }
  return <main className="mx-auto max-w-6xl space-y-9 px-4 py-10 sm:px-8" lang={lang}>
    <header className="space-y-4">
      <nav aria-label={t("Research and language","研究与语言")} className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <a className={link} href="/research">{t("Research library","研究目录")}</a>
        <a className={link} aria-current={!i ? "page" : undefined} href={"/research/" + r.slug}>English</a>
        <a className={link} aria-current={i ? "page" : undefined} href={"/research/" + r.slug + "/zh"}>中文</a>
      </nav>
      <div className="text-sm font-medium">{t("Semiconductor series","半导体系列")} / {r.ticker}</div>
      <h1 className="text-3xl font-bold sm:text-4xl">{r.name} ({r.ticker}) {t("Fundamental Analysis","基本面研究")}</h1>
      <p className="max-w-3xl text-lg">{r.thesis[i]}</p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("Price reference","参考股价日期")} {asOf} · {r.basis[i]}</p>
    </header>
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {[price(r.price),num(revenue) + "B " + r.currency,r.gross.toFixed(1) + "%",price(eps)].map((v,k)=><div className={box + " p-4"} key={marketLabels[k]}><dt className="text-sm">{marketLabels[k]}</dt><dd className="mt-1 text-xl font-semibold tabular-nums">{v}</dd></div>)}
    </dl>
    <section aria-labelledby="results" className="space-y-3">
      <h2 id="results" className={heading}>{t("Latest results and segment signals","最新业绩和经营信号")} · {period}</h2>
      <dl className="grid gap-2 sm:grid-cols-2">{r.metrics.map(([label,value])=><div key={label[0]} className="flex justify-between gap-3 border-b py-2"><dt>{label[i]}</dt><dd className="whitespace-nowrap font-medium tabular-nums">{value}</dd></div>)}</dl>
      <p><strong>{t("Management outlook:","管理层指引：")}</strong> {r.guidance[i]} <a className={link} href={r.latestSource}>{r.release}</a></p>
    </section>
    {r.sections.map(([label,body])=><section key={label[0]}><h2 className={heading}>{label[i]}</h2><p className="max-w-4xl leading-relaxed">{body[i]}</p></section>)}
    <section className="space-y-4">
      <h2 className={heading}>{t("Reported financial history","已披露财务历史")}</h2>
      <p className="text-sm">{r.currency} {t("billions except EPS. Selected quarters, not a continuous series. A dash means no figure is transcribed here.","十亿，EPS 除外。季度表为选定报告期，并非连续序列。破折号表示本文未录入。")}</p>
      <figure aria-label={t("Annual revenue by fiscal year","历年营收")} className="space-y-2">
        {r.annual.map(([p,v])=><div key={p} className="grid grid-cols-[4.5rem_1fr_5rem] items-center gap-2 text-sm"><span>{p}</span><div className="h-3 bg-zinc-100 dark:bg-zinc-800" aria-hidden><div className="h-full bg-teal-600" style={{width:(v/Math.max(...r.annual.map(row=>row[1]))*100)+"%"}} /></div><span className="text-right tabular-nums">{num(v)}B</span></div>)}
      </figure>
      {history(r.annual,t("Annual results","年度数据"))}
      {history(r.quarterly,t("Quarterly results","季度数据"))}
      {r.annual.some(x=>x[4] !== undefined) && <p className="text-sm">{t("¹ Cash investment is reported capex for AMAT, purchases of property and equipment for ARM, and property/equipment plus intangibles for ASML and Lam. The subtraction is a cash-flow proxy, not a fully comparable FCF measure.","¹ AMAT 用资本开支，ARM 用购置物业及设备，ASML 和 Lam 用设备等资本支出及无形资产。差额为现金流近似值，不能跨公司当作同口径自由现金流。")}</p>}
      <p className="text-sm">{t("October 30 to November 25 close: ","10 月 30 日至 11 月 25 日收盘：")}{price(r.octoberClose)} → {price(r.price)} ({pct(r.price / r.octoberClose - 1)}). {t("Using the same latest completed fiscal-year EPS at both dates, the reference multiple moved from ","两个日期均用同一最近已完成财年的 EPS 作分母，参考倍数从 ")}{(r.octoberClose/historicalEps).toFixed(1)}× → {(r.price/historicalEps).toFixed(1)}×. {t("This isolates the price move; it is not a point-in-time P/E series or a peak drawdown.","此比较只展示股价变化，不是逐日市盈率序列或峰值回撤。")}</p>
    </section>
    <section className="space-y-4">
      <h2 className={heading}>{t("Valuation and return scenarios","估值与回报情景")}</h2>
      <p>{t("Starting revenue","起始营收")} {r.currency} {num(r.modelRevenue)}B · {t("starting shares (model assumption)","起始股数（模型假设）")} {num(r.shares)}B{r.ticker === "ASML" ? t(" · Revenue starts from the FY2026 guidance midpoint, not an actual."," · 营收以 2026 年指引中点为起点，非实际值。") : "."}</p>
      <p className="text-sm">{t("Revenue and share count compound annually from FY","营收与股数按年复合，起算财年：")}{r.modelStart}. {t("EPS = revenue × net margin ÷ share count. Exit price = EPS × exit P/E; annualized price return excludes dividends, taxes and FX. Each scenario uses the same inputs at both horizons; neither is guidance.","EPS = 营收 × 净利率 ÷ 股数。期末价格 = EPS × 期末市盈率；年化价格回报不含股息、税费及汇率。每种情景在两个期限使用相同假设，不代表管理层指引。")}</p>
      <div className="overflow-x-auto"><table className="w-full text-sm tabular-nums">
        <caption className="sr-only">{t("Illustrative 5- and 10-year scenarios","五年与十年模拟情景")}</caption>
        <thead><tr className="border-b">{[t("Case / year","情景／年度"),t("Growth","营收增速"),t("Net margin","净利率"),t("Share CAGR","股数增速"),t("Exit P/E","退出市盈率"),t("Sales (B)","营收（十亿）"),t("Net income (B)","净利润（十亿）"),"EPS",t("Exit price","期末价格"),t("Annual return","年化回报")].map(h=><th key={h} scope="col" className={cell}>{h}</th>)}</tr></thead>
        <tbody>{r.scenarios.flatMap((s,k)=>[5,10].map(y=>{const v=project(r,s,y); return <tr key={k+"-"+y} className="border-b border-zinc-200 dark:border-zinc-700"><th scope="row" className={cell + " text-left"}>{[t("Bear","悲观"),t("Base","基准"),t("Bull","乐观")][k]} · {r.modelStart+y}</th>{[pct(s[0]),pct(s[1]),pct(s[2]),s[3]+"×",num(v.revenue),num(v.netIncome),price(v.eps),price(v.value),pct(v.cagr)].map((d,j)=><td key={j} className={cell}>{d}</td>)}</tr>;}))}</tbody>
      </table></div>
      <p>{t("Reverse valuation: at the base margin, dilution and exit multiple, a 10% annualized five-year price return requires annual sales growth of ","反推估值：在基准净利率、股数变化与退出倍数下，若要获得五年 10% 的年化价格回报，所需营收年增速为 ")}<strong>{pct(requiredGrowth)}</strong>.</p>
      <p className="text-sm">{t("Scenarios are conditional illustrations, not probability-weighted targets or individualized advice. Constant margins, growth and multiples can materially overstate long-run results, especially across equipment cycles and with entry into new businesses.","本情景为条件推演，不是概率加权目标价或个性化投资建议。固定增速、利润率和估值倍数可能高估长期结果，尤其在设备周期或切入新业务时。")}</p>
    </section>
    <section>
      <h2 className={heading}>{t("Sources and data audit","来源与数据口径")}</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li><a className={link} href={r.annualSource}>{t("SEC annual filing","SEC 年报")}</a></li>
        <li><a className={link} href={r.latestSource}>{t("Latest earnings disclosure and outlook","最近财报及指引")}</a></li>
        {r.supplemental && <li><a className={link} href={r.supplemental}>{t("Supplemental issuer disclosure","发行人补充披露")}</a></li>}
        <li><a className={link} href={r.quote}>{t("Historical close, unadjusted for dividends","历史收盘价，未经股息调整")} ({asOf})</a></li>
      </ul>
      <p className="mt-4">{t("Related hubs:","同系列研究：")} {reports.filter(x=>x.slug!==r.slug).map(x=><a key={x.slug} className={link+" mr-3"} href={"/research/"+x.slug+(i?"/zh":"")}>{x.ticker}</a>)}</p>
    </section>
  </main>;
}
