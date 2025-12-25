export interface GitHubUser {
  name: string
  login: string
  avatarUrl: string
  bio: string
  location: string
  followers: number
  following: number
  profileUrl: string
}

export interface Repository {
  name: string
  commits: number
  stars: number
}

export interface Language {
  name: string
  percentage: number
}

export interface SeasonalData {
  Q1: number
  Q2: number
  Q3: number
  Q4: number
  peakMonth: string
}

export interface GitHubStats {
  totalCommits: number
  longestStreak: number
  currentStreak: number
  topRepos: Repository[]
  topLanguages: Language[]
  percentile: number
  seasonalData: SeasonalData
  monthlyCommits?: number[] // Added for chart data
  linesOfCode?: number
  prsMerged?: number
  issuesClosed?: number
  weekdayPercent?: number
}

export interface GitHubData {
  user: GitHubUser
  stats: GitHubStats
}
