import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Bebas_Neue } from "next/font/google";
import "./globals.css";

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
  weight: ["100","200","300","400","500","600","700","800","900"],
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
  metadataBase: new URL("https://githubwrapped-2025.vercel.app/"),
  openGraph: {
    title: "GitHub Wrapped 2025",
    description: "Generate a Spotify-inspired GitHub Wrapped for any username — top repos, languages, commit streaks, and a shareable image.",
    url: "/",
    siteName: "GitHub Wrapped",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GitHub Wrapped 2025",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHub Wrapped 2025",
    description: "Generate a Spotify-inspired GitHub Wrapped for any username — share your yearly GitHub highlights.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${bebas.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
