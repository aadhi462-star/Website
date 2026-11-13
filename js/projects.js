/*
 * ─── YOUR PROJECTS ────────────────────────────────────────────────
 * Every project in the "Work" section is generated from this list.
 * To add one, copy a block below, paste it into the list and edit it.
 * Order here = order on the page.
 *
 *   id            unique, lowercase-with-dashes (URL: #work/<id>)
 *   title         project name
 *   category      e.g. "Product", "Tool"
 *   year          e.g. "2026" (optional)
 *   platforms     where it works, e.g. "Desktop & mobile" (optional)
 *   role          what you did, e.g. "Designed & built" (optional)
 *   summary       one or two sentences
 *   oneLiner      the single line shown on the project card (falls back to summary)
 *   status        current state, e.g. "Live", "Live demo", "v1.1.0" (optional)
 *   why           why you decided to build it (optional)
 *   challenges    what was hard, one sentence each: ["…", "…"] (optional)
 *   problem       the problem it addresses (optional)
 *   contribution  what you personally did (optional)
 *   approach      how you went about it (optional)
 *   learnings     what you learned, one sentence each: ["…", "…"] (optional)
 *   details       extra paragraphs for the case study (optional)
 *   tags          tools / skills used
 *   imageSize     [width, height] of the screenshot (optional, default
 *                 [1440, 900]); keeps the space reserved before it loads
 *   image         screenshot in Images/ (optional). Projects with an image
 *                 and featured: true get a large case-study layout; the
 *                 rest appear in the index list below them.
 *   links         [{ label, url }] (optional)
 *   featured      true = large case study (optional)
 *   inspiredBy    { label, url } credit for an idea you built on (optional)
 *   draft         true = kept off the page until its content is confirmed
 *
 * Only write what's true — leave a field out rather than guess.
 * ──────────────────────────────────────────────────────────────────
 */
window.PROJECTS = [
  {
    id: "startapath",
    title: "StartaPath",
    category: "Product",
    featured: true,
    role: "Designed & built",
    status: "Live", // site checked on 11 Nov 2026
    oneLiner: "Turns a short startup idea into a structured venture audit.",
    summary:
      "An AI decision-intelligence platform that turns a short description of a startup idea into a structured venture audit: viability score, market sizing, competitors, a 90-day roadmap, a Business Model Canvas and a pitch deck.",
    problem:
      "Founders, especially students and first-time entrepreneurs, have no fast, structured and affordable way to check whether an idea is worth building. Market reports are costly, consultants are slow, and chatbots give free-form answers that can't be compared.",
    contribution:
      "Prototyped StartaPath in Google AI Studio and built it into a React 19 + TypeScript single-page app (about 6,900 lines across 33 components). Designed a fixed JSON schema so every Gemini 2.5 Flash audit has the same sections, then added on-demand SWOT, PEST and market-need analyses, a Google Maps-grounded local ecosystem scan, an action tracker that suggests the next step, text and real-time voice advisors, a Zoho Product Lab, version history and a full PDF report.",
    approach:
      "Prototyped in Google AI Studio, then exported to a Vite + React project. Instead of free-form chat, the model fills a fixed JSON response schema, so every audit has the same sections and can be rendered, edited, scored and compared.",
    // TODO (optional): add `learnings: ["…"]` — what building StartaPath taught you
    details: [
      "Every audit includes a 0–10 viability score split into feasibility, market fit, readiness and risk; TAM/SAM/SOM market sizing; competitor analysis; MVP scope; pricing; a 90-day roadmap; a nine-block Business Model Canvas and a 7–10 slide pitch deck. Founders can edit all of it and export the whole audit as one printable report.",
      "The key design decision is schema-constrained generation. A general chatbot answers in a different shape every time; StartaPath makes the model fill a typed contract, so its output can be rendered, edited, scored and compared like regular app data.",
      "It runs entirely in the browser with no backend: data is saved locally, failed requests retry with exponential backoff, and a live quota meter keeps usage within the Gemini free tier."
    ],
    tags: ["React 19", "TypeScript", "Gemini 2.5 Flash", "Gemini Live API", "Vite", "Tailwind CSS"],
    image: "Images/StartaPath.png",
    imageSize: [1440, 810],
    links: [{ label: "Visit website", url: "https://startapath-ai-businessvalidator.onslate.in/" }]
  },
  {
    id: "gamerush",
    title: "GameRush",
    category: "Product",
    featured: true,
    platforms: "Desktop & mobile", // platforms: checked at phone width (390px) on 10 Nov 2026, and confirmed by you
    role: "Designed & built",
    status: "Live", // site checked on 11 Nov 2026
    oneLiner: "44 free browser games. No downloads, no sign-up.",
    summary:
      "44 free browser games — typing races, board classics, puzzles and arcade — with no downloads and no sign-up.",
    problem:
      "Playing a quick game, alone or with a friend, shouldn't need a download or an account.",
    contribution:
      "Designed and built the whole site: the game library, online rooms for 30 games, two-player mode on one device for 12 more, and a daily loop of picks, missions, streaks and XP levels.",
    tags: ["Web app", "Game design", "Multiplayer", "Gamification"],
    image: "Images/gamerush.jpg",
    links: [{ label: "Play now", url: "https://gamerush.onslate.in/" }]
  },
  {
    id: "communityone",
    title: "CommunityOne",
    category: "Product",
    year: "2026",
    featured: true,
    platforms: "Desktop & mobile", // audited at 375, 768 and 1280px on 12 Nov 2026
    role: "Product direction, built with Claude Code",
    status: "Live demo", // runs on fictional data
    oneLiner: "A platform where anyone can create and run a community.",
    summary:
      "A community platform with one account for every community you belong to, with discussions, events, resources, courses with certificates, moderation and platform administration.",
    problem:
      "Groups of every kind, from alumni networks and classes to hobby clubs and organisations, end up running on chat groups and separate tools. Nobody can see who belongs where, and there\u2019s no shared way to learn, moderate or look after members.",
    why:
      "I started from an earlier community demo of mine that kept all its data in the browser and served one kind of group. I wanted to see it become a real product: its own server and database, any kind of community, and rules for privacy and safety from the start.",
    contribution:
      "I set the direction and made the product decisions. I wrote the briefs, supplied the source documents (a product conversation, a 244-case edge-case list and a roadmap) and approved every stage before it was built: the design boards, each decision and the scope. Claude Code, an AI coding agent, wrote the code from those briefs. Each stage ended with tests and browser checks that I reviewed before it went to GitHub.",
    approach:
      "The work ran in stages, each with the same loop: a proposal and design boards, my approval, then the server and database, tests named after the edge cases, the screens, and checks at phone width. When I sent a new brief midway, reversing two earlier decisions, the work paused for an audit and an estimate, then continued in eight workstreams, A to H.",
    details: [
      "Communities are Public, Private (people ask to join) or Closed (invitation only, and invisible to outsiders). One rule runs through all of it: nobody is ever added to a community they didn\u2019t choose. Adding people sends invitations.",
      "New communities start from one of eight templates (alumni, education, professional networking, technology, business, hobbies, organisations, general) or from scratch. A short questionnaire fills in the sections, categories and roles.",
      "Each community can run courses with lessons, quizzes, graded assignments and certificates that anyone can verify. Moderation covers reports, cases, appeals and time-limited restrictions, and reporters are never named.",
      "Under it sit a Node.js and Fastify server, PostgreSQL (PGlite) and React. It has 447 automated server tests and browser tests at desktop and phone size, and it\u2019s deployed on Zoho Catalyst AppSail.",
      "The final pass audited 161 screens against WCAG 2.2 AA at three widths and in dark mode, and a security review found and fixed ten issues. Every one now has its own test."
    ],
    challenges: [
      "A new brief partway through reversed earlier decisions (no community would be joined by default any more, and the colour scheme changed), so existing data had to move without losing anyone.",
      "Keeping privacy consistent across many screens: a profile must never reveal a Private or Closed membership, and a block must never be revealed to the person blocked."
    ],
    tags: ["Product direction", "Claude Code", "React", "Node.js", "PostgreSQL", "Zoho Catalyst", "WCAG 2.2"],
    image: "Images/communityone.jpg",
    links: [{ label: "Visit website", url: "https://communityone.development.catalystappsail.in/" }]
  },
  {
    id: "time-zone-buddy",
    title: "Time Zone Buddy",
    category: "Extension",
    featured: true,
    year: "2026",
    role: "Designed & built",
    status: "v1.1.0",
    oneLiner: "World clocks, a converter and a meeting planner in one Chrome popup.",
    summary:
      "A Chrome extension that puts world clocks, a time converter and a meeting planner in one popup, with daylight saving handled for you.",
    problem:
      "Working with people across time zones means juggling clocks, converting times in your head and guessing when a meeting suits everyone.",
    contribution:
      "Built it as a Manifest V3 Chrome extension: about 400 built-in cities plus every IANA time zone and online town search, custom named locations, favourites and pinned clocks, a converter, and a meeting planner that suggests times across everyone's working hours. Added meeting reminders that ring as Chrome notifications, with snooze, even when the popup is closed.",
    approach:
      "Started from RandomZone's web tool and rethought it for a browser popup: everything one click away, data kept in the browser, and a background service worker that turns each reminder into a Chrome alarm so it rings even when the popup is closed.",
    // TODO (optional): add `learnings: ["…"]`
    details: [
      "Everything stays in the browser with no account. Settings sync through Chrome storage, while reminders stay on each device so the same reminder doesn't ring on every computer you're signed in to.",
      "Daylight-saving offsets come from the browser's own time-zone data, so clocks stay correct without a hand-maintained table."
    ],
    tags: ["Chrome extension", "Manifest V3", "JavaScript", "Intl API"],
    image: "Images/timezonebuddy.jpg",
    inspiredBy: { label: "RandomZone's Time Zone Buddy", url: "https://randomzone.buildbetter.co.in/timezone-buddy/" }
  },
  {
    id: "screenly",
    title: "Screenly",
    category: "Mac app",
    year: "2026",
    featured: true,
    platforms: "macOS 12 or later",
    role: "Designed & built",
    status: "Open source", // MIT licence; no release yet, built from the code
    oneLiner: "Animated characters that live on your Mac's desktop.",
    summary:
      "A macOS app that puts animated animals and your own characters on your desktop. They walk along the Dock, hang from the top of the screen, stand on your windows and react to your cursor. The overlay is click-through, so they never get in the way of your work.",
    details: [
      "Characters land on window tops and ride along when you move a window, fall when it closes, look at your cursor and greet each other. Petting and meals make them happier, and they get sleepy in the evening by your Mac's clock.",
      "Each animal has its own diet. Food drops nearby, prey like flies and mice moves and has to be caught, and crumbs fall as they eat.",
      "Character Studio turns any image into a character: background removal that runs on the Mac (images are never uploaded), brushes, crop, a frame timeline for animation and an editor for hanging characters.",
      "It's an Electron app written in TypeScript with React and PixiJS, with Vitest tests for behaviour, feeding, validation and file safety.",
      "The Spider-Man in the walkthrough is an image I imported to test the Studio; Spider-Man is a trademark of Marvel, and the character isn't part of Screenly."
    ],
    tags: ["Electron", "TypeScript", "React", "PixiJS", "Vitest"],
    image: "Images/screenly.jpg",
    gallery: [
      { src: "Images/screenly-spiderman.jpg", alt: "Spider-Man, made from an imported image, hanging by a thread from the top of a Mac desktop next to Screenly's Active Characters window" },
      { src: "Images/screenly-hanging-editor.jpg", alt: "Character Studio's hanging editor: the thread's attachment point on Spider-Man, thread and swing settings, and a live preview" },
      { src: "Images/screenly-library.jpg", alt: "Screenly's Character Library: animal characters with Add to desktop and Customise buttons" },
      { src: "Images/screenly-studio.jpg", alt: "Character Studio's live preview: a ginger cat walking on a simulated desktop" },
      { src: "Images/screenly-active.jpg", alt: "Active Characters: each character's behaviour, mood, size and opacity controls" }
    ],
    links: [{ label: "View on GitHub", url: "https://github.com/aadhi462-star/hangly" }]
  }
];
