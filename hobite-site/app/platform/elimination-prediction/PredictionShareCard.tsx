import { buildPosterSvg, getPosterDimensions } from "./image-export";
import type { PredictionCopy } from "./i18n";
import type { BracketPrediction, LanguageCode, PosterFormat } from "./types";

type PredictionShareCardProps = {
  prediction: BracketPrediction;
  format: PosterFormat;
  language: LanguageCode;
  copy: PredictionCopy;
};

export function PredictionShareCard({
  prediction,
  format,
  language,
  copy,
}: PredictionShareCardProps) {
  const dimensions = getPosterDimensions(format);
  const svg = buildPosterSvg(prediction, format, language, copy);
  const src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white p-3">
      <img
        alt={copy.title}
        className="mx-auto block max-h-[520px] w-auto max-w-full rounded-md bg-black object-contain"
        height={dimensions.height}
        src={src}
        width={dimensions.width}
      />
    </div>
  );
}

