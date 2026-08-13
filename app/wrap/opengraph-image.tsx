import { ImageResponse } from 'next/og';
import { OgWrapHome } from '@/lib/OgImages';

export const runtime = 'edge';
export const alt = 'Get Your GitHub Wrapped 2025 — Spotify Style Developer Cards';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(<OgWrapHome />, size);
}
