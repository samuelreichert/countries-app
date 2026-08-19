# Countries app

A clean React + TypeScript app for browsing REST Countries data.

## Run it

```sh
bun install
cp .env.example .env.local
bun run dev
```

Set `VITE_REST_COUNTRIES_API_KEY` in `.env.local` to the browser-scoped API key from [REST Countries](https://restcountries.com/sign-up), then start the app. The REST Countries v5 API replaced the unauthenticated legacy endpoint in 2026.

For a production build, run `bun run build`.

The app supports country search, regional filtering, light/dark mode, and a country detail view with border countries. Component styles live alongside their components; global CSS is limited to resets and app-level layout.
