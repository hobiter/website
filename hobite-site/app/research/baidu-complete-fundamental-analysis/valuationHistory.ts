export type BaiduValuationHistory = { fiscalYear: number; priceDate: string; adjustedCloseUsd: number | null; adsShares: number; marketCapitalizationUsd: number | null; enterpriseValueRmb: number | null; priceToSales: number | null; enterpriseValueToSales: number | null; priceToEarnings: number | null; freeCashFlowYield: number | null; source: string };
export const BAIDU_VALUATION_HISTORY_NOTE = "Historical rows combine Yahoo Finance adjusted closes nearest year-end with Baidu SEC financials, filing-normalized ADS counts, and year-end RMB/USD context. ADS counts are rounded because the XBRL history does not provide a consistent diluted-ADS series. FY2026 uses the September 24, 2026 market snapshot and Hobite estimates.";
export const BAIDU_VALUATION_HISTORY: BaiduValuationHistory[] = [
  {
    "fiscalYear": 2018,
    "priceDate": "2018-12-31",
    "adjustedCloseUsd": 158.60000610351562,
    "adsShares": 349000000,
    "marketCapitalizationUsd": 55351402130.12695,
    "enterpriseValueRmb": 291159646655.27344,
    "priceToSales": 3.723394767692379,
    "enterpriseValueToSales": 2.846775390901898,
    "priceToEarnings": 13.811251828066348,
    "freeCashFlowYield": 7.1412131866403925,
    "source": "Yahoo Finance adjusted close, year-end RMB/USD context, and Baidu SEC filings"
  },
  {
    "fiscalYear": 2019,
    "priceDate": "2019-12-31",
    "adjustedCloseUsd": 126.4000015258789,
    "adsShares": 350000000,
    "marketCapitalizationUsd": 44240000534.05762,
    "enterpriseValueRmb": 204852403717.04102,
    "priceToSales": 2.8666027735659654,
    "enterpriseValueToSales": 1.9071472141830226,
    "priceToEarnings": 149.68906354741907,
    "freeCashFlowYield": 7.154678677322253,
    "source": "Yahoo Finance adjusted close, year-end RMB/USD context, and Baidu SEC filings"
  },
  {
    "fiscalYear": 2020,
    "priceDate": "2020-12-31",
    "adjustedCloseUsd": 216.24000549316406,
    "adsShares": 351000000,
    "marketCapitalizationUsd": 75900241928.10059,
    "enterpriseValueRmb": 381852579790.4968,
    "priceToSales": 4.628841546878764,
    "enterpriseValueToSales": 3.566249320941562,
    "priceToEarnings": 22.05538357914279,
    "freeCashFlowYield": 3.8569204399149806,
    "source": "Yahoo Finance adjusted close, year-end RMB/USD context, and Baidu SEC filings"
  },
  {
    "fiscalYear": 2021,
    "priceDate": "2021-12-31",
    "adjustedCloseUsd": 148.7899932861328,
    "adsShares": 350000000,
    "marketCapitalizationUsd": 52076497650.146484,
    "enterpriseValueRmb": 204738525054.93164,
    "priceToSales": 2.6604429570733426,
    "enterpriseValueToSales": 1.6445786112868326,
    "priceToEarnings": 32.38866859524072,
    "freeCashFlowYield": 2.785573140043011,
    "source": "Yahoo Finance adjusted close, year-end RMB/USD context, and Baidu SEC filings"
  },
  {
    "fiscalYear": 2022,
    "priceDate": "2022-12-30",
    "adjustedCloseUsd": 114.37999725341797,
    "adsShares": 349000000,
    "marketCapitalizationUsd": 39918619041.44287,
    "enterpriseValueRmb": 154996471385.9558,
    "priceToSales": 2.2271151921241628,
    "enterpriseValueToSales": 1.2532562877376658,
    "priceToEarnings": 36.4384801410181,
    "freeCashFlowYield": 6.4929201465615884,
    "source": "Yahoo Finance adjusted close, year-end RMB/USD context, and Baidu SEC filings"
  },
  {
    "fiscalYear": 2023,
    "priceDate": "2023-12-29",
    "adjustedCloseUsd": 119.08999633789062,
    "adsShares": 346000000,
    "marketCapitalizationUsd": 41205138732.91016,
    "enterpriseValueRmb": 142401485003.6621,
    "priceToSales": 2.1735574451601223,
    "enterpriseValueToSales": 1.0579762329578606,
    "priceToEarnings": 14.401008368381103,
    "freeCashFlowYield": 8.69062943509242,
    "source": "Yahoo Finance adjusted close, year-end RMB/USD context, and Baidu SEC filings"
  },
  {
    "fiscalYear": 2024,
    "priceDate": "2024-12-31",
    "adjustedCloseUsd": 84.30999755859375,
    "adsShares": 344000000,
    "marketCapitalizationUsd": 29002639160.15625,
    "enterpriseValueRmb": 120526265869.14062,
    "priceToSales": 1.5903794619278169,
    "enterpriseValueToSales": 0.9053616215522301,
    "priceToEarnings": 8.910743513010969,
    "freeCashFlowYield": 6.187438798364644,
    "source": "Yahoo Finance adjusted close, year-end RMB/USD context, and Baidu SEC filings"
  },
  {
    "fiscalYear": 2025,
    "priceDate": "2025-12-31",
    "adjustedCloseUsd": 130.66000366210938,
    "adsShares": 342654000,
    "marketCapitalizationUsd": 44771172894.836426,
    "enterpriseValueRmb": 254330562132.3059,
    "priceToSales": 2.53201188521995,
    "enterpriseValueToSales": 1.9703480979268968,
    "priceToEarnings": 58.47728791059329,
    "freeCashFlowYield": -4.615861521698255,
    "source": "Yahoo Finance adjusted close, year-end RMB/USD context, and Baidu SEC filings"
  },
  {
    "fiscalYear": 2026,
    "priceDate": "2026-09-24",
    "adjustedCloseUsd": 88.08,
    "adsShares": 342654000,
    "marketCapitalizationUsd": 30180964320,
    "enterpriseValueRmb": 14828747732.799988,
    "priceToSales": 1.6010058416625,
    "enterpriseValueToSales": 0.1158495916624999,
    "priceToEarnings": 20.49287477328,
    "freeCashFlowYield": 5.855693812000654,
    "source": "Yahoo Finance September 24, 2026 snapshot, Baidu Q2 results, and Hobite FY2026 estimates"
  }
];
export const BAIDU_LATEST_VALUATION = BAIDU_VALUATION_HISTORY.at(-1)!;
