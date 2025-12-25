"use client"

import { Calendar, Moon, Sun } from "lucide-react"
import type { GitHubData } from "@/lib/types"

export function ActivityCard({ data }: { data: GitHubData }) {
  const { stats } = data
  const weekdayPercent = stats.weekdayPercent || 100
  const weekendPercent = 100 - weekdayPercent

  // Determine developer type badge
  const getDeveloperBadge = () => {
    if (weekdayPercent > 85) return "The Professional"
    if (weekendPercent > 40) return "The Weekend Warrior"
    if (stats.totalCommits > 1000) return "The Committed"
    if (stats.topLanguages.length > 5) return "The Polyglot"
    return "The Developer"
  }

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,#DBE64C_0px,#DBE64C_8px,transparent_8px,transparent_16px)] rounded-2xl p-3">
        <div className="absolute inset-3 bg-[repeating-linear-gradient(0deg,#DBE64C_0px,#DBE64C_8px,transparent_8px,transparent_16px)] rounded-lg" />
        <div
          className="relative w-full h-full bg-[#001f3f] rounded-xl p-6 flex flex-col"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <div className="absolute top-4 right-4">
            <span className="text-4xl font-black text-[#DBE64C]" style={{ fontFamily: "var(--font-heading)" }}>
              WRAPPED
            </span>
          </div>

          <h2
            className="text-2xl font-black text-[#DBE64C] text-center mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            WEEKDAY VS WEEKEND
          </h2>

          <div className="flex-1 flex flex-col justify-center space-y-6">
            {/* Weekday */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sun className="w-5 h-5 text-[#DBE64C]" />
                  <span className="text-sm text-white">WEEKDAY</span>
                </div>
                <span className="text-sm font-bold text-[#DBE64C]">{weekdayPercent}%</span>
              </div>
              <div className="h-4 bg-[#DBE64C] rounded-full" style={{ width: `${weekdayPercent}%` }} />
            </div>

            {/* Weekend */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Moon className="w-5 h-5 text-white/60" />
                  <span className="text-sm text-white/60">WEEKEND</span>
                </div>
                <span className="text-sm font-bold text-white/60">{weekendPercent}%</span>
              </div>
              <div className="h-4 bg-white/20 rounded-full" style={{ width: `${weekendPercent}%` }} />
            </div>

            {/* Badge */}
            <div className="text-center mt-4 space-y-2">
              <p className="text-xs text-white/70">{getDeveloperBadge()}</p>
              <Calendar className="w-6 h-6 mx-auto text-[#DBE64C]" />
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-white/50 pt-4 border-t border-[#DBE64C]/20">
            <p>GITHUB.COM/WRAPPED</p>
          </div>
        </div>
      </div>
    </div>
  )
}
