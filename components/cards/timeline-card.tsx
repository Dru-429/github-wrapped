"use client"

import type { GitHubData } from "@/lib/types"

export function TimelineCard({ data }: { data: GitHubData }) {
  const { stats } = data
  const quarters = [
    { label: "Q1", season: "Jan-Mar", commits: stats.seasonalData.Q1 },
    { label: "Q2", season: "Apr-Jun", commits: stats.seasonalData.Q2 },
    { label: "Q3", season: "Jul-Sep", commits: stats.seasonalData.Q3 },
    { label: "Q4", season: "Oct-Dec", commits: stats.seasonalData.Q4 },
  ]

  const maxCommits = Math.max(...quarters.map((q) => q.commits))

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#000,#000_10px,#fff_10px,#fff_20px)] rounded-2xl p-3">
        <div className="relative w-full h-full bg-[oklch(0.55_0.18_290)] rounded-xl p-4 flex flex-col">
          {/* Vertical "Wrapped" text */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
            <span className="text-6xl font-black tracking-wider text-[oklch(0.75_0.20_290)]">WRAPPED</span>
          </div>

          {/* Content area */}
          <div className="ml-16 flex-1 flex flex-col justify-between">
            <div className="pt-8 space-y-6">
              <h2 className="text-2xl font-bold text-white text-center">Your 2025 Journey</h2>

              {/* Quarterly breakdown */}
              <div className="space-y-4 px-4">
                {quarters.map((quarter, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white">
                        {quarter.label} • {quarter.season}
                      </span>
                      <span className="text-sm font-bold text-white">{quarter.commits}</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full"
                        style={{ width: `${(quarter.commits / maxCommits) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Peak month footer */}
            <div className="pb-4 space-y-1">
              <p className="text-center text-sm text-white/70">Peak Month</p>
              <p className="text-center text-3xl font-black text-white">{stats.seasonalData.peakMonth}</p>
            </div>

            {/* Footer */}
            <div className="border-t border-white/20 pt-3">
              <p className="text-center text-xs text-white/50">GITHUB.COM/WRAPPED</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
