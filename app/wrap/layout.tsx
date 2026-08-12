import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Your GitHub Wrapped 2025 — Spotify Style",
  description: "Generate a Spotify-inspired GitHub Wrapped for any username — total commits, top languages, commit streaks, and shareable cards.",
  openGraph: {
    title: "Get Your GitHub Wrapped 2025 — Spotify Style",
    description: "Generate a Spotify-inspired GitHub Wrapped for any username — total commits, top languages, commit streaks, and shareable cards.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Your GitHub Wrapped 2025 — Spotify Style",
    description: "Generate a Spotify-inspired GitHub Wrapped for any username.",
  },
};

export default function WrapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
