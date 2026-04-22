export type BlogPost = {
  id: string;
  title: string;
  summary: string;
  content: string;
  updatedAt: string;
};

export const BLOG_STORAGE_KEY = "hobite_blog_posts_v1";

export const DEFAULT_BLOG_POSTS: BlogPost[] = [
  {
    id: "welcome-post",
    title: "Welcome to Hobite Blog",
    summary: "This is the default post. Admin can edit or add posts from /admin.",
    content:
      "Use the admin page to create new posts or update existing ones. Posts are saved in browser localStorage for quick content management without backend setup.",
    updatedAt: "2026-04-19",
  },
];
