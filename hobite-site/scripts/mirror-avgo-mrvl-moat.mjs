import { readFile, mkdir, writeFile } from "node:fs/promises";

export const slug = "broadcom-marvell-ai-semiconductor-moat";
export const root = new URL(`../app/research/${slug}/`, import.meta.url);
export const mirror = new URL(`../../../svim-labs/project-albatross/src/content/hobiteResearch/research/${slug}/`, import.meta.url);
export const names = ["data.ts", "MoatView.tsx", "page.tsx", "zh/page.tsx"];
export function adapt(text) {
  return text
    .replace(/^import type \{ Metadata \} from "next";\r?\n/m, "")
    .replace(/^export const metadata: Metadata = .*;\r?\n/m, "")
    .replace(/^import \{ title, description \} from "\.\.?\/data";\r?\n/m, "")
    .replaceAll(`href="/research/${slug}/zh"`, `href="/research/zh-${slug}"`)
    .replaceAll('href="/research/broadcom-complete-fundamental-analysis/zh"', 'href="/research/zh-broadcom-complete-fundamental-analysis"');
}
if (process.argv[1]?.endsWith("mirror-avgo-mrvl-moat.mjs")) {
  for (const name of names) {
    const dest = new URL(name, mirror);
    await mkdir(new URL(".", dest), { recursive: true });
    await writeFile(dest, adapt(await readFile(new URL(name, root), "utf8")));
  }
  console.log("AVGO / MRVL moat EN/ZH mirrored into SVIM");
}
