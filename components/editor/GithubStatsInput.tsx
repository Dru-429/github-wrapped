"use client";

import { useState } from "react";
import { Download, Loader2, Sparkles } from "lucide-react";
import type { GitHubStatsState } from "./editor-state";
import handleFetchGitHubData from "@/lib/github_readme";

type GithubStatsInputProps = {
  value: GitHubStatsState;
  onChange: (value: GitHubStatsState) => void;
  username?: string;
};

export default function GithubStatsInput({
  value,
  onChange,
  username = "anonymous",
}: GithubStatsInputProps) {
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const updateField = (field: keyof GitHubStatsState, val: string) => {
    onChange({
      ...value,
      [field]: val,
    });
  };

  const handleFetchClick = async () => {
    if (!username || username === "anonymous") return;
    setLoading(true);
    setStatusMsg(null);
    try {
      // Call handleFetchGitHubData which will populate template state including stats
      const fakeSetTemplate = (action: any) => {
        const dummyPrev = { stats: value };
        const next = typeof action === "function" ? action(dummyPrev) : action;
        if (next && next.stats) {
          onChange(next.stats);
        }
      };
      await handleFetchGitHubData(
        username,
        setLoading,
        () => setStatusMsg("Failed to fetch stats"),
        () => setStatusMsg("Stats updated from GitHub!"),
        fakeSetTemplate as any
      );
    } catch {
      setStatusMsg("Error fetching stats");
    } finally {
      setLoading(false);
    }
  };

  const fields: { key: keyof GitHubStatsState; label: string; placeholder: string }[] = [
    { key: "repos", label: "Repos", placeholder: "95" },
    { key: "contributed", label: "Contributed", placeholder: "133" },
    { key: "stars", label: "Stars", placeholder: "342" },
    { key: "commits", label: "Commits", placeholder: "2,116" },
    { key: "followers", label: "Followers", placeholder: "196" },
    { key: "linesOfCode", label: "Lines of Code", placeholder: "446,276" },
    { key: "additions", label: "Additions (++)", placeholder: "523,178" },
    { key: "deletions", label: "Deletions (--)", placeholder: "76,902" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Top Fetch Action Bar inside Section Card */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-2 border-ink bg-cream p-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-ink" />
          <span className="font-display text-xs font-bold uppercase tracking-wide text-ink">
            Fetch Stats for @{username}
          </span>
        </div>
        <button
          type="button"
          onClick={handleFetchClick}
          disabled={loading || !username || username === "anonymous"}
          className="border-2 border-ink bg-lime px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink transition-transform hover:-translate-y-0.5 hover:bg-mantis disabled:opacity-50"
        >
          {loading ? (
            <span className="inline-flex items-center gap-1">
              <Loader2 className="h-3 w-3 animate-spin" /> Fetching...
            </span>
          ) : (
            <span className="inline-flex items-center gap-1">
              <Download className="h-3 w-3" /> Fetch Stats
            </span>
          )}
        </button>
      </div>

      {statusMsg && (
        <p className="text-xs font-bold text-ink bg-lime/30 border border-ink p-1.5 text-center">
          {statusMsg}
        </p>
      )}

      {/* Grid of Inputs */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {fields.map((f) => (
          <label key={f.key} className="flex flex-col gap-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {f.label}
            </span>
            <input
              type="text"
              value={value[f.key] ?? ""}
              onChange={(e) => updateField(f.key, e.target.value)}
              placeholder={f.placeholder}
              className="border-2 border-ink bg-cream px-2.5 py-1.5 text-xs font-bold text-ink outline-none placeholder:text-muted-foreground/50"
            />
          </label>
        ))}
      </div>
    </div>
  );
}
