# Application Design: FIFA Elimination Prediction Poster

## Design Summary

The feature is a route-local client-side tool under `/platform/elimination-prediction`. It uses Next.js App Router for page entry, React client components for the interactive workflow, pure TypeScript modules for bracket logic, static data/assets for FIFA teams, a local dictionary for English and Chinese UI, and browser utilities for PNG export and sharing.

## Key Decisions

- Bracket domain logic lives in route-local pure module `bracket.ts`.
- Team data lives in route-local `teams.ts`; static flags/logos live under `public/`.
- Bilingual UI uses a route-local dictionary in `i18n.ts`.
- Poster generation is isolated through an export-only component and `image-export.ts`.
- Sharing is isolated in `share.ts` with dedicated functions for each action.
- v1 does not add backend APIs, Supabase persistence, public share URLs, or infrastructure changes.

## Proposed File Structure

```txt
app/platform/elimination-prediction/
  page.tsx
  PredictionBuilder.tsx
  PredictionBracket.tsx
  EventDetailsForm.tsx
  PosterFormatSelector.tsx
  PredictionShareCard.tsx
  bracket.ts
  teams.ts
  i18n.ts
  image-export.ts
  share.ts
  types.ts

public/elimination-prediction/flags/
  [team assets]
```

## Component Model

The primary workflow component is `PredictionBuilder`. It owns state and coordinates child components. UI components stay focused on display and user input. Domain, data, localization, export, and sharing modules remain separate so they can be tested and evolved independently.

See:

- `components.md`
- `component-methods.md`
- `services.md`
- `component-dependency.md`

## Main Workflow

```txt
User opens /platform/elimination-prediction
  -> page.tsx renders PredictionBuilder
  -> PredictionBuilder initializes bracket from teams.ts and bracket.ts
  -> User selects winners in PredictionBracket
  -> bracket.ts returns recalculated state
  -> User edits final details and poster format
  -> PredictionShareCard renders export poster
  -> image-export.ts generates PNG blob
  -> share.ts downloads, shares, copies, or opens social share actions
```

## Design Traceability

| Requirement/Story Area | Design Element |
|---|---|
| Route and page shell | `page.tsx`, `PredictionBuilder.tsx` |
| Manual winner selection | `PredictionBracket.tsx`, `bracket.ts` |
| Downstream recalculation | `bracket.ts` |
| Final match details | `EventDetailsForm.tsx`, `PredictionShareCard.tsx` |
| Three poster formats | `PosterFormatSelector.tsx`, `PredictionShareCard.tsx`, `image-export.ts` |
| Built-in flags/logos | `teams.ts`, `public/elimination-prediction/flags/` |
| English/Chinese UI | `i18n.ts` |
| Download/share/copy/social | `share.ts` |
| Browser-only v1 | No API routes, no Supabase changes |
| Reset behavior | `PredictionBuilder.tsx`, `bracket.ts` |

## Quality Considerations

- Keep bracket logic pure for easier testing.
- Keep DOM-to-PNG export client-only.
- Use bundled image assets to reduce export failures.
- Design poster layouts with fixed dimensions and text overflow safeguards.
- Keep UI controls accessible and language-aware.
- Keep v1 state browser-local.

