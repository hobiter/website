# TSM Research Hub

## Requirements And Design

Apply COMPANY_RESEARCH_STANDARD_WORKFLOW.md to Taiwan Semiconductor Manufacturing Company Limited. Publish matching English and Chinese reports on Hobite and SVIM, with separate reviewable PRs. Standing authorization covers implementation through verification without phase pauses.

Use SEC 20-F annuals and 6-K disclosures, issuer quarterly statements and operating presentations, and dated market prices. Financial history and forecasts use TWD; US ADS values convert five ordinary shares at an explicitly assumed exchange rate. Unknowns remain null. Do not mix pre-2013 accounting with IFRS.

Company-specific scope: node/platform mix, wafer shipments, advanced packaging, utilization, concentration, overseas fabs, inventory, capex, cash conversion, geopolitical risks and dividends. Include ten-year bear/base/bull DCF, discount/growth and FX sensitivities, historical valuation, charts, bilingual memo and source audit.

## Implementation Plan

1. [x] Reuse existing architecture; branch both repositories from origin/main.
2. [x] Generate annual and quarterly databases and filing inventory; verify latest operating disclosures.
3. [x] Implement forecast and valuation with explicit IFRS, lease, currency and ADS conventions.
4. [x] Build bilingual app/research/tsmc-complete-fundamental-analysis/ report and register Hobite library.
5. [x] Mirror to project-albatross/src/content/hobiteResearch/research/tsmc-complete-fundamental-analysis/ and register SVIM routes/library.
6. [x] Test financial arithmetic, model invariants and mirror parity; build both applications and verify desktop/mobile views.
7. [x] Commit scoped changes, publish and attach both PRs, document verification.

## Completion

Hobite: https://github.com/hobiter/website/pull/76

SVIM: https://github.com/svim-labs/project-albatross/pull/77

Both PRs are linked and attached to this chat, open and unmerged. Financial/model tests, exact adapted parity across 14 files, both production builds and both-language desktop/mobile checks passed. Coverage and source-access limitations are documented in TSMC_RESEARCH_HUB.md and on the report pages.

## Workflow Scope

Prior brownfield reverse engineering reused. No API, database, auth or infrastructure change. Security, resiliency and property-based extensions remain disabled under existing configuration. Financial invariants still require tests. No automatic merge.
