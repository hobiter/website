"use client";

import { useMemo, useState } from "react";
import {
  createBracket,
  getChampion,
  getParticipantName,
  resetPrediction,
  selectWinner,
} from "./bracket";
import { EventDetailsForm } from "./EventDetailsForm";
import { generatePredictionImage } from "./image-export";
import { COPY } from "./i18n";
import { PosterFormatSelector } from "./PosterFormatSelector";
import { PredictionBracket } from "./PredictionBracket";
import { PredictionShareCard } from "./PredictionShareCard";
import {
  copyShareText,
  downloadImage,
  openFacebookShare,
  openXShare,
  shareNative,
} from "./share";
import { DEFAULT_EVENT_DETAILS, FIFA_TEAMS } from "./teams";
import type { BracketPrediction, LanguageCode, PosterFormat } from "./types";

function fileSafe(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

function buildShareText(
  prediction: BracketPrediction,
  language: LanguageCode,
  copy: (typeof COPY)[LanguageCode],
) {
  const champion = getChampion(prediction);
  const championName = champion
    ? getParticipantName(champion, language)
    : copy.championTbd;

  return `${prediction.eventDetails.title} · ${copy.champion}: ${championName}`;
}

export default function PredictionBuilder() {
  const [language, setLanguage] = useState<LanguageCode>("en");
  const copy = COPY[language];
  const [posterFormat, setPosterFormat] = useState<PosterFormat>("landscape");
  const [prediction, setPrediction] = useState(() =>
    createBracket(FIFA_TEAMS, DEFAULT_EVENT_DETAILS),
  );
  const [imageBlob, setImageBlob] = useState<Blob | undefined>();
  const [status, setStatus] = useState("");

  const champion = getChampion(prediction);
  const sharePayload = useMemo(() => {
    const text = buildShareText(prediction, language, copy);
    const slug = fileSafe(prediction.eventDetails.title || "prediction");

    return {
      title: prediction.eventDetails.title,
      text,
      url: typeof window === "undefined" ? "" : window.location.href,
      imageBlob,
      fileName: `${slug || "prediction"}-${posterFormat}.png`,
    };
  }, [copy, imageBlob, language, posterFormat, prediction]);

  const invalidateImage = () => {
    setImageBlob(undefined);
    setStatus("");
  };

  const handleSelectWinner = (matchupId: string, winnerId: string) => {
    setPrediction((current) => selectWinner(current, matchupId, winnerId));
    invalidateImage();
  };

  const handleGenerate = async () => {
    const blob = await generatePredictionImage(
      prediction,
      posterFormat,
      language,
      copy,
    );
    setImageBlob(blob);
    setStatus(copy.imageReady);
  };

  const handleDownload = () => {
    if (!imageBlob) {
      setStatus(copy.unavailable);
      return;
    }
    downloadImage(imageBlob, sharePayload.fileName);
  };

  const handleNativeShare = async () => {
    if (!imageBlob) {
      setStatus(copy.unavailable);
      return;
    }

    try {
      const shared = await shareNative(sharePayload);
      if (!shared) {
        setStatus(copy.unavailable);
      }
    } catch {
      setStatus(copy.unavailable);
    }
  };

  const handleCopy = async () => {
    await copyShareText(`${sharePayload.text}\n${sharePayload.url}`);
    setStatus(copy.copied);
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 border-b border-zinc-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500">
            Hobite Capital
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            {copy.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
            {copy.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-zinc-600">
            {copy.language}
          </span>
          {(["en", "zh"] as const).map((nextLanguage) => (
            <button
              aria-pressed={language === nextLanguage}
              className={`rounded-md border px-3 py-2 text-sm font-semibold ${
                language === nextLanguage
                  ? "border-zinc-950 bg-zinc-950 text-white"
                  : "border-zinc-300 bg-white text-zinc-700"
              }`}
              key={nextLanguage}
              onClick={() => {
                setLanguage(nextLanguage);
                invalidateImage();
              }}
              type="button"
            >
              {nextLanguage === "en" ? copy.english : copy.chinese}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <section className="min-w-0 rounded-lg border border-zinc-200 bg-white p-4">
          <PredictionBracket
            copy={copy}
            language={language}
            onSelectWinner={handleSelectWinner}
            prediction={prediction}
          />
        </section>

        <aside className="space-y-4">
          <section className="rounded-lg border border-zinc-200 bg-white p-4">
            <div className="mb-4 rounded-md bg-zinc-950 p-4 text-white">
              <p className="text-sm text-zinc-300">{copy.champion}</p>
              <p className="mt-1 text-2xl font-semibold">
                {champion ? getParticipantName(champion, language) : copy.championTbd}
              </p>
            </div>
            <EventDetailsForm
              copy={copy}
              onChange={(details) => {
                setPrediction((current) => ({
                  ...current,
                  eventDetails: details,
                }));
                invalidateImage();
              }}
              value={prediction.eventDetails}
            />
          </section>

          <section className="rounded-lg border border-zinc-200 bg-white p-4">
            <PosterFormatSelector
              copy={copy}
              onChange={(format) => {
                setPosterFormat(format);
                invalidateImage();
              }}
              value={posterFormat}
            />
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                className="col-span-2 rounded-md bg-zinc-950 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
                onClick={handleGenerate}
                type="button"
              >
                {copy.generate}
              </button>
              <button
                className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-700 hover:border-zinc-500"
                onClick={handleDownload}
                type="button"
              >
                {copy.download}
              </button>
              <button
                className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-700 hover:border-zinc-500"
                onClick={handleNativeShare}
                type="button"
              >
                {copy.nativeShare}
              </button>
              <button
                className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-700 hover:border-zinc-500"
                onClick={handleCopy}
                type="button"
              >
                {copy.copy}
              </button>
              <button
                className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-700 hover:border-zinc-500"
                onClick={() => openXShare(sharePayload)}
                type="button"
              >
                {copy.shareX}
              </button>
              <button
                className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-700 hover:border-zinc-500"
                onClick={() => openFacebookShare(sharePayload)}
                type="button"
              >
                {copy.shareFacebook}
              </button>
              <button
                className="col-span-2 rounded-md border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-700 hover:border-zinc-500"
                onClick={() => {
                  setPrediction((current) => resetPrediction(current));
                  invalidateImage();
                }}
                type="button"
              >
                {copy.reset}
              </button>
            </div>
            {status ? (
              <p className="mt-3 text-sm font-medium text-zinc-600">{status}</p>
            ) : null}
          </section>

          <PredictionShareCard
            copy={copy}
            format={posterFormat}
            language={language}
            prediction={prediction}
          />
        </aside>
      </div>
    </main>
  );
}
