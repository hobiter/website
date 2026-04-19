import type { Metadata } from "next";
import AdminBlogManager from "./AdminBlogManager";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin tools to add and edit blog posts.",
};

export default function AdminPage() {
  return <AdminBlogManager />;
}
