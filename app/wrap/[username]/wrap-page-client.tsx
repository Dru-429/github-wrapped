"use client"

import { useState, useEffect } from "react"
import { Github, Download, ChevronLeft, ChevronRight, Twitter, Linkedin, Copy, Check } from "lucide-react"
import { ProfileCard } from "@/components/cards/profile-card"
import { TopReposCard } from "@/components/cards/top-repos-card"
import { TopLanguagesCard } from "@/components/cards/top-languages-card"
import { CommitsChartCard } from "@/components/cards/commits-chart-card"
import { StatsCard } from "@/components/cards/stats-card"
import { ActivityCard } from "@/components/cards/activity-card"
import { TimelineCard } from "@/components/cards/timeline-card"
import { QuoteCard } from "@/components/cards/quote-card"
import { useRouter } from "next/navigation"
import type { GitHubData } from "@/lib/types"
import { LOCCard } from "@/components/cards/loc"
import { CommitRaceCard } from "@/components/cards/commit-race-card"
import { ContributionStreakCard } from "@/components/cards/contribution-streak-card"

export function WrapPageClient({ username }: { username: string }) {
  const router = useRouter()
  const [currentCard, setCurrentCard] = useState(0)
  const [data, setData] = useState<GitHubData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const totalCards = 11

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
        return <CommitsChartCard data={data} />
      case 5:
        return <StatsCard data={data} />
      case 6:
        return <ActivityCard data={data} />
      case 7:
        return <TimelineCard data={data} />
      case 8:
        return <QuoteCard />
      case 9:
        return <TopReposCard data={data} />
      case 10:
        return <ContributionStreakCard data={data} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="border-b border-white/20 bg-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Github className="w-6 h-6 text-white" />
            <span className="font-bold text-lg text-white" style={{ fontFamily: "var(--font-heading)" }}>
              GitHub Wrapped 2025
            </span>
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 md:py-12 relative">
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
              className="px-4 py-2 bg-white text-[oklch(0.65_0.15_280)] hover:bg-white/90 rounded-md font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !error && data && (
          <div className="space-y-8 relative z-10">
            {/* Card Display */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-2xl aspect-square">{renderCard()}</div>
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
                className="p-2 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white rounded-md transition-colors"
                aria-label="Previous card"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-white font-medium min-w-[80px] text-center">
                {currentCard + 1} / {totalCards}
              </span>
              <button
                onClick={handleNextCard}
                className="p-2 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white rounded-md transition-colors"
                aria-label="Next card"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button className="px-4 py-2 gap-2 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white rounded-md font-medium transition-colors flex items-center">
                <Download className="w-4 h-4" />
                Download All
              </button>
              <button
                onClick={() => handleShare("twitter")}
                className="px-4 py-2 gap-2 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white rounded-md font-medium transition-colors flex items-center"
              >
                <Twitter className="w-4 h-4" />
                Share on X
              </button>
              <button
                onClick={() => handleShare("linkedin")}
                className="px-4 py-2 gap-2 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white rounded-md font-medium transition-colors flex items-center"
              >
                <Linkedin className="w-4 h-4" />
                Share on LinkedIn
              </button>
              <button
                onClick={() => handleShare("copy")}
                className="px-4 py-2 gap-2 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white rounded-md font-medium transition-colors flex items-center"
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
