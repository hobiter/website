import type { Metadata } from "next";
import { MetaResearchView } from "../MetaResearchView";

export const metadata: Metadata = {
  title: "Meta Platforms（META）完整基本面研究中心",
  description: "基于 SEC 的 Meta 财务历史、广告运营指标、AI 基础设施经济、估值历史及十年 DCF 情景。",
};

export default function MetaResearchChinesePage() {
  return <MetaResearchView language="zh" />;
}
