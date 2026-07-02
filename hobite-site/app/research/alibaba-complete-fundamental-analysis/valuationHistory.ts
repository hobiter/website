export type AlibabaValuationHistory = {
  fiscalYear: number;
  priceDate: string;
  adjustedCloseUsd: number | null;
  adsEquivalentDilutedShares: number | null;
  marketCapUsd: number | null;
  marketCapRmb: number | null;
  enterpriseValueRmb: number | null;
  netDebtRmb: number | null;
  priceToSales: number | null;
  enterpriseValueToSales: number | null;
  priceToEarnings: number | null;
  freeCashFlowYield: number | null;
  source: string;
};

export const ALIBABA_VALUATION_HISTORY_SOURCE_NOTE =
  "Historical valuation rows combine Yahoo Finance BABA ADS adjusted close prices with SEC Form 20-F diluted ordinary share counts. Alibaba's ADS ratio is treated as 1 ADS = 8 ordinary shares. Market cap is translated to RMB using a constant CNY/USD reference rate of 7.1108 for high-level multiple context, not for accounting presentation. Coverage starts in FY2020 to avoid pre-split/pre-ratio comparability noise.";

export const ALIBABA_VALUATION_HISTORY_COVERAGE = {
  fromFiscalYear: 2020,
  throughFiscalYear: 2026,
  adsRatioOrdinarySharesPerAds: 8,
  referenceCnyUsdRate: 7.1108,
};

export const ALIBABA_VALUATION_HISTORY: AlibabaValuationHistory[] = [
  {
    "fiscalYear": 2020,
    "priceDate": "2020-03-31",
    "adjustedCloseUsd": 183.02,
    "adsEquivalentDilutedShares": 2668250000,
    "marketCapUsd": 488332133549,
    "marketCapRmb": 3472432135240,
    "enterpriseValueRmb": 3141929135240,
    "netDebtRmb": -330503000000,
    "priceToSales": 6.81,
    "enterpriseValueToSales": 6.16,
    "priceToEarnings": 23.2,
    "freeCashFlowYield": 4.5,
    "source": "Yahoo Finance BABA adjusted close, SEC 20-F diluted ordinary share count, and 1 ADS = 8 ordinary shares ratio"
  },
  {
    "fiscalYear": 2021,
    "priceDate": "2021-03-31",
    "adjustedCloseUsd": 213.36,
    "adsEquivalentDilutedShares": 2747750000,
    "marketCapUsd": 586273190716,
    "marketCapRmb": 4168871404543,
    "enterpriseValueRmb": 3847609404543,
    "netDebtRmb": -321262000000,
    "priceToSales": 5.81,
    "enterpriseValueToSales": 5.36,
    "priceToEarnings": 27.7,
    "freeCashFlowYield": 4.1,
    "source": "Yahoo Finance BABA adjusted close, SEC 20-F diluted ordinary share count, and 1 ADS = 8 ordinary shares ratio"
  },
  {
    "fiscalYear": 2022,
    "priceDate": "2022-03-31",
    "adjustedCloseUsd": 102.39,
    "adsEquivalentDilutedShares": 2723375000,
    "marketCapUsd": 278836848400,
    "marketCapRmb": 1982753061603,
    "enterpriseValueRmb": 1792855061603,
    "netDebtRmb": -189898000000,
    "priceToSales": 2.32,
    "enterpriseValueToSales": 2.1,
    "priceToEarnings": 31.9,
    "freeCashFlowYield": 5,
    "source": "Yahoo Finance BABA adjusted close, SEC 20-F diluted ordinary share count, and 1 ADS = 8 ordinary shares ratio"
  },
  {
    "fiscalYear": 2023,
    "priceDate": "2023-03-31",
    "adjustedCloseUsd": 96.16,
    "adsEquivalentDilutedShares": 2639250000,
    "marketCapUsd": 253781651373,
    "marketCapRmb": 1804590566583,
    "enterpriseValueRmb": 1611504566583,
    "netDebtRmb": -193086000000,
    "priceToSales": 2.08,
    "enterpriseValueToSales": 1.86,
    "priceToEarnings": 24.8,
    "freeCashFlowYield": 9.5,
    "source": "Yahoo Finance BABA adjusted close, SEC 20-F diluted ordinary share count, and 1 ADS = 8 ordinary shares ratio"
  },
  {
    "fiscalYear": 2024,
    "priceDate": "2024-03-28",
    "adjustedCloseUsd": 69.01,
    "adsEquivalentDilutedShares": 2544875000,
    "marketCapUsd": 175621635028,
    "marketCapRmb": 1248810322357,
    "enterpriseValueRmb": 1000685322357,
    "netDebtRmb": -248125000000,
    "priceToSales": 1.33,
    "enterpriseValueToSales": 1.06,
    "priceToEarnings": 15.6,
    "freeCashFlowYield": 12.5,
    "source": "Yahoo Finance BABA adjusted close, SEC 20-F diluted ordinary share count, and 1 ADS = 8 ordinary shares ratio"
  },
  {
    "fiscalYear": 2025,
    "priceDate": "2025-03-31",
    "adjustedCloseUsd": 128.85,
    "adsEquivalentDilutedShares": 2414750000,
    "marketCapUsd": 311137825623,
    "marketCapRmb": 2212438850440,
    "enterpriseValueRmb": 2102785850440,
    "netDebtRmb": -109653000000,
    "priceToSales": 2.22,
    "enterpriseValueToSales": 2.11,
    "priceToEarnings": 17,
    "freeCashFlowYield": 3.3,
    "source": "Yahoo Finance BABA adjusted close, SEC 20-F diluted ordinary share count, and 1 ADS = 8 ordinary shares ratio"
  },
  {
    "fiscalYear": 2026,
    "priceDate": "2026-03-31",
    "adjustedCloseUsd": 124.32,
    "adsEquivalentDilutedShares": 2404375000,
    "marketCapUsd": 298907735195,
    "marketCapRmb": 2125473123425,
    "enterpriseValueRmb": 2049804123425,
    "netDebtRmb": -75669000000,
    "priceToSales": 2.08,
    "enterpriseValueToSales": 2,
    "priceToEarnings": 20.5,
    "freeCashFlowYield": 2.2,
    "source": "Yahoo Finance BABA adjusted close, SEC 20-F diluted ordinary share count, and 1 ADS = 8 ordinary shares ratio"
  }
];

export const ALIBABA_LATEST_VALUATION_HISTORY = ALIBABA_VALUATION_HISTORY[ALIBABA_VALUATION_HISTORY.length - 1];
