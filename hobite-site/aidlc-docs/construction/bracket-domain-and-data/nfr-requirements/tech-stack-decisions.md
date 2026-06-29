# Tech Stack Decisions: Bracket Domain And Data

## Decision Summary

| Area | Decision |
|---|---|
| Language | TypeScript |
| Runtime Dependencies | None for domain logic |
| UI Dependencies | None |
| Framework Dependencies | None |
| Data Location | Route-local `teams.ts` |
| Types Location | Route-local `types.ts` |
| Domain Logic Location | Route-local `bracket.ts` |
| Asset Location | `public/elimination-prediction/flags/` |
| Testing Direction | Focused unit tests for pure functions |

## TypeScript

### Decision

Use TypeScript for all domain entities, team data, and bracket functions.

### Rationale

The existing project already uses strict TypeScript. The bracket domain has important state invariants that benefit from explicit types.

## No Runtime Library Dependency

### Decision

Do not add a bracket-specific runtime dependency for Unit 1.

### Rationale

The approved v1 bracket is a fixed 32-team knockout flow. The logic is small enough to implement directly and should remain deterministic and testable.

## No React Or Browser Dependency

### Decision

Keep Unit 1 free of React, DOM, browser APIs, Next.js APIs, Supabase, and network dependencies.

### Rationale

The domain logic should be reusable by UI and poster components without depending on render context or browser availability. This also makes focused unit tests simpler.

## Route-Local Modules

### Decision

Keep Unit 1 modules under:

```txt
app/platform/elimination-prediction/
```

Expected files:

```txt
types.ts
teams.ts
bracket.ts
```

### Rationale

The feature is v1 route-local and FIFA-specific. Moving to shared `lib/` can happen later if additional routes reuse the bracket logic.

## Local Public Assets

### Decision

Participant `flagSrc` values should reference bundled assets under:

```txt
public/elimination-prediction/flags/
```

### Rationale

Local assets reduce image export failures and avoid remote image/CORS issues in later poster generation.

## Focused Unit Tests

### Decision

Target focused unit tests for domain behavior.

### Recommended Test Areas

- `createBracket` creates 32 participants and 31 matchups.
- First round has 16 complete matchups.
- Later rounds start empty.
- `selectWinner` accepts only matchup participants.
- Winners advance to expected next slots.
- Downstream dependent selections clear when earlier winners change.
- Unrelated branches remain unchanged.
- `getChampion` resolves final winner.
- `resetPrediction` preserves first-round teams and clears picks.

### Rationale

Unit 1 contains the most important business logic. Focused unit tests provide high value without requiring a full property-based test framework.

## Explicit Non-Decisions

- No Supabase persistence for Unit 1.
- No API route for Unit 1.
- No remote FIFA data fetch for v1.
- No remote flag URLs for v1.
- No generalized tournament engine dependency for v1.

