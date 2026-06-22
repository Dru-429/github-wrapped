const locImg = '/assets/loc.png'
const langImg = '/assets/lang.png'
const overviewImg = '/assets/overview.png'
const timelineImg = '/assets/timeline.png'
const theme = '/assets/theme.jpg'
const pic2 = '/assets/dino_bg.png'
const x = '/assets/x.png'
const cards = '/assets/cards.png'
const pic1 = '/assets/pic1.png'

// X reviews
const tweets = [
  {
    id: 1,
    name: "Aarav Sharma",
    handle: "aaravbuilds",
    avatarColor: "var(--lime)",
    text: "Github Wrapped just told me I wrote 42k lines of TypeScript this year. My therapist is gonna hear about this. 😭",
    date: "Dec 18",
    verified: true,
    link: "https://x.com/aaravbuilds/status/1234567890123456789"
  },
  {
    id: 2,
    name: "Maya Chen",
    handle: "mayacodes",
    avatarColor: "var(--mantis)",
    text: "okay the Spotify-style wrap for GitHub is actually genius. shared mine on LinkedIn and got 3 DMs in an hour 💼",
    date: "Dec 17",
  },
  {
    id: 3,
    name: "Leo Park",
    handle: "leobyte",
    avatarColor: "var(--nuit)",
    text: "found out my top language is YAML. i need to log off. 10/10 tool though, the cards look insane.",
    date: "Dec 16",
    verified: true,
  },
  {
    id: 4,
    name: "Priya Nair",
    handle: "priya_dev",
    avatarColor: "var(--deep-green)",
    text: "the timeline view is so clean. you can literally see the month i discovered Rust and never came back 🦀",
    date: "Dec 15",
  },
  {
    id: 5,
    name: "Sam Holloway",
    handle: "samh_eng",
    avatarColor: "var(--ink)",
    text: "shipped 1,204 commits this year apparently. one of them probably even worked. great tool @githubwrapped",
    date: "Dec 14",
  },
  {
    id: 6,
    name: "Zara Ahmed",
    handle: "zaracodes",
    avatarColor: "var(--lime)",
    text: "the sticky note feature cards on the landing page?? whoever designed this — marry me. 💍",
    date: "Dec 13",
    verified: true,
  },
];

//Feature
const features = [
  {
    img: locImg,
    title: 'Count LoC & Commits',
    note: 'Every line, every push.',
    color: 'var(--lime)',
    rotate: -2.5
  },
  {
    img: langImg,
    title: 'Find ur Fav Lang',
    note: 'Many more',
    color: 'var(--mantis)',
    rotate: 1.8
  },
  {
    img: overviewImg,
    title: 'Show an Overview',
    note: 'PRs, issues, the lot.',
    color: 'var(--cream)',
    rotate: -1.2
  },
  {
    img: timelineImg,
    title: 'Year Timeline',
    note: 'Q1 to Q4, mapped.',
    color: 'var(--lime)',
    rotate: 2.2
  }
]

//photos
const photos = [
  { src: theme, alt: 'Theme', top: '12%', left: '10%', rotate: -5 },
  { src: pic2, alt: 'Hot', top: '35%', left: '75%', rotate: 5 },
  { src: x, alt: 'Meet the developer', top: '55%', left: '15%', rotate: 5 },
  { src: cards, alt: 'Cards Collage', top: '10%', left: '45%', rotate: 7 },
  { src: pic1, alt: 'Neerdy', top: '60%', left: '45%', rotate: -7 }
]

//FAQs
const faqData = [
  {
    id: 1,
    question: 'Is my data shared?',
    answer:
      "Totally! JK ! We don't store your data or your code we just fetch the public stuff from GitHub, make it look pretty, and then we forget we ever met."
  },
  {
    id: 2,
    question: 'What kind of stats am I getting?',
    answer: "Bruhhh... it's fun and jsut a click away, Go check it out!"
  },
  {
    id: 3,
    question: 'Can it see my private repos?',
    answer:
      'Sorry Nahh! We only look at your public activity. We are working on it'
  },
  {
    id: 4,
    question: 'Can we Download it or Share it ?',
    answer:
      "Of course..it generates sleek, story-ready cards. One click and you're ready to flex your wins on X, LinkedIn, or Instagram."
  },
  {
    id: 5,
    question: 'Wait, I found. a bug!',
    answer:
      "Awesome! (Well, not the bug, but the fact that you found it). This is an open-source project, so head over to the GitHub repo and drop an issue or a PR. Let's build this together!"
  }
]

export { tweets, features, photos, faqData }