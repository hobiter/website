"use client";

import { useMemo, useState } from "react";
import { BLOG_STORAGE_KEY, DEFAULT_BLOG_POSTS, type BlogPost } from "../lib/blogs";

function loadStoredPosts() {
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

function savePosts(posts: BlogPost[]) {
  window.localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
}

function toId(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 64);
}

type Draft = {
  title: string;
  summary: string;
  content: string;
};

export default function AdminBlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>(() => loadStoredPosts());
  const [editingId, setEditingId] = useState<string>(() => loadStoredPosts()[0]?.id ?? "");

  const initialDraft = useMemo<Draft>(() => {
    const selected = posts.find((post) => post.id === editingId) ?? null;
    if (!selected) return { title: "", summary: "", content: "" };
    return { title: selected.title, summary: selected.summary, content: selected.content };
  }, [editingId, posts]);

  const [draft, setDraft] = useState<Draft>(initialDraft);

  function selectPost(id: string) {
    const selected = posts.find((post) => post.id === id);
    setEditingId(id);
    if (!selected) {
      setDraft({ title: "", summary: "", content: "" });
      return;
    }

    setDraft({
      title: selected.title,
      summary: selected.summary,
      content: selected.content,
    });
  }

  function handleCreateNew() {
    setEditingId("");
    setDraft({ title: "", summary: "", content: "" });
  }

  function handleSave() {
    if (!draft.title.trim()) return;

    const nextId = editingId || toId(draft.title) || `post-${Date.now()}`;
    const updatedAt = new Date().toISOString().slice(0, 10);

    const nextPost: BlogPost = {
      id: nextId,
      title: draft.title.trim(),
      summary: draft.summary.trim(),
      content: draft.content.trim(),
      updatedAt,
    };

    const existingIndex = posts.findIndex((post) => post.id === nextId);
    const nextPosts = [...posts];

    if (existingIndex >= 0) {
      nextPosts[existingIndex] = nextPost;
    } else {
      nextPosts.unshift(nextPost);
    }

    setPosts(nextPosts);
    setEditingId(nextId);
    setDraft({ title: nextPost.title, summary: nextPost.summary, content: nextPost.content });
    savePosts(nextPosts);
  }

  function handleDelete(id: string) {
    const nextPosts = posts.filter((post) => post.id !== id);
    const fallback = nextPosts.length > 0 ? nextPosts : DEFAULT_BLOG_POSTS;
    setPosts(fallback);
    selectPost(fallback[0].id);
    savePosts(fallback);
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-3">
        <aside className="md:col-span-1 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-semibold">Admin Blog Manager</h1>
          <button type="button" onClick={handleCreateNew} className="mt-4 rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white">
            + New Post
          </button>
          <ul className="mt-4 space-y-2">
            {posts.map((post) => (
              <li key={post.id} className="rounded-lg border border-zinc-200 p-2">
                <button type="button" onClick={() => selectPost(post.id)} className="w-full text-left">
                  <p className="font-medium text-sm">{post.title}</p>
                  <p className="text-xs text-zinc-500">Updated {post.updatedAt}</p>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(post.id)}
                  className="mt-2 text-xs text-red-600 underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section className="md:col-span-2 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold">{editingId ? "Edit Post" : "Create Post"}</h2>

          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="text-sm text-zinc-600">Title</span>
              <input
                value={draft.title}
                onChange={(event) => setDraft((prev) => ({ ...prev, title: event.target.value }))}
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-600">Summary</span>
              <input
                value={draft.summary}
                onChange={(event) => setDraft((prev) => ({ ...prev, summary: event.target.value }))}
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-600">Content</span>
              <textarea
                value={draft.content}
                onChange={(event) => setDraft((prev) => ({ ...prev, content: event.target.value }))}
                rows={12}
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
              />
            </label>

            <button type="button" onClick={handleSave} className="rounded-lg bg-zinc-900 px-5 py-2 text-sm text-white">
              Save Post
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
