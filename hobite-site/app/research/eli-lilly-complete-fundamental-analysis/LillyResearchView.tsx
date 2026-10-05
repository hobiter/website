import type { ReactNode } from "react";
import { LLY_ANNUAL, type FinancialRow } from "./annualFinancials";
import { LLY_QUARTERLY } from "./quarterlyFinancials";
import { LLY_FILINGS } from "./filings";
import {
  LLY_LATEST_PRICE as price,
  LLY_VALUATION_HISTORY,
  LLY_PRICE_SOURCE,
} from "./valuationHistory";
import {
  LLY_PRODUCTS,
  LLY_THERAPEUTIC,
  LLY_OPERATING as op,
  LLY_SOURCES,
} from "./operatingMetrics";
import { LLY_ECONOMICS, LLY_RISKS } from "./pharmaEconomics";
import {
  LLY_MODEL_INPUTS as input,
  LLY_ASSUMPTIONS,
  LLY_FORECASTS,
  LLY_DCF_CASES,
  LLY_SENSITIVITY,
  LLY_PIPELINE_SENSITIVITY,
  LLY_DILUTION_SENSITIVITY,
  type Scenario,
} from "./forecastModel";
import { LLY_REPORT } from "./reportContent";
import { LLY_CHART_GROUPS, LLY_RESEARCH_NOTE } from "./researchPlan";
import { LLY_AUDIT } from "./sourceAudit";
import { LLY_QA } from "./publicationQa";
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
export default function LillyResearchView({
  lang = "en",
}: {
  lang?: "en" | "zh";
}) {
  const zh = lang === "zh",
    t = (en: string, cn: string) => (zh ? cn : en);
  const latest = LLY_ANNUAL.at(-1)!,
    quarter = LLY_QUARTERLY.at(-1)!;
  const labels = {
    bear: t("Bear", "悲观"),
    base: t("Base", "基准"),
    bull: t("Bull", "乐观"),
  };
  const link = (url: string, text: string) => (
    <a href={url} className="underline" target="_blank" rel="noreferrer">
      {text}
    </a>
  );
  const a = (key: keyof FinancialRow) =>
    LLY_ANNUAL.map((r) => ({
      label: String(r.year),
      value: typeof r[key] === "number" ? (r[key] as number) / 1e9 : null,
    }));
  const q = (key: "revenue" | "freeCashFlow") =>
    LLY_QUARTERLY.slice(-12).map((r) => ({
      label: `${r.year} Q${r.quarter}`,
      value: r[key] == null ? null : r[key]! / 1e9,
    }));
  const charts = [
    { rows: a("revenue"), unit: "USD B" },
    { rows: a("operatingIncome"), unit: "USD B" },
    { rows: a("netIncome"), unit: "USD B" },
    { rows: a("freeCashFlow"), unit: "USD B" },
    {
      rows: LLY_ANNUAL.map((r) => ({
        label: String(r.year),
        value: r.grossMargin,
      })),
      unit: "%",
    },
    {
      rows: LLY_ANNUAL.map((r) => ({
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
      rows: LLY_PRODUCTS.map((r) => ({
        label: t(r.en, r.zh).split("（")[0],
        value: r.q2 / 1000,
      })),
      unit: "USD B",
    },
    {
      rows: LLY_FORECASTS.base.map((r) => ({
        label: String(r.year),
        value: r.fcff,
      })),
      unit: "USD B",
    },
  ];
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
  const financialHeaders = [
    t("Period", "期间"),
    t("End", "结束日"),
    t("Revenue", "收入"),
    t("Gross profit", "毛利"),
    t("Derived EBIT", "推导营业利润"),
    t("Net income", "净利润"),
    "EPS · USD",
    t("CFO", "经营现金"),
    t("Capex", "资本开支"),
    "FCF",
    t("GM", "毛利率"),
    t("OM", "营业率"),
    t("Source", "来源"),
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
      link(r.source, t("Filing", "申报")),
    ]);
  return (
    <main
      data-company="lly"
      className="mx-auto w-full min-w-0 max-w-7xl px-4 py-10 text-zinc-900 sm:px-8"
    >
      <nav
        aria-label={t("Research navigation", "研究导航")}
        className="mb-7 flex flex-wrap gap-4 text-sm underline"
      >
        <a href="/research" data-testid="lly-library">
          {t("Research library", "研究库")}
        </a>
        <a
          href="/research/eli-lilly-complete-fundamental-analysis"
          data-testid="lly-english"
          aria-current={!zh ? "page" : undefined}
        >
          English
        </a>
        <a
          href="/research/eli-lilly-complete-fundamental-analysis/zh"
          data-testid="lly-chinese"
          aria-current={zh ? "page" : undefined}
        >
          中文
        </a>
      </nav>
      <header className="border-b border-zinc-200 pb-8">
        <p className="mb-3 text-sm text-emerald-700">
          {t(
            "NYSE: LLY · Independent fundamental research",
            "NYSE: LLY · 独立基本面研究",
          )}
        </p>
        <h1 className="text-4xl font-semibold sm:text-5xl">
          {t("Eli Lilly", "礼来（LLY）")}
        </h1>
        <p className="mt-4 text-xl text-zinc-600">
          {t("Complete Fundamental Analysis", "完整基本面研究")}
        </p>
        <p className="mt-6 max-w-4xl text-sm leading-7 text-zinc-600">
          {t(LLY_RESEARCH_NOTE.en, LLY_RESEARCH_NOTE.zh)}
        </p>
        <p className="mt-3 text-sm leading-7 text-zinc-600">
          {t(
            "As of October 4, 2026. Latest annual FY2025; latest filed quarter Q2 2026. Forecasts are assumptions, not reported results. General financial research, not personalized investment or clinical advice.",
            "截至 2026 年 10 月 4 日。最新年度为 2025，最新申报季度为 2026 第二季。预测是独立假设，不是报告业绩。一般财务研究，不构成个性化投资或临床建议。",
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
            t("Q2 tirzepatide sales share", "第二季替尔泊肽收入占比"),
            pct(((9943 + 4928) / 22974) * 100),
          ],
          [
            t(
              "H1 CFO − capex − IPR&D cash · USD B",
              "上半年 CFO − 支出 − IPR&D 现金 · 十亿美元",
            ),
            num((op.h1Cfo - op.h1Capex - op.h1IprdCash) / 1000, 3),
          ],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="text-xs leading-5 text-zinc-500">{k}</dt>
            <dd className="mt-2 text-xl font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
      <nav
        aria-label={t("Report sections", "报告章节")}
        className="flex flex-wrap gap-5 border-b border-zinc-200 py-6 text-sm underline"
      >
        {sections.map(([id, label]) => (
          <a key={id} href={`#${id}`} data-testid={`lly-nav-${id}`}>
            {label}
          </a>
        ))}
      </nav>
      <section
        id="report"
        className="scroll-mt-28 border-b border-zinc-200 py-10"
      >
        <h2 className="text-2xl font-semibold">
          {t("Investment report", "投资研究报告")}
        </h2>
        <div className="mt-8 grid gap-x-12 gap-y-9 lg:grid-cols-2">
          {LLY_REPORT.map((r) => (
            <article key={r.titleEn} className="min-w-0">
              <h3 className="text-lg font-semibold">
                {t(r.titleEn, r.titleZh)}
              </h3>
              <p className="mt-3 text-sm leading-7 text-zinc-700">
                {t(r.en, r.zh)}
              </p>
              <p className="mt-3 text-xs">
                {link(r.source, t("Primary evidence", "一手证据"))}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section
        id="charts"
        className="scroll-mt-28 border-b border-zinc-200 py-10"
      >
        <h2 className="text-2xl font-semibold">
          {t("Chart dashboard", "图表面板")}
        </h2>
        <p className="mt-3 text-sm leading-7 text-zinc-600">
          {t(
            "Chart values match the tables; gaps are N/A, not zero. Negative values are marked red. Historical FCF is CFO minus capex, before investing-classified pipeline/acquisition cash.",
            "图表与表格一致，缺失为 N/A 而非零；负数标红。历史 FCF 为经营现金减资本支出，未扣投资分类管线及收购现金。",
          )}
        </p>
        <div className="mt-6 grid gap-x-10 gap-y-4 md:grid-cols-2 xl:grid-cols-3">
          {charts.map((c, i) => (
            <Chart
              key={i}
              title={t(LLY_CHART_GROUPS[i].en, LLY_CHART_GROUPS[i].zh)}
              {...c}
            />
          ))}
        </div>
      </section>
      <section
        id="forecast"
        className="scroll-mt-28 border-b border-zinc-200 py-10"
      >
        <h2 className="text-2xl font-semibold">
          {t("Ten-year forecast and enterprise DCF", "十年预测与企业 DCF")}
        </h2>
        <p className="mt-4 text-sm leading-7 text-zinc-600">
          {t(
            "USD B; shares in billions. Normalized EBIT retains internal R&D/SBC/rent but excludes acquired IPR&D and special charges. FCFF = EBIT after assumed operating tax + D&A − capex − incremental working capital − external pipeline cash reserve. Reserve is 5% of sales, deducted once with no tax shield; not a company budget. D&A 2.5%; capex 10% in 2027–29, 7% in 2030–32, then 4.5%; working capital 18% of revenue change. No separate acquired-amortization addback. Terminal cash retains pipeline cost and 2% net capex. No probabilistic drug valuation or guaranteed approval. Revenue baseline $86B uses guidance midpoint as an assumption, not a FY2026 actual.",
            "十亿美元、十亿股。规范化 EBIT 保留内部研发/股权激励/租金，剔除购入 IPR&D 及特殊费用。FCFF = EBIT 扣假设经营税 + 折旧摊销 − 资本开支 − 增量营运资本 − 外部管线现金预留。预留为销售 5%，仅扣一次、无税盾，并非公司预算。折旧摊销 2.5%；2027–29 支出 10%，2030–32 为 7%，之后 4.5%；营运资本为收入变化 18%。不额外加回购入摊销。终值保留管线成本及 2% 净资本支出。无概率药物估值或必然获批假设。860 亿收入基线借用指引中点作为假设，不是 2026 实际。",
          )}
        </p>
        <div className="mt-6">
          <Table
            headers={[
              t("Case", "情景"),
              "WACC",
              t("Terminal g", "永续增长"),
              t("Stub PV", "短期现金现值"),
              t("10Y PV", "十年现值"),
              t("Terminal PV", "终值现值"),
              "EV",
              t("Equity", "权益"),
              t("USD/share", "美元/股"),
              t("Vs close", "相对收盘"),
              t("Terminal weight", "终值权重"),
            ]}
            rows={(Object.keys(LLY_DCF_CASES) as Scenario[]).map((s) => {
              const c = LLY_DCF_CASES[s];
              return [
                labels[s],
                pct(c.wacc * 100),
                pct(c.growth * 100),
                num(c.pvStub),
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
        </div>
        <p className="mt-4 text-sm leading-7 text-zinc-600">
          {t(
            `Equity bridge: cash ${num(input.cash, 3)} minus financial debt ${num(input.debt, 3)} at June 30; noncurrent investments excluded. Starting ${num(input.shares, 4)}B shares are Q2 weighted diluted shares, not exact current shares. The employee-benefit trust means cover/issued shares differ from EPS-participating shares. No future buyback benefit assumed. Remaining October 4–December 31 cash stubs $5/$7/$9B are independent assumptions discounted to year-end, not actual Q4 results. June–October unreported cash movements are not imputed; this dated-balance convention is a limitation.`,
            `权益桥：6 月 30 日现金 ${num(input.cash, 3)} 减金融债务 ${num(input.debt, 3)}；排除长期投资。起始 ${num(input.shares, 4)} 十亿股为第二季加权稀释股数，非精确当前股数。员工福利信托使封面/发行股数与参与 EPS 股数不同。不计未来回购收益。10 月 4 日至 12 月 31 日剩余现金 50/70/90 亿是独立假设，按年末贴现，非第四季实际。未推定六月至十月未报告现金变化；有日期的余额约定属于限制。`,
          )}
        </p>
        {(Object.keys(LLY_FORECASTS) as Scenario[]).map((s) => (
          <div key={s} className="mt-8">
            <h3 className="mb-3 text-lg font-semibold">{labels[s]}</h3>
            <p className="mb-3 text-sm text-zinc-600">
              {t("Operating tax assumption", "经营税假设")}:{" "}
              {pct(LLY_ASSUMPTIONS[s].tax * 100)}
            </p>
            <Table
              headers={[
                t("Year", "年份"),
                t("Revenue", "收入"),
                t("Growth", "增长"),
                t("Norm. OM", "规范化营业率"),
                "NOPAT",
                t("D&A", "折旧摊销"),
                t("Capex", "资本开支"),
                t("ΔWC", "营运资本增量"),
                t("Pipeline cash", "管线现金"),
                "FCFF",
                t("FCFF margin", "FCFF 率"),
              ]}
              rows={LLY_FORECASTS[s].map((r) => [
                r.year,
                num(r.revenue),
                pct(r.growth),
                pct(r.margin),
                num(r.nopat),
                num(r.depreciation),
                num(r.capex),
                num(r.workingCapital),
                num(r.pipelineCash),
                num(r.fcff),
                pct(r.fcffMargin),
              ])}
            />
          </div>
        ))}
        <h3 className="mt-8 mb-3 text-lg font-semibold">
          {t("Sensitivity · base USD/share", "敏感性 · 基准美元/股")}
        </h3>
        <Table
          headers={["WACC / g", "1.5%", "2.5%", "3.5%"]}
          rows={LLY_SENSITIVITY.map((r) => [
            pct(r.wacc * 100),
            ...r.values.map((v) => num(v)),
          ])}
        />
        <div className="mt-6 grid min-w-0 gap-8 md:grid-cols-2">
          <Table
            headers={[
              t("Pipeline reserve / sales", "管线预留/收入"),
              t("Value/share", "每股价值"),
            ]}
            rows={LLY_PIPELINE_SENSITIVITY.map((r) => [
              pct(r.rate * 100),
              num(r.value),
            ])}
          />
          <Table
            headers={[
              t("Extra shares · M", "新增百万股"),
              t("Value/share", "每股价值"),
            ]}
            rows={LLY_DILUTION_SENSITIVITY.map((r) => [
              num(r.shares * 1000, 0),
              num(r.value),
            ])}
          />
        </div>
        <p className="mt-4 text-sm leading-7 text-zinc-600">
          {t(
            "Dilution is a generic stress, not a warrant issuance or buyback prediction. Pipeline-rate sensitivity changes the ten-year and terminal reserve, holding the independent stub fixed. Contraction releases working capital mechanically; inventory or rebate realities may prevent the assumed release.",
            "稀释为通用压力测试，并非权证发行或回购预测。管线预留敏感性改变十年及终值支出，但保持独立短期现金假设。收缩机械释放营运资本；库存或返利现实可能阻止预期释放。",
          )}
        </p>
      </section>
      <section
        id="valuation"
        className="scroll-mt-28 border-b border-zinc-200 py-10"
      >
        <h2 className="text-2xl font-semibold">
          {t("Historical valuation", "历史估值")}
        </h2>
        <p className="my-4 text-sm leading-7 text-zinc-600">
          {t(
            "Ex-post annual facts joined to last trading close on/before December 31. Participating end-shares = issued minus employee-benefit-trust shares when disclosed; missing shares/debt prevent ratios. Prices are split-consistent, not dividend-return adjusted; no splits in retrieved interval. P/E N/A for losses. EV deducts cash only; FCF yield excludes IPR&D/acquisition investing cash and is not recurring FCFF.",
            "事后年度事实匹配 12 月 31 日或之前最后收盘。参与期末股数为已发行股减员工福利信托股（若披露）；股数/债务缺失则比率缺失。价格拆股一致，但不是股息总回报调整；取得区间无拆股。亏损时 P/E 缺失。EV 仅扣现金；FCF 收益率未扣 IPR&D/收购投资现金，不是经常性 FCFF。",
          )}
        </p>
        <Table
          headers={[
            t("Year", "年份"),
            t("Price date", "价格日期"),
            "USD",
            t("Shares B", "十亿股"),
            t("Market cap B", "市值十亿"),
            "EV B",
            "P/S",
            "P/E",
            "EV/S",
            t("FCF yield", "FCF 收益率"),
          ]}
          rows={LLY_VALUATION_HISTORY.map((r) => [
            r.year,
            r.date,
            num(r.close),
            bn(r.shares),
            bn(r.marketCap),
            bn(r.enterpriseValue),
            num(r.priceToSales),
            num(r.priceToEarnings),
            num(r.evToSales),
            pct(r.fcfYield),
          ])}
        />
        <p className="mt-4 text-xs">
          {link(LLY_PRICE_SOURCE, t("Market data endpoint", "市场数据端点"))}
        </p>
      </section>
      <section
        id="operations"
        className="scroll-mt-28 border-b border-zinc-200 py-10"
      >
        <h2 className="text-2xl font-semibold">
          {t("Products and pharmaceutical economics", "产品与制药经济")}
        </h2>
        <p className="my-4 text-sm leading-7 text-zinc-600">
          {t(
            "USD M. One operating segment; product sales do not imply product profits. Selected rows are not exhaustive. Q2 Mounjaro/Zepbound concentration is 64.7%; H1 64.7%. Product/geography sums can differ by $1M rounding; zero is reported no sales, not missing disclosure. Foundayo geography is N/A here.",
            "百万美元。只有一个经营分部，产品销售不代表产品利润；精选行不穷尽全部产品。第二季 Mounjaro/Zepbound 集中度 64.7%，上半年亦为 64.7%。产品地域可因舍入相差百万美元；零为报告无销售，不是缺失披露。此处 Foundayo 地域为 N/A。",
          )}
        </p>
        <Table
          headers={[
            t("Product", "产品"),
            t("Q2 2026", "2026 第二季"),
            t("Q2 2025", "2025 第二季"),
            t("H1 2026", "2026 上半年"),
            t("H1 2025", "2025 上半年"),
            t("Q2 US", "第二季美国"),
            t("Q2 international", "第二季海外"),
          ]}
          rows={LLY_PRODUCTS.map((r) => [
            t(r.en, r.zh),
            num(r.q2, 0),
            num(r.priorQ2, 0),
            num(r.h1, 0),
            num(r.priorH1, 0),
            num(r.us, 0),
            num(r.international, 0),
          ])}
        />
        <h3 className="mt-7 mb-3 text-lg font-semibold">
          {t("Therapeutic revenue totals", "治疗领域收入合计")}
        </h3>
        <Table
          headers={[
            t("Area", "领域"),
            t("Q2 2026 · M", "2026 第二季 · 百万"),
            t("H1 2026 · M", "2026 上半年 · 百万"),
          ]}
          rows={LLY_THERAPEUTIC.map((r) => [
            t(r.en, r.zh),
            num(r.q2, 0),
            num(r.h1, 0),
          ])}
        />
        <h3 className="mt-7 mb-3 text-lg font-semibold">
          {t(
            "Q2 GAAP operating and adjusted-net bridges · M",
            "第二季 GAAP 营业与调整净利润桥 · 百万",
          )}
        </h3>
        <Table
          headers={[t("Bridge", "勾稽"), t("Calculation", "计算")]}
          rows={[
            [
              t("Derived operating profit", "推导营业利润"),
              "22,974 − 3,268 − 3,819 − 3,430 − 2,776 − 703 = 8,978",
            ],
            [
              t("Pretax includes Other-net income", "税前包含 Other-net 收益"),
              "8,978 + 269 = 9,247",
            ],
            [
              t(
                "Adjusted net income (IPR&D retained)",
                "调整净利润（保留 IPR&D）",
              ),
              "7,095 + 125 + 703 − 445 + 15 = 7,493",
            ],
            [
              t("Reported / adjusted EPS · USD", "报告 / 调整 EPS · 美元"),
              "7.94 / 8.38",
            ],
            [
              t("GAAP / adjusted gross profit", "GAAP / 调整毛利"),
              "19,706 / 19,831",
            ],
          ]}
        />
        <p className="mt-3 text-sm leading-7 text-zinc-600">
          {t(
            "Lilly's current non-GAAP earnings retain acquired IPR&D charges; our separate normalized forecast perimeter is not that issuer measure. All adjustments above are signed as in the release.",
            "礼来当前非 GAAP 利润保留购入 IPR&D 费用；本文独立规范化预测不是该公司口径。上述调整符号与公告一致。",
          )}
        </p>
        <h3 className="mt-7 mb-3 text-lg font-semibold">
          {t(
            "Cash and operating evidence · USD B unless labeled",
            "现金与经营证据 · 除标示外十亿美元",
          )}
        </h3>
        <Table
          headers={[t("Metric", "指标"), t("Value", "数值")]}
          rows={[
            [
              t(
                "H1 CFO / capex / headline FCF",
                "上半年 CFO / 支出 / 表面 FCF",
              ),
              "16.023 / 5.259 / 10.764",
            ],
            [
              t(
                "Less investing IPR&D cash / remaining",
                "扣投资 IPR&D 现金 / 剩余",
              ),
              "3.486 / 7.278",
            ],
            [
              t(
                "Less full acquisitions / remaining (not recurring FCF)",
                "再扣完整收购 / 剩余（非经常 FCF）",
              ),
              "9.805 / −2.527",
            ],
            [
              t("H1 dividends / buybacks", "上半年股息 / 回购"),
              "3.094 / 3.957",
            ],
            [t("Inventory Jun / Dec", "库存六月 / 十二月"), "16.793 / 13.744"],
            [t("PP&E Jun / Dec", "固定资产六月 / 十二月"), "29.286 / 24.675"],
            [
              t("Rebates liability Jun / Dec", "返利负债六月 / 十二月"),
              "21.122 / 17.382",
            ],
            [
              t(
                "Q2 volume / price / FX growth contributions",
                "第二季量 / 价 / 汇率增长贡献",
              ),
              "+60% / −13% / +1%",
            ],
            [
              t(
                "Q2 US price / excluding estimate adjustments",
                "第二季美国价格 / 排除估计调整",
              ),
              "−3% / ~−9%",
            ],
            [
              t(
                "Prior-shipment estimate benefits / Q2 US revenue",
                "历史发货估计调整收益 / 第二季美国收入",
              ),
              "3%",
            ],
            [
              t(
                "Q2 Jardiance milestone · USD M",
                "第二季 Jardiance 里程碑 · 百万美元",
              ),
              "250",
            ],
            [
              t("Q2 US / international revenue", "第二季美国 / 海外收入"),
              "14.413 / 8.561",
            ],
          ]}
        />
        <h3 className="mt-7 mb-3 text-lg font-semibold">
          {t("Issuer FY2026 guidance · August 5", "公司 2026 指引 · 八月五日")}
        </h3>
        <Table
          headers={[t("Metric", "指标"), t("Range", "区间")]}
          rows={[
            [t("Revenue · USD B", "收入 · 十亿美元"), "85–87"],
            [
              t("Non-GAAP performance margin", "非 GAAP 业绩利润率"),
              "49.0–50.5%",
            ],
            [t("Non-GAAP tax rate", "非 GAAP 税率"), "18–19%"],
            [t("Non-GAAP EPS · USD", "非 GAAP EPS · 美元"), "35.50–36.50"],
          ]}
        />
        <p className="mt-3 text-sm leading-7 text-zinc-600">
          {t(
            "Performance margin is not our normalized EBIT margin: the issuer excludes acquired IPR&D for this margin measure, while tax/EPS guidance includes known charges and excludes future business-development charges after Q2. Forward GAAP reconciliation is not provided by the issuer. This is dated guidance, not a forecast actual.",
            "业绩利润率不是本文规范化 EBIT 率：公司该利润率剔除购入 IPR&D，但税率/EPS 指引包含已知费用，并排除第二季之后未来业务开发费用。公司未提供前瞻 GAAP 勾稽。这是有日期的指引，不是实际业绩。",
          )}
        </p>
        <div className="mt-8 grid gap-x-12 gap-y-8 lg:grid-cols-2">
          {LLY_ECONOMICS.map((r) => (
            <article key={r.en} className="min-w-0">
              <h3 className="text-lg font-semibold">{t(r.en, r.zh)}</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-700">
                {t(r.bodyEn, r.bodyZh)}
              </p>
              <p className="mt-3 text-xs">
                {link(r.source, t("Evidence", "证据"))}
              </p>
            </article>
          ))}
        </div>
        <h3 className="mt-8 text-lg font-semibold">
          {t("Risk monitor", "风险监测")}
        </h3>
        <ul className="mt-4 space-y-4">
          {LLY_RISKS.map((r) => (
            <li key={r.en} className="text-sm leading-7">
              <strong>{t(r.en, r.zh)}: </strong>
              {t(r.enText, r.zhText)}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs">
          {link(LLY_SOURCES.quarter, t("Quarterly filing", "季度申报"))} ·{" "}
          {link(
            LLY_SOURCES.earnings,
            t("Issuer release and reconciliations", "公司公告与勾稽"),
          )}{" "}
          ·{" "}
          {link(
            LLY_SOURCES.september,
            t("September pipeline update", "九月管线更新"),
          )}
        </p>
      </section>
      <section
        id="annual"
        className="scroll-mt-28 border-b border-zinc-200 py-10"
      >
        <h2 className="text-2xl font-semibold">
          {t("Annual financial database · USD B", "年度财务数据库 · 十亿美元")}
        </h2>
        <p className="my-4 text-sm text-zinc-600">
          {t(
            "All 15 years, FY2011–FY2025. N/A is not zero. See accounting note and provenance.",
            "全部 15 年（2011–2025）。N/A 不等于零。参见会计说明与出处。",
          )}
        </p>
        <Table headers={financialHeaders} rows={financialRows(LLY_ANNUAL)} />
        <h3 className="mt-7 mb-3 text-lg font-semibold">
          {t(
            "Balance sheet and reinvestment · USD B",
            "资产负债与再投资 · 十亿美元",
          )}
        </h3>
        <Table
          headers={[
            t("Year", "年份"),
            t("Cash", "现金"),
            t("Assets", "资产"),
            t("Liabilities", "负债"),
            t("Equity", "归母权益"),
            t("Debt", "金融债务"),
            t("Inventory", "库存"),
            t("PP&E", "固定资产"),
            t("R&D", "研发"),
            "IPR&D",
            t("D&A", "折旧摊销"),
            "SBC",
            t("ROE", "权益回报"),
          ]}
          rows={LLY_ANNUAL.map((r) => [
            r.year,
            bn(r.cash),
            bn(r.assets),
            bn(r.liabilities),
            bn(r.equity),
            bn(r.debt),
            bn(r.inventory),
            bn(r.ppe),
            bn(r.research),
            bn(r.iprd),
            bn(r.depreciation),
            bn(r.stockComp),
            pct(r.roe),
          ])}
        />
        <h3 className="mt-7 mb-3 text-lg font-semibold">
          {t(
            "Investing research and capital allocation · USD B",
            "投资研发与资本配置 · 十亿美元",
          )}
        </h3>
        <Table
          headers={[
            t("Year", "年份"),
            "FCF",
            t("IPR&D cash", "IPR&D 现金"),
            t("Acquisition cash", "收购现金"),
            t("Dividends", "股息"),
            t("Buybacks", "回购"),
          ]}
          rows={LLY_ANNUAL.map((r) => [
            r.year,
            bn(r.freeCashFlow),
            bn(r.iprdCash),
            bn(r.acquisitionCash),
            bn(r.dividends),
            bn(r.buybacks),
          ])}
        />
      </section>
      <section
        id="quarterly"
        className="scroll-mt-28 border-b border-zinc-200 py-10"
      >
        <h2 className="text-2xl font-semibold">
          {t(
            "Quarterly financial database · USD B",
            "季度财务数据库 · 十亿美元",
          )}
        </h2>
        <p className="my-4 text-sm leading-7 text-zinc-600">
          {t(
            "All 62 quarters. Q4 additive flows are annual minus Q1–Q3; Q4 EPS/shares N/A. YTD differences require all prior quarters. Missing operating components are not presumed zero; original filing provenance identifies derivation.",
            "全部 62 季。第四季可加总流量为全年减前三季，EPS/股数缺失。YTD 差额需要完整之前季度；缺失经营组成不假定为零。原始来源标示推导。",
          )}
        </p>
        <Table headers={financialHeaders} rows={financialRows(LLY_QUARTERLY)} />
      </section>
      <section id="audit" className="scroll-mt-28 py-10">
        <h2 className="text-2xl font-semibold">
          {t("Sources, coverage and publication QA", "来源、覆盖与发布核验")}
        </h2>
        <div className="mt-5">
          <Table
            headers={[
              t("Area", "领域"),
              t("Status", "状态"),
              t("Coverage and limitations", "覆盖与限制"),
              t("Source", "来源"),
            ]}
            rows={LLY_AUDIT.map((r) => [
              t(r.en, r.zh),
              r.status,
              <p
                key={r.en}
                className="min-w-64 max-w-xl whitespace-normal leading-7"
              >
                {t(r.enNote, r.zhNote)}
              </p>,
              link(r.source, t("Primary source", "一手来源")),
            ])}
          />
        </div>
        <h3 className="mt-7 mb-3 text-lg font-semibold">
          {t("Publication QA", "发布核验")}
        </h3>
        <Table
          headers={[
            t("Check", "检查"),
            t("Status", "状态"),
            t("Result", "结果"),
          ]}
          rows={LLY_QA.map((r) => [
            r.area,
            r.status,
            <p
              key={r.area}
              className="min-w-64 max-w-xl whitespace-normal leading-7"
            >
              {t(r.en, r.zh)}
            </p>,
          ])}
        />
        <details className="mt-7">
          <summary className="cursor-pointer font-semibold">
            {t("SEC filing inventory", "SEC 申报清单")} · {LLY_FILINGS.length}
          </summary>
          <div className="mt-4 max-h-[560px] overflow-y-auto">
            <Table
              headers={[
                t("Form", "表格"),
                t("Filed", "申报日"),
                t("Report end", "期末"),
                t("Accession", "流水号"),
                t("Source", "来源"),
              ]}
              rows={[...LLY_FILINGS]
                .reverse()
                .map((r) => [
                  r.form,
                  r.filed,
                  r.end,
                  r.accessionNumber,
                  link(r.source, t("Filing", "申报")),
                ])}
            />
          </div>
        </details>
        <details className="mt-5">
          <summary className="cursor-pointer font-semibold">
            {t("Latest quarter field provenance", "最新季度逐字段出处")}
          </summary>
          <div className="mt-4">
            <Table
              headers={[
                t("Field", "字段"),
                t("Value (raw units)", "值（原单位）"),
                t("Tag or method", "标签或方法"),
                t("Unit", "单位"),
                t("Source date", "来源日期"),
                t("Source", "来源"),
              ]}
              rows={Object.entries(quarter.provenance).map(([key, p]) => [
                key,
                typeof quarter[key as keyof FinancialRow] === "number"
                  ? num(quarter[key as keyof FinancialRow] as number, 0)
                  : "N/A",
                <span
                  key={key}
                  className="inline-block min-w-48 max-w-md whitespace-normal"
                >
                  {p?.method ?? p?.tag ?? "N/A"}
                </span>,
                p?.unit ?? "N/A",
                p?.filed ?? "N/A",
                p?.source ? link(p.source, t("Evidence", "证据")) : "N/A",
              ])}
            />
          </div>
        </details>
        <h3 className="mt-7 text-lg font-semibold">
          {t("Research structure and source system", "研究结构与来源系统")}
        </h3>
        <p className="mt-3 text-sm leading-7 text-zinc-600">
          {t(
            "SEC submissions/companyfacts establish filings and typed financial rows; issuer releases support manually verified operating metrics and bridges; Yahoo supplies dated closes; peer disclosures support competition. Regeneration, mirror and invariant tests are versioned with the report. Eight report sections, 13 research chapters and the following chart inventory are complete; coverage gaps remain visible.",
            "SEC submissions/companyfacts 建立清单及类型化财务；公司公告支持人工核验经营指标与勾稽；Yahoo 提供有日期收盘；同行披露支持竞争分析。再生成、镜像及测试随报告版本化。八个章节、13 个研究分章及下列图表已完成，覆盖缺口保留可见。",
          )}
        </p>
        <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
          {LLY_CHART_GROUPS.map((r) => (
            <li key={r.en}>{t(r.en, r.zh)}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
