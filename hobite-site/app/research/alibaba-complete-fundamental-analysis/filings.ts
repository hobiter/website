export type AlibabaFiling = {
  accessionNumber: string;
  form: string;
  filingDate: string;
  reportDate: string;
  primaryDocument: string;
  primaryDocDescription: string;
  url: string;
};

export const ALIBABA_FILING_SOURCE_NOTE =
  "Generated from the SEC company submissions index for Alibaba Group Holding Limited, CIK 0001577552. Alibaba is a foreign private issuer, so annual reports are Form 20-F and interim/event filings are primarily Form 6-K.";

export const ALIBABA_REGISTRATION_FILINGS: AlibabaFiling[] = [
  {
    "accessionNumber": "0001193125-14-184994",
    "form": "F-1",
    "filingDate": "2014-05-06",
    "reportDate": "",
    "primaryDocument": "d709111df1.htm",
    "primaryDocDescription": "FORM F-1",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000119312514184994/d709111df1.htm"
  },
  {
    "accessionNumber": "0001193125-14-236860",
    "form": "F-1/A",
    "filingDate": "2014-06-16",
    "reportDate": "",
    "primaryDocument": "d709111df1a.htm",
    "primaryDocDescription": "AMENDMENT NO.1 TO FORM F-1",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000119312514236860/d709111df1a.htm"
  },
  {
    "accessionNumber": "0001193125-14-250684",
    "form": "F-1/A",
    "filingDate": "2014-06-26",
    "reportDate": "",
    "primaryDocument": "d709111df1a.htm",
    "primaryDocDescription": "AMENDMENT NO.2 TO FORM F-1",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000119312514250684/d709111df1a.htm"
  },
  {
    "accessionNumber": "0001193125-14-266462",
    "form": "F-1/A",
    "filingDate": "2014-07-11",
    "reportDate": "",
    "primaryDocument": "d709111df1a.htm",
    "primaryDocDescription": "AMENDMENT NO.3 TO FORM F-1",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000119312514266462/d709111df1a.htm"
  },
  {
    "accessionNumber": "0001193125-14-306647",
    "form": "F-1/A",
    "filingDate": "2014-08-12",
    "reportDate": "",
    "primaryDocument": "d709111df1a.htm",
    "primaryDocDescription": "AMENDMENT NO.4 TO FORM F-1",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000119312514306647/d709111df1a.htm"
  },
  {
    "accessionNumber": "0001193125-14-322604",
    "form": "F-1/A",
    "filingDate": "2014-08-27",
    "reportDate": "",
    "primaryDocument": "d709111df1a.htm",
    "primaryDocDescription": "AMENDMENT NO.5 TO FORM F-1",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000119312514322604/d709111df1a.htm"
  },
  {
    "accessionNumber": "0001193125-14-333674",
    "form": "F-1/A",
    "filingDate": "2014-09-05",
    "reportDate": "",
    "primaryDocument": "d709111df1a.htm",
    "primaryDocDescription": "AMENDMENT NO.6 TO FORM F-1",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000119312514333674/d709111df1a.htm"
  },
  {
    "accessionNumber": "0001193125-14-341794",
    "form": "F-1/A",
    "filingDate": "2014-09-15",
    "reportDate": "",
    "primaryDocument": "d709111df1a.htm",
    "primaryDocDescription": "AMENDMENT NO.7 TO FORM F-1",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000119312514341794/d709111df1a.htm"
  }
];

export const ALIBABA_ANNUAL_FILINGS: AlibabaFiling[] = [
  {
    "accessionNumber": "0001047469-15-005768",
    "form": "20-F",
    "filingDate": "2015-06-25",
    "reportDate": "2015-03-31",
    "primaryDocument": "a2225010z20-f.htm",
    "primaryDocDescription": "20-F",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000104746915005768/a2225010z20-f.htm"
  },
  {
    "accessionNumber": "0001047469-16-013400",
    "form": "20-F",
    "filingDate": "2016-05-24",
    "reportDate": "2016-03-31",
    "primaryDocument": "a2228766z20-f.htm",
    "primaryDocDescription": "FORM 20-F",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000104746916013400/a2228766z20-f.htm"
  },
  {
    "accessionNumber": "0001047469-17-004019",
    "form": "20-F",
    "filingDate": "2017-06-15",
    "reportDate": "2017-03-31",
    "primaryDocument": "a2231121z20-f.htm",
    "primaryDocDescription": "20-F",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000104746917004019/a2231121z20-f.htm"
  },
  {
    "accessionNumber": "0001047469-18-005257",
    "form": "20-F",
    "filingDate": "2018-07-27",
    "reportDate": "2018-03-31",
    "primaryDocument": "a2235254z20-f.htm",
    "primaryDocDescription": "20-F",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000104746918005257/a2235254z20-f.htm"
  },
  {
    "accessionNumber": "0001047469-19-003492",
    "form": "20-F",
    "filingDate": "2019-06-05",
    "reportDate": "2019-03-31",
    "primaryDocument": "a2238953z20-f.htm",
    "primaryDocDescription": "20-F",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000104746919003492/a2238953z20-f.htm"
  },
  {
    "accessionNumber": "0001104659-20-082409",
    "form": "20-F",
    "filingDate": "2020-07-09",
    "reportDate": "2020-03-31",
    "primaryDocument": "baba-20200331x20f.htm",
    "primaryDocDescription": "FORM 20-F",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465920082409/baba-20200331x20f.htm"
  },
  {
    "accessionNumber": "0001104659-21-096092",
    "form": "20-F",
    "filingDate": "2021-07-27",
    "reportDate": "2021-03-31",
    "primaryDocument": "baba-20210331x20f.htm",
    "primaryDocDescription": "FORM 20-F",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465921096092/baba-20210331x20f.htm"
  },
  {
    "accessionNumber": "0001104659-22-082622",
    "form": "20-F",
    "filingDate": "2022-07-26",
    "reportDate": "2022-03-31",
    "primaryDocument": "baba-20220331x20f.htm",
    "primaryDocDescription": "FORM 20-F",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465922082622/baba-20220331x20f.htm"
  },
  {
    "accessionNumber": "0000950170-23-033752",
    "form": "20-F",
    "filingDate": "2023-07-21",
    "reportDate": "2023-03-31",
    "primaryDocument": "baba-20230331.htm",
    "primaryDocDescription": "20-F",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000095017023033752/baba-20230331.htm"
  },
  {
    "accessionNumber": "0001193125-24-044480",
    "form": "20-F/A",
    "filingDate": "2024-02-23",
    "reportDate": "2023-03-31",
    "primaryDocument": "d791119d20fa.htm",
    "primaryDocDescription": "FORM 20-F AMENDMENT NO. 1",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000119312524044480/d791119d20fa.htm"
  },
  {
    "accessionNumber": "0000950170-24-063767",
    "form": "20-F",
    "filingDate": "2024-05-23",
    "reportDate": "2024-03-31",
    "primaryDocument": "baba-20240331.htm",
    "primaryDocDescription": "20-F",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000095017024063767/baba-20240331.htm"
  },
  {
    "accessionNumber": "0000950170-25-090161",
    "form": "20-F",
    "filingDate": "2025-06-26",
    "reportDate": "2025-03-31",
    "primaryDocument": "baba-20250331.htm",
    "primaryDocDescription": "20-F",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000095017025090161/baba-20250331.htm"
  },
  {
    "accessionNumber": "0001193125-26-231755",
    "form": "20-F",
    "filingDate": "2026-05-20",
    "reportDate": "2026-03-31",
    "primaryDocument": "baba-20260331.htm",
    "primaryDocDescription": "20-F",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000119312526231755/baba-20260331.htm"
  }
];

export const ALIBABA_SIX_K_FILINGS: AlibabaFiling[] = [
  {
    "accessionNumber": "0001193125-14-395484",
    "form": "6-K",
    "filingDate": "2014-11-04",
    "reportDate": "2014-11-04",
    "primaryDocument": "d815588d6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000119312514395484/d815588d6k.htm"
  },
  {
    "accessionNumber": "0001047469-14-009142",
    "form": "6-K",
    "filingDate": "2014-11-13",
    "reportDate": "2014-11-30",
    "primaryDocument": "a2222186z6-k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000104746914009142/a2222186z6-k.htm"
  },
  {
    "accessionNumber": "0001104659-14-082832",
    "form": "6-K",
    "filingDate": "2014-11-24",
    "reportDate": "2014-11-30",
    "primaryDocument": "a14-23964_46k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465914082832/a14-23964_46k.htm"
  },
  {
    "accessionNumber": "0001104659-15-005216",
    "form": "6-K",
    "filingDate": "2015-01-29",
    "reportDate": "2015-01-31",
    "primaryDocument": "a15-3356_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465915005216/a15-3356_16k.htm"
  },
  {
    "accessionNumber": "0001104659-15-008007",
    "form": "6-K",
    "filingDate": "2015-02-10",
    "reportDate": "2015-02-28",
    "primaryDocument": "a15-4150_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465915008007/a15-4150_16k.htm"
  },
  {
    "accessionNumber": "0001104659-15-027871",
    "form": "6-K",
    "filingDate": "2015-04-16",
    "reportDate": "2015-04-30",
    "primaryDocument": "a15-9221_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465915027871/a15-9221_16k.htm"
  },
  {
    "accessionNumber": "0001104659-15-035237",
    "form": "6-K",
    "filingDate": "2015-05-07",
    "reportDate": "2015-05-31",
    "primaryDocument": "a15-11059_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465915035237/a15-11059_16k.htm"
  },
  {
    "accessionNumber": "0001104659-15-047455",
    "form": "6-K",
    "filingDate": "2015-06-25",
    "reportDate": "2015-06-30",
    "primaryDocument": "a15-14567_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465915047455/a15-14567_16k.htm"
  },
  {
    "accessionNumber": "0001104659-15-057900",
    "form": "6-K",
    "filingDate": "2015-08-10",
    "reportDate": "2015-08-10",
    "primaryDocument": "a15-17334_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465915057900/a15-17334_16k.htm"
  },
  {
    "accessionNumber": "0001104659-15-058914",
    "form": "6-K",
    "filingDate": "2015-08-12",
    "reportDate": "2015-08-12",
    "primaryDocument": "a15-17523_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465915058914/a15-17523_16k.htm"
  },
  {
    "accessionNumber": "0001104659-15-060174",
    "form": "6-K",
    "filingDate": "2015-08-17",
    "reportDate": "2015-08-17",
    "primaryDocument": "a15-18106_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465915060174/a15-18106_16k.htm"
  },
  {
    "accessionNumber": "0001104659-15-060819",
    "form": "6-K",
    "filingDate": "2015-08-19",
    "reportDate": "2015-08-19",
    "primaryDocument": "a15-18259_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465915060819/a15-18259_16k.htm"
  },
  {
    "accessionNumber": "0001104659-15-070151",
    "form": "6-K",
    "filingDate": "2015-10-09",
    "reportDate": "2015-10-31",
    "primaryDocument": "a15-20955_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465915070151/a15-20955_16k.htm"
  },
  {
    "accessionNumber": "0001104659-15-071005",
    "form": "6-K",
    "filingDate": "2015-10-16",
    "reportDate": "2015-10-16",
    "primaryDocument": "a15-21262_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465915071005/a15-21262_16k.htm"
  },
  {
    "accessionNumber": "0001104659-15-072968",
    "form": "6-K",
    "filingDate": "2015-10-27",
    "reportDate": "2015-10-31",
    "primaryDocument": "a15-21796_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465915072968/a15-21796_16k.htm"
  },
  {
    "accessionNumber": "0001104659-15-076853",
    "form": "6-K",
    "filingDate": "2015-11-09",
    "reportDate": "2015-11-09",
    "primaryDocument": "a15-22558_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465915076853/a15-22558_16k.htm"
  },
  {
    "accessionNumber": "0001104659-15-083050",
    "form": "6-K",
    "filingDate": "2015-12-04",
    "reportDate": "2015-12-31",
    "primaryDocument": "a15-18107_196k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465915083050/a15-18107_196k.htm"
  },
  {
    "accessionNumber": "0001104659-16-092294",
    "form": "6-K",
    "filingDate": "2016-01-29",
    "reportDate": "2016-01-28",
    "primaryDocument": "a16-3084_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465916092294/a16-3084_16k.htm"
  },
  {
    "accessionNumber": "0001104659-16-103882",
    "form": "6-K",
    "filingDate": "2016-03-09",
    "reportDate": "2016-03-31",
    "primaryDocument": "a16-6077_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465916103882/a16-6077_16k.htm"
  },
  {
    "accessionNumber": "0001104659-16-106460",
    "form": "6-K",
    "filingDate": "2016-03-21",
    "reportDate": "2016-03-21",
    "primaryDocument": "a16-6896_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465916106460/a16-6896_16k.htm"
  },
  {
    "accessionNumber": "0001104659-16-109905",
    "form": "6-K",
    "filingDate": "2016-04-05",
    "reportDate": "2016-04-05",
    "primaryDocument": "a16-7970_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465916109905/a16-7970_16k.htm"
  },
  {
    "accessionNumber": "0001104659-16-110885",
    "form": "6-K",
    "filingDate": "2016-04-12",
    "reportDate": "2016-04-30",
    "primaryDocument": "a16-8336_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465916110885/a16-8336_16k.htm"
  },
  {
    "accessionNumber": "0001104659-16-113636",
    "form": "6-K",
    "filingDate": "2016-04-25",
    "reportDate": "2016-04-30",
    "primaryDocument": "a16-9202_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465916113636/a16-9202_16k.htm"
  },
  {
    "accessionNumber": "0001104659-16-118194",
    "form": "6-K",
    "filingDate": "2016-05-05",
    "reportDate": "2016-05-31",
    "primaryDocument": "a16-10677_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465916118194/a16-10677_16k.htm"
  },
  {
    "accessionNumber": "0001104659-16-124959",
    "form": "6-K",
    "filingDate": "2016-06-02",
    "reportDate": "2016-06-30",
    "primaryDocument": "a16-12605_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465916124959/a16-12605_16k.htm"
  },
  {
    "accessionNumber": "0001104659-16-138896",
    "form": "6-K",
    "filingDate": "2016-08-11",
    "reportDate": "2016-08-31",
    "primaryDocument": "a16-16621_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465916138896/a16-16621_16k.htm"
  },
  {
    "accessionNumber": "0001104659-16-140731",
    "form": "6-K",
    "filingDate": "2016-08-19",
    "reportDate": "2016-08-19",
    "primaryDocument": "a16-17041_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465916140731/a16-17041_16k.htm"
  },
  {
    "accessionNumber": "0001104659-16-140809",
    "form": "6-K",
    "filingDate": "2016-08-22",
    "reportDate": "2016-08-22",
    "primaryDocument": "a16-17305_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465916140809/a16-17305_16k.htm"
  },
  {
    "accessionNumber": "0001104659-16-150089",
    "form": "6-K",
    "filingDate": "2016-10-13",
    "reportDate": "2016-10-31",
    "primaryDocument": "a16-19837_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465916150089/a16-19837_16k.htm"
  },
  {
    "accessionNumber": "0001104659-16-154041",
    "form": "6-K",
    "filingDate": "2016-11-02",
    "reportDate": "2016-11-02",
    "primaryDocument": "a16-20954_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465916154041/a16-20954_16k.htm"
  },
  {
    "accessionNumber": "0001104659-16-162618",
    "form": "6-K",
    "filingDate": "2016-12-16",
    "reportDate": "2016-12-31",
    "primaryDocument": "a16-23298_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465916162618/a16-23298_16k.htm"
  },
  {
    "accessionNumber": "0001104659-17-003802",
    "form": "6-K",
    "filingDate": "2017-01-24",
    "reportDate": "2017-01-24",
    "primaryDocument": "a17-3083_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465917003802/a17-3083_16k.htm"
  },
  {
    "accessionNumber": "0001104659-17-033787",
    "form": "6-K",
    "filingDate": "2017-05-18",
    "reportDate": "2017-05-18",
    "primaryDocument": "a17-13821_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465917033787/a17-13821_16k.htm"
  },
  {
    "accessionNumber": "0001104659-17-052468",
    "form": "6-K",
    "filingDate": "2017-08-17",
    "reportDate": "2017-08-17",
    "primaryDocument": "a17-20562_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465917052468/a17-20562_16k.htm"
  },
  {
    "accessionNumber": "0001104659-17-056981",
    "form": "6-K",
    "filingDate": "2017-09-13",
    "reportDate": "2017-09-13",
    "primaryDocument": "a17-21992_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465917056981/a17-21992_16k.htm"
  },
  {
    "accessionNumber": "0001104659-17-058730",
    "form": "6-K",
    "filingDate": "2017-09-26",
    "reportDate": "2017-09-26",
    "primaryDocument": "a17-22525_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465917058730/a17-22525_16k.htm"
  },
  {
    "accessionNumber": "0001104659-17-062758",
    "form": "6-K",
    "filingDate": "2017-10-18",
    "reportDate": "2017-10-18",
    "primaryDocument": "a17-24149_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465917062758/a17-24149_16k.htm"
  },
  {
    "accessionNumber": "0001104659-17-065677",
    "form": "6-K",
    "filingDate": "2017-11-02",
    "reportDate": "2017-11-02",
    "primaryDocument": "a17-25090_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465917065677/a17-25090_16k.htm"
  },
  {
    "accessionNumber": "0001104659-17-070220",
    "form": "6-K",
    "filingDate": "2017-11-22",
    "reportDate": "2017-11-22",
    "primaryDocument": "a17-27503_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465917070220/a17-27503_16k.htm"
  },
  {
    "accessionNumber": "0001047469-17-007286",
    "form": "6-K",
    "filingDate": "2017-11-24",
    "reportDate": "2017-11-24",
    "primaryDocument": "a2233801z6-k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000104746917007286/a2233801z6-k.htm"
  },
  {
    "accessionNumber": "0001104659-17-070363",
    "form": "6-K",
    "filingDate": "2017-11-27",
    "reportDate": "2017-11-27",
    "primaryDocument": "a17-24278_86k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465917070363/a17-24278_86k.htm"
  },
  {
    "accessionNumber": "0001047469-17-007296",
    "form": "6-K",
    "filingDate": "2017-11-27",
    "reportDate": "2017-11-27",
    "primaryDocument": "a2233845z6-k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000104746917007296/a2233845z6-k.htm"
  },
  {
    "accessionNumber": "0001104659-17-071008",
    "form": "6-K",
    "filingDate": "2017-11-30",
    "reportDate": "2017-11-29",
    "primaryDocument": "a17-24278_96k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465917071008/a17-24278_96k.htm"
  },
  {
    "accessionNumber": "0001104659-17-071007",
    "form": "6-K",
    "filingDate": "2017-11-30",
    "reportDate": "2017-11-29",
    "primaryDocument": "a17-24278_106k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465917071007/a17-24278_106k.htm"
  },
  {
    "accessionNumber": "0001104659-17-072000",
    "form": "6-K",
    "filingDate": "2017-12-06",
    "reportDate": "2017-12-06",
    "primaryDocument": "a17-24278_126k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465917072000/a17-24278_126k.htm"
  },
  {
    "accessionNumber": "0001104659-18-005843",
    "form": "6-K",
    "filingDate": "2018-02-01",
    "reportDate": "2018-02-01",
    "primaryDocument": "a18-5168_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465918005843/a18-5168_16k.htm"
  },
  {
    "accessionNumber": "0001104659-18-005686",
    "form": "6-K",
    "filingDate": "2018-02-01",
    "reportDate": "2018-02-01",
    "primaryDocument": "a18-5168_26k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465918005686/a18-5168_26k.htm"
  },
  {
    "accessionNumber": "0001104659-18-006211",
    "form": "6-K",
    "filingDate": "2018-02-02",
    "reportDate": "2018-02-02",
    "primaryDocument": "a18-5188_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465918006211/a18-5188_16k.htm"
  },
  {
    "accessionNumber": "0001104659-18-011926",
    "form": "6-K",
    "filingDate": "2018-02-26",
    "reportDate": "2018-02-26",
    "primaryDocument": "a18-7073_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465918011926/a18-7073_16k.htm"
  },
  {
    "accessionNumber": "0001104659-18-021637",
    "form": "6-K",
    "filingDate": "2018-04-02",
    "reportDate": "2018-04-02",
    "primaryDocument": "a18-9422_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465918021637/a18-9422_16k.htm"
  },
  {
    "accessionNumber": "0001104659-18-030651",
    "form": "6-K",
    "filingDate": "2018-05-04",
    "reportDate": "2018-05-04",
    "primaryDocument": "a18-12785_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465918030651/a18-12785_16k.htm"
  },
  {
    "accessionNumber": "0001104659-18-036123",
    "form": "6-K",
    "filingDate": "2018-05-29",
    "reportDate": "2018-05-31",
    "primaryDocument": "a18-14467_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465918036123/a18-14467_16k.htm"
  },
  {
    "accessionNumber": "0001104659-18-036531",
    "form": "6-K",
    "filingDate": "2018-05-30",
    "reportDate": "2018-05-30",
    "primaryDocument": "a18-14499_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465918036531/a18-14499_16k.htm"
  },
  {
    "accessionNumber": "0001104659-18-045643",
    "form": "6-K",
    "filingDate": "2018-07-18",
    "reportDate": "2018-07-18",
    "primaryDocument": "a18-17385_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465918045643/a18-17385_16k.htm"
  },
  {
    "accessionNumber": "0001104659-18-053369",
    "form": "6-K",
    "filingDate": "2018-08-23",
    "reportDate": "2018-08-23",
    "primaryDocument": "a18-21099_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465918053369/a18-21099_16k.htm"
  },
  {
    "accessionNumber": "0001104659-18-055708",
    "form": "6-K",
    "filingDate": "2018-09-07",
    "reportDate": "2018-09-07",
    "primaryDocument": "a18-27118_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465918055708/a18-27118_16k.htm"
  },
  {
    "accessionNumber": "0001104659-18-055896",
    "form": "6-K",
    "filingDate": "2018-09-10",
    "reportDate": "2018-09-10",
    "primaryDocument": "a18-28006_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465918055896/a18-28006_16k.htm"
  },
  {
    "accessionNumber": "0001104659-18-065094",
    "form": "6-K",
    "filingDate": "2018-10-31",
    "reportDate": "2018-10-31",
    "primaryDocument": "a18-39297_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465918065094/a18-39297_16k.htm"
  },
  {
    "accessionNumber": "0001104659-18-065748",
    "form": "6-K",
    "filingDate": "2018-11-02",
    "reportDate": "2018-11-02",
    "primaryDocument": "a18-39483_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465918065748/a18-39483_16k.htm"
  },
  {
    "accessionNumber": "0001104659-18-071210",
    "form": "6-K",
    "filingDate": "2018-12-04",
    "reportDate": "2018-12-04",
    "primaryDocument": "a18-41097_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465918071210/a18-41097_16k.htm"
  },
  {
    "accessionNumber": "0001104659-18-075203",
    "form": "6-K",
    "filingDate": "2018-12-31",
    "reportDate": "2018-12-31",
    "primaryDocument": "a18-42169_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465918075203/a18-42169_16k.htm"
  },
  {
    "accessionNumber": "0001104659-19-004478",
    "form": "6-K",
    "filingDate": "2019-01-30",
    "reportDate": "2019-01-30",
    "primaryDocument": "a19-3718_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465919004478/a19-3718_16k.htm"
  },
  {
    "accessionNumber": "0001104659-19-014857",
    "form": "6-K",
    "filingDate": "2019-03-14",
    "reportDate": "2019-03-14",
    "primaryDocument": "a19-6587_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465919014857/a19-6587_16k.htm"
  },
  {
    "accessionNumber": "0001104659-19-024217",
    "form": "6-K",
    "filingDate": "2019-04-29",
    "reportDate": "2019-04-29",
    "primaryDocument": "a19-9036_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465919024217/a19-9036_16k.htm"
  },
  {
    "accessionNumber": "0001104659-19-029738",
    "form": "6-K",
    "filingDate": "2019-05-15",
    "reportDate": "2019-05-15",
    "primaryDocument": "a19-10031_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465919029738/a19-10031_16k.htm"
  },
  {
    "accessionNumber": "0001104659-19-035956",
    "form": "6-K",
    "filingDate": "2019-06-17",
    "reportDate": "2019-06-17",
    "primaryDocument": "a19-11492_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465919035956/a19-11492_16k.htm"
  },
  {
    "accessionNumber": "0001104659-19-040358",
    "form": "6-K",
    "filingDate": "2019-07-15",
    "reportDate": "2019-07-15",
    "primaryDocument": "a19-12833_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465919040358/a19-12833_16k.htm"
  },
  {
    "accessionNumber": "0001104659-19-042446",
    "form": "6-K",
    "filingDate": "2019-07-30",
    "reportDate": "2019-07-30",
    "primaryDocument": "a19-16252_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465919042446/a19-16252_16k.htm"
  },
  {
    "accessionNumber": "0001104659-19-046150",
    "form": "6-K",
    "filingDate": "2019-08-15",
    "reportDate": "2019-08-15",
    "primaryDocument": "a19-17229_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465919046150/a19-17229_16k.htm"
  },
  {
    "accessionNumber": "0001104659-19-048991",
    "form": "6-K",
    "filingDate": "2019-09-06",
    "reportDate": "2019-09-06",
    "primaryDocument": "a19-18355_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465919048991/a19-18355_16k.htm"
  },
  {
    "accessionNumber": "0001104659-19-049759",
    "form": "6-K",
    "filingDate": "2019-09-11",
    "reportDate": "2019-09-11",
    "primaryDocument": "a19-18549_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465919049759/a19-18549_16k.htm"
  },
  {
    "accessionNumber": "0001104659-19-051206",
    "form": "6-K",
    "filingDate": "2019-09-24",
    "reportDate": "2019-09-24",
    "primaryDocument": "a19-18993_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465919051206/a19-18993_16k.htm"
  },
  {
    "accessionNumber": "0001104659-19-059003",
    "form": "6-K",
    "filingDate": "2019-11-01",
    "reportDate": "2019-11-01",
    "primaryDocument": "a19-21664_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465919059003/a19-21664_16k.htm"
  },
  {
    "accessionNumber": "0001104659-19-061731",
    "form": "6-K",
    "filingDate": "2019-11-08",
    "reportDate": "2019-11-08",
    "primaryDocument": "a19-22319_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465919061731/a19-22319_16k.htm"
  },
  {
    "accessionNumber": "0001047469-19-006269",
    "form": "6-K",
    "filingDate": "2019-11-13",
    "reportDate": "2019-11-13",
    "primaryDocument": "a2240063z6-k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000104746919006269/a2240063z6-k.htm"
  },
  {
    "accessionNumber": "0001047469-19-006258",
    "form": "6-K",
    "filingDate": "2019-11-13",
    "reportDate": "2019-11-13",
    "primaryDocument": "a2240023z6-k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000104746919006258/a2240023z6-k.htm"
  },
  {
    "accessionNumber": "0001047469-19-006257",
    "form": "6-K",
    "filingDate": "2019-11-13",
    "reportDate": "2019-11-13",
    "primaryDocument": "a2239435z6-k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000104746919006257/a2239435z6-k.htm"
  },
  {
    "accessionNumber": "0001104659-19-064490",
    "form": "6-K",
    "filingDate": "2019-11-15",
    "reportDate": "2019-11-15",
    "primaryDocument": "a19-22784_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465919064490/a19-22784_16k.htm"
  },
  {
    "accessionNumber": "0001047469-19-006433",
    "form": "6-K",
    "filingDate": "2019-11-20",
    "reportDate": "2019-11-20",
    "primaryDocument": "a2240136z6-k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000104746919006433/a2240136z6-k.htm"
  },
  {
    "accessionNumber": "0001104659-19-068453",
    "form": "6-K",
    "filingDate": "2019-11-29",
    "reportDate": "2019-11-29",
    "primaryDocument": "a19-22052_66k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465919068453/a19-22052_66k.htm"
  },
  {
    "accessionNumber": "0001104659-19-069221",
    "form": "6-K",
    "filingDate": "2019-12-03",
    "reportDate": "2019-12-03",
    "primaryDocument": "a19-24249_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465919069221/a19-24249_16k.htm"
  },
  {
    "accessionNumber": "0001104659-19-074597",
    "form": "6-K",
    "filingDate": "2019-12-20",
    "reportDate": "2019-12-20",
    "primaryDocument": "a19-26619_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465919074597/a19-26619_16k.htm"
  },
  {
    "accessionNumber": "0001104659-20-006055",
    "form": "6-K",
    "filingDate": "2020-01-23",
    "reportDate": "2020-01-23",
    "primaryDocument": "a20-5658_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465920006055/a20-5658_16k.htm"
  },
  {
    "accessionNumber": "0001104659-20-020231",
    "form": "6-K",
    "filingDate": "2020-02-13",
    "reportDate": "2020-02-13",
    "primaryDocument": "a20-7896_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465920020231/a20-7896_16k.htm"
  },
  {
    "accessionNumber": "0001104659-20-059072",
    "form": "6-K",
    "filingDate": "2020-05-11",
    "reportDate": "2020-05-11",
    "primaryDocument": "a20-19234_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465920059072/a20-19234_16k.htm"
  },
  {
    "accessionNumber": "0001104659-20-065398",
    "form": "6-K",
    "filingDate": "2020-05-22",
    "reportDate": "2020-05-22",
    "primaryDocument": "a20-20766_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465920065398/a20-20766_16k.htm"
  },
  {
    "accessionNumber": "0001104659-20-076602",
    "form": "6-K",
    "filingDate": "2020-06-25",
    "reportDate": "2020-06-25",
    "primaryDocument": "a20-23408_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465920076602/a20-23408_16k.htm"
  },
  {
    "accessionNumber": "0001104659-20-083110",
    "form": "6-K",
    "filingDate": "2020-07-13",
    "reportDate": "2020-07-13",
    "primaryDocument": "a20-24647_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465920083110/a20-24647_16k.htm"
  },
  {
    "accessionNumber": "0001104659-20-082881",
    "form": "6-K",
    "filingDate": "2020-07-13",
    "reportDate": "2020-07-13",
    "primaryDocument": "a20-6321_46k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465920082881/a20-6321_46k.htm"
  },
  {
    "accessionNumber": "0001104659-20-084639",
    "form": "6-K",
    "filingDate": "2020-07-20",
    "reportDate": "2020-07-20",
    "primaryDocument": "a20-25160_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465920084639/a20-25160_16k.htm"
  },
  {
    "accessionNumber": "0001104659-20-089267",
    "form": "6-K",
    "filingDate": "2020-08-03",
    "reportDate": "2020-08-03",
    "primaryDocument": "a20-26231_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465920089267/a20-26231_16k.htm"
  },
  {
    "accessionNumber": "0001104659-20-091677",
    "form": "6-K",
    "filingDate": "2020-08-07",
    "reportDate": "2020-08-07",
    "primaryDocument": "a20-26928_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465920091677/a20-26928_16k.htm"
  },
  {
    "accessionNumber": "0001104659-20-097260",
    "form": "6-K",
    "filingDate": "2020-08-20",
    "reportDate": "2020-08-20",
    "primaryDocument": "a20-29076_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465920097260/a20-29076_16k.htm"
  },
  {
    "accessionNumber": "0001104659-20-098141",
    "form": "6-K",
    "filingDate": "2020-08-25",
    "reportDate": "2020-08-25",
    "primaryDocument": "a20-29339_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465920098141/a20-29339_16k.htm"
  },
  {
    "accessionNumber": "0001104659-20-098136",
    "form": "6-K",
    "filingDate": "2020-08-25",
    "reportDate": "2020-08-25",
    "primaryDocument": "a20-29339_36k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465920098136/a20-29339_36k.htm"
  },
  {
    "accessionNumber": "0001104659-20-098130",
    "form": "6-K",
    "filingDate": "2020-08-25",
    "reportDate": "2020-08-25",
    "primaryDocument": "a20-29339_26k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465920098130/a20-29339_26k.htm"
  },
  {
    "accessionNumber": "0001104659-20-110253",
    "form": "6-K",
    "filingDate": "2020-09-30",
    "reportDate": "2020-09-30",
    "primaryDocument": "a20-31974_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465920110253/a20-31974_16k.htm"
  },
  {
    "accessionNumber": "0001104659-20-115828",
    "form": "6-K",
    "filingDate": "2020-10-19",
    "reportDate": "2020-10-19",
    "primaryDocument": "a20-33757_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465920115828/a20-33757_16k.htm"
  },
  {
    "accessionNumber": "0001104659-20-116815",
    "form": "6-K",
    "filingDate": "2020-10-21",
    "reportDate": "2020-10-21",
    "primaryDocument": "a20-33854_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465920116815/a20-33854_16k.htm"
  },
  {
    "accessionNumber": "0001104659-20-116934",
    "form": "6-K",
    "filingDate": "2020-10-22",
    "reportDate": "2020-10-22",
    "primaryDocument": "a20-33959_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465920116934/a20-33959_16k.htm"
  },
  {
    "accessionNumber": "0001104659-20-117978",
    "form": "6-K",
    "filingDate": "2020-10-26",
    "reportDate": "2020-10-26",
    "primaryDocument": "a20-34249_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465920117978/a20-34249_16k.htm"
  },
  {
    "accessionNumber": "0001104659-20-120757",
    "form": "6-K",
    "filingDate": "2020-11-03",
    "reportDate": "2020-11-03",
    "primaryDocument": "a20-34873_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465920120757/a20-34873_16k.htm"
  },
  {
    "accessionNumber": "0001104659-20-121812",
    "form": "6-K",
    "filingDate": "2020-11-05",
    "reportDate": "2020-11-05",
    "primaryDocument": "a20-35108_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465920121812/a20-35108_16k.htm"
  },
  {
    "accessionNumber": "0001104659-20-137127",
    "form": "6-K",
    "filingDate": "2020-12-18",
    "reportDate": "2020-12-18",
    "primaryDocument": "a20-38881_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465920137127/a20-38881_16k.htm"
  },
  {
    "accessionNumber": "0001104659-20-139366",
    "form": "6-K",
    "filingDate": "2020-12-28",
    "reportDate": "2020-12-28",
    "primaryDocument": "tm2039392d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465920139366/tm2039392d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-21-005585",
    "form": "6-K",
    "filingDate": "2021-01-20",
    "reportDate": "2021-01-20",
    "primaryDocument": "tm213657d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465921005585/tm213657d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-21-011016",
    "form": "6-K",
    "filingDate": "2021-02-02",
    "reportDate": "2021-02-02",
    "primaryDocument": "a21-1839_66k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465921011016/a21-1839_66k.htm"
  },
  {
    "accessionNumber": "0001104659-21-011014",
    "form": "6-K",
    "filingDate": "2021-02-02",
    "reportDate": "2021-02-02",
    "primaryDocument": "a21-1839_56k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465921011014/a21-1839_56k.htm"
  },
  {
    "accessionNumber": "0001104659-21-010975",
    "form": "6-K",
    "filingDate": "2021-02-02",
    "reportDate": "2021-02-02",
    "primaryDocument": "a21-1839_46k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465921010975/a21-1839_46k.htm"
  },
  {
    "accessionNumber": "0001104659-21-010913",
    "form": "6-K",
    "filingDate": "2021-02-02",
    "reportDate": "2020-03-31",
    "primaryDocument": "baba-20200331x6k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465921010913/baba-20200331x6k.htm"
  },
  {
    "accessionNumber": "0001104659-21-010910",
    "form": "6-K",
    "filingDate": "2021-02-02",
    "reportDate": "2020-09-30",
    "primaryDocument": "baba-20200630x6k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465921010910/baba-20200630x6k.htm"
  },
  {
    "accessionNumber": "0001104659-21-012476",
    "form": "6-K",
    "filingDate": "2021-02-05",
    "reportDate": "2021-02-04",
    "primaryDocument": "a21-1839_76k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465921012476/a21-1839_76k.htm"
  },
  {
    "accessionNumber": "0001104659-21-012378",
    "form": "6-K",
    "filingDate": "2021-02-05",
    "reportDate": "2021-02-04",
    "primaryDocument": "a21-1839_96k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465921012378/a21-1839_96k.htm"
  },
  {
    "accessionNumber": "0001104659-21-016660",
    "form": "6-K",
    "filingDate": "2021-02-09",
    "reportDate": "2021-02-09",
    "primaryDocument": "a21-1839_106k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465921016660/a21-1839_106k.htm"
  },
  {
    "accessionNumber": "0001104659-21-019786",
    "form": "6-K",
    "filingDate": "2021-02-10",
    "reportDate": "2021-02-10",
    "primaryDocument": "a21-6105_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465921019786/a21-6105_16k.htm"
  },
  {
    "accessionNumber": "0001104659-21-049222",
    "form": "6-K",
    "filingDate": "2021-04-12",
    "reportDate": "2021-04-12",
    "primaryDocument": "a21-12722_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465921049222/a21-12722_16k.htm"
  },
  {
    "accessionNumber": "0001104659-21-049093",
    "form": "6-K",
    "filingDate": "2021-04-12",
    "reportDate": "2021-04-12",
    "primaryDocument": "a21-12710_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465921049093/a21-12710_16k.htm"
  },
  {
    "accessionNumber": "0001104659-21-058057",
    "form": "6-K",
    "filingDate": "2021-04-30",
    "reportDate": "2021-04-30",
    "primaryDocument": "a21-14734_16k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465921058057/a21-14734_16k.htm"
  },
  {
    "accessionNumber": "0001104659-21-065916",
    "form": "6-K",
    "filingDate": "2021-05-13",
    "reportDate": "2021-05-13",
    "primaryDocument": "tm2116252d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465921065916/tm2116252d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-21-093230",
    "form": "6-K",
    "filingDate": "2021-07-19",
    "reportDate": "2021-07-19",
    "primaryDocument": "tm2122523d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465921093230/tm2122523d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-21-094104",
    "form": "6-K",
    "filingDate": "2021-07-21",
    "reportDate": "2021-07-21",
    "primaryDocument": "tm2122645d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465921094104/tm2122645d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-21-096324",
    "form": "6-K",
    "filingDate": "2021-07-27",
    "reportDate": "2021-07-27",
    "primaryDocument": "a21-17183_36k.htm",
    "primaryDocDescription": "6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465921096324/a21-17183_36k.htm"
  },
  {
    "accessionNumber": "0001104659-21-099438",
    "form": "6-K",
    "filingDate": "2021-08-03",
    "reportDate": "2021-08-03",
    "primaryDocument": "tm2123939d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465921099438/tm2123939d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-21-103093",
    "form": "6-K",
    "filingDate": "2021-08-11",
    "reportDate": "2021-08-10",
    "primaryDocument": "tm2124526d2_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465921103093/tm2124526d2_6k.htm"
  },
  {
    "accessionNumber": "0001104659-21-116782",
    "form": "6-K",
    "filingDate": "2021-09-17",
    "reportDate": "2021-09-17",
    "primaryDocument": "tm2127882d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465921116782/tm2127882d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-21-134673",
    "form": "6-K",
    "filingDate": "2021-11-05",
    "reportDate": "2021-11-05",
    "primaryDocument": "tm2131948d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465921134673/tm2131948d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-21-141204",
    "form": "6-K",
    "filingDate": "2021-11-18",
    "reportDate": "2021-11-18",
    "primaryDocument": "tm2133400d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465921141204/tm2133400d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-21-146494",
    "form": "6-K",
    "filingDate": "2021-12-06",
    "reportDate": "2021-12-06",
    "primaryDocument": "tm2134644d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465921146494/tm2134644d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-21-148335",
    "form": "6-K",
    "filingDate": "2021-12-10",
    "reportDate": "2021-12-10",
    "primaryDocument": "tm2135008d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465921148335/tm2135008d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-22-019698",
    "form": "6-K",
    "filingDate": "2022-02-11",
    "reportDate": "2022-02-11",
    "primaryDocument": "tm226337d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465922019698/tm226337d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-22-026569",
    "form": "6-K",
    "filingDate": "2022-02-24",
    "reportDate": "2022-02-24",
    "primaryDocument": "tm227577d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465922026569/tm227577d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-22-036278",
    "form": "6-K",
    "filingDate": "2022-03-22",
    "reportDate": "2022-03-22",
    "primaryDocument": "tm2210114d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465922036278/tm2210114d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-22-059786",
    "form": "6-K",
    "filingDate": "2022-05-13",
    "reportDate": "2022-05-13",
    "primaryDocument": "tm2215506d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465922059786/tm2215506d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-22-065269",
    "form": "6-K",
    "filingDate": "2022-05-26",
    "reportDate": "2022-05-26",
    "primaryDocument": "tm2217018d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465922065269/tm2217018d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-22-081007",
    "form": "6-K",
    "filingDate": "2022-07-20",
    "reportDate": "2022-07-20",
    "primaryDocument": "tm2221455d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465922081007/tm2221455d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-22-081715",
    "form": "6-K",
    "filingDate": "2022-07-22",
    "reportDate": "2022-07-22",
    "primaryDocument": "tm2221287d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465922081715/tm2221287d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-22-082632",
    "form": "6-K",
    "filingDate": "2022-07-26",
    "reportDate": "2022-07-26",
    "primaryDocument": "tm2215966d3_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465922082632/tm2215966d3_6k.htm"
  },
  {
    "accessionNumber": "0001104659-22-082563",
    "form": "6-K",
    "filingDate": "2022-07-26",
    "reportDate": "2022-07-26",
    "primaryDocument": "tm2215966d2_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465922082563/tm2215966d2_6k.htm"
  },
  {
    "accessionNumber": "0001104659-22-084395",
    "form": "6-K",
    "filingDate": "2022-08-01",
    "reportDate": "2022-08-01",
    "primaryDocument": "tm2222224d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465922084395/tm2222224d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-22-086110",
    "form": "6-K",
    "filingDate": "2022-08-04",
    "reportDate": "2022-08-04",
    "primaryDocument": "tm2222585d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465922086110/tm2222585d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-22-085820",
    "form": "6-K",
    "filingDate": "2022-08-04",
    "reportDate": "2022-08-04",
    "primaryDocument": "tm2222577d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465922085820/tm2222577d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-22-086971",
    "form": "6-K",
    "filingDate": "2022-08-08",
    "reportDate": "2022-08-08",
    "primaryDocument": "tm2222806d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465922086971/tm2222806d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-22-086970",
    "form": "6-K",
    "filingDate": "2022-08-08",
    "reportDate": "2022-08-08",
    "primaryDocument": "tm2222803d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465922086970/tm2222803d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-22-088267",
    "form": "6-K",
    "filingDate": "2022-08-10",
    "reportDate": "2022-08-10",
    "primaryDocument": "tm2223071d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465922088267/tm2223071d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-22-104370",
    "form": "6-K",
    "filingDate": "2022-09-30",
    "reportDate": "2022-09-30",
    "primaryDocument": "tm2226973d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465922104370/tm2226973d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-22-114612",
    "form": "6-K",
    "filingDate": "2022-11-04",
    "reportDate": "2022-11-04",
    "primaryDocument": "tm2229725d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465922114612/tm2229725d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-22-119884",
    "form": "6-K",
    "filingDate": "2022-11-17",
    "reportDate": "2022-11-17",
    "primaryDocument": "tm2230824d3_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465922119884/tm2230824d3_6k.htm"
  },
  {
    "accessionNumber": "0001104659-22-119745",
    "form": "6-K",
    "filingDate": "2022-11-17",
    "reportDate": "2022-11-17",
    "primaryDocument": "tm2230824d2_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465922119745/tm2230824d2_6k.htm"
  },
  {
    "accessionNumber": "0001104659-22-119743",
    "form": "6-K",
    "filingDate": "2022-11-17",
    "reportDate": "2022-11-17",
    "primaryDocument": "tm2230824d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465922119743/tm2230824d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-22-121919",
    "form": "6-K",
    "filingDate": "2022-11-25",
    "reportDate": "2022-11-25",
    "primaryDocument": "tm2231361d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465922121919/tm2231361d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-22-124694",
    "form": "6-K",
    "filingDate": "2022-12-06",
    "reportDate": "2022-12-06",
    "primaryDocument": "tm2232077d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465922124694/tm2232077d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-22-127544",
    "form": "6-K",
    "filingDate": "2022-12-16",
    "reportDate": "2022-12-16",
    "primaryDocument": "tm2232886d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465922127544/tm2232886d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-23-001961",
    "form": "6-K",
    "filingDate": "2023-01-09",
    "reportDate": "2023-01-09",
    "primaryDocument": "tm232663d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465923001961/tm232663d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-23-014605",
    "form": "6-K",
    "filingDate": "2023-02-08",
    "reportDate": "2023-02-08",
    "primaryDocument": "tm235941d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465923014605/tm235941d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-23-024761",
    "form": "6-K",
    "filingDate": "2023-02-23",
    "reportDate": "2023-02-23",
    "primaryDocument": "tm237669d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465923024761/tm237669d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-23-024752",
    "form": "6-K",
    "filingDate": "2023-02-23",
    "reportDate": "2023-02-23",
    "primaryDocument": "tm237669d2_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465923024752/tm237669d2_6k.htm"
  },
  {
    "accessionNumber": "0001104659-23-037408",
    "form": "6-K",
    "filingDate": "2023-03-28",
    "reportDate": "2023-03-28",
    "primaryDocument": "tm2310734d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465923037408/tm2310734d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-23-056303",
    "form": "6-K",
    "filingDate": "2023-05-05",
    "reportDate": "2023-05-05",
    "primaryDocument": "tm2314826d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465923056303/tm2314826d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-23-062246",
    "form": "6-K",
    "filingDate": "2023-05-18",
    "reportDate": "2023-05-18",
    "primaryDocument": "tm2316208d2_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465923062246/tm2316208d2_6k.htm"
  },
  {
    "accessionNumber": "0001104659-23-062243",
    "form": "6-K",
    "filingDate": "2023-05-18",
    "reportDate": "2023-05-18",
    "primaryDocument": "tm2316208d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465923062243/tm2316208d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-23-069655",
    "form": "6-K",
    "filingDate": "2023-06-09",
    "reportDate": "2023-06-09",
    "primaryDocument": "tm2318345d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465923069655/tm2318345d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-23-072478",
    "form": "6-K",
    "filingDate": "2023-06-20",
    "reportDate": "2023-06-20",
    "primaryDocument": "tm2319146d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465923072478/tm2319146d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-23-079258",
    "form": "6-K",
    "filingDate": "2023-07-10",
    "reportDate": "2023-07-10",
    "primaryDocument": "tm2320934d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465923079258/tm2320934d1_6k.htm"
  },
  {
    "accessionNumber": "0001193125-23-190974",
    "form": "6-K",
    "filingDate": "2023-07-21",
    "reportDate": "2023-07-21",
    "primaryDocument": "d517168d6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000119312523190974/d517168d6k.htm"
  },
  {
    "accessionNumber": "0001104659-23-083188",
    "form": "6-K",
    "filingDate": "2023-07-24",
    "reportDate": "2023-07-24",
    "primaryDocument": "tm2321880d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465923083188/tm2321880d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-23-084976",
    "form": "6-K",
    "filingDate": "2023-07-28",
    "reportDate": "2023-07-28",
    "primaryDocument": "tm2322309d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465923084976/tm2322309d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-23-086019",
    "form": "6-K",
    "filingDate": "2023-08-01",
    "reportDate": "2023-08-01",
    "primaryDocument": "tm2322510d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465923086019/tm2322510d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-23-089768",
    "form": "6-K",
    "filingDate": "2023-08-10",
    "reportDate": "2023-08-10",
    "primaryDocument": "tm2323406d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465923089768/tm2323406d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-23-092264",
    "form": "6-K",
    "filingDate": "2023-08-16",
    "reportDate": "2023-08-16",
    "primaryDocument": "tm2323926d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465923092264/tm2323926d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-23-099414",
    "form": "6-K",
    "filingDate": "2023-09-11",
    "reportDate": "2023-09-11",
    "primaryDocument": "tm2325852d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465923099414/tm2325852d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-23-103638",
    "form": "6-K",
    "filingDate": "2023-09-26",
    "reportDate": "2023-09-26",
    "primaryDocument": "tm2326925d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465923103638/tm2326925d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-23-104568",
    "form": "6-K",
    "filingDate": "2023-09-28",
    "reportDate": "2023-09-28",
    "primaryDocument": "tm2327135d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465923104568/tm2327135d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-23-113964",
    "form": "6-K",
    "filingDate": "2023-11-03",
    "reportDate": "2023-11-03",
    "primaryDocument": "tm2329802d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465923113964/tm2329802d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-23-119088",
    "form": "6-K",
    "filingDate": "2023-11-16",
    "reportDate": "2023-11-16",
    "primaryDocument": "tm2330915d2_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465923119088/tm2330915d2_6k.htm"
  },
  {
    "accessionNumber": "0001104659-23-119081",
    "form": "6-K",
    "filingDate": "2023-11-16",
    "reportDate": "2023-11-16",
    "primaryDocument": "tm2330915d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465923119081/tm2330915d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-23-123758",
    "form": "6-K",
    "filingDate": "2023-12-06",
    "reportDate": "2023-12-06",
    "primaryDocument": "tm2332213d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465923123758/tm2332213d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-23-127472",
    "form": "6-K",
    "filingDate": "2023-12-20",
    "reportDate": "2023-12-20",
    "primaryDocument": "tm2333340d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465923127472/tm2333340d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-23-128427",
    "form": "6-K",
    "filingDate": "2023-12-22",
    "reportDate": "2023-12-22",
    "primaryDocument": "tm2333605d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465923128427/tm2333605d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-000045",
    "form": "6-K",
    "filingDate": "2024-01-02",
    "reportDate": "2024-01-02",
    "primaryDocument": "tm241392d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924000045/tm241392d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-006408",
    "form": "6-K",
    "filingDate": "2024-01-25",
    "reportDate": "2024-01-25",
    "primaryDocument": "tm244112d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924006408/tm244112d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-011604",
    "form": "6-K",
    "filingDate": "2024-02-07",
    "reportDate": "2024-02-07",
    "primaryDocument": "tm245446d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924011604/tm245446d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-038666",
    "form": "6-K",
    "filingDate": "2024-03-26",
    "reportDate": "2024-03-26",
    "primaryDocument": "tm249803d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924038666/tm249803d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-042245",
    "form": "6-K",
    "filingDate": "2024-04-02",
    "reportDate": "2024-04-02",
    "primaryDocument": "tm2410529d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924042245/tm2410529d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-054387",
    "form": "6-K",
    "filingDate": "2024-04-30",
    "reportDate": "2024-04-30",
    "primaryDocument": "tm2413076d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924054387/tm2413076d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-061145",
    "form": "6-K",
    "filingDate": "2024-05-14",
    "reportDate": "2024-05-14",
    "primaryDocument": "tm2414429d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924061145/tm2414429d1_6k.htm"
  },
  {
    "accessionNumber": "0001193125-24-145954",
    "form": "6-K",
    "filingDate": "2024-05-23",
    "reportDate": "2024-05-23",
    "primaryDocument": "d842337d6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000119312524145954/d842337d6k.htm"
  },
  {
    "accessionNumber": "0001193125-24-145548",
    "form": "6-K",
    "filingDate": "2024-05-23",
    "reportDate": "2024-05-23",
    "primaryDocument": "d843528d6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000119312524145548/d843528d6k.htm"
  },
  {
    "accessionNumber": "0001193125-24-146219",
    "form": "6-K",
    "filingDate": "2024-05-24",
    "reportDate": "2024-05-23",
    "primaryDocument": "d843385d6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000119312524146219/d843385d6k.htm"
  },
  {
    "accessionNumber": "0001193125-24-149515",
    "form": "6-K",
    "filingDate": "2024-05-30",
    "reportDate": "2024-05-29",
    "primaryDocument": "d779816d6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000119312524149515/d779816d6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-066829",
    "form": "6-K",
    "filingDate": "2024-05-31",
    "reportDate": "2024-05-31",
    "primaryDocument": "tm2415924d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924066829/tm2415924d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-071494",
    "form": "6-K",
    "filingDate": "2024-06-14",
    "reportDate": "2024-06-14",
    "primaryDocument": "tm2417286d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924071494/tm2417286d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-077061",
    "form": "6-K",
    "filingDate": "2024-07-02",
    "reportDate": "2024-07-02",
    "primaryDocument": "tm2418711d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924077061/tm2418711d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-077941",
    "form": "6-K",
    "filingDate": "2024-07-05",
    "reportDate": "2024-07-05",
    "primaryDocument": "tm2418943d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924077941/tm2418943d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-085053",
    "form": "6-K",
    "filingDate": "2024-08-02",
    "reportDate": "2024-08-02",
    "primaryDocument": "tm2420742d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924085053/tm2420742d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-090104",
    "form": "6-K",
    "filingDate": "2024-08-15",
    "reportDate": "2024-08-15",
    "primaryDocument": "tm2421790d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924090104/tm2421790d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-090102",
    "form": "6-K",
    "filingDate": "2024-08-15",
    "reportDate": "2024-08-15",
    "primaryDocument": "tm2421791d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924090102/tm2421791d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-092027",
    "form": "6-K",
    "filingDate": "2024-08-22",
    "reportDate": "2024-08-22",
    "primaryDocument": "tm2422435d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924092027/tm2422435d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-092213",
    "form": "6-K",
    "filingDate": "2024-08-23",
    "reportDate": "2024-08-23",
    "primaryDocument": "tm2422538d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924092213/tm2422538d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-093618",
    "form": "6-K",
    "filingDate": "2024-08-28",
    "reportDate": "2024-08-28",
    "primaryDocument": "tm2422772d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924093618/tm2422772d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-095577",
    "form": "6-K",
    "filingDate": "2024-08-30",
    "reportDate": "2024-08-30",
    "primaryDocument": "tm2423009d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924095577/tm2423009d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-097357",
    "form": "6-K",
    "filingDate": "2024-09-05",
    "reportDate": "2024-09-05",
    "primaryDocument": "tm2423435d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924097357/tm2423435d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-097729",
    "form": "6-K",
    "filingDate": "2024-09-06",
    "reportDate": "2024-09-06",
    "primaryDocument": "tm2423216d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924097729/tm2423216d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-097992",
    "form": "6-K",
    "filingDate": "2024-09-09",
    "reportDate": "2024-09-09",
    "primaryDocument": "tm2423602d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924097992/tm2423602d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-099750",
    "form": "6-K",
    "filingDate": "2024-09-13",
    "reportDate": "2024-09-13",
    "primaryDocument": "tm2423606d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924099750/tm2423606d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-101684",
    "form": "6-K",
    "filingDate": "2024-09-20",
    "reportDate": "2024-09-20",
    "primaryDocument": "tm2424116d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924101684/tm2424116d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-103702",
    "form": "6-K",
    "filingDate": "2024-09-27",
    "reportDate": "2024-09-27",
    "primaryDocument": "tm2424538d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924103702/tm2424538d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-105192",
    "form": "6-K",
    "filingDate": "2024-10-02",
    "reportDate": "2024-10-02",
    "primaryDocument": "tm2425406d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924105192/tm2425406d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-106255",
    "form": "6-K",
    "filingDate": "2024-10-04",
    "reportDate": "2024-10-04",
    "primaryDocument": "tm2425626d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924106255/tm2425626d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-109845",
    "form": "6-K",
    "filingDate": "2024-10-18",
    "reportDate": "2024-10-18",
    "primaryDocument": "tm2426475d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924109845/tm2426475d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-111535",
    "form": "6-K",
    "filingDate": "2024-10-25",
    "reportDate": "2024-10-25",
    "primaryDocument": "tm2426715d2_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924111535/tm2426715d2_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-111458",
    "form": "6-K",
    "filingDate": "2024-10-25",
    "reportDate": "2024-10-25",
    "primaryDocument": "tm2426715d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924111458/tm2426715d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-113472",
    "form": "6-K",
    "filingDate": "2024-11-01",
    "reportDate": "2024-11-01",
    "primaryDocument": "tm2426952d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924113472/tm2426952d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-113237",
    "form": "6-K",
    "filingDate": "2024-11-01",
    "reportDate": "2024-11-01",
    "primaryDocument": "tm2427284d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924113237/tm2427284d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-114774",
    "form": "6-K",
    "filingDate": "2024-11-06",
    "reportDate": "2024-11-06",
    "primaryDocument": "tm2427642d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924114774/tm2427642d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-115841",
    "form": "6-K",
    "filingDate": "2024-11-08",
    "reportDate": "2024-11-08",
    "primaryDocument": "tm2427396d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924115841/tm2427396d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-119689",
    "form": "6-K",
    "filingDate": "2024-11-15",
    "reportDate": "2024-11-15",
    "primaryDocument": "tm2428049d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924119689/tm2428049d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-119688",
    "form": "6-K",
    "filingDate": "2024-11-15",
    "reportDate": "2024-11-15",
    "primaryDocument": "tm2428590d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924119688/tm2428590d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-119900",
    "form": "6-K",
    "filingDate": "2024-11-18",
    "reportDate": "2024-11-18",
    "primaryDocument": "tm2428696d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924119900/tm2428696d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-119899",
    "form": "6-K",
    "filingDate": "2024-11-18",
    "reportDate": "2024-11-18",
    "primaryDocument": "tm2428512d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924119899/tm2428512d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-121012",
    "form": "6-K",
    "filingDate": "2024-11-20",
    "reportDate": "2024-11-20",
    "primaryDocument": "tm2429006d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924121012/tm2429006d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-120794",
    "form": "6-K",
    "filingDate": "2024-11-20",
    "reportDate": "2024-11-20",
    "primaryDocument": "tm2428979d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924120794/tm2428979d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-121272",
    "form": "6-K",
    "filingDate": "2024-11-21",
    "reportDate": "2024-11-21",
    "primaryDocument": "tm2429125d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924121272/tm2429125d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-122083",
    "form": "6-K",
    "filingDate": "2024-11-22",
    "reportDate": "2024-11-22",
    "primaryDocument": "tm2428705d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924122083/tm2428705d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-124075",
    "form": "6-K",
    "filingDate": "2024-11-29",
    "reportDate": "2024-11-29",
    "primaryDocument": "tm2429821d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924124075/tm2429821d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-124073",
    "form": "6-K",
    "filingDate": "2024-11-29",
    "reportDate": "2024-11-29",
    "primaryDocument": "tm2429478d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924124073/tm2429478d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-123849",
    "form": "6-K",
    "filingDate": "2024-11-29",
    "reportDate": "2024-11-29",
    "primaryDocument": "tm2429790d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924123849/tm2429790d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-125894",
    "form": "6-K",
    "filingDate": "2024-12-05",
    "reportDate": "2024-12-05",
    "primaryDocument": "tm2430268d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924125894/tm2430268d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-126288",
    "form": "6-K",
    "filingDate": "2024-12-06",
    "reportDate": "2024-12-06",
    "primaryDocument": "tm2429888d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924126288/tm2429888d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-128410",
    "form": "6-K",
    "filingDate": "2024-12-13",
    "reportDate": "2024-12-13",
    "primaryDocument": "tm2430511d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924128410/tm2430511d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-129119",
    "form": "6-K",
    "filingDate": "2024-12-17",
    "reportDate": "2024-12-17",
    "primaryDocument": "tm2431305d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924129119/tm2431305d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-130798",
    "form": "6-K",
    "filingDate": "2024-12-20",
    "reportDate": "2024-12-20",
    "primaryDocument": "tm2431172d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924130798/tm2431172d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-24-132128",
    "form": "6-K",
    "filingDate": "2024-12-27",
    "reportDate": "2024-12-27",
    "primaryDocument": "tm2431864d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924132128/tm2431864d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-000055",
    "form": "6-K",
    "filingDate": "2025-01-02",
    "reportDate": "2025-01-02",
    "primaryDocument": "tm2432340d2_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925000055/tm2432340d2_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-000039",
    "form": "6-K",
    "filingDate": "2025-01-02",
    "reportDate": "2025-01-02",
    "primaryDocument": "tm2432340d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925000039/tm2432340d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-000776",
    "form": "6-K",
    "filingDate": "2025-01-03",
    "reportDate": "2025-01-03",
    "primaryDocument": "tm2432208d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925000776/tm2432208d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-001655",
    "form": "6-K",
    "filingDate": "2025-01-07",
    "reportDate": "2025-01-07",
    "primaryDocument": "tm252021d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925001655/tm252021d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-002518",
    "form": "6-K",
    "filingDate": "2025-01-10",
    "reportDate": "2025-01-10",
    "primaryDocument": "tm252049d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925002518/tm252049d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-004455",
    "form": "6-K",
    "filingDate": "2025-01-17",
    "reportDate": "2025-01-17",
    "primaryDocument": "tm253131d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925004455/tm253131d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-005972",
    "form": "6-K",
    "filingDate": "2025-01-24",
    "reportDate": "2025-01-24",
    "primaryDocument": "tm253825d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925005972/tm253825d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-008086",
    "form": "6-K",
    "filingDate": "2025-01-31",
    "reportDate": "2025-01-31",
    "primaryDocument": "tm254529d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925008086/tm254529d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-009639",
    "form": "6-K",
    "filingDate": "2025-02-05",
    "reportDate": "2025-02-05",
    "primaryDocument": "tm255574d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925009639/tm255574d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-009861",
    "form": "6-K",
    "filingDate": "2025-02-06",
    "reportDate": "2025-02-06",
    "primaryDocument": "tm255691d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925009861/tm255691d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-010520",
    "form": "6-K",
    "filingDate": "2025-02-07",
    "reportDate": "2025-02-07",
    "primaryDocument": "tm255277d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925010520/tm255277d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-015648",
    "form": "6-K",
    "filingDate": "2025-02-20",
    "reportDate": "2025-02-20",
    "primaryDocument": "tm257183d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925015648/tm257183d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-016348",
    "form": "6-K",
    "filingDate": "2025-02-24",
    "reportDate": "2025-02-24",
    "primaryDocument": "tm257405d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925016348/tm257405d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-016921",
    "form": "6-K",
    "filingDate": "2025-02-25",
    "reportDate": "2025-02-25",
    "primaryDocument": "tm257552d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925016921/tm257552d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-019112",
    "form": "6-K",
    "filingDate": "2025-02-28",
    "reportDate": "2025-02-28",
    "primaryDocument": "tm257806d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925019112/tm257806d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-020870",
    "form": "6-K",
    "filingDate": "2025-03-05",
    "reportDate": "2025-03-05",
    "primaryDocument": "tm258352d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925020870/tm258352d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-021724",
    "form": "6-K",
    "filingDate": "2025-03-07",
    "reportDate": "2025-03-07",
    "primaryDocument": "tm258074d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925021724/tm258074d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-023933",
    "form": "6-K",
    "filingDate": "2025-03-14",
    "reportDate": "2025-03-14",
    "primaryDocument": "tm258723d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925023933/tm258723d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-026637",
    "form": "6-K",
    "filingDate": "2025-03-21",
    "reportDate": "2025-03-21",
    "primaryDocument": "tm259449d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925026637/tm259449d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-029349",
    "form": "6-K",
    "filingDate": "2025-03-28",
    "reportDate": "2025-03-28",
    "primaryDocument": "tm2510114d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925029349/tm2510114d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-030874",
    "form": "6-K",
    "filingDate": "2025-04-02",
    "reportDate": "2025-04-02",
    "primaryDocument": "tm2511278d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925030874/tm2511278d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-032179",
    "form": "6-K",
    "filingDate": "2025-04-04",
    "reportDate": "2025-04-04",
    "primaryDocument": "tm2510905d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925032179/tm2510905d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-032612",
    "form": "6-K",
    "filingDate": "2025-04-07",
    "reportDate": "2025-04-07",
    "primaryDocument": "tm2511692d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925032612/tm2511692d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-034206",
    "form": "6-K",
    "filingDate": "2025-04-11",
    "reportDate": "2025-04-11",
    "primaryDocument": "tm2511695d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925034206/tm2511695d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-036336",
    "form": "6-K",
    "filingDate": "2025-04-18",
    "reportDate": "2025-04-18",
    "primaryDocument": "tm2512266d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925036336/tm2512266d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-039398",
    "form": "6-K",
    "filingDate": "2025-04-25",
    "reportDate": "2025-04-25",
    "primaryDocument": "tm2512871d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925039398/tm2512871d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-041669",
    "form": "6-K",
    "filingDate": "2025-04-30",
    "reportDate": "2025-04-30",
    "primaryDocument": "tm2513628d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925041669/tm2513628d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-044099",
    "form": "6-K",
    "filingDate": "2025-05-02",
    "reportDate": "2025-05-02",
    "primaryDocument": "tm2513344d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925044099/tm2513344d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-046706",
    "form": "6-K",
    "filingDate": "2025-05-09",
    "reportDate": "2025-05-09",
    "primaryDocument": "tm2514155d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925046706/tm2514155d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-046384",
    "form": "6-K",
    "filingDate": "2025-05-09",
    "reportDate": "2025-05-09",
    "primaryDocument": "tm2514470d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925046384/tm2514470d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-049429",
    "form": "6-K",
    "filingDate": "2025-05-15",
    "reportDate": "2025-05-15",
    "primaryDocument": "tm2515251d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925049429/tm2515251d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-049400",
    "form": "6-K",
    "filingDate": "2025-05-15",
    "reportDate": "2025-05-15",
    "primaryDocument": "tm2515233d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925049400/tm2515233d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-049994",
    "form": "6-K",
    "filingDate": "2025-05-16",
    "reportDate": "2025-05-16",
    "primaryDocument": "tm2514777d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925049994/tm2514777d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-052444",
    "form": "6-K",
    "filingDate": "2025-05-23",
    "reportDate": "2025-05-23",
    "primaryDocument": "tm2515536d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925052444/tm2515536d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-052631",
    "form": "6-K",
    "filingDate": "2025-05-27",
    "reportDate": "2025-05-27",
    "primaryDocument": "tm2516149d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925052631/tm2516149d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-053851",
    "form": "6-K",
    "filingDate": "2025-05-29",
    "reportDate": "2025-05-29",
    "primaryDocument": "tm2516193d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925053851/tm2516193d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-054850",
    "form": "6-K",
    "filingDate": "2025-05-30",
    "reportDate": "2025-05-30",
    "primaryDocument": "tm2516147d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925054850/tm2516147d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-056819",
    "form": "6-K",
    "filingDate": "2025-06-05",
    "reportDate": "2025-06-05",
    "primaryDocument": "tm2517262d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925056819/tm2517262d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-057299",
    "form": "6-K",
    "filingDate": "2025-06-06",
    "reportDate": "2025-06-06",
    "primaryDocument": "tm2516878d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925057299/tm2516878d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-058717",
    "form": "6-K",
    "filingDate": "2025-06-12",
    "reportDate": "2025-06-12",
    "primaryDocument": "tm2517845d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925058717/tm2517845d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-059333",
    "form": "6-K",
    "filingDate": "2025-06-13",
    "reportDate": "2025-06-13",
    "primaryDocument": "tm2517500d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925059333/tm2517500d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-059841",
    "form": "6-K",
    "filingDate": "2025-06-16",
    "reportDate": "2025-06-16",
    "primaryDocument": "tm2518099d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925059841/tm2518099d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-061144",
    "form": "6-K",
    "filingDate": "2025-06-20",
    "reportDate": "2025-06-20",
    "primaryDocument": "tm2518100d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925061144/tm2518100d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-062815",
    "form": "6-K",
    "filingDate": "2025-06-26",
    "reportDate": "2025-06-26",
    "primaryDocument": "tm2519164d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925062815/tm2519164d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-063602",
    "form": "6-K",
    "filingDate": "2025-06-27",
    "reportDate": "2025-06-27",
    "primaryDocument": "tm2518652d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925063602/tm2518652d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-065017",
    "form": "6-K",
    "filingDate": "2025-07-02",
    "reportDate": "2025-07-02",
    "primaryDocument": "tm2519687d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925065017/tm2519687d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-065774",
    "form": "6-K",
    "filingDate": "2025-07-03",
    "reportDate": "2025-07-03",
    "primaryDocument": "tm2519873d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925065774/tm2519873d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-065561",
    "form": "6-K",
    "filingDate": "2025-07-03",
    "reportDate": "2025-07-03",
    "primaryDocument": "tm2519851d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925065561/tm2519851d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-066086",
    "form": "6-K",
    "filingDate": "2025-07-07",
    "reportDate": "2025-07-07",
    "primaryDocument": "tm2519978d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925066086/tm2519978d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-066083",
    "form": "6-K",
    "filingDate": "2025-07-07",
    "reportDate": "2025-07-07",
    "primaryDocument": "tm2519432d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925066083/tm2519432d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-066586",
    "form": "6-K",
    "filingDate": "2025-07-09",
    "reportDate": "2025-07-09",
    "primaryDocument": "tm2520167d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925066586/tm2520167d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-067393",
    "form": "6-K",
    "filingDate": "2025-07-11",
    "reportDate": "2025-07-11",
    "primaryDocument": "tm2520075d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925067393/tm2520075d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-069014",
    "form": "6-K",
    "filingDate": "2025-07-18",
    "reportDate": "2025-07-18",
    "primaryDocument": "tm2520883d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925069014/tm2520883d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-069480",
    "form": "6-K",
    "filingDate": "2025-07-22",
    "reportDate": "2025-07-22",
    "primaryDocument": "tm2521397d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925069480/tm2521397d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-070817",
    "form": "6-K",
    "filingDate": "2025-07-25",
    "reportDate": "2025-07-25",
    "primaryDocument": "tm2521310d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925070817/tm2521310d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-073102",
    "form": "6-K",
    "filingDate": "2025-08-01",
    "reportDate": "2025-08-01",
    "primaryDocument": "tm2522077d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925073102/tm2522077d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-074701",
    "form": "6-K",
    "filingDate": "2025-08-06",
    "reportDate": "2025-08-06",
    "primaryDocument": "tm2522729d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925074701/tm2522729d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-074564",
    "form": "6-K",
    "filingDate": "2025-08-06",
    "reportDate": "2025-08-06",
    "primaryDocument": "tm2522605d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925074564/tm2522605d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-075693",
    "form": "6-K",
    "filingDate": "2025-08-08",
    "reportDate": "2025-08-08",
    "primaryDocument": "tm2522473d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925075693/tm2522473d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-079229",
    "form": "6-K",
    "filingDate": "2025-08-15",
    "reportDate": "2025-08-15",
    "primaryDocument": "tm2523099d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925079229/tm2523099d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-079385",
    "form": "6-K",
    "filingDate": "2025-08-18",
    "reportDate": "2025-08-18",
    "primaryDocument": "tm2523739d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925079385/tm2523739d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-081052",
    "form": "6-K",
    "filingDate": "2025-08-21",
    "reportDate": "2025-08-21",
    "primaryDocument": "tm2524076d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925081052/tm2524076d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-081868",
    "form": "6-K",
    "filingDate": "2025-08-22",
    "reportDate": "2025-08-22",
    "primaryDocument": "tm2523970d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925081868/tm2523970d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-085652",
    "form": "6-K",
    "filingDate": "2025-08-29",
    "reportDate": "2025-08-29",
    "primaryDocument": "tm2524743d2_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925085652/tm2524743d2_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-085638",
    "form": "6-K",
    "filingDate": "2025-08-29",
    "reportDate": "2025-08-29",
    "primaryDocument": "tm2524743d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925085638/tm2524743d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-087458",
    "form": "6-K",
    "filingDate": "2025-09-04",
    "reportDate": "2025-09-04",
    "primaryDocument": "tm2525232d2_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925087458/tm2525232d2_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-087455",
    "form": "6-K",
    "filingDate": "2025-09-04",
    "reportDate": "2025-09-04",
    "primaryDocument": "tm2525232d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925087455/tm2525232d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-087790",
    "form": "6-K",
    "filingDate": "2025-09-05",
    "reportDate": "2025-09-05",
    "primaryDocument": "tm2525366d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925087790/tm2525366d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-089282",
    "form": "6-K",
    "filingDate": "2025-09-11",
    "reportDate": "2025-09-11",
    "primaryDocument": "tm2525845d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925089282/tm2525845d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-090549",
    "form": "6-K",
    "filingDate": "2025-09-17",
    "reportDate": "2025-09-17",
    "primaryDocument": "tm2526302d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925090549/tm2526302d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-093332",
    "form": "6-K",
    "filingDate": "2025-09-25",
    "reportDate": "2025-09-25",
    "primaryDocument": "tm2526956d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925093332/tm2526956d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-095828",
    "form": "6-K",
    "filingDate": "2025-10-02",
    "reportDate": "2025-10-02",
    "primaryDocument": "tm2527817d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925095828/tm2527817d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-097908",
    "form": "6-K",
    "filingDate": "2025-10-08",
    "reportDate": "2025-10-08",
    "primaryDocument": "tm2528266d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925097908/tm2528266d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-098045",
    "form": "6-K",
    "filingDate": "2025-10-09",
    "reportDate": "2025-10-09",
    "primaryDocument": "tm2528377d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925098045/tm2528377d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-104922",
    "form": "6-K",
    "filingDate": "2025-10-31",
    "reportDate": "2025-10-31",
    "primaryDocument": "tm2529713d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925104922/tm2529713d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-107713",
    "form": "6-K",
    "filingDate": "2025-11-06",
    "reportDate": "2025-11-06",
    "primaryDocument": "tm2530452d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925107713/tm2530452d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-109516",
    "form": "6-K",
    "filingDate": "2025-11-12",
    "reportDate": "2025-11-12",
    "primaryDocument": "tm2530988d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925109516/tm2530988d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-115949",
    "form": "6-K",
    "filingDate": "2025-11-25",
    "reportDate": "2025-11-25",
    "primaryDocument": "tm2532163d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925115949/tm2532163d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-117318",
    "form": "6-K",
    "filingDate": "2025-12-01",
    "reportDate": "2025-12-01",
    "primaryDocument": "tm2532433d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925117318/tm2532433d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-118451",
    "form": "6-K",
    "filingDate": "2025-12-04",
    "reportDate": "2025-12-04",
    "primaryDocument": "tm2532733d2_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925118451/tm2532733d2_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-118253",
    "form": "6-K",
    "filingDate": "2025-12-04",
    "reportDate": "2025-12-04",
    "primaryDocument": "tm2532733d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925118253/tm2532733d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-25-124386",
    "form": "6-K",
    "filingDate": "2025-12-29",
    "reportDate": "2025-12-29",
    "primaryDocument": "tm2534404d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465925124386/tm2534404d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-26-001743",
    "form": "6-K",
    "filingDate": "2026-01-07",
    "reportDate": "2026-01-07",
    "primaryDocument": "tm262379d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465926001743/tm262379d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-26-010299",
    "form": "6-K",
    "filingDate": "2026-02-04",
    "reportDate": "2026-02-04",
    "primaryDocument": "tm265080d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465926010299/tm265080d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-26-022827",
    "form": "6-K",
    "filingDate": "2026-03-03",
    "reportDate": "2026-03-03",
    "primaryDocument": "tm267849d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465926022827/tm267849d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-26-024354",
    "form": "6-K",
    "filingDate": "2026-03-06",
    "reportDate": "2026-03-06",
    "primaryDocument": "tm268212d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465926024354/tm268212d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-26-032060",
    "form": "6-K",
    "filingDate": "2026-03-19",
    "reportDate": "2026-03-19",
    "primaryDocument": "tm269353d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465926032060/tm269353d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-26-032947",
    "form": "6-K",
    "filingDate": "2026-03-23",
    "reportDate": "2026-03-23",
    "primaryDocument": "tm269576d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465926032947/tm269576d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-26-040881",
    "form": "6-K",
    "filingDate": "2026-04-08",
    "reportDate": "2026-04-08",
    "primaryDocument": "tm2611379d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465926040881/tm2611379d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-26-048546",
    "form": "6-K",
    "filingDate": "2026-04-24",
    "reportDate": "2026-04-24",
    "primaryDocument": "tm2612347d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465926048546/tm2612347d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-26-049424",
    "form": "6-K",
    "filingDate": "2026-04-27",
    "reportDate": "2026-04-27",
    "primaryDocument": "tm2612812d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465926049424/tm2612812d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-26-050679",
    "form": "6-K",
    "filingDate": "2026-04-29",
    "reportDate": "2026-04-29",
    "primaryDocument": "tm2613059d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465926050679/tm2613059d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-26-056231",
    "form": "6-K",
    "filingDate": "2026-05-06",
    "reportDate": "2026-05-06",
    "primaryDocument": "tm2613725d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465926056231/tm2613725d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-26-060229",
    "form": "6-K",
    "filingDate": "2026-05-13",
    "reportDate": "2026-05-13",
    "primaryDocument": "tm2614494d2_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465926060229/tm2614494d2_6k.htm"
  },
  {
    "accessionNumber": "0001104659-26-060224",
    "form": "6-K",
    "filingDate": "2026-05-13",
    "reportDate": "2026-05-13",
    "primaryDocument": "tm2614494d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465926060224/tm2614494d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-26-065716",
    "form": "6-K",
    "filingDate": "2026-05-22",
    "reportDate": "2026-05-22",
    "primaryDocument": "tm2615065d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465926065716/tm2615065d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-26-067190",
    "form": "6-K",
    "filingDate": "2026-05-28",
    "reportDate": "2026-05-28",
    "primaryDocument": "tm2615873d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465926067190/tm2615873d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-26-068512",
    "form": "6-K",
    "filingDate": "2026-06-01",
    "reportDate": "2026-06-01",
    "primaryDocument": "tm2616499d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465926068512/tm2616499d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-26-070103",
    "form": "6-K",
    "filingDate": "2026-06-03",
    "reportDate": "2026-06-03",
    "primaryDocument": "tm2616784d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465926070103/tm2616784d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-26-071542",
    "form": "6-K",
    "filingDate": "2026-06-09",
    "reportDate": "2026-06-09",
    "primaryDocument": "tm2617210d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465926071542/tm2617210d1_6k.htm"
  },
  {
    "accessionNumber": "0001104659-26-075717",
    "form": "6-K",
    "filingDate": "2026-06-18",
    "reportDate": "2026-06-18",
    "primaryDocument": "tm2618287d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465926075717/tm2618287d1_6k.htm"
  },
  {
    "accessionNumber": "0001193125-26-274928",
    "form": "6-K",
    "filingDate": "2026-06-18",
    "reportDate": "2026-06-18",
    "primaryDocument": "d133513d6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000119312526274928/d133513d6k.htm"
  },
  {
    "accessionNumber": "0001104659-26-078252",
    "form": "6-K",
    "filingDate": "2026-06-26",
    "reportDate": "2026-06-26",
    "primaryDocument": "tm2618550d1_6k.htm",
    "primaryDocDescription": "FORM 6-K",
    "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465926078252/tm2618550d1_6k.htm"
  }
];

export const ALIBABA_CORE_FILINGS = [
  ...ALIBABA_REGISTRATION_FILINGS,
  ...ALIBABA_ANNUAL_FILINGS,
  ...ALIBABA_SIX_K_FILINGS,
];

export const ALIBABA_LATEST_ANNUAL_FILING = ALIBABA_ANNUAL_FILINGS.filter((filing) => filing.form === "20-F").at(-1)!;
export const ALIBABA_LATEST_SIX_K_FILING = ALIBABA_SIX_K_FILINGS.at(-1)!;
