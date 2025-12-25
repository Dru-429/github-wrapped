"use client"
import type { GitHubData } from "@/lib/types"
import Image from "next/image"

export function ProfileCard({ data }: { data: GitHubData }) {
  const { user, stats } = data

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,#DBE64C_0px,#DBE64C_8px,transparent_8px,transparent_16px)] rounded-2xl p-3">
        <div className="absolute inset-3 bg-[repeating-linear-gradient(0deg,#DBE64C_0px,#DBE64C_8px,transparent_8px,transparent_16px)] rounded-lg" />
        <div
          className="relative w-full h-full bg-[#001f3f] rounded-xl p-6 flex flex-col"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <div className="absolute top-4 right-4">
            <span className="text-4xl font-black text-[#DBE64C]" style={{ fontFamily: "var(--font-heading)" }}>
              WRAPPED
            </span>
          </div>

          {/* Content area */}
          <div className="flex-1 flex flex-col items-center justify-between">
            {/* Profile photo */}
            <div className="pt-4">
              <Image
                src={user.avatarUrl || "/placeholder.svg"}
                alt={user.name}
                width={120}
                height={120}
                className="rounded-full border-4 border-[#DBE64C]"
              />
            </div>

            {/* User info */}
            <div className="space-y-3 text-center">
              <h2 className="text-3xl font-black text-[#DBE64C]" style={{ fontFamily: "var(--font-heading)" }}>
                {user.name}
              </h2>
              <p className="text-lg text-white/80">@{user.login}</p>

              {user.bio && <p className="text-sm text-white/70 line-clamp-2 px-4">{user.bio}</p>}

              <div className="flex items-center justify-center gap-6 text-sm text-white/70 pt-4">
                <div className="flex flex-col items-center">
                  <span className="text-xl font-black text-white">{user.followers}</span>
                  <span className="text-xs">Followers</span>
                </div>
                <div className="w-px h-8 bg-[#DBE64C]/30" />
                <div className="flex flex-col items-center">
                  <span className="text-xl font-black text-white">{stats.topRepos.length}</span>
                  <span className="text-xs">Repos</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-white/50 pb-2">
              <p>GITHUB.COM/WRAPPED</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
