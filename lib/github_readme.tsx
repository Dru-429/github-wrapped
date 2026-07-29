import {
  BACKEND_SUGGESTIONS,
  FRONTEND_SUGGESTIONS,
  uid,
  type ReadmeTemplate,
} from "../components/editor/editor-state";

export const handleFetchGitHubData = async (
  rawUsername: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>,
  setSuccessMsg: React.Dispatch<React.SetStateAction<string | null>>,
  setTemplate: React.Dispatch<React.SetStateAction<ReadmeTemplate>>
) => {
  if (!rawUsername || rawUsername === "anonymous") {
    setErrorMsg("Please specify a valid GitHub username in the URL.");
    return;
  }

  setLoading(true);
  setErrorMsg(null);
  setSuccessMsg(null);

  try {
    let name = rawUsername;
    let bio = "";
    let profileUrl = `https://github.com/${rawUsername}`;
    let topLangs: string[] = [];
    let topRepoNames: string[] = [];

    // Primary attempt: Call server-side /api/github endpoint
    const res = await fetch("/api/github", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: rawUsername }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.user) {
        name = data.user.name || data.user.login || rawUsername;
        bio = data.user.bio || "";
        profileUrl = data.user.profileUrl || profileUrl;
      }
      if (data.stats?.topLanguages?.length) {
        topLangs = data.stats.topLanguages.map((l: { name: string }) => l.name);
      }
      if (data.stats?.topRepos?.length) {
        topRepoNames = data.stats.topRepos.map((r: { name: string }) => r.name);
      }
    } else {
      // Fallback attempt: Directly query GitHub Public REST API
      const userRes = await fetch(
        `https://api.github.com/users/${encodeURIComponent(rawUsername)}`
      );
      if (userRes.ok) {
        const userData = await userRes.json();
        name = userData.name || userData.login || rawUsername;
        bio = userData.bio || "";
        profileUrl = userData.html_url || profileUrl;
      }

      const reposRes = await fetch(
        `https://api.github.com/users/${encodeURIComponent(
          rawUsername
        )}/repos?sort=updated&per_page=30`
      );
      if (reposRes.ok) {
        const reposData = await reposRes.json();
        if (Array.isArray(reposData)) {
          const langMap: Record<string, number> = {};
          reposData.forEach((repo: { language?: string }) => {
            if (repo.language) {
              langMap[repo.language] = (langMap[repo.language] || 0) + 1;
            }
          });
          topLangs = Object.keys(langMap)
            .sort((a, b) => langMap[b] - langMap[a])
            .slice(0, 6);
          topRepoNames = reposData.slice(0, 5).map((r: { name: string }) => r.name);
        }
      }
    }

    // Classify languages into frontend and backend arrays using lowercase comparison
    const feKeywords = FRONTEND_SUGGESTIONS.map((s) => s.toLowerCase());
    const beKeywords = BACKEND_SUGGESTIONS.map((s) => s.toLowerCase());

    const frontendLangs: string[] = [];
    const backendLangs: string[] = [];

    topLangs.forEach((lang) => {
      const lower = lang.toLowerCase();
      if (feKeywords.includes(lower)) {
        frontendLangs.push(lang);
      } else if (beKeywords.includes(lower)) {
        backendLangs.push(lang);
      } else {
        frontendLangs.push(lang);
      }
    });

    // Update template state safely with fetched data
    setTemplate((prev) => {
      const next = { ...prev };

      // 1. Fill about if bio exists
      if (bio.trim()) {
        next.about = bio;
      }

      // 2. Fill bio template with fetched details
      next.bio = [
        `🔭 I am ${name}`,
        `🌱 I am currently mastering ${
          topLangs.slice(0, 3).join(", ") || "software development"
        }`,
        `🎯 My goal is to build impactful open-source software`,
        `💡 Ask me about ${topLangs[0] || "coding"}`,
      ].join("\n");

      // 3. Fill languages (frontend & backend)
      if (frontendLangs.length > 0 || backendLangs.length > 0) {
        next.language = {
          frontend: Array.from(
            new Set([...(prev.language?.frontend || []), ...frontendLangs])
          ),
          backend: Array.from(
            new Set([...(prev.language?.backend || []), ...backendLangs])
          ),
        };
      }

      // 4. Fill contact links (GitHub profile)
      const githubContact = {
        id: uid(),
        name: "GitHub",
        url: profileUrl,
      };
      const existingContacts = prev.contact || [];
      if (
        !existingContacts.some(
          (c) => c.name.toLowerCase() === "github" || c.url === profileUrl
        )
      ) {
        next.contact = [...existingContacts, githubContact];
      }

      // 5. Fill tools with top repositories
      if (topRepoNames.length > 0) {
        next.tools = Array.from(
          new Set([...(prev.tools || []), ...topRepoNames])
        );
      }

      return next;
    });

    setSuccessMsg(`Successfully fetched details for @${rawUsername}!`);
  } catch (err: unknown) {
    console.error("Error fetching GitHub details:", err);
    setErrorMsg(
      "Could not fetch details. Please check the username or network connection."
    );
  } finally {
    setLoading(false);
  }
};

export default handleFetchGitHubData;