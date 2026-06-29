# Dependencies

## Internal Dependencies

```txt
app/layout.tsx
  -> app/globals.css
  -> site routes

app/platform/page.tsx
  -> Tailwind classes

proposed app/platform/elimination-prediction/page.tsx
  -> PredictionBuilder.tsx
  -> PredictionBracket.tsx
  -> PredictionShareCard.tsx
  -> share.ts
  -> types.ts
```

## External Dependencies

### next

- **Version**: 16.2.4
- **Purpose**: Routing, rendering, build, and deployment framework.

### react

- **Version**: 19.2.4
- **Purpose**: Component rendering and state.

### react-dom

- **Version**: 19.2.4
- **Purpose**: Browser DOM rendering.

### @supabase/supabase-js

- **Version**: `^2`
- **Purpose**: Optional persistence and future database integration.

### html-to-image

- **Version**: Proposed dependency.
- **Purpose**: Generate PNG from the poster component.
- **Status**: Not currently installed.

