import type { Metadata } from "next";
import RocketLabResearchView from "../RocketLabResearchView";
export const metadata: Metadata = {
  title: "Rocket Lab（RKLB）完整基本面研究",
  description:
    "SEC 财务历史、Electron 与 HASTE 经济、空间系统、最新 Neutron 时间表、Iridium 融资与独立估值情景。",
};
export default function Page() {
  return <RocketLabResearchView lang="zh" />;
}
