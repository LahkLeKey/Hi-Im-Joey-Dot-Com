# Contract: Starter Page

**Feature**: 001-web-project-scaffold  
**Type**: UI Contract  
**Route**: `/` (root)  
**File**: `src/App.tsx`  
**Date**: 2026-05-02

---

## Purpose

Defines what the starter page must render and how it must behave. This contract is the acceptance target for User Story 1 and User Story 2.

---

## Required Elements

| Element | Type | Requirement |
|---|---|---|
| Page heading | `<h1>` | Must be present and non-empty |
| Description | `<p>` | One-sentence description of the site/Joey |
| shadcn/ui Button | `<Button>` from `@/components/ui/button` | Must render with visible styles |

---

## Layout Contract

- Page content is **vertically and horizontally centered** in the viewport
- Layout uses Tailwind CSS utility classes (no custom CSS)
- Page is **mobile-readable** at 375px viewport width (accessibility + mobile requirement from constitution)

---

## Style Contract

- Button uses the default shadcn/ui `Button` variant (no custom `variant` prop required)
- Text colors use Tailwind/shadcn CSS variable tokens (`text-foreground`, `text-muted-foreground`) — not hardcoded hex values
- Background inherits the shadcn/ui default theme applied via `globals.css`

---

## TypeScript Contract

- `App.tsx` must pass `bun run build` with zero TypeScript errors
- No `any` types
- Default export must be a plain React function component

---

## Vercel Build Contract

- Running `bun run build` in the repository root must exit with code `0`
- No environment variables are required for the build to succeed
- The output of `bun run build` must not contain any TypeScript or ESLint errors

---

## What This Contract Does NOT Cover

- Authentication
- Routing beyond the root `/` page
- Database connections
- Analytics or tracking
- Any dynamic data fetching

---

## Acceptance Verification

To verify this contract is met, run:

```bash
bun run build && echo "BUILD PASSED"
```

Then open `http://localhost:5173` after `bun run dev` and confirm:
1. Heading is visible
2. Button is visible and styled (has background color, padding, rounded corners)
3. Page looks correct on a phone-sized browser window
