import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { setTimeout } from "node:timers/promises";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.CHIP_PLAYWRIGHT || "playwright");
const port = process.env.HOME_TEST_PORT || "3876";
const origin = "http://127.0.0.1:" + port;
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next","start","-p",port], {stdio:"ignore",windowsHide:true});
let browser;
try {
  for(let i=0;i<40;i++){
    try { if((await fetch(origin)).ok) break; } catch {}
    if(i===39) throw Error("Production preview did not start");
    await setTimeout(250);
  }
  browser = await chromium.launch({executablePath:process.env.CHIP_CHROME,headless:true});
  for(const width of [320,390,960,1440]){
    const page = await browser.newPage({viewport:{width,height:900},colorScheme:"light"});
    const errors=[];
    page.on("pageerror",e=>errors.push(page.url()+": "+e.message));
    await page.goto(origin);
    await page.getByRole("heading",{name:"Hobite Research",exact:true}).waitFor();
    const tiles = page.locator(".desk-tile");
    assert.equal(await tiles.count(),8);
    assert.equal(await tiles.first().getAttribute("href"),"/research/asml-complete-fundamental-analysis");
    assert.equal(await page.locator(".research-desk a a").count(),0);
    assert.equal(await page.getByRole("combobox",{name:"Theme"}).inputValue(),"system");
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`overflow at ${width}`);
    await page.getByRole("combobox",{name:"Theme"}).selectOption("dark");
    await page.waitForFunction(()=>getComputedStyle(document.querySelector(".research-desk")).backgroundColor==="rgb(23, 28, 30)");
    await page.getByRole("combobox",{name:"Language"}).selectOption("zh");
    await page.getByRole("heading",{name:"Hobite 投资研究",exact:true}).waitFor();
    assert.equal(await tiles.first().getAttribute("href"),"/research/asml-complete-fundamental-analysis/zh");
    assert.ok(await page.getByText("· English only",{exact:true}).count()>0);
    await page.reload();
    await page.getByRole("heading",{name:"Hobite 投资研究",exact:true}).waitFor();
    assert.equal(await page.getByRole("combobox",{name:"外观"}).inputValue(),"dark");
    assert.equal(await page.locator("html").getAttribute("lang"),"zh-CN");
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`Chinese overflow at ${width}`);
    if (process.env.HOME_SCREENSHOTS && [390,1440].includes(width))
      await page.screenshot({path:`${process.env.HOME_SCREENSHOTS}/hobite-home-${width}.png`});
    const [destination] = await Promise.all([
      page.waitForRequest("**/research/asml-complete-fundamental-analysis/zh"),
      tiles.first().locator(".desk-arrow").click({noWaitAfter:true}),
    ]);
    assert.ok(destination.isNavigationRequest());
    assert.deepEqual(errors,[]);
    await page.goto(origin+"/research");
    await page.getByRole("heading",{name:"Research Library",exact:true}).waitFor();
    assert.equal(await page.getByRole("combobox",{name:"外观"}).count(),0);
    await page.goto(origin);
    await page.getByRole("combobox",{name:"外观"}).selectOption("system");
    await page.emulateMedia({colorScheme:"dark"});
    await page.waitForFunction(()=>getComputedStyle(document.querySelector(".research-desk")).backgroundColor==="rgb(23, 28, 30)");
    await page.getByRole("combobox",{name:"外观"}).selectOption("light");
    await page.waitForFunction(()=>getComputedStyle(document.querySelector(".research-desk")).backgroundColor==="rgb(244, 246, 247)");
    await page.getByRole("combobox",{name:"外观"}).selectOption("system");
    await page.emulateMedia({colorScheme:"light"});
    await page.waitForFunction(()=>getComputedStyle(document.querySelector(".research-desk")).backgroundColor==="rgb(244, 246, 247)");
    assert.deepEqual(errors,[]);
    await page.close();
    console.log(width,"px: language, click targets, theme, reload, and width passed");
  }
} finally {
  await browser?.close();
  server.kill();
}
