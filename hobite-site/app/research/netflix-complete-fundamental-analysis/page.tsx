import type { Metadata } from "next";
import {
  NFLX_CHART_GROUPS,
  NFLX_IMPLEMENTATION_MILESTONES,
  NFLX_RESEARCH_SECTIONS,
  NFLX_SOURCE_SYSTEMS,
} from "./researchPlan";

export const metadata: Metadata = {
  title: "Netflix (NFLX) Complete Fundamental Research Hub",
  description:
    "Project hub for Hobite Capital's institutional-grade Netflix fundamental research report.",
};

function MetricCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-zinc-950">{value}</p>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{note}</p>
    </div>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-zinc-950">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function NetflixCompleteFundamentalAnalysisPage() {
  const chartTarget = NFLX_CHART_GROUPS.reduce((sum, group) => sum + group.targetCount, 0);

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-lg border border-zinc-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Equity Research Build
          </p>
          <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-tight md:text-6xl">
            Netflix (NFLX) Complete Fundamental Research Hub
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-zinc-650">
            This page is the working hub for the Netflix research project: SEC-backed financial history,
            subscriber analysis, content economics, competitive positioning, forecast model, DCF valuation,
            and final investment conclusion.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/research"
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700"
            >
              Research library
            </a>
            <a
              href="https://data.sec.gov/submissions/CIK0001065280.json"
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700"
            >
              SEC filing index
            </a>
            <a
              href="https://ir.netflix.net/financials/quarterly-earnings/default.aspx"
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700"
            >
              Netflix IR
            </a>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-4">
          <MetricCard
            label="Coverage"
            value="IPO to latest"
            note="Annual and quarterly datasets will be sourced from SEC filings and Netflix disclosures."
          />
          <MetricCard
            label="Sections"
            value={`${NFLX_RESEARCH_SECTIONS.length}`}
            note="Dedicated sections cover financials, subscribers, content economics, AI, competition, valuation, and DCF."
          />
          <MetricCard
            label="Charts"
            value={`${chartTarget}+`}
            note="The target chart library is planned across annual financials, margins, subscribers, content, valuation, and forecast."
          />
          <MetricCard
            label="Output"
            value="Research hub"
            note="The final page will support an institutional-grade long-form investment report."
          />
        </div>

        <SectionCard title="Build Roadmap">
          <div className="grid gap-3 md:grid-cols-3">
            {NFLX_IMPLEMENTATION_MILESTONES.map((milestone, index) => (
              <div key={milestone} className="rounded-lg bg-zinc-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Step {index + 1}
                </p>
                <p className="mt-2 font-medium text-zinc-900">{milestone}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Research Structure">
          <div className="grid gap-4 lg:grid-cols-2">
            {NFLX_RESEARCH_SECTIONS.map((section) => (
              <article key={section.slug} id={section.slug} className="rounded-lg border border-zinc-200 p-5">
                <h3 className="text-xl font-semibold text-zinc-950">{section.title}</h3>
                <p className="mt-2 leading-7 text-zinc-650">{section.objective}</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      Outputs
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                      {section.primaryOutputs.map((output) => (
                        <li key={output}>{output}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      Sources
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                      {section.sourcePriority.map((source) => (
                        <li key={source}>{source}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <SectionCard title="Source System">
            <div className="space-y-4">
              {NFLX_SOURCE_SYSTEMS.map((source) => (
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
              {NFLX_CHART_GROUPS.map((group) => (
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
