# Tasks: React Scaffold Completion

**Input**: Design documents from `/specs/002-react-scaffold-completion/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No automated test suite was explicitly requested in the feature spec; this task list uses beginner-friendly manual acceptance checks tied to each user story.

**Organization**: Tasks are grouped by user story so each story can be implemented and verified independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Every task includes a concrete file path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Capture baseline and prepare docs/tasks scaffolding for beginner-safe implementation.

- [x] T001 Document feature baseline and required artifacts in specs/002-react-scaffold-completion/tasks.md
- [x] T002 [P] Verify current scaffold entry files exist and are tracked in app/src/pages/HomePage.tsx and app/src/components/ui/button.tsx
- [x] T003 [P] Verify both workspace files are present and parse as JSON in For Joey.code-workspace and Hi-Im-Joey-Dot-Com.code-workspace

Setup baseline notes (2026-05-02):
- Verified baseline files exist at the expected paths.
- Workspace JSON parse checks passed for both workspace files.
- Git status currently reports `app/src/pages/HomePage.tsx` and `app/src/components/ui/button.tsx` as untracked in this working tree.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Add guardrails that block folder-boundary and workspace-drift regressions before story work.

**CRITICAL**: Complete this phase before implementing user stories.

- [x] T004 Create boundary validator script for pages vs reusable UI placement in app/scripts/validate-scaffold-boundaries.mjs
- [x] T005 Create workspace consistency validator script for Joey vs full workspace views in app/scripts/validate-workspace-views.mjs
- [x] T006 Add validation scripts to npm task runner in app/package.json
- [x] T007 Add beginner usage notes for the new validation scripts in app/README.md

**Checkpoint**: Foundation ready. User story work can begin.

---

## Phase 3: User Story 1 - Build Features with a Clear Beginner Structure (Priority: P1) 🎯 MVP

**Goal**: Enforce the page/UI folder boundary and make the composition workflow obvious in source code.

**Independent Test**: A beginner can place files correctly by rule, compose a page from shared UI, and run structure validation successfully.

### Implementation for User Story 1

- [x] T008 [US1] Refine the canonical page composition example to import shared UI from components/ui in app/src/pages/HomePage.tsx
- [x] T009 [P] [US1] Add a beginner-facing composition example page using the same pattern in app/src/pages/AboutPage.tsx
- [x] T010 [US1] Ensure reusable primitives remain page-agnostic in app/src/components/ui/button.tsx
- [x] T011 [P] [US1] Ensure reusable primitives remain page-agnostic in app/src/components/ui/badge.tsx
- [x] T012 [US1] Document strict boundary rules directly in codebase guidance comments in app/scripts/validate-scaffold-boundaries.mjs
- [x] T013 [US1] Run and record manual acceptance for boundary enforcement from app/ in specs/002-react-scaffold-completion/quickstart.md

**Checkpoint**: User Story 1 is complete and independently testable.

---

## Phase 4: User Story 2 - Verify Local Development and Build Basics (Priority: P1)

**Goal**: Keep run/build flow explicit from app/ and confirm the scaffold remains healthy after structure updates.

**Independent Test**: From app/, `bun run dev` and `bun run build` both succeed after page/UI structure changes.

### Implementation for User Story 2

- [x] T014 [US2] Add explicit command-location callouts for local checks in app/README.md
- [x] T015 [US2] Add root-level pointer to run/build from app/ in README.md
- [x] T016 [US2] Add quick validation command block for dev/build plus scaffold checks in app/README.md
- [x] T017 [US2] Run manual dev startup acceptance from app/ and capture result notes in specs/002-react-scaffold-completion/quickstart.md
- [x] T018 [US2] Run manual production build acceptance from app/ and capture result notes in specs/002-react-scaffold-completion/quickstart.md

**Checkpoint**: User Story 2 is complete and independently testable.

---

## Phase 5: User Story 3 - Follow Beginner-Friendly Project Instructions (Priority: P2)

**Goal**: Provide explicit beginner instructions for where to work, what to run, and how to extend safely.

**Independent Test**: A new contributor can follow README-only guidance to add/edit a page and verify dev/build without external help.

### Implementation for User Story 3

- [x] T019 [US3] Replace template boilerplate with beginner scaffold guidance in app/README.md
- [x] T020 [US3] Add a minimal page composition walkthrough with exact file targets in app/README.md
- [x] T021 [US3] Add placement decision table for page module vs UI component module in app/README.md
- [x] T022 [US3] Add repository-level onboarding section that links app instructions and workspace choices in README.md

**Checkpoint**: User Story 3 is complete and independently testable.

---

## Phase 6: User Story 4 - Work in Audience-Specific VS Code Views (Priority: P2)

**Goal**: Keep learner and maintainer workspace views synchronized and consistent.

**Independent Test**: Opening each workspace file shows the intended explorer scope without manual folder toggling.

### Implementation for User Story 4

- [x] T023 [US4] Confirm Joey-focused folder scope remains UI/pages only in For Joey.code-workspace
- [x] T024 [US4] Confirm full monorepo scope remains comprehensive and still includes Joey folders in Hi-Im-Joey-Dot-Com.code-workspace
- [x] T025 [US4] Add synchronization guidance so both workspace files are updated together in README.md
- [x] T026 [US4] Add workspace consistency verification step to feature quickstart in specs/002-react-scaffold-completion/quickstart.md

**Checkpoint**: User Story 4 is complete and independently testable.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final consistency sweep across stories and deployability guardrails.

- [x] T027 [P] Re-run boundary and workspace validators and update guidance if needed in app/scripts/validate-scaffold-boundaries.mjs
- [x] T028 [P] Re-run boundary and workspace validators and update guidance if needed in app/scripts/validate-workspace-views.mjs
- [x] T029 Validate quickstart sequence end-to-end and align wording across docs in specs/002-react-scaffold-completion/quickstart.md
- [x] T030 Confirm no runtime/dependency drift was introduced (Vercel-safe scope) in app/package.json

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Starts immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 and blocks all story implementation.
- **User Story Phases (Phase 3-6)**: Depend on Phase 2 completion.
- **Polish (Phase 7)**: Depends on completion of all selected user stories.

### User Story Dependencies

- **US1 (P1)**: Starts after Foundational. No dependency on other stories.
- **US2 (P1)**: Starts after Foundational. Can run in parallel with US1; validate after US1 file updates land.
- **US3 (P2)**: Starts after Foundational; depends on settled command and structure decisions from US1/US2.
- **US4 (P2)**: Starts after Foundational; can run parallel to US3.

### Dependency Graph (Story Order)

- Foundational -> US1
- Foundational -> US2
- US1 -> US3
- US2 -> US3
- Foundational -> US4
- US3 -> Polish
- US4 -> Polish

---

## Parallel Execution Examples

### User Story 1

- Run `T009` and `T011` in parallel (different files: app/src/pages/AboutPage.tsx and app/src/components/ui/badge.tsx).

### User Story 2

- Run `T015` and `T017` in parallel initially, then finalize after `T014` is merged.

### User Story 3

- Run `T020` and `T022` in parallel (different README files: app/README.md and README.md).

### User Story 4

- Run `T023` and `T024` in parallel (different workspace files).

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1) only.
3. Validate US1 independently using boundary checks and quickstart notes.
4. Demo MVP before moving to documentation and workspace refinements.

### Incremental Delivery

1. Ship US1 + US2 for runnable scaffold confidence.
2. Ship US3 to lock in beginner onboarding quality.
3. Ship US4 to finalize audience-specific workspace consistency.
4. Run Phase 7 polish checks and close feature.

### Beginner-Friendly Execution Notes

- Keep commits small and phase-aligned.
- Always run commands from `app/` when validating app behavior.
- Treat folder-boundary and workspace sync checks as non-optional before merge.
