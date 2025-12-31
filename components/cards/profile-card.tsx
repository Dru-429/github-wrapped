"use client"

import type { GitHubData } from "@/lib/types"
import Image from "next/image"

export function ProfileCard({ data }: { data: GitHubData }) {
  const { user } = data
  
  const year = "2025"
  console.log(data)
  
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[600px] p-5 bg-[#1A1A1A] rounded-3xl">
      {/* outer wrapper
      */}
      
      <div className="relative w-full max-w-[400px] aspect-[9/14] bg-[#F3F3F1] border-[3px] border-black overflow-hidden flex flex-col shadow-2xl pt-4 rounded-3xl">
        
        {/* --- DECORATIVE NUMBERS (20 - 25) --- */}
        <div className="absolute top-2 w-full flex flex-col items-center justify-center pointer-events-none z-0 ">
          <span className="text-[160px] leading-[0.8] text-[#F94A36] [-webkit-text-stroke:0.5px_black] bebas-neue-regular font-semibold italic tracking-widest">
            {year}
          </span>
          <span className="text-[160px] leading-[0.8] text-[#f9493694] bebas-neue-regular font-semibold italic tracking-[0.95rem]">
            {year}
          </span>
          <span className="text-[150px] leading-[0.8] text-[#f9493625] bebas-neue-regular font-semibold italic tracking-[0.6rem]">
            {year}
          </span>
        </div>


        {/* --- CARD CONTENT --- */}
        <div className="relative z-10 flex flex-col items-center h-full w-full px-6 py-8">

          {/* Main Image Container */}
          <div className="w-full scale-75 aspect-square relative -mb-8">
            <Image
              src={user.avatarUrl || "/placeholder.svg"}
              alt={user.name}
              fill
              className="object-contain rounded-full border-4 border-[#1A1A1A]"
            />
          </div>

          {/* User Details */}
          <div className="flex-1 flex flex-col items-start justify-start text-center w-full ">
            
            {/* Name */}
            <h2 className="text-5xl font-black text-[#1A1A1A] tracking-tighter">
              {user.name}
            </h2>

            {/* Handle & Details */}
            <div className="flex items-center gap-2 text-xl text-[#4A4A4A] font-medium">
              <span>{user.login}</span>
              <span>•</span>
              {/* Fallback for pronouns if not in data */}
              <span>he/him</span> 
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-2 pt-2 text-lg font-semibold text-[#1A1A1A]">
               <span>{user.followers} followers</span>
               <span>•</span>
               {/* Assuming 'following' exists in user type, otherwise hardcoded/optional */}
               <span>{user.following || 0} following</span>
            </div>

            {/* Location */}
            <div className="pt-2 text-lg text-[#4A4A4A]">
              {user.location || "Planet Earth"}
            </div>
          </div>

          {/* Footer Logo */}
          <div className="w-full absolute bottom-4 px-4 flex items-center justify-between">
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
          
        </div>
      </div>
    </div>
  )
}