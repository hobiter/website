export type NvidiaPublicationQaItem = { check:string; status:"pass"|"warning"|"blocked"; evidence:string };
export const NVIDIA_PUBLICATION_QA_ITEMS: NvidiaPublicationQaItem[] = [
  { check:"Primary-source coverage", status:"pass", evidence:"SEC filings support GAAP history, platform metrics, commitments and concentration; NVIDIA IR supports guidance." },
  { check:"Fiscal-period mapping", status:"pass", evidence:"Quarter generation uses SEC fiscal-year and fiscal-period tags for NVIDIA's January year-end." },
  { check:"Stock-split normalization", status:"pass", evidence:"Historical prices and diluted shares normalize the 2021 four-for-one and 2024 ten-for-one splits." },
  { check:"Forecast labeling", status:"pass", evidence:"FY2027-FY2036 scenarios are clearly identified as Hobite assumptions." },
  { check:"TypeScript and production build", status:"pass", evidence:"Hobite and SVIM production builds completed successfully on September 4, 2026." },
  { check:"Responsive browser review", status:"pass", evidence:"English and Chinese routes were reviewed in desktop and mobile layouts." },
];
