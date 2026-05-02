---
description: "Task list for feature 001-web-project-scaffold"
---

# Tasks: Web Project Scaffold

**Feature**: `001-web-project-scaffold`  
**Input**: `specs/001-web-project-scaffold/` — plan.md, spec.md, contracts/starter-page.md, quickstart.md  
**Stack**: Vite + React + TypeScript + Tailwind CSS v4 + shadcn/ui | Package manager: Bun | Deploy: Vercel  
**Generated**: 2026-05-02

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel with other [P] tasks in the same phase (different files, no shared dependencies)
- **[US#]**: The user story this task satisfies
- File paths are relative to the repository root

---

## Phase 1: Setup — Scaffold the Project

**Purpose**: Get a running Vite + React + TypeScript project with all config files in place. Nothing works yet — this just creates the bones.

- [X] T001 Run `bun create vite . --template react-ts` from the repository root to scaffold the project
- [X] T002 Run `bun install` to install the default Vite/React/TypeScript dependencies and create `bun.lockb`
- [X] T003 [P] Verify `.gitignore` at repo root — confirm it excludes `node_modules/`, `dist/`, and `.env*.local`; add any missing entries (satisfies FR-007)

---

## Phase 2: Foundational — Configure the Full Stack

**Purpose**: Wire up Tailwind CSS, the `@/*` path alias, and shadcn/ui. These steps must be done in order and must be complete before any user story work can begin — shadcn/ui requires both Tailwind and the alias to exist first.

**⚠️ Complete every task in this phase before moving to Phase 3.**

- [X] T004 Install Tailwind CSS dev dependencies: run `bun add -d tailwindcss postcss autoprefixer`
- [X] T005 Run `bunx tailwindcss init -p` to create `tailwind.config.js` and `postcss.config.mjs` at the repo root
- [X] T006 Open `tailwind.config.js` and set `content: ["./index.html", "./src/**/*.{ts,tsx}"]` so Tailwind scans all source files
- [X] T007 Open `src/index.css` and replace its contents with the three Tailwind directives (`@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`) at the top
- [X] T008 Install Node type definitions: run `bun add -d @types/node` (needed so `path` works in vite.config.ts)
- [X] T009 Open `vite.config.ts` and add the `@/*` path alias pointing to `./src` using `path.resolve(__dirname, "./src")`
- [X] T010 Open `tsconfig.app.json` and add `"baseUrl": "."` and `"paths": { "@/*": ["./src/*"] }` inside `compilerOptions`
- [X] T011 Run `bunx shadcn@latest init` and answer: style → New York, base color → Neutral, CSS variables → Yes — this creates `components.json` and `src/lib/utils.ts`

**Checkpoint**: Running `bun run dev` should now start without errors. `src/lib/utils.ts` and `components.json` should exist.

---

## Phase 3: User Story 1 — Developer Runs the Project Locally (P1) 🎯 MVP

**Goal**: Joey clones the repo, runs one command, and sees a styled starter page in the browser with a working shadcn/ui Button. Hot module replacement lets edits appear instantly.

**Independent Test**: Run `bun run dev`, open `http://localhost:5173`, confirm the heading "Hi, I'm Joey" and a styled Button are visible. Edit `src/App.tsx` and confirm the browser updates without a full reload.

- [X] T012 [US1] Run `bunx shadcn@latest add button` — this creates `src/components/ui/button.tsx`
- [X] T013 [US1] Replace `src/App.tsx` with the starter page: centered layout using Tailwind flex utilities, an `<h1>` heading, a `<p>` description using `text-muted-foreground`, and a `<Button>` imported from `@/components/ui/button` (see contracts/starter-page.md for exact content requirements)
- [X] T014 [P] [US1] Open `src/main.tsx` and confirm it imports `./index.css` — add the import if it is missing (required for Tailwind styles to apply)
- [ ] T015 [US1] Run `bun run dev` and open `http://localhost:5173` — verify the heading is visible, the Button is styled (background color, padding, rounded corners), and the page is readable on a narrow window

---

## Phase 4: User Story 2 — Developer Deploys to Vercel (P2)

**Goal**: Joey connects the repo to Vercel and gets a live public URL with zero manual build configuration. Subsequent pushes auto-deploy.

**Independent Test**: Push to `main`, connect the repo to Vercel (or run `vercel --prod`), confirm the build log exits with code 0 and the live URL shows the starter page.

**Depends on**: Phase 3 complete (starter page must exist before deploying it)

- [X] T016 [US2] Run `bun run build` locally and confirm it exits with code 0 and produces a `dist/` folder — this is the same command Vercel runs
- [X] T017 [P] [US2] Verify `vite.config.ts` has no `outDir` override — Vercel auto-detects Vite and defaults to `dist`, so no `vercel.json` is needed (satisfies FR-005)
- [ ] T018 [US2] Push all changes to the `main` branch on GitHub
- [ ] T019 [US2] Connect the GitHub repository to Vercel via the Vercel dashboard — import the repo, leave all build settings at their auto-detected defaults, and deploy
- [ ] T020 [US2] After deployment completes, open the Vercel-provided live URL and confirm the starter page matches what runs locally

---

## Phase 5: User Story 3 — Developer Adds a New shadcn/ui Component (P3)

**Goal**: Confirm the shadcn/ui integration is self-serve — Joey can run `bunx shadcn@latest add <component>` and immediately use the new component with no config edits.

**Independent Test**: Run `bunx shadcn@latest add badge`, import `Badge` into `src/App.tsx`, render it on the page, and confirm it displays with correct styles both locally and after a Vercel deploy.

**Depends on**: Phase 3 complete (shadcn/ui must be initialized first)

- [X] T021 [US3] Run `bunx shadcn@latest add badge` — confirm `src/components/ui/badge.tsx` is created automatically
- [X] T022 [US3] Import `Badge` from `@/components/ui/badge` in `src/App.tsx` and add it to the starter page alongside the existing Button
- [ ] T023 [US3] Run `bun run dev` and confirm `Badge` displays with correct styles (no unstyled/broken appearance)
- [X] T024 [P] [US3] Run `bun run build` and confirm it still exits with code 0 after the Badge was added
- [ ] T025 [US3] Push to `main` and confirm Vercel auto-deploys and the Badge appears on the live URL

---

## Final Phase: Polish & Cross-Cutting Concerns

**Purpose**: README, TypeScript health check, and final verification. These tasks can be done at any point after Phase 2 but should be completed before marking the feature done.

- [X] T026 [P] Run `bun run build` (or `bunx tsc --noEmit`) and confirm zero TypeScript errors and zero warnings — satisfies FR-006 and SC-004
- [X] T027 Write `README.md` at the repo root with beginner-friendly sections: (1) Prerequisites (Bun install link), (2) Install dependencies (`bun install`), (3) Start dev server (`bun run dev`), (4) Deploy to Vercel (link to Vercel dashboard + note that no config changes are needed) — satisfies FR-008 and SC-006
- [X] T028 [P] Review project structure and confirm config files (`package.json`, `tsconfig*.json`, `vite.config.ts`, `index.html`, `components.json`, `tailwind.config.js`) are all at the repo root and source files are all under `src/` — satisfies FR-010
- [ ] T029 Do a final local smoke test: fresh terminal, run `bun install && bun run dev`, open browser, confirm starter page loads under 3 seconds on a normal connection — satisfies SC-001 and SC-005

---

## Dependencies

```
Phase 1 (Setup)
  └── Phase 2 (Foundational — Tailwind + alias + shadcn init)
        ├── Phase 3 (US1 — Local dev server + starter page)  ← MVP
        │     ├── Phase 4 (US2 — Vercel deployment)
        │     └── Phase 5 (US3 — Add new component)
        └── Final Phase (Polish — can overlap with Phases 3–5)
```

**US2 and US3 are independent of each other** — they both depend only on Phase 3 being done.

---

## Parallel Execution Examples

### After Phase 2 is complete, these can proceed simultaneously:

```
Developer A                        Developer B
──────────────────────────────     ──────────────────────────────
T012 Add Button component          T014 Verify main.tsx imports CSS
T013 Write App.tsx starter page    T026 Run TypeScript check
T015 Local smoke test              T027 Write README
```

### After Phase 3 is complete, these can proceed simultaneously:

```
Developer A                        Developer B
──────────────────────────────     ──────────────────────────────
T016–T020 Vercel deployment        T021–T025 Add Badge component
```

---

## Implementation Strategy

| Scope | Tasks | Delivers |
|---|---|---|
| **MVP (US1 only)** | T001–T015 | Running local dev server with styled starter page |
| **+ Vercel deploy** | + T016–T020 | Live public URL auto-deploying from `main` |
| **+ Component proof** | + T021–T025 | Confirmed self-serve shadcn/ui component workflow |
| **Full feature done** | + T026–T029 | Clean TypeScript, beginner README, final verification |

**Recommended MVP scope**: Complete Phases 1–3 (T001–T015) first. That gives a fully working local environment — proof the entire stack is wired up — before touching Vercel or additional components.

---

## Task Count Summary

| Phase | Tasks | Story |
|---|---|---|
| Phase 1: Setup | 3 (T001–T003) | — |
| Phase 2: Foundational | 8 (T004–T011) | — |
| Phase 3: User Story 1 | 4 (T012–T015) | US1 (P1) |
| Phase 4: User Story 2 | 5 (T016–T020) | US2 (P2) |
| Phase 5: User Story 3 | 5 (T021–T025) | US3 (P3) |
| Final Phase: Polish | 4 (T026–T029) | — |
| **Total** | **29 tasks** | |
