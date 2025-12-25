"use client"

import type { GitHubData } from "@/lib/types"
import { LANGUAGE_COLORS } from "@/lib/constants"

export function TopLanguagesCard({ data }: { data: GitHubData }) {
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
            TOP LANGUAGES
          </h2>

          {/* Languages list */}
          <div className="flex-1 space-y-4">
            {stats.topLanguages.slice(0, 5).map((lang, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{lang.name}</span>
                  <span className="text-sm font-bold text-[#DBE64C]">{lang.percentage}%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${lang.percentage}%`,
                      backgroundColor: LANGUAGE_COLORS[lang.name] || "#DBE64C",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-white/80">{stats.topLanguages.length} repos</p>
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
