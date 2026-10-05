import type { ReactNode } from "react";
import { MU_ANNUAL, type FinancialRow } from "./annualFinancials";
import { MU_QUARTERLY } from "./quarterlyFinancials";
import { MU_FILINGS } from "./filings";
import { MU_RELEASE as release } from "./operatingMetrics";
import {
  MU_SOURCES,
  MU_CASH_BRIDGE,
  MU_ECONOMICS,
  MU_RISKS,
} from "./memoryEconomics";
import {
  MU_LATEST_PRICE as price,
  MU_VALUATION_HISTORY,
  MU_PRICE_SOURCE,
} from "./valuationHistory";
import {
  MU_ASSUMPTIONS,
  MU_FORECASTS,
  MU_DCF_CASES,
  MU_SENSITIVITY,
  MU_MARGIN_SENSITIVITY,
  MU_MODEL_INPUTS as input,
  type Scenario,
} from "./forecastModel";
import { MU_REPORT } from "./reportContent";
import { MU_CHART_GROUPS, MU_RESEARCH_NOTE } from "./researchPlan";
import { MU_AUDIT } from "./sourceAudit";
import { MU_QA } from "./publicationQa";
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
                className="border-b border-zinc-300 px-3 py-3 font-semibold dark:border-zinc-700"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={i}
              className="border-b border-zinc-200 dark:border-zinc-800"
            >
              {r.map((c, j) => (
                <td key={j} className="px-3 py-2.5 tabular-nums">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function Bars({
  title,
  rows,
  unit = "USD B",
}: {
  title: string;
  rows: { label: string; value: number | null }[];
  unit?: string;
}) {
  const max = Math.max(1, ...rows.map((r) => Math.abs(r.value ?? 0)));
  return (
    <figure
      className="min-w-0 border-t border-zinc-300 pt-4 dark:border-zinc-700"
      aria-label={`${title} ${unit}`}
    >
      <figcaption className="mb-4 font-semibold">
        {title}{" "}
        <span className="text-xs font-normal text-zinc-500">{unit}</span>
      </figcaption>
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div
            key={i}
            className="grid grid-cols-[5rem_minmax(0,1fr)_5rem] items-center gap-2 text-xs"
          >
            <span className="break-words">{r.label}</span>
            <div className="h-3 bg-zinc-100 dark:bg-zinc-800">
              <div
                className={`h-3 ${r.value != null && r.value < 0 ? "bg-rose-600" : "bg-emerald-600"}`}
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
export default function MicronResearchView({
  chinese = false,
}: {
  chinese?: boolean;
}) {
  const t = (en: string, zh: string) => (chinese ? zh : en),
    lang = chinese ? "zh" : "en";
  const source = (url: string, label = t("Source", "来源")) => (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="underline underline-offset-4"
    >
      {label}
    </a>
  );
  const scenarios: Scenario[] = ["bear", "base", "bull"];
  const name = (s: Scenario) =>
    ({
      bear: t("Bear", "悲观"),
      base: t("Base", "基准"),
      bull: t("Bull", "乐观"),
    })[s];
  const section =
    "space-y-5 border-t border-zinc-200 pt-8 dark:border-zinc-800";
  const a = MU_ANNUAL.at(-1)!,
    q = MU_QUARTERLY.at(-1)!;
  const financialTable = (rows: FinancialRow[]) => (
    <Table
      headers={[
        t("Fiscal period", "财年期间"),
        t("Period end", "期末"),
        t("Revenue", "收入"),
        t("Gross profit", "毛利"),
        "EBIT",
        t("Net income", "净利润"),
        "EPS (USD)",
        "OCF",
        t("Gross cash PP&E", "现金固定资产总额"),
        "FCF",
        t("Op margin", "营业利润率"),
        t("Basis", "口径"),
        t("Source", "来源"),
      ]}
      rows={rows.map((r) => [
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
        pct(r.operatingMargin),
        r.form === "8-K exhibit"
          ? t("Unaudited release", "未经审计公告")
          : r.quarter === 4
            ? t("Derived Q4", "差分 Q4")
            : t("Filed GAAP", "已申报 GAAP"),
        source(r.source),
      ])}
    />
  );
  const annualChart = (key: keyof FinancialRow) =>
    MU_ANNUAL.map((r) => ({
      label: `${r.year}`,
      value: r[key] == null ? null : (r[key] as number) / 1e9,
    }));
  const chartMargin = MU_ANNUAL.map((r) => ({
    label: `${r.year}`,
    value: r.operatingMargin,
  }));
  return (
    <main
      data-company="mu"
      lang={chinese ? "zh-CN" : "en"}
      className="mx-auto w-full max-w-7xl min-w-0 space-y-10 px-4 py-10 text-zinc-900 sm:px-6 lg:px-8 dark:text-zinc-100"
    >
      <header className="space-y-6">
        <nav
          aria-label={t("Research navigation", "研究导航")}
          className="flex flex-wrap gap-4 text-sm underline underline-offset-4"
        >
          <a href="/research" data-testid="mu-library">
            {t("Research library", "研究库")}
          </a>
          <a
            href="/research/micron-complete-fundamental-analysis"
            data-testid="mu-english"
            aria-current={!chinese ? "page" : undefined}
          >
            English
          </a>
          <a
            href="/research/micron-complete-fundamental-analysis/zh"
            data-testid="mu-chinese"
            aria-current={chinese ? "page" : undefined}
          >
            中文
          </a>
        </nav>
        <div className="space-y-3">
          <p className="text-sm text-emerald-700 dark:text-emerald-400">
            {t(
              "NASDAQ: MU · Independent fundamental research",
              "NASDAQ: MU · 独立基本面研究",
            )}
          </p>
          <h1 className="break-words text-4xl font-bold sm:text-5xl">
            {t("Micron (MU)", "美光（MU）")}
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-300">
            {t("Complete Fundamental Analysis", "完整基本面研究")}
          </p>
        </div>
        <p className="max-w-4xl text-sm leading-7 text-zinc-600 dark:text-zinc-300">
          {MU_RESEARCH_NOTE[lang]}
        </p>
        <dl className="grid grid-cols-2 gap-6 border-y border-zinc-200 py-6 md:grid-cols-4 dark:border-zinc-800">
          {[
            [t("Close · Oct 2", "收盘 · 10 月 2 日"), `$${num(price.close)}`],
            [
              t("FY2026 revenue · USD B", "2026 财年收入 · 十亿美元"),
              bn(a.revenue),
            ],
            [
              t("Q4 GAAP operating margin", "第四季度 GAAP 营业利润率"),
              pct(q.operatingMargin),
            ],
            [
              t(
                "FY2026 gross-capex FCF · USD B",
                "2026 财年总支出口径 FCF · 十亿美元",
              ),
              bn(a.freeCashFlow),
            ],
          ].map(([label, value]) => (
            <div key={label} className="min-w-0">
              <dt className="mb-2 text-xs leading-5 text-zinc-500">{label}</dt>
              <dd className="break-words text-xl font-semibold tabular-nums">
                {value}
              </dd>
            </div>
          ))}
        </dl>
        <nav
          aria-label={t("Contents", "目录")}
          className="flex flex-wrap gap-x-5 gap-y-3 text-sm underline underline-offset-4"
        >
          {[
            ["report", t("Report", "报告")],
            ["charts", t("Charts", "图表")],
            ["forecast", t("Forecast & DCF", "预测与 DCF")],
            ["valuation", t("Valuation history", "历史估值")],
            ["operations", t("Operations", "经营指标")],
            ["annual", t("Annual financials", "年度财务")],
            ["quarterly", t("Quarterly financials", "季度财务")],
            ["audit", t("Sources & QA", "来源与核验")],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} data-testid={`mu-nav-${id}`}>
              {label}
            </a>
          ))}
        </nav>
      </header>
      <section id="report" className={`${section} scroll-mt-32`}>
        <h2 className="text-2xl font-semibold">
          {t("Investment report", "投资研究报告")}
        </h2>
        <div className="max-w-4xl space-y-8">
          {MU_REPORT.map((r) => (
            <article key={r.titleEn} className="space-y-3">
              <h3 className="text-lg font-semibold">
                {chinese ? r.titleZh : r.titleEn}
              </h3>
              <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300">
                {r[lang]}
              </p>
              <p className="text-xs text-zinc-500">{source(r.source)}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="charts" className={`${section} scroll-mt-32`}>
        <h2 className="text-2xl font-semibold">
          {t("Chart dashboard", "图表看板")}
        </h2>
        <p className="text-sm text-zinc-500">
          {t(
            "Latest fiscal year includes unaudited release data; red bars denote negative values.",
            "最新财年含未经审计公告数据，红色条形为负值。",
          )}
        </p>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          <Bars
            title={t("Annual revenue", "年度收入")}
            rows={annualChart("revenue")}
          />
          <Bars
            title={t("Annual net income", "年度净利润")}
            rows={annualChart("netIncome")}
          />
          <Bars
            title={t("Operating margin", "营业利润率")}
            rows={chartMargin}
            unit="%"
          />
          <Bars
            title={t("Gross cash capex", "总现金资本支出")}
            rows={annualChart("capex")}
          />
          <Bars
            title={t("Gross-capex FCF", "总资本支出口径 FCF")}
            rows={annualChart("freeCashFlow")}
          />
          <Bars
            title={t("Year-end inventory", "年末存货")}
            rows={annualChart("inventory")}
          />
          <Bars
            title={t("Latest quarterly revenue", "最新季度收入")}
            rows={MU_QUARTERLY.slice(-12).map((r) => ({
              label: r.period,
              value: r.revenue == null ? null : r.revenue / 1e9,
            }))}
          />
          <Bars
            title={t("Q4 business-unit revenue", "第四季度业务收入")}
            rows={release.segments.map((r) => ({
              label: chinese ? r.zh : r.name,
              value: r.q4Revenue / 1000,
            }))}
          />
          <Bars
            title={t(
              "Q4 business-unit operating margin",
              "第四季度业务营业利润率",
            )}
            rows={release.segments.map((r) => ({
              label: chinese ? r.zh : r.name,
              value: r.operatingMargin,
            }))}
            unit="%"
          />
          <Bars
            title={t("Base forecast FCFF", "基准企业现金流预测")}
            rows={MU_FORECASTS.base.map((r) => ({
              label: `${r.year}`,
              value: r.fcff,
            }))}
          />
          <Bars
            title={t("DCF scenario values", "DCF 情景价值")}
            rows={scenarios.map((s) => ({
              label: name(s),
              value: MU_DCF_CASES[s].valuePerShare,
            }))}
            unit="USD/share"
          />
          <Bars
            title={t("Fiscal-end P/E", "财年末市盈率")}
            rows={MU_VALUATION_HISTORY.map((r) => ({
              label: `${r.year}`,
              value: r.priceToEarnings,
            }))}
            unit="×"
          />
        </div>
      </section>
      <section id="forecast" className={`${section} scroll-mt-32`}>
        <h2 className="text-2xl font-semibold">
          {t("Ten-year forecast and enterprise DCF", "十年预测与企业 DCF")}
        </h2>
        <p className="max-w-5xl text-sm leading-7">
          {t(
            "Analyst scenarios, not company guidance. FCFF = EBIT after assumed operating tax + total D&A − gross cash capex − incremental working capital − new finance-leased asset investment (0.2% of revenue). Reported debt includes finance leases and is deducted once; financing principal and interest are not FCFF expenses. Operating rent and SBC remain in EBIT. No recurring subsidies, debt issuance, customer-deposit financing, dividends or buybacks in FCFF. Incremental working capital is 10% of revenue change, excluding customer deposits; a downturn mechanically releases working capital, which may be delayed in reality. FY2027 cash is discounted to an assumed September 2 year end from October 4, 2026. Terminal cash and leased-asset reinvestment remain above D&A. Fiscal-year timing, contract delivery and extreme disruptions require judgment outside this deterministic model.",
            "分析师情景，不是公司指引。企业现金流＝假设经营税率后的 EBIT＋总折旧摊销－总现金资本支出－增量营运资本－新增融资租赁资产投资（收入的 0.2%）。报告债务含融资租赁且只扣一次，融资本金和利息不作为企业现金流费用。经营租金与股权薪酬留在 EBIT 中。不计持续补贴、发债、客户存款融资、股息或回购。增量营运资本为收入变化的 10%，不含客户存款；下行时机械释放营运资金，但实际可能延迟。2027 财年现金从 2026 年 10 月 4 日折现至假设 9 月 2 日财年末，永续现金及租赁资产再投资仍高于折旧。财年时点、合同交付及极端中断仍需模型之外判断。",
          )}
        </p>
        <h3 className="font-semibold">
          {t("Scenario assumptions · USD B", "情景假设 · 十亿美元")}
        </h3>
        <Table
          headers={[t("Assumption", "假设"), ...scenarios.map(name)]}
          rows={[
            [
              t("FY2027 revenue", "2027 财年收入"),
              ...scenarios.map((s) => num(MU_ASSUMPTIONS[s].revenue[0])),
            ],
            [
              t("FY2036 revenue", "2036 财年收入"),
              ...scenarios.map((s) => num(MU_ASSUMPTIONS[s].revenue[9])),
            ],
            [
              t("FY2027 / terminal operating margin", "2027 / 永续营业利润率"),
              ...scenarios.map(
                (s) =>
                  `${pct(MU_ASSUMPTIONS[s].margins[0] * 100)} / ${pct(MU_ASSUMPTIONS[s].margins[9] * 100)}`,
              ),
            ],
            [
              t("FY2027 / FY2036 gross capex", "2027 / 2036 总资本支出"),
              ...scenarios.map(
                (s) =>
                  `${num(MU_ASSUMPTIONS[s].capex[0])} / ${num(MU_ASSUMPTIONS[s].capex[9])}`,
              ),
            ],
            [
              t("Tax rate", "税率"),
              ...scenarios.map((s) => pct(MU_ASSUMPTIONS[s].tax * 100)),
            ],
            [
              t("WACC / terminal growth", "折现率 / 永续增长率"),
              ...scenarios.map(
                (s) =>
                  `${pct(MU_ASSUMPTIONS[s].wacc * 100)} / ${pct(MU_ASSUMPTIONS[s].growth * 100)}`,
              ),
            ],
          ]}
        />
        <h3 className="font-semibold">
          {t(
            "DCF results · USD B except share values",
            "DCF 结果 · 除每股值外十亿美元",
          )}
        </h3>
        <Table
          headers={[
            t("Case", "情景"),
            t("Cash PV", "现金现值"),
            t("Terminal PV", "终值现值"),
            "EV",
            t("Equity", "权益"),
            "USD/share",
            t("Vs Oct 2 close", "相对 10 月 2 日收盘"),
            t("Terminal weight", "终值占比"),
          ]}
          rows={scenarios.map((s) => {
            const c = MU_DCF_CASES[s];
            return [
              name(s),
              num(c.pvCash),
              num(c.pvTerminal),
              num(c.enterpriseValue),
              num(c.equityValue),
              num(c.valuePerShare),
              pct(c.upside),
              pct(c.terminalWeight),
            ];
          })}
        />
        <p className="text-sm leading-7">
          {t(
            "Equity bridge (September 3 balances, USD B):",
            "权益桥（9 月 3 日余额，十亿美元）：",
          )}{" "}
          +{num(input.cash, 3)} {t("cash", "现金")} +{num(input.securities, 3)}{" "}
          {t("current securities", "短期投资")} −{num(input.debt, 3)}{" "}
          {t("debt", "债务")} −{num(input.contractReserve, 3)}{" "}
          {t("noncurrent contract reserve", "非流动合同保留")} /{" "}
          {num(input.shares, 3)}B{" "}
          {t("Q4 diluted-share proxy", "第四季度稀释股数代理")}.{" "}
          {t(
            "Long-term securities are excluded. The contract reserve is an analyst convention, not legal debt; removing it increases every case by",
            "排除长期投资。合同保留是分析师约定，不是法律债务；取消保留使各情景每股增加",
          )}{" "}
          ${num(input.contractReserve / input.shares)}.{" "}
          {source(MU_SOURCES.release)}
        </p>
        <h3 className="font-semibold">
          {t(
            "Base value: WACC × terminal growth",
            "基准价值：折现率 × 永续增长率",
          )}
        </h3>
        <Table
          headers={["WACC", "g = 2%", "g = 3%", "g = 4%"]}
          rows={MU_SENSITIVITY.map((r) => [
            pct(r.wacc * 100),
            ...r.values.map((v) => `$${num(v)}`),
          ])}
        />
        <h3 className="font-semibold">
          {t(
            "Base value: terminal operating margin",
            "基准价值：永续营业利润率",
          )}
        </h3>
        <Table
          headers={[t("Terminal margin", "永续利润率"), "USD/share"]}
          rows={MU_MARGIN_SENSITIVITY.map((r) => [
            pct(r.margin * 100),
            num(r.value),
          ])}
        />
        {scenarios.map((s) => (
          <details
            key={s}
            open={s === "base"}
            className="border-t border-zinc-200 pt-4 dark:border-zinc-800"
          >
            <summary className="cursor-pointer font-semibold">
              {name(s)} · 2027–2036 ·{" "}
              {t("Operating forecast, USD B", "经营预测，十亿美元")}
            </summary>
            <div className="pt-4">
              <Table
                headers={[
                  t("Fiscal year", "财年"),
                  t("Revenue", "收入"),
                  t("Growth", "增长"),
                  "EBIT",
                  "NOPAT",
                  "D&A",
                  t("Gross capex", "总资本支出"),
                  t("Δ working capital", "增量营运资本"),
                  t("New leased assets", "新增租赁资产"),
                  "FCFF",
                  t("FCFF margin", "企业现金率"),
                ]}
                rows={MU_FORECASTS[s].map((r) => [
                  r.year,
                  num(r.revenue),
                  pct(r.growth),
                  num(r.operatingIncome),
                  num(r.nopat),
                  num(r.depreciation),
                  num(r.capex),
                  num(r.workingCapital),
                  num(r.leasedAssets),
                  num(r.fcff),
                  pct(r.fcffMargin),
                ])}
              />
            </div>
          </details>
        ))}
      </section>
      <section id="valuation" className={`${section} scroll-mt-32`}>
        <h2 className="text-2xl font-semibold">
          {t("Historical valuation context", "历史估值背景")}
        </h2>
        <p className="text-sm leading-7">
          {t(
            "Fiscal-end prices × actual fiscal-end ordinary shares where disclosed, not diluted weighted averages. Annual flow ratios use subsequently available comparable GAAP facts: ex-post context, not a historical tradeable backtest. P/E is N/A in loss years. Historical EV subtracts cash only and uses known reported debt; it is not an exhaustive lease, security or mezzanine-equity adjustment. FY2026 ratios remain unavailable without an actual fiscal-end share count.",
            "财年末价格乘披露的实际期末普通股股数，不使用加权稀释股数。年度倍数使用随后可得同期间 GAAP 数据，属于事后背景，不是历史可交易回测。亏损年度市盈率为 N/A。历史 EV 仅扣现金并使用已知债务，不完整调整租赁、有价证券或夹层权益。2026 财年末实际股数缺失，对应倍数不提供。",
          )}
        </p>
        <Table
          headers={[
            t("Fiscal year", "财年"),
            t("Close date", "价格日期"),
            "USD/share",
            t("Shares · B", "股数 · 十亿"),
            t("Market cap · USD B", "市值 · 十亿美元"),
            "EV · USD B",
            "P/S",
            "P/E",
            "EV/Sales",
            t("FCF yield", "FCF 收益率"),
          ]}
          rows={MU_VALUATION_HISTORY.map((r) => [
            r.year,
            r.date,
            num(r.close),
            r.shares == null ? "N/A" : num(r.shares / 1e9, 4),
            bn(r.marketCap),
            bn(r.enterpriseValue),
            num(r.priceToSales),
            num(r.priceToEarnings),
            num(r.evToSales),
            pct(r.fcfYield),
          ])}
        />
        <p className="text-xs text-zinc-500">
          {source(
            MU_PRICE_SOURCE,
            t(
              "Split-adjusted price data (not dividend-adjusted)",
              "拆股调整价格（非股息复权）",
            ),
          )}
        </p>
      </section>
      <section id="operations" className={`${section} scroll-mt-32`}>
        <h2 className="text-2xl font-semibold">
          {t("Operating metrics and memory economics", "经营指标与存储经济")}
        </h2>
        <h3 className="font-semibold">
          {t(
            "Q4 business units · USD B, reported rounded margins",
            "第四季度业务单位 · 十亿美元，披露舍入利润率",
          )}
        </h3>
        <Table
          headers={[
            t("Business unit", "业务单位"),
            t("Q4 revenue", "Q4 收入"),
            t("Q3 revenue", "Q3 收入"),
            t("Prior Q4", "上年 Q4"),
            t("Gross margin", "毛利率"),
            t("Op margin", "营业利润率"),
          ]}
          rows={release.segments.map((r) => [
            chinese ? r.zh : r.name,
            num(r.q4Revenue / 1000, 3),
            num(r.q3Revenue / 1000, 3),
            num(r.priorQ4Revenue / 1000, 3),
            pct(r.grossMargin),
            pct(r.operatingMargin),
          ])}
        />
        <p className="text-xs text-zinc-500">
          {t(
            "Revenue gap to consolidated Q4: $6M; segment margins are rounded and not used to reconstruct exact consolidated EBIT.",
            "与合并第四季度收入差额为 600 万美元，分部利润率有舍入，不用于精确重建合并 EBIT。",
          )}{" "}
          {source(release.source)}
        </p>
        <h3 className="font-semibold">
          {t(
            "Cash investment reconciliation · USD B",
            "现金投资勾稽 · 十亿美元",
          )}
        </h3>
        <Table
          headers={[
            t("Period", "期间"),
            "OCF",
            t("Gross capex", "总资本支出"),
            t("Asset sale receipts", "资产出售收款"),
            t("Incentives", "补贴"),
            t("Net investment", "净投资"),
            t("Gross-capex FCF", "总资本支出口径 FCF"),
            t("Issuer adjusted FCF", "公司调整后 FCF"),
          ]}
          rows={MU_CASH_BRIDGE.map((r) => [
            r.period,
            num(r.operatingCash, 3),
            num(r.grossCapex, 3),
            num(r.sales, 3),
            num(r.incentives, 3),
            num(r.netCapex, 3),
            num(r.grossFcf, 3),
            num(r.adjustedFcf, 3),
          ])}
        />
        <h3 className="font-semibold">
          {t(
            "FY2027 Q1 management guidance, not actual results",
            "2027 财年第一季度管理层指引，非实际结果",
          )}
        </h3>
        <Table
          headers={[t("Metric", "指标"), t("GAAP guidance", "GAAP 指引")]}
          rows={[
            [
              t("Revenue · USD B", "收入 · 十亿美元"),
              `${num(release.guidance.revenueLow / 1000)}–${num(release.guidance.revenueHigh / 1000)}`,
            ],
            [
              t("Gross margin", "毛利率"),
              `${num(release.guidance.gaapGrossMargin, 2)}%`,
            ],
            [
              t("Operating expenses · USD B", "经营费用 · 十亿美元"),
              num(release.guidance.gaapOperatingExpenses / 1000),
            ],
            [
              "EPS (USD)",
              `${num(release.guidance.gaapEpsLow)}–${num(release.guidance.gaapEpsHigh)}`,
            ],
          ]}
        />
        <div className="grid gap-6 md:grid-cols-2">
          {MU_ECONOMICS.map((r) => (
            <div
              key={r.en}
              className="space-y-2 border-t border-zinc-200 pt-4 dark:border-zinc-800"
            >
              <h3 className="font-semibold">{chinese ? r.zh : r.en}</h3>
              <p className="text-sm leading-7">
                {chinese ? r.zhNote : r.enNote}
              </p>
              <p className="text-xs text-zinc-500">{source(r.source)}</p>
            </div>
          ))}
        </div>
        <h3 className="font-semibold">{t("Risk monitors", "风险观察")}</h3>
        <div className="grid gap-6 md:grid-cols-2">
          {MU_RISKS.map((r) => (
            <div key={r.en} className="space-y-2">
              <h4 className="font-semibold">{chinese ? r.zh : r.en}</h4>
              <p className="text-sm leading-7">
                {chinese ? r.zhNote : r.enNote}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section id="annual" className={`${section} scroll-mt-32`}>
        <h2 className="text-2xl font-semibold">
          {t("Annual financial database", "年度财务数据库")}
        </h2>
        <p className="text-sm leading-7">
          {t(
            "FY2011–2026; USD B except EPS. FY2026 is unaudited release data. FCF = OCF − gross cash PP&E; it is not issuer adjusted FCF or forecast FCFF. ROE uses parent equity at year end, not average equity.",
            "2011—2026 财年，除 EPS 外以十亿美元计，2026 财年为未经审计公告。FCF＝经营现金－总现金固定资产购建，不是公司调整后 FCF 或预测企业现金流。ROE 使用年末母公司权益而非平均权益。",
          )}
        </p>
        {financialTable(MU_ANNUAL)}
        <details>
          <summary className="cursor-pointer font-semibold">
            {t(
              "Balance sheet, reinvestment and returns",
              "资产负债表、再投资与回报",
            )}
          </summary>
          <div className="space-y-4 pt-4">
            <p className="text-xs leading-6">
              {t(
                "Original filing balance contexts avoid mixing restated balance fields. Outside-equity balance is an arithmetic residual, not a reconstructed debt amount. Some older years include redeemable instruments outside reported liabilities/equity.",
                "原申报余额上下文避免混用重述字段。权益外余额为算术差额，不是重建的债务金额，部分较早年度在报告负债及权益之外列示可赎回工具。",
              )}
            </p>
            <Table
              headers={[
                t("Fiscal year", "财年"),
                t("Cash", "现金"),
                t("Current investments", "短期投资"),
                t("Assets", "资产"),
                t("Liabilities", "负债"),
                t("Parent equity", "母公司权益"),
                t("Total equity", "总权益"),
                t("Outside-equity balance", "权益外余额"),
                t("Debt", "债务"),
                t("Inventory", "库存"),
                t("Receivables", "应收"),
                "D&A",
                "SBC",
                "ROE",
              ]}
              rows={MU_ANNUAL.map((r) => [
                r.year,
                bn(r.cash),
                bn(r.securities),
                bn(r.assets),
                bn(r.liabilities),
                bn(r.equity),
                bn(r.totalEquity),
                bn(r.balanceOutsideEquity),
                bn(r.debt),
                bn(r.inventory),
                bn(r.receivables),
                bn(r.depreciation),
                bn(r.stockComp),
                pct(r.roe),
              ])}
            />
          </div>
        </details>
        <details>
          <summary className="cursor-pointer font-semibold">
            {t("Field-level provenance", "逐字段来源")}
          </summary>
          <div className="pt-4">
            <Table
              headers={[
                t("Period", "期间"),
                t("Field", "字段"),
                t("Tag / method", "标签 / 方法"),
                t("Filed", "申报日期"),
                t("Unit", "单位"),
                t("Source", "来源"),
              ]}
              rows={MU_ANNUAL.flatMap((r) =>
                Object.entries(r.provenance)
                  .filter(([, v]) => v != null)
                  .map(([key, v]) => [
                    r.period,
                    key,
                    v?.tag ?? v?.method,
                    v?.filed,
                    v?.unit,
                    v?.source ? source(v.source) : "N/A",
                  ]),
              )}
            />
          </div>
        </details>
      </section>
      <section id="quarterly" className={`${section} scroll-mt-32`}>
        <h2 className="text-2xl font-semibold">
          {t("Quarterly financial database", "季度财务数据库")}
        </h2>
        <p className="text-sm leading-7">
          {t(
            "64 fiscal quarters. Cash flows are direct quarter facts or complete YTD differences. Q4 flow metrics are annual minus Q1–Q3; historical derived Q4 EPS stays N/A. FY2026 Q4 is directly disclosed in the unaudited release. Prior financial facts may reflect later comparative filings, not original announcement data.",
            "64 个财季。现金流为直接季度事实或完整年初至今差分，第四季度流量为全年减前三季度。历史差分 Q4 EPS 保持 N/A；2026 财年第四季度直接采用未经审计公告。历史字段可能反映后续对比申报，不是原始公告时点数据。",
          )}
        </p>
        {financialTable(MU_QUARTERLY.slice(-12))}
        <details>
          <summary className="cursor-pointer font-semibold">
            {t("Full quarterly history", "完整季度历史")}
          </summary>
          <div className="pt-4">{financialTable(MU_QUARTERLY)}</div>
        </details>
      </section>
      <section id="audit" className={`${section} scroll-mt-32`}>
        <h2 className="text-2xl font-semibold">
          {t("Source audit and publication QA", "来源审计与发布核验")}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {MU_AUDIT.map((r) => (
            <div key={r.area} className="space-y-2">
              <h3 className="font-semibold">
                {r.area} · {r.status}
              </h3>
              <p className="text-sm leading-7">{r[lang]}</p>
              <p className="text-xs text-zinc-500">{source(r.source)}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {MU_QA.map((r) => (
            <div
              key={r.area}
              className="space-y-2 border-t border-zinc-200 pt-4 dark:border-zinc-800"
            >
              <h3 className="font-semibold">
                {r.area} · {r.status}
              </h3>
              <p className="text-sm leading-7">{r[lang]}</p>
            </div>
          ))}
        </div>
        <details>
          <summary className="cursor-pointer font-semibold">
            {t("Research structure and chart inventory", "研究结构与图表目录")}
          </summary>
          <ul className="mt-4 space-y-2 text-sm">
            {MU_CHART_GROUPS.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            {source(MU_SOURCES.annual, "FY2025 10-K")} ·{" "}
            {source(MU_SOURCES.quarter, "FY2026 Q3 10-Q")} ·{" "}
            {source(MU_SOURCES.release, "FY2026 release")} ·{" "}
            {source(
              MU_SOURCES.ir,
              t("Issuer quarterly archive", "发行人季度存档"),
            )}
          </p>
        </details>
        <details>
          <summary className="cursor-pointer font-semibold">
            {t("SEC filing inventory", "SEC 文件目录")} ({MU_FILINGS.length})
          </summary>
          <div className="pt-4">
            <Table
              headers={[
                t("Form", "表格"),
                t("Filed", "申报日期"),
                t("Reported end", "报告日期"),
                t("Accession", "编号"),
                t("Source", "来源"),
              ]}
              rows={[...MU_FILINGS]
                .reverse()
                .map((r) => [
                  r.form,
                  r.filed,
                  r.end,
                  r.accessionNumber,
                  source(r.source),
                ])}
            />
          </div>
        </details>
        <p className="text-xs leading-6 text-zinc-500">
          {t(
            "Independent research, not personalized investment advice. Forecasts are scenarios, not promises. Data cutoff: October 4, 2026.",
            "独立研究，非个性化投资建议。预测为情景而非承诺，数据截止 2026 年 10 月 4 日。",
          )}
        </p>
      </section>
    </main>
  );
}
