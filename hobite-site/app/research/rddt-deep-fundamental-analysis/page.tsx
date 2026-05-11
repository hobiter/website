import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reddit RDDT Deep Fundamental Analysis",
  description: "Reddit public-company quarterly revenue, EBITDA, platform economics, and long-term outlook.",
};

const QUARTERS = [
  ["2024 Q1", "$243M", "48%", "$10M", "4%", "82.7M"],
  ["2024 Q2", "$281M", "54%", "$39.5M", "14%", "91.2M"],
  ["2024 Q3", "$348M", "68%", "$94M", "27%", "97.2M"],
  ["2024 Q4", "$428M", "71%", "$154M", "36%", "101.7M"],
  ["2025 Q1", "$392M", "61%", "$115M", "29%", "108.1M"],
  ["2025 Q2", "$500M", "78%", "$167M", "33%", "110.4M"],
  ["2025 Q3", "$585M", "68%", "$236M", "40%", "116.0M"],
  ["2025 Q4", "$726M", "70%", "$327M", "45%", "121.4M"],
  ["2026 Q1", "$663M", "69%", "$266M", "40%", "126.8M"],
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-semibold">{title}</h2>
      <div className="mt-5 space-y-5 leading-8 text-zinc-700">{children}</div>
    </section>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-[2rem] border border-zinc-200 bg-white p-10 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Equity Research</p>
          <h1 className="mt-5 text-5xl font-semibold leading-tight md:text-7xl">Reddit (RDDT) Deep Fundamental Analysis</h1>
          <p className="mt-6 max-w-4xl text-xl text-zinc-600">A public-company quarterly review of Reddit revenue, adjusted EBITDA, user growth, platform economics, AI impact, valuation, risks, and 10-year scenarios.</p>
          <a href="/zh/research/rddt-deep-fundamental-analysis" className="mt-6 inline-block rounded-2xl border border-zinc-300 px-5 py-3 text-sm">中文版本</a>
        </header>

        <Section title="Executive Summary">
          <p>Reddit is one of the most differentiated public internet platforms because its core asset is not only attention, but structured communities and authentic human discussion around real problems, interests, products, and experiences.</p>
          <p>The investment question is whether Reddit remains a better-monetized community forum or becomes a human knowledge graph and answer layer for the AI internet.</p>
        </Section>

        <Section title="Quarterly Revenue and Adjusted EBITDA">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead><tr className="bg-zinc-100"><th className="border p-3">Quarter</th><th className="border p-3">Revenue</th><th className="border p-3">YoY</th><th className="border p-3">Adj EBITDA</th><th className="border p-3">Margin</th><th className="border p-3">DAUq</th></tr></thead>
              <tbody>{QUARTERS.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell} className="border p-3">{cell}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </Section>

        <Section title="Business Model">
          <p>Reddit revenue is primarily advertising, supported by other revenue such as data licensing and premium products. Its strongest long-term advantage is the breadth of topic communities and the archive of searchable discussions.</p>
          <p>Compared with traditional social networks, Reddit is less about personal identity and more about questions, decisions, recommendations, and lived experience.</p>
        </Section>

        <Section title="AI Impact">
          <p>AI makes Reddit more strategically important because authentic human discussion becomes scarcer as synthetic content grows across the web.</p>
          <p>Potential benefits include training data licensing, AI-powered advertising, Reddit Answers, better search, better recommendation, and new ways to monetize user intent.</p>
          <p>Risks include AI search reducing referral traffic, AI-generated spam, content quality dilution, and uncertainty around long-term data licensing pricing.</p>
        </Section>

        <Section title="Financial Profile">
          <ul className="list-disc space-y-2 pl-6">
            <li>TTM revenue around $2.5B</li>
            <li>Gross margin around 91%</li>
            <li>Free cash flow margin above many internet peers</li>
            <li>Cash and investments around $2.8B</li>
            <li>Very low debt</li>
          </ul>
        </Section>

        <Section title="10-Year Outlook">
          <p>Conservative case: revenue reaches roughly $9B by 2035 if user growth slows and monetization improves gradually.</p>
          <p>Base case: revenue reaches roughly $15B by 2035 if advertising, search, international monetization, and data licensing compound together.</p>
          <p>Bull case: revenue reaches $25B or more if Reddit becomes a durable human knowledge and answer layer for AI search.</p>
        </Section>

        <Section title="Conclusion">
          <p>Reddit is not a low-risk stock, but it is one of the most interesting AI-era application-layer assets. The upside depends on whether it can preserve authentic communities while improving advertising, search, international monetization, and AI data products.</p>
        </Section>
      </div>
    </main>
  );
}
