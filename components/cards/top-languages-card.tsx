"use client"

import type { GitHubData } from "@/lib/types"

export function TopLanguagesCard({ data }: { data: GitHubData }) {
  const { stats } = data
  // Using 2025 as the consistent year for the background effect
  const year = 2025

  return (
    <div className="flex items-center justify-center w-full h-full min-h-[600px] bg-[#F3F3F1] p-4">
      {/* Card Container with aspect-9/14 */}
      <div className="relative w-full max-w-[400px] aspect-[9/14] bg-[#1A1A1A] text-[#F3F3F1] overflow-hidden flex flex-col p-6 rounded-3xl shadow-2xl">
        
        {/* --- Header --- */}
        <div className="relative z-10 pt-8 mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Your top languages
          </h2>
        </div>

        {/* --- Languages List --- */}
        <div className="relative z-10 flex-1 flex flex-col gap-8 px-2">
          {stats.topLanguages.slice(0, 3).map((lang, index) => (
            <div key={lang.name} className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-4">
                  {/* Matching the orange-colored numbers from image_51630a.png */}
                  <span className="text-3xl font-black text-[#F94A36]">
                    {index + 1}
                  </span>
                  <span className="text-4xl font-bold text-white tracking-tight">
                    {lang.name}
                  </span>
                </div>
                <span className="text-lg font-medium text-gray-400">
                  {lang.count || 0} repos
                </span>
              </div>
              
              {/* Progress Bar: Orange to Purple gradient style from image_51630a.png */}
              <div className="h-3 w-full bg-[#3A3A4A] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#F94A36] via-[#F94A36] to-[#7C6FF6]"
                  style={{ width: `${lang.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* --- Footer (Matching your requested design) --- */}
        <div className="w-full relative z-10 flex items-center justify-between px-2 pt-6 border-t border-white/10">
          <svg 
            height="32" 
            viewBox="0 0 16 16" 
            version="1.1" 
            width="32" 
            aria-hidden="true"
            className="fill-white"
          >
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
          </svg>

          <span className="font-bold text-lg tracking-tight">
            GitHub Wrapped
          </span>
        </div>

        {/* Decorative corner element from reference image */}
        <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-[#7C6FF6] rounded-full opacity-50 blur-2xl pointer-events-none" />
      </div>
    </div>
  )
}