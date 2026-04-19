"use client";

import { useMemo, useState } from "react";
import { BLOG_STORAGE_KEY, DEFAULT_BLOG_POSTS, type BlogPost } from "../lib/blogs";

function loadPosts() {
  if (typeof window === "undefined") return DEFAULT_BLOG_POSTS;

  const raw = window.localStorage.getItem(BLOG_STORAGE_KEY);
  if (!raw) return DEFAULT_BLOG_POSTS;

  try {
    const parsed = JSON.parse(raw) as BlogPost[];
    if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_BLOG_POSTS;
    return parsed;
  } catch {
    return DEFAULT_BLOG_POSTS;
  }
}

export default function BlogClient() {
  const [posts, setPosts] = useState<BlogPost[]>(() => loadPosts());
  const [activeId, setActiveId] = useState<string>(() => loadPosts()[0]?.id ?? "");

  const activePost = useMemo(() => posts.find((post) => post.id === activeId) ?? posts[0], [activeId, posts]);

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 px-6 py-10">
      <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-3">
        <aside className="md:col-span-1 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-semibold">Blog</h1>
          <p className="mt-2 text-sm text-zinc-600">Posts are managed in <code>/admin</code>.</p>
          <button
            type="button"
            onClick={() => {
              const latest = loadPosts();
              setPosts(latest);
              setActiveId(latest[0]?.id ?? "");
            }}
            className="mt-3 rounded-lg border border-zinc-300 px-3 py-1.5 text-xs"
          >
            Refresh from admin changes
          </button>
          <ul className="mt-4 space-y-2">
            {posts.map((post) => (
              <li key={post.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(post.id)}
                  className={`w-full rounded-lg border px-3 py-2 text-left text-sm ${
                    activePost?.id === post.id ? "border-zinc-900 bg-zinc-100" : "border-zinc-200 bg-white"
                  }`}
                >
                  <p className="font-medium">{post.title}</p>
                  <p className="mt-1 text-xs text-zinc-500">Updated {post.updatedAt}</p>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <article className="md:col-span-2 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          {activePost ? (
            <>
              <h2 className="text-3xl font-semibold">{activePost.title}</h2>
              <p className="mt-3 text-zinc-600">{activePost.summary}</p>
              <div className="mt-6 whitespace-pre-wrap leading-7 text-zinc-700">{activePost.content}</div>
            </>
          ) : (
            <p>No posts found.</p>
          )}
        </article>
      </div>
    </main>
  );
}
