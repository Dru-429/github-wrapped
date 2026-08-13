import { ImageResponse } from 'next/og';
import { OgReadmeUser } from '@/lib/OgImages';

export const runtime = 'edge';
export const alt = 'Terminal Profile README';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

type PageProps = {
  params: Promise<{ username: string }>;
};

export default async function Image({ params }: PageProps) {
  const resolvedParams = await params;
  const username = resolvedParams?.username ? decodeURIComponent(resolvedParams.username) : 'anonymous';

  return new ImageResponse(
    <OgReadmeUser username={username} />,
    size
  );
}
