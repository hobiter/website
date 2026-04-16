# Local Testing Instructions

This repository does not yet contain a full Next.js application.

Right now it includes a single React component file:

- `hobite_investing_nextjs_site.jsx`

Because there is no `package.json`, no `app/` or `pages/` directory, and no test runner configuration, there is nothing in this repo that can be started or tested directly yet.

## Option 1: Run the page locally in a new Next.js app

Create a fresh Next.js project:

```powershell
npx create-next-app@latest hobite-site
cd hobite-site
```

Replace the default homepage with the contents of `hobite_investing_nextjs_site.jsx`.

Use one of these locations:

- `app/page.jsx` for the App Router
- `pages/index.jsx` for the Pages Router

Start the local development server:

```powershell
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Option 2: Add this page into an existing Next.js project

If you already have a Next.js app elsewhere, copy `hobite_investing_nextjs_site.jsx` into that project and export it from:

- `app/page.jsx`, or
- `pages/index.jsx`

Then run:

```powershell
npm install
npm run dev
```

## How to add local tests

Once the page lives inside a real Next.js project, you can add a basic React test setup:

```powershell
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
```

Typical test files:

- `__tests__/page.test.jsx`
- `jest.config.js`
- `jest.setup.js`

Run tests with:

```powershell
npm test
```

## Recommended quick manual test checklist

After starting the local app, verify:

- the hero section renders correctly
- the Research and Newsletter buttons work
- the research cards appear
- the newsletter input and subscribe button display correctly
- the layout looks good on both desktop and mobile widths

## Current limitation

This repository is currently a component-only workspace, not a runnable website project. To test it locally, it first needs to be placed inside a Next.js app.
