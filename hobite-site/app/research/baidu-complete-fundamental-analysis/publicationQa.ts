export const BAIDU_PUBLICATION_QA_ITEMS = [
  { check: "Primary filings linked", status: "pass", evidence: "Annual and recent Form 6-K inventories link directly to SEC documents." },
  { check: "Reported and modeled data separated", status: "pass", evidence: "Forecast, reconstructed operating values and rounded ADS counts are explicitly labeled." },
  { check: "English and Chinese parity", status: "pass", evidence: "Both pages render the same financial, operating and valuation data." },
  { check: "Automated regeneration", status: "pass", evidence: "npm run research:bidu:data refreshes SEC filings, annual facts and valuation history." },
  { check: "Residual data risk", status: "review", evidence: "China ADR, VIE, investment-mark and currency risks require investor judgment beyond reported cash balances." },
];
