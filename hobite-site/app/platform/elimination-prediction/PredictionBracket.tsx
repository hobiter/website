"use client";

import { useRef } from "react";
import {
  getChampion,
  getParticipant,
  getParticipantName,
  getRoundLabel,
} from "./bracket";
import { buildFlagSvg } from "./image-export";
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

const SIDE_ROUNDS = [1, 2, 3, 4] as const;

const ROUND_LAYOUT: Record<
  number,
  {
    gap: number;
    paddingTop: number;
  }
> = {
  1: { gap: 10, paddingTop: 0 },
  2: { gap: 54, paddingTop: 44 },
  3: { gap: 142, paddingTop: 130 },
  4: { gap: 0, paddingTop: 304 },
};

function getSideMatchups(
  prediction: BracketPrediction,
  round: number,
  side: "left" | "right",
) {
  const matchups = prediction.matchups.filter(
    (matchup) => matchup.round === round,
  );
  const splitIndex = Math.ceil(matchups.length / 2);

  return side === "left"
    ? matchups.slice(0, splitIndex)
    : matchups.slice(splitIndex);
}

function FlagChip({ participant }: { participant: Participant | undefined }) {
  return (
    <svg
      aria-hidden="true"
      className="h-7 w-12 shrink-0 drop-shadow-sm"
      dangerouslySetInnerHTML={{
        __html: buildFlagSvg(participant, 2, 2, 44, 24, 4),
      }}
      viewBox="0 0 48 28"
    />
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
          ? "border-amber-300 bg-amber-50 text-zinc-950 shadow-sm"
          : "border-white/20 bg-white text-zinc-950 hover:border-amber-200"
      } disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-500`}
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
      {selected ? <span className="text-xs text-amber-700">WIN</span> : null}
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
    <div className="rounded-lg border border-white/20 bg-zinc-950 p-2 shadow-sm">
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

function RoundColumn({
  prediction,
  round,
  side,
  language,
  copy,
  onSelectWinner,
}: {
  prediction: BracketPrediction;
  round: number;
  side: "left" | "right";
  language: LanguageCode;
  copy: PredictionCopy;
  onSelectWinner: (matchupId: string, winnerId: string) => void;
}) {
  const matchups = getSideMatchups(prediction, round, side);
  const layout = ROUND_LAYOUT[round];

  return (
    <section className="relative">
      <h2 className="mb-3 text-center text-xs font-black uppercase tracking-wide text-white/80">
        {getRoundLabel(round, language)}
      </h2>
      <div
        className="grid"
        style={{
          gap: `${layout.gap}px`,
          paddingTop: `${layout.paddingTop}px`,
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
}

function FinalColumn({
  prediction,
  language,
  copy,
  onSelectWinner,
}: {
  prediction: BracketPrediction;
  language: LanguageCode;
  copy: PredictionCopy;
  onSelectWinner: (matchupId: string, winnerId: string) => void;
}) {
  const finalMatchup = prediction.matchups.find((matchup) => matchup.round === 5);
  const champion = getChampion(prediction);
  const championName = champion
    ? getParticipantName(champion, language)
    : copy.championTbd;

  return (
    <section className="flex flex-col items-center justify-center pt-24">
      <div className="mb-3 h-px w-40 bg-white/70" />
      <h2 className="mb-3 text-center text-xl font-black uppercase text-white">
        {getRoundLabel(5, language)}
      </h2>
      {finalMatchup ? (
        <div className="w-full">
          <MatchupCard
            copy={copy}
            language={language}
            matchup={finalMatchup}
            onSelectWinner={onSelectWinner}
            prediction={prediction}
          />
        </div>
      ) : null}
      <div className="mt-5 w-full rounded-lg border border-white/25 bg-zinc-950 p-4 text-center text-white shadow-sm">
        <p className="text-xs font-bold uppercase tracking-wide text-white/70">
          {copy.champion}
        </p>
        <p className="mt-2 truncate text-2xl font-black text-amber-200">
          {championName}
        </p>
        <p className="mt-3 text-xs font-semibold text-white/75">
          {prediction.eventDetails.finalDate || copy.dateTbd}
          {" · "}
          {prediction.eventDetails.finalTime || copy.timeTbd}
        </p>
        <p className="mt-1 truncate text-xs font-semibold text-white/75">
          {prediction.eventDetails.stadium || copy.stadiumTbd}
        </p>
      </div>
      <div className="mt-3 h-px w-40 bg-white/70" />
    </section>
  );
}

export function PredictionBracket({
  prediction,
  language,
  copy,
  onSelectWinner,
}: PredictionBracketProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToPosition = (position: "left" | "center" | "right") => {
    const container = scrollRef.current;

    if (!container) {
      return;
    }

    const maxScroll = container.scrollWidth - container.clientWidth;
    const target =
      position === "left" ? 0 : position === "center" ? maxScroll / 2 : maxScroll;

    container.scrollTo({ left: target, behavior: "smooth" });
  };

  const scrollByPage = (direction: -1 | 1) => {
    const container = scrollRef.current;

    if (!container) {
      return;
    }

    container.scrollBy({
      left: direction * Math.max(320, container.clientWidth * 0.72),
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-zinc-200 bg-zinc-50 p-2">
        <div className="flex items-center gap-2">
          <button
            aria-label="Scroll bracket left"
            className="h-9 min-w-9 rounded-md border border-zinc-300 bg-white px-3 text-sm font-black text-zinc-900 hover:border-zinc-500"
            onClick={() => scrollByPage(-1)}
            type="button"
          >
            {"<"}
          </button>
          <button
            aria-label="Scroll bracket right"
            className="h-9 min-w-9 rounded-md border border-zinc-300 bg-white px-3 text-sm font-black text-zinc-900 hover:border-zinc-500"
            onClick={() => scrollByPage(1)}
            type="button"
          >
            {">"}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-xs font-bold text-zinc-800 hover:border-zinc-500"
            onClick={() => scrollToPosition("left")}
            type="button"
          >
            Left
          </button>
          <button
            className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-xs font-bold text-zinc-800 hover:border-zinc-500"
            onClick={() => scrollToPosition("center")}
            type="button"
          >
            Final
          </button>
          <button
            className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-xs font-bold text-zinc-800 hover:border-zinc-500"
            onClick={() => scrollToPosition("right")}
            type="button"
          >
            Right
          </button>
        </div>
      </div>
    <div className="overflow-x-auto pb-3" ref={scrollRef}>
      <div className="relative min-w-[2050px] overflow-hidden rounded-[18px] bg-black p-5 shadow-sm">
        <div className="absolute left-0 top-0 h-24 w-[46%] bg-[#3157ff]" />
        <div className="absolute right-0 top-0 h-24 w-[54%] bg-[#22c55e]" />
        <div className="absolute bottom-0 left-0 h-24 w-[48%] bg-[#e9ff25]" />
        <div className="absolute bottom-0 right-0 h-[46%] w-16 bg-[#ff3b1f]" />
        <div className="relative rounded-[18px] bg-black p-4">
        <div className="mb-5 text-center">
          <h2 className="text-3xl font-black text-white">
            {prediction.eventDetails.title || copy.title}
          </h2>
          <div className="mx-auto mt-3 h-px w-80 max-w-full bg-white/60" />
        </div>
        <div className="grid grid-cols-[250px_215px_185px_160px_230px_160px_185px_215px_250px] gap-3">
          {SIDE_ROUNDS.map((round) => (
            <RoundColumn
              copy={copy}
              key={`left-${round}`}
              language={language}
              onSelectWinner={onSelectWinner}
              prediction={prediction}
              round={round}
              side="left"
            />
          ))}
          <FinalColumn
            copy={copy}
            language={language}
            onSelectWinner={onSelectWinner}
            prediction={prediction}
          />
          {[...SIDE_ROUNDS].reverse().map((round) => (
            <RoundColumn
              copy={copy}
              key={`right-${round}`}
              language={language}
              onSelectWinner={onSelectWinner}
              prediction={prediction}
              round={round}
              side="right"
            />
          ))}
        </div>
        </div>
      </div>
    </div>
    </div>
  );
}
