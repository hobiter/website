import type { Metadata } from "next";
import ResearchView from "../ResearchView";

export const metadata: Metadata = {
  title: "AI 全产业价值链：十年与二十年投资展望",
  description: "AI 全产业链研究、行业经济性、十股排序、历史财务与透明长期估值情景。",
};

export default function Page() {
  return <ResearchView lang="zh" />;
}
