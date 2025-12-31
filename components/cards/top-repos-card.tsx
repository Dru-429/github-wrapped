"use client"

import { Star } from "lucide-react"
import type { GitHubData } from "@/lib/types"

export function TopReposCard({ data }: { data: GitHubData }) {
  const { stats } = data
  const repos = stats.topRepos || []

  return (
    <div className="flex items-center justify-center w-full h-full min-h-[600px] p-5 bg-[#1A1A1A] rounded-3xl">
      <div className="relative h-full w-full max-w-[400px] aspect-[9/14] bg-[#F3F3F1] overflow-hidden flex flex-col rounded-3xl shadow-2xl justify-center items-center">

        {/* --- Decorative Top Line Art (subtle) --- */}
        <div className="absolute top-0 left-0 w-full h-[160px] pointer-events-none z-0">
          <svg viewBox="0 0 400 160" className="w-full h-full opacity-90">
            {/* Long sweep from top left to top right */}
            <path
              d="M -20 10 C 100 80, 250 -20, 420 30"
              fill="none"
              stroke="#1A1A1A"
              strokeWidth="1.2"
              className="opacity-90"
            />
            {/* Tighter overlapping curve starting from the top center */}
            <path
              d="M 150 -10 C 200 60, 320 0, 410 10"
              fill="none"
              stroke="#1A1A1A"
              strokeWidth="1.2"
              className="opacity-85"
            />
            {/* Sharp intersecting line creating the "V" or "X" effect seen in image_1547c4.png */}
            <path
              d="M -10 60 C 120 20, 300 100, 430 -10"
              fill="none"
              stroke="#1A1A1A"
              strokeWidth="1.2"
              className="opacity-70"
            />
            {/* Very subtle high accent line */}
            <path
              d="M 80 -5 C 180 30, 350 -10, 400 5"
              fill="none"
              stroke="#1A1A1A"
              strokeWidth="1"
              className="opacity-80"
            />
          </svg>
        </div>

        {/* --- Header --- */}
        <div className="relative z-10 -mt-14 mb-10 px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1A] font-montserrat">Your top repositories</h2>
        </div>

        {/* --- Repos list --- */}
        <div className="relative z-10 w-[90%] flex flex-col gap-3 px-4 mt-4 overflow-hidden">
          {repos.slice(0, 5).map((repo, index) => {
            return (
              <div key={repo.name} className="flex items-center justify-between py-2 pb-1 border-b-2 border-[#1A1A1A]/50">
                <div className="flex items-center gap-3">
                  <span className={`text-2xl font-semibold bebas-neue-regular text-[#F75D22]`}>
                    {index + 1}
                  </span>

                  <div className="flex flex-col">
                    <span className="text-lg font-bold font-montserrat uppercase text-[#1A1A1A]">{repo.name}</span>
                    <div className="flex items-center gap-2">
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <Star className="w-4 h-4 text-[#F94A36]" fill="#F94A36" />
                  <span className="text-sm font-semibold text-[#1A1A1A]">{repo.stars}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* --- Footer --- */}
        <div className="w-full absolute bottom-4 px-4 -left-1 flex items-center justify-between">
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

        {/* Decorative bubble */}
        <div className="h-[80%] w-fit flex flex-col gap-14 absolute -left-4 top-38">
          <div className="bg-[#968CFD] rounded-full w-10 h-10 "></div>
          <div className="bg-[#968CFD] rounded-full w-10 h-10 "></div>
          <div className="bg-[#968CFD] rounded-full w-10 h-10 "></div>
          <div className="bg-[#968CFD] rounded-full w-10 h-10 "></div>
        </div>

      </div>
    </div>
  )
}
