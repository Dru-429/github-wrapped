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
    link: 'https://x.com/nitish_boht/status/2056305865007980829?s=20',
    name: 'ullu ka protha',
    handle: 'nitish_boht',
    avatarSrc:
      'https://pbs.twimg.com/profile_images/1942179926439829504/Ot5VrFC-.jpg',
    text: 'HOLY ANIMATION! \n',
    date: 'May 20',
    verified: true
  },
  {
    id: 2,
    link: 'https://x.com/kshvbgde/status/2058895967416685028?s=20',
    name: 'keshav',
    handle: 'kshvbgde',
    avatarSrc:
      'https://pbs.twimg.com/profile_images/2054213507433074688/0fE_oyME.jpg',
    text: 'great work on the design, love the cooking animation.',
    date: 'May 25',
    verified: true
  },
  {
    id: 3,
    link: 'https://x.com/_nako_o0/status/2069347208135115145?s=20',
    name: 'nakooo',
    handle: '_nako_o0',
    avatarSrc:'https://pbs.twimg.com/profile_images/1610408591931965442/oJ9tXixB.jpg',
    text: 'A small open-source tool that I stumbled upon by chance and that I love!\n',
    date: 'Jun 23',
    verified: true
  },
  {
    id: 4,
    link: 'https://x.com/vidit_odedra/status/2060290095312523334?s=20',
    name: 'vidit._od',
    handle: 'vidit_odedra',
    avatarSrc:
      'https://pbs.twimg.com/profile_images/1943399068643852291/BmlXn6UN.jpg',
    text: 'Just tried it again 🥰\nReally cool',
    date: 'May 29',
    verified: true
  },
  {
    id: 5,
    link: 'https://x.com/vansh1029/status/2060719366313029873?s=20',
    name: 'Vansh N.',
    handle: 'vansh1029',
    avatarSrc:
      'https://pbs.twimg.com/profile_images/2068233312875986945/GDT53_4Q.png',
    text: "Cool design bro \nHow did you get this 😂\nIt's my favorite car",
    date: 'May 30',
    verified: true
  },
  {
    id: 6,
    link: 'https://x.com/anurag__kochar/status/2069451247044923489?s=20',
    name: 'Anurag Kochar',
    handle: 'anurag__kochar',
    avatarSrc:
      'https://pbs.twimg.com/profile_images/2035496482569342976/coNLuPcW.jpg',
    text: "loved the site's brutalist ui ♥",
    date: 'Jun 23',
    verified: true
  },
  {
    id: 7,
    link: 'https://x.com/Ashutosh_7x7/status/2069318511105835340?s=20',
    name: 'Ashutoshx7',
    handle: 'Ashutosh_7x7',
    avatarSrc:
      'https://pbs.twimg.com/profile_images/2043730524922093568/m11Filo2.jpg',
    text: 'crazyyyy looks good!',
    date: 'Jun 23',
    verified: true
  },
  {
    id: 8,
    link: 'https://x.com/nirajxdev/status/2069529852064227621?s=20',
    name: 'Niraj',
    handle: 'nirajxdev',
    avatarSrc:
      'https://pbs.twimg.com/profile_images/2061911186631954432/iz0kKLQT.jpg',
    text: 'you cooked UI bro 😍😍🫶🫶',
    date: 'Jun 23',
    verified: true
  }
]

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
