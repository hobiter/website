# Rocket Lab Research Delivery

## Scope

User request: "follow this standard procedure to do the similar Financial Analysis work for RKLB, Generate the same PR for both hobite website, and svim.io."

Apply COMPANY_RESEARCH_STANDARD_WORKFLOW.md and existing automatic-completion authorization. Reuse brownfield architecture and bilingual routes. No merge/deployment. Existing Security, Resiliency and PBT extensions remain disabled; source validation, accessibility and deterministic tests still apply.

Reader stories: inspect sourced history; understand Electron/HASTE, space systems and Neutron; distinguish pending Iridium from reported results; change valuation assumptions; find both languages in both libraries.

## Plan

- [x] Inspect clean repositories, templates and current main branches.
- [x] Define scope/source hierarchy; inspect SEC inventory and October 14 Neutron update.
- [x] Generate annual/quarterly facts with provenance, filing inventory and dated price history.
- [x] Build company economics, bilingual report and standalone valuation with merger limitations.
- [x] Implement charts, accessible tables, assumption controls, source audit and QA.
- [x] Mirror routes and register both libraries.
- [x] Run data/model/mirror/render tests, source checks, diagnostics, both builds and attempt desktop/mobile visual checks.
- [x] Create, cross-link and attach matching PRs; document limitations.

## Design

One company unit: data, economics, report, model and view. Existing Next/React/Tailwind and Vite mirror patterns. USD millions except per-share values; December fiscal year-end. Per-field provenance; missing data null. Quarter cash flows derive from YTD; Q4 from annual less nine months, never EPS subtraction. Exclude pre-combination SPAC history. Historical valuation uses period-end common shares, not weighted averages. Price date explicit, not live.

Economics: segment gross profit, launch cadence and recognized revenue per mission (not selling price), backlog conversion, Neutron flight risk, SBC/dilution, investments, customers and financing. Iridium is not consolidated or included for free in standalone DCF. June-anchored bridge is not current liquidity; post-quarter ATM overlap and acquisition commitments disclosed. Scenarios are assumptions, not guidance or promised ROI.

Workflow: sources -> reconciliation -> economics/report/model -> bilingual page -> mirror -> tests/builds -> PRs. Existing reverse engineering reused; infrastructure, broad architecture redesign and service decomposition skipped because this extends the established article pattern.

## Status

Implementation and automated/browser QA complete, 2026-10-15. Matching draft PRs created, cross-linked and attached:

- Hobite: https://github.com/hobiter/website/pull/85
- SVIM: https://github.com/svim-labs/project-albatross/pull/87

Neither merged; no production publication claimed. Draft status requests financial-research review, including explicit current-capital and merger-valuation limitations.

## Verification Results

- Data/model tests and focused ESLint pass. Next production build generates 73 routes; SVIM TypeScript/Vite build transforms 9,025 modules. HTTP checks pass for all four routes and both Hobite library links.
- Browser verified desktop report layouts on both sites, English and Chinese mobile rendering, section navigation, scenario/horizon changes, invalid discount validation, Iridium VWAP calculator and language switching. Chinese SVIM library entry is discoverable and keyboard navigation reaches the report.
- Fixed dark-system contrast by using a report-local light background. Added width/min-width constraints; document width matches viewport at desktop and 390px mobile, with horizontal scrolling contained within tables. Keyboard ArrowRight advances a mobile table's scroll offset.
- Exact adapted RKLB mirror passes. Full SVIM parity still reports unrelated pre-existing Netflix missing files and older article differences, but no RKLB mismatch or missing registry/metadata/import.
- Representative SEC endpoints return 200. Issuer Neutron direct automated access returns 403; web retrieval and SEC counterpart verified. This caveat is on-page.
- Source audit deliberately marks current capital normalization and merger-adjusted valuation partial. June capital bridge excludes post-June ATM and Iridium operations/consideration together; no October price target, precise upside or guaranteed ROI claimed.
