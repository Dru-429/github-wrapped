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
import { ThanksCard } from "@/components/cards/thanks-card"
import { useRouter } from "next/navigation"
import type { GitHubData } from "@/lib/types"
import { LOCCard } from "@/components/cards/loc"
import { CommitRaceCard } from "@/components/cards/commit-race-card"
import { PlainTxt } from "@/components/cards/Plain-txt"
import { PlainTxt2 } from "@/components/cards/Plain-txt2"
import ResultCard from "@/components/cards/Result"
import { motion } from 'framer-motion'
import Image from "next/image"
import Footer from "@/components/landing_ui/Footer";

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
        return <ThanksCard />
      default:
        return null
    }
  }


  return (
    <div className='bg-grid min-h-screen bg-background pb-20'>
      {/* Navbar */}
      <Navbar />

      <main className='container mx-auto px-4 py-8 md:py-12 relative max-w-7xl'>
        {isLoading && (
          <div className='flex flex-col items-center justify-center min-h-[60vh] space-y-6'>
            <Image
              src="/assets/github_logo_loader.gif"
              alt="Loading GitHub Wrapped"
              width={176}
              height={176}
              className='object-cover'
              priority
            />
            <p className='font-display text-3xl font-black text-ink animate-pulse'>LET ME COOOK ...</p>
          </div>
        )}

        {error && (
          <div className='flex flex-col items-center justify-center min-h-[60vh] space-y-6 max-w-md mx-auto text-center'>
            <h2 className='font-display text-4xl font-black text-ink'>Error 404</h2>
            <p className='text-ink/80 text-lg font-medium'>{error}</p>
            <button
              onClick={fetchGitHubData}
              className='boxy-sm bg-[var(--lime)] px-8 py-4 font-display text-xl font-black uppercase tracking-widest text-ink transition-transform hover:-translate-y-1 shadow-[4px_4px_0_0_rgba(0,0,0,1)] border-2 border-black'
            >
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !error && data && (
          <div className=' w-full mx-auto '>
            <div className="boxy bg-cream p-6 md:p-10 w-full mx-auto my-4 md:my-8 flex flex-col lg:flex-row gap-10 items-stretch">
              {/* Left side: Controls (35%) */}
              <div className='w-full lg:w-[35%] flex flex-col justify-between gap-8 h-full'>
                <span className='boxy-sm bg-[var(--nuit)] px-5 py-2 font-display text-4xl font-black italic text-[var(--cream)] md:text-6xl'>
                  Wrapped..
                </span>

                <div className='flex flex-col gap-6 w-full'>
                  {/* Pagination Controls */}
                  <div className='boxy bg-[var(--cream)] p-5 flex flex-col gap-5 border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]'>
                    <div className='flex items-center justify-between'>
                      <button
                        onClick={handlePrevCard}
                        className='boxy-sm bg-white p-3 transition-transform hover:-translate-x-1 border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]'
                        aria-label='Previous card'
                      >
                        <ChevronLeft className='h-6 w-6 text-ink' />
                      </button>
                      <div className='flex flex-col items-center'>
                        <span className='font-display text-2xl font-black text-ink'>
                          {currentCard + 1} / {totalCards}
                        </span>
                      </div>
                      <button
                        onClick={handleNextCard}
                        className='boxy-sm bg-white p-3 transition-transform hover:translate-x-1 border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]'
                        aria-label='Next card'
                      >
                        <ChevronRight className='h-6 w-6 text-ink' />
                      </button>
                    </div>

                    {/* Navigation Dots */}
                    <div className='flex items-center justify-center gap-2 flex-wrap'>
                      {Array.from({ length: totalCards }).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentCard(index)}
                          className={`h-3 transition-all border-2 border-ink shadow-[2px_2px_0_0_rgba(0,0,0,1)] ${index === currentCard
                            ? 'bg-[var(--lime)] w-8'
                            : 'bg-white w-3 hover:bg-[var(--lime)]'
                            }`}
                          aria-label={`Go to card ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className='flex flex-row md:flex-col gap-3 md:gap-4 w-full'>
                    <button
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className='flex-1 boxy-sm group flex items-center justify-center gap-3 bg-[var(--lime)] px-0 md:px-5 py-3 md:py-4 font-black uppercase tracking-wider text-ink transition-transform hover:-translate-y-1 disabled:opacity-60 disabled:hover:translate-y-0 md:w-full text-lg border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] md:shadow-[6px_6px_0_0_rgba(0,0,0,1)]'
                    >
                      <Download className='h-6 w-6' />
                      <span className="hidden md:inline">{isDownloading ? 'Downloading...' : 'Download Card'}</span>
                    </button>

                    <div className='flex flex-row md:grid md:grid-cols-2 gap-3 md:gap-4 flex-[2] md:flex-none'>
                      <button
                        onClick={() => handleShare('twitter')}
                        className='flex-1 boxy-sm group flex items-center justify-center gap-2 bg-[var(--nuit)] px-0 md:px-4 py-3 font-bold uppercase tracking-wider text-white transition-transform hover:-translate-y-1 border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]'
                      >
                        <Twitter className='h-5 w-5 md:h-4 md:w-4' />
                        <span className="hidden md:inline">Share</span>
                      </button>

                      <button
                        onClick={() => handleShare('linkedin')}
                        className='flex-1 boxy-sm group flex items-center justify-center gap-2 bg-blue-600 px-0 md:px-4 py-3 font-bold uppercase tracking-wider text-white transition-transform hover:-translate-y-1 border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]'
                      >
                        <Linkedin className='h-5 w-5 md:h-4 md:w-4' />
                        <span className="hidden md:inline">Share</span>
                      </button>
                    </div>

                    <button
                      onClick={() => handleShare('copy')}
                      className='flex-1 boxy-sm group flex items-center justify-center gap-2 bg-white px-0 md:px-5 py-3 font-bold uppercase tracking-wider text-ink transition-transform hover:-translate-y-1 md:w-full border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]'
                    >
                      {copied ? <Check className='h-5 w-5 md:h-4 md:w-4 text-green-600' /> : <Copy className='h-5 w-5 md:h-4 md:w-4' />}
                      <span className="hidden md:inline">{copied ? 'Copied!' : 'Copy Link'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right side: Card Display */}
              <div className='w-full lg:w-[65%] flex items-center justify-center bg-zinc-900 p-4 md:p-10 boxy relative overflow-hidden'>
                <div className="absolute inset-0" style={{ backgroundImage: "url('/bg.png')", backgroundSize: 'contain' }}></div>
                <div className='w-full max-w-md flex items-center justify-center relative z-10' ref={cardRef}>
                  {renderCard()}
                </div>
              </div>
            </div>

            <Footer />

          </div>
        )}
      </main>
    </div>
  )
}

function Navbar() {
  const router = useRouter()
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className='boxy flex items-center justify-between px-4 py-3 md:px-6 md:py-4 mx-auto max-w-7xl mt-5'
    >
      <div className='flex items-center gap-4'>
        <button
          onClick={() => router.back()}
          className='boxy-sm group inline-flex items-center justify-center bg-[var(--cream)] p-2 transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 shadow-[2px_2px_0_0_rgba(0,0,0,1)] border-2 border-black'
          aria-label='Go back'
        >
          <ChevronLeft className='h-5 w-5 text-ink' />
        </button>

        <button className='flex items-center gap-2'>
          <span className='grid h-8 w-8 place-items-center border-2 border-ink bg-[var(--lime)] font-display text-lg font-black text-ink shadow-[2px_2px_0_0_rgba(0,0,0,1)]'>
            G
          </span>
          <span className='font-display text-xl font-bold tracking-tight text-ink hidden sm:block'>
            Github Wrapped
          </span>
        </button>
      </div>

      <a
        href='https://github.com/Dru-429/github-wrapped'
        className='boxy-sm group inline-flex items-center gap-2 bg-[var(--nuit)] px-3 py-2 text-xs font-bold uppercase tracking-wider text-[var(--cream)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 md:px-4 md:text-sm'
      >
        <Github className='h-4 w-4' />
        <span>Github</span>
      </a>
    </motion.nav>
  )
}