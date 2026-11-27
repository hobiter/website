"""Extract filed TSMC statements and issuer ASML/Arm workbooks."""
from concurrent.futures import ThreadPoolExecutor
from datetime import date, datetime
from io import BytesIO
from pathlib import Path
from urllib.parse import urljoin
import calendar
import json
import re
import subprocess

from lxml import html
from openpyxl import load_workbook


ASML = "https://www.investor.asml.com"
ARM = "https://investors.arm.com"
SEC = "https://www.sec.gov/Archives/edgar/data/1046179/"


def load(url):
    js = """async function run(){for(let n=0;n<3;n++){const url=process.argv[1];const r=await fetch(url,url.includes('data.sec.gov')?{headers:{'User-Agent':'Hobite Capital research@hobite.capital'}}:{});if(r.ok){process.stdout.write(Buffer.from(await r.arrayBuffer()));return}if(r.status!==429&&r.status<500)throw Error(r.status+' '+r.url);await new Promise(x=>setTimeout(x,750))}throw Error(process.argv[1])}run().catch(e=>{console.error(e);process.exitCode=1})"""
    return subprocess.check_output(["node", "-e", js, url], timeout=40)


def evidence(value, url, tag, basis="reported", other=None):
    return {"value": round(value, 4), "basis": basis, "links": list(dict.fromkeys([url] + ([other] if other else []))), "tag": tag}


def sheets(url):
    w = load_workbook(BytesIO(load(url)), read_only=True, data_only=True)
    try:
        return {s.title: list(s.values) for s in w}
    finally:
        w.close()


def label(rows, col, pattern):
    return next(row for row in rows if re.search(pattern, str(row[col] or ""), re.I))


def asml_workbook(url):
    book = sheets(url)
    ops = next(v for k, v in book.items() if "operations" in k.lower())
    cf = next(v for k, v in book.items() if "cash flow" in k.lower())
    def dates(rows):
        for i,r in enumerate(rows[:12]):
            if any(isinstance(c, datetime) for c in r):
                return r
            if any(re.fullmatch(r"[A-Za-z]{3,9} \d{1,2},",str(c)) for c in r):
                return tuple(datetime.strptime(f"{c[:3]} {c.split()[1]} {y}","%b %d, %Y") if re.fullmatch(r"[A-Za-z]{3,9} \d{1,2},",str(c)) and isinstance(y,int) else None
                             for c,y in zip(r,rows[i+1]))
        raise ValueError(url)
    period = dates(ops)
    cash_period = dates(cf)
    rev = label(ops, 0, r"^Total net sales")
    eps = label(ops, 0, r"^Diluted net income per ordinary share")
    cash = label(cf, 0, r"^Net cash .*operating activities")
    capex = label(cf, 0, r"^Purchase of property, plant and equipment")
    rows = []
    for i, d in enumerate(period):
        if not isinstance(d, datetime) or d.year < 2021 or d not in cash_period:
            continue
        j = cash_period.index(d)
        if (not all(isinstance(v, (int, float)) for v in (rev[i], eps[i], cash[j], capex[j]))
                or not 100<=rev[i]<50000 or abs(eps[i])>=100 or abs(cash[j])>=50000 or abs(capex[j])>=10000):
            continue
        rows.append({"end": d.date().isoformat(), "fiscalYear": d.year, "quarter": round(d.month / 3),
                     "revenue": evidence(rev[i]*1e6,url,rev[0]), "eps": evidence(eps[i],url,eps[0]),
                     "cash": evidence(cash[j]*1e6,url,cash[0]), "capex": evidence(abs(capex[j])*1e6,url,capex[0])})
    return rows


def asml():
    archive = html.fromstring(load(ASML + "/quarterly-results"))
    links = [urljoin(ASML, a.get("href")) for a in archive.xpath("//a[contains(@href,'/static-files/')]")
             if "excel" in a.text_content().lower() and ("us gaap" in a.text_content().lower() or "us-gaap" in (a.get("title") or "").lower())]
    # Each workbook includes prior quarters, so sampling overlapping packs covers the entire period.
    with ThreadPoolExecutor(max_workers=4) as pool:
        groups = list(pool.map(asml_workbook, links))
    rows = {}
    for group in reversed(groups):
        rows.update({(r["fiscalYear"],r["quarter"]): r for r in group})
    return sorted(rows.values(), key=lambda r: r["end"])[-24:]


def arm():
    old = ARM + "/static-files/4de417b7-2ea6-4f60-a1ce-13477d3b28b3"
    tree = html.fromstring(load(ARM+"/financials/quarterly-annual-results"))
    links = [urljoin(ARM,a.get("href")) for a in tree.xpath("//a[contains(@type,'spreadsheetml')]")][:6]
    rows = {}
    for url in [old, *reversed(links)]:
        book = sheets(url)
        if "IS" not in book or "CF" not in book:
            continue
        ops, cf = book["IS"], book["CF"]
        period = next(r for r in ops if sum(isinstance(c,datetime) for c in r)>2)
        cperiod = next(r for r in cf if sum(isinstance(c,datetime) for c in r)>2)
        rev = label(ops,1,r"^Total revenue")
        eps = label(ops,1,r"^Diluted\s*$")
        cash = label(cf,1,r"^Net cash provided .*operating activities")
        capex = label(cf,1,r"^Purchases of property and equipment")
        headers=ops[ops.index(period)-1]
        current=set()
        for i,d in enumerate(period):
            if not isinstance(d,datetime) or d not in cperiod or not isinstance(rev[i],(int,float)) or rev[i]<=0 or not re.fullmatch(r"Q[1-4]",str(headers[i]).strip(),re.I) or d in current:
                continue
            current.add(d)
            cash_headers=cf[cf.index(cperiod)-1]
            j=next((k for k,v in enumerate(cperiod) if v==d and str(cash_headers[k]).strip()==str(headers[i]).strip()),None)
            if j is None:
                continue
            r={"end":d.date().isoformat(),"fiscalYear":d.year+(d.month>3),"quarter":(d.month//3+2)%4+1}
            for field, val, tag in [("revenue",rev[i],rev[1]),("eps",eps[i],eps[1]),("cash",cash[j],cash[1]),("capex",capex[j],capex[1])]:
                if isinstance(val,(int,float)) or (isinstance(val,str) and re.fullmatch(r"-?\d+(\.\d+)?", val.strip())):
                    v = float(val)
                    r[field]=evidence(abs(v)*1e6 if field=="capex" else v if field=="eps" else v*1e6,url,tag)
            rows[r["end"]]=r
    return list(rows.values())


def all_rows(tree):
    for row in tree.xpath("//tr"):
        yield [" ".join(cell.text_content().split()) for cell in row.xpath("./td")]


def statement_value(rows, pattern):
    for row in rows:
        if not row or not re.match(pattern,row[0],re.I):
            continue
        for value in row[1:]:
            cleaned = value.replace(",","").replace("$","").replace(" ","").strip()
            if re.fullmatch(r"[-(]?\d+(\.\d+)?\)?", cleaned):
                return float(cleaned.replace("(","-").rstrip(")"))
    raise ValueError(pattern)


def tsm_statement(task):
    key, url = task
    tree = html.fromstring(load(url))
    for row in tree.xpath("//tr"):
        s = " ".join(row.text_content().lower().split())
        links = row.xpath(".//a[@href]")
        if links and s.startswith("99.1") and "consolidated financial statements" in s:
            exhibit = urljoin(url,links[0].get("href"))
            break
    else:
        return key, None
    rows=list(all_rows(html.fromstring(load(exhibit))))
    try:
        rev=statement_value(rows,r"^Net revenue(?:\s|$)")
        eps=statement_value(rows,r"^Diluted (?:earnings per share|EPS)(?:\s|$)")
        cash_label=r"^Net cash (?:generated by|provided by|from) operating activities"
        cash_index=next(i for i,row in enumerate(rows) if row and re.match(cash_label,row[0],re.I))
        cash=statement_value(rows[cash_index:],cash_label)
        capex=statement_value(rows[cash_index+1:cash_index+45],r"^(?:(?:acquisitions?|purchases?) of\s+|payments for\s+)?property, plant and equipment")
    except ValueError as exc:
        print("TSM unmatched",key,exhibit,exc,flush=True)
        return key,None
    if rev<1e8 or abs(capex)<1e7 or abs(cash)<1e7 or not 0<eps<500:
        raise ValueError((key,exhibit,rev,eps,cash,capex))
    return key,(rev*1000,eps,cash*1000,abs(capex)*1000,exhibit)


def tsm():
    filings=json.loads(load("https://data.sec.gov/submissions/CIK0001046179.json"))["filings"]["recent"]
    slots={}
    month_to_quarter={2:4,5:1,8:2,11:3}
    for dt,form,accn,doc in zip(filings["filingDate"],filings["form"],filings["accessionNumber"],filings["primaryDocument"]):
        d=date.fromisoformat(dt)
        if not "2021-11-01"<=dt<="2026-11-27" or not form.startswith("6-K") or d.month not in month_to_quarter:
            continue
        q=month_to_quarter[d.month]
        if not re.search(r"tsm-fsx|tsm-6k_",doc,re.I):
            continue
        year=d.year-(q==4)
        if not ("tsm-fsx" in doc or 11<=d.day<=28):
            continue
        slots.setdefault((year,q),[]).append(SEC+accn.replace("-","")+"/"+doc)
    def pick(pair):
        key,urls=pair
        for url in urls:
            try:
                _,r=tsm_statement((key,url))
                if r:
                    return key,r
            except subprocess.CalledProcessError:
                continue
        return key,None
    with ThreadPoolExecutor(max_workers=3) as pool:
        statements={k:v for k,v in pool.map(pick,sorted(slots.items())) if v}
    rows=[]
    for (year,q),(rev,eps,cash,capex,url) in sorted(statements.items()):
        prev=statements.get((year,q-1))
        mo=q*3
        r={"end":date(year,mo,calendar.monthrange(year,mo)[1]).isoformat(),"fiscalYear":year,"quarter":q}
        if q!=4:
            r.update(revenue=evidence(rev,url,"Net revenue"),eps=evidence(eps,url,"Diluted earnings per share"))
        if q==1 or prev:
            for key,n,val in [("cash",2,cash),("capex",3,capex)]:
                r[key]=evidence(val-(prev[n] if prev else 0),url,key,"ytd-difference" if prev else "reported",prev[4] if prev else None)
        if q==4 and prev:
            # Income statement reports full-year sales at Q4; Q3 YTD sales are a separate column.
            prior=list(all_rows(html.fromstring(load(prev[4]))))
            line=next(x for x in prior if x and re.match(r"^net revenue",x[0],re.I))
            totals=[int(v.replace(",","").replace("$","").strip()) for v in line[1:] if re.fullmatch(r"\$?\s?\d{1,3}(,\d{3}){2,}",v)]
            if len(totals)>=4:
                r["revenue"]=evidence(rev-totals[2]*1000,url,"FY revenue minus nine months","ytd-difference",prev[4])
        if "revenue" in r:
            rows.append(r)
    return rows


if __name__=="__main__":
    import sys
    out=Path(__file__).resolve().parents[1]/"app/research/_chip-trends/issuerQuarters.json"
    data=json.loads(out.read_text(encoding="utf-8")) if out.exists() else {}
    for name, source in [("ASML",asml),("ARM",arm),("TSM",tsm)]:
        if len(sys.argv)>1 and name not in sys.argv[1:]:
            continue
        data[name]=source()
        print(name,len(data[name]),[(r["end"],r["quarter"],list(r)[3:]) for r in data[name]],flush=True)
        out.write_text(json.dumps(data,indent=2,ensure_ascii=True)+"\n",encoding="utf-8")
