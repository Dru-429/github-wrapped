"use client"

import type { GitHubData } from "@/lib/types"

export function CommitRaceCard({ data }: { data: GitHubData }) {
  const { stats } = data

  const getMessage = (commits: number) => {
    if (commits >= 1000) return "🚀 Top 10%! Unstoppable!"
    if (commits >= 700) return "⭐ Top 25%! Very impressive!"
    if (commits >= 400) return "💪 Top 50%! Solid commitment!"
    if (commits >= 200) return "📈 Top 75%! Keep pushing!"
    return "🌱 Growing your skills!"
  }

  const getPercentile = (commits: number) => {
    if (commits >= 1000) return "TOP 10%"
    if (commits >= 700) return "TOP 25%"
    if (commits >= 400) return "TOP 50%"
    if (commits >= 200) return "TOP 75%"
    return "GROWING"
  }

  return (
    <div className="w-full h-full bg-card border border-border rounded-3xl p-8 md:p-12 flex flex-col justify-center space-y-8 shadow-lg">
      <h2 className="text-3xl font-bold text-center">🏁 THE COMMIT RACE</h2>

      <div className="space-y-6 text-center">
        <div>
          <p className="text-muted-foreground text-lg mb-2">Your commits</p>
          <p className="text-7xl font-bold font-mono">{stats.totalCommits.toLocaleString()}</p>
        </div>

        <div className="space-y-3">
          <div className="h-6 bg-muted rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
              style={{ width: `${Math.min(stats.percentile, 100)}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-foreground rounded-full border-4 border-background"
              style={{ left: `${Math.min(stats.percentile, 100)}%` }}
            />
          </div>
        </div>

        <div>
          <p className="text-4xl font-bold text-[#1DB954]">{getPercentile(stats.totalCommits)}</p>
          <p className="text-xl text-muted-foreground mt-2">{getMessage(stats.totalCommits)}</p>
        </div>

      </div>
    </div>
  )
}
