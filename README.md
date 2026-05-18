# GitHub Wrapped 
[Live demo](https://githubrapped.vercel.app)   •   [Product Hunt](https://www.producthunt.com/products/github-wrapped-2025?launch=github-wrapped-2025) 

<img width="477" height="57" alt="image" src="https://github.com/user-attachments/assets/82226175-19e5-442f-8a4f-055d52808939" />


**GitHub Wrapped** generates a year-in-review "wrapped" experience for any GitHub username, just like Spotify Wrapped 2025. The app fetches GitHub activity and presents highlights like top repositories, languages, commit streaks, seasonal activity, and a shareable image.

---

## Features

- Fetch GitHub user metrics (contributions, repos, languages, commit history)
- Visual summaries: top repos, top languages, monthly/seasonal breakdowns, streaks, percentile
- Client-side capture/export (uses `html2canvas`)

---

## Tech Stack

- Next.js 16 (app directory)
- React 19 + TypeScript
- Tailwind CSS + Framer Motion + Recharts
- GitHub GraphQL API for data

---

## Preview
<img width="1266" height="852" alt="image" src="https://github.com/user-attachments/assets/d8028aae-6961-42a1-b528-f5b973ab26c6" />
<img width="1283" height="907" alt="image" src="https://github.com/user-attachments/assets/815ef04a-2923-46f7-ae74-00e9199eaed3" />

## Quick start

1. Clone the repository:

```bash
git clone <this-repo-url>
cd github-wrapped
```

2. Install dependencies:

```bash
npm install
```

3. Provide a GitHub token (required):

The app uses the GitHub GraphQL API. Set `GITHUB_TOKEN` in your environment before running the app.

```bash
# macOS / Linux
export GITHUB_TOKEN="your_token_here"

# PowerShell (Windows)
$Env:GITHUB_TOKEN = "your_token_here"
```

4. Run the dev server:

```bash
npm run dev
# Visit http://localhost:3000
```

5. Generate a wrapped page by visiting:

```
http://localhost:3000/wrap/<username>
# Example: http://localhost:3000/wrap/octocat
```

> The GraphQL client in `lib/github.ts` will throw an error if `GITHUB_TOKEN` is missing.

---

## Environment variables

- `GITHUB_TOKEN` — **required**: GitHub GraphQL token with appropriate public scopes
- (Optional) `NEXT_PUBLIC_BASE_URL` or `SITE_URL` — set your production base URL for canonical links, sitemaps, and sharing
  
---

##  Deployment

- Recommended: Vercel (automatic Next.js support)
- Add `GITHUB_TOKEN` to your deployment environment variables before deploying

---

## Notes

- Watch for GitHub API rate limits when making many requests; consider caching responses
- The screenshot/export feature uses `html2canvas`; cross-browser behavior may vary

---

## Contributing

Contributions are welcome — open an issue or PR. Please include tests for new logic and keep changes focused.

---

## 📄 License

Add a `LICENSE` file to indicate how you want to license this repository (MIT is a common choice).

---

## ❤️ Credits

Inspired by Spotify Wrapped 2025 and built to celebrate developer activity on GitHub.
