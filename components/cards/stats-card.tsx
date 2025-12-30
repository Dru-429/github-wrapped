"use client"

import type { GitHubData } from "@/lib/types"

export function StatsCard({ data }: { data: GitHubData }) {
  const { stats } = data

  const items = [
    { label: "Issues Closed", value: stats.issuesClosed || 0 },
    { label: "PRs Merged", value: stats.prsMerged || 0 },
    { label: "Lines Written", value: stats.linesOfCode || 0 },
    { label: "Commits", value: stats.totalCommits || 0 }, // SL No 4 updated to No. of commits
  ]

  return (
    <div className="flex items-center justify-center w-full h-full min-h-[600px] p-5 bg-[#F3F3F1]">
      {/* Card Container - Aspect 9:14 */}
      <div className="relative w-full h-full max-w-[400px] aspect-[9/14] bg-[#1A1A1A] text-[#F3F3F1] overflow-hidden flex flex-col justify-center items-center p-6 rounded-3xl shadow-2xl">

        {/* --- Checkerboard Decoration --- */}
        <div className="absolute top-0 left-0 w-48 h-16 pointer-events-none z-0">
          <div
            className="w-full h-full opacity-90"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, #fff 25%, #000 25%, #000 75%, #fff 75%, #fff)`,
              backgroundSize: '30px 40px',
              backgroundPosition: '0 0, 8px 8px',
              clipPath: 'polygon(0 0, 100% 0, 70% 100%, 0% 100%)'
            }}
          />
        </div>
        <div className="absolute -bottom-8 -right-10 w-48 h-16 pointer-events-none z-0">
          <div
            className="w-full h-full opacity-90"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, #fff 25%, #000 25%, #000 75%, #fff 75%, #fff)`,
              backgroundSize: '30px 40px',
              backgroundPosition: '0 0, 8px 8px',
              clipPath: 'polygon(0 0, 100% 0, 70% 100%, 0% 100%)'
            }}
          />
        </div>

        {/* --- Scribble --- */}
        <div className="absolute top-0 right-0 w-32 h-16 pointer-events-none z-0">
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-40">
            <path d="M 20 10 Q 60 50 110 0" fill="none" stroke="white" strokeWidth="1" />
            <path d="M 40 5 Q 80 40 120 10" fill="none" stroke="white" strokeWidth="1" />
          </svg>
        </div>

        {/* Vertical "Wrapped" text */}
        <div className="absolute -left-38  -rotate-90">
          <span className="text-6xl font-bold tracking-tighter font-montserrat text-[oklch(0.75_0.20_290)]">WRAPPED</span>
        </div>


        {/* --- Header --- */}
        <div className="relative z-10 mt-16 mb-10  text-center">
          <h2 className="text-3xl font-bold tracking-tight font-montserrat">Your top contributions</h2>
        </div>

        {/* --- List Items --- */}
        <div className="relative z-10 flex-1 flex flex-col gap-6 mt-8 px-2">
          {items.map((item, i) => (
            <div key={item.label} className="flex items-center gap-5">
              {/* SL Number - Light Purple */}
              <span className="text-4xl font-semibold text-[#8E86E8] min-w-[30px]">
                {i + 1}
              </span>

              {/* Value Circle - Orange */}
              <div className="flex items-center justify-center shadow-lg">
                <span className="text-2xl font-semibold font-monteserrat text-[#e7775e] ">
                  {item.value}
                </span>
              </div>

              {/* Label */}
              <span className="text-xl tracking-tight font-montserrat text-[#F3F3F1]/80">
                {item.label}
              </span>
            </div>
          ))}
        </div>


        {/* --- Footer --- */}
        <div className="w-full relative z-10 flex items-center justify-between">
          <svg
            height="32"
            viewBox="0 0 16 16"
            version="1.1"
            width="32"
            className="fill-[#e7775e]"
          >
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
          </svg>

          <span className="font-bold text-lg tracking-tight text-[#e7775e]">
            GitHub Wrapped
          </span>
        </div>

      </div>
    </div>
  )
}