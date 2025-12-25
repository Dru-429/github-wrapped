"use client"

import type { GitHubData } from "@/lib/types"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function CommitsChartCard({ data }: { data: GitHubData }) {
  const { stats } = data

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const chartData = monthNames.map((month, index) => ({
    month,
    commits: stats.monthlyCommits?.[index] || 0,
  }))

  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full bg-black rounded-2xl p-6 flex flex-col">
        <h2
          className="text-2xl font-black text-white mb-6"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.05em" }}
        >
          CONTRIBUTIONS BY MONTH (2025)
        </h2>

        {/* Chart */}
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: "#ffffff", fontSize: 12, fontFamily: "var(--font-sans)" }}
                stroke="#333"
                axisLine={false}
              />
              <YAxis
                tick={{ fill: "#ffffff", fontSize: 12, fontFamily: "var(--font-sans)" }}
                stroke="#333"
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #74C365",
                  borderRadius: "8px",
                  color: "#ffffff",
                  fontFamily: "var(--font-sans)",
                }}
              />
              <Bar dataKey="commits" fill="#74C365" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
