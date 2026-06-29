# Functional Design Plan: Bracket Domain And Data

## Unit

Unit 1: Bracket Domain And Data

## Purpose

Define the detailed business logic, domain entities, state transitions, validation rules, and edge cases for the route-local FIFA bracket domain module.

## Context

This unit is the dependency root for the feature. It provides typed state, default FIFA team data, bracket seed data, flag/logo references, winner selection, downstream recalculation, champion resolution, and reset behavior.

## Execution Checklist

- [x] Review Unit 1 definition in `aidlc-docs/inception/application-design/unit-of-work.md`.
- [x] Review Unit 1 story map in `aidlc-docs/inception/application-design/unit-of-work-story-map.md`.
- [x] Review component methods in `aidlc-docs/inception/application-design/component-methods.md`.
- [x] Define detailed business logic for bracket creation.
- [x] Define detailed business logic for winner selection.
- [x] Define downstream recalculation rules.
- [x] Define reset behavior.
- [x] Define domain entities and relationships.
- [x] Define validation and error-handling rules.
- [x] Define frontend-facing state assumptions.
- [x] Generate `aidlc-docs/construction/bracket-domain-and-data/functional-design/business-logic-model.md`.
- [x] Generate `aidlc-docs/construction/bracket-domain-and-data/functional-design/business-rules.md`.
- [x] Generate `aidlc-docs/construction/bracket-domain-and-data/functional-design/domain-entities.md`.
- [x] Generate `aidlc-docs/construction/bracket-domain-and-data/functional-design/frontend-components.md`.
- [x] Validate functional design against requirements and stories.

## Design Questions

Please answer each question by filling in the letter choice after the `[Answer]:` tag.

## Question 1

How should the default FIFA bracket be modeled for v1?

A) Fixed 16-team knockout bracket with eight first-round matchups

B) Fixed 32-team knockout bracket with sixteen first-round matchups

C) Configurable bracket size using the same domain model

X) Other (please describe after `[Answer]:` below)

[Answer]:X
User can fill 32 to 16, then 16 to 8, 8 to 4, 4 to 2, 2 to 1, until the champion is predicted.

## Question 2

How strict should winner selection validation be?

A) Strict: reject selections unless the winner is currently in the matchup

B) Lenient: allow any participant id and normalize later

C) UI-only validation, domain logic assumes valid input

X) Other (please describe after `[Answer]:` below)

[Answer]: A

## Question 3

When an earlier winner changes, how should dependent downstream picks be cleared?

A) Clear only downstream matchups that directly depend on the changed branch

B) Clear all later-round picks after the changed matchup

C) Keep downstream picks whenever the selected winner still exists anywhere later

X) Other (please describe after `[Answer]:` below)

[Answer]:A

## Question 4

How should default team flags/logos be represented in domain data?

A) Each participant has a local `flagSrc` string pointing to a bundled public asset

B) Each participant uses emoji flags only

C) Domain data stores no asset references; UI maps teams to assets separately

X) Other (please describe after `[Answer]:` below)

[Answer]: A

## Question 5

How should invalid domain operations report failure?

A) Return unchanged state and expose no thrown errors for normal invalid user actions

B) Throw typed errors from domain functions

C) Return a result object with `ok`, `value`, and `error` fields

X) Other (please describe after `[Answer]:` below)

[Answer]: A
