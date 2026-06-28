# Elimination Prediction Feature Design

## Goal

Build an interactive elimination-stage prediction tool in `hobite-site` that lets users create a knockout prediction, generate a polished final image, and share or download it for social platforms.

The first version should prioritize a reliable manual prediction workflow. AI-assisted or probability-based predictions can be added after the bracket, image generation, and sharing loop work end to end.

## Route

Recommended route:

```txt
/platform/elimination-prediction
```

This keeps the feature under the existing `Platform` area while separating it from long-form research pages.

## User Flow

1. User opens the elimination prediction page.
2. User selects or enters participants.
3. App renders elimination stages such as Round 1, Quarterfinals, Semifinals, Final, and Winner.
4. User selects winners in each matchup.
5. Winners automatically advance to the next stage.
6. User clicks `Generate Image`.
7. App creates a branded Hobite Capital prediction image.
8. User can download, copy, or share the result.

## Core Requirements

### 1. Predict Elimination Stages

The tool should support:

- Configurable participant list.
- Head-to-head matchups.
- Winner selection for each matchup.
- Automatic advancement into later rounds.
- Final champion calculation.
- Reset and edit behavior.

Initial supported bracket sizes:

- 4 participants.
- 8 participants.
- 16 participants.

Later versions can add custom seeds, groups, play-in rounds, and probability-based suggestions.

### 2. Generate Final Image

Reference image:

```txt
C:/Users/sunyo/Documents/xwechat_files/q187387688_371b/temp/RWTemp/2026-06/4fa2941bace95fdf5c5c2ebb59d5a901.jpg
```

The generated image should follow the same overall idea as the sample: a full knockout-stage poster with teams on both sides, bracket lines advancing toward the center, and the final match information emphasized in the middle.

The generated image should include:

- Hobite Capital branding.
- Prediction title.
- All bracket stages.
- Selected champion.
- Winning team after the user completes predictions.
- Final match date.
- Final match time.
- Final stadium or venue.
- Optional event label, such as `FIFA World Cup 2026`.
- Optional watermark such as `hobite.capital`.

Use a hidden or offscreen React component as the source of truth for the image layout.

Recommended library:

```bash
npm install html-to-image
```

Example:

```ts
import { toPng } from "html-to-image";

async function generatePredictionImage(node: HTMLElement) {
  return await toPng(node, {
    pixelRatio: 2,
    backgroundColor: "#ffffff",
  });
}
```

### 3. Download And Share

The feature should support:

- Download PNG.
- Copy share link.
- Native device share via `navigator.share` when available.
- X.com share URL.
- Facebook share URL.
- Image-first sharing for Instagram, Snapchat, WeChat, and Rednote.

Some platforms do not support direct browser-based image posting from a normal website. For Instagram, Snapchat, WeChat, and Rednote, the best v1 flow is to generate and download the image, then let the user share it through the mobile native share sheet or upload it manually.

## Suggested File Structure

```txt
hobite-site/
  app/
    platform/
      elimination-prediction/
        page.tsx
        PredictionBuilder.tsx
        PredictionBracket.tsx
        PredictionShareCard.tsx
        share.ts
        types.ts
```

## Data Model

```ts
export type Participant = {
  id: string;
  name: string;
  seed?: number;
  logoUrl?: string;
};

export type Matchup = {
  id: string;
  round: number;
  index: number;
  left?: Participant;
  right?: Participant;
  winnerId?: string;
};

export type BracketPrediction = {
  id: string;
  title: string;
  participants: Participant[];
  matchups: Matchup[];
  championId?: string;
  createdAt: string;
};
```

## Prediction Logic

The first version can run fully on the client.

Key functions:

```ts
function createBracket(participants: Participant[]): BracketPrediction;

function selectWinner(
  prediction: BracketPrediction,
  matchupId: string,
  winnerId: string,
): BracketPrediction;

function getChampion(prediction: BracketPrediction): Participant | undefined;
```

When a user changes a winner in an earlier round, later dependent matchups should be recalculated so stale winners do not remain in the bracket.

## UI Design

Use the existing Hobite Capital visual language:

- Clean white and zinc surfaces.
- Compact information density.
- 8px or modest border radius for tool UI.
- Clear button states.
- Mobile-first responsive bracket layout.
- No marketing-style hero required.

Recommended page layout:

- Top toolbar: title, bracket size selector, reset action.
- Main area: interactive bracket.
- Side or bottom panel: champion preview and image actions.
- Offscreen export component: final share-card layout.

Primary actions:

- `Generate Image`
- `Download`
- `Copy Link`
- `Share`
- `X`
- `Facebook`

## Share Image Layout

The share image should be designed as a poster, not a screenshot of the editing UI.

Recommended dimensions:

- Square: `1080 x 1080`, best for Instagram, WeChat, Rednote, and general sharing.
- Story: `1080 x 1920`, best for Instagram Stories, Snapchat, WeChat Moments, and Rednote.
- Landscape: `1200 x 630`, best for Open Graph previews on X.com and Facebook.

Poster composition:

- Top: event title, for example `FIFA World Cup 2026 Knockout Prediction`.
- Left and right columns: first-round teams with flags/logos and names.
- Bracket lines: connect matchups toward the center.
- Center: trophy, champion, final details, and stadium.
- Bottom: Hobite Capital mark, share URL, and optional generation timestamp.

Final center block after predictions:

```txt
Champion: Argentina
Final: July 20, 2026
Time: 03:00
Stadium: MetLife Stadium
```

The final image should still render if some fields are missing. Use fallback labels:

- Winning team: `Champion TBD`
- Date: `Date TBD`
- Time: `Time TBD`
- Stadium: `Stadium TBD`

## Prediction Inputs

The form should collect enough data to generate the final poster:

```ts
export type EventDetails = {
  title: string;
  finalDate?: string;
  finalTime?: string;
  stadium?: string;
};
```

The prediction state should include event details:

```ts
export type BracketPrediction = {
  id: string;
  title: string;
  eventDetails: EventDetails;
  participants: Participant[];
  matchups: Matchup[];
  championId?: string;
  createdAt: string;
};
```

## Sharing Implementation

```ts
export type ShareTarget =
  | "native"
  | "download"
  | "copy"
  | "x"
  | "facebook"
  | "instagram"
  | "snapchat"
  | "wechat"
  | "rednote";
```

Suggested behavior:

- `native`: use `navigator.share` and `navigator.canShare` if available.
- `download`: create an anchor with the generated PNG data URL.
- `copy`: copy the public prediction URL or image URL.
- `x`: open an X.com intent URL.
- `facebook`: open a Facebook share URL.
- `instagram`, `snapchat`, `wechat`, `rednote`: download image or trigger native share sheet where possible.

## Optional Persistence

For v1, predictions can live only in browser state.

For v2, save predictions with Supabase:

```sql
create table bracket_predictions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  data jsonb not null,
  image_url text,
  created_at timestamptz not null default now()
);
```

This enables public share URLs like:

```txt
/platform/elimination-prediction/share/[id]
```

## Implementation Phases

### Phase 1: Interactive Bracket

- Add route and page shell.
- Add participant input or mock participant presets.
- Render bracket stages.
- Implement winner selection and advancement.

### Phase 2: Final Image

- Add `PredictionShareCard`.
- Generate PNG from the share card.
- Display image preview after generation.

### Phase 3: Download And Share

- Add PNG download.
- Add native share support.
- Add X.com and Facebook share links.
- Add mobile-friendly instructions for Instagram, Snapchat, WeChat, and Rednote.

### Phase 4: Public Links

- Add Supabase persistence.
- Add public share page.
- Add Open Graph metadata for shared prediction links.

### Phase 5: Smarter Predictions

- Add optional scoring factors.
- Add probability labels.
- Add AI-assisted predictions if desired.

Example future scoring model:

```ts
export type PredictionFactor = {
  momentum: number;
  fundamentals: number;
  probability: number;
  userBias?: number;
};
```

## Open Questions

- What domain is this for: sports, stocks, startups, competitions, or general voting?
- Should users manually select winners, or should the app generate suggested winners?
- Should final images be square, story format, landscape, or all three?
- Should predictions be saved publicly, privately, or only downloaded locally?
- Should the feature support Chinese UI text for WeChat and Rednote audiences?
