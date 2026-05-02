# Quickstart: React Scaffold Completion

## Goal
Use a beginner-friendly structure so page code and reusable UI are easy to find and extend.

## 1. Open the right workspace
- Learner-focused: open `For Joey.code-workspace`.
- Full maintenance: open `Hi-Im-Joey-Dot-Com.code-workspace`.

## 2. Work in the app directory
From the repository root:

```bash
cd app
```

All run/build commands below are executed from `app/`.

## 3. Install dependencies

```bash
bun install
```

## 4. Run locally

```bash
bun run dev
```

Expected result:
- Vite starts without setup errors.
- Starter app renders locally.

Manual acceptance note (2026-05-02):
- Verified `bun run dev --host 127.0.0.1 --port 4173` starts Vite successfully from `app/`.
- Local URL reported: `http://127.0.0.1:4173/`.

## 5. Build for production

```bash
bun run build
```

Expected result:
- TypeScript + Vite build completes successfully.
- Deployable output is generated.

Manual acceptance note (2026-05-02):
- `bun run build` completed successfully from `app/`.
- Vite reported a successful production bundle output in `app/dist`.

## 6. Add a new page with the minimal pattern
1. Create a new file in `src/pages` (example: `AboutPage.tsx`).
2. Import shared UI components from `src/components/ui`.
3. Compose the page JSX directly in that page component.

Minimal example:

```tsx
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <section>
      <h1>About</h1>
      <Button>Say hello</Button>
    </section>
  );
}
```

## 7. File placement rules (most important)
- `src/pages`: page-level orchestration and page content.
- `src/components/ui`: reusable UI building blocks used by multiple pages.

If a file seems page-specific, keep it in `src/pages`.
If a file is reusable across pages, keep it in `src/components/ui`.

## 8. Verify before sharing
After edits, run both checks from `app/`:

```bash
bun run validate:boundaries
bun run validate:workspaces
bun run dev
bun run build
```

If both pass, the scaffold is in a healthy state for review and Vercel-safe progression.

## 9. Verify workspace consistency

From `app/` run:

```bash
bun run validate:workspaces
```

Expected result:
- `For Joey.code-workspace` keeps a focused pages/UI scope.
- `Hi-Im-Joey-Dot-Com.code-workspace` keeps full monorepo scope and still includes Joey pages/UI folders.

Manual acceptance note (2026-05-02):
- `bun run validate:workspaces` passed.
- Joey view folder count: 2.
- Full workspace folder count: 5.
