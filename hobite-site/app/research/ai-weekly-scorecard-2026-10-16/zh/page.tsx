import type { Metadata } from "next";
import ScorecardView from "../ScorecardView";
import { title, description } from "../data";

export const metadata: Metadata = { title: title[1], description: description[1] };

export default function Page() {
  return <ScorecardView lang="zh" />;
}
