const POSTS = [
  {
    title: "Reddit (RDDT) Deep Fundamental Analysis",
    href: "/research/rddt-deep-fundamental-analysis",
    description: "AI search, community economics, EBITDA expansion, and long-term valuation framework.",
  },
  {
    title: "Reddit（RDDT）深度基本面分析",
    href: "/zh/research/rddt-deep-fundamental-analysis",
    description: "AI搜索、社区经济学、Revenue增长与未来十年展望。",
  },
  {
    title: "AI Era Long-Term Investing Framework",
    href: "/research/ai-era-investing-framework",
    description: "Workflow, data, infrastructure, distribution, and long-term AI investing framework.",
  },
  {
    title: "AI时代长期投资框架",
    href: "/zh/research/ai-era-investing-framework",
    description: "AI时代 workflow、数据、基础设施与长期资产配置框架。",
  },
  {
    title: "Salesforce (CRM) 15-Year Fundamental Analysis",
    href: "/research/crm-15-year-fundamental-analysis",
    description: "Agentforce AI thesis, Data Cloud, profitability transformation, and 10-year outlook.",
  },
  {
    title: "Oracle (ORCL) 15-Year Fundamental Analysis",
    href: "/research/oracle-15-year-fundamental-analysis",
    description: "OCI growth, AI infrastructure thesis, balance sheet analysis, and 10-year outlook.",
  },
  {
    title: "ServiceNow (NOW) 15-Year Fundamental Analysis",
    href: "/research/now-15-year-fundamental-analysis",
    description: "AI workflow operating system thesis and enterprise moat analysis.",
  },
  {
    title: "Salesforce (CRM) 15-Year Fundamental Analysis",
    href: "/research/crm-15-year-fundamental-analysis",
    description: "Agentforce AI thesis, Data Cloud, profitability transformation, and 10-year outlook.",
  },
  {
    title: "Pinterest (PINS) 7-Year Fundamental Analysis",
    href: "/research/pins-7-year-fundamental-analysis",
    description: "Quarterly revenue, EBITDA, AI thesis, and 5-year outlook.",
  },
  {
    title: "Google (Alphabet) 10-Year Annual Report Study",
    href: "/research/google-10-year-report",
    description: "Long-form review of Google annual financial reports over FY2016-FY2025.",
  },
  {
    title: "MSFT 10-Year Review",
    href: "/research/msft-10-year-review",
    description: "Revenue, EBITA, and operating cash flow growth visualization.",
  },
];

function ResearchCard({
  title,
  href,
  description,
}: {
  title: string;
  href: string;
  description: string;
}) {
  return (
    <article className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <h3 className="text-xl font-medium">{title}</h3>
      <p className="mt-3 text-zinc-600">{description}</p>
      <a href={href} className="mt-4 inline-block text-sm font-medium text-zinc-700 underline">
        Open report
      </a>
    </article>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-zinc-50 px-6 py-12 text-zinc-900">
      <div className="mx-auto max-w-7xl space-y-10">
        <section className="rounded-[2rem] border border-zinc-200 bg-white p-10 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Hobite Capital
          </p>

          <h1 className="mt-5 text-5xl font-semibold leading-tight md:text-7xl">
            Investing intelligence for the next decade.
          </h1>

          <p className="mt-6 max-w-4xl text-xl text-zinc-600">
            Deep fundamental research focused on AI infrastructure, enterprise software, cloud platforms, internet platforms, and long-duration compounders.
          </p>
        </section>

        <section>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold">Latest Research</h2>
              <p className="mt-2 text-zinc-600">Institutional-style long-form AI and fundamental analysis reports.</p>
            </div>
            <a href="/research" className="text-sm font-medium text-zinc-600 underline">
              Open research library
            </a>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {POSTS.map((post) => (
              <ResearchCard
                key={post.title}
                title={post.title}
                href={post.href}
                description={post.description}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
