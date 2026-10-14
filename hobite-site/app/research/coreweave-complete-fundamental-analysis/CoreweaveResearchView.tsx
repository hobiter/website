"use client";
import { useState, type ReactNode } from "react";
import { ANNUAL, QUARTERLY, FILINGS, CUTOFF } from "./secData";
import {
  LATEST_PRICE,
  VALUATION_HISTORY,
  QUARTER_PRICE_HISTORY,
  PRICE_SOURCE,
} from "./valuationHistory";
import { SOURCES, OPERATIONS, DISCLOSURES } from "./operatingMetrics";
import {
  CASES,
  BRIDGE,
  BASELINE,
  SHARES,
  forecast,
  type Scenario,
} from "./forecastModel";
import { REPORT } from "./reportContent";
import { AUDIT, QA } from "./sourceAudit";
type FinancialRow = {
  fy: number;
  end: string;
  source: string;
  p: Record<string, { value: number | null }>;
  fcf: number | null;
  operatingMargin: number | null;
  netMargin: number | null;
  fcfMargin: number | null;
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
          className="mb-3 grid grid-cols-[60px_minmax(0,1fr)_78px] items-center gap-2 text-xs"
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
export default function CoreweaveResearchView({ lang }: { lang: "en" | "zh" }) {
  const zh = lang === "zh",
    i = zh ? 1 : 0,
    t = (en: string, cn: string) => (zh ? cn : en);
  const [scenario, setScenario] = useState<Scenario>("base"),
    [horizon, setHorizon] = useState<5 | 10>(10),
    [price, setPrice] = useState(String(LATEST_PRICE.close)),
    [rate, setRate] = useState("14"),
    [terminal, setTerminal] = useState("2.5"),
    [cash, setCash] = useState(String(BRIDGE.cash)),
    [replacement, setReplacement] = useState("0"),
    [dilution, setDilution] = useState("2.5");
  const valid =
    [price, rate, terminal, cash, replacement, dilution].every(
      (v) => v.trim() !== "" && Number.isFinite(Number(v)),
    ) &&
    Number(price) > 0 &&
    Number(rate) > Number(terminal) &&
    Number(terminal) >= 0 &&
    Number(cash) >= 0 &&
    Number(replacement) >= 0 &&
    Number(dilution) >= 0;
  const result = valid
    ? forecast(
        scenario,
        horizon,
        Number(price),
        Number(rate) / 100,
        Number(terminal) / 100,
        Number(cash),
        Number(replacement) / 100,
        Number(dilution) / 100,
      )
    : null;
  const field =
      "mt-1 w-full min-w-0 rounded border border-zinc-300 bg-white p-2 text-zinc-900",
    heading = "mb-5 text-2xl font-semibold";
  const latest = QUARTERLY.at(-1)!,
    annual: FinancialRow[] = ANNUAL;
  const sections = [
    ["report", t("Investment report", "投资报告")],
    ["charts", t("Dashboard", "图表")],
    ["model", t("Forecast and valuation", "预测估值")],
    ["operations", t("Infrastructure economics", "基础设施经济")],
    ["financials", t("Financial history", "财务历史")],
    ["market", t("Market history", "市场历史")],
    ["filings", t("SEC filings", "SEC 文件")],
    ["audit", t("Sources and QA", "来源与核验")],
  ];
  const caseLabel = (s: Scenario) =>
    t(s, s === "bear" ? "悲观" : s === "base" ? "基准" : "乐观");
  const financeRows = (rows: FinancialRow[]) =>
    rows.map((r) => [
      r.fy,
      r.end,
      n(r.p.revenue.value),
      n(r.p.operatingIncome.value),
      n(r.p.netIncome.value),
      n(r.p.eps.value, 2),
      n(r.p.ocf.value),
      n(r.p.capex.value),
      n(r.fcf),
      n(r.operatingMargin),
      n(r.netMargin),
      n(r.fcfMargin),
      <a key={r.end} className="underline" href={r.source}>
        SEC
      </a>,
    ]);
  const financeHeaders = [
    "FY",
    t("End", "期末"),
    t("Revenue", "收入"),
    t("Operating income", "经营利润"),
    t("Net income", "净利"),
    "EPS",
    t("OCF", "经营现金"),
    t("Cash capex", "现金资本支出"),
    t("OCF less cash capex", "经营现金减投资"),
    t("Operating %", "经营率 %"),
    t("Net %", "净利率 %"),
    t("Cash FCF %", "现金 FCF %"),
    t("Source", "来源"),
  ];
  const numericInputs = [
    [t("Entry price USD", "买入价 美元"), price, setPrice, ".01"],
    [t("Discount rate %", "折现率 %"), rate, setRate, ".1"],
    [t("Terminal growth %", "终值增长 %"), terminal, setTerminal, ".1"],
    [t("Eligible cash $M", "可用现金 百万美元"), cash, setCash, "1"],
    [
      t("Extra replacement / sales %", "额外更新 / 收入 %"),
      replacement,
      setReplacement,
      ".1",
    ],
    [
      t("Annual dilution stress %", "年度稀释压力 %"),
      dilution,
      setDilution,
      ".1",
    ],
  ] as const;
  return (
    <main
      lang={lang}
      data-company="crwv"
      className="mx-auto w-full min-w-0 max-w-7xl bg-white px-4 py-10 text-zinc-900 sm:px-8"
    >
      <nav
        className="mb-7 flex flex-wrap gap-5 text-sm underline"
        aria-label={t("Research navigation", "研究导航")}
      >
        <a href="/research">{t("Research library", "研究库")}</a>
        <a href="/research/coreweave-complete-fundamental-analysis">English</a>
        <a href="/research/coreweave-complete-fundamental-analysis/zh">中文</a>
      </nav>
      <header className="border-b border-zinc-300 pb-8">
        <p className="mb-3 text-sm font-medium text-emerald-800">
          Hobite Research · NASDAQ: CRWV
        </p>
        <h1
          style={{ color: "#18181b" }}
          className="text-4xl font-semibold sm:text-5xl"
        >
          {t(
            "CoreWeave: Complete Fundamental Analysis",
            "CoreWeave：完整基本面研究",
          )}
        </h1>
        <p className="mt-4 text-xl text-zinc-600">
          {t(
            "AI demand, GPU reinvestment and the common-equity residual",
            "AI 需求、GPU 再投入与普通股剩余价值",
          )}
        </p>
        <p className="mt-5 text-sm leading-7">
          {t(
            `Research cutoff ${CUTOFF}; latest filed quarter ended ${latest.end}. Price $${n(LATEST_PRICE.close, 2)} on ${LATEST_PRICE.date}. Financial amounts USD millions; shares millions; per-share prices/EPS USD. Four annual periods and six quarters, not a ten-year public history.`,
            `研究截至 ${CUTOFF}；最新已报季度期末 ${latest.end}。${LATEST_PRICE.date} 股价 ${n(LATEST_PRICE.close, 2)} 美元。财务金额百万美元，股数百万，每股价与 EPS 为美元。四个年度、六个季度，非十年上市历史。`,
          )}
        </p>
      </header>
      <p className="my-5 border-l-2 border-rose-600 pl-4 text-sm font-medium leading-7">
        {t(
          "Valuation limitation: June-anchored deployment scenarios with a known September financing adjustment, not a fully reconciled October cash/debt/share bridge. Capital payables and other interim financing/spending require further audit. Modeled values are not certified fair values or guaranteed returns.",
          "估值局限：六月锚定部署情景加已知九月融资调整，不是已完整核对的十月现金、债务、股数桥接。资本应付与其他期间融资支出需进一步审计。模型非认证公允价值或保证回报。",
        )}
      </p>
      <nav
        aria-label={t("Contents", "目录")}
        className="flex flex-wrap gap-5 border-y border-zinc-200 py-5 text-sm underline"
      >
        {sections.map(([id, label]) => (
          <a key={id} href={`#${id}`}>
            {label}
          </a>
        ))}
      </nav>
      <dl className="grid grid-cols-2 gap-6 border-b border-zinc-200 py-7 lg:grid-cols-4">
        {[
          [t("Q2 revenue $M", "Q2 收入 百万美元"), n(latest.p.revenue.value)],
          [t("Q2 cash FCF $M", "Q2 现金自由现金 百万美元"), n(latest.fcf)],
          [
            t("June RPO / backlog $B", "六月 RPO / 订单 十亿美元"),
            "103.7 / 104.2",
          ],
          [
            t("June principal debt $B", "六月本金债务 十亿美元"),
            n(BRIDGE.reportedDebt / 1000, 2),
          ],
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
              {t("Evidence / method reference", "证据 / 方法参考")}
            </a>
          </article>
        ))}
      </section>
      <section id="charts" className="border-t border-zinc-300 py-8">
        <h2 className={heading}>
          {t("Financial and infrastructure dashboard", "财务与基础设施图表")}
        </h2>
        <div className="grid gap-x-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            [
              t("Annual revenue", "年度收入"),
              annual.map((r) => ({
                label: String(r.fy),
                value: r.p.revenue.value,
              })),
              "$M",
            ],
            [
              t("Cash capex", "现金资本支出"),
              annual.map((r) => ({
                label: String(r.fy),
                value: r.p.capex.value,
              })),
              "$M",
            ],
            [
              t("OCF less cash capex", "经营现金减投资"),
              annual.map((r) => ({ label: String(r.fy), value: r.fcf })),
              "$M",
            ],
            [
              t("Annual operating margin", "年度经营利润率"),
              annual.map((r) => ({
                label: String(r.fy),
                value: r.operatingMargin,
              })),
              "%",
            ],
            [
              t("Principal debt", "本金债务"),
              annual.map((r) => ({
                label: String(r.fy),
                value: r.p.debtPrincipal.value,
              })),
              "$M",
            ],
            [
              t(
                "Active power, disclosed qualifiers apply",
                "运行电力，量词按披露",
              ),
              OPERATIONS.map((r) => ({
                label: r.period.replace("FY", ""),
                value: r.activeMw,
              })),
              "MW",
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
      <section id="model" className="border-t border-zinc-300 py-8">
        <h2 className={heading}>
          {t(
            "Five-/ten-year enterprise-to-equity scenarios",
            "五年 / 十年企业至股权情景",
          )}
        </h2>
        <p className="mb-5 text-sm leading-7">
          {t(
            `FY2026 revenue baseline $${n(BASELINE)}M is the August 11 guidance midpoint; growth beyond 2026 is independent research. June bridge uses July 31 combined Class A/B shares ${n(SHARES, 3)}M and a known September issuance. Full H2 investment stub is charged from the June reference, even though some is already past at the October quote date. It is not an October DCF.`,
            `FY2026 收入起点 ${n(BASELINE)} 百万美元为八月十一日指引中点，2026 后增长是独立研究。六月桥接用七月三十一日 A/B 合计股数 ${n(SHARES, 3)} 百万及已知九月发行。从六月锚点计完整下半年投资部分，尽管至十月报价时部分已过去，因此非十月 DCF。`,
          )}
        </p>
        <Table
          title={t("Default scenario values", "默认情景估值")}
          headers={[
            t("Case", "情景"),
            t("5Y value USD", "五年每股 美元"),
            t("10Y value USD", "十年每股 美元"),
            t("10Y raw equity $M", "十年原始股权 百万美元"),
            t("Growth 1-5 / 6-10", "增长 前/后五年"),
            t("Operating margin 1 / 5", "经营率 第一年/第五年"),
            t(
              "Capital / incremental sales 1 / 5",
              "增量资本/销售 第一年/第五年",
            ),
            t("r / g", "折现/终值"),
          ]}
          rows={(Object.keys(CASES) as Scenario[]).map((s) => {
            const c = CASES[s],
              f = forecast(s, 5),
              ten = forecast(s, 10);
            return [
              caseLabel(s),
              n(f.value, 2),
              n(ten.value, 2),
              n(ten.rawEquity),
              c.growth.map(pct).join(" / "),
              c.operatingMargin.map(pct).join(" / "),
              c.capitalSales.map((v) => `${n(v, 2)}x`).join(" / "),
              `${pct(c.discount)} / ${pct(c.terminal)}`,
            ];
          })}
        />
        <div className="my-6 grid gap-4 border-y border-zinc-200 py-5 text-sm sm:grid-cols-2 lg:grid-cols-4">
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
                setDilution(String(CASES[s].dilution * 100));
              }}
            >
              {(Object.keys(CASES) as Scenario[]).map((s) => (
                <option key={s} value={s}>
                  {caseLabel(s)}
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
              <option value={5}>{t("5 full years", "五个完整年度")}</option>
              <option value={10}>{t("10 full years", "十个完整年度")}</option>
            </select>
          </label>
          {numericInputs.map(([label, value, setter, step]) => (
            <label key={label}>
              {label}
              <input
                type="number"
                className={field}
                value={value}
                step={step}
                min={
                  label === t("Entry price USD", "买入价 美元") ? ".01" : "0"
                }
                onChange={(e) => setter(e.target.value)}
              />
            </label>
          ))}
        </div>
        {!result ? (
          <p role="alert" className="text-rose-700">
            {t(
              "Enter finite nonnegative inputs, a positive price, and a discount rate above terminal growth.",
              "请输入有限非负输入、正数价格，且折现率大于终值增长。",
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
                  t("Modeled residual / share", "模型剩余每股"),
                  `$${n(result.value, 2)}`,
                ],
                [t("Raw equity $M", "原始股权 百万美元"), n(result.rawEquity)],
                [
                  t("Value / quote difference", "估值 / 报价差"),
                  pct(result.upside),
                ],
                [
                  t("Terminal PV / enterprise", "终值现值 / 企业价值"),
                  pct(result.terminalShare),
                ],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs leading-5 text-zinc-600">{k}</dt>
                  <dd className="mt-2 text-xl font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            {result.rawEquity <= 0 && (
              <p className="mb-5 text-sm font-medium text-rose-700">
                {t(
                  "This scenario leaves no modeled common-equity residual after claims. Zero is a valuation stress result, not a forecast of bankruptcy or a limit on losses.",
                  "该情景扣索取权后没有模型普通股剩余。归零是估值压力结果，非破产预测或损失限制。",
                )}
              </p>
            )}
            <Table
              title={t("H2 FY2026 illustrative stub", "2026 下半年示例部分")}
              headers={[
                t("Revenue", "收入"),
                t("EBIT", "经营利润"),
                t("Tax", "税"),
                t("D&A", "折旧摊销"),
                t("Economic capex", "经济投资"),
                t("Working capital", "营运资本"),
                t("FCFF", "企业自由现金"),
              ]}
              rows={[
                [
                  n(result.stub.revenue),
                  n(result.stub.ebit),
                  n(result.stub.tax),
                  n(result.stub.da),
                  n(result.stub.capex),
                  n(result.stub.wc),
                  n(result.stub.fcff),
                ],
              ]}
            />
            <Table
              title={t("Forecast USD millions", "预测 百万美元")}
              headers={[
                "FY",
                t("Growth", "增长"),
                t("Revenue", "收入"),
                t("EBIT %", "经营率"),
                t("EBIT", "经营利润"),
                t("Tax", "税"),
                t("D&A", "折旧"),
                t("Economic capex", "经济投资"),
                t("WC investment", "营运资本投入"),
                "FCFF",
                t("PV", "现值"),
                t("Stress shares M", "压力股数 百万"),
              ]}
              rows={result.rows.map((r) => [
                r.fy,
                pct(r.growth),
                n(r.revenue),
                pct(r.margin),
                n(r.ebit),
                n(r.tax),
                n(r.da),
                n(r.capex),
                n(r.wc),
                n(r.fcff),
                n(r.pv),
                n(r.shares),
              ])}
            />
            <Table
              title={t("Enterprise / equity bridge", "企业 / 股权桥接")}
              headers={[t("Component", "项目"), t("USD millions", "百万美元")]}
              rows={[
                [
                  t("Stub and annual cash PV", "部分及年度现金现值"),
                  n(result.flowPv),
                ],
                [t("Terminal FCFF", "终值年度 FCFF"), n(result.terminalCash)],
                [
                  t("Terminal value before discount", "折现前终值"),
                  n(result.terminalValue),
                ],
                [t("Terminal PV", "终值现值"), n(result.terminalPv)],
                [t("Enterprise value", "企业价值"), n(result.enterprise)],
                [
                  t("Principal debt including September", "含九月本金债务"),
                  n(-BRIDGE.debt),
                ],
                [
                  t("Reported finance leases", "披露融资租赁"),
                  n(-BRIDGE.financeLease),
                ],
                [t("Eligible pro-forma cash", "可用模拟现金"), n(Number(cash))],
                [
                  t("Raw equity / floored equity", "原始 / 归零后股权"),
                  `${n(result.rawEquity)} / ${n(result.equity)}`,
                ],
                [
                  t(
                    "Undiscounted negative FCFF diagnostic, not extra deduction",
                    "未折现负现金诊断，不额外扣减",
                  ),
                  n(result.negativeFunding),
                ],
              ]}
            />
            <h3 className="my-5 text-xl font-semibold">
              {t(
                "Sensitivity: per-share residual by r / g",
                "敏感性：折现 / 终值增长的每股剩余",
              )}
            </h3>
            <Table
              title={t("DCF sensitivity", "DCF 敏感性")}
              headers={["r / g", "1%", "2%", "3%"]}
              rows={[0.12, 0.14, 0.16, 0.18].map((r) => [
                pct(r),
                ...[0.01, 0.02, 0.03].map(
                  (g) =>
                    `$${n(forecast(scenario, horizon, Number(price), r, g, Number(cash), Number(replacement) / 100, Number(dilution) / 100).value, 2)}`,
                ),
              ])}
            />
          </>
        )}
        <p className="mt-5 max-w-5xl text-sm leading-7 text-zinc-600">
          {t(
            "Formula: FCFF = EBIT − tax + D&A − (D&A + incremental revenue × capital/sales + extra replacement) − incremental working capital. Terminal cash uses next-year revenue and terminal-growth reinvestment. Cash flows discount at June-reference year-end times; H2 stub at 0.5, 2027 at 1.5, etc. Net new financing proceeds are not revenue. Negative cash flows already reduce enterprise PV; financing diagnostic is not deducted twice. Annual dilution is a separate conservative share stress, with no added issuance proceeds, and does not price existing convertibles or capped calls. No IRR or guaranteed ROI is claimed.",
            "公式：FCFF = 经营利润 − 税 + 折旧 −（折旧 + 增量收入 × 资本/销售 + 额外更新）− 增量营运资本。终值采用次年收入和终值增长再投入。以六月锚点年末时间折现：下半年 0.5、2027 年 1.5 等。新融资所得不是收入。负现金已扣企业现值，不再扣融资诊断。年度稀释独立保守压力，无发股所得加回，不定价已有可转债或封顶看涨。不宣称 IRR 或保证 ROI。",
          )}
        </p>
        <p className="mt-3 text-sm leading-7">
          {t(
            "Additional assumptions: tax 25%, no cash loss tax credit; D&A/sales 40% bear and 35% base/bull; WC/incremental sales 5%/4%/3%. EBIT and incremental capital/sales ramp to year five then hold. H2 stub uses 4% EBIT, 45% D&A, and $37B issuer-capex midpoint less $16.139B H1 issuer capex. These are not GAAP guidance.",
            "其他假设：税率 25%，亏损无现金税抵免；折旧/收入悲观 40%、基准乐观 35%；营运资本/增量收入 5%/4%/3%。经营率与资本/销售至第五年变化后固定。下半年使用经营率 4%、折旧率 45%、公司投资中点 370 亿减上半年 161.39 亿。非 GAAP 指引。",
          )}
        </p>
      </section>
      <section id="operations" className="border-t border-zinc-300 py-8">
        <h2 className={heading}>
          {t("Infrastructure and financing economics", "基础设施与融资经济")}
        </h2>
        <Table
          title={t("Operating snapshots", "运营快照")}
          headers={[
            t("Period", "期间"),
            t("Data centers", "数据中心"),
            t("Active MW", "运行 MW"),
            t("Qualifier", "量词"),
            t("Contracted MW", "签约 MW"),
            t("GPUs, rounded disclosed lower bounds", "GPU 披露取整下界"),
            t("RPO $M", "RPO 百万美元"),
            t("Backlog $M", "订单 百万美元"),
          ]}
          rows={OPERATIONS.map((r) => [
            r.period,
            r.centers ?? "N/A",
            n(r.activeMw, 0),
            r.powerQualifier,
            n(r.contractedMw, 0),
            r.gpus == null ? "N/A" : `>${n(r.gpus, 0)}`,
            n(r.rpoM),
            n(r.backlogM),
          ])}
        />
        <p className="mt-3 text-sm leading-7">
          {t(
            "GPU counts are disclosed rounded lower bounds, not exact fleet counts. Historical GPU figures reference the IPO prospectus; FY2025 backlog references the later presentation. Active/contracted power are not utilization.",
            "GPU 为披露取整下界，非精确机队数；历史 GPU 取 IPO，FY2025 订单取后续展示。运行/签约电力不是利用率。",
          )}{" "}
          <a href={SOURCES.ipo} className="underline">
            IPO
          </a>{" "}
          ·{" "}
          <a href={SOURCES.presentation} className="underline">
            {t("Presentation", "展示")}
          </a>
        </p>
        <Table
          title={t("Q2 earnings waterfall $M", "Q2 盈利瀑布 百万美元")}
          headers={[t("Metric", "指标"), t("Reported value", "报告值")]}
          rows={[
            [t("Revenue", "收入"), 2575],
            [t("GAAP operating loss", "GAAP 经营亏损"), -49],
            [t("Adjusted operating income", "调整经营利润"), 128],
            [t("Adjusted EBITDA", "调整 EBITDA"), 1510],
            [t("Net interest expense", "净利息费用"), -640],
            [t("Net loss", "净亏损"), -626],
          ]}
        />
        <Table
          title={t("Capex definitions $M", "资本支出口径 百万美元")}
          headers={[
            t("Period", "期间"),
            t("Cash PPE purchases", "现金固定资产采购"),
            t("Issuer capex metric", "公司资本支出指标"),
          ]}
          rows={[
            ["H1 2026", 14117, 16139],
            ["Q2 2026", 6422, 9352],
          ]}
        />
        <p className="mt-3 text-sm leading-7">
          {t(
            "Issuer capex: gross PPE additions including finance-lease assets less change in construction in progress. H1 PPE-addition liabilities including OEM financing: $9,796M; reclassification to debt $1,469M. These must not simply be added to cash capex. Customer advances contributed $1,365M to H1 operating cash changes.",
            "公司投资：固定资产毛新增含融资租赁减在建工程变化。H1 设备新增负债含 OEM 融资 9796 百万美元，重分类至债务 1469 百万美元，不能简单加现金支出。客户预付对上半年经营现金变化贡献 1365 百万美元。",
          )}
        </p>
        <Table
          title={t("Contract/customer evidence", "合同 / 客户证据")}
          headers={[t("Metric", "指标"), t("Value", "值")]}
          rows={[
            [
              t("Q2 committed-contract revenue share", "Q2 承诺合同收入占比"),
              "98%",
            ],
            [
              t(
                "Q2 anonymous A / B / C revenue shares",
                "Q2 匿名 A/B/C 收入占比",
              ),
              "36% / 26% / 10%",
            ],
            [
              t("FY2025 Microsoft revenue share", "FY2025 Microsoft 收入占比"),
              "67%",
            ],
            [
              t(
                "June RPO recognition first 24 / next 24 / later months",
                "六月 RPO 前24 / 后24 / 更后月份",
              ),
              "41% / 39% / 20%",
            ],
            [t("Backlog less RPO $M", "订单减 RPO 百万美元"), 500],
          ]}
        />
        <p className="mt-3 text-sm leading-7">
          {t(
            "Anonymous customer labels may change between periods. Backlog is not recognized revenue, cash or collateral value.",
            "匿名客户标签可跨期变化；订单非已确认收入、现金或抵押价值。",
          )}
        </p>
        <h3 className="my-5 text-xl font-semibold">
          {t("Quarter-end debt principal maturities", "季度末债务本金到期")}
        </h3>
        <Table
          title={t("June debt maturity schedule", "六月债务到期计划")}
          headers={[t("Year", "年度"), t("Principal $M", "本金 百万美元")]}
          rows={DISCLOSURES.maturities.map((r) => [r.year, r.principal])}
        />
        <h3 className="my-5 text-xl font-semibold">
          {t(
            "September completed convertible offering",
            "九月已完成可转债发行",
          )}
        </h3>
        <Table
          title={t("Convertible terms", "可转债条款")}
          headers={[t("Term", "条款"), t("Value", "值")]}
          rows={[
            [t("Principal $M", "本金 百万美元"), 4200],
            [
              t(
                "Net before remaining expenses $M",
                "剩余费用前净所得 百万美元",
              ),
              4137,
            ],
            [t("Capped-call cost $M", "封顶看涨成本 百万美元"), 566.2],
            [t("Coupon", "票息"), "2.875%"],
            [
              t("Initial conversion / cap price USD", "初始转换 / 封顶价 美元"),
              "97.85 / 199.70",
            ],
            [
              t(
                "Initial underlying shares M / maximum M",
                "初始标的股数 / 最大股数 百万",
              ),
              "42.921480 / 52.578540",
            ],
          ]}
        />
        <p className="mt-3 text-sm leading-7">
          {t(
            "Completed September 22; final terms supersede earlier indicative presentation. Default bridge retains debt treatment, not if-converted treatment; capped-call asset is not separately valued. DDTL 5.5 $2.6B facility is a commitment, not assumed fully drawn.",
            "九月二十二日完成，最终条款覆盖旧指示展示。默认桥接为债务而非假设转换，不单独估封顶看涨资产。DDTL 5.5 的 26 亿为承诺，不假设全提款。",
          )}{" "}
          <a href={SOURCES.convertible} className="underline">
            SEC 8-K
          </a>{" "}
          ·{" "}
          <a href={SOURCES.facility} className="underline">
            {t("Facility", "融资额度")}
          </a>
        </p>
        <h3 className="my-5 text-xl font-semibold">
          {t("Dated 2026 management outlook", "注明日期的 2026 管理层指引")}
        </h3>
        <Table
          title={t("August 11 outlook", "八月十一日指引")}
          headers={[t("Metric", "指标"), t("Range", "范围")]}
          rows={[
            [t("Revenue $M", "收入 百万美元"), "12,400–13,200"],
            [t("Issuer capex $M", "公司投资 百万美元"), "35,000–39,000"],
            [
              t("Adjusted operating income $M", "调整经营利润 百万美元"),
              "960–1,150",
            ],
            [
              t(
                "Exit annualized run-rate revenue $M",
                "退出年化运行收入 百万美元",
              ),
              "18,500–19,500",
            ],
          ]}
        />
        <p className="mt-3 text-sm leading-7">
          {t(
            "Run-rate revenue is last-month revenue multiplied by 12, not GAAP annual revenue or a SaaS recurring-revenue assurance.",
            "运行收入为末月乘十二，不是 GAAP 全年收入或 SaaS 经常性收入保证。",
          )}{" "}
          <a href={SOURCES.outlook} className="underline">
            {t("Primary outlook presentation", "原始指引展示")}
          </a>
        </p>
      </section>
      <section id="financials" className="border-t border-zinc-300 py-8">
        <h2 className={heading}>
          {t("SEC financial databases", "SEC 财务数据库")}
        </h2>
        <h3 className="my-5 text-xl font-semibold">
          {t("Annual flows, USD millions", "年度流量 百万美元")}
        </h3>
        <Table
          title={t("Annual financials", "年度财务")}
          headers={financeHeaders}
          rows={financeRows(annual)}
        />
        <h3 className="my-5 text-xl font-semibold">
          {t("Discrete quarterly flows, USD millions", "独立季度流量 百万美元")}
        </h3>
        <Table
          title={t("Quarterly financials", "季度财务")}
          headers={["Q", ...financeHeaders]}
          rows={QUARTERLY.map((r) => [r.q, ...financeRows([r])[0]])}
        />
        <p className="mt-3 text-sm leading-7">
          {t(
            "OCF and cash-capex quarters use YTD differences; Q4 flows are annual minus Q1-Q3. Q4 EPS and weighted shares stay N/A. Historical rows may mix later rounded facts with earlier precise facts; source dates are retained. Cash FCF is not unlevered FCFF or distributable equity cash. No synthetic gross margin.",
            "经营现金与投资季度取年初至今差，Q4 流量取全年减 Q1-Q3；Q4 EPS 和加权股数留空。较新取整和较早精确数据可能混合，保留来源日期。现金 FCF 非无杠杆 FCFF 或可分配股权现金，不造合成毛利率。",
          )}
        </p>
        <h3 className="my-5 text-xl font-semibold">
          {t("Balance sheet and capital intensity", "资产负债与资本强度")}
        </h3>
        <Table
          title={t("Annual capital economics", "年度资本经济")}
          headers={[
            "FY",
            t("Unrestricted cash", "非受限现金"),
            t("Restricted current", "受限流动"),
            t("Restricted noncurrent", "受限非流动"),
            t("Assets", "资产"),
            t("Liabilities", "负债"),
            t("Equity", "权益"),
            t("Principal debt", "本金债务"),
            t("Operating leases", "经营租赁"),
            t("Finance leases", "融资租赁"),
            t("PPE net", "固定资产净额"),
            t("D&A", "折旧"),
            t("SBC CF adjustment", "股权薪酬现金调节"),
            t("Diluted weighted shares M", "稀释加权股数 百万"),
            t("Cash capex / sales %", "现金投资/收入 %"),
            t("End-equity ROE %", "期末权益 ROE %"),
          ]}
          rows={annual.map((r) => [
            r.fy,
            n(r.p.cash.value),
            n(r.p.restrictedCurrent.value),
            n(r.p.restrictedNoncurrent.value),
            n(r.p.assets.value),
            n(r.p.liabilities.value),
            n(r.p.equity.value),
            n(r.p.debtPrincipal.value),
            n(r.p.opLease.value),
            n(r.p.financeLease.value),
            n(r.p.ppe.value),
            n(r.p.da.value),
            n(r.p.sbc.value),
            n(r.p.shares.value),
            n(
              r.p.capex.value != null && r.p.revenue.value
                ? (100 * r.p.capex.value) / r.p.revenue.value
                : null,
            ),
            r.p.equity.value != null && r.p.equity.value > 0 ? n(r.roe) : "N/A",
          ])}
        />
        <p className="mt-3 text-sm leading-7">
          {t(
            "Negative-equity ROE is not presented as a meaningful positive return. 2022 manual IPO extraction includes consolidated OCF with discontinued operations; early balance fields absent. Preferred mezzanine equity means pre-IPO assets need not equal liabilities plus common equity.",
            "负权益 ROE 不展示为有意义正回报。2022 IPO 手工提取含终止业务合并经营现金，早期资产负债缺项。上市前中间层优先权益意味着资产不必等于负债加普通股权益。",
          )}
        </p>
        <h3 className="my-5 text-xl font-semibold">
          {t(
            "June balance and pro-forma bridge inputs",
            "六月余额与模拟桥接输入",
          )}
        </h3>
        <Table
          title={t("Current bridge inputs", "桥接输入")}
          headers={[t("Item", "项目"), t("USD millions", "百万美元")]}
          rows={[
            [t("June debt principal", "六月债务本金"), BRIDGE.reportedDebt],
            [t("September new principal", "九月新增本金"), BRIDGE.newNotes],
            [t("Reported finance leases", "披露融资租赁"), BRIDGE.financeLease],
            [t("June unrestricted cash", "六月非受限现金"), BRIDGE.oldCash],
            [
              t(
                "September proceeds less capped-call cost",
                "九月净所得减封顶看涨成本",
              ),
              BRIDGE.newNetCash,
            ],
            [
              t("Restricted cash excluded", "受限现金不计入"),
              BRIDGE.restricted,
            ],
            [
              t(
                "June operating leases, costs retained in EBIT",
                "六月经营租赁，成本留 EBIT",
              ),
              latest.p.opLease.value,
            ],
          ]}
        />
      </section>
      <section id="market" className="border-t border-zinc-300 py-8">
        <h2 className={heading}>
          {t(
            "Public market history and valuation context",
            "公开市场历史与估值背景",
          )}
        </h2>
        <Table
          title={t("Quarter-end public prices", "季度末公开价格")}
          headers={[
            t("Period", "期间"),
            t("Financial end", "财务期末"),
            t("Price date", "价格日"),
            t("Close USD", "收盘价 美元"),
          ]}
          rows={QUARTER_PRICE_HISTORY.map((r) => [
            r.period,
            r.end,
            r.priceDate ?? "N/A",
            n(r.close, 2),
          ])}
        />
        <Table
          title={t("Annual market proxies", "年度市场代理")}
          headers={[
            "FY",
            t("Price date", "价格日"),
            t("Close USD", "收盘价 美元"),
            t("Share-proxy date", "股数代理日期"),
            t("Shares M", "股数 百万"),
            t("Estimated cap $M", "估算市值 百万美元"),
            "P/S",
            "P/E",
            t("Cash FCF yield %", "现金 FCF 收益率 %"),
          ]}
          rows={VALUATION_HISTORY.map((r) => [
            r.fy,
            r.priceDate ?? "N/A",
            n(r.close, 2),
            r.shareDate ?? "N/A",
            n(r.sharesM, 3),
            n(r.cap),
            n(r.ps, 2),
            n(r.pe, 2),
            n(r.fcfYield, 2),
          ])}
        />
        <p className="mt-4 text-sm leading-7">
          {t(
            "No public market before March 2025. FY2025 uses post-year-end January 31 combined Class A/B share count, not diluted annual weighted shares. This is a look-ahead retrospective proxy, not a point-in-time backtest. P/E absent for net losses. No unverified historical EV series.",
            "2025 年三月前无公开市场。FY2025 用期后次年一月三十一日 A/B 合计股数，非年度稀释加权股数，是带前视回顾代理而非时点回测。亏损无 P/E，不提供未核对历史 EV。",
          )}{" "}
          <a href={PRICE_SOURCE} className="underline">
            {t("Price source", "价格来源")}
          </a>
        </p>
      </section>
      <section id="filings" className="border-t border-zinc-300 py-8">
        <h2 className={heading}>{t("SEC filing inventory", "SEC 文件目录")}</h2>
        <Table
          title={t("SEC filings", "SEC 文件")}
          headers={[
            "Form",
            t("Filed", "提交日期"),
            t("Period end", "期末"),
            "Accession",
            t("Source", "来源"),
          ]}
          rows={[...FILINGS].reverse().map((f) => [
            f.form,
            f.filed,
            f.end,
            f.accession,
            <a key={f.accession} href={f.source} className="underline">
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
            <a key={r.area[0]} href={r.source} className="underline">
              {t("Evidence", "证据")}
            </a>,
          ])}
        />
        <Table
          title={t("Publication checks", "发布检查")}
          headers={[t("Check", "检查"), t("Status", "状态"), t("Note", "说明")]}
          rows={QA.map((r) => [r[i], r[2], r[3]])}
        />
        <p className="mt-5 max-w-5xl text-sm leading-7 text-zinc-600">
          {t(
            "Source system: SEC CIK 1769628 submissions/companyfacts and IPO audited tables; issuer IR and SEC exhibits for capacity and financing; Yahoo dated prices. Chart inventory: annual revenue, cash capex, cash FCF, operating margins, debt and active power. Reported facts retain field provenance; model and diagnostic values are research assumptions. General educational research, not personalized investment advice.",
            "来源系统：SEC CIK 1769628 提交/公司事实与 IPO 审计表；IR 与 SEC 附件容量融资；Yahoo 日期价格。图表为收入、现金投资、现金 FCF、经营率、债务、电力。报告数据保留字段来源，模型与诊断为研究假设。仅供一般教育，非个性化投资建议。",
          )}
        </p>
      </section>
    </main>
  );
}
