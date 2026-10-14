# CRWV Verification Record

Client cutoff October 13, 2026. Data/model/mirror tests and both production builds pass; no production deployment or merge.

## Reproduce

In Hobite: `npm run research:crwv:data`, `npm run research:crwv:mirror`, `npm run research:crwv:test`, `npm run build`. In SVIM: `npm run build`. Local Next production preview runs on port 3000 and SVIM Vite preview on 4173; `npm run research:crwv:routes` verifies delivery. Source refresh throws on failed requests or unreviewed post-listing splits.

## Automated Checks

Four annual and six quarterly periods, field-level source links, manual FY2022 table values/date, quarter-to-annual cash reconciliation, October 12 closing price, pre-IPO price nulls, final convertible terms, DCF/bridge/terminal/reinvestment equations, negative-flow treatment, invalid inputs and sensitivity pass. English/Chinese React server rendering verifies all article sections, six figures, date/price and final financing terms. Exact adapted content parity and lazy registration pass. Focused ESLint and repository diff checks pass. Source SEC and issuer PDF endpoints return 200.

## Browser Gap

Browser automation fails initialization due to missing runtime assets, including after reset. No screenshots, live controls or mobile layout checks were completed this turn. HTTP/SSR verification is not a substitute for visual testing. Draft PRs require desktop/mobile review before publication. Check English/Chinese title contrast, tables' horizontal scrolling, scenario/horizon changes, invalid-price feedback and the cash/replacement/dilution controls.

## Residual Risk

Full SVIM parity fails for unrelated older reports; CRWV-specific parity passes. Existing large-bundle warnings remain. CRWV bundle is lazy-loaded. No new backend or infrastructure; no throughput/latency certification. Capital-claims/October liquidity and equipment-vintage economics remain visibly partial; model outputs are illustrative, not current fair values or guaranteed returns.
