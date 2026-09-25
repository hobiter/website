import type { Metadata } from "next";
import { BaiduResearchView } from "../BaiduResearchView";

export const metadata: Metadata = {
  title: "百度（BIDU）完整基本面研究中心",
  description: "基于 SEC 的百度财务历史、AI 云与搜索经济、ADS 估值历史及十年 DCF 情景。",
};

export default function BaiduResearchChinesePage() { return <BaiduResearchView language="zh" />; }
