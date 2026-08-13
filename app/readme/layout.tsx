import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GitHub README Generator — Terminal Style | GitHub Wrapped",
  description:
    "Generate a terminal-style GitHub profile README from your GitHub username. Choose a developer template, customize it, and copy your README in seconds.",
  keywords: [
    "GitHub README generator",
    "GitHub profile README generator",
    "README generator",
    "GitHub README",
    "GitHub profile README",
    "developer README generator",
    "terminal README",
    "GitHub README template",
  ],
  alternates: {
    canonical: "https://githubrapped.vercel.app/readme",
  },
  openGraph: {
    title: "GitHub README Generator — Terminal Style",
    description:
      "Generate a terminal-style GitHub profile README, customize it, and copy it directly to GitHub.",
    url: "https://githubrapped.vercel.app/readme",
    siteName: "GitHub Wrapped",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHub README Generator — Terminal Style",
    description:
      "Generate, customize, and copy a terminal-style GitHub profile README in seconds.",
  },
};


export default function ReadmeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
