# AGENTS.md — `@caBRAPI/theme-light-shop`

Official **Theme Light Shop** template by caBRAPI, built with **Vite + React + TypeScript** and bundled into a single `build/index.html` file via `vite-plugin-singlefile`.

## Project Structure

- `index.html`: Entry point, SEO/Open Graph meta tags, fonts (`DM Sans`, `DM Serif Display`), Font Awesome 6.5.0, Tailwind v4, and `<meta name="loja-id" content="{{store_id}}" />`.
- `vite.config.mjs`: Configures `react()` + `viteSingleFile()` outputting to `build/`.
- `src/lib/sdk.ts`: Public `@cabrapi/sdk` client (`createStoreSdk()`) and store ID reader (`getStoreId()`).
- `src/components/layout/`: `Header.tsx`, `Footer.tsx`.
- `src/components/sections/`: `Hero.tsx`, `Features.tsx`, `Stats.tsx`, `SupportCta.tsx`, `Faq.tsx`.
- `src/components/shop/`: `ProductCard.tsx`, `CartDrawer.tsx` (3-step flow: Cart → Customer Details → Payment Method), `PaymentModal.tsx`.
- `src/App.tsx`: Store composition, `localStorage` cart persistence (`cabrapi_theme_light_cart`), product loading via `@cabrapi/sdk`, and fee fetching via `GET /v1/stores/:storeId/fees`.

## Commands

```bash
npm run dev          # Vite development server
npx tsc --noEmit     # TypeScript typecheck
npm run build        # Generates single-file build/index.html
```

## Guidelines

1. **Single-file output**: `npm run build` must output only `build/index.html`. Do not place assets in `public/` if they need to be inlined into the HTML (use `src/assets/` with `import` or external URLs).
2. **Store ID**: Never remove `<meta name="loja-id" content="{{store_id}}" />` from `index.html`.
3. **Verification**: Always run `npx tsc --noEmit` and `npm run build` after making changes.
