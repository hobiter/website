# Semiconductor history and forecast

Refresh the fixed-date issuer supplements with Python (openpyxl and lxml)
and Node 24, then regenerate the merged history:

    python scripts/update-issuer-quarter-history.py
    node scripts/update-eight-chip-history.mjs --write
    node scripts/test-eight-chip-history.mjs

Annual periods are drawn from SEC Company Facts and original annual filing
tables, with a FY2026 issuer-release fallback for Applied Materials and
the existing audited 20-F dataset for TSM. Historical free cash flow is a
cash-investment proxy, not FCFF or the company's adjusted cash flow; tag
selection and explicit source links are retained per row. Expenses are not
mixed between consolidated and selectively disclosed segment figures.

EPS is diluted and adjusted for the specified NVIDIA, Broadcom and Lam
splits. TSM uses TWD per ordinary share throughout the financial dashboard;
the existing stock valuation converts to USD per ADS. Arm's available
consistent U.S. GAAP annual series starts in FY2022, and issuer workbooks
support 19 consecutive quarters. No pre-listing gaps are extrapolated.

Quarterly U.S. filing facts use direct three-month values where tagged.
Otherwise annual/quarterly cumulative flow totals are differenced only
when a same-tag, same-fiscal-start comparator exists. TSM and ASML use
their filed financial statements or issuer workbooks. Supplemental EPS
comes from reported quarterly disclosures; EPS is never differenced.
Historical FCF is a proxy and unavailable where either cash input is absent.

The forecast holds each existing scenario's annual sales growth, net
margin and share trajectory, using its published AR/QR anchor. Projected
cash conversion starts at the latest annual FCF margin and converges by
year five to the three-year aggregate margin, plus explicit scenario
spreads. Growth, share paths, forward
profit margins, and cash conversion are analyst assumptions, not issuer
guidance. This dashboard does not revise the existing exit-multiple model.
