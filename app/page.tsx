"use client";

import { useState } from "react";
import { ArrowRight, Github, ChevronLeft, Twitter } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) return

    // Extract username from URL if pasted
    let cleanUsername = username.trim()
    if (cleanUsername.includes("github.com/")) {
      cleanUsername = cleanUsername.split("github.com/")[1].split("/")[0]
    }

    setIsLoading(true)
    router.push(`/wrap/${cleanUsername}`)
  }


  return (
    <div className="min-h-screen bg-[#F6F7ED] relative overflow-hidden">
      {/* Decorative elements inspired by Spotify Wrapped */}
      <div className="hidden md:flex  absolute top-20 right-20 flex-col gap-3">
        <div className="w-8 h-8 rounded-full bg-[#001F3F]"></div>
        <div className="w-8 h-8 rounded-full bg-[#00804C]"></div>
        <div className="w-8 h-8 rounded-full bg-[#DBE64C]"></div>
      </div>

      <div className="absolute bottom-20 left-20 flex gap-3">
        <div className="w-6 h-6 rounded-full bg-[#74C365]"></div>
        <div className="w-6 h-6 rounded-full bg-[#001F3F]"></div>
        <div className="w-6 h-6 rounded-full bg-[#1E488F]"></div>
        <div className="w-6 h-6 rounded-full bg-[#00804C]"></div>
      </div>

      {/* 2025 vertical text */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center">
        <div
          className="text-[#DBE64C] text-8xl font-bebas-neue tracking-tighter leading-[0.8]"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          2025
        </div>
        <div className="mt-6 flex flex-col gap-2">
          <div className="w-4 h-4 rounded-full bg-[#001F3F]"></div>
          <div className="w-4 h-4 rounded-full bg-[#00804C]"></div>
          <div className="w-4 h-4 rounded-full bg-[#74C365]"></div>
          <div className="w-4 h-4 rounded-full bg-[#1E488F]"></div>
        </div>
      </div>

      {/* Navbar (centered pill) */}
      <nav className="relative z-20">
        <div className="absolute left-1/2 top-2 -translate-x-1/2 w-[90%] md:w-[40%]">
          <div className="flex items-center justify-between gap-4 w-full bg-zinc-100/50 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 shadow-[0_6px_20px_rgba(2,6,23,0.6)]">
            {/* Left: logo & back */}
            <div className="flex items-center gap-3 pl-1">

              <button
                onClick={() => router.push("/")}
                className="flex items-center justify-cente gap-2 transition-colors text-black cursor-pointer transition-colors font-medium"
                aria-label="Home"
              >
                {/* <img src="/logo.png" alt="Logo" className="w-8 h-8 object-cover" /> */}
                GITHUB WRAPPED 2025
              </button>
            </div>

            {/* Right: social icons */}
            <div className="flex items-center gap-3 pr-1">
              <a href="https://github.com/Dru-429/github-wrapped" target="_blank" rel="noopener noreferrer" aria-label="GitHub repository" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <Github className="w-5 h-5 text-black" />
              </a>
              <a href="https://x.com/dev_druv" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <Twitter className="w-5 h-5 text-black" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="container mx-auto px-4 py-20 max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-6xl md:text-9xl font-bebas-neue text-[#001F3F] mb-6 tracking-tight">
            GitHub
          </h2>
          <h2 className="text-6xl md:text-9xl font-bebas-neue text-[#00804C] mb-8 tracking-tight">
            Wrapped
          </h2>
          <p className="text-xl text-[#001F3F]/70 font-nunito font-medium">
            Discover your coding journey in 2025
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border-2 border-[#001F3F]/10">
            <label
              htmlFor="username"
              className="block text-sm font-bebas-neue text-[#001F3F]/70 mb-3 uppercase tracking-wide"
            >
              Enter GitHub Username or URL
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="octocat or https://github.com/octocat"
              className="w-full px-6 py-4 bg-white border-2 border-[#001F3F]/10 rounded-xl text-lg font-nunito text-[#001F3F] placeholder:text-[#001F3F]/40 focus:outline-none focus:border-[#00804C] transition-colors"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !username.trim()}
            className="w-full bg-[#001F3F] text-white py-5 rounded-full font-bebas-neue text-lg hover:bg-[#00804C] disabled:bg-[#001F3F]/30 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 group"
          >
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                Generate My Wrapped
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-sm text-[#001F3F]/50 font-nunito font-medium">
            Powered by GitHub API • No data stored
          </p>
        </div>
      </div>
    </div>
  );
}



