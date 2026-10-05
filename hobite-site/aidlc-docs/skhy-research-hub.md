# SK hynix (SKHY) Research Hub

## Requirements

Build a complete bilingual English/Chinese fundamental research hub for SK hynix (Nasdaq ADS ticker SKHY), list both pages in Hobite and SVIM research libraries, and open cross-linked unmerged PRs for both repositories.

Readers should be able to inspect long-cycle historical results, understand K-IFRS and KRW conventions, assess memory-cycle economics and the HBM/NAND/DRAM mix, see capital intensity and shareholder returns, compare valuation with dated market data, and distinguish issuer guidance from independent ten-year DCF assumptions. The research should explicitly explain that each US ADS represents 0.1 Korean ordinary share, that SKHY began trading in July 2026, and that pre-listing USD/ADS-equivalent observations converted from KRX prices are synthetic comparisons rather than historical SKHY trades.

## Source And Accounting Design

- SEC submissions for CIK 0002120882 supply the US registration and foreign-issuer filing inventory, including S-1 amendments, 424B4, F-6 and 6-K. SEC companyfacts currently has no operating GAAP facts for this foreign private issuer; do not claim that it does.
- SK hynix's English investor newsroom results archive supplies historical preliminary K-IFRS quarterly and annual headline data. Original source URLs and each reported unit/date travel with the data. Clearly label earnings-release amounts preliminary when the source says so.
- DART English XBRL viewer tables and the reviewed June 2026 Form 6-K establish full consolidated statement fields where available. Use KRW as filed; convert units explicitly. Coverage varies by filing and is disclosed, not filled with third-party guesses.
- Fiscal year is the calendar year ending December 31. Quarter flows are three months; half-year cash flows must not be misread as single-quarter values. Q4 flows may be derived as audited/full-year less Q1-Q3 only when all inputs share the same K-IFRS perimeter. Do not derive EPS/share counts by subtraction.
- Explain cyclical DRAM/NAND pricing, wafer bit shipments, HBM product mix, customer concentration, inventory, advanced packaging, fab capex, depreciation and utilization. HBM revenue/profitability, unit cost, yield, customer contracts and forward bit-price assumptions are not inferred when undisclosed.
- Model company FCFF in KRW and convert KRW per ordinary share to USD per ADS using the dated USD/KRW rate and 10:1 ADS ratio. Include the July 2026 primary issuance proceeds in the post-offering equity bridge and the additional ordinary shares represented by issued ADSs. Date every bridge input. A 2026Q2 peak margin is not a normalized forward margin.
- Bear/base/bull ten-year scenarios include cyclical normalization, reinvestment, capacity additions and terminal capex. Use terminal growth below WACC, explain normalized mid-cycle margins, and make scenarios independent assumptions rather than issuer guidance or probabilities.
- No new dependencies, APIs, secrets, database, authentication, or infrastructure. Reuse the existing research page and rich research registries. Mirror all modules, adapting route metadata and links for SVIM.

## Reader Stories

1. As an English or Chinese reader, I can find the SKHY hub in both company research libraries and move between translations.
2. As a shareholder, I can trace income/cash/balance figures to the appropriate English-language SK hynix, DART or SEC filing and see currency, date, audit status and missing historical fields.
3. As a semiconductor investor, I can compare memory boom and downturn periods without treating HBM mix or a single quarter as permanent economics.
4. As a reader of the Nasdaq ADS, I can separate the brief traded history from KRX-based equivalent-price context and account for ADS ratio, FX and IPO dilution.
5. As a valuation reader, I can inspect cash-flow arithmetic, capital reinvestment, scenario assumptions, terminal value and dated share/cash/debt inputs.

## Workflow Plan

1. [x] Verify issuer/ticker, establish clean `codex/skhy-research-hub` branches, review standard workflow, code patterns and extension settings.
2. [x] Inventory and parse dated SEC/DART/company sources; establish annual and quarter coverage plus the latest reviewed balance-sheet baseline.
3. [x] Implement memory-sector operating economics and a KRW-based ten-year equity/ADS DCF with invariant tests.
4. [x] Write original English and Chinese research, chart/table views, source audit and publication QA; register Hobite routes and library links.
5. [x] Mirror the full bilingual report and library registration into SVIM.
6. [x] Pass SKHY data/model/mirror checks and both production builds; verify English and Chinese routes on both sites and review the responsive page at a 390px viewport.
7. [ ] Commit, push, create and attach cross-linked PRs; document completion without merging.

## Verification Plan

Check fiscal period uniqueness, KRW/US-dollar unit discipline, year-to-quarter headline reconciliation where source precision permits, annual-to-quarter cash flow bridges only where statement inputs are comparable, common-share/ADS ratio, pre/post-IPO share and cash bridge, DCF FCFF and terminal reinvestment arithmetic, sensitivity direction and translation parity. Verify source domains and direct endpoints, both libraries/routes/translations, all charts and anchors, scroll-contained tables and filing expansion on 1280px and 390px viewports. Record limitations and reproducible commands.
