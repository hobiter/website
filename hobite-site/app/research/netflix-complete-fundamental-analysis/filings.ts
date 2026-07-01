export type NetflixFiling = {
  accessionNumber: string;
  form: "S-1" | "S-1/A" | "10-K" | "10-K/A" | "10-Q" | "10-Q/A";
  filingDate: string;
  reportDate: string;
  primaryDocument: string;
  url: string;
};

export const NETFLIX_CIK = "0001065280";

export const NETFLIX_SEC_SUBMISSIONS_URL = "https://data.sec.gov/submissions/CIK0001065280.json";
export const NETFLIX_SEC_COMPANY_FACTS_URL = "https://data.sec.gov/api/xbrl/companyfacts/CIK0001065280.json";

export const NETFLIX_REGISTRATION_FILINGS: NetflixFiling[] = [
  {
    "accessionNumber": "0001012870-00-002191",
    "form": "S-1",
    "filingDate": "2000-04-18",
    "reportDate": "",
    "primaryDocument": "",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000101287000002191/"
  },
  {
    "accessionNumber": "0001012870-02-001044",
    "form": "S-1",
    "filingDate": "2002-03-06",
    "reportDate": "",
    "primaryDocument": "ds1.txt",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000101287002001044/ds1.txt"
  },
  {
    "accessionNumber": "0001012870-02-001324",
    "form": "S-1/A",
    "filingDate": "2002-03-20",
    "reportDate": "",
    "primaryDocument": "ds1a.txt",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000101287002001324/ds1a.txt"
  },
  {
    "accessionNumber": "0001012870-02-001807",
    "form": "S-1/A",
    "filingDate": "2002-04-16",
    "reportDate": "",
    "primaryDocument": "ds1a.txt",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000101287002001807/ds1a.txt"
  },
  {
    "accessionNumber": "0001012870-02-002125",
    "form": "S-1/A",
    "filingDate": "2002-05-07",
    "reportDate": "",
    "primaryDocument": "ds1a.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000101287002002125/ds1a.htm"
  },
  {
    "accessionNumber": "0001012870-02-002335",
    "form": "S-1/A",
    "filingDate": "2002-05-16",
    "reportDate": "",
    "primaryDocument": "ds1a.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000101287002002335/ds1a.htm"
  },
  {
    "accessionNumber": "0001012870-02-002403",
    "form": "S-1/A",
    "filingDate": "2002-05-20",
    "reportDate": "",
    "primaryDocument": "ds1a.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000101287002002403/ds1a.htm"
  }
];

export const NETFLIX_ANNUAL_FILINGS: NetflixFiling[] = [
  {
    "accessionNumber": "0000950168-03-001155",
    "form": "10-K",
    "filingDate": "2003-03-31",
    "reportDate": "2002-12-31",
    "primaryDocument": "d10k.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000095016803001155/d10k.htm"
  },
  {
    "accessionNumber": "0001193125-04-031416",
    "form": "10-K",
    "filingDate": "2004-02-27",
    "reportDate": "2003-12-31",
    "primaryDocument": "d10k.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312504031416/d10k.htm"
  },
  {
    "accessionNumber": "0001193125-05-051159",
    "form": "10-K",
    "filingDate": "2005-03-15",
    "reportDate": "2004-12-31",
    "primaryDocument": "d10k.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312505051159/d10k.htm"
  },
  {
    "accessionNumber": "0001193125-06-056663",
    "form": "10-K",
    "filingDate": "2006-03-16",
    "reportDate": "2005-12-31",
    "primaryDocument": "d10k.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312506056663/d10k.htm"
  },
  {
    "accessionNumber": "0001193125-07-042689",
    "form": "10-K",
    "filingDate": "2007-02-28",
    "reportDate": "2006-12-31",
    "primaryDocument": "d10k.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312507042689/d10k.htm"
  },
  {
    "accessionNumber": "0001193125-08-040378",
    "form": "10-K",
    "filingDate": "2008-02-28",
    "reportDate": "2007-12-31",
    "primaryDocument": "d10k.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312508040378/d10k.htm"
  },
  {
    "accessionNumber": "0001193125-09-037430",
    "form": "10-K",
    "filingDate": "2009-02-25",
    "reportDate": "2008-12-31",
    "primaryDocument": "d10k.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312509037430/d10k.htm"
  },
  {
    "accessionNumber": "0001193125-10-036181",
    "form": "10-K",
    "filingDate": "2010-02-22",
    "reportDate": "2009-12-31",
    "primaryDocument": "d10k.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312510036181/d10k.htm"
  },
  {
    "accessionNumber": "0001193125-11-040217",
    "form": "10-K",
    "filingDate": "2011-02-18",
    "reportDate": "2010-12-31",
    "primaryDocument": "d10k.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312511040217/d10k.htm"
  },
  {
    "accessionNumber": "0001193125-12-053009",
    "form": "10-K",
    "filingDate": "2012-02-10",
    "reportDate": "2011-12-31",
    "primaryDocument": "d260328d10k.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312512053009/d260328d10k.htm"
  },
  {
    "accessionNumber": "0001065280-13-000008",
    "form": "10-K",
    "filingDate": "2013-02-01",
    "reportDate": "2012-12-31",
    "primaryDocument": "nflx1231201210kdoc.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528013000008/nflx1231201210kdoc.htm"
  },
  {
    "accessionNumber": "0001065280-14-000006",
    "form": "10-K",
    "filingDate": "2014-02-03",
    "reportDate": "2013-12-31",
    "primaryDocument": "nflx10k2013.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528014000006/nflx10k2013.htm"
  },
  {
    "accessionNumber": "0001065280-15-000006",
    "form": "10-K",
    "filingDate": "2015-01-29",
    "reportDate": "2014-12-31",
    "primaryDocument": "nflx201410k.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528015000006/nflx201410k.htm"
  },
  {
    "accessionNumber": "0001065280-16-000047",
    "form": "10-K",
    "filingDate": "2016-01-28",
    "reportDate": "2015-12-31",
    "primaryDocument": "nflx201510k.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528016000047/nflx201510k.htm"
  },
  {
    "accessionNumber": "0001628280-17-000496",
    "form": "10-K",
    "filingDate": "2017-01-27",
    "reportDate": "2016-12-31",
    "primaryDocument": "nflx201610k.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000162828017000496/nflx201610k.htm"
  },
  {
    "accessionNumber": "0001065280-18-000069",
    "form": "10-K",
    "filingDate": "2018-01-29",
    "reportDate": "2017-12-31",
    "primaryDocument": "q4nflx201710k.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528018000069/q4nflx201710k.htm"
  },
  {
    "accessionNumber": "0001628280-18-000941",
    "form": "10-K/A",
    "filingDate": "2018-02-05",
    "reportDate": "2017-12-31",
    "primaryDocument": "q4nflx201710ka.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000162828018000941/q4nflx201710ka.htm"
  },
  {
    "accessionNumber": "0001065280-19-000043",
    "form": "10-K",
    "filingDate": "2019-01-29",
    "reportDate": "2018-12-31",
    "primaryDocument": "form10k_q418.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528019000043/form10k_q418.htm"
  },
  {
    "accessionNumber": "0001065280-19-000079",
    "form": "10-K/A",
    "filingDate": "2019-02-08",
    "reportDate": "2018-12-31",
    "primaryDocument": "a10ka.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528019000079/a10ka.htm"
  },
  {
    "accessionNumber": "0001065280-20-000040",
    "form": "10-K",
    "filingDate": "2020-01-29",
    "reportDate": "2019-12-31",
    "primaryDocument": "form10kq419.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528020000040/form10kq419.htm"
  },
  {
    "accessionNumber": "0001065280-21-000040",
    "form": "10-K",
    "filingDate": "2021-01-28",
    "reportDate": "2020-12-31",
    "primaryDocument": "nflx-20201231.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528021000040/nflx-20201231.htm"
  },
  {
    "accessionNumber": "0001065280-22-000036",
    "form": "10-K",
    "filingDate": "2022-01-27",
    "reportDate": "2021-12-31",
    "primaryDocument": "nflx-20211231.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528022000036/nflx-20211231.htm"
  },
  {
    "accessionNumber": "0001065280-23-000035",
    "form": "10-K",
    "filingDate": "2023-01-26",
    "reportDate": "2022-12-31",
    "primaryDocument": "nflx-20221231.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528023000035/nflx-20221231.htm"
  },
  {
    "accessionNumber": "0001065280-24-000030",
    "form": "10-K",
    "filingDate": "2024-01-26",
    "reportDate": "2023-12-31",
    "primaryDocument": "nflx-20231231.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528024000030/nflx-20231231.htm"
  },
  {
    "accessionNumber": "0001065280-25-000044",
    "form": "10-K",
    "filingDate": "2025-01-27",
    "reportDate": "2024-12-31",
    "primaryDocument": "nflx-20241231.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528025000044/nflx-20241231.htm"
  },
  {
    "accessionNumber": "0001065280-26-000034",
    "form": "10-K",
    "filingDate": "2026-01-23",
    "reportDate": "2025-12-31",
    "primaryDocument": "nflx-20251231.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528026000034/nflx-20251231.htm"
  }
];

export const NETFLIX_QUARTERLY_FILINGS: NetflixFiling[] = [
  {
    "accessionNumber": "0001012870-02-003483",
    "form": "10-Q",
    "filingDate": "2002-08-14",
    "reportDate": "2002-06-30",
    "primaryDocument": "d10q.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000101287002003483/d10q.htm"
  },
  {
    "accessionNumber": "0001021408-02-014175",
    "form": "10-Q",
    "filingDate": "2002-11-14",
    "reportDate": "2002-09-30",
    "primaryDocument": "d10q.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000102140802014175/d10q.htm"
  },
  {
    "accessionNumber": "0001012870-03-002583",
    "form": "10-Q",
    "filingDate": "2003-05-14",
    "reportDate": "2003-03-31",
    "primaryDocument": "d10q.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000101287003002583/d10q.htm"
  },
  {
    "accessionNumber": "0001193125-03-027244",
    "form": "10-Q",
    "filingDate": "2003-07-31",
    "reportDate": "2003-06-30",
    "primaryDocument": "d10q.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312503027244/d10q.htm"
  },
  {
    "accessionNumber": "0001193125-03-070952",
    "form": "10-Q",
    "filingDate": "2003-10-31",
    "reportDate": "2003-09-30",
    "primaryDocument": "d10q.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312503070952/d10q.htm"
  },
  {
    "accessionNumber": "0001193125-04-075632",
    "form": "10-Q",
    "filingDate": "2004-04-30",
    "reportDate": "2004-03-31",
    "primaryDocument": "d10q.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312504075632/d10q.htm"
  },
  {
    "accessionNumber": "0001193125-04-128377",
    "form": "10-Q",
    "filingDate": "2004-08-02",
    "reportDate": "2004-06-30",
    "primaryDocument": "d10q.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312504128377/d10q.htm"
  },
  {
    "accessionNumber": "0001193125-04-191186",
    "form": "10-Q",
    "filingDate": "2004-11-09",
    "reportDate": "2004-09-30",
    "primaryDocument": "d10q.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312504191186/d10q.htm"
  },
  {
    "accessionNumber": "0001193125-05-102632",
    "form": "10-Q",
    "filingDate": "2005-05-10",
    "reportDate": "2005-03-31",
    "primaryDocument": "d10q.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312505102632/d10q.htm"
  },
  {
    "accessionNumber": "0001193125-05-161122",
    "form": "10-Q",
    "filingDate": "2005-08-09",
    "reportDate": "2005-06-30",
    "primaryDocument": "d10q.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312505161122/d10q.htm"
  },
  {
    "accessionNumber": "0001193125-05-221711",
    "form": "10-Q",
    "filingDate": "2005-11-09",
    "reportDate": "2005-09-30",
    "primaryDocument": "d10q.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312505221711/d10q.htm"
  },
  {
    "accessionNumber": "0001193125-06-105115",
    "form": "10-Q",
    "filingDate": "2006-05-09",
    "reportDate": "2006-03-31",
    "primaryDocument": "d10q.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312506105115/d10q.htm"
  },
  {
    "accessionNumber": "0001193125-06-167595",
    "form": "10-Q",
    "filingDate": "2006-08-09",
    "reportDate": "2006-06-30",
    "primaryDocument": "d10q.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312506167595/d10q.htm"
  },
  {
    "accessionNumber": "0001193125-06-230314",
    "form": "10-Q",
    "filingDate": "2006-11-09",
    "reportDate": "2006-09-30",
    "primaryDocument": "d10q.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312506230314/d10q.htm"
  },
  {
    "accessionNumber": "0001193125-07-103250",
    "form": "10-Q",
    "filingDate": "2007-05-07",
    "reportDate": "2007-03-31",
    "primaryDocument": "d10q.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312507103250/d10q.htm"
  },
  {
    "accessionNumber": "0001193125-07-171865",
    "form": "10-Q",
    "filingDate": "2007-08-06",
    "reportDate": "2007-06-30",
    "primaryDocument": "d10q.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312507171865/d10q.htm"
  },
  {
    "accessionNumber": "0001193125-07-233664",
    "form": "10-Q",
    "filingDate": "2007-11-02",
    "reportDate": "2007-09-30",
    "primaryDocument": "d10q.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312507233664/d10q.htm"
  },
  {
    "accessionNumber": "0001193125-08-102742",
    "form": "10-Q",
    "filingDate": "2008-05-06",
    "reportDate": "2008-03-31",
    "primaryDocument": "d10q.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312508102742/d10q.htm"
  },
  {
    "accessionNumber": "0001193125-08-173275",
    "form": "10-Q",
    "filingDate": "2008-08-11",
    "reportDate": "2008-06-30",
    "primaryDocument": "d10q.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312508173275/d10q.htm"
  },
  {
    "accessionNumber": "0001193125-08-222820",
    "form": "10-Q",
    "filingDate": "2008-11-03",
    "reportDate": "2008-09-30",
    "primaryDocument": "d10q.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312508222820/d10q.htm"
  },
  {
    "accessionNumber": "0001193125-09-103685",
    "form": "10-Q",
    "filingDate": "2009-05-08",
    "reportDate": "2009-03-31",
    "primaryDocument": "d10q.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312509103685/d10q.htm"
  },
  {
    "accessionNumber": "0001193125-09-160729",
    "form": "10-Q",
    "filingDate": "2009-07-31",
    "reportDate": "2009-06-30",
    "primaryDocument": "d10q.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312509160729/d10q.htm"
  },
  {
    "accessionNumber": "0001193125-09-213071",
    "form": "10-Q",
    "filingDate": "2009-10-26",
    "reportDate": "2009-09-30",
    "primaryDocument": "d10q.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312509213071/d10q.htm"
  },
  {
    "accessionNumber": "0001193125-10-095215",
    "form": "10-Q",
    "filingDate": "2010-04-28",
    "reportDate": "2010-03-31",
    "primaryDocument": "d10q.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312510095215/d10q.htm"
  },
  {
    "accessionNumber": "0001193125-10-167382",
    "form": "10-Q",
    "filingDate": "2010-07-27",
    "reportDate": "2010-06-30",
    "primaryDocument": "d10q.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312510167382/d10q.htm"
  },
  {
    "accessionNumber": "0001193125-10-235785",
    "form": "10-Q",
    "filingDate": "2010-10-26",
    "reportDate": "2010-09-30",
    "primaryDocument": "d10q.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312510235785/d10q.htm"
  },
  {
    "accessionNumber": "0001193125-11-112061",
    "form": "10-Q",
    "filingDate": "2011-04-27",
    "reportDate": "2011-03-31",
    "primaryDocument": "d10q.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312511112061/d10q.htm"
  },
  {
    "accessionNumber": "0001193125-11-198669",
    "form": "10-Q",
    "filingDate": "2011-07-27",
    "reportDate": "2011-06-30",
    "primaryDocument": "d10q.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312511198669/d10q.htm"
  },
  {
    "accessionNumber": "0001193125-11-284366",
    "form": "10-Q",
    "filingDate": "2011-10-27",
    "reportDate": "2011-09-30",
    "primaryDocument": "d222257d10q.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312511284366/d222257d10q.htm"
  },
  {
    "accessionNumber": "0001193125-11-297992",
    "form": "10-Q/A",
    "filingDate": "2011-11-07",
    "reportDate": "2011-09-30",
    "primaryDocument": "d253810d10qa.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000119312511297992/d253810d10qa.htm"
  },
  {
    "accessionNumber": "0001445305-12-001242",
    "form": "10-Q",
    "filingDate": "2012-04-27",
    "reportDate": "2012-03-31",
    "primaryDocument": "nflx-033112x10qxdoc.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000144530512001242/nflx-033112x10qxdoc.htm"
  },
  {
    "accessionNumber": "0001065280-12-000012",
    "form": "10-Q",
    "filingDate": "2012-08-02",
    "reportDate": "2012-06-30",
    "primaryDocument": "nflx-063012x10qxdoc.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528012000012/nflx-063012x10qxdoc.htm"
  },
  {
    "accessionNumber": "0001065280-12-000020",
    "form": "10-Q",
    "filingDate": "2012-10-30",
    "reportDate": "2012-09-30",
    "primaryDocument": "nflx-093012x10qxdoc.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528012000020/nflx-093012x10qxdoc.htm"
  },
  {
    "accessionNumber": "0001065280-12-000023",
    "form": "10-Q/A",
    "filingDate": "2012-10-31",
    "reportDate": "2012-09-30",
    "primaryDocument": "nflx-093012x10qxdoc1.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528012000023/nflx-093012x10qxdoc1.htm"
  },
  {
    "accessionNumber": "0001065280-13-000020",
    "form": "10-Q",
    "filingDate": "2013-04-26",
    "reportDate": "2013-03-31",
    "primaryDocument": "nflx-033113x10qxdoc.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528013000020/nflx-033113x10qxdoc.htm"
  },
  {
    "accessionNumber": "0001065280-13-000030",
    "form": "10-Q",
    "filingDate": "2013-07-25",
    "reportDate": "2013-06-30",
    "primaryDocument": "nflx-063013x10qxdoc.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528013000030/nflx-063013x10qxdoc.htm"
  },
  {
    "accessionNumber": "0001065280-13-000036",
    "form": "10-Q",
    "filingDate": "2013-10-25",
    "reportDate": "2013-09-30",
    "primaryDocument": "nflx-09301310qdoc.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528013000036/nflx-09301310qdoc.htm"
  },
  {
    "accessionNumber": "0001065280-14-000012",
    "form": "10-Q",
    "filingDate": "2014-04-23",
    "reportDate": "2014-03-31",
    "primaryDocument": "nflx-33114x10qxdoc.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528014000012/nflx-33114x10qxdoc.htm"
  },
  {
    "accessionNumber": "0001065280-14-000021",
    "form": "10-Q",
    "filingDate": "2014-07-22",
    "reportDate": "2014-06-30",
    "primaryDocument": "nflx-63014x10qxdoc.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528014000021/nflx-63014x10qxdoc.htm"
  },
  {
    "accessionNumber": "0001065280-14-000028",
    "form": "10-Q",
    "filingDate": "2014-10-20",
    "reportDate": "2014-09-30",
    "primaryDocument": "nflx-9301410qdoc.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528014000028/nflx-9301410qdoc.htm"
  },
  {
    "accessionNumber": "0001065280-15-000017",
    "form": "10-Q",
    "filingDate": "2015-04-17",
    "reportDate": "2015-03-31",
    "primaryDocument": "nflx-033115x10qxdoc.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528015000017/nflx-033115x10qxdoc.htm"
  },
  {
    "accessionNumber": "0001065280-15-000031",
    "form": "10-Q",
    "filingDate": "2015-07-17",
    "reportDate": "2015-06-30",
    "primaryDocument": "nflx-063015x10qxdoc.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528015000031/nflx-063015x10qxdoc.htm"
  },
  {
    "accessionNumber": "0001065280-15-000038",
    "form": "10-Q",
    "filingDate": "2015-10-16",
    "reportDate": "2015-09-30",
    "primaryDocument": "nflx-093015x10qxdoc.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528015000038/nflx-093015x10qxdoc.htm"
  },
  {
    "accessionNumber": "0001065280-16-000057",
    "form": "10-Q",
    "filingDate": "2016-04-20",
    "reportDate": "2016-03-31",
    "primaryDocument": "nflx-33116x10qxdoc.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528016000057/nflx-33116x10qxdoc.htm"
  },
  {
    "accessionNumber": "0001065280-16-000072",
    "form": "10-Q",
    "filingDate": "2016-07-19",
    "reportDate": "2016-06-30",
    "primaryDocument": "nflx-63016x10qxdoc.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528016000072/nflx-63016x10qxdoc.htm"
  },
  {
    "accessionNumber": "0001065280-16-000081",
    "form": "10-Q",
    "filingDate": "2016-10-20",
    "reportDate": "2016-09-30",
    "primaryDocument": "nflx-93016x10qxdoc.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528016000081/nflx-93016x10qxdoc.htm"
  },
  {
    "accessionNumber": "0001628280-17-003939",
    "form": "10-Q",
    "filingDate": "2017-04-20",
    "reportDate": "2017-03-31",
    "primaryDocument": "nflx-033117x10qxdoc.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000162828017003939/nflx-033117x10qxdoc.htm"
  },
  {
    "accessionNumber": "0001065280-17-000046",
    "form": "10-Q",
    "filingDate": "2017-07-19",
    "reportDate": "2017-06-30",
    "primaryDocument": "nflx-063017x10qxdoc.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528017000046/nflx-063017x10qxdoc.htm"
  },
  {
    "accessionNumber": "0001065280-17-000180",
    "form": "10-Q",
    "filingDate": "2017-10-18",
    "reportDate": "2017-09-30",
    "primaryDocument": "nflx-093017x10qxdoc.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528017000180/nflx-093017x10qxdoc.htm"
  },
  {
    "accessionNumber": "0001065280-18-000205",
    "form": "10-Q",
    "filingDate": "2018-04-18",
    "reportDate": "2018-03-31",
    "primaryDocument": "nflx-033118x10qxdoc.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528018000205/nflx-033118x10qxdoc.htm"
  },
  {
    "accessionNumber": "0001065280-18-000360",
    "form": "10-Q",
    "filingDate": "2018-07-18",
    "reportDate": "2018-06-30",
    "primaryDocument": "nflx-063018x10qxdoc.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528018000360/nflx-063018x10qxdoc.htm"
  },
  {
    "accessionNumber": "0001065280-18-000538",
    "form": "10-Q",
    "filingDate": "2018-10-18",
    "reportDate": "2018-09-30",
    "primaryDocument": "nflx-093018x10qxdoc.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528018000538/nflx-093018x10qxdoc.htm"
  },
  {
    "accessionNumber": "0001065280-19-000157",
    "form": "10-Q",
    "filingDate": "2019-04-18",
    "reportDate": "2019-03-31",
    "primaryDocument": "form10q_q119.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528019000157/form10q_q119.htm"
  },
  {
    "accessionNumber": "0001065280-19-000260",
    "form": "10-Q",
    "filingDate": "2019-07-19",
    "reportDate": "2019-06-30",
    "primaryDocument": "form10qq219.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528019000260/form10qq219.htm"
  },
  {
    "accessionNumber": "0001065280-19-000368",
    "form": "10-Q",
    "filingDate": "2019-10-18",
    "reportDate": "2019-09-30",
    "primaryDocument": "form10qq319.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528019000368/form10qq319.htm"
  },
  {
    "accessionNumber": "0001065280-20-000155",
    "form": "10-Q",
    "filingDate": "2020-04-21",
    "reportDate": "2020-03-31",
    "primaryDocument": "form10qq120.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528020000155/form10qq120.htm"
  },
  {
    "accessionNumber": "0001065280-20-000309",
    "form": "10-Q",
    "filingDate": "2020-07-20",
    "reportDate": "2020-06-30",
    "primaryDocument": "form10qq220.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528020000309/form10qq220.htm"
  },
  {
    "accessionNumber": "0001065280-20-000451",
    "form": "10-Q",
    "filingDate": "2020-10-22",
    "reportDate": "2020-09-30",
    "primaryDocument": "form10qq320.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528020000451/form10qq320.htm"
  },
  {
    "accessionNumber": "0001065280-21-000144",
    "form": "10-Q",
    "filingDate": "2021-04-22",
    "reportDate": "2021-03-31",
    "primaryDocument": "nflx-20210331.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528021000144/nflx-20210331.htm"
  },
  {
    "accessionNumber": "0001065280-21-000250",
    "form": "10-Q",
    "filingDate": "2021-07-22",
    "reportDate": "2021-06-30",
    "primaryDocument": "nflx-20210630.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528021000250/nflx-20210630.htm"
  },
  {
    "accessionNumber": "0001065280-21-000363",
    "form": "10-Q",
    "filingDate": "2021-10-21",
    "reportDate": "2021-09-30",
    "primaryDocument": "nflx-20210930.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528021000363/nflx-20210930.htm"
  },
  {
    "accessionNumber": "0001065280-22-000145",
    "form": "10-Q",
    "filingDate": "2022-04-21",
    "reportDate": "2022-03-31",
    "primaryDocument": "nflx-20220331.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528022000145/nflx-20220331.htm"
  },
  {
    "accessionNumber": "0001065280-22-000257",
    "form": "10-Q",
    "filingDate": "2022-07-21",
    "reportDate": "2022-06-30",
    "primaryDocument": "nflx-20220630.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528022000257/nflx-20220630.htm"
  },
  {
    "accessionNumber": "0001065280-22-000368",
    "form": "10-Q",
    "filingDate": "2022-10-20",
    "reportDate": "2022-09-30",
    "primaryDocument": "nflx-20220930.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528022000368/nflx-20220930.htm"
  },
  {
    "accessionNumber": "0001065280-23-000120",
    "form": "10-Q",
    "filingDate": "2023-04-21",
    "reportDate": "2023-03-31",
    "primaryDocument": "nflx-20230331.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528023000120/nflx-20230331.htm"
  },
  {
    "accessionNumber": "0001065280-23-000198",
    "form": "10-Q",
    "filingDate": "2023-07-21",
    "reportDate": "2023-06-30",
    "primaryDocument": "nflx-20230630.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528023000198/nflx-20230630.htm"
  },
  {
    "accessionNumber": "0001065280-23-000273",
    "form": "10-Q",
    "filingDate": "2023-10-20",
    "reportDate": "2023-09-30",
    "primaryDocument": "nflx-20230930.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528023000273/nflx-20230930.htm"
  },
  {
    "accessionNumber": "0001065280-24-000128",
    "form": "10-Q",
    "filingDate": "2024-04-22",
    "reportDate": "2024-03-31",
    "primaryDocument": "nflx-20240331.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528024000128/nflx-20240331.htm"
  },
  {
    "accessionNumber": "0001065280-24-000200",
    "form": "10-Q",
    "filingDate": "2024-07-19",
    "reportDate": "2024-06-30",
    "primaryDocument": "nflx-20240630.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528024000200/nflx-20240630.htm"
  },
  {
    "accessionNumber": "0001065280-24-000287",
    "form": "10-Q",
    "filingDate": "2024-10-18",
    "reportDate": "2024-09-30",
    "primaryDocument": "nflx-20240930.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528024000287/nflx-20240930.htm"
  },
  {
    "accessionNumber": "0001065280-25-000176",
    "form": "10-Q",
    "filingDate": "2025-04-18",
    "reportDate": "2025-03-31",
    "primaryDocument": "nflx-20250331.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528025000176/nflx-20250331.htm"
  },
  {
    "accessionNumber": "0001065280-25-000323",
    "form": "10-Q",
    "filingDate": "2025-07-18",
    "reportDate": "2025-06-30",
    "primaryDocument": "nflx-20250630.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528025000323/nflx-20250630.htm"
  },
  {
    "accessionNumber": "0001065280-25-000406",
    "form": "10-Q",
    "filingDate": "2025-10-22",
    "reportDate": "2025-09-30",
    "primaryDocument": "nflx-20250930.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528025000406/nflx-20250930.htm"
  },
  {
    "accessionNumber": "0001065280-26-000138",
    "form": "10-Q",
    "filingDate": "2026-04-17",
    "reportDate": "2026-03-31",
    "primaryDocument": "nflx-20260331.htm",
    "url": "https://www.sec.gov/Archives/edgar/data/1065280/000106528026000138/nflx-20260331.htm"
  }
];

export const NETFLIX_CORE_FILINGS = [
  ...NETFLIX_REGISTRATION_FILINGS,
  ...NETFLIX_ANNUAL_FILINGS,
  ...NETFLIX_QUARTERLY_FILINGS,
];

export const NETFLIX_LATEST_ANNUAL_FILING = NETFLIX_ANNUAL_FILINGS[NETFLIX_ANNUAL_FILINGS.length - 1];
export const NETFLIX_LATEST_QUARTERLY_FILING = NETFLIX_QUARTERLY_FILINGS[NETFLIX_QUARTERLY_FILINGS.length - 1];
