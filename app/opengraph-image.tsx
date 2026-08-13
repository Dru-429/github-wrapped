import { ImageResponse } from 'next/og';
import { OgLanding } from '@/lib/OgImages';

export const runtime = 'edge';
export const alt = 'GitHub Wrapped 2025 — Spotify Style Year in Code & Terminal README';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(<OgLanding />, size);
}
