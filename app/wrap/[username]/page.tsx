import type { Metadata } from "next"
import { WrapPageClient } from "./wrap-page-client"

type Props = {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params
  const decoded = decodeURIComponent(username)

  return {
    title: `${decoded}'s GitHub Wrapped 2025`,
    description: `Check out ${decoded}'s Spotify-inspired GitHub Wrapped 2025 — total commits, top languages, commit streaks, and stats cards.`,
    openGraph: {
      title: `${decoded}'s GitHub Wrapped 2025`,
      description: `Check out ${decoded}'s Spotify-inspired GitHub Wrapped 2025 — total commits, top languages, commit streaks, and stats cards.`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${decoded}'s GitHub Wrapped 2025`,
      description: `Check out ${decoded}'s Spotify-inspired GitHub Wrapped 2025.`,
    },
  }
}

export default async function WrapPage({ params }: Props) {
  const { username } = await params

  return <WrapPageClient username={username} />
}
