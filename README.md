# GitHub Wrapped

<img width="477" height="57" alt="GitHub Wrapped" src="https://github.com/user-attachments/assets/82226175-19e5-442f-8a4f-055d52808939" />

[Live Now](https://githubrapped.vercel.app)

**GitHub Wrapped** turns your GitHub activity into a personalized developer experience.

Explore your year in code through a Spotify Wrapped-style experience, or generate a terminal-style GitHub profile README that you can customize and copy anywhere.

---

## ✨ Features

### 📊 GitHub Wrapped

Generate a personalized year-in-review experience from any public GitHub username.

* Fetch GitHub activity and profile statistics
* Total contributions and activity
* Top repositories
* Top programming languages
* Commit and contribution history
* Monthly and seasonal activity breakdowns
* Commit streaks
* Developer activity percentile
* Interactive visualizations
* Shareable personalized Wrapped pages
* Export/share your Wrapped as an image

Generate a Wrapped at:

```text
/wrap/<username>
```

Example:

```text
https://githubrapped.vercel.app/wrap/octocat
```

---

### 💻 Terminal README Generator

Generate a terminal-style GitHub profile README directly from your GitHub profile.

* Fetch GitHub profile information automatically
* Generate a developer README from your GitHub data
* Multiple terminal-inspired templates
* Customize and edit the generated README
* Preview changes instantly
* Copy the final README to your clipboard
* Use the generated README anywhere
* Template-specific README generation

Generate a README at:

```text
/readme
```

Personalized README pages are available at:

```text
/readme/<username>
```

Templates are available through:

```text
/readme/<username>/<template>
```

---

## 🔗 Routes

The application uses the Next.js App Router.

| Route                           | Purpose                          |
| ------------------------------- | -------------------------------- |
| `/`                             | Main GitHub Wrapped landing page |
| `/wrap`                         | GitHub Wrapped generator         |
| `/wrap/[username]`              | Personalized GitHub Wrapped      |
| `/readme`                       | Terminal README Generator        |
| `/readme/[username]`            | Personalized README              |
| `/readme/[username]/[template]` | Editable README template         |

The personalized routes are generated dynamically from the GitHub username.

---

## 🖼️ Sharing & Export

GitHub Wrapped is designed to be shared.

Personalized Wrapped pages can generate social previews containing the user's GitHub statistics.

The project also uses client-side rendering and `html2canvas` for image capture/export of Wrapped content.

Personalized Open Graph images follow the user's route:

```text
/wrap/<username>/opengraph-image
```

This allows shared Wrapped URLs to display personalized previews on platforms such as X, Discord, LinkedIn, and other social platforms.

---

## 🛠️ Tech Stack

### Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS
* Framer Motion
* Recharts

### Data

* GitHub GraphQL API
* GitHub user/profile data
* GitHub contribution and repository data

### Rendering & Export

* `html2canvas`
* Next.js dynamic routes
* Dynamic Open Graph image generation

### Deployment

* Vercel

---

## 📁 Project Structure

```text
github-wrapped/
│
├── app/
│   ├── api/
│   │
│   ├── readme/
│   │   └── [username]/
│   │       └── [template]/
│   │           └── page.tsx
│   │
│   ├── wrap/
│   │   └── [username]/
│   │       ├── page.tsx
│   │       └── wrap-page-client.tsx
│   │
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
│
├── components/
│   └── ...
│
├── lib/
│   └── ...
│
├── public/
│   └── ...
│
├── .env
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

The project follows the Next.js App Router architecture with dynamic routes for personalized GitHub experiences.

---

## 📄 License

This project currently does not include a license.

If you plan to allow others to freely use, modify, and distribute the project, consider adding an appropriate open-source license such as MIT.

---

## ❤️ Credits

Inspired by the Spotify Wrapped experience and built to celebrate developer activity on GitHub.

Built with:

**Next.js · React · TypeScript · Tailwind CSS · Framer Motion · Recharts · GitHub GraphQL API**

---

## 🚧 What's Next

Some ideas for future improvements:

* [ ] More Wrapped visualizations
* [ ] More README templates
* [ ] More README customization options
* [ ] Improved sharing/export options
* [ ] Better caching for GitHub API requests
* [ ] More GitHub statistics
* [ ] Custom README sections
* [ ] Public developer profile pages
* [ ] Improved SEO and search discoverability
* [ ] Analytics for Wrapped and README generation
