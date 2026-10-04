export type PublicationQaStatus = "pass" | "warning" | "blocked";

export type PublicationQaItem = {
  check: string;
  status: PublicationQaStatus;
  evidence: string;
};

export const NETFLIX_PUBLICATION_QA_NOTE =
  "October 4, 2026 update: production build, TypeScript, Q2 financial reconciliation, valuation calculation checks and English/Chinese rendered-route checks pass. Earlier historical-source audit warnings remain applicable.";

export const NETFLIX_PUBLICATION_QA_ITEMS: PublicationQaItem[] = [
  {
    check: "TypeScript diagnostics",
    status: "pass",
    evidence: "Project diagnostics completed through the TypeScript compiler API with 0 errors.",
  },
  {
    check: "Local module imports",
    status: "pass",
    evidence: "All local imports referenced by the Netflix route resolve to files in the research route directory.",
  },
  {
    check: "Route section coverage",
    status: "pass",
    evidence:
      "Page renders report narrative, chart dashboard, DCF, historical valuation, subscribers, content economics, financial databases, filing inventory, research structure, source audit, source system, and chart inventory.",
  },
  {
    check: "Source URL shape",
    status: "pass",
    evidence: "Static scan found 219 embedded source URLs and no malformed URL strings.",
  },
  {
    check: "Representative SEC endpoints",
    status: "pass",
    evidence:
      "SEC submissions API, SEC company facts API, and latest Netflix 10-K archive document returned HTTP 200 during automated QA.",
  },
  {
    check: "Market data endpoint",
    status: "pass",
    evidence:
      "Yahoo Finance chart API returned historical adjusted close data for NFLX; public browser history page may block automated requests.",
  },
  {
    check: "Netflix IR endpoint",
    status: "warning",
    evidence:
      "Netflix IR is linked for reader navigation but returned HTTP 403 to automated fetch, consistent with Cloudflare protection. SEC filings remain the source of record.",
  },
  {
    check: "npm build command",
    status: "pass",
    evidence:
      "npm run build completed successfully, including TypeScript and both Netflix routes. node scripts/test-netflix-update.mjs validates Q2 values, normalization, share basis, DCF arithmetic and generated English/Chinese HTML.",
  },
];
