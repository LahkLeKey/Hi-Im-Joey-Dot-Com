# Research: Web Project Scaffold

**Feature**: 001-web-project-scaffold  
**Phase**: 0 — Research  
**Date**: 2026-05-02

---

## Decision 1: React Framework

**Decision**: Use Vite with the `react-ts` template (plain React SPA, no framework)
**Rationale**: Vite is transparent and beginner-friendly. Every file has a clear, obvious purpose — there are no special folder conventions, no server-side rendering concepts, and no routing magic. `src/main.tsx` mounts the app, `src/App.tsx` is the root component, and that’s it. Vercel auto-detects Vite projects and deploys them correctly with no configuration. shadcn/ui also supports Vite via its manual setup path.
**Alternatives considered**: Next.js (App Router) — officially recommended for shadcn/ui and Vercel, but introduces server components, routing conventions, and `app/` folder magic that are confusing for beginners with no formal education. Rejected in favor of clarity.

---

## Decision 2: Package Manager and Runtime

**Decision**: Bun  
**Rationale**: User-specified constraint (FR-001). Bun is a drop-in replacement for `npm`/`node` with faster install times. All Next.js commands (`bun run dev`, `bun run build`) work identically.  
**Alternatives considered**: npm, pnpm — not applicable, user specified Bun.

---

## Decision 3: Source Directory Layout

**Decision**: Use `src/` directory with flat Vite structure (`src/App.tsx`, `src/main.tsx`, `src/index.css`)
**Rationale**: FR-010 requires config files at root and source files in a clearly named folder. Vite’s default `react-ts` template already does this — `index.html`, `vite.config.ts`, `package.json` at root; all code inside `src/`. The structure is immediately readable by a beginner.
**Alternatives considered**: Moving components to nested subfolders from the start — unnecessary complexity for a single-page scaffold.

---

## Decision 4: Component Library Integration

**Decision**: shadcn/ui initialized with `npx shadcn@latest init`, default "New York" style, neutral base color, CSS variables enabled  
**Rationale**: FR-003 and FR-009 require a configured default theme out of the box. The "New York" style with neutral color is the most broadly applicable default and installs cleanly into Next.js + Tailwind. CSS variables enable easy theme overrides later.  
**Alternatives considered**: "Default" style — functionally equivalent, but "New York" has slightly more refined component defaults used across shadcn docs examples.

---

## Decision 5: Starter Page Content

**Decision**: A single centered page with a heading, a one-sentence description, and a shadcn/ui `Button` component  
**Rationale**: FR-003 requires at least one shadcn/ui component visible. A Button is the simplest possible component — no dependencies beyond shadcn itself. The page demonstrates the full stack (Next.js page → Tailwind layout → shadcn/ui component) without adding any complexity.  
**Alternatives considered**: A full dashboard layout — overkill for a scaffold; violates the Radically Simple constitution principle.

---

## Decision 6: TypeScript Configuration

**Decision**: Strict TypeScript via Vite `react-ts` template defaults (`strict: true` in `tsconfig.json`), plus path alias `@/*` pointing to `src/*` added manually for shadcn/ui compatibility
**Rationale**: FR-006 requires zero TypeScript errors on initial scaffold. The Vite template’s default TypeScript config passes strict mode cleanly. The `@/*` alias is required by shadcn/ui component imports and must be added to both `tsconfig.json` and `vite.config.ts`.
**Alternatives considered**: Looser TypeScript settings — not needed; the default scaffold code passes strict mode cleanly.

---

## No Unresolved Clarifications

All NEEDS CLARIFICATION items were resolved by the spec itself (stack was fully specified by the user) and standard framework conventions. No blockers remain.
