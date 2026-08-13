import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const decoded = decodeURIComponent(username);

  return {
    title: `${decoded}'s Terminal README Generator`,
    description: `Create and customize a terminal-style GitHub profile README for @${decoded}. Choose from Neofetch, Bash, YAML, and package.json templates.`,
    openGraph: {
      title: `${decoded}'s Terminal README Generator`,
      description: `Create and customize a terminal-style GitHub profile README for @${decoded}. Choose from Neofetch, Bash, YAML, and package.json templates.`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${decoded}'s Terminal README Generator`,
      description: `Create and customize a terminal-style GitHub profile README for @${decoded}.`,
    },
  };
}

export default function ReadmeUsernameLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
