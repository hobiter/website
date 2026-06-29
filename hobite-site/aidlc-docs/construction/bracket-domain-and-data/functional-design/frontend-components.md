# Frontend-Facing State Design: Bracket Domain And Data

## Purpose

This unit does not implement UI components, but it defines the state and functions consumed by frontend components.

## Consuming Components

- `PredictionBuilder.tsx`
- `PredictionBracket.tsx`
- `PredictionShareCard.tsx`
- `EventDetailsForm.tsx`
- `PosterFormatSelector.tsx`

## Frontend State Contract

`PredictionBuilder` owns:

```ts
const [prediction, setPrediction] = useState<BracketPrediction>(...);
const [language, setLanguage] = useState<LanguageCode>("en");
const [posterFormat, setPosterFormat] = useState<PosterFormat>("square");
```

The domain unit provides:

- Initial prediction state.
- Immutable next prediction states after user actions.
- Champion resolution.
- Participant name helpers.

## UI Interaction Mapping

### Winner Selection

```txt
User clicks/selects team
  -> PredictionBracket calls onSelectWinner(matchupId, winnerId)
  -> PredictionBuilder calls selectWinner(prediction, matchupId, winnerId)
  -> setPrediction(nextPrediction)
```

### Reset

```txt
User clicks reset
  -> PredictionBuilder calls resetPrediction(prediction)
  -> setPrediction(resetState)
```

### Champion Display

```txt
PredictionBuilder or PredictionShareCard calls getChampion(prediction)
  -> show champion name or fallback label
```

## UI Assumptions

- The UI should disable or visually soften winner controls for incomplete matchups.
- The domain still validates selections strictly even if UI prevents invalid clicks.
- The UI should treat unchanged returned state as a no-op.
- The UI should not mutate `prediction.matchups` directly.
- The UI should use participant ids to avoid object identity issues.

## Accessibility Expectations

- Each selectable team should expose an accessible label with matchup and team name.
- Selected winner state should not rely on color alone.
- Keyboard selection should call the same domain pathway as pointer selection.

## Poster Expectations

The poster renderer consumes the same `BracketPrediction` state as the editor. It should not construct its own bracket state.

For missing data:

- Missing champion: use localized fallback.
- Missing date/time/stadium: use localized fallback.
- Missing flag/logo: use localized team text fallback.

## Error Handling Expectations

Invalid operations return unchanged state. UI can optionally display no error for normal no-op cases.

Examples:

- Clicking a disabled or stale control.
- Attempting to select a team that has already been cleared from the branch.
- Re-selecting the same winner.

