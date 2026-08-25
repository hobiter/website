export type BerkshireAnnualFinancial = {
  fiscalYear: number;
  accessionNumber: string;
  filingDate: string;
  filingUrl: string;
  revenue: number | null;
  preTaxEarnings: number | null;
  netIncome: number | null;
  operatingCashFlow: number | null;
  capitalExpenditures: number | null;
  freeCashFlow: number | null;
  totalAssets: number | null;
  totalLiabilities: number | null;
  shareholdersEquity: number | null;
  cashAndRestrictedCash: number | null;
  equitySecurities: number | null;
  preTaxMargin: number | null;
  netMargin: number | null;
  freeCashFlowMargin: number | null;
  gaapRoe: number | null;
  source: string;
};

export const BERKSHIRE_ANNUAL_FINANCIALS_SOURCE_NOTE =
  "FY2016-FY2025 are generated from SEC XBRL company facts for Berkshire Hathaway Inc., CIK 0001067983, in USD. GAAP net income and margins include unrealized equity-security gains and losses and should not be treated as Berkshire's recurring operating performance. Free cash flow is a mechanical OCF-minus-capex measure, not Berkshire's reported operating earnings.";

export const BERKSHIRE_ANNUAL_FINANCIALS_COVERAGE = {
  currency: "USD",
  fromFiscalYear: 2016,
  throughFiscalYear: 2025,
  latestAnnualReport: "https://www.sec.gov/Archives/edgar/data/1067983/000119312526083899/brka-20251231.htm",
};

export const BERKSHIRE_ANNUAL_FINANCIALS: BerkshireAnnualFinancial[] = [
  {
    "fiscalYear": 2016,
    "accessionNumber": "0001193125-17-056969",
    "filingDate": "2017-02-27",
    "filingUrl": "https://www.sec.gov/Archives/edgar/data/1067983/000119312517056969/d303001d10k.htm",
    "revenue": 215114000000,
    "preTaxEarnings": 33667000000,
    "netIncome": 24074000000,
    "operatingCashFlow": 32647000000,
    "capitalExpenditures": 12954000000,
    "freeCashFlow": 19693000000,
    "totalAssets": 620854000000,
    "totalLiabilities": 335426000000,
    "shareholdersEquity": 282070000000,
    "cashAndRestrictedCash": 28643000000,
    "equitySecurities": null,
    "preTaxMargin": 15.7,
    "netMargin": 11.2,
    "freeCashFlowMargin": 9.2,
    "gaapRoe": 8.5,
    "source": "SEC XBRL company facts and Berkshire Hathaway Form 10-K"
  },
  {
    "fiscalYear": 2017,
    "accessionNumber": "0001193125-18-057033",
    "filingDate": "2018-02-26",
    "filingUrl": "https://www.sec.gov/Archives/edgar/data/1067983/000119312518057033/d437858d10k.htm",
    "revenue": 239933000000,
    "preTaxEarnings": 23838000000,
    "netIncome": 44940000000,
    "operatingCashFlow": 45728000000,
    "capitalExpenditures": 11708000000,
    "freeCashFlow": 34020000000,
    "totalAssets": 702095000000,
    "totalLiabilities": 350141000000,
    "shareholdersEquity": 348296000000,
    "cashAndRestrictedCash": 32212000000,
    "equitySecurities": 170540000000,
    "preTaxMargin": 9.9,
    "netMargin": 18.7,
    "freeCashFlowMargin": 14.2,
    "gaapRoe": 12.9,
    "source": "SEC XBRL company facts and Berkshire Hathaway Form 10-K"
  },
  {
    "fiscalYear": 2018,
    "accessionNumber": "0001193125-19-048926",
    "filingDate": "2019-02-25",
    "filingUrl": "https://www.sec.gov/Archives/edgar/data/1067983/000119312519048926/d678758d10k.htm",
    "revenue": 247837000000,
    "preTaxEarnings": 4001000000,
    "netIncome": 4021000000,
    "operatingCashFlow": 37400000000,
    "capitalExpenditures": 14537000000,
    "freeCashFlow": 22863000000,
    "totalAssets": 707794000000,
    "totalLiabilities": 355294000000,
    "shareholdersEquity": 348703000000,
    "cashAndRestrictedCash": 30811000000,
    "equitySecurities": 172757000000,
    "preTaxMargin": 1.6,
    "netMargin": 1.6,
    "freeCashFlowMargin": 9.2,
    "gaapRoe": 1.2,
    "source": "SEC XBRL company facts and Berkshire Hathaway Form 10-K"
  },
  {
    "fiscalYear": 2019,
    "accessionNumber": "0001564590-20-005874",
    "filingDate": "2020-02-24",
    "filingUrl": "https://www.sec.gov/Archives/edgar/data/1067983/000156459020005874/brka-10k_20191231.htm",
    "revenue": 254616000000,
    "preTaxEarnings": 102696000000,
    "netIncome": 81417000000,
    "operatingCashFlow": 38687000000,
    "capitalExpenditures": 15979000000,
    "freeCashFlow": 22708000000,
    "totalAssets": 817729000000,
    "totalLiabilities": 389166000000,
    "shareholdersEquity": 424791000000,
    "cashAndRestrictedCash": 64632000000,
    "equitySecurities": 248027000000,
    "preTaxMargin": 40.3,
    "netMargin": 32,
    "freeCashFlowMargin": 8.9,
    "gaapRoe": 19.2,
    "source": "SEC XBRL company facts and Berkshire Hathaway Form 10-K"
  },
  {
    "fiscalYear": 2020,
    "accessionNumber": "0001564590-21-009611",
    "filingDate": "2021-03-01",
    "filingUrl": "https://www.sec.gov/Archives/edgar/data/1067983/000156459021009611/brka-10k_20201231.htm",
    "revenue": 245579000000,
    "preTaxEarnings": 55693000000,
    "netIncome": 42521000000,
    "operatingCashFlow": 39773000000,
    "capitalExpenditures": 13012000000,
    "freeCashFlow": 26761000000,
    "totalAssets": 873729000000,
    "totalLiabilities": 422393000000,
    "shareholdersEquity": 443164000000,
    "cashAndRestrictedCash": 48396000000,
    "equitySecurities": 281170000000,
    "preTaxMargin": 22.7,
    "netMargin": 17.3,
    "freeCashFlowMargin": 10.9,
    "gaapRoe": 9.6,
    "source": "SEC XBRL company facts and Berkshire Hathaway Form 10-K"
  },
  {
    "fiscalYear": 2021,
    "accessionNumber": "0001564590-22-007322",
    "filingDate": "2022-02-28",
    "filingUrl": "https://www.sec.gov/Archives/edgar/data/1067983/000156459022007322/brka-10k_20211231.htm",
    "revenue": 276185000000,
    "preTaxEarnings": 111861000000,
    "netIncome": 89937000000,
    "operatingCashFlow": 39427000000,
    "capitalExpenditures": 13276000000,
    "freeCashFlow": 26151000000,
    "totalAssets": 959388000000,
    "totalLiabilities": null,
    "shareholdersEquity": 506199000000,
    "cashAndRestrictedCash": 88706000000,
    "equitySecurities": 350719000000,
    "preTaxMargin": 40.5,
    "netMargin": 32.6,
    "freeCashFlowMargin": 9.5,
    "gaapRoe": 17.8,
    "source": "SEC XBRL company facts and Berkshire Hathaway Form 10-K"
  },
  {
    "fiscalYear": 2022,
    "accessionNumber": "0000950170-23-004451",
    "filingDate": "2023-02-27",
    "filingUrl": "https://www.sec.gov/Archives/edgar/data/1067983/000095017023004451/brka-20221231.htm",
    "revenue": 302020000000,
    "preTaxEarnings": -30500000000,
    "netIncome": -22759000000,
    "operatingCashFlow": 37350000000,
    "capitalExpenditures": 15464000000,
    "freeCashFlow": 21886000000,
    "totalAssets": 948465000000,
    "totalLiabilities": 466784000000,
    "shareholdersEquity": 473424000000,
    "cashAndRestrictedCash": 36399000000,
    "equitySecurities": 308793000000,
    "preTaxMargin": -10.1,
    "netMargin": -7.5,
    "freeCashFlowMargin": 7.2,
    "gaapRoe": -4.8,
    "source": "SEC XBRL company facts and Berkshire Hathaway Form 10-K"
  },
  {
    "fiscalYear": 2023,
    "accessionNumber": "0000950170-24-019719",
    "filingDate": "2024-02-26",
    "filingUrl": "https://www.sec.gov/Archives/edgar/data/1067983/000095017024019719/brka-20231231.htm",
    "revenue": 364482000000,
    "preTaxEarnings": 120166000000,
    "netIncome": 96223000000,
    "operatingCashFlow": 49196000000,
    "capitalExpenditures": 19409000000,
    "freeCashFlow": 29787000000,
    "totalAssets": 1069978000000,
    "totalLiabilities": 499208000000,
    "shareholdersEquity": 561273000000,
    "cashAndRestrictedCash": 38643000000,
    "equitySecurities": 353842000000,
    "preTaxMargin": 33,
    "netMargin": 26.4,
    "freeCashFlowMargin": 8.2,
    "gaapRoe": 17.1,
    "source": "SEC XBRL company facts and Berkshire Hathaway Form 10-K"
  },
  {
    "fiscalYear": 2024,
    "accessionNumber": "0000950170-25-025210",
    "filingDate": "2025-02-24",
    "filingUrl": "https://www.sec.gov/Archives/edgar/data/1067983/000095017025025210/brka-20241231.htm",
    "revenue": 371433000000,
    "preTaxEarnings": 110376000000,
    "netIncome": 88995000000,
    "operatingCashFlow": 30592000000,
    "capitalExpenditures": 18976000000,
    "freeCashFlow": 11616000000,
    "totalAssets": 1153881000000,
    "totalLiabilities": 502226000000,
    "shareholdersEquity": 649368000000,
    "cashAndRestrictedCash": 48376000000,
    "equitySecurities": 271588000000,
    "preTaxMargin": 29.7,
    "netMargin": 24,
    "freeCashFlowMargin": 3.1,
    "gaapRoe": 13.7,
    "source": "SEC XBRL company facts and Berkshire Hathaway Form 10-K"
  },
  {
    "fiscalYear": 2025,
    "accessionNumber": "0001193125-26-083899",
    "filingDate": "2026-03-02",
    "filingUrl": "https://www.sec.gov/Archives/edgar/data/1067983/000119312526083899/brka-20251231.htm",
    "revenue": 371444000000,
    "preTaxEarnings": 82459000000,
    "netIncome": 66968000000,
    "operatingCashFlow": 45969000000,
    "capitalExpenditures": 20927000000,
    "freeCashFlow": 25042000000,
    "totalAssets": 1222176000000,
    "totalLiabilities": 502473000000,
    "shareholdersEquity": 717419000000,
    "cashAndRestrictedCash": 52569000000,
    "equitySecurities": 297778000000,
    "preTaxMargin": 22.2,
    "netMargin": 18,
    "freeCashFlowMargin": 6.7,
    "gaapRoe": 9.3,
    "source": "SEC XBRL company facts and Berkshire Hathaway Form 10-K"
  }
];
export const BERKSHIRE_LATEST_ANNUAL_FINANCIAL = BERKSHIRE_ANNUAL_FINANCIALS[BERKSHIRE_ANNUAL_FINANCIALS.length - 1];
