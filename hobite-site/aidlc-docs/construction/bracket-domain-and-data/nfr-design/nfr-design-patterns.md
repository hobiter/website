# NFR Design Patterns: Bracket Domain And Data

## Scope

This document defines non-functional design patterns for Unit 1: Bracket Domain And Data.

## Pattern 1: Pure Domain Module

### Intent

Keep bracket logic deterministic, testable, and independent from React, browser, Next.js, Supabase, and network runtime concerns.

### Design

- `bracket.ts` exports pure functions.
- `types.ts` exports route-local type contracts.
- `teams.ts` exports static participant and seed data.
- No function performs async work.
- No function reads from or writes to external state.

### Applies To

- `createBracket`
- `selectWinner`
- `resetPrediction`
- `getChampion`
- Helper functions

## Pattern 2: Shallow Immutable State Updates

### Intent

Avoid mutating input state while keeping 32-team operations fast and simple.

### Design

Use shallow cloning:

```txt
prediction
  -> clone top-level object
  -> map matchups
  -> clone only changed matchup objects
  -> preserve unchanged participant objects
```

### Rationale

This supports React state updates and avoids unnecessary full deep cloning. It also keeps each winner selection synchronous and responsive.

## Pattern 3: Small Validation Helpers

### Intent

Keep public domain functions readable and ensure consistent strict validation.

### Helper Categories

- Find matchup by id.
- Check whether participant belongs to matchup.
- Check whether matchup has both sides.
- Find participant by id.
- Resolve final matchup.

### Example Helper Names

```ts
function findMatchup(prediction: BracketPrediction, matchupId: string): Matchup | undefined;
function isParticipantInMatchup(matchup: Matchup, participantId: string): boolean;
function isCompleteMatchup(matchup: Matchup): boolean;
function findParticipant(prediction: BracketPrediction, participantId: string): Participant | undefined;
```

## Pattern 4: No-Op Failure For Normal Invalid Actions

### Intent

Make UI interactions forgiving without hiding domain corruption.

### Design

Normal invalid operations return the original prediction object unchanged:

- Unknown matchup.
- Winner not present in matchup.
- Incomplete matchup.
- Unknown participant.

Unexpected programmer errors can still be prevented through TypeScript and tests.

## Pattern 5: Dependency-Chain Downstream Clearing

### Intent

Clear only downstream picks affected by a changed branch while preserving unrelated branches.

### Design

Use `nextMatchupId` and `nextSlot` to traverse the changed branch:

```txt
changed matchup
  -> nextMatchupId
  -> nextSlot
  -> update fed slot
  -> clear invalid winner
  -> continue if that invalidation affects the next matchup
```

### Rationale

This avoids rebuilding the entire bracket and avoids clearing unrelated user picks.

## Pattern 6: Local Asset Reference Pattern

### Intent

Avoid image export and CORS failures caused by remote flag/logo URLs.

### Design

- Store local asset path in `Participant.flagSrc`.
- Keep asset path optional.
- UI and poster components handle missing asset fallback.
- Domain functions do not verify asset existence at runtime.

## Pattern 7: Route-Local Unit Testing

### Intent

Keep tests near the domain module and focused on pure behavior.

### Design

Recommended test file:

```txt
app/platform/elimination-prediction/bracket.test.ts
```

Test cases should call domain functions directly and avoid React rendering.

## Pattern 8: Generic Round Fields With Fixed V1 Shape

### Intent

Support the approved 32-team v1 bracket while avoiding a dead-end model.

### Design

- Use generic `round` and `index` fields.
- Use `nextMatchupId` and `nextSlot`.
- Use 32-team default data for v1.

This keeps future configurable bracket sizes possible without adding v1 complexity.

