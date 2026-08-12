import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terminal README Generator — GitHub Wrapped",
  description: "Generate and customize terminal-themed GitHub profile READMEs in seconds. Choose from 4 unique developer templates.",
  openGraph: {
    title: "Terminal README Generator — GitHub Wrapped",
    description: "Generate and customize terminal-themed GitHub profile READMEs in seconds.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terminal README Generator — GitHub Wrapped",
    description: "Generate and customize terminal-themed GitHub profile READMEs in seconds.",
  },
};

export default function ReadmeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
