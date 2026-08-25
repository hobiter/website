export type BerkshireFiling = {
  accessionNumber: string;
  form: string;
  filingDate: string;
  reportDate: string;
  primaryDocument: string;
  url: string;
};

export const BERKSHIRE_FILING_SOURCE_NOTE =
  "Generated from the SEC submissions index for Berkshire Hathaway Inc., CIK 0001067983. Berkshire predates modern EDGAR registration history; the registration inventory therefore focuses on available S-3 and S-4 filings.";

export const BERKSHIRE_REGISTRATION_FILINGS: BerkshireFiling[] = [
  {
    "accessionNumber": "0001193125-11-099786",
    "form": "S-4/A",
    "filingDate": "2011-04-15",
    "reportDate": "",
    "primaryDocument": "ds4a.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1067983/000119312511099786/ds4a.htm"
  },
  {
    "accessionNumber": "0001193125-11-135870",
    "form": "S-4/A",
    "filingDate": "2011-05-11",
    "reportDate": "",
    "primaryDocument": "ds4a.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1067983/000119312511135870/ds4a.htm"
  },
  {
    "accessionNumber": "0001193125-11-141554",
    "form": "S-4/A",
    "filingDate": "2011-05-16",
    "reportDate": "",
    "primaryDocument": "ds4a.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1067983/000119312511141554/ds4a.htm"
  },
  {
    "accessionNumber": "0001193125-13-026388",
    "form": "S-3ASR",
    "filingDate": "2013-01-28",
    "reportDate": "",
    "primaryDocument": "d472257ds3asr.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1067983/000119312513026388/d472257ds3asr.htm"
  },
  {
    "accessionNumber": "0001193125-16-438352",
    "form": "S-3ASR",
    "filingDate": "2016-01-26",
    "reportDate": "",
    "primaryDocument": "d196756ds3asr.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1067983/000119312516438352/d196756ds3asr.htm"
  },
  {
    "accessionNumber": "0001193125-19-019165",
    "form": "S-3ASR",
    "filingDate": "2019-01-28",
    "reportDate": "",
    "primaryDocument": "d694039ds3asr.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1067983/000119312519019165/d694039ds3asr.htm"
  },
  {
    "accessionNumber": "0001193125-22-021211",
    "form": "S-3ASR",
    "filingDate": "2022-01-28",
    "reportDate": "",
    "primaryDocument": "d277039ds3asr.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1067983/000119312522021211/d277039ds3asr.htm"
  },
  {
    "accessionNumber": "0001193125-25-018070",
    "form": "S-3ASR",
    "filingDate": "2025-01-31",
    "reportDate": "",
    "primaryDocument": "d907543ds3asr.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1067983/000119312525018070/d907543ds3asr.htm"
  }
];
export const BERKSHIRE_ANNUAL_FILINGS: BerkshireFiling[] = [
  {
    "accessionNumber": "0001193125-17-056969",
    "form": "10-K",
    "filingDate": "2017-02-27",
    "reportDate": "2016-12-31",
    "primaryDocument": "d303001d10k.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1067983/000119312517056969/d303001d10k.htm"
  },
  {
    "accessionNumber": "0001193125-18-057033",
    "form": "10-K",
    "filingDate": "2018-02-26",
    "reportDate": "2017-12-31",
    "primaryDocument": "d437858d10k.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1067983/000119312518057033/d437858d10k.htm"
  },
  {
    "accessionNumber": "0001193125-19-048926",
    "form": "10-K",
    "filingDate": "2019-02-25",
    "reportDate": "2018-12-31",
    "primaryDocument": "d678758d10k.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1067983/000119312519048926/d678758d10k.htm"
  },
  {
    "accessionNumber": "0001564590-20-005874",
    "form": "10-K",
    "filingDate": "2020-02-24",
    "reportDate": "2019-12-31",
    "primaryDocument": "brka-10k_20191231.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1067983/000156459020005874/brka-10k_20191231.htm"
  },
  {
    "accessionNumber": "0001564590-21-009611",
    "form": "10-K",
    "filingDate": "2021-03-01",
    "reportDate": "2020-12-31",
    "primaryDocument": "brka-10k_20201231.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1067983/000156459021009611/brka-10k_20201231.htm"
  },
  {
    "accessionNumber": "0001564590-22-007322",
    "form": "10-K",
    "filingDate": "2022-02-28",
    "reportDate": "2021-12-31",
    "primaryDocument": "brka-10k_20211231.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1067983/000156459022007322/brka-10k_20211231.htm"
  },
  {
    "accessionNumber": "0000950170-23-004451",
    "form": "10-K",
    "filingDate": "2023-02-27",
    "reportDate": "2022-12-31",
    "primaryDocument": "brka-20221231.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1067983/000095017023004451/brka-20221231.htm"
  },
  {
    "accessionNumber": "0000950170-24-019719",
    "form": "10-K",
    "filingDate": "2024-02-26",
    "reportDate": "2023-12-31",
    "primaryDocument": "brka-20231231.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1067983/000095017024019719/brka-20231231.htm"
  },
  {
    "accessionNumber": "0000950170-25-025210",
    "form": "10-K",
    "filingDate": "2025-02-24",
    "reportDate": "2024-12-31",
    "primaryDocument": "brka-20241231.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1067983/000095017025025210/brka-20241231.htm"
  },
  {
    "accessionNumber": "0001193125-26-083899",
    "form": "10-K",
    "filingDate": "2026-03-02",
    "reportDate": "2025-12-31",
    "primaryDocument": "brka-20251231.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1067983/000119312526083899/brka-20251231.htm"
  }
];
export const BERKSHIRE_QUARTERLY_FILINGS: BerkshireFiling[] = [
  {
    "accessionNumber": "0000950170-23-018438",
    "form": "10-Q",
    "filingDate": "2023-05-08",
    "reportDate": "2023-03-31",
    "primaryDocument": "brka-20230331.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1067983/000095017023018438/brka-20230331.htm"
  },
  {
    "accessionNumber": "0000950170-23-038705",
    "form": "10-Q",
    "filingDate": "2023-08-07",
    "reportDate": "2023-06-30",
    "primaryDocument": "brka-20230630.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1067983/000095017023038705/brka-20230630.htm"
  },
  {
    "accessionNumber": "0000950170-23-058993",
    "form": "10-Q",
    "filingDate": "2023-11-06",
    "reportDate": "2023-09-30",
    "primaryDocument": "brka-20230930.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1067983/000095017023058993/brka-20230930.htm"
  },
  {
    "accessionNumber": "0000950170-24-053185",
    "form": "10-Q",
    "filingDate": "2024-05-06",
    "reportDate": "2024-03-31",
    "primaryDocument": "brka-20240331.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1067983/000095017024053185/brka-20240331.htm"
  },
  {
    "accessionNumber": "0000950170-24-090305",
    "form": "10-Q",
    "filingDate": "2024-08-05",
    "reportDate": "2024-06-30",
    "primaryDocument": "brka-20240630.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1067983/000095017024090305/brka-20240630.htm"
  },
  {
    "accessionNumber": "0000950170-24-120241",
    "form": "10-Q",
    "filingDate": "2024-11-04",
    "reportDate": "2024-09-30",
    "primaryDocument": "brka-20240930.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1067983/000095017024120241/brka-20240930.htm"
  },
  {
    "accessionNumber": "0000950170-25-063112",
    "form": "10-Q",
    "filingDate": "2025-05-05",
    "reportDate": "2025-03-31",
    "primaryDocument": "brka-20250331.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1067983/000095017025063112/brka-20250331.htm"
  },
  {
    "accessionNumber": "0000950170-25-101578",
    "form": "10-Q",
    "filingDate": "2025-08-04",
    "reportDate": "2025-06-30",
    "primaryDocument": "brka-20250630.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1067983/000095017025101578/brka-20250630.htm"
  },
  {
    "accessionNumber": "0001193125-25-261548",
    "form": "10-Q",
    "filingDate": "2025-11-03",
    "reportDate": "2025-09-30",
    "primaryDocument": "brka-20250930.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1067983/000119312525261548/brka-20250930.htm"
  },
  {
    "accessionNumber": "0001193125-26-202243",
    "form": "10-Q",
    "filingDate": "2026-05-04",
    "reportDate": "2026-03-31",
    "primaryDocument": "brka-20260331.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1067983/000119312526202243/brka-20260331.htm"
  },
  {
    "accessionNumber": "0001193125-26-341032",
    "form": "10-Q",
    "filingDate": "2026-08-10",
    "reportDate": "2026-06-30",
    "primaryDocument": "brka-20260630.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1067983/000119312526341032/brka-20260630.htm"
  }
];

export const BERKSHIRE_CORE_FILINGS = [
  ...BERKSHIRE_REGISTRATION_FILINGS,
  ...BERKSHIRE_ANNUAL_FILINGS,
  ...BERKSHIRE_QUARTERLY_FILINGS,
];

export const BERKSHIRE_LATEST_ANNUAL_FILING = BERKSHIRE_ANNUAL_FILINGS.filter((filing) => filing.form === "10-K").at(-1)!;
export const BERKSHIRE_LATEST_QUARTERLY_FILING = BERKSHIRE_QUARTERLY_FILINGS.filter((filing) => filing.form === "10-Q").at(-1)!;
