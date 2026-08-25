export type BerkshirePublicationQaStatus = "pass" | "warning" | "blocked";
export type BerkshirePublicationQaItem = { check: string; status: BerkshirePublicationQaStatus; evidence: string };

export const BERKSHIRE_PUBLICATION_QA_NOTE = "Publication QA record for the BRK.B fundamental research hub.";

export const BERKSHIRE_PUBLICATION_QA_ITEMS: BerkshirePublicationQaItem[] = [
  { check: "Primary-source coverage", status: "pass", evidence: "Annual and quarterly accounting data are generated from SEC endpoints; Berkshire reports support company-defined operating metrics." },
  { check: "GAAP and non-GAAP separation", status: "pass", evidence: "GAAP net income, mechanical FCF and Berkshire operating earnings are separately labeled throughout." },
  { check: "Valuation transparency", status: "pass", evidence: "Reference date, share conversion, normalized earnings, book value and multiples are visible and scenario based." },
  { check: "Forecast labeling", status: "pass", evidence: "All forward figures are identified as Hobite assumptions rather than management guidance." },
  { check: "TypeScript and production build", status: "pass", evidence: "Next.js 16.2.4 production build completed with TypeScript and all 37 static pages generated." },
  { check: "Route and responsive review", status: "pass", evidence: "Verified at 1440x900 and 390x844: no page overflow or clipped text, horizontal tables remain scrollable, and browser logs are clean." },
];
