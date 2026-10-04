# NFLX Research Update - October 4, 2026

## Request and Scope
Refresh the Hobite Netflix research hub using a user-specified $67 reference price and the latest published quarterly results. Update English and Chinese routes without changing historical valuation prices or other companies.

## Evidence
- Q2 2026 shareholder letter, July 16: https://www.sec.gov/Archives/edgar/data/1065280/000106528026000211/ex991_q226.htm
- June 30 Form 10-Q, filed July 17: https://www.sec.gov/Archives/edgar/data/1065280/000106528026000212/nflx-20260630.htm
- SEC submissions and company facts refreshed using the checked-in regeneration script.
- Q3 guidance is not Q3 actual data; no new subscriber count is inferred.

## Model Decisions
- Guidance: revenue $51.0B-$51.4B, operating margin 31.5%, reported FCF ~$12.5B.
- Base recurring FCF $10.5B subtracts a modeled $2B after-tax termination benefit. This is an explicit analyst assumption, not an official adjusted result.
- Q2 diluted weighted-average shares 4.2613B are a fixed per-share proxy. No further split or future buyback adjustment.
- Equity DCF discounts FCF after interest at scenario costs of equity. EV adds $5.210B net debt to equity value; net debt is not double-subtracted.
- Discount dates start October 4. Exclude H1 cash and modeled Q3 cash; assume Q3/Q4 each contribute half the remaining H2 recurring cash. This timing approximation is disclosed.
- Bear/base/bull values: $40.92/$71.48/$112.19; returns versus $67: -38.9%/+6.7%/+67.4%.
- History remains 2020-2025 year-end data and is labeled accordingly.

## Verification
- Production build and TypeScript passed.
- Financial/model assertions and both generated HTML routes passed using `node scripts/test-netflix-update.mjs`.
- Existing historical audit warnings remain visible; this update does not assert a new complete audit of every historical statement.
