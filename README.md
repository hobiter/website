# website

Investment Website built with Next.js, Vercel, and optional Supabase-backed blog data.

## Project Directory

The active Next.js app lives under:

```bash
hobite-site
```

## Local Testing Guide

### 1. Go to the app directory

```bash
cd hobite-site
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start local development server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

### 4. Test key pages

Check these routes locally:

```text
/
/blog
/blog/vercel-supabase-investing-platform
```

The blog works without Supabase because fallback posts are included in `lib/blog.ts`.

### 5. Run production build check

```bash
npm run build
```

This is the most important validation before deploying to Vercel.

### 6. Optional: Supabase testing

Create the tables from:

```text
hobite-site/supabase/schema.sql
```

Then add these environment variables locally in `hobite-site/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Restart the dev server after adding environment variables.

## Vercel Deployment Notes

When importing this repo into Vercel, set the Root Directory to:

```text
hobite-site
```

Build settings:

```text
Install Command: npm install
Build Command: npm run build
Output Directory: .next
```

Supabase environment variables are optional for the first deployment because fallback blog data is available.
