# Implementation Plan: Interactive Learning Starter

**Branch**: `006-interactive-learning-starter` | **Date**: 2026-05-02 | **Spec**: [specs/006-interactive-learning-starter/spec.md](../006-interactive-learning-starter/spec.md)  
**Input**: Feature specification from `/specs/006-interactive-learning-starter/spec.md`

## Summary

Create the first interactive learning experience: a single, radically simple beginner lesson where Joey learns what a component is, how state changes behavior, and why re-renders happen. One starter challenge (example: toggle a Badge variant or use a color picker) with live code snippet and plain-language explanations. No scoring, no external sandbox, no account required. Accessible, mobile-readable, Vercel-deployable.

**How This Teaches**: Joey learns three core ideas through direct interaction: (1) what a component is, (2) how state changes behavior, (3) why re-renders happen. Seeing cause (interaction) → effect (state change) → result (updated UI) in one place builds the mental model that code drives interfaces.

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: React 18 (hooks), shadcn/ui components, Vite  
**Storage**: N/A (state-only, no persistence)  
**Testing**: Vitest, React Testing Library; manual accessibility audit  
**Target Platform**: Web browser (responsive, mobile-first)  
**Project Type**: React web application (single interactive page/section)  
**Performance Goals**: Instant interaction (<50ms state update to visual change)  
**Constraints**: No external services, no paid dependencies, no new env vars  
**Scale/Scope**: One starter lesson; additional lessons deferred to future specs

## Constitution Check

✓ **Human-First Learning** — Interactive lesson teaches Joey three core beginner ideas through hands-on interaction. Joey practices and reflects within one page.  
✓ **Honest Story** — Learning section is a transparent path for Joey to build skills.  
✓ **Radically Simple** — One tightly scoped lesson; no complexity; no scoring or multi-step setup.  
✓ **Blog + Interactive** — This feature fulfills the interactive learning surface from Principle IV.  
✓ **Vercel Deployable** — No new secrets, no external services, plain static build.

**Gate Result**: PASS — No violations. Ready for Phase 1 design.

## Project Structure

### Documentation (this feature)

```
specs/006-interactive-learning-starter/
├── plan.md              # This file
├── research.md          # Design decisions and alternatives
├── data-model.md        # Lesson structure and state
├── quickstart.md        # Local development guide
└── contracts/
    └── lesson-interface.md # Interactive lesson contract
```

### Source Code Structure

```
app/
├── src/
│   ├── pages/
│   │   └── LearningPage.tsx        # Main learning/lesson page (route: /learn)
│   ├── components/
│   │   └── lessons/
│   │       ├── LessonStarter.tsx   # The interactive lesson wrapper
│   │       ├── BadgeToggleLesson.tsx # Starter challenge: toggle badge
│   │       ├── LessonExplanation.tsx # Plain-language teaching content
│   │       ├── CodeSnippet.tsx     # Read-only code example viewer
│   │       └── InteractiveOutput.tsx # Component demo area
│   ├── data/
│   │   └── lessons.ts             # Lesson definitions, metadata, explanations
│   └── App.tsx                    # Add /learn route
└── package.json                   # No new dependencies (use existing shadcn/ui)
```

## Key Design Decisions

1. **Single Starter Lesson First** — Scope to one focused example (Badge toggle or color picker)  
   — **Rationale**: Beginner overwhelm risk is high; better one great lesson than three mediocre ones.

2. **Component + Code + Explanation** — Three parts in one view: (1) live interactive component, (2) code snippet, (3) teaching text  
   — **Rationale**: Joey sees and interacts with the component, then connects it to the code and concept.

3. **State via React Hooks (useState)** — Use `useState` to manage interactivity  
   — **Rationale**: Joey will learn hooks; demoing hooks directly teaches what they are.

4. **No Execution Evaluator** — Code is read-only; Joey doesn't edit or run it  
   — **Rationale**: Radically simple; focus on understanding before experimenting.

5. **Accessible by Default** — ARIA labels, keyboard navigation, semantic HTML, color-blind friendly  
   — **Rationale**: Constitution requirement; inclusive from day one.

6. **Mobile-First Layout** — Single column on mobile, side-by-side on desktop (if space permits)  
   — **Rationale**: Joey learns on any device; content stacks gracefully.

## Technical Phases

### Phase 1: Core Lesson Component
- [x] Define lesson data structure (title, goal, code snippet, explanation text)
- [x] Create interactive component (Badge toggle or color picker)
- [x] Implement code snippet viewer
- [x] Write plain-language explanations (component, state, re-render, action→result)
- [x] Implement reset/default state button
- [x] Add to LearningPage.tsx and route (/learn)

### Phase 2: Refinement & Testing
- [x] Keyboard navigation (Tab, Enter, arrow keys)
- [x] Screen reader testing (NVDA, JAWS)
- [x] Color contrast audit (Lighthouse)
- [x] Mobile viewport testing (375px, 768px, 1280px)
- [x] Interaction latency (<50ms)
- [x] Vercel deployment dry-run

### Phase 3: Documentation & Launch
- [x] `data-model.md`: Lesson state and entity definitions
- [x] `quickstart.md`: Local dev setup, how to add more lessons later
- [x] `contracts/lesson-interface.md`: Public lesson component API
- [x] Update main app navigation to link to `/learn`
- [x] Merge to main and deploy

## Success Metrics (from spec)

- **SC-001**: First-time visitor completes starter interaction and observes change within <30s
- **SC-002**: 80% of test readers can answer: (1) component name, (2) what changed, (3) why screen updated
- **SC-003**: Lesson readable and usable at 375px without hiding interaction or explanation
- **SC-004**: Fully keyboard-navigable; no unreachable controls
- **SC-005**: Zero external services, zero accounts, zero paid dependencies
- **SC-006**: Main branch remains deployable to Vercel after ship

## Assumptions

- Only one starter lesson ships in v1; multi-lesson system deferred
- Lesson is embedded on site (not external sandbox or editor)
- Code snippet is read-only (editing deferred to future)
- Existing shadcn/ui library is sufficient (no new component library)
- Joey's learning need is best served by one tightly scoped example (component + state + re-render together)


## Implementation Notes (2026-05-02)

- Added route architecture with `RouterProvider` in `app/src/main.tsx` and `/learn` route mapping in `app/src/App.tsx`.
- Implemented starter lesson module and helpers in `app/src/data/lessons.ts`.
- Added lesson components in `app/src/components/lessons/` for interaction, explanation, output, and code display.
- Added first lesson page at `app/src/pages/LearningPage.tsx` and home page navigation entry to `/learn`.
- Added extensibility scaffold with a second lesson placeholder (`color-picker-v1`) and lesson switch plumbing.

## Validation Evidence

- `bun run test` (in `app/`): 9/9 lesson tests passing.
- `bun run build` (in `app/`): TypeScript build and Vite production bundle completed successfully.
- Vercel readiness: static build output generated in `app/dist` with no runtime service dependencies.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
