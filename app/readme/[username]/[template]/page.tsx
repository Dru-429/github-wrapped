"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Terminal,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Download,
} from "lucide-react";
import ImageUpload from "@/components/editor/ImageUpload";
import TemplateEditor from "@/components/editor/templateEditor";
import { uid, type ReadmeTemplate } from "@/components/editor/editor-state";

/**
 * /readme/[username]/[template]
 *
 * Page combining ImageUpload and TemplateEditor for a specific username
 * and template number, with an auto-fetch feature that populates template
 * details directly from GitHub API.
 */
export default function ReadmeTemplatePage() {
  const params = useParams<{ username: string; template: string }>();

  const rawUsername = params?.username
    ? decodeURIComponent(params.username)
    : "anonymous";
  const rawTemplate = params?.template ?? "1";
  const templateNo = parseInt(rawTemplate, 10) || 1;

  // Shared state for the template configuration and converted ASCII image
  const [template, setTemplate] = useState<ReadmeTemplate>({});

  // Loading and feedback states for GitHub fetch feature
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  /**
   * Fetch GitHub details via /api/github or direct GitHub REST API fallback,
   * and auto-fill template fields while leaving unfetchable fields intact.
   */
  const handleFetchGitHubData = async () => {
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

      // Classify languages into frontend and backend arrays
      const feKeywords = [
        "javascript",
        "typescript",
        "html",
        "css",
        "vue",
        "react",
        "svelte",
        "angular",
        "tailwind",
        "scss",
        "astro",
      ];
      const beKeywords = [
        "python",
        "go",
        "rust",
        "java",
        "c++",
        "c#",
        "ruby",
        "php",
        "node.js",
        "express",
        "django",
        "postgresql",
        "shell",
        "docker",
      ];

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

  return (
    <main className="min-h-screen bg-background bg-grid text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
        {/* Top Header Row / Navigation matching wireframe route title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex flex-wrap items-center justify-between gap-4"
        >
          <Link
            href={`/readme/${encodeURIComponent(rawUsername)}`}
            className="boxy-sm inline-flex items-center gap-2 bg-[var(--cream)] px-4 py-2 text-xs font-bold uppercase tracking-widest text-ink transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>back to templates</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            {/* Fetch Button */}
            <button
              onClick={handleFetchGitHubData}
              disabled={loading}
              className="boxy-sm inline-flex items-center gap-2 bg-[var(--lime)] px-4 py-2 text-xs font-bold uppercase tracking-widest text-ink transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[var(--mantis)] disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-ink" />
                  <span>Fetching...</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 text-ink" />
                  <span>Fetch GitHub Details</span>
                </>
              )}
            </button>

            {/* Wireframe route indicator badge: /readme/[username]/[template] */}
            <div className="boxy-sm inline-flex items-center gap-2 bg-[var(--nuit)] px-4 py-2 font-mono text-xs font-bold tracking-wide text-[var(--cream)]">
              <Terminal className="h-4 w-4 text-[var(--lime)]" />
              <span>
                /readme/
                <span className="text-[var(--lime)]">{rawUsername}</span>/
                <span className="text-[var(--mantis)]">[{rawTemplate}]</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Status Feedback Alerts */}
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="boxy-sm mb-6 flex items-center justify-between bg-[var(--lime)] px-4 py-2.5 text-xs font-bold text-ink"
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              {successMsg}
            </span>
            <button
              onClick={() => setSuccessMsg(null)}
              className="font-mono text-sm font-black hover:opacity-75"
            >
              ✕
            </button>
          </motion.div>
        )}

        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="boxy-sm mb-6 flex items-center justify-between bg-destructive px-4 py-2.5 text-xs font-bold text-destructive-foreground"
          >
            <span className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {errorMsg}
            </span>
            <button
              onClick={() => setErrorMsg(null)}
              className="font-mono text-sm font-black hover:opacity-75"
            >
              ✕
            </button>
          </motion.div>
        )}

        {/* Main Content Area following wireframe vertical layout */}
        <div className="flex flex-col gap-8">
          {/* Top Box: Image Upload (Left: Upload controls, Right: Image preview) */}
          {templateNo === 1 ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ImageUpload setTemplateAction={setTemplate} />
            </motion.div>
          ) : null}

          {/* Bottom Box: Template Editor (Header: Edit | Preview + COPY, Content: Section Editor / Preview) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TemplateEditor
              template={template}
              setTemplateAction={setTemplate}
              username={rawUsername}
              templateNo={templateNo}
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
}