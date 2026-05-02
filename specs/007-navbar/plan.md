# Implementation Plan: Site Navigation Bar

**Branch**: `007-navbar` | **Date**: 2026-05-02 | **Spec**: [specs/007-navbar/spec.md](spec.md)

## Summary

Add a persistent site-wide navigation bar visible on every page. Links to Home (`/`), Blog (`/blog`), and Learn (`/learn`). Mobile-responsive: collapses to a hamburger menu on small screens using shadcn Sheet. No auth, no dropdowns, no mega-menu — just clear, accessible wayfinding for a beginner site.

**How This Teaches**: Joey sees how a shared layout component wraps pages — the mental model of "wrapper renders once, children swap out" is the foundation of every web framework.

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**: React Router DOM (`useLocation`, `Link`), shadcn/ui (`Sheet`, `Button`)
**Storage**: None
**Testing**: Manual browser verification; existing Vitest setup available
**Target Platform**: Web browser (responsive, mobile-first)
**Project Type**: React web application (shared layout component)
**Performance Goals**: Zero additional network requests
**Constraints**: No new environment variables; no paid services; shadcn/ui only

## Constitution Check

✓ **Human-First Learning** — Teaches shared layout / wrapper component pattern.
✓ **Honest Story** — Keeps site name visible and the story accessible from every page.
✓ **Radically Simple** — Three links, one mobile sheet, no state beyond open/close.
✓ **Blog + Interactive** — Directly links to both required surfaces.
✓ **Vercel Deployable** — No new deps required (react-router-dom and shadcn already installed).

**Gate Result**: PASS — Ready for implementation.

## Project Structure

### New Files

```
app/src/components/
└── nav/
    └── SiteNav.tsx        # Responsive navbar component
```

### Modified Files

```
app/src/App.tsx            # Add SiteNav above <Outlet /> in the root layout
```

## Task List

| ID   | Task                                       | Status |
|------|--------------------------------------------|--------|
| T001 | Create `SiteNav.tsx` component             | [ ]    |
| T002 | Add active link highlight via `useLocation`| [ ]    |
| T003 | Add mobile sheet (hamburger) for <768px    | [ ]    |
| T004 | Wire `SiteNav` into `App.tsx` root layout  | [ ]    |
| T005 | Verify build passes with no TS errors      | [ ]    |
