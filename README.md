# Hi, I'm Joey — hiimjoey.com

Joey's personal site, built with Vite + React + TypeScript + Tailwind CSS + shadcn/ui.

## Workspace choices

- Learner-focused view: `For Joey.code-workspace` (only pages + reusable UI folders).
- Full maintainer view: `Hi-Im-Joey-Dot-Com.code-workspace` (full monorepo plus Joey folders).

When folder scope changes, update both workspace files in the same change.

## Beginner onboarding

- App instructions live in `app/README.md`.
- New pages go in `app/src/pages`.
- Reusable UI primitives go in `app/src/components/ui`.

## Prerequisites

You need [Bun](https://bun.sh/docs/installation) installed on your machine.

```bash
bun --version   # should print a version number like 1.x.x
```

## Install Dependencies

```bash
cd app
bun install
```

## Start the Dev Server

Run from `app/`:

```bash
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. Changes to files in `src/` appear instantly without a full page reload.

## Build for Production

Run from `app/`:

```bash
bun run build
```

Output is written to `app/dist/`. Zero config needed — Vercel auto-detects this.

## Deploy to Vercel

1. Push your changes to the `main` branch on GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import this repository.
3. Leave all build settings at their defaults — Vercel detects Vite automatically.
4. Click **Deploy**.

Every push to `main` auto-deploys. No environment variables are required.

## Adding a New shadcn/ui Component

```bash
cd app
bunx shadcn@latest add <component-name>
```

Example: `bunx shadcn@latest add card` — then import it from `@/components/ui/card`.
