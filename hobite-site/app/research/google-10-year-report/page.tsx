import type { Metadata } from "next";
import GoogleGrowthChart from "./GoogleGrowthChart";
import { GOOGLE_10Y_DATA, GOOGLE_SOURCE_LINKS, cagr } from "./googleData";

export const metadata: Metadata = {
  title: "Google (Alphabet) 10-Year Annual Report Study",
  description: "Long-form report based on Alphabet annual financial reports over the last 10 years.",
};

export default function GoogleTenYearReportPage() {
  const first = GOOGLE_10Y_DATA[0];
  const last = GOOGLE_10Y_DATA[GOOGLE_10Y_DATA.length - 1];
  const periods = GOOGLE_10Y_DATA.length - 1;

  const revenueCagr = cagr(first.revenue, last.revenue, periods);
  const operatingIncomeCagr = cagr(first.operatingIncome, last.operatingIncome, periods);
  const operatingCashFlowCagr = cagr(first.operatingCashFlow, last.operatingCashFlow, periods);

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Long-form research</p>
          <h1 className="mt-3 text-4xl font-semibold">Google / Alphabet: 10-Year Annual Financial Report (FY2016–FY2025)</h1>
          <p className="mt-4 text-zinc-700 leading-7">
            This report consolidates key observations from Alphabet&apos;s annual financial disclosures over the last decade,
            focusing on scale growth, profitability conversion, cash-generation power, reinvestment posture, and strategic
            risks tied to AI compute intensity, regulation, and platform behavior shifts.
          </p>
          <a href="/research/google-10-year-report/zh" className="mt-4 inline-block text-sm text-zinc-600 underline">
            中文版
          </a>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-zinc-100 p-4">
              <p className="text-xs uppercase text-zinc-500">Revenue CAGR</p>
              <p className="mt-1 text-2xl font-semibold">{revenueCagr.toFixed(1)}%</p>
            </div>
            <div className="rounded-xl bg-zinc-100 p-4">
              <p className="text-xs uppercase text-zinc-500">Operating Income CAGR</p>
              <p className="mt-1 text-2xl font-semibold">{operatingIncomeCagr.toFixed(1)}%</p>
            </div>
            <div className="rounded-xl bg-zinc-100 p-4">
              <p className="text-xs uppercase text-zinc-500">Operating Cash Flow CAGR</p>
              <p className="mt-1 text-2xl font-semibold">{operatingCashFlowCagr.toFixed(1)}%</p>
            </div>
          </div>
        </header>

        <GoogleGrowthChart />

        <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm space-y-5 leading-7 text-zinc-700">
          <h2 className="text-2xl font-semibold text-zinc-900">1) Executive summary</h2>
          <p>
            Across FY2016–FY2025, Alphabet evolved from a high-growth digital advertising platform into a broader AI-led
            infrastructure company with multiple monetization engines. Revenue expanded from {first.revenue.toFixed(1)}B to {last.revenue.toFixed(1)}B,
            while operating cash flow grew from {first.operatingCashFlow.toFixed(1)}B to {last.operatingCashFlow.toFixed(1)}B. The key conclusion is
            that Alphabet&apos;s economic model still converts attention and intent into durable cash generation, even as the
            company takes on substantially higher infrastructure and model-serving costs.
          </p>
          <p>
            The decade can be segmented into three phases: (a) pre-pandemic compounding with steady ad-engine scaling,
            (b) post-pandemic acceleration with outsized margin expansion, and (c) AI-era reinvestment where margin quality
            remains strong but capital intensity increases. For long-term investors, the central debate is no longer whether
            Alphabet can grow, but whether AI-driven monetization can outpace the rising cost of compute and distribution.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900">2) Revenue architecture and growth durability</h2>
          <p>
            Top-line growth over the decade was broad-based but not uniform. Core advertising remained the principal driver,
            with Search continuing to anchor monetization quality through commercial-intent queries. YouTube added a second
            scaled demand surface, while Google Cloud matured from investment mode into a material contributor. This revenue
            diversification reduced single-stream concentration risk and improved resilience during cyclical ad slowdowns.
          </p>
          <p>
            The more important structural shift in the later years is that Alphabet increasingly monetizes enterprise and
            subscription behavior in addition to ad inventory. This tends to smooth cyclicality, though it also introduces
            new competitive pressures from cloud hyperscalers and AI-native software platforms.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900">3) Profitability profile and operating leverage</h2>
          <p>
            Operating income increased from {first.operatingIncome.toFixed(1)}B to {last.operatingIncome.toFixed(1)}B over the period.
            The indexed chart highlights that operating income generally outpaced revenue growth, indicating meaningful
            operating leverage at scale. This leverage came from data-center efficiency, algorithmic ad optimization,
            and fixed-cost absorption across globally distributed products.
          </p>
          <p>
            However, the next decade may look less linear. Generative AI workloads can drive significantly higher inference
            and training costs, and the margin profile will depend on model efficiency gains, chip economics, and pricing
            power in both consumer and enterprise products.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900">4) Cash flow strength and capital deployment</h2>
          <p>
            Operating cash flow reached {last.operatingCashFlow.toFixed(1)}B by FY2025, which gives Alphabet exceptional strategic
            flexibility. This liquidity supports continued investment in AI infrastructure, custom silicon, cloud capacity,
            and selective moonshot programs while still enabling shareholder returns. In practical terms, cash flow depth is
            Alphabet&apos;s primary competitive moat in an AI race where upfront spending can be enormous.
          </p>
          <p>
            The most material allocation question is not whether Alphabet can afford AI capex, but whether incremental
            dollars generate durable user value and acceptable returns. Investors should watch free-cash-flow conversion,
            cloud margin progression, and monetization velocity in AI-enhanced search and productivity tools.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900">5) Strategic risks and monitoring framework</h2>
          <p>
            Major risks include antitrust and platform regulation across key jurisdictions, shifts in search behavior,
            traffic-acquisition economics, and potential disintermediation from new AI interfaces. Additional execution risk
            comes from balancing product quality with rapid model deployment while preserving trust, safety, and compliance.
          </p>
          <p>
            A practical monitoring dashboard should track: search monetization efficiency, cloud profitability trajectory,
            model-serving unit economics, traffic acquisition cost trends, and net operating cash flow after infrastructure
            expansion. If these metrics remain healthy, Alphabet can sustain both growth and reinvestment without structural
            impairment to returns.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900">6) Base-case conclusion</h2>
          <p>
            The 10-year evidence suggests Alphabet remains one of the highest-quality compounding platforms in global large
            cap technology, supported by durable demand surfaces, large-scale data advantages, and deep cash-generation
            capacity. The valuation debate should therefore center on AI return-on-capital timelines rather than headline
            revenue growth alone.
          </p>
          <p>
            Base case: Alphabet continues to grow revenue and operating cash flow at attractive rates with periodic margin
            volatility driven by AI reinvestment cycles. Bull case: AI products produce incremental monetization faster than
            expected. Bear case: structural changes in user behavior or regulatory outcomes compress long-term margin power.
          </p>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">10-year data table (USD billions)</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-zinc-600">
                  <th className="py-2 pr-4">Year</th>
                  <th className="py-2 pr-4">Revenue</th>
                  <th className="py-2 pr-4">Operating income</th>
                  <th className="py-2 pr-4">Net income</th>
                  <th className="py-2 pr-4">Operating cash flow</th>
                </tr>
              </thead>
              <tbody>
                {GOOGLE_10Y_DATA.map((row) => (
                  <tr key={row.fiscalYear} className="border-b border-zinc-100">
                    <td className="py-2 pr-4">{row.fiscalYear}</td>
                    <td className="py-2 pr-4">{row.revenue.toFixed(1)}</td>
                    <td className="py-2 pr-4">{row.operatingIncome.toFixed(1)}</td>
                    <td className="py-2 pr-4">{row.netIncome.toFixed(1)}</td>
                    <td className="py-2 pr-4">{row.operatingCashFlow.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Source links</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-700">
            {GOOGLE_SOURCE_LINKS.map((source) => (
              <li key={source.href}>
                <a href={source.href} className="underline">
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
