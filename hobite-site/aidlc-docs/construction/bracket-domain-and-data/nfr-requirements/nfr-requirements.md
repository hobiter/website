# NFR Requirements: Bracket Domain And Data

## Scope

This document defines non-functional requirements for Unit 1: Bracket Domain And Data.

The unit includes pure TypeScript domain logic, FIFA team data, and local flag/logo references. It excludes UI rendering, image export, sharing behavior, backend persistence, and infrastructure.

## Performance Requirements

### NFR-P1: Synchronous State Transitions

Winner selection, downstream clearing, champion resolution, and reset shall complete synchronously for a 32-team bracket.

### NFR-P2: Immediate UI Feel

Each valid winner selection should complete fast enough to feel immediate in the UI, with no visible delay for a 32-team bracket.

### NFR-P3: No Async Domain Logic

Domain functions shall not perform asynchronous work, network calls, storage calls, or asset validation.

## Reliability Requirements

### NFR-R1: Deterministic Output

Given the same input prediction and operation, domain functions shall return the same output.

### NFR-R2: Invalid User Actions Are Safe

Invalid normal user actions shall return unchanged state instead of throwing.

### NFR-R3: Branch-Specific Clearing

Changing an earlier winner shall clear only dependent downstream branches and preserve unrelated bracket branches.

### NFR-R4: Asset Missing Does Not Break State

Missing or undefined `flagSrc` values shall not break domain logic. Visual fallback responsibility belongs to UI and poster components.

## Maintainability Requirements

### NFR-M1: Pure TypeScript Module

The domain module shall not import React, DOM APIs, browser APIs, Next.js APIs, Supabase, or network libraries.

### NFR-M2: Route-Local Ownership

The unit shall remain route-local under `app/platform/elimination-prediction/` unless a future feature needs shared bracket logic.

### NFR-M3: Immutable State Updates

Domain functions shall not mutate input prediction objects. They shall return new prediction objects for valid changes.

### NFR-M4: Stable Type Contracts

Types shall be exported from `types.ts` and used consistently by domain, UI, poster, and sharing modules.

## Testability Requirements

### NFR-T1: Focused Unit Tests

Unit 1 should have focused unit tests for:

- Bracket creation.
- Winner selection.
- Downstream branch clearing.
- Champion resolution.
- Reset behavior.
- Invalid operation no-op behavior.

### NFR-T2: Pure Function Testing

Tests should call domain functions directly without React rendering, browser APIs, or Next.js runtime.

### NFR-T3: Edge Case Coverage

Tests should cover:

- Unknown matchup id.
- Winner id not in matchup.
- Incomplete matchup.
- Same winner selected twice.
- Earlier branch changed after later selections exist.
- Reset after partial and complete brackets.

## Security And Privacy Requirements

### NFR-S1: No User Data Persistence

The domain unit shall not persist user predictions.

### NFR-S2: No Network Access

The domain unit shall not fetch remote flags, data, or services.

### NFR-S3: No Sensitive Data

The domain unit shall not require or store sensitive user data.

## Scalability Requirements

### NFR-SC1: Designed For 32-Team V1

The unit shall optimize for the approved v1 shape: 32 teams and 31 matchups.

### NFR-SC2: Generic Round Fields

The data model should retain generic `round`, `index`, `nextMatchupId`, and `nextSlot` fields so future configurable bracket sizes are not blocked.

## Availability Requirements

### NFR-A1: Offline Domain Operation

After the app bundle is loaded, domain operations shall work without network availability.

### NFR-A2: Local Asset References

Participant flag/logo references shall point to local bundled assets, not remote URLs.

## Acceptance Criteria

- Domain functions run synchronously.
- Domain module imports no React, DOM, browser, Next.js, Supabase, or network dependencies.
- Focused unit tests can run against pure functions.
- Invalid normal actions return unchanged state.
- Local flag paths can be missing without breaking domain behavior.
- The 32-team bracket can be completed from Round of 32 to champion.

