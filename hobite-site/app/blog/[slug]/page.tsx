import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: `${post.title} | Hobite Capital`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-zinc-50 text-zinc-900">
      <article className="max-w-3xl mx-auto px-6 py-20">
        <a href="/blog" className="text-sm text-zinc-500 underline">
          ← Back to Blog
        </a>

        <div className="mt-10">
          <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
            {post.category}
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold leading-tight">
            {post.title}
          </h1>
          <p className="mt-5 text-lg text-zinc-600">{post.excerpt}</p>
          <p className="mt-4 text-sm text-zinc-500">
            Published {new Date(post.published_at).toLocaleDateString("en-US")}
          </p>
        </div>

        <div className="mt-12 rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700 leading-8">
            {post.content}
          </div>
        </div>

        <section className="mt-12 rounded-[2rem] bg-zinc-900 p-8 text-white">
          <h2 className="text-2xl font-semibold">Weekly Investor Letter</h2>
          <p className="mt-3 text-zinc-300">
            Get market notes, portfolio frameworks, and long-term investing ideas.
          </p>
          <a
            href="/#newsletter"
            className="mt-6 inline-block rounded-2xl bg-white px-5 py-3 text-zinc-900"
          >
            Join the newsletter
          </a>
        </section>
      </article>
    </main>
  );
}
