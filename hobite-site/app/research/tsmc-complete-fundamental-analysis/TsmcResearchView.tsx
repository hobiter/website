import type { ReactNode } from "react";
import { TSM_ANNUAL } from "./annualFinancials";
import {
  TSM_QUARTERLY,
  TSM_TTM,
  TSM_QUARTER_SOURCES,
} from "./quarterlyFinancials";
import { TSM_FILINGS } from "./filings";
import {
  TSM_SOURCES,
  TSM_OPERATING as op,
  TSM_GUIDANCE,
  TSM_NODES,
  TSM_PLATFORMS,
  TSM_MONTHLY,
  TSM_MONTHLY_NOTE,
} from "./operatingMetrics";
import {
  TSM_CONCENTRATION,
  TSM_ECONOMICS,
  TSM_RISKS,
} from "./foundryEconomics";
import {
  TSM_LATEST_PRICE,
  TSM_TAIWAN_PRICE,
  TSM_VALUATION_HISTORY,
  TSM_PRICE_SOURCES,
} from "./valuationHistory";
import {
  TSM_ASSUMPTIONS,
  TSM_FORECASTS,
  TSM_MODEL_INPUTS,
  TSM_DCF_CASES,
  TSM_SENSITIVITY,
  TSM_FX_SENSITIVITY,
  TSM_MODEL_NOTE,
  type Scenario,
} from "./forecastModel";
import { TSM_REPORT } from "./reportContent";
import { TSM_RESEARCH_NOTE, TSM_CHART_GROUPS } from "./researchPlan";
import { TSM_AUDIT } from "./sourceAudit";
import { TSM_QA } from "./publicationQa";
const num = (v: number | null | undefined, d = 2) =>
  v == null
    ? "N/A"
    : v.toLocaleString("en-US", {
        minimumFractionDigits: d,
        maximumFractionDigits: d,
      });
const bn = (v: number | null | undefined) =>
  v == null ? "N/A" : num(v / 1e9, 3);
const pct = (v: number | null | undefined) =>
  v == null ? "N/A" : `${num(v, 1)}%`;
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
  unit = "NTD B",
}: {
  title: string;
  rows: { label: string; value: number | null }[];
  unit?: string;
}) {
  const max = Math.max(1, ...rows.map((r) => Math.abs(r.value ?? 0)));
  return (
    <figure className="min-w-0 border-t border-zinc-300 pt-4 dark:border-zinc-700">
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
            <span>{r.label}</span>
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
export default function TsmcResearchView({
  chinese = false,
}: {
  chinese?: boolean;
}) {
  const t = (en: string, zh: string) => (chinese ? zh : en),
    locale = chinese ? "zh" : "en";
  const source = (url: string, label = t("Source", "来源")) => (
    <a
      className="underline underline-offset-4"
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      {label}
    </a>
  );
  const cases: Scenario[] = ["bear", "base", "bull"];
  const caseName = (s: Scenario) =>
    ({
      bear: t("Bear", "悲观"),
      base: t("Base", "基准"),
      bull: t("Bull", "乐观"),
    })[s];
  const sectionClass =
    "space-y-5 border-t border-zinc-200 pt-8 dark:border-zinc-800";
  const financialTable = (
    rows: {
      period: string;
      revenue: number | null;
      grossProfit: number | null;
      operatingIncome: number | null;
      netIncome: number | null;
      dilutedEps: number | null;
      operatingCashFlow: number | null;
      capex: number | null;
      freeCashFlow: number | null;
      operatingMargin: number | null;
      source: string | null;
    }[],
  ) => (
    <Table
      headers={[
        t("Period", "期间"),
        t("Revenue", "收入"),
        t("Gross profit", "毛利"),
        t("Operating profit", "营业利润"),
        t("Parent net income", "归母净利"),
        "EPS (NTD)",
        t("Operating cash", "经营现金"),
        t("Cash PP&E", "现金固定资产购建"),
        "FCF",
        t("Op margin", "营业利润率"),
        t("Source", "来源"),
      ]}
      rows={rows.map((r) => [
        r.period,
        bn(r.revenue),
        bn(r.grossProfit),
        bn(r.operatingIncome),
        bn(r.netIncome),
        num(r.dilutedEps),
        bn(r.operatingCashFlow),
        bn(r.capex),
        bn(r.freeCashFlow),
        pct(r.operatingMargin),
        r.source ? source(r.source) : "N/A",
      ])}
    />
  );
  return (
    <main
      data-company="tsm"
      lang={chinese ? "zh-Hans" : "en"}
      className="mx-auto w-full min-w-0 max-w-7xl space-y-10 bg-white px-4 py-10 text-zinc-900 sm:px-8 dark:bg-zinc-950 dark:text-zinc-100 [&_h2]:text-2xl [&_h2]:font-semibold [&_section]:scroll-mt-32"
    >
      <header className="space-y-5">
        <nav
          className="flex flex-wrap gap-4 text-sm"
          aria-label={t("Research navigation", "研究导航")}
        >
          <a href="/research" className="underline">
            {t("Research library", "研究库")}
          </a>
          <a
            href="/research/tsmc-complete-fundamental-analysis"
            className="underline"
            aria-current={!chinese ? "page" : undefined}
          >
            English
          </a>
          <a
            href="/research/tsmc-complete-fundamental-analysis/zh"
            className="underline"
            aria-current={chinese ? "page" : undefined}
          >
            中文
          </a>
        </nav>
        <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
          TSM · TWSE: 2330 ·{" "}
          {t("Independent fundamental research", "独立基本面研究")}
        </p>
        <h1 className="break-words text-4xl font-semibold sm:text-5xl">
          {t("TSMC (TSM)", "台积电（TSM）")}
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          {t("Complete Fundamental Analysis", "完整基本面研究")}
        </p>
        <p className="max-w-4xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">
          {TSM_RESEARCH_NOTE[locale]}
        </p>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-y border-zinc-200 py-6 sm:grid-cols-4 dark:border-zinc-800">
          {[
            [
              t("ADS close · Oct 2", "ADS 收盘 · 10 月 2 日"),
              `$${num(TSM_LATEST_PRICE.close)}`,
            ],
            [
              t("Q2 revenue · NTD B", "第二季度收入 · 十亿新台币"),
              bn(TSM_QUARTERLY.at(-1)!.revenue),
            ],
            [
              t("Q2 operating margin", "第二季度营业利润率"),
              pct(TSM_QUARTERLY.at(-1)!.operatingMargin),
            ],
            [
              t("TTM FCF · NTD B", "滚动四季 FCF · 十亿新台币"),
              bn(TSM_TTM.freeCashFlow),
            ],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs text-zinc-500">{label}</dt>
              <dd className="mt-2 break-words text-2xl font-semibold tabular-nums">
                {value}
              </dd>
            </div>
          ))}
        </dl>
        <nav
          aria-label={t("Contents", "目录")}
          className="flex flex-wrap gap-x-5 gap-y-3 text-sm"
        >
          {[
            ["report", "Report", "报告"],
            ["charts", "Charts", "图表"],
            ["forecast", "Forecast & DCF", "预测及 DCF"],
            ["valuation", "Valuation history", "历史估值"],
            ["operations", "Operations", "经营指标"],
            ["annual", "Annual financials", "年度财务"],
            ["quarterly", "Quarterly financials", "季度财务"],
            ["audit", "Sources & QA", "来源与核验"],
          ].map(([id, en, zh]) => (
            <a
              key={id}
              href={`#${id}`}
              className="underline underline-offset-4"
            >
              {t(en, zh)}
            </a>
          ))}
        </nav>
      </header>
      <section id="report" className={sectionClass}>
        <h2>{t("Investment report", "投资研究报告")}</h2>
        <div className="max-w-4xl space-y-8">
          {TSM_REPORT.map((r, i) => (
            <article key={r.id} className="space-y-3">
              <h3 className="text-lg font-semibold">
                {i + 1}. {chinese ? r.zhTitle : r.enTitle}
              </h3>
              <p className="leading-8 text-zinc-700 dark:text-zinc-300">
                {chinese ? r.zh : r.en}
              </p>
              <p className="text-xs">{source(r.source)}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="charts" className={sectionClass}>
        <h2>{t("Chart dashboard", "图表看板")}</h2>
        <p className="text-sm text-zinc-500">
          {t(
            "Annual charts: SEC IFRS. Quarterly charts: local TIFRS. No mixed-basis net income series.",
            "年度图表为 SEC IFRS，季度图表为本地 TIFRS，不混用净利润口径。",
          )}
        </p>
        <div className="grid min-w-0 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Bars
            title={t("Annual revenue", "年度收入")}
            rows={TSM_ANNUAL.map((r) => ({
              label: String(r.year),
              value: r.revenue / 1e9,
            }))}
          />
          <Bars
            title={t("Annual parent net income", "年度归母净利")}
            rows={TSM_ANNUAL.map((r) => ({
              label: String(r.year),
              value: r.netIncome / 1e9,
            }))}
          />
          <Bars
            title={t("Operating margin", "年度营业利润率")}
            unit="%"
            rows={TSM_ANNUAL.map((r) => ({
              label: String(r.year),
              value: r.operatingMargin,
            }))}
          />
          <Bars
            title={t("Annual cash PP&E", "年度现金固定资产购建")}
            rows={TSM_ANNUAL.map((r) => ({
              label: String(r.year),
              value: r.capex / 1e9,
            }))}
          />
          <Bars
            title={t("Annual FCF", "年度 FCF")}
            rows={TSM_ANNUAL.map((r) => ({
              label: String(r.year),
              value: r.freeCashFlow / 1e9,
            }))}
          />
          <Bars
            title={t("Q2 wafer node mix", "第二季度晶圆制程组合")}
            unit="%"
            rows={TSM_NODES.map((r) => ({
              label: chinese ? r.zh : r.en,
              value: r.share,
            }))}
          />
          <Bars
            title={t("Q2 platform mix", "第二季度平台组合")}
            unit="%"
            rows={TSM_PLATFORMS.map((r) => ({
              label: chinese ? r.zh : r.en,
              value: r.share,
            }))}
          />
          <Bars
            title={t("2026 monthly revenue", "2026 年月度收入")}
            rows={TSM_MONTHLY.map((r) => ({
              label: r.month,
              value: r.revenue / 1e9,
            }))}
          />
          <Bars
            title={t("Quarterly FCF", "季度 FCF")}
            rows={TSM_QUARTERLY.map((r) => ({
              label: r.period,
              value: r.freeCashFlow / 1e9,
            }))}
          />
          <Bars
            title={t("Base forecast FCFF", "基准企业现金流预测")}
            rows={TSM_FORECASTS.base.map((r) => ({
              label: String(r.year),
              value: r.freeCashFlow / 1e9,
            }))}
          />
          <Bars
            title={t("Year-end IFRS P/E", "年末 IFRS 市盈率")}
            unit="×"
            rows={TSM_VALUATION_HISTORY.map((r) => ({
              label: String(r.year),
              value: r.pe,
            }))}
          />
          <Bars
            title={t("Scenario ADS values", "情景 ADS 价值")}
            unit="USD / ADS"
            rows={cases.map((s) => ({
              label: caseName(s),
              value: TSM_DCF_CASES[s].adsValue,
            }))}
          />
        </div>
      </section>
      <section id="forecast" className={sectionClass}>
        <h2>
          {t("Ten-year forecast and enterprise DCF", "十年预测及企业 DCF")}
        </h2>
        <p className="max-w-5xl text-sm leading-7">{TSM_MODEL_NOTE[locale]}</p>
        <h3 className="font-semibold">
          {t("Analyst assumptions", "分析师假设")}
        </h3>
        <Table
          headers={[t("Assumption", "假设"), ...cases.map(caseName)]}
          rows={[
            [
              t("2026 revenue · NTD B", "2026 收入 · 十亿新台币"),
              ...cases.map((s) => bn(TSM_ASSUMPTIONS[s].revenue2026)),
            ],
            [
              t("2027 / 2035 growth", "2027 / 2035 增长率"),
              ...cases.map(
                (s) =>
                  `${pct(TSM_ASSUMPTIONS[s].growthStart * 100)} / ${pct(TSM_ASSUMPTIONS[s].growthEnd * 100)}`,
              ),
            ],
            [
              t("2026 / 2035 EBIT margin", "2026 / 2035 营业利润率"),
              ...cases.map(
                (s) =>
                  `${pct(TSM_ASSUMPTIONS[s].marginStart * 100)} / ${pct(TSM_ASSUMPTIONS[s].marginEnd * 100)}`,
              ),
            ],
            [
              t("2026 cash capex · NTD B", "2026 现金资本支出 · 十亿新台币"),
              ...cases.map((s) => bn(TSM_ASSUMPTIONS[s].capex2026)),
            ],
            [
              t("2026 D&A · NTD B", "2026 折旧摊销 · 十亿新台币"),
              ...cases.map((s) => bn(TSM_ASSUMPTIONS[s].da2026)),
            ],
            [
              t(
                "2035 capex / D&A (% sales)",
                "2035 资本支出 / 折旧摊销（收入比）",
              ),
              ...cases.map(
                (s) =>
                  `${pct(TSM_ASSUMPTIONS[s].capexEnd * 100)} / ${pct(TSM_ASSUMPTIONS[s].daEnd * 100)}`,
              ),
            ],
            [
              t("Operating tax rate", "经营税率"),
              ...cases.map((s) => pct(TSM_ASSUMPTIONS[s].tax * 100)),
            ],
            [
              t("Working capital / incremental sales", "营运资本 / 增量收入"),
              ...cases.map((s) => pct(TSM_ASSUMPTIONS[s].workingCapital * 100)),
            ],
            [
              t(
                "Lease principal / interest (% sales)",
                "租赁本金 / 利息（收入比）",
              ),
              ...cases.map(
                (s) =>
                  `${num(TSM_ASSUMPTIONS[s].leasePrincipalRatio * 100, 3)}% / ${num(TSM_ASSUMPTIONS[s].leaseInterestRatio * 100, 3)}%`,
              ),
            ],
            [
              t("WACC / terminal growth", "折现率 / 永续增长率"),
              ...cases.map(
                (s) =>
                  `${pct(TSM_ASSUMPTIONS[s].discount)} / ${pct(TSM_ASSUMPTIONS[s].terminal)}`,
              ),
            ],
          ]}
        />
        <h3 className="font-semibold">{t("DCF outputs", "DCF 结果")}</h3>
        <Table
          headers={[
            t("Scenario", "情景"),
            t("PV cash · NTD B", "现金现值 · 十亿新台币"),
            t("PV terminal", "终值现值"),
            t("Enterprise value", "企业价值"),
            t("Equity value", "权益价值"),
            "NTD / " + t("ordinary share", "普通股"),
            "USD / ADS",
            t("vs Oct 2 price", "相对 10 月 2 日价格"),
            t("Terminal share", "终值占比"),
          ]}
          rows={cases.map((s) => {
            const d = TSM_DCF_CASES[s];
            return [
              caseName(s),
              bn(d.pvCash),
              bn(d.pvTerminal),
              bn(d.enterpriseValue),
              bn(d.equityValue),
              num(d.ordinaryValue),
              num(d.adsValue),
              pct(d.upside),
              pct(d.terminalWeight),
            ];
          })}
        />
        <p className="text-sm">
          {t("June equity bridge · NTD B:", "六月权益桥 · 十亿新台币：")} +
          {bn(TSM_MODEL_INPUTS.cash)} {t("cash", "现金")} −
          {bn(TSM_MODEL_INPUTS.debt)} {t("bonds/bank debt", "债券及银行贷款")} −
          {bn(TSM_MODEL_INPUTS.noncontrolling)}{" "}
          {t("minority equity", "少数股东权益")} ·{" "}
          {num(TSM_MODEL_INPUTS.ordinaryShares / 1e9, 3)}B{" "}
          {t("ordinary shares", "普通股")} × 5 / 32.{" "}
          {source(TSM_SOURCES.fullInterim)}
        </p>
        <h3 className="font-semibold">
          {t(
            "Base ADS value: WACC × terminal growth",
            "基准 ADS 价值：折现率 × 永续增长率",
          )}
        </h3>
        <Table
          headers={["WACC", "g = 2%", "g = 3%", "g = 4%"]}
          rows={TSM_SENSITIVITY.map((r) => [
            pct(r.discount),
            ...r.values.map((v) => `$${num(v)}`),
          ])}
        />
        <h3 className="font-semibold">
          {t("FX translation sensitivity", "汇率换算敏感性")}
        </h3>
        <Table
          headers={["NTD / USD", "USD / ADS", t("vs market", "相对市价")]}
          rows={TSM_FX_SENSITIVITY.map((r) => [
            num(r.fx),
            `$${num(r.adsValue)}`,
            pct(r.upside),
          ])}
        />
        {cases.map((s) => (
          <details key={s} open={s === "base"}>
            <summary className="cursor-pointer py-3 font-semibold">
              {caseName(s)} ·{" "}
              {t(
                "2026–2035 operating forecast · NTD B",
                "2026—2035 经营预测 · 十亿新台币",
              )}
            </summary>
            <Table
              headers={[
                t("Year", "年份"),
                t("Revenue", "收入"),
                "EBIT",
                "NOPAT",
                t("D&A", "折旧摊销"),
                t("Cash capex", "现金资本支出"),
                t("ΔNWC", "增量营运资本"),
                t("Lease principal", "租赁本金"),
                "FCFF",
                t("FCFF margin", "企业现金率"),
              ]}
              rows={TSM_FORECASTS[s].map((r) => [
                r.year,
                bn(r.revenue),
                bn(r.operatingIncome),
                bn(r.nopat),
                bn(r.depreciation),
                bn(r.capex),
                bn(r.workingCapital),
                bn(r.leasePrincipal),
                bn(r.freeCashFlow),
                pct(r.fcfMargin),
              ])}
            />
          </details>
        ))}
      </section>
      <section id="valuation" className={sectionClass}>
        <h2>{t("Historical valuation context", "历史估值背景")}</h2>
        <p className="text-sm leading-7">
          {t(
            "TWSE 2330 ordinary shares × year-end local closing price; all ratios use TWD IFRS annual financials. Ex-post comparison, not information available to trade on December 31. No ADS/local-price parity assumption. Price missing or shares unknown leaves ratios N/A. Closing price is split-adjusted, not dividend-adjusted.",
            "台湾 2330 普通股股数乘年末本地收盘价；全部倍数采用新台币 IFRS 年度财务，是事后比较，并非 12 月 31 日即可交易的信息。不假设 ADS 与本地价格平价。缺价或未知股数对应倍数为 N/A；收盘价按拆股调整，而非股息复权。",
          )}
        </p>
        <Table
          headers={[
            t("Year", "年份"),
            t("Price date", "价格日期"),
            "NTD / " + t("share", "股"),
            t("Shares · B", "股数 · 十亿"),
            t("Market cap · NTD B", "市值 · 十亿新台币"),
            "P/E",
            "P/S",
            t("FCF yield", "FCF 收益率"),
          ]}
          rows={TSM_VALUATION_HISTORY.map((r) => [
            r.year,
            r.date,
            num(r.close),
            r.shares == null ? "N/A" : num(r.shares / 1e9, 4),
            bn(r.marketCap),
            num(r.pe),
            num(r.ps),
            pct(r.fcfYield),
          ])}
        />
        <p className="text-sm">
          {t("Latest local close", "最新本地收盘价")}: NTD{" "}
          {num(TSM_TAIWAN_PRICE.close)} ({TSM_TAIWAN_PRICE.date}).{" "}
          {source(
            TSM_PRICE_SOURCES.taiwan,
            t("TWSE price feed", "台湾股价数据"),
          )}{" "}
          · {source(TSM_PRICE_SOURCES.ads, t("ADS price feed", "ADS 股价数据"))}
        </p>
      </section>
      <section id="operations" className={sectionClass}>
        <h2>
          {t("Operating metrics and foundry economics", "经营指标及代工经济")}
        </h2>
        <h3 className="font-semibold">
          {t("Q2 2026 mix", "2026 年第二季度组合")}
        </h3>
        <Table
          headers={[
            t("Technology", "制程"),
            t("Wafer revenue share", "晶圆收入占比"),
          ]}
          rows={TSM_NODES.map((r) => [chinese ? r.zh : r.en, pct(r.share)])}
        />
        <Table
          headers={[
            t("Platform", "平台"),
            t("Revenue share", "收入占比"),
            t("QoQ growth", "环比增长"),
          ]}
          rows={TSM_PLATFORMS.map((r) => [
            chinese ? r.zh : r.en,
            pct(r.share),
            pct(r.growth),
          ])}
        />
        <p className="text-xs">{source(TSM_SOURCES.presentation)}</p>
        <h3 className="font-semibold">
          {t("Cash and operating economics", "现金及经营经济")}
        </h3>
        <div className="space-y-4">
          {TSM_ECONOMICS.map((r) => (
            <div
              key={r.en}
              className="border-b border-zinc-200 pb-4 dark:border-zinc-800"
            >
              <h4 className="font-semibold">
                {chinese ? r.zh : r.en}: {r.metric}
              </h4>
              <p className="mt-2 text-sm leading-7">
                {chinese ? r.zhNote : r.enNote} {source(r.source)}
              </p>
            </div>
          ))}
        </div>
        <h3 className="font-semibold">
          {t("Customer concentration", "客户集中度")}
        </h3>
        <Table
          headers={[
            t("Year", "年份"),
            t("Largest", "第一大"),
            t("Second", "第二大"),
            t("Top ten", "前十大"),
          ]}
          rows={TSM_CONCENTRATION.map((r) => [
            r.year,
            pct(r.largest),
            pct(r.second),
            pct(r.topTen),
          ])}
        />
        <p className="text-xs">{source(TSM_SOURCES.annual)}</p>
        <h3 className="font-semibold">
          {t(
            "Management guidance: Q3 2026, not actual",
            "管理层指引：2026 年第三季度，非实际结果",
          )}
        </h3>
        <Table
          headers={[t("Metric", "指标"), t("Guidance", "指引")]}
          rows={[
            [
              t("USD revenue · B", "美元收入 · 十亿"),
              `${num(TSM_GUIDANCE.usdRevenueLow / 1e9, 1)}–${num(TSM_GUIDANCE.usdRevenueHigh / 1e9, 1)}`,
            ],
            [t("Gross margin", "毛利率"), "65–67%"],
            [t("Operating margin", "营业利润率"), "56–58%"],
            ["NTD / USD", "32"],
            [
              t("2026 USD revenue growth", "2026 年美元收入增长"),
              t("Slightly above 40%", "略高于 40%"),
            ],
          ]}
        />
        <p className="text-xs">{source(TSM_GUIDANCE.source)}</p>
        <h3 className="font-semibold">{t("Monthly revenue", "月度收入")}</h3>
        <p className="text-sm leading-7">{TSM_MONTHLY_NOTE[locale]}</p>
        <Table
          headers={[
            t("Month", "月份"),
            t("Revenue · NTD B", "收入 · 十亿新台币"),
            t("YoY", "同比"),
          ]}
          rows={TSM_MONTHLY.map((r) => [r.month, bn(r.revenue), pct(r.yoy)])}
        />
        <p className="text-xs">{source(TSM_SOURCES.monthly)}</p>
        <h3 className="font-semibold">{t("Risk monitor", "风险观察")}</h3>
        <div className="space-y-4">
          {TSM_RISKS.map((r) => (
            <div key={r.en}>
              <h4 className="font-semibold">{chinese ? r.zh : r.en}</h4>
              <p className="text-sm leading-7">
                {chinese ? r.zhWatch : r.enWatch}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section id="annual" className={sectionClass}>
        <h2>
          {t(
            "Annual financial database · SEC IFRS",
            "年度财务数据库 · SEC IFRS",
          )}
        </h2>
        <p className="text-sm">
          {t(
            "2015–2025. NTD billions; EPS in NTD per ordinary share. FCF = OCF − gross cash PP&E. Parent net income and year-end parent equity.",
            "2015—2025 年，以十亿新台币计；EPS 为每普通股新台币。FCF＝经营现金流－现金固定资产购建；采用归母净利及年末归母权益。",
          )}
        </p>
        {financialTable(TSM_ANNUAL)}
        <details>
          <summary className="cursor-pointer py-3 font-semibold">
            {t(
              "Balance sheet, reinvestment and returns",
              "资产负债表、再投资与回报",
            )}
          </summary>
          <Table
            headers={[
              t("Year", "年份"),
              t("Cash", "现金"),
              t("Assets", "资产"),
              t("Liabilities", "负债"),
              t("Parent equity", "归母权益"),
              t("Inventory", "存货"),
              t("Current debt", "流动债务"),
              t("Noncurrent bonds", "非流动债券"),
              t("Noncurrent bank loans", "非流动银行贷款"),
              t("Lease principal", "租赁本金"),
              t("Dividends paid", "已付股息"),
              t("Gross margin", "毛利率"),
              t("Net margin", "净利率"),
              t("FCF margin", "FCF 率"),
              t("ROE · year-end", "ROE · 年末"),
            ]}
            rows={TSM_ANNUAL.map((r) => [
              r.year,
              bn(r.cash),
              bn(r.assets),
              bn(r.liabilities),
              bn(r.equity),
              bn(r.inventory),
              bn(r.debtCurrent),
              bn(r.bondsNoncurrent),
              bn(r.bankNoncurrent),
              bn(r.leasePrincipal),
              bn(r.dividends),
              pct(r.grossMargin),
              pct(r.netMargin),
              pct(r.fcfMargin),
              pct(r.roe),
            ])}
          />
        </details>
        <details>
          <summary className="cursor-pointer py-3 font-semibold">
            {t("Field-level SEC provenance", "逐字段 SEC 来源")}
          </summary>
          <Table
            headers={[
              t("Year", "年份"),
              t("Field", "字段"),
              t("XBRL tag", "XBRL 标签"),
              t("Filed", "申报日期"),
              t("Source", "来源"),
            ]}
            rows={TSM_ANNUAL.flatMap((r) =>
              Object.entries(r.provenance).map(([key, p]) => [
                r.year,
                key,
                p.tag ?? "N/A",
                p.filed ?? "N/A",
                p.url ? source(p.url) : "N/A",
              ]),
            )}
          />
        </details>
      </section>
      <section id="quarterly" className={sectionClass}>
        <h2>
          {t(
            "Quarterly financial database · local TIFRS",
            "季度财务数据库 · 本地 TIFRS",
          )}
        </h2>
        <p className="text-sm leading-7">
          {t(
            "2024 Q1–2026 Q2. Issuer NTD-million rounding. Annual SEC IFRS net income/EPS differ from local TIFRS; FY2025 IFRS net income 1,697.604B and EPS 65.47 versus local TIFRS 1,717.883B and 66.25. TTM below sums only local quarters.",
            "2024 年第一季度至 2026 年第二季度，发行人按百万新台币舍入。年度 SEC IFRS 净利及 EPS 与本地 TIFRS 不同：2025 年 IFRS 净利 16,976.04 亿、EPS 65.47，本地 TIFRS 为 17,178.83 亿及 66.25。下列滚动四季仅加总本地季度。",
          )}
        </p>
        {financialTable(TSM_QUARTERLY)}
        <p className="text-sm leading-7">
          {t(
            "Q1 2025 is derived from same-basis disclosed periods; EPS is not derived by subtracting annual EPS. Income uses H1 comparative minus Q2 2025; cash flows use local 2025 annual minus Q2–Q4.",
            "2025 年第一季度来自同口径披露期间的差分；不以全年 EPS 相减推算。利润使用半年对比减第二季度；现金流使用本地 2025 全年减第二至第四季度。",
          )}{" "}
          {source(TSM_QUARTER_SOURCES.q226)} ·{" "}
          {source(TSM_QUARTER_SOURCES.q425)}
        </p>
        <Table
          headers={[
            t(
              "TTM to June 2026 · NTD B",
              "截至 2026 年六月滚动四季 · 十亿新台币",
            ),
            t("Value", "金额"),
          ]}
          rows={[
            [t("Revenue", "收入"), bn(TSM_TTM.revenue)],
            [t("Operating profit", "营业利润"), bn(TSM_TTM.operatingIncome)],
            [t("Parent net income", "归母净利"), bn(TSM_TTM.netIncome)],
            [t("Operating cash", "经营现金"), bn(TSM_TTM.operatingCashFlow)],
            [t("Cash PP&E", "现金固定资产购建"), bn(TSM_TTM.capex)],
            ["FCF", bn(TSM_TTM.freeCashFlow)],
          ]}
        />
      </section>
      <section id="audit" className={sectionClass}>
        <h2>{t("Source audit and publication QA", "来源审计及发布核验")}</h2>
        <div className="space-y-5">
          {TSM_AUDIT.map((r) => (
            <div key={r.area}>
              <h3 className="font-semibold">
                {r.area} ·{" "}
                {t(r.status, r.status === "complete" ? "完整" : "部分")}
              </h3>
              <p className="mt-2 text-sm leading-7">
                {chinese ? r.zh : r.en} {source(r.url)}
              </p>
            </div>
          ))}
          {TSM_QA.map((r) => (
            <div key={r.en}>
              <h3 className="font-semibold">
                {chinese ? r.zh : r.en} ·{" "}
                {t(
                  r.status,
                  r.status === "pass"
                    ? "通过"
                    : r.status === "pending"
                      ? "待验证"
                      : "提示",
                )}
              </h3>
              <p className="mt-2 text-sm leading-7">
                {chinese ? r.zhNote : r.enNote}
              </p>
            </div>
          ))}
        </div>
        <details>
          <summary className="cursor-pointer py-3 font-semibold">
            {t("Source system and chart inventory", "来源系统及图表目录")}
          </summary>
          <ul className="space-y-2 text-sm">
            {Object.entries(TSM_SOURCES).map(([key, url]) => (
              <li key={key}>{source(url, key)}</li>
            ))}
            {TSM_CHART_GROUPS.map((r) => (
              <li key={r.en}>{chinese ? r.zh : r.en}</li>
            ))}
          </ul>
        </details>
        <details>
          <summary className="cursor-pointer py-3 font-semibold">
            {t("SEC filing inventory", "SEC 文件目录")} ({TSM_FILINGS.length})
          </summary>
          <p className="mb-3 text-sm">
            {t(
              "Foreign private issuer: 20-F annuals and 6-K furnished disclosures, not 10-K/10-Q. Includes SEC electronic-history 20-F/6-K amendments and F-1/F-6 registration forms available by cutoff; a 6-K is not necessarily an earnings report.",
              "境外私人发行人使用年度 20-F 及提交的 6-K，而非 10-K/10-Q。纳入 SEC 电子历史截至截止日可获得的相关修订及 F-1/F-6 注册表；并非每份 6-K 都是业绩报告。",
            )}
          </p>
          <Table
            headers={[
              t("Form", "表格"),
              t("Filed", "申报日期"),
              t("Period end", "报告截止"),
              t("Accession", "编号"),
              t("Document", "文件"),
            ]}
            rows={TSM_FILINGS.map((r) => [
              r.form,
              r.filed,
              r.end || "N/A",
              r.accessionNumber,
              source(r.url),
            ])}
          />
        </details>
      </section>
      <footer className="border-t border-zinc-200 pt-6 text-xs leading-6 text-zinc-500 dark:border-zinc-800">
        {t(
          "Independent research. Not personalized investment advice. Forecasts are scenarios, not promises. Data cutoff: October 4, 2026.",
          "独立研究，非个性化投资建议。预测为情景而非承诺。数据截止：2026 年 10 月 4 日。",
        )}
      </footer>
    </main>
  );
}
