import type { Metadata } from "next";
import ReportView from "./ReportView";

export const metadata: Metadata = {
  title: "20 Investment Managers: Q3 2026 13F Holdings and Changes",
  description: "SEC-sourced Q2/Q3 comparisons: top ten new positions, increases, reductions, exits, values and portfolio weights for 20 prominent managers.",
};

export default function Page() {
  return <ReportView lang="en" />;
}
