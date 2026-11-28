import type { Metadata } from "next";
import { parseArchive } from "./archive";
import { OperationThread } from "./operation-thread";
import { readOperationLog } from "./source-file";

export const metadata: Metadata = {
  title: "我的操作记录 · 旧帖存档",
  description: "Hobite 的历史操作记录与未名空间原帖讨论，按日期和楼层浏览。",
};

export default async function OperationLogPage() {
  const entries = parseArchive(await readOperationLog());
  return <OperationThread entries={entries} />;
}
