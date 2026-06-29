# Business Rules: Bracket Domain And Data

## Bracket Rules

### BR1: V1 Uses A 32-Team Knockout Bracket

The default bracket shall model 32 teams reducing through five rounds until one champion remains.

### BR2: Participants Must Have Stable IDs

Every participant shall have a stable unique `id`. Matchups reference participants by id rather than duplicating participant objects.

### BR3: First-Round Matchups Are Seeded At Creation

The first 16 matchups shall receive two participants each when the bracket is created.

### BR4: Later Rounds Start Empty

Rounds 2 through 5 shall start with empty participant slots. Winners advance into those slots through `selectWinner`.

## Winner Selection Rules

### BR5: Winner Must Belong To Matchup

The domain function shall accept a winner only if that participant id is currently in the selected matchup.

### BR6: Invalid Selections Return Unchanged State

Invalid normal user actions shall not throw. The unchanged prediction state shall be returned.

### BR7: Winner Selection Advances The Winner

When a valid winner is selected, that winner shall be written into the next matchup slot configured by the current matchup.

### BR8: Final Winner Sets Champion

When the final matchup has a valid winner, `championId` shall be set to that participant id.

## Downstream Recalculation Rules

### BR9: Clear Only Dependent Branches

When an earlier winner changes, the domain shall clear only downstream matchups that directly depend on that changed branch.

### BR10: Preserve Unrelated Branches

Selections in unrelated branches shall remain unchanged.

### BR11: Clear Invalid Downstream Winners

If a downstream matchup winner is no longer one of that matchup's current participants, that `winnerId` shall be cleared.

### BR12: Clear Invalid Champion

If the champion no longer matches the final matchup winner, `championId` shall be cleared or recalculated.

## Reset Rules

### BR13: Reset Clears Picks

Reset shall clear all selected winners and champion state.

### BR14: Reset Preserves Default Data

Reset shall preserve event details, participants, first-round teams, and flag/logo references.

## Asset Rules

### BR15: Participants May Reference Local Flag Assets

Each participant may include `flagSrc`, pointing to a bundled public asset.

### BR16: Missing Assets Must Not Break Domain State

The domain model can store a missing or undefined `flagSrc`; UI and poster components are responsible for visual fallback.

## Data Integrity Rules

### BR17: Domain Functions Are Pure

Domain functions shall not mutate the input prediction object.

### BR18: Domain Functions Do Not Import React

The bracket domain module shall remain UI-independent.

### BR19: No Server Or Browser API Dependency

The domain module shall not depend on DOM APIs, browser APIs, server APIs, Supabase, or Next.js runtime APIs.

## Edge Cases

- Selecting the same winner again is idempotent.
- Selecting a winner in an incomplete matchup returns unchanged state.
- Resetting an already-empty bracket returns equivalent empty-pick state.
- Changing one side of the bracket does not clear the other side.
- Final champion updates only through a valid final matchup winner.

