export const SKHY_AS_OF = "2026-10-04";
export const SKHY_MARKET = {
  date: "2026-10-02",
  priceUsd: 195.13,
  currencyKrwPerUsd: 1342.64,
  source: "https://finance.yahoo.com/quote/SKHY/history/",
  fxSource: "https://www.bloomberglinea.com/quote/USDKRW%3ACUR/",
};

export const SKHY_CAPITAL = {
  adsRatio: 0.1,
  adsPerCommon: 10,
  issuedCommonSharesBeforeOffering: 712_702_365,
  treasurySharesBeforeOffering: 1_626_865,
  commonSharesBeforeOffering: 711_075_500,
  newCommonShares: 17_790_000,
  postOfferingCommonShares: 728_865_500,
  adsOffered: 177_900_000,
  ipoPriceUsd: 149,
  netProceedsUsdBillions: 26.2,
  proceedsAsOf: "2026-07-09",
  prospectus: "https://www.sec.gov/Archives/edgar/data/2120882/000119312526299963/d32785d424b4.htm",
};

export const SKHY_BALANCE = {
  date: "2026-06-30",
  cashKrwTrillion: 26.835986,
  shortTermFinancialInstrumentsKrwTrillion: 22.397559,
  borrowingsKrwTrillion: 18.586634,
  h1OperatingCashFlowKrwTrillion: 91.742501,
  h1PpeAcquisitionsKrwTrillion: 18.328836,
  h1IntangibleAcquisitionsKrwTrillion: 0.66518,
  status: "Reviewed interim statements; K-IFRS; KRW millions converted to KRW trillions.",
  source: "https://www.sec.gov/Archives/edgar/data/2120882/000119312526354777/d147827d6k.htm",
};

export const SKHY_OPERATING_FACTS = [
  {
    labelEn: "FY2025 DRAM share of revenue",
    labelZh: "2025 财年 DRAM 收入占比",
    value: "77.1%",
    detailEn: "Issuer prospectus disclosure; not a unit-volume share.",
    detailZh: "公司招股书披露；并非出货量占比。",
    source: SKHY_CAPITAL.prospectus,
  },
  {
    labelEn: "FY2025 NAND share of revenue",
    labelZh: "2025 财年 NAND 收入占比",
    value: "21.3%",
    detailEn: "Issuer prospectus disclosure; category percentages may not sum exactly due to rounding and other sales.",
    detailZh: "公司招股书披露；受四舍五入及其他收入影响，各类别比例未必正好合计 100%。",
    source: SKHY_CAPITAL.prospectus,
  },
  {
    labelEn: "Q1 2026 HBM revenue share",
    labelZh: "2026 年第一季度 HBM 收入市场份额",
    value: "56.4%",
    detailEn: "Issuer-cited IDC estimate in the prospectus, not an audited company metric.",
    detailZh: "招股书引用 IDC 估算，并非经审计的公司财务指标。",
    source: SKHY_CAPITAL.prospectus,
  },
  {
    labelEn: "FY2025 operating margin",
    labelZh: "2025 财年营业利润率",
    value: "48.6%",
    detailEn: "KRW 47.206T operating profit on KRW 97.147T revenue; peak-cycle result, not a normalized run rate.",
    detailZh: "收入 97.147 万亿韩元、营业利润 47.206 万亿韩元；处于周期高位，不应视为常态利润率。",
    source: "https://news.skhynix.com/en/sk-hynix-announces-fy25-financial-results/",
  },
  {
    labelEn: "Q2 2026 operating margin",
    labelZh: "2026 年第二季度营业利润率",
    value: "76.3%",
    detailEn: "KRW 60.543T operating profit on KRW 79.319T revenue; reviewed K-IFRS filing confirms the preliminary release.",
    detailZh: "收入 79.319 万亿韩元、营业利润 60.543 万亿韩元；经审阅的 K-IFRS 申报与初步公告相符。",
    source: SKHY_BALANCE.source,
  },
];

export const SKHY_SOURCE_URLS = {
  q2Results: "https://news.skhynix.com/en/q2-2026-business-results/",
  fy25Results: "https://news.skhynix.com/en/sk-hynix-announces-fy25-financial-results/",
  fy24Results: "https://news.skhynix.com/en/sk-hynix-announces-4q24-financial-results/",
  fy23Results: "https://news.skhynix.com/en/sk-hynix-reports-fourth-quarter-2023-financial-results/",
  fy22Results: "https://news.skhynix.com/en/sk-hynix-reports-2022-and-fourth-quarter-financial-results/",
  fy18Results: "https://news.skhynix.com/en/sk-hynix-inc-reports-fiscal-year-2018-and-fourth-quarter-results/",
  secSubmissions: "https://data.sec.gov/submissions/CIK0002120882.json",
  prospectus: SKHY_CAPITAL.prospectus,
  interim: SKHY_BALANCE.source,
  product: "https://news.skhynix.com/en/q2-2026-business-results/",
  fx: SKHY_MARKET.fxSource,
  price: SKHY_MARKET.source,
  archive: "https://news.skhynix.com/wp-json/wp/v2/posts?search=financial%20results&per_page=100&page=1&_fields=id,date,link,title",
};
