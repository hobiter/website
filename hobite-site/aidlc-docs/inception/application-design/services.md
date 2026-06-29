# Services

## Overview

This feature does not introduce backend services in v1. Service boundaries are client-side orchestration and utility boundaries inside the route-local feature folder.

## Prediction Service

- **Proposed Module**: `bracket.ts`
- **Type**: Pure domain service.
- **Responsibilities**:
  - Create bracket state.
  - Select winners.
  - Advance winners into later rounds.
  - Recalculate dependent matchups.
  - Resolve champion.
  - Reset prediction state.
- **Interactions**:
  - Called by `PredictionBuilder`.
  - Supplies updated state to UI and poster renderer.

## Data Service

- **Proposed Module**: `teams.ts`
- **Type**: Static data service.
- **Responsibilities**:
  - Export built-in FIFA teams.
  - Export seeded first-round bracket structure.
  - Provide flag/logo asset references.
- **Interactions**:
  - Used by `PredictionBuilder` when initializing state.
  - Used by bracket and poster components through prediction state.

## Localization Service

- **Proposed Module**: `i18n.ts`
- **Type**: Static dictionary service.
- **Responsibilities**:
  - Provide English and Chinese route copy.
  - Provide poster fallback labels.
  - Provide accessible action labels.
- **Interactions**:
  - Used by all UI components.
  - Used by poster renderer and share text construction.

## Image Export Service

- **Proposed Module**: `image-export.ts`
- **Type**: Client-only browser utility service.
- **Responsibilities**:
  - Isolate DOM-to-PNG conversion.
  - Hide `html-to-image` details from UI components.
  - Return PNG blob to caller.
- **Interactions**:
  - Called by `PredictionBuilder` after `PredictionShareCard` is rendered.
  - Feeds output into preview/download/share actions.

## Share Service

- **Proposed Module**: `share.ts`
- **Type**: Client-only browser utility service.
- **Responsibilities**:
  - Download PNG files.
  - Invoke native share when supported.
  - Copy share text or URL.
  - Open X.com and Facebook share URLs.
  - Return/fail gracefully where browser APIs are unavailable.
- **Interactions**:
  - Called by `PredictionBuilder`.
  - Consumes generated PNG blob and share payload.

## UI Orchestration Service

- **Proposed Component**: `PredictionBuilder.tsx`
- **Type**: Client-side orchestration component.
- **Responsibilities**:
  - Coordinate route state.
  - Bind domain functions to UI actions.
  - Maintain selected language, poster format, generated image, and event details.
  - Bridge export component and browser utilities.
- **Interactions**:
  - Owns the top-level client workflow.
  - Passes state to bracket, forms, poster, and action controls.

## Service Interaction Summary

```txt
PredictionBuilder
  -> teams.ts for default FIFA data
  -> i18n.ts for English/Chinese copy
  -> bracket.ts for prediction state transitions
  -> PredictionBracket for winner selection UI
  -> EventDetailsForm for final details
  -> PosterFormatSelector for export size
  -> PredictionShareCard for export DOM
  -> image-export.ts for PNG generation
  -> share.ts for download/share/copy/social actions
```

