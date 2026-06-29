# Unit Of Work Definitions

## Overview

The FIFA elimination prediction feature is decomposed into four units of work. These units are logical modules within the existing `hobite-site` Next.js application, not independently deployable services.

## Unit 1: Bracket Domain And Data

### Purpose

Define the route-local domain model, default FIFA team data, static flag/logo references, and pure bracket state transition functions.

### Responsibilities

- Define TypeScript contracts for participants, matchups, event details, predictions, poster formats, languages, and sharing payloads.
- Provide default FIFA team data.
- Provide first-round bracket seed data.
- Reference bundled flag/logo assets under `public/`.
- Create initial bracket state.
- Select winners and advance them.
- Recalculate dependent downstream matchups.
- Resolve champion state.
- Reset selected winners while preserving default data.

### Primary Files

- `app/platform/elimination-prediction/types.ts`
- `app/platform/elimination-prediction/teams.ts`
- `app/platform/elimination-prediction/bracket.ts`
- `public/elimination-prediction/flags/*`

### Inputs

- Default event details.
- Built-in participant data.
- User winner selections.

### Outputs

- `BracketPrediction` state.
- Champion participant.
- Reset prediction state.
- Local flag/logo references.

### Completion Criteria

- All domain types are defined.
- Default team and bracket seed data exist.
- Bracket state functions are pure and deterministic.
- Downstream recalculation avoids stale winners.
- Reset behavior preserves default FIFA data.

## Unit 2: Interactive Prediction UI

### Purpose

Implement the user-facing route and interactive prediction workflow.

### Responsibilities

- Add `/platform/elimination-prediction` route.
- Implement client-side `PredictionBuilder`.
- Render bracket rounds and matchup controls.
- Render event details form.
- Render poster format selector.
- Manage route-level state for prediction, language, format, event details, and generated image.
- Provide English and Chinese UI copy through route-local dictionary support.
- Keep controls responsive and accessible.

### Primary Files

- `app/platform/elimination-prediction/page.tsx`
- `app/platform/elimination-prediction/PredictionBuilder.tsx`
- `app/platform/elimination-prediction/PredictionBracket.tsx`
- `app/platform/elimination-prediction/EventDetailsForm.tsx`
- `app/platform/elimination-prediction/PosterFormatSelector.tsx`
- `app/platform/elimination-prediction/i18n.ts`

### Inputs

- Bracket domain functions from Unit 1.
- Team data from Unit 1.
- User interactions.

### Outputs

- Updated prediction state.
- Selected language.
- Selected poster format.
- Edited event details.

### Completion Criteria

- Route renders the tool directly.
- Users can complete a bracket manually.
- UI supports English and Chinese labels.
- Controls work on mobile and desktop.
- Winner controls are keyboard accessible.

## Unit 3: Poster Generation

### Purpose

Render and export a designed prediction poster in square, story, and landscape formats.

### Responsibilities

- Implement export-only `PredictionShareCard`.
- Support `1080 x 1080`, `1080 x 1920`, and `1200 x 630` layouts.
- Include event title, bracket, flags/logos, champion, final details, and Hobite branding.
- Provide fallback labels for missing champion, date, time, or stadium.
- Use bundled assets to avoid remote image export failures.
- Implement DOM-to-PNG utility.

### Primary Files

- `app/platform/elimination-prediction/PredictionShareCard.tsx`
- `app/platform/elimination-prediction/image-export.ts`

### Inputs

- `BracketPrediction` from Unit 1 and Unit 2.
- Selected poster format from Unit 2.
- Language copy from Unit 2.

### Outputs

- Poster DOM node.
- PNG blob for preview, download, or sharing.

### Completion Criteria

- All three poster formats render.
- Posters include required content.
- Poster text does not overlap in English or Chinese for expected values.
- PNG generation is isolated to client-only code.

## Unit 4: Sharing And Download

### Purpose

Provide browser sharing and download actions for generated posters.

### Responsibilities

- Download generated PNG.
- Trigger native share when supported.
- Copy share text or route URL.
- Open X.com share intent.
- Open Facebook share URL.
- Provide fallback behavior when native file sharing is unavailable.
- Avoid promising direct posting into Instagram, Snapchat, WeChat, or Rednote.

### Primary Files

- `app/platform/elimination-prediction/share.ts`
- Sharing controls inside `PredictionBuilder.tsx`

### Inputs

- PNG blob from Unit 3.
- Share text from Unit 2 localization copy.
- Current page URL.

### Outputs

- Downloaded file.
- Native share invocation.
- Clipboard value.
- Opened X.com or Facebook share URL.
- Fallback UI state or message.

### Completion Criteria

- Download action works with generated PNG.
- Native share is attempted only when supported.
- Copy action works or reports fallback.
- X.com and Facebook actions open expected URLs.
- Unsupported platform behavior is honest and clear.

