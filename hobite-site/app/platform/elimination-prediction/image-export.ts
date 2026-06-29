import {
  getChampion,
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
  PosterFormat,
} from "./types";

export type PosterDimensions = {
  width: number;
  height: number;
};

const POSTER_DIMENSIONS: Record<PosterFormat, PosterDimensions> = {
  square: { width: 1080, height: 1080 },
  story: { width: 1080, height: 1920 },
  landscape: { width: 1200, height: 630 },
};

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function teamName(
  prediction: BracketPrediction,
  participantId: string | undefined,
  language: LanguageCode,
) {
  const participant = getParticipant(prediction, participantId);
  return participant ? getParticipantName(participant, language) : "";
}

function flagSvg(participant: Participant | undefined, x: number, y: number) {
  const colors = participant?.flagColors ?? ["#e5e7eb", "#f8fafc", "#d1d5db"];
  const width = 86;
  const height = 54;
  const bandWidth = width / colors.length;
  const bands = colors
    .map(
      (color, index) =>
        `<rect x="${x + index * bandWidth}" y="${y}" width="${bandWidth + 0.5}" height="${height}" fill="${color}" />`,
    )
    .join("");

  return `<g><rect x="${x}" y="${y}" width="${width}" height="${height}" rx="7" fill="#fff" stroke="#ffffff" stroke-width="4" />${bands}<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="7" fill="none" stroke="#e5e7eb" stroke-width="3" /></g>`;
}

function matchupSvg({
  prediction,
  matchup,
  language,
  x,
  y,
  align,
}: {
  prediction: BracketPrediction;
  matchup: Matchup;
  language: LanguageCode;
  x: number;
  y: number;
  align: "left" | "right";
}) {
  const left = getParticipant(prediction, matchup.leftId);
  const right = getParticipant(prediction, matchup.rightId);
  const winner = matchup.winnerId;
  const firstX = align === "left" ? x : x + 110;
  const secondX = align === "left" ? x + 130 : x - 20;
  const labelAnchor = align === "left" ? "start" : "end";
  const labelX = align === "left" ? x : x + 196;
  const nameY = y + 84;

  return `
    <g>
      ${flagSvg(left, firstX, y)}
      ${flagSvg(right, secondX, y)}
      <text x="${align === "left" ? x + 100 : x + 88}" y="${y + 35}" text-anchor="middle" font-size="22" fill="#f8fafc" font-weight="700">vs</text>
      <text x="${labelX}" y="${nameY}" text-anchor="${labelAnchor}" font-size="25" fill="${winner === left?.id ? "#facc15" : "#ffffff"}" font-weight="800">${escapeXml(teamName(prediction, matchup.leftId, language))}</text>
      <text x="${align === "left" ? labelX + 196 : labelX - 196}" y="${nameY}" text-anchor="${align === "left" ? "end" : "start"}" font-size="25" fill="${winner === right?.id ? "#facc15" : "#ffffff"}" font-weight="800">${escapeXml(teamName(prediction, matchup.rightId, language))}</text>
    </g>
  `;
}

function centerSvg(
  prediction: BracketPrediction,
  language: LanguageCode,
  copy: PredictionCopy,
  dimensions: PosterDimensions,
) {
  const champion = getChampion(prediction);
  const championName = champion
    ? getParticipantName(champion, language)
    : copy.championTbd;
  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;
  const scale = dimensions.height > 1300 ? 1.22 : dimensions.height < 800 ? 0.78 : 1;
  const trophyHeight = 190 * scale;
  const trophyTop = centerY - trophyHeight - 38 * scale;

  return `
    <g>
      <ellipse cx="${centerX}" cy="${trophyTop + trophyHeight + 14 * scale}" rx="${54 * scale}" ry="${15 * scale}" fill="#064e3b" />
      <path d="M ${centerX - 30 * scale} ${trophyTop + 22 * scale} C ${centerX - 72 * scale} ${trophyTop + 78 * scale}, ${centerX - 42 * scale} ${trophyTop + 132 * scale}, ${centerX - 16 * scale} ${trophyTop + 158 * scale} L ${centerX - 48 * scale} ${trophyTop + trophyHeight} L ${centerX + 48 * scale} ${trophyTop + trophyHeight} L ${centerX + 16 * scale} ${trophyTop + 158 * scale} C ${centerX + 42 * scale} ${trophyTop + 132 * scale}, ${centerX + 72 * scale} ${trophyTop + 78 * scale}, ${centerX + 30 * scale} ${trophyTop + 22 * scale} Z" fill="#d6a536" />
      <circle cx="${centerX}" cy="${trophyTop + 68 * scale}" r="${48 * scale}" fill="#f4d675" opacity="0.75" />
      <rect x="${centerX - 58 * scale}" y="${trophyTop + trophyHeight - 22 * scale}" width="${116 * scale}" height="${32 * scale}" rx="${10 * scale}" fill="#14532d" />
      <text x="${centerX}" y="${centerY + 76 * scale}" text-anchor="middle" font-size="${34 * scale}" fill="#f8fafc" font-weight="900">${escapeXml(copy.champion)}</text>
      <text x="${centerX}" y="${centerY + 126 * scale}" text-anchor="middle" font-size="${44 * scale}" fill="#facc15" font-weight="900">${escapeXml(championName)}</text>
      <text x="${centerX}" y="${centerY + 184 * scale}" text-anchor="middle" font-size="${30 * scale}" fill="#ffffff" font-weight="800">${escapeXml(prediction.eventDetails.finalDate || copy.dateTbd)}</text>
      <text x="${centerX}" y="${centerY + 226 * scale}" text-anchor="middle" font-size="${30 * scale}" fill="#ffffff" font-weight="800">${escapeXml(prediction.eventDetails.finalTime || copy.timeTbd)}</text>
      <text x="${centerX}" y="${centerY + 270 * scale}" text-anchor="middle" font-size="${25 * scale}" fill="#d4d4d8" font-weight="700">${escapeXml(prediction.eventDetails.stadium || copy.stadiumTbd)}</text>
    </g>
  `;
}

export function getPosterDimensions(format: PosterFormat) {
  return POSTER_DIMENSIONS[format];
}

export function buildPosterSvg(
  prediction: BracketPrediction,
  format: PosterFormat,
  language: LanguageCode,
  copy: PredictionCopy,
) {
  const dimensions = getPosterDimensions(format);
  const firstRound = prediction.matchups.filter((matchup) => matchup.round === 1);
  const leftMatchups = firstRound.slice(0, 8);
  const rightMatchups = firstRound.slice(8);
  const compact = dimensions.height < 800;
  const rawTitle = prediction.eventDetails.title || copy.title;
  const titleSize = Math.min(
    compact ? 38 : dimensions.height > 1300 ? 56 : 46,
    Math.max(28, Math.floor((dimensions.width * 1.45) / rawTitle.length)),
  );
  const rowGap = compact ? 58 : dimensions.height > 1300 ? 128 : 99;
  const top = compact ? 112 : dimensions.height > 1300 ? 240 : 178;
  const leftX = compact ? 42 : 64;
  const rightX = dimensions.width - (compact ? 260 : 324);

  const left = leftMatchups
    .map((matchup, index) =>
      matchupSvg({
        prediction,
        matchup,
        language,
        x: leftX,
        y: top + index * rowGap,
        align: "left",
      }),
    )
    .join("");
  const right = rightMatchups
    .map((matchup, index) =>
      matchupSvg({
        prediction,
        matchup,
        language,
        x: rightX,
        y: top + index * rowGap,
        align: "right",
      }),
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${dimensions.width}" height="${dimensions.height}" viewBox="0 0 ${dimensions.width} ${dimensions.height}">
    <rect width="100%" height="100%" fill="#030712" />
    <rect x="16" y="16" width="${dimensions.width - 32}" height="${dimensions.height - 32}" rx="28" fill="#050505" stroke="#22c55e" stroke-width="10" />
    <path d="M0 0 L${dimensions.width * 0.45} 0 L${dimensions.width * 0.52} 80 L0 80Z" fill="#3157ff" />
    <path d="M${dimensions.width} ${dimensions.height} L${dimensions.width * 0.52} ${dimensions.height} L${dimensions.width * 0.46} ${dimensions.height - 80} L${dimensions.width} ${dimensions.height - 80}Z" fill="#d9ff24" />
    <text x="${dimensions.width / 2}" y="${compact ? 78 : 110}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${titleSize}" fill="#ffffff" font-weight="900">${escapeXml(rawTitle)}</text>
    <text x="${dimensions.width / 2}" y="${compact ? 118 : 150}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${compact ? 18 : 25}" fill="#d4d4d8" font-weight="700">${escapeXml(getRoundLabel(1, language))} · ${escapeXml(copy.posterFooter)}</text>
    ${left}
    ${right}
    <path d="M${dimensions.width / 2 - 170} ${top + rowGap * 1.5} H${dimensions.width / 2 - 96} V${top + rowGap * 5.8} H${dimensions.width / 2 - 170}" fill="none" stroke="#f8fafc" stroke-width="5" opacity="0.7" />
    <path d="M${dimensions.width / 2 + 170} ${top + rowGap * 1.5} H${dimensions.width / 2 + 96} V${top + rowGap * 5.8} H${dimensions.width / 2 + 170}" fill="none" stroke="#f8fafc" stroke-width="5" opacity="0.7" />
    ${centerSvg(prediction, language, copy, dimensions)}
    <text x="${dimensions.width / 2}" y="${dimensions.height - 48}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${compact ? 18 : 23}" fill="#a1a1aa" font-weight="700">Hobite Capital · ${escapeXml(copy.posterFooter)}</text>
  </svg>`;
}

export async function generatePredictionImage(
  prediction: BracketPrediction,
  format: PosterFormat,
  language: LanguageCode,
  copy: PredictionCopy,
): Promise<Blob> {
  const dimensions = getPosterDimensions(format);
  const svg = buildPosterSvg(prediction, format, language, copy);
  const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const svgUrl = URL.createObjectURL(svgBlob);

  try {
    const image = new Image();
    image.decoding = "async";
    const loaded = new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Unable to render prediction SVG."));
    });
    image.src = svgUrl;
    await loaded;

    const canvas = document.createElement("canvas");
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Canvas is unavailable.");
    }

    context.drawImage(image, 0, 0);

    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Unable to export prediction PNG."));
        }
      }, "image/png");
    });
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
}
