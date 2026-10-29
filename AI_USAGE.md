# AI usage

## Tools

- **Claude Code** (VS Code extension), model **Claude Opus 5.5**: planning, code, tests, docs,
  and running builds and tests to check the output.
- No other AI tools (no Copilot, no ChatGPT).


## My role

- **Step by step:** I had Claude build one part at a time, and I reviewed and tested each part
  before moving on.
- **Decisions:** I kept Tailwind even though Claude suggested CSS Modules. I asked for avatar images,
  the department filter, a light-only theme and a nicer card and dropdown design.
- **Testing:** I tested by hand after each step: keyboard only, VoiceOver and 200% zoom.

## Where AI helped

- Turning the brief into a plan.
- Accessibility details: a live region for the result count, focus handling, the clickable-card
  pattern.
- Measuring colour contrast, and writing the unit tests and the Playwright + axe tests.

## Where AI output was corrected

1. **Filters in the URL: Back button lost the filters.** A browser test caught it: after going back
   from a profile, the URL still had `?department=Sales` but the dropdown showed "All". Fixed by
   reading the filters from the URL with `useSearchParams()` instead of passing them as props.
2. **Visible focus ring: cards showed two rings.** Caught in a screenshot. The global focus style was
   moved into Tailwind's `@layer base` so the card can override it, and the ring no longer fades in.
3. **Home page title.** The layout's title template doesn't apply to the home page (checked in the
   Next.js docs), so the title is set directly.
4. **Tests that actually test.** Claude rejected `--legacy-peer-deps` (it would break a fresh
   `npm install`) and updated `@types/node` instead. When axe reported zero problems, it planted known
   errors to prove the test can fail.

## My own review

- **Search field size.** When I tested in the browser, the search input was too small for the main
  control on the page, so I asked for it to be bigger.
- **Avatar alt text.** Claude used empty `alt=""` on avatar photos. I changed it to the person's
  name (`alt={name}`).
