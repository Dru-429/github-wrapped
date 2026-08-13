import type { Metadata } from "next"
import { WrapPageClient } from "./wrap-page-client"

type Props = {
  params: Promise<{ username: string }>
}

const baseUrl = "https://githubrapped.vercel.app";

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { username } = await params;

  const decodedUsername = decodeURIComponent(username);

  const title = `${decodedUsername}'s GitHub Wrapped — Year in Review`;

  const description = `Explore ${decodedUsername}'s GitHub Wrapped, including contributions, repositories, commits, programming languages, and developer activity.`;

  const pageUrl = `${baseUrl}/wrap/${encodeURIComponent(decodedUsername)}`;

  const ogImageUrl = `${pageUrl}/opengraph-image`;

  return {
    title,
    description,

    alternates: {
      canonical: pageUrl,
    },

    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "GitHub Wrapped",
      type: "profile",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${decodedUsername}'s GitHub Wrapped`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}


export default async function WrapPage({ params }: Props) {
  const { username } = await params

  return <WrapPageClient username={username} />
}
