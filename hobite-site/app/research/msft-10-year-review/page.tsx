import type { Metadata } from "next";
import FinancialGrowthChart from "./FinancialGrowthChart";
import { MSFT_10Y_DATA } from "./msftData";

export const metadata: Metadata = {
  title: "MSFT 10-Year Review",
  description: "Microsoft 10-year review with visual growth diagram for revenue, EBITA, and operating cash flow.",
};

export default function MsftTenYearReviewPage() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <header>
          <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Research</p>
          <h1 className="mt-3 text-4xl font-semibold">Microsoft (MSFT) 10-Year Review</h1>
          <p className="mt-3 max-w-3xl text-zinc-600">
            A quick visual look at growth in revenue, EBITA, and operating cash flow over the last decade.
          </p>
          <a href="/zh/research/msft-10-year-review" className="mt-3 inline-block text-sm text-zinc-600 underline">
            中文版
          </a>
        </header>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Text summary</h2>
          <p className="mt-3 text-zinc-700">
            Microsoft shows durable top-line expansion across the decade, with EBITA and operating cash flow generally
            compounding faster than revenue. This spread suggests operating leverage from software mix, cloud scale, and
            recurring enterprise demand.
          </p>
          <p className="mt-3 text-zinc-700">
            The chart below uses an indexed base of 100 in FY2016. A value of 200 means the metric doubled vs the base
            year, making cross-metric trend comparison easier than absolute-dollar lines.
          </p>
        </section>

        <FinancialGrowthChart
          title="Revenue vs EBITA vs Operating Cash Flow"
          labels={{
            revenue: "Revenue",
            ebita: "EBITA",
            cashFlow: "Operating Cash Flow",
            indexNote: "Indexed growth (FY2016 = 100) with Y-axis index values",
          }}
        />

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Underlying data (USD billions)</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-zinc-600">
                  <th className="py-2 pr-4">Fiscal Year</th>
                  <th className="py-2 pr-4">Revenue</th>
                  <th className="py-2 pr-4">EBITA</th>
                  <th className="py-2 pr-4">Operating Cash Flow</th>
                </tr>
              </thead>
              <tbody>
                {MSFT_10Y_DATA.map((row) => (
                  <tr key={row.fiscalYear} className="border-b border-zinc-100">
                    <td className="py-2 pr-4">{row.fiscalYear}</td>
                    <td className="py-2 pr-4">{row.revenue.toFixed(1)}</td>
                    <td className="py-2 pr-4">{row.ebita.toFixed(1)}</td>
                    <td className="py-2 pr-4">{row.operatingCashFlow.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
