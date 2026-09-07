import type { Metadata } from "next";
import { NvidiaResearchView } from "../NvidiaResearchView";

export const metadata: Metadata = {
  title: "英伟达（NVDA）完整基本面研究中心",
  description: "基于 SEC 的英伟达财务历史、AI 平台经济、供应承诺、估值历史及十年 DCF 情景。",
};

export default function NvidiaResearchChinesePage() {
  return <NvidiaResearchView language="zh" />;
}
