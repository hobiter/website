import type { ReactNode } from "react";
import {
  BAIDU_ANNUAL_FINANCIALS,
  BAIDU_ANNUAL_FINANCIALS_SOURCE_NOTE,
} from "./annualFinancials";
import {
  BAIDU_ANNUAL_FILINGS,
  BAIDU_LATEST_ANNUAL_FILING,
  BAIDU_LATEST_SIX_K_FILING,
  BAIDU_SIX_K_FILINGS,
} from "./filings";
import {
  BAIDU_DCF_CASES,
  BAIDU_DCF_INPUTS,
  BAIDU_FORECAST_NOTE,
  BAIDU_FORECASTS,
  BAIDU_VALUATION_NOTE,
} from "./forecastModel";
import { BAIDU_Q2_2026 } from "./latestQuarter";
import {
  BAIDU_OPERATING_METRICS,
  BAIDU_OPERATING_METRICS_NOTE,
} from "./operatingMetrics";
import { BAIDU_PUBLICATION_QA_ITEMS } from "./publicationQa";
import { BAIDU_REPORT_SECTIONS } from "./reportContent";
import { BAIDU_REPORT_SECTIONS_ZH } from "./reportContentZh";
import { BAIDU_CHART_GROUPS, BAIDU_SOURCE_SYSTEMS } from "./researchPlan";
import {
  BAIDU_AUTONOMOUS_MOBILITY,
  BAIDU_SEGMENT_ECONOMICS,
} from "./segmentEconomics";
import {
  BAIDU_SOURCE_AUDIT_ITEMS,
  BAIDU_SOURCE_AUDIT_NOTE,
} from "./sourceAudit";
import {
  BAIDU_LATEST_VALUATION,
  BAIDU_VALUATION_HISTORY,
  BAIDU_VALUATION_HISTORY_NOTE,
} from "./valuationHistory";

type Language = "en" | "zh";

const copy = {
  en: {
    lang: "中文",
    href: "/research/baidu-complete-fundamental-analysis/zh",
    updated: "Updated September 24, 2026 · BIDU · RMB / USD per ADS",
    eyebrow: "Complete Fundamental Research Hub",
    title: "Baidu",
    subtitle:
      "A cash-rich search incumbent attempting to turn AI Cloud, applications and autonomous mobility into durable growth before legacy advertising erosion consumes the transition.",
    nav: [
      ["thesis", "Thesis"],
      ["latest", "Latest"],
      ["operations", "AI transition"],
      ["segments", "Business mix"],
      ["valuation", "Valuation"],
      ["forecast", "Forecast"],
      ["financials", "Financials"],
      ["filings", "Filings"],
      ["sources", "Sources"],
    ],
    section: {
      thesis: ["Investment memo", "The AI transition versus search erosion"],
      latest: ["Latest quarter", "Q2 2026 operating snapshot"],
      operations: [
        "AI transition",
        "Commercial traction across cloud, applications and AI marketing",
      ],
      segments: [
        "Business mix",
        "Reported revenue pools and autonomous mobility optionality",
      ],
      valuation: [
        "Scenario valuation",
        "Cash-rich equity with a difficult enterprise-value bridge",
      ],
      forecast: ["Ten-year model", "Explicit revenue and free-cash-flow paths"],
      financials: [
        "SEC financial database",
        "Eight years of reported financial history",
      ],
      filings: ["Primary documents", "Baidu SEC filing inventory"],
      sources: ["Research controls", "Sources, audit trail and publication QA"],
    },
    metric: [
      "Q2 2026 revenue",
      "AI-powered Business",
      "Cash + investments",
      "Reference ADS price",
    ],
    labels: {
      period: "Period",
      revenue: "Revenue",
      growth: "Growth",
      ai: "AI-powered business",
      cloud: "AI Cloud infrastructure",
      apps: "AI applications",
      marketing: "AI-native marketing",
      online: "Online marketing",
      mau: "Baidu App MAU",
      source: "Primary source",
      opIncome: "Operating income",
      netIncome: "Net income",
      ocf: "Operating cash flow",
      gross: "Gross profit",
      bear: "Bear",
      base: "Base",
      bull: "Bull",
      price: "ADS price",
      ev: "Enterprise value",
      ps: "P/S",
      evSales: "EV/Sales",
      pe: "P/E",
      yield: "FCF yield",
      year: "Year",
      fcf: "Free cash flow",
      annual: "Annual history",
      cash: "Cash + short-term investments",
      debt: "Debt",
      margin: "Operating margin",
      reports: "Annual reports",
      sixK: "Recent Form 6-K",
      reportDate: "Report date",
      filed: "Filed",
      audit: "Audit",
      qa: "Publication QA",
    },
    scenarioNote: "Hobite scenarios, not Baidu guidance.",
    disclaimer:
      "Research and education only, not personalized investment advice. China ADR, VIE, currency, regulation and market-price risks remain material.",
  },
  zh: {
    lang: "English",
    href: "/research/baidu-complete-fundamental-analysis",
    updated: "更新于 2026 年 9 月 24 日 · BIDU · 人民币 / 每 ADS 美元",
    eyebrow: "完整基本面研究中心",
    title: "百度",
    subtitle:
      "现金充裕的搜索龙头正尝试将 AI 云、AI 应用与自动驾驶转化为持久增长，并与传统广告业务的下滑赛跑。",
    nav: [
      ["thesis", "投资逻辑"],
      ["latest", "最新季度"],
      ["operations", "AI 转型"],
      ["segments", "业务结构"],
      ["valuation", "估值"],
      ["forecast", "预测"],
      ["financials", "财务"],
      ["filings", "文件"],
      ["sources", "来源"],
    ],
    section: {
      thesis: ["投资备忘录", "AI 转型与搜索广告下滑的竞赛"],
      latest: ["最新季度", "2026 年 Q2 运营概览"],
      operations: ["AI 转型", "云、应用与 AI 营销的商业化进展"],
      segments: ["业务结构", "收入池与自动驾驶可选性"],
      valuation: ["情景估值", "现金充裕，但企业价值桥接复杂"],
      forecast: ["十年模型", "明确的收入与自由现金流路径"],
      financials: ["SEC 财务数据库", "八年已披露财务历史"],
      filings: ["原始文件", "百度 SEC 文件清单"],
      sources: ["研究控制", "来源、审计轨迹与发布 QA"],
    },
    metric: ["2026 年 Q2 收入", "AI 驱动业务", "现金及投资", "ADS 参考价格"],
    labels: {
      period: "期间",
      revenue: "收入",
      growth: "增长",
      ai: "AI 驱动业务",
      cloud: "AI 云基础设施",
      apps: "AI 应用",
      marketing: "AI 原生营销",
      online: "在线营销",
      mau: "百度 App 月活",
      source: "原始来源",
      opIncome: "营业利润",
      netIncome: "净利润",
      ocf: "经营现金流",
      gross: "毛利润",
      bear: "悲观",
      base: "基准",
      bull: "乐观",
      price: "ADS 价格",
      ev: "企业价值",
      ps: "市销率",
      evSales: "企业价值/收入",
      pe: "市盈率",
      yield: "自由现金流收益率",
      year: "年份",
      fcf: "自由现金流",
      annual: "年度历史",
      cash: "现金与短期投资",
      debt: "债务",
      margin: "营业利润率",
      reports: "年度报告",
      sixK: "近期 Form 6-K",
      reportDate: "报告日期",
      filed: "提交日期",
      audit: "审计",
      qa: "发布 QA",
    },
    scenarioNote: "所有情景均为 Hobite 假设，并非百度指引。",
    disclaimer:
      "本页仅用于研究与教育，不构成个性化投资建议。中国 ADR、VIE、汇率、监管及市场价格风险仍然重大。",
  },
} as const;

const rmb = (value: number | null, digits = 1) =>
  value == null ? "-" : `RMB ${(value / 1_000_000_000).toFixed(digits)}B`;
const usd = (value: number | null) =>
  value == null ? "-" : `$${value.toFixed(2)}`;
const pct = (value: number | null, digits = 1) =>
  value == null ? "-" : `${value.toFixed(digits)}%`;
const multiple = (value: number | null) =>
  value == null ? "-" : `${value.toFixed(1)}x`;
const compact = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});
const th =
  "whitespace-nowrap border-b border-zinc-200 bg-zinc-100 px-3 py-2 text-left text-xs font-semibold text-zinc-600";
const td =
  "whitespace-nowrap border-b border-zinc-100 px-3 py-2 text-sm text-zinc-700";

function Section({
  id,
  eyebrow,
  title,
  note,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-zinc-200 py-10">
      <div className="mb-6 max-w-4xl">
        <p className="text-xs font-semibold uppercase text-sky-800">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-zinc-950 md:text-3xl">
          {title}
        </h2>
        {note ? (
          <p className="mt-3 text-sm leading-6 text-zinc-600">{note}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
function TableFrame({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto border border-zinc-200 bg-white">
      {children}
    </div>
  );
}
function Metric({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="border-l-2 border-sky-400 pl-4">
      <p className="text-xs text-zinc-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs text-zinc-400">{detail}</p>
    </div>
  );
}

export function BaiduResearchView({ language }: { language: Language }) {
  const t = copy[language];
  const labels = t.labels;
  const reports =
    language === "zh" ? BAIDU_REPORT_SECTIONS_ZH : BAIDU_REPORT_SECTIONS;
  const latestMetric = BAIDU_OPERATING_METRICS.at(-1)!;
  const dcfCases = Object.values(BAIDU_DCF_CASES);
  const maxRevenue = Math.max(
    ...BAIDU_ANNUAL_FINANCIALS.map((row) => row.revenue ?? 0),
  );
  const localized =
    language === "zh"
      ? {
          latest:
            "百度 2026 年 Q2 业绩，除特别说明外均为人民币；增长率均为同比。",
          operations:
            "百度定义的运营分类并非全部属于经审计分部。2025 年 Q2 分类数据根据 2026 年 Q2 披露的增长率还原，并经过四舍五入。",
          valuation:
            "DCF 将已披露的现金及投资减去估算债务后视为非经营性价值。资产流动性、离岸可调配性及战略投资的公允价值可能与账面现金不同。",
          history:
            "历史估值结合接近年末的 ADS 复权收盘价、SEC 财务数据、年报归一化 ADS 数量及年末汇率。由于 XBRL 未提供一致的稀释 ADS 历史，ADS 数量为约数。",
          forecast:
            "Hobite 2026-2035 财年情景均为假设，并非百度指引。模型考察搜索下滑、AI 云与应用增长，以及基础设施投入转化为自由现金流的能力。",
          annual:
            "2018-2025 财年数据来自 SEC XBRL company facts 与百度 Form 20-F，货币单位为人民币；每份 BIDU ADS 代表 8 股 A 类普通股。",
          audit:
            "采用原始来源优先的审计方法；估算值、还原值与市场数据输入均和已披露业绩分开标注。",
          aiDetail: "占百度核心业务收入的 50%",
          cashDetail: "2026 年 Q2 已披露余额",
        }
      : {
          latest: BAIDU_Q2_2026.note,
          operations: BAIDU_OPERATING_METRICS_NOTE,
          valuation: BAIDU_VALUATION_NOTE,
          history: BAIDU_VALUATION_HISTORY_NOTE,
          forecast: BAIDU_FORECAST_NOTE,
          annual: BAIDU_ANNUAL_FINANCIALS_SOURCE_NOTE,
          audit: BAIDU_SOURCE_AUDIT_NOTE,
          aiDetail: "50% of Baidu General Business",
          cashDetail: "Q2 2026 reported balance",
        };
  const segmentNames =
    language === "zh"
      ? ["百度核心业务", "爱奇艺", "在线营销服务", "AI 驱动业务"]
      : BAIDU_SEGMENT_ECONOMICS.map((item) => item.label);
  const segmentNotes =
    language === "zh"
      ? [
          "搜索、AI 云、AI 应用与自动驾驶。",
          "纳入合并业绩的在线娱乐收入。",
          "传统变现引擎正面对流量与广告主迁移。",
          "包括 AI 云基础设施、AI 应用与 AI 原生营销。",
        ]
      : BAIDU_SEGMENT_ECONOMICS.map((item) => item.note);
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="border-b border-sky-900 bg-zinc-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
            <a href="/research" className="font-medium text-sky-400">
              Hobite Research
            </a>
            <div className="flex items-center gap-4">
              <span>{t.updated}</span>
              <a
                href={t.href}
                className="border border-zinc-700 px-3 py-1 text-white"
              >
                {t.lang}
              </a>
            </div>
          </div>
          <p className="mt-8 text-xs font-semibold uppercase text-sky-400">
            {t.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-semibold md:text-6xl">{t.title}</h1>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-zinc-300">
            {t.subtitle}
          </p>
          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Metric
              label={t.metric[0]}
              value={rmb(BAIDU_Q2_2026.revenue)}
              detail={`${pct(BAIDU_Q2_2026.revenueGrowth, 0)} YoY · ${pct(BAIDU_Q2_2026.operatingMargin)} op. margin`}
            />
            <Metric
              label={t.metric[1]}
              value={rmb(latestMetric.aiPoweredBusiness)}
              detail={localized.aiDetail}
            />
            <Metric
              label={t.metric[2]}
              value={rmb(BAIDU_Q2_2026.cashAndInvestments, 0)}
              detail={localized.cashDetail}
            />
            <Metric
              label={t.metric[3]}
              value={usd(BAIDU_DCF_INPUTS.referencePrice)}
              detail={`${multiple(BAIDU_LATEST_VALUATION.priceToSales)} FY2026E P/S`}
            />
          </div>
        </div>
      </header>
      <nav className="sticky top-0 z-10 overflow-x-auto border-b border-zinc-200 bg-white/95 px-5 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-6 py-3 text-xs font-medium text-zinc-600">
          {t.nav.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="whitespace-nowrap hover:text-sky-800"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Section
          id="thesis"
          eyebrow={t.section.thesis[0]}
          title={t.section.thesis[1]}
        >
          <div className="grid gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-2">
            {reports.map((item) => (
              <article key={item.title} className="bg-white p-5">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-700">
                  {item.thesis}
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-600">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="border-l border-zinc-300 pl-3">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>
        <Section
          id="latest"
          eyebrow={t.section.latest[0]}
          title={t.section.latest[1]}
          note={localized.latest}
        >
          <div className="grid gap-px border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [labels.gross, rmb(BAIDU_Q2_2026.grossProfit)],
              [labels.opIncome, rmb(BAIDU_Q2_2026.operatingIncome)],
              [labels.netIncome, rmb(BAIDU_Q2_2026.netIncome)],
              [labels.ocf, rmb(BAIDU_Q2_2026.operatingCashFlow)],
            ].map(([label, value]) => (
              <div key={label} className="bg-white p-4">
                <p className="text-xs text-zinc-500">{label}</p>
                <p className="mt-1 text-xl font-semibold">{value}</p>
              </div>
            ))}
          </div>
          <a
            href={BAIDU_Q2_2026.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-xs underline"
          >
            {labels.source}
          </a>
        </Section>
        <Section
          id="operations"
          eyebrow={t.section.operations[0]}
          title={t.section.operations[1]}
          note={localized.operations}
        >
          <TableFrame>
            <table className="w-full min-w-[980px] border-collapse">
              <thead>
                <tr>
                  {[
                    labels.period,
                    labels.ai,
                    labels.cloud,
                    labels.apps,
                    labels.marketing,
                    labels.online,
                    labels.mau,
                  ].map((label) => (
                    <th key={label} className={th}>
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BAIDU_OPERATING_METRICS.map((row) => (
                  <tr key={row.period}>
                    <td className={`${td} font-medium`}>
                      <a
                        href={row.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                      >
                        {row.period}
                      </a>
                    </td>
                    <td className={td}>{rmb(row.aiPoweredBusiness)}</td>
                    <td className={td}>{rmb(row.aiCloudInfrastructure)}</td>
                    <td className={td}>{rmb(row.aiApplications)}</td>
                    <td className={td}>{rmb(row.aiNativeMarketing)}</td>
                    <td className={td}>{rmb(row.onlineMarketing)}</td>
                    <td className={td}>
                      {row.baiduAppMau ? compact.format(row.baiduAppMau) : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableFrame>
        </Section>
        <Section
          id="segments"
          eyebrow={t.section.segments[0]}
          title={t.section.segments[1]}
        >
          <div className="grid gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-2">
            {BAIDU_SEGMENT_ECONOMICS.map((item, index) => (
              <article key={item.label} className="bg-white p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{segmentNames[index]}</h3>
                    <p className="mt-1 text-2xl font-semibold">
                      {rmb(item.value)}
                    </p>
                  </div>
                  <span
                    className={
                      item.growth >= 0 ? "text-emerald-700" : "text-rose-700"
                    }
                  >
                    {pct(item.growth, 0)}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  {segmentNotes[index]}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-6 border-l-2 border-sky-500 bg-sky-50 p-5">
            <p className="text-xs font-semibold uppercase text-sky-900">
              Apollo Go
            </p>
            <p className="mt-2 text-2xl font-semibold">
              {BAIDU_AUTONOMOUS_MOBILITY.cities}{" "}
              {language === "zh" ? "个城市" : "cities"} ·{" "}
              {compact.format(BAIDU_AUTONOMOUS_MOBILITY.autonomousKilometers)}{" "}
              km
            </p>
            <p className="mt-2 text-sm text-zinc-600">
              {language === "zh"
                ? "萝卜快跑运营指标来自 2026 年 Q2 业绩披露；这些是采用度指标，并非独立收入指引。"
                : BAIDU_AUTONOMOUS_MOBILITY.note}
            </p>
          </div>
        </Section>
        <Section
          id="valuation"
          eyebrow={t.section.valuation[0]}
          title={t.section.valuation[1]}
          note={localized.valuation}
        >
          <div className="grid gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-3">
            {dcfCases.map((item, index) => (
              <article key={item.label} className="bg-white p-5">
                <div className="flex justify-between">
                  <h3 className="font-semibold">
                    {[labels.bear, labels.base, labels.bull][index]}
                  </h3>
                  <span
                    className={
                      item.upsideToReferencePrice >= 0
                        ? "text-emerald-700"
                        : "text-rose-700"
                    }
                  >
                    {pct(item.upsideToReferencePrice)}
                  </span>
                </div>
                <p className="mt-5 text-4xl font-semibold">
                  ${item.valuePerAdsUsd.toFixed(0)}
                </p>
                <p className="mt-3 text-xs text-zinc-500">
                  {pct(item.discountRate)} discount · {pct(item.terminalGrowth)}{" "}
                  terminal growth
                </p>
              </article>
            ))}
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            {t.scenarioNote} Reference: {usd(BAIDU_DCF_INPUTS.referencePrice)}{" "}
            on {BAIDU_DCF_INPUTS.referencePriceDate}.
          </p>
          <p className="mt-8 text-sm text-zinc-600">{localized.history}</p>
          <TableFrame>
            <table className="mt-4 w-full min-w-[900px] border-collapse">
              <thead>
                <tr>
                  {[
                    labels.year,
                    labels.price,
                    labels.ev,
                    labels.ps,
                    labels.evSales,
                    labels.pe,
                    labels.yield,
                  ].map((label) => (
                    <th key={label} className={th}>
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BAIDU_VALUATION_HISTORY.map((row) => (
                  <tr key={row.fiscalYear}>
                    <td className={td}>{row.fiscalYear}</td>
                    <td className={td}>{usd(row.adjustedCloseUsd)}</td>
                    <td className={td}>{rmb(row.enterpriseValueRmb, 0)}</td>
                    <td className={td}>{multiple(row.priceToSales)}</td>
                    <td className={td}>
                      {multiple(row.enterpriseValueToSales)}
                    </td>
                    <td className={td}>{multiple(row.priceToEarnings)}</td>
                    <td className={td}>{pct(row.freeCashFlowYield)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableFrame>
        </Section>
        <Section
          id="forecast"
          eyebrow={t.section.forecast[0]}
          title={t.section.forecast[1]}
          note={localized.forecast}
        >
          <TableFrame>
            <table className="w-full min-w-[860px] border-collapse">
              <thead>
                <tr>
                  <th className={th}>{labels.year}</th>
                  {[labels.bear, labels.base, labels.bull].map((label) => (
                    <th key={label} className={th}>
                      {label}: {labels.revenue} / {labels.growth} / {labels.fcf}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BAIDU_FORECASTS.base.map((base, index) => (
                  <tr key={base.year}>
                    <td className={`${td} font-medium`}>{base.year}</td>
                    {(["bear", "base", "bull"] as const).map((scenario) => {
                      const row = BAIDU_FORECASTS[scenario][index]!;
                      return (
                        <td key={scenario} className={td}>
                          {rmb(row.revenue)}{" "}
                          <span className="text-zinc-400">
                            / {pct(row.revenueGrowth)} / {rmb(row.freeCashFlow)}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </TableFrame>
        </Section>
        <Section
          id="financials"
          eyebrow={t.section.financials[0]}
          title={t.section.financials[1]}
          note={localized.annual}
        >
          <div className="grid gap-2">
            {BAIDU_ANNUAL_FINANCIALS.map((row) => (
              <div
                key={row.fiscalYear}
                className="grid grid-cols-[52px_1fr_96px] items-center gap-3 text-xs"
              >
                <span>FY{row.fiscalYear}</span>
                <div className="h-3 bg-zinc-200">
                  <div
                    className="h-full bg-sky-700"
                    style={{
                      width: `${((row.revenue ?? 0) / maxRevenue) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-right">{rmb(row.revenue, 0)}</span>
              </div>
            ))}
          </div>
          <h3 className="mt-8 text-lg font-semibold">{labels.annual}</h3>
          <TableFrame>
            <table className="mt-4 w-full min-w-[1120px] border-collapse">
              <thead>
                <tr>
                  {[
                    labels.year,
                    labels.revenue,
                    labels.gross,
                    labels.opIncome,
                    labels.netIncome,
                    labels.ocf,
                    labels.fcf,
                    labels.cash,
                    labels.debt,
                    labels.margin,
                  ].map((label) => (
                    <th key={label} className={th}>
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BAIDU_ANNUAL_FINANCIALS.map((row) => (
                  <tr key={row.fiscalYear}>
                    <td className={`${td} font-medium`}>
                      <a
                        href={row.filingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                      >
                        {row.fiscalYear}
                      </a>
                    </td>
                    <td className={td}>{rmb(row.revenue)}</td>
                    <td className={td}>{rmb(row.grossProfit)}</td>
                    <td className={td}>{rmb(row.operatingIncome)}</td>
                    <td className={td}>{rmb(row.netIncome)}</td>
                    <td className={td}>{rmb(row.operatingCashFlow)}</td>
                    <td className={td}>{rmb(row.freeCashFlow)}</td>
                    <td className={td}>
                      {rmb((row.cash ?? 0) + (row.shortTermInvestments ?? 0))}
                    </td>
                    <td className={td}>{rmb(row.totalDebt)}</td>
                    <td className={td}>{pct(row.operatingMargin)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableFrame>
        </Section>
        <Section
          id="filings"
          eyebrow={t.section.filings[0]}
          title={t.section.filings[1]}
        >
          <div className="grid gap-5 lg:grid-cols-2">
            {[
              { title: labels.reports, rows: BAIDU_ANNUAL_FILINGS },
              { title: labels.sixK, rows: BAIDU_SIX_K_FILINGS.slice(-12) },
            ].map((group) => (
              <div key={group.title}>
                <h3 className="mb-3 text-lg font-semibold">{group.title}</h3>
                <TableFrame>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={th}>Form</th>
                        <th className={th}>{labels.reportDate}</th>
                        <th className={th}>{labels.filed}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.rows.map((filing) => (
                        <tr key={filing.accessionNumber}>
                          <td className={td}>
                            <a
                              href={filing.url}
                              target="_blank"
                              rel="noreferrer"
                              className="font-medium underline"
                            >
                              {filing.form}
                            </a>
                          </td>
                          <td className={td}>{filing.reportDate || "-"}</td>
                          <td className={td}>{filing.filingDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TableFrame>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            Latest 20-F: {BAIDU_LATEST_ANNUAL_FILING.filingDate}. Latest 6-K:{" "}
            {BAIDU_LATEST_SIX_K_FILING.filingDate}.
          </p>
        </Section>
        <Section
          id="sources"
          eyebrow={t.section.sources[0]}
          title={t.section.sources[1]}
          note={localized.audit}
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg font-semibold">{labels.source}</h3>
              <div className="divide-y divide-zinc-200 border border-zinc-200 bg-white">
                {BAIDU_SOURCE_SYSTEMS.map((source) => (
                  <a
                    key={source.name}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block p-4 hover:bg-zinc-50"
                  >
                    <p className="text-sm font-semibold">{source.name}</p>
                    <p className="mt-1 text-xs leading-5 text-zinc-500">
                      {source.use}
                    </p>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-semibold">{labels.audit}</h3>
              <div className="divide-y divide-zinc-200 border border-zinc-200 bg-white">
                {BAIDU_SOURCE_AUDIT_ITEMS.map((item) => (
                  <a
                    key={item.area}
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block p-4"
                  >
                    <div className="flex justify-between gap-4">
                      <p className="text-sm font-semibold">{item.area}</p>
                      <span className="text-xs font-medium uppercase text-emerald-700">
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-zinc-500">
                      {item.coverage}. {item.note}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <h3 className="mt-8 text-lg font-semibold">{labels.qa}</h3>
          <div className="mt-4 grid gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-2">
            {BAIDU_PUBLICATION_QA_ITEMS.map((item) => (
              <div key={item.check} className="bg-white p-4">
                <div className="flex justify-between gap-4">
                  <p className="text-sm font-semibold">{item.check}</p>
                  <span
                    className={
                      item.status === "pass"
                        ? "text-xs font-semibold uppercase text-emerald-700"
                        : "text-xs font-semibold uppercase text-amber-700"
                    }
                  >
                    {item.status}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-5 text-zinc-500">
                  {item.evidence}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 border-l-2 border-zinc-900 pl-4 text-xs leading-5 text-zinc-500">
            <p>
              {BAIDU_CHART_GROUPS.reduce(
                (sum, group) => sum + group.targetCount,
                0,
              )}{" "}
              analytical views across {BAIDU_CHART_GROUPS.length} groups.
            </p>
            <p className="mt-1">{t.disclaimer}</p>
          </div>
        </Section>
      </div>
    </main>
  );
}
