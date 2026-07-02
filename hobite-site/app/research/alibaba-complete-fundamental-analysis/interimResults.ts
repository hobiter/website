export type AlibabaInterimResult = {
  periodLabel: string;
  periodEnded: string;
  filingDate: string;
  accessionNumber: string;
  filingUrl: string;
  exhibitUrl: string;
  headline: string;
  revenueRmbMillions: number | null;
  revenueGrowth: number | null;
  operatingIncomeRmbMillions: number | null;
  adjustedEbitaRmbMillions: number | null;
  netIncomeRmbMillions: number | null;
  nonGaapNetIncomeRmbMillions: number | null;
  operatingCashFlowRmbMillions: number | null;
  freeCashFlowRmbMillions: number | null;
  cloudRevenueGrowth: number | null;
  note: string;
};

export type AlibabaRecentSixKUpdate = {
  filingDate: string;
  accessionNumber: string;
  filingUrl: string;
  classification: "result-release" | "capital-return" | "annual-report-related" | "event-update";
  summary: string;
};

export const ALIBABA_INTERIM_RESULTS_SOURCE_NOTE =
  "Alibaba is a foreign private issuer and does not file domestic Form 10-Qs. This table tracks recent Form 6-K result-release exhibits and should be read as interim operating context rather than a standardized quarterly database.";

export const ALIBABA_INTERIM_RESULTS: AlibabaInterimResult[] = [
  {
    periodLabel: "March quarter FY2026",
    periodEnded: "2026-03-31",
    filingDate: "2026-05-13",
    accessionNumber: "0001104659-26-060224",
    filingUrl: "https://www.sec.gov/Archives/edgar/data/1577552/000110465926060224/tm2614494d1_6k.htm",
    exhibitUrl: "https://www.sec.gov/Archives/edgar/data/1577552/000110465926060224/tm2614494d1_ex99-1.htm",
    headline: "Alibaba Group March Quarter 2026 and Fiscal Year 2026 Results",
    revenueRmbMillions: 243380,
    revenueGrowth: 3,
    operatingIncomeRmbMillions: 50150,
    adjustedEbitaRmbMillions: 5102,
    netIncomeRmbMillions: 23502,
    nonGaapNetIncomeRmbMillions: 86,
    operatingCashFlowRmbMillions: 9410,
    freeCashFlowRmbMillions: -17300,
    cloudRevenueGrowth: 40,
    note: "Year-end 6-K release; the report also contains full-year FY2026 figures used in the annual database.",
  },
  {
    periodLabel: "December quarter FY2026",
    periodEnded: "2025-12-31",
    filingDate: "2026-03-19",
    accessionNumber: "0001104659-26-032060",
    filingUrl: "https://www.sec.gov/Archives/edgar/data/1577552/000110465926032060/tm269353d1_6k.htm",
    exhibitUrl: "https://www.sec.gov/Archives/edgar/data/1577552/000110465926032060/tm269353d1_ex99-1.htm",
    headline: "Alibaba Group Announces December Quarter 2025 Results",
    revenueRmbMillions: 284843,
    revenueGrowth: 2,
    operatingIncomeRmbMillions: 10645,
    adjustedEbitaRmbMillions: 23397,
    netIncomeRmbMillions: 15631,
    nonGaapNetIncomeRmbMillions: 16710,
    operatingCashFlowRmbMillions: 36032,
    freeCashFlowRmbMillions: 11346,
    cloudRevenueGrowth: 36,
    note: "Latest mid-year operating update before the FY2026 annual filing.",
  },
  {
    periodLabel: "September quarter FY2026",
    periodEnded: "2025-09-30",
    filingDate: "2025-11-25",
    accessionNumber: "0001104659-25-115949",
    filingUrl: "https://www.sec.gov/Archives/edgar/data/1577552/000110465925115949/tm2532163d1_6k.htm",
    exhibitUrl: "https://www.sec.gov/Archives/edgar/data/1577552/000110465925115949/tm2532163d1_ex99-1.htm",
    headline: "Alibaba Group September Quarter 2025 Results",
    revenueRmbMillions: 247795,
    revenueGrowth: 5,
    operatingIncomeRmbMillions: 5365,
    adjustedEbitaRmbMillions: 9073,
    netIncomeRmbMillions: 20612,
    nonGaapNetIncomeRmbMillions: 10352,
    operatingCashFlowRmbMillions: 10099,
    freeCashFlowRmbMillions: -21840,
    cloudRevenueGrowth: 34,
    note: "Fiscal second-quarter FY2026 operating update filed on Form 6-K.",
  },
  {
    periodLabel: "June quarter FY2026",
    periodEnded: "2025-06-30",
    filingDate: "2025-08-29",
    accessionNumber: "0001104659-25-085638",
    filingUrl: "https://www.sec.gov/Archives/edgar/data/1577552/000110465925085638/tm2524743d1_6k.htm",
    exhibitUrl: "https://www.sec.gov/Archives/edgar/data/1577552/000110465925085638/tm2524743d1_ex99-1.htm",
    headline: "Alibaba Group Announces June Quarter 2025 Results",
    revenueRmbMillions: 247652,
    revenueGrowth: 2,
    operatingIncomeRmbMillions: 34988,
    adjustedEbitaRmbMillions: 38844,
    netIncomeRmbMillions: 42382,
    nonGaapNetIncomeRmbMillions: 33510,
    operatingCashFlowRmbMillions: 20672,
    freeCashFlowRmbMillions: -18815,
    cloudRevenueGrowth: 26,
    note: "Fiscal first-quarter FY2026 operating update filed on Form 6-K.",
  },
];

export const ALIBABA_RECENT_SIX_K_UPDATES: AlibabaRecentSixKUpdate[] = [
  {
    filingDate: "2026-06-26",
    accessionNumber: "0001104659-26-078252",
    filingUrl: "https://www.sec.gov/Archives/edgar/data/1577552/000110465926078252/tm2618550d1_6k.htm",
    classification: "annual-report-related",
    summary: "Post-annual-report 6-K update in the latest SEC filing cluster.",
  },
  {
    filingDate: "2026-05-28",
    accessionNumber: "0001104659-26-067190",
    filingUrl: "https://www.sec.gov/Archives/edgar/data/1577552/000110465926067190/tm2615873d1_6k.htm",
    classification: "capital-return",
    summary: "Dividend-related 6-K update following the FY2026 result release.",
  },
  {
    filingDate: "2026-05-13",
    accessionNumber: "0001104659-26-060224",
    filingUrl: "https://www.sec.gov/Archives/edgar/data/1577552/000110465926060224/tm2614494d1_6k.htm",
    classification: "result-release",
    summary: "March quarter and fiscal year 2026 results release.",
  },
  {
    filingDate: "2026-03-19",
    accessionNumber: "0001104659-26-032060",
    filingUrl: "https://www.sec.gov/Archives/edgar/data/1577552/000110465926032060/tm269353d1_6k.htm",
    classification: "result-release",
    summary: "December quarter 2025 results release.",
  },
  {
    filingDate: "2025-11-25",
    accessionNumber: "0001104659-25-115949",
    filingUrl: "https://www.sec.gov/Archives/edgar/data/1577552/000110465925115949/tm2532163d1_6k.htm",
    classification: "result-release",
    summary: "September quarter 2025 results release.",
  },
  {
    filingDate: "2025-10-02",
    accessionNumber: "0001104659-25-095828",
    filingUrl: "https://www.sec.gov/Archives/edgar/data/1577552/000110465925095828/tm2527817d1_6k.htm",
    classification: "capital-return",
    summary: "Share repurchase update.",
  },
];
