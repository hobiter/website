# AI weekly scorecard article transfer

## Request and scope

2026-10-17. User request: transfer the content in https://chatgpt.com/share/6ad464fd-cf14-83e8-bb8c-debae1a38616 to a research article, with matching PRs for Hobite and svim.io.

Existing bilingual research infrastructure is reused. Standing automatic-completion instruction applies. This is an editorial adaptation of supplied analysis, not 38 new company valuations. No scheduled task is created or claimed.

## Editorial policy

- Retain both substantive answers: 38-company / four-ETF screen and detailed RKLB appendix.
- Publish EN/ZH, dated October 16 market snapshot and October 17 adaptation.
- Omit personal balances, account coverage, holdings amounts and assertions about a particular reader's allocation.
- Retain the $200,000 allocation only as a hypothetical example, not an instruction or suitability assessment.
- Preserve source scores, forward multiples and entry ranges with prominent unverified-source labels. Component scores, consensus vintage and normalized EPS bridges were not supplied; do not claim model reproducibility.
- Historical RKLB tables are transcribed source figures, with filing links and clear period labels. Forecast product buckets are analyst assumptions, not reported segments.
- Do not publish the source's unverified earnings calendar as confirmed appointments. Direct readers to issuer IR calendars.
- No current per-share RKLB valuation without post-financing / acquisition capital reconciliation.
- All enabled extensions are disabled in existing aidlc-state.md; new auth, infrastructure and database work is N/A.

## Execution plan

- [x] Read shared conversation in browser and existing article/mirror patterns.
- [x] Inspect clean repositories and start feature branches from current origin/main.
- [x] Create typed bilingual source data and article with charts, tables, disclosure and source audit.
- [x] Register both languages in Hobite and mirror into SVIM with discovery metadata.
- [x] Add data, arithmetic, privacy, SSR and mirror parity checks.
- [x] Run tests, focused lint, both builds and desktop route verification; dedicated mobile viewport testing recorded as not run.
- [x] Commit, push, create and attach matching PRs.

## Verification

Data/SSR/privacy/parity tests, both focused lint checks, both production builds and four HTTP routes pass. EN/ZH browser rendering and language links pass on both sites. Dedicated mobile viewport screenshots were not executed. Claims are not automatically promoted from source assertions to independently audited facts. Browser retrieval succeeded after the web fetch timed out. The existing RKLB report remains unchanged and is linked for the more extensive SEC-backed database.

## Request audit

User input, 2026-10-17 America/Los_Angeles:

```text
transfer the content in [https://chatgpt.com/share/6ad464fd-cf14-83e8-bb8c-debae1a38616](https://chatgpt.com/share/6ad464fd-cf14-83e8-bb8c-debae1a38616), to a research article, by Generate the same PR for both hobite website, and svim.io.
```

Decision: reuse the existing static research pattern and standing authorization to finish implementations. No new architecture, secrets, database, authentication or feature-specific opt-in extensions are required. Source retrieval, public adaptation, bilingual rendering, mirror parity and privacy checks are in scope. Independent revaluation of 38 companies is not represented as completed.

## Delivery

- Hobite draft PR: https://github.com/hobiter/website/pull/86
- SVIM draft PR: https://github.com/svim-labs/project-albatross/pull/88
- Both attached to the chat. SVIM connector lacked repository access; creation succeeded using the repository's existing authorized Git credentials, without exposing credentials.
- Local previews: Hobite port 3000; SVIM port 4173. Both English and Chinese routes render.
- Desktop DOM checks: each article has 12 sections and 16 tables; content width equals the 1265px viewport on both sites.
- PRs remain drafts for editorial review of the source's financial assumptions. No merge or production deployment performed.
