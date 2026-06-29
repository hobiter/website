# User Stories: FIFA Elimination Prediction Poster

## Story Method

- **Organization**: Hybrid user journey plus feature-based stories.
- **Acceptance Criteria Detail**: Standard, with 3 to 6 concrete acceptance criteria per story.
- **Bilingual Coverage**: Dedicated bilingual story plus acceptance criteria in affected stories.
- **Sharing Coverage**: One combined sharing story covering native share, download, copy, X.com, and Facebook.
- **Non-Goals**: Included in this document.

## Epic 1: Prediction Workflow

### US1: Open The FIFA Prediction Tool

As a Casual World Cup Fan, I want to open a FIFA knockout prediction page under the Hobite platform area so that I can start making predictions without browsing through research content.

**Personas**: Casual World Cup Fan, Hobite Site Owner

**Acceptance Criteria**:

- The page is available at `/platform/elimination-prediction`.
- The first screen presents the prediction tool itself rather than a marketing landing page.
- The page identifies the feature as a FIFA World Cup knockout prediction tool.
- The route uses the existing Hobite site shell, navigation, and visual language.
- The page works on mobile and desktop viewports.

**INVEST Notes**:

- Independent and testable as a route-level feature.
- Valuable because it gives users a clear starting point.

### US2: Select Winners Through The Bracket

As a Casual World Cup Fan, I want to manually choose winners in each matchup so that I can create my own bracket prediction.

**Personas**: Casual World Cup Fan, Hobite Site Owner

**Acceptance Criteria**:

- Each matchup lets the user select one winner when both teams are available.
- Selecting a winner advances that team to the next stage.
- The selected winner is visually distinguishable from the non-selected team.
- The final champion is displayed when the final matchup has a selected winner.
- Matchup controls are accessible by keyboard and expose meaningful labels.

**INVEST Notes**:

- Independent from poster export and sharing.
- Testable through state transitions and visual selection states.

### US3: Recalculate Downstream Picks

As a Casual World Cup Fan, I want earlier bracket changes to recalculate later rounds so that my prediction does not contain stale winners.

**Personas**: Casual World Cup Fan, Hobite Site Owner

**Acceptance Criteria**:

- When a user changes a winner in an earlier round, dependent later matchups are updated.
- A downstream winner is cleared if that team is no longer present in the dependent matchup path.
- Unrelated bracket branches keep their existing selections.
- Champion state is cleared or updated when the final path changes.
- The recalculation behavior is deterministic and does not duplicate teams.

**INVEST Notes**:

- Small enough to implement in bracket logic.
- Testable with pure state transition cases.

### US4: Edit Final Match Details

As a Social Sharing User, I want to enter final match details so that the generated poster includes the predicted winning team, date, time, and stadium.

**Personas**: Casual World Cup Fan, Social Sharing User, Hobite Site Owner

**Acceptance Criteria**:

- The user can set or edit the event title.
- The user can set or edit the final date.
- The user can set or edit the final time.
- The user can set or edit the stadium or venue.
- The poster uses fallback labels when any final match detail is missing.
- The final champion appears in the poster when the bracket is complete.

**INVEST Notes**:

- Valuable because final details are core poster content.
- Testable through form state and poster output.

## Epic 2: Poster Generation

### US5: Generate Posters In Three Formats

As a Social Sharing User, I want to generate square, story, and landscape poster images so that I can share the prediction on different platforms.

**Personas**: Social Sharing User, Casual World Cup Fan, Hobite Site Owner

**Acceptance Criteria**:

- The user can choose square format at `1080 x 1080`.
- The user can choose story format at `1080 x 1920`.
- The user can choose landscape format at `1200 x 630`.
- Each generated poster includes event title, bracket, flags/logos, champion or fallback, final details, and Hobite branding.
- The poster is generated from an export-specific component, not a screenshot of the editor UI.
- The poster generation flow uses bundled image assets to reduce canvas or CORS failures.

**INVEST Notes**:

- Valuable because different platforms prefer different image dimensions.
- Testable by checking output dimensions and required poster content.

### US6: Use Built-In Team Flags Or Logos

As a Casual World Cup Fan, I want teams to display with built-in flags or logos so that the bracket looks recognizable without requiring me to upload images.

**Personas**: Casual World Cup Fan, Social Sharing User, Hobite Site Owner

**Acceptance Criteria**:

- The v1 bracket uses bundled static assets for team flags or logos.
- The user is not required to paste or upload image URLs.
- Missing or unavailable assets fall back to a readable team label.
- Team names and assets appear consistently in the editor and generated poster.
- Exported posters do not depend on remote image loading.

**INVEST Notes**:

- Independent from winner selection logic.
- Testable through asset rendering and fallback behavior.

## Epic 3: Language And Sharing

### US7: Use English Or Chinese UI

As a Bilingual Chinese-English User, I want to use the prediction tool in English or Chinese so that I can create and share a poster for my intended audience.

**Personas**: Bilingual Chinese-English User, Social Sharing User, Hobite Site Owner

**Acceptance Criteria**:

- The user can use the core prediction flow in English.
- The user can use the core prediction flow in Chinese.
- Action labels, matchup labels, fallback labels, and poster metadata respect the selected language.
- Chinese text does not overlap or overflow in primary controls or generated posters.
- The implementation may use a local route-specific dictionary rather than a site-wide internationalization framework.

**INVEST Notes**:

- Valuable for WeChat and Rednote-oriented sharing.
- Testable through language selection and poster output checks.

### US8: Download And Share The Poster

As a Social Sharing User, I want download and sharing actions in one place so that I can publish my prediction with minimal extra steps.

**Personas**: Social Sharing User, Bilingual Chinese-English User, Casual World Cup Fan, Hobite Site Owner

**Acceptance Criteria**:

- The user can download the generated poster as a PNG image.
- The user can trigger native browser sharing when supported.
- The user can copy share text or the tool URL.
- The user can open X.com and Facebook share actions.
- If native file sharing is unavailable, the UI provides a download or text/link fallback.
- The UI does not promise direct posting to Instagram, Snapchat, WeChat, or Rednote from the website.

**INVEST Notes**:

- Combines the v1 sharing requirements into one coherent user-facing workflow.
- Testable through supported action availability and fallback behavior.

## Epic 4: Browser-Only V1 Behavior

### US9: Keep Prediction State Browser-Only

As the Hobite Site Owner, I want v1 prediction state to remain in the browser so that the first release avoids backend persistence and public share-link complexity.

**Personas**: Hobite Site Owner, Casual World Cup Fan

**Acceptance Criteria**:

- Bracket state is managed client-side for v1.
- The feature does not require Supabase tables or API routes for v1 operation.
- Generated image data remains local unless the user downloads or shares it.
- Reloading the page may reset unsaved prediction state unless local persistence is intentionally added.
- Public prediction-specific URLs are not required in v1.

**INVEST Notes**:

- Independent architectural constraint.
- Testable by verifying the feature works without backend calls.

### US10: Reset The Prediction

As a Casual World Cup Fan, I want to reset my prediction so that I can start over without manually undoing every matchup.

**Personas**: Casual World Cup Fan, Hobite Site Owner

**Acceptance Criteria**:

- The user can reset selected winners.
- Reset preserves the default FIFA team data.
- Reset clears champion state.
- Reset clears generated poster preview if it no longer matches the bracket state.
- Reset does not break language selection or page layout.

**INVEST Notes**:

- Small and independently testable.
- Valuable for repeated bracket experimentation.

## Non-Goals For V1

- AI-generated predictions.
- Probability modeling.
- Supabase persistence.
- Public prediction-specific share URLs.
- Public image hosting.
- User-uploaded team images.
- Arbitrary non-FIFA bracket domains.
- Direct posting into Instagram, Snapchat, WeChat, or Rednote from the website.

## Traceability Matrix

| Requirement | Stories |
|---|---|
| FR1: Provide route | US1 |
| FR2: Manual winner selection | US2, US3 |
| FR3: Bracket state | US2, US3, US9, US10 |
| FR4: Built-in flags/logos | US6 |
| FR5: Final match details | US4, US5 |
| FR6: Generate poster images | US5 |
| FR7: Three poster formats | US5 |
| FR8: Download | US8 |
| FR9: Native share | US8 |
| FR10: X.com and Facebook sharing | US8 |
| FR11: Copy link | US8 |
| FR12: English and Chinese UI | US7 |
| FR13: Reset behavior | US10 |
| NFR1: Client-side first | US9 |
| NFR2: Responsive layout | US1, US2, US5, US7 |
| NFR3: Poster text safety | US5, US7 |
| NFR4: Export reliability | US5, US6 |
| NFR5: Build safety | US9 |
| NFR6: Accessibility | US2, US7, US8 |
| NFR7: Maintainability | US3, US5, US9 |

## INVEST Validation Summary

- **Independent**: Stories are separated by route, bracket behavior, poster generation, sharing, language, and browser-only constraints.
- **Negotiable**: Stories describe outcomes without prescribing exact component implementation.
- **Valuable**: Each story maps to a visible user or owner benefit.
- **Estimable**: Stories are scoped to coherent implementation areas.
- **Small**: Larger concerns are split into route, selection, recalculation, poster, sharing, language, and reset stories.
- **Testable**: Every story includes concrete acceptance criteria.

