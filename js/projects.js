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
    role: "Product & strategy",
    summary:
      "An AI business validator that helps founders test a startup idea and leave with a clear direction, bridging the gap between ideation and execution.",
    problem:
      "Aspiring founders often hesitate to take the first step because they can't tell whether their idea is worth pursuing.",
    // TODO: add `contribution` — what you personally did on StartaPath
    details: [
      "With a structured validation framework, StartaPath turns abstract ideas into clear, actionable plans. Instead of relying on guesswork or opinions, founders evaluate their idea through systematic analysis before committing time or money.",
      "Building a startup can feel lonely and overwhelming. StartaPath offers structure, guidance and a clear path forward, moving founders from uncertainty to confident action."
    ],
    tags: ["Product thinking", "AI", "Startup validation"],
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
    // TODO: check this description; add problem / contribution and a screenshot
    summary: "An app for keeping every product warranty in one place, so nothing expires unnoticed.",
    tags: ["Google AI Studio", "Prompting"],
    links: [{ label: "Open app", url: "https://ai.studio/apps/drive/1GHWw8ckcAHaHVOTmQuCD9ZB0Ew_MKRO3?fullscreenApplet=true" }]
  },
  {
    id: "jas-visual-scraper",
    title: "Jas Visual Scraper",
    category: "Tool",
    // TODO: check this description; add a store / GitHub link when public
    summary: "A Chrome extension for visually picking and collecting data from web pages, no code needed.",
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
