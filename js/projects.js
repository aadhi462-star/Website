/*
 * ─── YOUR PROJECTS ────────────────────────────────────────────────
 * Every card in the "Work" section is generated from this list.
 * To add a project, copy one block below, paste it into the list and
 * edit the fields. Order here = order on the page.
 *
 *   id          unique, lowercase-with-dashes (used in the URL: #work/<id>)
 *   title       project name
 *   category    "Products" | "Tools" | "Academic" | "Writing"
 *               (any new word you use becomes a new filter chip automatically)
 *   year        e.g. "2026" or "2025 – 2026"  (optional)
 *   role        what you did (optional)
 *   summary     one or two sentences shown on the card
 *   details     array of paragraphs shown when the card is opened (optional)
 *   tags        short skill / tech labels
 *   image       path to a screenshot in Images/ (optional — a colour cover
 *               with the project's initials is drawn when it's missing)
 *   color       cover colour when there's no image (optional)
 *   links       [{ label, url }]  (optional)
 *   featured    true = shown as a wide card at the top (optional)
 * ──────────────────────────────────────────────────────────────────
 */
window.PROJECTS = [
  {
    id: "startapath",
    title: "StartaPath",
    category: "Products",
    featured: true,
    role: "Product & strategy",
    summary:
      "An AI business validator that helps founders test a startup idea and leave with a clear direction, bridging the gap between ideation and execution.",
    details: [
      "StartaPath tackles one of the biggest problems aspiring entrepreneurs face: taking the first step with confidence. Many founders hesitate because they're unsure whether their idea is worth pursuing.",
      "With a structured validation framework, it turns abstract ideas into clear, actionable plans. Instead of relying on guesswork or opinions, founders evaluate their idea through systematic analysis before committing time or money.",
      "Building a startup can feel lonely and overwhelming. StartaPath offers structure, guidance and a clear path forward, moving founders from uncertainty to confident action."
    ],
    tags: ["Product thinking", "AI", "Startup validation"],
    image: "Images/StartaPath.png",
    links: [{ label: "Visit website", url: "https://startapath-ai-businessvalidator.onslate.in/" }]
  },
  {
    id: "gamerush",
    title: "GameRush",
    category: "Products",
    summary:
      "44 free browser games — typing races, board classics, puzzles and arcade — with no downloads and no sign-up.",
    details: [
      "GameRush is a game hub that runs entirely in the browser: racing, arcade, board, puzzle and word games, from Chess and Ludo to TypeRace and 2048.",
      "Thirty games have online rooms to play with friends, and twelve more support two players on one device.",
      "A daily pick, three daily missions, streaks and XP levels give players a reason to come back every day."
    ],
    tags: ["Web app", "Game design", "Multiplayer", "Gamification"],
    color: "#7c3aed",
    links: [{ label: "Play now", url: "https://gamerush.onslate.in/" }]
  },
  {
    id: "alumnizone",
    title: "AlumniZone",
    category: "Products",
    summary:
      "An all-in-one alumni community: a wall, groups, events, real-time channels, forums and manuals under one login.",
    details: [
      "AlumniZone brings everything an alumni network needs into one place instead of a scattered set of WhatsApp groups and third-party tools.",
      "The Wall carries posts, polls and announcements, and admins can mark a post as Mandatory Read and track who acknowledged it. Groups give each batch, city or interest its own feed, forums, events and members.",
      "Events handle RSVPs and hosts, Channels provide real-time chat that new group members join automatically, Forums hold long-form Q&A with upvotes, and Manuals act as a shared knowledge base.",
      "Built as a demo with fictional data."
    ],
    tags: ["Web app", "Community platform", "Product design"],
    color: "#059669",
    links: [{ label: "Visit website", url: "https://community.onslate.in/" }]
  },
  {
    id: "warranty-vault-pro",
    title: "Warranty Vault Pro",
    category: "Tools",
    // TODO: check this description and add a screenshot to Images/
    summary: "An app for keeping every product warranty in one place, so nothing expires unnoticed.",
    tags: ["Google AI Studio", "Prompting", "App"],
    color: "#2563eb",
    links: [{ label: "Open app", url: "https://ai.studio/apps/drive/1GHWw8ckcAHaHVOTmQuCD9ZB0Ew_MKRO3?fullscreenApplet=true" }]
  },
  {
    id: "jas-visual-scraper",
    title: "Jas Visual Scraper",
    category: "Tools",
    // TODO: check this description and add a store / GitHub link when it's public
    summary: "A Chrome extension for visually picking and collecting data from web pages, no code needed.",
    tags: ["Chrome extension", "JavaScript", "Automation"],
    color: "#0d9488"
  },
  {
    id: "business-model-canvas",
    title: "Business Model Canvas",
    category: "Academic",
    summary:
      "Applying the Business Model Canvas to real-world products: partners, value propositions and revenue streams in one strategic view.",
    tags: ["Product management", "Business strategy"],
    color: "#16a34a",
    links: [{ label: "View works", url: "https://workdrive.zohoexternal.in/external/337fe70466d8c05ae4a7c672ec5943a9798b55f06fa3f0b012002b11c32ca066" }]
  },
  {
    id: "product-ideation",
    title: "Product Ideation",
    category: "Academic",
    summary:
      "Design Thinking and Mind Mapping used to generate solutions for everyday consumer pain points, through to a product pitch.",
    tags: ["Design thinking", "Ideation", "Pitching"],
    color: "#db2777",
    links: [{ label: "View works", url: "https://workdrive.zohoexternal.in/external/337fe70466d8c05ae4a7c672ec5943a9798b55f06fa3f0b012002b11c32ca066" }]
  },
  {
    id: "psychographic-research",
    title: "Psychographic Research",
    category: "Academic",
    summary:
      "Demographics say who buys; psychographics say why. A study of the values, lifestyles and personalities of target segments.",
    tags: ["Consumer research", "Marketing"],
    color: "#0891b2",
    links: [{ label: "View works", url: "https://workdrive.zohoexternal.in/external/337fe70466d8c05ae4a7c672ec5943a9798b55f06fa3f0b012002b11c32ca066" }]
  }
];
