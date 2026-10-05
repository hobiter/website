import type { ReactNode } from "react";
import { AMD_ANNUAL, type FinancialRow } from "./annualFinancials";
import { AMD_QUARTERLY } from "./quarterlyFinancials";
import { AMD_FILINGS } from "./filings";
import {
  AMD_LATEST_PRICE as price,
  AMD_VALUATION_HISTORY,
  AMD_PRICE_SOURCE,
} from "./valuationHistory";
import {
  AMD_SEGMENTS,
  AMD_OPERATING as op,
  AMD_SOURCES,
} from "./operatingMetrics";
import { AMD_ECONOMICS, AMD_RISKS } from "./segmentEconomics";
import {
  AMD_MODEL_INPUTS as input,
  AMD_ASSUMPTIONS,
  AMD_FORECASTS,
  AMD_DCF_CASES,
  AMD_SENSITIVITY,
  AMD_MARGIN_SENSITIVITY,
  AMD_DILUTION_SENSITIVITY,
  type Scenario,
} from "./forecastModel";
import { AMD_REPORT } from "./reportContent";
import { AMD_CHART_GROUPS, AMD_RESEARCH_NOTE } from "./researchPlan";
import { AMD_AUDIT } from "./sourceAudit";
import { AMD_QA } from "./publicationQa";
const num = (n: number | null | undefined, d = 2) =>
  n == null
    ? "N/A"
    : n.toLocaleString("en-US", {
        minimumFractionDigits: d,
        maximumFractionDigits: d,
      });
const bn = (n: number | null | undefined) =>
  n == null ? "N/A" : num(n / 1e9, 3);
const pct = (n: number | null | undefined) =>
  n == null ? "N/A" : `${num(n, 1)}%`;
function Table({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full whitespace-nowrap text-left text-sm">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                scope="col"
                className="border-b border-zinc-300 px-3 py-3 font-semibold"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((v, j) => (
                <td
                  key={j}
                  className="border-b border-zinc-200 px-3 py-3 align-top"
                >
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function Chart({
  title,
  rows,
  unit,
}: {
  title: string;
  rows: { label: string; value: number | null }[];
  unit: string;
}) {
  const max = Math.max(1, ...rows.map((r) => Math.abs(r.value ?? 0)));
  return (
    <figure className="min-w-0 border-t border-zinc-300 py-5">
      <figcaption className="mb-4 font-semibold">
        {title}{" "}
        <span className="text-xs font-normal text-zinc-500">{unit}</span>
      </figcaption>
      <div className="space-y-2">
        {rows.map((r) => (
          <div
            key={r.label}
            className="grid grid-cols-[72px_minmax(0,1fr)_64px] items-center gap-2 text-xs"
          >
            <span>{r.label}</span>
            <div className="h-3 bg-zinc-100">
              <div
                className={`h-full ${r.value != null && r.value < 0 ? "bg-rose-600" : "bg-emerald-600"}`}
                style={{ width: `${(Math.abs(r.value ?? 0) / max) * 100}%` }}
              />
            </div>
            <span className="text-right tabular-nums">{num(r.value)}</span>
          </div>
        ))}
      </div>
    </figure>
  );
}
export default function AmdResearchView({
  lang = "en",
}: {
  lang?: "en" | "zh";
}) {
  const zh = lang === "zh",
    t = (en: string, cn: string) => (zh ? cn : en);
  const latest = AMD_ANNUAL.at(-1)!,
    quarter = AMD_QUARTERLY.at(-1)!;
  const a = (key: keyof FinancialRow) =>
    AMD_ANNUAL.map((r) => ({
      label: String(r.year),
      value: typeof r[key] === "number" ? (r[key] as number) / 1e9 : null,
    }));
  const q = (key: "revenue" | "freeCashFlow") =>
    AMD_QUARTERLY.slice(-12).map((r) => ({
      label: `${r.year} Q${r.quarter}`,
      value: r[key] == null ? null : r[key]! / 1e9,
    }));
  const charts = [
    { rows: a("revenue"), unit: "USD B" },
    { rows: a("operatingIncome"), unit: "USD B" },
    { rows: a("netIncome"), unit: "USD B" },
    { rows: a("freeCashFlow"), unit: "USD B" },
    {
      rows: AMD_ANNUAL.map((r) => ({
        label: String(r.year),
        value: r.grossMargin,
      })),
      unit: "%",
    },
    {
      rows: AMD_ANNUAL.map((r) => ({
        label: String(r.year),
        value: r.operatingMargin,
      })),
      unit: "%",
    },
    { rows: a("research"), unit: "USD B" },
    { rows: a("inventory"), unit: "USD B" },
    { rows: q("revenue"), unit: "USD B" },
    { rows: q("freeCashFlow"), unit: "USD B" },
    {
      rows: AMD_SEGMENTS.map((r) => ({
        label: t(r.en, r.zh),
        value: r.q2Revenue / 1000,
      })),
      unit: "USD B",
    },
    {
      rows: AMD_FORECASTS.base.map((r) => ({
        label: String(r.year),
        value: r.fcff,
      })),
      unit: "USD B",
    },
  ];
  const financialRows = (data: FinancialRow[]) =>
    data.map((r) => [
      r.period,
      r.end,
      bn(r.revenue),
      bn(r.grossProfit),
      bn(r.operatingIncome),
      bn(r.netIncome),
      num(r.dilutedEps),
      bn(r.operatingCashFlow),
      bn(r.capex),
      bn(r.freeCashFlow),
      pct(r.grossMargin),
      pct(r.operatingMargin),
      <a
        key={r.period}
        href={r.source}
        target="_blank"
        rel="noreferrer"
        className="underline"
      >
        {t("Source", "来源")}
      </a>,
    ]);
  const financialHeaders = [
    t("Fiscal period", "财季"),
    t("End", "结束日"),
    t("Revenue", "收入"),
    t("Gross profit", "毛利"),
    t("GAAP EBIT", "营业利润"),
    t("Net income", "净利润"),
    "EPS · USD",
    t("CFO", "经营现金"),
    t("Cash capex", "现金支出"),
    "FCF",
    t("GM", "毛利率"),
    t("OM", "营业率"),
    t("Source", "来源"),
  ];
  const labels = {
    bear: t("Bear", "悲观"),
    base: t("Base", "基准"),
    bull: t("Bull", "乐观"),
  };
  const link = (url: string, label: string) => (
    <a href={url} target="_blank" rel="noreferrer" className="underline">
      {label}
    </a>
  );
  const sections = [
    ["report", t("Report", "报告")],
    ["charts", t("Charts", "图表")],
    ["forecast", t("Forecast & DCF", "预测与 DCF")],
    ["valuation", t("Valuation history", "历史估值")],
    ["operations", t("Operations", "经营指标")],
    ["annual", t("Annual financials", "年度财务")],
    ["quarterly", t("Quarterly financials", "季度财务")],
    ["audit", t("Sources & QA", "来源与核验")],
  ];
  return (
    <main
      data-company="amd"
      className="mx-auto w-full min-w-0 max-w-7xl px-4 py-10 text-zinc-900 sm:px-8"
    >
      <nav
        aria-label={t("Research navigation", "研究导航")}
        className="mb-7 flex flex-wrap gap-4 text-sm underline"
      >
        <a href="/research" data-testid="amd-library">
          {t("Research library", "研究库")}
        </a>
        <a
          href="/research/amd-complete-fundamental-analysis"
          data-testid="amd-english"
        >
          English
        </a>
        <a
          href="/research/amd-complete-fundamental-analysis/zh"
          data-testid="amd-chinese"
        >
          中文
        </a>
      </nav>
      <header className="border-b border-zinc-200 pb-8">
        <p className="mb-3 text-sm text-emerald-700">
          NASDAQ: AMD ·{" "}
          {t("Independent fundamental research", "独立基本面研究")}
        </p>
        <h1 className="text-4xl font-semibold sm:text-5xl">
          {t("AMD", "超威半导体（AMD）")}
        </h1>
        <p className="mt-4 text-xl text-zinc-600">
          {t("Complete Fundamental Analysis", "完整基本面研究")}
        </p>
        <p className="mt-6 max-w-4xl text-sm leading-7 text-zinc-600">
          {zh ? AMD_RESEARCH_NOTE.zh : AMD_RESEARCH_NOTE.en}
        </p>
        <p className="mt-3 text-sm text-zinc-600">
          {t(
            "As of October 4, 2026. Latest annual FY2025; latest interim FY2026 Q2. Forecasts are independent assumptions, not reported results. General information, not personalized investment advice.",
            "截至 2026 年 10 月 4 日。最新年度为 2025 财年，最新中期为 2026 第二财季。预测为独立假设，不是实际业绩。本文为一般信息而非个性化投资建议。",
          )}
        </p>
      </header>
      <dl className="grid grid-cols-2 gap-6 border-b border-zinc-200 py-6 lg:grid-cols-4">
        {[
          [t("Close · Oct 2", "收盘 · 10 月 2 日"), `$${num(price.close)}`],
          [
            t("FY2025 revenue · USD B", "2025 收入 · 十亿美元"),
            bn(latest.revenue),
          ],
          [
            t("Q2 2026 GAAP EBIT margin", "2026 第二季营业率"),
            pct(quarter.operatingMargin),
          ],
          [
            t("H1 2026 CFO-minus-capex · USD B", "2026 上半年 FCF · 十亿美元"),
            num(op.h1Fcf / 1000, 3),
          ],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="text-xs leading-5 text-zinc-500">{k}</dt>
            <dd className="mt-2 text-xl font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
      <nav
        aria-label={t("Contents", "目录")}
        className="flex flex-wrap gap-x-5 gap-y-3 border-b border-zinc-200 py-6 text-sm underline"
      >
        {sections.map(([id, label]) => (
          <a key={id} href={`#${id}`} data-testid={`amd-nav-${id}`}>
            {label}
          </a>
        ))}
      </nav>
      <section
        id="report"
        className="scroll-mt-28 border-b border-zinc-200 py-8"
      >
        <h2 className="mb-6 text-2xl font-semibold">
          {t("Investment report", "投资研究报告")}
        </h2>
        <div className="max-w-4xl space-y-8">
          {AMD_REPORT.map((r) => (
            <article key={r.titleEn}>
              <h3 className="mb-3 text-lg font-semibold">
                {zh ? r.titleZh : r.titleEn}
              </h3>
              <p className="text-sm leading-7 text-zinc-700">
                {zh ? r.zh : r.en}
              </p>
              <p className="mt-2 text-xs text-zinc-500">
                {link(r.source, t("Primary evidence", "主要证据"))}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section
        id="charts"
        className="scroll-mt-28 border-b border-zinc-200 py-8"
      >
        <h2 className="mb-3 text-2xl font-semibold">
          {t("Chart dashboard", "图表看板")}
        </h2>
        <p className="mb-5 text-sm text-zinc-600">
          {t(
            "Red bars denote negative values. Forecast charts are assumptions; missing observations show N/A.",
            "红色条形为负值。预测图为假设，缺失显示 N/A。",
          )}
        </p>
        <div className="grid gap-x-8 gap-y-3 md:grid-cols-2 xl:grid-cols-3">
          {charts.map((c, i) => (
            <Chart
              key={i}
              title={AMD_CHART_GROUPS[i].split(" / ")[zh ? 1 : 0]}
              {...c}
            />
          ))}
        </div>
      </section>
      <section
        id="forecast"
        className="scroll-mt-28 border-b border-zinc-200 py-8"
      >
        <h2 className="mb-4 text-2xl font-semibold">
          {t("Ten-year forecast and enterprise DCF", "十年预测与企业 DCF")}
        </h2>
        <p className="mb-5 max-w-4xl text-sm leading-7 text-zinc-600">
          {t(
            "USD B, shares in billions. FCFF = assumed GAAP EBIT after operating tax + other D&A + finite acquired-intangible amortization − cash capex − incremental working capital. SBC and operating rent remain in EBIT. Other D&A is 2% of revenue; capex 5% in FY2027–29, then 4%; working capital 12% of revenue change. Acquired amortization runs from $2B to zero by FY2034; terminal value adds none. Future M&A and investment returns are excluded. FY2026 revenue baseline $48B and remaining-year FCFF stub $0.5/$1/$1.5B are analyst assumptions, not issuer guidance. Cash is discounted to assumed fiscal year ends from October 4. June 27 balances are stale relative to the valuation date; unreported subsequent cash movements are not imputed.",
            "单位十亿美元，股数为十亿股。FCFF = 假设 GAAP 营业利润税后 + 其他折旧摊销 + 有限期收购摊销 − 现金资本支出 − 增量营运资本。营业利润保留股权激励与经营租金。其他折旧为收入 2%，2027–29 资本支出为 5%，之后 4%；营运资本为收入变动的 12%。收购摊销从 20 亿美元逐步降至 2034 年的零，永续不再加回。不计未来收购和投资回报。2026 收入基数 480 亿美元及剩余现金 5/10/15 亿美元为分析师假设，不是公司指引。按假设财年末从 10 月 4 日折现。6 月 27 日余额早于估值日，不推算未披露后续现金变动。",
          )}
        </p>
        <Table
          headers={[
            t("Case", "情景"),
            "WACC",
            t("Terminal g", "永续增速"),
            t("Stub PV", "短期现值"),
            t("10Y cash PV", "十年现金现值"),
            t("Terminal PV", "永续现值"),
            "EV",
            t("Equity", "权益"),
            t("Shares · B", "股数"),
            t("Value/share", "每股价值"),
            t("Vs close", "较收盘"),
            t("Terminal weight", "永续占比"),
          ]}
          rows={(Object.keys(labels) as Scenario[]).map((s) => {
            const c = AMD_DCF_CASES[s];
            return [
              labels[s],
              pct(c.wacc * 100),
              pct(c.growth * 100),
              num(c.pvStub),
              num(c.pvCash),
              num(c.pvTerminal),
              num(c.enterpriseValue),
              num(c.equityValue),
              num(c.shares, 3),
              `$${num(c.valuePerShare)}`,
              pct(c.upside),
              pct(c.terminalWeight),
            ];
          })}
        />
        <p className="my-5 max-w-4xl text-sm leading-7 text-zinc-600">
          {t(
            `Equity bridge: cash ${num(input.cash, 3)} + current investments ${num(input.securities, 3)} − financial debt ${num(input.debt, 3)} − $5B conservative investment reserve + negligible warrant exercise proceeds. Long-term strategic holdings excluded. The $5B reserve is an analyst convention, not recorded debt, deducted once at face value with no future returns credited. Ordinary procurement is modeled in cost/working capital and rent in margins; guarantees and new lease ramps are not fully priced. Starting shares ${num(input.shares, 3)}B are Q2 weighted diluted shares, not exact current shares. Add 0/160/320M conditional shares in bear/base/bull, not a vesting prediction. Future warrant accounting/concessions require further margin stress.`,
            `权益桥：现金 ${num(input.cash, 3)} + 短期投资 ${num(input.securities, 3)} − 金融债务 ${num(input.debt, 3)} − 50 亿美元保守投资预留 + 极少权证行权现金。不计长期战略持仓。50 亿预留是分析约定而非账面债务，按面值仅扣一次，不计未来回报。日常采购进入成本和营运资本，租金进入利润率；担保和新增租赁尚未完整定价。起始 ${num(input.shares, 3)} 十亿股为第二季加权稀释股数，不是精确当前股数。悲观/基准/乐观分别新增 0/1.6/3.2 亿附条件股，并非归属预测。未来权证会计与让利仍需额外利润率压力。`,
          )}
        </p>
        {(Object.keys(labels) as Scenario[]).map((s) => (
          <div key={s} className="mt-7">
            <h3 className="mb-3 text-lg font-semibold">
              {labels[s]} · FY2027–FY2036
            </h3>
            <p className="mb-3 text-xs text-zinc-500">
              {t("Assumed operating tax", "假设经营税率")}:{" "}
              {pct(AMD_ASSUMPTIONS[s].tax * 100)}
            </p>
            <Table
              headers={[
                t("Year", "财年"),
                t("Revenue", "收入"),
                t("Growth", "增长"),
                t("GAAP EBIT", "营业利润"),
                t("Margin", "利润率"),
                "NOPAT",
                t("Other D&A", "其他折旧"),
                t("Acquired amort.", "收购摊销"),
                t("Capex", "资本支出"),
                "ΔWC",
                "FCFF",
                t("FCFF margin", "现金率"),
              ]}
              rows={AMD_FORECASTS[s].map((r) => [
                r.year,
                num(r.revenue),
                pct(r.growth),
                num(r.operatingIncome),
                pct(r.margin),
                num(r.nopat),
                num(r.otherDa),
                num(r.acquiredAmortization),
                num(r.capex),
                num(r.workingCapital),
                num(r.fcff),
                pct(r.fcffMargin),
              ])}
            />
          </div>
        ))}
        <h3 className="mb-3 mt-8 text-lg font-semibold">
          {t("Base sensitivity · USD/share", "基准敏感性 · 美元/股")}
        </h3>
        <Table
          headers={["WACC / g", "2%", "3%", "4%"]}
          rows={AMD_SENSITIVITY.map((r) => [
            pct(r.wacc * 100),
            ...r.values.map((v) => num(v)),
          ])}
        />
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="mb-3 font-semibold">
              {t("Terminal EBIT margin", "永续营业利润率")}
            </h4>
            <Table
              headers={[t("Margin", "利润率"), t("Value/share", "每股价值")]}
              rows={AMD_MARGIN_SENSITIVITY.map((r) => [
                pct(r.margin * 100),
                num(r.value),
              ])}
            />
          </div>
          <div>
            <h4 className="mb-3 font-semibold">
              {t("Incremental warrant shares", "新增权证股数")}
            </h4>
            <Table
              headers={[
                t("Shares · M", "股数 · 百万"),
                t("Value/share", "每股价值"),
              ]}
              rows={AMD_DILUTION_SENSITIVITY.map((r) => [
                num(r.shares * 1000, 0),
                num(r.value),
              ])}
            />
          </div>
        </div>
      </section>
      <section
        id="valuation"
        className="scroll-mt-28 border-b border-zinc-200 py-8"
      >
        <h2 className="mb-4 text-2xl font-semibold">
          {t("Historical fiscal-end valuation", "历史财年末估值")}
        </h2>
        <p className="mb-4 text-sm leading-7 text-zinc-600">
          {t(
            "Ex-post annual data joined to last trading close on/before fiscal end. Market cap uses actual period-end shares, never weighted EPS shares. P/E N/A for losses; missing debt prevents EV. Historical EV deducts cash only; it is not the full current DCF equity bridge. No splits in retrieved range. FCF yield is historical CFO-minus-capex, not recurring FCFF.",
            "事后年度数据匹配财年末当日或之前最近收盘。市值采用实际期末股数，不用 EPS 加权股数。亏损不显示市盈率，债务缺失不显示企业价值。历史企业价值仅扣现金，与当前 DCF 桥不同。读取区间未发现拆股。FCF 收益率为历史经营现金流减支出，非经常性 FCFF。",
          )}
        </p>
        <Table
          headers={[
            t("FY", "财年"),
            t("Close date", "收盘日"),
            t("Price", "价格"),
            t("Shares · B", "股数"),
            t("Market cap · B", "市值"),
            "EV · B",
            "P/S",
            "P/E",
            "EV/Sales",
            t("FCF yield", "FCF 收益率"),
          ]}
          rows={AMD_VALUATION_HISTORY.map((r) => [
            r.year,
            r.date,
            num(r.close),
            r.shares == null ? "N/A" : num(r.shares / 1e9, 3),
            bn(r.marketCap),
            bn(r.enterpriseValue),
            num(r.priceToSales),
            num(r.priceToEarnings),
            num(r.evToSales),
            pct(r.fcfYield),
          ])}
        />
        <p className="mt-3 text-xs">
          {link(AMD_PRICE_SOURCE, t("Market data endpoint", "市场数据端点"))}
        </p>
      </section>
      <section
        id="operations"
        className="scroll-mt-28 border-b border-zinc-200 py-8"
      >
        <h2 className="mb-4 text-2xl font-semibold">
          {t("Operating evidence and economics", "经营证据与经济性")}
        </h2>
        <p className="mb-4 text-sm text-zinc-600">
          {t(
            "USD millions. Current disclosed segment perimeter; segment profits exclude All Other.",
            "单位百万美元。当前披露分部边界，分部利润不含其他类别。",
          )}
        </p>
        <Table
          headers={[
            t("Segment", "分部"),
            t("Q2 2026 revenue", "2026 第二季收入"),
            t("Q1 2026 revenue", "2026 第一季收入"),
            t("Q2 2025 revenue", "2025 第二季收入"),
            t("Q2 YoY", "第二季同比"),
            t("Q2 2026 EBIT", "2026 第二季营业利润"),
            t("Segment margin", "分部利润率"),
          ]}
          rows={AMD_SEGMENTS.map((r) => [
            t(r.en, r.zh),
            num(r.q2Revenue, 0),
            num(r.q1Revenue, 0),
            num(r.priorRevenue, 0),
            pct((r.q2Revenue / r.priorRevenue - 1) * 100),
            num(r.q2OperatingIncome, 0),
            pct((r.q2OperatingIncome / r.q2Revenue) * 100),
          ])}
        />
        <p className="my-4 text-sm text-zinc-600">
          {t(
            "Client $3.062B and Gaming $0.779B comprise the $3.841B combined segment. Segment EBIT $3.071B plus All Other −$1.081B = GAAP EBIT $1.990B.",
            "客户端 30.62 亿美元与游戏 7.79 亿组成合计 38.41 亿。分部利润合计 30.71 亿，加其他类别 −10.81 亿，等于 GAAP 营业利润 19.90 亿。",
          )}
        </p>
        <h3 className="mb-3 mt-7 text-lg font-semibold">
          {t("Q2 adjusted operating-profit bridge", "第二季调整后营业利润桥")}
        </h3>
        <Table
          headers={[t("Item", "项目"), "USD M"]}
          rows={[
            [t("GAAP EBIT", "GAAP 营业利润"), op.gaapOperatingIncome],
            [t("SBC addback", "加回股权激励"), op.stockComp],
            [
              t("Acquired amortization addback", "加回收购摊销"),
              op.acquiredAmortization,
            ],
            [t("Acquisition/other costs", "收购等费用"), op.acquisitionOther],
            [t("Legal contingency", "法律准备"), op.legalContingency],
            [t("Non-GAAP EBIT", "非 GAAP 营业利润"), op.nonGaapOperatingIncome],
          ]}
        />
        <h3 className="mb-3 mt-7 text-lg font-semibold">
          {t("Cash and obligation evidence", "现金与义务证据")}
        </h3>
        <Table
          headers={[
            t("Metric", "指标"),
            t("USD B / M shares where labeled", "十亿美元 / 标示处百万股"),
          ]}
          rows={[
            [
              t(
                "Q2 2025 tagged FCF = continuing FCF + discontinued CFO",
                "2025 第二季标签 FCF = 持续经营 FCF + 已终止经营现金",
              ),
              "1.729 = 1.180 + 0.549",
            ],
            [
              t(
                "H1 operating cash / capex / FCF",
                "上半年经营现金 / 支出 / FCF",
              ),
              `${num(op.h1OperatingCash / 1000, 3)} / ${num(op.h1Capex / 1000, 3)} / ${num(op.h1Fcf / 1000, 3)}`,
            ],
            [
              t(
                "Q2 operating cash / capex / FCF",
                "第二季经营现金 / 支出 / FCF",
              ),
              `${num(op.q2OperatingCash / 1000, 3)} / ${num(op.q2Capex / 1000, 3)} / ${num(op.q2Fcf / 1000, 3)}`,
            ],
            [
              t(
                "H1 supplier-prepayment/other asset increase",
                "上半年预付与其他资产增加",
              ),
              num(op.h1PrepaymentsIncrease / 1000, 3),
            ],
            [
              t("H1 accounts payable increase", "上半年应付款增加"),
              num(op.h1PayablesIncrease / 1000, 3),
            ],
            [
              t(
                "Purchase commitments / rest of FY2026",
                "采购承诺 / 2026 剩余期间",
              ),
              `${num(op.purchaseCommitments / 1000, 3)} / ${num(op.remainder2026Commitments / 1000, 3)}`,
            ],
            [
              t(
                "Commenced / uncommenced lease payments",
                "已开始 / 未开始租赁付款",
              ),
              `${num(op.commencedLeasePayments / 1000)} / ${num(op.uncommencedLeasePayments / 1000)}`,
            ],
            [
              t("Maximum lease guarantees", "租赁担保最大额"),
              num(op.leaseGuarantees / 1000),
            ],
            [
              t(
                "Subsequent conditional investments / leases",
                "后续附条件投资 / 租赁",
              ),
              `${num(op.subsequentInvestmentCommitments / 1000)} / ${num(op.subsequentLeasePayments / 1000)}`,
            ],
            [
              t("Goodwill / acquired intangibles", "商誉 / 收购无形资产"),
              `${num(op.goodwill / 1000, 3)} / ${num(op.intangibles / 1000, 3)}`,
            ],
            [
              t(
                "Conditional OpenAI + Meta warrants · M shares",
                "OpenAI + Meta 附条件权证 · 百万股",
              ),
              `${op.warrantSharesEach} + ${op.warrantSharesEach} = ${op.warrantSharesTotal}`,
            ],
            [
              t(
                "Vested/exercisable at June 27 · M shares",
                "6 月 27 日已归属可行权 · 百万股",
              ),
              0,
            ],
          ]}
        />
        <h3 className="mb-3 mt-7 text-lg font-semibold">
          {t(
            "Q3 2026 guidance, not actual results",
            "2026 第三季指引，非实际业绩",
          )}
        </h3>
        <Table
          headers={[t("Metric", "指标"), t("Issuer guidance", "公司指引")]}
          rows={[
            [
              t("Revenue · USD B", "收入 · 十亿美元"),
              `${num(op.guidance.revenueLow / 1000)}–${num(op.guidance.revenueHigh / 1000)}`,
            ],
            [
              t("Non-GAAP gross margin", "非 GAAP 毛利率"),
              pct(op.guidance.nonGaapGrossMargin),
            ],
          ]}
        />
        <p className="mt-3 text-xs text-zinc-500">
          {t(
            "GAAP gross-margin guidance is not supplied; do not substitute the adjusted 56% into GAAP history.",
            "未提供 GAAP 毛利率指引，不能把调整后 56% 填入 GAAP 历史。",
          )}{" "}
          {link(AMD_SOURCES.earnings, t("Issuer release", "公司公告"))}
        </p>
        <div className="mt-8 grid gap-7 md:grid-cols-2">
          {AMD_ECONOMICS.map((r) => (
            <article
              key={r.en}
              className="min-w-0 border-t border-zinc-200 pt-5"
            >
              <h3 className="mb-3 font-semibold">{t(r.en, r.zh)}</h3>
              <p className="text-sm leading-7 text-zinc-600">
                {t(r.enNote, r.zhNote)}
              </p>
              <p className="mt-2 text-xs">
                {link(r.source, t("Evidence", "证据"))}
              </p>
            </article>
          ))}
        </div>
        <h3 className="mb-3 mt-8 text-lg font-semibold">
          {t("Monitoring dashboard", "风险监测")}
        </h3>
        <div className="grid gap-5 md:grid-cols-2">
          {AMD_RISKS.map((r) => (
            <article key={r.en}>
              <h4 className="font-semibold">{t(r.en, r.zh)}</h4>
              <p className="mt-2 text-sm leading-7 text-zinc-600">
                {t(r.enNote, r.zhNote)}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section
        id="annual"
        className="scroll-mt-28 border-b border-zinc-200 py-8"
      >
        <h2 className="mb-4 text-2xl font-semibold">
          {t("Annual financial database", "年度财务数据库")}
        </h2>
        <Table headers={financialHeaders} rows={financialRows(AMD_ANNUAL)} />
        <h3 className="mb-3 mt-7 font-semibold">
          {t("Balance sheet, investment and research", "资产负债、投入与研发")}
        </h3>
        <Table
          headers={[
            "FY",
            t("Cash", "现金"),
            t("Current investments", "短期投资"),
            t("Debt", "债务"),
            t("Assets", "资产"),
            t("Liabilities", "负债"),
            t("Equity", "权益"),
            t("Inventory", "库存"),
            t("R&D", "研发"),
            t("Total D&A", "总折旧摊销"),
            t("SBC", "股权激励"),
            "ROE",
          ]}
          rows={AMD_ANNUAL.map((r) => [
            r.year,
            bn(r.cash),
            bn(r.securities),
            bn(r.debt),
            bn(r.assets),
            bn(r.liabilities),
            bn(r.equity),
            bn(r.inventory),
            bn(r.research),
            bn(r.depreciation),
            bn(r.stockComp),
            pct(r.roe),
          ])}
        />
      </section>
      <section
        id="quarterly"
        className="scroll-mt-28 border-b border-zinc-200 py-8"
      >
        <h2 className="mb-4 text-2xl font-semibold">
          {t("Quarterly financial database", "季度财务数据库")}
        </h2>
        <p className="mb-4 text-sm leading-7 text-zinc-600">
          {t(
            "All 62 quarters. Q4 flows derived from annual minus Q1–Q3; Q4 EPS/shares N/A. Cash-flow YTD differences require all prior quarters. See field provenance for tag and calculation methods.",
            "共 62 财季。第四季现金流由全年减前三季推算，EPS 和股数保持 N/A。累计现金流差额要求所有前季完整。逐字段出处保留标签和计算方法。",
          )}
        </p>
        <Table headers={financialHeaders} rows={financialRows(AMD_QUARTERLY)} />
      </section>
      <section id="audit" className="scroll-mt-28 py-8">
        <h2 className="mb-4 text-2xl font-semibold">
          {t("Source audit and publication QA", "来源审计与发布核验")}
        </h2>
        <div className="space-y-5">
          {AMD_AUDIT.map((r) => (
            <article key={r.area} className="border-t border-zinc-200 pt-4">
              <h3 className="font-semibold">
                {r.area} ·{" "}
                <span className="text-sm font-normal">{r.status}</span>
              </h3>
              <p className="mt-2 text-xs text-zinc-500">{r.coverage}</p>
              <p className="mt-2 text-sm leading-7 text-zinc-600">
                {t(r.en, r.zh)}
              </p>
              <p className="mt-1 text-xs">
                {link(r.source, t("Source", "来源"))}
              </p>
            </article>
          ))}
        </div>
        <h3 className="mb-3 mt-8 text-lg font-semibold">
          {t("Publication checks", "发布检查")}
        </h3>
        <div className="space-y-4">
          {AMD_QA.map((r) => (
            <article key={r.area}>
              <h4 className="font-semibold">
                {r.area} · {r.status}
              </h4>
              <p className="mt-2 text-sm leading-7 text-zinc-600">
                {t(r.en, r.zh)}
              </p>
            </article>
          ))}
        </div>
        <details className="mt-8 border-t border-zinc-300 py-5">
          <summary className="cursor-pointer font-semibold">
            {t("SEC filing inventory", "SEC 申报清单")} · {AMD_FILINGS.length}
          </summary>
          <div className="mt-4 max-h-[560px] overflow-y-auto">
            <Table
              headers={[
                t("Form", "表格"),
                t("Filed", "申报日"),
                t("Report date", "报告日"),
                t("Accession", "申报号"),
                t("Source", "来源"),
              ]}
              rows={[...AMD_FILINGS]
                .reverse()
                .map((f) => [
                  f.form,
                  f.filed,
                  f.end || "N/A",
                  f.accessionNumber,
                  link(f.source, t("Open filing", "打开申报")),
                ])}
            />
          </div>
        </details>
        <details className="border-t border-zinc-300 py-5">
          <summary className="cursor-pointer font-semibold">
            {t("Latest-quarter field provenance", "最新季度逐字段出处")}
          </summary>
          <div className="mt-4">
            <Table
              headers={[
                t("Field", "字段"),
                t("Tag/method", "标签 / 方法"),
                t("Unit", "单位"),
                t("Filed", "申报日"),
                t("Source", "来源"),
              ]}
              rows={Object.entries(quarter.provenance).map(([key, v]) => [
                key,
                v?.tag ?? v?.method ?? "N/A",
                v?.unit ?? "N/A",
                v?.filed ?? "N/A",
                v?.source ? link(v.source, t("Source", "来源")) : "N/A",
              ])}
            />
          </div>
        </details>
        <h3 className="mb-3 mt-7 font-semibold">
          {t("Source system and chart inventory", "来源系统与图表清单")}
        </h3>
        <p className="text-sm leading-7 text-zinc-600">
          {t(
            "SEC submissions/companyfacts supply filing and GAAP tables; issuer releases supply curated segment and reconciliation evidence; Yahoo daily closes supply market history. Regeneration and financial tests are versioned with the report. Unknown metrics are never replaced with zero.",
            "SEC submissions/companyfacts 提供申报及 GAAP 表；公司公告提供人工核验分部和勾稽；Yahoo 日线提供价格。再生成及财务测试与报告一起版本化。未知指标不填零。",
          )}
        </p>
        <ul className="mt-3 grid list-inside list-disc gap-2 text-xs text-zinc-500 sm:grid-cols-2">
          {AMD_CHART_GROUPS.map((g) => (
            <li key={g}>{g.split(" / ")[zh ? 1 : 0]}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
