# [theshelf.blog](https://theshelf.blog)

An art criticism blog revolving around The Shelf: a real, physical shelf with finite space and therefore genuine curation pressure. This site is its digital counterpart: a living catalog of what's on it, what almost made it, and the writing behind each decision.

Games, albums, books, and films go through the same verdict system the shelf enforces in real life: **shelved**, **deferred**, or **passed**. The shelf page stays in sync with what's physically there. Reviews focus on the experiential side and aim to unpack the response the work provoked in me.

And, because I can't help myself, the Stats page tracks score distributions, approval rates by media type, and highest-rated creators.

## Stack

- **[Astro](https://astro.build)** — static site with MDX for reviews
- **[Tailwind CSS](https://tailwindcss.com)** — v4 with the typography plugin
- **[js-yaml](https://github.com/nodeca/js-yaml)** — powers the media data layer

## Structure

Reviews are MDX files in `src/content/reviews/`. Each review references one or more media items by ID — the item metadata (title, cover art, creatives, genre, etc.) lives separately in `src/lib/mediaData.ts` and gets expanded at build time.

```
src/
├── content/
│   └── reviews/        # one .mdx per review
├── lib/
│   ├── mediaData.ts    # media item registry
│   ├── expandMediaItems.ts
│   └── cardElements.ts # shared UI helpers
├── components/         # MediaCard, ReviewCard, MediaResult, etc.
└── pages/
    ├── index.astro
    ├── reviews.astro
    ├── shelf.astro     # items that made the cut
    ├── media.astro
    ├── stats.astro
    └── about.astro
```

## Dev

```bash
npm run dev      # localhost:4321
npm run build
npm run preview
```

Reviews use a verdict system: **shelved**, **deferred**, or **passed**. The stats page tracks score distributions, approval rates by media type, and highest-rated creators.
