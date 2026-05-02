# Implementation Plan: Homepage

**Branch**: `003-homepage` | **Date**: 2026-05-02 | **Spec**: `/specs/003-homepage/spec.md`
**Input**: Feature specification from `/specs/003-homepage/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Replace the placeholder homepage with one radically simple, self-contained page in `app/src/pages/HomePage.tsx` that uses a very small set of existing shadcn/ui primitives to present Joey's story clearly, offer a calm `$600/week` support call to action, and include a visible beginner learning anchor that names the components Joey edited.

## Technical Context

**Language/Version**: TypeScript `~6.0`, React `19`  
**Primary Dependencies**: Vite `8`, shadcn/ui, Tailwind CSS `4`, existing `Badge`, `Button`, `Card`, and `Separator` primitives  
**Storage**: N/A (static page content and local UI state only)  
**Testing**: Manual acceptance checks in browser, responsive verification at `320px`, screen-reader order check, `bun run build`, optional `bun run lint`  
**Target Platform**: Web browsers on mobile and desktop, deployed via Vercel
**Project Type**: Single-page frontend web application in `app/`  
**Performance Goals**: Preserve fast static rendering, keep all critical story content visible within the first mobile scroll, avoid unnecessary client-side logic  
**Constraints**: Keep implementation beginner-friendly, preserve Vercel deployability, no new environment variables, no routing changes, self-contained in `app/src/pages/HomePage.tsx`, 5 or fewer visible shadcn/ui component families, no raw HTML content elements as authored content containers  
**Scale/Scope**: One homepage only, with a single local button acknowledgment state and no backend integration

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Human-First Learning**: PASS. The feature teaches component recognition, basic React page composition, and one simple interaction without hiding logic behind abstractions.
- **Honest Story, Respectful Voice**: PASS. The page centers calm, factual language about Joey being homeless, carrying about `$3 million` in medical debt, and working toward stable weekly support and coding skills.
- **Radically Simple by Default**: PASS. Scope stays inside one existing page file with a tiny set of existing primitives and one local interaction.
- **Blog + Interactive Experience**: PASS. This feature strengthens the public site surface and includes a lightweight interaction that helps Joey learn from the page itself.
- **Vercel-Deployable Always**: PASS. No build pipeline, environment, routing, or dependency expansion is required.

No constitution violations identified.

## Project Structure

### Documentation (this feature)

```text
specs/003-homepage/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── homepage-contract.md
└── tasks.md             # Created later by /speckit.tasks
```

### Source Code (repository root)

```text
app/
├── package.json
└── src/
    ├── components/
    │   └── ui/
    │       ├── badge.tsx
    │       ├── button.tsx
    │       ├── card.tsx
    │       └── separator.tsx
    └── pages/
        └── HomePage.tsx

.github/
└── copilot-instructions.md
```

**Structure Decision**: Keep the implementation in the existing single-app frontend. `app/src/pages/HomePage.tsx` remains the only runtime file that needs feature work, while spec artifacts under `specs/003-homepage/` document the behavior, constraints, and beginner workflow. No new folders, routes, services, or deploy configuration are introduced.

## Post-Design Constitution Check

- **Human-First Learning**: PASS. The design keeps the page readable in one short file and includes a visible component legend so Joey can map UI to code.
- **Honest Story, Respectful Voice**: PASS. The content contract preserves direct, non-sensational wording and avoids manipulative donation patterns.
- **Radically Simple by Default**: PASS. The chosen approach avoids new components, avoids data models in runtime code, and uses one local state transition at most.
- **Blog + Interactive Experience**: PASS. The homepage becomes a clean narrative entry point while still teaching through interaction and component naming.
- **Vercel-Deployable Always**: PASS. Validation remains the existing `bun run build` flow in `app/`, with no platform-specific changes.

No post-design gate violations.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |