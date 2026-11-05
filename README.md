# Sherindiva — iMessage Portfolio

A responsive portfolio built with Next.js App Router, React, TypeScript, Three.js, and Lucide icons. Content and images were adapted from the supplied Sherindiva portfolio PDF.

## Run locally

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Validate and build

```sh
npm test
npm run check
npm run build
```

The production website is exported to `out/`. Deploy that directory to a static host. This project does not need a backend or environment variables.

## Edit

- `lib/content.ts`: profile, projects, experiences, and curated chat replies.
- `components/Portfolio.tsx`: page and interactions.
- `components/MessageScene.tsx`: Three.js bubble scene, pointer response, and reaction animation.
- `app/globals.css`: responsive styles, light/dark themes, and motion preferences.
- `public/portfolio/`: extracted source visuals and downloadable original PDF.

The quick-reply chat is local navigation with prepared responses; messages are not sent to a server. Contact links open the visitor's email application or social profile. Financial projections and dummy-data screenshots retain their source disclosures.

## Verification

Production build, TypeScript, and content/asset checks passed. Browser checks cover quick replies, project filtering, project dialog and Escape dismissal, reactions, theme switching, motion pause, clipboard feedback, and responsive layout. Real-device GPU performance and screen-reader testing remain manual checks.
