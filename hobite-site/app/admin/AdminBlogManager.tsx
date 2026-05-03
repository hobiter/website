"use client";

import { FormEvent, useState } from "react";

type PublishState = "idle" | "publishing" | "success" | "error";

export default function AdminBlogManager() {
  const [status, setStatus] = useState<PublishState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("publishing");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      title: String(formData.get("title") || ""),
      slug: String(formData.get("slug") || ""),
      excerpt: String(formData.get("excerpt") || ""),
      category: String(formData.get("category") || "Research"),
      content: String(formData.get("content") || ""),
      adminPassword: String(formData.get("adminPassword") || ""),
    };

    try {
      const response = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to publish post.");
      }

      setStatus("success");
      setMessage(`Published: ${result.slug}`);
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Failed to publish post.");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-zinc-50 text-zinc-900">
      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Admin CMS</p>
        <h1 className="mt-4 text-4xl font-semibold">Publish Investment Research</h1>
        <p className="mt-4 max-w-2xl text-zinc-600">
          Create blog posts directly from the website. Posts are saved to Supabase when the admin password and environment variables are configured.
        </p>

        <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
          <p className="font-semibold">Setup required before publishing</p>
          <p className="mt-2">
            Add SUPABASE_SERVICE_ROLE_KEY and ADMIN_CMS_PASSWORD to Vercel Environment Variables. Keep the service role key server-side only.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6 rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm">
          <label className="block">
            <span className="text-sm font-medium text-zinc-700">Admin Password</span>
            <input name="adminPassword" type="password" required className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3" />
          </label>

          <div className="grid gap-6 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-zinc-700">Title</span>
              <input name="title" required placeholder="AI Capital Rotation: Where Money Flows Next" className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-zinc-700">Slug</span>
              <input name="slug" required placeholder="ai-capital-rotation" className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3" />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-zinc-700">Category</span>
            <input name="category" defaultValue="Research" className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3" />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-zinc-700">Excerpt</span>
            <textarea name="excerpt" required rows={3} placeholder="Short summary for SEO and blog list page." className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3" />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-zinc-700">Content</span>
            <textarea name="content" required rows={14} placeholder="Write the full investment research post here..." className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3" />
          </label>

          <button disabled={status === "publishing"} className="rounded-2xl bg-zinc-900 px-6 py-3 text-white disabled:opacity-60">
            {status === "publishing" ? "Publishing..." : "Publish Post"}
          </button>

          {message && <p className={status === "error" ? "text-red-600" : "text-green-700"}>{message}</p>}
        </form>
      </section>
    </main>
  );
}
