# Components

## Overview

The FIFA elimination prediction feature is implemented as a route-local feature under `app/platform/elimination-prediction/`. The design keeps domain logic, data, localization, image export, and sharing utilities separate from React presentation components.

## Route Shell

- **Proposed File**: `app/platform/elimination-prediction/page.tsx`
- **Purpose**: Next.js route entry point.
- **Responsibilities**:
  - Render the prediction page inside the existing site shell.
  - Provide page metadata where appropriate.
  - Load the client-side `PredictionBuilder`.
- **Interface**:
  - No external props required.
  - Returns the page layout for `/platform/elimination-prediction`.

## Prediction Builder

- **Proposed File**: `app/platform/elimination-prediction/PredictionBuilder.tsx`
- **Purpose**: Client-side workflow container.
- **Responsibilities**:
  - Own route-level interactive state.
  - Coordinate bracket selection, event details, language, poster format, export preview, and sharing actions.
  - Pass state and callbacks to child components.
- **Interface**:
  - Consumes default bracket data, localization dictionary, and domain functions.
  - Emits user actions through state updates.

## Prediction Bracket

- **Proposed File**: `app/platform/elimination-prediction/PredictionBracket.tsx`
- **Purpose**: Display matchups and winner controls.
- **Responsibilities**:
  - Render bracket rounds and matchups.
  - Display team names and flags/logos.
  - Expose accessible winner-selection controls.
  - Highlight selected winners.
- **Interface**:
  - Inputs: prediction state, language copy, selected winners.
  - Outputs: `onSelectWinner(matchupId, winnerId)`.

## Event Details Form

- **Proposed File**: `app/platform/elimination-prediction/EventDetailsForm.tsx`
- **Purpose**: Edit event and final match metadata.
- **Responsibilities**:
  - Edit event title.
  - Edit final date, final time, and stadium.
  - Provide bilingual labels.
- **Interface**:
  - Inputs: `EventDetails`, language copy.
  - Outputs: `onChange(nextEventDetails)`.

## Poster Format Selector

- **Proposed File**: `app/platform/elimination-prediction/PosterFormatSelector.tsx`
- **Purpose**: Let users choose output dimensions.
- **Responsibilities**:
  - Present square, story, and landscape options.
  - Show active format.
  - Provide accessible segmented controls or buttons.
- **Interface**:
  - Inputs: selected `PosterFormat`, language copy.
  - Outputs: `onChange(format)`.

## Prediction Share Card

- **Proposed File**: `app/platform/elimination-prediction/PredictionShareCard.tsx`
- **Purpose**: Export-only poster renderer.
- **Responsibilities**:
  - Render the poster layout for the selected format.
  - Include bracket, team assets, champion, final details, and Hobite branding.
  - Use fallback labels for missing data.
  - Avoid editor-only controls.
- **Interface**:
  - Inputs: `BracketPrediction`, `PosterFormat`, language copy.
  - Output: DOM node consumed by image export utility.

## Bracket Domain Logic

- **Proposed File**: `app/platform/elimination-prediction/bracket.ts`
- **Purpose**: Pure route-local bracket functions.
- **Responsibilities**:
  - Create initial bracket state.
  - Select winners.
  - Recalculate dependent matchups.
  - Resolve champion.
  - Reset selections.
- **Interface**:
  - Pure functions operating on typed prediction state.

## Types

- **Proposed File**: `app/platform/elimination-prediction/types.ts`
- **Purpose**: Shared route-local TypeScript contracts.
- **Responsibilities**:
  - Define participant, matchup, event, prediction, language, poster, and sharing types.
- **Interface**:
  - Export type definitions only.

## Team Data And Assets

- **Proposed Files**:
  - `app/platform/elimination-prediction/teams.ts`
  - `public/elimination-prediction/flags/*`
- **Purpose**: Built-in FIFA team list and static flag/logo references.
- **Responsibilities**:
  - Provide default participants.
  - Provide first-round matchup ordering.
  - Reference bundled assets by stable paths.
  - Provide fallback display names.
- **Interface**:
  - Export default team data and bracket seed data.

## Localization Dictionary

- **Proposed File**: `app/platform/elimination-prediction/i18n.ts`
- **Purpose**: Route-local English and Chinese copy.
- **Responsibilities**:
  - Provide labels, fallback strings, actions, and poster text.
  - Avoid site-wide i18n framework for v1.
- **Interface**:
  - Export dictionary keyed by language code.

## Image Export Utility

- **Proposed File**: `app/platform/elimination-prediction/image-export.ts`
- **Purpose**: Client-only DOM-to-PNG boundary.
- **Responsibilities**:
  - Wrap `html-to-image` or equivalent library.
  - Generate PNG data URL or blob from the share card node.
  - Keep DOM-only code outside server components.
- **Interface**:
  - Export `generatePredictionImage`.

## Share Utility

- **Proposed File**: `app/platform/elimination-prediction/share.ts`
- **Purpose**: Browser sharing and download actions.
- **Responsibilities**:
  - Download PNG.
  - Invoke native share where supported.
  - Copy share text or URL.
  - Open X.com and Facebook share URLs.
  - Provide fallbacks when platform features are unavailable.
- **Interface**:
  - Export action-specific sharing functions.

