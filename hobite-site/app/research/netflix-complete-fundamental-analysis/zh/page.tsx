import type { Metadata } from "next";
import {
  NETFLIX_ANNUAL_FINANCIALS,
  NETFLIX_ANNUAL_FINANCIALS_COVERAGE,
  NETFLIX_LATEST_ANNUAL_FINANCIAL,
} from "../annualFinancials";
import {
  NETFLIX_ANNUAL_FILINGS,
  NETFLIX_CORE_FILINGS,
  NETFLIX_LATEST_ANNUAL_FILING,
  NETFLIX_LATEST_QUARTERLY_FILING,
  NETFLIX_QUARTERLY_FILINGS,
  NETFLIX_REGISTRATION_FILINGS,
} from "../filings";
import {
  NETFLIX_CONTENT_ECONOMICS,
  NETFLIX_CONTENT_ECONOMICS_COVERAGE,
  NETFLIX_LATEST_CONTENT_ECONOMICS,
} from "../contentEconomics";
import { NETFLIX_DCF_CASES, NETFLIX_FORECASTS } from "../forecastModel";
import { NETFLIX_PUBLICATION_QA_ITEMS } from "../publicationQa";
import {
  NETFLIX_LATEST_QUARTERLY_FINANCIAL,
  NETFLIX_QUARTERLY_FINANCIALS,
  NETFLIX_QUARTERLY_FINANCIALS_COVERAGE,
} from "../quarterlyFinancials";
import { NETFLIX_SOURCE_AUDIT_ITEMS } from "../sourceAudit";
import {
  NETFLIX_GLOBAL_MEMBERSHIP_TOTALS,
  NETFLIX_REGIONAL_METRICS,
  NETFLIX_SUBSCRIBER_METRICS_SOURCE_NOTE,
} from "../subscriberMetrics";
import { NETFLIX_LATEST_VALUATION_HISTORY, NETFLIX_VALUATION_HISTORY } from "../valuationHistory";

export const metadata: Metadata = {
  title: "Netflix（NFLX）完整基本面研究中心",
  description: "Netflix NFLX 中文基本面研究页：SEC 财务、订阅用户、内容经济、估值历史、DCF、来源审计与发布 QA。",
};

const REPORT_SECTIONS = [
  {
    title: "投资摘要",
    thesis:
      "Netflix 已经从高增长互联网故事转变为全球化、高现金流的媒体平台。核心投资问题是：其规模、推荐系统、全球发行与定价权能否继续支撑长期复利。",
    bullets: [
      "基础情景假设付费参与度继续增长、广告层逐步变现、内容投入保持纪律，并带来温和经营杠杆。",
      "风险不是产品失效或破产，而是增长放缓时估值倍数压缩。",
      "广告、游戏、直播和 AI 个性化是下一阶段的可选增长层。",
    ],
  },
  {
    title: "业务模式",
    thesis:
      "Netflix 销售全球娱乐库的持续访问权，再将订阅现金流投入内容、产品、本地化、广告和推荐系统。",
    bullets: [
      "订阅收入仍是基础，因为它提供经常性现金流和可预测的观看数据。",
      "广告层为价格敏感用户提供第二条收益曲线，而不必让全部会员接受单一价格阶梯。",
      "当内容摊销、技术和营销费用增速低于收入时，模型质量提升。",
    ],
  },
  {
    title: "财务质量",
    thesis:
      "Netflix 的财务故事已经从内容扩张期的现金消耗，转向高利润率与自由现金流生成。",
    bullets: [
      "收入从 FY2002 的 $153M 增长到 FY2025 的约 $45.2B。",
      "FY2025 经营利润率和自由现金流能力显示出成熟平台属性。",
      "长期质量取决于内容资产效率、广告变现和国际 ARPU 提升。",
    ],
  },
  {
    title: "内容经济",
    thesis:
      "Netflix 的内容投入不是简单成本，而是获客、留存、定价权和全球分发效率的资本化表达。",
    bullets: [
      "内容资产、内容摊销和内容义务共同决定真实现金投入强度。",
      "原创内容提高差异化，但也带来制作周期、命中率和资产减值风险。",
      "如果内容摊销增速低于收入增速，经营杠杆会继续释放。",
    ],
  },
  {
    title: "估值结论",
    thesis:
      "Netflix 是高质量全球平台，但估值需要同时承认成熟增长、竞争强度和广告/直播等新业务的不确定性。",
    bullets: [
      "基础情景关注收入增长、FCF margin 和终值倍数的组合。",
      "牛市情景来自广告规模化、国际 ARPU 提升和内容效率改善。",
      "熊市情景来自订阅增长放缓、内容成本再加速或竞争推高获客成本。",
    ],
  },
];

function formatUsdBillions(value: number | null) {
  if (value == null) return "n/a";
  return `$${(value / 1_000_000_000).toFixed(1)}B`;
}

function formatMillions(value: number | null) {
  if (value == null) return "n/a";
  return `${(value / 1_000_000).toFixed(1)}M`;
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

export default function NetflixChineseResearchPage() {
  const latestAnnualRows = [...NETFLIX_ANNUAL_FINANCIALS].filter((row) => row.revenue != null).reverse().slice(0, 8);
  const latestQuarterlyRows = [...NETFLIX_QUARTERLY_FINANCIALS].slice(-8).reverse();
  const latestMembershipRow = NETFLIX_GLOBAL_MEMBERSHIP_TOTALS[NETFLIX_GLOBAL_MEMBERSHIP_TOTALS.length - 2];
  const latestRegionalRows = NETFLIX_REGIONAL_METRICS.filter((row) => row.fiscalYear === 2025 || row.fiscalYear === 2024).slice(-8);
  const recentQuarterlyFilings = [...NETFLIX_QUARTERLY_FILINGS].slice(-8).reverse();

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-lg border border-zinc-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-zinc-500">中文研究页</p>
          <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-tight md:text-6xl">
            Netflix（NFLX）完整基本面研究中心
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-zinc-650">
            基于 SEC 年报与季报、Netflix 区域会员披露、内容资产与内容义务数据，覆盖 NFLX 的财务历史、订阅经济、内容经济、估值历史、DCF 和来源审计。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/research/netflix-complete-fundamental-analysis" className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700">
              English page
            </a>
            <a href="/research" className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700">
              Research library
            </a>
            <a href="https://ir.netflix.net/financials/quarterly-earnings/default.aspx" className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700">
              Netflix IR
            </a>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-4">
          <MetricCard label="覆盖范围" value={`${NETFLIX_CORE_FILINGS.length} filings`} note="SEC 文件库存包括注册文件、10-K 年报和 10-Q 季报。" />
          <MetricCard label="最新年报" value={`FY${NETFLIX_LATEST_ANNUAL_FILING.reportDate.slice(0, 4)}`} note={`提交于 ${NETFLIX_LATEST_ANNUAL_FILING.filingDate}。`} />
          <MetricCard label="FY2025 收入" value={formatUsdBillions(NETFLIX_LATEST_ANNUAL_FINANCIAL.revenue)} note="Netflix 主要财务数据以美元披露。" />
          <MetricCard label="最新季度收入" value={formatUsdBillions(NETFLIX_LATEST_QUARTERLY_FINANCIAL.revenue)} note={`${NETFLIX_LATEST_QUARTERLY_FILING.reportDate} 季报。`} />
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

        <SectionCard title="年度财务数据库">
          <p className="mb-4 text-sm text-zinc-600">
            覆盖：FY{NETFLIX_ANNUAL_FINANCIALS_COVERAGE.manualStatementExtractionFiscalYears[0]}-FY{NETFLIX_ANNUAL_FINANCIALS_COVERAGE.xbrlCompleteThroughFiscalYear}
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
                    <td className="py-2 pr-4">{formatUsdBillions(row.revenue)}</td>
                    <td className="py-2 pr-4">{formatUsdBillions(row.operatingIncome)}</td>
                    <td className="py-2 pr-4">{formatUsdBillions(row.netIncome)}</td>
                    <td className="py-2 pr-4">{formatUsdBillions(row.freeCashFlow)}</td>
                    <td className="py-2 pr-4">{formatPercent(row.operatingMargin)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="季度财务数据库">
          <p className="mb-4 text-sm text-zinc-600">
            覆盖：{NETFLIX_QUARTERLY_FINANCIALS_COVERAGE.fromPeriod}-{NETFLIX_QUARTERLY_FINANCIALS_COVERAGE.throughPeriod}
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-zinc-500">
                  <th className="py-2 pr-4 font-medium">期间</th>
                  <th className="py-2 pr-4 font-medium">收入</th>
                  <th className="py-2 pr-4 font-medium">经营利润</th>
                  <th className="py-2 pr-4 font-medium">净利润</th>
                  <th className="py-2 pr-4 font-medium">FCF</th>
                  <th className="py-2 pr-4 font-medium">EPS</th>
                </tr>
              </thead>
              <tbody>
                {latestQuarterlyRows.map((row) => (
                  <tr key={row.period} className="border-b border-zinc-100">
                    <td className="py-2 pr-4 font-medium">{row.period}</td>
                    <td className="py-2 pr-4">{formatUsdBillions(row.revenue)}</td>
                    <td className="py-2 pr-4">{formatUsdBillions(row.operatingIncome)}</td>
                    <td className="py-2 pr-4">{formatUsdBillions(row.netIncome)}</td>
                    <td className="py-2 pr-4">{formatUsdBillions(row.freeCashFlow)}</td>
                    <td className="py-2 pr-4">{row.dilutedEps == null ? "n/a" : `$${row.dilutedEps.toFixed(2)}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="订阅用户与区域经济">
          <p className="mb-4 text-sm leading-6 text-zinc-600">{NETFLIX_SUBSCRIBER_METRICS_SOURCE_NOTE}</p>
          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard label="全球会员" value={formatMillions(latestMembershipRow?.paidMembershipsEndOfPeriod ?? null)} note={`FY${latestMembershipRow?.fiscalYear ?? "latest"} 披露口径。`} />
            <MetricCard label="UCAN 收入" value={formatUsdBillions(latestRegionalRows.find((row) => row.region === "UCAN")?.streamingRevenue ?? null)} note="北美是 ARPU 和利润质量的重要锚。" />
            <MetricCard label="EMEA 收入" value={formatUsdBillions(latestRegionalRows.find((row) => row.region === "EMEA")?.streamingRevenue ?? null)} note="欧洲、中东和非洲是国际规模的重要来源。" />
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-sm">
              <tbody>
                {latestRegionalRows.map((row) => (
                  <tr key={`${row.fiscalYear}-${row.region}`} className="border-b border-zinc-100">
                    <td className="py-2 pr-4 font-medium">{row.fiscalYear}</td>
                    <td className="py-2 pr-4">{row.region}</td>
                    <td className="py-2 pr-4">{formatUsdBillions(row.streamingRevenue)}</td>
                    <td className="py-2 pr-4">会员 {formatMillions(row.paidMembershipsEndOfPeriod)}</td>
                    <td className="py-2 pr-4">ARM {row.averageMonthlyRevenuePerPayingMembership == null ? "n/a" : `$${row.averageMonthlyRevenuePerPayingMembership.toFixed(2)}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="内容经济数据库">
          <p className="mb-4 text-sm text-zinc-600">
            覆盖：FY{NETFLIX_CONTENT_ECONOMICS_COVERAGE.fromFiscalYear}-FY{NETFLIX_CONTENT_ECONOMICS_COVERAGE.throughFiscalYear}
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard label="内容资产净额" value={formatUsdBillions(NETFLIX_LATEST_CONTENT_ECONOMICS.contentAssetsNet)} note="包含授权内容和自制内容净额。" />
            <MetricCard label="内容摊销" value={formatUsdBillions(NETFLIX_LATEST_CONTENT_ECONOMICS.totalContentAmortization)} note="衡量内容成本进入损益表的速度。" />
            <MetricCard label="内容义务" value={formatUsdBillions(NETFLIX_LATEST_CONTENT_ECONOMICS.contentObligationsTotal)} note="未来内容承诺影响现金流弹性。" />
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-sm">
              <tbody>
                {NETFLIX_CONTENT_ECONOMICS.map((row) => (
                  <tr key={row.fiscalYear} className="border-b border-zinc-100">
                    <td className="py-2 pr-4 font-medium">{row.fiscalYear}</td>
                    <td className="py-2 pr-4">内容资产 {formatUsdBillions(row.contentAssetsNet)}</td>
                    <td className="py-2 pr-4">摊销 {formatUsdBillions(row.totalContentAmortization)}</td>
                    <td className="py-2 pr-4">内容义务 {formatUsdBillions(row.contentObligationsTotal)}</td>
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
                <h3 className="mt-2 text-2xl font-semibold">${NETFLIX_DCF_CASES[scenario].valuePerShare} / share</h3>
                <p className="mt-3 text-sm text-zinc-600">
                  2035 收入：{formatUsdBillions(NETFLIX_FORECASTS[scenario].at(-1)!.revenue)}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-sm">
              <tbody>
                {NETFLIX_VALUATION_HISTORY.map((row) => (
                  <tr key={row.fiscalYear} className="border-b border-zinc-100">
                    <td className="py-2 pr-4 font-medium">{row.fiscalYear}</td>
                    <td className="py-2 pr-4">市值 {formatUsdBillions(row.marketCap)}</td>
                    <td className="py-2 pr-4">EV/Sales {formatMultiple(row.enterpriseValueToSales)}</td>
                    <td className="py-2 pr-4">P/E {formatMultiple(row.priceToEarnings)}</td>
                    <td className="py-2 pr-4">FCF yield {formatPercent(row.freeCashFlowYield)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-zinc-600">
            最新估值行：FY{NETFLIX_LATEST_VALUATION_HISTORY.fiscalYear}，EV/Sales {formatMultiple(NETFLIX_LATEST_VALUATION_HISTORY.enterpriseValueToSales)}。
          </p>
        </SectionCard>

        <SectionCard title="来源审计与发布 QA">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="font-semibold text-zinc-950">来源状态</h3>
              <div className="mt-3 space-y-3">
                {NETFLIX_SOURCE_AUDIT_ITEMS.map((item) => (
                  <div key={item.area} className="rounded-lg border border-zinc-200 p-4 text-sm">
                    <p className="font-medium text-zinc-950">{item.area}</p>
                    <p className="mt-1 text-zinc-600">{item.status}: {item.note}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-950">发布 QA</h3>
              <div className="mt-3 space-y-3">
                {NETFLIX_PUBLICATION_QA_ITEMS.map((item) => (
                  <div key={item.check} className="rounded-lg border border-zinc-200 p-4 text-sm">
                    <p className="font-medium text-zinc-950">{item.check}</p>
                    <p className="mt-1 text-zinc-600">{item.status}: {item.evidence}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="SEC 文件索引">
          <p className="text-sm text-zinc-600">
            注册文件 {NETFLIX_REGISTRATION_FILINGS.length} 份，10-K 年报 {NETFLIX_ANNUAL_FILINGS.length} 份，10-Q 季报 {NETFLIX_QUARTERLY_FILINGS.length} 份。下表显示最近 8 份季报。
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <tbody>
                {recentQuarterlyFilings.map((filing) => (
                  <tr key={filing.accessionNumber} className="border-b border-zinc-100">
                    <td className="py-2 pr-4 font-medium">{filing.form}</td>
                    <td className="py-2 pr-4">{filing.reportDate}</td>
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
