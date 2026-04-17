import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const metadata: Metadata = {
  title: "Hobite Operation Log",
  description: "Archived trading operation records from hobite.",
};

async function getOperationLogText() {
  const filePath = path.join(process.cwd(), "content", "operation-log.txt");
  return readFile(filePath, "utf8");
}

export default async function OperationLogPage() {
  const content = await getOperationLogText();

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-semibold">我的操作记录</h1>
        <p className="mt-3 text-zinc-600">
          Source archive transferred from the provided TXT document.
        </p>

        <pre className="mt-8 whitespace-pre-wrap break-words rounded-2xl border border-zinc-200 bg-white p-6 text-sm leading-7 overflow-x-auto">
          {content}
        </pre>
      </div>
    </main>
  );
}
