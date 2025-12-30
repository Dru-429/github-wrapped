"use client"

import { Moon, Sun } from "lucide-react"
import type { GitHubData } from "@/lib/types"

export function ActivityCard({ data }: { data: GitHubData }) {
  const { stats } = data
  const weekdayPercent = Math.round(stats.weekdayPercent ?? 100)
  const weekendPercent = 100 - weekdayPercent

  // Determine developer type badge
  const getDeveloperBadge = () => {
    // Hardcore Weekday Grinders (The 9-to-5ers and beyond)
    if (weekdayPercent > 95) return "THE CORPORATE ARCHITECT" // Literally doesn't touch a keyboard on Saturday
    if (weekdayPercent > 65) return "THE STAND-UP SURVIVOR"

    // Weekend Warriors (The "I have no hobbies" group)
    if (weekendPercent > 70) return "THE SOCIAL LIFE? NEVER HEARD OF HER"
    if (weekendPercent > 50) return "THE SUNDAY SEMICOLON"
    if (weekendPercent > 30) return "THE LATE NIGHT LINT-ER"

    // Mixed Logic (The Chaotic/Productive)
    if (stats.totalCommits > 2000) return "THE MERGE CONFLICT MAGNET"
    if (stats.totalCommits > 1000 && weekendPercent > 40) return "THE FULL-TIME HOBBYIST"

    // Language specific
    if (stats.topLanguages.length > 8) return "THE SYNTAX HOARDER"
    if (stats.topLanguages.length > 5) return "THE JACK OF ALL TRADES, MASTER OF NONE"

    // Specific Behavior Tags
    if (weekdayPercent > 45 && weekdayPercent < 55) return "THE PERFECTLY BALANCED BOT"

    // Default hilarity
    return "THE 'IT WORKS ON MY MACHINE' DEVELOPER"
  }
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[600px] p-5 bg-[#1A1A1A]">
      <div className="relative w-full max-w-[400px] aspect-[9/14] bg-[#F3F3F1] border-[3px] border-black overflow-hidden flex flex-col shadow-2xl pt-4 rounded-3xl">

        {/* --- CARD CONTENT --- */}
        <div className="relative z-10 flex flex-col h-full w-full px-6 py-8">

          {/* Header */}
          <div className="relative z-10 pt-2 mb-2 text-center">
            <h3 className="text-sm font-semibold tracking-tight text-[#1A1A1A] font-montserrat">
              Your activity pattern
            </h3>
          </div>

          <div className="relative z-10 pt-2 mb-6 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]/90 font-montserrat">
              WEEKDAY VS WEEKEND
            </h2>
          </div>

          {/* Bars */}
          <div className="relative z-10 flex-1 flex flex-col items-center gap-6 px-2 mt-4">
            {/* Weekday */}
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sun className="w-5 h-5 text-[#F94A36]" />
                  <span className="text-sm font-semibold text-[#1A1A1A] font-montserrat">WEEKDAY</span>
                </div>
                <span className="text-lg font-bold text-[#F94A36]">{weekdayPercent}%</span>
              </div>

              <div className="h-5 bg-[#1A1A1A] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${weekdayPercent}%`, background: '#F94A36' }}
                />
              </div>
            </div>

            {/* Weekend */}
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5 text-[#1A1A1A]/60" />
                  <span className="text-sm font-semibold text-[#1A1A1A]/60 font-montserrat">WEEKEND</span>
                </div>
                <span className="text-lg font-bold text-[#1A1A1A]/60">{weekendPercent}%</span>
              </div>

              <div className="h-5 bg-[#1A1A1A]/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${weekendPercent}%`, background: 'rgba(26,26,26,0.3)' }}
                />
              </div>
            </div>

            {/* Badge (center) */}
            <div className="text-center mt-4">
              <p className="text-lg font-extrabold w-fit bg-[#1A1A1A] font-montserrat">{getDeveloperBadge()} <span className="ml-2">💼</span></p>
            </div>
          </div>

          {/* Footer (copied from TopLanguagesCard) */}
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

          {/* Decorative Circle (background art copied) */}
          <div className="h-1/2 w-full flex flex-col gap-4 absolute -bottom-10 left-38 -rotate-50">
            <div className="flex gap-4 justify-between">
              <div className="bg-[#1A1A1A]/80 rounded-full w-10 h-10 "></div>
              <div className="bg-[#1A1A1A]/80 rounded-full w-10 h-10 "></div>
              <div className="bg-[#1A1A1A]/80 rounded-full w-10 h-10 "></div>
              <div className="bg-[#1A1A1A]/80 rounded-full w-10 h-10 "></div>
            </div>
            <div className="flex gap-4 justify-around relative left-8">
              <div className="bg-[#1A1A1A]/80 rounded-full w-10 h-10 "></div>
              <div className="bg-[#1A1A1A]/80 rounded-full w-10 h-10 "></div>
              <div className="bg-[#1A1A1A]/80 rounded-full w-10 h-10 "></div>
              <div className="bg-[#1A1A1A]/80 rounded-full w-10 h-10 "></div>
            </div>
            <div className="flex gap-4 justify-between">
              <div className="bg-[#1A1A1A]/80 rounded-full w-10 h-10 "></div>
              <div className="bg-[#1A1A1A]/80 rounded-full w-10 h-10 "></div>
              <div className="bg-[#1A1A1A]/80 rounded-full w-10 h-10 "></div>
              <div className="bg-[#1A1A1A]/80 rounded-full w-10 h-10 "></div>
            </div>
            <div className="flex gap-4 justify-around relative left-8">
              <div className="bg-[#1A1A1A]/80 rounded-full w-10 h-10 "></div>
              <div className="bg-[#1A1A1A]/80 rounded-full w-10 h-10 "></div>
              <div className="bg-[#1A1A1A]/80 rounded-full w-10 h-10 "></div>
              <div className="bg-[#1A1A1A]/80 rounded-full w-10 h-10 "></div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
