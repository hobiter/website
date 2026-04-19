This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Blog Function Testing Instructions

The blog/admin feature is client-side and stores data in browser `localStorage`.

### 1) Start the app

```bash
npm install
npm run dev
```

Open:

- Blog page: `http://localhost:3000/blog`
- Admin page: `http://localhost:3000/admin`

### 2) Verify create post flow

1. Go to `/admin`
2. Click **+ New Post**
3. Fill in **Title**, **Summary**, and **Content**
4. Click **Save Post**
5. Confirm the post appears in the left-side admin list

### 3) Verify edit post flow

1. In `/admin`, click an existing post in the left list
2. Update title or content
3. Click **Save Post**
4. Confirm `Updated` date refreshes

### 4) Verify delete flow

1. In `/admin`, click **Delete** on a post
2. Confirm it disappears from the admin list
3. Verify at least one fallback post still exists

### 5) Verify public blog rendering

1. Open `/blog`
2. Click **Refresh from admin changes**
3. Confirm newly created/updated posts are visible
4. Switch between posts in the left list and verify content display

### 6) Verify persistence

1. Create or edit a post in `/admin`
2. Refresh the page/browser
3. Re-open `/admin` and `/blog`
4. Confirm saved posts persist (from `localStorage` key `hobite_blog_posts_v1`)

### 7) Reset test data (optional)

In browser devtools console:

```js
localStorage.removeItem('hobite_blog_posts_v1')
```

Refresh `/admin` or `/blog` to restore default seed content.
