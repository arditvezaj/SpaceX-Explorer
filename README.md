# SpaceX Explorer

A production-quality SpaceX mission browser built with Next.js 16 App Router, React 19, TypeScript, TanStack React Query v5, and Tailwind CSS v4.

---

## Getting started

### Environment setup

Create a `.env` file in the project root with the following content:

```env
NEXT_PUBLIC_SPACEX_API_URL="https://api.spacexdata.com/v4"
```

### Install and run

```bash
pnpm install
pnpm dev       # http://localhost:3000
pnpm build     # production build + ISR pre-render
pnpm lint
```

---

## Architecture

### App Router

All pages use the Next.js 16 App Router. The launch list (`/`) is a thin Server Component shell that renders a `"use client"` page component. The detail page (`/launches/[id]`) is a full Server Component that fetches launch + rocket + launchpad in parallel on the server and passes data down to a client component for interactivity (favorites, image gallery).

### Data fetching

**List page** — `useInfiniteQuery` (`useLaunches`) posts to `POST /launches/query` with MongoDB-style filters. Pages are 20 items. The query key includes the full filter object so changing any filter (search, status, sort) triggers a fresh fetch with automatic cache de-duplication across identical queries.

**Detail page** — ISR (`revalidate: 3600`). Top 20 recent launches are pre-rendered at build time via `generateStaticParams`. All other detail pages are rendered on first request and cached for one hour. `useLaunch` is called client-side with `initialData` from the server so background revalidation works without a loading flash.

**Favorites page** — `useQueries` fetches all favorited launches in parallel. Launches already visited via the detail page come from the React Query cache instantly.

### React Query + ISR tradeoffs

ISR guarantees fast cold loads and SEO for detail pages at the cost of staleness up to 1 hour. React Query's `staleTime` on the client bridges the gap — data is considered fresh for 5 minutes after a visit, then revalidated in the background. The list page skips ISR entirely because filters make caching impractical; instead, `staleTime: 0` keeps the list always fresh.

### Pagination strategy

Infinite scroll via `IntersectionObserver` on a sentinel element at the bottom of the virtualized list. An "isIntersecting" event triggers `fetchNextPage` when the user scrolls near the end. A "Load more" button is also rendered as the last row for explicit control. `isFetchingNextPage` shows a skeleton row while the next page loads.

### Virtualization

`react-window` v2 `List` with a fixed row height of 100 px. Only the visible rows plus an `overscanCount` of 5 are in the DOM at any time, keeping the list fast even with hundreds of launches loaded. `rowProps` pattern avoids creating a new closure per render cycle.

### Favorites persistence

Favorites are stored in `localStorage` under `spacex-favorites`. State is managed by a singleton `FavoritesStore` class and exposed via `useSyncExternalStore`. The store returns a stable empty array reference for the server snapshot to avoid hydration mismatches, then hydrates from `localStorage` on first client subscription and notifies all subscribers via a queued micro-task so React re-renders with real data without an SSR mismatch.

### Performance

- **React Compiler** — enabled in `next.config.ts`. Handles auto-memoization; no manual `useMemo` / `useCallback` needed.
- **`next/image`** — all images go through the Next.js image optimizer (lazy load, correct `sizes`, WebP conversion).
- **List virtualization** — only rendered rows are in the DOM.
- **Debounced search** — 400 ms debounce on the search input prevents per-keystroke API calls.

---

## Accessibility

- Semantic landmark elements (`<header role="banner">`, `<main id="main-content">`, `<nav aria-label>`, `<ul role="list">`)
- `aria-current="page"` on the active nav link
- `aria-live="polite"` region on the launches page announces load state changes to screen readers
- `aria-label` + `aria-pressed` on the favorite toggle button
- Keyboard-navigable image gallery (arrow keys cycle images, `role="region"` + `aria-label`)
- All interactive elements have visible `focus-visible` outlines (2 px `space-accent` ring)
- Color is never the sole indicator of status — badges include a text label

---

## Known TODOs

- Date range filter UI (the filter state supports `dateFrom`/`dateTo` but the picker is not yet wired)
- Rocket / launchpad dedicated pages
- Offline support (service worker)
