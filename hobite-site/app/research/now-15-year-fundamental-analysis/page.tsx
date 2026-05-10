import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ServiceNow (NOW) 15-Year Fundamental Analysis",
  description:
    "Quarterly revenue, EBITDA margin, AI workflow thesis, RPO analysis, and 10-year outlook for ServiceNow.",
};

const METRICS = [
  {
    label: "2025 Revenue",
    value: "$13.3B",
    note: "One of the fastest large-scale enterprise software compounders.",
  },
  {
    label: "Revenue CAGR",
    value: "37%",
    note: "2012–2025 revenue CAGR based on public filings.",
  },
  {
    label: "2025 EBITDA",
    value: "$3.18B",
    note: "Operating leverage has become structurally visible.",
  },
  {
    label: "Core Thesis",
    value: "AI Workflow OS",
    note: "ServiceNow aims to become the orchestration layer for enterprise AI work.",
  },
];

const YEARS = [
  [2012,0.24],
  [2013,0.42],
  [2014,0.68],
  [2015,1.01],
  [2016,1.39],
  [2017,1.92],
  [2018,2.61],
  [2019,3.46],
  [2020,4.52],
  [2021,5.90],
  [2022,7.25],
  [2023,8.97],
  [2024,10.98],
  [2025,13.28],
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-semibold">{title}</h2>
      <div className="mt-5 space-y-5 leading-8 text-zinc-700">{children}</div>
    </section>
  );
}

function RevenueGrowthChart() {
  const max = 14;

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-semibold">Annual Revenue Growth</h2>
      <p className="mt-3 text-zinc-600">
        ServiceNow scaled from roughly $244M revenue in 2012 to over $13B in 2025.
      </p>

      <div className="mt-10 flex h-[420px] items-end gap-3 overflow-x-auto">
        {YEARS.map(([year, revenue]) => {
          const height = (revenue / max) * 320;
          return (
            <div key={year} className="flex min-w-[58px] flex-col items-center gap-3">
              <div className="text-xs text-zinc-500">${revenue.toFixed(1)}B</div>
              <div
                className="w-12 rounded-t-2xl bg-zinc-900"
                style={{ height }}
              />
              <div className="text-xs text-zinc-500">{year}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function OutlookChart() {
  const outlook = [
    [2026,16],
    [2027,18],
    [2028,21],
    [2029,24],
    [2030,28],
    [2031,31],
    [2032,34],
    [2033,37],
    [2034,40],
    [2035,46],
  ];

  const max = 50;

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-semibold">10-Year Revenue Outlook</h2>
      <p className="mt-3 text-zinc-600">
        Base-case scenario assuming sustained AI workflow adoption and enterprise platform expansion.
      </p>

      <div className="mt-10 flex h-[420px] items-end gap-3 overflow-x-auto">
        {outlook.map(([year, revenue]) => {
          const height = (revenue / max) * 320;
          return (
            <div key={year} className="flex min-w-[64px] flex-col items-center gap-3">
              <div className="text-xs text-zinc-500">${revenue}B</div>
              <div
                className="w-14 rounded-t-2xl bg-blue-600"
                style={{ height }}
              />
              <div className="text-xs text-zinc-500">{year}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function NowAnalysisPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-[2rem] border border-zinc-200 bg-white p-10 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Equity Research
          </p>

          <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-tight md:text-7xl">
            ServiceNow (NOW) 15-Year Fundamental Analysis
          </h1>

          <p className="mt-6 max-w-4xl text-xl text-zinc-600">
            Deep-dive research into ServiceNow's quarterly revenue growth, EBITDA expansion, AI workflow thesis, competitive moat, and 10-year outlook.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/"
              className="rounded-2xl border border-zinc-300 px-5 py-3 text-sm"
            >
              Back Home
            </a>
          </div>
        </header>

        <div className="grid gap-5 md:grid-cols-4">
          {METRICS.map((metric) => (
            <div
              key={metric.label}
              className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-zinc-500">{metric.label}</p>
              <p className="mt-3 text-4xl font-semibold">{metric.value}</p>
              <p className="mt-4 text-sm text-zinc-600">{metric.note}</p>
            </div>
          ))}
        </div>

        <RevenueGrowthChart />
        <OutlookChart />

        <div className="grid gap-8 lg:grid-cols-2">
          <Section title="1. Core Investment Thesis">
            <p>
              ServiceNow is evolving from an IT service management platform into a broader enterprise workflow operating system. The long-term opportunity is not merely workflow digitization, but AI-driven orchestration of enterprise work across humans, agents, approvals, systems, and data.
            </p>

            <p>
              If AI agents become mainstream inside enterprises, ServiceNow may become one of the most important control layers because enterprises still need governance, permissions, auditability, routing, security, and integrations.
            </p>
          </Section>

          <Section title="2. Why NOW Is Different">
            <p>
              Many SaaS companies sell point solutions. ServiceNow increasingly acts as a platform layer connecting systems together.
            </p>

            <ul className="list-disc space-y-2 pl-6">
              <li>IT Service Management</li>
              <li>Customer workflows</li>
              <li>HR workflows</li>
              <li>Security operations</li>
              <li>AI orchestration</li>
              <li>Enterprise automation</li>
            </ul>

            <p>
              This gives ServiceNow unusually strong expansion economics and high switching costs.
            </p>
          </Section>

          <Section title="3. Financial Quality">
            <p>
              Revenue quality is exceptionally high because the business is subscription-heavy, enterprise-focused, and deeply embedded into operational workflows.
            </p>

            <p>
              The revenue curve through multiple macro cycles shows that ServiceNow behaves more like a mission-critical platform than discretionary software.
            </p>
          </Section>

          <Section title="4. AI Opportunity">
            <p>
              The AI thesis for ServiceNow is larger than copilots or chatbots.
            </p>

            <p>
              The company wants to become the orchestration layer for enterprise AI agents.
            </p>

            <ul className="list-disc space-y-2 pl-6">
              <li>Agent routing</li>
              <li>Workflow automation</li>
              <li>Security and governance</li>
              <li>Approval systems</li>
              <li>Cross-platform orchestration</li>
            </ul>
          </Section>

          <Section title="5. Margin Expansion">
            <p>
              One of the most important developments over the past decade has been operating leverage.
            </p>

            <p>
              EBITDA margins have structurally improved as revenue scaled. If revenue continues compounding while sales and infrastructure costs grow slower than revenue, margins could continue expanding toward the low-30% range over time.
            </p>
          </Section>

          <Section title="6. Competitive Risks">
            <p>
              Key competitors include Salesforce, Microsoft, Atlassian, SAP, Oracle, Workday, and AI-native workflow startups.
            </p>

            <p>
              The major long-term risk is whether general-purpose AI agents reduce the need for structured workflow software.
            </p>

            <p>
              However, enterprise governance complexity may actually increase the value of orchestration platforms like ServiceNow.
            </p>
          </Section>

          <Section title="7. Long-Term Outlook">
            <p>
              Base-case scenario assumes NOW can compound revenue in the mid-teens for many years while gradually expanding EBITDA and free cash flow margins.
            </p>

            <p>
              Bull-case scenario assumes ServiceNow becomes a dominant enterprise AI workflow operating layer, supporting revenue potentially above $40B over the next decade.
            </p>
          </Section>

          <Section title="8. Final Conclusion">
            <p>
              ServiceNow is one of the highest-quality enterprise software businesses globally.
            </p>

            <p>
              The key question is no longer whether the company can grow, but whether AI expands its strategic importance enough to justify premium valuation multiples for another decade.
            </p>

            <p>
              Investors should closely monitor:
            </p>

            <ul className="list-disc space-y-2 pl-6">
              <li>Subscription revenue growth</li>
              <li>cRPO growth</li>
              <li>AI adoption</li>
              <li>Margin expansion</li>
              <li>Large customer growth</li>
              <li>Free cash flow margin</li>
            </ul>
          </Section>
        </div>
      </div>
    </main>
  );
}
