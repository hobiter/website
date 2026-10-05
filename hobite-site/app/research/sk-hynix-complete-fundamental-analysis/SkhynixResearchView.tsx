import type { ReactNode } from "react";
import { SKHY_ANNUAL, SKHY_QUARTERLY, type SKHYFinancialRow } from "./financialHistory";
import { SKHY_FILINGS } from "./filings";
import { SKHY_MARKET, SKHY_CAPITAL, SKHY_BALANCE, SKHY_OPERATING_FACTS } from "./companyData";
import { SKHY_ASSUMPTIONS, SKHY_DCF_CASES, SKHY_MODEL_INPUTS, SKHY_SENSITIVITY } from "./forecastModel";
import { SKHY_REPORT } from "./reportContent";
import { SKHY_CHART_GROUPS, SKHY_RESEARCH_NOTE } from "./researchPlan";
import { SKHY_AUDIT } from "./sourceAudit";
import { SKHY_QA } from "./publicationQa";

const fmt = (value: number | null | undefined, digits = 1) => value == null ? "N/A" : value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
const pct = (value: number | null | undefined) => value == null ? "N/A" : `${fmt(value, 1)}%`;
const valueInTrillions = (krwBillions: number) => krwBillions / 1000;

function Table({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return <div className="max-w-full overflow-x-auto"><table className="w-full whitespace-nowrap text-left text-sm"><thead><tr>{headers.map((header, i) => <th key={i} scope="col" className="border-b border-zinc-300 px-3 py-3 font-semibold">{header}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j} className="border-b border-zinc-200 px-3 py-3 align-top">{cell}</td>)}</tr>)}</tbody></table></div>;
}

function Chart({ title, rows, unit }: { title: string; rows: { label: string; value: number }[]; unit: string }) {
  const max = Math.max(1, ...rows.map((row) => Math.abs(row.value)));
  return <figure className="min-w-0 border-t border-zinc-300 py-5"><figcaption className="mb-4 font-semibold">{title} <span className="text-xs font-normal text-zinc-500">{unit}</span></figcaption><div className="space-y-2">{rows.map((row) => <div key={row.label} className="grid grid-cols-[76px_minmax(0,1fr)_70px] items-center gap-2 text-xs"><span>{row.label}</span><div className="h-3 bg-zinc-100"><div className={`h-full ${row.value < 0 ? "bg-rose-600" : "bg-emerald-700"}`} style={{ width: `${Math.max(1, Math.abs(row.value) / max * 100)}%` }} /></div><span className="text-right tabular-nums">{fmt(row.value)}</span></div>)}</div></figure>;
}

function moneyLink(url: string, label: string) {
  return <a href={url} target="_blank" rel="noreferrer" className="underline underline-offset-2">{label}</a>;
}

export default function SkhynixResearchView({ lang = "en" }: { lang?: "en" | "zh" }) {
  const zh = lang === "zh";
  const t = (en: string, cn: string) => zh ? cn : en;
  const sections = [
    ["report", t("Research report", "研究报告")], ["charts", t("Charts", "图表")],
    ["operations", t("Products and operations", "产品与经营")], ["valuation", t("Forecast and valuation", "预测与估值")],
    ["annual", t("Annual results", "年度业绩")], ["quarterly", t("Quarterly results", "季度业绩")],
    ["audit", t("Sources and QA", "来源与核验")],
  ];
  const annualRows = (key: "revenue" | "operatingProfit" | "netIncome") => SKHY_ANNUAL.map((row) => ({ label: String(row.year), value: valueInTrillions(row[key]) }));
  const quarterlyRows = (key: "revenue" | "operatingProfit" | "netIncome") => SKHY_QUARTERLY.slice(-16).map((row) => ({ label: `${row.year}Q${row.quarter}`, value: valueInTrillions(row[key]) }));
  const financialRows = (rows: SKHYFinancialRow[]) => rows.map((row) => [
    `${row.year}${row.quarter ? ` Q${row.quarter}` : ""}${row.kind === "derived" ? "*" : ""}`,
    fmt(valueInTrillions(row.revenue)), fmt(valueInTrillions(row.operatingProfit)),
    fmt(valueInTrillions(row.netIncome)),
    row.kind === "derived" ? t("Derived from same-basis totals", "同口径总额推算") : t("Issuer release", "公司公告"),
    moneyLink(row.source, t("Source", "出处")),
  ]);
  const scenarioLabel = { bear: t("Bear", "悲观"), base: t("Base", "基准"), bull: t("Bull", "乐观") };
  const scenarioCases = ["bear", "base", "bull"] as const;
  const sourceLink = (source: string) => moneyLink(source, t("Primary filing / issuer source", "原始申报 / 公司来源"));

  return (
    <main data-company="skhy" className="mx-auto w-full min-w-0 max-w-7xl px-4 py-10 text-zinc-900 sm:px-8">
      <nav aria-label={t("Research navigation", "研究导航")} className="mb-7 flex flex-wrap gap-4 text-sm underline">
        <a href="/research">{t("Research library", "研究库")}</a>
        <a href="/research/sk-hynix-complete-fundamental-analysis">English</a>
        <a href="/research/sk-hynix-complete-fundamental-analysis/zh">中文</a>
      </nav>
      <header className="border-b border-zinc-200 pb-8">
        <p className="mb-3 text-sm text-emerald-700">NASDAQ: SKHY · KRX: 000660</p>
        <h1 className="text-4xl font-semibold sm:text-5xl">{t("SK hynix", "SK 海力士")}</h1>
        <p className="mt-4 text-xl text-zinc-600">{t("Complete Fundamental Analysis", "完整基本面研究")}</p>
        <p className="mt-6 max-w-5xl text-sm leading-7 text-zinc-600">{zh ? SKHY_RESEARCH_NOTE.zh : SKHY_RESEARCH_NOTE.en}</p>
        <p className="mt-3 text-sm text-zinc-600">{t("Research cutoff October 4, 2026; latest U.S. close October 2. General educational research, not personal investment advice.", "研究截点为 2026 年 10 月 4 日；最近美股收盘日为 10 月 2 日。仅供一般研究，不构成个性化投资建议。")}</p>
      </header>
      <dl className="grid grid-cols-2 gap-6 border-b border-zinc-200 py-6 lg:grid-cols-4">
        {[
          [t("SKHY close · Oct 2", "SKHY 收盘 · 10 月 2 日"), `$${fmt(SKHY_MARKET.priceUsd, 2)}`],
          [t("FY2025 revenue · KRW T", "2025 财年收入 · 万亿韩元"), fmt(valueInTrillions(SKHY_ANNUAL.at(-1)!.revenue))],
          [t("Q2 2026 EBIT margin", "2026 第二季度营业利润率"), pct(60_542.6 / 79_318.7 * 100)],
          [t("H1 2026 operating cash flow · KRW T", "2026 上半年经营现金流 · 万亿韩元"), fmt(SKHY_BALANCE.h1OperatingCashFlowKrwTrillion)],
        ].map(([label, value]) => <div key={label}><dt className="text-xs leading-5 text-zinc-500">{label}</dt><dd className="mt-2 text-xl font-semibold tabular-nums">{value}</dd></div>)}
      </dl>
      <nav aria-label={t("Contents", "目录")} className="flex flex-wrap gap-x-5 gap-y-3 border-b border-zinc-200 py-6 text-sm underline">{sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>

      <section id="report" className="scroll-mt-28 border-b border-zinc-200 py-8">
        <h2 className="mb-6 text-2xl font-semibold">{t("Investment report", "投资研究报告")}</h2>
        <div className="max-w-5xl space-y-8">{SKHY_REPORT.map((section) => <article key={section.titleEn}><h3 className="mb-3 text-lg font-semibold">{zh ? section.titleZh : section.titleEn}</h3><p className="text-sm leading-7 text-zinc-700">{zh ? section.zh : section.en}</p><p className="mt-2 text-xs text-zinc-500">{sourceLink(section.source)}</p></article>)}</div>
      </section>

      <section id="charts" className="scroll-mt-28 border-b border-zinc-200 py-8">
        <h2 className="mb-3 text-2xl font-semibold">{t("Financial and scenario charts", "财务与情景图表")}</h2>
        <p className="mb-5 text-sm text-zinc-600">{t("KRW trillions. Loss periods are shown in red. Historical 2022Q3 is derived; annual releases preserve the original issuer precision.", "单位为万亿韩元。亏损区间以红色显示。2022Q3 为推算值；年度公告保留公司原始精度。")}</p>
        <div className="grid min-w-0 gap-x-10 md:grid-cols-2">
          <Chart title={t("Annual revenue", "年度收入")} rows={annualRows("revenue")} unit="KRW T" />
          <Chart title={t("Annual operating profit", "年度营业利润")} rows={annualRows("operatingProfit")} unit="KRW T" />
          <Chart title={t("Annual net income", "年度净利润")} rows={annualRows("netIncome")} unit="KRW T" />
          <Chart title={t("Annual operating margin", "年度营业利润率")} rows={SKHY_ANNUAL.map((row) => ({ label: String(row.year), value: row.operatingProfit / row.revenue * 100 }))} unit="%" />
          <Chart title={t("Quarterly revenue · 16 latest", "季度收入 · 最近 16 季")} rows={quarterlyRows("revenue")} unit="KRW T" />
          <Chart title={t("Quarterly operating profit · 16 latest", "季度营业利润 · 最近 16 季")} rows={quarterlyRows("operatingProfit")} unit="KRW T" />
          <Chart title={t("Quarterly net income · 16 latest", "季度净利润 · 最近 16 季")} rows={quarterlyRows("netIncome")} unit="KRW T" />
          <Chart title={t("FY2025 and Q1 2026 sales mix", "2025 财年与 2026Q1 销售结构")} rows={[{ label: "FY25 DRAM", value: 77.1 }, { label: "FY25 NAND", value: 21.3 }, { label: "Q1'26 DRAM", value: 77.3 }, { label: "Q1'26 NAND", value: 22.0 }]} unit="% of sales" />
          <Chart title={t("Scenario revenue · 2027-2036", "情景收入 · 2027-2036")} rows={SKHY_DCF_CASES.base.forecast.map((row) => ({ label: String(row.year), value: row.revenue }))} unit="KRW T · base" />
          <Chart title={t("Scenario FCFF · 2027-2036", "情景 FCFF · 2027-2036")} rows={SKHY_DCF_CASES.base.forecast.map((row) => ({ label: String(row.year), value: row.fcff }))} unit="KRW T · base" />
          <Chart title={t("Base-case WACC sensitivity", "基准情景 WACC 敏感性")} rows={SKHY_SENSITIVITY.map((row) => ({ label: `${fmt(row.waccPct, 1)}%`, value: row.priceUsdPerAds }))} unit="USD / ADS" />
          <Chart title={t("Scenario fair value per ADS", "各情景每 ADS 估值")} rows={scenarioCases.map((scenario) => ({ label: scenarioLabel[scenario], value: SKHY_DCF_CASES[scenario].priceUsdPerAds }))} unit="USD / ADS" />
        </div>
        <p className="mt-4 text-xs text-zinc-500">{SKHY_CHART_GROUPS.join(" · ")}</p>
      </section>

      <section id="operations" className="scroll-mt-28 border-b border-zinc-200 py-8">
        <h2 className="mb-4 text-2xl font-semibold">{t("Products and operating indicators", "产品与经营指标")}</h2>
        <div className="divide-y divide-zinc-200 border-y border-zinc-200">{SKHY_OPERATING_FACTS.map((fact) => <article key={fact.labelEn} className="grid gap-2 py-4 md:grid-cols-[240px_100px_minmax(0,1fr)]"><h3 className="text-sm font-semibold">{zh ? fact.labelZh : fact.labelEn}</h3><p className="font-semibold tabular-nums">{fact.value}</p><div><p className="text-sm leading-6 text-zinc-600">{zh ? fact.detailZh : fact.detailEn}</p><p className="mt-1 text-xs">{moneyLink(fact.source, t("Source", "来源"))}</p></div></article>)}</div>
        <h3 className="mb-3 mt-8 font-semibold">{t("ADS and balance-sheet bridge", "ADS 与资产负债表桥接")}</h3>
        <Table headers={[t("Input", "项目"), t("Value", "数值"), t("Date / basis", "日期 / 口径"), t("Source", "来源")]}
          rows={[
            [t("Common shares after issue", "发行后普通股"), SKHY_CAPITAL.postOfferingCommonShares.toLocaleString("en-US"), "2026-07 prospectus", moneyLink(SKHY_CAPITAL.prospectus, "SEC F-1 / 424B4")],
            [t("ADS ratio", "ADS 比例"), "10 ADS = 1 common share", "2026-07 prospectus", moneyLink(SKHY_CAPITAL.prospectus, "SEC F-1 / 424B4")],
            [t("Cash + short-term instruments", "现金 + 短期金融工具"), `${fmt(SKHY_MODEL_INPUTS.reportedCashAndCurrentFinancialInstrumentsKrwTrillion)} KRW T`, SKHY_BALANCE.date, moneyLink(SKHY_BALANCE.source, "Reviewed Form 6-K")],
            [t("Borrowings", "借款"), `${fmt(SKHY_MODEL_INPUTS.reportedBorrowingsKrwTrillion)} KRW T`, SKHY_BALANCE.date, moneyLink(SKHY_BALANCE.source, "Reviewed Form 6-K")],
            [t("Estimated net IPO proceeds", "预计 IPO 净募集资金"), `$${fmt(SKHY_CAPITAL.netProceedsUsdBillions)}B · ${fmt(SKHY_MODEL_INPUTS.ipoNetProceedsKrwTrillion)} KRW T`, "2026-07; pro forma FX at 2026-10-02", moneyLink(SKHY_CAPITAL.prospectus, "SEC prospectus")],
          ]} />
      </section>

      <section id="valuation" className="scroll-mt-28 border-b border-zinc-200 py-8">
        <h2 className="mb-3 text-2xl font-semibold">{t("Ten-year FCFF scenarios and ADS valuation", "十年 FCFF 情景与 ADS 估值")}</h2>
        <p className="mb-5 max-w-5xl text-sm leading-7 text-zinc-600">{t("Forecasts are in KRW trillions. FY2026 starting revenue is a simple annualization of H1, not guidance. The balance bridge includes June cash-like assets less borrowings plus estimated July net proceeds translated using the October 2 FX rate; subsequent deployment is not modeled. Per-ADS conversion uses 10 ADS per Korean common share.", "预测单位为万亿韩元。2026 财年收入起点是上半年简单年化，并非公司指引。资产负债桥接采用 6 月现金类资产减借款，再加按 10 月 2 日汇率折算的 7 月预计净募集资金；未模拟后续资金支出。每 ADS 换算采用每股韩国普通股对应 10 份 ADS。")}</p>
        <div className="grid gap-6 border-y border-zinc-200 py-5 md:grid-cols-3">{scenarioCases.map((scenario) => { const model = SKHY_DCF_CASES[scenario]; const assumption = SKHY_ASSUMPTIONS[scenario]; return <article key={scenario} className="min-w-0 border-t-2 border-emerald-800 pt-4"><h3 className="text-lg font-semibold">{scenarioLabel[scenario]}</h3><p className="mt-3 text-3xl font-semibold tabular-nums">${fmt(model.priceUsdPerAds, 2)}</p><p className="mt-1 text-xs text-zinc-500">{t("Model value / ADS", "模型估值 / ADS")} · {pct(model.upsidePct)} {t("vs. dated close", "相对有日期的收盘价")}</p><dl className="mt-4 space-y-2 text-sm"><div className="flex justify-between gap-3"><dt>{t("WACC / terminal growth", "WACC / 永续增长")}</dt><dd>{pct(assumption.wacc * 100)} / {pct(assumption.growth * 100)}</dd></div><div className="flex justify-between gap-3"><dt>{t("Enterprise value", "企业价值")}</dt><dd>{fmt(model.enterpriseValue)} KRW T</dd></div><div className="flex justify-between gap-3"><dt>{t("Pro-forma net cash", "备考净现金")}</dt><dd>{fmt(model.netCash)} KRW T</dd></div><div className="flex justify-between gap-3"><dt>{t("PV of terminal value", "终值现值")}</dt><dd>{fmt(model.pvTerminal)} KRW T</dd></div></dl></article>; })}</div>
        <h3 className="mb-3 mt-7 font-semibold">{t("Base-case operating assumptions", "基准情景经营假设")}</h3>
        <Table headers={[t("Year", "年度"), t("Revenue", "收入"), t("Growth", "增长"), t("EBIT margin", "营业利润率"), t("D&A", "折旧摊销"), t("Capex", "资本支出"), t("Δ working capital", "营运资本变化"), "FCFF"]} rows={SKHY_DCF_CASES.base.forecast.map((row) => [row.year, fmt(row.revenue), pct(row.growthPct), pct(row.marginPct), fmt(row.da), fmt(row.capex), fmt(row.workingCapital), fmt(row.fcff)])} />
        <p className="mt-5 text-xs leading-6 text-zinc-500">{t("Current close", "当前收盘")}: $195.13 · {t("FX", "汇率")}: 1 USD = {fmt(SKHY_MARKET.currencyKrwPerUsd, 2)} KRW · {t("Annualized H1 revenue", "上半年年化收入")}: {fmt(SKHY_MODEL_INPUTS.h1AnnualizedRevenueKrwTrillion)} KRW T · {t("LTM revenue", "过去十二个月收入")}: {fmt(SKHY_MODEL_INPUTS.lastTwelveMonthRevenueKrwTrillion)} KRW T · {t("All-share implied market capitalization", "全部股份等价隐含市值")}: ${fmt(SKHY_MODEL_INPUTS.currentImpliedEquityValueUsdTrillion, 2)}T</p>
      </section>

      <section id="annual" className="scroll-mt-28 border-b border-zinc-200 py-8">
        <h2 className="mb-3 text-2xl font-semibold">{t("Annual financial database", "年度财务数据库")}</h2>
        <p className="mb-4 text-sm text-zinc-600">{t("Amounts in KRW trillions; operating profit is used to observe memory-cycle economics. Each row links to its original issuer release.", "单位为万亿韩元；以营业利润观察存储周期经济性。每行链接至公司原始公告。")}</p>
        <Table headers={[t("Fiscal year", "财年"), t("Revenue · KRW T", "收入 · 万亿韩元"), t("Operating profit", "营业利润"), t("Net income", "净利润"), t("Basis", "口径"), t("Source", "来源")]} rows={financialRows(SKHY_ANNUAL)} />
      </section>

      <section id="quarterly" className="scroll-mt-28 border-b border-zinc-200 py-8">
        <h2 className="mb-3 text-2xl font-semibold">{t("Quarterly financial database", "季度财务数据库")}</h2>
        <p className="mb-4 text-sm leading-7 text-zinc-600">{t("62 quarters, 2011Q1-2026Q2. Amounts are KRW trillions. Asterisked figures are derived from matching annual and quarterly issuer-release totals; they are not independently presented as filed quarter values. The latest Q2 2026 earnings release was preliminary, with reviewed statements subsequently available in the linked Form 6-K.", "共 62 个季度，覆盖 2011Q1 至 2026Q2，单位为万亿韩元。带星号数据由相同口径的年度及季度公司公告总额推算，并非单独申报的季度值。2026Q2 盈利公告最初为初步数据，后续经审阅报表见链接 Form 6-K。")}</p>
        <Table headers={[t("Period", "期间"), t("Revenue · KRW T", "收入 · 万亿韩元"), t("Operating profit", "营业利润"), t("Net income", "净利润"), t("Basis", "口径"), t("Source", "来源")]} rows={financialRows(SKHY_QUARTERLY)} />
      </section>

      <section id="audit" className="scroll-mt-28 py-8">
        <h2 className="mb-4 text-2xl font-semibold">{t("Source audit and publication QA", "来源审计与发布核验")}</h2>
        <div className="space-y-5">{SKHY_AUDIT.map((row) => <article key={row.area} className="border-t border-zinc-200 pt-4"><h3 className="font-semibold">{zh ? row.area.split(" / ")[1] : row.area.split(" / ")[0]} · <span className="text-sm font-normal">{row.status}</span></h3><p className="mt-2 text-xs text-zinc-500">{row.coverage}</p><p className="mt-2 text-sm leading-7 text-zinc-600">{zh ? row.zh : row.en}</p><p className="mt-1 text-xs">{moneyLink(row.source, t("Open primary source", "查看原始来源"))}</p></article>)}</div>
        <h3 className="mb-3 mt-8 text-lg font-semibold">{t("Publication checks", "发布检查")}</h3>
        <div className="space-y-4">{SKHY_QA.map((row) => <article key={row.area}><h4 className="font-semibold">{zh ? row.area.split(" / ")[1] : row.area.split(" / ")[0]} · {row.status}</h4><p className="mt-2 text-sm leading-7 text-zinc-600">{zh ? row.zh : row.en}</p></article>)}</div>
        <details className="mt-8 border-t border-zinc-300 py-5"><summary className="cursor-pointer font-semibold">{t("SEC filing inventory", "SEC 申报清单")} · {SKHY_FILINGS.length}</summary><div className="mt-4 max-h-[560px] overflow-y-auto"><Table headers={[t("Form", "表格"), t("Filed", "申报日"), t("Report date", "报告日"), t("Description", "说明"), t("Source", "来源")]} rows={[...SKHY_FILINGS].reverse().map((filing) => [filing.form, filing.date, filing.reportDate || "N/A", filing.title, moneyLink(filing.url, t("Open filing", "打开申报"))])} /></div></details>
        <p className="mt-5 text-xs leading-6 text-zinc-500">{t("Page data source refresh", "页面数据刷新")}: <code>npm run research:skhy:data</code> · {t("Automated parity and model checks", "自动镜像与模型检查")}: <code>npm run research:skhy:test</code></p>
      </section>
    </main>
  );
}
