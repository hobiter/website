# Component Methods

## Type Definitions

```ts
export type LanguageCode = "en" | "zh";

export type PosterFormat = "square" | "story" | "landscape";

export type EventDetails = {
  title: string;
  finalDate?: string;
  finalTime?: string;
  stadium?: string;
};

export type Participant = {
  id: string;
  name: string;
  nameZh: string;
  seed?: number;
  flagSrc?: string;
};

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

export type BracketPrediction = {
  id: string;
  eventDetails: EventDetails;
  participants: Participant[];
  matchups: Matchup[];
  championId?: string;
  createdAt: string;
};
```

## Bracket Domain Logic

```ts
export function createBracket(
  participants: Participant[],
  eventDetails: EventDetails,
): BracketPrediction;
```

- **Purpose**: Create the initial prediction state from default FIFA teams and event details.
- **Input**: Participant list and event metadata.
- **Output**: A `BracketPrediction`.

```ts
export function selectWinner(
  prediction: BracketPrediction,
  matchupId: string,
  winnerId: string,
): BracketPrediction;
```

- **Purpose**: Select a matchup winner and advance that team.
- **Input**: Current prediction, matchup id, winner id.
- **Output**: Updated prediction state.

```ts
export function resetPrediction(
  prediction: BracketPrediction,
): BracketPrediction;
```

- **Purpose**: Clear selected winners while preserving teams and event details.
- **Input**: Current prediction.
- **Output**: Reset prediction state.

```ts
export function getChampion(
  prediction: BracketPrediction,
): Participant | undefined;
```

- **Purpose**: Resolve the final selected champion.
- **Input**: Current prediction.
- **Output**: Champion participant or `undefined`.

```ts
export function getParticipantName(
  participant: Participant,
  language: LanguageCode,
): string;
```

- **Purpose**: Resolve display name in English or Chinese.
- **Input**: Participant and language.
- **Output**: Display name.

## Prediction Builder

```ts
export default function PredictionBuilder(): JSX.Element;
```

- **Purpose**: Route-level client workflow component.
- **Input**: None.
- **Output**: Interactive prediction UI.

Internal handlers:

```ts
function handleSelectWinner(matchupId: string, winnerId: string): void;
function handleEventDetailsChange(next: EventDetails): void;
function handlePosterFormatChange(next: PosterFormat): void;
function handleLanguageChange(next: LanguageCode): void;
function handleReset(): void;
function handleGenerateImage(): Promise<void>;
function handleDownload(): void;
function handleShareNative(): Promise<void>;
function handleCopyShareText(): Promise<void>;
function handleShareToX(): void;
function handleShareToFacebook(): void;
```

## Prediction Bracket

```ts
export type PredictionBracketProps = {
  prediction: BracketPrediction;
  language: LanguageCode;
  copy: PredictionCopy;
  onSelectWinner: (matchupId: string, winnerId: string) => void;
};

export function PredictionBracket(props: PredictionBracketProps): JSX.Element;
```

- **Purpose**: Render bracket rounds and winner controls.
- **Output**: Bracket UI.

## Event Details Form

```ts
export type EventDetailsFormProps = {
  value: EventDetails;
  language: LanguageCode;
  copy: PredictionCopy;
  onChange: (next: EventDetails) => void;
};

export function EventDetailsForm(props: EventDetailsFormProps): JSX.Element;
```

- **Purpose**: Edit final match details.
- **Output**: Form UI.

## Poster Format Selector

```ts
export type PosterFormatSelectorProps = {
  value: PosterFormat;
  copy: PredictionCopy;
  onChange: (next: PosterFormat) => void;
};

export function PosterFormatSelector(
  props: PosterFormatSelectorProps,
): JSX.Element;
```

- **Purpose**: Choose square, story, or landscape output.
- **Output**: Format selector UI.

## Prediction Share Card

```ts
export type PredictionShareCardProps = {
  prediction: BracketPrediction;
  format: PosterFormat;
  language: LanguageCode;
  copy: PredictionCopy;
};

export function PredictionShareCard(
  props: PredictionShareCardProps,
): JSX.Element;
```

- **Purpose**: Render export-only poster DOM.
- **Output**: Poster component.

## Image Export Utility

```ts
export type ImageExportOptions = {
  format: PosterFormat;
  pixelRatio?: number;
};

export async function generatePredictionImage(
  node: HTMLElement,
  options: ImageExportOptions,
): Promise<Blob>;
```

- **Purpose**: Convert share-card DOM to PNG blob.
- **Input**: DOM node and export options.
- **Output**: PNG blob.

## Share Utility

```ts
export type SharePayload = {
  title: string;
  text: string;
  url: string;
  imageBlob?: Blob;
  fileName: string;
};

export function downloadImage(blob: Blob, fileName: string): void;
export async function shareNative(payload: SharePayload): Promise<boolean>;
export async function copyShareText(text: string): Promise<void>;
export function openXShare(payload: SharePayload): void;
export function openFacebookShare(payload: SharePayload): void;
```

- **Purpose**: Browser-level sharing actions.
- **Output**: Download, native share, clipboard, or opened social share URL.

