import { readOperationLog } from "../source-file";

export const dynamic = "force-static";

export async function GET() {
  return new Response(await readOperationLog(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": 'attachment; filename="operation-log.txt"',
    },
  });
}
