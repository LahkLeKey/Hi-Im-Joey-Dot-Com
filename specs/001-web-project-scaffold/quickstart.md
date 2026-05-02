# Quickstart: Web Project Scaffold

**Feature**: 001-web-project-scaffold  
**Audience**: Joey (beginner) + any developer cloning the repo  
**Date**: 2026-05-02

---

## What You Need Before Starting

- [Bun installed](https://bun.sh/docs/installation) on your machine (`bun --version` should print a version number)
- A terminal (Terminal on Mac, PowerShell or Git Bash on Windows)
- A free [Vercel account](https://vercel.com) for deployment

---

## Step 1 — Create the Vite + React Project

Run this command in the folder where you want the project to live:

```bash
bun create vite . --template react-ts
```

Then install dependencies:

```bash
bun install
```

> This creates a plain React app with TypeScript. You can open `src/App.tsx` and see your whole app in one file — no magic, no hidden conventions.

---

## Step 2 — Set Up Tailwind CSS

```bash
bun add -d tailwindcss postcss autoprefixer
bunx tailwindcss init -p
```

Open `tailwind.config.js` and update the `content` array to include your source files:

```js
content: ["./index.html", "./src/**/*.{ts,tsx}"],
```

Add the Tailwind directives to the top of `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Step 3 — Add the Path Alias (required by shadcn/ui)

Open `tsconfig.app.json` and add inside `compilerOptions`:

```json
"baseUrl": ".",
"paths": { "@/*": ["./src/*"] }
```

Open `vite.config.ts` and update it to:

```ts
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
```

Then install the Node types so the `path` import works:

```bash
bun add -d @types/node
```

---

## Step 4 — Install shadcn/ui

```bash
bunx shadcn@latest init
```

When it asks questions, answer like this:
- **Which style would you like to use?** → New York
- **Which color would you like to use as base color?** → Neutral
- **Would you like to use CSS variables for colors?** → Yes

> This sets up the shadcn/ui component library with a clean default theme.

---

## Step 5 — Add the Button Component

```bash
bunx shadcn@latest add button
```

> This creates `src/components/ui/button.tsx` — the first shadcn/ui component.

---

## Step 6 — Update the Starter Page

Replace the contents of `src/App.tsx` with:

```tsx
import { Button } from "@/components/ui/button";

function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold">Hi, I'm Joey</h1>
      <p className="text-muted-foreground text-center max-w-md">
        I'm learning to code and building this site in public. Follow along!
      </p>
      <Button>Let's Go</Button>
    </main>
  );
}

export default App;
```

---

## Step 7 — Run It Locally

```bash
bun run dev
```

Open your browser and go to `http://localhost:5173`. You should see the starter page with Joey's heading and a styled Button.

---

## Step 8 — Deploy to Vercel

1. Push the project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**
3. Import the GitHub repository
4. Leave all settings at their defaults — Vercel auto-detects Vite and sets the output directory to `dist`
5. Click **Deploy**

Your site will be live at a `*.vercel.app` URL within a few minutes.

---

## Adding More shadcn/ui Components Later

```bash
bunx shadcn@latest add <component-name>
```

Example — add a Card component:

```bash
bunx shadcn@latest add card
```

Then import it in any page file:

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
```

No config changes needed.

---

## Common Commands

| Command | What it does |
|---|---|
| `bun install` | Install dependencies after cloning |
| `bun run dev` | Start local dev server at localhost:3000 |
| `bun run build` | Build the project for production |
| `bun run lint` | Check for code style issues |
| `bunx shadcn@latest add <name>` | Add a new shadcn/ui component |
