import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oracle (ORCL) 15-Year Fundamental Analysis",
  description:
    "Quarterly revenue, EBITDA margin, OCI growth, AI infrastructure thesis, assets, liabilities, cash, and 10-year outlook for Oracle.",
};

const METRICS = [
  {
    label: "Q3 FY2026 Revenue",
    value: "$17.2B",
    note: "Oracle returned to hyper-scale growth driven by OCI and AI demand.",
  },
  {
    label: "Cloud Revenue Growth",
    value: "+44%",
    note: "Cloud became the core narrative shift in Oracle's investment thesis.",
  },
  {
    label: "OCI Growth",
    value: "+84%",
    note: "OCI is now one of the fastest-growing large cloud infrastructure businesses.",
  },
  {
    label: "Core Thesis",
    value: "AI + OCI",
    note: "Oracle is evolving into an AI cloud infrastructure and database platform.",
  },
];

const REVENUE = [
  [2012,37],
  [2013,37],
  [2014,38],
  [2015,38],
  [2016,37],
  [2017,37],
  [2018,40],
  [2019,40],
  [2020,39],
  [2021,40],
  [2022,42],
  [2023,50],
  [2024,53],
  [2025,57],
  [2026,67],
];

const OUTLOOK = [
  [2026,67],
  [2027,90],
  [2028,104],
  [2029,119],
  [2030,136],
  [2031,153],
  [2032,170],
  [2033,188],
  [2034,207],
  [2035,228],
];

const BALANCE_SHEET = [
  [2012,78,34,31],
  [2014,90,43,39],
  [2016,112,64,56],
  [2018,138,91,67],
  [2020,115,103,43],
  [2022,109,115,22],
  [2024,141,132,11],
  [2026,205,175,20],
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-semibold">{title}</h2>
      <div className="mt-5 space-y-5 leading-8 text-zinc-700">{children}</div>
    </section>
  );
}

function RevenueChart() {
  const max = 70;

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-semibold">Annual Revenue</h2>
      <p className="mt-3 text-zinc-600">
        Oracle spent nearly a decade as a low-growth software giant before OCI and AI demand accelerated growth again.
      </p>

      <div className="mt-10 flex h-[420px] items-end gap-3 overflow-x-auto">
        {REVENUE.map(([year, value]) => {
          const height = (value / max) * 320;
          return (
            <div key={year} className="flex min-w-[60px] flex-col items-center gap-3">
              <div className="text-xs text-zinc-500">${value}B</div>
              <div className="w-12 rounded-t-2xl bg-zinc-900" style={{ height }} />
              <div className="text-xs text-zinc-500">{year}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function OutlookChart() {
  const max = 240;

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-semibold">10-Year Revenue Outlook</h2>
      <p className="mt-3 text-zinc-600">
        Scenario framework based on OCI expansion, AI infrastructure demand, and multi-cloud database adoption.
      </p>

      <div className="mt-10 flex h-[420px] items-end gap-3 overflow-x-auto">
        {OUTLOOK.map(([year, value]) => {
          const height = (value / max) * 320;
          return (
            <div key={year} className="flex min-w-[70px] flex-col items-center gap-3">
              <div className="text-xs text-zinc-500">${value}B</div>
              <div className="w-14 rounded-t-2xl bg-blue-600" style={{ height }} />
              <div className="text-xs text-zinc-500">{year}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function BalanceSheetChart() {
  const max = 220;

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-semibold">Assets vs Liabilities vs Cash</h2>
      <p className="mt-3 text-zinc-600">
        Oracle's balance sheet expanded dramatically during the cloud and AI infrastructure era.
      </p>

      <div className="mt-10 overflow-x-auto">
        <div className="flex min-w-[920px] items-end gap-6">
          {BALANCE_SHEET.map(([year, assets, liabilities, cash]) => (
            <div key={year} className="flex flex-col items-center gap-4">
              <div className="flex items-end gap-2 h-[320px]">
                <div
                  className="w-10 rounded-t-xl bg-zinc-900"
                  style={{ height: `${(assets / max) * 300}px` }}
                />
                <div
                  className="w-10 rounded-t-xl bg-red-500"
                  style={{ height: `${(liabilities / max) * 300}px` }}
                />
                <div
                  className="w-10 rounded-t-xl bg-green-500"
                  style={{ height: `${(cash / max) * 300}px` }}
                />
              </div>

              <div className="text-xs text-zinc-500">{year}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-5 text-sm text-zinc-600">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-zinc-900" /> Assets
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500" /> Liabilities
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500" /> Cash
          </div>
        </div>
      </div>
    </section>
  );
}

export default function OracleAnalysisPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-[2rem] border border-zinc-200 bg-white p-10 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Equity Research
          </p>

          <h1 className="mt-5 max-w-6xl text-5xl font-semibold leading-tight md:text-7xl">
            Oracle (ORCL) 15-Year Fundamental Analysis
          </h1>

          <p className="mt-6 max-w-5xl text-xl text-zinc-600">
            Long-form research into Oracle's transformation from legacy enterprise software giant into an AI infrastructure and cloud platform company.
          </p>
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

        <RevenueChart />
        <OutlookChart />
        <BalanceSheetChart />

        <div className="grid gap-8 lg:grid-cols-2">
          <Section title="1. Investment Thesis">
            <p>
              Oracle has shifted from a slow-growth enterprise software company into a leveraged AI cloud infrastructure story.
            </p>

            <p>
              OCI growth, AI workloads, multi-cloud database demand, and massive RPO expansion fundamentally changed investor perception of Oracle.
            </p>
          </Section>

          <Section title="2. OCI and AI">
            <p>
              OCI is now the core growth engine.
            </p>

            <ul className="list-disc space-y-2 pl-6">
              <li>AI training infrastructure</li>
              <li>Inference workloads</li>
              <li>GPU clusters</li>
              <li>Database cloud services</li>
              <li>Multi-cloud integrations</li>
            </ul>

            <p>
              Oracle increasingly behaves more like an AI infrastructure company than a traditional software vendor.
            </p>
          </Section>

          <Section title="3. Financial Transformation">
            <p>
              From 2011 to 2021 Oracle revenue barely grew.
            </p>

            <p>
              The company remained highly profitable, but growth was limited.
            </p>

            <p>
              The recent acceleration came from:
            </p>

            <ul className="list-disc space-y-2 pl-6">
              <li>OCI growth</li>
              <li>Cerner acquisition</li>
              <li>Cloud ERP adoption</li>
              <li>AI infrastructure demand</li>
            </ul>
          </Section>

          <Section title="4. Margins and Profitability">
            <p>
              Oracle historically maintained extremely high margins.
            </p>

            <p>
              The key future question is whether cloud infrastructure economics can preserve software-like profitability.
            </p>

            <p>
              AI infrastructure requires:
            </p>

            <ul className="list-disc space-y-2 pl-6">
              <li>GPU spending</li>
              <li>Data centers</li>
              <li>Power contracts</li>
              <li>Networking infrastructure</li>
            </ul>
          </Section>

          <Section title="5. Balance Sheet Risk">
            <p>
              Oracle's balance sheet has become much more leveraged.
            </p>

            <p>
              Liabilities expanded significantly due to acquisitions, buybacks, and AI infrastructure spending.
            </p>

            <p>
              Investors should monitor:
            </p>

            <ul className="list-disc space-y-2 pl-6">
              <li>Debt growth</li>
              <li>Interest expense</li>
              <li>CapEx intensity</li>
              <li>Cash generation</li>
            </ul>
          </Section>

          <Section title="6. Competitive Position">
            <p>
              Oracle competes with AWS, Azure, Google Cloud, SAP, Salesforce, Snowflake, and many database vendors.
            </p>

            <p>
              The company's advantage comes from:
            </p>

            <ul className="list-disc space-y-2 pl-6">
              <li>Database moat</li>
              <li>Enterprise relationships</li>
              <li>Mission-critical workloads</li>
              <li>Multi-cloud database architecture</li>
            </ul>
          </Section>

          <Section title="7. RPO and Backlog">
            <p>
              Oracle's RPO expansion is one of the most important metrics in the story.
            </p>

            <p>
              Massive AI infrastructure contracts create long-duration visibility, but also require substantial capital deployment.
            </p>
          </Section>

          <Section title="8. Long-Term Outlook">
            <p>
              Bull case assumes Oracle becomes one of the world's dominant AI cloud infrastructure providers.
            </p>

            <p>
              Base case assumes sustained OCI growth and database cloud expansion.
            </p>

            <p>
              Bear case assumes cloud competition and infrastructure spending pressure returns.
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}
