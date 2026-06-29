# API Documentation

## Existing REST APIs

### Admin Posts API

- **Path**: `app/api/admin/posts/route.ts`
- **Purpose**: Supports admin/blog post functionality.
- **Current Relevance**: Not directly required for elimination prediction v1.

## Proposed Internal APIs

### Bracket Creation

- **Method**: `createBracket(participants: Participant[]): BracketPrediction`
- **Purpose**: Generate an initial bracket from participants.
- **Returns**: A bracket prediction with first-round matchups and empty winners.

### Winner Selection

- **Method**: `selectWinner(prediction: BracketPrediction, matchupId: string, winnerId: string): BracketPrediction`
- **Purpose**: Record a matchup winner and advance that participant.
- **Returns**: A recalculated prediction state.

### Champion Selection

- **Method**: `getChampion(prediction: BracketPrediction): Participant | undefined`
- **Purpose**: Resolve the final winner when the final matchup is complete.

### Image Generation

- **Method**: `generatePredictionImage(node: HTMLElement): Promise<string>`
- **Purpose**: Convert the poster component into a PNG data URL.

### Sharing

- **Method**: `sharePrediction(target: ShareTarget, payload: SharePayload): Promise<void>`
- **Purpose**: Route download, native share, copy link, and platform share actions.

## Data Models

### Participant

- `id`: Stable identifier.
- `name`: Display name.
- `seed`: Optional bracket seed.
- `logoUrl`: Optional logo or flag image URL.

### EventDetails

- `title`: Event title.
- `finalDate`: Optional final date.
- `finalTime`: Optional final time.
- `stadium`: Optional stadium or venue.

### Matchup

- `id`: Stable identifier.
- `round`: Round number.
- `index`: Matchup index inside the round.
- `left`: Optional left participant.
- `right`: Optional right participant.
- `winnerId`: Optional selected winner.

### BracketPrediction

- `id`: Prediction identifier.
- `title`: Prediction title.
- `eventDetails`: Event metadata for poster output.
- `participants`: Participant list.
- `matchups`: Matchup list.
- `championId`: Optional final champion.
- `createdAt`: Creation timestamp.

