# Quickstart: Homepage

## Goal
Implement a radically simple homepage that tells Joey's story clearly, shows the `$600/week` support goal, and teaches Joey which shadcn/ui components he used.

## 1. Work in the app directory
From the repository root:

```bash
cd app
```

All commands below run from `app/`.

## 2. Install dependencies if needed

```bash
bun install
```

## 3. Edit one file first
Make the main feature change in `src/pages/HomePage.tsx`.

Implementation guardrails:
- Keep the page self-contained.
- Use existing shadcn/ui primitives only.
- Keep the visible component family count to 5 or fewer.
- Avoid adding routes, APIs, new environment variables, or new dependencies.

## 4. Use this implementation shape
Build the page in this order:
1. Story card with Joey's name and factual situation.
2. Goal/support section with the `$600/week` target.
3. Primary button with a simple in-page acknowledgment state.
4. Visible learning anchor listing the component names Joey edited.

## 5. Run locally

```bash
bun run dev
```

Expected result:
- The homepage loads without runtime errors.
- The first mobile view explains who Joey is, his situation, and what he is trying to do.

## 6. Check mobile readability
In browser devtools, test at `320px` wide.

Expected result:
- No horizontal scrolling.
- Story, goals, and support action remain readable.
- The primary button is easy to tap.

## 7. Check accessibility basics
Verify manually:
- Heading and story are announced in a logical order.
- Focus styles remain visible on the button.
- Color choices remain readable and meet the app's accessible defaults.

## 8. Build before review

```bash
bun run build
```

Optional extra check:

```bash
bun run lint
```

Expected result:
- The Vite production build succeeds.
- No new deployment configuration is needed.

## 9. Final acceptance checklist
- Joey's name is prominent.
- The page states that Joey is homeless and about `$3 million` in medical debt.
- The page states both goals: `$600/week` and learning to code.
- The CTA responds gracefully without leaving the page.
- The learning anchor names the components Joey used.
- The page stays beginner-friendly, mobile-readable, and Vercel-safe.