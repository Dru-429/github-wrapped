import { ImageResponse } from 'next/og';
import { OgReadmeHome } from '@/lib/OgImages';

export const runtime = 'edge';
export const alt = 'Terminal README Generator — Custom GitHub Profile READMEs';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(<OgReadmeHome />, size);
}
