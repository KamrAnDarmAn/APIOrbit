# APIOrbit

APIOrbit is a lightweight, browser-first API playground and tester. It's built with Next.js (App Router), React, TypeScript and Tailwind CSS and provides a small, extensible UI for composing HTTP requests, sending them from the browser, and inspecting responses.

This repository is actively looking for contributors — whether you want to add features, improve UX, harden testing, or help with documentation. Welcome!

## Highlights

- Compose and send HTTP requests (GET, POST, PUT, PATCH, DELETE)
- Automatic Content-Type heuristics for common request bodies (JSON, form-encoded)
- Inspect response status, headers, and raw body
- Tabbed UI scaffolding for Params, Authorization, Headers, Body, Response, Scripts, Tests and Settings
- Dark/light theme with system preference support

## Tech stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Radix UI primitives and custom UI components
- react-hook-form + zod for form handling and validation

## Quick start (local development)

Prerequisites

- Node.js (use a modern LTS, e.g. Node 20+)
- Yarn 4 (the repo metadata uses Yarn 4)

Install and run

```bash
yarn install
yarn dev
```

Open http://localhost:3000 in your browser.

Build for production

```bash
yarn build
yarn start
```

Run linter

```bash
yarn lint
```

## Project structure (quick tour)

- `app/` – Next.js app router; `app/layout.tsx` sets up theme and fonts; `app/page.tsx` wires the main form and response components.
- `components/` – app components and UI primitives. Notable files:
  - `components/url-form.tsx` — request composer + sender (fetch from browser)
  - `components/request-and-response.tsx` — tabs for request/response viewers
  - `components/response/*` — response viewers for params, headers, body, etc.
  - `components/ui/*` — shared UI primitives (Button, Input, Card, Tabs, etc.)
- `lib/` – utility helpers
- `public/` – static assets
- `package.json` – scripts and dependencies

## Developer notes

- The primary form schema is declared in `app/page.tsx` using Zod and consumed by `react-hook-form` across components.
- Requests are sent using the browser `fetch` API from `components/url-form.tsx`. When testing third-party endpoints be mindful of CORS restrictions.
- The project currently focuses on client-side request sending. Server-side features (proxying, workspaces, auth helpers) can be added later.

## Roadmap & Good first issues

If you'd like to contribute, here are some ideas and small tasks to get started:

- Add saved requests persistence (localStorage or a small backend)
- Implement pre-request and test scripting (evaluate JS snippets against request/response)
- Add authentication presets (Bearer, Basic, OAuth helper flows)
- Improve response viewers: pretty JSON, syntax highlighting, image previews
- Add history and workspace management
- Add unit tests and E2E tests (Jest/Testing Library, Playwright/Cypress)

If you want help picking an issue, open an issue and request a `good first issue` tag.

## How to contribute

1. Fork the repo and create a branch from `main`:

```bash
git checkout -b feat/my-feature
```

2. Install dependencies and run the dev server. Add tests where appropriate.

3. Make small, focused changes. Commit with clear messages and push your branch.

4. Open a Pull Request against `main`. In your PR description include:

   - A short summary of the change and motivation
   - How to test locally
   - Screenshots for UI changes

5. A maintainer will review and provide feedback. Please be responsive to requested changes.

For more details, see `CONTRIBUTING.md` (coming soon). If you'd like, I can create a `CONTRIBUTING.md` file with detailed instructions — tell me which workflow you prefer (GitHub Flow, trunk-based, or anything custom).

## Code of Conduct

Be respectful and kind. This project follows the Contributor Covenant. If you'd like, I can add a `CODE_OF_CONDUCT.md` file.

## License

There is no license file in the repository yet. If you want this project to be open-source, add a LICENSE (MIT is a common choice).

## Contact

Open issues and discussions in this repository to ask questions or volunteer to work on a task. If you'd like a quick onboarding, create an issue titled "I'd like to contribute" and describe your interests/skills.

---

Thanks for checking out APIOrbit — contributions are warmly welcome!
