import { readFile, readdir, mkdir, writeFile } from "node:fs/promises";
const root = new URL(
  "../app/research/tsmc-complete-fundamental-analysis/",
  import.meta.url,
);
export const mirror = new URL(
  "../../../svim-labs/project-albatross/src/content/hobiteResearch/research/tsmc-complete-fundamental-analysis/",
  import.meta.url,
);
export function adapt(source) {
  let result = source
    .replace(/^import type \{ Metadata \} from ["']next["'];?\r?\n/m, "")
    .replace(/export const metadata: Metadata = \{[\s\S]*?\r?\n\};?\r?\n/, "");
  for (const [a, b] of [
    [
      "/research/tsmc-complete-fundamental-analysis/zh",
      "/blog/zh-tsmc-complete-fundamental-analysis",
    ],
    [
      "/research/tsmc-complete-fundamental-analysis",
      "/blog/tsmc-complete-fundamental-analysis",
    ],
    ["/research", "/blog"],
  ])
    result = result.replaceAll(`href="${a}"`, `href="${b}"`);
  return result;
}
async function copy(from, to) {
  await mkdir(to, { recursive: true });
  for (const item of await readdir(from, { withFileTypes: true })) {
    if (item.isDirectory())
      await copy(new URL(`${item.name}/`, from), new URL(`${item.name}/`, to));
    else
      await writeFile(
        new URL(item.name, to),
        adapt(await readFile(new URL(item.name, from), "utf8")),
      );
  }
}
if (process.argv[1]?.endsWith("mirror-tsmc-research.mjs")) {
  await copy(root, mirror);
  console.log("TSMC EN/ZH data, model and views mirrored to SVIM.");
}
