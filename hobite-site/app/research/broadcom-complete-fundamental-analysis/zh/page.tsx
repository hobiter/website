import type { Metadata } from "next";
import { BROADCOM_ANNUAL_FINANCIALS } from "../annualFinancials";
import { BROADCOM_CAPITAL_ECONOMICS, BROADCOM_LATEST_CAPITAL_ECONOMICS } from "../capitalEconomics";
import { BROADCOM_ANNUAL_FILINGS, BROADCOM_LATEST_ANNUAL_FILING, BROADCOM_LATEST_QUARTERLY_FILING, BROADCOM_QUARTERLY_FILINGS } from "../filings";
import { BROADCOM_DCF_CASES, BROADCOM_DCF_INPUTS, BROADCOM_FORECASTS } from "../forecastModel";
import { BROADCOM_Q3_2026, BROADCOM_Q4_2026_GUIDANCE } from "../latestQuarter";
import { BROADCOM_PUBLICATION_QA_ITEMS } from "../publicationQa";
import { BROADCOM_QUARTERLY_FINANCIALS } from "../quarterlyFinancials";
import { BROADCOM_REPORT_SECTIONS_ZH } from "../reportContentZh";
import { BROADCOM_CHART_GROUPS, BROADCOM_SOURCE_SYSTEMS } from "../researchPlan";
import { BROADCOM_LATEST_SEGMENT_METRIC, BROADCOM_SEGMENT_METRICS } from "../segmentMetrics";
import { BROADCOM_SOURCE_AUDIT_ITEMS } from "../sourceAudit";
import { BROADCOM_LATEST_VALUATION, BROADCOM_VALUATION_HISTORY } from "../valuationHistory";

export const metadata: Metadata = {
  title: "博通（AVGO）完整基本面研究中心",
  description: "基于 SEC 披露的博通财务历史、AI 半导体与 VMware 经济性、资本配置、估值及十年情景分析。",
};

const usd = (value: number | null, digits = 1) => value == null ? "-" : `$${(value / 1_000_000_000).toFixed(digits)}B`;
const pct = (value: number | null, digits = 1) => value == null ? "-" : `${value.toFixed(digits)}%`;
const multiple = (value: number | null, digits = 1) => value == null ? "-" : `${value.toFixed(digits)}x`;
const th = "whitespace-nowrap border-b border-zinc-200 bg-zinc-100 px-3 py-2 text-left text-xs font-semibold text-zinc-600";
const td = "whitespace-nowrap border-b border-zinc-100 px-3 py-2 text-sm text-zinc-700";

const SOURCE_LABELS = [
  ["SEC 公司申报索引", "博通当前 CIK 的申报文件清单。"],
  ["SEC 公司事实数据库", "基于 XBRL 的年度和季度财务报表。"],
  ["博通前身公司 10-K", "经审计的 FY2016-FY2017 可比历史数据。"],
  ["博通投资者关系", "最新业绩、指引、AI 收入和非 GAAP 指标。"],
  ["Yahoo Finance 图表 API", "拆股调整后的历史市场价格。"],
];

const AUDIT_LABELS = [
  ["申报文件清单", "完整", "注册文件、FY2018-FY2025 10-K 及近期 10-Q", "由博通当前 CIK 自动生成。"],
  ["年度财务", "完整", "FY2016-FY2025", "FY2016-FY2017 使用前身公司 CIK 的经审计可比报表。"],
  ["季度财务", "完整", "FY2024 Q1-FY2026 Q2 SEC 数据及 FY2026 Q3 业绩公告", "Q3 在 10-Q 提交前作为官方业绩公告桥接数据。"],
  ["分部与 AI 指标", "完整", "FY2023-FY2025 及 FY2026 Q1-Q3", "FY2025 AI 收入由季度披露加总并明确标注为约数。"],
  ["资本结构", "完整", "FY2023-FY2026 Q3 年初至今", "跟踪现金、债务、股权激励、股息、回购及收购形成的无形资产。"],
  ["预测与 DCF", "完整", "FY2026-FY2035", "公司 Q4 指引之后的前瞻数据均为 Hobite 假设。"],
  ["历史估值", "完整", "FY2020-FY2026", "价格和股数已按 2024 年 7 月十拆一进行调整。"],
];

const QA_LABELS = [
  ["主要来源覆盖", "SEC 文件支持 GAAP 历史；博通投资者关系资料支持 Q3、AI 与非 GAAP 披露。"],
  ["财年日历处理", "生成器按准确报告日期及博通 fy/fp 标签匹配事实；推算的 Q4 数据已明确标识。"],
  ["股票拆分标准化", "历史价格及摊薄股数已按 2024 年 7 月十拆一进行标准化。"],
  ["预测标识", "公司 Q4 指引与 Hobite FY2027-FY2035 假设已清楚分开。"],
  ["TypeScript 与生产构建", "SEC 数据再生成及 Next.js 16.2.4 生产构建通过，全部 39 个静态路由生成成功。"],
  ["响应式浏览器检查", "完整页面已通过桌面及 390 x 844 移动视口的视觉和可访问性树检查。"],
];

function Section({ id, eyebrow, title, note, children }: { id: string; eyebrow: string; title: string; note?: string; children: React.ReactNode }) {
  return <section id={id} className="border-t border-zinc-200 py-10"><div className="mb-6 max-w-4xl"><p className="text-xs font-semibold text-cyan-700">{eyebrow}</p><h2 className="mt-2 text-2xl font-semibold text-zinc-950 md:text-3xl">{title}</h2>{note ? <p className="mt-3 text-sm leading-6 text-zinc-600">{note}</p> : null}</div>{children}</section>;
}

function Metric({ label, value, detail, accent = "cyan" }: { label: string; value: string; detail: string; accent?: "cyan" | "amber" }) {
  return <div className={`border-l-2 pl-4 ${accent === "amber" ? "border-amber-400" : "border-cyan-400"}`}><p className="text-xs font-medium text-zinc-400">{label}</p><p className="mt-1 text-2xl font-semibold text-white">{value}</p><p className="mt-1 text-xs leading-5 text-zinc-400">{detail}</p></div>;
}

function TableFrame({ children }: { children: React.ReactNode }) {
  return <div className="overflow-x-auto border border-zinc-200 bg-white">{children}</div>;
}

export default function BroadcomChineseResearchPage() {
  const dcfCases = Object.values(BROADCOM_DCF_CASES);
  const annualMax = Math.max(...BROADCOM_ANNUAL_FINANCIALS.map((row) => row.revenue ?? 0));
  const aiShare = BROADCOM_Q3_2026.aiSemiconductorRevenue / BROADCOM_Q3_2026.semiconductorRevenue * 100;

  return <main className="min-h-screen bg-zinc-50 text-zinc-900">
    <header className="border-b border-zinc-800 bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400"><a href="/research" className="font-medium text-cyan-400 hover:text-cyan-300">Hobite 研究</a><div className="flex items-center gap-4"><span>更新于 2026 年 9 月 3 日 · AVGO · 美元</span><a href="/research/broadcom-complete-fundamental-analysis" className="border border-zinc-700 px-3 py-1 text-white hover:border-zinc-500">English</a></div></div>
        <p className="mt-8 text-xs font-semibold text-cyan-400">完整基本面研究中心</p>
        <h1 className="mt-3 max-w-5xl text-4xl font-semibold leading-tight md:text-6xl">博通</h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-zinc-300">定制 AI 加速器、以太网网络与基础设施软件巨头：在非凡增长、客户高度集中和几乎不给普通执行留下空间的估值之间进行权衡。</p>
        <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="FY2026 Q3 收入" value={usd(BROADCOM_Q3_2026.revenue)} detail={`同比增长 ${pct(BROADCOM_Q3_2026.revenueGrowth, 0)}`} />
          <Metric label="Q3 AI 半导体收入" value={usd(BROADCOM_Q3_2026.aiSemiconductorRevenue)} detail={`增长 ${pct(BROADCOM_Q3_2026.aiRevenueGrowth, 0)} · 占半导体收入 ${pct(aiShare, 0)}`} />
          <Metric label="Q3 自由现金流" value={usd(BROADCOM_Q3_2026.freeCashFlow)} detail={`利润率 ${pct(BROADCOM_Q3_2026.freeCashFlow / BROADCOM_Q3_2026.revenue * 100, 0)}`} />
          <Metric label="AVGO 参考价格" value={`$${BROADCOM_DCF_INPUTS.referencePrice.toFixed(2)}`} detail={`FY2026E EV/收入 ${multiple(BROADCOM_LATEST_VALUATION.enterpriseValueToSales)}`} accent="amber" />
        </div>
      </div>
    </header>

    <nav className="sticky top-0 z-10 overflow-x-auto border-b border-zinc-200 bg-white/95 px-5 backdrop-blur md:px-8"><div className="mx-auto flex max-w-7xl gap-6 py-3 text-xs font-medium text-zinc-600">{[["thesis","投资逻辑"],["latest","Q3 与指引"],["segments","分部与 AI"],["capital","资本结构"],["valuation","估值"],["forecast","预测"],["financials","财务数据"],["filings","申报文件"],["sources","来源"]].map(([id,label]) => <a key={id} href={`#${id}`} className="whitespace-nowrap hover:text-cyan-700">{label}</a>)}</div></nav>

    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <Section id="thesis" eyebrow="投资备忘录" title="世界级 AI 增长，清晰可见的估值风险">
        <div className="grid gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-2">{BROADCOM_REPORT_SECTIONS_ZH.map((section) => <article key={section.title} className="bg-white p-5"><h3 className="text-lg font-semibold text-zinc-950">{section.title}</h3><p className="mt-2 text-sm leading-6 text-zinc-700">{section.thesis}</p><ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-600">{section.bullets.map((bullet) => <li key={bullet} className="border-l border-zinc-300 pl-3">{bullet}</li>)}</ul></article>)}</div>
      </Section>

      <Section id="latest" eyebrow="最新经营进展" title="Q3 加速增长与 Q4 指引" note="FY2026 Q3 数据来自 9 月 2 日发布的官方业绩公告及 Form 8-K 附件。在季度 10-Q 提交前，本页将其与 SEC 季度数据库分开展示。">
        <div className="grid gap-px border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4">{[["GAAP 经营利润",usd(BROADCOM_Q3_2026.gaapOperatingIncome)],["非 GAAP 经营利润",usd(BROADCOM_Q3_2026.nonGaapOperatingIncome)],["GAAP 净利润",usd(BROADCOM_Q3_2026.gaapNetIncome)],["现金余额",usd(BROADCOM_Q3_2026.cash)]].map(([label,value]) => <div key={label} className="bg-white p-4"><p className="text-xs text-zinc-500">{label}</p><p className="mt-1 text-xl font-semibold">{value}</p></div>)}</div>
        <div className="mt-6 grid gap-5 border-l-2 border-amber-400 bg-amber-50 p-5 md:grid-cols-3"><div><p className="text-xs text-amber-800">Q4 收入指引</p><p className="mt-1 text-2xl font-semibold">{usd(BROADCOM_Q4_2026_GUIDANCE.revenue)}</p></div><div><p className="text-xs text-amber-800">Q4 AI 收入指引</p><p className="mt-1 text-2xl font-semibold">{usd(BROADCOM_Q4_2026_GUIDANCE.aiSemiconductorRevenue)}</p></div><div><p className="text-xs text-amber-800">非 GAAP 经营利润率</p><p className="mt-1 text-2xl font-semibold">{pct(BROADCOM_Q4_2026_GUIDANCE.nonGaapOperatingMargin, 0)}</p></div></div>
        <p className="mt-3 text-xs text-zinc-500">公司截至 2026 年 9 月 2 日的指引，实际结果可能存在重大差异。<a href={BROADCOM_Q4_2026_GUIDANCE.sourceUrl} target="_blank" rel="noreferrer" className="underline">官方公告</a></p>
      </Section>

      <Section id="segments" eyebrow="公司特定经济性" title="半导体、软件与 AI 收入" note="分部收入来自博通 SEC 文件及业绩公告。FY2025 AI 收入约 199 亿美元，由四个季度的 AI 披露加总得出；AI 收入包括定制加速器和 AI 网络，并属于半导体解决方案的一部分。">
        <TableFrame><table className="w-full min-w-[860px] border-collapse"><thead><tr>{["期间","半导体","基础设施软件","AI 半导体","半导体增速","软件增速","AI 增速"].map((label) => <th key={label} className={th}>{label}</th>)}</tr></thead><tbody>{BROADCOM_SEGMENT_METRICS.map((row) => <tr key={row.period}><td className={`${td} font-medium`}><a href={row.sourceUrl} target="_blank" rel="noreferrer" className="underline decoration-zinc-300">{row.period}</a></td><td className={td}>{usd(row.semiconductorRevenue)}</td><td className={td}>{usd(row.infrastructureSoftwareRevenue)}</td><td className={td}>{usd(row.aiSemiconductorRevenue)}</td><td className={td}>{pct(row.semiconductorGrowth)}</td><td className={td}>{pct(row.softwareGrowth)}</td><td className={td}>{pct(row.aiGrowth)}</td></tr>)}</tbody></table></TableFrame>
        <div className="mt-5 grid gap-4 sm:grid-cols-3"><div className="border-t-2 border-cyan-600 pt-3"><p className="text-xs text-zinc-500">最新半导体收入占比</p><p className="mt-1 text-xl font-semibold">{pct(BROADCOM_LATEST_SEGMENT_METRIC.semiconductorRevenue / BROADCOM_Q3_2026.revenue * 100, 0)}</p></div><div className="border-t-2 border-violet-600 pt-3"><p className="text-xs text-zinc-500">最新软件收入占比</p><p className="mt-1 text-xl font-semibold">{pct(BROADCOM_LATEST_SEGMENT_METRIC.infrastructureSoftwareRevenue / BROADCOM_Q3_2026.revenue * 100, 0)}</p></div><div className="border-t-2 border-amber-500 pt-3"><p className="text-xs text-zinc-500">AI 占半导体收入比例</p><p className="mt-1 text-xl font-semibold">{pct(aiShare, 0)}</p></div></div>
      </Section>

      <Section id="capital" eyebrow="资产负债表" title="VMware 杠杆、股份稀释与资本回报" note="博通的并购模式带来大量债务、无形资产摊销和股权激励。自由现金流强劲，但必须结合股份稀释、股息、回购和债务下降一起评估。">
        <TableFrame><table className="w-full min-w-[900px] border-collapse"><thead><tr>{["期间","现金","总债务","净债务","股权激励","股息","回购","商誉与无形资产"].map((label) => <th key={label} className={th}>{label}</th>)}</tr></thead><tbody>{BROADCOM_CAPITAL_ECONOMICS.map((row) => <tr key={row.period}><td className={`${td} font-medium`}><a href={row.sourceUrl} target="_blank" rel="noreferrer" className="underline decoration-zinc-300">{row.period}</a></td><td className={td}>{usd(row.cash)}</td><td className={td}>{usd(row.totalDebt)}</td><td className={td}>{usd(row.netDebt)}</td><td className={td}>{usd(row.stockBasedCompensation)}</td><td className={td}>{usd(row.dividendsPaid)}</td><td className={td}>{usd(row.repurchases)}</td><td className={td}>{usd(row.goodwillAndIntangibles)}</td></tr>)}</tbody></table></TableFrame>
        <p className="mt-3 text-xs text-zinc-500">FY2026 Q3 净债务：{usd(BROADCOM_LATEST_CAPITAL_ECONOMICS.netDebt)}。Q3 股权激励明细需等待 10-Q，因此暂时留空。</p>
      </Section>

      <Section id="valuation" eyebrow="情景估值" title="DCF 价值区间与高要求的市场价格" note="DCF 对 AI 收入持续性、客户集中度、自由现金流转化率及终值假设高度敏感。本模型不把管理层长期 AI 评论视为已承诺订单，因此应将结果视作情景区间，而非目标价。">
        <div className="grid gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-3">{dcfCases.map((item, index) => <article key={item.label} className="bg-white p-5"><div className="flex items-baseline justify-between gap-3"><h3 className="text-lg font-semibold">{["悲观","基础","乐观"][index]}</h3><span className={`text-sm font-semibold ${item.upsideToReferencePrice >= 0 ? "text-emerald-700" : "text-rose-700"}`}>{pct(item.upsideToReferencePrice)} 相对参考价</span></div><p className="mt-5 text-4xl font-semibold">${item.valuePerShare.toFixed(0)}</p><dl className="mt-5 space-y-2 text-sm text-zinc-600"><div className="flex justify-between"><dt>折现率</dt><dd>{pct(item.discountRate)}</dd></div><div className="flex justify-between"><dt>永续增长率</dt><dd>{pct(item.terminalGrowth)}</dd></div><div className="flex justify-between"><dt>预测 FCF 现值</dt><dd>{usd(item.pvFreeCashFlow,0)}</dd></div><div className="flex justify-between border-t border-zinc-200 pt-2"><dt>股权价值</dt><dd>{usd(item.equityValue,0)}</dd></div></dl></article>)}</div>
        <p className="mt-3 text-xs text-zinc-500">参考价格：${BROADCOM_DCF_INPUTS.referencePrice.toFixed(2)}（{BROADCOM_DCF_INPUTS.referencePriceDate}）。净债务：{usd(BROADCOM_DCF_INPUTS.netDebt)}。摊薄股数：{(BROADCOM_DCF_INPUTS.dilutedShares / 1_000_000_000).toFixed(3)}B。</p>
        <h3 className="mt-8 text-lg font-semibold">历史市场估值</h3><p className="mt-2 text-sm text-zinc-600">历史数据将接近博通财年末的 Yahoo Finance 拆股调整收盘价，与 SEC 财务数据及拆股调整后摊薄股数结合。FY2026 使用 2026 年 9 月 3 日市场快照、公司 Q4 收入指引和 Hobite 全年 FCF 估算。</p>
        <TableFrame><table className="mt-4 w-full min-w-[840px] border-collapse"><thead><tr>{["FY","股价","市值","企业价值","市销率","EV/收入","市盈率","FCF 收益率"].map((label) => <th key={label} className={th}>{label}</th>)}</tr></thead><tbody>{BROADCOM_VALUATION_HISTORY.map((row) => <tr key={row.fiscalYear}><td className={td}>{row.fiscalYear}</td><td className={td}>{row.adjustedClose == null ? "-" : `$${row.adjustedClose.toFixed(2)}`}</td><td className={td}>{usd(row.marketCapitalization,0)}</td><td className={td}>{usd(row.enterpriseValue,0)}</td><td className={td}>{multiple(row.priceToSales)}</td><td className={td}>{multiple(row.enterpriseValueToSales)}</td><td className={td}>{multiple(row.priceToEarnings)}</td><td className={td}>{pct(row.freeCashFlowYield)}</td></tr>)}</tbody></table></TableFrame>
      </Section>

      <Section id="forecast" eyebrow="十年模型" title="收入与自由现金流情景" note="Hobite 情景从 FY2026 估算开始，该估算参考已公布的 Q1-Q3 业绩及博通 9 月 2 日发布的 Q4 指引。FY2027-FY2035 均为假设，并非管理层指引。">
        <TableFrame><table className="w-full min-w-[820px] border-collapse"><thead><tr><th className={th}>年度</th>{(["bear","base","bull"] as const).map((scenario, index) => <th key={scenario} className={th}>{["悲观","基础","乐观"][index]}：收入 / 增速 / FCF</th>)}</tr></thead><tbody>{BROADCOM_FORECASTS.base.map((_,index) => <tr key={index}><td className={`${td} font-medium`}>{BROADCOM_FORECASTS.base[index].year}</td>{(["bear","base","bull"] as const).map((scenario) => { const row=BROADCOM_FORECASTS[scenario][index]; return <td key={scenario} className={td}>{usd(row.revenue)} <span className="text-zinc-400">/ {pct(row.revenueGrowth)} / {usd(row.freeCashFlow)}</span></td>; })}</tr>)}</tbody></table></TableFrame>
      </Section>

      <Section id="financials" eyebrow="SEC 财务数据库" title="年度与季度财务报表" note="FY2018-FY2025 来自博通 SEC XBRL 公司事实。FY2016-FY2017 为 Broadcom Limited FY2017 Form 10-K 中经审计的前身公司可比数据。博通使用截至最接近 10 月 31 日星期日的 52/53 周财年。">
        <h3 className="text-lg font-semibold">收入发展</h3><div className="mt-4 grid gap-2">{BROADCOM_ANNUAL_FINANCIALS.map((row) => <div key={row.fiscalYear} className="grid grid-cols-[48px_1fr_72px] items-center gap-3 text-xs"><span>FY{row.fiscalYear}</span><div className="h-3 bg-zinc-200"><div className="h-full bg-cyan-600" style={{width:`${((row.revenue ?? 0)/annualMax)*100}%`}} /></div><span className="text-right">{usd(row.revenue,0)}</span></div>)}</div>
        <h3 className="mt-8 text-lg font-semibold">年度历史</h3><TableFrame><table className="mt-4 w-full min-w-[1120px] border-collapse"><thead><tr>{["FY","收入","毛利润","经营利润","净利润","经营现金流","资本开支","自由现金流","现金","债务","毛利率","FCF 利润率"].map((label) => <th key={label} className={th}>{label}</th>)}</tr></thead><tbody>{BROADCOM_ANNUAL_FINANCIALS.map((row) => <tr key={row.fiscalYear}><td className={`${td} font-medium`}><a href={row.filingUrl} target="_blank" rel="noreferrer" className="underline decoration-zinc-300">{row.fiscalYear}</a></td><td className={td}>{usd(row.revenue)}</td><td className={td}>{usd(row.grossProfit)}</td><td className={td}>{usd(row.operatingIncome)}</td><td className={td}>{usd(row.netIncome)}</td><td className={td}>{usd(row.operatingCashFlow)}</td><td className={td}>{usd(row.capitalExpenditures)}</td><td className={td}>{usd(row.freeCashFlow)}</td><td className={td}>{usd(row.cash)}</td><td className={td}>{usd(row.longTermDebt)}</td><td className={td}>{pct(row.grossMargin)}</td><td className={td}>{pct(row.freeCashFlowMargin)}</td></tr>)}</tbody></table></TableFrame>
        <h3 className="mt-8 text-lg font-semibold">近期 SEC 季度数据</h3><p className="mt-2 text-sm text-zinc-600">近期季度数据按博通财年和财季标签从 SEC XBRL 公司事实生成。Q4 流量数据由 10-K 全年值减去 Q1-Q3 推算。</p><TableFrame><table className="mt-4 w-full min-w-[980px] border-collapse"><thead><tr>{["期间","收入","毛利润","经营利润","净利润","经营现金流","资本开支","自由现金流","毛利率","FCF 利润率"].map((label) => <th key={label} className={th}>{label}</th>)}</tr></thead><tbody>{BROADCOM_QUARTERLY_FINANCIALS.map((row) => <tr key={row.period}><td className={`${td} font-medium`}><a href={row.filingUrl} target="_blank" rel="noreferrer" className="underline decoration-zinc-300">{row.period}</a></td><td className={td}>{usd(row.revenue)}</td><td className={td}>{usd(row.grossProfit)}</td><td className={td}>{usd(row.operatingIncome)}</td><td className={td}>{usd(row.netIncome)}</td><td className={td}>{usd(row.operatingCashFlow)}</td><td className={td}>{usd(row.capitalExpenditures)}</td><td className={td}>{usd(row.freeCashFlow)}</td><td className={td}>{pct(row.grossMargin)}</td><td className={td}>{pct(row.freeCashFlowMargin)}</td></tr>)}</tbody></table></TableFrame>
      </Section>

      <Section id="filings" eyebrow="主要文件" title="SEC 申报文件索引">
        <div className="grid gap-5 lg:grid-cols-2">{[{title:"年度报告",rows:BROADCOM_ANNUAL_FILINGS},{title:"季度报告",rows:BROADCOM_QUARTERLY_FILINGS}].map((group) => <div key={group.title}><h3 className="mb-3 text-lg font-semibold">{group.title}</h3><TableFrame><table className="w-full border-collapse"><thead><tr><th className={th}>表格</th><th className={th}>报告日期</th><th className={th}>提交日期</th></tr></thead><tbody>{group.rows.map((filing) => <tr key={filing.accessionNumber}><td className={td}><a href={filing.url} target="_blank" rel="noreferrer" className="font-medium underline decoration-zinc-300">{filing.form}</a></td><td className={td}>{filing.reportDate || "-"}</td><td className={td}>{filing.filingDate}</td></tr>)}</tbody></table></TableFrame></div>)}</div><p className="mt-3 text-xs text-zinc-500">最新 10-K 提交于 {BROADCOM_LATEST_ANNUAL_FILING.filingDate}；最新 10-Q 提交于 {BROADCOM_LATEST_QUARTERLY_FILING.filingDate}。</p>
      </Section>

      <Section id="sources" eyebrow="研究控制" title="来源、覆盖范围与发布 QA" note="SEC 文件是 GAAP 历史数据的权威来源。博通公告提供 9 月 2 日 Q3 更新、指引、AI 收入和非 GAAP 指标。Yahoo Finance 仅用于市场价格背景。">
        <div className="grid gap-6 lg:grid-cols-2"><div><h3 className="mb-3 text-lg font-semibold">来源系统</h3><div className="divide-y divide-zinc-200 border border-zinc-200 bg-white">{BROADCOM_SOURCE_SYSTEMS.map((source, index) => <a key={source.name} href={source.url} target="_blank" rel="noreferrer" className="block p-4 hover:bg-zinc-50"><p className="text-sm font-semibold">{SOURCE_LABELS[index]?.[0] ?? source.name}</p><p className="mt-1 text-xs leading-5 text-zinc-500">{SOURCE_LABELS[index]?.[1] ?? source.use}</p></a>)}</div></div><div><h3 className="mb-3 text-lg font-semibold">来源审计</h3><div className="divide-y divide-zinc-200 border border-zinc-200 bg-white">{BROADCOM_SOURCE_AUDIT_ITEMS.map((item, index) => { const copy=AUDIT_LABELS[index]; return <a key={item.area} href={item.sourceUrl} target="_blank" rel="noreferrer" className="block p-4 hover:bg-zinc-50"><div className="flex justify-between gap-4"><p className="text-sm font-semibold">{copy?.[0] ?? item.area}</p><span className="text-xs font-medium text-emerald-700">{copy?.[1] ?? item.status}</span></div><p className="mt-1 text-xs leading-5 text-zinc-500">{copy?.[2] ?? item.coverage}。{copy?.[3] ?? item.note}</p></a>; })}</div></div></div>
        <h3 className="mt-8 text-lg font-semibold">发布 QA</h3><p className="mt-2 text-sm text-zinc-600">AVGO 完整基本面研究中心的发布质量记录。</p><div className="mt-4 grid gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-2">{BROADCOM_PUBLICATION_QA_ITEMS.map((item,index) => <div key={item.check} className="bg-white p-4"><div className="flex justify-between gap-4"><p className="text-sm font-semibold">{QA_LABELS[index]?.[0] ?? item.check}</p><span className={`text-xs font-semibold ${item.status === "pass" ? "text-emerald-700" : "text-amber-700"}`}>{item.status === "pass" ? "通过" : "注意"}</span></div><p className="mt-2 text-xs leading-5 text-zinc-500">{QA_LABELS[index]?.[1] ?? item.evidence}</p></div>)}</div>
        <div className="mt-8 border-l-2 border-zinc-900 pl-4 text-xs leading-5 text-zinc-500"><p>分析清单：{BROADCOM_CHART_GROUPS.reduce((sum,group) => sum+group.targetCount,0)} 个视图，分为 {BROADCOM_CHART_GROUPS.length} 组。</p><p className="mt-1">本页仅供研究和教育用途，不构成个性化投资建议。市场价格、公司指引和预测可能很快过时。</p></div>
      </Section>
    </div>
  </main>;
}
