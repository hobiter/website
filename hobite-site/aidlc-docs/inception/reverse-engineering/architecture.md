# System Architecture

## System Overview

`hobite-site` is a single Next.js App Router application. Most existing pages are server components or static route files. Interactive behavior exists in client components for the blog/admin experience and would also be required for the elimination prediction tool.

## Text Architecture Diagram

```txt
User Browser
  -> Next.js App Router
    -> Root Layout
    -> Static Pages
      -> Home
      -> Research
      -> Platform
      -> Newsletter
      -> Operation Log
    -> Client Components
      -> Blog/Admin localStorage flows
      -> Proposed elimination prediction builder
    -> API Routes
      -> Admin posts API
    -> Supabase
      -> Existing schema for future posts/users/watchlist/portfolio
```

## Component Descriptions

### Root Layout

- **Purpose**: Shared site chrome and metadata.
- **Dependencies**: Next.js, React, global CSS.
- **Type**: Application shell.

### Platform Route

- **Purpose**: Existing investor platform landing page.
- **Dependencies**: Tailwind utility classes.
- **Type**: Static application page.

### Proposed Elimination Prediction Route

- **Purpose**: Interactive bracket and poster generator.
- **Dependencies**: React state, client-side image export library, optional Supabase persistence.
- **Type**: Client-heavy application feature.

### Supabase Schema

- **Purpose**: Defines future persistence tables.
- **Dependencies**: Supabase/PostgreSQL.
- **Type**: Data layer.

## Data Flow

```txt
User enters event details and participants
  -> Client state creates bracket
  -> User selects matchup winners
  -> Bracket logic advances winners
  -> Champion is calculated
  -> Share card component renders poster layout
  -> Image generator converts share card to PNG
  -> User downloads, copies, or shares output
```

## Integration Points

- **Browser APIs**: `navigator.share`, clipboard, download anchor.
- **Image generation library**: Proposed `html-to-image`.
- **Social platforms**: Share URLs for X.com and Facebook; image-first sharing for Instagram, Snapchat, WeChat, and Rednote.
- **Supabase**: Optional v2 persistence for shareable public prediction URLs.

## Infrastructure Components

- **Deployment model**: Next.js deployed through Vercel.
- **Database**: Supabase schema exists but is not required for v1.
- **Storage**: No current object storage defined for generated images.

