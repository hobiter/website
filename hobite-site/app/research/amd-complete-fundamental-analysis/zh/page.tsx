import type { Metadata } from "next";
import { ResearchUpdate } from "../../_chip-refresh/ResearchUpdate";
import AmdResearchView from "../AmdResearchView";
export const metadata: Metadata = {
  title: "AMD 完整基本面研究",
  description:
    "AMD 财年财务、分部经济、客户权证、供应承诺与十年 FCFF 估值情景。",
};
export default function Page() {
  return <ResearchUpdate ticker="AMD" zh><AmdResearchView lang="zh" /></ResearchUpdate>;
}
