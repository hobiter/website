import type { Metadata } from "next";
import TsmcResearchView from "../TsmcResearchView";
export const metadata: Metadata = {
  title: "台积电（TSM）完整基本面研究",
  description:
    "台积电 IFRS 财务历史、晶圆代工经济、先进制程、现金投资、客户集中度及货币一致的十年 ADS 估值。",
};
export default function Page() {
  return <TsmcResearchView chinese />;
}
