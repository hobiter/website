"use client";

import { useState, type ReactNode } from "react";
import { COMPANIES, MARKET_DATE, RESEARCH_DATE } from "./investmentData";
import { CASES, CASE_INPUTS, dataCentre, rankedCompanies, valuation, type Scenario } from "./forecastModel";
import { FINANCIAL_HISTORY } from "./financialHistory";
import { REPORT, SECTORS } from "./reportContent";
import { SOURCES } from "./sources";

const fmt = (value: number | null | undefined, digits = 1) => value == null || !Number.isFinite(value) ? "N/A" : value.toLocaleString("en-US", { maximumFractionDigits: digits, minimumFractionDigits: digits });
const pct = (value: number | null | undefined) => value == null ? "N/A" : `${fmt(value * 100)}%`;
type Fact = { value: number; currency: string; end: string; filed: string; source: string };
function Table({ headers, rows, label }: { headers: string[]; rows: ReactNode[][]; label: string }) {
  return <div role="region" aria-label={label} tabIndex={0} className="max-w-full overflow-x-auto rounded focus:outline-2 focus:outline-emerald-700"><table className="w-full whitespace-nowrap text-left text-sm"><caption className="sr-only">{label}</caption><thead><tr>{headers.map((header, i) => <th key={i} scope="col" className="border-b border-zinc-400 px-3 py-3 font-semibold">{header}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j} className="border-b border-zinc-200 px-3 py-3 align-top tabular-nums">{cell}</td>)}</tr>)}</tbody></table></div>;
}
function factCell(fact: Fact | null | undefined) {
  return fact ? <a href={fact.source} target="_blank" rel="noreferrer" title={`${fact.currency}; period ends ${fact.end}; filed ${fact.filed}`} className="underline decoration-zinc-300 underline-offset-4">{fmt(fact.value / 1e9)}</a> : "N/A";
}
const currentResults = [
  ["MSFT", "2026-06-30", 90.007, "FY2026 Q4 / 财年第四季", "msft"],
  ["GOOGL", "2026-06-30", 119.796, "Q2 2026", "goog"],
  ["AMZN", "2026-06-30", 200.606, "Q2 2026", "amzn"],
  ["META", "2026-06-30", 60.801, "Q2 2026", "meta"],
  ["NVDA", "2026-07-26", 96.221, "FY2027 Q2 / 财年第二季", "nvda"],
  ["AVGO", "2026-08-02", 29.591, "FY2026 Q3 / 财年第三季", "avgo"],
  ["TSM", "2026-06-30", 40.20, "Q2 2026 (USD)", "tsm"],
  ["ASML", "2026-06-28", 9.326, "Q2 2026 (EUR)", "asml"],
  ["ANET", "2026-06-30", 3.0357, "Q2 2026", "anet"],
  ["ETN", "2026-06-30", 8.531, "Q2 2026", "etn"],
  ["MU", "2026-09-03", 54.229, "FY2026 Q4 / 财年第四季", "mu"],
] as const;

export default function ResearchView({ lang }: { lang: "en" | "zh" }) {
  const zh = lang === "zh";
  const t = (en: string, cn: string) => zh ? cn : en;
  const [ticker, setTicker] = useState("MSFT");
  const [scenario, setScenario] = useState<Scenario>("base");
  const [horizon, setHorizon] = useState<10 | 20>(20);
  const [price, setPrice] = useState("517.53");
  const [historyTicker, setHistoryTicker] = useState("MSFT");
  const company = COMPANIES.find((item) => item.ticker === ticker)!;
  const validPrice = Number(price) > 0 && Number.isFinite(Number(price));
  const result = valuation(company, scenario, horizon, validPrice ? Number(price) : company.price);
  const ranked = rankedCompanies();
  const history = FINANCIAL_HISTORY.find((item) => item.ticker === historyTicker)!;
  const source = (id: string) => SOURCES.find((item) => item.id === id)!;
  const sl = (id: string) => <a key={id} href={source(id).url} target="_blank" rel="noreferrer" className="underline underline-offset-4">{source(id).title}</a>;
  const labels = { bear: t("Bear", "悲观"), base: t("Base", "基准"), bull: t("Bull", "乐观") };
  const sectionTitle = "mb-4 text-2xl font-semibold";
  const field = "mt-1 w-full min-w-0 rounded border border-zinc-300 bg-white px-3 py-2 text-zinc-900";

  return <main data-company="ai-chain" lang={lang} className="mx-auto w-full min-w-0 max-w-7xl bg-white px-4 py-10 text-zinc-900 sm:px-8">
    <nav aria-label={t("Research navigation", "研究导航")} className="mb-7 flex flex-wrap gap-4 text-sm underline">
      <a href="/research">{t("Research library", "研究库")}</a><a href="/research/ai-value-chain-investment-outlook">English</a><a href="/research/ai-value-chain-investment-outlook/zh">中文</a>
    </nav>
    <header className="border-b border-zinc-200 pb-8">
      <p className="mb-3 text-sm font-medium text-emerald-800">{t("Hobite Research | Cross-sector investment study", "Hobite 研究 | 跨行业投资研究")}</p>
      <h1 className="text-4xl font-semibold sm:text-5xl">{t("The AI Value Chain", "AI 全产业价值链")}</h1>
      <p className="mt-4 text-xl text-zinc-600">{t("Where value compounds over the next 10 and 20 years", "未来十年与二十年，价值在哪里复利")}</p>
      <p className="mt-5 max-w-4xl text-sm leading-7 text-zinc-600">{t(`Research cutoff ${RESEARCH_DATE}. Market snapshot ${MARKET_DATE}. Reported facts, guidance and research assumptions are separated. General research, not personalized investment advice; forecasts and rankings are uncertain.`, `研究截点 ${RESEARCH_DATE}，市场快照 ${MARKET_DATE}。区分历史事实、指引与研究假设。仅供一般研究，不构成个性化投资建议；预测与排序存在不确定性。`)}</p>
    </header>
    <dl className="grid grid-cols-2 gap-6 border-b border-zinc-200 py-6 lg:grid-cols-4">{[
      [t("Value-chain groups", "价值链分组"), "8"], [t("Companies in financial appendix", "财务附录公司"), "15"], [t("Ranked long-duration shortlist", "长期排序候选"), "10"], [t("Model return hurdle", "模型回报门槛"), "12%"],
    ].map(([label, value]) => <div key={label}><dt className="text-xs text-zinc-500">{label}</dt><dd className="mt-2 text-2xl font-semibold">{value}</dd></div>)}</dl>
    <nav aria-label={t("Article contents", "文章目录")} className="flex flex-wrap gap-x-5 gap-y-3 border-b border-zinc-200 py-5 text-sm underline">{[["report", t("Full report", "完整报告")], ["sectors",t("Sector economics", "行业经济性")], ["ranking-table",t("Top 10", "十股排序")], ["forecasts",t("Forecast model", "预测模型")], ["financials",t("Financial history", "财务历史")], ["sources",t("Sources and audit", "来源核验")]].map(([id,label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>

    <section id="report" className="py-8">
      <h2 className={sectionTitle}>{t("Research report", "研究报告")}</h2>
      <div className="mb-8 grid gap-2 sm:grid-cols-2">{REPORT.map((chapter) => <a key={chapter.id} href={`#${chapter.id}`} className="text-sm leading-6 underline decoration-zinc-300 underline-offset-4">{zh ? chapter.titleZh : chapter.title}</a>)}</div>
      {REPORT.map((chapter) => <article key={chapter.id} id={chapter.id} className="border-t border-zinc-200 py-7">
        <h3 className="mb-4 text-xl font-semibold leading-8">{zh ? chapter.titleZh : chapter.title}</h3>
        <div className="max-w-5xl space-y-4 text-base leading-8 text-zinc-700">{(zh ? chapter.paragraphsZh : chapter.paragraphs).map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div>
        <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs leading-6 text-zinc-500"><span>{t("Evidence / context:", "证据 / 背景：")}</span>{chapter.sources.map(sl)}</p>
      </article>)}
    </section>

    <section id="sectors" className="border-t border-zinc-300 py-8">
      <h2 className={sectionTitle}>{t("Sector economics and operating scorecard", "行业经济性与运营指标")}</h2>
      <p className="mb-4 text-sm leading-7 text-zinc-600">{t("Qualitative research judgments, not measured sector ROIC or guaranteed stock returns. Each group contains heterogeneous businesses.", "定性研究判断，不是测量所得行业 ROIC，也不是股票收益保证。每组包含不同业务。")}</p>
      <Table label={t("AI sector comparison", "AI 行业比较")} headers={[t("Layer", "层级"),t("10-year view", "十年判断"),t("20-year view", "二十年判断"),t("Monitor", "监测指标")]} rows={SECTORS.map((row) => [row[zh ? 1 : 0],row[zh ? 3 : 2],row[zh ? 5 : 4],row[zh ? 7 : 6]])} />
      <h3 className="mb-4 mt-8 text-xl font-semibold">{t("100 MW project sensitivity - illustrative inputs only", "100 MW 项目敏感性：仅为示例假设")}</h3>
      <Table label={t("Data-centre utilization sensitivity", "数据中心利用率敏感性")} headers={[t("Billed utilization", "付费利用率"),t("Revenue $M", "收入 百万美元"),t("Power $M", "电费 百万美元"),t("Renewal $M", "更新 百万美元"),t("After-tax cash $M", "税后现金 百万美元"),t("Cash yield", "现金收益率")]} rows={[.5,.65,.8,.9].map((util) => { const dc = dataCentre(util); return [pct(util),fmt(dc.revenue),fmt(dc.power),fmt(dc.renewal),fmt(dc.afterTaxOwnerCash),pct(dc.afterTaxOwnerCash/dc.capex)]; })} />
      <p className="mt-3 text-sm text-zinc-600">{t("Utilization required for 12% after-tax steady-state cash yield:", "实现稳定税后 12% 现金收益所需利用率：")} {pct(dataCentre().breakEvenUtilization)}. {t("Not construction IRR; simplified cash taxation, full-load power and no financing.", "非建设 IRR；简化现金计税、满负荷电费、不含融资。")}</p>
    </section>

    <section id="ranking-table" className="border-t border-zinc-300 py-8">
      <h2 className={sectionTitle}>{t("Top 10 stocks: model-based research priority", "十股排序：模型研究优先级")}</h2>
      <p className="mb-5 text-sm leading-7 text-zinc-600">{t("Fixed publication-date ranking within the selected ten-company universe. Score includes subjective durability and risk; it is not an expected return. IRRs assume distribution of owner cash, not actual dividends. USD price per U.S.-listed share/ADS.", "出版日固定排序，仅针对选定十家公司。评分含主观持久性与风险，不是期望回报。IRR 假设分配股东现金，不是实际股息。价格单位为美股/ADS 美元。")}</p>
      <Table label={t("Ten-stock ranking", "十股排名")} headers={["#",t("Company", "公司"),t("Price Oct 2", "10 月 2 日价格"),t("Score", "评分"),t("Base 10Y IRR", "基准十年 IRR"),t("Base 20Y IRR", "基准二十年 IRR"),t("Bear 10Y IRR", "悲观十年 IRR"),t("12% entry - 20Y", "12% 买价：二十年")]} rows={ranked.map(({company:c,ten,twenty,bear,score},i) => [i+1,<a key={c.ticker} href={`#candidate-${c.ticker}`} className="font-semibold underline">{c.ticker}</a>,`$${fmt(c.price,2)}`,fmt(score),pct(ten.irr),pct(twenty.irr),pct(bear.irr),`$${fmt(twenty.entryPrice,2)}`])} />
      <figure className="my-7 max-w-3xl"><figcaption className="mb-4 font-semibold">{t("Base 20-year distribution-capacity IRR", "基准二十年分配能力 IRR")}</figcaption>{ranked.map(({company:c,twenty}) => <div key={c.ticker} className="mb-2 grid grid-cols-[60px_minmax(0,1fr)_65px] items-center gap-3 text-sm"><span>{c.ticker}</span><div className="h-3 bg-zinc-100"><div className={`h-3 ${twenty.irr! < 0 ? "bg-rose-600" : "bg-emerald-700"}`} style={{width:`${Math.max(1,Math.abs(twenty.irr ?? 0)/Math.max(...ranked.map(r=>Math.abs(r.twenty.irr ?? 0)),.01)*100)}%`}} /></div><span className="text-right tabular-nums">{pct(twenty.irr)}</span></div>)}</figure>
      <div className="grid gap-x-8 sm:grid-cols-2">{ranked.map(({company:c},i) => <article id={`candidate-${c.ticker}`} key={c.ticker} className="border-t border-zinc-200 py-6"><h3 className="text-lg font-semibold">{i+1}. {c.name} ({c.ticker})</h3><p className="mt-1 text-xs text-emerald-800">{zh ? c.layerZh : c.layer}</p><p className="mt-3 text-sm leading-7">{zh ? c.thesisZh : c.thesis}</p><p className="mt-3 text-sm leading-7 text-zinc-600"><strong>{t("Invalidation:", "失效条件：")}</strong> {zh ? c.failureZh : c.failure}</p><p className="mt-3 text-xs">{sl(c.source)}</p></article>)}</div>
    </section>

    <section id="forecasts" className="border-t border-zinc-300 py-8">
      <h2 className={sectionTitle}>{t("Annual financial forecasts and valuation", "年度财务预测与估值")}</h2>
      <div className="grid gap-4 border-y border-zinc-200 py-5 sm:grid-cols-2 lg:grid-cols-4">
        <label className="text-sm">{t("Company", "公司")}<select className={field} value={ticker} onChange={(e) => { setTicker(e.target.value); setPrice(String(COMPANIES.find(c=>c.ticker===e.target.value)!.price)); }}>{COMPANIES.map(c=><option key={c.ticker} value={c.ticker}>{c.ticker} - {c.name}</option>)}</select></label>
        <label className="text-sm">{t("Scenario", "情景")}<select className={field} value={scenario} onChange={e=>setScenario(e.target.value as Scenario)}>{CASES.map(s=><option key={s} value={s}>{labels[s]}</option>)}</select></label>
        <label className="text-sm">{t("Horizon", "期限")}<select className={field} value={horizon} onChange={e=>setHorizon(Number(e.target.value) as 10|20)}><option value={10}>{t("10 years", "十年")}</option><option value={20}>{t("20 years", "二十年")}</option></select></label>
        <label className="text-sm">{t("Entry price USD", "买入价 美元")}<input type="number" min="0.01" step="0.01" className={field} value={price} aria-invalid={!validPrice} onChange={e=>setPrice(e.target.value)} /></label>
      </div>
      {!validPrice && <p role="alert" className="mt-3 text-sm text-rose-700">{t("Enter a positive price. Until then, outputs use the publication price.", "请输入正数价格；目前按出版日价格计算。")}</p>}
      <dl aria-live="polite" className="grid grid-cols-2 gap-5 py-6 lg:grid-cols-4">{[[t("Model IRR", "模型 IRR"),pct(result.irr)],[t("12% hurdle price", "12% 门槛价格"),`$${fmt(result.entryPrice,2)}`],[t("Terminal share of PV", "终值占现值"),pct(result.terminalShare)],[t("Deficit financing at maturity $B", "期末缺口融资 十亿美元"),fmt(result.funding)]].map(([k,v])=><div key={k}><dt className="text-xs leading-5 text-zinc-500">{k}</dt><dd className="mt-2 text-xl font-semibold">{v}</dd></div>)}</dl>
      <p className="mb-5 text-sm leading-7 text-zinc-600">{t("USD billions. All rows below are research forecasts, not reported results or company guidance. Relative years, fixed share count, 8% deficit funding, no non-operating investment bridge. Operating profit includes stock compensation. Capex and depreciation are independently assumed; the model is not a detailed asset roll-forward.", "单位十亿美元。下表全部为研究预测，不是历史业绩或公司指引。相对年份、固定股数、缺口按 8% 融资，不另加非经营投资。营业利润包含股权薪酬。资本开支与折旧独立假设，非完整资产滚动表。")}</p>
      <Table label={t("Annual modeled financials", "年度模型财务")} headers={[t("Year", "年"),t("Growth", "增长"),t("Revenue", "收入"),"EBIT",t("Margin", "利润率"),t("Interest", "利息"),t("Tax", "税"),t("Net income*", "净利润*"),"D&A",t("Capex", "资本开支"),t("ΔNWC", "新增营运资本"),t("Preferred", "优先股"),t("Owner cash", "股东现金")]} rows={result.rows.map(r=>[r.year,pct(r.growth),fmt(r.revenue),fmt(r.ebit),pct(r.margin),fmt(r.interest),fmt(r.tax),fmt(r.netIncome),fmt(r.depreciation),fmt(r.capex),fmt(r.workingCapital),fmt(r.preferred),fmt(r.ownerCash)])} />
      <p className="mt-3 text-xs text-zinc-500">{t("*Operating-based modeled net income before preferred reserve; excludes non-operating gains. Terminal value uses the following year's owner cash, not an additional paid year.", "*经营口径模型净利润，尚未扣优先股准备，不含非经营收益。终值基于下一年股东现金，不重复分配下一年现金。")}</p>
      <h3 className="mb-3 mt-8 text-xl font-semibold">{t("Scenario comparison", "情景比较")}</h3>
      <Table label={t("Scenario return comparison", "情景回报比较")} headers={[t("Case", "情景"),t("10Y IRR", "十年 IRR"),t("20Y IRR", "二十年 IRR"),t("20Y hurdle price", "二十年门槛价格"),t("Growth shift", "增长变化"),t("Margin shift", "利润率变化"),t("Capex shift", "开支变化"),t("Exit multiplier", "退出倍数系数"),t("Terminal retention", "终值保留")]} rows={CASES.map(s=>{const v=valuation(company,s,20,validPrice?Number(price):company.price);const inp=CASE_INPUTS[s];return [labels[s],pct(valuation(company,s,10,validPrice?Number(price):company.price).irr),pct(v.irr),`$${fmt(v.entryPrice,2)}`,pct(inp.growthShift),pct(inp.marginShift),pct(inp.capexShift),`${fmt(inp.multipleScale,2)}x`,pct(inp.terminalRetention)];})} />
      <h3 className="mb-3 mt-8 text-xl font-semibold">{t("Base assumptions for all candidates", "全部候选的基准假设")}</h3>
      <Table label={t("Forecast assumptions", "预测假设")} headers={[t("Ticker", "代码"),t("Revenue baseline $B", "收入起点 十亿美元"),t("Basis", "口径"),t("Growth Y1-5 / 6-10 / 11-20", "增长 1-5 / 6-10 / 11-20 年"),t("EBIT margin start → Y10", "利润率 起点 → 第十年"),t("Capex start → Y10", "资本强度 起点 → 第十年"),t("D&A start → Y10", "折旧占比 起点 → 第十年"),t("Tax", "税率"),t("NWC / Δsales", "营运资本/新增收入"),t("Exit owner-cash multiple", "退出现金倍数"),t("Durability / risk", "持久性 / 风险")]} rows={COMPANIES.map(c=>[c.ticker,fmt(c.revenue),c.baseline,c.growth.map(pct).join(" / "),c.margin.map(pct).join(" → "),c.capex.map(pct).join(" → "),c.da.map(pct).join(" → "),pct(c.tax),pct(c.workingCapital),`${c.terminalMultiple}x`,`${c.durability} / ${c.risk}`])} />
      <h3 className="mb-3 mt-8 text-xl font-semibold">{t("Market capitalization and remaining model inputs", "市值与其他模型输入")}</h3>
      <Table label={t("Capitalization and financing assumptions", "市值与融资假设")} headers={[t("Ticker", "代码"),t("Price USD", "价格 美元"),t("Equity value $B", "普通股市值 十亿美元"),t("Quote-equivalent shares B", "报价等效股数 十亿"),t("Year-one interest $B", "第一年利息 十亿美元"),t("Annual preferred reserve $B", "年度优先股准备 十亿美元")]} rows={COMPANIES.map(c=>[c.ticker,fmt(c.price,2),fmt(c.equityValue,3),fmt(c.equityValue/c.price,4),fmt(c.interest,3),fmt(c.preferred,3)])} />
      <p className="mt-3 text-sm leading-7 text-zinc-600">{t("Interest grows 2% annually; debt principal is assumed refinanced, not repaid as an additional terminal deduction. Deficits accumulate at 8%. Durability and risk scores are subjective. Revenue growth fades to mature single digits; margins reflect competition; capex stays above D&A for expanding cloud and foundry assets. Exit cash multiples of 20-25x imply normalized cash yields of 4-5%, not perpetuation of current peak earnings multiples. These inputs are research judgments, not consensus forecasts. ASML's USD baseline is EUR44B × 1.17; TSM's 5.1864B ADS-equivalent shares are not the number of ADS certificates actually issued.", "利息每年增长 2%；本金假设再融资，不在终值再重复扣还。缺口按 8% 累积。持久性和风险评分为主观判断。收入增速逐步降至成熟个位数，利润率考虑竞争，扩张中的云和代工资本支出仍高于折旧。20 至 25 倍退出现金对应正常化现金收益率 4% 至 5%，并非永久维持当前高峰盈利倍数。输入为研究判断，不是一致预期。ASML 美元起点为 440 亿欧元 × 1.17；TSM 的 51.864 亿 ADS 等效股数，不是实际发行的 ADS 凭证数量。")}</p>
      <h3 className="mb-3 mt-8 text-xl font-semibold">{t("Discount-rate sensitivity - selected case and horizon", "折现率敏感性：当前情景与期限")}</h3>
      <Table label={t("Discount-rate sensitivity", "折现率敏感性")} headers={[t("Hurdle", "门槛"),t("Entry price USD", "买入价 美元")]} rows={[.08,.10,.12,.15].map(rate=>[pct(rate),`$${fmt(valuation(company,scenario,horizon,company.price,rate).entryPrice,2)}`])} />
    </section>

    <section id="financials" className="border-t border-zinc-300 py-8">
      <h2 className={sectionTitle}>{t("Reported financial history and latest disclosures", "历史财务与最新披露")}</h2>
      <p className="mb-4 text-sm leading-7 text-zinc-600">{t("Quarterly revenue below comes from the latest reviewed issuer releases. The API appendix separately shows its own available period; MSFT, MU and foreign issuers have extraction lags. Never treat an older API period as the latest published result. ASML is EUR; other quarterly figures are USD billions.", "季度收入来自最新已审阅公告。API 附录另列自身可用期间，MSFT、MU 与海外公司存在提取滞后，不能把旧 API 期间当成最新披露。ASML 单位为十亿欧元，其余季度为十亿美元。")}</p>
      <Table label={t("Latest reviewed quarterly revenue", "最新审阅季度收入")} headers={[t("Company", "公司"),t("Period end", "期末"),t("Revenue billions", "收入 十亿"),t("Period / currency", "期间 / 币种"),t("Issuer source", "公司出处")]} rows={currentResults.map(r=>[r[0],r[1],fmt(r[2],3),r[3],sl(r[4])])} />
      <label className="mt-6 block max-w-sm text-sm">{t("SEC history company", "SEC 历史公司")}<select className={field} value={historyTicker} onChange={e=>setHistoryTicker(e.target.value)}>{FINANCIAL_HISTORY.map(c=><option key={c.ticker} value={c.ticker}>{c.ticker}</option>)}</select></label>
      <p className="my-4 text-sm leading-7 text-zinc-600">{t("Four most recent annual periods available in the selected standard XBRL tags as of the cutoff. Values in billions of each row's reported currency. N/A means unavailable in the extraction, not zero. Annual EPS and share counts are not compared across splits. Cash PP&E is not total capital commitments or lease principal.", "截点前所选标准 XBRL 标签可用的最近四个年度，单位为该行报告币种的十亿。N/A 表示提取未获得，不代表零。不跨拆股比较年度 EPS 与股数。现金固定资产投入不等于全部资本承诺或租赁本金。")}</p>
      <Table label={t("SEC annual financials", "SEC 年度财务")} headers={[t("End", "期末"),t("Currency", "币种"),t("Revenue", "收入"),"EBIT",t("Net income", "净利润"),"CFO",t("Cash PP&E", "现金固定资产"),t("SBC", "股权薪酬"),"D&A"]} rows={history.annual.map(r=>[r.end,r.revenue?.currency??"N/A",factCell(r.revenue),factCell(r.operatingIncome),factCell(r.netIncome),factCell(r.cfo),factCell(r.capex),factCell(r.sbc),factCell(r.depreciation)])} />
      {history.latestQuarter ? <><h3 className="mb-3 mt-6 text-lg font-semibold">{t("Latest quarter in standard-tag extract", "标准标签提取的最近季度")}: {history.latestQuarter.end}</h3><Table label={t("API quarter and YTD", "API 季度与年初至今")} headers={[t("Quarter revenue", "季度收入"),t("Quarter EBIT", "季度营业利润"),t("YTD CFO", "累计 CFO"),t("YTD cash PP&E", "累计固定资产"),t("YTD SBC", "累计股权薪酬"),t("YTD D&A", "累计折旧")]} rows={[[factCell(history.latestQuarter.revenue),factCell(history.latestQuarter.operatingIncome),factCell(history.latestQuarter.ytd.cfo),factCell(history.latestQuarter.ytd.capex),factCell(history.latestQuarter.ytd.sbc),factCell(history.latestQuarter.ytd.depreciation)]]} /></> : <p className="mt-4 text-sm text-zinc-600">{t("Quarterly facts are not available in these standard tags. Use the issuer release above and linked filings; do not invent a quarterly cash flow.", "这些标准标签未提供季度事实，请使用上方公告及下方申报，不编造季度现金流。")}</p>}
      <ul className="mt-5 space-y-2 text-sm">{history.filings.map(f=><li key={f.url}><a href={f.url} target="_blank" rel="noreferrer" className="underline">{history.ticker} {f.form} | {f.date} | {f.reportDate}</a></li>)}</ul>
    </section>

    <section id="sources" className="border-t border-zinc-300 py-8">
      <h2 className={sectionTitle}>{t("Sources, provenance and publication audit", "来源、溯源与出版核验")}</h2>
      <p className="mb-5 text-sm leading-7">{t("Primary reports and issuer disclosures were reviewed through October 4, 2026. Prices and vendor equity values are a frozen October 2 market-data snapshot, not a live feed; quote-equivalent share counts are derived from equity value / price. TSM equity value is independently calculated: 25.932B common shares / 5 × $472.78 = $2,452.0B approximately. ASML forecast conversion is a constant research assumption. Historical facts retain per-field currency, end date, filing date, tag and accession in the saved data.", "原始报告与公司披露审阅至 2026 年 10 月 4 日。价格与供应商市值冻结于 10 月 2 日，不是实时数据；报价等效股数按市值/价格推算。TSM 市值独立计算：259.32 亿普通股 / 5 × 472.78 美元，约 2.452 万亿美元。ASML 预测换汇为固定研究假设。保存的历史数据逐字段保留币种、期末、申报日期、标签与档案号。")}</p>
      <p className="mb-5 text-sm leading-7 text-zinc-600">{t("Coverage limits: four API annuals are not complete issuer histories; some standard tags omit acquisitions, leases or custom definitions. TSM's standard-tag series ends in 2024 despite more recent local disclosures. Earnings releases can precede XBRL filings. CEG and VST cash flows contain collateral and working-capital volatility. No sector-wide ROI statistic, current consensus forecast, precise twenty-year TAM or actual future TSR is claimed. Model ranking is not independently calibrated or backtested.", "覆盖局限：四个 API 年度不等于完整公司历史，标准标签可能遗漏并购、租赁或自定义口径。TSM 标准序列截至 2024 年，尽管已有更近期本地披露。财报公告可能早于 XBRL；CEG 与 VST 现金流有抵押品及营运资本波动。本文不声称实测行业 ROI、当前一致预期、精确二十年市场规模或真实未来股东收益；排序未经独立校准或回测。")}</p>
      <ol className="space-y-4">{SOURCES.map((s,i)=><li key={s.id} className="border-t border-zinc-200 pt-4"><a href={s.url} target="_blank" rel="noreferrer" className="text-sm font-medium underline">{i+1}. {s.title}</a><p className="mt-1 text-xs leading-6 text-zinc-600">{s.note}</p></li>)}</ol>
      <h3 className="mb-3 mt-8 text-lg font-semibold">{t("Dated quote reference links", "注明日期的报价参考")}</h3>
      <div className="flex flex-wrap gap-4 text-sm">{COMPANIES.map(c=><a key={c.ticker} href={`https://finance.yahoo.com/quote/${c.ticker}/history/`} target="_blank" rel="noreferrer" className="underline">{c.ticker}</a>)}</div>
      <p className="mt-6 text-sm leading-7 text-zinc-500">{t("Publication checks cover unit handling, ADS capitalization, cash-flow equations, terminal timing, price/discount sensitivities, ranking consistency and bilingual mirror parity. These checks verify implementation, not future investment outcomes.", "出版检查覆盖单位、ADS 市值、现金流公式、终值时间、价格和折现敏感性、排序一致与双语镜像；它们验证实现，不验证未来投资结果。")}</p>
    </section>
  </main>;
}
