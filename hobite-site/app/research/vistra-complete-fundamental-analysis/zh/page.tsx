import type { Metadata } from "next";
import VistraResearchView from "../VistraResearchView";

export const metadata: Metadata = {
  title: "Vistra（VST）完整基本面研究",
  description: "Vistra 财务历史、发电与零售经济、核电合同、资本配置及十年普通股现金流估值情景。",
};

export default function Page() {
  return <VistraResearchView chinese />;
}
