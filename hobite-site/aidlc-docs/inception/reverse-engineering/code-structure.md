# Code Structure

## Build System

- **Type**: npm
- **Configuration**: `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`
- **Framework**: Next.js 16 App Router
- **Styling**: Tailwind CSS 4 through global CSS import

## Existing Files Inventory

- `app/layout.tsx` - Shared root layout, navigation, footer, metadata.
- `app/page.tsx` - Home page and research links.
- `app/platform/page.tsx` - Static platform landing page.
- `app/research/page.tsx` - Research index.
- `app/research/*/page.tsx` - Static research report pages.
- `app/blog/page.tsx` - Blog route.
- `app/blog/BlogClient.tsx` - Client-side blog UI.
- `app/admin/page.tsx` - Admin route.
- `app/admin/AdminBlogManager.tsx` - Client-side admin manager.
- `app/api/admin/posts/route.ts` - Admin posts API route.
- `supabase/schema.sql` - Current and future persistence schema.
- `ELIMINATION_PREDICTION_DESIGN.md` - Proposed feature design.

## Proposed Files

- `app/platform/elimination-prediction/page.tsx` - Route entry.
- `app/platform/elimination-prediction/PredictionBuilder.tsx` - Client workflow container.
- `app/platform/elimination-prediction/PredictionBracket.tsx` - Interactive bracket UI.
- `app/platform/elimination-prediction/PredictionShareCard.tsx` - Export-only poster component.
- `app/platform/elimination-prediction/share.ts` - Sharing and download utilities.
- `app/platform/elimination-prediction/types.ts` - Feature data types.

## Design Patterns

### App Router Route Modules

- **Location**: `app/**/page.tsx`
- **Purpose**: Route-based page composition.
- **Implementation**: File-system routing with colocated route components.

### Client Components For Interactive Features

- **Location**: `app/admin/AdminBlogManager.tsx`, `app/blog/BlogClient.tsx`
- **Purpose**: Browser-state-driven UI.
- **Implementation**: Client components with local browser state.

### Utility Types And Data Modules

- **Location**: Existing research data files and proposed `types.ts`.
- **Purpose**: Keep structured data separate from UI components.

## Critical Dependencies

- `next` - App framework and build system.
- `react` and `react-dom` - Component UI.
- `@supabase/supabase-js` - Optional persistence integration.
- Proposed `html-to-image` - Client-side PNG generation.

