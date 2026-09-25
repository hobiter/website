export type MetaPublicationQaItem = { check:string; status:"pass"|"warning"|"blocked"; evidence:string };
export const META_PUBLICATION_QA_ITEMS: MetaPublicationQaItem[] = [
  { check:"Primary-source coverage", status:"pass", evidence:"SEC filings support GAAP history and capital context; Meta IR supports guidance and advertising metrics." },
  { check:"Fiscal-period mapping", status:"pass", evidence:"Quarter generation uses SEC fiscal-year and fiscal-period tags for Meta's December year-end." },
  { check:"AI disclosure discipline", status:"pass", evidence:"The report does not fabricate AI revenue, GPU commitments or segment-level AI economics." },
  { check:"Forecast labeling", status:"pass", evidence:"FY2026-FY2035 scenarios are clearly identified as Hobite assumptions." },
  { check:"TypeScript and production build", status:"pass", evidence:"Hobite and SVIM production builds completed successfully on September 24, 2026." },
  { check:"Responsive browser review", status:"pass", evidence:"English and Chinese Hobite routes plus the bilingual SVIM route were reviewed locally." },
];
