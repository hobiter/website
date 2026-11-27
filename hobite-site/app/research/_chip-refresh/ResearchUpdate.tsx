import type { ReactNode } from "react";
import { chips, priceDate, project, requiredGrowth, revenueAnchor, type Ticker } from "./data";
import { FinancialTrends } from "../_chip-trends/FinancialTrends";

const usd = (x: number) => "$" + x.toFixed(2);
const pct = (x: number) => (x * 100).toFixed(1) + "%";
const num = (x: number) => x.toLocaleString("en-US", { maximumFractionDigits: 3 });
const underline = "underline underline-offset-4";
const cell = "px-3 py-2 text-right whitespace-nowrap";

export function ResearchUpdate({
  ticker, zh = false, children,
}: { ticker: Ticker; zh?: boolean; children: ReactNode }) {
  const r = chips[ticker];
  const t = (en: string, cn: string) => zh ? cn : en;
  const lang = zh ? 1 : 0;
  const path = "/research/" + r.slug + "-complete-fundamental-analysis";
  const local = ticker === "TSM" ? "NT$" : "$";
  const epsLabel = t("Diluted EPS","稀释 EPS");
  const metric = [
    [t("Latest quarterly sales","最新季度营收"),local + num(r.revenue) + "B",pct(r.revenue / r.priorRevenue - 1) + t(" YoY"," 同比")],
    [t("Gross margin","毛利率"),r.gross + "%",t("Reported","实际值")],
    [epsLabel,local + r.eps.toFixed(2),t("Prior year: ","上年同期：") + local + r.priorEps.toFixed(2)],
    [t("U.S. reference close","美国市场参考收盘价"),usd(r.close),priceDate],
  ];
  return <div lang={zh ? "zh-CN" : "en"}>
    <section aria-labelledby="chip-update-title" className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-8">
      <header className="space-y-4">
        <nav className="flex flex-wrap gap-5 text-sm" aria-label={t("Research navigation","研究导航")}>
          <a href="/research" className={underline}>{t("Research library","研究目录")}</a>
          <a href={path + (zh ? "" : "/zh")} className={underline}>{t("中文","English")}</a>
          <a href="#previous-edition" className={underline}>{t("Previous edition and financial history","上一版研究与财务历史")}</a>
        </nav>
        <p className="text-sm">{t("Research update","研究更新")} · {priceDate} · {r.period}</p>
        <h1 id="chip-update-title" className="text-3xl font-bold sm:text-4xl">{r.name} ({ticker}) {t("Fundamental Analysis","基本面研究")}</h1>
        <p className="max-w-4xl text-lg">{r.thesis[lang]}</p>
      </header>
      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {metric.map(([label,value,detail])=><div key={label} className="rounded-md border border-zinc-300 p-3 dark:border-zinc-700"><dt className="text-sm">{label}</dt><dd className="text-xl font-semibold tabular-nums">{value}</dd><dd className="text-sm">{detail}</dd></div>)}
      </dl>
      <section>
        <h2 className="mb-3 text-xl font-semibold">{t("Quarterly evidence","季度经营数据")}</h2>
        <dl className="grid gap-x-6 sm:grid-cols-2">
          {r.facts.map(([label,value])=><div key={label[0]} className="flex flex-wrap justify-between gap-2 border-b border-zinc-300 py-2 dark:border-zinc-700"><dt>{label[lang]}</dt><dd className="font-semibold tabular-nums">{value}</dd></div>)}
        </dl>
        <p className="mt-4"><strong>{t("Management outlook: ","管理层指引：")}</strong>{r.guidance[lang]}</p>
      </section>
      <section className="max-w-4xl space-y-2">
        <h2 className="text-xl font-semibold">{t("What drives the next estimate","下一次业绩预判的关键")}</h2><p>{r.drivers[lang]}</p>
        <h3 className="pt-2 font-semibold">{t("What could break the case","可能使假设失效的因素")}</h3><p>{r.risk[lang]}</p>
      </section>
      <section className="space-y-4">
        <FinancialTrends ticker={ticker} zh={zh} source={r.sources[0][1]}
          anchor={["Quarterly report: nine-month actuals plus Q4 guidance midpoint","季度财报：前九个月实际值加第四季指引中点"]}
          input={{fiscalYear:r.fiscal,salesBillions:revenueAnchor(r),sharesBillions:r.shares,scenarios:r.cases}} />
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t("Five- and ten-year valuation scenarios","五年与十年估值情景")}</h2>
        <p>{t("Revenue anchor: first nine months plus Q4 guidance midpoint, not reported full-year sales.","营收起点：前九个月实际营收加第四季度指引中点，不是已披露全年业绩。")} {local}{num(revenueAnchor(r))}B · FY{r.fiscal} · {t("Starting modeled shares","模型起始股数")} {num(r.shares)}B.</p>
        <p className="text-sm">{ticker === "TSM" ? t("Revenue and net income remain in TWD. One ADS represents five ordinary shares; divide TWD per ADS by the modeled NT$31.80/USD. At NT$35/USD, USD values are about 9.1% lower, all else equal.","营收和净利润以新台币计。每 ADS 对应 5 股普通股，每 ADS 新台币价值以 31.80 汇率折为美元。若汇率为每美元 35 新台币，其他条件不变时美元价值约低 9.1%。") : t("Revenue, earnings and valuation are in USD.","营收、盈利和估值均以美元计。")}</p>
        <div className="overflow-x-auto" role="region" tabIndex={0} aria-label={t("Valuation scenarios table","估值情景表")}>
          <table className="w-full text-sm tabular-nums">
            <thead><tr className="border-b">{[t("Case / FY","情景／财年"),t("Sales CAGR","营收增速"),t("Net margin","净利率"),t("Share CAGR","股数增速"),t("Exit P/E","退出市盈率"),t("Sales (B)","营收（十亿）"),t("Net income (B)","净利（十亿）"),ticker === "TSM" ? "EPS/ADS ($)" : "EPS ($)",t("Exit price","期末价格"),t("Annualized price return","价格年化回报")].map((v,i)=><th scope="col" key={v} className={i === 0 ? "px-3 py-2 text-left" : cell}>{v}</th>)}</tr></thead>
            <tbody>{r.cases.flatMap((c,i)=>[5,10].map(years=>{
              const v = project(r,c,years);
              return <tr key={i + ":" + years} className="border-b border-zinc-300 dark:border-zinc-700">
                <th scope="row" className="whitespace-nowrap px-3 py-2 text-left">{[t("Bear","悲观"),t("Base","基准"),t("Bull","乐观")][i]} · {r.fiscal + years}</th>
                {[pct(c[0]),pct(c[1]),pct(c[2]),c[3]+"×",num(v.sales),num(v.income),usd(v.eps),usd(v.value),pct(v.annualized)].map((value,j)=><td className={cell} key={j}>{value}</td>)}
              </tr>;
            }))}</tbody>
          </table>
        </div>
        <p><strong>{t("Reverse valuation: ","反推估值：")}</strong>{t("To earn a 10% annualized five-year price return with the base margin, share count trajectory and exit multiple unchanged, sales must grow ","按照基准净利率、股数变化和退出倍数，五年实现 10% 价格年化回报需要营收年增速达到 ")}<strong>{pct(requiredGrowth(r,.10,5))}</strong>.</p>
        <p className="text-sm">{t("Revenue and share count compound separately. Projected EPS times exit P/E gives the terminal price. Returns exclude dividends, taxes and trading costs. These are illustrative assumptions, not company guidance, price targets or recommendations.","营收与股数分别复合增长。预测 EPS 乘以退出市盈率得到期末价格。回报不计股息、税费与交易成本。情景是教学假设，不是公司指引、目标价或投资建议。")}</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t("Sources and price context","来源与股价背景")}</h2>
        <p>{t("October 30 to November 27 regular-session closes: ","10 月 30 日至 11 月 27 日常规时段收盘价：")}{usd(r.october)} → {usd(r.close)} ({pct(r.close/r.october-1)}). {t("Fixed-window price change, not a peak drawdown or total return.","固定区间价格变化，不是峰值回撤或含股息总回报。")}</p>
        <ul className="list-disc space-y-1 pl-5">
          {r.sources.map(([label,url],i)=><li key={url}><a href={url} className={underline}>{label[lang]}</a>{i===0 ? " · " + r.release : ""}</li>)}
          <li><a href={"https://finabase.io/symbol/" + ticker.toLowerCase() + "/history"} className={underline}>{t("Historical market closes","市场历史收盘价")}</a></li>
        </ul>
      </section>
    </section>
    <details id="previous-edition" className="mx-auto mb-10 max-w-6xl rounded-md border border-zinc-300 dark:border-zinc-700">
      <summary className="cursor-pointer px-4 py-4 font-semibold">{t("Previous edition: historical financials, filing inventory and prior DCF","上一版：历史财务、申报文件与旧版 DCF")}</summary>
      <p className="px-4 pb-4 text-sm">{t("The archived report preserves its original date, prices and assumptions. Use the update above for the current snapshot.","归档报告保留原日期、价格与假设。当前研究截点请以上方更新为准。")}</p>
      {children}
    </details>
  </div>;
}
