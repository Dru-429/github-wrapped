"use client"

import type { GitHubData } from "@/lib/types"

type Quarter = { label: string; season: string; commits: number }

function QuarterMini({ quarters, maxCommits, small = false }: { quarters: Quarter[]; maxCommits: number; small?: boolean }) {
  return (
    <div className={`${small ? "p-3" : "p-6"} bg-white rounded-lg w-full`}>

      <div className="flex flex-col gap-3">
        {quarters.map((q, i) => {
          const color = i < 2 ? '#F94A36' : '#6F56E4'
          return (
            <div key={q.label} className="flex items-center gap-3">
              <div className={`${small ? 'text-base' : 'text-xl'} font-bold text-[#F94A36]`}>{i + 1}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className={`${small ? 'text-sm' : 'text-base'} text-[#1A1A1A] font-montserrat`}>
                    {q.label} • {q.season}
                  </div>
                  <div className={`${small ? 'text-sm' : 'text-base'} font-semibold text-[#1A1A1A]`}>
                    {q.commits}
                  </div>
                </div>
                <div className="h-2 bg-[#1A1A1A]/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(q.commits / maxCommits) * 100}%`, background: color }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function TimelineCard({ data }: { data: GitHubData }) {
  const { stats } = data

  const quarters = [
    { label: "Q1", season: "Jan-Mar", commits: stats.seasonalData.Q1 },
    { label: "Q2", season: "Apr-Jun", commits: stats.seasonalData.Q2 },
    { label: "Q3", season: "Jul-Sep", commits: stats.seasonalData.Q3 },
    { label: "Q4", season: "Oct-Dec", commits: stats.seasonalData.Q4 },
  ]

  const maxCommits = Math.max(...quarters.map((q) => q.commits), 1)
  const totalActivity = stats.totalCommits ?? 0
  const activeQuarters = quarters.filter((q) => q.commits > 0).length
  const peakMonth = stats.seasonalData.peakMonth || "-"


  return (
    <div className="flex items-center justify-center w-full h-full min-h-[600px] p-5 bg-[#1A1A1A]">
      <div className="relative w-full max-w-[400px] aspect-9/14 bg-[#F3F3F1] border-[3px] border-black overflow-hidden flex flex-col shadow-2xl pt-6 rounded-3xl">

        {/* --- Decorative Top Line Art (subtle) --- */}
        <div className="absolute top-0 left-0 w-full h-[160px] pointer-events-none z-0">
          <svg viewBox="0 0 400 160" className="w-full h-full opacity-90">
            {/* Long sweep from top left to top right */}
            <path
              d="M -20 10 C 100 80, 250 -20, 420 30"
              fill="none"
              stroke="#1A1A1A"
              strokeWidth="1.2"
              className="opacity-50"
            />
            {/* Tighter overlapping curve starting from the top center */}
            <path
              d="M 150 -10 C 200 60, 320 0, 410 10"
              fill="none"
              stroke="#1A1A1A"
              strokeWidth="1.2"
              className="opacity-45"
            />
            {/* Sharp intersecting line creating the "V" or "X" effect seen in image_1547c4.png */}
            <path
              d="M -10 60 C 120 20, 300 100, 430 -10"
              fill="none"
              stroke="#1A1A1A"
              strokeWidth="1.2"
              className="opacity-30"
            />
            {/* Very subtle high accent line */}
            <path
              d="M 80 -5 C 180 30, 350 -10, 400 5"
              fill="none"
              stroke="#1A1A1A"
              strokeWidth="1"
              className="opacity-50"
            />
          </svg>
        </div>


        {/* Card content */}
        <div className="relative z-10 px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#1A1A1A] font-montserrat">2025 Journey</h2>
          </div>

          {/* quarter breakdown */}
          <div className="mb-8">
            <QuarterMini quarters={quarters} maxCommits={maxCommits} />
          </div>

          {/* Grid stats */}
          <div className="grid grid-cols-2 gap-6 text-[#1A1A1A]">
            <div className="flex flex-col items-center">
              <div className="text-sm text-[#1A1A1A]/70">Peak Month</div>
              <div className="text-4xl font-extrabold mt-2">{peakMonth}</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-sm text-[#1A1A1A]/70">Q1 Activity</div>
              <div className="text-4xl font-extrabold mt-2">{quarters[0].commits}</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-sm text-[#1A1A1A]/70">Total Activity</div>
              <div className="text-4xl font-extrabold mt-2">{totalActivity}</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-sm text-[#1A1A1A]/70">Active Quarters</div>
              <div className="text-4xl font-extrabold mt-2">{activeQuarters}</div>
            </div>
          </div>
        </div>

                {/* --- Footer --- */}
        <div className="w-full absolute bottom-4 px-4 flex items-center justify-between">
          <svg
            height="32"
            viewBox="0 0 16 16"
            version="1.1"
            width="32"
            aria-hidden="true"
            className="fill-black"
          >
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
          </svg>

          <span className="text-black font-semibold font-montserrat text-lg" >
            Github Wrapped
          </span>
        </div>

      </div>
    </div>
  )
}
