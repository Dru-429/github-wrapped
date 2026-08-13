import { ImageResponse } from 'next/og';
import { OgWrapUser } from '@/lib/OgImages';
import { fetchGitHubData } from '@/lib/github';

export const runtime = 'edge';
export const alt = 'GitHub Wrapped 2025 — Year in Code';
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

  let commits = '2,481';
  let loc = '184k';
  let language = 'TypeScript';
  let streak = '37 days';

  try {
    const githubData = await fetchGitHubData(username);
    if (githubData && githubData.stats) {
      commits = githubData.stats.totalCommits.toLocaleString();
      const locVal = githubData.stats.linesOfCode ?? 0;
      loc = locVal >= 1000 ? `${(locVal / 1000).toFixed(0)}k` : locVal.toString();
      language = githubData.stats.topLanguages[0]?.name || 'N/A';
      streak = `${githubData.stats.longestStreak} days`;
    }
  } catch (err) {
    console.error('Error fetching github data for wrap OG image:', err);
  }

  return new ImageResponse(
    <OgWrapUser
      username={username}
      commits={commits}
      loc={loc}
      language={language}
      streak={streak}
    />,
    size
  );
}
