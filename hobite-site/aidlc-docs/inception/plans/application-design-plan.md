# Application Design Plan

## Purpose

Define the high-level application components, component interfaces, service orchestration, and dependency relationships for the FIFA elimination prediction feature.

## Context

The approved execution plan marks Application Design as EXECUTE because the feature introduces a new interactive route, browser-side bracket state, poster image generation, bilingual UI text, built-in flags/logos, and sharing/download utilities.

## Execution Checklist

- [x] Review requirements in `aidlc-docs/inception/requirements/requirements.md`.
- [x] Review user stories in `aidlc-docs/inception/user-stories/stories.md`.
- [x] Identify route, UI, domain, export, sharing, localization, and asset/data components.
- [x] Define component responsibilities and interfaces.
- [x] Define method signatures and high-level input/output types.
- [x] Define service orchestration patterns for prediction, poster export, and sharing.
- [x] Generate `aidlc-docs/inception/application-design/components.md`.
- [x] Generate `aidlc-docs/inception/application-design/component-methods.md`.
- [x] Generate `aidlc-docs/inception/application-design/services.md`.
- [x] Generate `aidlc-docs/inception/application-design/component-dependency.md`.
- [x] Generate consolidated `aidlc-docs/inception/application-design/application-design.md`.
- [x] Validate design completeness and consistency.

## Proposed Component Boundaries

- **Route Shell**: Next.js route entry and page-level composition.
- **Prediction Builder**: Client-side workflow container.
- **Bracket UI**: Interactive bracket display and winner controls.
- **Event Details Form**: Final date, time, stadium, and title inputs.
- **Poster Format Selector**: Square, story, and landscape format controls.
- **Share Card Renderer**: Export-only poster layout.
- **Bracket Domain Logic**: Pure functions for bracket creation, winner selection, recalculation, reset, and champion resolution.
- **Team Data And Assets**: Built-in FIFA team data and flag/logo references.
- **Localization Dictionary**: English and Chinese text.
- **Image Export Service**: DOM-to-PNG generation boundary.
- **Share Service**: Download, native share, copy, X.com, and Facebook actions.

## Design Questions

Please answer each question by filling in the letter choice after the `[Answer]:` tag.

## Question 1

Where should bracket domain logic live?

A) In a route-local pure module such as `app/platform/elimination-prediction/bracket.ts`

B) Inside the main `PredictionBuilder.tsx` client component

C) In a shared root-level module such as `lib/bracket.ts`

X) Other (please describe after `[Answer]:` below)

[Answer]: A

## Question 2

How should built-in FIFA team data and flag/logo references be organized?

A) Route-local data module plus static assets under `public/`

B) Route-local data module with emoji/text flags only

C) Shared root-level data module for possible reuse across the site

X) Other (please describe after `[Answer]:` below)

[Answer]: A

## Question 3

How should bilingual UI text be handled in v1?

A) Route-local dictionary object with English and Chinese keys

B) Full site-wide internationalization framework

C) Duplicate English and Chinese route pages

X) Other (please describe after `[Answer]:` below)

[Answer]: A

## Question 4

How should poster image generation be isolated?

A) Dedicated client-only export component plus `image-export.ts` utility

B) Generate from the visible editor UI directly

C) Keep image generation inside `PredictionBuilder.tsx`

X) Other (please describe after `[Answer]:` below)

[Answer]: A

## Question 5

How should sharing behavior be structured?

A) Dedicated `share.ts` utility with separate functions for download, native share, copy, X.com, and Facebook

B) Inline sharing handlers inside the main UI component

C) Server API route for share actions

X) Other (please describe after `[Answer]:` below)

[Answer]: A
