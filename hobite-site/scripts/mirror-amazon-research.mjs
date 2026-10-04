import { readFile, readdir, mkdir, writeFile } from "node:fs/promises";
const root = new URL(
  "../app/research/amazon-complete-fundamental-analysis/",
  import.meta.url,
);
export const mirror = new URL(
  "../../../svim-labs/project-albatross/src/content/hobiteResearch/research/amazon-complete-fundamental-analysis/",
  import.meta.url,
);
export function adapt(source) {
  let result = source
    .replace(/^import type \{ Metadata \} from ["']next["'];?\r?\n/m, "")
    .replace(/export const metadata: Metadata = \{[\s\S]*?\r?\n\};?\r?\n/, "");
  for (const [a, b] of [
    [
      "/research/amazon-complete-fundamental-analysis/zh",
      "/blog/zh-amazon-complete-fundamental-analysis",
    ],
    [
      "/research/amazon-complete-fundamental-analysis",
      "/blog/amazon-complete-fundamental-analysis",
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
if (process.argv[1]?.endsWith("mirror-amazon-research.mjs")) {
  await copy(root, mirror);
  console.log("Amazon EN/ZH data, model and views mirrored to SVIM.");
}
