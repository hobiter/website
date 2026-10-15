# RKLB Build And Test Record

## Commands

From hobite-site:

1. `npm run research:rklb:data` refreshes the fixed October 15 SEC/price snapshot. Review data changes before publication.
2. `npm run research:rklb:mirror` adapts Next metadata, Chinese routes, library links and SVIM analyst wording.
3. `npm run research:rklb:test` checks provenance, financial reconciliation, model identities, collar boundaries, EN/ZH server rendering and the exact adapted mirror.
4. `npm run lint -- app/research/rocket-lab-complete-fundamental-analysis scripts/update-rklb-sec-data.mjs scripts/mirror-rklb-research.mjs scripts/test-rklb-research.mjs scripts/test-rklb-routes.mjs` runs focused lint.
5. `npm run build` validates TypeScript and Next production generation.
6. `npm run research:rklb:routes` checks local Hobite EN/ZH SSR and library links plus SVIM SPA delivery. HOBITE_URL/SVIM_URL may override localhost:3000/4173.

From project-albatross: `npm run build` validates TypeScript and Vite. `npm run verify:research` additionally checks the full legacy mirror.

## Automated Coverage

- Six annual operating periods FY2020-25 and ten discrete quarters through June 2026.
- Per-field filing dates, source links, finite values and SEC accession resolution.
- FCF/margin identities; quarterly flow sums reconcile to annual; Q4 EPS and weighted shares remain null.
- Segment sales/gross profit reconcile; issuer per-launch definition is not replaced with a naive ratio.
- Participating preferred included once; historical market capitalization uses ending shares.
- DCF explicit cash flows, H2 stub, taxes, terminal PV, enterprise/equity bridge, dilution and invalid-input checks.
- Iridium collar at/between/beyond limits; historical reference share count, not final closing shares.
- All eight major sections, fifteen bilingual chapters, six chart figures and exact SVIM adaptation.

## Source Checks

Representative annual, quarter, October 8-K, September financing, S-4 and vote SEC documents returned HTTP 200. The issuer Neutron page returns HTTP 403 to direct automated requests, but its text was verified using web retrieval and the corresponding SEC 8-K. This restriction is disclosed on-page.

## Known Limits

- Full SVIM parity has pre-existing missing Netflix CurrentResults/currentUpdate files and older article divergences. Latest run has no RKLB divergence, missing metadata, missing registration or unresolved import.
- Vite retains existing large-chunk warnings.
- Valuation is June-anchored standalone sensitivity analysis, not current merger-adjusted fair value. Current capital, ATM overlap, interim burn, forward/award settlement, acquisition uses and acquired Iridium model remain partial.
- Final data/model/mirror/EN-ZH render tests, focused lint, both production builds and four HTTP route checks passed. Desktop/mobile browser checks verified contrast/width, table scrolling, language links, scenarios, horizons, invalid inputs and merger calculator; details in rklb-research.md. Preview servers use localhost:3000 and localhost:4173.
