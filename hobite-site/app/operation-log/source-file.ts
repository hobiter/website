import { readFile } from "node:fs/promises";
import path from "node:path";

export function readOperationLog() {
  return readFile(path.join(process.cwd(), "content", "operation-log.txt"), "utf8");
}
