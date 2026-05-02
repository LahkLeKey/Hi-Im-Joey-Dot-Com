# Tasks: Homepage

**Input**: Design documents from `/specs/003-homepage/`
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `quickstart.md`, `contracts/homepage-contract.md`

**Tests**: Automated tests are not required for this feature. Validation is manual in the browser plus `bun run build` and optional `bun run lint` in `app/`.

**Organization**: Tasks are grouped by user story so each story can be implemented and checked on its own inside the existing Vite React app.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g. `US1`, `US2`, `US3`)
- Every task includes an exact file path or working location

## Path Conventions

- Runtime feature work stays in `app/src/pages/HomePage.tsx`
- Existing UI primitives come from `app/src/components/ui/`
- Manual acceptance checks come from `specs/003-homepage/quickstart.md`
- Build and lint commands come from `app/package.json`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare the existing app workflow and confirm the feature guardrails before editing the homepage.

- [X] T001 Review the homepage constraints in `specs/003-homepage/spec.md`, `specs/003-homepage/plan.md`, and `specs/003-homepage/quickstart.md`
- [X] T002 Inspect the placeholder implementation in `app/src/pages/HomePage.tsx` and note what must be replaced
- [X] T003 [P] Install frontend dependencies from `app/package.json` by running `bun install` in `app/`
- [X] T004 [P] Start the local Vite app from `app/package.json` by running `bun run dev` in `app/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build the single-file page structure that every user story depends on.

**⚠️ CRITICAL**: Finish this phase before story-specific content so the rest of the work stays simple and self-contained.

- [X] T005 Replace the placeholder imports in `app/src/pages/HomePage.tsx` with the final beginner-sized set of primitives: `Badge`, `Button`, `Card`, and `Separator`, plus React state if needed
- [X] T006 Rewrite the page shell in `app/src/pages/HomePage.tsx` so the reading order is story section, support section, then learning section
- [X] T007 Add mobile-first spacing and width classes in `app/src/pages/HomePage.tsx` so the layout stays readable at `320px`
- [X] T008 Add a single local acknowledgment state and click handler scaffold in `app/src/pages/HomePage.tsx` for the future CTA response
- [X] T009 Remove placeholder copy and any raw content-container usage from `app/src/pages/HomePage.tsx` so the final content can be authored through shadcn/ui primitives

**Checkpoint**: The homepage has the correct single-file structure and is ready for story-specific content.

---

## Phase 3: User Story 1 - First-Time Visitor Understands Joey's Story (Priority: P1) 🎯 MVP

**Goal**: Make Joey's identity, situation, and goals understandable within the first mobile scroll.

**Independent Test**: Open the homepage on a `320px`-wide viewport and confirm the first two visible sections answer who Joey is, what situation he is in, and what he is trying to do.

### Implementation for User Story 1

- [X] T010 [US1] Add Joey's primary heading and calm introduction copy in `app/src/pages/HomePage.tsx`
- [X] T011 [US1] Add a short story label badge and the factual statement about homelessness and about `$3 million` in medical debt in `app/src/pages/HomePage.tsx`
- [X] T012 [US1] Add Joey's two goals as clear, separate pieces of copy in `app/src/pages/HomePage.tsx`: `$600/week` for stability and learning to code for the future
- [X] T013 [US1] Group the story content into a clear first section in `app/src/pages/HomePage.tsx` so it reads correctly for sighted users and screen readers
- [X] T014 [US1] Manually verify the first-scroll story content against `specs/003-homepage/spec.md` using the rendered page from `app/src/pages/HomePage.tsx`

**Checkpoint**: User Story 1 is understandable on its own and can serve as the MVP homepage.

---

## Phase 4: User Story 2 - Visitor Has a Clear Path to Help (Priority: P2)

**Goal**: Show the `$600/week` support need clearly and give visitors one respectful action to take.

**Independent Test**: Starting from the story section, a mobile tester can find the support section, identify the `$600/week` target, and activate the primary button within 30 seconds.

### Implementation for User Story 2

- [X] T015 [US2] Add a dedicated support section in `app/src/pages/HomePage.tsx` that explains what `$600/week` means for Joey right now
- [X] T016 [US2] Add a primary support button in `app/src/pages/HomePage.tsx` with full-width mobile styling and clear button text
- [X] T017 [US2] Connect the support button to the local acknowledgment state in `app/src/pages/HomePage.tsx`
- [X] T018 [US2] Render a graceful in-page acknowledgment message in `app/src/pages/HomePage.tsx` that appears after the button is activated without navigating away
- [X] T019 [US2] Manually verify CTA visibility, tap comfort, and post-click behavior using `specs/003-homepage/quickstart.md` and the rendered page from `app/src/pages/HomePage.tsx`

**Checkpoint**: User Story 2 works independently on top of the story content and gives visitors a clear way to help.

---

## Phase 5: User Story 3 - Joey Can Identify Every Component He Used to Build the Page (Priority: P3)

**Goal**: Keep the page simple enough that Joey can name every visible component family and explain what each one does.

**Independent Test**: Joey can look at the rendered page and list every distinct shadcn/ui component family used, with the list matching the imports in `app/src/pages/HomePage.tsx`.

### Implementation for User Story 3

- [X] T020 [US3] Add a visible learning-anchor section in `app/src/pages/HomePage.tsx` that explains why the component legend is on the page
- [X] T021 [US3] List each visible component family and its one-sentence beginner explanation in `app/src/pages/HomePage.tsx`
- [X] T022 [US3] Trim `app/src/pages/HomePage.tsx` so the final visible UI uses 5 or fewer distinct shadcn/ui component families
- [X] T023 [US3] Cross-check `app/src/pages/HomePage.tsx` so each visible section maps to a named import Joey can point to in code
- [X] T024 [US3] Manually verify the learning anchor against `specs/003-homepage/spec.md` and `specs/003-homepage/contracts/homepage-contract.md`

**Checkpoint**: Joey can identify and explain the components used to build the homepage.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Finish validation, accessibility checks, and deploy-safe cleanup across all stories.

- [X] T025 Run the production build from `app/package.json` with `bun run build` in `app/`
- [X] T026 [P] Run the linter from `app/package.json` with `bun run lint` in `app/`
- [ ] T027 Review the rendered page from `app/src/pages/HomePage.tsx` at `320px` width for no horizontal scrolling and readable spacing
- [X] T028 Review keyboard focus order and screen-reader reading order in `app/src/pages/HomePage.tsx` against `specs/003-homepage/quickstart.md`
- [X] T029 Re-read `specs/003-homepage/quickstart.md` and confirm every acceptance item is satisfied by `app/src/pages/HomePage.tsx`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Starts immediately in the existing `app/` workspace
- **Foundational (Phase 2)**: Depends on Setup and blocks all user-story implementation
- **User Story 1 (Phase 3)**: Depends on Foundational and delivers the MVP
- **User Story 2 (Phase 4)**: Depends on User Story 1's page structure and story content
- **User Story 3 (Phase 5)**: Depends on the final visible sections from User Stories 1 and 2
- **Polish (Phase 6)**: Depends on the desired user stories being complete

### User Story Dependencies

- **US1**: First deliverable after the foundational page shell is ready
- **US2**: Builds on the story page so the support ask has clear context
- **US3**: Finalizes the beginner-learning goal after the visible UI is stable

### Within Each User Story

- Structure before copy polish
- Copy before manual validation
- CTA wiring before CTA acknowledgment checks
- Final component-count cleanup before Joey's learning walkthrough

### Parallel Opportunities

- `T003` and `T004` can run in parallel while preparing `app/`
- `T026` can run separately from manual browser checks after implementation is complete
- Most implementation tasks are intentionally sequential because the feature is self-contained in `app/src/pages/HomePage.tsx`

---

## Parallel Example: Setup And Final Validation

```bash
# Setup preparation
Task: "Install frontend dependencies from app/package.json by running bun install in app/"
Task: "Start the local Vite app from app/package.json by running bun run dev in app/"

# Final validation
Task: "Run the linter from app/package.json with bun run lint in app/"
Task: "Review the rendered page from app/src/pages/HomePage.tsx at 320px width for no horizontal scrolling and readable spacing"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Stop and verify the first mobile scroll before adding the support section

### Incremental Delivery

1. Build the single-file page shell in `app/src/pages/HomePage.tsx`
2. Add Joey's story and verify the MVP
3. Add the support section and acknowledgment behavior
4. Add the learning anchor once the visible UI is stable
5. Finish with build, lint, and manual accessibility checks

### Beginner-Friendly Working Style

1. Keep every edit inside `app/src/pages/HomePage.tsx` unless a real blocker appears
2. Change one section at a time and reload the page after each group of tasks
3. Use the learning anchor to confirm the component count never drifts above five families

---

## Notes

- This task list targets the existing Vite React app in `app/`
- No new routes, APIs, environment variables, or build configuration changes are included
- Contract and data-model details are folded into the page-copy and validation tasks instead of creating separate backend or test work
- The prerequisite helper currently resolves a different active feature from branch context, so this file is intentionally generated from the explicit `specs/003-homepage/` documents requested by the user