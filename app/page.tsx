"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    // Extract username from URL if provided
    let extractedUsername = username.trim();
    if (extractedUsername.includes("github.com/")) {
      extractedUsername = extractedUsername
        .split("github.com/")[1]
        .split("/")[0];
    }

    window.location.href = `/${extractedUsername}`;
  };

  return (
    <div className="min-h-screen bg-[#F6F7ED] relative overflow-hidden">
      {/* Decorative elements inspired by Spotify Wrapped */}
      <div className="absolute top-20 right-20 flex flex-col gap-3">
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

      {/* Navbar */}
      <nav className="px-8 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bebas-neue text-[#001F3F]">
          GitHub Wrapped 2025
        </h1>
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
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="w-full bg-[#001F3F] text-white py-5 rounded-full font-bebas-neue text-lg hover:bg-[#00804C] disabled:bg-[#001F3F]/30 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 group"
          >
            {loading ? (
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



