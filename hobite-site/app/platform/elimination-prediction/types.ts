export type LanguageCode = "en" | "zh";

export type PosterFormat = "landscape";

export type EventDetails = {
  title: string;
  finalDate?: string;
  finalTime?: string;
  stadium?: string;
};

export type Participant = {
  id: string;
  name: string;
  nameZh: string;
  seed: number;
  flagSrc?: string;
  flagColors: string[];
};

export type Matchup = {
  id: string;
  round: number;
  index: number;
  leftId?: string;
  rightId?: string;
  winnerId?: string;
  nextMatchupId?: string;
  nextSlot?: "leftId" | "rightId";
};

export type BracketPrediction = {
  id: string;
  eventDetails: EventDetails;
  participants: Participant[];
  matchups: Matchup[];
  championId?: string;
  createdAt: string;
};

export type SharePayload = {
  title: string;
  text: string;
  url: string;
  imageBlob?: Blob;
  fileName: string;
};
