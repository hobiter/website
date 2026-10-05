import { readFile, mkdir, writeFile } from "node:fs/promises";
import { files } from "./mirror-ai-value-chain-research.mjs";

export const sourceRoot = new URL("../app/research/", import.meta.url);
export const mirrorRoot = new URL("../../../svim-labs/project-albatross/src/content/hobiteResearch/research/", import.meta.url);
export const folders = ["_ai-size-research", "ai-mid-cap-investment-outlook", "ai-small-cap-investment-outlook"];
export function adapt(source) {
  return source.replace(/^import type \{ Metadata \} from ["']next["'];?\r?\n/m, "")
    .replace(/export const metadata: Metadata = \{[\s\S]*?\r?\n\};?\r?\n/, "")
    .replaceAll('href="/research"', 'href="/blog"')
    .replaceAll('`/research/${slug}/zh`', '`/research/zh-${slug}`');
}
if (process.argv[1]?.endsWith("mirror-ai-size-research.mjs")) {
  for (const folder of folders) for (const file of await files(new URL(`${folder}/`, sourceRoot))) {
    const path = `${folder}/${file}`;
    const target = new URL(path, mirrorRoot);
    await mkdir(new URL(".", target), { recursive: true });
    await writeFile(target, adapt(await readFile(new URL(path,sourceRoot), "utf8")));
  }
  console.log("Both AI size articles and translations mirrored to SVIM.");
}
