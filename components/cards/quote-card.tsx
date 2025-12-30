"use client"

import { QUOTES } from "@/lib/constants"
import { useEffect, useState } from "react"
import { Share2 } from "lucide-react"

export function QuoteCard() {
  const [quote, setQuote] = useState("")

  useEffect(() => {
    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)]
    setQuote(randomQuote)
  }, [])

  return (
    <div className="flex items-center justify-center w-full h-full min-h-[600px] p-4 bg-[#F3F3F1]">
      <div className="relative w-full max-w-[400px] aspect-[9/14] bg-[#0F0F0F] text-[#F3F3F1] overflow-hidden flex flex-col p-6 rounded-3xl shadow-2xl border-[3px] border-black">

        {/* Decorative arcs top */}
        <div className="absolute top-6 left-6 right-6 pointer-events-none opacity-40">
          <svg viewBox="0 0 400 60" className="w-full h-12">
            <path d="M0 40 C120 -10 280 -10 400 40" stroke="#ffffff30" strokeWidth="2" fill="none" />
            <path d="M0 48 C120 0 280 0 400 48" stroke="#ffffff20" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* THANK YOU header */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-[#0EA5FF] via-[#7C3AED] to-[#F472B6] bg-clip-text text-transparent font-montserrat">
            THANK YOU
          </h1>

          <p className="max-w-[80%] text-center text-lg text-[#d8d8d8] leading-relaxed mb-6 font-montserrat">
            Thanks for using our site! Your code, your stories, and your wins in 2025 inspired us. Here&apos;s to bigger goals and cleaner commits in 2026 — Happy New Year! 🎉
          </p>

          {/* Optional rotating short quote */}
          <blockquote className="mt-2 text-center">
            <p className="text-sm italic text-[#d8d8d8]/70">"{quote}"</p>
          </blockquote>
        </div>

        {/* Decorative arcs bottom */}
        <div className="absolute bottom-6 left-6 right-6 pointer-events-none opacity-40">
          <svg viewBox="0 0 400 60" className="w-full h-12">
            <path d="M0 20 C120 70 280 70 400 20" stroke="#ffffff30" strokeWidth="2" fill="none" />
            <path d="M0 12 C120 60 280 60 400 12" stroke="#ffffff20" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Footer copied from LOCCard */}
        <div className="w-full relative z-10 flex items-center justify-between px-2 pt-6">
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

          <span className="font-bold text-lg tracking-tight text-[#F3F3F1]">Github Wrapped</span>
        </div>
      </div>
    </div>
  )
}
