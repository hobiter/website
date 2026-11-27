import type { Metadata } from "next";
import { researchReports } from "./catalog";

export const metadata: Metadata = {
  title: "Research",
  description: "Research library for Hobite Capital reports.",
};

export default function ResearchIndexPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-semibold">Research Library</h1>
        <p className="mt-4 text-lg text-zinc-600">
          Long-form institutional-style research covering AI infrastructure, software, internet platforms, cloud, and long-duration compounders.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {researchReports.map((report) => (
            <article key={report.href} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <h2 className="text-2xl font-medium">{report.title}</h2>
              <p className="mt-3 text-zinc-600">{report.description}</p>
              <a href={report.href} className="mt-5 inline-block text-sm font-medium text-zinc-700 underline">
                Open report
              </a>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
