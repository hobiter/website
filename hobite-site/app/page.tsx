// Top navigation removed intentionally to avoid stale HEADLINE_LINKS references.
const POSTS = [
  {
    title: "AI Era Long-Term Investing Framework",
    href: "/research/ai-era-investing-framework",
    description: "Workflow, data, infrastructure, distribution, and long-term AI investing framework.",
  },
  {
    title: "AI时代长期投资框架",
    href: "/zh/research/ai-era-investing-framework",
    description: "AI时代 workflow、数据、基础设施、distribution 与长期资产配置框架。",
  },
  {
    title: "Oracle (ORCL) 15-Year Fundamental Analysis",
    href: "/research/oracle-15-year-fundamental-analysis",
    description: "OCI growth, AI infrastructure thesis, balance sheet analysis, and 10-year outlook.",
  },
  {
    title: "ServiceNow (NOW) 15-Year Fundamental Analysis",
    href: "/research/now-15-year-fundamental-analysis",
    description: "AI workflow operating system thesis, EBITDA expansion, and enterprise moat analysis.",
  },
  {
    title: "Salesforce (CRM) 15-Year Fundamental Analysis",
    href: "/research/crm-15-year-fundamental-analysis",
    description: "Agentforce AI thesis, Data Cloud, profitability transformation, and 10-year outlook.",
  },
  {
    title: "Pinterest (PINS) 7-Year Fundamental Analysis",
    href: "/research/pins-7-year-fundamental-analysis",
    description: "Quarterly revenue, adjusted EBITDA, margin charts, AI thesis, and 5-year outlook.",
  },
  {
    title: "Google 10-Year Annual Report Study",
    href: "/research/google-10-year-report",
    description: "Long-form analysis based on the last 10 years of Google annual financial reporting.",
  },
  {
    title: "MSFT 10-Year Review",
    href: "/research/msft-10-year-review",
    description: "Revenue, EBITA, and operating cash flow growth visualization.",
  },
];

const SERVICES = [
  "Equity Research",
  "Macro Strategy",
  "Portfolio Design",
  "Private Advisory",
];

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

type PillButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

type InfoCardProps = {
  title: string;
  description: string;
  className?: string;
};

function Section({ children, className = "", id }: SectionProps) {
  return (
    <section id={id} className={`max-w-6xl mx-auto px-6 ${className}`.trim()}>
      {children}
    </section>
  );
}

function PillButton({ href, children, variant = "primary" }: PillButtonProps) {
  const styles = variant === "primary" ? "bg-zinc-900 text-white" : "border border-zinc-300 text-zinc-900";

  return (
    <a href={href} className={`px-6 py-3 rounded-2xl ${styles}`}>
      {children}
    </a>
  );
}

function InfoCard({ title, description, className = "" }: InfoCardProps) {
  return (
    <div className={`p-6 rounded-3xl bg-white border border-zinc-200 ${className}`.trim()}>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-zinc-600">{description}</p>
    </div>
  );
}

function ResearchCard({ title, href, description }: { title: string; href: string; description: string }) {
  return (
    <article className="p-6 rounded-3xl bg-white border border-zinc-200">
      <h3 className="text-xl font-medium">{title}</h3>
      <p className="mt-3 text-zinc-600">{description}</p>
      <a href={href} className="mt-4 inline-block text-sm text-zinc-600 underline">
        Open report
      </a>
    </article>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-zinc-50 text-zinc-900">
      <Section className="py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">Hobite Capital</p>
          <h1 className="text-5xl md:text-7xl font-semibold mt-4 leading-tight">
            Investing intelligence for the next decade.
          </h1>
          <p className="mt-6 text-xl text-zinc-600 max-w-xl">
            Research-driven insights on AI infrastructure, enterprise software, cloud platforms, and long-duration compounders.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <PillButton href="/research">Research</PillButton>
            <PillButton href="/operation-log" variant="secondary">我的操作记录</PillButton>
          </div>
        </div>

        <div className="p-8 rounded-[2rem] bg-white shadow-sm border border-zinc-200">
          <p className="text-sm text-zinc-500">Featured Research</p>
          <p className="text-4xl font-semibold mt-3">AI Era Investing Framework</p>
          <p className="mt-2 text-zinc-600">
            Workflow, infrastructure, enterprise AI operating systems, and long-term AI portfolio allocation.
          </p>
          <a href="/research/ai-era-investing-framework" className="mt-5 inline-block rounded-2xl bg-zinc-900 px-5 py-3 text-white">
            Open report
          </a>
        </div>
      </Section>

      <Section className="py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-semibold">Latest Research</h2>
          <a href="/research" className="text-sm text-zinc-500 underline">View research library</a>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {POSTS.map((post) => (
            <ResearchCard key={post.title} title={post.title} href={post.href} description={post.description} />
          ))}
        </div>
      </Section>
    </main>
  );
}
