# Contract: Homepage Story, Support, and Learning Anchor

## Status
Draft for feature `003-homepage`.

## Purpose
Define the externally visible behavior and guardrails for the first real homepage so implementation stays honest, simple, accessible, and deployable.

## Contract 1: Story Presentation
- The homepage must prominently identify Joey.
- The homepage must plainly state that Joey is homeless and in about `$3 million` of medical debt.
- The homepage must state Joey's two current goals: getting `$600/week` to stay off the streets and learning to code for his future.
- The tone must remain direct, respectful, and free of sensational or guilt-based language.

## Contract 2: Support Call To Action
- The page must expose one primary call to action tied to the `$600/week` support goal.
- The call to action must be easy to find and easy to tap on mobile.
- Activating the call to action must produce a graceful in-page response without requiring external integration.

## Contract 3: Beginner Learning Anchor
- The page must include a visible section that names the shadcn/ui components used to build the page.
- Each named component must include a beginner-friendly explanation of what it does.
- The learning anchor must cover every visible component family used on the page.

## Contract 4: Simplicity Guardrails
- Runtime work must stay inside `app/src/pages/HomePage.tsx` unless a blocker makes that impossible.
- The visible page must use 5 or fewer distinct shadcn/ui component families.
- No new routes, API calls, storage, or environment variables may be introduced.

## Contract 5: Accessibility and Deployability
- The page must remain readable at `320px` width without horizontal scrolling.
- Reading order and focus handling must stay accessible.
- The feature must continue to build through the existing `bun run build` Vite pipeline in `app/`.
- The feature must remain deployable to Vercel with default project detection.