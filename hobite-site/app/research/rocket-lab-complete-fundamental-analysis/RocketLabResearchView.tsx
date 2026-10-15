"use client";
import { useState, type ReactNode } from "react";
import {
  ANNUAL,
  QUARTERLY,
  FILINGS,
  CUTOFF,
  type FinancialRow,
} from "./secData";
import {
  LATEST_PRICE,
  VALUATION_HISTORY,
  PRICE_SOURCE,
} from "./valuationHistory";
import {
  SOURCES,
  OPERATIONS,
  ECONOMICS,
  transactionIllustration,
} from "./operatingMetrics";
import {
  BASELINE,
  BRIDGE,
  CASES,
  forecast,
  type Scenario,
} from "./forecastModel";
import { REPORT, type Language } from "./reportContent";
import { AUDIT } from "./sourceAudit";
import { QA } from "./publicationQa";

const num = (v: number | null | undefined, digits = 1) =>
  v == null
    ? "N/A"
    : v.toLocaleString("en-US", {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      });
const pct = (v: number | null | undefined) =>
  v == null ? "N/A" : `${num(v * 100)}%`;
const v = (r: FinancialRow, key: string) => r.p[key]?.value ?? null;
function Source({ url, label }: { url: string; label?: string }) {
  return (
    <a
      className="underline decoration-zinc-400 underline-offset-4 hover:text-emerald-800"
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      {label ?? "SEC"}
    </a>
  );
}
function Table({
  title,
  headers,
  rows,
}: {
  title: string;
  headers: string[];
  rows: ReactNode[][];
}) {
  return (
    <div
      role="region"
      aria-label={title}
      tabIndex={0}
      className="max-w-full overflow-x-auto focus:outline-2 focus:outline-emerald-700"
    >
      <table className="w-full whitespace-nowrap text-left text-sm">
        <caption className="sr-only">{title}</caption>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                scope="col"
                className="border-b border-zinc-400 px-3 py-3"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((x, j) => (
                <td
                  key={j}
                  className="border-b border-zinc-200 px-3 py-3 align-top tabular-nums"
                >
                  {x}
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
  values,
  unit,
}: {
  title: string;
  values: { label: string; value: number | null }[];
  unit: string;
}) {
  const max = Math.max(1, ...values.map((v) => Math.abs(v.value ?? 0)));
  return (
    <figure className="min-w-0 border-t border-zinc-300 py-5">
      <figcaption className="mb-4 font-semibold">
        {title} <span className="text-xs font-normal">({unit})</span>
      </figcaption>
      {values.map((v) => (
        <div
          key={v.label}
          className="mb-3 grid grid-cols-[68px_minmax(0,1fr)_84px] items-center gap-2 text-xs"
        >
          <span>{v.label}</span>
          <div className="h-3 bg-zinc-100">
            <div
              aria-hidden="true"
              className={`h-3 ${v.value != null && v.value < 0 ? "bg-rose-600" : "bg-emerald-700"}`}
              style={{ width: `${(Math.abs(v.value ?? 0) / max) * 100}%` }}
            />
          </div>
          <span className="text-right tabular-nums">{num(v.value)}</span>
        </div>
      ))}
    </figure>
  );
}
function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-zinc-300 py-9">
      <h2 className="mb-5 text-2xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}
export default function RocketLabResearchView({ lang }: { lang: Language }) {
  const zh = lang === "zh";
  const t = (en: string, cn: string) => (zh ? cn : en);
  const [scenario, setScenario] = useState<keyof typeof CASES>("base");
  const [assumptions, setAssumptions] = useState<Scenario>({ ...CASES.base });
  const [horizon, setHorizon] = useState<5 | 10>(10);
  const [mergerVwap, setMergerVwap] = useState(LATEST_PRICE.close);
  let result: ReturnType<typeof forecast> | null = null;
  try {
    result = forecast(assumptions, horizon);
  } catch {
    /* Invalid editable assumptions render a visible error, not stale results. */
  }
  let transaction: ReturnType<typeof transactionIllustration> | null = null;
  try {
    transaction = transactionIllustration(mergerVwap);
  } catch {
    /* Incomplete numeric input is allowed during editing. */
  }
  const latest = QUARTERLY[QUARTERLY.length - 1];
  const nav = [
    ["report", t("Report", "报告")],
    ["charts", t("Charts", "图表")],
    ["economics", t("Operations", "经营")],
    ["valuation", t("Scenarios", "情景")],
    ["transaction", t("Iridium", "Iridium")],
    ["financials", t("Financials", "财务")],
    ["filings", t("Filings", "文件")],
    ["sources", t("Sources & QA", "来源与核验")],
  ];
  const financialTable = (rows: FinancialRow[], quarterly = false) => (
    <Table
      title={t("Financial database", "财务数据库")}
      headers={[
        t("Period", "期间"),
        t("Revenue", "营收"),
        t("Gross profit", "毛利"),
        t("Gross margin", "毛利率"),
        "EBIT",
        t("Op. margin", "营业率"),
        t("Net income", "净利"),
        t("Diluted EPS", "摊薄 EPS"),
        "OCF",
        t("Cash capex", "现金资本开支"),
        "FCF",
        t("FCF margin", "FCF 率"),
        t("R&D", "研发"),
        "D&A",
        "SBC",
        t("Source", "来源"),
      ]}
      rows={rows.map((r) => [
        quarterly ? `${r.fy} Q${r.quarter}` : `FY${r.fy}`,
        num(v(r, "revenue")),
        num(v(r, "grossProfit")),
        pct(r.grossMargin),
        num(v(r, "operatingIncome")),
        pct(r.operatingMargin),
        num(v(r, "netIncome")),
        num(v(r, "eps"), 2),
        num(v(r, "ocf")),
        num(v(r, "capex")),
        num(r.fcf),
        pct(r.fcfMargin),
        num(v(r, "rd")),
        num(v(r, "da")),
        num(v(r, "sbc")),
        <Source key="s" url={r.p.revenue.source ?? r.source} />,
      ])}
    />
  );
  const fields: {
    key: keyof Omit<Scenario, "neutronMissions">;
    en: string;
    zh: string;
    percent?: boolean;
    min: number;
    max: number;
    step: number;
  }[] = [
    {
      key: "growth",
      en: "Core growth, years 1-5",
      zh: "原业务前五年增长",
      percent: true,
      min: 0,
      max: 100,
      step: 1,
    },
    {
      key: "laterGrowth",
      en: "Core growth, years 6-10",
      zh: "原业务后五年增长",
      percent: true,
      min: 0,
      max: 100,
      step: 1,
    },
    {
      key: "coreMargin",
      en: "Mature core EBIT margin",
      zh: "原业务成熟营业率",
      percent: true,
      min: -60,
      max: 60,
      step: 1,
    },
    {
      key: "neutronPrice",
      en: "Neutron revenue / mission ($m)",
      zh: "Neutron 单次收入（百万美元）",
      min: 1,
      max: 200,
      step: 1,
    },
    {
      key: "neutronMargin",
      en: "Mature Neutron EBIT margin",
      zh: "Neutron 成熟营业率",
      percent: true,
      min: -60,
      max: 60,
      step: 1,
    },
    {
      key: "matureCapex",
      en: "Mature capex / sales",
      zh: "成熟资本开支率",
      percent: true,
      min: 6,
      max: 50,
      step: 1,
    },
    {
      key: "discount",
      en: "Discount rate",
      zh: "折现率",
      percent: true,
      min: 4,
      max: 40,
      step: 0.5,
    },
    {
      key: "terminalGrowth",
      en: "Terminal growth",
      zh: "终值增长",
      percent: true,
      min: 0,
      max: 8,
      step: 0.5,
    },
    {
      key: "dilution",
      en: "Annual dilution stress",
      zh: "年度摊薄压力",
      percent: true,
      min: 0,
      max: 20,
      step: 0.5,
    },
  ];
  return (
    <main
      lang={zh ? "zh-CN" : "en"}
      data-company="rklb"
      className="mx-auto w-full min-w-0 max-w-7xl bg-white px-4 py-8 text-zinc-900 sm:px-8"
    >
      <header className="pb-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 text-sm">
          <a href="/research" className="underline">
            {t("Research library", "研究目录")}
          </a>
          {zh ? (
            <a
              data-testid="rklb-language-en"
              href="/research/rocket-lab-complete-fundamental-analysis"
              className="underline"
            >
              English
            </a>
          ) : (
            <a
              data-testid="rklb-language-zh"
              href="/research/rocket-lab-complete-fundamental-analysis/zh"
              className="underline"
            >
              中文版
            </a>
          )}
        </div>
        <p className="mb-3 text-sm font-semibold text-emerald-800">
          RKLB · {t("Aerospace & Space Infrastructure", "航天与空间基础设施")}
        </p>
        <h1 className="max-w-4xl break-words text-3xl font-bold sm:text-4xl">
          {t(
            "Rocket Lab: Complete Fundamental Analysis",
            "Rocket Lab：完整基本面研究",
          )}
        </h1>
        <p className="mt-4 max-w-4xl leading-7 text-zinc-600">
          {t(
            "Electron, HASTE and space systems today. Neutron development and Iridium financing tomorrow. Evidence, cash economics and per-share valuation kept separate.",
            "今日的 Electron、HASTE 和空间系统，明日的 Neutron 与 Iridium 融资。严格区分事实、现金经济与每股估值。",
          )}
        </p>
        <p className="mt-3 text-xs text-zinc-600">
          {t("Research cutoff", "研究截止")}: {CUTOFF} ·{" "}
          {t("Latest reported quarter", "最新季报")}: 2026-06-30 ·{" "}
          {t(
            "USD millions unless per share; N/A = not disclosed/not meaningful",
            "除每股外单位为百万美元；N/A 为未披露或无意义",
          )}
        </p>
        <dl className="mt-7 grid grid-cols-2 gap-x-5 gap-y-6 border-y border-zinc-300 py-5 lg:grid-cols-4">
          {[
            [t("Q2 revenue", "Q2 营收"), `$${num(v(latest, "revenue"))}m`],
            [t("Q2 gross margin", "Q2 毛利率"), pct(latest.grossMargin)],
            [t("June backlog", "6 月订单"), `$${num(v(latest, "backlog"))}m`],
            [
              `${LATEST_PRICE.date} ${t("close", "收盘")}`,
              `$${num(LATEST_PRICE.close, 2)}`,
            ],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs text-zinc-600">{label}</dt>
              <dd className="mt-2 text-xl font-semibold tabular-nums">
                {value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 border-l-4 border-amber-600 bg-amber-50 px-4 py-3 text-sm leading-6">
          <strong>
            {t("Material update & valuation boundary", "重大更新与估值边界")}
          </strong>
          <p>
            {t(
              "October 14: Neutron first launch is now targeted for 2027. Iridium is approved by shareholders, not closed. DCF is standalone and June-anchored, excludes the subsequent ATM and merger, and is NOT an October target price.",
              "10 月 14 日：Neutron 首飞目标现为 2027 年。Iridium 已获股东批准，但尚未交割。DCF 为 6 月锚定的独立经营情景，排除后续 ATM 与并购，不是 10 月目标价。",
            )}
          </p>
          <Source
            url={SOURCES.neutron}
            label={t("Neutron update", "Neutron 更新")}
          />{" "}
          ·{" "}
          <Source
            url={PRICE_SOURCE}
            label={t("Dated market observation", "有日期的市场观测")}
          />
        </div>
      </header>
      <nav
        aria-label={t("Article sections", "文章章节")}
        className="flex flex-wrap gap-x-5 gap-y-3 border-t border-zinc-300 py-5 text-sm"
      >
        {nav.map(([id, label]) => (
          <a key={id} href={`#${id}`} className="underline underline-offset-4">
            {label}
          </a>
        ))}
      </nav>
      <Section id="report" title={t("Investment Report", "投资研究报告")}>
        <div className="max-w-4xl space-y-8">
          {REPORT.map((ch) => (
            <article
              id={`chapter-${ch.id}`}
              key={ch.id}
              className="scroll-mt-20"
            >
              <h3 className="mb-3 text-lg font-semibold">{ch[lang].title}</h3>
              {ch[lang].paragraphs.map((p, i) => (
                <p key={i} className="mb-3 leading-7 text-zinc-700">
                  {p}
                </p>
              ))}
              <p className="flex flex-wrap gap-3 text-xs">
                {ch.sources.map((url, i) => (
                  <Source
                    key={url}
                    url={url}
                    label={`${t("Source", "来源")} ${i + 1}`}
                  />
                ))}
              </p>
            </article>
          ))}
        </div>
      </Section>
      <Section id="charts" title={t("Chart Dashboard", "图表仪表板")}>
        <div className="grid gap-x-8 md:grid-cols-2 lg:grid-cols-3">
          <Chart
            title={t("Annual revenue", "年度营收")}
            unit="$m"
            values={ANNUAL.map((r) => ({
              label: `${r.fy}`,
              value: v(r, "revenue"),
            }))}
          />
          <Chart
            title={t(
              "Operating cash less cash capex",
              "经营现金减现金资本开支",
            )}
            unit="$m"
            values={ANNUAL.map((r) => ({ label: `${r.fy}`, value: r.fcf }))}
          />
          <Chart
            title={t("Annual gross margin", "年度毛利率")}
            unit="%"
            values={ANNUAL.map((r) => ({
              label: `${r.fy}`,
              value: r.grossMargin == null ? null : r.grossMargin * 100,
            }))}
          />
          <Chart
            title={t("Launch cadence", "发射频次")}
            unit={t("missions", "次")}
            values={OPERATIONS.filter((r) => r.period !== "Q2 2026").map(
              (r) => ({ label: r.period, value: r.launches }),
            )}
          />
          <Chart
            title={t("Backlog (overlapping periods)", "订单（期间有重叠）")}
            unit="$m"
            values={OPERATIONS.filter((r) => r.period !== "Q2 2026").map(
              (r) => ({ label: r.period, value: r.backlog }),
            )}
          />
          <Chart
            title={t("Annual R&D expense", "年度研发费用")}
            unit="$m"
            values={ANNUAL.map((r) => ({
              label: `${r.fy}`,
              value: v(r, "rd"),
            }))}
          />
        </div>
      </Section>
      <Section
        id="economics"
        title={t(
          "Operating Database & Contract Economics",
          "经营数据库与合同经济",
        )}
      >
        <Table
          title={t("Segments and missions", "分部与任务")}
          headers={[
            t("Period", "期间"),
            t("Launch sales", "发射收入"),
            t("Space sales", "空间收入"),
            t("Launch GP", "发射毛利"),
            t("Space GP", "空间毛利"),
            t("Missions", "次数"),
            t("Builds", "制造"),
            t("Revenue / launch*", "单次收入*"),
            t("Cost / launch*", "单次成本*"),
            t("Backlog", "订单"),
            t("Source", "来源"),
          ]}
          rows={OPERATIONS.map((r) => [
            r.period,
            num(r.launchRevenue),
            num(r.spaceRevenue),
            num(r.launchGP),
            num(r.spaceGP),
            num(r.launches, 0),
            num(r.builds, 0),
            num(r.revenuePerLaunch),
            num(r.costPerLaunch),
            num(r.backlog),
            <Source key="s" url={r.source} />,
          ])}
        />
        <p className="mt-4 text-sm leading-6 text-zinc-600">
          {t(
            "*Issuer mission-based definitions, not segment revenue divided by launches or fully allocated profit. H1 and Q2 overlap; H1 is not a full year. Backlog includes acquired orders; options in press-release awards are not automatically included. Q2 catch-up revenue was $8.089m, including $5.948m for one contract. 45% of June backlog is expected within 12 months; the H1 government customer share was 42%.",
            "*公司按任务定义，并非分部收入除次数，也非完整分摊利润。H1 与 Q2 重叠，H1 不是全年。订单含并购所得；公告合同中的选择权不自动计入。Q2 追补收入 808.9 万美元，其中单一合同 594.8 万美元。6 月订单约 45% 预计十二个月内确认；H1 政府客户收入占 42%。",
          )}{" "}
          <Source url={SOURCES.quarter} />
        </p>
        <Table
          title={t("Contract and acquisition balances", "合同及收购数据")}
          headers={[t("June / H1 2026", "6 月 / H1 2026"), "$m"]}
          rows={[
            [t("Contract assets", "合同资产"), num(ECONOMICS.h1ContractAssets)],
            [
              t("Contract liabilities", "合同负债"),
              num(ECONOMICS.h1ContractLiabilities),
            ],
            [
              t(
                "Acquired contract liabilities (included above)",
                "收购合同负债（已包含于上项）",
              ),
              num(ECONOMICS.h1AcquiredContractLiabilities),
            ],
            [
              t("Cash acquisitions, net", "收购现金净额"),
              num(ECONOMICS.h1CashAcquisitions),
            ],
            [
              t(
                "Noncash acquisition shares at fair value",
                "非现金收购股份公允值",
              ),
              num(ECONOMICS.h1EquityAcquisitionConsideration),
            ],
          ]}
        />
        <h3 className="mb-3 mt-8 text-lg font-semibold">
          {t(
            "Management Outlook: Q3 2026 (August 10)",
            "管理层展望：2026 Q3（8 月 10 日）",
          )}
        </h3>
        <Table
          title={t(
            "Management guidance, not actuals",
            "管理层指引，非实际业绩",
          )}
          headers={[t("Metric", "指标"), t("Guidance range", "指引范围")]}
          rows={[
            [
              t("Revenue, $m", "营收，百万美元"),
              `${num(ECONOMICS.guidance.revenueLow)}–${num(ECONOMICS.guidance.revenueHigh)}`,
            ],
            [
              t("GAAP gross margin", "GAAP 毛利率"),
              `${pct(ECONOMICS.guidance.grossMarginLow)}–${pct(ECONOMICS.guidance.grossMarginHigh)}`,
            ],
            [
              t("Adjusted EBITDA, $m", "调整后 EBITDA，百万美元"),
              `${num(ECONOMICS.guidance.adjustedEbitdaLow)}–${num(ECONOMICS.guidance.adjustedEbitdaHigh)}`,
            ],
            [
              t("SBC, $m", "股权薪酬，百万美元"),
              `${num(ECONOMICS.guidance.sbcLow)}–${num(ECONOMICS.guidance.sbcHigh)}`,
            ],
          ]}
        />
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          {t(
            "This quarterly outlook is not full-year guidance. The gross-margin range is below reported Q2; higher revenue alone does not establish improving profitability. Non-GAAP EBITDA excludes adjustments and is not free cash flow.",
            "该季度展望不是全年指引。毛利率区间低于已报告 Q2，收入增加本身不证明盈利改善；非 GAAP EBITDA 剔除调整项目，不等于自由现金流。",
          )}{" "}
          <Source url={SOURCES.release} />
        </p>
      </Section>
      <Section
        id="valuation"
        title={t(
          "Standalone Forecast & Valuation Scenarios",
          "独立业务预测与估值情景",
        )}
      >
        <p className="mb-5 max-w-4xl text-sm leading-6">
          {t(
            "Hobite assumptions, not guidance. Valuation anchor June 30, 2026: an H2 stub plus FY2027-31 or FY2027-36. Iridium, post-June ATM, final award/forward settlement and exact current capital normalization are excluded. Do not compare these values with the October share price as precise upside.",
            "Hobite 假设，非公司指引。估值锚为 2026 年 6 月 30 日，含下半年短期现金流及 2027-31 或 2027-36 年。排除 Iridium、6 月后 ATM、最终奖励远期结算及精确当前资本调节。不可与 10 月股价比较为精确上涨空间。",
          )}
        </p>
        <div className="mb-6 flex flex-wrap items-end gap-5">
          <label className="text-sm">
            {t("Scenario", "情景")}
            <select
              data-testid="rklb-scenario"
              value={scenario}
              onChange={(e) => {
                const key = e.target.value as keyof typeof CASES;
                setScenario(key);
                setAssumptions({ ...CASES[key] });
              }}
              className="mt-2 block rounded border border-zinc-400 bg-white px-3 py-2"
            >
              {(["bear", "base", "bull"] as const).map((s, i) => (
                <option key={s} value={s}>
                  {t(["Bear", "Base", "Bull"][i], ["悲观", "基准", "乐观"][i])}
                </option>
              ))}
            </select>
          </label>
          <div>
            <p className="mb-2 text-sm">
              {t("Full forecast years", "完整预测年数")}
            </p>
            <div
              className="flex"
              role="group"
              aria-label={t("Forecast horizon", "预测期限")}
            >
              {([5, 10] as const).map((h) => (
                <button
                  key={h}
                  data-testid={`rklb-horizon-${h}`}
                  aria-pressed={horizon === h}
                  onClick={() => setHorizon(h)}
                  className={`min-w-20 border border-zinc-400 px-4 py-2 text-sm ${horizon === h ? "bg-zinc-900 text-white" : "bg-white text-zinc-900"}`}
                >
                  {h} {t("years", "年")}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {fields.map((f) => (
            <label key={f.key} className="text-sm">
              {t(f.en, f.zh)}
              {f.percent ? " (%)" : ""}
              <input
                data-testid={`rklb-${f.key}`}
                type="number"
                min={f.min}
                max={f.max}
                step={f.step}
                value={
                  Number.isFinite(assumptions[f.key])
                    ? Number(
                        (assumptions[f.key] * (f.percent ? 100 : 1)).toFixed(6),
                      )
                    : ""
                }
                onChange={(e) =>
                  setAssumptions((a) => ({
                    ...a,
                    [f.key]:
                      e.target.value === ""
                        ? NaN
                        : Number(e.target.value) / (f.percent ? 100 : 1),
                  }))
                }
                className="mt-2 block w-full rounded border border-zinc-400 bg-white px-3 py-2 tabular-nums"
              />
            </label>
          ))}
        </div>
        <p className="my-5 text-xs leading-6 text-zinc-600">
          {t(
            "Preset assumptions retained unless shown above",
            "除上方参数外保留情景预设",
          )}
          : {t("initial core EBIT margin", "初始原业务营业率")}{" "}
          {pct(assumptions.firstCoreMargin)};{" "}
          {t("initial capex/sales", "初始资本开支率")} {pct(assumptions.capex)};
          D&A {pct(assumptions.da)};{" "}
          {t("working capital / incremental sales", "营运资金 / 增量收入")}{" "}
          {pct(assumptions.workingCapital)};{" "}
          {t("positive EBIT tax", "正 EBIT 税率")} 25%. FY2026{" "}
          {t("assumed revenue", "假设收入")} ${num(BASELINE.revenue)}m; H2 FCFF
          ${num(BASELINE.h2Fcff)}m.{" "}
          {t("2027-36 Neutron missions", "2027-36 Neutron 次数")}:{" "}
          {assumptions.neutronMissions.join(", ")}.{" "}
          {t(
            "Core margin ramps over five years; Neutron margin starts at -50%; neither is established profitability.",
            "原业务利润率五年爬坡，Neutron 初始营业率 -50%，均非已实现盈利。",
          )}
        </p>
        {!result ? (
          <p role="alert" className="border-l-4 border-rose-600 bg-rose-50 p-4">
            {t(
              "Invalid assumptions. Discount rate must exceed terminal growth; mature capex cannot be below depreciation; numeric inputs must be complete.",
              "假设无效。折现率须高于终值增长，成熟资本开支不得低于折旧，数值须填写完整。",
            )}
          </p>
        ) : (
          <div aria-live="polite" data-testid="rklb-results">
            <dl className="my-6 grid grid-cols-2 gap-5 border-y border-zinc-300 py-5 lg:grid-cols-4">
              {[
                [
                  t("Standalone EV ($m)", "独立企业价值（百万）"),
                  num(result.enterprise),
                ],
                [
                  t("Equity residual ($m)", "股权剩余（百万）"),
                  num(result.rawEquity),
                ],
                [
                  t("June-anchored value / share", "6 月锚定每股情景值"),
                  `$${num(result.valuePerShare, 2)}`,
                ],
                [
                  t("Terminal PV / EV", "终值现值 / 企业价值"),
                  pct(result.terminalShare),
                ],
              ].map(([k, x]) => (
                <div key={k}>
                  <dt className="text-xs text-zinc-600">{k}</dt>
                  <dd className="mt-2 text-xl font-semibold tabular-nums">
                    {x}
                  </dd>
                </div>
              ))}
            </dl>
            <Table
              title={t("Forecast cash flows", "预测现金流")}
              headers={[
                t("Year", "年"),
                t("Core sales", "原业务收入"),
                t("Neutron missions", "Neutron 次数"),
                t("Neutron sales", "Neutron 收入"),
                t("Total sales", "总收入"),
                "EBIT",
                t("Cash tax", "现金税"),
                "D&A",
                t("Capex", "资本开支"),
                t("Change WC", "营运资金增量"),
                "FCFF",
                t("FCFF margin", "FCFF 率"),
                "PV FCFF",
              ]}
              rows={result.rows.map((r) => [
                r.year,
                num(r.core),
                r.missions,
                num(r.neutron),
                num(r.revenue),
                num(r.ebit),
                num(r.tax),
                num(r.depreciation),
                num(r.capex),
                num(r.workingCapital),
                num(r.fcff),
                pct(r.fcfMargin),
                num(r.pv),
              ])}
            />
            <Table
              title={t("DCF bridge", "DCF 桥接")}
              headers={[t("Component", "项目"), "$m / shares"]}
              rows={[
                [
                  t(
                    "H2 2026 stub PV (included once)",
                    "2026 H2 短期现值（仅计一次）",
                  ),
                  num(result.stubPV),
                ],
                [
                  t("Explicit PV including stub", "含短期的显式现金流现值"),
                  num(result.pvFlows),
                ],
                [
                  t("Terminal next-year FCFF", "终值次年 FCFF"),
                  num(result.terminalFcff),
                ],
                [
                  t("Terminal value before discount", "折现前终值"),
                  num(result.terminalValue),
                ],
                [
                  t("Terminal present value", "终值现值"),
                  num(result.terminalPV),
                ],
                [
                  t("June cash + securities", "6 月现金及有价证券"),
                  num(BRIDGE.cash + BRIDGE.securities),
                ],
                [
                  t("Debt carrying proxy", "债务账面值近似"),
                  num(BRIDGE.debtCarrying),
                ],
                [
                  t(
                    "Noncurrent finance lease + assumed current reserve",
                    "非流动融资租赁及假设流动准备",
                  ),
                  num(
                    BRIDGE.financeLeaseNoncurrent + BRIDGE.currentLeaseReserve,
                  ),
                ],
                [
                  t(
                    "June common-equivalent shares (millions)",
                    "6 月普通股等价股份（百万）",
                  ),
                  num(BRIDGE.shares, 3),
                ],
                [
                  t(
                    "Stress-adjusted share denominator (millions)",
                    "压力调整股份分母（百万）",
                  ),
                  num(result.dilutedShares, 3),
                ],
                [
                  t(
                    "Undiscounted negative-flow diagnostic, not deducted twice",
                    "未折现负现金需求诊断，不重复扣减",
                  ),
                  num(result.negativeCashNeeds),
                ],
              ]}
            />
            <p className="mt-4 text-sm leading-6 text-zinc-600">
              {t(
                "FCFF = EBIT − tax + D&A − capex − change in working capital. EV = explicit PV + terminal PV. Equity = EV + eligible liquidity − debt − finance leases/reserve. Terminal capex and working capital remain funded. Dilution increases the denominator without assumed issue proceeds, a conservative stress, not a forecast of funding transactions. Equity is floored at zero only after showing the raw residual.",
                "FCFF = EBIT − 税 + 折旧摊销 − 资本开支 − 营运资金增量。企业价值 = 显式现值 + 终值现值；股权 = 企业价值 + 合格流动性 − 债务 − 融资租赁及准备。终值保留资本与营运资金投入。摊薄提高分母但不假设发行收入，属保守压力而非融资预测；展示原始剩余后才将股权下限设为零。",
              )}
            </p>
          </div>
        )}
        <h3 className="mb-3 mt-8 text-lg font-semibold">
          {t("Preset Comparison (Unedited)", "预设情景比较（未编辑）")}
        </h3>
        <Table
          title={t("Scenario comparison", "情景比较")}
          headers={[
            t("Case", "情景"),
            t("Horizon", "期限"),
            t("Final revenue", "末年收入"),
            t("Final FCFF", "末年 FCFF"),
            "EV",
            t("Equity residual", "股权剩余"),
            t("Value/share", "每股情景值"),
          ]}
          rows={(["bear", "base", "bull"] as const).flatMap((c, i) =>
            ([5, 10] as const).map((h) => {
              const r = forecast(CASES[c], h);
              return [
                t(["Bear", "Base", "Bull"][i], ["悲观", "基准", "乐观"][i]),
                h,
                num(r.rows[r.rows.length - 1].revenue),
                num(r.rows[r.rows.length - 1].fcff),
                num(r.enterprise),
                num(r.rawEquity),
                `$${num(r.valuePerShare, 2)}`,
              ];
            }),
          )}
        />
        <h3 className="mb-3 mt-8 text-lg font-semibold">
          {t(
            "Ten-Year Base Sensitivity: Value Per Share",
            "十年基准敏感度：每股情景值",
          )}
        </h3>
        <Table
          title={t("Discount and terminal sensitivity", "折现率与终值敏感度")}
          headers={[
            t("Discount / terminal growth", "折现 / 终值增长"),
            "1.5%",
            "2.5%",
            "3.5%",
          ]}
          rows={[0.11, 0.13, 0.15].map((d) => [
            pct(d),
            ...[0.015, 0.025, 0.035].map(
              (g) =>
                `$${num(forecast({ ...CASES.base, discount: d, terminalGrowth: g }, 10).valuePerShare, 2)}`,
            ),
          ])}
        />
      </Section>
      <Section
        id="transaction"
        title={t(
          "Pending Iridium Transaction: Not Consolidated",
          "待交割 Iridium：尚未合并",
        )}
      >
        <p className="mb-5 max-w-4xl text-sm leading-6">
          {t(
            "Shareholder approval September 24; closing expected mid-2027 subject to remaining conditions. Latest funding: $1,944m gross ATM / 29.3m shares, retained $1,775m Iridium term loans and cancelled $3,600m bridge commitment. June statements already contain ATM issuance; these totals cannot simply be added to June cash and shares.",
            "9 月 24 日股东批准；预计 2027 年中交割，仍须满足条件。最新融资：ATM 毛额 19.44 亿美元 / 2,930 万股、保留 Iridium 定期贷款 17.75 亿美元、取消桥贷承诺 36 亿美元。6 月报表已含 ATM 发行，不能将上述总额直接累加到 6 月现金和股数。",
          )}
        </p>
        <label className="block max-w-xs text-sm">
          {t(
            "Hypothetical closing reference VWAP ($)",
            "假设交割参考 VWAP（美元）",
          )}
          <input
            type="number"
            min={1}
            step={0.01}
            data-testid="rklb-merger-vwap"
            value={Number.isFinite(mergerVwap) ? mergerVwap : ""}
            onChange={(e) =>
              setMergerVwap(
                e.target.value === "" ? NaN : Number(e.target.value),
              )
            }
            className="mt-2 w-full rounded border border-zinc-400 bg-white px-3 py-2"
          />
        </label>
        {transaction ? (
          <div className="mt-5" aria-live="polite">
            <Table
              title={t("Illustrative consideration", "示例对价")}
              headers={[t("Item", "项目"), t("Illustration", "示例")]}
              rows={[
                [
                  t(
                    "Reference Iridium shares, millions (June 24)",
                    "参考 Iridium 股数，百万（6 月 24 日）",
                  ),
                  num(ECONOMICS.iridiumIllustrativeShares, 6),
                ],
                [t("Exchange ratio", "换股比例"), num(transaction.ratio, 4)],
                [
                  t("New RKLB shares, millions", "新增 RKLB 股份，百万"),
                  num(transaction.newShares, 3),
                ],
                [
                  t(
                    "Cash purchase consideration, $m",
                    "现金购买对价，百万美元",
                  ),
                  num(transaction.cashConsideration),
                ],
                [
                  t(
                    "Value per Iridium share at assumed VWAP",
                    "假设 VWAP 下每股 Iridium 对价",
                  ),
                  `$${num(transaction.valuePerIridiumShare, 2)}`,
                ],
              ]}
            />
          </div>
        ) : (
          <p role="alert" className="mt-3 text-rose-700">
            {t("Enter a positive reference VWAP.", "请输入正参考 VWAP。")}
          </p>
        )}
        <p className="mt-4 text-sm leading-6 text-zinc-600">
          {t(
            "The exchange ratio is 0.4000 at or below $67.50; $27 / reference VWAP, rounded to four decimals, inside the collar; 0.2400 at or above $112.50. Cash remains $27 per Iridium share. Actual reference is a contractual ten-day VWAP before closing; this illustration excludes final shares, awards, fees, acquired debt and interim changes. It is not a combined-company DCF.",
            "参考价不高于 67.50 美元时比例为 0.4000；区间内为 27 美元除参考 VWAP，四舍五入至四位；不低于 112.50 美元时为 0.2400。现金部分仍为每股 27 美元。实际采用交割前合同定义的十日 VWAP；示例未含最终股数、奖励、费用、收购债务及期间变动，不是合并公司 DCF。",
          )}
        </p>
        <p className="mt-4 flex flex-wrap gap-4 text-xs">
          <Source url={SOURCES.prospectus} label={t("S-4 terms", "S-4 条款")} />
          <Source
            url={SOURCES.financing}
            label={t("September funding", "9 月融资")}
          />
          <Source
            url={SOURCES.approval}
            label={t("Shareholder vote", "股东表决")}
          />
        </p>
      </Section>
      <Section
        id="financials"
        title={t("SEC Financial Database", "SEC 财务数据库")}
      >
        <h3 className="mb-3 text-lg font-semibold">
          {t("Annual Operating History", "年度经营历史")}
        </h3>
        {financialTable(ANNUAL)}
        <h3 className="mb-3 mt-8 text-lg font-semibold">
          {t("Balance Sheet & Capital Allocation", "资产负债及资本配置")}
        </h3>
        <Table
          title={t("Annual balances", "年度余额")}
          headers={[
            "FY",
            t("Cash", "现金"),
            t("Current securities", "流动证券"),
            t("Noncurrent securities", "非流动证券"),
            t("Restricted cash", "受限现金"),
            t("Assets", "资产"),
            t("Liabilities", "负债"),
            t("Equity", "股东权益"),
            t("Borrowings", "借款"),
            t("Convertible, net", "可转债净额"),
            t("Current debt", "流动债务"),
            t("Inventory", "库存"),
            t("PPE", "固定资产"),
            t("Cash acquisitions", "收购现金"),
            t("Diluted WA shares", "摊薄加权股数"),
            t("ROE*", "ROE*"),
            t("Source", "来源"),
          ]}
          rows={ANNUAL.map((r) => [
            r.fy,
            ...[
              "cash",
              "investmentsCurrent",
              "investmentsNoncurrent",
              "restricted",
              "assets",
              "liabilities",
              "equity",
              "borrowings",
              "convertible",
              "debtCurrent",
              "inventory",
              "ppe",
              "acquisitions",
              "weightedShares",
            ].map((k) => num(v(r, k))),
            pct(r.roe),
            <Source key="s" url={r.source} />,
          ])}
        />
        <p className="mt-3 text-xs leading-6 text-zinc-600">
          {t(
            "*ROE = annual net income / ending common equity, not average equity; N/A for nonpositive equity. FY2020 includes a pre-public operating capital structure with mezzanine preferred claims, so assets less liabilities need not equal common equity. N/A never means zero. SBC and cash capex are not the entire cost of acquisitions or dilution.",
            "*ROE 为年度净利除期末普通股权益，非平均权益；权益非正时为 N/A。2020 年采用上市前资本结构，含夹层优先权，资产减负债不必等于普通股权益。N/A 不代表零，股权薪酬和现金资本开支也不是并购及摊薄的全部成本。",
          )}
        </p>
        <h3 className="mb-3 mt-8 text-lg font-semibold">
          {t("Discrete Quarters", "单季度")}
        </h3>
        {financialTable(QUARTERLY, true)}
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          {t(
            "Cash flows use YTD differences; Q4 = full year less nine months. Q4 EPS and weighted shares are N/A, never subtraction-derived. FCF = reported OCF less cash property/equipment purchases, excludes acquisition cash and noncash capital. These historical levered cash flows differ from forecast unlevered FCFF.",
            "现金流用年初累计差额；Q4 等于全年减九个月。Q4 EPS 和加权股数不做减法，记为 N/A。FCF 为已报告经营现金减设备现金购买，不含并购现金和非现金资本，与预测无杠杆 FCFF 不同。",
          )}
        </p>
        <details className="mt-6 border-y border-zinc-300 py-4">
          <summary
            data-testid="rklb-provenance"
            className="cursor-pointer font-semibold"
          >
            {t("Field-Level SEC Provenance", "逐字段 SEC 来源")}
          </summary>
          <div className="mt-4">
            <Table
              title={t("Field provenance", "字段来源")}
              headers={[
                t("Period", "期间"),
                t("Field", "字段"),
                t("Value", "数值"),
                t("XBRL / derivation", "XBRL / 推导"),
                t("Filed", "提交日期"),
                t("Source", "来源"),
                t("Other input", "另一输入"),
              ]}
              rows={[...ANNUAL, ...QUARTERLY].flatMap((r) =>
                Object.entries(r.p).map(([k, f]) => [
                  `${r.fy}${r.quarter ? ` Q${r.quarter}` : " FY"}`,
                  k,
                  num(f.value, k === "eps" ? 2 : 3),
                  f.tag ?? "N/A",
                  f.filed ?? "N/A",
                  f.source ? <Source key="s" url={f.source} /> : "N/A",
                  f.otherSource ? (
                    <Source key="o" url={f.otherSource} />
                  ) : (
                    "N/A"
                  ),
                ]),
              )}
            />
          </div>
        </details>
        <h3 className="mb-3 mt-8 text-lg font-semibold">
          {t("Historical Valuation Snapshots", "历史估值快照")}
        </h3>
        <Table
          title={t("Historical valuation", "历史估值")}
          headers={[
            "FY",
            t("Price date", "股价日期"),
            t("Close / adjusted", "收盘 / 调整价"),
            t("Common-equivalent shares m", "普通股等价百万股"),
            t("Market cap $m", "市值百万"),
            t("EV proxy $m", "EV 近似百万"),
            "P/S",
            "EV/Sales",
            "P/E",
            t("FCF yield", "FCF 收益率"),
          ]}
          rows={VALUATION_HISTORY.map((r) => [
            r.fy,
            r.priceDate,
            `${num(r.price, 2)} / ${num(r.adjustedPrice, 2)}`,
            num(r.shares, 3),
            num(r.marketCap),
            num(r.enterprise),
            num(r.ps, 2),
            num(r.evSales, 2),
            num(r.pe, 2),
            pct(r.fcfYield),
          ])}
        />
        <p className="mt-3 text-xs leading-6 text-zinc-600">
          {t(
            "Post-combination public-price history only. Market cap uses period-end common shares plus Series A common-equivalents from 2025, not weighted shares. No split mismatch observed in the shown price/adjusted-price series. EV proxy adds reported borrowing/convertible/current debt and deducts cash plus securities; excludes lease, award and transaction adjustments. Annual accounts were published later; this is not a point-in-time trading backtest.",
            "仅采用合并后公开股价。市值用期末普通股，自 2025 年起加 A 类普通股等价份额，非加权股数。所示收盘及调整价无拆股口径差异。EV 近似加借款、可转债和流动债，减现金证券，未调租赁、奖励及交易。年报稍后公布，不是实时历史回测。",
          )}{" "}
          <Source url={PRICE_SOURCE} label={t("Price source", "股价来源")} />
        </p>
      </Section>
      <Section id="filings" title={t("SEC Filing Inventory", "SEC 文件清单")}>
        <p className="mb-4 text-sm text-zinc-600">
          {t(
            "Earlier Vector registrations are inventory only, not Rocket Lab operating statements. Includes merger registrations and final prospectuses; displayed latest-first.",
            "早期 Vector 注册仅为清单，不作为 Rocket Lab 经营报表。包含并购注册及最终招股文件，按提交时间倒序。",
          )}
        </p>
        <details>
          <summary className="mb-4 cursor-pointer font-semibold">
            {t("All filings", "全部文件")} ({FILINGS.length})
          </summary>
          <Table
            title={t("Filing inventory", "文件清单")}
            headers={[
              t("Form", "表格"),
              t("Filed", "提交"),
              t("Report period", "报告期"),
              t("Accession", "编号"),
              t("Document", "文件"),
            ]}
            rows={FILINGS.map((f) => [
              f.form,
              f.filed,
              f.end,
              f.accession,
              <Source key="s" url={f.source} />,
            ])}
          />
        </details>
      </Section>
      <Section
        id="sources"
        title={t("Source Audit & Publication QA", "来源审计与发布核验")}
      >
        <div className="space-y-5">
          {AUDIT.map((a) => (
            <div key={a.en} className="border-b border-zinc-200 pb-4">
              <h3 className="font-semibold">
                {zh ? a.zh : a.en}{" "}
                <span
                  className={`ml-2 text-xs ${a.status === "partial" ? "text-amber-800" : "text-emerald-800"}`}
                >
                  {t(a.status, a.status === "partial" ? "部分" : "完整")}
                </span>
              </h3>
              <p className="my-2 max-w-4xl text-sm leading-6 text-zinc-600">
                {zh ? a.noteZh : a.noteEn}
              </p>
              <Source
                url={a.source}
                label={t("Primary evidence", "主要证据")}
              />
            </div>
          ))}
        </div>
        <h3 className="mb-4 mt-8 text-lg font-semibold">
          {t("Publication QA", "发布核验")}
        </h3>
        <div className="space-y-4">
          {QA.map((q) => (
            <div key={q.en}>
              <strong className="text-sm">
                {zh ? q.zh : q.en} ·{" "}
                {t(
                  q.status,
                  (
                    {
                      pass: "通过",
                      dated: "有日期",
                      warning: "警示",
                    } as const
                  )[q.status],
                )}
              </strong>
              <p className="mt-1 max-w-4xl text-sm leading-6 text-zinc-600">
                {zh ? q.zhNote : q.enNote}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-4xl border-l-4 border-zinc-500 pl-4 text-sm leading-6">
          {t(
            "Educational research only. Scenarios are uncertain and do not guarantee ROI. Refresh SEC data, sources, current capital structure and the merger model before relying on a current investment valuation.",
            "仅供教育研究。情景高度不确定，不保证 ROI。依赖当前投资估值前，应刷新 SEC 数据、来源、当前资本结构及并购模型。",
          )}
        </p>
      </Section>
    </main>
  );
}
