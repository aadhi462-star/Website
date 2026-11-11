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
    id: "alumnizone",
    title: "AlumniZone",
    category: "Product",
    featured: true,
    platforms: "Desktop & mobile", // platforms: checked at phone width (390px) on 10 Nov 2026, and confirmed by you
    role: "Designed & built",
    status: "Live demo", // runs on fictional data
    oneLiner: "An all-in-one alumni community, built as a demo with fictional data.",
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
    id: "warranty-vault-pro",
    title: "Warranty Vault Pro",
    category: "Tool",
    draft: true, // hidden until the description below is confirmed
    platforms: "Desktop & mobile", // platforms: confirmed by you (the app needs a Google sign-in, so not checked here)
    role: "Designed & built",
    // Verified: a tool you built (original site, "Tools I Built"), published as a Google AI Studio app.
    // TODO: describe what it does in one or two sentences, plus problem / contribution if you like.
    summary: "A tool I built and published as a Google AI Studio app.",
    tags: ["Google AI Studio"],
    links: [{ label: "Open app", url: "https://ai.studio/apps/drive/1GHWw8ckcAHaHVOTmQuCD9ZB0Ew_MKRO3?fullscreenApplet=true" }]
  },
  {
    id: "jas-visual-scraper",
    title: "Jas Visual Scraper",
    category: "Extension",
    draft: true, // hidden until the description and publication status are confirmed
    role: "Designed & built",
    // Verified: a Chrome extension you built (original site, "Tools I Built").
    // TODO: describe what it does, and add a store / GitHub link when it's public.
    summary: "A Chrome extension I built for collecting information from web pages.",
    tags: ["Chrome extension"]
  }
];
