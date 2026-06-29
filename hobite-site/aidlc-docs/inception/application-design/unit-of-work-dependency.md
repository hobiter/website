# Unit Of Work Dependency Matrix

## Dependency Order

The approved dependency order is:

1. Bracket Domain And Data
2. Interactive Prediction UI
3. Poster Generation
4. Sharing And Download

## Dependency Matrix

| Unit | Depends On | Depended On By | Dependency Type |
|---|---|---|---|
| Unit 1: Bracket Domain And Data | None | Units 2, 3 | Foundational domain/data dependency |
| Unit 2: Interactive Prediction UI | Unit 1 | Units 3, 4 | State orchestration and user workflow dependency |
| Unit 3: Poster Generation | Units 1, 2 | Unit 4 | Generated image dependency |
| Unit 4: Sharing And Download | Units 2, 3 | None | Final action dependency |

## Critical Path

```txt
Unit 1 -> Unit 2 -> Unit 3 -> Unit 4
```

## Dependency Details

### Unit 1 To Unit 2

Unit 2 needs:

- Domain types.
- Default team data.
- Bracket seed data.
- `createBracket`.
- `selectWinner`.
- `resetPrediction`.
- `getChampion`.

### Unit 1 To Unit 3

Unit 3 needs:

- Prediction state contracts.
- Participant names and flag/logo references.
- Champion resolution helpers.
- Event details shape.

### Unit 2 To Unit 3

Unit 3 needs:

- Selected language.
- Selected poster format.
- Current prediction state.
- Localized poster labels.

### Unit 2 And Unit 3 To Unit 4

Unit 4 needs:

- Share text and route URL from UI state.
- Generated PNG blob from poster export.
- Current selected format for file naming.

## Parallelization Opportunities

- Unit 1 should be completed first.
- Some UI layout work in Unit 2 can begin with mocked Unit 1 state, but final integration depends on Unit 1.
- Unit 3 visual layout can begin with mock prediction state after Unit 1 types are stable.
- Unit 4 should wait until Unit 3 produces a PNG blob contract.

## Integration Checkpoints

### Checkpoint 1: Domain State

- Unit 1 creates and updates bracket state correctly.
- Winner selection and reset behavior are deterministic.

### Checkpoint 2: UI Interaction

- Unit 2 can complete the bracket using Unit 1 functions.
- Event details and poster format state are editable.

### Checkpoint 3: Poster Export

- Unit 3 renders poster with Unit 2 state.
- PNG generation returns a usable blob.

### Checkpoint 4: Share Actions

- Unit 4 can download, share, copy, and open social share actions using Unit 3 output.

## Rollback Strategy

Because the feature is route-local, rollback can remove:

- `app/platform/elimination-prediction/`
- `public/elimination-prediction/`
- Any added dependency in `package.json`

No database migration rollback is required for v1.

