import type { Metadata } from "next";
import LuluResearchView from "../LuluResearchView";
export const metadata: Metadata = {
  title: "lululemon（LULU）完整基本面研究",
  description:
    "SEC 财务历史、零售效率、库存租赁经济、关税退款调节与股东现金估值情景。",
};
export default function Page() {
  return <LuluResearchView lang="zh" />;
}
