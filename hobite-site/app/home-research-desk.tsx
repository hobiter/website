"use client";

import { useHomeLanguage } from "./home-preferences";
import type { ResearchTopic } from "./research/catalog";

function ResearchLink({ topic, featured, chinese }: { topic: ResearchTopic; featured?: boolean; chinese: boolean }) {
  const localized = chinese ? topic.zh : topic.en;
  const report = localized ?? topic.en ?? topic.zh;
  if (!report) return null;
  const language = report === topic.zh ? "zh-CN" : "en";
  const title = topic.en?.title;
  const ticker = featured ? title?.match(/\(([A-Z.]+)\)/)?.[1] ?? title?.match(/^([A-Z]{2,6})\b/)?.[1] : undefined;
  return (
    <li className="min-w-0">
      <a className={featured ? "desk-tile" : "desk-row"} href={report.href} hrefLang={language}>
        <div className="min-w-0">
          {ticker && <span className="desk-ticker">{ticker}</span>}
          <h3 lang={language} className={featured ? "text-balance font-semibold leading-snug" : "font-medium leading-snug"}>
            {report.title}
          </h3>
          {featured && <p lang={language} className="desk-muted mt-2 text-sm leading-relaxed">{report.description}</p>}
          {chinese && !localized && <span className="desk-muted mt-1 block text-xs">仅英文 <span lang="en">· English only</span></span>}
        </div>
        <span className="desk-arrow" aria-hidden="true">↗</span>
      </a>
    </li>
  );
}

export function HomeResearchDesk({ featured, more }: { featured: ResearchTopic[]; more: ResearchTopic[] }) {
  const chinese = useHomeLanguage() === "zh";
  return (
    <main className="research-desk flex-1" lang={chinese ? "zh-CN" : "en"}>
      <div className="mx-auto w-full max-w-7xl px-4 pb-14 pt-8 sm:px-6 sm:pt-10">
        <header className="mb-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div>
            <h1 className="text-3xl font-semibold sm:text-4xl">{chinese ? "Hobite 投资研究" : "Hobite Research"}</h1>
            <p className="desk-muted mt-2 text-sm">
              {chinese ? "公司基本面、产业趋势与长期估值。" : "Company fundamentals, industry trends, and long-term valuation."}
            </p>
          </div>
          <a className="desk-library text-sm font-medium underline underline-offset-4" href="/research">
            {chinese ? "研究目录" : "Research library"} <span aria-hidden="true">→</span>
          </a>
        </header>
        <section aria-labelledby="latest-research">
          <h2 id="latest-research" className="mb-3 text-xl font-semibold">{chinese ? "最新研究" : "Latest research"}</h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map(topic => <ResearchLink key={topic.en?.href ?? topic.zh?.href} topic={topic} featured chinese={chinese} />)}
          </ul>
        </section>
        <section className="mt-9" aria-labelledby="more-research">
          <h2 id="more-research" className="mb-3 text-xl font-semibold">{chinese ? "更多研究" : "More research"}</h2>
          <ul className="grid gap-x-8 lg:grid-cols-2">
            {more.map(topic => <ResearchLink key={topic.en?.href ?? topic.zh?.href} topic={topic} chinese={chinese} />)}
          </ul>
        </section>
      </div>
    </main>
  );
}
