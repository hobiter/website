# LULU Build And Test Record

Client research date: October 11, 2026.

## Build Instructions

In Hobite run `npm run research:lulu:data`, then `npm run research:lulu:mirror`, `npm run research:lulu:test` and `npm run build`. The data refresh uses SEC/Yahoo network access and throws on failed responses or unreviewed splits. Run `npm run build` in SVIM after mirroring and registering the two pages. Both production builds passed.

## Unit And Integration Tests

Dedicated test passes annual/quarterly coverage, field provenance, cash-flow and Q4 reconciliation, fiscal price dates, DCF/IRR identities, invalid-input rejection, scenario order and sensitivity. It compares every adapted module with SVIM and verifies both lazy routes. Focused ESLint passes. Repository diff checks pass.

## Browser Checks

Passed English and Chinese article loading in both sites, desktop title/readability, 390px mobile title/layout, internal financial-table overflow, scenario/horizon changes, price validation and SVIM library link visibility. Model base case at snapshot price displays $140.19 modeled value and 17.3% hypothetical distribution IRR; neither is a guarantee. Temporary viewport overrides reset. Local previews use ports 3000 and 4173.

## Performance And Residual Risk

No new API or load-test surface. SVIM's existing large-bundle warnings remain; LULU is lazy-loaded. Global parity fails only for unrelated older reports. No statistical coverage percentage claimed. No production deployment, merge or financial transaction performed.
