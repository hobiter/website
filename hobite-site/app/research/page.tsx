import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research",
  description: "Research library for Hobite Capital reports.",
};

const REPORTS = [
  {
    title: "AI Era Long-Term Investing Framework",
    description: "Workflow, data, infrastructure, and AI platform investing framework.",
    href: "/research/ai-era-investing-framework",
  },
  {
    title: "AI时代长期投资框架",
    description: "AI时代 workflow、数据、基础设施与长期资产配置框架。",
    href: "/zh/research/ai-era-investing-framework",
  },
  {
    title: "Salesforce (CRM) 15-Year Fundamental Analysis",
    description: "Agentforce AI thesis, Data Cloud, and margin expansion analysis.",
    href: "/research/crm-15-year-fundamental-analysis",
  },
  {
    title: "Oracle (ORCL) 15-Year Fundamental Analysis",
    description: "OCI growth, AI infrastructure thesis, balance sheet analysis, and 10-year outlook.",
    href: "/research/oracle-15-year-fundamental-analysis",
  },
  {
    title: "ServiceNow (NOW) 15-Year Fundamental Analysis",
    description: "AI workflow operating system thesis, EBITDA expansion, and enterprise moat analysis.",
    href: "/research/now-15-year-fundamental-analysis",
  },
  {
    title: "Pinterest (PINS) 7-Year Fundamental Analysis",
    description: "Quarterly revenue, adjusted EBITDA, margin charts, AI thesis, and 5-year outlook.",
    href: "/research/pins-7-year-fundamental-analysis",
  },
  {
    title: "Google 5-Year 10-K Detailed Analysis",
    description: "Detailed 10-K based analysis for FY2021-FY2025.",
    href: "/research/google-5-year-10k-analysis",
  },
  {
    title: "Google（Alphabet）十年财报深度报告（中文）",
    description: "Google 十年年报中文长文版（FY2016-FY2025）。",
    href: "/research/google-10-year-report/zh",
  },
  {
    title: "Google (Alphabet) 10-Year Annual Report Study",
    description: "Long-form review of Google annual financial reports over FY2016-FY2025.",
    href: "/research/google-10-year-report",
  },
  {
    title: "MSFT 10-Year Review",
    description: "Revenue, EBITA, and operating cash flow growth chart.",
    href: "/research/msft-10-year-review",
  },
  {
    title: "MSFT 十年复盘（中文）",
    description: "微软十年收入、EBITA、经营现金流可视化。",
    href: "/zh/research/msft-10-year-review",
  },
];

export default function ResearchIndexPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-semibold">Research Library</h1>
        <p className="mt-3 text-zinc-600">Browse currently published research pages.</p>

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
