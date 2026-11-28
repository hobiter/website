import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { setTimeout } from "node:timers/promises";
import { parseArchive } from "../app/operation-log/archive.ts";

const raw = await readFile(new URL("../content/operation-log.txt",import.meta.url),"utf8");
const entries = parseArchive(raw);
const replies = entries.filter(x=>x.kind==="reply");
assert.deepEqual(replies.map(x=>x.floor),Array.from({length:312},(_,i)=>i+2));
const times = Array.from(raw.matchAll(/((?:大约|接近|超过)\s+\d+\s*年)\s+(\d+)\s*楼/g),m=>[Number(m[2]),m[1]]);
assert.deepEqual(replies.map(x=>[x.floor,x.archivedTime]),times);
assert.equal(new Set(entries.map(x=>x.id)).size,entries.length);
assert.ok(entries[0].lines.includes("Sold out GILD @72"));
assert.ok(replies.find(x=>x.floor===91).lines.includes("握紧这三个和JD"));
assert.ok(replies.find(x=>x.floor===229).lines.includes("今天倒腾了点option，daily gain 5%"));
assert.ok(entries.some(x=>x.lines.some(s=>s.startsWith("If BIDU drop deep"))));
assert.ok(entries.every(x=>x.lines.every(s=>!s.includes("看帖神器"))));
console.log("Original content, IDs, and all 312 numbered replies verified");

if(process.argv.includes("--browser")){
  const require=createRequire(import.meta.url);
  const {chromium}=require(process.env.CHIP_PLAYWRIGHT||"playwright");
  const port=process.env.OPERATION_LOG_TEST_PORT||"3879";
  const origin="http://127.0.0.1:"+port;
  const url=origin+"/operation-log";
  const server=spawn(process.execPath,["node_modules/next/dist/bin/next","start","-p",port],{stdio:"ignore",windowsHide:true});
  let browser;
  try{
    let response;
    for(let i=0;i<40;i++){
      try{response=await fetch(url+"/source");if(response.ok)break;}catch{}
      await setTimeout(250);
    }
    assert.ok(response?.ok);
    const download=Buffer.from(await response.arrayBuffer());
    assert.ok(download.equals(Buffer.from(raw)), "The download must match the original archive bytes");
    browser=await chromium.launch({headless:true,executablePath:process.env.CHIP_CHROME});
    for(const width of [390,1440]){
      const page=await browser.newPage({viewport:{width,height:900}});
      const errors=[];
      page.on("pageerror",e=>errors.push(e.message));
      await page.goto(url);
      await page.getByRole("heading",{name:"我的操作记录",exact:true}).waitFor();
      const cards=page.locator("main ol > li");
      assert.equal(await cards.count(),24);
      await page.getByRole("button",{name:"加载更多记录"}).click();
      await cards.nth(47).waitFor();
      await page.getByRole("searchbox").fill("Sold out GILD @72");
      await page.getByText("已显示 2 / 2 条",{exact:true}).waitFor();
      await page.getByRole("searchbox").fill("");
      await page.getByRole("button",{name:"只看回帖"}).click();
      await page.getByRole("combobox",{name:"排序"}).selectOption("reverse");
      await page.locator("#reply-313").waitFor();
      assert.equal(await cards.first().getAttribute("id"),"reply-313");
      assert.equal(await cards.first().locator("[data-archived-time]").textContent(),"接近 7 年");
      await page.getByRole("button",{name:"只看楼主"}).click();
      assert.equal(await cards.first().locator("header").getByText("hobite",{exact:true}).count(),1);
      await page.goto(url+"#reply-229");
      await page.locator("#reply-229").waitFor();
      assert.equal(await page.locator("#reply-229 [data-archived-time]").textContent(),"接近 7 年");
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
      assert.deepEqual(errors,[]);
      if(process.env.OPERATION_LOG_SCREENSHOTS){
        await page.goto(url);
        await page.screenshot({path:`${process.env.OPERATION_LOG_SCREENSHOTS}/operation-log-${width}.png`});
      }
      await page.close();
      console.log(width,"px: search, filters, paging, deep link, and width verified");
    }
  }finally{
    await browser?.close();
    server.kill();
  }
}
