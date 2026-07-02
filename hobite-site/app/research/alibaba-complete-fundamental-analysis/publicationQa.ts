export type PublicationQaStatus = "pass" | "warning" | "blocked";
export type PublicationQaItem = { check: string; status: PublicationQaStatus; evidence: string };

export const ALIBABA_PUBLICATION_QA_NOTE = "Publication QA record for the Alibaba research hub. Full local npm build may be blocked by the Windows CET shell issue, so TypeScript is verified through the compiler API.";

export const ALIBABA_PUBLICATION_QA_ITEMS: PublicationQaItem[] = [
  {
    "check": "TypeScript diagnostics",
    "status": "pass",
    "evidence": "Validated through TypeScript compiler API after implementation."
  },
  {
    "check": "Local module imports",
    "status": "pass",
    "evidence": "All route-local modules are present in app/research/alibaba-complete-fundamental-analysis."
  },
  {
    "check": "Representative SEC endpoints",
    "status": "pass",
    "evidence": "SEC submissions, company facts and latest 20-F endpoints returned HTTP 200 during data generation."
  },
  {
    "check": "Market data endpoint",
    "status": "pass",
    "evidence": "Yahoo Finance chart API returned historical BABA ADS adjusted close prices."
  },
  {
    "check": "Quarterly financial database",
    "status": "warning",
    "evidence": "Alibaba is a foreign private issuer and does not file domestic 10-Qs; this pass includes 6-K inventory and annual financials instead of a standardized quarterly table."
  },
  {
    "check": "npm build command",
    "status": "blocked",
    "evidence": "Local PowerShell may exit with the known Windows CET runtime error; TypeScript is verified through Node REPL."
  }
];
