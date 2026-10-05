import type { Metadata } from "next";
import SkhynixResearchView from "../SkhynixResearchView";

export const metadata: Metadata = {
  title: "SK 海力士（SKHY）完整基本面研究",
  description: "K-IFRS 财务历史、HBM 与存储周期、纳斯达克 ADS 机制、来源核验及十年估值情景。",
};

export default function Page() {
  return <SkhynixResearchView lang="zh" />;
}
