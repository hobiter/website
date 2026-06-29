import type { PredictionCopy } from "./i18n";
import type { PosterFormat } from "./types";

const FORMATS: PosterFormat[] = ["landscape"];

type PosterFormatSelectorProps = {
  value: PosterFormat;
  copy: PredictionCopy;
  onChange: (format: PosterFormat) => void;
};

export function PosterFormatSelector({
  value,
  copy,
  onChange,
}: PosterFormatSelectorProps) {
  const labels: Record<PosterFormat, string> = {
    landscape: copy.landscape,
  };

  return (
    <div>
      <p className="text-sm font-semibold text-zinc-900">{copy.format}</p>
      <div className="mt-2 grid gap-2">
        {FORMATS.map((format) => (
          <button
            aria-pressed={value === format}
            className={`rounded-md border px-3 py-2 text-sm font-semibold transition ${
              value === format
                ? "border-zinc-950 bg-zinc-950 text-white"
                : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-500"
            }`}
            key={format}
            onClick={() => onChange(format)}
            type="button"
          >
            {labels[format]}
          </button>
        ))}
      </div>
    </div>
  );
}
