"use client"

import { Star } from "lucide-react"
import type { GitHubData } from "@/lib/types"

export function TopReposCard({ data }: { data: GitHubData }) {
  const { stats } = data

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,#DBE64C_0px,#DBE64C_8px,transparent_8px,transparent_16px)] rounded-2xl p-3">
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
            TOP REPOSITORIES
          </h2>

          {/* Repos list */}
          <div className="flex-1 space-y-3 overflow-y-auto">
            {stats.topRepos.slice(0, 5).map((repo, index) => (
              <div key={index} className="text-white/90 flex items-center justify-between px-2 py-1">
                <div className="flex-1">
                  <p className="text-sm font-medium">{repo.name}</p>
                  <p className="text-xs text-white/60">{repo.language || "Unknown"}</p>
                </div>
                {repo.stars > 0 && (
                  <div className="flex items-center gap-1 ml-2">
                    <Star className="w-4 h-4 text-[#DBE64C]" fill="#DBE64C" />
                    <span className="text-sm font-bold text-[#DBE64C]">{repo.stars}</span>
                  </div>
                )}
              </div>
            ))}
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
