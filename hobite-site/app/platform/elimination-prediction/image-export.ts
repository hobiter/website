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

function isHorizontalFlag(participant: Participant | undefined) {
  return Boolean(
    participant &&
      ["ger", "ned", "esp", "aut", "arg", "egy", "col", "gha"].includes(
        participant.id,
      ),
  );
}

export function buildFlagSvg(
  participant: Participant | undefined,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const colors = participant?.flagColors ?? ["#e5e7eb", "#f8fafc", "#d1d5db"];
  const clipId = `flag-rect-${participant?.id ?? "tbd"}-${Math.round(x)}-${Math.round(y)}`;
  const hBand = (color: string, index: number, count: number) =>
    `<rect x="${x}" y="${y + (height * index) / count}" width="${width}" height="${height / count + 0.5}" fill="${color}" />`;
  const vBand = (color: string, index: number, count: number) =>
    `<rect x="${x + (width * index) / count}" y="${y}" width="${width / count + 0.5}" height="${height}" fill="${color}" />`;
  const hBands = (values: string[]) =>
    values.map((color, index) => hBand(color, index, values.length)).join("");
  const vBands = (values: string[]) =>
    values.map((color, index) => vBand(color, index, values.length)).join("");
  const cross = (color: string, verticalWidth: number, horizontalWidth: number) =>
    `<rect x="${x + width / 2 - verticalWidth / 2}" y="${y}" width="${verticalWidth}" height="${height}" fill="${color}" /><rect x="${x}" y="${y + height / 2 - horizontalWidth / 2}" width="${width}" height="${horizontalWidth}" fill="${color}" />`;
  const defaultBands = colors
    .map((color, index) =>
      isHorizontalFlag(participant)
        ? hBand(color, index, colors.length)
        : vBand(color, index, colors.length),
    )
    .join("");

  const artwork: Record<string, string> = {
    ger: hBands(["#111827", "#ef4444", "#facc15"]),
    par: hBands(["#dc2626", "#ffffff", "#2563eb"]),
    fra: vBands(["#1d4ed8", "#ffffff", "#ef4444"]),
    swe: `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="#2563eb" />${cross("#facc15", width * 0.16, height * 0.18).replace(`x="${x + width / 2 - (width * 0.16) / 2}"`, `x="${x + width * 0.34}"`)}`,
    rsa: `<rect x="${x}" y="${y}" width="${width}" height="${height / 2}" fill="#ef4444" /><rect x="${x}" y="${y + height / 2}" width="${width}" height="${height / 2}" fill="#2563eb" /><path d="M${x} ${y} L${x + width * 0.55} ${y + height / 2} L${x} ${y + height} Z" fill="#16a34a" /><path d="M${x} ${y + height * 0.12} L${x + width * 0.38} ${y + height / 2} L${x} ${y + height * 0.88} Z" fill="#facc15" /><path d="M${x} ${y + height * 0.22} L${x + width * 0.28} ${y + height / 2} L${x} ${y + height * 0.78} Z" fill="#111827" />`,
    can: `${vBand("#dc2626", 0, 4)}<rect x="${x + width * 0.25}" y="${y}" width="${width * 0.5}" height="${height}" fill="#ffffff" />${vBand("#dc2626", 3, 4)}<circle cx="${x + width / 2}" cy="${y + height / 2}" r="${height * 0.18}" fill="#dc2626" />`,
    ned: hBands(["#dc2626", "#ffffff", "#2563eb"]),
    mar: `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="#e11d48" /><text x="${x + width / 2}" y="${y + height * 0.66}" text-anchor="middle" font-size="${height * 0.52}" fill="#16a34a" font-weight="900">★</text>`,
    por: `<rect x="${x}" y="${y}" width="${width * 0.42}" height="${height}" fill="#16a34a" /><rect x="${x + width * 0.42}" y="${y}" width="${width * 0.58}" height="${height}" fill="#dc2626" /><circle cx="${x + width * 0.43}" cy="${y + height / 2}" r="${height * 0.16}" fill="#facc15" />`,
    cro: hBands(["#dc2626", "#ffffff", "#2563eb"]) + `<rect x="${x + width * 0.43}" y="${y + height * 0.36}" width="${width * 0.14}" height="${height * 0.28}" fill="#dc2626" />`,
    esp: `<rect x="${x}" y="${y}" width="${width}" height="${height * 0.25}" fill="#dc2626" /><rect x="${x}" y="${y + height * 0.25}" width="${width}" height="${height * 0.5}" fill="#facc15" /><rect x="${x}" y="${y + height * 0.75}" width="${width}" height="${height * 0.25}" fill="#dc2626" />`,
    aut: hBands(["#dc2626", "#ffffff", "#dc2626"]),
    usa: Array.from({ length: 7 }, (_, index) => `<rect x="${x}" y="${y + (height * index) / 7}" width="${width}" height="${height / 7 + 0.5}" fill="${index % 2 === 0 ? "#dc2626" : "#ffffff"}" />`).join("") + `<rect x="${x}" y="${y}" width="${width * 0.45}" height="${height * 0.54}" fill="#1d4ed8" />`,
    bih: `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="#2563eb" /><path d="M${x + width * 0.55} ${y} L${x + width} ${y + height} L${x + width * 0.55} ${y + height} Z" fill="#facc15" /><circle cx="${x + width * 0.43}" cy="${y + height * 0.22}" r="${height * 0.05}" fill="#ffffff" /><circle cx="${x + width * 0.5}" cy="${y + height * 0.42}" r="${height * 0.05}" fill="#ffffff" /><circle cx="${x + width * 0.58}" cy="${y + height * 0.62}" r="${height * 0.05}" fill="#ffffff" />`,
    bel: vBands(["#111827", "#facc15", "#ef4444"]),
    sen: vBands(["#16a34a", "#facc15", "#ef4444"]) + `<text x="${x + width / 2}" y="${y + height * 0.66}" text-anchor="middle" font-size="${height * 0.34}" fill="#16a34a" font-weight="900">★</text>`,
    bra: `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="#16a34a" /><path d="M${x + width / 2} ${y + height * 0.08} L${x + width * 0.92} ${y + height / 2} L${x + width / 2} ${y + height * 0.92} L${x + width * 0.08} ${y + height / 2} Z" fill="#facc15" /><circle cx="${x + width / 2}" cy="${y + height / 2}" r="${height * 0.24}" fill="#2563eb" />`,
    jpn: `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="#ffffff" /><circle cx="${x + width / 2}" cy="${y + height / 2}" r="${height * 0.25}" fill="#dc2626" />`,
    civ: vBands(["#f97316", "#ffffff", "#16a34a"]),
    nor: `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="#dc2626" />${cross("#ffffff", width * 0.22, height * 0.24).replace(`x="${x + width / 2 - (width * 0.22) / 2}"`, `x="${x + width * 0.31}"`)}${cross("#1d4ed8", width * 0.12, height * 0.14).replace(`x="${x + width / 2 - (width * 0.12) / 2}"`, `x="${x + width * 0.36}"`)}`,
    mex: vBands(["#16a34a", "#ffffff", "#dc2626"]) + `<circle cx="${x + width / 2}" cy="${y + height / 2}" r="${height * 0.12}" fill="#a16207" />`,
    ecu: `<rect x="${x}" y="${y}" width="${width}" height="${height * 0.5}" fill="#facc15" /><rect x="${x}" y="${y + height * 0.5}" width="${width}" height="${height * 0.25}" fill="#2563eb" /><rect x="${x}" y="${y + height * 0.75}" width="${width}" height="${height * 0.25}" fill="#dc2626" />`,
    eng: `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="#ffffff" />${cross("#dc2626", width * 0.14, height * 0.18)}`,
    cod: `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="#38bdf8" /><path d="M${x - width * 0.1} ${y + height} L${x + width * 0.12} ${y + height} L${x + width * 1.1} ${y} L${x + width * 0.88} ${y} Z" fill="#facc15" /><path d="M${x + width * 0.03} ${y + height} L${x + width * 0.16} ${y + height} L${x + width * 1.03} ${y} L${x + width * 0.9} ${y} Z" fill="#dc2626" />`,
    arg: hBands(["#60a5fa", "#ffffff", "#60a5fa"]) + `<circle cx="${x + width / 2}" cy="${y + height / 2}" r="${height * 0.1}" fill="#facc15" />`,
    cpv: `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="#2563eb" /><rect x="${x}" y="${y + height * 0.52}" width="${width}" height="${height * 0.1}" fill="#ffffff" /><rect x="${x}" y="${y + height * 0.62}" width="${width}" height="${height * 0.08}" fill="#dc2626" /><rect x="${x}" y="${y + height * 0.7}" width="${width}" height="${height * 0.1}" fill="#ffffff" />`,
    aus: `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="#1e40af" /><rect x="${x}" y="${y}" width="${width * 0.45}" height="${height * 0.5}" fill="#1f2937" /><path d="M${x} ${y} L${x + width * 0.45} ${y + height * 0.5} M${x + width * 0.45} ${y} L${x} ${y + height * 0.5}" stroke="#ffffff" stroke-width="${height * 0.08}" /><circle cx="${x + width * 0.72}" cy="${y + height * 0.58}" r="${height * 0.08}" fill="#ffffff" />`,
    egy: hBands(["#dc2626", "#ffffff", "#111827"]) + `<circle cx="${x + width / 2}" cy="${y + height / 2}" r="${height * 0.08}" fill="#b45309" />`,
    sui: `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="#dc2626" />${cross("#ffffff", width * 0.18, height * 0.18)}`,
    alg: `<rect x="${x}" y="${y}" width="${width / 2}" height="${height}" fill="#16a34a" /><rect x="${x + width / 2}" y="${y}" width="${width / 2}" height="${height}" fill="#ffffff" /><circle cx="${x + width * 0.55}" cy="${y + height / 2}" r="${height * 0.18}" fill="#dc2626" /><circle cx="${x + width * 0.61}" cy="${y + height / 2}" r="${height * 0.16}" fill="#ffffff" />`,
    col: `<rect x="${x}" y="${y}" width="${width}" height="${height * 0.5}" fill="#facc15" /><rect x="${x}" y="${y + height * 0.5}" width="${width}" height="${height * 0.25}" fill="#2563eb" /><rect x="${x}" y="${y + height * 0.75}" width="${width}" height="${height * 0.25}" fill="#dc2626" />`,
    gha: hBands(["#dc2626", "#facc15", "#16a34a"]) + `<text x="${x + width / 2}" y="${y + height * 0.64}" text-anchor="middle" font-size="${height * 0.32}" fill="#111827" font-weight="900">★</text>`,
  };

  return `<g>
    <clipPath id="${clipId}"><rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" /></clipPath>
    <g clip-path="url(#${clipId})">${participant ? artwork[participant.id] ?? defaultBands : defaultBands}</g>
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="none" stroke="#ffffff" stroke-width="3" />
  </g>`;
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
  const flagWidth = radius * 2.8;
  const flagHeight = radius * 1.75;
  const labelSize = Math.max(12, Math.round(radius * 0.5));

  return `
    <g>
      ${buildFlagSvg(
        winner,
        cx - flagWidth / 2,
        cy - flagHeight / 2,
        flagWidth,
        flagHeight,
        6,
      )}
      ${
        label
          ? `<text x="${cx}" y="${cy + flagHeight / 2 + labelSize + 5}" text-anchor="middle" font-size="${labelSize}" fill="#ffffff" font-weight="900">${escapeXml(label)}</text>`
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
        ${buildFlagSvg(participant, x + 16, rowY + 4, 34, rowHeight - 12, 3)}
        <text x="${x + 58}" y="${rowY + rowHeight / 2 + fontSize * 0.36}" font-size="${fontSize}" fill="#111827" font-weight="900">${escapeXml(name)}</text>
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

function matchupPairSvg({
  prediction,
  matchup,
  language,
  x,
  y,
  side,
  compact,
}: {
  prediction: BracketPrediction;
  matchup: Matchup;
  language: LanguageCode;
  x: number;
  y: number;
  side: "left" | "right";
  compact: boolean;
}) {
  const left = getParticipant(prediction, matchup.leftId);
  const right = getParticipant(prediction, matchup.rightId);
  const flagWidth = compact ? 92 : 116;
  const flagHeight = compact ? 50 : 62;
  const gap = compact ? 36 : 42;
  const fontSize = compact ? 19 : 24;
  const leftX = side === "left" ? x : x + flagWidth + gap;
  const rightX = side === "left" ? x + flagWidth + gap : x;
  const leftNameX = leftX + flagWidth / 2;
  const rightNameX = rightX + flagWidth / 2;
  const winnerId = matchup.winnerId;

  return `<g>
    ${buildFlagSvg(left, leftX, y, flagWidth, flagHeight, 6)}
    ${buildFlagSvg(right, rightX, y, flagWidth, flagHeight, 6)}
    <text x="${x + flagWidth + gap / 2}" y="${y + flagHeight * 0.58}" text-anchor="middle" font-size="${compact ? 18 : 22}" fill="#ffffff" font-weight="900">vs</text>
    <text x="${leftNameX}" y="${y + flagHeight + fontSize + 7}" text-anchor="middle" font-size="${fontSize}" fill="${winnerId === left?.id ? "#facc15" : "#ffffff"}" font-weight="900">${escapeXml(teamName(prediction, matchup.leftId, language))}</text>
    <text x="${rightNameX}" y="${y + flagHeight + fontSize + 7}" text-anchor="middle" font-size="${fontSize}" fill="${winnerId === right?.id ? "#facc15" : "#ffffff"}" font-weight="900">${escapeXml(teamName(prediction, matchup.rightId, language))}</text>
  </g>`;
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
  const trophyScale = compact ? 0.58 : 0.72;
  const trophyTop = centerY - boxHeight * 2.5;

  return `
    <g>
      <ellipse cx="${centerX}" cy="${trophyTop + 126 * trophyScale}" rx="${44 * trophyScale}" ry="${13 * trophyScale}" fill="#14532d" />
      <path d="M ${centerX - 26 * trophyScale} ${trophyTop + 14 * trophyScale} C ${centerX - 62 * trophyScale} ${trophyTop + 54 * trophyScale}, ${centerX - 38 * trophyScale} ${trophyTop + 94 * trophyScale}, ${centerX - 12 * trophyScale} ${trophyTop + 112 * trophyScale} L ${centerX - 38 * trophyScale} ${trophyTop + 142 * trophyScale} L ${centerX + 38 * trophyScale} ${trophyTop + 142 * trophyScale} L ${centerX + 12 * trophyScale} ${trophyTop + 112 * trophyScale} C ${centerX + 38 * trophyScale} ${trophyTop + 94 * trophyScale}, ${centerX + 62 * trophyScale} ${trophyTop + 54 * trophyScale}, ${centerX + 26 * trophyScale} ${trophyTop + 14 * trophyScale} Z" fill="#d6a536" />
      <circle cx="${centerX}" cy="${trophyTop + 55 * trophyScale}" r="${38 * trophyScale}" fill="#f4d675" opacity="0.68" />
      <text x="${centerX}" y="${centerY - boxHeight * 0.92}" text-anchor="middle" font-size="${32 * fontScale}" fill="#ffffff" font-weight="900">${escapeXml(getRoundLabel(5, language))}</text>
      <rect x="${centerX - boxWidth / 2}" y="${centerY - boxHeight / 2}" width="${boxWidth}" height="${boxHeight}" rx="4" fill="#050505" stroke="#ffffff" stroke-width="4" />
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
      <text x="${centerX}" y="${centerY + boxHeight * 1.04}" text-anchor="middle" font-size="${22 * fontScale}" fill="#ffffff" font-weight="900">${escapeXml(copy.champion)}</text>
      <text x="${centerX}" y="${centerY + boxHeight * 1.48}" text-anchor="middle" font-size="${30 * fontScale}" fill="#facc15" font-weight="900">${escapeXml(championName)}</text>
      <text x="${centerX}" y="${centerY + boxHeight * 1.94}" text-anchor="middle" font-size="${20 * fontScale}" fill="#ffffff" font-weight="800">${escapeXml(prediction.eventDetails.finalDate || copy.dateTbd)} · ${escapeXml(prediction.eventDetails.finalTime || copy.timeTbd)}</text>
      <text x="${centerX}" y="${centerY + boxHeight * 2.26}" text-anchor="middle" font-size="${17 * fontScale}" fill="#f8fafc" font-weight="800">${escapeXml(prediction.eventDetails.stadium || copy.stadiumTbd)}</text>
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
  const rawTitle = prediction.eventDetails.title || copy.title;
  const boardWidth = 2050;
  const boardHeight = 1030;
  const scale = Math.min(
    (dimensions.width - 36) / boardWidth,
    (dimensions.height - 32) / boardHeight,
  );
  const offsetX = (dimensions.width - boardWidth * scale) / 2;
  const offsetY = (dimensions.height - boardHeight * scale) / 2;
  const columnWidths = [250, 215, 185, 160, 230, 160, 185, 215, 250];
  const columnGap = 12;
  const columnXs = columnWidths.reduce<number[]>((positions, width, index) => {
    if (index === 0) {
      return [0];
    }

    return [
      ...positions,
      positions[index - 1] + columnWidths[index - 1] + columnGap,
    ];
  }, []);
  const gridWidth =
    columnWidths.reduce((total, width) => total + width, 0) +
    columnGap * (columnWidths.length - 1);
  const gridX = (boardWidth - gridWidth) / 2;
  const gridY = 120;
  const titleSize = Math.min(
    54,
    Math.max(28, Math.floor((boardWidth * 1.25) / rawTitle.length)),
  );
  const cardHeight = 94;
  const rowHeight = 36;
  const roundLayout: Record<number, { gap: number; paddingTop: number }> = {
    1: { gap: 10, paddingTop: 0 },
    2: { gap: 54, paddingTop: 44 },
    3: { gap: 142, paddingTop: 130 },
    4: { gap: 0, paddingTop: 304 },
  };

  const posterTeamRow = (
    participantId: string | undefined,
    selected: boolean,
    x: number,
    y: number,
    width: number,
  ) => {
    const participant = getParticipant(prediction, participantId);
    const name = participant ? getParticipantName(participant, language) : "TBD";

    return `<g>
      <rect x="${x}" y="${y}" width="${width}" height="${rowHeight}" rx="7" fill="${selected ? "#fef3c7" : participant ? "#ffffff" : "#e5e7eb"}" stroke="${selected ? "#facc15" : "#ffffff"}" stroke-width="2" />
      ${buildFlagSvg(participant, x + 8, y + 6, 42, 24, 4)}
      <text x="${x + 58}" y="${y + 23}" font-size="18" fill="#111827" font-weight="900">${escapeXml(name)}</text>
      ${selected ? `<text x="${x + width - 14}" y="${y + 23}" text-anchor="end" font-size="13" fill="#92400e" font-weight="900">WIN</text>` : ""}
    </g>`;
  };

  const posterMatchupCard = (
    matchup: Matchup,
    x: number,
    y: number,
    width: number,
  ) => {
    const leftSelected = matchup.winnerId === matchup.leftId;
    const rightSelected = matchup.winnerId === matchup.rightId;

    return `<g>
      <rect x="${x}" y="${y}" width="${width}" height="${cardHeight}" rx="10" fill="#050505" stroke="#ffffff" stroke-opacity="0.24" stroke-width="2" />
      ${posterTeamRow(matchup.leftId, Boolean(leftSelected), x + 8, y + 8, width - 16)}
      ${posterTeamRow(matchup.rightId, Boolean(rightSelected), x + 8, y + 50, width - 16)}
    </g>`;
  };

  const roundColumn = (
    round: number,
    side: "left" | "right",
    columnIndex: number,
  ) => {
    const matchups = getSideMatchups(prediction, round, side);
    const layout = roundLayout[round];
    const x = gridX + columnXs[columnIndex];
    const width = columnWidths[columnIndex];
    const heading = getRoundLabel(round, language);
    const cards = matchups
      .map((matchup, index) =>
        posterMatchupCard(
          matchup,
          x,
          gridY + 34 + layout.paddingTop + index * (cardHeight + layout.gap),
          width,
        ),
      )
      .join("");

    return `<g>
      <text x="${x + width / 2}" y="${gridY + 18}" text-anchor="middle" font-size="16" fill="#ffffff" opacity="0.82" font-weight="900">${escapeXml(heading)}</text>
      ${cards}
    </g>`;
  };

  const finalMatchup = prediction.matchups.find((matchup) => matchup.round === 5);
  const champion = getChampion(prediction);
  const championName = champion
    ? getParticipantName(champion, language)
    : copy.championTbd;
  const finalX = gridX + columnXs[4];
  const finalWidth = columnWidths[4];
  const finalY = gridY + 238;
  const finalCard = finalMatchup
    ? posterMatchupCard(finalMatchup, finalX, finalY, finalWidth)
    : "";
  const finalColumn = `<g>
    <text x="${finalX + finalWidth / 2}" y="${gridY + 248}" text-anchor="middle" font-size="28" fill="#ffffff" font-weight="900">${escapeXml(getRoundLabel(5, language))}</text>
    ${finalCard}
    <rect x="${finalX}" y="${finalY + cardHeight + 26}" width="${finalWidth}" height="154" rx="10" fill="#050505" stroke="#ffffff" stroke-opacity="0.28" stroke-width="2" />
    <text x="${finalX + finalWidth / 2}" y="${finalY + cardHeight + 61}" text-anchor="middle" font-size="17" fill="#ffffff" opacity="0.76" font-weight="900">${escapeXml(copy.champion)}</text>
    <text x="${finalX + finalWidth / 2}" y="${finalY + cardHeight + 101}" text-anchor="middle" font-size="30" fill="#facc15" font-weight="900">${escapeXml(championName)}</text>
    <text x="${finalX + finalWidth / 2}" y="${finalY + cardHeight + 130}" text-anchor="middle" font-size="17" fill="#ffffff" font-weight="800">${escapeXml(prediction.eventDetails.finalDate || copy.dateTbd)} · ${escapeXml(prediction.eventDetails.finalTime || copy.timeTbd)}</text>
    <text x="${finalX + finalWidth / 2}" y="${finalY + cardHeight + 154}" text-anchor="middle" font-size="15" fill="#ffffff" opacity="0.84" font-weight="800">${escapeXml(prediction.eventDetails.stadium || copy.stadiumTbd)}</text>
  </g>`;

  const boardContent = [
    roundColumn(1, "left", 0),
    roundColumn(2, "left", 1),
    roundColumn(3, "left", 2),
    roundColumn(4, "left", 3),
    finalColumn,
    roundColumn(4, "right", 5),
    roundColumn(3, "right", 6),
    roundColumn(2, "right", 7),
    roundColumn(1, "right", 8),
  ].join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${dimensions.width}" height="${dimensions.height}" viewBox="0 0 ${dimensions.width} ${dimensions.height}">
    <rect width="100%" height="100%" fill="#3157ff" />
    <path d="M${dimensions.width * 0.45} 0 H${dimensions.width} V${dimensions.height * 0.16} H${dimensions.width * 0.52} Z" fill="#22c55e" />
    <path d="M${dimensions.width} ${dimensions.height * 0.16} H${dimensions.width} V${dimensions.height * 0.53} H${dimensions.width - 18} V${dimensions.height * 0.16} Z" fill="#ff3b1f" />
    <path d="M0 ${dimensions.height * 0.66} H${18} V${dimensions.height} H${dimensions.width * 0.5} L${dimensions.width * 0.45} ${dimensions.height * 0.93} H0 Z" fill="#e9ff25" />
    <g transform="translate(${offsetX} ${offsetY}) scale(${scale})">
      <rect x="0" y="0" width="${boardWidth}" height="${boardHeight}" rx="28" fill="#050505" />
      <text x="${boardWidth / 2}" y="76" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${titleSize}" fill="#ffffff" font-weight="900">${escapeXml(rawTitle)}</text>
      <line x1="${boardWidth / 2 - 220}" y1="104" x2="${boardWidth / 2 + 220}" y2="104" stroke="#ffffff" stroke-width="3" opacity="0.55" />
      ${boardContent}
      <text x="${boardWidth / 2}" y="${boardHeight - 34}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="#ffffff" font-weight="800" opacity="0.82">hobite.vercel.app</text>
    </g>
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
