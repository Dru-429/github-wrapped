## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <this-repo-url>
cd github-wrapped
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

The application uses the GitHub GraphQL API to fetch GitHub data.

Create a `.env` file:

```env
GITHUB_TOKEN=your_github_token
```

The token is required for fetching GitHub GraphQL data.

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🔐 Environment Variables

| Variable               | Required | Description                                         |
| ---------------------- | -------- | --------------------------------------------------- |
| `GITHUB_TOKEN`         | Yes      | GitHub token used to access the GitHub GraphQL API  |
| `NEXT_PUBLIC_BASE_URL` | Optional | Base URL used for client-side configuration         |
| `SITE_URL`             | Optional | Production URL used for SEO/canonical configuration |

For local development:

```env
GITHUB_TOKEN=your_token_here
```

For production:

```env
GITHUB_TOKEN=your_production_token
SITE_URL=https://githubrapped.vercel.app
```

> Never commit your GitHub token or `.env` file to the repository.

---

## 📊 GitHub GraphQL API

GitHub Wrapped retrieves GitHub data through the GitHub GraphQL API.

The application uses this data to build the personalized Wrapped experience and README content.

Examples of data used include:

* Profile information
* Repositories
* Contributions
* Commit activity
* Programming languages
* Repository statistics
* Contribution history

No AI API is required to generate the Wrapped experience or README content.

---

## 🎨 README Templates

The README Generator is built around terminal-inspired developer profiles.

The generated README can be:

```text
GitHub Data
     ↓
README Template
     ↓
Generated README
     ↓
Customize / Edit
     ↓
Copy
     ↓
Paste into GitHub
```

The goal is to make creating a unique developer profile README significantly faster without requiring users to manually build everything from scratch.

---

## 🌐 Deployment

The recommended deployment platform is **Vercel** because the project is built with Next.js.

### Deploy

1. Import the repository into Vercel.
2. Configure the required environment variables.
3. Deploy the application.
4. Verify the GitHub GraphQL API is working.
5. Verify `sitemap.xml` and `robots.txt`.
6. Submit the sitemap to Google Search Console.

Production URL:

```text
https://githubrapped.vercel.app
```

---

## 🤝 Contributing

Contributions are welcome.

To contribute:

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/your-feature
```

3. Make your changes.
4. Test the application locally.
5. Commit your changes.

```bash
git commit -m "Add your feature"
```

6. Push your branch.

```bash
git push origin feature/your-feature
```

7. Open a Pull Request.

Please keep PRs focused and explain the motivation behind significant changes.

---

