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
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#000,#000_10px,#fff_10px,#fff_20px)] rounded-2xl p-3">
        <div className="relative w-full h-full bg-[oklch(0.92_0.05_340)] rounded-xl p-4 flex flex-col">
          {/* Vertical "Wrapped" text */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
            <span className="text-6xl font-black tracking-wider text-[oklch(0.70_0.15_340)]">WRAPPED</span>
          </div>

          {/* Content area */}
          <div className="ml-16 flex-1 flex flex-col justify-between">
            <div className="flex-1 flex items-center justify-center px-4">
              <blockquote className="space-y-6 text-center">
                <Share2 className="w-8 h-8 mx-auto text-black/60" />
                <p className="text-2xl font-bold text-black text-balance leading-relaxed italic">"{quote}"</p>
              </blockquote>
            </div>

            {/* Footer text */}
            <div className="pb-4">
              <p className="text-center text-sm text-black/70">Keep pushing code!</p>
            </div>

            {/* Footer */}
            <div className="border-t border-black/20 pt-3">
              <p className="text-center text-xs text-black/50">GITHUB.COM/WRAPPED</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
