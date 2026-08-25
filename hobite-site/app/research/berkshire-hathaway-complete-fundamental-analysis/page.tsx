import type { Metadata } from "next";
import { BERKSHIRE_ANNUAL_FINANCIALS, BERKSHIRE_LATEST_ANNUAL_FINANCIAL } from "./annualFinancials";
import { BERKSHIRE_ANNUAL_FILINGS, BERKSHIRE_LATEST_ANNUAL_FILING, BERKSHIRE_LATEST_QUARTERLY_FILING, BERKSHIRE_QUARTERLY_FILINGS } from "./filings";
import { BERKSHIRE_FORECASTS, BERKSHIRE_FORECAST_SOURCE_NOTE, BERKSHIRE_VALUATION_CASES, BERKSHIRE_VALUATION_INPUTS, BERKSHIRE_VALUATION_NOTE } from "./forecastModel";
import { BERKSHIRE_INSURANCE_ECONOMICS, BERKSHIRE_INSURANCE_ECONOMICS_SOURCE_NOTE, BERKSHIRE_LATEST_INSURANCE_ECONOMICS, BERKSHIRE_LATEST_LIQUIDITY } from "./insuranceEconomics";
import { BERKSHIRE_H1_2026_GROWTH, BERKSHIRE_OPERATING_EARNINGS, BERKSHIRE_OPERATING_EARNINGS_SOURCE_NOTE } from "./operatingMetrics";
import { BERKSHIRE_PUBLICATION_QA_ITEMS, BERKSHIRE_PUBLICATION_QA_NOTE } from "./publicationQa";
import { BERKSHIRE_QUARTERLY_FINANCIALS, BERKSHIRE_QUARTERLY_FINANCIALS_SOURCE_NOTE } from "./quarterlyFinancials";
import { BERKSHIRE_REPORT_SECTIONS } from "./reportContent";
import { BERKSHIRE_CHART_GROUPS, BERKSHIRE_SOURCE_SYSTEMS } from "./researchPlan";
import { BERKSHIRE_SOURCE_AUDIT_ITEMS, BERKSHIRE_SOURCE_AUDIT_NOTE } from "./sourceAudit";
import { BERKSHIRE_LATEST_VALUATION, BERKSHIRE_VALUATION_HISTORY, BERKSHIRE_VALUATION_HISTORY_SOURCE_NOTE } from "./valuationHistory";

export const metadata: Metadata = {
  title: "Berkshire Hathaway (BRK.B) Complete Fundamental Analysis",
  description: "SEC-backed Berkshire Hathaway financial history, operating earnings, insurance float, capital allocation, valuation and ten-year scenarios.",
};

const usd = (value: number | null, digits = 1) => value === null ? "-" : `$${(value / 1_000_000_000).toFixed(digits)}B`;
const number = (value: number | null, digits = 1) => value === null ? "-" : value.toFixed(digits);
const pct = (value: number | null, digits = 1) => value === null ? "-" : `${value.toFixed(digits)}%`;
const money = (value: number, digits = 0) => `$${value.toFixed(digits)}`;

function Section({ id, eyebrow, title, note, children }: { id: string; eyebrow: string; title: string; note?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-zinc-200 py-10">
      <div className="mb-6 max-w-4xl">
        <p className="text-xs font-semibold uppercase text-emerald-700">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-semibold text-zinc-950 md:text-3xl">{title}</h2>
        {note ? <p className="mt-3 text-sm leading-6 text-zinc-600">{note}</p> : null}
      </div>
      {children}
    </section>
  );
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="border-l-2 border-emerald-500 pl-4">
      <p className="text-xs font-medium uppercase text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs leading-5 text-zinc-500">{detail}</p>
    </div>
  );
}

function TableFrame({ children }: { children: React.ReactNode }) {
  return <div className="overflow-x-auto border border-zinc-200 bg-white">{children}</div>;
}

const th = "whitespace-nowrap border-b border-zinc-200 bg-zinc-100 px-3 py-2 text-left text-xs font-semibold text-zinc-600";
const td = "whitespace-nowrap border-b border-zinc-100 px-3 py-2 text-sm text-zinc-700";

export default function BerkshireResearchPage() {
  const annualMax = Math.max(...BERKSHIRE_ANNUAL_FINANCIALS.map((row) => row.shareholdersEquity ?? 0));
  const latestOperating = BERKSHIRE_OPERATING_EARNINGS.at(-1)!;
  const valuationCases = Object.values(BERKSHIRE_VALUATION_CASES);

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="border-b border-zinc-800 bg-zinc-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
            <a href="/research" className="font-medium text-emerald-400 hover:text-emerald-300">Hobite Research</a>
            <span>Updated August 24, 2026 · BRK.B · USD</span>
          </div>
          <p className="mt-8 text-xs font-semibold uppercase text-emerald-400">Complete Fundamental Research Hub</p>
          <h1 className="mt-3 max-w-5xl text-4xl font-semibold leading-tight md:text-6xl">Berkshire Hathaway</h1>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-zinc-300">
            Insurance float, decentralized operating businesses and disciplined capital allocation, analyzed through recurring operating earnings and book-value compounding rather than noisy GAAP investment marks.
          </p>
          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="H1 2026 operating earnings" value={usd(latestOperating.operatingEarnings)} detail={`${pct(BERKSHIRE_H1_2026_GROWTH.operatingEarnings)} year-over-year growth`} />
            <Metric label="Insurance float" value={usd(BERKSHIRE_LATEST_INSURANCE_ECONOMICS.insuranceFloat)} detail="At June 30, 2026" />
            <Metric label="Cash + Treasury bills" value={usd(BERKSHIRE_LATEST_LIQUIDITY.cashAndTreasuryBills)} detail="Across operating groups at June 30" />
            <Metric label="BRK.B reference price" value={money(BERKSHIRE_VALUATION_INPUTS.referencePrice, 2)} detail={`${BERKSHIRE_LATEST_VALUATION.priceToBook.toFixed(2)}x book · ${BERKSHIRE_LATEST_VALUATION.operatingEarningsMultiple.toFixed(1)}x annualized operating earnings`} />
          </div>
        </div>
      </header>

      <nav className="sticky top-0 z-10 overflow-x-auto border-b border-zinc-200 bg-white/95 px-5 backdrop-blur md:px-8">
        <div className="mx-auto flex max-w-7xl gap-6 py-3 text-xs font-medium text-zinc-600">
          {[['thesis','Thesis'],['operating','Operating'],['insurance','Insurance'],['valuation','Valuation'],['forecast','Forecast'],['financials','Financials'],['filings','Filings'],['sources','Sources']].map(([href, label]) => <a key={href} href={`#${href}`} className="whitespace-nowrap hover:text-emerald-700">{label}</a>)}
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Section id="thesis" eyebrow="Investment memo" title="A compounding platform with a reinvestment constraint">
          <div className="grid gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-2">
            {BERKSHIRE_REPORT_SECTIONS.map((section) => (
              <article key={section.title} className="bg-white p-5">
                <h3 className="text-lg font-semibold text-zinc-950">{section.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-700">{section.thesis}</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-600">
                  {section.bullets.map((bullet) => <li key={bullet} className="border-l border-zinc-300 pl-3">{bullet}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section id="operating" eyebrow="Recurring economics" title="Operating earnings by business" note={BERKSHIRE_OPERATING_EARNINGS_SOURCE_NOTE}>
          <TableFrame>
            <table className="w-full min-w-[980px] border-collapse">
              <thead><tr>{["Period","Underwriting","Investment income","BNSF","BHE","Manufacturing / service / retail","Other","Total"].map((label) => <th key={label} className={th}>{label}</th>)}</tr></thead>
              <tbody>{BERKSHIRE_OPERATING_EARNINGS.map((row) => <tr key={row.period}>
                <td className={`${td} font-medium text-zinc-950`}><a href={row.sourceUrl} target="_blank" rel="noreferrer" className="underline decoration-zinc-300">{row.period}</a></td>
                <td className={td}>{usd(row.insuranceUnderwriting)}</td><td className={td}>{usd(row.insuranceInvestmentIncome)}</td><td className={td}>{usd(row.bnsf)}</td><td className={td}>{usd(row.berkshireHathawayEnergy)}</td><td className={td}>{usd(row.manufacturingServiceRetailing)}</td><td className={td}>{usd(row.other)}</td><td className={`${td} font-semibold text-zinc-950`}>{usd(row.operatingEarnings)}</td>
              </tr>)}</tbody>
            </table>
          </TableFrame>
          <div className="mt-5 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {Object.entries(BERKSHIRE_H1_2026_GROWTH).map(([label, value]) => <div key={label} className="border-t-2 border-zinc-900 pt-3"><p className="text-xs capitalize text-zinc-500">{label.replace(/([A-Z])/g, " $1")}</p><p className={`mt-1 text-xl font-semibold ${value >= 0 ? "text-emerald-700" : "text-rose-700"}`}>{pct(value)}</p></div>)}
          </div>
        </Section>

        <Section id="insurance" eyebrow="Balance-sheet engine" title="Insurance float and capital allocation" note={BERKSHIRE_INSURANCE_ECONOMICS_SOURCE_NOTE}>
          <TableFrame><table className="w-full min-w-[920px] border-collapse">
            <thead><tr>{["Period","Float","Underwriting","Investment income","Cash + T-bills","Public equities","Debt","A-equivalent shares","Repurchases"].map((label) => <th key={label} className={th}>{label}</th>)}</tr></thead>
            <tbody>{BERKSHIRE_INSURANCE_ECONOMICS.map((row) => <tr key={row.period}><td className={`${td} font-medium`}><a href={row.sourceUrl} target="_blank" rel="noreferrer" className="underline decoration-zinc-300">{row.period}</a></td><td className={td}>{usd(row.insuranceFloat)}</td><td className={td}>{usd(row.insuranceUnderwritingEarnings)}</td><td className={td}>{usd(row.insuranceInvestmentIncome)}</td><td className={td}>{usd(row.cashAndTreasuryBills)}</td><td className={td}>{usd(row.equitySecurities)}</td><td className={td}>{usd(row.notesAndBorrowings)}</td><td className={td}>{row.classAEquivalentShares?.toLocaleString()}</td><td className={td}>{usd(row.shareRepurchases)}</td></tr>)}</tbody>
          </table></TableFrame>
          <div className="mt-5 grid gap-px border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-4"><p className="text-xs text-zinc-500">Insurance & other cash</p><p className="mt-1 text-xl font-semibold">{usd(BERKSHIRE_LATEST_LIQUIDITY.insuranceAndOtherCash)}</p></div>
            <div className="bg-white p-4"><p className="text-xs text-zinc-500">BNSF / BHE cash</p><p className="mt-1 text-xl font-semibold">{usd(BERKSHIRE_LATEST_LIQUIDITY.railroadUtilitiesEnergyCash)}</p></div>
            <div className="bg-white p-4"><p className="text-xs text-zinc-500">Short-term Treasury bills</p><p className="mt-1 text-xl font-semibold">{usd(BERKSHIRE_LATEST_LIQUIDITY.shortTermTreasuryBills)}</p></div>
            <div className="bg-white p-4"><p className="text-xs text-zinc-500">Public equity securities</p><p className="mt-1 text-xl font-semibold">{usd(BERKSHIRE_LATEST_LIQUIDITY.equitySecurities)}</p></div>
          </div>
        </Section>

        <Section id="valuation" eyebrow="Scenario valuation" title="A transparent two-method range" note={BERKSHIRE_VALUATION_NOTE}>
          <div className="grid gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-3">
            {valuationCases.map((item) => <article key={item.label} className="bg-white p-5">
              <div className="flex items-baseline justify-between"><h3 className="text-lg font-semibold">{item.label}</h3><span className={`text-sm font-semibold ${item.upsideToReferencePrice >= 0 ? "text-emerald-700" : "text-rose-700"}`}>{pct(item.upsideToReferencePrice)} vs. reference</span></div>
              <p className="mt-5 text-4xl font-semibold text-zinc-950">{money(item.valuePerClassBShare)}</p>
              <dl className="mt-5 space-y-2 text-sm text-zinc-600">
                <div className="flex justify-between"><dt>Normalized earnings</dt><dd>{usd(item.normalizedOperatingEarnings)}</dd></div>
                <div className="flex justify-between"><dt>Earnings multiple</dt><dd>{item.operatingEarningsMultiple.toFixed(1)}x</dd></div>
                <div className="flex justify-between"><dt>Price / book</dt><dd>{item.priceToBook.toFixed(2)}x</dd></div>
                <div className="flex justify-between border-t border-zinc-200 pt-2"><dt>Blended equity value</dt><dd>{usd(item.blendedEquityValue, 0)}</dd></div>
              </dl>
            </article>)}
          </div>
          <p className="mt-3 text-xs text-zinc-500">Reference: {money(BERKSHIRE_VALUATION_INPUTS.referencePrice, 2)} on {BERKSHIRE_VALUATION_INPUTS.referencePriceDate}. {BERKSHIRE_VALUATION_INPUTS.note}</p>

          <h3 className="mt-8 text-lg font-semibold">Historical market context</h3>
          <p className="mt-2 text-sm text-zinc-600">{BERKSHIRE_VALUATION_HISTORY_SOURCE_NOTE}</p>
          <TableFrame><table className="mt-4 w-full min-w-[760px] border-collapse"><thead><tr>{["Year","BRK.B price","Market cap","Book value","Price / book","Operating earnings","Operating earnings multiple"].map((label) => <th key={label} className={th}>{label}</th>)}</tr></thead><tbody>{BERKSHIRE_VALUATION_HISTORY.map((row) => <tr key={row.year}><td className={td}>{row.year}</td><td className={td}>{money(row.classBPrice, 2)}</td><td className={td}>{usd(row.marketCapitalization, 0)}</td><td className={td}>{usd(row.shareholdersEquity, 0)}</td><td className={td}>{row.priceToBook.toFixed(2)}x</td><td className={td}>{usd(row.operatingEarnings)}</td><td className={td}>{row.operatingEarningsMultiple.toFixed(1)}x</td></tr>)}</tbody></table></TableFrame>
        </Section>

        <Section id="forecast" eyebrow="Ten-year model" title="Operating-earnings scenarios" note={BERKSHIRE_FORECAST_SOURCE_NOTE}>
          <TableFrame><table className="w-full min-w-[720px] border-collapse"><thead><tr><th className={th}>Year</th>{Object.keys(BERKSHIRE_FORECASTS).map((scenario) => <th key={scenario} className={th}>{scenario} operating earnings / growth</th>)}</tr></thead><tbody>{BERKSHIRE_FORECASTS.base.map((_, index) => <tr key={index}><td className={`${td} font-medium`}>{BERKSHIRE_FORECASTS.base[index].year}</td>{(["bear","base","bull"] as const).map((scenario) => { const row = BERKSHIRE_FORECASTS[scenario][index]; return <td key={scenario} className={td}>{usd(row.operatingEarnings)} <span className="text-zinc-400">/ {pct(row.growth)}</span></td>; })}</tr>)}</tbody></table></TableFrame>
        </Section>

        <Section id="financials" eyebrow="SEC financial database" title="Annual and quarterly statements" note="GAAP investment gains and losses can dominate reported earnings. Use these statements with the recurring operating-earnings table above.">
          <h3 className="text-lg font-semibold">Book-value development</h3>
          <div className="mt-4 grid gap-2">
            {BERKSHIRE_ANNUAL_FINANCIALS.map((row) => <div key={row.fiscalYear} className="grid grid-cols-[48px_1fr_72px] items-center gap-3 text-xs"><span>{row.fiscalYear}</span><div className="h-3 bg-zinc-200"><div className="h-full bg-emerald-600" style={{ width: `${((row.shareholdersEquity ?? 0) / annualMax) * 100}%` }} /></div><span className="text-right">{usd(row.shareholdersEquity, 0)}</span></div>)}
          </div>

          <h3 className="mt-8 text-lg font-semibold">Annual history</h3>
          <TableFrame><table className="mt-4 w-full min-w-[1040px] border-collapse"><thead><tr>{["FY","Revenue","Pre-tax earnings","Net income","Operating cash flow","Capex","Mechanical FCF","Assets","Equity","Net margin","ROE"].map((label) => <th key={label} className={th}>{label}</th>)}</tr></thead><tbody>{BERKSHIRE_ANNUAL_FINANCIALS.map((row) => <tr key={row.fiscalYear}><td className={`${td} font-medium`}><a href={row.filingUrl} target="_blank" rel="noreferrer" className="underline decoration-zinc-300">{row.fiscalYear}</a></td><td className={td}>{usd(row.revenue)}</td><td className={td}>{usd(row.preTaxEarnings)}</td><td className={td}>{usd(row.netIncome)}</td><td className={td}>{usd(row.operatingCashFlow)}</td><td className={td}>{usd(row.capitalExpenditures)}</td><td className={td}>{usd(row.freeCashFlow)}</td><td className={td}>{usd(row.totalAssets)}</td><td className={td}>{usd(row.shareholdersEquity)}</td><td className={td}>{pct(row.netMargin)}</td><td className={td}>{pct(row.gaapRoe)}</td></tr>)}</tbody></table></TableFrame>

          <h3 className="mt-8 text-lg font-semibold">Quarterly history</h3>
          <p className="mt-2 text-sm text-zinc-600">{BERKSHIRE_QUARTERLY_FINANCIALS_SOURCE_NOTE}</p>
          <TableFrame><table className="mt-4 w-full min-w-[840px] border-collapse"><thead><tr>{["Period","Revenue","Pre-tax earnings","Net income","Operating cash flow","Capex","Mechanical FCF","Derived Q4"].map((label) => <th key={label} className={th}>{label}</th>)}</tr></thead><tbody>{BERKSHIRE_QUARTERLY_FINANCIALS.map((row) => <tr key={row.period}><td className={`${td} font-medium`}><a href={row.filingUrl} target="_blank" rel="noreferrer" className="underline decoration-zinc-300">{row.period}</a></td><td className={td}>{usd(row.revenue)}</td><td className={td}>{usd(row.preTaxEarnings)}</td><td className={td}>{usd(row.netIncome)}</td><td className={td}>{usd(row.operatingCashFlow)}</td><td className={td}>{usd(row.capitalExpenditures)}</td><td className={td}>{usd(row.freeCashFlow)}</td><td className={td}>{row.derivedFourthQuarter ? "Yes" : "No"}</td></tr>)}</tbody></table></TableFrame>
          <p className="mt-3 text-xs text-zinc-500">Latest annual: FY{BERKSHIRE_LATEST_ANNUAL_FINANCIAL.fiscalYear}, filed {BERKSHIRE_LATEST_ANNUAL_FINANCIAL.filingDate}. Data are in USD.</p>
        </Section>

        <Section id="filings" eyebrow="Primary documents" title="SEC filing inventory">
          <div className="grid gap-5 lg:grid-cols-2">
            {[{ title: "Annual reports", rows: BERKSHIRE_ANNUAL_FILINGS }, { title: "Quarterly reports", rows: BERKSHIRE_QUARTERLY_FILINGS }].map((group) => <div key={group.title}><h3 className="mb-3 text-lg font-semibold">{group.title}</h3><TableFrame><table className="w-full border-collapse"><thead><tr><th className={th}>Form</th><th className={th}>Report date</th><th className={th}>Filed</th></tr></thead><tbody>{group.rows.map((filing) => <tr key={filing.accessionNumber}><td className={td}><a href={filing.url} target="_blank" rel="noreferrer" className="font-medium underline decoration-zinc-300">{filing.form}</a></td><td className={td}>{filing.reportDate || "-"}</td><td className={td}>{filing.filingDate}</td></tr>)}</tbody></table></TableFrame></div>)}
          </div>
          <p className="mt-3 text-xs text-zinc-500">Latest 10-K filed {BERKSHIRE_LATEST_ANNUAL_FILING.filingDate}; latest 10-Q filed {BERKSHIRE_LATEST_QUARTERLY_FILING.filingDate}.</p>
        </Section>

        <Section id="sources" eyebrow="Research controls" title="Sources, coverage and publication QA" note={BERKSHIRE_SOURCE_AUDIT_NOTE}>
          <div className="grid gap-6 lg:grid-cols-2">
            <div><h3 className="mb-3 text-lg font-semibold">Source systems</h3><div className="divide-y divide-zinc-200 border border-zinc-200 bg-white">{BERKSHIRE_SOURCE_SYSTEMS.map((source) => <a key={source.name} href={source.url} target="_blank" rel="noreferrer" className="block p-4 hover:bg-zinc-50"><p className="text-sm font-semibold">{source.name}</p><p className="mt-1 text-xs leading-5 text-zinc-500">{source.use}</p></a>)}</div></div>
            <div><h3 className="mb-3 text-lg font-semibold">Source audit</h3><div className="divide-y divide-zinc-200 border border-zinc-200 bg-white">{BERKSHIRE_SOURCE_AUDIT_ITEMS.map((item) => <a key={item.area} href={item.sourceUrl} target="_blank" rel="noreferrer" className="block p-4 hover:bg-zinc-50"><div className="flex justify-between gap-4"><p className="text-sm font-semibold">{item.area}</p><span className="text-xs font-medium uppercase text-emerald-700">{item.status}</span></div><p className="mt-1 text-xs leading-5 text-zinc-500">{item.coverage}. {item.note}</p></a>)}</div></div>
          </div>
          <h3 className="mt-8 text-lg font-semibold">Publication QA</h3>
          <p className="mt-2 text-sm text-zinc-600">{BERKSHIRE_PUBLICATION_QA_NOTE}</p>
          <div className="mt-4 grid gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-2">{BERKSHIRE_PUBLICATION_QA_ITEMS.map((item) => <div key={item.check} className="bg-white p-4"><div className="flex justify-between gap-4"><p className="text-sm font-semibold">{item.check}</p><span className={`text-xs font-semibold uppercase ${item.status === "pass" ? "text-emerald-700" : "text-amber-700"}`}>{item.status}</span></div><p className="mt-2 text-xs leading-5 text-zinc-500">{item.evidence}</p></div>)}</div>
          <div className="mt-8 border-l-2 border-zinc-900 pl-4 text-xs leading-5 text-zinc-500">
            <p>Model inventory: {BERKSHIRE_CHART_GROUPS.reduce((sum, group) => sum + group.targetCount, 0)} analytical views across {BERKSHIRE_CHART_GROUPS.length} categories.</p>
            <p className="mt-1">This page is research and education, not personalized investment advice. Market prices and forecasts can become stale.</p>
          </div>
        </Section>
      </div>
    </main>
  );
}
