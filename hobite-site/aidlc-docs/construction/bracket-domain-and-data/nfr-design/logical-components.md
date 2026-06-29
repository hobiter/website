# Logical Components: Bracket Domain And Data

## Overview

Unit 1 is composed of route-local TypeScript logical components. These components are files and function groups rather than deployable services.

## Component 1: Type Contracts

- **File**: `app/platform/elimination-prediction/types.ts`
- **Purpose**: Define shared feature contracts.
- **Responsibilities**:
  - `Participant`
  - `EventDetails`
  - `Matchup`
  - `BracketPrediction`
  - `LanguageCode`
  - `PosterFormat`
  - Future sharing payload types if needed
- **NFR Role**:
  - Maintains type safety.
  - Prevents UI and domain modules from drifting.

## Component 2: Static Team Data

- **File**: `app/platform/elimination-prediction/teams.ts`
- **Purpose**: Provide the fixed 32-team FIFA v1 data set.
- **Responsibilities**:
  - Export 32 participants.
  - Include English and Chinese team names.
  - Include optional `flagSrc` local paths.
  - Define first-round ordering.
- **NFR Role**:
  - Avoids network fetches.
  - Supports offline domain operation.
  - Uses local asset references for poster export reliability.

## Component 3: Bracket Creation

- **File**: `app/platform/elimination-prediction/bracket.ts`
- **Purpose**: Build initial 32-team prediction state.
- **Responsibilities**:
  - Create 31 matchups.
  - Assign 16 first-round matchups.
  - Link matchups through `nextMatchupId` and `nextSlot`.
  - Initialize empty later-round slots.
- **NFR Role**:
  - Synchronous creation.
  - Deterministic structure.

## Component 4: Winner Selection

- **File**: `app/platform/elimination-prediction/bracket.ts`
- **Purpose**: Apply valid user selections.
- **Responsibilities**:
  - Validate matchup and winner.
  - Set current matchup winner.
  - Advance winner to next matchup slot.
  - Recalculate champion.
- **NFR Role**:
  - Strict validation.
  - Immutable updates.
  - Immediate UI response.

## Component 5: Downstream Clearing

- **File**: `app/platform/elimination-prediction/bracket.ts`
- **Purpose**: Clear dependent stale picks after branch changes.
- **Responsibilities**:
  - Traverse `nextMatchupId` and `nextSlot`.
  - Clear invalid downstream slots and winners.
  - Preserve unrelated branches.
- **NFR Role**:
  - Reliability and data integrity.
  - Avoids broad destructive clearing.

## Component 6: Reset And Champion Helpers

- **File**: `app/platform/elimination-prediction/bracket.ts`
- **Purpose**: Provide state utility functions.
- **Responsibilities**:
  - Reset selections.
  - Resolve champion.
  - Resolve participant display name.
- **NFR Role**:
  - Keeps derived state consistent.
  - Supports UI and poster reuse.

## Component 7: Unit Tests

- **Recommended File**: `app/platform/elimination-prediction/bracket.test.ts`
- **Purpose**: Verify pure domain behavior.
- **Responsibilities**:
  - Test bracket creation.
  - Test winner advancement.
  - Test branch-specific clearing.
  - Test champion resolution.
  - Test reset.
  - Test invalid action no-ops.
- **NFR Role**:
  - Protects core business logic.
  - Supports refactoring before UI integration.

## Component Interaction

```txt
teams.ts
  -> createBracket

types.ts
  -> teams.ts
  -> bracket.ts
  -> test file

bracket.ts
  -> createBracket
  -> selectWinner
  -> downstream clearing
  -> getChampion
  -> resetPrediction

bracket.test.ts
  -> imports teams.ts, types.ts, bracket.ts
```

## Implementation Constraints

- No React imports.
- No browser APIs.
- No Next.js APIs.
- No Supabase imports.
- No network calls.
- No runtime asset existence checks.
- No mutation of input prediction state.

