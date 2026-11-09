/*
 * ─── YOUR PROJECTS ────────────────────────────────────────────────
 * Every project in the "Work" section is generated from this list.
 * To add one, copy a block below, paste it into the list and edit it.
 * Order here = order on the page.
 *
 *   id            unique, lowercase-with-dashes (URL: #work/<id>)
 *   title         project name
 *   category      e.g. "Product", "Tool", "Coursework"
 *   year          e.g. "2026" (optional)
 *   role          what you did, e.g. "Designed & built" (optional)
 *   summary       one or two sentences
 *   problem       the problem it addresses (optional)
 *   contribution  what you personally did (optional)
 *   details       extra paragraphs for the case study (optional)
 *   tags          tools / skills used
 *   image         screenshot in Images/ (optional). Projects with an image
 *                 and featured: true get a large case-study layout; the
 *                 rest appear in the index list below them.
 *   links         [{ label, url }] (optional)
 *   featured      true = large case study (optional)
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
    summary:
      "An AI decision-intelligence platform that turns a short description of a startup idea into a structured venture audit: viability score, market sizing, competitors, a 90-day roadmap, a Business Model Canvas and a pitch deck.",
    problem:
      "Founders, especially students and first-time entrepreneurs, have no fast, structured and affordable way to check whether an idea is worth building. Market reports are costly, consultants are slow, and chatbots give free-form answers that can't be compared.",
    contribution:
      "Prototyped StartaPath in Google AI Studio and built it into a React 19 + TypeScript single-page app (about 6,900 lines across 33 components). Designed a fixed JSON schema so every Gemini 2.5 Flash audit has the same sections, then added on-demand SWOT, PEST and market-need analyses, a Google Maps-grounded local ecosystem scan, an action tracker that suggests the next step, text and real-time voice advisors, a Zoho Product Lab, version history and a full PDF report.",
    details: [
      "Every audit includes a 0–10 viability score split into feasibility, market fit, readiness and risk; TAM/SAM/SOM market sizing; competitor analysis; MVP scope; pricing; a 90-day roadmap; a nine-block Business Model Canvas and a 7–10 slide pitch deck. Founders can edit all of it and export the whole audit as one printable report.",
      "The key design decision is schema-constrained generation. A general chatbot answers in a different shape every time; StartaPath makes the model fill a typed contract, so its output can be rendered, edited, scored and compared like regular app data.",
      "It runs entirely in the browser with no backend: data is saved locally, failed requests retry with exponential backoff, and a live quota meter keeps usage within the Gemini free tier."
    ],
    tags: ["React 19", "TypeScript", "Gemini 2.5 Flash", "Gemini Live API", "Vite", "Tailwind CSS"],
    image: "Images/StartaPath.png",
    links: [{ label: "Visit website", url: "https://startapath-ai-businessvalidator.onslate.in/" }]
  },
  {
    id: "gamerush",
    title: "GameRush",
    category: "Product",
    featured: true,
    role: "Designed & built",
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
    id: "alumnizone",
    title: "AlumniZone",
    category: "Product",
    featured: true,
    role: "Designed & built",
    summary:
      "An all-in-one alumni community: a wall, groups, events, real-time channels, forums and manuals under one login.",
    problem:
      "Alumni networks end up scattered across WhatsApp groups and separate tools that don't talk to each other.",
    contribution:
      "Designed and built a working demo of the full platform with fictional data: Mandatory Read posts with acknowledgement tracking, groups with their own feeds, events with RSVPs, channels that auto-join group members, forums with upvotes and a shared manual.",
    tags: ["Web app", "Community platform", "Product design"],
    image: "Images/alumnizone.jpg",
    links: [{ label: "Visit website", url: "https://community.onslate.in/" }]
  },
  {
    id: "warranty-vault-pro",
    title: "Warranty Vault Pro",
    category: "Tool",
    role: "Designed & built",
    summary:
      "A personal vault for product warranties: purchases, receipts and warranty periods kept in one place, so you can see at a glance what's still covered.",
    problem:
      "Warranty cards and receipts get lost, so when something breaks it's hard to know whether it's still under warranty.",
    contribution:
      "Designed and built the app in Google AI Studio, shaping how a warranty is added, stored and checked through prompting and iteration.",
    tags: ["Google AI Studio", "Prompting", "Product design"],
    links: [{ label: "Open app", url: "https://ai.studio/apps/drive/1GHWw8ckcAHaHVOTmQuCD9ZB0Ew_MKRO3?fullscreenApplet=true" }]
  },
  {
    id: "jas-visual-scraper",
    title: "Jas Visual Scraper",
    category: "Tool",
    role: "Designed & built",
    summary:
      "A Chrome extension that collects data from web pages by pointing and clicking: pick the parts of a page you want and turn them into structured data, no code needed.",
    problem:
      "Copying information out of web pages by hand is slow, and most scraping tools assume you can write code.",
    contribution:
      "Designed and built the extension, from selecting elements visually on the page to gathering what you picked into a usable format.",
    // Add a Chrome Web Store or GitHub link here when it's public
    tags: ["Chrome extension", "JavaScript", "Automation"]
  },
  {
    id: "business-model-canvas",
    title: "Business Model Canvas",
    category: "Coursework",
    summary:
      "Applying the Business Model Canvas to real-world products: partners, value propositions and revenue streams in one strategic view.",
    tags: ["Product management", "Business strategy"],
    links: [{ label: "View works", url: "https://workdrive.zohoexternal.in/external/337fe70466d8c05ae4a7c672ec5943a9798b55f06fa3f0b012002b11c32ca066" }]
  },
  {
    id: "product-ideation",
    title: "Product Ideation",
    category: "Coursework",
    summary:
      "Design Thinking and Mind Mapping used to generate solutions for everyday consumer pain points, through to a product pitch.",
    tags: ["Design thinking", "Ideation", "Pitching"],
    links: [{ label: "View works", url: "https://workdrive.zohoexternal.in/external/337fe70466d8c05ae4a7c672ec5943a9798b55f06fa3f0b012002b11c32ca066" }]
  },
  {
    id: "psychographic-research",
    title: "Psychographic Research",
    category: "Coursework",
    summary:
      "Demographics say who buys; psychographics say why. A study of the values, lifestyles and personalities of target segments.",
    tags: ["Consumer research", "Marketing"],
    links: [{ label: "View works", url: "https://workdrive.zohoexternal.in/external/337fe70466d8c05ae4a7c672ec5943a9798b55f06fa3f0b012002b11c32ca066" }]
  }
];
