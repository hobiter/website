export type BroadcomPublicationQaStatus = "pass" | "warning" | "blocked";
export type BroadcomPublicationQaItem = { check: string; status: BroadcomPublicationQaStatus; evidence: string };
export const BROADCOM_PUBLICATION_QA_NOTE = "Publication QA record for the AVGO complete fundamental research hub.";
export const BROADCOM_PUBLICATION_QA_ITEMS: BroadcomPublicationQaItem[] = [
  { check: "Primary-source coverage", status: "pass", evidence: "SEC filings support GAAP history; Broadcom IR supports Q3, AI and non-GAAP disclosures." },
  { check: "Fiscal-calendar handling", status: "pass", evidence: "Generator keys facts to exact report dates and Broadcom fy/fp labels; derived Q4 rows are identified." },
  { check: "Stock-split normalization", status: "pass", evidence: "Historical prices and diluted shares are normalized for the July 2024 ten-for-one split." },
  { check: "Forecast labeling", status: "pass", evidence: "Company Q4 guidance and Hobite FY2027-FY2035 assumptions are separated." },
  { check: "TypeScript and production build", status: "pass", evidence: "SEC regeneration and the Next.js 16.2.4 production build passed with all 39 static routes generated, including English and Chinese AVGO pages." },
  { check: "Responsive browser review", status: "pass", evidence: "The completed route passed visual and accessibility-tree review at desktop and 390 x 844 mobile viewports." },
];
