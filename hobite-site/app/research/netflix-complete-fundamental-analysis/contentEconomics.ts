export type NetflixContentEconomics = {
  fiscalYear: number;
  accessionNumber: string;
  filingUrl: string;
  licensedContentNet: number | null;
  producedContentReleasedLessAmortization: number | null;
  producedContentInProduction: number | null;
  producedContentInDevelopmentAndPreProduction: number | null;
  producedContentNet: number | null;
  contentAssetsNet: number | null;
  licensedContentAmortization: number | null;
  producedContentAmortization: number | null;
  totalContentAmortization: number | null;
  productionTaxIncentiveAmortizationBenefit: number | null;
  totalContentLiabilities: number | null;
  currentContentLiabilities: number | null;
  nonCurrentContentLiabilities: number | null;
  contentObligationsTotal: number | null;
  contentObligationsDueNext12Months: number | null;
  contentObligationsDueBeyond12Months: number | null;
  unrecognizedContentObligations: number | null;
  unknownObligationsLow: number | null;
  unknownObligationsHigh: number | null;
  contentAmortizationYoYChange: number | null;
  contentAmortizationYoYDescription: string | null;
  source: string;
};

export const NETFLIX_CONTENT_ECONOMICS_SOURCE_NOTE =
  "FY2020-FY2025 content economics are extracted from Netflix audited Form 10-K balance sheet component notes, MD&A cost of revenue commentary, and contractual obligations disclosures on SEC EDGAR. Amounts are reported in dollars; fields are null where the filing table did not provide the requested split directly.";

export const NETFLIX_CONTENT_ECONOMICS_COVERAGE = {
  fromFiscalYear: 2020,
  throughFiscalYear: 2025,
  source: "Netflix Form 10-K filings on SEC EDGAR",
};

export const NETFLIX_CONTENT_ECONOMICS: NetflixContentEconomics[] = [
  {
    "fiscalYear": 2025,
    "accessionNumber": "0001065280-26-000034",
    "filingUrl": "https://www.sec.gov/Archives/edgar/data/1065280/000106528026000034/nflx-20251231.htm",
    "licensedContentNet": 12138578000,
    "producedContentReleasedLessAmortization": 10687444000,
    "producedContentInProduction": 9210735000,
    "producedContentInDevelopmentAndPreProduction": 741635000,
    "producedContentNet": 20639814000,
    "contentAssetsNet": 32778392000,
    "licensedContentAmortization": 8713558000,
    "producedContentAmortization": 7708608000,
    "totalContentAmortization": 16422166000,
    "productionTaxIncentiveAmortizationBenefit": 1000000000,
    "totalContentLiabilities": 5700000000,
    "currentContentLiabilities": 4100000000,
    "nonCurrentContentLiabilities": 1600000000,
    "contentObligationsTotal": 24039228000,
    "contentObligationsDueNext12Months": 11528030000,
    "contentObligationsDueBeyond12Months": 12511198000,
    "unrecognizedContentObligations": 18400000000,
    "unknownObligationsLow": 1000000000,
    "unknownObligationsHigh": 4000000000,
    "contentAmortizationYoYChange": 1121000000,
    "contentAmortizationYoYDescription": "Cost of revenues increased year over year partly because content amortization increased by $1,121 million.",
    "source": "Netflix Form 10-K, SEC EDGAR, fiscal year 2025"
  },
  {
    "fiscalYear": 2024,
    "accessionNumber": "0001065280-25-000044",
    "filingUrl": "https://www.sec.gov/Archives/edgar/data/1065280/000106528025000044/nflx-20241231.htm",
    "licensedContentNet": 12422309000,
    "producedContentReleasedLessAmortization": 10151543000,
    "producedContentInProduction": 9317367000,
    "producedContentInDevelopmentAndPreProduction": 561243000,
    "producedContentNet": 20030153000,
    "contentAssetsNet": 32452462000,
    "licensedContentAmortization": 7689014000,
    "producedContentAmortization": 7612503000,
    "totalContentAmortization": 15301517000,
    "productionTaxIncentiveAmortizationBenefit": 899000000,
    "totalContentLiabilities": 6200000000,
    "currentContentLiabilities": 4400000000,
    "nonCurrentContentLiabilities": 1800000000,
    "contentObligationsTotal": 23248931000,
    "contentObligationsDueNext12Months": 11424696000,
    "contentObligationsDueBeyond12Months": 11824235000,
    "unrecognizedContentObligations": 17000000000,
    "unknownObligationsLow": 1000000000,
    "unknownObligationsHigh": 4000000000,
    "contentAmortizationYoYChange": 1104000000,
    "contentAmortizationYoYDescription": "Cost of revenues increased year over year partly because content amortization increased by $1,104 million.",
    "source": "Netflix Form 10-K, SEC EDGAR, fiscal year 2024"
  },
  {
    "fiscalYear": 2023,
    "accessionNumber": "0001065280-24-000030",
    "filingUrl": "https://www.sec.gov/Archives/edgar/data/1065280/000106528024000030/nflx-20231231.htm",
    "licensedContentNet": 12722701000,
    "producedContentReleasedLessAmortization": 9843150000,
    "producedContentInProduction": 8247578000,
    "producedContentInDevelopmentAndPreProduction": 844627000,
    "producedContentNet": 18935355000,
    "contentAssetsNet": 31658056000,
    "licensedContentAmortization": 7145446000,
    "producedContentAmortization": 7051991000,
    "totalContentAmortization": 14197437000,
    "productionTaxIncentiveAmortizationBenefit": 835000000,
    "totalContentLiabilities": 7000000000,
    "currentContentLiabilities": 4500000000,
    "nonCurrentContentLiabilities": 2600000000,
    "contentObligationsTotal": 21713349000,
    "contentObligationsDueNext12Months": 10328923000,
    "contentObligationsDueBeyond12Months": 11384426000,
    "unrecognizedContentObligations": 14600000000,
    "unknownObligationsLow": 1000000000,
    "unknownObligationsHigh": 4000000000,
    "contentAmortizationYoYChange": 171000000,
    "contentAmortizationYoYDescription": "Cost of revenues increased year over year partly because content amortization increased by $171 million.",
    "source": "Netflix Form 10-K, SEC EDGAR, fiscal year 2023"
  },
  {
    "fiscalYear": 2022,
    "accessionNumber": "0001065280-23-000035",
    "filingUrl": "https://www.sec.gov/Archives/edgar/data/1065280/000106528023000035/nflx-20221231.htm",
    "licensedContentNet": 12732549000,
    "producedContentReleasedLessAmortization": 9110518000,
    "producedContentInProduction": 10255940000,
    "producedContentInDevelopmentAndPreProduction": 637706000,
    "producedContentNet": 20004164000,
    "contentAssetsNet": 32736713000,
    "licensedContentAmortization": 7681978000,
    "producedContentAmortization": 6344154000,
    "totalContentAmortization": 14026132000,
    "productionTaxIncentiveAmortizationBenefit": 719000000,
    "totalContentLiabilities": 7600000000,
    "currentContentLiabilities": 4500000000,
    "nonCurrentContentLiabilities": 3100000000,
    "contentObligationsTotal": 21831947000,
    "contentObligationsDueNext12Months": 10038483000,
    "contentObligationsDueBeyond12Months": 11793464000,
    "unrecognizedContentObligations": 14200000000,
    "unknownObligationsLow": 1000000000,
    "unknownObligationsHigh": 4000000000,
    "contentAmortizationYoYChange": 1796000000,
    "contentAmortizationYoYDescription": "Cost of revenues increased year over year partly because content amortization increased by $1,796 million.",
    "source": "Netflix Form 10-K, SEC EDGAR, fiscal year 2022"
  },
  {
    "fiscalYear": 2021,
    "accessionNumber": "0001065280-22-000036",
    "filingUrl": "https://www.sec.gov/Archives/edgar/data/1065280/000106528022000036/nflx-20211231.htm",
    "licensedContentNet": 13799221000,
    "producedContentReleasedLessAmortization": 6877743000,
    "producedContentInProduction": 9235975000,
    "producedContentInDevelopmentAndPreProduction": 1006600000,
    "producedContentNet": 17120318000,
    "contentAssetsNet": 30919539000,
    "licensedContentAmortization": 8055811000,
    "producedContentAmortization": 4174556000,
    "totalContentAmortization": 12230367000,
    "productionTaxIncentiveAmortizationBenefit": null,
    "totalContentLiabilities": 7400000000,
    "currentContentLiabilities": 4300000000,
    "nonCurrentContentLiabilities": 3100000000,
    "contentObligationsTotal": 23161360000,
    "contentObligationsDueNext12Months": 10019306000,
    "contentObligationsDueBeyond12Months": 13142054000,
    "unrecognizedContentObligations": 15800000000,
    "unknownObligationsLow": 1000000000,
    "unknownObligationsHigh": 4000000000,
    "contentAmortizationYoYChange": 1423000000,
    "contentAmortizationYoYDescription": "Cost of revenues increased year over year partly because content amortization increased by $1,423 million.",
    "source": "Netflix Form 10-K, SEC EDGAR, fiscal year 2021"
  },
  {
    "fiscalYear": 2020,
    "accessionNumber": "0001065280-21-000040",
    "filingUrl": "https://www.sec.gov/Archives/edgar/data/1065280/000106528021000040/nflx-20201231.htm",
    "licensedContentNet": 13747607000,
    "producedContentReleasedLessAmortization": 5809681000,
    "producedContentInProduction": 4827455000,
    "producedContentInDevelopmentAndPreProduction": 999207000,
    "producedContentNet": 11636343000,
    "contentAssetsNet": 25383950000,
    "licensedContentAmortization": 7544631000,
    "producedContentAmortization": 3262281000,
    "totalContentAmortization": 10806912000,
    "productionTaxIncentiveAmortizationBenefit": null,
    "totalContentLiabilities": 7000000000,
    "currentContentLiabilities": 4400000000,
    "nonCurrentContentLiabilities": 2600000000,
    "contentObligationsTotal": 19218830000,
    "contentObligationsDueNext12Months": 8980868000,
    "contentObligationsDueBeyond12Months": 7819563000,
    "unrecognizedContentObligations": 12200000000,
    "unknownObligationsLow": 1000000000,
    "unknownObligationsHigh": 4000000000,
    "contentAmortizationYoYChange": 1591000000,
    "contentAmortizationYoYDescription": "Cost of revenues increased year over year partly because content amortization increased by $1,591 million.",
    "source": "Netflix Form 10-K, SEC EDGAR, fiscal year 2020"
  }
];

export const NETFLIX_LATEST_CONTENT_ECONOMICS = NETFLIX_CONTENT_ECONOMICS[0];
