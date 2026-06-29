# Personas: FIFA Elimination Prediction Poster

## Persona 1: Casual World Cup Fan

- **Profile**: A fan who wants to make a quick knockout prediction before or during the FIFA World Cup.
- **Primary Goals**:
  - Pick winners quickly.
  - See the predicted champion clearly.
  - Download a polished poster for sharing.
- **Needs**:
  - Simple bracket interactions.
  - Recognizable flags and team names.
  - Mobile-friendly layout.
- **Pain Points**:
  - Confusing bracket progression.
  - Hard-to-read posters on small screens.
  - Too many setup steps before making predictions.
- **Relevant Stories**: US1, US2, US3, US4, US5, US7, US8.

## Persona 2: Social Sharing User

- **Profile**: A user who wants to publish a prediction image on X.com, Facebook, Instagram, WeChat, Rednote, or similar social platforms.
- **Primary Goals**:
  - Generate a visually polished prediction poster.
  - Choose the right image format for the target platform.
  - Download or share with minimal friction.
- **Needs**:
  - Square, story, and landscape export options.
  - Clear sharing controls.
  - Poster content that does not overlap or crop awkwardly.
- **Pain Points**:
  - Social platforms have inconsistent browser sharing support.
  - Direct image posting is not always available from websites.
  - Exported images can fail if external assets are blocked.
- **Relevant Stories**: US4, US5, US6, US7, US8.

## Persona 3: Bilingual Chinese-English User

- **Profile**: A user who may prefer either English or Chinese while creating and sharing a FIFA prediction.
- **Primary Goals**:
  - Use the prediction tool in English or Chinese.
  - Generate poster text in the selected language.
  - Share the poster with an audience that may use Chinese-language social platforms.
- **Needs**:
  - Language switch or clear bilingual UI behavior.
  - Chinese labels that fit in controls and generated posters.
  - Platform language that remains understandable.
- **Pain Points**:
  - Long translated labels can overflow.
  - Generated images may not handle Chinese text layout well.
  - Some sharing flows are platform-specific.
- **Relevant Stories**: US6, US7, US8.

## Persona 4: Hobite Site Owner

- **Profile**: The person maintaining `hobite-site` and deciding how the feature fits into the platform area.
- **Primary Goals**:
  - Add a useful interactive tool under the existing platform route.
  - Keep v1 browser-only and avoid unnecessary backend complexity.
  - Preserve build safety and maintainability.
- **Needs**:
  - Clear code boundaries.
  - No Supabase dependency for v1 prediction state.
  - Type-safe implementation that passes production build.
- **Pain Points**:
  - Interactive features can become tangled if state, UI, and export logic are coupled.
  - Image generation can be brittle.
  - Missing tests make bracket recalculation risky.
- **Relevant Stories**: US1, US2, US3, US4, US5, US6, US8, US9.

