# AMD Research Hub

## Requirements And Workflow

Apply COMPANY_RESEARCH_STANDARD_WORKFLOW.md through completed English and Chinese reports in Hobite and SVIM, then linked unmerged PRs. Standing automatic-completion authorization applies. Both clean repositories branched codex/amd-research-hub from origin/main after the MU PRs merged. Reuse existing Next.js research and SVIM lazy rich-page architecture. No dependencies, API, database, auth or infrastructure changes. Existing security/resiliency/property extension opt-outs retained and skipped; financial invariant tests still required.

Reader stories: discover either language in the research library, navigate evidence and wide tables on mobile, separate GAAP from adjusted earnings and guidance, inspect ten-year scenarios with customer-warrant dilution, trace evidence to primary sources.

## Financial Design

USD US GAAP, 52/53-week fiscal years near December year end. Filed annual FY2011-FY2025 and quarters through FY2026 Q2; no fabricated FY2026 full-year actual. Inventory includes amendments; FY2025 10-K/A corrected MD&A only, not financial statements. Preserve original balance contexts, latest comparable flow facts, exact units and provenance. Derive quarterly cash flows from YTD with complete prior quarters and Q4 from annual minus Q1-Q3; do not subtract EPS/share counts. Acquisition and discontinued-operation presentation changes are explicit.

AMD is fabless: R&D/software and supply commitments matter more than owned-fab capex. Retain SBC in GAAP EBIT; add acquired-intangible amortization only once with a finite runoff, plus separately modeled other D&A. FCFF subtracts cash capex and working-capital investment. Operating lease rent remains in EBIT; deduct reported financial debt, not operating lease liabilities. Nonrecurring investment gains/tax releases are not recurring operating cash. No recurring acquisition proceeds or new M&A assumed; disclose this limitation.

Customer warrants may add up to 320M shares; milestones are conditional, not issued equity or guaranteed revenue. Use Q2 diluted weighted shares as a dated proxy with explicit incremental warrant stress, not exact current ownership. Procurement commitments are future supplier payments represented through costs/working capital, not an additional full debt subtraction. Separate GAAP/non-GAAP operating bridges and latest management guidance.

## Plan

1. [x] Inspect workflow/repositories; branch from current main and document requirements/design.
2. [x] Generate SEC fiscal data, inventory and dated market history; verify anchors and presentation changes.
3. [x] Implement AMD economics, ten-year forecasts/DCF and financial tests.
4. [x] Write bilingual report, 12-chart dashboard, tables, source audit and QA; register Hobite pages.
5. [x] Mirror all modules and register both languages in SVIM.
6. [x] Run data/parity tests and both builds; verify both languages/sites on desktop/mobile.
7. [x] Commit/push, open/attach linked PRs and record outcome. Do not merge.

## Verification

Financial anchors, complete fiscal-flow sums, balance identity, unit filtering, cash-flow bridges, segment reconciliation, dilution/valuation monotonicity, positive terminal reinvestment, source URLs, bilingual sections and exact mirror parity. Build both sites. Browser QA at 1280px and 390px: library discovery, translation, section anchors, charts and contained wide tables. Unknowns remain N/A. Archive limitations, ex-post history and model assumptions stay visible.

## Completed Evidence And Reproduction

- 15 annuals FY2011-FY2025, 62 quarters through FY2026 Q2, 595 electronic filing entries. Cutoff October 4, 2026; last market close October 2. No FY2026 annual actual.
- FY2013 Q1 report-date mismatch resolved using the original accession's revenue duration context ending March 30, not submission metadata March 31. Original balance facts, exact units, and missing-value provenance preserved.
- FY2025 10-K/A corrected MD&A, not financial statements. Latest Q2 revenue $11.536B, GAAP EBIT $1.990B; segment EBIT $3.071B minus All Other $1.081B reconciles. Adjusted EBIT $3.094B separately bridged.
- Q2 2025 total tagged CFO minus continuing capex $1.729B is not continuing FCF: issuer continuing FCF $1.180B plus discontinued CFO $0.549B. Historical accounting perimeters remain explicit.
- DCF uses ten FY2027-FY2036 periods, a remaining-FY2026 assumed stub, finite acquired-amortization runoff, positive terminal capex/working capital, retained SBC/rent and 0/160/320M incremental conditional warrant stresses. Starting shares are dated weighted diluted shares, not current outstanding shares.
- June 27 balance-sheet cash/investments/debt are dated; no unreported subsequent cash inferred. Conditional $5B investment reserve deducted once as an analyst convention, not recorded debt. Procurement commitments modeled through costs/working capital; lease ramps, guarantees and warrant accounting not fully priced.
- Scenario outputs bear/base/bull $51.80/$260.17/$617.40 are independent assumptions, not price targets or management guidance. Market reference $633.91. Q3 revenue guidance and non-GAAP gross margin are labeled separately.
- Financial/model/bilingual/parity tests passed. Both production builds passed; existing large-chunk warnings retained. Browser checks passed for four site/language combinations at 1280px and 390px, with eight sections and 12 charts. Fixed Hobite flex-child intrinsic-width overflow; wide tables scroll internally. Library links, translation, anchors and 595-link filing expansion verified; no captured console errors.
- Reproduce in Hobite: `npm run research:amd:data`, `npm run research:amd:mirror`, `npm run research:amd:test`, `npm run build`. SVIM: `npm run build`. Review regenerated source facts and model assumptions before publication.
- Hobite routes: `/research/amd-complete-fundamental-analysis` and `/research/amd-complete-fundamental-analysis/zh`. SVIM routes: `/research/amd-complete-fundamental-analysis` and `/research/zh-amd-complete-fundamental-analysis`; blog aliases supported.
- Primary evidence: FY2025 10-K accession 0000002488-26-000018, 10-K/A 0000002488-26-000021, Q2 10-Q 0000002488-26-000123, issuer Q2 release 1295, OpenAI warrant 8-K 0001193125-25-230895 and Meta warrant 8-K 0000002488-26-000045. Direct URLs are in operatingMetrics/sourceAudit/filings modules.

Local verification is not production deployment. PRs remain unmerged.

## Delivery

- Hobite: https://github.com/hobiter/website/pull/78
- SVIM: https://github.com/svim-labs/project-albatross/pull/79
- Both companion PRs cross-linked, attached to this chat, open and unmerged. Branches: `codex/amd-research-hub`. All requested implementation and local verification completed.
