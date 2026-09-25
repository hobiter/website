export type MetaValuationHistory = { fiscalYear: number; priceDate: string; adjustedClose: number | null; splitAdjustedDilutedShares: number; marketCapitalization: number | null; enterpriseValue: number | null; priceToSales: number | null; enterpriseValueToSales: number | null; priceToEarnings: number | null; freeCashFlowYield: number | null; source: string };
export const META_VALUATION_HISTORY_NOTE = "Historical rows combine Yahoo Finance adjusted closes nearest Meta's year-end with SEC financials and diluted shares. FY2026 uses the September 24, 2026 market snapshot and Hobite full-year estimates.";
export const META_VALUATION_HISTORY: MetaValuationHistory[] = [
  {
    "fiscalYear": 2018,
    "priceDate": "2018-12-31",
    "adjustedClose": 129.8463592529297,
    "splitAdjustedDilutedShares": 2921000000,
    "marketCapitalization": 379281215377.8076,
    "enterpriseValue": null,
    "priceToSales": 6.792528661087568,
    "enterpriseValueToSales": null,
    "priceToEarnings": 17.15273224393124,
    "freeCashFlowYield": 4.049501893918125,
    "source": "Yahoo Finance adjusted close and Meta SEC filings"
  },
  {
    "fiscalYear": 2019,
    "priceDate": "2019-12-31",
    "adjustedClose": 203.30284118652344,
    "splitAdjustedDilutedShares": 2876000000,
    "marketCapitalization": 584698971252.4414,
    "enterpriseValue": null,
    "priceToSales": 8.270491976356018,
    "enterpriseValueToSales": null,
    "priceToEarnings": 31.630996551389853,
    "freeCashFlowYield": 3.6278497214666388,
    "source": "Yahoo Finance adjusted close and Meta SEC filings"
  },
  {
    "fiscalYear": 2020,
    "priceDate": "2020-12-31",
    "adjustedClose": 270.56854248046875,
    "splitAdjustedDilutedShares": 2888000000,
    "marketCapitalization": 781401950683.5938,
    "enterpriseValue": 764294950683.5938,
    "priceToSales": 9.089768518392296,
    "enterpriseValueToSales": 8.890768925534738,
    "priceToEarnings": 26.80992076729547,
    "freeCashFlowYield": 3.024307781587443,
    "source": "Yahoo Finance adjusted close and Meta SEC filings"
  },
  {
    "fiscalYear": 2021,
    "priceDate": "2021-12-31",
    "adjustedClose": 333.1590881347656,
    "splitAdjustedDilutedShares": 2859000000,
    "marketCapitalization": 952501832977.2949,
    "enterpriseValue": 936406832977.2949,
    "priceToSales": 8.076909267248046,
    "enterpriseValueToSales": 7.94042884258575,
    "priceToEarnings": 24.19359494481318,
    "freeCashFlowYield": 4.10665876387163,
    "source": "Yahoo Finance adjusted close and Meta SEC filings"
  },
  {
    "fiscalYear": 2022,
    "priceDate": "2022-12-30",
    "adjustedClose": 119.19834899902344,
    "splitAdjustedDilutedShares": 2702000000,
    "marketCapitalization": 322073938995.3613,
    "enterpriseValue": 291258938995.3613,
    "priceToSales": 2.7619989794557998,
    "enterpriseValueToSales": 2.497739788484262,
    "priceToEarnings": 13.882497370489713,
    "freeCashFlowYield": 5.912927962878201,
    "source": "Yahoo Finance adjusted close and Meta SEC filings"
  },
  {
    "fiscalYear": 2023,
    "priceDate": "2023-12-29",
    "adjustedClose": 350.6020202636719,
    "splitAdjustedDilutedShares": 2629000000,
    "marketCapitalization": 921732711273.1934,
    "enterpriseValue": 874714711273.1934,
    "priceToSales": 6.832609681644404,
    "enterpriseValueToSales": 6.484075189939314,
    "priceToEarnings": 23.574932509928725,
    "freeCashFlowYield": 4.757018977815592,
    "source": "Yahoo Finance adjusted close and Meta SEC filings"
  },
  {
    "fiscalYear": 2024,
    "priceDate": "2024-12-31",
    "adjustedClose": 582.1708374023438,
    "splitAdjustedDilutedShares": 2614000000,
    "marketCapitalization": 1521794568969.7266,
    "enterpriseValue": 1472805568969.7266,
    "priceToSales": 9.25097457747811,
    "enterpriseValueToSales": 8.953170916710091,
    "priceToEarnings": 24.403376667250267,
    "freeCashFlowYield": 3.5531734113499565,
    "source": "Yahoo Finance adjusted close and Meta SEC filings"
  },
  {
    "fiscalYear": 2025,
    "priceDate": "2025-12-31",
    "adjustedClose": 658.39501953125,
    "splitAdjustedDilutedShares": 2574000000,
    "marketCapitalization": 1694708780273.4375,
    "enterpriseValue": 1671860780273.4375,
    "priceToSales": 8.432813412584405,
    "enterpriseValueToSales": 8.319122539501397,
    "priceToEarnings": 28.031175035122523,
    "freeCashFlowYield": 2.720762442297633,
    "source": "Yahoo Finance adjusted close and Meta SEC filings"
  },
  {
    "fiscalYear": 2026,
    "priceDate": "2026-09-24",
    "adjustedClose": 777.59,
    "splitAdjustedDilutedShares": 2566000000,
    "marketCapitalization": 1995295940000,
    "enterpriseValue": 1988699940000,
    "priceToSales": 7.98118376,
    "enterpriseValueToSales": 7.95479976,
    "priceToEarnings": 21.003115157894737,
    "freeCashFlowYield": 1.0023575750873326,
    "source": "Yahoo Finance September 24, 2026 market snapshot, Meta Q2 filing and Hobite FY2026 estimate"
  }
];
export const META_LATEST_VALUATION = META_VALUATION_HISTORY.at(-1)!;
