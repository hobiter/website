import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research",
  description: "Research library for Hobite Capital reports.",
};

const REPORTS = [
  {
    title: "Reddit (RDDT) Deep Fundamental Analysis",
    description: "Quarterly revenue, EBITDA, AI impact, valuation, and 10-year outlook.",
    href: "/research/rddt-deep-fundamental-analysis",
  },
  {
    title: "Reddit（RDDT）深度基本面分析",
    description: "季度 Revenue、EBITDA、AI影响与未来十年展望。",
    href: "/zh/research/rddt-deep-fundamental-analysis",
  },
  {
    title: "AI Era Long-Term Investing Framework",
    description: "Workflow, data, infrastructure, and AI platform investing framework.",
    href: "/research/ai-era-investing-framework",
  },
];

export default function ResearchIndexPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-semibold">Research Library</h1>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {REPORTS.map((report) => (
            <article key={report.title} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-medium">{report.title}</h2>
              <p className="mt-2 text-zinc-600">{report.description}</p>
              <a href={report.href} className="mt-4 inline-block text-sm text-zinc-600 underline">
                Open report
              </a>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
