# Requirements: FIFA Elimination Prediction Poster

## Intent Analysis

- **User Request**: Analyze and formalize requirements for `ELIMINATION_PREDICTION_DESIGN.md` using AI-DLC.
- **Request Type**: New feature.
- **Scope Estimate**: Multiple components inside the existing Next.js application.
- **Complexity Estimate**: Moderate.
- **Project Context**: Brownfield `hobite-site` Next.js App Router project.
- **Target Route**: `/platform/elimination-prediction`.

## Requirements Source

Requirements are derived from:

- `ELIMINATION_PREDICTION_DESIGN.md`
- `aidlc-docs/inception/requirements/requirement-verification-questions.md`
- `aidlc-docs/inception/requirements/requirement-clarification-questions.md`
- Existing app structure under `app/`, especially the platform route and client-side blog/admin patterns.

## Decision Summary

| Question | Decision |
|---|---|
| Primary domain | FIFA World Cup knockout bracket |
| Winner selection | User manually chooses every winner |
| Poster formats | Square, story, and landscape |
| Team images | Built-in static flags/logos bundled in the app |
| Persistence | Browser-only v1; no public URL persistence |
| Sharing | Native share, download, copy link, X.com, and Facebook |
| Language support | English and Chinese |
| Security extension | Disabled |
| Resiliency extension | Disabled |
| Property-based testing extension | Disabled |

## Functional Requirements

### FR1: Provide FIFA World Cup Prediction Route

The application shall provide a new route at `/platform/elimination-prediction`.

The route shall present an interactive FIFA World Cup knockout prediction tool, not a marketing landing page.

### FR2: Support Manual Winner Selection

The application shall allow users to manually select the winner of each visible matchup.

When a user selects a winner, the selected team shall advance to the next bracket stage.

When a user changes a previous winner, all dependent later-stage matchups shall be recalculated to prevent stale downstream selections.

### FR3: Provide Bracket State

The application shall maintain bracket state in the browser for v1.

The bracket state shall include:

- Event details.
- Team list.
- Matchups.
- Selected winners.
- Champion.
- Generated poster format.

### FR4: Support Built-In Team Flags Or Logos

The application shall use built-in static flags or logos bundled with the app for v1.

The application shall not require users to provide external image URLs in v1.

### FR5: Capture Final Match Details

The application shall support final match metadata for the generated poster:

- Event title.
- Final match date.
- Final match time.
- Stadium or venue.

If values are missing, the poster shall display graceful fallback labels.

### FR6: Generate Shareable Poster Images

The application shall generate a poster image from the completed or partially completed prediction.

The poster shall be a designed export artifact, not a screenshot of the editor UI.

The poster shall include:

- Event title.
- FIFA knockout bracket.
- Built-in team flags or logos.
- Matchup progression.
- Selected champion or fallback champion label.
- Final date, time, and stadium.
- Hobite Capital branding or watermark.

### FR7: Support Three Poster Formats

The application shall support these poster formats in v1:

- Square: `1080 x 1080`
- Story: `1080 x 1920`
- Landscape: `1200 x 630`

Users shall be able to choose the target format before or during image generation.

### FR8: Support Download

The application shall let users download the generated poster as a PNG image.

The downloaded filename should include the event or prediction title when practical.

### FR9: Support Native Share

The application shall use browser native sharing when available.

If native file sharing is unavailable, the application shall fall back to image download or link/text sharing.

### FR10: Support X.com And Facebook Sharing

The application shall provide X.com and Facebook share actions.

Because v1 does not persist predictions publicly, these actions may share site text or the current page URL rather than a unique public prediction URL.

### FR11: Support Copy Link

The application shall provide a copy action.

For v1, the copied value may be the tool URL or share text. Public prediction-specific links are out of scope until persistence is added.

### FR12: Support English And Chinese UI

The v1 feature shall support English and Chinese UI text.

The implementation may use a lightweight local dictionary for this route rather than introducing a full internationalization framework.

### FR13: Provide Reset Behavior

The application shall let users reset the bracket prediction.

Reset shall clear selected winners while preserving default FIFA bracket/team data unless the user explicitly chooses to clear all inputs.

## Non-Functional Requirements

### NFR1: Client-Side First

The v1 implementation shall run without server-side persistence.

Generated image data shall remain local to the browser unless the user explicitly shares or downloads it.

### NFR2: Responsive Layout

The editor shall work on mobile and desktop.

The bracket may use different layouts by viewport, but all user actions must remain accessible on small screens.

### NFR3: Poster Text Safety

Poster text shall not overlap or overflow its intended containers.

Long team names, Chinese labels, stadium names, and dates shall be handled through wrapping, truncation, or responsive sizing.

### NFR4: Export Reliability

The poster export path shall avoid external image dependencies in v1 to reduce canvas/CORS failures.

Bundled static assets shall be preferred for all team flags/logos.

### NFR5: Build Safety

The feature shall compile under the existing strict TypeScript configuration.

DOM-only image generation code shall live in client components or browser-only utility calls.

### NFR6: Accessibility

Interactive matchup controls shall be keyboard accessible.

Buttons shall expose meaningful accessible labels in the active language.

### NFR7: Maintainability

Bracket logic shall be separated from presentation components so it can be tested and modified independently.

The implementation shall avoid coupling poster generation directly to editor-only UI state.

## Out Of Scope For V1

- AI-generated predictions.
- Probability modeling.
- Supabase persistence.
- Public prediction-specific share URLs.
- Public image hosting.
- User-uploaded team images.
- Arbitrary non-FIFA bracket domains.
- Direct posting into Instagram, Snapchat, WeChat, or Rednote from the website.

## Future Enhancements

- Public share pages backed by Supabase.
- Open Graph image generation for shared prediction URLs.
- AI-assisted or probability-based winner suggestions.
- User-defined custom brackets.
- Additional sports or event templates.
- More export themes and layouts.

## Acceptance Criteria

- A user can open `/platform/elimination-prediction`.
- A user can manually select winners through the complete FIFA knockout bracket.
- Winners advance automatically to later rounds.
- Changing an earlier winner recalculates dependent later selections.
- The final champion is displayed when the bracket is complete.
- The user can enter or edit final date, final time, and stadium.
- The user can generate square, story, and landscape poster images.
- The generated poster includes team flags/logos, final details, champion, and Hobite branding.
- The user can download the generated PNG.
- The user can trigger native share where supported.
- The user can use X.com and Facebook share actions.
- The user can copy a share text or page URL.
- The UI supports English and Chinese text.
- The feature builds successfully with `npm run build`.

## Extension Rule Compliance

| Extension | Status | Rationale |
|---|---|---|
| Security Baseline | Disabled | User selected `B`, skip security extension rules. |
| Resiliency Baseline | Disabled | User selected `B`, skip resiliency extension rules. |
| Property-Based Testing | Disabled | User selected `C`, skip property-based testing extension rules. |

## Requirements Validation

- Requirement verification answers were reviewed.
- Clarification was requested for poster format because the original answer was numeric.
- Clarification selected `D`, all three poster formats.
- No remaining contradictions were identified.

