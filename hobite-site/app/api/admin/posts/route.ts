import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const body = await req.json();

  if (body.adminPassword !== process.env.ADMIN_CMS_PASSWORD) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabase.from("posts").insert([
    {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      category: body.category,
      published: true,
    },
  ]);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ success: true, slug: body.slug });
}
