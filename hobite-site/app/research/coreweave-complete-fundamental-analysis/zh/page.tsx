import type { Metadata } from "next";
import CoreweaveResearchView from "../CoreweaveResearchView";
export const metadata: Metadata = {
  title: "CoreWeave（CRWV）完整基本面研究",
  description:
    "SEC 财务、AI 基础设施、GPU 再投入、客户集中、融资与企业至股权情景估值。",
};
export default function Page() {
  return <CoreweaveResearchView lang="zh" />;
}
