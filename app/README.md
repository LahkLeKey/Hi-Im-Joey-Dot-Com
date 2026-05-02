# App Scaffold Guide (Beginner-Friendly)

This folder is the web app. Run all app commands from this directory.

## Where to run commands

From repo root:

```bash
cd app
```

All commands below are run in `app/`.

## Install

```bash
bun install
```

## Run locally

```bash
bun run dev
```

## Build for production

```bash
bun run build
```

## Scaffold validation checks

```bash
bun run validate:boundaries
bun run validate:workspaces
bun run validate:scaffold
```

- `validate:boundaries` checks page-vs-UI placement rules.
- `validate:workspaces` checks Joey-focused and full workspace files stay in sync.
- `validate:scaffold` runs both checks together.

## Minimal page composition pattern

1. Add or edit a page in `src/pages`.
2. Import reusable UI from `src/components/ui`.
3. Compose the page JSX directly in that page component.

Example:

```tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <section>
      <h1>About</h1>
      <Badge variant="outline">From src/components/ui</Badge>
      <Button>Click me</Button>
    </section>
  );
}
```

## Placement rules

| If you are building... | Put it in... | Why |
|---|---|---|
| A route/page module (Home, About, Contact, etc.) | `src/pages` | Pages own page-level composition |
| A reusable visual primitive (Button, Badge, Card, etc.) | `src/components/ui` | UI primitives are shared across pages |

If a file is page-specific, keep it in `src/pages`.
If a file is reusable across multiple pages, keep it in `src/components/ui`.
