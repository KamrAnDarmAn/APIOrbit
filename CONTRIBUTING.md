## Contributing to APIOrbit

Thank you for your interest in contributing! This guide explains how to get the project running locally, how to structure changes, and how to submit a clean pull request so maintainers can review quickly.

If you're new to open source contributions, feel free to open an issue saying what you'd like to work on — a maintainer will help you get started.

---

### Table of contents

- Getting started
- Branching & naming
- Commit messages
- Making changes
- Tests & linting
- Opening a Pull Request
- Reporting bugs & requesting features
- Communication

---

### Getting started

1. Fork the repository on GitHub and clone your fork locally.

```bash
git clone https://github.com/KamrAnDarmAn/APIOrbit.git
cd APIOrbit
```

2. Install dependencies and run the app:

```bash
yarn install
yarn dev
```

3. The app runs at http://localhost:3000 by default.

Notes

- This project uses Yarn 4 per `package.json` metadata. If you don't have Yarn 4 installed, refer to the Yarn documentation for migration steps.

---

### Branching & naming

- Create a feature branch from `main` for each logical change:

```bash
git checkout main
git pull origin main
git checkout -b feat/short-description
```

- Use prefixes for clarity: `feat/`, `fix/`, `docs/`, `chore/`, `test/`.

---

### Commit messages

Follow a simple conventional style (short and meaningful):

```
type(scope): short summary

longer description (optional)
```

Examples:

```
feat(url-form): add content-type heuristic for body
fix(url-form): handle network errors and set status 0
docs(readme): improve contributing instructions
```

---

### Making changes

- Keep changes small and focused. One feature or fix per pull request makes review faster.
- Update or add tests where applicable. If you add new UI elements, include screenshots/GIFs in the PR.
- If your change touches styles, follow the existing conventions in `components/ui` and Tailwind usage.

---

### Tests & linting

- There are no formal test scripts currently in the repository. You're encouraged to add unit tests (Jest + Testing Library) and/or E2E tests (Playwright or Cypress).
- Run the linter before opening a PR:

```bash
yarn lint
```

---

### Opening a Pull Request

1. Push your branch to your fork:

```bash
git push origin feat/short-description
```

2. Open a Pull Request to `KamrAnDarmAn/APIOrbit:main` (target branch `main`).

3. In your PR description, include:

   - A brief summary of what you changed and why.
   - How to test the change locally.
   - Screenshots for UI changes.

4. Link any related issues and add labels if appropriate (e.g., `feature`, `bug`, `good first issue`).

Maintainters will review and leave feedback. Please be responsive to comments so the PR can be merged.

---

### Reporting bugs & requesting features

- Open an issue describing the problem or the feature you'd like. Include steps to reproduce, expected vs actual behavior, and any relevant logs or screenshots.

---

### Communication

- Use Issues for tracking bugs, feature requests, and discussions about changes.
- If you want to announce you'd like to work on something, comment on the issue or add a short PR/issue saying "I'm working on this".

---

Thanks again for contributing — small improvements are welcome and appreciated. If you'd like, mention your preferred first task and I can suggest a good-first-issue that matches your skill level.
