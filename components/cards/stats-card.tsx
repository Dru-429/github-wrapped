"use client"
import type { GitHubData } from "@/lib/types"

export function StatsCard({ data }: { data: GitHubData }) {
  const { stats } = data

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
            CONTRIBUTIONS
          </h2>

          <div className="flex-1 flex flex-col items-center justify-center space-y-6">
            {/* Issues Closed */}
            <div className="text-center space-y-2">
              <p className="text-5xl font-black text-white">{stats.issuesClosed || 0}</p>
              <p className="text-sm text-white/80">Issues Closed</p>
              <p className="text-xs text-white/60">Problem-solving capability</p>
            </div>

            {/* PRs Merged */}
            <div className="text-center space-y-2">
              <p className="text-5xl font-black text-white">{stats.prsMerged || 0}</p>
              <p className="text-sm text-white/80">PRs Merged</p>
              <p className="text-xs text-white/60">Collaboration impact</p>
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
