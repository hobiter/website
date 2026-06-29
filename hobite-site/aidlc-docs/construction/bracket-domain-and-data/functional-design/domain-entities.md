# Domain Entities: Bracket Domain And Data

## Participant

Represents a FIFA team in the bracket.

```ts
export type Participant = {
  id: string;
  name: string;
  nameZh: string;
  seed?: number;
  flagSrc?: string;
};
```

### Fields

- `id`: Stable team identifier.
- `name`: English display name.
- `nameZh`: Chinese display name.
- `seed`: Optional seed or ordering value.
- `flagSrc`: Optional local public asset path.

## EventDetails

Represents poster-level match and event metadata.

```ts
export type EventDetails = {
  title: string;
  finalDate?: string;
  finalTime?: string;
  stadium?: string;
};
```

### Fields

- `title`: Event or prediction title.
- `finalDate`: Optional final match date.
- `finalTime`: Optional final match time.
- `stadium`: Optional final venue.

## Matchup

Represents one head-to-head bracket matchup.

```ts
export type Matchup = {
  id: string;
  round: number;
  index: number;
  leftId?: string;
  rightId?: string;
  winnerId?: string;
  nextMatchupId?: string;
  nextSlot?: "leftId" | "rightId";
};
```

### Fields

- `id`: Stable matchup identifier.
- `round`: Round number from 1 to 5.
- `index`: Zero-based index within the round.
- `leftId`: Participant id in left slot.
- `rightId`: Participant id in right slot.
- `winnerId`: Selected winner participant id.
- `nextMatchupId`: Matchup id that receives this winner.
- `nextSlot`: Slot in the next matchup that receives this winner.

## BracketPrediction

Represents the full prediction state.

```ts
export type BracketPrediction = {
  id: string;
  eventDetails: EventDetails;
  participants: Participant[];
  matchups: Matchup[];
  championId?: string;
  createdAt: string;
};
```

### Fields

- `id`: Prediction identifier.
- `eventDetails`: Final/event metadata.
- `participants`: All 32 participants.
- `matchups`: All 31 bracket matchups.
- `championId`: Final champion if selected.
- `createdAt`: Creation timestamp.

## Supporting Types

```ts
export type LanguageCode = "en" | "zh";

export type PosterFormat = "square" | "story" | "landscape";
```

## Entity Relationships

```txt
BracketPrediction
  -> EventDetails
  -> Participant[32]
  -> Matchup[31]
      -> leftId references Participant.id
      -> rightId references Participant.id
      -> winnerId references Participant.id
      -> nextMatchupId references Matchup.id
  -> championId references Participant.id
```

## Invariants

- A v1 prediction contains exactly 32 participants.
- A v1 prediction contains exactly 31 matchups.
- First-round matchups contain two participant ids.
- Later-round participant slots are filled only by winner advancement.
- `winnerId`, when present, must match `leftId` or `rightId` in the same matchup.
- `championId`, when present, must match the final matchup winner.

