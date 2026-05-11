const POSTS = [
  {
    title: "Reddit (RDDT) Deep Fundamental Analysis",
    href: "/research/rddt-deep-fundamental-analysis",
    description: "AI search, community economics, revenue growth, EBITDA expansion, and 10-year outlook.",
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
    <article className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
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
            Deep fundamental research focused on AI infrastructure, enterprise software, cloud platforms, and long-duration compounders.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {POSTS.map((post) => (
            <ResearchCard
              key={post.title}
              title={post.title}
              href={post.href}
              description={post.description}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
