# NFR Design Plan: Bracket Domain And Data

## Unit

Unit 1: Bracket Domain And Data

## Purpose

Translate Unit 1 NFR requirements into concrete design patterns and logical components for implementation.

## Context

Unit 1 must remain pure TypeScript, synchronous, deterministic, route-local, testable without React/browser runtime, and reliable with local static asset references.

## Execution Checklist

- [x] Review `aidlc-docs/construction/bracket-domain-and-data/nfr-requirements/nfr-requirements.md`.
- [x] Review `aidlc-docs/construction/bracket-domain-and-data/nfr-requirements/tech-stack-decisions.md`.
- [x] Define immutability and state transition patterns.
- [x] Define validation and no-op failure patterns.
- [x] Define performance design for 32-team synchronous transitions.
- [x] Define testability design for pure functions.
- [x] Define asset-reference reliability design.
- [x] Generate `aidlc-docs/construction/bracket-domain-and-data/nfr-design/nfr-design-patterns.md`.
- [x] Generate `aidlc-docs/construction/bracket-domain-and-data/nfr-design/logical-components.md`.
- [x] Validate NFR design against NFR requirements and functional design.

## Questions

Please answer each question by filling in the letter choice after the `[Answer]:` tag.

## Question 1

Which immutable update pattern should the bracket domain use?

A) Shallow clone prediction and map matchups into new objects only where changed

B) Deep clone the whole prediction with JSON serialization before every operation

C) Mutate internally for speed and clone only before returning

X) Other (please describe after `[Answer]:` below)

[Answer]: A

## Question 2

How should validation checks be structured?

A) Small helper functions such as `findMatchup`, `isParticipantInMatchup`, and `isCompleteMatchup`

B) Inline validation logic inside each public domain function

C) A generic validation framework with error objects

X) Other (please describe after `[Answer]:` below)

[Answer]: A

## Question 3

How should downstream clearing be implemented?

A) Traverse dependency chain from changed matchup using `nextMatchupId` and `nextSlot`

B) Rebuild the entire bracket from first-round winners every time

C) Clear all later rounds and ask the user to reselect

X) Other (please describe after `[Answer]:` below)

[Answer]: A

## Question 4

How should Unit 1 tests be organized?

A) Route-local test file near domain module, focused on pure function cases

B) Manual QA checklist only

C) End-to-end browser tests only

X) Other (please describe after `[Answer]:` below)

[Answer]: A
