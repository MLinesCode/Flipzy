# 🤝 Contributing to Flipzy

Thank you for your interest in contributing to Flipzy! This document explains how to get started, the workflow to follow, and the standards we expect from contributions.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

---

## Code of Conduct

Please be respectful and constructive in all interactions. We expect contributors to treat each other with kindness and professionalism.

---

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/Flipzy.git
   cd Flipzy
   ```
3. **Install** dependencies:
   ```bash
   npm install
   ```
4. **Create a branch** for your work:
   ```bash
   git checkout -b feat/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```
5. Start the **development server** to verify everything works:
   ```bash
   npm run dev
   ```

---

## Development Workflow

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the local development server (Vite HMR) |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run all tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate a test coverage report |
| `npm run lint` | Lint the codebase with ESLint |

Always run `npm run lint` and `npm test` before opening a pull request to make sure your changes pass all checks.

---

## Coding Standards

- **Language**: JavaScript (ES6+) with JSX for React components.
- **Formatter / Linter**: ESLint is configured in `eslint.config.js`. Follow the existing rules — do not disable rules without a very good reason.
- **Styling**: Tailwind CSS utility classes. Avoid adding raw CSS unless it is truly necessary (e.g., CSS animations in `src/styles/`).
- **Components**: Keep components focused and small. Extract reusable logic into custom hooks (`src/hooks/`) or utility functions (`src/utils/`).
- **Comments / JSDoc**: Add JSDoc blocks (`/** … */`) to exported functions and components, following the style already present in `src/services/api.js` and `src/utils/scoreUtils.js`.
- **Imports**: Use relative imports for local modules.

---

## Testing Guidelines

Tests live in `src/__tests__/` and use **Vitest** + **Testing Library**.

- Write tests for any new utility function you add to `src/utils/`.
- Write component tests for any new component you add to `src/components/`.
- Mock external dependencies (API calls, `localStorage`) using Vitest's `vi` helpers — see `src/test/setup.js` for the existing `localStorage` mock.
- Aim for meaningful coverage; do not write trivial tests just to increase the percentage.

---

## Submitting a Pull Request

1. Push your branch to your fork:
   ```bash
   git push origin feat/your-feature-name
   ```
2. Open a **Pull Request** against the `main` branch of the original repository.
3. Fill in the PR template (if present) and describe:
   - **What** the change does.
   - **Why** it is needed.
   - **How** you tested it.
4. Link any related issues using `Closes #<issue-number>` in the PR description.
5. Wait for a review. Address any requested changes by pushing new commits to the same branch.

---

## Reporting Bugs

Before opening an issue, please search the [existing issues](https://github.com/MLinesCode/Flipzy/issues) to avoid duplicates.

When reporting a bug, include:

- A clear and descriptive title.
- Steps to reproduce the problem.
- Expected vs. actual behaviour.
- Browser / OS and any relevant environment details.
- Screenshots or screen recordings if helpful.

---

## Suggesting Features

Feature requests are welcome! Open an issue with:

- A clear description of the feature and its purpose.
- Any mockups, sketches, or examples that illustrate the idea.
- Why you think it would benefit other players or developers.

---

Thank you for helping make Flipzy better! 🎮
