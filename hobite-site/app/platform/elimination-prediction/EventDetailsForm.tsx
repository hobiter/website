import type { PredictionCopy } from "./i18n";
import type { EventDetails } from "./types";

type EventDetailsFormProps = {
  value: EventDetails;
  copy: PredictionCopy;
  onChange: (details: EventDetails) => void;
};

export function EventDetailsForm({
  value,
  copy,
  onChange,
}: EventDetailsFormProps) {
  const update = (field: keyof EventDetails, nextValue: string) => {
    onChange({ ...value, [field]: nextValue });
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <label className="text-sm font-medium text-zinc-700 sm:col-span-2">
        {copy.eventTitle}
        <input
          className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 outline-none transition focus:border-zinc-950"
          onChange={(event) => update("title", event.target.value)}
          value={value.title}
        />
      </label>
      <label className="text-sm font-medium text-zinc-700">
        {copy.finalDate}
        <input
          className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 outline-none transition focus:border-zinc-950"
          onChange={(event) => update("finalDate", event.target.value)}
          value={value.finalDate ?? ""}
        />
      </label>
      <label className="text-sm font-medium text-zinc-700">
        {copy.finalTime}
        <input
          className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 outline-none transition focus:border-zinc-950"
          onChange={(event) => update("finalTime", event.target.value)}
          value={value.finalTime ?? ""}
        />
      </label>
      <label className="text-sm font-medium text-zinc-700 sm:col-span-2">
        {copy.stadium}
        <input
          className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 outline-none transition focus:border-zinc-950"
          onChange={(event) => update("stadium", event.target.value)}
          value={value.stadium ?? ""}
        />
      </label>
    </div>
  );
}

