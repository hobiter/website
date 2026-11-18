import type { Metadata } from "next";
import ReportView from "../ReportView";

export const metadata: Metadata = {
  title: "20 家知名投资管理人：2026 Q3 13F 持仓与变动",
  description: "基于 SEC 申报比较 Q2 与 Q3：20 家管理人的十大新出现持仓、增持、减持、退出、价值及组合权重。",
};

export default function Page() {
  return <ReportView lang="zh" />;
}
