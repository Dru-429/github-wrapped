import { type NextRequest, NextResponse } from "next/server"
import { fetchGitHubData } from "@/lib/github"

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json()

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    const data = await fetchGitHubData(username)

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] GitHub API error:", error)
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 })
  }
}
