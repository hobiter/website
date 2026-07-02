import type { Metadata } from "next";
import {
  ALIBABA_ANNUAL_FINANCIALS,
  ALIBABA_ANNUAL_FINANCIALS_COVERAGE,
  ALIBABA_ANNUAL_FINANCIALS_SOURCE_NOTE,
  ALIBABA_LATEST_ANNUAL_FINANCIAL,
  type AlibabaAnnualFinancial,
} from "./annualFinancials";
import {
  ALIBABA_ANNUAL_FILINGS,
  ALIBABA_CORE_FILINGS,
  ALIBABA_FILING_SOURCE_NOTE,
  ALIBABA_LATEST_ANNUAL_FILING,
  ALIBABA_REGISTRATION_FILINGS,
  ALIBABA_SIX_K_FILINGS,
  type AlibabaFiling,
} from "./filings";
import {
  ALIBABA_DCF_ASSUMPTIONS,
  ALIBABA_DCF_CASES,
  ALIBABA_FORECASTS,
  ALIBABA_FORECAST_SOURCE_NOTE,
  type ForecastRow,
} from "./forecastModel";
import {
  ALIBABA_INTERIM_RESULTS,
  ALIBABA_INTERIM_RESULTS_SOURCE_NOTE,
  ALIBABA_RECENT_SIX_K_UPDATES,
  type AlibabaInterimResult,
} from "./interimResults";
import {
  ALIBABA_PUBLICATION_QA_ITEMS,
  ALIBABA_PUBLICATION_QA_NOTE,
  type PublicationQaItem,
} from "./publicationQa";
import { ALIBABA_REPORT_SECTIONS } from "./reportContent";
import { BABA_CHART_GROUPS, BABA_IMPLEMENTATION_MILESTONES, BABA_SOURCE_SYSTEMS } from "./researchPlan";
import {
  ALIBABA_SEGMENT_METRICS,
  ALIBABA_SEGMENT_METRICS_SOURCE_NOTE,
  type AlibabaSegmentMetric,
} from "./segmentMetrics";
import {
  ALIBABA_SOURCE_AUDIT_ITEMS,
  ALIBABA_SOURCE_AUDIT_NOTE,
  type AlibabaSourceAuditItem,
} from "./sourceAudit";
import {
  ALIBABA_LATEST_VALUATION_HISTORY,
  ALIBABA_VALUATION_HISTORY,
  ALIBABA_VALUATION_HISTORY_COVERAGE,
  ALIBABA_VALUATION_HISTORY_SOURCE_NOTE,
  type AlibabaValuationHistory,
} from "./valuationHistory";

export const metadata: Metadata = {
  title: "Alibaba (BABA) Complete Fundamental Research Hub",
  description:
    "SEC-backed Alibaba fundamental research hub with annual financials, segment economics, valuation, forecast, source audit, and QA.",
};

function formatRmbBillions(value: number | null) {
  if (value == null) return "n/a";
  return `RMB${(value / 1_000_000_000).toFixed(1)}B`;
}

function formatRmbMillionsAsBillions(value: number | null) {
  if (value == null) return "n/a";
  return `RMB${(value / 1_000).toFixed(1)}B`;
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

function formatMultiple(value: number | null) {
  if (value == null) return "n/a";
  return `${value.toFixed(1)}x`;
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-zinc-950">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function MetricCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-zinc-950">{value}</p>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{note}</p>
    </div>
  );
}

function MiniBarChart({
  title,
  rows,
  value,
  formatter,
  color = "bg-red-600",
}: {
  title: string;
  rows: AlibabaAnnualFinancial[];
  value: (row: AlibabaAnnualFinancial) => number | null;
  formatter: (value: number | null) => string;
  color?: string;
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
                className={`w-7 rounded-t ${rowValue != null && rowValue < 0 ? "bg-zinc-500" : color}`}
                style={{ height }}
                title={`FY${row.fiscalYear}: ${formatter(rowValue)}`}
              />
              <span className="text-[10px] text-zinc-500">{String(row.fiscalYear).slice(2)}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SegmentBarChart({ title, rows }: { title: string; rows: AlibabaSegmentMetric[] }) {
  const max = Math.max(...rows.map((row) => Math.abs(row.revenue)), 1);

  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-zinc-950">{title}</h3>
      <div className="mt-5 space-y-3">
        {rows.map((row) => (
          <div key={`${row.fiscalYear}-${row.segment}`}>
            <div className="flex items-center justify-between gap-4 text-xs text-zinc-600">
              <span>{row.segment.replace("Alibaba ", "")}</span>
              <span>{formatRmbBillions(row.revenue)}</span>
            </div>
            <div className="mt-1 h-2 rounded bg-zinc-100">
              <div
                className={`h-2 rounded ${row.revenue < 0 ? "bg-zinc-400" : "bg-red-600"}`}
                style={{ width: `${Math.max(4, (Math.abs(row.revenue) / max) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function InterimMiniBarChart({
  title,
  rows,
  value,
  formatter,
  color = "bg-red-600",
}: {
  title: string;
  rows: AlibabaInterimResult[];
  value: (row: AlibabaInterimResult) => number | null;
  formatter: (value: number | null) => string;
  color?: string;
}) {
  const values = rows.map(value).filter((item): item is number => item != null);
  const max = Math.max(...values.map((item) => Math.abs(item)), 1);

  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-zinc-950">{title}</h3>
      <div className="mt-5 flex h-56 items-end gap-3 overflow-x-auto">
        {rows.map((row) => {
          const rowValue = value(row);
          const height = rowValue == null ? 0 : Math.max(8, (Math.abs(rowValue) / max) * 180);

          return (
            <div key={`${title}-${row.accessionNumber}`} className="flex min-w-20 flex-col items-center gap-2">
              <div
                className={`w-9 rounded-t ${rowValue != null && rowValue < 0 ? "bg-zinc-500" : color}`}
                style={{ height }}
                title={`${row.periodLabel}: ${formatter(rowValue)}`}
              />
              <span className="text-center text-[10px] leading-3 text-zinc-500">
                {row.periodLabel.replace(" quarter FY2026", "")}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ValuationMiniBarChart({
  title,
  rows,
  value,
  formatter,
}: {
  title: string;
  rows: AlibabaValuationHistory[];
  value: (row: AlibabaValuationHistory) => number | null;
  formatter: (value: number | null) => string;
}) {
  const values = rows.map(value).filter((item): item is number => item != null);
  const max = Math.max(...values.map((item) => Math.abs(item)), 1);

  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-zinc-950">{title}</h3>
      <div className="mt-5 flex h-56 items-end gap-3 overflow-x-auto">
        {rows.map((row) => {
          const rowValue = value(row);
          const height = rowValue == null ? 0 : Math.max(8, (Math.abs(rowValue) / max) * 180);

          return (
            <div key={row.fiscalYear} className="flex min-w-12 flex-col items-center gap-2">
              <div className="w-8 rounded-t bg-zinc-900" style={{ height }} title={`FY${row.fiscalYear}`} />
              <span className="text-[10px] text-zinc-500">{row.fiscalYear}</span>
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
        <tbody>
          {rows.map((row) => (
            <tr key={row.year} className="border-b border-zinc-100">
              <td className="py-2 pr-4 font-medium text-zinc-950">{row.year}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatRmbBillions(row.revenue)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatPercent(row.revenueGrowth)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatRmbBillions(row.freeCashFlow)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatPercent(row.freeCashFlowMargin)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AnnualFinancialTable({ rows }: { rows: AlibabaAnnualFinancial[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-200 text-left text-zinc-500">
            <th className="py-2 pr-4 font-medium">FY</th>
            <th className="py-2 pr-4 font-medium">Revenue</th>
            <th className="py-2 pr-4 font-medium">Op. Income</th>
            <th className="py-2 pr-4 font-medium">Net Income</th>
            <th className="py-2 pr-4 font-medium">OCF</th>
            <th className="py-2 pr-4 font-medium">FCF</th>
            <th className="py-2 pr-4 font-medium">Op. Margin</th>
            <th className="py-2 pr-4 font-medium">ROE</th>
            <th className="py-2 pr-4 font-medium">Source</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.fiscalYear} className="border-b border-zinc-100">
              <td className="py-2 pr-4 font-medium text-zinc-950">{row.fiscalYear}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatRmbBillions(row.revenue)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatRmbBillions(row.operatingIncome)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatRmbBillions(row.netIncome)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatRmbBillions(row.operatingCashFlow)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatRmbBillions(row.freeCashFlow)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatPercent(row.operatingMargin)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatPercent(row.roe)}</td>
              <td className="py-2 pr-4">
                <a href={row.filingUrl} className="text-zinc-800 underline" rel="noreferrer" target="_blank">
                  20-F
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InterimResultTable({ rows }: { rows: AlibabaInterimResult[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-200 text-left text-zinc-500">
            <th className="py-2 pr-4 font-medium">Period</th>
            <th className="py-2 pr-4 font-medium">Filed</th>
            <th className="py-2 pr-4 font-medium">Revenue</th>
            <th className="py-2 pr-4 font-medium">Growth</th>
            <th className="py-2 pr-4 font-medium">Op. Income</th>
            <th className="py-2 pr-4 font-medium">Adj. EBITA</th>
            <th className="py-2 pr-4 font-medium">Net Income</th>
            <th className="py-2 pr-4 font-medium">Non-GAAP NI</th>
            <th className="py-2 pr-4 font-medium">OCF</th>
            <th className="py-2 pr-4 font-medium">FCF</th>
            <th className="py-2 pr-4 font-medium">Cloud Growth</th>
            <th className="py-2 pr-4 font-medium">Source</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.accessionNumber} className="border-b border-zinc-100 align-top">
              <td className="py-2 pr-4">
                <p className="font-medium text-zinc-950">{row.periodLabel}</p>
                <p className="text-xs text-zinc-500">{row.periodEnded}</p>
              </td>
              <td className="py-2 pr-4 text-zinc-700">{row.filingDate}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatRmbMillionsAsBillions(row.revenueRmbMillions)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatPercent(row.revenueGrowth)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatRmbMillionsAsBillions(row.operatingIncomeRmbMillions)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatRmbMillionsAsBillions(row.adjustedEbitaRmbMillions)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatRmbMillionsAsBillions(row.netIncomeRmbMillions)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatRmbMillionsAsBillions(row.nonGaapNetIncomeRmbMillions)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatRmbMillionsAsBillions(row.operatingCashFlowRmbMillions)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatRmbMillionsAsBillions(row.freeCashFlowRmbMillions)}</td>
              <td className="py-2 pr-4 text-zinc-700">{formatPercent(row.cloudRevenueGrowth)}</td>
              <td className="py-2 pr-4">
                <a href={row.exhibitUrl} className="text-zinc-800 underline" rel="noreferrer" target="_blank">
                  Exhibit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FilingTable({ filings, caption }: { filings: AlibabaFiling[]; caption: string }) {
  return (
    <div>
      <p className="text-sm font-semibold text-zinc-950">{caption}</p>
      <div className="mt-3 overflow-x-auto">
        <table className="min-w-full text-sm">
          <tbody>
            {filings.map((filing) => (
              <tr key={filing.accessionNumber} className="border-b border-zinc-100">
                <td className="py-2 pr-4 font-medium text-zinc-950">{filing.form}</td>
                <td className="py-2 pr-4 text-zinc-700">{filing.reportDate || "Registration"}</td>
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

function StatusTable({
  rows,
  kind,
}: {
  rows: (AlibabaSourceAuditItem | PublicationQaItem)[];
  kind: "source" | "qa";
}) {
  const badgeClassName: Record<string, string> = {
    complete: "bg-emerald-100 text-emerald-800",
    partial: "bg-amber-100 text-amber-800",
    "needs-review": "bg-zinc-200 text-zinc-700",
    pass: "bg-emerald-100 text-emerald-800",
    warning: "bg-amber-100 text-amber-800",
    blocked: "bg-red-100 text-red-800",
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <tbody>
          {rows.map((row) => {
            const key = kind === "source" ? (row as AlibabaSourceAuditItem).area : (row as PublicationQaItem).check;
            const status = kind === "source" ? (row as AlibabaSourceAuditItem).status : (row as PublicationQaItem).status;
            const text = kind === "source" ? (row as AlibabaSourceAuditItem).note : (row as PublicationQaItem).evidence;
            const source = kind === "source" ? (row as AlibabaSourceAuditItem).primarySource : "";

            return (
              <tr key={key} className="border-b border-zinc-100 align-top">
                <td className="py-3 pr-4 font-medium text-zinc-950">{key}</td>
                <td className="py-3 pr-4">
                  <span className={`rounded-md px-2 py-1 text-xs font-semibold ${badgeClassName[status]}`}>
                    {status}
                  </span>
                </td>
                <td className="max-w-3xl py-3 pr-4 leading-6 text-zinc-650">
                  {source ? `${source}: ` : ""}
                  {text}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function AlibabaCompleteFundamentalAnalysisPage() {
  const annualRows = [...ALIBABA_ANNUAL_FINANCIALS];
  const latestAnnualRows = [...ALIBABA_ANNUAL_FINANCIALS].reverse();
  const recentSixKs = [...ALIBABA_SIX_K_FILINGS].slice(-12).reverse();
  const latestSegments = ALIBABA_SEGMENT_METRICS.filter(
    (row) => row.fiscalYear === 2026 && row.segment !== "Inter-segment elimination",
  );

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-lg border border-zinc-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-zinc-500">Equity Research Build</p>
          <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-tight md:text-6xl">
            Alibaba (BABA) Complete Fundamental Research Hub
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-zinc-650">
            SEC-backed research hub for Alibaba: Form 20-F financials, foreign-private-issuer filing inventory,
            segment economics, cloud/AI reinvestment context, valuation history, forecast model, source audit, and QA.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-4">
          <MetricCard
            label="Coverage"
            value={`${ALIBABA_CORE_FILINGS.length} filings`}
            note="Core inventory includes F-1 registration filings, Form 20-F reports, and Form 6-K filings."
          />
          <MetricCard
            label="Annual reports"
            value={`${ALIBABA_ANNUAL_FILINGS.length}`}
            note={`Latest annual filing: FY${ALIBABA_LATEST_ANNUAL_FILING.reportDate.slice(0, 4)}, filed ${ALIBABA_LATEST_ANNUAL_FILING.filingDate}.`}
          />
          <MetricCard
            label="FY2026 Revenue"
            value={formatRmbBillions(ALIBABA_LATEST_ANNUAL_FINANCIAL.revenue)}
            note="Alibaba reports primary financials in RMB."
          />
          <MetricCard
            label="FY2026 EV/Sales"
            value={formatMultiple(ALIBABA_LATEST_VALUATION_HISTORY.enterpriseValueToSales)}
            note="Valuation uses BABA ADS prices and 1 ADS = 8 ordinary shares."
          />
        </div>

        <SectionCard title="Finished Investment Report">
          <div className="grid gap-4 lg:grid-cols-2">
            {ALIBABA_REPORT_SECTIONS.map((section) => (
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
        </SectionCard>

        <SectionCard title="Chart Dashboard">
          <div className="grid gap-5 lg:grid-cols-3">
            <MiniBarChart title="Revenue" rows={annualRows} value={(row) => row.revenue} formatter={formatRmbBillions} />
            <MiniBarChart title="Operating Income" rows={annualRows} value={(row) => row.operatingIncome} formatter={formatRmbBillions} />
            <MiniBarChart title="Net Income" rows={annualRows} value={(row) => row.netIncome} formatter={formatRmbBillions} />
            <MiniBarChart title="Operating Margin" rows={annualRows} value={(row) => row.operatingMargin} formatter={formatPercent} color="bg-zinc-900" />
            <MiniBarChart title="Free Cash Flow" rows={annualRows} value={(row) => row.freeCashFlow} formatter={formatRmbBillions} color="bg-zinc-900" />
            <SegmentBarChart title="FY2026 Segment Revenue" rows={latestSegments} />
            <InterimMiniBarChart
              title="FY2026 Interim Revenue"
              rows={[...ALIBABA_INTERIM_RESULTS].reverse()}
              value={(row) => row.revenueRmbMillions}
              formatter={formatRmbMillionsAsBillions}
            />
            <InterimMiniBarChart
              title="FY2026 Interim Free Cash Flow"
              rows={[...ALIBABA_INTERIM_RESULTS].reverse()}
              value={(row) => row.freeCashFlowRmbMillions}
              formatter={formatRmbMillionsAsBillions}
              color="bg-zinc-900"
            />
            <ValuationMiniBarChart title="EV/Sales" rows={ALIBABA_VALUATION_HISTORY} value={(row) => row.enterpriseValueToSales} formatter={formatMultiple} />
            <ValuationMiniBarChart title="FCF Yield" rows={ALIBABA_VALUATION_HISTORY} value={(row) => row.freeCashFlowYield} formatter={formatPercent} />
          </div>
        </SectionCard>

        <SectionCard title="Forecast and DCF">
          <div className="space-y-6">
            <p className="max-w-5xl leading-7 text-zinc-650">{ALIBABA_FORECAST_SOURCE_NOTE}</p>
            <div className="grid gap-4 lg:grid-cols-3">
              {(["bear", "base", "bull"] as const).map((scenario) => (
                <article key={scenario} className="rounded-lg border border-zinc-200 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">{scenario}</p>
                      <h3 className="mt-2 text-xl font-semibold text-zinc-950">
                        {formatRmbBillions(ALIBABA_FORECASTS[scenario].at(-1)!.revenue)} 2036 revenue
                      </h3>
                    </div>
                    <span className="rounded-md bg-zinc-900 px-2 py-1 text-xs font-semibold text-white">
                      ${ALIBABA_DCF_CASES[scenario].valuePerAdsUsd}
                    </span>
                  </div>
                  <div className="mt-4">
                    <ForecastTable rows={ALIBABA_FORECASTS[scenario]} />
                  </div>
                </article>
              ))}
            </div>
            <p className="text-sm leading-6 text-zinc-600">{ALIBABA_DCF_ASSUMPTIONS.note}</p>
          </div>
        </SectionCard>

        <SectionCard title="Historical Valuation">
          <div className="space-y-5">
            <p className="max-w-5xl leading-7 text-zinc-650">{ALIBABA_VALUATION_HISTORY_SOURCE_NOTE}</p>
            <div className="grid gap-3 md:grid-cols-4">
              <div className="rounded-lg bg-zinc-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Coverage</p>
                <p className="mt-2 text-xl font-semibold">
                  FY{ALIBABA_VALUATION_HISTORY_COVERAGE.fromFiscalYear}-FY{ALIBABA_VALUATION_HISTORY_COVERAGE.throughFiscalYear}
                </p>
              </div>
              <div className="rounded-lg bg-zinc-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Latest market cap</p>
                <p className="mt-2 text-xl font-semibold">{formatUsdBillions(ALIBABA_LATEST_VALUATION_HISTORY.marketCapUsd)}</p>
              </div>
              <div className="rounded-lg bg-zinc-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">ADS ratio</p>
                <p className="mt-2 text-xl font-semibold">1:8</p>
              </div>
              <div className="rounded-lg bg-zinc-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Base DCF / ADS</p>
                <p className="mt-2 text-xl font-semibold">${ALIBABA_DCF_CASES.base.valuePerAdsUsd}</p>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Segment Economics">
          <div className="space-y-5">
            <p className="max-w-5xl leading-7 text-zinc-650">{ALIBABA_SEGMENT_METRICS_SOURCE_NOTE}</p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <tbody>
                  {[...ALIBABA_SEGMENT_METRICS].reverse().map((row) => (
                    <tr key={`${row.fiscalYear}-${row.segment}`} className="border-b border-zinc-100">
                      <td className="py-2 pr-4 font-medium text-zinc-950">{row.fiscalYear}</td>
                      <td className="py-2 pr-4 text-zinc-700">{row.segment}</td>
                      <td className="py-2 pr-4 text-zinc-700">{formatRmbBillions(row.revenue)}</td>
                      <td className="py-2 pr-4 text-zinc-700">{formatPercent(row.yoyGrowth)}</td>
                      <td className="max-w-lg py-2 pr-4 text-zinc-600">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Annual Financial Database">
          <div className="space-y-5">
            <p className="max-w-5xl leading-7 text-zinc-650">{ALIBABA_ANNUAL_FINANCIALS_SOURCE_NOTE}</p>
            <p className="text-sm text-zinc-600">
              Coverage: FY{ALIBABA_ANNUAL_FINANCIALS_COVERAGE.fromFiscalYear}-FY
              {ALIBABA_ANNUAL_FINANCIALS_COVERAGE.throughFiscalYear}
            </p>
            <AnnualFinancialTable rows={latestAnnualRows} />
          </div>
        </SectionCard>

        <SectionCard title="Interim Results and 6-K Updates">
          <div className="space-y-6">
            <p className="max-w-5xl leading-7 text-zinc-650">{ALIBABA_INTERIM_RESULTS_SOURCE_NOTE}</p>
            <div className="grid gap-3 md:grid-cols-4">
              <div className="rounded-lg bg-zinc-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Latest result</p>
                <p className="mt-2 text-xl font-semibold">{ALIBABA_INTERIM_RESULTS[0].periodLabel}</p>
              </div>
              <div className="rounded-lg bg-zinc-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Revenue</p>
                <p className="mt-2 text-xl font-semibold">
                  {formatRmbMillionsAsBillions(ALIBABA_INTERIM_RESULTS[0].revenueRmbMillions)}
                </p>
              </div>
              <div className="rounded-lg bg-zinc-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Cloud growth</p>
                <p className="mt-2 text-xl font-semibold">{formatPercent(ALIBABA_INTERIM_RESULTS[0].cloudRevenueGrowth)}</p>
              </div>
              <div className="rounded-lg bg-zinc-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Tracked 6-Ks</p>
                <p className="mt-2 text-xl font-semibold">{ALIBABA_RECENT_SIX_K_UPDATES.length}</p>
              </div>
            </div>
            <InterimResultTable rows={ALIBABA_INTERIM_RESULTS} />
            <div className="grid gap-3 md:grid-cols-3">
              {ALIBABA_RECENT_SIX_K_UPDATES.map((update) => (
                <article key={update.accessionNumber} className="rounded-lg border border-zinc-200 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-semibold text-zinc-950">{update.filingDate}</p>
                    <span className="rounded-md bg-zinc-900 px-2 py-1 text-xs font-semibold text-white">
                      {update.classification}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-zinc-650">{update.summary}</p>
                  <a href={update.filingUrl} className="mt-3 inline-block text-sm text-zinc-800 underline" rel="noreferrer" target="_blank">
                    SEC filing
                  </a>
                </article>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="SEC Filing Inventory">
          <div className="space-y-8">
            <p className="max-w-4xl leading-7 text-zinc-650">{ALIBABA_FILING_SOURCE_NOTE}</p>
            <FilingTable filings={ALIBABA_REGISTRATION_FILINGS} caption="IPO and registration filings" />
            <FilingTable filings={[...ALIBABA_ANNUAL_FILINGS].reverse()} caption="Annual Form 20-F filings" />
            <FilingTable filings={recentSixKs} caption="Most recent 12 Form 6-K filings" />
          </div>
        </SectionCard>

        <SectionCard title="Research Structure">
          <div className="grid gap-3 md:grid-cols-4">
            {BABA_IMPLEMENTATION_MILESTONES.map((milestone, index) => (
              <div key={milestone} className="rounded-lg bg-zinc-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Step {index + 1}</p>
                <p className="mt-2 font-medium text-zinc-900">{milestone}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Source Audit">
          <div className="space-y-5">
            <p className="max-w-5xl leading-7 text-zinc-650">{ALIBABA_SOURCE_AUDIT_NOTE}</p>
            <StatusTable rows={ALIBABA_SOURCE_AUDIT_ITEMS} kind="source" />
          </div>
        </SectionCard>

        <SectionCard title="Publication QA">
          <div className="space-y-5">
            <p className="max-w-5xl leading-7 text-zinc-650">{ALIBABA_PUBLICATION_QA_NOTE}</p>
            <StatusTable rows={ALIBABA_PUBLICATION_QA_ITEMS} kind="qa" />
          </div>
        </SectionCard>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <SectionCard title="Source System">
            <div className="space-y-4">
              {BABA_SOURCE_SYSTEMS.map((source) => (
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
              {BABA_CHART_GROUPS.map((group) => (
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
