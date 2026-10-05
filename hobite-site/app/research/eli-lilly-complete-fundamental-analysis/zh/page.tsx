import type { Metadata } from "next";
import LillyResearchView from "../LillyResearchView";
export const metadata: Metadata = {
  title: "礼来（LLY）完整基本面研究",
  description: "SEC 财务、制药经济、产品集中度、研发与生产投入及十年估值情景。",
};
export default function Page() {
  return <LillyResearchView lang="zh" />;
}
