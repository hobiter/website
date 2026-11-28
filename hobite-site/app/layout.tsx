import type { Metadata } from "next";
import Link from "next/link";
import { HomeLabel, HomePreferences } from "./home-preferences";
import "./globals.css";

const NAV_ITEMS = [
  { href: "/", label: "Home", zh: "首页" },
  { href: "/research", label: "Research", zh: "研究" },
  { href: "/platform", label: "Platform", zh: "平台" },
  { href: "/newsletter", label: "Newsletter", zh: "通讯" },
  { href: "/operation-log", label: "Track Record", zh: "投资记录" },
];

function RednoteIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
    >
      <rect fill="#ef4444" height="18" rx="4" width="16" x="4" y="3" />
      <path
        d="M8 8h8M8 12h6M8 16h4"
        stroke="white"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 5l14 14M19 5L5 19"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.4"
      />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
    >
      <rect fill="#ef4444" height="14" rx="4" width="20" x="2" y="5" />
      <path d="M10 9v6l5-3-5-3z" fill="white" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M8 4h8v3a4 4 0 0 1-8 0V4Z"
        fill="#facc15"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 6H5v1a3 3 0 0 0 3 3M16 6h3v1a3 3 0 0 1-3 3M12 11v5M9 20h6M10 16h4v4h-4z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export const metadata: Metadata = {
  title: {
    default: "Hobite Capital",
    template: "%s | Hobite Capital",
  },
  description:
    "Professional equity research, portfolio strategy, and market intelligence for long-duration investors.",
};

function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-40 border-b border-zinc-200/80 bg-white/90 backdrop-blur">
      <div className="site-header-inner mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="site-brand flex items-center gap-3">
          <span className="site-monogram flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 text-sm font-semibold text-white">
            HC
          </span>
          <div>
            <p className="site-wordmark text-sm font-semibold text-zinc-900">Hobite Capital</p>
            <p className="site-tagline text-xs text-zinc-500">Research-first investing platform</p>
          </div>
        </Link>

        <nav className="site-nav hidden items-center gap-6 lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
            >
              <HomeLabel en={item.label} zh={item.zh} />
            </a>
          ))}
        </nav>

        <div className="site-social flex flex-wrap items-center justify-end gap-2">
          <a
            aria-label="Rednote"
            className="inline-flex h-9 items-center gap-2 rounded-md border border-zinc-300 bg-white px-3 text-sm font-semibold text-zinc-800 transition hover:border-zinc-500"
            href="https://xhslink.com/m/A5bzWZUH5W"
            rel="noreferrer"
            target="_blank"
          >
            <RednoteIcon />
            <span className="hidden xl:inline">Rednote</span>
          </a>
          <a
            aria-label="X.com"
            className="inline-flex h-9 items-center gap-2 rounded-md border border-zinc-300 bg-white px-3 text-sm font-semibold text-zinc-800 transition hover:border-zinc-500"
            href="https://x.com/Hobiterr"
            rel="noreferrer"
            target="_blank"
          >
            <XIcon />
            <span className="hidden xl:inline">X.com</span>
          </a>
          <a
            aria-label="YouTube"
            className="inline-flex h-9 items-center gap-2 rounded-md border border-zinc-300 bg-white px-3 text-sm font-semibold text-zinc-800 transition hover:border-zinc-500"
            href="https://www.youtube.com/@hobiter"
            rel="noreferrer"
            target="_blank"
          >
            <YouTubeIcon />
            <span className="hidden xl:inline">YouTube</span>
          </a>
          <Link
            className="inline-flex h-9 items-center gap-2 rounded-md bg-zinc-900 px-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
            href="/platform/elimination-prediction"
          >
            <TrophyIcon />
            <span className="hidden sm:inline"><HomeLabel en="World Cup 2026" zh="2026 世界杯" /></span>
          </Link>
        </div>
        <HomePreferences />
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer mt-auto border-t border-zinc-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-sm font-semibold text-zinc-900">Hobite Capital</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-zinc-600">
            <HomeLabel en="Long-duration investing research focused on business quality, portfolio construction, risk discipline, and asymmetric opportunities." zh="长期投资研究，关注企业质量、组合构建与风险管理。" />
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-zinc-900"><HomeLabel en="Platform" zh="平台" /></p>
          <div className="mt-3 space-y-3 text-sm text-zinc-600">
            <a className="block hover:text-zinc-900" href="/research">
              <HomeLabel en="Research hub" zh="研究中心" />
            </a>
            <a className="block hover:text-zinc-900" href="/platform">
              <HomeLabel en="Portfolio platform" zh="投资组合平台" />
            </a>
            <a className="block hover:text-zinc-900" href="/newsletter">
              <HomeLabel en="Weekly investor letter" zh="投资周报" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-zinc-900"><HomeLabel en="Signature pages" zh="精选页面" /></p>
          <div className="mt-3 space-y-3 text-sm text-zinc-600">
            <a className="block hover:text-zinc-900" href="/research/msft-10-year-review">
              <HomeLabel en="Microsoft 10Y report" zh="微软十年研究" />
            </a>
            <a className="block hover:text-zinc-900" href="/operation-log">
              <HomeLabel en="Operation log" zh="操作记录" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "try{var t=localStorage.getItem('hobite.home.theme');if(t==='light'||t==='dark')document.documentElement.dataset.hobiteTheme=t;}catch{}" }} />
      </head>
      <body className="min-h-full bg-zinc-50 text-zinc-950">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
