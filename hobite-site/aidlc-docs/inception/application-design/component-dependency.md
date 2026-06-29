# Component Dependency Design

## Dependency Matrix

| Component | Depends On | Used By |
|---|---|---|
| `page.tsx` | `PredictionBuilder` | Next.js router |
| `PredictionBuilder.tsx` | `teams.ts`, `i18n.ts`, `bracket.ts`, UI components, `image-export.ts`, `share.ts` | `page.tsx` |
| `PredictionBracket.tsx` | `types.ts`, `i18n.ts` copy shape | `PredictionBuilder` |
| `EventDetailsForm.tsx` | `types.ts`, `i18n.ts` copy shape | `PredictionBuilder` |
| `PosterFormatSelector.tsx` | `types.ts`, `i18n.ts` copy shape | `PredictionBuilder` |
| `PredictionShareCard.tsx` | `types.ts`, `bracket.ts` helpers, `i18n.ts` copy shape | `PredictionBuilder`, `image-export.ts` indirectly |
| `bracket.ts` | `types.ts` | `PredictionBuilder`, `PredictionShareCard` |
| `types.ts` | None | All route-local modules |
| `teams.ts` | `types.ts`, static asset paths | `PredictionBuilder` |
| `i18n.ts` | `types.ts` | All UI and share modules |
| `image-export.ts` | `html-to-image`, browser DOM | `PredictionBuilder` |
| `share.ts` | Browser APIs | `PredictionBuilder` |

## Communication Patterns

### Parent-To-Child Props

`PredictionBuilder` passes prediction state, language, copy, format, and callbacks to child components.

### Child-To-Parent Callbacks

Child components emit user actions through typed callbacks:

- Winner selection.
- Event detail changes.
- Poster format changes.
- Language changes.
- Reset.
- Generate/share/download actions.

### Pure Domain Function Calls

`PredictionBuilder` calls pure functions from `bracket.ts` and stores the returned state.

### Browser Utility Calls

`PredictionBuilder` calls `image-export.ts` and `share.ts` only in response to user actions. These modules should not be imported by server components.

## Data Flow

```txt
Default team data + default event details
  -> createBracket
  -> PredictionBuilder state
  -> PredictionBracket renders matchups
  -> User selects winner
  -> selectWinner
  -> updated PredictionBuilder state
  -> PredictionShareCard renders poster
  -> generatePredictionImage
  -> PNG blob
  -> download/native share/copy/social share
```

## State Ownership

| State | Owner |
|---|---|
| Bracket prediction | `PredictionBuilder` |
| Language | `PredictionBuilder` |
| Poster format | `PredictionBuilder` |
| Event details | `PredictionBuilder`, edited by `EventDetailsForm` |
| Generated image blob/URL | `PredictionBuilder` |
| Static team data | `teams.ts` |
| Copy dictionary | `i18n.ts` |

## Dependency Rules

- Domain logic must not import React.
- `bracket.ts` must remain pure and deterministic.
- Server route entry must not import browser-only utilities directly.
- Browser-only utilities must be called from client components.
- Poster rendering must not depend on editor-only layout components.
- Static assets must be bundled or served locally to avoid image export CORS issues.

