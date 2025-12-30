"use client"

import type { GitHubData } from "@/lib/types"

export function PlainTxt({ data }: { data: GitHubData }) {
  const { stats } = data
  const commits = stats.totalCommits || 0

  return (
    <div className="flex items-center justify-center w-full h-full min-h-[600px] bg-[#F3F3F1] p-4">
      {/* Card Container */}
      <div className="relative w-full max-w-[400px] aspect-[9/14] bg-[#1A1A1A] text-[#F3F3F1] overflow-hidden flex flex-col items-center justify-between p-6 rounded-3xl shadow-2xl">
        
        {/* --- Decorative Background Lines --- */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <svg viewBox="0 0 400 400" className="w-full h-full opacity-90">
             <path 
               d="M -50 190 Q 100 80 450 10" 
               fill="none" 
               stroke="white" 
               strokeWidth="1.5" 
               className="opacity-60"
             />
             <path 
               d="M -50 -190 Q 150 120 450 30" 
               fill="none" 
               stroke="white" 
               strokeWidth="1.5" 
               className="opacity-40"
             />
              <path 
               d="M -50 20 Q 200 -200 450 20" 
               fill="none" 
               stroke="white" 
               strokeWidth="1.5" 
               className="opacity-50"
             />
          </svg>
        </div>

        {/* --- Main Content Area --- */}
        <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-center gap-5">

          {/* Descriptive Text */}
          <div className="text-center space-y-2 max-w-[90%]">
             <p className="text-lg text-[#f3f3f1f5] font-medium leading-none font-montserrat">
               You contribute <span className="text-white font-semibold">{commits.toLocaleString()}</span> commits this year. 
             </p>
             <p className="text-sm text-[#f3f3f1ca]">
               But can you guess your top Repos?
             </p>
          </div>

        </div>

        {/* --- Footer --- */}
        <div className="w-full relative z-10 flex items-center justify-between px-2 pt-4">
          <svg 
            height="32" 
            viewBox="0 0 16 16" 
            version="1.1" 
            width="32" 
            aria-hidden="true"
            className="fill-[#F3F3F1]"
          >
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
          </svg>

          <span className="font-bold text-lg tracking-tight text-[#F3F3F1]">
            Github Wrapped
          </span>
          
        </div>
      </div>
    </div>
  )
}