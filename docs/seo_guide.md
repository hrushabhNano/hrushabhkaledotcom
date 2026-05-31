# SEO Implementation Plan — hrushabkale.com
## Feed this directly to Cursor or Claude Code.
## Every item is a concrete code change. Nothing vague.

---

## Why this matters first

Three search intents we're targeting:

1. **Name search** — "Hrushabh Kale" → your site should be result #1, not LinkedIn
2. **Skill/role search** — "Tech Lead Pune", "LangGraph developer India", "React Native developer Pune", "Salesforce Heroku architect India"
3. **Topic search** — "AI tooling startup India", "WhatsApp automation LangGraph", "React Native multi-country app" → your blog posts rank for these

---

## PART 1 — TECHNICAL SEO (Next.js App Router)

### 1.1 metadataBase — Do this first, everything depends on it

**File:** `app/layout.tsx`

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://hrushabkale.com'),
  title: {
    default: 'Hrushabh Kale',
    template: '%s — Hrushabh Kale',
  },
  description:
    'Tech Lead & Solutions Architect at Nanostuffs Technologies, Pune. ' +
    'Building AI-first systems for enterprise — LangGraph, WhatsApp automation, ' +
    'React Native. Writing about full-stack development and technical leadership in India.',
  keywords: [
    'Hrushabh Kale',
    'Tech Lead Pune',
    'Solutions Architect Pune',
    'Full Stack Developer Pune',
    'LangGraph developer',
    'React Native developer India',
    'WhatsApp automation developer',
    'Salesforce Heroku architect',
    'AI engineer Pune',
    'Nanostuffs Technologies',
  ],
  authors: [{ name: 'Hrushabh Kale', url: 'https://hrushabkale.com' }],
  creator: 'Hrushabh Kale',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://hrushabkale.com',
    siteName: 'Hrushabh Kale',
    title: 'Hrushabh Kale — Tech Lead & Solutions Architect',
    description:
      'Building AI-first systems for enterprise at Nanostuffs Technologies, Pune. ' +
      'LangGraph, WhatsApp automation, React Native.',
    images: [
      {
        url: '/og-image.png',   // create this: 1200x630px, dark background, name + role
        width: 1200,
        height: 630,
        alt: 'Hrushabh Kale — Tech Lead & Solutions Architect, Pune',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hrushabh Kale — Tech Lead & Solutions Architect',
    description:
      'Building AI-first systems for enterprise at Nanostuffs Technologies, Pune.',
    images: ['/og-image.png'],
    creator: '@[YOUR_TWITTER_HANDLE]',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://hrushabkale.com',
  },
  verification: {
    google: '[PASTE_YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE_HERE]',
  },
}
```

---

### 1.2 Sitemap — Auto-generated, includes blog posts

**Create file:** `app/sitemap.ts`

```ts
import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/mdx'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()

  const blogUrls = posts.map((post) => ({
    url: `https://hrushabkale.com/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: 'https://hrushabkale.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://hrushabkale.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://hrushabkale.com/uses',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...blogUrls,
  ]
}
```

---

### 1.3 Robots.txt

**Create file:** `app/robots.ts`

```ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [],
    },
    sitemap: 'https://hrushabkale.com/sitemap.xml',
  }
}
```

---

### 1.4 Per-page metadata — Blog posts

**File:** `app/blog/[slug]/page.tsx`

Add `generateMetadata` so every blog post has its own title, description, and OG card:

```tsx
import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { frontmatter } = await getPostBySlug(params.slug)

  return {
    title: frontmatter.title,
    description: frontmatter.summary,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.summary,
      type: 'article',
      publishedTime: frontmatter.publishedAt,
      authors: ['Hrushabh Kale'],
      url: `https://hrushabkale.com/blog/${params.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.summary,
    },
    alternates: {
      canonical: `https://hrushabkale.com/blog/${params.slug}`,
    },
  }
}

// Also add generateStaticParams for SSG:
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}
```

---

### 1.5 Canonical tags on all pages

Every page needs a canonical. Add to each page's metadata:

```tsx
// app/blog/page.tsx
export const metadata: Metadata = {
  title: 'Writing',
  description: 'Thoughts on AI, full-stack engineering, and technical leadership in Indian startups.',
  alternates: { canonical: 'https://hrushabkale.com/blog' },
}

// app/uses/page.tsx
export const metadata: Metadata = {
  title: 'Uses',
  description: 'The tools, stack, and setup I actually use day to day.',
  alternates: { canonical: 'https://hrushabkale.com/uses' },
}
```

---

## PART 2 — STRUCTURED DATA (JSON-LD)

This is the highest-ROI SEO task. A well-formed Person schema with sameAs links is what triggers a Google Knowledge Panel for your name search, and what AI search engines (Perplexity, ChatGPT Search) use to surface you.

### 2.1 Person schema — Homepage

**Create file:** `components/seo/PersonSchema.tsx`

```tsx
export default function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://hrushabkale.com/#person',
    name: 'Hrushabh Kale',
    url: 'https://hrushabkale.com',
    image: 'https://hrushabkale.com/images/avatar.jpg',
    jobTitle: 'Tech Lead & Solutions Architect',
    description:
      'Full Stack Engineer and Tech Lead at Nanostuffs Technologies in Pune, ' +
      'building AI-first enterprise systems including LangGraph AI assistants, ' +
      'WhatsApp automation platforms, and multi-country React Native applications.',
    worksFor: {
      '@type': 'Organization',
      name: 'Nanostuffs Technologies',
      url: 'https://nanostuffs.com',
    },
    alumniOf: [
      {
        '@type': 'Organization',
        name: 'Government College of Engineering, Aurangabad',
      },
      {
        '@type': 'Organization',
        name: 'Fountain9',
        url: 'https://fountain9.com',
      },
    ],
    knowsAbout: [
      'React',
      'React Native',
      'Node.js',
      'Next.js',
      'LangGraph',
      'LLM tooling',
      'Salesforce',
      'Heroku',
      'WhatsApp Business API',
      'PostgreSQL',
      'GCP',
      'Snowflake',
      'Full Stack Development',
      'Solutions Architecture',
      'Technical Leadership',
      'AI Engineering',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    email: 'hrushabhkale25@gmail.com',
    sameAs: [
      'https://linkedin.com/in/hrushabh-kale',
      'https://twitter.com/[YOUR_TWITTER_HANDLE]',
      'https://github.com/[YOUR_GITHUB_HANDLE]',
      'https://hrushabkale.com',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

**Add to:** `app/page.tsx` — inside the page component, not layout:
```tsx
import PersonSchema from '@/components/seo/PersonSchema'

export default function HomePage() {
  return (
    <>
      <PersonSchema />
      {/* rest of homepage */}
    </>
  )
}
```

---

### 2.2 BlogPosting schema — Each blog post

**File:** `app/blog/[slug]/page.tsx` — add inside the page component:

```tsx
const blogPostSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: frontmatter.title,
  description: frontmatter.summary,
  datePublished: frontmatter.publishedAt,
  dateModified: frontmatter.publishedAt,
  url: `https://hrushabkale.com/blog/${params.slug}`,
  author: {
    '@type': 'Person',
    '@id': 'https://hrushabkale.com/#person',
    name: 'Hrushabh Kale',
    url: 'https://hrushabkale.com',
  },
  publisher: {
    '@type': 'Person',
    name: 'Hrushabh Kale',
    url: 'https://hrushabkale.com',
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://hrushabkale.com/blog/${params.slug}`,
  },
}

// In JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
/>
```

---

### 2.3 WebSite schema — Enables sitelinks searchbox

**Create file:** `components/seo/WebsiteSchema.tsx`

```tsx
export default function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://hrushabkale.com/#website',
    name: 'Hrushabh Kale',
    url: 'https://hrushabkale.com',
    description:
      'Tech Lead & Solutions Architect at Nanostuffs Technologies, Pune. ' +
      'Writing about AI-first development and technical leadership in India.',
    author: {
      '@id': 'https://hrushabkale.com/#person',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

**Add to:** `app/layout.tsx` (inside the `<body>`, before `{children}`)

---

### 2.4 BreadcrumbList schema — Blog posts

```tsx
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://hrushabkale.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Writing',
      item: 'https://hrushabkale.com/blog',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: frontmatter.title,
      item: `https://hrushabkale.com/blog/${params.slug}`,
    },
  ],
}
```

---

## PART 3 — ON-PAGE SEO

### 3.1 Heading hierarchy — Critical

Every page must follow this exactly. Google uses H1 for the primary keyword signal.

**Homepage:**
```html
<h1>Hrushabh Kale</h1>                          <!-- name, once, top of page -->
<h2>Experience</h2>
<h2>Projects</h2>
<h2>Writing</h2>
```

**Blog listing:**
```html
<h1>Writing</h1>
<!-- each post is a link, not a heading -->
```

**Blog post:**
```html
<h1>{post.title}</h1>                            <!-- from frontmatter -->
<!-- H2 for sections within the post -->
```

**Important:** Never use H1 more than once per page. Never skip levels (H1 → H3).

---

### 3.2 Image alt text — Every image

```tsx
// Avatar:
<Image
  src="/images/avatar.jpg"
  alt="Hrushabh Kale — Tech Lead at Nanostuffs Technologies, Pune"
  width={48}
  height={48}
/>

// OG image (static file):
// Filename: og-image.png — 1200x630px
// Content: dark background, "Hrushabh Kale" large, "Tech Lead & Solutions Architect" below,
//          "hrushabkale.com" bottom, Nanostuffs logo/mention
```

---

### 3.3 Internal linking — Blog posts must link to homepage and each other

In each blog post, naturally link back to `/` and to at least one other blog post:

**Example in `ai-tooling-at-a-startup-2026.mdx`:**
```mdx
// Near the top or in the intro:
I write about this kind of thing regularly [on this site](/).

// At the end:
If you're building multi-country mobile apps,
[here's what I learned about that](/blog/react-native-multi-country).
```

This creates a linked cluster of content — Google understands you as an authority on these topics.

---

### 3.4 URL structure — Already good with Manu's setup

```
hrushabkale.com/                    ✓ Homepage
hrushabkale.com/blog                ✓ Blog index
hrushabkale.com/blog/[slug]         ✓ Individual posts — keep slugs short, keyword-rich
hrushabkale.com/uses                ✓ Uses page
```

**Blog slug naming rule:** Use keywords in the slug, not dates.
```
✓  /blog/ai-tooling-startup-india-2026
✓  /blog/react-native-multi-country-app
✗  /blog/2026-06-09-my-post
```

---

## PART 4 — PERFORMANCE SEO (Core Web Vitals)

Google uses Core Web Vitals as a ranking factor. Next.js App Router already handles most of this, but these are the manual checks.

### 4.1 next/image on every image — no `<img>` tags

```tsx
// Always:
import Image from 'next/image'
<Image src="..." alt="..." width={X} height={X} />

// For the avatar (above the fold):
<Image src="/images/avatar.jpg" alt="..." width={48} height={48} priority />
// priority prop tells Next.js to preload this image — important for LCP
```

### 4.2 Fonts — Already handled if using Geist from the npm package

```tsx
// app/layout.tsx — if not already done:
import { GeistSans, GeistMono } from 'geist/font'
// These load via next/font, which inlines critical CSS and avoids FOUT
// Do NOT import fonts from Google Fonts directly — causes layout shift
```

### 4.3 Lanyard — Lazy loaded (already in spec)

The Lanyard `dynamic(() => import(), { ssr: false })` pattern is correct for Core Web Vitals.
The `loading: () => <div className="h-[500px]" />` placeholder prevents layout shift (CLS).

### 4.4 No render-blocking scripts

Never add `<script>` tags in `<head>` without `async` or `defer`. Use `next/script` for any third-party scripts:

```tsx
import Script from 'next/script'

// For analytics (if added later):
<Script src="..." strategy="afterInteractive" />
// strategy="afterInteractive" = loads after page is interactive, doesn't block rendering
```

---

## PART 5 — CONTENT SEO (Blog Strategy)

The blog is the long-term SEO engine. Each post should target a specific search query.

### 5.1 Keyword targets for your next 9 posts

Write one post per month. These are real queries with low competition where you can rank on page 1:

| Post title | Target keyword | Why it'll rank |
|---|---|---|
| "Building a WhatsApp chatbot with LangGraph and the WhatsApp Business API" | langgraph whatsapp chatbot | Near-zero competition, you have direct experience |
| "Heroku for Salesforce developers: how we use it at a BSP startup" | heroku salesforce integration | Specific niche, long-tail |
| "React Native offline-first with WatermelonDB: what actually works" | react native offline first watermelondb | Dev community searches this constantly |
| "Running pgvector in production: our experience replacing Pinecone" | pgvector production vs pinecone | High search intent, your real experience |
| "How we set up MCP (Model Context Protocol) at a startup" | model context protocol startup implementation | New topic, almost no content yet |
| "SnowPro Core exam: what I actually studied" | snowpro core certification study | High search volume from certification seekers |
| "Tech lead at 25: what changed when I stopped writing code all day" | tech lead responsibilities developer | Career content, evergreen |
| "Deploying Next.js on Heroku in 2026: the right way" | nextjs heroku deployment 2026 | Evergreen technical, you know it well |
| "React Native for India: handling multi-language, date formats, and slow networks" | react native india localization | Regional dev audience, underserved |

### 5.2 Post structure for SEO

Every post needs:

```mdx
---
title: "Full keyword-rich title — keep under 60 chars"
publishedAt: "YYYY-MM-DD"
summary: "One sentence with the main keyword. Under 155 chars — this is the meta description."
---

## Introduction (use H2, not H1 — H1 is the title)

First paragraph: answer the main question directly.
Google uses the first 100 words for featured snippets.

## [H2 section with keyword phrase]
## [H2 section]
## [H2 section]

## Conclusion / What I'd do differently
```

### 5.3 Add reading time to blog posts

Already in the spec (`reading-time` package). Shows in search snippets and signals content depth.

```tsx
// In blog listing and post header:
import readingTime from 'reading-time'
const stats = readingTime(post.content)
// Display: "5 min read"
```

---

## PART 6 — OFF-PAGE SEO (Links back to hrushabkale.com)

On-page SEO alone won't rank you. Google needs external signals that your site is real and credible.

### 6.1 Do these immediately after launch (same day)

**LinkedIn profile:**
- Update website field to `hrushabkale.com`
- Add to the Contact Info section
- Mention the site in your About section: "I write at hrushabkale.com"

**GitHub profile README:**
- Add `hrushabkale.com` prominently
- Link to your site from every repo's description field

**Twitter/X bio:**
- Add `hrushabkale.com` as the website link

**Every social profile you have:**
Peerlist, Dev.to, Hashnode, any forum profile — add the URL.

The sameAs array in your JSON-LD schema connects all of these. Together they tell Google: this domain = this real person.

### 6.2 Do within Month 1

**Submit to Google Search Console:**
1. Go to search.google.com/search-console
2. Add property: `hrushabkale.com`
3. Verify via HTML tag (paste into `metadata.verification.google` in layout.tsx)
4. Submit sitemap URL: `https://hrushabkale.com/sitemap.xml`
5. Request indexing for the homepage

This tells Google the site exists. Without this, you can wait 2-4 weeks to get indexed.

**Submit to Bing Webmaster Tools:**
Same process at bing.com/webmasters — reaches Bing + DuckDuckGo + Copilot search.

### 6.3 Do within Month 2–3

**Dev.to and Hashnode:**
Republish your blog posts there with `canonical_url` pointing to `hrushabkale.com/blog/[slug]`.
This gets you backlinks from high-authority domains without content duplication penalties.

```
Dev.to canonical field: https://hrushabkale.com/blog/ai-tooling-startup-india-2026
```

**LinkedIn articles:**
Take each blog post, write a shorter LinkedIn version, and add at the end:
"Full version on my site: hrushabkale.com/blog/[slug]"
Every person who clicks that is a signal to Google that the URL matters.

---

## PART 7 — OG IMAGE (Static File)

Create a static OG image at `public/og-image.png` — 1200×630px.

**Design spec:**
```
Background: #0c0c0e (matches site dark theme)
Large text (top-left): "Hrushabh Kale"  — white, ~64px
Sub text: "Tech Lead & Solutions Architect"  — muted/orange, ~28px
Bottom text: "hrushabkale.com"  — orange accent, ~20px, bottom-left
Right side: simple monogram "HK" or abstract node graph (reuse LinkedIn banner style)
Border: 2px top line in #f97316 (orange)
```

You can generate this using the LinkedIn banner HTML file you already have — take a screenshot at 1200×630.

---

## PART 8 — IMPLEMENTATION CHECKLIST

Feed this to your AI agent as the build order:

```
PHASE 1 — Technical foundation (do before launch)
[ ] 1.1  metadataBase + full metadata in app/layout.tsx
[ ] 1.2  app/sitemap.ts
[ ] 1.3  app/robots.ts
[ ] 1.4  generateMetadata in app/blog/[slug]/page.tsx
[ ] 1.5  Canonical tags on blog/page.tsx and uses/page.tsx
[ ] 2.1  PersonSchema component → added to app/page.tsx
[ ] 2.2  BlogPosting schema in blog post page
[ ] 2.3  WebsiteSchema component → added to app/layout.tsx
[ ] 2.4  BreadcrumbList in blog post page
[ ] 3.1  Heading hierarchy audit — H1 once per page, correct nesting
[ ] 3.2  Alt text on avatar image
[ ] 4.1  next/image with priority on above-fold avatar
[ ] 7.1  Create og-image.png (1200×630) in public/

PHASE 2 — Off-page (do day of launch)
[ ] 6.1  Update LinkedIn website field → hrushabkale.com
[ ] 6.1  Update GitHub README → add hrushabkale.com
[ ] 6.1  Update Twitter/X bio → add hrushabkale.com
[ ] 6.2  Submit to Google Search Console + submit sitemap
[ ] 6.2  Submit to Bing Webmaster Tools

PHASE 3 — Content engine (ongoing, Month 1+)
[ ] 3.3  Add internal links in all 3 existing blog posts
[ ] 3.4  Verify slug naming is keyword-based not date-based
[ ] 5.2  Post structure template saved somewhere accessible
[ ] 6.3  Republish posts on Dev.to + Hashnode with canonical
```

---

## PART 9 — VALIDATION TOOLS (Run after launch)

```
Google Rich Results Test:
https://search.google.com/test/rich-results
→ Test hrushabkale.com — should show Person + WebSite schema detected

Google Search Console Coverage report:
→ Confirm all pages indexed, no crawl errors

PageSpeed Insights:
https://pagespeed.web.dev
→ Target: LCP < 2.5s, CLS < 0.1, INP < 200ms
→ Mobile score matters more than desktop

Schema.org Validator:
https://validator.schema.org
→ Paste your homepage URL — confirm no errors on Person schema
```

---

## Timeline

| When | What |
|---|---|
| Day of launch | Phase 1 + Phase 2 — technical SEO + Search Console submission |
| Week 1–2 | Google indexes the site (check Search Console) |
| Month 1 | Your name starts ranking #1 for "Hrushabh Kale" |
| Month 2–3 | Republish on Dev.to + Hashnode, first blog posts start appearing in search |
| Month 4–6 | Long-tail keywords (LangGraph whatsapp, React Native multi-country) start ranking |
| Month 6–12 | Compounding — each new blog post adds more surface area for discovery |

---

*SEO plan version 1.0 · May 2026*
*Based on: Next.js 16 App Router SEO best practices, schema.org Person type,*
*Google Search Console guidance, and Core Web Vitals documentation.*