import { featuredResearch, moreResearch, type ResearchTopic } from "./research/catalog";

function ResearchItem({ topic, featured = false }: { topic: ResearchTopic; featured?: boolean }) {
  const report = topic.en ?? topic.zh;
  if (!report) return null;
  return (
    <article className={featured ? "flex min-w-0 flex-col justify-between gap-4 rounded-lg border border-zinc-200 bg-white p-5" : "grid min-w-0 gap-2 border-t border-zinc-200 py-4 sm:grid-cols-[1fr_auto] sm:items-center"}>
      <div className="min-w-0" lang={topic.en ? "en" : "zh-CN"}>
        <h3 className={featured ? "text-lg font-semibold" : "font-medium"}>
          {topic.en && topic.zh ? report.title : <a href={report.href} className="underline underline-offset-4">{report.title}</a>}
        </h3>
        {featured && <p className="mt-2 text-sm leading-relaxed text-zinc-600">{report.description}</p>}
      </div>
      {topic.en && topic.zh && (
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-zinc-700">
          <a href={topic.en.href} aria-label={`English: ${topic.en.title}`} className="underline underline-offset-4">English</a>
          <a href={topic.zh.href} aria-label={`中文：${topic.zh.title}`} lang="zh-CN" className="underline underline-offset-4">中文</a>
        </div>
      )}
    </article>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-zinc-50 px-6 py-12 text-zinc-900">
      <div className="mx-auto max-w-7xl space-y-10">
        <section className="rounded-[2rem] border border-zinc-200 bg-white p-10 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Hobite Capital</p>
          <h1 className="mt-5 text-5xl font-semibold leading-tight md:text-7xl">Investing intelligence for the next decade.</h1>
          <p className="mt-6 max-w-4xl text-xl text-zinc-600">
            Deep fundamental research focused on AI infrastructure, enterprise software, cloud platforms, internet platforms, and long-duration compounders.
          </p>
        </section>
        <section aria-labelledby="latest-research">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="latest-research" className="text-3xl font-semibold">Latest Research</h2>
              <p className="mt-2 text-zinc-600">Institutional-style long-form AI and fundamental analysis reports.</p>
            </div>
            <a href="/research" className="text-sm font-medium text-zinc-600 underline">Open research library</a>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredResearch.map((topic) => (
              <ResearchItem key={topic.en?.href ?? topic.zh?.href} topic={topic} featured />
            ))}
          </div>
        </section>
        <section aria-labelledby="more-research">
          <h2 id="more-research" className="text-xl font-semibold">More Research</h2>
          <div className="mt-3 grid gap-x-10 lg:grid-cols-2">
            {moreResearch.map((topic) => (
              <ResearchItem key={topic.en?.href ?? topic.zh?.href} topic={topic} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
