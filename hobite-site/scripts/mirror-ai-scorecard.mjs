import { readFile, mkdir, writeFile } from "node:fs/promises";

export const slug = "ai-weekly-scorecard-2026-10-16";
export const root = new URL(`../app/research/${slug}/`, import.meta.url);
export const mirror = new URL(`../../../svim-labs/project-albatross/src/content/hobiteResearch/research/${slug}/`, import.meta.url);
export const names = ["data.ts", "ScorecardView.tsx", "page.tsx", "zh/page.tsx"];
export function adapt(text) {
  return text
    .replace(/^import type \{ Metadata \} from "next";\r?\n/m, "")
    .replace(/^export const metadata: Metadata = .*;\r?\n/m, "")
    .replace(/^import \{ title, description \} from "\.\.?\/data";\r?\n/m, "")
    .replaceAll(`href="/research/${slug}/zh"`, `href="/research/zh-${slug}"`)
    .replaceAll('href="/research/rocket-lab-complete-fundamental-analysis/zh"', 'href="/research/zh-rocket-lab-complete-fundamental-analysis"');
}
if (process.argv[1]?.endsWith("mirror-ai-scorecard.mjs")) {
  for (const name of names) {
    const dest = new URL(name, mirror);
    await mkdir(new URL(".", dest), { recursive: true });
    await writeFile(dest, adapt(await readFile(new URL(name, root), "utf8")));
  }
  console.log("AI scorecard EN/ZH mirrored into SVIM");
}
