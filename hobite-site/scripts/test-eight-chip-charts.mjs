import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { setTimeout } from "node:timers/promises";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.CHIP_PLAYWRIGHT || "playwright");
const port = process.env.CHIP_TEST_PORT || "3875";
const url = "http://127.0.0.1:" + port;
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next","start","-p",port], {stdio:"ignore",windowsHide:true});
let browser;
try {
  for(let attempt=0;attempt<40;attempt++){
    try { if ((await fetch(url+"/research")).ok) break; } catch {}
    if(attempt===39) throw new Error("Next preview did not start");
    await setTimeout(250);
  }
  browser = await chromium.launch({executablePath:process.env.CHIP_CHROME,headless:true});
  for(const width of [390,1440]){
    const page=await browser.newPage({viewport:{width,height:900}});
    for(const [slug,lang] of [["nvidia",""],["arm","/zh"]]){
      await page.goto(url+"/research/"+slug+"-complete-fundamental-analysis"+lang);
      const charts=page.locator("[data-financial-trends]");
      assert.equal(await charts.locator("svg:visible").count(),6);
      await charts.locator("summary").first().click();
      assert.equal(await charts.locator("details[open]").count(),1);
      const quarterly = charts.locator("section[aria-labelledby='quarterly-history']");
      await quarterly.locator("summary").click();
      assert.ok(await quarterly.locator("tbody tr").count() >= (slug==="arm" ? 19 : 20));
      assert.ok(await quarterly.locator("tbody a").first().isVisible());
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
      if(overflow>1) console.log(await page.evaluate(()=>[...document.querySelectorAll("main, section, figure, table")].filter(el=>el.getBoundingClientRect().right>innerWidth+1).map(el=>[el.tagName,el.className,el.getBoundingClientRect().right]).slice(0,12)));
      assert.ok(overflow<=1,`${width} ${slug}: page overflow by ${overflow}px`);
      if(process.env.CHIP_SCREENSHOT && width===1440 && slug==="nvidia"){
        await charts.locator("figure").first().screenshot({path:process.env.CHIP_SCREENSHOT});
      }
      console.log(width,slug,lang||"en","passed");
    }
    await page.close();
  }
} finally {
  await browser?.close();
  server.kill();
}
