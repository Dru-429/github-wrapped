"use client"

import { Trophy, Zap } from "lucide-react"
import type { GitHubData } from "@/lib/types"

export function ContributionStreakCard({ data }: { data: GitHubData }) {
  const { stats } = data

  return (
    <div className="w-full h-full bg-card border border-border rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center text-center space-y-8 shadow-lg rounded-3xl" >
      <div className="space-y-2">
        <p className="text-3xl">🔥 Your 2025</p>
      </div>

      <div className="space-y-2">
        <p className="text-8xl md:text-9xl font-bold font-mono">{stats.totalCommits.toLocaleString()}</p>
        <p className="text-3xl font-semibold tracking-wider text-muted-foreground">COMMITS</p>
      </div>

      <div className="w-full border-t border-border pt-8 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-lg">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Longest Streak
            </span>
            <span className="font-bold text-xl">{stats.longestStreak} days</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
              style={{ width: `${Math.min((stats.longestStreak / 365) * 100, 100)}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-lg">
              <Zap className="w-5 h-5 text-blue-500" />
              Current Streak
            </span>
            <span className="font-bold text-xl">{stats.currentStreak} days</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              style={{ width: `${Math.min((stats.currentStreak / 365) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">Jan 1 → Dec 31, 2025</p>
    </div>
  )
}
