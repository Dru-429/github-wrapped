"use client"

import { LANGUAGE_COLORS } from "@/lib/constants"
import type { GitHubData } from "@/lib/types"

export function TopLanguagesCard({ data }: { data: GitHubData }) {
  const { stats } = data

  return (
    <div className="flex items-center justify-center w-full h-full min-h-[600px] p-5 bg-[#1A1A1A]">
      <div className="relative w-full max-w-[400px] aspect-[9/14] bg-[#F3F3F1] border-[3px] border-black overflow-hidden flex flex-col shadow-2xl pt-4 rounded-3xl">


        {/* --- CARD CONTENT --- */}
        <div className="relative z-10 flex flex-col h-full w-full px-6 py-8">

          {/* Header */}
          <div className="relative z-10 pt-6 mb-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1A] font-montserrat">
              Your top languages
            </h2>
          </div>

          {/* Languages list */}
          <div className="relative z-10 flex-1 flex flex-col gap-6 px-2 mt-10">
            {(stats.topLanguages || []).slice(0, 3).map((lang, index) => {
              const color = LANGUAGE_COLORS[lang.name] ?? '#F94A36'
              return (
                <div key={lang.name} className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2">
                      {/* Sl. no.*/}
                      <span className={`text-2xl font-semibold text-black `}>{index + 1}.</span>

                      {/* Language */}
                      <span className="text-3xl px-1 font-extrabold tracking-wide font-montserrat text-[#F3F3F1] bg-[#1A1A1A]">{lang.name}</span>
                    </div>

                  </div>

                  {/* Progress bar */}
                  <div className="flex justify-between items-center">
                    <div className="h-3 bg-zinc-700 rounded-full overflow-hidden flex items-center w-[90%] ">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${lang.percentage}%`,
                          background: `${color}`,
                        }}
                      />
                    </div>

                    {/* percentage  */}
                    <div className="text-sm font-semibold bg-[#1A1A1A] text-center">
                      {typeof (lang as any).repos === 'number' ? `${(lang as any).repos} repos` : `${Math.round(lang.percentage)}%`}
                    </div>
                  </div>
                </div>
              ) 
            })}
          </div>

          {/* Footer (copied from ProfileCard) */}
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

          {/* Decorative Circle */}
          <div className="h-1/2 w-full flex flex-col gap-4 absolute -bottom-10 left-38 -rotate-50">
            <div className="flex gap-4 justify-between">
              <div className="bg-[#1A1A1A] rounded-full w-10 h-10 "></div>
              <div className="bg-[#1A1A1A] rounded-full w-10 h-10 "></div>
              <div className="bg-[#1A1A1A] rounded-full w-10 h-10 "></div>
              <div className="bg-[#1A1A1A] rounded-full w-10 h-10 "></div>
            </div>
            <div className="flex gap-4 justify-around">
              <div className="bg-[#1A1A1A] rounded-full w-10 h-10 "></div>
              <div className="bg-[#1A1A1A] rounded-full w-10 h-10 "></div>
              <div className="bg-[#1A1A1A] rounded-full w-10 h-10 "></div>
            </div>
            <div className="flex gap-4 justify-between">
              <div className="bg-[#1A1A1A] rounded-full w-10 h-10 "></div>
              <div className="bg-[#1A1A1A] rounded-full w-10 h-10 "></div>
              <div className="bg-[#1A1A1A] rounded-full w-10 h-10 "></div>
              <div className="bg-[#1A1A1A] rounded-full w-10 h-10 "></div>
            </div>
            <div className="flex gap-4 justify-around">
              <div className="bg-[#1A1A1A] rounded-full w-10 h-10 "></div>
              <div className="bg-[#1A1A1A] rounded-full w-10 h-10 "></div>
              <div className="bg-[#1A1A1A] rounded-full w-10 h-10 "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}