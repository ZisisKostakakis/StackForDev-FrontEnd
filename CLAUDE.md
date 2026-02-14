# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (Vite)
npm run build        # Production build
npm run preview      # Preview production build
npm run check        # Svelte type checking
npm run check:watch  # Watch mode type checking
```

## Tech Stack

- **SvelteKit 2** with **Svelte 5** (uses runes: `$props()`, `$state()`, `@render`)
- **TypeScript** (strict mode)
- **Carbon Components Svelte** (IBM design system) for UI components and icons
- **Vite** build tool; `@sveltejs/adapter-auto` for deployment

## Architecture

**Routing:** File-based SvelteKit routes under `src/routes/`. Current routes: `/`, `/about`, `/customise`. Each route uses `+page.svelte` + optional `+page.ts` for config.

**Layout:** `src/routes/+layout.svelte` wraps all pages with the shared `Header` component. Main content is flexbox-centered at max-width `64rem`.

**Static generation:** Pages export `prerender = true` and `csr = false|true` from `+page.ts` to control build behavior.

**Styling:** Scoped CSS per `.svelte` file + global styles in `src/app.css` with CSS custom properties. Breakpoint at 480px.

**Active route detection:** `Header.svelte` uses `$page.url.pathname` from `$app/stores` to highlight the current nav link.

**Assets:** Images in `src/lib/images/`, static files in `static/`.
