import type { Metadata } from "next";
import { TeslaResearchView } from "../TeslaResearchView";

export const metadata: Metadata = {
  title: "特斯拉（TSLA）完整基本面研究中心",
  description: "基于 SEC 的特斯拉财务历史、汽车、FSD 与能源运营指标、估值历史及十年 DCF 情景。",
};

export default function TeslaResearchChinesePage() {
  return <TeslaResearchView language="zh" />;
}
