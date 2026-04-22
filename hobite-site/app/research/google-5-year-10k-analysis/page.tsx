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
      opIncomeGrowth: prev ? pct(row.operatingIncome - prev.operatingIncome, prev.operatingIncome) : null,
      opMargin: pct(row.operatingIncome, row.revenue),
      netMargin: pct(row.netIncome, row.revenue),
      ocfMargin: pct(row.operatingCashFlow, row.revenue),
    };
  });

  const avgOpMargin = rowsWithRatios.reduce((sum, row) => sum + row.opMargin, 0) / rowsWithRatios.length;
  const avgOcfMargin = rowsWithRatios.reduce((sum, row) => sum + row.ocfMargin, 0) / rowsWithRatios.length;

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">10-K Deep Dive</p>
          <h1 className="mt-3 text-4xl font-semibold">Google (Alphabet) — 5-Year 10-K Detailed Analysis (FY2021–FY2025)</h1>
          <p className="mt-4 leading-7 text-zinc-700">
            This page summarizes key performance trends directly from Alphabet&apos;s latest five annual 10-K periods,
            focusing on growth durability, margin structure, cash conversion quality, and forward sensitivity factors.
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
          <h2 className="text-2xl font-semibold text-zinc-900">Detailed analysis (expanded)</h2>

          <p>
            <strong>1) Revenue trajectory and demand context.</strong> Revenue increased from {first.revenue.toFixed(1)}B in FY2021
            to {last.revenue.toFixed(1)}B in FY2025, which implies {revenueCagr.toFixed(1)}% CAGR over the five-year window.
            The key shape of this curve matters: FY2022 was a moderation year, but the business re-accelerated in FY2023,
            then compounded strongly through FY2024 and FY2025. This pattern is consistent with a platform that kept core
            search demand resilient while broadening monetization across cloud, subscriptions, and AI-enhanced products.
          </p>

          <p>
            <strong>2) Operating leverage and cost structure.</strong> Operating income rose from {first.operatingIncome.toFixed(1)}B
            to {last.operatingIncome.toFixed(1)}B, a {operatingIncomeCagr.toFixed(1)}% CAGR that outpaced revenue growth.
            This spread indicates improving operating leverage despite heavy infrastructure investment. The important signal
            is that Alphabet has remained capable of funding large compute and data-center builds while still expanding the
            earnings base, which is difficult for peers with weaker monetization efficiency.
          </p>

          <p>
            <strong>3) Margin behavior through cycle phases.</strong> The five-year average operating margin is
            {" "}{avgOpMargin.toFixed(1)}%, while average operating cash flow margin is {avgOcfMargin.toFixed(1)}%.
            FY2022 represented a stress year for margin momentum, but subsequent years show re-expansion. In practical
            valuation terms, this supports the case that margin compression during reinvestment phases may be cyclical
            rather than structurally permanent—provided demand quality and pricing power are preserved.
          </p>

          <p>
            <strong>4) Net income and earnings quality.</strong> Net income rose from {first.netIncome.toFixed(1)}B to
            {" "}{last.netIncome.toFixed(1)}B across the window. The most useful interpretation is not absolute magnitude,
            but consistency of conversion from operating profit to bottom-line earnings while reinvesting into AI scale.
            A widening gap between operating income and net income would raise quality concerns; in this data window,
            earnings quality remains broadly strong.
          </p>

          <p>
            <strong>5) Cash generation and strategic flexibility.</strong> Operating cash flow moved from
            {" "}{first.operatingCashFlow.toFixed(1)}B to {last.operatingCashFlow.toFixed(1)}B ({operatingCashFlowCagr.toFixed(1)}% CAGR).
            This is strategically critical: in AI competition, absolute cash generation determines how fast a company can
            scale model training, inference capacity, and adjacent enterprise offerings without balance-sheet stress.
            Alphabet&apos;s cash profile implies high optionality in both offense (product expansion) and defense (pricing).
          </p>

          <p>
            <strong>6) Segment-level interpretation.</strong> While this page is consolidated-financial in nature, the trend set
            suggests three engines: Search (core monetization and intent capture), YouTube/ads ecosystem (demand surface
            diversification), and Cloud/AI enterprise stack (second growth curve and strategic moat extension). The durable
            investment case requires these engines to remain complementary: Search cash flows fund AI capex, while Cloud and
            AI products create incremental monetization channels.
          </p>

          <p>
            <strong>7) Risk framework.</strong> Main downside vectors include regulatory constraints on default distribution,
            changes in user behavior due to new AI interfaces, and rising model-serving costs that could pressure margins if
            monetization lags. In addition, traffic-acquisition economics and competitive pricing in cloud could create
            short-term earnings volatility even if long-term demand remains intact.
          </p>

          <p>
            <strong>8) Monitoring checklist for investors.</strong> The highest-value KPIs to track each quarter are:
            (a) revenue growth durability after currency/one-offs, (b) operating margin trend versus AI capex intensity,
            (c) operating cash flow conversion, (d) cloud profitability progression, and (e) monetization per AI interaction.
            If these stay healthy, the long-duration compounding thesis remains credible.
          </p>

          <p>
            <strong>9) Base-case assessment.</strong> Based on the 5-year 10-K evidence, Alphabet appears to be in a favorable
            position: still growing at scale, sustaining strong cash conversion, and preserving profitability despite major
            strategic reinvestment. The debate for long-term holders is likely less about near-term growth and more about
            return-on-incremental-capital in AI-led product cycles.
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
                  <th className="py-2 pr-4">YoY Op. Income</th>
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
                    <td className="py-2 pr-4">{row.opIncomeGrowth === null ? "-" : `${row.opIncomeGrowth.toFixed(1)}%`}</td>
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
            <li>
              <a className="underline" href="https://abc.xyz/investor/">
                Alphabet Investor Relations
              </a>
            </li>
            <li>
              <a className="underline" href="https://www.sec.gov/edgar/browse/?CIK=1652044">
                Alphabet SEC filings (10-K archive)
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
