import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smart Money 13F Report 2026",
  description:
    "Top hedge fund consensus buys, largest 13F additions, and AI platform valuation metrics for 2026.",
};

const consensusBuys = [
  ["1", "Microsoft", "MSFT", "Enterprise AI", "Copilot, Azure AI, OpenAI ecosystem, enterprise software lock-in"],
  ["2", "Alphabet", "GOOG / GOOGL", "AI Search + AI Infra", "Gemini, Search, YouTube, Cloud, TPU, AI distribution"],
  ["3", "Meta Platforms", "META", "AI Advertising", "AI recommendation, ad ROI, Reels, WhatsApp monetization"],
  ["4", "Amazon", "AMZN", "AWS AI Infrastructure", "AWS AI workloads, Bedrock, Trainium, advertising margin expansion"],
  ["5", "NVIDIA", "NVDA", "AI Compute", "GPU/data-center leadership, high FCF margin, AI capex beneficiary"],
  ["6", "MercadoLibre", "MELI", "Global Growth", "Latin America ecommerce, payments, credit, logistics, ads"],
  ["7", "Robinhood", "HOOD", "Next-Gen Finance", "Young investor platform, crypto, retirement, AI advisor, banking"],
  ["8", "Coinbase", "COIN", "Crypto Infrastructure", "Exchange, custody, stablecoin, tokenization infrastructure"],
  ["9", "Reddit", "RDDT", "AI Search/Data", "High-intent content, AI data licensing, Google search visibility"],
  ["10", "PayPal", "PYPL", "Value Fintech", "Low valuation, buybacks, Venmo, branded checkout stabilization"],
];

const addedPositions = [
  ["Microsoft", "Pershing Square", "~$2.09B new position", "Bill Ackman rotated into Microsoft as an enterprise AI compounder"],
  ["Delta Air Lines", "Berkshire Hathaway", "~$2.6B new position", "Cyclical recovery and travel cash-flow thesis"],
  ["Alphabet", "Berkshire Hathaway", "~17.8M to ~58M shares", "Berkshire materially expanded exposure to AI search/platform economics"],
  ["Amazon", "Viking Global", "Major add", "AWS AI acceleration and operating leverage"],
  ["Meta", "Coatue / Tiger-cub funds", "Major add", "AI advertising monetization and strong FCF"],
  ["MercadoLibre", "Tiger Global", "New / increased exposure", "Long-duration ecommerce + fintech compounder"],
  ["Robinhood", "Tiger Global", "New position", "Re-rating from trading app to financial platform"],
  ["Coinbase", "Crypto-focused funds", "Major add", "Crypto infrastructure and stablecoin ecosystem exposure"],
  ["Reddit", "Growth / AI funds", "Continued build", "AI search traffic and data monetization thesis"],
  ["PayPal", "Value-oriented funds", "Continued accumulation", "Low valuation, FCF, and buyback support"],
];

const metrics = [
  ["Microsoft", "MSFT", "~$3.4T", "~$95B", "~$80B", "+$15B", "~10x", "~33x", "~2.1x", "~15%", "~$92B", "~32%"],
  ["Alphabet", "GOOG + GOOGL", "~$4.7T-$4.8T", "~$125B", "~$28B", "+$97B", "~9x-10x", "~21x-29x", "~1.3x-1.7x", "~13%-18%", "~$73B-$82B", "~25%-28%"],
  ["Meta Platforms", "META", "~$1.7T", "~$82B", "~$29B", "+$53B", "~9x", "~24x", "~1.4x", "~18%", "~$63B", "~35%"],
  ["Amazon", "AMZN", "~$2.9T", "~$92B", "~$145B", "-$53B", "~8x-9x", "~36x", "~1.8x", "~14%-16%", "~$58B", "~12%"],
  ["NVIDIA", "NVDA", "~$4.8T-$5.0T", "~$78B", "~$11B", "+$67B", "~45x", "~35x-40x", "~1.1x", "~45%", "~$82B+", "~50%"],
  ["MercadoLibre", "MELI", "~$105B", "~$8.5B", "~$5.8B", "+$2.7B", "~18x", "~48x", "~1.7x", "~28%", "~$2.2B", "~15%"],
  ["Robinhood", "HOOD", "~$58B", "~$11B", "~$4.0B", "+$7B", "~5x", "~29x", "~1.5x", "~30%", "~$1.8B", "~25%"],
  ["Coinbase", "COIN", "~$78B", "~$13B", "~$4.4B", "+$8.6B", "~6x", "~31x", "~1.9x", "~35%", "~$2.4B", "~22%"],
  ["Reddit", "RDDT", "~$32B", "~$2.3B", "~$0.2B", "+$2.1B", "~9x", "~52x", "~2.3x", "~40%", "~$0.3B", "~8%"],
  ["PayPal", "PYPL", "~$78B", "~$16B", "~$12B", "+$4B", "~4x", "~13x", "~0.9x", "~8%", "~$6.0B", "~24%"],
];

const relativeValuation = [
  ["NVIDIA", "~$4.8T-$5.0T", "~35x-40x", "+$67B", "AI compute leadership"],
  ["Alphabet", "~$4.7T-$4.8T", "~21x-29x", "+$97B", "AI search + cloud + TPU + Gemini"],
  ["Microsoft", "~$3.4T", "~33x", "+$15B", "Enterprise AI + Azure + Copilot"],
  ["Amazon", "~$2.9T", "~36x", "-$53B", "AWS AI infrastructure"],
  ["Meta", "~$1.7T", "~24x", "+$53B", "AI advertising monetization"],
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-semibold md:text-3xl">{title}</h2>
      <div className="mt-5 space-y-4 text-zinc-700">{children}</div>
    </section>
  );
}

function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-200">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-zinc-100 text-zinc-700">
          <tr>
            {headers.map((header) => (
              <th key={header} className="whitespace-nowrap px-4 py-3 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 bg-white">
          {rows.map((row) => (
            <tr key={row.join("-")} className="align-top">
              {row.map((cell, index) => (
                <td key={`${row[0]}-${index}`} className="whitespace-nowrap px-4 py-3 text-zinc-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MetricCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
      <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
      <p className="mt-2 text-sm text-zinc-600">{note}</p>
    </div>
  );
}

export default function SmartMoney13FReportPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm md:p-12">
          <a href="/research" className="text-sm font-medium text-zinc-600 underline">
            Back to research library
          </a>
          <p className="mt-6 text-sm uppercase tracking-[0.28em] text-zinc-500">13F Research</p>
          <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-tight md:text-6xl">
            Smart Money 13F Report 2026
          </h1>
          <p className="mt-5 max-w-4xl text-lg text-zinc-600 md:text-xl">
            Top hedge fund consensus buys, largest new positions, and detailed valuation metrics across the AI platform economy.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <MetricCard label="Alphabet correction" value="$4.7T-$4.8T" note="Combined GOOG + GOOGL market value reference." />
            <MetricCard label="Main rotation" value="AI cash flow" note="Institutions favor platforms already monetizing AI." />
            <MetricCard label="Core leaders" value="MSFT / GOOG / META / NVDA" note="Dominant AI platform and infrastructure positions." />
          </div>
        </header>

        <Section title="Executive Summary">
          <p>
            Top hedge fund 13F filings in Q1 2026 show a strong institutional concentration into AI platforms, AI infrastructure, and high free-cash-flow technology leaders.
          </p>
          <p className="rounded-2xl bg-zinc-100 p-4 text-lg font-medium text-zinc-900">
            Smart money is moving from AI concept stocks into AI platforms that already convert scale, data, infrastructure, and distribution into durable free cash flow.
          </p>
          <p>
            The largest consensus buy themes include enterprise AI, AI search, AI advertising, AI cloud infrastructure, crypto rails, and next-generation financial platforms.
          </p>
        </Section>

        <Section title="Important Alphabet Market Cap Correction">
          <p>
            Alphabet should be analyzed using the combined economic value of GOOG and GOOGL, not only one share class. The corrected 2026 market value reference used in this report is approximately $4.7T-$4.8T.
          </p>
          <p>
            This changes the conclusion materially: Alphabet is no longer just a cheaper mega-cap AI recovery story. It has become one of the world&apos;s largest AI platform companies by market value while still trading below several AI peers on forward earnings.
          </p>
        </Section>

        <Section title="Top 10 Hedge Fund Consensus Buys">
          <DataTable
            headers={["Rank", "Company", "Ticker", "Core Theme", "Institutional Thesis"]}
            rows={consensusBuys}
          />
        </Section>

        <Section title="Largest New / Added Positions">
          <DataTable
            headers={["Stock", "Fund", "Added Position / Filing Signal", "Why It Matters"]}
            rows={addedPositions}
          />
        </Section>

        <Section title="Detailed Fundamental Comparison">
          <p>
            Approximate snapshot values are rounded for research readability. Market values move daily; valuation multiples depend on price and forward estimate changes.
          </p>
          <DataTable
            headers={[
              "Company",
              "Ticker",
              "Market Cap",
              "Cash",
              "Debt",
              "Net Cash/(Debt)",
              "PB",
              "Forward PE",
              "PEG",
              "Revenue Growth",
              "FCF",
              "FCF Margin",
            ]}
            rows={metrics}
          />
        </Section>

        <Section title="Relative Valuation: Mega-Cap AI Platforms">
          <DataTable
            headers={["Company", "Market Cap", "Forward PE", "Net Cash/(Debt)", "Strategic AI Position"]}
            rows={relativeValuation}
          />
        </Section>

        <Section title="Key Observations">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-zinc-50 p-5">
              <h3 className="text-xl font-semibold">Alphabet has re-rated into a top-tier AI platform</h3>
              <p className="mt-3">
                Alphabet&apos;s corrected market value is now near $4.8T, not the earlier ~$3.1T estimate. It is being valued as an AI infrastructure hyperscaler, AI search leader, Gemini platform owner, YouTube monetization platform, and TPU compute competitor.
              </p>
            </div>
            <div className="rounded-2xl bg-zinc-50 p-5">
              <h3 className="text-xl font-semibold">NVIDIA remains the AI compute cash-flow leader</h3>
              <p className="mt-3">
                NVIDIA combines high AI demand, accelerator leadership, pricing power, and very high free-cash-flow margin. Some fund trimming looks more like risk management than a clean bearish signal.
              </p>
            </div>
            <div className="rounded-2xl bg-zinc-50 p-5">
              <h3 className="text-xl font-semibold">Microsoft remains the safest enterprise AI compounder</h3>
              <p className="mt-3">
                Microsoft can attach AI monetization to Office, Windows, Azure, GitHub, Dynamics, and enterprise security, making it one of the most durable long-term AI compounders.
              </p>
            </div>
            <div className="rounded-2xl bg-zinc-50 p-5">
              <h3 className="text-xl font-semibold">Meta is one of the clearest AI monetization stories</h3>
              <p className="mt-3">
                AI recommendation directly improves engagement, Reels monetization, ad targeting, and return on ad spend, creating a strong revenue growth and free-cash-flow profile.
              </p>
            </div>
          </div>
        </Section>

        <Section title="Quality Rankings">
          <DataTable
            headers={["Tier", "Stocks", "Rationale"]}
            rows={[
              ["S+", "Alphabet, Microsoft", "Global AI platforms with huge distribution and FCF"],
              ["S", "NVIDIA, Meta", "AI compute and AI ad monetization leaders"],
              ["A", "Amazon, MercadoLibre, Robinhood", "Strong growth or platform optionality"],
              ["B+", "Coinbase, PayPal", "High beta / value fintech exposure"],
              ["B", "Reddit", "Strong AI data/search thesis but higher valuation risk"],
            ]}
          />
        </Section>

        <Section title="Final Conclusion">
          <p>
            The 2026 institutional positioning shift is clear: AI investing is moving from speculative concepts toward scalable cash-flow platforms.
          </p>
          <p>
            The biggest winners are companies that own enterprise distribution, consumer attention, AI compute infrastructure, proprietary data, cloud platforms, financial rails, and high free cash flow.
          </p>
          <p className="rounded-2xl bg-zinc-900 p-5 text-lg font-medium text-white">
            Current smart-money leadership remains concentrated in Alphabet, Microsoft, NVIDIA, Meta, and Amazon. These companies are becoming the core infrastructure layer of the global AI economy.
          </p>
        </Section>

        <footer className="rounded-3xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600 shadow-sm">
          <p>
            Disclaimer: This report is for research and educational purposes only. It is not financial advice, investment advice, or a recommendation to buy or sell securities. All financial metrics are rounded estimates and should be verified against official filings, company reports, and live market data before making investment decisions.
          </p>
        </footer>
      </div>
    </main>
  );
}
