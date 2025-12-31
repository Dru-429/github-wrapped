"use client"

import type { GitHubData } from "@/lib/types"

export function CommitRaceCard({ data }: { data: GitHubData }) {
  const { stats } = data
  const commits = stats.totalCommits || 0
  const year = "2025"

  const getMessage = (commits: number) => {
    if (commits >= 1000) return "Top 10%! Unstoppable!"
    if (commits >= 700) return "Top 25%! Very impressive!"
    if (commits >= 400) return "Top 50%! Solid commitment!"
    if (commits >= 200) return "Top 75%! Keep pushing!"
    return "🌱 Growing your skills!"
  }

  return (
    <div className="flex items-center justify-center w-full h-full min-h-[600px] bg-black p-4 rounded-3xl">

      {/* Card Container */}
      <div className="relative w-full max-w-[400px] aspect-[9/14] bg-[#1A1A1A] text-[#F3F3F1] overflow-hidden flex flex-col items-center justify-between p-6 rounded-3xl shadow-2xl">
        {/* --- SVG Lines */}
        <div className="absolute -top-30 w-full h-full pointer-events-none z-0">
          <svg viewBox="0 0 400 400" className="w-full h-full opacity-90">
            {/* Main long sweep */}
            <path
              d="M -20 80 C 50 20, 250 100, 420 10"
              fill="none"
              stroke="#64c46d"
              strokeWidth="2"
              className="opacity-70"
            />
            {/* Tighter top curve */}
            <path
              d="M -10 40 C 100 -20, 300 60, 410 40"
              fill="none"
              stroke="#64c46d"
              strokeWidth="2"
              className="opacity-40"
            />
            {/* Sharp intersecting line */}
            <path
              d="M -30 20 C 150 120, 350 -40, 430 30"
              fill="none"
              stroke="#64c46d"
              strokeWidth="2"
              className="opacity-50"
            />
            {/* Subtle high accent line */}
            <path
              d="M 50 -10 C 200 50, 380 10, 400 0"
              fill="none"
              stroke="#64c46d"
              strokeWidth="1.5"
              className="opacity-30"
            />
          </svg>
        </div>

        {/* --- Main Content --- */}
        <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-center gap-4">

          { /* Header */}
          <div className="relative z-10 pt-6 text-center">
            <h2 className="text-xl font-bold tracking-tight text-[#f3f3f1] font-montserrat">
              {`Code like yours can't be defined.`}
            </h2>
            <span className="text-lg font-semibold tracking-tight text-[#f3f3f1] font-montserrat">
              But if commit is a race then
            </span>
          </div>

          {/* Commits Counts */}
          <div className="relative w-full flex items-center justify-center">
            <span
              className="text-[140px] leading-none text-[#64c46d] tracking-tightest font-bebas [-webkit-text-stroke:1px_white] drop-shadow-sm"
            >
              {commits ? commits.toLocaleString() : "0"}
            </span>
          </div>

          {/* Caption */}

          <div className="text-center -mt-2 space-y-2 max-w-[90%]">
            <p className="text-xl tracking-wide text-zinc-100 font-bold font-montserrat">Commits in {year}</p>
            {/* <p className="text-md text-[#f3f3f1ca] font-medium leading-relaxed font-montserrat">
              You used <span className="text-white font-bold">{(stats.topLanguages || []).length}</span> primary languages.
            </p> */}
            <p className="text-sm text-[#64c46d] tracking-wide mt-2">{getMessage(commits || 0)}</p>
          </div>

        </div>

        {/* --- Footer (kept same as LOCCard) --- */}
        <div className="w-full relative z-10 flex items-center justify-between px-2 pt-4">
          <svg
            height="32"
            viewBox="0 0 16 16"
            version="1.1"
            width="32"
            aria-hidden="true"
            className="fill-[#64c46d]"
          >
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
          </svg>

          <span className="font-bold text-lg tracking-tight text-[#64c46d]">
            Github Wrapped
          </span>
        </div>
      </div>
    </div>
  )
}
