import type { ReactNode } from "react";
import { VST_ANNUAL, type FinancialRow } from "./annualFinancials";
import { VST_QUARTERLY } from "./quarterlyFinancials";
import { VST_FILINGS } from "./filings";
import {
  VST_LATEST_PRICE,
  VST_PRICE_SOURCE,
  VST_VALUATION_HISTORY,
  VST_VALUATION_NOTE,
} from "./valuationHistory";
import {
  VST_GUIDANCE,
  VST_HEDGING,
  VST_OPERATING,
  VST_CONTRACTS,
  VST_SOURCES,
} from "./operatingMetrics";
import {
  VST_SEGMENTS,
  VST_SEGMENT_NOTE,
  VST_SEGMENT_SOURCES,
  VST_CASH_BRIDGE,
} from "./segmentEconomics";
import {
  VST_FORECASTS,
  VST_DCF_CASES,
  VST_DCF_SENSITIVITY,
  VST_MODEL_INPUTS,
  VST_MODEL_NOTE,
  VST_ASSUMPTIONS,
  type Scenario,
} from "./forecastModel";
import { VST_REPORT } from "./reportContent";
import { VST_CHART_GROUPS, VST_RESEARCH_NOTE } from "./researchPlan";
import { VST_AUDIT } from "./sourceAudit";
import { VST_QA } from "./publicationQa";

const number = (value: number | null | undefined, digits = 2) =>
  value == null
    ? "N/A"
    : value.toLocaleString("en-US", {
        maximumFractionDigits: digits,
        minimumFractionDigits: digits,
      });
const billions = (value: number | null | undefined) =>
  value == null ? "N/A" : number(value / 1e9, 3);
const percent = (value: number | null | undefined) =>
  value == null ? "N/A" : `${number(value, 1)}%`;
const scenarios: Scenario[] = ["bear", "base", "bull"];

function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full whitespace-nowrap text-left text-sm">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                className="border-b border-zinc-300 px-3 py-3 font-semibold dark:border-zinc-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-zinc-200 dark:border-zinc-800"
            >
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2.5 tabular-nums">
                  {cell}
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
  unit = "$B",
}: {
  title: string;
  rows: { label: string; value: number | null }[];
  unit?: string;
}) {
  const max = Math.max(1, ...rows.map((row) => Math.abs(row.value ?? 0)));
  return (
    <figure className="min-w-0 border-t border-zinc-300 pt-4 dark:border-zinc-700">
      <figcaption className="mb-4 font-semibold">
        {title}{" "}
        <span className="text-xs font-normal text-zinc-500">{unit}</span>
      </figcaption>
      <div className="space-y-2">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[64px_minmax(0,1fr)_70px] items-center gap-2 text-xs"
          >
            <span>{row.label}</span>
            <div className="h-3 bg-zinc-100 dark:bg-zinc-800">
              {row.value != null && (
                <div
                  title={`${row.label}: ${number(row.value, 3)} ${unit}`}
                  className={`h-3 ${row.value < 0 ? "bg-rose-500" : "bg-emerald-600"}`}
                  style={{ width: `${(Math.abs(row.value) / max) * 100}%` }}
                />
              )}
            </div>
            <span className="text-right tabular-nums">
              {number(row.value, 3)}
            </span>
          </div>
        ))}
      </div>
    </figure>
  );
}

export default function VistraResearchView({
  chinese = false,
}: {
  chinese?: boolean;
}) {
  const t = (en: string, zh: string) => (chinese ? zh : en);
  const caseName = (scenario: Scenario) =>
    t(
      scenario === "bear" ? "Bear" : scenario === "base" ? "Base" : "Bull",
      scenario === "bear" ? "悲观" : scenario === "base" ? "基准" : "乐观",
    );
  const source = (url: string, label = t("Source", "来源")) => (
    <a
      className="text-emerald-700 underline underline-offset-2 dark:text-emerald-400"
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      {label}
    </a>
  );
  const section = (id: string, title: string, children: ReactNode) => (
    <section
      id={id}
      className="scroll-mt-24 border-t border-zinc-200 py-8 dark:border-zinc-800"
    >
      <h2 className="mb-5 text-2xl font-semibold">{title}</h2>
      {children}
    </section>
  );
  const financialTable = (rows: FinancialRow[]) => (
    <DataTable
      headers={[
        t("Period", "期间"),
        t("Revenue", "收入"),
        t("Operating income", "营业利润"),
        t("Net income", "合并净利润"),
        t("Common income", "普通股净利润"),
        "EPS ($)",
        "OCF",
        t("Capex", "资本支出"),
        t("FCF proxy", "FCF 代理"),
        t("Operating margin", "营业利润率"),
        t("Filing", "文件"),
      ]}
      rows={rows.map((row) => [
        row.period ?? `FY${row.year}`,
        billions(row.revenue),
        billions(row.operatingIncome),
        billions(row.netIncome),
        billions(row.commonIncome),
        number(row.dilutedEps),
        billions(row.operatingCashFlow),
        billions(row.capex),
        billions(row.freeCashFlow),
        percent(row.operatingMargin),
        source(row.url, row.form),
      ])}
    />
  );
  const commonCash =
    VST_CASH_BRIDGE.fcfBeforeGrowthMidpoint -
    VST_CASH_BRIDGE.assumedGrowthInvestment -
    VST_CASH_BRIDGE.assumedPreferredDistributions -
    VST_CASH_BRIDGE.assumedClosureCash;

  return (
    <main
      data-company="vst"
      lang={chinese ? "zh" : "en"}
      className="mx-auto w-full min-w-0 max-w-7xl px-4 py-8 text-zinc-900 sm:px-8 dark:text-zinc-100"
    >
      <header className="pb-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-sm">
          <a href="/research" className="underline">
            {t("Research library", "研究库")}
          </a>
          <nav aria-label={t("Language", "语言")} className="flex gap-4">
            <a
              href="/research/vistra-complete-fundamental-analysis"
              aria-current={!chinese ? "page" : undefined}
            >
              English
            </a>
            <a
              href="/research/vistra-complete-fundamental-analysis/zh"
              aria-current={chinese ? "page" : undefined}
            >
              中文
            </a>
          </nav>
        </div>
        <p className="text-sm text-zinc-500">
          {t("Independent fundamental research", "独立基本面研究")} · 2026-10-04
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          {t("Vistra (VST)", "Vistra（VST）")}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8">
          {t(
            "Dispatchable power, retail integration and nuclear contracts: how much cash reaches the common shareholder?",
            "可调度电力、零售协同与核电长约：多少现金真正归普通股股东？",
          )}
        </p>
        <p className="mt-3 text-sm text-zinc-500">
          {t(
            "Latest reported quarter: June 30, 2026. Market reference: October 2 close. USD billions unless stated. N/A means unavailable, not zero. Research, not personalized investment advice.",
            "最新已披露季度：2026 年 6 月 30 日。行情参考：10 月 2 日收盘。除注明外金额单位为十亿美元。N/A 表示缺失，而非零。本研究不构成个性化投资建议。",
          )}
        </p>
        <dl className="mt-6 grid grid-cols-2 gap-6 border-y border-zinc-200 py-5 lg:grid-cols-4 dark:border-zinc-800">
          {[
            [
              t("Reference price", "参考股价"),
              `$${number(VST_LATEST_PRICE.close)}`,
            ],
            [t("Q2 revenue", "Q2 收入"), `$${billions(4.017e9)}B`],
            [t("Q2 adjusted EBITDA", "Q2 调整后 EBITDA"), "$1.767B"],
            [t("2026 FCFbG midpoint", "2026 增长前 FCF 中值"), "$4.325B"],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-sm text-zinc-500">{label}</dt>
              <dd className="mt-1 text-2xl font-semibold tabular-nums">
                {value}
              </dd>
            </div>
          ))}
        </dl>
        <nav
          className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm"
          aria-label={t("Report sections", "报告章节")}
        >
          {[
            ["memo", t("Investment memo", "投资报告")],
            ["dashboard", t("Charts", "图表")],
            ["operations", t("Power economics", "电力经济")],
            ["valuation", t("Valuation", "估值")],
            ["forecast", t("Forecasts", "预测")],
            ["financials", t("Financial history", "财务历史")],
            ["sources", t("Sources & audit", "来源与审计")],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="underline underline-offset-4"
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      {section(
        "memo",
        t("Investment Memo", "投资研究报告"),
        <div className="space-y-8">
          {VST_REPORT.map((item, index) => (
            <article key={item.en} className="max-w-4xl">
              <h3 className="mb-3 text-lg font-semibold">
                {index + 1}. {chinese ? item.zh : item.en}
              </h3>
              <p className="leading-8">
                {chinese ? item.thesisZh : item.thesis}
              </p>
              <ul className="my-3 list-disc space-y-2 pl-5 leading-7">
                {(chinese ? item.bulletsZh : item.bullets).map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              {source(item.source)}
            </article>
          ))}
        </div>,
      )}

      {section(
        "dashboard",
        t("Financial & Valuation Dashboard", "财务与估值图表"),
        <>
          <div className="grid gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {(
              [
                ["revenue", "Revenue", "收入"],
                ["operatingIncome", "Operating income", "营业利润"],
                ["netIncome", "Consolidated net income", "合并净利润"],
                ["operatingCashFlow", "Operating cash flow", "经营现金流"],
                ["capex", "Capital expenditure", "资本支出"],
                ["freeCashFlow", "FCF proxy", "FCF 代理"],
              ] as const
            ).map(([key, en, zh]) => (
              <Bars
                key={key}
                title={t(en, zh)}
                rows={VST_ANNUAL.map((row) => ({
                  label: `${row.year}`,
                  value: row[key] == null ? null : row[key] / 1e9,
                }))}
              />
            ))}
            <Bars
              title={t("Q2 2026 segment EBITDA", "2026 Q2 分部 EBITDA")}
              rows={VST_SEGMENTS.map((row) => ({
                label: row.name.split(" ")[0],
                value: row.q22026 / 1e9,
              }))}
            />
            <Bars
              title={t(
                "Hedged generation · Aug 3",
                "发电量套期保值 · 8 月 3 日",
              )}
              unit="%"
              rows={VST_HEDGING.map((row) => ({
                label: `${row.year}`,
                value: row.hedgedPercent,
              }))}
            />
            <Bars
              title={t("Ongoing adjusted EBITDA", "持续运营调整后 EBITDA")}
              rows={VST_OPERATING.map((row) => ({
                label: row.period,
                value: row.adjustedEbitda / 1e9,
              }))}
            />
            <Bars
              title={t("Year-end share price", "年末股价")}
              unit="$"
              rows={VST_VALUATION_HISTORY.map((row) => ({
                label: `${row.year}`,
                value: row.close,
              }))}
            />
            <Bars
              title={t("Historical P/S proxy", "历史市销率代理")}
              unit="x"
              rows={VST_VALUATION_HISTORY.map((row) => ({
                label: `${row.year}`,
                value: row.priceToSales,
              }))}
            />
            <Bars
              title={t("2035 common cash scenarios", "2035 普通股现金流情景")}
              rows={scenarios.map((s) => ({
                label: caseName(s),
                value: VST_FORECASTS[s].at(-1)!.freeCashFlow / 1e9,
              }))}
            />
          </div>
          <p className="mt-5 text-sm text-zinc-500">
            {t(
              "Green = positive; red = negative. Bar length is absolute magnitude; sign is preserved in labels. Quarterly EBITDA is not comparable in duration with full years. FCF proxy is OCF less reported PPE capex, not adjusted FCFbG.",
              "绿色为正，红色为负。条长表示绝对值，标签保留正负号。季度 EBITDA 与年度数据期间不同。FCF 代理为经营现金流减披露的 PP&E 资本支出，不等于调整后增长前 FCF。",
            )}
          </p>
        </>,
      )}

      {section(
        "operations",
        t("Operating Economics & Capital Allocation", "经营经济与资本配置"),
        <div className="space-y-6">
          <DataTable
            headers={[
              t("Ongoing EBITDA", "持续运营 EBITDA"),
              "FY2024",
              "FY2025",
              "Q2 2025",
              "Q2 2026",
            ]}
            rows={VST_SEGMENTS.map((row) => [
              row.name,
              billions(row.fy2024),
              billions(row.fy2025),
              billions(row.q22025),
              billions(row.q22026),
            ])}
          />
          <p className="text-sm leading-7">
            {t(
              VST_SEGMENT_NOTE,
              "表中为调整后 EBITDA，而非收入。持续运营不含资产关闭分部，取整可能产生 100 万美元差异。年度采用最新年度业绩口径，季度采用 Q2 业绩口径。",
            )}{" "}
            {VST_SEGMENT_SOURCES.map((url, i) => (
              <span key={url}>
                {source(url, `${t("Source", "来源")} ${i + 1}`)}{" "}
              </span>
            ))}
          </p>
          <DataTable
            headers={[
              t("Company outlook · Aug 7", "公司展望 · 8 月 7 日"),
              t("Low", "下限"),
              t("High", "上限"),
            ]}
            rows={[
              [
                t("2026 ongoing adjusted EBITDA", "2026 持续运营调整后 EBITDA"),
                billions(VST_GUIDANCE.ebitdaLow),
                billions(VST_GUIDANCE.ebitdaHigh),
              ],
              [
                t(
                  "2026 ongoing adjusted FCF before growth",
                  "2026 持续运营调整后增长前 FCF",
                ),
                billions(VST_GUIDANCE.fcfLow),
                billions(VST_GUIDANCE.fcfHigh),
              ],
              [
                t(
                  "2027 EBITDA opportunity (not guidance)",
                  "2027 EBITDA 机会（非指引）",
                ),
                billions(VST_GUIDANCE.opportunity2027Low),
                billions(VST_GUIDANCE.opportunity2027High),
              ],
            ]}
          />
          <p className="leading-7">
            {t(
              "H1 2026 reported OCF of $2.222B less $1.572B capex gives $0.650B FCF proxy. The annual adjusted FCFbG midpoint cannot be treated as common-shareholder cash. Our illustrative 2026 bridge subtracts $1.100B growth investment, $0.192B preferred distributions and $0.100B closure cash from $4.325B to obtain $2.933B; collateral/working-capital demands can further affect liquidity.",
              "2026 上半年披露的经营现金流 22.22 亿美元减资本支出 15.72 亿美元，得到 6.50 亿美元 FCF 代理。全年调整后增长前 FCF 中值不能直接视为普通股现金。示例桥接从 43.25 亿美元扣除 11 亿美元增长投资、1.92 亿美元优先股分配和 1 亿美元关闭现金，得到 29.33 亿美元；抵押品和营运资本变化仍会影响流动性。",
            )}{" "}
            <span className="tabular-nums">(${billions(commonCash)}B)</span>{" "}
            {source(VST_GUIDANCE.source)}
          </p>
          <p className="text-sm text-zinc-500">
            {t(
              VST_CASH_BRIDGE.note,
              "上述扣除均为分析师估计，而非公司现金流调节表。借款不算经营现金，增长前调整后 FCF 排除的抵押品及营运资本变化仍可能消耗现金。",
            )}
          </p>
          <DataTable
            headers={[
              t("Nuclear agreement", "核电协议"),
              t("Capacity MW", "容量 MW"),
              t("Term years", "年限"),
              t("Incremental MW", "新增 MW"),
              t("Source", "来源"),
            ]}
            rows={VST_CONTRACTS.map((row) => [
              row.name,
              number(row.capacityMw, 0),
              row.durationYears,
              number(row.incrementalMw, 0),
              source(row.source),
            ])}
          />
          <p className="leading-7">
            {t(
              "Meta's 2,609 MW includes 2,176 MW of existing capacity and 433 MW of uprates. Delivery ramps from late 2026, with the full program expected by 2034. Undisclosed contract prices are not invented. Helix's up-to-$1B commitment is modeled as spending without speculative returns.",
              "Meta 的 2,609 MW 包含 2,176 MW 现有容量和 433 MW 扩容。交付从 2026 年末逐步启动，全部计划预计于 2034 年实现。合同未披露的价格不作虚构。Helix 至多 10 亿美元承诺只计支出，不计臆测回报。",
            )}
          </p>
          <p className="leading-7">
            {t(
              "Post-quarter financing: on September 10 Vistra priced $1.5B of junior subordinated notes (7.00%/7.25%), intended partly for preferred redemptions. Closing was expected September 24. This is not evidence of completed redemptions. The model retains June balances and $192M annual preferred distributions; transaction completion and the net interest/distribution change require a new bridge.",
              "季度后融资：9 月 10 日 Vistra 为 15 亿美元次级债定价，利率为 7.00%/7.25%，部分资金拟用于赎回优先股，预计 9 月 24 日交割。这不能证明赎回已完成。模型保留 6 月资产负债和每年 1.92 亿美元优先股分配，后续需核对交易完成与利息/分配净变化。",
            )}{" "}
            {source(VST_SOURCES.financing)}
          </p>
        </div>,
      )}

      {section(
        "valuation",
        t("Common-Equity DCF & Claims Bridge", "普通股 DCF 与资本索取权桥接"),
        <div className="space-y-6">
          <DataTable
            headers={[
              t("Scenario", "情景"),
              t("Cost of equity", "权益资本成本"),
              t("Terminal growth", "永续增长"),
              t("Fair value / share", "每股估值"),
              t("vs reference", "相对参考价"),
              t("Terminal weight", "终值占比"),
            ]}
            rows={scenarios.map((s) => {
              const d = VST_DCF_CASES[s];
              return [
                caseName(s),
                percent(d.discountRate),
                percent(d.terminalGrowth),
                `$${number(d.valuePerShare)}`,
                percent(d.upsidePercent),
                percent(d.terminalWeight),
              ];
            })}
          />
          <p className="leading-7">
            {t(
              VST_MODEL_NOTE,
              "分析师情景，并非公司指引。普通股 DCF 从 2026 年 10 月 4 日开始，只计 2026 全年估计普通股现金的四分之一及 2027—2035 全年现金；Q4 配置是季节性近似，不是已披露 Q3/Q4 结果。增长前 FCF 扣除增长投资、每年 1.92 亿美元优先股分配、1 亿美元关闭现金及 2027—2028 分摊的 10 亿美元 Helix 承诺。不计 Helix 回报、尚未核实的 Cogentrix 收益、未披露 PPA 溢价、新借款或未来回购缩股。以固定股数和融资成本近似稳定资本结构。税后、付息后普通股现金用权益成本折现，不能再扣净债务。企业价值加入债务、融资、优先股、远期回购及少数股东索取权。核电退役信托和受限抵押资金不是可分配现金。终值假设持续再投资，资产寿命、许可和套期保值重定价仍存在风险。",
            )}
          </p>
          <DataTable
            headers={[
              t(
                "Market EV bridge (June balances / Oct 2 price)",
                "市场 EV 桥接（6 月余额 / 10 月 2 日股价）",
              ),
              "$B",
            ]}
            rows={[
              [
                t(
                  "Common market cap: spot shares 335.961M",
                  "普通股市值：期末股数 3.35961 亿",
                ),
                billions(VST_LATEST_PRICE.close * VST_GUIDANCE.spotShares),
              ],
              [
                t(
                  "Debt + receivables/margin financing",
                  "债务 + 应收/保证金融资",
                ),
                billions(VST_MODEL_INPUTS.debtAndFinancing),
              ],
              [
                t("Less unrestricted cash", "减非受限现金"),
                billions(-VST_GUIDANCE.cash),
              ],
              [
                t(
                  "Preferred + forward repurchase + minority",
                  "优先股 + 远期回购 + 少数股东",
                ),
                billions(VST_MODEL_INPUTS.otherClaims),
              ],
              [
                t("Illustrative enterprise value", "示例企业价值"),
                billions(VST_MODEL_INPUTS.enterpriseValue),
              ],
              [
                t(
                  "EV / 2026 EBITDA midpoint (x)",
                  "EV / 2026 EBITDA 中值（倍）",
                ),
                number(VST_MODEL_INPUTS.forwardEvEbitda),
              ],
            ]}
          />
          <p className="text-sm text-zinc-500">
            {t(
              "DCF uses Q2 diluted weighted-average shares of 339.231M; current market cap uses June period-end shares. Forward repurchase is treated conservatively as a separate claim with no assumed share benefit. Cash-flow scenarios are a June-financing baseline, not an October pro-forma balance sheet.",
              "DCF 用 Q2 稀释加权平均股数 3.39231 亿，当前市值用 6 月期末股数。远期回购保守地作为独立索取权，不预设缩股收益。情景采用 6 月融资基线，并非 10 月备考资产负债表。",
            )}
          </p>
          <h3 className="text-lg font-semibold">
            {t("Base-case sensitivity · $ / share", "基准敏感性 · 美元/股")}
          </h3>
          <DataTable
            headers={[
              t("Cost of equity / terminal growth", "权益成本 / 永续增长"),
              "1%",
              "2%",
              "3%",
            ]}
            rows={VST_DCF_SENSITIVITY.map((row) => [
              `${row.discount}%`,
              ...row.values.map((v) => `$${number(v)}`),
            ])}
          />
          <h3 className="text-lg font-semibold">
            {t("Historical valuation proxies", "历史估值代理")}
          </h3>
          <DataTable
            headers={[
              t("Year", "年份"),
              t("Price date", "股价日期"),
              t("Close $", "收盘价 $"),
              t("Equity $B", "市值 $B"),
              "P/S",
              t("Common P/E", "普通股 P/E"),
              t("FCF proxy yield", "FCF 代理收益率"),
            ]}
            rows={VST_VALUATION_HISTORY.map((row) => [
              row.year,
              row.date ?? "N/A",
              number(row.close),
              billions(row.equityValue),
              number(row.priceToSales),
              number(row.priceToEarnings),
              percent(row.fcfYield),
            ])}
          />
          <p className="text-sm leading-7">
            {t(
              VST_VALUATION_NOTE,
              "采用未按股息调整的日收盘价及当年稀释加权平均股数，属于估值代理，不是交易所报告市值。不作股票拆分调整，未来刷新应重新核对公司行动。普通股亏损年份不展示 P/E。历史 EV 缺少优先股、融资及少数股东核对，故不展示。",
            )}{" "}
            {source(VST_PRICE_SOURCE)}
          </p>
        </div>,
      )}

      {section(
        "forecast",
        t("Ten-Year Analyst Scenarios", "十年分析师情景"),
        <div className="space-y-8">
          {scenarios.map((s) => (
            <div key={s}>
              <h3 className="mb-3 text-lg font-semibold">{caseName(s)}</h3>
              <p className="mb-3 text-sm">
                {t("Annual EBITDA growth", "年度 EBITDA 增速")}:{" "}
                {percent(VST_ASSUMPTIONS[s].growth * 100)} ·{" "}
                {t("FCFbG / EBITDA", "增长前 FCF / EBITDA")}:{" "}
                {percent(VST_ASSUMPTIONS[s].conversion * 100)} ·{" "}
                {t("Revenue growth after 2026", "2026 后收入增速")}:{" "}
                {percent(VST_ASSUMPTIONS[s].revenueGrowth * 100)}
              </p>
              <DataTable
                headers={[
                  t("Year", "年份"),
                  t("Revenue", "收入"),
                  t("Growth", "增速"),
                  "EBITDA",
                  "FCFbG",
                  t("Growth investment", "增长投资"),
                  "Helix",
                  t("Preferred", "优先股"),
                  t("Closure", "关闭"),
                  t("Common FCF", "普通股 FCF"),
                  t("FCF margin", "FCF 利润率"),
                ]}
                rows={VST_FORECASTS[s].map((row) => [
                  row.year,
                  billions(row.revenue),
                  percent(row.revenueGrowth),
                  billions(row.adjustedEbitda),
                  billions(row.fcfBeforeGrowth),
                  billions(row.growthInvestment),
                  billions(row.helixInvestment),
                  billions(row.preferredDistributions),
                  billions(row.closureCash),
                  billions(row.freeCashFlow),
                  percent(row.fcfMargin),
                ])}
              />
            </div>
          ))}
        </div>,
      )}

      {section(
        "financials",
        t("SEC Financial History", "SEC 财务历史"),
        <div className="space-y-6">
          <p className="text-sm leading-7">
            {t(
              "Annual operating rows are matched to original filings; 2017 is partial. Consolidated net income includes noncontrolling interests; common income deducts their allocation and preferred dividends. Q4 flow values are annual less Q1–Q3; Q4 EPS is intentionally not derived. Quarter cash flows use YTD differences. Early capex classifications can omit nuclear-fuel/LTSA spending, so FCF is labeled a proxy.",
              "年度经营数据匹配原始申报，2017 为部分数据。合并净利润含少数股东损益，普通股净利润扣除其分配与优先股股息。Q4 流量指标为全年减前三季，Q4 EPS 不作差额推算。季度现金流用年初至今差额。早期资本支出口径可能不含核燃料/LTSA 支出，因此 FCF 标为代理值。",
            )}
          </p>
          {financialTable(VST_ANNUAL)}
          <h3 className="text-lg font-semibold">
            {t("Annual balance sheets · $B", "年度资产负债 · 十亿美元")}
          </h3>
          <DataTable
            headers={[
              t("Year", "年份"),
              t("Cash", "现金"),
              t("Assets", "资产"),
              t("Liabilities", "负债"),
              t("Equity", "股东权益"),
              t("Debt", "债务"),
              t("Net margin", "净利润率"),
              t("FCF margin", "FCF 利润率"),
              t("ROE proxy", "ROE 代理"),
            ]}
            rows={VST_ANNUAL.map((row) => [
              row.year,
              billions(row.cash),
              billions(row.assets),
              billions(row.liabilities),
              billions(row.equity),
              billions(row.debt),
              percent(row.netMargin),
              percent(row.fcfMargin),
              percent(row.roe),
            ])}
          />
          <p className="text-sm text-zinc-500">
            {t(
              "ROE proxy = common income / period-end stockholders' equity, including preferred; it is not return on average common equity. Gross profit/margin is not consistently disclosed and remains unavailable.",
              "ROE 代理 = 普通股净利润 / 期末股东权益（含优先股），不等于平均普通股权益回报。毛利/毛利率未持续披露，保留为缺失。",
            )}
          </p>
          <h3 className="text-lg font-semibold">
            {t("Quarterly history", "季度历史")}
          </h3>
          {financialTable(VST_QUARTERLY.slice(-12).slice().reverse())}
          <details>
            <summary className="cursor-pointer py-3 underline">
              {t("Earlier quarters", "更早季度")}
            </summary>
            {financialTable(VST_QUARTERLY.slice(0, -12).slice().reverse())}
          </details>
        </div>,
      )}

      {section(
        "sources",
        t("Sources, Coverage & Publication Checks", "来源、覆盖与发布核查"),
        <div className="space-y-6">
          <p className="leading-7">
            {t(
              VST_RESEARCH_NOTE,
              "研究范围：重组后的文件、八个有经营数据的年度及部分 2017 数据、至 2026 Q2 的季度历史、电力经济与十年现金流情景。不拼接前身企业历史。",
            )}
          </p>
          <ul className="space-y-2 text-sm">
            {VST_CHART_GROUPS.map((group) => (
              <li key={group.en}>
                <strong>{chinese ? group.zh : group.en}:</strong>{" "}
                {t(
                  group.charts.join(" · "),
                  group.zh === "财务历史"
                    ? "收入 · 营业利润 · 合并净利润 · 经营现金流 · 资本支出 · FCF 代理"
                    : group.zh === "电力经济"
                      ? "分部 EBITDA · 套期保值比例 · 调整后 EBITDA"
                      : "年末股价 · 历史市销率 · 普通股现金流情景 · DCF 敏感性",
                )}
              </li>
            ))}
          </ul>
          {VST_AUDIT.map((row) => (
            <div key={row.area} className="border-l-2 border-zinc-300 pl-4">
              <h3 className="font-semibold">
                {row.area} · {row.status}
              </h3>
              <p className="my-2 text-sm leading-7">
                {chinese ? row.noteZh : row.note}
              </p>
              {source(row.url)}
            </div>
          ))}
          {VST_QA.map((row) => (
            <p key={row.check} className="text-sm leading-7">
              <strong>
                {row.check} · {row.status}:
              </strong>{" "}
              {chinese ? row.noteZh : row.note}
            </p>
          ))}
          <details>
            <summary className="cursor-pointer py-3 font-semibold">
              {t("Filing inventory", "申报文件清单")} ({VST_FILINGS.length})
            </summary>
            <DataTable
              headers={[
                t("Filed", "申报日"),
                t("Period end", "期间末"),
                t("Form", "表格"),
                t("Accession", "编号"),
              ]}
              rows={VST_FILINGS.slice()
                .reverse()
                .map((row) => [
                  row.filed,
                  row.end || "N/A",
                  source(row.url, row.form),
                  row.accessionNumber,
                ])}
            />
          </details>
        </div>,
      )}
    </main>
  );
}
