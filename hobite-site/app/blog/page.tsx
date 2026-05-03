import { getBlogPosts } from "@/lib/blog";

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-semibold">Research & Blog</h1>

      <div className="mt-10 space-y-8">
        {posts.map((post) => (
          <a key={post.slug} href={`/blog/${post.slug}`} className="block p-6 border rounded-2xl">
            <p className="text-sm text-zinc-500">{post.category}</p>
            <h2 className="text-2xl font-semibold mt-1">{post.title}</h2>
            <p className="mt-3 text-zinc-600">{post.excerpt}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
