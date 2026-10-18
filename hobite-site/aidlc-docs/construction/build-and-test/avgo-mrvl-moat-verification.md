# AVGO / MRVL article verification

## Story and boundaries

Research library -> EN/ZH article -> typed bilingual data -> 15 sections, six accessible tables and paired revenue-scenario chart. SVIM registers lazy research pages and adapts Chinese routes. No runtime API, data store, secrets, auth, scheduled task or valuation service.

## Repeatable checks

Hobite:

```sh
npm run research:avgo-mrvl:mirror
npm run research:avgo-mrvl:test
node scripts/test-avgo-mrvl-routes.mjs
npx eslint app/research/broadcom-marvell-ai-semiconductor-moat scripts/mirror-avgo-mrvl-moat.mjs scripts/test-avgo-mrvl-moat.mjs
npm run build
```

SVIM:

```sh
npx eslint src/content/hobiteResearch/research/broadcom-marvell-ai-semiconductor-moat src/content/researchArticles.ts src/content/richResearchPages.ts
npm run build
```

## Automated coverage

- 14 content chapters plus source-audit section, seven stack layers, 12 capability comparisons, nine threat scenarios and six monitoring indicators.
- Five competition-scenario rows; adjusted values do not exceed source originals; FY2032 reduction is $35B.
- Warrant time/performance shares sum to 58,970,907; 240 x $500M = $120B; performance tranche rounding reconciles to 57,610,040 shares.
- $500M annualized quarter-end rate / 4 = $125M, not a $500M full-year revenue assertion.
- Six tables in EN/ZH static rendering, source/disclosure coverage, unique section IDs and valid source references.
- Earlier spreadsheet price targets and download prompts are not carried over.
- Research discovery and exact adapted mirror parity checked for all four files.
- React review: no client hooks or effects, no fetching waterfall, escaped text, stable static data and keyboard-focusable scroll regions.

## Results

- Data/math/SSR/source/mirror tests: pass.
- Focused lint in Hobite and SVIM: pass.
- Both production builds: pass. SVIM retains an existing large-chunk warning.
- Four HTTP routes: 200. Hobite prerendered article sections checked; SVIM SPA delivery followed by browser-rendered content checks.
- EN/ZH rendering, language switches and adapted Chinese Broadcom cross-link: pass on both platforms.
- Desktop: 15 sections and six tables per article; body width equals 1265px viewport; chart and dark/light theme screenshots inspected.
- Dedicated mobile viewport screenshots: not run. Local table overflow, wrapping navigation and responsive typography rules are implemented.
- Complete valuation, IP-rights audit, independent engineering benchmarks and verification of all transcript-derived forecasts: outside scope; article explicitly identifies these boundaries.
