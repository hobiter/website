import {
  getParticipant,
  getParticipantName,
  getRoundLabel,
} from "./bracket";
import type { PredictionCopy } from "./i18n";
import type {
  BracketPrediction,
  LanguageCode,
  Matchup,
  Participant,
} from "./types";

type PredictionBracketProps = {
  prediction: BracketPrediction;
  language: LanguageCode;
  copy: PredictionCopy;
  onSelectWinner: (matchupId: string, winnerId: string) => void;
};

function FlagChip({ participant }: { participant: Participant | undefined }) {
  const colors = participant?.flagColors ?? ["#e5e7eb", "#f8fafc", "#d1d5db"];

  return (
    <span
      aria-hidden="true"
      className="grid h-7 w-10 shrink-0 overflow-hidden rounded border border-zinc-300"
      style={{ gridTemplateColumns: `repeat(${colors.length}, 1fr)` }}
    >
      {colors.map((color, index) => (
        <span
          key={`${participant?.id ?? "empty"}-${color}-${index}`}
          style={{ backgroundColor: color }}
        />
      ))}
    </span>
  );
}

function TeamButton({
  matchup,
  participant,
  language,
  copy,
  onSelectWinner,
}: {
  matchup: Matchup;
  participant: Participant | undefined;
  language: LanguageCode;
  copy: PredictionCopy;
  onSelectWinner: (matchupId: string, winnerId: string) => void;
}) {
  const disabled = !participant || !matchup.leftId || !matchup.rightId;
  const selected = Boolean(participant && matchup.winnerId === participant.id);
  const name = participant ? getParticipantName(participant, language) : "TBD";

  return (
    <button
      aria-label={`${copy.selectWinner}: ${name}`}
      className={`flex min-h-11 w-full items-center gap-2 rounded-md border px-2 py-2 text-left text-sm font-semibold transition ${
        selected
          ? "border-emerald-700 bg-emerald-50 text-emerald-950"
          : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400"
      } disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400`}
      disabled={disabled}
      onClick={() => {
        if (participant) {
          onSelectWinner(matchup.id, participant.id);
        }
      }}
      type="button"
    >
      <FlagChip participant={participant} />
      <span className="min-w-0 flex-1 truncate">{name}</span>
      {selected ? <span className="text-xs text-emerald-700">WIN</span> : null}
    </button>
  );
}

function MatchupCard({
  prediction,
  matchup,
  language,
  copy,
  onSelectWinner,
}: {
  prediction: BracketPrediction;
  matchup: Matchup;
  language: LanguageCode;
  copy: PredictionCopy;
  onSelectWinner: (matchupId: string, winnerId: string) => void;
}) {
  const left = getParticipant(prediction, matchup.leftId);
  const right = getParticipant(prediction, matchup.rightId);

  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-2">
      <div className="space-y-2">
        <TeamButton
          copy={copy}
          language={language}
          matchup={matchup}
          onSelectWinner={onSelectWinner}
          participant={left}
        />
        <TeamButton
          copy={copy}
          language={language}
          matchup={matchup}
          onSelectWinner={onSelectWinner}
          participant={right}
        />
      </div>
    </div>
  );
}

export function PredictionBracket({
  prediction,
  language,
  copy,
  onSelectWinner,
}: PredictionBracketProps) {
  const rounds = [1, 2, 3, 4, 5];

  return (
    <div className="overflow-x-auto pb-3">
      <div className="grid min-w-[1180px] grid-cols-5 gap-4">
        {rounds.map((round) => {
          const matchups = prediction.matchups.filter(
            (matchup) => matchup.round === round,
          );

          return (
            <section key={round}>
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-zinc-500">
                {getRoundLabel(round, language)}
              </h2>
              <div
                className="grid gap-3"
                style={{
                  paddingTop: `${Math.max(0, (round - 1) * 22)}px`,
                }}
              >
                {matchups.map((matchup) => (
                  <MatchupCard
                    copy={copy}
                    key={matchup.id}
                    language={language}
                    matchup={matchup}
                    onSelectWinner={onSelectWinner}
                    prediction={prediction}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

