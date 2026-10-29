# Team Directory

A small team directory built with Next.js 16, React and TypeScript.

- **`/`**: everyone as a card, with search (name or role) and a department filter.
  Filters are saved in the URL, so a filtered view can be shared.
- **`/members/[id]`**: one person's profile. Unknown ids show a 404 page.

## How to run

```bash
npm install
npm run dev          # http://localhost:3000
```

Tests: `npm test` (unit) and `npm run test:e2e` (browser + accessibility, uses Google Chrome).

## Project structure

```
data/members.json     Team data
src/app/              Pages and layout
src/components/       UI components
src/lib/              Data, filtering and helpers
src/style/            Global CSS and variables
e2e/                  Browser tests
```

## Main decisions

- **Server Components by default.** Only `MemberSearch` is a Client Component, because only the
  search and filter need state.
- **Filters in the URL**, updated with `history.replaceState`, so links can be shared and the
  Back button keeps the filters.
- **CSS: Tailwind**, because it is fast, keeps styles next to the markup and maps directly to the CSS
  variables for colours and spacing.

## Accessibility

- Semantic HTML, keyboard support, a skip link and a visible focus ring.
- Labelled form fields, and the result count is announced to screen readers.
- Colours pass WCAG 2.2 AA, checked with automated axe tests and by hand.

## What I would do next

- Add a dark theme that follows the system setting.
- Run the tests automatically on every push and deploy a preview.


## Use of AI

Built with the help of Claude Code. More information are in [AI_USAGE.md](AI_USAGE.md).
