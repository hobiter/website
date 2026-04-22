import type { Metadata } from "next";
import "./globals.css";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Research" },
  { href: "/platform", label: "Platform" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/operation-log", label: "Track Record" },
];

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
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900 text-sm font-semibold text-white">
            HC
          </span>
          <div>
            <p className="text-sm font-semibold text-zinc-900">Hobite Capital</p>
            <p className="text-xs text-zinc-500">Research-first investing platform</p>
          </div>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="/newsletter"
          className="rounded-2xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
        >
          Join newsletter
        </a>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-sm font-semibold text-zinc-900">Hobite Capital</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-zinc-600">
            Long-duration investing research focused on business quality, portfolio
            construction, risk discipline, and asymmetric opportunities.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-zinc-900">Platform</p>
          <div className="mt-3 space-y-3 text-sm text-zinc-600">
            <a className="block hover:text-zinc-900" href="/research">
              Research hub
            </a>
            <a className="block hover:text-zinc-900" href="/platform">
              Portfolio platform
            </a>
            <a className="block hover:text-zinc-900" href="/newsletter">
              Weekly investor letter
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-zinc-900">Signature pages</p>
          <div className="mt-3 space-y-3 text-sm text-zinc-600">
            <a className="block hover:text-zinc-900" href="/research/msft-10-year-review">
              Microsoft 10Y report
            </a>
            <a className="block hover:text-zinc-900" href="/operation-log">
              Operation log
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
    <html lang="en" className="h-full antialiased">
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
