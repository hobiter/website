import type { ReactNode } from "react";
import { AMZN_ANNUAL, type FinancialRow } from "./annualFinancials";
import { AMZN_QUARTERLY } from "./quarterlyFinancials";
import { AMZN_FILINGS } from "./filings";
import { AMZN_SEGMENTS, AMZN_CHANNELS } from "./segmentEconomics";
import {
  AMZN_LATEST_PRICE,
  AMZN_PRICE_SOURCE,
  AMZN_VALUATION_HISTORY,
  AMZN_SPLIT_EVENTS,
} from "./valuationHistory";
import {
  AMZN_OPERATING,
  AMZN_GUIDANCE,
  AMZN_CASH_BRIDGE,
  AMZN_SOURCES,
} from "./operatingMetrics";
import {
  AMZN_FORECASTS,
  AMZN_DCF_CASES,
  AMZN_DCF_SENSITIVITY,
  AMZN_ASSUMPTIONS,
  AMZN_MODEL_INPUTS,
  AMZN_MODEL_NOTE,
  type Scenario,
} from "./forecastModel";
import { AMZN_REPORT } from "./reportContent";
import { AMZN_CHART_GROUPS, AMZN_RESEARCH_NOTE } from "./researchPlan";
import { AMZN_AUDIT } from "./sourceAudit";
import { AMZN_QA } from "./publicationQa";

const number = (v: number | null | undefined, digits = 2) =>
  v == null
    ? "N/A"
    : v.toLocaleString("en-US", {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      });
const billion = (v: number | null | undefined) =>
  v == null ? "N/A" : number(v / 1e9, 3);
const percent = (v: number | null | undefined) =>
  v == null ? "N/A" : `${number(v, 1)}%`;
const scenarios: Scenario[] = ["bear", "base", "bull"];
function Table({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full whitespace-nowrap text-left text-sm">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
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
  unit = "$B",
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
            className="grid grid-cols-[4.25rem_minmax(0,1fr)_5rem] items-center gap-2 text-xs"
          >
            <span>{r.label}</span>
            <div className="h-3 bg-zinc-100 dark:bg-zinc-800">
              <div
                title={r.value == null ? "N/A" : number(r.value)}
                className={`h-3 ${r.value != null && r.value < 0 ? "bg-rose-600" : "bg-emerald-600"}`}
                style={{ width: `${(Math.abs(r.value ?? 0) / max) * 100}%` }}
              />
            </div>
            <span className="text-right tabular-nums">{number(r.value)}</span>
          </div>
        ))}
      </div>
    </figure>
  );
}
export default function AmazonResearchView({
  chinese = false,
}: {
  chinese?: boolean;
}) {
  const t = (en: string, zh: string) => (chinese ? zh : en);
  const locale = chinese ? "zh" : "en";
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
  const caseName = (s: Scenario) =>
    ({
      bear: t("Bear", "悲观"),
      base: t("Base", "基准"),
      bull: t("Bull", "乐观"),
    })[s];
  const segmentName = (name: string) =>
    name === "North America"
      ? t("North America", "北美")
      : name === "International"
        ? t("International", "国际")
        : name;
  const latest = AMZN_QUARTERLY.at(-1)!;
  const annualCharts = AMZN_ANNUAL.slice(-10);
  const financialTable = (rows: FinancialRow[]) => (
    <Table
      headers={[
        t("Period", "期间"),
        t("Revenue", "收入"),
        t("Gross profit", "毛利"),
        t("Operating profit", "营业利润"),
        t("Net income", "净利润"),
        "EPS ($)",
        "OCF",
        t("Gross capex", "毛投入"),
        t("Net capex", "净投入"),
        "FCF",
        t("Op margin", "营业利润率"),
        t("Filing", "文件"),
      ]}
      rows={rows.map((r) => [
        r.period ?? `FY${r.year}`,
        billion(r.revenue),
        billion(r.grossProfit),
        billion(r.operatingIncome),
        billion(r.netIncome),
        number(r.dilutedEps, 4),
        billion(r.operatingCashFlow),
        billion(r.capex),
        billion(r.netCapex),
        billion(r.freeCashFlow),
        percent(r.operatingMargin),
        source(r.url, r.form),
      ])}
    />
  );
  const channels: Record<string, [string, string]> = {
    OnlineStoresMember: ["Online stores", "线上商店"],
    PhysicalStoresMember: ["Physical stores", "实体商店"],
    ThirdPartySellerServicesMember: ["Seller services", "卖家服务"],
    AdvertisingServicesMember: ["Advertising", "广告"],
    SubscriptionServicesMember: ["Subscriptions", "订阅"],
    AmazonWebServicesMember: ["AWS", "AWS"],
    OtherServicesMember: ["Other", "其他"],
  };
  return (
    <main
      data-company="amzn"
      lang={chinese ? "zh" : "en"}
      className="mx-auto w-full min-w-0 max-w-7xl px-4 py-8 text-zinc-900 sm:px-8 dark:text-zinc-100 [&_section]:scroll-mt-32"
    >
      <header className="pb-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-sm">
          <a href="/research" className="underline">
            {t("Research library", "研究库")}
          </a>
          <nav aria-label={t("Language", "语言")} className="flex gap-4">
            <a
              href="/research/amazon-complete-fundamental-analysis"
              aria-current={!chinese ? "page" : undefined}
            >
              English
            </a>
            <a
              href="/research/amazon-complete-fundamental-analysis/zh"
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
          {t("Amazon (AMZN)", "亚马逊（AMZN）")}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8">
          {t(
            "AWS growth, retail productivity and AI investment: how much operating profit becomes shareholder cash?",
            "AWS 增长、零售效率与 AI 投入：多少经营利润能变成股东现金？",
          )}
        </p>
        <p className="mt-3 text-sm leading-6 text-zinc-500">
          {AMZN_RESEARCH_NOTE[locale]}
        </p>
        <dl className="mt-6 grid grid-cols-2 gap-6 border-y border-zinc-200 py-5 lg:grid-cols-4 dark:border-zinc-800">
          {[
            [
              t("Oct 2 reference price", "10 月 2 日参考股价"),
              `$${number(AMZN_LATEST_PRICE.close)}`,
            ],
            [t("Q2 revenue", "Q2 收入"), `$${billion(latest.revenue)}B`],
            [
              t("Q2 operating profit", "Q2 营业利润"),
              `$${billion(latest.operatingIncome)}B`,
            ],
            [
              t("TTM company FCF", "过去十二个月公司 FCF"),
              `-$${billion(-AMZN_CASH_BRIDGE.ttm.freeCashFlow)}B`,
            ],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-sm text-zinc-500">{label}</dt>
              <dd className="mt-1 break-words text-xl font-semibold tabular-nums">
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
            ["operations", t("Business economics", "业务经济性")],
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
      <section
        id="memo"
        className="border-t border-zinc-200 py-8 dark:border-zinc-800"
      >
        <h2 className="mb-6 text-2xl font-semibold">
          {t("Investment Memo", "投资报告")}
        </h2>
        <div className="grid gap-x-10 gap-y-8 lg:grid-cols-2">
          {AMZN_REPORT.map((r) => (
            <article key={r.id} className="min-w-0">
              <h3 className="text-lg font-semibold">
                {chinese ? r.titleZh : r.title}
              </h3>
              <p className="mt-3 leading-7">
                {chinese ? r.thesisZh : r.thesis}
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
                {(chinese ? r.bulletsZh : r.bullets).map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-zinc-500">{source(r.source)}</p>
            </article>
          ))}
        </div>
      </section>
      <section
        id="dashboard"
        className="border-t border-zinc-200 py-8 dark:border-zinc-800"
      >
        <h2 className="text-2xl font-semibold">
          {t("Financial Dashboard", "财务图表")}
        </h2>
        <p className="mt-2 text-sm text-zinc-500">
          {t(
            "Rose bars indicate negative values. Historical charts use the last ten years; full tables follow below.",
            "红色柱表示负值。历史图表展示最近十年，下方提供完整数据表。",
          )}
        </p>
        <div className="mt-6 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {(
            [
              ["revenue", t("Revenue", "收入"), "$B"],
              ["operatingIncome", t("Operating income", "营业利润"), "$B"],
              ["operatingMargin", t("Operating margin", "营业利润率"), "%"],
              ["dilutedEps", t("Split-adjusted EPS", "拆股调整 EPS"), "$"],
              [
                "operatingCashFlow",
                t("Operating cash flow", "经营现金流"),
                "$B",
              ],
              ["capex", t("Gross cash capex", "毛现金投入"), "$B"],
              ["netCapex", t("Net cash capex", "净现金投入"), "$B"],
              ["freeCashFlow", t("Company FCF", "公司 FCF"), "$B"],
              ["stockComp", t("Stock compensation", "股权薪酬"), "$B"],
            ] as [keyof FinancialRow, string, string][]
          ).map(([key, title, unit]) => (
            <Bars
              key={key}
              title={title}
              unit={unit}
              rows={annualCharts.map((r) => ({
                label: `${r.year}`,
                value:
                  typeof r[key] === "number"
                    ? (r[key] as number) / (unit === "$B" ? 1e9 : 1)
                    : null,
              }))}
            />
          ))}
          {(["priceToSales", "priceToEarnings"] as const).map((key) => (
            <Bars
              key={key}
              title={
                key === "priceToSales"
                  ? t("Historical P/S proxy", "历史市销率近似值")
                  : t("Historical P/E proxy", "历史市盈率近似值")
              }
              unit="x"
              rows={AMZN_VALUATION_HISTORY.slice(-10).map((r) => ({
                label: `${r.year}`,
                value: r[key],
              }))}
            />
          ))}
          {scenarios.map((s) => (
            <Bars
              key={s}
              title={`${caseName(s)} · ${t("Unlevered FCF forecast", "无杠杆 FCF 预测")}`}
              rows={AMZN_FORECASTS[s].map((r) => ({
                label: `${r.year}`,
                value: r.freeCashFlow / 1e9,
              }))}
            />
          ))}
          <Bars
            title={t("Base revenue forecast", "基准收入预测")}
            rows={AMZN_FORECASTS.base.map((r) => ({
              label: `${r.year}`,
              value: r.revenue / 1e9,
            }))}
          />
          <Bars
            title={t("DCF value per share", "DCF 每股价值")}
            unit="$"
            rows={scenarios.map((s) => ({
              label: caseName(s),
              value: AMZN_DCF_CASES[s].valuePerShare,
            }))}
          />
        </div>
      </section>
      <section
        id="operations"
        className="border-t border-zinc-200 py-8 dark:border-zinc-800"
      >
        <h2 className="mb-5 text-2xl font-semibold">
          {t("Business Economics", "业务经济性")}
        </h2>
        <h3 className="mb-3 text-lg font-semibold">
          {t("Q2 2026 segments", "2026 年第二季度分部")}
        </h3>
        <Table
          headers={[
            t("Segment", "分部"),
            t("Revenue", "收入"),
            t("Operating profit", "营业利润"),
            t("Margin", "利润率"),
            t("Source", "来源"),
          ]}
          rows={AMZN_SEGMENTS.filter((r) => r.period === "2026 Q2").map((r) => [
            segmentName(r.name),
            billion(r.revenue),
            billion(r.operatingIncome),
            percent(r.operatingMargin),
            source(r.url),
          ])}
        />
        <div className="my-6 grid gap-8 md:grid-cols-2">
          <Bars
            title={t("Q2 segment revenue", "Q2 分部收入")}
            rows={AMZN_SEGMENTS.filter((r) => r.period === "2026 Q2").map(
              (r) => ({
                label:
                  r.name === "North America"
                    ? t("N. America", "北美")
                    : r.name === "International"
                      ? t("Intl.", "国际")
                      : r.name,
                value: r.revenue / 1e9,
              }),
            )}
          />
          <Bars
            title={t("Q2 segment operating profit", "Q2 分部营业利润")}
            rows={AMZN_SEGMENTS.filter((r) => r.period === "2026 Q2").map(
              (r) => ({
                label:
                  r.name === "North America"
                    ? t("N. America", "北美")
                    : r.name === "International"
                      ? t("Intl.", "国际")
                      : r.name,
                value: (r.operatingIncome ?? 0) / 1e9,
              }),
            )}
          />
        </div>
        <details className="my-5">
          <summary className="cursor-pointer font-semibold">
            {t(
              "Historical disclosed segments (2018 onward; FY and Q1-Q3)",
              "历史分部（2018 年起，全年及前三季度）",
            )}
          </summary>
          <Table
            headers={[
              t("Period", "期间"),
              t("Segment", "分部"),
              t("Revenue", "收入"),
              t("Operating profit", "营业利润"),
              t("Margin", "利润率"),
            ]}
            rows={AMZN_SEGMENTS.map((r) => [
              r.period,
              segmentName(r.name),
              billion(r.revenue),
              billion(r.operatingIncome),
              percent(r.operatingMargin),
            ])}
          />
        </details>
        <h3 className="mt-6 text-lg font-semibold">
          {t("Q2 revenue channels", "Q2 收入渠道")}
        </h3>
        <div className="my-5 max-w-xl">
          <Bars
            title={t("Q2 channel revenue", "Q2 渠道收入")}
            rows={AMZN_CHANNELS.map((r, i) => ({
              label: chinese
                ? channels[r.member.split(":")[1]][1]
                : [
                    "Online",
                    "Physical",
                    "Sellers",
                    "Ads",
                    "Subs.",
                    "AWS",
                    "Other",
                  ][i],
              value: r.revenue / 1e9,
            }))}
          />
        </div>
        <Table
          headers={[
            t("Channel", "渠道"),
            t("Revenue", "收入"),
            t("Source", "来源"),
          ]}
          rows={AMZN_CHANNELS.map((r) => {
            const label = channels[r.member.split(":")[1]];
            return [
              label ? t(...label) : r.member,
              billion(r.revenue),
              source(r.url),
            ];
          })}
        />
        <p className="mt-3 text-sm text-zinc-500">
          {t(
            "Channels reconcile to consolidated sales, but overlap the geographic/AWS segment view. Advertising profit, GMV and Prime subscriber count are N/A.",
            "渠道合计与集团收入一致，但与地区及 AWS 分部重叠。广告利润、GMV 与 Prime 用户数为 N/A。",
          )}
        </p>
        <h3 className="mt-7 text-lg font-semibold">
          {t("Cash conversion bridge", "现金转化桥接")}
        </h3>
        <Table
          headers={[
            t("Period", "期间"),
            "OCF",
            t("Gross capex", "毛投入"),
            t("Proceeds", "回收及补贴"),
            t("Net capex", "净投入"),
            "FCF",
            t("Lease principal", "租赁本金"),
            t("Other financing principal", "其他融资本金"),
            t("After principal", "扣本金后现金"),
            "SBC",
          ]}
          rows={Object.entries(AMZN_CASH_BRIDGE).map(([period, r]) => [
            period.toUpperCase(),
            billion(r.operatingCashFlow),
            billion(r.grossCapex),
            billion(r.proceeds),
            billion(r.netCapex),
            billion(r.freeCashFlow),
            billion(r.financePrincipal),
            billion(r.financingPrincipal),
            billion(r.afterPrincipal),
            billion(r.stockComp),
          ])}
        />
        <p className="mt-3 text-sm text-zinc-500">
          {t(
            "After-principal cash is still before acquisitions and strategic equity investments. SBC is added back in reported OCF but retained as a cost in our operating DCF.",
            "扣本金后现金仍未扣收购与战略股权投资；报告经营现金流加回股权薪酬，但经营 DCF 保留其成本。",
          )}
        </p>
        <Table
          headers={[
            t("Disclosure at June 30", "6 月 30 日披露"),
            t("Value", "金额"),
            t("Treatment", "处理"),
          ]}
          rows={[
            [
              t(
                "AWS RPO / weighted remaining life",
                "AWS 为主的剩余履约义务 / 加权剩余期限",
              ),
              `${billion(AMZN_OPERATING.remainingPerformanceObligations)} / 6.4 ${t("years", "年")}`,
              t("Not next-year revenue", "非下一年收入"),
            ],
            [
              t("H1 finance-leased equipment", "H1 融资租赁设备"),
              billion(AMZN_OPERATING.noncashFinanceLeaseAdditionsH1),
              t("Noncash investment", "非现金投入"),
            ],
            [
              t("H1 unpaid equipment increase", "H1 未付款设备增加"),
              billion(AMZN_OPERATING.unpaidEquipmentIncreaseH1),
              t("Payment timing", "支付时间"),
            ],
            [
              t("Operating lease liability", "经营租赁负债"),
              billion(AMZN_OPERATING.operatingLeases),
              t("Rent remains in operating profit", "租金保留在营业利润中"),
            ],
            [
              t("Uncommenced lease payments", "尚未开始租赁付款"),
              billion(AMZN_OPERATING.uncommencedLeasePayments),
              t("Future nominal commitment", "未来名义承诺"),
            ],
            [
              t("Purchase obligations", "采购义务"),
              billion(AMZN_OPERATING.purchaseObligations),
              t("Not all current capex", "非全部当期资本投入"),
            ],
          ]}
        />
        <p className="mt-3 text-sm">{source(AMZN_SOURCES.q2)}</p>
        <h3 className="mt-6 text-lg font-semibold">
          {t("Company Q3 guidance (July 30)", "公司第三季度指引（7 月 30 日）")}
        </h3>
        <p className="mt-2 leading-7">
          {t("Revenue", "收入")} ${billion(AMZN_GUIDANCE.revenueLow)}-
          {billion(AMZN_GUIDANCE.revenueHigh)}B ·{" "}
          {t("Operating income", "营业利润")} $
          {billion(AMZN_GUIDANCE.operatingIncomeLow)}-
          {billion(AMZN_GUIDANCE.operatingIncomeHigh)}B.{" "}
          {source(AMZN_GUIDANCE.source)}
        </p>
      </section>
      <section
        id="valuation"
        className="border-t border-zinc-200 py-8 dark:border-zinc-800"
      >
        <h2 className="text-2xl font-semibold">{t("Valuation", "估值")}</h2>
        <p className="my-4 text-sm leading-7">{AMZN_MODEL_NOTE[locale]}</p>
        <Table
          headers={[
            t("Case", "情景"),
            "WACC",
            t("Terminal growth", "永续增速"),
            t("Operating EV", "经营企业价值"),
            t("Core equity", "核心股权价值"),
            t("Net investment option", "净投资可选性"),
            t("Equity value", "股权价值"),
            t("Per share ($)", "每股价值（美元）"),
            t("Upside / downside", "上行 / 下行"),
            t("Terminal weight", "终值权重"),
          ]}
          rows={scenarios.map((s) => {
            const r = AMZN_DCF_CASES[s];
            return [
              caseName(s),
              percent(r.discountRate),
              percent(r.terminalGrowth),
              billion(r.enterpriseValue),
              billion(r.coreEquity),
              billion(r.investmentValue),
              billion(r.equityValue),
              number(r.valuePerShare),
              percent(r.upsidePercent),
              percent(r.terminalWeight),
            ];
          })}
        />
        <h3 className="mt-6 text-lg font-semibold">
          {t(
            "Base-case sensitivity · value per share ($)",
            "基准敏感性 · 每股价值（美元）",
          )}
        </h3>
        <p className="my-3 text-sm text-zinc-500">
          {t(
            "Terminal weight = discounted terminal value / operating enterprise value. It exceeds 100% in the bear case because the present value of the early cash flows is negative. The very wide range is assumption sensitivity, not a confidence interval or a price target.",
            "终值权重 = 折现终值 / 经营企业价值。悲观情景早期现金流现值为负，因此权重超过 100%。宽幅情景反映假设敏感性，并非置信区间或目标价。",
          )}
        </p>
        <Table
          headers={["WACC / g", "2%", "3%", "4%"]}
          rows={AMZN_DCF_SENSITIVITY.map((r) => [
            percent(r.discount),
            ...r.values.map((v) => number(v)),
          ])}
        />
        <h3 className="mt-6 text-lg font-semibold">
          {t("Dated equity bridge", "注明日期的股权桥接")}
        </h3>
        <Table
          headers={[t("Input", "输入"), t("Value", "金额"), t("Basis", "口径")]}
          rows={[
            [
              t("June liquid assets", "六月流动资产"),
              billion(AMZN_MODEL_INPUTS.liquidAssetsJune),
              t(
                "Cash + securities, excludes restricted cash",
                "现金加证券，不含受限现金",
              ),
            ],
            [
              t("Known subsequent funding", "已知期后出资"),
              billion(AMZN_OPERATING.openAiSubsequentFunding),
              "OpenAI",
            ],
            [
              t("Pro-forma liquid assets", "模拟流动资产"),
              billion(AMZN_MODEL_INPUTS.liquidAssetsProForma),
              t("Not actual October cash", "非十月实际现金"),
            ],
            [
              t("Debt and financing claims", "债务及融资债权"),
              billion(AMZN_MODEL_INPUTS.debtClaims),
              t(
                "Includes short debt and finance leases",
                "含短期债务及融资租赁",
              ),
            ],
            [
              t("Investment reference pool", "投资参考基数"),
              billion(AMZN_MODEL_INPUTS.investmentReference),
              t(
                "Anthropic marks + OpenAI funded cost",
                "Anthropic 估值加 OpenAI 已出资成本",
              ),
            ],
            [
              t("Potential remaining funding", "潜在剩余出资"),
              billion(AMZN_MODEL_INPUTS.remainingInvestmentFunding),
              t("Full deduction, conservative", "保守全额扣除"),
            ],
            [
              t("Diluted shares (billions)", "摊薄股数（十亿股）"),
              billion(AMZN_MODEL_INPUTS.shares),
              t(
                "Q2 weighted diluted shares; no assumed buybacks",
                "Q2 加权摊薄股数，不假设回购",
              ),
            ],
          ]}
        />
        <details className="mt-6">
          <summary className="cursor-pointer font-semibold">
            {t("Historical valuation proxies", "历史估值近似值")}
          </summary>
          <p className="my-3 text-sm">
            {t(
              "Split-adjusted price × annual diluted weighted shares. Not exact year-end market cap; no historical EV. Loss-year P/E is N/A.",
              "拆股调整价格乘全年摊薄加权股数，非精确年末市值；不提供历史 EV。亏损年市盈率为 N/A。",
            )}
          </p>
          <Table
            headers={[
              t("Year", "年份"),
              t("Close date", "收盘日期"),
              t("Price ($)", "股价（美元）"),
              t("Market cap proxy", "市值近似值"),
              "P/S",
              "P/E",
              t("FCF yield", "FCF 收益率"),
            ]}
            rows={AMZN_VALUATION_HISTORY.map((r) => [
              r.year,
              r.date,
              number(r.close),
              billion(r.marketCap),
              number(r.priceToSales),
              number(r.priceToEarnings),
              percent(r.fcfYield),
            ])}
          />
          <p className="mt-3 text-sm">
            {source(AMZN_PRICE_SOURCE, t("Market data", "行情来源"))} ·{" "}
            {AMZN_SPLIT_EVENTS.map(
              (r) =>
                `${new Date(r.date * 1000).toISOString().slice(0, 10)} ${r.splitRatio}`,
            ).join(", ")}
          </p>
        </details>
      </section>
      <section
        id="forecast"
        className="border-t border-zinc-200 py-8 dark:border-zinc-800"
      >
        <h2 className="mb-5 text-2xl font-semibold">
          {t(
            "Ten-Year Forecasts · Analyst Assumptions",
            "十年预测 · 分析师假设",
          )}
        </h2>
        <Table
          headers={[
            t("Case", "情景"),
            t("2026 investment", "2026 投入"),
            t("2035 investment / sales", "2035 投入 / 收入"),
            t("2035 depreciation / sales", "2035 折旧 / 收入"),
            t("Tax rate", "税率"),
            t("Investment recovery", "投资回收率"),
          ]}
          rows={scenarios.map((s) => {
            const a = AMZN_ASSUMPTIONS[s];
            return [
              caseName(s),
              billion(a.investment2026),
              percent(a.investmentRatioEnd * 100),
              percent(a.depreciationRatioEnd * 100),
              percent(a.tax * 100),
              percent(a.investmentRecovery * 100),
            ];
          })}
        />
        <details className="mt-5">
          <summary className="cursor-pointer font-semibold">
            {t("Segment growth and margin assumptions", "分部增长与利润率假设")}
          </summary>
          <Table
            headers={[
              t("Case", "情景"),
              t("Segment", "分部"),
              t("2026 revenue", "2026 收入"),
              t("2027 growth", "2027 增长"),
              t("2035 growth", "2035 增长"),
              t("2026 margin", "2026 利润率"),
              t("2035 margin", "2035 利润率"),
            ]}
            rows={scenarios.flatMap((s) => {
              const a = AMZN_ASSUMPTIONS[s];
              return ["North America", "International", "AWS"].map(
                (name, j) => [
                  caseName(s),
                  segmentName(name),
                  billion(a.initial[j]),
                  percent(
                    (a.growthStart[j] +
                      (a.growthEnd[j] - a.growthStart[j]) / 9) *
                      100,
                  ),
                  percent(a.growthEnd[j] * 100),
                  percent(a.marginStart[j] * 100),
                  percent(a.marginEnd[j] * 100),
                ],
              );
            })}
          />
          <p className="my-3 text-sm">
            {t(
              "Growth and margins interpolate linearly to 2035. Incremental working-capital charges are 1% / 0.5% / 0.3% of revenue growth in bear / base / bull. Tax applies to operating earnings, not reported investment gains.",
              "增速及利润率线性过渡至 2035 年。悲观、基准、乐观情景增量营运资本占收入增长的 1%、0.5%、0.3%；税率作用于经营利润，不作用于已披露投资收益。",
            )}
          </p>
        </details>
        {scenarios.map((s) => (
          <details key={s} className="mt-5" open={s === "base"}>
            <summary className="cursor-pointer text-lg font-semibold">
              {caseName(s)}
            </summary>
            <Table
              headers={[
                t("Year", "年份"),
                t("N. America", "北美"),
                t("International", "国际"),
                "AWS",
                t("Revenue", "收入"),
                t("Op profit", "营业利润"),
                "NOPAT",
                t("Depreciation", "折旧"),
                t("Full investment", "完整投入"),
                t("Incremental WC", "增量营运资本"),
                "FCFF",
                t("FCF margin", "FCF 利润率"),
              ]}
              rows={AMZN_FORECASTS[s].map((r) => [
                r.year,
                billion(r.northAmerica),
                billion(r.international),
                billion(r.aws),
                billion(r.revenue),
                billion(r.operatingIncome),
                billion(r.nopat),
                billion(r.depreciation),
                billion(r.investment),
                billion(r.workingCapital),
                billion(r.freeCashFlow),
                percent(r.fcfMargin),
              ])}
            />
          </details>
        ))}
        <p className="mt-4 text-sm text-zinc-500">
          {t(
            "FCFF = operating profit × (1 − tax rate) + non-lease depreciation − full investment − incremental working capital. SBC is not added back. Terminal cash does not assume investment stops.",
            "FCFF = 营业利润 ×（1 − 税率）+ 不含经营租赁的折旧 − 完整投入 − 增量营运资本。不加回股权薪酬，终值不假设停止投入。",
          )}
        </p>
      </section>
      <section
        id="financials"
        className="border-t border-zinc-200 py-8 dark:border-zinc-800"
      >
        <h2 className="mb-4 text-2xl font-semibold">
          {t("Financial History", "财务历史")}
        </h2>
        <h3 className="mb-3 text-lg font-semibold">FY2011-2025</h3>
        {financialTable(AMZN_ANNUAL)}
        <details className="mt-5">
          <summary className="cursor-pointer font-semibold">
            {t("Annual balance sheet and ratios", "年度资产负债与比率")}
          </summary>
          <Table
            headers={[
              t("Year", "年份"),
              t("Cash", "现金"),
              t("Securities", "证券"),
              t("Assets", "资产"),
              t("Liabilities", "负债"),
              t("Debt", "债务"),
              t("Equity", "权益"),
              t("Shares (B)", "股数（十亿）"),
              t("Gross margin", "毛利率"),
              t("Net margin", "净利率"),
              t("FCF margin", "FCF 利润率"),
              t("ROE proxy", "ROE 近似值"),
            ]}
            rows={AMZN_ANNUAL.map((r) => [
              r.year,
              billion(r.cash),
              billion(r.securities),
              billion(r.assets),
              billion(r.liabilities),
              billion(r.debt),
              billion(r.equity),
              billion(r.dilutedShares),
              percent(r.grossMargin),
              percent(r.netMargin),
              percent(r.fcfMargin),
              percent(r.roe),
            ])}
          />
        </details>
        <h3 className="mb-3 mt-7 text-lg font-semibold">
          {t("Recent quarters", "近期季度")}
        </h3>
        {financialTable(AMZN_QUARTERLY.slice(-12))}
        <details className="mt-5">
          <summary className="cursor-pointer font-semibold">
            {t(
              "All 62 quarters (2011 Q1-2026 Q2)",
              "全部 62 季度（2011 Q1—2026 Q2）",
            )}
          </summary>
          {financialTable(AMZN_QUARTERLY)}
        </details>
        <p className="mt-4 text-sm text-zinc-500">
          {t(
            "Q4 flow metrics are annual minus Q1-Q3; EPS and shares remain N/A. Annual liabilities may be derived from assets less equity. Gross margin is revenue less reported cost of sales, not retail contribution margin. ROE uses year-end equity.",
            "第四季度流量按全年减前三季度推导，EPS 与股数保留 N/A。年度负债可由资产减权益推导。毛利率为收入减披露销售成本，并非零售贡献利润率；ROE 使用年末权益。",
          )}
        </p>
      </section>
      <section
        id="sources"
        className="border-t border-zinc-200 py-8 dark:border-zinc-800"
      >
        <h2 className="mb-4 text-2xl font-semibold">
          {t("Sources, Audit and Publication QA", "来源、审计与发布 QA")}
        </h2>
        <div className="flex flex-wrap gap-5 text-sm">
          {Object.entries(AMZN_SOURCES).map(([key, url]) => (
            <span key={key}>{source(url, key)}</span>
          ))}
        </div>
        <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7">
          {AMZN_AUDIT.map((r) => (
            <li key={r.en}>{r[locale]}</li>
          ))}
        </ul>
        <h3 className="mt-6 text-lg font-semibold">
          {t("Publication Checks", "发布检查")}
        </h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7">
          {AMZN_QA.map((r) => (
            <li key={r.en}>{r[locale]}</li>
          ))}
        </ul>
        <details className="mt-5">
          <summary className="cursor-pointer font-semibold">
            {t("Chart inventory", "图表目录")}
          </summary>
          <ul className="mt-3 space-y-2 text-sm">
            {AMZN_CHART_GROUPS.map((r) => (
              <li key={r.en}>
                {r[locale]} · {r.charts.join(" / ")}
              </li>
            ))}
          </ul>
        </details>
        <details className="mt-5">
          <summary className="cursor-pointer font-semibold">
            {t("SEC filing inventory", "SEC 文件目录")} ({AMZN_FILINGS.length})
          </summary>
          <Table
            headers={[
              t("Filed", "申报日期"),
              t("Period end", "期间结束"),
              t("Form", "类型"),
              t("Accession", "申报编号"),
              t("Document", "文件"),
            ]}
            rows={[...AMZN_FILINGS]
              .reverse()
              .map((r) => [
                r.filed,
                r.end,
                r.form,
                r.accessionNumber,
                source(r.url),
              ])}
          />
        </details>
        <p className="mt-6 text-xs text-zinc-500">
          {t(
            "Research only. Not personalized financial advice or a guarantee of investment returns.",
            "仅供研究，不构成个性化投资建议或收益保证。",
          )}
        </p>
      </section>
    </main>
  );
}
