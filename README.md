# [theshelf.blog](https://theshelf.blog)

In early 2025, I purchased a shelf: a simple, modular, white one from Prepac. Years of cognitive dissonance about digital media had taken its toll, and I relented - I wanted a physical artifact of the art that moved me and informed who I am today. Moreover, I wanted to build an impulse to curate and prune things that did not resonate, after I spent my 20s amassing terabytes of unexperienced media.

That brings us to this site: an art criticism blog revolving around the titular Shelf, which has real curation pressure due to its finite space. Here, I document my time with things that come into my home, and reveal the thoughts that go into the decisions to **shelf**, **pass on**, or **defer** a decision on a work. I am still building a written voice, so style and structure may vary - furthermore, snippets and thoughts on older outlets such as RateYourMusic and Backloggd will slowly be migrated in to give a complete historical perspective. These thoughts will focus on the experiential side and aim to unpack the response the work provoked in me.

For those following along, a digital shelf counterpart can be perused to give an impression of what the real thing looks like at the moment. And, because I can't help myself, the Stats page tracks score distributions, approval rates by media type, and highest-rated creators.


## Stack

- **[Astro](https://astro.build)** (v7) - site framework, uses the `@astrojs/cloudflare` adapter for SSR on Cloudflare Pages, with MDX support via `@astrojs/mdx`
- **[Cloudflare Pages](https://pages.cloudflare.com)** - hosting and serverless runtime, configured via `wrangler.jsonc`
- **[Cloudflare D1](https://developers.cloudflare.com/d1/)** - SQLite database for media items, reviews, and events, accessed through [Drizzle ORM](https://orm.drizzle.team) (`drizzle-orm` + `drizzle-kit` for migrations).
- **[Tailwind CSS](https://tailwindcss.com)** (v4) - styling, via `@tailwindcss/vite` and the `@tailwindcss/typography` plugin for article prose

chopping block:
- **[js-yaml](https://github.com/nodeca/js-yaml)** - used to load media metadata from `src/data/media.yaml`

## Data Model

The project is undergoing a migration from Astro's content collection schemas for Markdown to a more traditional CMS in a Cloudflare D1 database. All structured data is migrating into three tables defined in `src/db/schema.ts`:

| Table         | Holds                                                                        |
| ------------- | ---------------------------------------------------------------------------- |
| `media_items` | Every piece of media (title, type, cover, creatives, genre)                  |
| `reviews`     | Full review text + metadata, FK'd to `media_items`                           |
| `events`      | Logged interactions (listened, watched, read, played), FK'd to `media_items` |

The artifacts of the previous system are still around until migration is finished:

- **Media metadata** lives in `src/data/media.yaml`, loaded by
  `src/lib/mediaData.ts` at build time. This is still the active source for
  media item data and maps to the `media_items` D1 table.
- **Reviews** are MDX files in `src/content/reviews/` with frontmatter of metadata and a `media[]` array linking to media
  items. This maps to the `reviews` table, of course
- **Events** are Markdown files in `src/content/events/`
  with frontmatter for mediaId, date, source, score, status. Definitely the worst current implementation. Maps to the
  `events` table.

## Structure
```
src/
├── content.config.ts          # defines `reviews` and `events` collections (Zod schemas)
├── content/
│   ├── reviews/               # one .mdx per review
│   │   └── _template.mdx      # scaffolding template for new reviews
│   ├── events/                # one .md per media event (listen, play, watch, etc.)
│   └── *.mdx                  # standalone MDX content (e.g., &quot;The Most Important Barrier is Will&quot;)
├── data/
│   ├── media.yaml             # media item metadata (titles, covers, creatives, genre)
│   ├── about.md               # about page content
│   └── notes.md               # working notes (see cleanup note below)
├── db/
│   └── schema.ts              # Drizzle ORM schema for D1 (media_items, reviews, events)
├── lib/
│   ├── types.ts               # shared TypeScript types
│   ├── mediaData.ts           # loads/normalizes media data
│   ├── mediaSpecs.ts          # media type specifications
│   ├── expandMediaItems.ts    # expands media references into full objects
│   ├── cardElements.ts        # shared UI helpers for cards
│   ├── eventLabel.ts          # formats event labels
│   └── validate.ts            # validation utilities
├── components/
│   ├── Navigation.astro
│   ├── Footer.astro
│   ├── ArticleHeader.astro
│   ├── MediaCard.astro        # card for a media item
│   ├── MediaPreviewGrid.astro
│   ├── MediaResult.astro      # full result display for a media item
│   ├── MediaResultSummary.astro
│   ├── MediaIntro.astro
│   ├── MediaVerdict.astro     # renders the shelved/deferred/passed verdict
│   ├── ReviewCard.astro       # card for a review
│   └── SpineDisplay.astro     # visual &quot;spine&quot; for shelf view
├── layouts/
│   └── BaseLayout.astro       # shared HTML shell
├── pages/
│   ├── index.astro            # home
│   ├── reviews.astro          # review listing
│   ├── reviews/[slug].astro   # individual review
│   ├── media.astro            # media listing
│   ├── media/[id].astro       # individual media item
│   ├── shelf.astro            # items that made the cut (the physical shelf)
│   ├── stats.astro            # score distributions, approval rates, top creators
│   ├── about.astro
│   ├── admin/
│   │   ├── index.astro        # admin entry
│   │   └── edit-review/[id].astro  # review editor (SSR, queries D1)
│   └── rss.xml.ts             # RSS feed endpoint
├── styles/
│   └── global.css             # Tailwind imports + custom styles
└── content.config.ts

Config at root:
├── astro.config.mjs           # Astro + Cloudflare adapter + Tailwind + MDX
├── wrangler.jsonc             # Cloudflare Pages + D1 binding config
├── tsconfig.json
└── package.json
```

