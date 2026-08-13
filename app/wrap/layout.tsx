import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GitHub Wrapped — Your GitHub Year in Review",
  description:
    "Create your personalized GitHub Wrapped and discover your year in code. See your contributions, commits, repositories, top languages, and developer activity.",
  keywords: [
    "GitHub Wrapped",
    "GitHub Wrapped 2026",
    "GitHub year in review",
    "GitHub year in code",
    "GitHub statistics",
    "GitHub contribution stats",
    "GitHub developer statistics",
  ],
  alternates: {
    canonical: "https://githubrapped.vercel.app/wrap",
  },
  openGraph: {
    title: "GitHub Wrapped — Your GitHub Year in Review",
    description:
      "Create your personalized GitHub Wrapped and discover your year in code.",
    url: "https://githubrapped.vercel.app/wrap",
    siteName: "GitHub Wrapped",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHub Wrapped — Your GitHub Year in Review",
    description:
      "Create your personalized GitHub Wrapped and discover your year in code.",
  },
};

export default function WrapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
