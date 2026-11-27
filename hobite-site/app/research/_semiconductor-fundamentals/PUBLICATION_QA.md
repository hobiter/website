# Semiconductor research snapshot

- **Scope:** ASML, AMAT, LRCX, ARM; English and Simplified Chinese; eight
  statically generated pages and eight entries in the research index.
- **Reporting cut:** November 25, 2026 close for a synchronized price comparison.
  ASML uses the Amsterdam ordinary share in EUR. The other three use USD
  Nasdaq closes. October 30 to November 25 is a fixed-window price change,
  not a peak drawdown or a total return.
- **Source inventory:** The annual SEC filings and latest results links are
  listed per company in `data.ts`. AMAT FY2026 uses the FY2026 issuer release;
  its FY2025 10-K supports the prior years. Arm's EPS is from its US GAAP
  20-F, not the separate UK statutory accounts. Lam's EPS is on the split
  basis presented in its FY2026 filing. ASML uses basic EPS in EUR.
- **Financial scope:** Three annual periods and selected quarters. Cash figures
  are transcribed only where sourced; the pages label investment definitions.
  There is no live pricing, full quarterly database, or historical multiple
  distribution. The fixed-denominator multiple isolates price movement only.
- **Valuation QA:** Revenue and share counts compound separately. EPS uses
  projected net income divided by projected shares. An exit EPS multiple
  yields a terminal per-share value. The reverse calculation holds the base
  margin, share assumptions and multiple fixed. ASML alone starts from the
  FY2026 guidance midpoint rather than reported full-year sales.
- **Publication checks:** Run `npm run build` and confirm both language paths
  are generated for each ticker, and that the research index links to both.
