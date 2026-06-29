# Unit Of Work Plan

## Purpose

Decompose the FIFA elimination prediction feature into manageable implementation units that map cleanly to user stories, application components, and dependency order.

## Context

This is a brownfield Next.js App Router application. The feature is route-local, browser-only for v1, and does not require backend infrastructure or Supabase persistence.

## Proposed Decomposition

### Unit 1: Bracket Domain And Data

- Types.
- FIFA team data.
- Static flag/logo references.
- Bracket creation.
- Winner selection.
- Downstream recalculation.
- Champion resolution.
- Reset behavior.

### Unit 2: Interactive Prediction UI

- Route shell.
- Prediction builder.
- Bracket UI.
- Event details form.
- Poster format selector.
- English and Chinese UI controls.

### Unit 3: Poster Generation

- Export-only poster component.
- Square, story, and landscape layouts.
- Poster text and fallback labels.
- DOM-to-PNG image export utility.

### Unit 4: Sharing And Download

- PNG download.
- Native share.
- Copy share text or URL.
- X.com share action.
- Facebook share action.
- Unsupported platform fallback behavior.

## Execution Checklist

- [x] Review requirements in `aidlc-docs/inception/requirements/requirements.md`.
- [x] Review stories in `aidlc-docs/inception/user-stories/stories.md`.
- [x] Review application design artifacts in `aidlc-docs/inception/application-design/`.
- [x] Confirm decomposition approach.
- [x] Generate `aidlc-docs/inception/application-design/unit-of-work.md`.
- [x] Generate `aidlc-docs/inception/application-design/unit-of-work-dependency.md`.
- [x] Generate `aidlc-docs/inception/application-design/unit-of-work-story-map.md`.
- [x] Validate unit boundaries and dependencies.
- [x] Ensure all stories are assigned to units.

## Questions For Approval

Please answer each question by filling in the letter choice after the `[Answer]:` tag.

## Question 1

Should the feature be decomposed into the four proposed units?

A) Yes, use the four proposed units: domain/data, interactive UI, poster generation, sharing/download

B) Use fewer units by combining poster generation and sharing/download

C) Use more units by splitting localization/assets into a separate unit

X) Other (please describe after `[Answer]:` below)

[Answer]: A

## Question 2

What should be the implementation dependency order?

A) Domain/data first, then UI, then poster generation, then sharing/download

B) UI first with placeholder data, then domain/data, then poster generation, then sharing/download

C) Poster generation first from static mock state, then domain/data, then UI, then sharing/download

X) Other (please describe after `[Answer]:` below)

[Answer]: A

## Question 3

How should bilingual/localization work be assigned?

A) Include localization in Interactive Prediction UI, with dictionary support consumed by poster and sharing units

B) Create a separate Localization unit

C) Include localization work inside every unit that displays text

X) Other (please describe after `[Answer]:` below)

[Answer]: A

## Question 4

How should flag/logo assets be assigned?

A) Include team data and asset references in Bracket Domain And Data

B) Create a separate Assets unit

C) Include assets in Poster Generation only

X) Other (please describe after `[Answer]:` below)

[Answer]: A
