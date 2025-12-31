"use client"

import type { GitHubData } from "@/lib/types"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function ResultCard({ data }: { data: GitHubData }) {
  const { stats } = data
  const total = stats.totalCommits || 0
  const languages = stats.topLanguages || []
  const repos = stats.topRepos || []

  // Prepare monthly commits data for the chart
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const chartData = monthNames.map((month, i) => ({ month, commits: stats.monthlyCommits?.[i] || 0 }))

  return (
    <div className="flex items-center justify-center w-full h-full min-h-[600px] p-4 bg-[#F3F3F1] rounded-3xl">

      {/* Card Container */}
      <div className="relative w-full max-w-[420px] aspect-[9/14] bg-[#121212] text-[#F3F3F1] overflow-hidden flex flex-col p-6 rounded-3xl shadow-2xl border-[3px] border-black">

        {/* --- 2025 --- */}
        <div className="absolute -left-1 -top-88 bottom-0 w-20 flex items-center justify-center pointer-events-none z-0">
          <div className="-rotate-90 text-[100px] font-black font-bebas text-[#9df04ad7] tracking-wider opacity-100 flex items-center gap-4">
            <span>2025</span>
            {/* Scribble line over the year as seen in image_30f759.jpg */}
            <svg className="absolute w-full h-full scale-150 overflow-visible opacity-60">
              <path d="M -20 50 Q 50 -20 150 50 T 300 50" fill="none" stroke="white" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* --- Top Section: Graph --- */}
        <div className="relative z-10 w-full flex flex-col items-center mt-4 ml-4">
          {/* Decorative circular pattern behind the frame */}
          <div className="absolute -bottom-10 w-full h-20 flex justify-around opacity-30">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-white blur-sm" />
            ))}
          </div>

          <div className="relative w-[85%] bg-[#0F0F0F] border-[6px] border-[#0A0A0A] rounded-lg px-3 py-1 shadow-xl z-20">
            {/* GitHub Logo Top Center */}
            <div className="flex justify-center my-1">
              <svg height="32" viewBox="0 0 16 16" width="32" className="fill-white">
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
              </svg>
            </div>

            {/* Monthly commits bar chart (replaces contribution grid) */}
            <div className="w-full h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#0b0b0b" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: '#9EF04A', fontSize: 11, fontFamily: 'var(--font-sans)' }} axisLine={false} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f0f10', border: '1px solid #53c63a', borderRadius: 8, color: '#ffffff', fontFamily: 'var(--font-sans)' }}
                    formatter={(value: any) => [value, 'Commits']}
                  />
                  <Bar dataKey="commits" fill="#53c63a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* --- Middle Section: Split Lists --- */}
        <div className="relative z-10 mt-10 grid grid-cols-2 gap-4 ml-14">
          <div>
            <h3 className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Top Languages</h3>
            <ol className="space-y-1">
              {languages.slice(0, 5).map((l, idx) => (
                <li key={l.name} className="text-[14px] font-bold">
                  <span className="text-gray-500 mr-2">{idx + 1}.</span> {l.name}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Top Repositories</h3>
            <ol className="space-y-1">
              {repos.slice(0, 5).map((r, idx) => (
                <li key={r.name} className="text-[14px] font-bold truncate pr-2">
                  <span className="text-gray-500 mr-2">{idx + 1}.</span> {r.name}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* --- Bottom Section: Summary Stats --- */}
        <div className="relative z-10 mt-10 mb-6 ml-14 flex flex-col gap-6">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Contributions</span>
            <span className="text-5xl font-black tracking-tighter mt-1">{total.toLocaleString()}</span>
          </div>
        </div>

        {/* Right side checkerboard accent */}
        <div className="absolute top-0 right-0 w-16 h-full opacity-10 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:10px_10px]" />
        </div>

        {/* --- Footer --- */}
        <div className="w-full absolute bottom-6 -left-1 z-10 flex items-center justify-between px-4 ">
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

export default ResultCard