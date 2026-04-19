import type { Metadata } from "next";

type Row = {
  year: number;
  revenue: number;
  operatingIncome: number;
  netIncome: number;
  operatingCashFlow: number;
};

// USD billions, sourced from Alphabet 10-K filings (FY2021-FY2025).
const GOOGLE_5Y_10K: Row[] = [
  { year: 2021, revenue: 257.6, operatingIncome: 78.7, netIncome: 76.0, operatingCashFlow: 91.7 },
  { year: 2022, revenue: 282.8, operatingIncome: 74.8, netIncome: 60.0, operatingCashFlow: 91.5 },
  { year: 2023, revenue: 307.4, operatingIncome: 84.3, netIncome: 73.8, operatingCashFlow: 101.7 },
  { year: 2024, revenue: 350.0, operatingIncome: 112.4, netIncome: 100.1, operatingCashFlow: 125.3 },
  { year: 2025, revenue: 402.8, operatingIncome: 129.0, netIncome: 132.2, operatingCashFlow: 164.7 },
];

function pct(numerator: number, denominator: number) {
  return (numerator / denominator) * 100;
}

function cagr(start: number, end: number, years: number) {
  return (Math.pow(end / start, 1 / years) - 1) * 100;
}

export const metadata: Metadata = {
  title: "Google 5-Year 10-K Analysis",
  description: "Detailed analysis of Google (Alphabet) based on the latest five annual 10-K filings.",
};

export default function GoogleFiveYear10KAnalysisPage() {
  const first = GOOGLE_5Y_10K[0];
  const last = GOOGLE_5Y_10K[GOOGLE_5Y_10K.length - 1];
  const periods = GOOGLE_5Y_10K.length - 1;

  const revenueCagr = cagr(first.revenue, last.revenue, periods);
  const operatingIncomeCagr = cagr(first.operatingIncome, last.operatingIncome, periods);
  const operatingCashFlowCagr = cagr(first.operatingCashFlow, last.operatingCashFlow, periods);

  const rowsWithRatios = GOOGLE_5Y_10K.map((row, index) => {
    const prev = index > 0 ? GOOGLE_5Y_10K[index - 1] : undefined;
    return {
      ...row,
      revGrowth: prev ? pct(row.revenue - prev.revenue, prev.revenue) : null,
      opMargin: pct(row.operatingIncome, row.revenue),
      netMargin: pct(row.netIncome, row.revenue),
      ocfMargin: pct(row.operatingCashFlow, row.revenue),
    };
  });

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">10-K Deep Dive</p>
          <h1 className="mt-3 text-4xl font-semibold">Google (Alphabet) — 5-Year 10-K Detailed Analysis (FY2021–FY2025)</h1>
          <p className="mt-4 leading-7 text-zinc-700">
            This page summarizes key performance trends directly from Alphabet&apos;s latest five annual 10-K periods,
            focusing on growth durability, margin structure, and cash conversion quality.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase text-zinc-500">Revenue CAGR (5Y)</p>
            <p className="mt-2 text-3xl font-semibold">{revenueCagr.toFixed(1)}%</p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase text-zinc-500">Operating Income CAGR (5Y)</p>
            <p className="mt-2 text-3xl font-semibold">{operatingIncomeCagr.toFixed(1)}%</p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase text-zinc-500">Operating Cash Flow CAGR (5Y)</p>
            <p className="mt-2 text-3xl font-semibold">{operatingCashFlowCagr.toFixed(1)}%</p>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm space-y-5 text-zinc-700 leading-7">
          <h2 className="text-2xl font-semibold text-zinc-900">Detailed analysis</h2>
          <p>
            <strong>1) Growth profile:</strong> Revenue rose from {first.revenue.toFixed(1)}B in FY2021 to {last.revenue.toFixed(1)}B in FY2025,
            implying {revenueCagr.toFixed(1)}% CAGR across the period. The sequence shows a moderation in FY2022 followed by
            re-acceleration in FY2023–FY2025, suggesting the core demand engine recovered and broadened beyond purely cyclical advertising effects.
          </p>
          <p>
            <strong>2) Earnings power:</strong> Operating income expanded from {first.operatingIncome.toFixed(1)}B to {last.operatingIncome.toFixed(1)}B,
            with a CAGR of {operatingIncomeCagr.toFixed(1)}%. This outpaced revenue growth, indicating improved scale economics and a healthier mix
            over time despite rising AI-related infrastructure spend.
          </p>
          <p>
            <strong>3) Margin quality:</strong> Operating margin and cash-flow margin both improved materially by FY2025 versus FY2022 trough dynamics.
            This suggests Alphabet has retained pricing power and efficiency levers even while investing aggressively in compute-heavy products.
          </p>
          <p>
            <strong>4) Cash conversion:</strong> Operating cash flow increased from {first.operatingCashFlow.toFixed(1)}B to {last.operatingCashFlow.toFixed(1)}B
            ({operatingCashFlowCagr.toFixed(1)}% CAGR). Rising cash generation in parallel with revenue indicates the model remains fundamentally
            cash generative rather than growth-at-all-cost.
          </p>
          <p>
            <strong>5) Forward watchpoints:</strong> For the next 12–24 months, the highest-signal metrics are (a) Search monetization efficiency,
            (b) Cloud profitability trend, (c) AI inference cost per unit of monetized output, and (d) free-cash-flow conversion after infrastructure expansion.
            Sustained strength on these dimensions would support durable compounding despite regulatory and competitive uncertainty.
          </p>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">5-year 10-K table (USD billions + key ratios)</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-zinc-600">
                  <th className="py-2 pr-4">Year</th>
                  <th className="py-2 pr-4">Revenue</th>
                  <th className="py-2 pr-4">YoY Revenue</th>
                  <th className="py-2 pr-4">Operating Income</th>
                  <th className="py-2 pr-4">Net Income</th>
                  <th className="py-2 pr-4">Operating Cash Flow</th>
                  <th className="py-2 pr-4">Operating Margin</th>
                  <th className="py-2 pr-4">Net Margin</th>
                  <th className="py-2 pr-4">OCF Margin</th>
                </tr>
              </thead>
              <tbody>
                {rowsWithRatios.map((row) => (
                  <tr key={row.year} className="border-b border-zinc-100">
                    <td className="py-2 pr-4">{row.year}</td>
                    <td className="py-2 pr-4">{row.revenue.toFixed(1)}</td>
                    <td className="py-2 pr-4">{row.revGrowth === null ? "-" : `${row.revGrowth.toFixed(1)}%`}</td>
                    <td className="py-2 pr-4">{row.operatingIncome.toFixed(1)}</td>
                    <td className="py-2 pr-4">{row.netIncome.toFixed(1)}</td>
                    <td className="py-2 pr-4">{row.operatingCashFlow.toFixed(1)}</td>
                    <td className="py-2 pr-4">{row.opMargin.toFixed(1)}%</td>
                    <td className="py-2 pr-4">{row.netMargin.toFixed(1)}%</td>
                    <td className="py-2 pr-4">{row.ocfMargin.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Source documents</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-700">
            <li><a className="underline" href="https://abc.xyz/investor/">Alphabet Investor Relations</a></li>
            <li><a className="underline" href="https://www.sec.gov/edgar/browse/?CIK=1652044">Alphabet SEC filings (10-K archive)</a></li>
          </ul>
        </section>
      </div>
    </main>
  );
}
