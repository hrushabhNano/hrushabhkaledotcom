# Execution Guide — Adapting manuaroradotin to hrushabkale.com

## File-by-file. No guessing.

Stack confirmed from repo:

- Next.js 16, App Router
- Tailwind CSS v4
- MDX via next-mdx-remote
- Turbopack

---

## STEP 1 — Delete these pages entirely

These routes don't exist on your site. Delete the folders:

```
app/tweets/          → DELETE entire folder
app/inspiration/     → DELETE entire folder
app/sponsor/         → DELETE entire folder
```

---

## STEP 2 — Update the Navbar

**File:** Find the navbar/header component (likely `components/Navbar.tsx` or inside `app/layout.tsx`)

**Find Manu's nav links:**

```tsx
// Something like this:
{ label: "Home",        href: "/" },
{ label: "Tweets",      href: "/tweets" },
{ label: "Inspiration", href: "/inspiration" },
{ label: "Blog",        href: "/blog" },
{ label: "Sponsor",     href: "/sponsor" },
```

**Replace with:**

```tsx
{ label: "Home",    href: "/" },
{ label: "Writing", href: "/blog" },
{ label: "Uses",    href: "/uses" },
```

**Also update** wherever the site name / logo text appears:

```
"Manu Arora"  →  "Hrushabh Kale"
"aka Paaji"   →  DELETE this entirely
```

---

## STEP 3 — Update homepage metadata

**File:** `app/page.tsx` or `app/layout.tsx` (wherever `export const metadata` is defined)

```ts
export const metadata = {
  title: "Hrushabh Kale",
  description:
    "Tech Lead & Solutions Architect at Nanostuffs Technologies, Pune. " +
    "Building AI-first systems for enterprise. Writing about full-stack " +
    "development and technical leadership in India.",
  openGraph: {
    title: "Hrushabh Kale",
    description:
      "Tech Lead & Solutions Architect at Nanostuffs Technologies, Pune.",
    url: "https://hrushabkale.com",
    siteName: "Hrushabh Kale",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hrushabh Kale",
    description:
      "Tech Lead & Solutions Architect at Nanostuffs Technologies, Pune.",
  },
};
```

---

## STEP 4 — Update the Hero / About section

**File:** `app/page.tsx` — the top section of the homepage

**Find:** Avatar image src → replace with your actual photo path

```tsx
// Find:
src = "https://assets.aceternity.com/avatars/manu.webp";
// Replace with:
src = "/images/avatar.jpg";
// (drop your photo at public/images/avatar.jpg)
```

**Find:** Name + tagline

```tsx
// Find:
"Manu Arora aka Paaji";
// Or however it's structured as JSX
// Replace with:
"Hrushabh Kale";
// Remove the "aka" part entirely
```

**Find:** The 3 intro paragraphs. Replace the entire prose section with:

```tsx
<p>
  I&apos;m a Full Stack Engineer and Tech Lead at{" "}
  <a href="https://nanostuffs.com" target="_blank" rel="noopener noreferrer">
    Nanostuffs Technologies
  </a>{" "}
  in Pune, where I&apos;ve spent the last four years building AI-first
  systems for enterprise clients. My day job involves WhatsApp automation
  platforms, LangGraph-powered AI assistants, React Native apps across
  multiple countries, and Heroku architectures that need to stay up when
  things get busy.
</p>

<p>
  Before Nanostuffs, I interned at Fountain9 &mdash; a YC W21-backed
  startup &mdash; working on Kronoscope, an ML-driven inventory and
  supply chain platform. Before that, I spent seven months as an ML
  research intern at the University of Limerick in Ireland, which ended
  with a paper published at SMARTGREENS-2022. I&apos;m from Aurangabad,
  did my engineering at Government College there, and landed in Pune in
  2021.
</p>

<p>
  I write about building with AI, making real architectural decisions
  under startup constraints, and what technical leadership actually looks
  like in practice. Not the polished version.{" "}
  <a href="/blog">The real one.</a>
</p>
```

**Find:** Social links row (LinkedIn, Twitter, GitHub etc.)
Replace all of Manu's social hrefs with:

```tsx
{ label: "LinkedIn", href: "https://linkedin.com/in/hrushabh-kale" },
{ label: "GitHub",   href: "https://github.com/[YOUR_GITHUB_HANDLE]" },
{ label: "Twitter",  href: "https://twitter.com/[YOUR_TWITTER_HANDLE]" },
{ label: "Email",    href: "mailto:hrushabhkale25@gmail.com" },
```

---

## STEP 5 — "Things I do" section → Your Projects

**File:** `app/page.tsx` — look for the "Things I do" section heading

This section is a list of items, each with: icon/logo, name, one-liner, and a link.

**Replace Manu's data with:**

```tsx
const thingsIDo = [
  {
    name: "nAuth.app",
    description:
      "In-house 2FA authenticator with TOTP-based authentication and modern encryption.",
    href: "https://nauth.app",
  },
  {
    name: "Career Mantrana AI",
    description:
      "AI-powered career guidance platform — personal side project built on LangGraph and Claude.",
    href: null, // no public link yet
  },
  {
    name: "nPharma",
    description:
      "Multi-country, multilingual React Native platform for pharmaceutical Medical Representatives.",
    href: null, // internal — no public link
  },
];
```

**Section heading:** Change `"Things I do"` → `"Things I build"`

**Note on items with `href: null`:**
Check how Manu renders items with links — if every item requires a link, either:
a) Wrap non-linked items in a `<div>` instead of `<a>` (small code change), or
b) Just link to the blog post that talks about the project when you write it

---

## STEP 6 — "Companies I've worked with" section → Your Experience

**File:** `app/page.tsx` — look for the "Companies I've worked with" section

This section shows: company name + one-line description. No dates, no bullets. That structure works for your experience too — keep it simple.

**Replace Manu's sponsors/clients data with:**

```tsx
const companies = [
  {
    name: "Nanostuffs Technologies",
    description:
      "Tech Lead & Solutions Architect · Jan 2023–Present · AI systems, Salesforce, React Native",
    href: "https://nanostuffs.com",
  },
  {
    name: "Fountain9 (YC W21)",
    description:
      "Software Engineer Intern · Jan–Jun 2022 · Kronoscope, ML-based supply chain SaaS",
    href: null,
  },
  {
    name: "University of Limerick",
    description:
      "ML Research Intern · Nov 2021–May 2022 · Published at SMARTGREENS-2022",
    href: null,
  },
  {
    name: "TEDxGEC",
    description:
      "Web Development Team Lead · Aug 2021 · Event website + booking platform",
    href: null,
  },
];
```

**Section heading:** Change `"Companies I've worked with"` → `"Experience"`

---

## STEP 7 — Delete "Work with me" section

**File:** `app/page.tsx`

Find the "Work with me" section — it contains the consultation + hire me links.

**Delete the entire block.** This is Phase 3 content (Feb 2027 in your roadmap). Don't add it now.

---

## STEP 8 — Writing section (no changes needed to structure)

The writing section at the bottom of the homepage pulls the 3 latest blog posts automatically. Once you add your MDX files in Step 11, this updates itself.

No code change needed here — just verify it points to `/blog` and not some hardcoded path.

---

## STEP 9 — Footer

**File:** Footer component (likely `components/Footer.tsx` or bottom of `app/layout.tsx`)

**Find:**

```
"Built by yours truly. Here's the code and video explaining it."
"Website heavily inspired by Akash Bhadange"
```

**Replace with:**

```tsx
<p>
  Hrushabh Kale &middot; Pune, India &middot; 2026
</p>
<p className="text-sm text-muted-foreground mt-1">
  Inspired by{" "}
  <a href="https://manuarora.in" target="_blank" rel="noopener noreferrer">
    Manu Arora
  </a>{" "}
  and{" "}
  <a href="https://designerdada.com" target="_blank" rel="noopener noreferrer">
    Akash Bhadange
  </a>.
  {" "}
  <a href="https://github.com/[YOUR_GITHUB]/hrushabkale" target="_blank" rel="noopener noreferrer">
    Source
  </a>.
</p>
```

---

## STEP 10 — Create the Uses page

**Create:** `app/uses/page.tsx`

```tsx
export const metadata = {
  title: "Uses",
  description: "The tools, stack, and setup I actually use day to day.",
};

export default function UsesPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="mb-2 text-2xl font-bold">Uses</h1>
      <p className="text-muted-foreground mb-12">
        What I use to build things. Updated when something changes.
      </p>

      <section className="mb-10">
        <h2 className="text-muted-foreground mb-4 text-sm font-semibold tracking-widest uppercase">
          Development
        </h2>
        <ul className="space-y-2 text-sm">
          <li>
            <span className="font-medium">Editor:</span> VS Code (primary),
            Cursor (AI-assisted)
          </li>
          <li>
            <span className="font-medium">Terminal:</span> Warp
          </li>
          <li>
            <span className="font-medium">API testing:</span> Postman
          </li>
          <li>
            <span className="font-medium">Database GUI:</span> TablePlus
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-muted-foreground mb-4 text-sm font-semibold tracking-widest uppercase">
          Stack I reach for
        </h2>
        <ul className="space-y-2 text-sm">
          <li>
            <span className="font-medium">Frontend:</span> Next.js (App Router),
            React
          </li>
          <li>
            <span className="font-medium">Mobile:</span> React Native (Expo)
          </li>
          <li>
            <span className="font-medium">Backend:</span> Node.js, Express
          </li>
          <li>
            <span className="font-medium">Database:</span> PostgreSQL (pgvector
            for AI projects)
          </li>
          <li>
            <span className="font-medium">Hosting:</span> Heroku (enterprise),
            Vercel (frontend)
          </li>
          <li>
            <span className="font-medium">Cloud:</span> GCP (databases, Cloud
            Run)
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-muted-foreground mb-4 text-sm font-semibold tracking-widest uppercase">
          AI tools — daily
        </h2>
        <ul className="space-y-2 text-sm">
          <li>
            <span className="font-medium">Claude (claude.ai):</span> Primary AI
            assistant. Code, writing, architecture decisions. Daily driver.
          </li>
          <li>
            <span className="font-medium">Claude Code:</span> CLI tool for
            AI-assisted coding directly in the codebase.
          </li>
          <li>
            <span className="font-medium">Cursor:</span> VS Code with AI built
            in. Good for mid-sized changes.
          </li>
          <li>
            <span className="font-medium">Anthropic APIs:</span> LangGraph
            workflows, RAG pipelines, WhatsApp automation.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-muted-foreground mb-4 text-sm font-semibold tracking-widest uppercase">
          Productivity
        </h2>
        <ul className="space-y-2 text-sm">
          <li>
            <span className="font-medium">Notes:</span> Notion (team), Apple
            Notes (quick capture)
          </li>
          <li>
            <span className="font-medium">Tasks:</span> Linear (engineering)
          </li>
          <li>
            <span className="font-medium">Design:</span> Figma (reading designs)
          </li>
          <li>
            <span className="font-medium">Hardware:</span> MacBook Pro
            (M-series), Android daily driver for RN testing
          </li>
        </ul>
      </section>
    </div>
  );
}
```

---

## STEP 11 — Add your blog posts

**Find where Manu stores his blog posts.** From the repo structure: `data/blog/`. The filenames from his live site are:

- `how-to-effectively-freelance.mdx`
- `developer-portfolio-website.mdx`
- `ace-the-javascript-interview.mdx`

**Delete all of Manu's blog posts** from `data/blog/`.

**Add your three posts** — copy-paste from the content doc:

**`data/blog/why-i-built-this-site.mdx`**

```mdx
---
title: "Why I Finally Built This Site (And What Took So Long)"
date: "2026-05-30"
excerpt: "I've been building things on the internet professionally for four years. It took me until now to have a corner of it that's mine."
tags: ["personal", "building-in-public"]
---

[full post content from content doc]
```

**`data/blog/ai-tooling-at-a-startup-2026.mdx`**

```mdx
---
title: "The AI Tooling Stack I Actually Use at a Startup in 2026"
date: "2026-06-09"
excerpt: "Not the one from the newsletter. The one from the Slack thread where someone asks why the demo broke."
tags: ["ai", "tools", "engineering"]
---

[full post content from content doc]
```

**`data/blog/react-native-multi-country.mdx`**

```mdx
---
title: "Lessons from Building a React Native App Across Multiple Countries"
date: "2026-06-23"
excerpt: "Same codebase, different countries, different languages, different date formats, different everything. Here's what actually breaks."
tags: ["react-native", "engineering", "mobile"]
---

[full post content from content doc]
```

**Important:** Check Manu's existing MDX files to confirm the exact frontmatter field names he uses (it might be `publishedAt` instead of `date`, or `summary` instead of `excerpt`). Match his format exactly or the blog listing will break.

---

## STEP 12 — Add the Lanyard (the only genuinely new component)

**Install dependencies first:**

```bash
npm install @react-three/fiber @react-three/drei @react-three/rapier three meshline
npm install -D @types/three
```

**Tailwind v4 note:** This repo uses Tailwind v4 which has a different config structure from v3. The Lanyard component itself doesn't use Tailwind classes internally (it's pure Canvas/WebGL), so there's no conflict. The wrapper `div` uses standard Tailwind height classes which work fine in v4.

**Create the file:** `components/Lanyard.tsx`

Copy the full Lanyard component code from the spec document (`hrushabhkale_portfolio_spec.md`, Section 6.3). The component is complete and ready to paste.

**In `app/page.tsx`**, import with dynamic (mandatory — SSR will break otherwise):

```tsx
import dynamic from "next/dynamic";

const Lanyard = dynamic(() => import("@/components/Lanyard"), {
  ssr: false,
  loading: () => <div className="h-[500px]" />,
});
```

**Placement:** Add it inside the Hero/About section, after your intro paragraphs. On desktop it should float to the right using a flex/grid layout:

```tsx
{
  /* In your hero section: */
}
<div className="flex flex-col gap-8 md:flex-row md:items-start">
  {/* Left: text content */}
  <div className="flex-1">
    {/* your name, intro paragraphs, social links */}
  </div>
  {/* Right: Lanyard */}
  <div className="w-full shrink-0 md:w-80">
    <Lanyard />
  </div>
</div>;
```

---

## STEP 13 — Update domain references

Do a global find-replace across the entire project:

```
Find:    manuarora.in
Replace: hrushabkale.com
```

Also find-replace any hardcoded "Manu Arora" strings that might be in metadata or alt text:

```
Find:    Manu Arora
Replace: Hrushabh Kale
```

---

## STEP 14 — Final checks before deploying

```
[ ] npm run dev — runs without errors
[ ] Homepage loads with your name, about text, correct sections
[ ] Tweets, Inspiration, Sponsor pages return 404 (routes deleted)
[ ] /blog shows your 3 posts
[ ] /blog/[slug] renders a post correctly with MDX prose styles
[ ] /uses page loads
[ ] Nav shows: Home · Writing · Uses (no Tweets/Inspiration/Sponsor)
[ ] Lanyard renders, is draggable, physics works
[ ] Dark mode toggle works (if the repo has one)
[ ] Social links point to your URLs, not Manu's
[ ] Avatar shows your photo (not Manu's)
[ ] npm run build — passes with zero errors
[ ] No console errors in the browser
```

---

## Things you DON'T need to touch

- The blog listing page (`app/blog/page.tsx`) — works as-is once you add your MDX files
- The individual blog post renderer (`app/blog/[slug]/page.tsx`) — works as-is
- Tailwind config — Manu's dark theme is already clean, no changes needed
- Font setup — Manu's typography works fine, no need to change
- The MDX rendering pipeline — next-mdx-remote setup is already done

---

## Estimated time

| Step                               | Time                                     |
| ---------------------------------- | ---------------------------------------- |
| Steps 1–9 (content + nav + delete) | 1–2 hours                                |
| Step 10 (Uses page)                | 20 min                                   |
| Step 11 (Blog posts)               | 30 min (copy-paste + verify frontmatter) |
| Step 12 (Lanyard)                  | 1–1.5 hours                              |
| Steps 13–14 (cleanup + checks)     | 30 min                                   |
| **Total**                          | **3.5–5 hours**                          |

Steps 1–11 and 13–14 require zero architectural knowledge — just find, replace, delete, add.
Step 12 (Lanyard) is the only part that needs focused coding attention.

---

_Guide version 1.0 · May 2026_
_Repo: https://github.com/manuarora700/manuaroradotin_
