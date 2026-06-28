import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salesforce (CRM) 15-Year Fundamental Analysis",
  description:
    "Salesforce 15-year revenue, EBITDA margin, balance sheet, Agentforce AI thesis, and 10-year outlook.",
};

const METRICS = [
  {
    label: "FY2026 Revenue",
    value: "$41.5B",
    note: "Revenue scaled from $2.3B in FY2012 to over $41B in FY2026.",
  },
  {
    label: "FY2026 Non-GAAP Margin",
    value: "34.1%",
    note: "The efficiency pivot transformed CRM into a cash-flow compounder.",
  },
  {
    label: "FY2026 FCF",
    value: "$14.4B",
    note: "Strong cash generation supports buybacks, dividends, and M&A.",
  },
  {
    label: "Core Thesis",
    value: "Agentic CRM",
    note: "Agentforce and Data Cloud aim to make Salesforce the AI work layer for customer operations.",
  },
];

const REVENUE = [
  [2012,2.3],[2013,3.1],[2014,4.1],[2015,5.4],[2016,6.7],
  [2017,8.4],[2018,10.5],[2019,13.3],[2020,17.1],[2021,21.3],
  [2022,26.5],[2023,31.4],[2024,34.9],[2025,37.9],[2026,41.5],
];

const OUTLOOK = [
  [2027,46],[2028,51],[2029,56.5],[2030,63],[2031,69.5],
  [2032,76],[2033,82.5],[2034,89],[2035,95.5],[2036,102],
];

const BALANCE_SHEET = [
  [2012,4.2,2.6,0.8],[2014,9.2,6.1,0.8],[2016,12.8,7.8,2.7],
  [2018,22.0,11.6,4.5],[2020,55.1,21.2,7.9],[2022,95.2,37.1,10.5],
  [2024,99.8,40.2,14.2],[2026,95.1,35.1,11.3],
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-semibold">{title}</h2>
      <div className="mt-5 space-y-5 leading-8 text-zinc-700">{children}</div>
    </section>
  );
}

function BarChart({ title, subtitle, data, max, color = "bg-zinc-900" }: { title: string; subtitle: string; data: number[][]; max: number; color?: string }) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-semibold">{title}</h2>
      <p className="mt-3 text-zinc-600">{subtitle}</p>
      <div className="mt-10 flex h-[420px] items-end gap-3 overflow-x-auto">
        {data.map(([year, value]) => {
          const height = (value / max) * 320;
          return (
            <div key={year} className="flex min-w-[62px] flex-col items-center gap-3">
              <div className="text-xs text-zinc-500">${value}B</div>
              <div className={`w-12 rounded-t-2xl ${color}`} style={{ height }} />
              <div className="text-xs text-zinc-500">{year}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function BalanceSheetChart() {
  const max = 105;
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-semibold">Assets vs Liabilities vs Cash</h2>
      <p className="mt-3 text-zinc-600">Salesforce expanded the balance sheet through MuleSoft, Tableau, Slack, and Informatica, while staying cash-rich.</p>
      <div className="mt-10 overflow-x-auto">
        <div className="flex min-w-[920px] items-end gap-6">
          {BALANCE_SHEET.map(([year, assets, liabilities, cash]) => (
            <div key={year} className="flex flex-col items-center gap-4">
              <div className="flex h-[320px] items-end gap-2">
                <div className="w-10 rounded-t-xl bg-zinc-900" style={{ height: `${(assets / max) * 300}px` }} />
                <div className="w-10 rounded-t-xl bg-red-500" style={{ height: `${(liabilities / max) * 300}px` }} />
                <div className="w-10 rounded-t-xl bg-green-500" style={{ height: `${(cash / max) * 300}px` }} />
              </div>
              <div className="text-xs text-zinc-500">{year}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-5 text-sm text-zinc-600">
          <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-zinc-900" />Assets</span>
          <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-red-500" />Liabilities</span>
          <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-green-500" />Cash</span>
        </div>
      </div>
    </section>
  );
}

export default function CrmAnalysisPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-[2rem] border border-zinc-200 bg-white p-10 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Equity Research</p>
          <h1 className="mt-5 max-w-6xl text-5xl font-semibold leading-tight md:text-7xl">
            Salesforce (CRM) 15-Year Fundamental Analysis
          </h1>
          <p className="mt-6 max-w-5xl text-xl text-zinc-600">
            A deep-dive into Salesforce's evolution from hypergrowth SaaS into a cash-generative AI CRM platform built around Agentforce, Data Cloud, and enterprise workflow automation.
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-4">
          {METRICS.map((metric) => (
            <div key={metric.label} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-zinc-500">{metric.label}</p>
              <p className="mt-3 text-4xl font-semibold">{metric.value}</p>
              <p className="mt-4 text-sm text-zinc-600">{metric.note}</p>
            </div>
          ))}
        </div>

        <BarChart title="Annual Revenue" subtitle="Salesforce compounded from $2.3B in FY2012 to $41.5B in FY2026." data={REVENUE} max={45} />
        <BarChart title="10-Year Revenue Outlook" subtitle="Base case anchored to Salesforce's FY2030 $63B revenue target, with gradual deceleration afterward." data={OUTLOOK} max={110} color="bg-blue-600" />
        <BalanceSheetChart />

        <div className="grid gap-8 lg:grid-cols-2">
          <Section title="1. Investment Thesis">
            <p>Salesforce is no longer a pure hypergrowth SaaS story. It is now a mature, cash-rich enterprise platform attempting to reinvent itself for the agentic AI era.</p>
            <p>The core question: does AI commoditize traditional CRM seats, or does Salesforce become the trusted customer-data and workflow layer where AI agents actually do enterprise work?</p>
          </Section>

          <Section title="2. Business Model">
            <p>Salesforce monetizes mostly through subscription and support revenue across Sales Cloud, Service Cloud, Marketing, Commerce, Platform, Data Cloud, MuleSoft, Tableau, Slack, and Agentforce.</p>
            <p>Its strength is customer data gravity, process depth, AppExchange, enterprise integrations, and the fact that customer-facing workflows are mission-critical.</p>
          </Section>

          <Section title="3. Profitability Transformation">
            <p>The most important change since FY2023 is the margin pivot. Salesforce moved from growth-first SaaS to an efficiency-driven compounder, reporting FY2026 non-GAAP operating margin of 34.1%.</p>
            <p>This changed the valuation framework from revenue multiple to durable FCF yield plus AI-driven growth optionality.</p>
          </Section>

          <Section title="4. Agentforce and AI">
            <p>Agentforce is Salesforce's attempt to become the execution layer for enterprise AI agents.</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>AI agents for sales and service workflows</li>
              <li>Data Cloud as the governed enterprise data layer</li>
              <li>Slack as a collaboration interface</li>
              <li>MuleSoft for integration and automation</li>
              <li>Tableau and analytics for insight delivery</li>
            </ul>
          </Section>

          <Section title="5. Data Cloud and Informatica">
            <p>Enterprise AI requires clean, connected, governed data. The Informatica acquisition is strategically important because it strengthens data integration, data quality, and governance.</p>
            <p>If Salesforce can own the trusted data fabric for customer operations, AI becomes a growth layer rather than a threat.</p>
          </Section>

          <Section title="6. Balance Sheet and Capital Return">
            <p>Salesforce has a healthier balance sheet than AI infrastructure companies because it is not required to spend heavily on GPUs or data centers.</p>
            <p>Strong free cash flow supports buybacks, dividends, and strategic M&A, but investors should watch acquisition returns and stock-based compensation.</p>
          </Section>

          <Section title="7. Competitive Risks">
            <p>Microsoft is the most important ecosystem risk because it owns Office, Teams, Azure, LinkedIn, and Copilot. Salesforce also competes with Oracle, SAP, ServiceNow, HubSpot, Adobe, and AI-native startups.</p>
            <p>The bear case is that AI-native workflows reduce SaaS seat expansion and pressure pricing power.</p>
          </Section>

          <Section title="8. What to Monitor">
            <ul className="list-disc space-y-2 pl-6">
              <li>Organic subscription growth</li>
              <li>cRPO and RPO</li>
              <li>Agentforce ARR</li>
              <li>Data Cloud adoption</li>
              <li>Non-GAAP operating margin</li>
              <li>Free cash flow margin</li>
              <li>Buyback effectiveness</li>
            </ul>
          </Section>
        </div>
      </div>
    </main>
  );
}
