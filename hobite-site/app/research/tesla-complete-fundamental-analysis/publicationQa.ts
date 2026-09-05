export type TeslaPublicationQaItem = { check:string; status:"pass"|"warning"|"blocked"; evidence:string };
export const TESLA_PUBLICATION_QA_ITEMS: TeslaPublicationQaItem[] = [
  { check:"Primary-source coverage", status:"pass", evidence:"SEC filings support GAAP history; Tesla IR supports operating metrics." },
  { check:"Stock-split normalization", status:"pass", evidence:"Historical prices and diluted shares normalize the 2020 five-for-one and 2022 three-for-one splits." },
  { check:"Autonomy assumption labeling", status:"pass", evidence:"Robotaxi, Cybercab, FSD and Optimus are treated as scenario-dependent options." },
  { check:"TypeScript and production build", status:"pass", evidence:"Hobite and SVIM production builds completed successfully on September 4, 2026." },
  { check:"Responsive browser review", status:"pass", evidence:"English and Chinese routes were reviewed in responsive Hobite and SVIM layouts." },
];
