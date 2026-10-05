# AI Mid-Cap And Small-Cap Research

## Requirements And Scope

Request: "Similarly find the top 10 mid cap, and top 10 small cap, in the AI field. Please put them in separate Research Articles in both hobite website and duplicate into svim io research page"

Standing authorization to finish implementation without intermediate approval gates retained. Existing AI-DLC opt-in extensions remain disabled. This is an editorial research expansion, not new infrastructure.

Two independent English articles and full Chinese counterparts. U.S.-listed equities; USD market equity capitalization at October 2, 2026. Mid-cap: >= $2B and < $10B; small-cap: >= $300M and < $2B. Non-exhaustive selected universe. Rank is subjective research priority, not an expected-return or guaranteed-undervaluation ranking. Semiconductor suppliers may have indirect rather than separately disclosed AI revenue.

## Plan

- [x] Inspect both libraries, existing article adapters and research workflow.
- [x] Research current eligibility and primary earnings/product evidence for twenty candidates.
- [x] Create bilingual ranked profiles, sourced financial snapshot and transparent five-/ten-year scenarios.
- [x] Register four routes in Hobite and SVIM; mirror shared content reproducibly.
- [x] Test cap eligibility, scenario math, bilingual completeness and exact mirror parity.
- [x] Build both sites and inspect desktop/mobile layouts.

## Design

Shared private research module under `app/research/_ai-size-research`, with two public route wrappers and their translations. No dependency changes. Structured issuer data distinguishes reported quarterly facts from annualized model baselines and research assumptions. Independently focusable overflow tables and stable chart scales follow existing article conventions.

Capital-return model: revenue grows in two five-year phases; modeled owner cash margin ramps over five years; annual share dilution is explicit; negative modeled cash accumulates at 10% funding cost and reduces terminal equity. Positive cash is retained but not separately added to exit value or distributed. Exit equity equals following-year positive modeled owner cash times a stated equity cash multiple less funding, floored at zero. Capital-gain CAGR is not distribution IRR or a complete DCF. Excludes starting cash/debt and issuer-specific preferred/Up-C obligations; those omissions are explicit, with special caution for BOX, DSP, CRNC and POET. No precise fair-value claim.

## Data Quality

POET quote tool uses a stale 61M share count; alternate dated market source shows 173.04M shares. Use $7.79 x 173.04M = $1,347.9816M and expose both count conflict and source. Market-cap bins are publication snapshots, not index membership or permanent labels.

## Verification

- Both final production builds pass, including all four new Hobite routes. SVIM retains existing large-chunk warnings.
- `npm run research:ai-size:test` passes twenty-company cap eligibility, bilingual content, model equations and sensitivity, route registration and exact adapted content parity. Focused ESLint and both repository diff checks pass.
- Browser checks cover English and Chinese articles, desktop and 390px mobile layouts, independent table overflow without document overflow, company/scenario/horizon switching, invalid-price feedback and POET's milestone-only message. SVIM's shared title-color override was extended only to these articles and rechecked after rebuilding.
- SVIM research-library links are visible. Its repository-wide parity verifier still fails for unrelated legacy report differences and missing files; no new size-research module or route mismatch is reported.
- Implementation is local in both working trees. No new commit, PR, merge or production deployment was performed. Existing value-chain PRs are not evidence that these uncommitted additions are deployed.
- Enabled-extension compliance: N/A; Security, Resiliency and Property-Based Testing extensions remain disabled by existing configuration.
