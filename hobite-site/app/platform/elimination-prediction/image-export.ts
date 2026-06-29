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

function flagBandsSvg(
  participant: Participant | undefined,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const colors = participant?.flagColors ?? ["#e5e7eb", "#f8fafc", "#d1d5db"];
  const bandWidth = width / colors.length;
  const bands = colors
    .map(
      (color, index) =>
        `<rect x="${x + index * bandWidth}" y="${y}" width="${bandWidth + 0.5}" height="${height}" fill="${color}" />`,
    )
    .join("");

  return `<g><rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="#fff" />${bands}<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="none" stroke="#ffffff" stroke-width="3" /></g>`;
}

function circleFlagSvg(
  participant: Participant | undefined,
  cx: number,
  cy: number,
  radius: number,
) {
  const colors = participant?.flagColors ?? ["#f4f4f5", "#d4d4d8", "#a1a1aa"];
  const clipId = `flag-${participant?.id ?? "tbd"}-${Math.round(cx)}-${Math.round(cy)}`;
  const bandWidth = (radius * 2) / colors.length;
  const bands = colors
    .map(
      (color, index) =>
        `<rect x="${cx - radius + index * bandWidth}" y="${cy - radius}" width="${bandWidth + 0.5}" height="${radius * 2}" fill="${color}" />`,
    )
    .join("");

  return `<g>
    <clipPath id="${clipId}"><circle cx="${cx}" cy="${cy}" r="${radius}" /></clipPath>
    <g clip-path="url(#${clipId})">${bands}</g>
    <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="#ffffff" stroke-width="${Math.max(3, radius * 0.11)}" />
  </g>`;
}

function nodeSvg({
  prediction,
  matchup,
  language,
  cx,
  cy,
  radius,
}: {
  prediction: BracketPrediction;
  matchup: Matchup;
  language: LanguageCode;
  cx: number;
  cy: number;
  radius: number;
}) {
  const winner = getParticipant(prediction, matchup.winnerId);
  const label = winner ? getParticipantName(winner, language) : "";
  const labelSize = Math.max(12, Math.round(radius * 0.45));

  return `
    <g>
      ${circleFlagSvg(winner, cx, cy, radius)}
      ${
        label
          ? `<text x="${cx}" y="${cy + radius + labelSize + 5}" text-anchor="middle" font-size="${labelSize}" fill="#ffffff" font-weight="900">${escapeXml(label)}</text>`
          : ""
      }
    </g>
  `;
}

function groupBoxSvg({
  prediction,
  groupIndex,
  x,
  y,
  width,
  height,
  language,
}: {
  prediction: BracketPrediction;
  groupIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  language: LanguageCode;
}) {
  const participants = prediction.participants.slice(groupIndex * 4, groupIndex * 4 + 4);
  const rowHeight = (height - 30) / 4;
  const fontSize = Math.max(13, Math.min(24, Math.floor(rowHeight * 0.48)));
  const title = `GROUP ${String.fromCharCode(65 + groupIndex)}`;
  const rows = participants
    .map((participant, index) => {
      const rowY = y + 25 + index * rowHeight;
      const name = getParticipantName(participant, language);

      return `<g>
        <rect x="${x + 10}" y="${rowY}" width="${width - 20}" height="${rowHeight - 4}" rx="4" fill="#ffffff" />
        ${circleFlagSvg(participant, x + 28, rowY + rowHeight / 2 - 2, Math.min(14, rowHeight * 0.28))}
        <text x="${x + 48}" y="${rowY + rowHeight / 2 + fontSize * 0.36}" font-size="${fontSize}" fill="#9f1748" font-weight="900">${escapeXml(name)}</text>
      </g>`;
    })
    .join("");

  return `<g>
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="8" fill="none" stroke="#ffffff" stroke-width="3" />
    <rect x="${x + width * 0.23}" y="${y - 13}" width="${width * 0.54}" height="24" rx="4" fill="#ffffff" />
    <text x="${x + width / 2}" y="${y + 5}" text-anchor="middle" font-size="${Math.max(14, fontSize)}" fill="#9f1748" font-weight="900" font-style="italic">${escapeXml(title)}</text>
    ${rows}
  </g>`;
}

function getNodeY(firstRoundYs: number[], round: number, index: number) {
  const span = 2 ** (round - 1);
  const start = index * span;
  const values = firstRoundYs.slice(start, start + span);
  return values.reduce((total, value) => total + value, 0) / values.length;
}

function connectorSvg(
  fromX: number,
  fromYs: number[],
  toX: number,
  toYs: number[],
  side: "left" | "right",
) {
  const stroke = "#ffffff";
  const midX = side === "left" ? (fromX + toX) / 2 : (fromX + toX) / 2;
  const segments: string[] = [];

  for (let index = 0; index < toYs.length; index += 1) {
    const y1 = fromYs[index * 2];
    const y2 = fromYs[index * 2 + 1];
    const yMid = toYs[index];

    segments.push(
      `<path d="M${fromX} ${y1} H${midX} V${y2} H${fromX} M${midX} ${yMid} H${toX}" fill="none" stroke="${stroke}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity="0.82" />`,
    );
  }

  return segments.join("");
}

function sideBracketSvg({
  prediction,
  language,
  side,
  firstRoundYs,
  xPositions,
  nodeRadius,
  finalEdgeX,
  centerY,
}: {
  prediction: BracketPrediction;
  language: LanguageCode;
  side: "left" | "right";
  firstRoundYs: number[];
  xPositions: number[];
  nodeRadius: number;
  finalEdgeX: number;
  centerY: number;
}) {
  const roundOne = getSideMatchups(prediction, 1, side);
  const roundTwo = getSideMatchups(prediction, 2, side);
  const roundThree = getSideMatchups(prediction, 3, side);
  const roundFour = getSideMatchups(prediction, 4, side);
  const ysByRound = [
    firstRoundYs,
    roundTwo.map((_, index) => getNodeY(firstRoundYs, 2, index)),
    roundThree.map((_, index) => getNodeY(firstRoundYs, 3, index)),
    roundFour.map((_, index) => getNodeY(firstRoundYs, 4, index)),
  ];
  const nodes = [
    roundOne.map((matchup, index) =>
      nodeSvg({
        prediction,
        matchup,
        language,
        cx: xPositions[0],
        cy: ysByRound[0][index],
        radius: nodeRadius,
      }),
    ),
    roundTwo.map((matchup, index) =>
      nodeSvg({
        prediction,
        matchup,
        language,
        cx: xPositions[1],
        cy: ysByRound[1][index],
        radius: nodeRadius,
      }),
    ),
    roundThree.map((matchup, index) =>
      nodeSvg({
        prediction,
        matchup,
        language,
        cx: xPositions[2],
        cy: ysByRound[2][index],
        radius: nodeRadius,
      }),
    ),
    roundFour.map((matchup, index) =>
      nodeSvg({
        prediction,
        matchup,
        language,
        cx: xPositions[3],
        cy: ysByRound[3][index],
        radius: nodeRadius,
      }),
    ),
  ].flat();

  return `<g>
    ${connectorSvg(xPositions[0], ysByRound[0], xPositions[1], ysByRound[1], side)}
    ${connectorSvg(xPositions[1], ysByRound[1], xPositions[2], ysByRound[2], side)}
    ${connectorSvg(xPositions[2], ysByRound[2], xPositions[3], ysByRound[3], side)}
    <path d="M${xPositions[3]} ${ysByRound[3][0]} H${finalEdgeX} V${centerY}" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.82" />
    ${nodes.join("")}
  </g>`;
}

function centerPosterSvg({
  prediction,
  language,
  copy,
  centerX,
  centerY,
  compact,
}: {
  prediction: BracketPrediction;
  language: LanguageCode;
  copy: PredictionCopy;
  centerX: number;
  centerY: number;
  compact: boolean;
}) {
  const champion = getChampion(prediction);
  const finalMatchup = prediction.matchups.find((matchup) => matchup.round === 5);
  const championName = champion
    ? getParticipantName(champion, language)
    : copy.championTbd;
  const boxWidth = compact ? 170 : 230;
  const boxHeight = compact ? 72 : 96;
  const fontScale = compact ? 0.78 : 1;

  return `
    <g>
      <text x="${centerX}" y="${centerY - boxHeight * 0.92}" text-anchor="middle" font-size="${32 * fontScale}" fill="#ffffff" font-weight="900">${escapeXml(getRoundLabel(5, language))}</text>
      <rect x="${centerX - boxWidth / 2}" y="${centerY - boxHeight / 2}" width="${boxWidth}" height="${boxHeight}" rx="4" fill="#a1134e" stroke="#ffffff" stroke-width="4" />
      ${
        finalMatchup
          ? nodeSvg({
              prediction,
              matchup: finalMatchup,
              language,
              cx: centerX,
              cy: centerY,
              radius: compact ? 27 : 36,
            })
          : ""
      }
      <text x="${centerX}" y="${centerY + boxHeight * 0.92}" text-anchor="middle" font-size="${24 * fontScale}" fill="#ffffff" font-weight="900">${escapeXml(copy.champion)}</text>
      <text x="${centerX}" y="${centerY + boxHeight * 1.32}" text-anchor="middle" font-size="${34 * fontScale}" fill="#facc15" font-weight="900">${escapeXml(championName)}</text>
      <text x="${centerX}" y="${centerY + boxHeight * 1.78}" text-anchor="middle" font-size="${22 * fontScale}" fill="#ffffff" font-weight="800">${escapeXml(prediction.eventDetails.finalDate || copy.dateTbd)} · ${escapeXml(prediction.eventDetails.finalTime || copy.timeTbd)}</text>
      <text x="${centerX}" y="${centerY + boxHeight * 2.1}" text-anchor="middle" font-size="${19 * fontScale}" fill="#f8fafc" font-weight="800">${escapeXml(prediction.eventDetails.stadium || copy.stadiumTbd)}</text>
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
  const compact = dimensions.height < 800;
  const tall = dimensions.height > 1300;
  const rawTitle = prediction.eventDetails.title || copy.title;
  const titleSize = Math.min(
    compact ? 44 : tall ? 66 : 58,
    Math.max(28, Math.floor((dimensions.width * 1.45) / rawTitle.length)),
  );
  const margin = compact ? 46 : 64;
  const groupWidth = compact ? 178 : tall ? 250 : 220;
  const top = compact ? 126 : tall ? 250 : 170;
  const bottom = dimensions.height - (compact ? 66 : tall ? 180 : 88);
  const groupGap = compact ? 24 : tall ? 50 : 32;
  const groupHeight = (bottom - top - groupGap * 3) / 4;
  const firstRoundYs = Array.from({ length: 8 }, (_, index) => {
    const groupIndex = Math.floor(index / 2);
    const rowIndex = index % 2;
    return (
      top +
      groupIndex * (groupHeight + groupGap) +
      groupHeight * (rowIndex === 0 ? 0.34 : 0.72)
    );
  });
  const centerX = dimensions.width / 2;
  const centerY = (top + bottom) / 2;
  const nodeRadius = compact ? 24 : tall ? 38 : 30;
  const leftGroupX = margin;
  const rightGroupX = dimensions.width - margin - groupWidth;
  const leftXs = [
    leftGroupX + groupWidth + (compact ? 54 : 66),
    leftGroupX + groupWidth + (compact ? 142 : 178),
    centerX - (compact ? 185 : 230),
    centerX - (compact ? 104 : 132),
  ];
  const rightXs = [
    rightGroupX - (compact ? 54 : 66),
    rightGroupX - (compact ? 142 : 178),
    centerX + (compact ? 185 : 230),
    centerX + (compact ? 104 : 132),
  ];
  const finalBoxWidth = compact ? 170 : 230;
  const groups = Array.from({ length: 8 }, (_, index) =>
    groupBoxSvg({
      prediction,
      groupIndex: index,
      x: index % 2 === 0 ? leftGroupX : rightGroupX,
      y: top + Math.floor(index / 2) * (groupHeight + groupGap),
      width: groupWidth,
      height: groupHeight,
      language,
    }),
  ).join("");
  const leftBracket = sideBracketSvg({
    prediction,
    language,
    side: "left",
    firstRoundYs,
    xPositions: leftXs,
    nodeRadius,
    finalEdgeX: centerX - finalBoxWidth / 2,
    centerY,
  });
  const rightBracket = sideBracketSvg({
    prediction,
    language,
    side: "right",
    firstRoundYs,
    xPositions: rightXs,
    nodeRadius,
    finalEdgeX: centerX + finalBoxWidth / 2,
    centerY,
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${dimensions.width}" height="${dimensions.height}" viewBox="0 0 ${dimensions.width} ${dimensions.height}">
    <rect width="100%" height="100%" fill="#9f1748" />
    <rect x="16" y="16" width="${dimensions.width - 32}" height="${dimensions.height - 32}" rx="18" fill="#a1134e" stroke="#ffffff" stroke-width="0" />
    <text x="${dimensions.width / 2}" y="${compact ? 76 : tall ? 118 : 98}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${titleSize}" fill="#ffffff" font-weight="900">${escapeXml(rawTitle)}</text>
    <line x1="${centerX - 220}" y1="${compact ? 104 : tall ? 154 : 130}" x2="${centerX - 42}" y2="${compact ? 104 : tall ? 154 : 130}" stroke="#ffffff" stroke-width="3" opacity="0.7" />
    <rect x="${centerX - 12}" y="${(compact ? 104 : tall ? 154 : 130) - 12}" width="24" height="24" transform="rotate(45 ${centerX} ${compact ? 104 : tall ? 154 : 130})" fill="#ffffff" />
    <line x1="${centerX + 42}" y1="${compact ? 104 : tall ? 154 : 130}" x2="${centerX + 220}" y2="${compact ? 104 : tall ? 154 : 130}" stroke="#ffffff" stroke-width="3" opacity="0.7" />
    ${groups}
    ${leftBracket}
    ${rightBracket}
    ${centerPosterSvg({
      prediction,
      language,
      copy,
      centerX,
      centerY,
      compact,
    })}
    <text x="${dimensions.width / 2}" y="${dimensions.height - (compact ? 26 : 44)}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${compact ? 16 : 21}" fill="#ffffff" font-weight="800" opacity="0.82">Hobite Capital · ${escapeXml(copy.posterFooter)}</text>
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
