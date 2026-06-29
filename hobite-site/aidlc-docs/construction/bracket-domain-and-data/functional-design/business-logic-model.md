# Business Logic Model: Bracket Domain And Data

## Scope

This design covers Unit 1: Bracket Domain And Data. The unit provides route-local types, default FIFA team data, flag/logo references, and pure bracket functions for a 32-team knockout prediction flow.

## Bracket Shape

V1 uses a fixed 32-team knockout bracket:

```txt
Round of 32: 16 matchups
Round of 16: 8 matchups
Quarterfinals: 4 matchups
Semifinals: 2 matchups
Final: 1 matchup
Champion: 1 participant
```

The domain model should still represent rounds generically so future bracket sizes can reuse the same concepts.

## Core State Flow

```txt
Participants + event details
  -> createBracket
  -> initial BracketPrediction
  -> selectWinner(matchupId, winnerId)
  -> validate winner belongs to matchup
  -> set current matchup winner
  -> advance winner to next matchup slot
  -> clear dependent downstream selections for the changed branch
  -> update champion if final is complete
```

## Bracket Creation

`createBracket` builds the complete 31-matchup bracket from 32 participants.

### Inputs

- Exactly 32 participants.
- Event details.
- Optional existing timestamp/id generation strategy during implementation.

### Outputs

- `BracketPrediction` containing:
  - 32 participants.
  - 31 matchups.
  - 16 first-round matchups with teams assigned.
  - Later-round matchups with empty slots.
  - No selected winners.
  - No champion.

### Round Structure

| Round | Matchups | Participant Slots |
|---:|---:|---:|
| 1 | 16 | 32 |
| 2 | 8 | 16 |
| 3 | 4 | 8 |
| 4 | 2 | 4 |
| 5 | 1 | 2 |

Each matchup stores:

- `id`
- `round`
- `index`
- `leftId`
- `rightId`
- `winnerId`
- `nextMatchupId`
- `nextSlot`

## Winner Selection

`selectWinner` updates the prediction only when:

- The matchup exists.
- The selected participant id is present in `leftId` or `rightId`.
- The matchup has both sides available.

If validation fails, the function returns unchanged state.

### Selection Steps

1. Locate the target matchup.
2. Confirm `winnerId` is either `leftId` or `rightId`.
3. Compare the new winner with the previous winner.
4. Set the target matchup winner.
5. If the matchup feeds another matchup, place the winner into `nextSlot`.
6. Clear dependent downstream picks from that branch.
7. Recalculate `championId`.

## Downstream Recalculation

When an earlier winner changes, only downstream matchups that directly depend on the changed branch are cleared.

### Clearing Rules

- Preserve unrelated bracket branches.
- Clear the next slot that was fed by the changed matchup before writing the new winner.
- Clear `winnerId` for dependent matchups if the previous winner is no longer valid in that matchup.
- Continue recursively down the same branch path.
- Clear `championId` if the final winner becomes invalid.

### Example

If Round 1 Matchup 1 changes:

- Round 2 Matchup 1 receives the new team in its assigned slot.
- Round 2 Matchup 1 winner is cleared if it no longer matches a valid participant.
- Round 3 dependency from Round 2 Matchup 1 is cleared if needed.
- The opposite side of the bracket remains unchanged.

## Champion Resolution

`getChampion` returns the participant whose id matches the final matchup `winnerId`.

The prediction stores `championId` as a convenience field. It should be derived or recalculated after winner selection and reset.

## Reset Behavior

`resetPrediction` clears:

- Every matchup `winnerId`.
- Later-round participant slots.
- `championId`.

It preserves:

- `id`
- `createdAt`
- `eventDetails`
- `participants`
- First-round matchup team assignments.

## Invalid Operations

Normal invalid user actions return unchanged state and do not throw.

Examples:

- Unknown matchup id.
- Unknown participant id.
- Winner id not present in matchup.
- Matchup missing one or both participants.

This keeps UI interactions forgiving while preserving domain integrity.

