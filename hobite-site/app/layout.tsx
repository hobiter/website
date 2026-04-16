import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hobite Capital",
  description: "Research-driven investing insights, portfolio thinking, and market intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
