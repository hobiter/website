import type { Metadata } from "next";
import {
  ALIBABA_ANNUAL_FINANCIALS,
  ALIBABA_ANNUAL_FINANCIALS_COVERAGE,
  ALIBABA_LATEST_ANNUAL_FINANCIAL,
} from "../annualFinancials";
import {
  ALIBABA_ANNUAL_FILINGS,
  ALIBABA_CORE_FILINGS,
  ALIBABA_LATEST_ANNUAL_FILING,
  ALIBABA_REGISTRATION_FILINGS,
  ALIBABA_SIX_K_FILINGS,
} from "../filings";
import { ALIBABA_DCF_CASES, ALIBABA_FORECASTS } from "../forecastModel";
import { ALIBABA_INTERIM_RESULTS, ALIBABA_RECENT_SIX_K_UPDATES } from "../interimResults";
import { ALIBABA_SEGMENT_METRICS } from "../segmentMetrics";
import { ALIBABA_SOURCE_AUDIT_ITEMS } from "../sourceAudit";
import { ALIBABA_PUBLICATION_QA_ITEMS } from "../publicationQa";
import { ALIBABA_LATEST_VALUATION_HISTORY, ALIBABA_VALUATION_HISTORY } from "../valuationHistory";

export const metadata: Metadata = {
  title: "阿里巴巴（BABA）完整基本面研究中心",
  description: "阿里巴巴 BABA 中文基本面研究页：20-F 财务、6-K 更新、分部经济、估值、DCF、来源审计与发布 QA。",
};

const REPORT_SECTIONS = [
  {
    title: "投资摘要",
    thesis:
      "阿里巴巴是一家规模巨大、现金资源充足的中国数字商业与云平台。核心问题是中国电商能否稳定，云与 AI 投资能否转化为可持续增长。",
    bullets: [
      "FY2026 收入达到 RMB1.024 万亿元，同比增长 3%。",
      "FY2026 经营利润率降至 4.9%，主要反映用户体验、即时零售、AI 与云基础设施投入。",
      "资产负债表仍是投资论点的重要部分：现金和投资为回购、股息和战略投入提供缓冲。",
    ],
  },
  {
    title: "最新 6-K 解读",
    thesis:
      "FY2026 的 6-K 业绩公告显示出清晰的取舍：云收入加速是真实亮点，但即时零售、Qwen 获客和云基础设施投入压低了短期利润和自由现金流。",
    bullets: [
      "2026 年 3 月季度收入 RMB2434 亿，同比增长 3%，云收入增速加快至 40%。",
      "2025 年 9 月季度和 2026 年 3 月季度自由现金流均为负。",
      "后续重点观察云增长持续性、调整后 EBITA 修复和资本开支正常化。",
    ],
  },
  {
    title: "业务模式",
    thesis: "阿里巴巴由中国电商、国际电商、云智能、物流/本地服务及其他数字业务组成。",
    bullets: [
      "中国电商仍是利润和现金流的核心来源。",
      "国际电商与云智能是最重要的增长向量。",
      "其他业务组合可能创造价值，但也提高了复杂度和资本配置难度。",
    ],
  },
  {
    title: "估值结论",
    thesis:
      "阿里巴巴相对全球平台型公司看起来不贵，但折价反映了中国宏观、监管、VIE/ADR 结构、资本配置和再投资强度等风险。",
    bullets: [
      "FY2026 年末简化口径 EV/Sales 约为 2.0x。",
      "FY2026 自由现金流转负，使 FCF yield 失真并成为核心监控项。",
      "DCF 对云增长、利润率修复和资本开支路径高度敏感。",
    ],
  },
  {
    title: "主要风险",
    thesis: "主要风险包括监管/政治风险、中国消费偏弱、竞争加剧、资本配置执行和 AI/云商业化不确定性。",
    bullets: [
      "作为 foreign private issuer，阿里巴巴的美国披露节奏不同于 10-Q 公司。",
      "VIE 与 ADR 结构需要长期治理折价。",
      "如果 AI 基础设施投入持续高企，自由现金流修复可能慢于基础情景。",
    ],
  },
];

function formatRmbBillions(value: number | null) {
  if (value == null) return "n/a";
  return `RMB${(value / 1_000_000_000).toFixed(1)}B`;
}

function formatRmbMillionsAsBillions(value: number | null) {
  if (value == null) return "n/a";
  return `RMB${(value / 1_000).toFixed(1)}B`;
}

function formatUsdBillions(value: number | null) {
  if (value == null) return "n/a";
  return `$${(value / 1_000_000_000).toFixed(1)}B`;
}

function formatPercent(value: number | null) {
  if (value == null) return "n/a";
  return `${value.toFixed(1)}%`;
}

function formatMultiple(value: number | null) {
  if (value == null) return "n/a";
  return `${value.toFixed(1)}x`;
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-zinc-950">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function MetricCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-zinc-950">{value}</p>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{note}</p>
    </div>
  );
}

export default function AlibabaChineseResearchPage() {
  const latestAnnualRows = [...ALIBABA_ANNUAL_FINANCIALS].reverse().slice(0, 8);
  const recentSixKs = [...ALIBABA_SIX_K_FILINGS].slice(-8).reverse();
  const latestSegments = ALIBABA_SEGMENT_METRICS.filter((row) => row.fiscalYear === 2026);

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-lg border border-zinc-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-zinc-500">中文研究页</p>
          <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-tight md:text-6xl">
            阿里巴巴（BABA）完整基本面研究中心
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-zinc-650">
            基于 SEC 20-F、Form 6-K、公司分部披露与市场价格数据，覆盖阿里巴巴的年度财务、阶段性经营更新、云与 AI 投资、估值历史、DCF 和来源审计。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/research/alibaba-complete-fundamental-analysis" className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700">
              English page
            </a>
            <a href="/research" className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700">
              Research library
            </a>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-4">
          <MetricCard label="覆盖范围" value={`${ALIBABA_CORE_FILINGS.length} filings`} note="包括注册文件、20-F 年报和 6-K 披露。" />
          <MetricCard label="年报数量" value={`${ALIBABA_ANNUAL_FILINGS.length}`} note={`最新年报：${ALIBABA_LATEST_ANNUAL_FILING.reportDate}，提交于 ${ALIBABA_LATEST_ANNUAL_FILING.filingDate}。`} />
          <MetricCard label="FY2026 收入" value={formatRmbBillions(ALIBABA_LATEST_ANNUAL_FINANCIAL.revenue)} note="阿里巴巴主要财务口径以人民币披露。" />
          <MetricCard label="FY2026 EV/Sales" value={formatMultiple(ALIBABA_LATEST_VALUATION_HISTORY.enterpriseValueToSales)} note="估值使用 BABA ADS 价格，1 ADS = 8 普通股。" />
        </div>

        <SectionCard title="中文投资报告">
          <div className="grid gap-4 lg:grid-cols-2">
            {REPORT_SECTIONS.map((section) => (
              <article key={section.title} className="rounded-lg border border-zinc-200 p-6">
                <h3 className="text-xl font-semibold text-zinc-950">{section.title}</h3>
                <p className="mt-3 leading-7 text-zinc-700">{section.thesis}</p>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-zinc-650">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="FY2026 6-K 阶段性业绩">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-zinc-500">
                  <th className="py-2 pr-4 font-medium">期间</th>
                  <th className="py-2 pr-4 font-medium">提交日</th>
                  <th className="py-2 pr-4 font-medium">收入</th>
                  <th className="py-2 pr-4 font-medium">收入增速</th>
                  <th className="py-2 pr-4 font-medium">经营利润</th>
                  <th className="py-2 pr-4 font-medium">自由现金流</th>
                  <th className="py-2 pr-4 font-medium">云收入增速</th>
                  <th className="py-2 pr-4 font-medium">来源</th>
                </tr>
              </thead>
              <tbody>
                {ALIBABA_INTERIM_RESULTS.map((row) => (
                  <tr key={row.accessionNumber} className="border-b border-zinc-100">
                    <td className="py-2 pr-4 font-medium text-zinc-950">{row.periodLabel}</td>
                    <td className="py-2 pr-4 text-zinc-700">{row.filingDate}</td>
                    <td className="py-2 pr-4 text-zinc-700">{formatRmbMillionsAsBillions(row.revenueRmbMillions)}</td>
                    <td className="py-2 pr-4 text-zinc-700">{formatPercent(row.revenueGrowth)}</td>
                    <td className="py-2 pr-4 text-zinc-700">{formatRmbMillionsAsBillions(row.operatingIncomeRmbMillions)}</td>
                    <td className="py-2 pr-4 text-zinc-700">{formatRmbMillionsAsBillions(row.freeCashFlowRmbMillions)}</td>
                    <td className="py-2 pr-4 text-zinc-700">{formatPercent(row.cloudRevenueGrowth)}</td>
                    <td className="py-2 pr-4">
                      <a href={row.exhibitUrl} className="text-zinc-800 underline" rel="noreferrer" target="_blank">6-K exhibit</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="FY2026 分部经济">
          <div className="grid gap-3 md:grid-cols-2">
            {latestSegments.map((row) => (
              <article key={row.segment} className="rounded-lg border border-zinc-200 p-4">
                <h3 className="font-semibold text-zinc-950">{row.segment}</h3>
                <p className="mt-2 text-2xl font-semibold">{formatRmbBillions(row.revenue)}</p>
                <p className="mt-1 text-sm text-zinc-600">同比增速：{formatPercent(row.yoyGrowth)}</p>
                <p className="mt-3 text-sm leading-6 text-zinc-650">{row.note}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="年度财务数据库">
          <p className="mb-4 text-sm text-zinc-600">
            覆盖：FY{ALIBABA_ANNUAL_FINANCIALS_COVERAGE.fromFiscalYear}-FY{ALIBABA_ANNUAL_FINANCIALS_COVERAGE.throughFiscalYear}
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-zinc-500">
                  <th className="py-2 pr-4 font-medium">FY</th>
                  <th className="py-2 pr-4 font-medium">收入</th>
                  <th className="py-2 pr-4 font-medium">经营利润</th>
                  <th className="py-2 pr-4 font-medium">净利润</th>
                  <th className="py-2 pr-4 font-medium">自由现金流</th>
                  <th className="py-2 pr-4 font-medium">经营利润率</th>
                </tr>
              </thead>
              <tbody>
                {latestAnnualRows.map((row) => (
                  <tr key={row.fiscalYear} className="border-b border-zinc-100">
                    <td className="py-2 pr-4 font-medium">{row.fiscalYear}</td>
                    <td className="py-2 pr-4">{formatRmbBillions(row.revenue)}</td>
                    <td className="py-2 pr-4">{formatRmbBillions(row.operatingIncome)}</td>
                    <td className="py-2 pr-4">{formatRmbBillions(row.netIncome)}</td>
                    <td className="py-2 pr-4">{formatRmbBillions(row.freeCashFlow)}</td>
                    <td className="py-2 pr-4">{formatPercent(row.operatingMargin)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="估值与 DCF">
          <div className="grid gap-4 lg:grid-cols-3">
            {(["bear", "base", "bull"] as const).map((scenario) => (
              <article key={scenario} className="rounded-lg border border-zinc-200 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">{scenario}</p>
                <h3 className="mt-2 text-2xl font-semibold">${ALIBABA_DCF_CASES[scenario].valuePerAdsUsd} / ADS</h3>
                <p className="mt-3 text-sm text-zinc-600">
                  2036 收入：{formatRmbBillions(ALIBABA_FORECASTS[scenario].at(-1)!.revenue)}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-sm">
              <tbody>
                {ALIBABA_VALUATION_HISTORY.map((row) => (
                  <tr key={row.fiscalYear} className="border-b border-zinc-100">
                    <td className="py-2 pr-4 font-medium">{row.fiscalYear}</td>
                    <td className="py-2 pr-4">市值 {formatUsdBillions(row.marketCapUsd)}</td>
                    <td className="py-2 pr-4">EV/Sales {formatMultiple(row.enterpriseValueToSales)}</td>
                    <td className="py-2 pr-4">P/E {formatMultiple(row.priceToEarnings)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="SEC 披露与来源审计">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="font-semibold text-zinc-950">近期 6-K 更新</h3>
              <div className="mt-3 space-y-3">
                {ALIBABA_RECENT_SIX_K_UPDATES.map((update) => (
                  <a key={update.accessionNumber} href={update.filingUrl} className="block rounded-lg border border-zinc-200 p-4 text-sm" rel="noreferrer" target="_blank">
                    <span className="font-medium text-zinc-950">{update.filingDate}</span>
                    <span className="ml-3 text-zinc-500">{update.classification}</span>
                    <p className="mt-2 text-zinc-650">{update.summary}</p>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-950">来源状态</h3>
              <div className="mt-3 space-y-3">
                {ALIBABA_SOURCE_AUDIT_ITEMS.map((item) => (
                  <div key={item.area} className="rounded-lg border border-zinc-200 p-4 text-sm">
                    <p className="font-medium text-zinc-950">{item.area}</p>
                    <p className="mt-1 text-zinc-600">{item.status}: {item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="发布 QA">
          <div className="grid gap-3 md:grid-cols-2">
            {ALIBABA_PUBLICATION_QA_ITEMS.map((item) => (
              <div key={item.check} className="rounded-lg border border-zinc-200 p-4 text-sm">
                <p className="font-medium text-zinc-950">{item.check}</p>
                <p className="mt-1 text-zinc-600">{item.status}: {item.evidence}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="SEC 文件索引">
          <p className="text-sm text-zinc-600">
            注册文件 {ALIBABA_REGISTRATION_FILINGS.length} 份，20-F 年报/修订 {ALIBABA_ANNUAL_FILINGS.length} 份，Form 6-K {ALIBABA_SIX_K_FILINGS.length} 份。下表显示最近 8 份 6-K。
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <tbody>
                {recentSixKs.map((filing) => (
                  <tr key={filing.accessionNumber} className="border-b border-zinc-100">
                    <td className="py-2 pr-4 font-medium">{filing.form}</td>
                    <td className="py-2 pr-4">{filing.filingDate}</td>
                    <td className="py-2 pr-4 font-mono text-xs">{filing.accessionNumber}</td>
                    <td className="py-2 pr-4">
                      <a href={filing.url} className="text-zinc-800 underline" rel="noreferrer" target="_blank">SEC filing</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>
    </main>
  );
}
