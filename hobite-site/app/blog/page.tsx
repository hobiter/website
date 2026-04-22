import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog",
  description: "Hobite blog posts managed from the admin page.",
};

export default function BlogPage() {
  return <BlogClient />;
}
