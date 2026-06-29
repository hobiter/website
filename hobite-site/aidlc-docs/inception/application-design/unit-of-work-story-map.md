# Unit Of Work Story Map

## Overview

This map assigns every approved user story to one or more implementation units.

## Story Assignment Summary

| Story | Primary Unit | Supporting Units |
|---|---|---|
| US1: Open The FIFA Prediction Tool | Unit 2: Interactive Prediction UI | Unit 1 |
| US2: Select Winners Through The Bracket | Unit 2: Interactive Prediction UI | Unit 1 |
| US3: Recalculate Downstream Picks | Unit 1: Bracket Domain And Data | Unit 2 |
| US4: Edit Final Match Details | Unit 2: Interactive Prediction UI | Unit 3 |
| US5: Generate Posters In Three Formats | Unit 3: Poster Generation | Units 1, 2 |
| US6: Use Built-In Team Flags Or Logos | Unit 1: Bracket Domain And Data | Units 2, 3 |
| US7: Use English Or Chinese UI | Unit 2: Interactive Prediction UI | Units 3, 4 |
| US8: Download And Share The Poster | Unit 4: Sharing And Download | Units 2, 3 |
| US9: Keep Prediction State Browser-Only | Unit 2: Interactive Prediction UI | Unit 1 |
| US10: Reset The Prediction | Unit 1: Bracket Domain And Data | Unit 2 |

## Unit 1: Bracket Domain And Data

### Primary Stories

- US3: Recalculate Downstream Picks
- US6: Use Built-In Team Flags Or Logos
- US10: Reset The Prediction

### Supporting Stories

- US1: Open The FIFA Prediction Tool
- US2: Select Winners Through The Bracket
- US5: Generate Posters In Three Formats
- US9: Keep Prediction State Browser-Only

### Story Coverage

Unit 1 provides the state and data foundation for the entire feature. Its most important acceptance criteria are deterministic recalculation, bundled team assets, and reset behavior.

## Unit 2: Interactive Prediction UI

### Primary Stories

- US1: Open The FIFA Prediction Tool
- US2: Select Winners Through The Bracket
- US4: Edit Final Match Details
- US7: Use English Or Chinese UI
- US9: Keep Prediction State Browser-Only

### Supporting Stories

- US3: Recalculate Downstream Picks
- US5: Generate Posters In Three Formats
- US6: Use Built-In Team Flags Or Logos
- US8: Download And Share The Poster
- US10: Reset The Prediction

### Story Coverage

Unit 2 owns the visible user workflow. It maps user actions to domain logic, route-local state, bilingual labels, and downstream poster/share actions.

## Unit 3: Poster Generation

### Primary Stories

- US5: Generate Posters In Three Formats

### Supporting Stories

- US4: Edit Final Match Details
- US6: Use Built-In Team Flags Or Logos
- US7: Use English Or Chinese UI
- US8: Download And Share The Poster

### Story Coverage

Unit 3 converts prediction state into shareable visual output. It is responsible for poster dimensions, text safety, branding, and export reliability.

## Unit 4: Sharing And Download

### Primary Stories

- US8: Download And Share The Poster

### Supporting Stories

- US7: Use English Or Chinese UI

### Story Coverage

Unit 4 provides final user actions after poster generation. It handles download, native share, copy, X.com, Facebook, and honest fallback behavior for unsupported platforms.

## Coverage Validation

- All 10 user stories are assigned to at least one unit.
- Each unit has a clear primary responsibility.
- Story dependencies follow the approved implementation order.
- No story requires backend persistence or infrastructure work for v1.

