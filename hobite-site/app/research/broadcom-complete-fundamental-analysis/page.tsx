import type { Metadata } from "next";
import { BROADCOM_ANNUAL_FINANCIALS, BROADCOM_ANNUAL_FINANCIALS_SOURCE_NOTE } from "./annualFinancials";
import { BROADCOM_CAPITAL_ECONOMICS, BROADCOM_CAPITAL_ECONOMICS_NOTE, BROADCOM_LATEST_CAPITAL_ECONOMICS } from "./capitalEconomics";
import { BROADCOM_ANNUAL_FILINGS, BROADCOM_LATEST_ANNUAL_FILING, BROADCOM_LATEST_QUARTERLY_FILING, BROADCOM_QUARTERLY_FILINGS } from "./filings";
import { BROADCOM_DCF_CASES, BROADCOM_DCF_INPUTS, BROADCOM_FORECASTS, BROADCOM_FORECAST_NOTE, BROADCOM_VALUATION_NOTE } from "./forecastModel";
import { BROADCOM_Q3_2026, BROADCOM_Q4_2026_GUIDANCE } from "./latestQuarter";
import { BROADCOM_PUBLICATION_QA_ITEMS, BROADCOM_PUBLICATION_QA_NOTE } from "./publicationQa";
import { BROADCOM_QUARTERLY_FINANCIALS, BROADCOM_QUARTERLY_FINANCIALS_SOURCE_NOTE } from "./quarterlyFinancials";
import { BROADCOM_REPORT_SECTIONS } from "./reportContent";
import { BROADCOM_CHART_GROUPS, BROADCOM_SOURCE_SYSTEMS } from "./researchPlan";
import { BROADCOM_LATEST_SEGMENT_METRIC, BROADCOM_SEGMENT_METRICS, BROADCOM_SEGMENT_SOURCE_NOTE } from "./segmentMetrics";
import { BROADCOM_SOURCE_AUDIT_ITEMS, BROADCOM_SOURCE_AUDIT_NOTE } from "./sourceAudit";
import { BROADCOM_LATEST_VALUATION, BROADCOM_VALUATION_HISTORY, BROADCOM_VALUATION_HISTORY_NOTE } from "./valuationHistory";

export const metadata: Metadata = {
  title: "Broadcom (AVGO) Complete Fundamental Analysis",
  description: "SEC-backed Broadcom financial history, AI semiconductor and VMware economics, capital allocation, valuation and ten-year scenarios.",
};

const usd = (value: number | null, digits = 1) => value == null ? "-" : `$${(value / 1_000_000_000).toFixed(digits)}B`;
const pct = (value: number | null, digits = 1) => value == null ? "-" : `${value.toFixed(digits)}%`;
const multiple = (value: number | null, digits = 1) => value == null ? "-" : `${value.toFixed(digits)}x`;

const th = "whitespace-nowrap border-b border-zinc-200 bg-zinc-100 px-3 py-2 text-left text-xs font-semibold text-zinc-600";
const td = "whitespace-nowrap border-b border-zinc-100 px-3 py-2 text-sm text-zinc-700";

function Section({ id, eyebrow, title, note, children }: { id: string; eyebrow: string; title: string; note?: string; children: React.ReactNode }) {
  return <section id={id} className="border-t border-zinc-200 py-10"><div className="mb-6 max-w-4xl"><p className="text-xs font-semibold uppercase text-cyan-700">{eyebrow}</p><h2 className="mt-2 text-2xl font-semibold text-zinc-950 md:text-3xl">{title}</h2>{note ? <p className="mt-3 text-sm leading-6 text-zinc-600">{note}</p> : null}</div>{children}</section>;
}

function Metric({ label, value, detail, accent = "cyan" }: { label: string; value: string; detail: string; accent?: "cyan" | "amber" }) {
  return <div className={`border-l-2 pl-4 ${accent === "amber" ? "border-amber-400" : "border-cyan-400"}`}><p className="text-xs font-medium uppercase text-zinc-400">{label}</p><p className="mt-1 text-2xl font-semibold text-white">{value}</p><p className="mt-1 text-xs leading-5 text-zinc-400">{detail}</p></div>;
}

function TableFrame({ children }: { children: React.ReactNode }) {
  return <div className="overflow-x-auto border border-zinc-200 bg-white">{children}</div>;
}

export default function BroadcomResearchPage() {
  const dcfCases = Object.values(BROADCOM_DCF_CASES);
  const annualMax = Math.max(...BROADCOM_ANNUAL_FINANCIALS.map((row) => row.revenue ?? 0));
  const aiShare = BROADCOM_Q3_2026.aiSemiconductorRevenue / BROADCOM_Q3_2026.semiconductorRevenue * 100;

  return <main className="min-h-screen bg-zinc-50 text-zinc-900">
    <header className="border-b border-zinc-800 bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400"><a href="/research" className="font-medium text-cyan-400 hover:text-cyan-300">Hobite Research</a><span>Updated September 3, 2026 · AVGO · USD</span></div>
        <p className="mt-8 text-xs font-semibold uppercase text-cyan-400">Complete Fundamental Research Hub</p>
        <h1 className="mt-3 max-w-5xl text-4xl font-semibold leading-tight md:text-6xl">Broadcom</h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-zinc-300">A custom AI accelerator, Ethernet networking and infrastructure software powerhouse, evaluated against exceptional growth, concentrated customer risk and a valuation with little room for ordinary execution.</p>
        <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="Q3 FY2026 revenue" value={usd(BROADCOM_Q3_2026.revenue)} detail={`${pct(BROADCOM_Q3_2026.revenueGrowth, 0)} year-over-year`} />
          <Metric label="Q3 AI semiconductor" value={usd(BROADCOM_Q3_2026.aiSemiconductorRevenue)} detail={`${pct(BROADCOM_Q3_2026.aiRevenueGrowth, 0)} growth · ${pct(aiShare, 0)} of semiconductor`} />
          <Metric label="Q3 free cash flow" value={usd(BROADCOM_Q3_2026.freeCashFlow)} detail={`${pct(BROADCOM_Q3_2026.freeCashFlow / BROADCOM_Q3_2026.revenue * 100, 0)} margin`} />
          <Metric label="AVGO reference price" value={`$${BROADCOM_DCF_INPUTS.referencePrice.toFixed(2)}`} detail={`${multiple(BROADCOM_LATEST_VALUATION.enterpriseValueToSales)} FY2026E EV / sales`} accent="amber" />
        </div>
      </div>
    </header>

    <nav className="sticky top-0 z-10 overflow-x-auto border-b border-zinc-200 bg-white/95 px-5 backdrop-blur md:px-8"><div className="mx-auto flex max-w-7xl gap-6 py-3 text-xs font-medium text-zinc-600">{[["thesis","Thesis"],["latest","Q3 & Guidance"],["segments","Segments & AI"],["capital","Capital"],["valuation","Valuation"],["forecast","Forecast"],["financials","Financials"],["filings","Filings"],["sources","Sources"]].map(([id,label]) => <a key={id} href={`#${id}`} className="whitespace-nowrap hover:text-cyan-700">{label}</a>)}</div></nav>

    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <Section id="thesis" eyebrow="Investment memo" title="World-class AI growth, fully visible valuation risk">
        <div className="grid gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-2">{BROADCOM_REPORT_SECTIONS.map((section) => <article key={section.title} className="bg-white p-5"><h3 className="text-lg font-semibold text-zinc-950">{section.title}</h3><p className="mt-2 text-sm leading-6 text-zinc-700">{section.thesis}</p><ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-600">{section.bullets.map((bullet) => <li key={bullet} className="border-l border-zinc-300 pl-3">{bullet}</li>)}</ul></article>)}</div>
      </Section>

      <Section id="latest" eyebrow="Latest operating update" title="Q3 acceleration and Q4 guidance" note="Q3 FY2026 is an official September 2 earnings release and Form 8-K exhibit. It is shown separately from the SEC 10-Q database until the quarterly filing is available.">
        <div className="grid gap-px border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
          {[['GAAP operating income',usd(BROADCOM_Q3_2026.gaapOperatingIncome)],['Non-GAAP operating income',usd(BROADCOM_Q3_2026.nonGaapOperatingIncome)],['GAAP net income',usd(BROADCOM_Q3_2026.gaapNetIncome)],['Cash balance',usd(BROADCOM_Q3_2026.cash)]].map(([label,value]) => <div key={label} className="bg-white p-4"><p className="text-xs text-zinc-500">{label}</p><p className="mt-1 text-xl font-semibold">{value}</p></div>)}
        </div>
        <div className="mt-6 grid gap-5 border-l-2 border-amber-400 bg-amber-50 p-5 md:grid-cols-3"><div><p className="text-xs uppercase text-amber-800">Q4 revenue guidance</p><p className="mt-1 text-2xl font-semibold">{usd(BROADCOM_Q4_2026_GUIDANCE.revenue)}</p></div><div><p className="text-xs uppercase text-amber-800">Q4 AI guidance</p><p className="mt-1 text-2xl font-semibold">{usd(BROADCOM_Q4_2026_GUIDANCE.aiSemiconductorRevenue)}</p></div><div><p className="text-xs uppercase text-amber-800">Non-GAAP operating margin</p><p className="mt-1 text-2xl font-semibold">{pct(BROADCOM_Q4_2026_GUIDANCE.nonGaapOperatingMargin, 0)}</p></div></div>
        <p className="mt-3 text-xs text-zinc-500">{BROADCOM_Q4_2026_GUIDANCE.note} <a href={BROADCOM_Q4_2026_GUIDANCE.sourceUrl} target="_blank" rel="noreferrer" className="underline">Official release</a>.</p>
      </Section>

      <Section id="segments" eyebrow="Company-specific economics" title="Semiconductor, software and AI revenue" note={BROADCOM_SEGMENT_SOURCE_NOTE}>
        <TableFrame><table className="w-full min-w-[860px] border-collapse"><thead><tr>{["Period","Semiconductor","Infrastructure software","AI semiconductor","Semiconductor growth","Software growth","AI growth"].map((label) => <th key={label} className={th}>{label}</th>)}</tr></thead><tbody>{BROADCOM_SEGMENT_METRICS.map((row) => <tr key={row.period}><td className={`${td} font-medium`}><a href={row.sourceUrl} target="_blank" rel="noreferrer" className="underline decoration-zinc-300">{row.period}</a></td><td className={td}>{usd(row.semiconductorRevenue)}</td><td className={td}>{usd(row.infrastructureSoftwareRevenue)}</td><td className={td}>{usd(row.aiSemiconductorRevenue)}</td><td className={td}>{pct(row.semiconductorGrowth)}</td><td className={td}>{pct(row.softwareGrowth)}</td><td className={td}>{pct(row.aiGrowth)}</td></tr>)}</tbody></table></TableFrame>
        <div className="mt-5 grid gap-4 sm:grid-cols-3"><div className="border-t-2 border-cyan-600 pt-3"><p className="text-xs text-zinc-500">Latest semiconductor mix</p><p className="mt-1 text-xl font-semibold">{pct(BROADCOM_LATEST_SEGMENT_METRIC.semiconductorRevenue / BROADCOM_Q3_2026.revenue * 100, 0)}</p></div><div className="border-t-2 border-violet-600 pt-3"><p className="text-xs text-zinc-500">Latest software mix</p><p className="mt-1 text-xl font-semibold">{pct(BROADCOM_LATEST_SEGMENT_METRIC.infrastructureSoftwareRevenue / BROADCOM_Q3_2026.revenue * 100, 0)}</p></div><div className="border-t-2 border-amber-500 pt-3"><p className="text-xs text-zinc-500">AI share of semiconductor</p><p className="mt-1 text-xl font-semibold">{pct(aiShare, 0)}</p></div></div>
      </Section>

      <Section id="capital" eyebrow="Balance sheet" title="VMware leverage, dilution and capital returns" note={BROADCOM_CAPITAL_ECONOMICS_NOTE}>
        <TableFrame><table className="w-full min-w-[900px] border-collapse"><thead><tr>{["Period","Cash","Total debt","Net debt","Stock compensation","Dividends","Repurchases","Goodwill + intangibles"].map((label) => <th key={label} className={th}>{label}</th>)}</tr></thead><tbody>{BROADCOM_CAPITAL_ECONOMICS.map((row) => <tr key={row.period}><td className={`${td} font-medium`}><a href={row.sourceUrl} target="_blank" rel="noreferrer" className="underline decoration-zinc-300">{row.period}</a></td><td className={td}>{usd(row.cash)}</td><td className={td}>{usd(row.totalDebt)}</td><td className={td}>{usd(row.netDebt)}</td><td className={td}>{usd(row.stockBasedCompensation)}</td><td className={td}>{usd(row.dividendsPaid)}</td><td className={td}>{usd(row.repurchases)}</td><td className={td}>{usd(row.goodwillAndIntangibles)}</td></tr>)}</tbody></table></TableFrame>
        <p className="mt-3 text-xs text-zinc-500">Q3 FY2026 net debt: {usd(BROADCOM_LATEST_CAPITAL_ECONOMICS.netDebt)}. FY2026 Q3 stock compensation awaits the 10-Q detail and is intentionally left blank.</p>
      </Section>

      <Section id="valuation" eyebrow="Scenario valuation" title="DCF range versus a demanding market price" note={BROADCOM_VALUATION_NOTE}>
        <div className="grid gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-3">{dcfCases.map((item) => <article key={item.label} className="bg-white p-5"><div className="flex items-baseline justify-between gap-3"><h3 className="text-lg font-semibold">{item.label}</h3><span className={`text-sm font-semibold ${item.upsideToReferencePrice >= 0 ? "text-emerald-700" : "text-rose-700"}`}>{pct(item.upsideToReferencePrice)} vs. reference</span></div><p className="mt-5 text-4xl font-semibold">${item.valuePerShare.toFixed(0)}</p><dl className="mt-5 space-y-2 text-sm text-zinc-600"><div className="flex justify-between"><dt>Discount rate</dt><dd>{pct(item.discountRate)}</dd></div><div className="flex justify-between"><dt>Terminal growth</dt><dd>{pct(item.terminalGrowth)}</dd></div><div className="flex justify-between"><dt>PV forecast FCF</dt><dd>{usd(item.pvFreeCashFlow,0)}</dd></div><div className="flex justify-between border-t border-zinc-200 pt-2"><dt>Equity value</dt><dd>{usd(item.equityValue,0)}</dd></div></dl></article>)}</div>
        <p className="mt-3 text-xs text-zinc-500">Reference price: ${BROADCOM_DCF_INPUTS.referencePrice.toFixed(2)} on {BROADCOM_DCF_INPUTS.referencePriceDate}. Net debt: {usd(BROADCOM_DCF_INPUTS.netDebt)}. Diluted shares: {(BROADCOM_DCF_INPUTS.dilutedShares / 1_000_000_000).toFixed(3)}B.</p>
        <h3 className="mt-8 text-lg font-semibold">Historical market context</h3><p className="mt-2 text-sm text-zinc-600">{BROADCOM_VALUATION_HISTORY_NOTE}</p>
        <TableFrame><table className="mt-4 w-full min-w-[840px] border-collapse"><thead><tr>{["FY","Price","Market cap","Enterprise value","P/S","EV/Sales","P/E","FCF yield"].map((label) => <th key={label} className={th}>{label}</th>)}</tr></thead><tbody>{BROADCOM_VALUATION_HISTORY.map((row) => <tr key={row.fiscalYear}><td className={td}>{row.fiscalYear}</td><td className={td}>{row.adjustedClose == null ? "-" : `$${row.adjustedClose.toFixed(2)}`}</td><td className={td}>{usd(row.marketCapitalization,0)}</td><td className={td}>{usd(row.enterpriseValue,0)}</td><td className={td}>{multiple(row.priceToSales)}</td><td className={td}>{multiple(row.enterpriseValueToSales)}</td><td className={td}>{multiple(row.priceToEarnings)}</td><td className={td}>{pct(row.freeCashFlowYield)}</td></tr>)}</tbody></table></TableFrame>
      </Section>

      <Section id="forecast" eyebrow="Ten-year model" title="Revenue and free-cash-flow scenarios" note={BROADCOM_FORECAST_NOTE}>
        <TableFrame><table className="w-full min-w-[820px] border-collapse"><thead><tr><th className={th}>Year</th>{(["bear","base","bull"] as const).map((scenario) => <th key={scenario} className={th}>{scenario} revenue / growth / FCF</th>)}</tr></thead><tbody>{BROADCOM_FORECASTS.base.map((_,index) => <tr key={index}><td className={`${td} font-medium`}>{BROADCOM_FORECASTS.base[index].year}</td>{(["bear","base","bull"] as const).map((scenario) => { const row=BROADCOM_FORECASTS[scenario][index]; return <td key={scenario} className={td}>{usd(row.revenue)} <span className="text-zinc-400">/ {pct(row.revenueGrowth)} / {usd(row.freeCashFlow)}</span></td>; })}</tr>)}</tbody></table></TableFrame>
      </Section>

      <Section id="financials" eyebrow="SEC financial database" title="Annual and quarterly statements" note={BROADCOM_ANNUAL_FINANCIALS_SOURCE_NOTE}>
        <h3 className="text-lg font-semibold">Revenue development</h3><div className="mt-4 grid gap-2">{BROADCOM_ANNUAL_FINANCIALS.map((row) => <div key={row.fiscalYear} className="grid grid-cols-[48px_1fr_72px] items-center gap-3 text-xs"><span>FY{row.fiscalYear}</span><div className="h-3 bg-zinc-200"><div className="h-full bg-cyan-600" style={{width:`${((row.revenue ?? 0)/annualMax)*100}%`}} /></div><span className="text-right">{usd(row.revenue,0)}</span></div>)}</div>
        <h3 className="mt-8 text-lg font-semibold">Annual history</h3><TableFrame><table className="mt-4 w-full min-w-[1120px] border-collapse"><thead><tr>{["FY","Revenue","Gross profit","Operating income","Net income","OCF","Capex","FCF","Cash","Debt","Gross margin","FCF margin"].map((label) => <th key={label} className={th}>{label}</th>)}</tr></thead><tbody>{BROADCOM_ANNUAL_FINANCIALS.map((row) => <tr key={row.fiscalYear}><td className={`${td} font-medium`}><a href={row.filingUrl} target="_blank" rel="noreferrer" className="underline decoration-zinc-300">{row.fiscalYear}</a></td><td className={td}>{usd(row.revenue)}</td><td className={td}>{usd(row.grossProfit)}</td><td className={td}>{usd(row.operatingIncome)}</td><td className={td}>{usd(row.netIncome)}</td><td className={td}>{usd(row.operatingCashFlow)}</td><td className={td}>{usd(row.capitalExpenditures)}</td><td className={td}>{usd(row.freeCashFlow)}</td><td className={td}>{usd(row.cash)}</td><td className={td}>{usd(row.longTermDebt)}</td><td className={td}>{pct(row.grossMargin)}</td><td className={td}>{pct(row.freeCashFlowMargin)}</td></tr>)}</tbody></table></TableFrame>
        <h3 className="mt-8 text-lg font-semibold">Recent SEC quarters</h3><p className="mt-2 text-sm text-zinc-600">{BROADCOM_QUARTERLY_FINANCIALS_SOURCE_NOTE}</p><TableFrame><table className="mt-4 w-full min-w-[980px] border-collapse"><thead><tr>{["Period","Revenue","Gross profit","Operating income","Net income","OCF","Capex","FCF","Gross margin","FCF margin"].map((label) => <th key={label} className={th}>{label}</th>)}</tr></thead><tbody>{BROADCOM_QUARTERLY_FINANCIALS.map((row) => <tr key={row.period}><td className={`${td} font-medium`}><a href={row.filingUrl} target="_blank" rel="noreferrer" className="underline decoration-zinc-300">{row.period}</a></td><td className={td}>{usd(row.revenue)}</td><td className={td}>{usd(row.grossProfit)}</td><td className={td}>{usd(row.operatingIncome)}</td><td className={td}>{usd(row.netIncome)}</td><td className={td}>{usd(row.operatingCashFlow)}</td><td className={td}>{usd(row.capitalExpenditures)}</td><td className={td}>{usd(row.freeCashFlow)}</td><td className={td}>{pct(row.grossMargin)}</td><td className={td}>{pct(row.freeCashFlowMargin)}</td></tr>)}</tbody></table></TableFrame>
      </Section>

      <Section id="filings" eyebrow="Primary documents" title="SEC filing inventory">
        <div className="grid gap-5 lg:grid-cols-2">{[{title:"Annual reports",rows:BROADCOM_ANNUAL_FILINGS},{title:"Quarterly reports",rows:BROADCOM_QUARTERLY_FILINGS}].map((group) => <div key={group.title}><h3 className="mb-3 text-lg font-semibold">{group.title}</h3><TableFrame><table className="w-full border-collapse"><thead><tr><th className={th}>Form</th><th className={th}>Report date</th><th className={th}>Filed</th></tr></thead><tbody>{group.rows.map((filing) => <tr key={filing.accessionNumber}><td className={td}><a href={filing.url} target="_blank" rel="noreferrer" className="font-medium underline decoration-zinc-300">{filing.form}</a></td><td className={td}>{filing.reportDate || "-"}</td><td className={td}>{filing.filingDate}</td></tr>)}</tbody></table></TableFrame></div>)}</div><p className="mt-3 text-xs text-zinc-500">Latest 10-K filed {BROADCOM_LATEST_ANNUAL_FILING.filingDate}; latest 10-Q filed {BROADCOM_LATEST_QUARTERLY_FILING.filingDate}.</p>
      </Section>

      <Section id="sources" eyebrow="Research controls" title="Sources, coverage and publication QA" note={BROADCOM_SOURCE_AUDIT_NOTE}>
        <div className="grid gap-6 lg:grid-cols-2"><div><h3 className="mb-3 text-lg font-semibold">Source systems</h3><div className="divide-y divide-zinc-200 border border-zinc-200 bg-white">{BROADCOM_SOURCE_SYSTEMS.map((source) => <a key={source.name} href={source.url} target="_blank" rel="noreferrer" className="block p-4 hover:bg-zinc-50"><p className="text-sm font-semibold">{source.name}</p><p className="mt-1 text-xs leading-5 text-zinc-500">{source.use}</p></a>)}</div></div><div><h3 className="mb-3 text-lg font-semibold">Source audit</h3><div className="divide-y divide-zinc-200 border border-zinc-200 bg-white">{BROADCOM_SOURCE_AUDIT_ITEMS.map((item) => <a key={item.area} href={item.sourceUrl} target="_blank" rel="noreferrer" className="block p-4 hover:bg-zinc-50"><div className="flex justify-between gap-4"><p className="text-sm font-semibold">{item.area}</p><span className="text-xs font-medium uppercase text-emerald-700">{item.status}</span></div><p className="mt-1 text-xs leading-5 text-zinc-500">{item.coverage}. {item.note}</p></a>)}</div></div></div>
        <h3 className="mt-8 text-lg font-semibold">Publication QA</h3><p className="mt-2 text-sm text-zinc-600">{BROADCOM_PUBLICATION_QA_NOTE}</p><div className="mt-4 grid gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-2">{BROADCOM_PUBLICATION_QA_ITEMS.map((item) => <div key={item.check} className="bg-white p-4"><div className="flex justify-between gap-4"><p className="text-sm font-semibold">{item.check}</p><span className={`text-xs font-semibold uppercase ${item.status === "pass" ? "text-emerald-700" : "text-amber-700"}`}>{item.status}</span></div><p className="mt-2 text-xs leading-5 text-zinc-500">{item.evidence}</p></div>)}</div>
        <div className="mt-8 border-l-2 border-zinc-900 pl-4 text-xs leading-5 text-zinc-500"><p>Analytical inventory: {BROADCOM_CHART_GROUPS.reduce((sum,group) => sum+group.targetCount,0)} views across {BROADCOM_CHART_GROUPS.length} groups.</p><p className="mt-1">This page is research and education, not personalized investment advice. Market prices, guidance and forecasts can become stale.</p></div>
      </Section>
    </div>
  </main>;
}
