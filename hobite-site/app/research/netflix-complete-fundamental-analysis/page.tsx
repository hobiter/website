import type { Metadata } from "next";
import {
  NETFLIX_ANNUAL_FINANCIALS,
  NETFLIX_ANNUAL_FINANCIALS_COVERAGE,
  NETFLIX_ANNUAL_FINANCIALS_SOURCE_NOTE,
  NETFLIX_LATEST_ANNUAL_FINANCIAL,
  type NetflixAnnualFinancial,
} from "./annualFinancials";
import {
  NETFLIX_ANNUAL_FILINGS,
  NETFLIX_CORE_FILINGS,
  NETFLIX_LATEST_ANNUAL_FILING,
  NETFLIX_LATEST_QUARTERLY_FILING,
  NETFLIX_QUARTERLY_FILINGS,
  NETFLIX_REGISTRATION_FILINGS,
  type NetflixFiling,
} from "./filings";
import {
  NFLX_CHART_GROUPS,
  NFLX_IMPLEMENTATION_MILESTONES,
  NFLX_RESEARCH_SECTIONS,
  NFLX_SOURCE_SYSTEMS,
} from "./researchPlan";
import {
  NETFLIX_DCF_ASSUMPTIONS,
  NETFLIX_DCF_CASES,
  NETFLIX_FORECASTS,
  NETFLIX_FORECAST_SOURCE_NOTE,
  type ForecastRow,
} from "./forecastModel";
import {
  NETFLIX_LATEST_QUARTERLY_FINANCIAL,
  NETFLIX_QUARTERLY_FINANCIALS,
  NETFLIX_QUARTERLY_FINANCIALS_COVERAGE,
  NETFLIX_QUARTERLY_FINANCIALS_SOURCE_NOTE,
  type NetflixQuarterlyFinancial,
} from "./quarterlyFinancials";
import { NETFLIX_REPORT_SECTIONS } from "./reportContent";

export const metadata: Metadata = {
  title: "Netflix (NFLX) Complete Fundamental Research Hub",
  description:
    "Project hub for Hobite Capital's institutional-grade Netflix fundamental research report.",
};

function MetricCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-zinc-950">{value}</p>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{note}</p>
    </div>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-zinc-950">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function FilingTable({
  filings,
  caption,
}: {
  filings: NetflixFiling[];
  caption: string;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-zinc-950">{caption}</p>
      <div className="mt-3 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 text-left text-zinc-500">
              <th className="py-2 pr-4 font-medium">Form</th>
              <th className="py-2 pr-4 font-medium">Report Date</th>
              <th className="py-2 pr-4 font-medium">Filing Date</th>
              <th className="py-2 pr-4 font-medium">Accession</th>
              <th className="py-2 pr-4 font-medium">Document</th>
            </tr>
          </thead>
          <tbody>
            {filings.map((filing) => (
              <tr key={filing.accessionNumber} className="border-b border-zinc-100">
                <td className="py-2 pr-4 font-medium text-zinc-900">{filing.form}</td>
                <td className="py-2 pr-4 text-zinc-700">{filing.reportDate || "IPO filing"}</td>
                <td className="py-2 pr-4 text-zinc-700">{filing.filingDate}</td>
                <td className="py-2 pr-4 font-mono text-xs text-zinc-600">{filing.accessionNumber}</td>
                <td className="py-2 pr-4">
                  <a href={filing.url} className="text-zinc-800 underline" rel="noreferrer" target="_blank">
                    SEC filing
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function formatUsdBillions(value: number | null) {
  if (value == null) return "n/a";
  return `$${(value / 1_000_000_000).toFixed(1)}B`;
}

function formatMillions(value: number | null) {
  if (value == null) return "n/a";
  return `${(value / 1_000_000).toFixed(1)}M`;
}

function formatPercent(value: number | null) {
  if (value == null) return "n/a";
  return `${value.toFixed(1)}%`;
}

function formatEps(value: number | null) {
  if (value == null) return "n/a";
  return `$${value.toFixed(2)}`;
}

function AnnualFinancialTable({ rows }: { rows: NetflixAnnualFinancial[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-200 text-left text-zinc-500">
            <th className="py-2 pr-4 font-medium">FY</th>
            <th className="py-2 pr-4 font-medium">Revenue</th>
            <th className="py-2 pr-4 font-medium">Gross Profit</th>
            <th className="py-2 pr-4 font-medium">Op. Income</th>
            <th className="py-2 pr-4 font-medium">Net Income</th>
            <th className="py-2 pr-4 font-medium">Diluted EPS</th>
            <th className="py-2 pr-4 font-medium">OCF</th>
            <th className="py-2 pr-4 font-medium">FCF</th>
            <th className="py-2 pr-4 font-medium">Op. Margin</th>
            <th className="py-2 pr-4 font-medium">Debt</th>
            <th className="py-2 pr-4 font-medium">Diluted Shares</th>
            <th className="py-2 pr-4 font-medium">Source</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.fiscalYear} className="border-b border-zinc-100">
              <td className="py-2 pr-4 font-medium text-zinc-950">{row.fiscalYear}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatUsdBillions(row.revenue)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatUsdBillions(row.grossProfit)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatUsdBillions(row.operatingIncome)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatUsdBillions(row.netIncome)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatEps(row.dilutedEps)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatUsdBillions(row.operatingCashFlow)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatUsdBillions(row.freeCashFlow)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatPercent(row.operatingMargin)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatUsdBillions(row.longTermDebt)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatMillions(row.dilutedShares)}</td>
              <td className="py-2 pr-4">
                {row.filingUrl ? (
                  <a href={row.filingUrl} className="text-zinc-800 underline" rel="noreferrer" target="_blank">
                    10-K
                  </a>
                ) : (
                  <span className="text-zinc-500">Manual extraction needed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function QuarterlyFinancialTable({ rows }: { rows: NetflixQuarterlyFinancial[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-200 text-left text-zinc-500">
            <th className="py-2 pr-4 font-medium">Period</th>
            <th className="py-2 pr-4 font-medium">Revenue</th>
            <th className="py-2 pr-4 font-medium">Op. Income</th>
            <th className="py-2 pr-4 font-medium">Op. Margin</th>
            <th className="py-2 pr-4 font-medium">Net Income</th>
            <th className="py-2 pr-4 font-medium">Diluted EPS</th>
            <th className="py-2 pr-4 font-medium">OCF</th>
            <th className="py-2 pr-4 font-medium">FCF</th>
            <th className="py-2 pr-4 font-medium">Source</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.period} className="border-b border-zinc-100">
              <td className="py-2 pr-4 font-medium text-zinc-950">{row.period}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatUsdBillions(row.revenue)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatUsdBillions(row.operatingIncome)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatPercent(row.operatingMargin)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatUsdBillions(row.netIncome)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatEps(row.dilutedEps)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatUsdBillions(row.operatingCashFlow)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatUsdBillions(row.freeCashFlow)}</td>
              <td className="py-2 pr-4">
                {row.filingUrl ? (
                  <a href={row.filingUrl} className="text-zinc-800 underline" rel="noreferrer" target="_blank">
                    {row.fiscalQuarter === 4 ? "10-K" : "10-Q"}
                  </a>
                ) : (
                  <span className="text-zinc-500">{row.source}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MiniBarChart({
  title,
  rows,
  value,
  formatter,
}: {
  title: string;
  rows: NetflixAnnualFinancial[];
  value: (row: NetflixAnnualFinancial) => number | null;
  formatter: (value: number | null) => string;
}) {
  const values = rows.map(value).filter((item): item is number => item != null);
  const max = Math.max(...values.map((item) => Math.abs(item)), 1);

  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-zinc-950">{title}</h3>
      <div className="mt-5 flex h-56 items-end gap-2 overflow-x-auto">
        {rows.map((row) => {
          const rowValue = value(row);
          const height = rowValue == null ? 0 : Math.max(8, (Math.abs(rowValue) / max) * 180);

          return (
            <div key={row.fiscalYear} className="flex min-w-10 flex-col items-center gap-2">
              <div
                className={`w-7 rounded-t ${rowValue != null && rowValue < 0 ? "bg-red-500" : "bg-zinc-900"}`}
                style={{ height }}
                title={`${row.fiscalYear}: ${formatter(rowValue)}`}
              />
              <span className="text-[10px] text-zinc-500">{String(row.fiscalYear).slice(2)}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ForecastTable({ rows }: { rows: ForecastRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-200 text-left text-zinc-500">
            <th className="py-2 pr-4 font-medium">Year</th>
            <th className="py-2 pr-4 font-medium">Revenue</th>
            <th className="py-2 pr-4 font-medium">Growth</th>
            <th className="py-2 pr-4 font-medium">FCF</th>
            <th className="py-2 pr-4 font-medium">FCF Margin</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.year} className="border-b border-zinc-100">
              <td className="py-2 pr-4 font-medium text-zinc-950">{row.year}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatUsdBillions(row.revenue)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatPercent(row.revenueGrowth)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatUsdBillions(row.freeCashFlow)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatPercent(row.freeCashFlowMargin)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReportSectionList() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {NETFLIX_REPORT_SECTIONS.map((section) => (
        <article key={section.title} className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-zinc-950">{section.title}</h3>
          <p className="mt-3 leading-7 text-zinc-700">{section.thesis}</p>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-zinc-650">
            {section.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export default function NetflixCompleteFundamentalAnalysisPage() {
  const chartTarget = NFLX_CHART_GROUPS.reduce((sum, group) => sum + group.targetCount, 0);
  const recentQuarterlyFilings = [...NETFLIX_QUARTERLY_FILINGS].slice(-12).reverse();
  const annualFinancialRowsWithRevenue = NETFLIX_ANNUAL_FINANCIALS.filter((row) => row.revenue != null);
  const latestAnnualFinancialRows = [...annualFinancialRowsWithRevenue].reverse();
  const latestQuarterlyFinancialRows = [...NETFLIX_QUARTERLY_FINANCIALS].slice(-16).reverse();

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-lg border border-zinc-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Equity Research Build
          </p>
          <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-tight md:text-6xl">
            Netflix (NFLX) Complete Fundamental Research Hub
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-zinc-650">
            This page is the working hub for the Netflix research project: SEC-backed financial history,
            subscriber analysis, content economics, competitive positioning, forecast model, DCF valuation,
            and final investment conclusion.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/research"
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700"
            >
              Research library
            </a>
            <a
              href="https://data.sec.gov/submissions/CIK0001065280.json"
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700"
            >
              SEC filing index
            </a>
            <a
              href="https://ir.netflix.net/financials/quarterly-earnings/default.aspx"
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700"
            >
              Netflix IR
            </a>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-4">
          <MetricCard
            label="Coverage"
            value={`${NETFLIX_CORE_FILINGS.length} filings`}
            note="Core SEC inventory now includes registration statements, annual reports, and quarterly reports."
          />
          <MetricCard
            label="Annual reports"
            value={`${NETFLIX_ANNUAL_FILINGS.length}`}
            note={`Latest annual filing: FY ${NETFLIX_LATEST_ANNUAL_FILING.reportDate.slice(0, 4)}, filed ${NETFLIX_LATEST_ANNUAL_FILING.filingDate}.`}
          />
          <MetricCard
            label="Quarterlies"
            value={`${NETFLIX_QUARTERLY_FINANCIALS.length} rows`}
            note={`Latest financial row: ${NETFLIX_LATEST_QUARTERLY_FINANCIAL.period}; latest filing: ${NETFLIX_LATEST_QUARTERLY_FILING.reportDate}.`}
          />
          <MetricCard
            label="2025 Revenue"
            value={formatUsdBillions(NETFLIX_LATEST_ANNUAL_FINANCIAL.revenue)}
            note={`SEC XBRL draft database now covers FY${NETFLIX_ANNUAL_FINANCIALS_COVERAGE.xbrlCompleteFromFiscalYear}-FY${NETFLIX_ANNUAL_FINANCIALS_COVERAGE.xbrlCompleteThroughFiscalYear}.`}
          />
        </div>

        <SectionCard title="Finished Investment Report">
          <div className="space-y-6">
            <div className="rounded-lg bg-zinc-950 p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">Hobite conclusion</p>
              <h2 className="mt-3 text-3xl font-semibold">Quality compounder, valuation-sensitive</h2>
              <p className="mt-4 max-w-5xl leading-8 text-zinc-200">
                Netflix has evolved from a domestic DVD subscription company into a global entertainment platform with
                scale economics, strong operating leverage, and growing free cash flow. The base case is attractive when
                purchased at a disciplined valuation; the bear case is multiple compression if content ROI, advertising,
                or pricing power disappoints.
              </p>
            </div>

            <ReportSectionList />
          </div>
        </SectionCard>

        <div className="grid gap-5 lg:grid-cols-3">
          <MiniBarChart
            title="Annual Revenue"
            rows={annualFinancialRowsWithRevenue}
            value={(row) => row.revenue}
            formatter={formatUsdBillions}
          />
          <MiniBarChart
            title="Operating Income"
            rows={annualFinancialRowsWithRevenue}
            value={(row) => row.operatingIncome}
            formatter={formatUsdBillions}
          />
          <MiniBarChart
            title="Free Cash Flow"
            rows={annualFinancialRowsWithRevenue}
            value={(row) => row.freeCashFlow}
            formatter={formatUsdBillions}
          />
        </div>

        <SectionCard title="Forecast and DCF">
          <div className="space-y-6">
            <p className="max-w-5xl leading-7 text-zinc-650">{NETFLIX_FORECAST_SOURCE_NOTE}</p>
            <div className="grid gap-4 lg:grid-cols-3">
              {(["bear", "base", "bull"] as const).map((scenario) => (
                <article key={scenario} className="rounded-lg border border-zinc-200 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">{scenario}</p>
                      <h3 className="mt-2 text-xl font-semibold text-zinc-950">
                        {formatUsdBillions(NETFLIX_FORECASTS[scenario][NETFLIX_FORECASTS[scenario].length - 1].revenue)} 2035 revenue
                      </h3>
                    </div>
                    <span className="rounded-md bg-zinc-900 px-2 py-1 text-xs font-semibold text-white">
                      {formatEps(NETFLIX_DCF_CASES[scenario].valuePerShare)}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-zinc-650">
                    DCF uses a {formatPercent(NETFLIX_DCF_CASES[scenario].discountRate)} discount rate and{" "}
                    {formatPercent(NETFLIX_DCF_CASES[scenario].terminalGrowth)} terminal growth.
                  </p>
                  <div className="mt-4">
                    <ForecastTable rows={NETFLIX_FORECASTS[scenario]} />
                  </div>
                </article>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-lg bg-zinc-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Base EV</p>
                <p className="mt-2 text-xl font-semibold">{formatUsdBillions(NETFLIX_DCF_CASES.base.enterpriseValue)}</p>
              </div>
              <div className="rounded-lg bg-zinc-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Base equity value</p>
                <p className="mt-2 text-xl font-semibold">{formatUsdBillions(NETFLIX_DCF_CASES.base.equityValue)}</p>
              </div>
              <div className="rounded-lg bg-zinc-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Net debt</p>
                <p className="mt-2 text-xl font-semibold">{formatUsdBillions(NETFLIX_DCF_ASSUMPTIONS.netDebt)}</p>
              </div>
              <div className="rounded-lg bg-zinc-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Share basis</p>
                <p className="mt-2 text-xl font-semibold">{formatMillions(NETFLIX_DCF_ASSUMPTIONS.dilutedShares)}</p>
              </div>
            </div>
            <p className="text-sm leading-6 text-zinc-600">{NETFLIX_DCF_ASSUMPTIONS.note}</p>
          </div>
        </SectionCard>

        <SectionCard title="Build Roadmap">
          <div className="grid gap-3 md:grid-cols-3">
            {NFLX_IMPLEMENTATION_MILESTONES.map((milestone, index) => (
              <div key={milestone} className="rounded-lg bg-zinc-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Step {index + 1}
                </p>
                <p className="mt-2 font-medium text-zinc-900">{milestone}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Annual Financial Database">
          <div className="space-y-5">
            <p className="max-w-5xl leading-7 text-zinc-650">{NETFLIX_ANNUAL_FINANCIALS_SOURCE_NOTE}</p>
            <div className="grid gap-3 md:grid-cols-4">
              <div className="rounded-lg bg-zinc-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">XBRL coverage</p>
                <p className="mt-2 text-xl font-semibold">
                  FY{NETFLIX_ANNUAL_FINANCIALS_COVERAGE.xbrlCompleteFromFiscalYear}-FY{NETFLIX_ANNUAL_FINANCIALS_COVERAGE.xbrlCompleteThroughFiscalYear}
                </p>
              </div>
              <div className="rounded-lg bg-zinc-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Manual rows</p>
                <p className="mt-2 text-xl font-semibold">
                  {NETFLIX_ANNUAL_FINANCIALS_COVERAGE.manualStatementExtractionFiscalYears.length}
                </p>
              </div>
              <div className="rounded-lg bg-zinc-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Latest op. margin</p>
                <p className="mt-2 text-xl font-semibold">{formatPercent(NETFLIX_LATEST_ANNUAL_FINANCIAL.operatingMargin)}</p>
              </div>
              <div className="rounded-lg bg-zinc-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Latest FCF</p>
                <p className="mt-2 text-xl font-semibold">{formatUsdBillions(NETFLIX_LATEST_ANNUAL_FINANCIAL.freeCashFlow)}</p>
              </div>
            </div>
            <AnnualFinancialTable rows={latestAnnualFinancialRows} />
          </div>
        </SectionCard>

        <SectionCard title="Quarterly Financial Database">
          <div className="space-y-5">
            <p className="max-w-5xl leading-7 text-zinc-650">{NETFLIX_QUARTERLY_FINANCIALS_SOURCE_NOTE}</p>
            <div className="grid gap-3 md:grid-cols-4">
              <div className="rounded-lg bg-zinc-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Coverage</p>
                <p className="mt-2 text-xl font-semibold">
                  {NETFLIX_QUARTERLY_FINANCIALS_COVERAGE.fromPeriod} - {NETFLIX_QUARTERLY_FINANCIALS_COVERAGE.throughPeriod}
                </p>
              </div>
              <div className="rounded-lg bg-zinc-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Rows</p>
                <p className="mt-2 text-xl font-semibold">{NETFLIX_QUARTERLY_FINANCIALS.length}</p>
              </div>
              <div className="rounded-lg bg-zinc-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Latest revenue</p>
                <p className="mt-2 text-xl font-semibold">{formatUsdBillions(NETFLIX_LATEST_QUARTERLY_FINANCIAL.revenue)}</p>
              </div>
              <div className="rounded-lg bg-zinc-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Latest FCF</p>
                <p className="mt-2 text-xl font-semibold">{formatUsdBillions(NETFLIX_LATEST_QUARTERLY_FINANCIAL.freeCashFlow)}</p>
              </div>
            </div>
            <QuarterlyFinancialTable rows={latestQuarterlyFinancialRows} />
          </div>
        </SectionCard>

        <SectionCard title="SEC Filing Inventory">
          <div className="space-y-8">
            <p className="max-w-4xl leading-7 text-zinc-650">
              The filing inventory is generated from Netflix's official SEC submissions index for CIK
              0001065280. Annual report amendments are preserved because they may affect references,
              exhibit coverage, or corrected disclosures during the source audit.
            </p>
            <FilingTable filings={NETFLIX_REGISTRATION_FILINGS} caption="IPO and registration statement filings" />
            <FilingTable filings={[...NETFLIX_ANNUAL_FILINGS].reverse()} caption="Annual filings from latest to IPO-era coverage" />
            <FilingTable filings={recentQuarterlyFilings} caption="Most recent 12 quarterly filings" />
          </div>
        </SectionCard>

        <SectionCard title="Research Structure">
          <div className="grid gap-4 lg:grid-cols-2">
            {NFLX_RESEARCH_SECTIONS.map((section) => (
              <article key={section.slug} id={section.slug} className="rounded-lg border border-zinc-200 p-5">
                <h3 className="text-xl font-semibold text-zinc-950">{section.title}</h3>
                <p className="mt-2 leading-7 text-zinc-650">{section.objective}</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      Outputs
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                      {section.primaryOutputs.map((output) => (
                        <li key={output}>{output}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      Sources
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                      {section.sourcePriority.map((source) => (
                        <li key={source}>{source}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <SectionCard title="Source System">
            <div className="space-y-4">
              {NFLX_SOURCE_SYSTEMS.map((source) => (
                <article key={source.name} className="rounded-lg border border-zinc-200 p-4">
                  <a href={source.url} className="font-semibold text-zinc-950 underline">
                    {source.name}
                  </a>
                  <p className="mt-2 text-sm leading-6 text-zinc-650">{source.use}</p>
                </article>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Chart Inventory">
            <div className="space-y-4">
              {NFLX_CHART_GROUPS.map((group) => (
                <article key={group.category} className="rounded-lg border border-zinc-200 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold text-zinc-950">{group.category}</h3>
                    <span className="rounded-md bg-zinc-900 px-2 py-1 text-xs font-semibold text-white">
                      {group.targetCount}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-650">{group.examples.join(", ")}</p>
                </article>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
