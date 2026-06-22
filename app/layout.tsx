import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GitHub Wrapped 2025",
  description: "Generate a Spotify-inspired GitHub Wrapped for any username — top repos, languages, commit streaks, and a shareable image.",
  metadataBase: new URL("https://githubrapped.vercel.app"),
  keywords: [
    "GitHub Wrapped",
    "GitHub Wrapped 2025",
    "GitHub Wrapped 2026",
    "Spotify Wrapped for developers",
    "My Year in Code",
    "developer stats generator",
    "git analytics report",
    "shareable dev cards",
    "commit statistics visualization",
    "open source year in review",
    "code stats flex",
    "top programming languages tracker",
    "lines of code counter",
    "coding journey 2025",
    "terminal metrics dashboard",
    "weekend vs weekday coder",
    "standup survivor statistics",
    "GitHub",
    "Wrapped",
    "Year in Code",
    "Developer Tools",
    "Open Source",
    "Dhruv Sahoo",
    "Spotify Style GitHub Wrapped"
  ],
  authors: [{ name: "Dhruv Sahoo", url: "https://www.dhruvsahoo.me/" }],
  creator: "Dhruv Sahoo",
  openGraph: {
    title: "GitHub Wrapped 2025",
    description: "Generate a Spotify-inspired GitHub Wrapped for any username — top repos, languages, commit streaks, and a shareable image.",
    url: "https://githubrapped.vercel.app/",
    siteName: "GitHub Wrapped",
    images: [
      {
        url: "/opengraph-image.png", // Pointing directly to your asset
        width: 1200,
        height: 630,
        alt: "GitHub Wrapped 2025 — Share your Year in Code",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHub Wrapped 2025",
    description: "Generate a Spotify-inspired GitHub Wrapped for any username — share your yearly GitHub highlights.",
    creator: "@10xdhruv",
    site: "@10xdhruv",
    images: ["/opengraph-image.png"], // Updated to asset name
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "GitHub Wrapped 2025",
  url: "https://githubrapped.vercel.app",
  description: "Generate a Spotify-inspired Year-in-Code summary for any GitHub username.",
  applicationCategory: "DeveloperTool",
  operatingSystem: "Web",
  author: {
    "@type": "Person",
    name: "Dhruv Sahoo",
    url: "https://www.dhruvsahoo.me/",
    sameAs: [
      "https://x.com/10xdhruv",
      "https://www.linkedin.com/in/dhruvsahoo/",
      "https://github.com/Dru-429"
    ]
  },
  screenshot: [
    "https://githubrapped.vercel.app/opengraph-image.png", // Updated JSON-LD target path
    "https://githubrapped.vercel.app/assets/loc.png",
    "https://githubrapped.vercel.app/assets/lang.png",
    "https://githubrapped.vercel.app/assets/overview.png",
    "https://githubrapped.vercel.app/assets/timeline.png",
    "https://githubrapped.vercel.app/assets/theme.jpg",
    "https://githubrapped.vercel.app/assets/dino_bg.png",
    "https://githubrapped.vercel.app/assets/x.png",
    "https://githubrapped.vercel.app/assets/cards.png",
    "https://githubrapped.vercel.app/assets/pic1.png"
  ],
  softwareVersion: "1.0",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${bebas.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}