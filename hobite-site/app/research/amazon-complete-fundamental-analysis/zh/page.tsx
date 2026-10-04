import type { Metadata } from "next";
import AmazonResearchView from "../AmazonResearchView";

export const metadata: Metadata = {
  title: "亚马逊（AMZN）完整基本面研究",
  description:
    "亚马逊 SEC 财务历史、AWS 与零售经济、AI 投入、资本配置及十年企业 DCF 情景。",
};

export default function Page() {
  return <AmazonResearchView chinese />;
}
