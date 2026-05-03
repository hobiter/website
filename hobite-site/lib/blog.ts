import { createClient } from "@supabase/supabase-js";

export type BlogPost = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  published_at: string;
};

export const fallbackPosts: BlogPost[] = [
  {
    title: "Vercel + Supabase: From Blog to Investing SaaS Platform",
    slug: "vercel-supabase-investing-platform",
    excerpt:
      "Why Vercel can host the product layer, Supabase can power the database, and a research blog can evolve into a full investing platform.",
    category: "Platform Strategy",
    published_at: "2026-05-02",
    content:
      "Vercel can host a production-grade Next.js investing platform. Supabase gives the project a Postgres database, authentication, storage, and APIs. The practical path is to start with a research blog, then add member accounts, watchlists, dashboards, premium research, and AI-assisted investing workflows.",
  },
  {
    title: "Building the Research Engine for Hobite Capital",
    slug: "research-engine-hobite-capital",
    excerpt:
      "A durable content system for long-form equity research, market notes, portfolio frameworks, and investor letters.",
    category: "Research",
    published_at: "2026-05-01",
    content:
      "A strong investing platform starts with repeatable research. Each post should map to a company, sector, catalyst, valuation view, risk section, and long-term thesis. Over time, this turns the blog into a searchable knowledge base for members and future AI features.",
  },
  {
    title: "The SaaS Roadmap: Blog, Members, Data, AI",
    slug: "investing-saas-roadmap",
    excerpt:
      "A staged roadmap for turning a personal investing site into a subscription research platform.",
    category: "Roadmap",
    published_at: "2026-04-30",
    content:
      "The product roadmap is simple: publish public research, collect newsletter subscribers, add Supabase Auth for members, gate premium research, connect portfolio/watchlist tables, and then layer AI analysis over the research and market data stored in the database.",
  },
];

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return fallbackPosts;
  }

  const { data, error } = await supabase
    .from("posts")
    .select("id,title,slug,excerpt,content,category,published_at")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error || !data?.length) {
    return fallbackPosts;
  }

  return data as BlogPost[];
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return fallbackPosts.find((post) => post.slug === slug);
  }

  const { data, error } = await supabase
    .from("posts")
    .select("id,title,slug,excerpt,content,category,published_at")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) {
    return fallbackPosts.find((post) => post.slug === slug);
  }

  return data as BlogPost;
}
