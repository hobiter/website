"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

const languageKey = "hobite.home.language";
const themeKey = "hobite.home.theme";
const changeEvent = "hobite-home-preference";
const languages = ["en", "zh"] as const;
const themes = ["system", "light", "dark"] as const;
const overrides = new Map<string, string>();

function subscribe(listener: () => void) {
  window.addEventListener(changeEvent, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(changeEvent, listener);
    window.removeEventListener("storage", listener);
  };
}

function read<T extends string>(key: string, options: readonly T[]): T {
  let value = overrides.get(key);
  try { value = localStorage.getItem(key) ?? value; } catch {}
  return options.find(option => option === value) ?? options[0];
}

function save(key: string, value: string) {
  overrides.set(key, value);
  try { localStorage.setItem(key, value); } catch {}
  window.dispatchEvent(new Event(changeEvent));
}

const getLanguage = () => read(languageKey, languages);
const getTheme = () => read(themeKey, themes);
const initialLanguage = () => "en" as const;
const initialTheme = () => "system" as const;

export function useHomeLanguage() {
  return useSyncExternalStore(subscribe, getLanguage, initialLanguage);
}

export function HomeLabel({ en, zh }: { en: string; zh: string }) {
  const language = useHomeLanguage();
  return usePathname() === "/" && language === "zh" ? zh : en;
}

export function HomePreferences() {
  const pathname = usePathname();
  const language = useHomeLanguage();
  const theme = useSyncExternalStore(subscribe, getTheme, initialTheme);
  const home = pathname === "/";
  const chinese = language === "zh";

  useEffect(() => {
    if (!home) return;
    document.documentElement.lang = chinese ? "zh-CN" : "en";
    return () => { document.documentElement.lang = "en"; };
  }, [home, chinese]);

  useEffect(() => {
    if (home) document.documentElement.dataset.hobiteTheme = getTheme();
  }, [home, theme]);

  if (!home) return null;
  return (
    <div className="desk-preferences flex flex-wrap gap-2">
      <label className="desk-select">
        <span className="text-xs">{chinese ? "语言" : "Language"}</span>
        <select value={language} onChange={event => save(languageKey, event.currentTarget.value)}>
          <option value="en">English</option>
          <option value="zh" lang="zh-CN">简体中文</option>
        </select>
      </label>
      <label className="desk-select">
        <span className="text-xs">{chinese ? "外观" : "Theme"}</span>
        <select value={theme} onChange={event => save(themeKey, event.currentTarget.value)}>
          <option value="system">{chinese ? "跟随系统" : "System"}</option>
          <option value="light">{chinese ? "浅色" : "Light"}</option>
          <option value="dark">{chinese ? "深色" : "Dark"}</option>
        </select>
      </label>
    </div>
  );
}
