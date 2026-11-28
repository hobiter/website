"use client";

import { useEffect, useMemo, useState } from "react";
import { archiveUrl, isQuoted, type ArchiveEntry } from "./archive";

type View = "all" | "author" | "replies";
const step = 24;
const filters: [View, string][] = [["all", "全部"], ["author", "只看楼主"], ["replies", "只看回帖"]];
const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700";
const control = `min-h-10 rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 ${focus}`;
const urlPattern = /(https?:\/\/(?:(?!https?:\/\/)[\w\-./%?&=+#~:@;])+(?:\([\w./-]+\))?)/gi;

function LinkedText({ text }: { text: string }) {
  return text.split(urlPattern).map((part, index) => {
    if (index % 2 === 0) return part;
    const clean = part.replace(/[.;:]+$/, "");
    return <span key={index}><a href={clean} rel="noreferrer" target="_blank" className="break-all text-orange-800 underline underline-offset-2 dark:text-orange-300">{clean}</a>{part.slice(clean.length)}</span>;
  });
}

function PostBody({ lines }: { lines: string[] }) {
  const blocks: {quoted:boolean; lines:string[]}[] = [];
  for (const line of lines) {
    const quoted = isQuoted(line);
    const last = blocks.at(-1);
    if (last && last.quoted === quoted) last.lines.push(line);
    else blocks.push({ quoted, lines: [line] });
  }
  return blocks.map(({ quoted, lines }, i) => {
    const body = lines.map((line, j) => <div key={j} className="min-h-2"><LinkedText text={quoted ? line.replace(/^[：:]\s*/, "") : line} /></div>);
    return quoted
      ? <blockquote className="my-2 border-l-2 border-zinc-300 pl-3 text-zinc-600 dark:border-zinc-600 dark:text-zinc-300" key={i}>{body}</blockquote>
      : <div key={i}>{body}</div>;
  });
}

function EntryCard({ entry }: { entry: ArchiveEntry }) {
  const owner = entry.author.toLowerCase() === "hobite";
  const title = entry.heading ? `${entry.date ?? entry.heading} 操作记录` : entry.kind === "entry" ? "主帖更新" : undefined;
  const href = `#${entry.id}`;
  const [copied, setCopied] = useState(false);

  async function share() {
    try {
      const permalink = new URL(window.location.href);
      permalink.hash = entry.id;
      await navigator.clipboard.writeText(permalink.href);
      setCopied(true);
    } catch {
      window.location.hash = entry.id;
    }
  }

  return (
    <li id={entry.id} className="scroll-mt-28 rounded-lg border border-zinc-200 bg-white px-4 py-4 target:border-orange-500 target:ring-1 target:ring-orange-500 dark:border-zinc-800 dark:bg-zinc-900 sm:px-5">
      <article>
        <header className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-600 dark:text-zinc-400">
          <span aria-hidden="true" className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${owner ? "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200" : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"}`}>
            {Array.from(entry.author)[0]?.toUpperCase()}
          </span>
          <span className="max-w-full break-all font-semibold text-zinc-900 dark:text-zinc-100">{entry.author}</span>
          {owner && <span className="rounded bg-orange-50 px-1.5 py-0.5 font-semibold text-orange-800 dark:bg-orange-950 dark:text-orange-200">楼主</span>}
          {entry.floor !== undefined
            ? <a href={href} className={`rounded-sm hover:underline ${focus}`}>{entry.floor} 楼</a>
            : <span>主帖</span>}
        </header>
        {title && <h2 className="mt-3 text-lg font-semibold leading-snug">{title}</h2>}
        <div className="mt-2 break-words text-sm leading-7 text-zinc-800 dark:text-zinc-200 [overflow-wrap:anywhere]">
          {entry.lines.length ? <PostBody lines={entry.lines} /> : <p className="text-zinc-500 dark:text-zinc-400">存档未包含这层楼的正文。</p>}
        </div>
        <footer className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-zinc-100 pt-2 text-xs dark:border-zinc-800">
          <a href={href} className={`text-zinc-600 underline-offset-2 hover:underline dark:text-zinc-300 ${focus}`}>本条链接</a>
          <button type="button" onClick={share} aria-live="polite" className={`rounded-sm px-2 py-2 font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 ${focus}`}>{copied ? "已复制" : "复制链接"}</button>
          {entry.page && <span className="ml-auto text-zinc-500 dark:text-zinc-400">存档第 {entry.page} 页</span>}
        </footer>
      </article>
    </li>
  );
}

export function OperationThread({ entries }: { entries: ArchiveEntry[] }) {
  const [view, setView] = useState<View>("all");
  const [query, setQuery] = useState("");
  const [reverse, setReverse] = useState(false);
  const [limit, setLimit] = useState(step);
  const [target, setTarget] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = entries.filter(entry => {
      if (view === "author" && entry.author.toLowerCase() !== "hobite") return false;
      if (view === "replies" && entry.kind !== "reply") return false;
      return !q || `${entry.author} ${entry.date ?? ""} ${entry.heading ?? ""} ${entry.floor === undefined ? "" : `${entry.floor} 楼`} ${entry.lines.join(" ")}`.toLowerCase().includes(q);
    });
    return reverse ? result.reverse() : result;
  }, [entries, query, reverse, view]);

  useEffect(() => {
    function reveal() {
      const id = window.location.hash.slice(1);
      const current = document.getElementById(id);
      if (current) return;
      const index = entries.findIndex(entry => entry.id === id);
      if (index < 0) return;
      setView("all");
      setQuery("");
      setReverse(false);
      setLimit(count => Math.max(count, index + 1));
      setTarget(id);
    }
    const initial = window.requestAnimationFrame(reveal);
    window.addEventListener("hashchange", reveal);
    return () => {
      window.cancelAnimationFrame(initial);
      window.removeEventListener("hashchange", reveal);
    };
  }, [entries]);

  useEffect(() => {
    if (target) document.getElementById(target)?.scrollIntoView();
  }, [target]);

  function resetPage() {
    setLimit(step);
    setTarget("");
  }

  return (
    <main lang="zh-CN" className="min-w-0 flex-1 bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <header className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-7 sm:px-6 sm:py-9">
          <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-lg bg-orange-700 text-lg font-bold text-white">H</span>
          <div className="min-w-0">
            <div className="mb-1 flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400"><span>hobite</span><span className="rounded bg-orange-100 px-1.5 py-0.5 text-orange-900 dark:bg-orange-950 dark:text-orange-200">曾置顶</span></div>
            <h1 className="text-2xl font-semibold sm:text-3xl">我的操作记录</h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">未名空间 · 历史讨论存档</p>
          </div>
        </header>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_270px] lg:py-7">
        <section className="min-w-0" aria-label="操作记录与回帖">
          <div className="mb-4 space-y-3">
            <label className="block">
              <span className="sr-only">搜索存档</span>
              <input type="search" value={query} onChange={event => { setQuery(event.currentTarget.value); resetPage(); }}
                placeholder="搜索关键词、股票代码或作者" className={`w-full ${control}`} />
            </label>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div role="group" aria-label="筛选帖子" className="flex flex-wrap gap-1">
                {filters.map(([option, label]) => (
                  <button key={option} type="button" aria-pressed={view === option}
                    onClick={() => { setView(option); resetPage(); }}
                    className={`min-h-10 rounded-md px-3 text-sm font-medium ${focus} ${view === option ? "bg-orange-100 text-orange-900 dark:bg-orange-950 dark:text-orange-200" : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"}`}>
                    {label}
                  </button>
                ))}
              </div>
              <label><span className="sr-only">排序</span><select className={control} value={reverse ? "reverse" : "original"}
                onChange={event => { setReverse(event.currentTarget.value === "reverse"); resetPage(); }}>
                <option value="original">原帖顺序</option>
                <option value="reverse">倒序浏览</option>
              </select></label>
            </div>
            <p aria-live="polite" className="text-xs tabular-nums text-zinc-600 dark:text-zinc-400">已显示 {Math.min(limit, visible.length)} / {visible.length} 条</p>
          </div>
          {visible.length ? (
            <>
              <ol className="space-y-3">{visible.slice(0, limit).map(entry => <EntryCard key={entry.id} entry={entry} />)}</ol>
              {limit < visible.length && <button className={`mt-4 w-full font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 ${control}`} type="button" onClick={() => setLimit(current => current + step)}>加载更多记录</button>}
            </>
          ) : (
            <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="font-semibold">没有匹配的记录</p>
              <button type="button" onClick={() => { setQuery(""); setView("all"); resetPage(); }} className={`mt-3 rounded-sm text-sm text-orange-800 underline dark:text-orange-300 ${focus}`}>清除筛选</button>
            </div>
          )}
        </section>
        <aside className="order-first self-start rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 lg:sticky lg:top-24 lg:order-none">
          <h2 className="font-semibold">关于这个存档</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">保留主帖和回帖的原始顺序。楼层、日期与作者来自存档；历史交易不代表当前持仓。</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium lg:flex-col">
            <a href={archiveUrl} target="_blank" rel="noreferrer" className={`rounded-sm text-orange-800 underline underline-offset-4 dark:text-orange-300 ${focus}`}>查看原帖存档</a>
            <a href="/operation-log/source" download="operation-log.txt" className={`rounded-sm text-orange-800 underline underline-offset-4 dark:text-orange-300 ${focus}`}>下载完整原文</a>
          </div>
        </aside>
      </div>
    </main>
  );
}
