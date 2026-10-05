import type { Metadata } from "next";
import MicronResearchView from "../MicronResearchView";
export const metadata: Metadata = {
  title: "美光（MU）完整基本面研究",
  description:
    "美光财年财务历史、存储经济、HBM、客户资金、现金投资及十年跨周期 DCF 情景。",
};
export default function Page() {
  return <MicronResearchView chinese />;
}
