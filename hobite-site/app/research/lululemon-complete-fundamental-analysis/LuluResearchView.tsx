"use client";
import { useState, type ReactNode } from "react";
import { ANNUAL, QUARTERLY, FILINGS, CUTOFF } from "./secData";
import {
  VALUATION_HISTORY,
  LATEST_PRICE,
  PRICE_SOURCE,
} from "./valuationHistory";
import { OPERATIONS, CURRENT, SOURCES } from "./operatingMetrics";
import {
  CASES,
  forecast,
  SHARES,
  BASELINE,
  type Scenario,
} from "./forecastModel";
import { REPORT } from "./reportContent";
import { AUDIT, PUBLICATION_QA } from "./sourceAudit";
type FinancialRow = {
  fy: number;
  end: string;
  source: string;
  p: Record<string, { value: number | null }>;
  fcf: number | null;
  grossMargin: number | null;
  operatingMargin: number | null;
  netMargin: number | null;
  roe: number | null;
};
const n = (v: number | null | undefined, d = 1) =>
  v == null
    ? "N/A"
    : v.toLocaleString("en-US", {
        minimumFractionDigits: d,
        maximumFractionDigits: d,
      });
const pct = (v: number | null) => (v == null ? "N/A" : `${n(v * 100)}%`);
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
              {r.map((v, j) => (
                <td
                  key={j}
                  className="border-b border-zinc-200 px-3 py-3 align-top tabular-nums"
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
          className="mb-2 grid grid-cols-[48px_minmax(0,1fr)_72px] items-center gap-2 text-xs"
        >
          <span>{v.label}</span>
          <div className="h-3 bg-zinc-100">
            <div
              className={`h-3 ${v.value != null && v.value < 0 ? "bg-rose-600" : "bg-emerald-700"}`}
              style={{ width: `${(Math.abs(v.value ?? 0) / max) * 100}%` }}
            />
          </div>
          <span className="text-right">{n(v.value)}</span>
        </div>
      ))}
    </figure>
  );
}
export default function LuluResearchView({ lang }: { lang: "en" | "zh" }) {
  const zh = lang === "zh",
    i = zh ? 1 : 0,
    t = (en: string, cn: string) => (zh ? cn : en);
  const [scenario, setScenario] = useState<Scenario>("base"),
    [horizon, setHorizon] = useState<5 | 10>(10),
    [price, setPrice] = useState(String(LATEST_PRICE.close)),
    [rate, setRate] = useState("11"),
    [terminal, setTerminal] = useState("2.5");
  const valid =
    Number(price) > 0 &&
    Number.isFinite(Number(price)) &&
    Number(rate) > Number(terminal) &&
    Number(rate) > 0 &&
    Number(terminal) >= 0 &&
    Number.isFinite(Number(rate));
  const result = valid
    ? forecast(
        scenario,
        horizon,
        Number(price),
        Number(rate) / 100,
        Number(terminal) / 100,
      )
    : null;
  const latest = QUARTERLY.at(-1)!,
    a = ANNUAL.at(-1)!;
  const annualRows: FinancialRow[] = ANNUAL;
  const field =
    "mt-1 w-full min-w-0 rounded border border-zinc-300 bg-white p-2 text-zinc-900";
  const heading = "mb-5 text-2xl font-semibold";
  const sections = [
    ["report", t("Investment report", "投资报告")],
    ["charts", t("Dashboard", "图表")],
    ["forecast", t("Forecast and valuation", "预测估值")],
    ["operations", t("Retail economics", "零售经济")],
    ["annual", t("Annual history", "年度财务")],
    ["quarterly", t("Quarterly history", "季度财务")],
    ["valuation", t("Valuation history", "历史估值")],
    ["filings", t("SEC filings", "SEC 文件")],
    ["audit", t("Sources and QA", "来源与核验")],
  ];
  const inventoryTurns = (r: FinancialRow, j: number) => {
    const prev = annualRows[j - 1]?.p.inventory.value,
      inv = r.p.inventory.value,
      gross = r.p.grossProfit.value,
      rev = r.p.revenue.value;
    return prev != null && inv != null && gross != null && rev != null
      ? (rev - gross) / ((prev + inv) / 2)
      : null;
  };
  const financialRows = (rows: FinancialRow[]) =>
    rows.map((r) => [
      r.fy,
      r.end,
      n(r.p.revenue.value),
      n(r.p.grossProfit.value),
      n(r.p.operatingIncome.value),
      n(r.p.netIncome.value),
      n(r.p.eps.value, 2),
      n(r.p.ocf.value),
      n(r.p.capex.value),
      n(r.fcf),
      n(r.grossMargin),
      n(r.operatingMargin),
      n(r.netMargin),
      <a
        key={r.end}
        href={r.source}
        target="_blank"
        rel="noreferrer"
        className="underline"
      >
        SEC
      </a>,
    ]);
  const financeHeaders = [
    "FY",
    t("Period end", "期末"),
    t("Revenue", "收入"),
    t("Gross profit", "毛利"),
    t("Operating income", "经营利润"),
    t("Net income", "净利"),
    "EPS",
    t("OCF", "经营现金"),
    t("Capex", "资本支出"),
    "FCF",
    t("Gross %", "毛利率 %"),
    t("Operating %", "经营利润率 %"),
    t("Net %", "净利率 %"),
    t("Source", "来源"),
  ];
  return (
    <main
      lang={lang}
      data-company="lulu"
      className="mx-auto w-full min-w-0 max-w-7xl bg-white px-4 py-10 text-zinc-900 sm:px-8"
    >
      <nav
        className="mb-7 flex flex-wrap gap-5 text-sm underline"
        aria-label={t("Research navigation", "研究导航")}
      >
        <a href="/research">{t("Research library", "研究库")}</a>
        <a href="/research/lululemon-complete-fundamental-analysis">English</a>
        <a href="/research/lululemon-complete-fundamental-analysis/zh">中文</a>
      </nav>
      <header className="border-b border-zinc-300 pb-8">
        <p className="mb-3 text-sm font-medium text-emerald-800">
          Hobite Research · NASDAQ: LULU
        </p>
        <h1
          style={{ color: "#18181b" }}
          className="text-4xl font-semibold sm:text-5xl"
        >
          {t(
            "lululemon: Complete Fundamental Analysis",
            "lululemon：完整基本面研究",
          )}
        </h1>
        <p className="mt-4 text-xl text-zinc-600">
          {t(
            "Brand recovery, retail productivity and owner-cash valuation",
            "品牌恢复、零售效率与股东现金估值",
          )}
        </p>
        <p className="mt-5 text-sm leading-7">
          {t(
            `Research cutoff ${CUTOFF}; latest filed quarter Q2 FY2026, ended ${latest.end}. Price $${n(LATEST_PRICE.close, 2)} on ${LATEST_PRICE.date}. USD millions except EPS, prices, shares (millions) and stated operating units. General research, not personalized investment advice.`,
            `研究截止 ${CUTOFF}；最新已报 2026 财年第二季度，期末 ${latest.end}。${LATEST_PRICE.date} 股价 ${n(LATEST_PRICE.close, 2)} 美元。财务单位百万美元，EPS、股价、股数（百万）与运营单位另列。仅供一般研究，非个人投资建议。`,
          )}
        </p>
      </header>
      <nav
        aria-label={t("Contents", "目录")}
        className="flex flex-wrap gap-5 border-b border-zinc-200 py-5 text-sm underline"
      >
        {sections.map(([id, label]) => (
          <a key={id} href={`#${id}`}>
            {label}
          </a>
        ))}
      </nav>
      <dl className="grid grid-cols-2 gap-6 border-b border-zinc-200 py-7 lg:grid-cols-4">
        {[
          [
            t("FY2025 revenue $M", "FY2025 收入 百万美元"),
            n(a.p.revenue.value),
          ],
          [t("FY2025 FCF $M", "FY2025 自由现金 百万美元"), n(a.fcf)],
          [
            t("Q2 reported / refund-excluded EPS", "Q2 报告 / 剔除退款 EPS"),
            `${n(CURRENT.reportedEps, 2)} / ${n(CURRENT.reportedEps - CURRENT.refundEps, 2)}`,
          ],
          [t("Q2 comparable sales", "Q2 可比销售"), "-9%"],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="text-xs leading-5 text-zinc-600">{k}</dt>
            <dd className="mt-2 text-xl font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
      <section id="report" className="py-8">
        <h2 className={heading}>{t("Investment report", "投资报告")}</h2>
        {REPORT.map((s, j) => (
          <article key={j} className="border-t border-zinc-200 py-6">
            <h3 className="mb-4 text-xl font-semibold">{s.title[i]}</h3>
            <div className="max-w-5xl space-y-4 text-base leading-8 text-zinc-700">
              {s.paragraphs.map((p, k) => (
                <p key={k}>{p[i]}</p>
              ))}
            </div>
            <a
              href={s.source}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm underline"
            >
              {t("Evidence / methodological reference", "证据 / 方法参考")}
            </a>
          </article>
        ))}
      </section>
      <section id="charts" className="border-t border-zinc-300 py-8">
        <h2 className={heading}>{t("Financial dashboard", "财务图表")}</h2>
        <div className="grid gap-x-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            [
              t("Revenue", "收入"),
              annualRows.map((r) => ({
                label: String(r.fy),
                value: r.p.revenue.value,
              })),
              "$M",
            ],
            [
              t("Operating margin", "经营利润率"),
              annualRows.map((r) => ({
                label: String(r.fy),
                value: r.operatingMargin,
              })),
              "%",
            ],
            [
              t("Free cash flow", "自由现金"),
              annualRows.map((r) => ({ label: String(r.fy), value: r.fcf })),
              "$M",
            ],
            [
              t("Inventory", "库存"),
              annualRows.map((r) => ({
                label: String(r.fy),
                value: r.p.inventory.value,
              })),
              "$M",
            ],
            [
              t("Capital expenditure", "资本支出"),
              annualRows.map((r) => ({
                label: String(r.fy),
                value: r.p.capex.value,
              })),
              "$M",
            ],
            [
              t("Historical P/E", "历史市盈率"),
              VALUATION_HISTORY.map((r) => ({
                label: String(r.fy),
                value: r.pe,
              })),
              "x",
            ],
          ].map(([title, values, unit], j) => (
            <Chart
              key={j}
              title={title as string}
              values={values as { label: string; value: number | null }[]}
              unit={unit as string}
            />
          ))}
        </div>
      </section>
      <section id="forecast" className="border-t border-zinc-300 py-8">
        <h2 className={heading}>
          {t(
            "Owner-cash forecast and direct equity DCF",
            "股东现金预测与直接股权 DCF",
          )}
        </h2>
        <p className="mb-5 max-w-5xl text-sm leading-7">
          {t(
            `Revenue starting point $${n(BASELINE)}M is the FY2026 guidance midpoint. Forecast begins FY2027. Fixed share denominator ${n(SHARES, 3)}M uses Q2 diluted weighted shares. Cash remains a reserve; no cash/debt enterprise bridge, lease double subtraction or buyback accretion. Owner cash margins are after tax, reinvestment, rent and stock compensation. All future rows are assumptions.`,
            `收入起点 ${n(BASELINE)} 百万美元为 FY2026 指引中点，预测始于 FY2027。固定股数 ${n(SHARES, 3)} 百万，采用 Q2 稀释加权股数。现金留作储备，无现金/债务企业价值桥接，不重复扣租赁或假设回购增厚。股东现金率为税、再投入、租金和股权薪酬之后；未来均属假设。`,
          )}
        </p>
        <Table
          title={t("Scenario assumptions", "情景假设")}
          headers={[
            t("Case", "情景"),
            t("Growth Y1-5 / Y6-10", "增长 前五年 / 后五年"),
            t("Cash margin Y1 / Y5", "现金率 第一年 / 第五年"),
            t("Discount", "折现率"),
            t("Terminal growth", "终值增长"),
          ]}
          rows={(Object.keys(CASES) as Scenario[]).map((k) => [
            t(k, k === "bear" ? "悲观" : k === "base" ? "基准" : "乐观"),
            CASES[k].growth.map(pct).join(" / "),
            CASES[k].margin.map(pct).join(" / "),
            pct(CASES[k].discount),
            pct(CASES[k].terminal),
          ])}
        />
        <div className="my-6 grid gap-4 border-y border-zinc-200 py-5 sm:grid-cols-2 lg:grid-cols-5">
          <label>
            {t("Scenario", "情景")}
            <select
              className={field}
              value={scenario}
              onChange={(e) => {
                const s = e.target.value as Scenario;
                setScenario(s);
                setRate(String(CASES[s].discount * 100));
                setTerminal(String(CASES[s].terminal * 100));
              }}
            >
              {(Object.keys(CASES) as Scenario[]).map((k) => (
                <option key={k} value={k}>
                  {t(k, k === "bear" ? "悲观" : k === "base" ? "基准" : "乐观")}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t("Horizon", "期限")}
            <select
              className={field}
              value={horizon}
              onChange={(e) => setHorizon(Number(e.target.value) as 5 | 10)}
            >
              <option value={5}>{t("5 years", "五年")}</option>
              <option value={10}>{t("10 years", "十年")}</option>
            </select>
          </label>
          <label>
            {t("Entry price USD", "买入价 美元")}
            <input
              type="number"
              min=".01"
              step=".01"
              className={field}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label>
            {t("Discount rate %", "折现率 %")}
            <input
              type="number"
              min=".1"
              step=".1"
              className={field}
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </label>
          <label>
            {t("Terminal growth %", "终值增长 %")}
            <input
              type="number"
              min="0"
              step=".1"
              className={field}
              value={terminal}
              onChange={(e) => setTerminal(e.target.value)}
            />
          </label>
        </div>
        {!result ? (
          <p role="alert" className="text-rose-700">
            {t(
              "Use a positive price and discount rate greater than nonnegative terminal growth.",
              "请输入正数价格，且折现率须大于非负终值增长。",
            )}
          </p>
        ) : (
          <>
            <dl
              aria-live="polite"
              className="grid grid-cols-2 gap-6 py-5 lg:grid-cols-4"
            >
              {[
                [
                  t("Modeled value / share", "模型每股价值"),
                  `$${n(result.value, 2)}`,
                ],
                [
                  t("Value / price difference", "估值 / 买价差"),
                  pct(result.upside),
                ],
                [
                  t("Illustrative distribution IRR", "示例分配 IRR"),
                  pct(result.irr),
                ],
                [
                  t("Terminal PV share", "终值现值占比"),
                  pct(result.terminalWeight),
                ],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs text-zinc-600">{k}</dt>
                  <dd className="mt-2 text-xl font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <Table
              title={t("Forecast financials", "预测财务")}
              headers={[
                "FY",
                t("Growth", "增长"),
                t("Revenue $M", "收入 百万美元"),
                t("Owner margin", "股东现金率"),
                t("Owner cash $M", "股东现金 百万美元"),
                t("Cash PV $M", "现金现值 百万美元"),
              ]}
              rows={result.rows.map((r) => [
                r.fy,
                pct(r.growth),
                n(r.revenue),
                pct(r.margin),
                n(r.cash),
                n(r.pv),
              ])}
            />
            <Table
              title={t("Valuation bridge", "估值桥接")}
              headers={[t("Component", "项目"), t("USD millions", "百万美元")]}
              rows={[
                [t("Cash-flow present value", "现金流现值"), n(result.cashPv)],
                [
                  t("Terminal value before discount", "折现前终值"),
                  n(result.terminalValue),
                ],
                [t("Terminal present value", "终值现值"), n(result.terminalPv)],
                [t("Equity value", "股权价值"), n(result.equity)],
              ]}
            />
            <h3 className="mt-6 text-xl font-semibold">
              {t(
                "Discount / terminal sensitivity: value per share",
                "折现率 / 终值敏感性：每股价值",
              )}
            </h3>
            <Table
              title={t("DCF sensitivity", "DCF 敏感性")}
              headers={["r / g", "1%", "2%", "3%"]}
              rows={[0.1, 0.11, 0.12, 0.13].map((r) => [
                pct(r),
                ...[0.01, 0.02, 0.03].map(
                  (g) =>
                    `$${n(forecast(scenario, horizon, Number(price), r, g).value, 2)}`,
                ),
              ])}
            />
          </>
        )}
        <p className="mt-5 text-sm leading-7 text-zinc-600">
          {t(
            "DCF = sum of owner cash / (1+r)^year + last cash × (1+g)/(r-g)/(1+r)^horizon. IRR assumes annual cash distributions and terminal sale proceeds; it is not a price-only forecast or promised total return. No probabilities assigned. Five-year and ten-year results differ because recovery timing and terminal margins differ.",
            "DCF = 各年股东现金 / (1+r)^年数之和，加末年现金 × (1+g)/(r-g)/(1+r)^期限。IRR 假设每年分配现金和末期出售，非单纯股价预测或承诺收益。情景无概率；五年和十年因恢复节奏及终值利润率而异。",
          )}
        </p>
      </section>
      <section id="operations" className="border-t border-zinc-300 py-8">
        <h2 className={heading}>
          {t(
            "Retail operations and current normalization",
            "零售运营与当期调节",
          )}
        </h2>
        <Table
          title={t("Retail snapshots", "零售快照")}
          headers={[
            t("Period", "期间"),
            t("Stores", "直营店数"),
            t("Sales / sq ft USD", "每平方英尺销售 美元"),
            t("China sales $M", "中国收入 百万美元"),
            t("Rest-world sales $M", "其他国际收入 百万美元"),
            t("Comps %", "可比销售 %"),
            t("Source", "来源"),
          ]}
          rows={OPERATIONS.map((r) => [
            r.period,
            r.stores,
            n(r.salesPerSqFt, 0),
            n(r.chinaRevenue),
            n(r.restRevenue),
            n(r.comps),
            <a key={r.period} className="underline" href={r.source}>
              SEC
            </a>,
          ])}
        />
        <Table
          title={t("Q2 FY2026 refund reconciliation", "2026Q2 退款调节")}
          headers={[
            t("Metric", "指标"),
            t("Reported", "报告"),
            t("Refund excluded, derived", "剔除退款，推导"),
          ]}
          rows={[
            [
              t("Gross margin %", "毛利率 %"),
              n(latest.grossMargin),
              n(
                ((latest.p.grossProfit.value! - CURRENT.refund) /
                  CURRENT.revenue) *
                  100,
              ),
            ],
            [
              t("Operating margin %", "经营利润率 %"),
              n(latest.operatingMargin),
              n(
                ((latest.p.operatingIncome.value! - CURRENT.refund) /
                  CURRENT.revenue) *
                  100,
              ),
            ],
            [
              "EPS",
              n(CURRENT.reportedEps, 2),
              n(CURRENT.reportedEps - CURRENT.refundEps, 2),
            ],
          ]}
        />
        <p className="mt-4 text-sm leading-7">
          {t(
            "Refund-excluded figures remove only disclosed refund/interest benefits. They are not a complete normalized GAAP series. Q2 Americas / international comps: -12% / -3%; inventory units: -7%. Guidance as of September 3: FY2026 revenue $10,350-10,500M; EPS $9.48-9.73 includes $0.86 refund/interest benefit.",
            "调节仅剔除披露的退款/利息，非完整正常化 GAAP 序列。Q2 美洲/国际可比销售 -12%/-3%，库存件数 -7%。九月三日指引：FY2026 收入 10350-10500 百万美元；EPS 9.48-9.73，含 0.86 退款/利息收益。",
          )}
        </p>
      </section>
      <section id="annual" className="border-t border-zinc-300 py-8">
        <h2 className={heading}>
          {t("Annual financial database", "年度财务数据库")}
        </h2>
        <Table
          title={t("Annual financials USD millions", "年度财务 百万美元")}
          headers={financeHeaders}
          rows={financialRows(annualRows)}
        />
        <h3 className="my-5 text-xl font-semibold">
          {t("Balance sheet and owner economics", "资产负债与股东经济")}
        </h3>
        <Table
          title={t("Retail capital economics", "零售资本经济")}
          headers={[
            "FY",
            t("Cash incl restricted $M", "现金含受限 百万美元"),
            t("Assets", "资产"),
            t("Liabilities", "负债"),
            t("Equity", "权益"),
            t("Inventory", "库存"),
            t("Lease liabilities", "租赁负债"),
            t("Diluted shares M", "稀释股数 百万"),
            t("SBC", "股权薪酬"),
            t("Buyback cash", "回购现金"),
            t("FCF less SBC", "自由现金减股权薪酬"),
            t("Inventory turns", "库存周转"),
            t("End-equity ROE %", "期末权益 ROE %"),
          ]}
          rows={annualRows.map((r, j) => [
            r.fy,
            n(r.p.cash.value),
            n(r.p.assets.value),
            n(r.p.liabilities.value),
            n(r.p.equity.value),
            n(r.p.inventory.value),
            n(
              r.p.leases.value != null && r.p.leaseCurrent.value != null
                ? r.p.leases.value + r.p.leaseCurrent.value
                : null,
            ),
            n(r.p.shares.value),
            n(r.p.sbc.value),
            n(r.p.buybacks.value),
            n(
              r.fcf != null && r.p.sbc.value != null
                ? r.fcf - r.p.sbc.value
                : null,
            ),
            n(inventoryTurns(r, j), 2),
            n(r.roe),
          ])}
        />
        <p className="mt-4 text-sm text-zinc-600">
          {t(
            "N/A means unavailable, not zero. Lease history begins after adoption of the relevant accounting standard. Inventory turns = COGS / average beginning and ending inventory.",
            "N/A 表示缺失，非零；租赁历史始于相关会计准则采用后。库存周转 = 销货成本 / 平均期初期末库存。",
          )}
        </p>
      </section>
      <section id="quarterly" className="border-t border-zinc-300 py-8">
        <h2 className={heading}>
          {t("Quarterly financial database", "季度财务数据库")}
        </h2>
        <Table
          title={t("Discrete quarterly financials", "独立季度财务")}
          headers={["Q", ...financeHeaders]}
          rows={QUARTERLY.map((r) => [r.q, ...financialRows([r])[0]])}
        />
        <p className="mt-4 text-sm leading-7">
          {t(
            "Cash flows are YTD differences. Q4 flow amounts are annual less Q1-Q3; Q4 EPS and weighted shares remain N/A rather than subtracting ratios. Quarterly ROE is not annualized or displayed. FY2024 includes 53 weeks; fiscal years end in January/February.",
            "现金流为年初至今差额。Q4 流量为全年减 Q1-Q3；Q4 EPS 与加权股数留空，不减比率。季度 ROE 不年化、不展示。FY2024 含 53 周，财年末在一/二月。",
          )}
        </p>
      </section>
      <section id="valuation" className="border-t border-zinc-300 py-8">
        <h2 className={heading}>
          {t("Historical valuation context", "历史估值背景")}
        </h2>
        <Table
          title={t("Fiscal-end valuation estimates", "财年末估值代理")}
          headers={[
            "FY",
            t("Fiscal end", "财年末"),
            t("Price date", "价格日"),
            t("Close USD", "收盘价 美元"),
            t("Estimated cap $M", "估算市值 百万美元"),
            "P/S",
            "P/E",
            t("FCF yield %", "自由现金收益率 %"),
          ]}
          rows={VALUATION_HISTORY.map((r) => [
            r.fy,
            r.fiscalEnd,
            r.priceDate,
            n(r.price, 2),
            n(r.cap),
            n(r.ps, 2),
            n(r.pe, 2),
            n(r.fcfYield, 2),
          ])}
        />
        <p className="mt-4 text-sm leading-7">
          {t(
            "Descriptive retrospective estimates, not point-in-time backtests. Annual weighted shares are not spot shares. No unverified enterprise-value series is supplied.",
            "回顾代理估计，非时点回测。年度加权股数非时点股数，不提供未经核对的企业价值序列。",
          )}{" "}
          <a className="underline" href={PRICE_SOURCE}>
            {t("Market data source", "市场数据来源")}
          </a>
        </p>
      </section>
      <section id="filings" className="border-t border-zinc-300 py-8">
        <h2 className={heading}>{t("SEC filing inventory", "SEC 文件目录")}</h2>
        <Table
          title={t("SEC filings", "SEC 文件")}
          headers={[
            "Form",
            t("Filed", "提交日"),
            t("Period end", "期末"),
            "Accession",
            t("Source", "来源"),
          ]}
          rows={[...FILINGS].reverse().map((f) => [
            f.form,
            f.filed,
            f.end,
            f.accession,
            <a key={f.accession} className="underline" href={f.source}>
              SEC
            </a>,
          ])}
        />
      </section>
      <section id="audit" className="border-t border-zinc-300 py-8">
        <h2 className={heading}>
          {t("Source audit and publication QA", "来源审计与发布核验")}
        </h2>
        <Table
          title={t("Source audit", "来源审计")}
          headers={[
            t("Area", "领域"),
            t("Status", "状态"),
            t("Coverage and limitation", "覆盖与局限"),
            t("Source", "来源"),
          ]}
          rows={AUDIT.map((r) => [
            r.area[i],
            r.status,
            r.note[i],
            <a key={r.area[0]} className="underline" href={r.source}>
              {t("Evidence", "证据")}
            </a>,
          ])}
        />
        <Table
          title={t("Publication QA", "发布核验")}
          headers={[t("Check", "检查"), t("Status", "状态"), t("Note", "说明")]}
          rows={PUBLICATION_QA.map((r) => [r[i], r[2], r[3]])}
        />
        <p className="mt-5 text-sm leading-7 text-zinc-600">
          {t(
            "Source system: SEC CIK 1397187 submissions and US-GAAP companyfacts; issuer IR for operations and management; Yahoo closing prices for historical context. Chart inventory: revenue, operating margin, free cash flow, inventory, capex and P/E. Financial tags and calculation inputs are retained in the data module. Retail unit profits, full regional margins and complete GAAP forecasts are not claimed.",
            "来源系统：SEC CIK 1397187 提交目录与 US-GAAP companyfacts；公司 IR 运营与管理层；Yahoo 历史收盘价。图表目录：收入、经营利润率、自由现金、库存、资本支出、市盈率。数据模块保留标签与计算输入。不宣称单店利润、完整地区利润率或完整 GAAP 预测。",
          )}
        </p>
        <a
          href={SOURCES.quarter}
          className="mt-3 inline-block text-sm underline"
        >
          {t("Latest quarterly filing", "最新季报")}
        </a>
      </section>
    </main>
  );
}
