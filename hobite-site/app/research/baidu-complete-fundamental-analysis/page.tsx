import type { Metadata } from "next";
import { BaiduResearchView } from "./BaiduResearchView";

export const metadata: Metadata = {
  title: "Baidu (BIDU) Complete Fundamental Analysis",
  description: "SEC-backed Baidu financial history, AI Cloud and search economics, ADS valuation history and ten-year DCF scenarios.",
};

export default function BaiduResearchPage() { return <BaiduResearchView language="en" />; }
