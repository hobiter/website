import type { Metadata } from "next";
import PredictionBuilder from "./PredictionBuilder";

export const metadata: Metadata = {
  title: "FIFA World Cup Prediction",
  description:
    "Create a FIFA World Cup knockout prediction poster and download or share it.",
};

export default function EliminationPredictionPage() {
  return <PredictionBuilder />;
}

