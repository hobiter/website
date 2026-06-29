import type {
  BracketPrediction,
  EventDetails,
  LanguageCode,
  Matchup,
  Participant,
} from "./types";

const ROUND_SIZES = [16, 8, 4, 2, 1] as const;

function matchupId(round: number, index: number) {
  return `r${round}m${index}`;
}

function findMatchup(
  prediction: BracketPrediction,
  id: string,
): Matchup | undefined {
  return prediction.matchups.find((matchup) => matchup.id === id);
}

function isCompleteMatchup(matchup: Matchup) {
  return Boolean(matchup.leftId && matchup.rightId);
}

function isParticipantInMatchup(matchup: Matchup, participantId: string) {
  return matchup.leftId === participantId || matchup.rightId === participantId;
}

function replaceMatchup(
  matchups: Matchup[],
  id: string,
  patch: Partial<Matchup>,
) {
  return matchups.map((matchup) =>
    matchup.id === id ? { ...matchup, ...patch } : matchup,
  );
}

function getFinalMatchup(matchups: Matchup[]) {
  return matchups.find((matchup) => matchup.round === ROUND_SIZES.length);
}

function recalculateChampion(
  matchups: Matchup[],
  participants: Participant[],
): string | undefined {
  const finalMatchup = getFinalMatchup(matchups);
  if (!finalMatchup?.winnerId) {
    return undefined;
  }

  const winnerExists = participants.some(
    (participant) => participant.id === finalMatchup.winnerId,
  );

  return winnerExists ? finalMatchup.winnerId : undefined;
}

function propagateWinner(matchups: Matchup[], sourceId: string): Matchup[] {
  const source = matchups.find((matchup) => matchup.id === sourceId);
  if (!source?.nextMatchupId || !source.nextSlot) {
    return matchups;
  }

  const target = matchups.find(
    (matchup) => matchup.id === source.nextMatchupId,
  );
  if (!target) {
    return matchups;
  }

  let nextMatchups = replaceMatchup(matchups, target.id, {
    [source.nextSlot]: source.winnerId,
  });
  const updatedTarget = nextMatchups.find((matchup) => matchup.id === target.id);

  if (!updatedTarget) {
    return nextMatchups;
  }

  const winnerStillValid =
    updatedTarget.winnerId &&
    isParticipantInMatchup(updatedTarget, updatedTarget.winnerId);

  if (!winnerStillValid && updatedTarget.winnerId) {
    nextMatchups = replaceMatchup(nextMatchups, updatedTarget.id, {
      winnerId: undefined,
    });
  }

  return propagateWinner(nextMatchups, updatedTarget.id);
}

export function createBracket(
  participants: Participant[],
  eventDetails: EventDetails,
): BracketPrediction {
  const safeParticipants = participants.slice(0, 32);
  const matchups: Matchup[] = [];

  for (let roundIndex = 0; roundIndex < ROUND_SIZES.length; roundIndex += 1) {
    const round = roundIndex + 1;
    const matchupsInRound = ROUND_SIZES[roundIndex];

    for (let index = 0; index < matchupsInRound; index += 1) {
      const isFinal = round === ROUND_SIZES.length;
      const nextRoundIndex = Math.floor(index / 2);

      matchups.push({
        id: matchupId(round, index),
        round,
        index,
        leftId: round === 1 ? safeParticipants[index * 2]?.id : undefined,
        rightId: round === 1 ? safeParticipants[index * 2 + 1]?.id : undefined,
        nextMatchupId: isFinal ? undefined : matchupId(round + 1, nextRoundIndex),
        nextSlot: isFinal ? undefined : index % 2 === 0 ? "leftId" : "rightId",
      });
    }
  }

  return {
    id: `prediction-${Date.now()}`,
    eventDetails,
    participants: safeParticipants,
    matchups,
    createdAt: new Date().toISOString(),
  };
}

export function selectWinner(
  prediction: BracketPrediction,
  matchupIdToUpdate: string,
  winnerId: string,
): BracketPrediction {
  const matchup = findMatchup(prediction, matchupIdToUpdate);

  if (
    !matchup ||
    !isCompleteMatchup(matchup) ||
    !isParticipantInMatchup(matchup, winnerId)
  ) {
    return prediction;
  }

  if (matchup.winnerId === winnerId) {
    return prediction;
  }

  let matchups = replaceMatchup(prediction.matchups, matchup.id, { winnerId });
  matchups = propagateWinner(matchups, matchup.id);

  return {
    ...prediction,
    matchups,
    championId: recalculateChampion(matchups, prediction.participants),
  };
}

export function resetPrediction(
  prediction: BracketPrediction,
): BracketPrediction {
  const matchups = prediction.matchups.map((matchup) => ({
    ...matchup,
    winnerId: undefined,
    leftId: matchup.round === 1 ? matchup.leftId : undefined,
    rightId: matchup.round === 1 ? matchup.rightId : undefined,
  }));

  return {
    ...prediction,
    matchups,
    championId: undefined,
  };
}

export function getChampion(
  prediction: BracketPrediction,
): Participant | undefined {
  if (!prediction.championId) {
    return undefined;
  }

  return prediction.participants.find(
    (participant) => participant.id === prediction.championId,
  );
}

export function getParticipant(
  prediction: BracketPrediction,
  participantId?: string,
): Participant | undefined {
  if (!participantId) {
    return undefined;
  }

  return prediction.participants.find(
    (participant) => participant.id === participantId,
  );
}

export function getParticipantName(
  participant: Participant,
  language: LanguageCode,
) {
  return language === "zh" ? participant.nameZh : participant.name;
}

export function getRoundLabel(round: number, language: LanguageCode) {
  const labels: Record<LanguageCode, string[]> = {
    en: ["Round of 32", "Round of 16", "Quarterfinals", "Semifinals", "Final"],
    zh: ["32 强", "16 强", "四分之一决赛", "半决赛", "决赛"],
  };

  return labels[language][round - 1] ?? `Round ${round}`;
}

