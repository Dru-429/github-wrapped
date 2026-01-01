"use client"

import { useState, useEffect, useRef } from "react"
import { Github, Download, ChevronLeft, ChevronRight, Twitter, Linkedin, Copy, Check } from "lucide-react"
import html2canvas from "html2canvas"
import { ProfileCard } from "@/components/cards/profile-card"
import { TopReposCard } from "@/components/cards/top-repos-card"
import { TopLanguagesCard } from "@/components/cards/top-languages-card"
import { StatsCard } from "@/components/cards/stats-card"
import { ActivityCard } from "@/components/cards/activity-card"
import { TimelineCard } from "@/components/cards/timeline-card"
import { QuoteCard } from "@/components/cards/quote-card"
import { useRouter } from "next/navigation"
import type { GitHubData } from "@/lib/types"
import { LOCCard } from "@/components/cards/loc"
import { CommitRaceCard } from "@/components/cards/commit-race-card"
import { PlainTxt } from "@/components/cards/Plain-txt"
import { PlainTxt2 } from "@/components/cards/Plain-txt2"
import ResultCard from "@/components/cards/Result"

export function WrapPageClient({ username }: { username: string }) {
  const router = useRouter()
  const [currentCard, setCurrentCard] = useState(0)
  const [data, setData] = useState<GitHubData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const cardRef = useRef<HTMLDivElement | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    if (!cardRef.current) return
    setIsDownloading(true)
    try {
      const canvas = await html2canvas(cardRef.current, { backgroundColor: null, useCORS: true, scale: 2 })
      canvas.toBlob((blob) => {
        if (!blob) {
          setIsDownloading(false)
          return
        }
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `github-wrapped-card-${currentCard + 1}.png`
        document.body.appendChild(link)
        link.click()
        link.remove()
        URL.revokeObjectURL(url)
        setIsDownloading(false)
      }, "image/png")
    } catch (err) {
      console.error("Download error:", err)
      setIsDownloading(false)
    }
  }

  const totalCards = 12

  useEffect(() => {
    fetchGitHubData()
  }, [username])

  const fetchGitHubData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch("/api/github", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch GitHub data")
      }

      const data = await response.json()
      setData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePrevCard = () => {
    setCurrentCard((prev) => (prev > 0 ? prev - 1 : totalCards - 1))
  }

  const handleNextCard = () => {
    setCurrentCard((prev) => (prev < totalCards - 1 ? prev + 1 : 0))
  }

  const handleShare = (platform: "twitter" | "linkedin" | "copy") => {
    const url = window.location.href
    const text = `Check out my GitHub Wrap 2025! 🎉`

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
          "_blank",
        )
        break
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank")
        break
      case "copy":
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        break
    }
  }

  const renderCard = () => {
    if (!data) return null

    switch (currentCard) {
      case 0:
        return <ProfileCard data={data} />
      case 1:
        return <LOCCard data={data} />
      case 2:
        return <TopLanguagesCard data={data} />
      case 3:
        return <CommitRaceCard data={data} />
      case 4:
        return <PlainTxt data={data} />
      case 5:
        return <TopReposCard data={data} />
      case 6:
        return <StatsCard data={data} />
      case 7:
        return <ActivityCard data={data} />
      case 8:
        return <PlainTxt2 />
      case 9:
        return <TimelineCard data={data} />
      case 10:
        return <ResultCard data={data} />
      case 11:
        return <QuoteCard />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen text-foreground relative" style={{ backgroundImage: "url('/bg.png')", backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'repeat' }}>
      {/* subtle dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      {/* Navbar (centered pill) */}
      <nav className="relative z-20">
        <div className="absolute left-1/2 top-2 -translate-x-1/2 w-[90%] md:w-[40%]">
          <div className="flex items-center justify-between gap-4 w-full bg-zinc-800/30 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 shadow-[0_6px_20px_rgba(2,6,23,0.6)]">
            {/* Left: logo & back */}
            <div className="flex items-center gap-3 pl-1">
              <button
                onClick={() => router.back()}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Go back"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={() => router.push("/")}
                className="p-2 rounded-full transition-colors flex items-center gap-2 text-white cursor-pointer font-medium"
                aria-label="Home"
              >
                {/* <img src="/logo.png" alt="Logo" className="w-8 h-8 object-cover" /> */}
                GITHUB WRAPPED 2025
              </button>
            </div>

            {/* Right: social icons */}
            <div className="flex items-center gap-3 pr-1">
              <a href="https://github.com/Dru-429/github-wrapped" target="_blank" rel="noopener noreferrer" aria-label="GitHub repository" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <Github className="w-5 h-5 text-white/90" />
              </a>
              <a href="https://x.com/dev_druv" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <Twitter className="w-5 h-5 text-white/90" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 md:py-12 relative ">
        <div className="absolute inset-0 dotted-pattern opacity-20" />

        {isLoading && (
          <div className="flex flex-col items-center justify-center min-h-[600px] space-y-4 relative z-10">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
            <p className="text-lg text-white font-medium">Loading your GitHub Wrap...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center min-h-[600px] space-y-4 max-w-md mx-auto text-center relative z-10">
            <div className="text-6xl">😕</div>
            <h2 className="text-2xl font-bold text-white">Oops! Something went wrong</h2>
            <p className="text-white/80">{error}</p>
            <button
              onClick={fetchGitHubData}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !error && data && (
          <div className="space-y-8 relative z-10 mt-20 md:mt-12">
            {/* Card Display */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-2xl aspect-square" ref={cardRef}>{renderCard()}</div>
            </div>

            {/* Navigation Dots */}
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: totalCards }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCard(index)}
                  className={`h-2 rounded-full transition-all ${index === currentCard ? "bg-white w-8" : "bg-white/40 w-2"
                    }`}
                  aria-label={`Go to card ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handlePrevCard}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Previous card"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-white font-medium min-w-[80px] text-center">
                {currentCard + 1} / {totalCards}
              </span>
              <button
                onClick={handleNextCard}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Next card"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors disabled:opacity-60 flex items-center gap-2"
                aria-label="Download current card"
              >
                <Download className="w-4 h-4" />
                {isDownloading ? "Downloading..." : "Download Card"}
              </button>
              <button
                onClick={() => handleShare("twitter")}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors flex items-center gap-2"
              >
                <Twitter className="w-4 h-4" />
                Share on X
              </button>
              <button
                onClick={() => handleShare("linkedin")}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors flex items-center gap-2"
              >
                <Linkedin className="w-4 h-4" />
                Share on LinkedIn
              </button>
              <button
                onClick={() => handleShare("copy")}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
