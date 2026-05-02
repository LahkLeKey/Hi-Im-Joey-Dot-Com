# Tasks: Interactive Learning Starter

**Input**: Design documents from `/specs/006-interactive-learning-starter/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/lesson-interface.md, quickstart.md

**Tests**: Include targeted tests for each user story to keep each increment independently testable.

**Organization**: Tasks are grouped by phase and by user story (US1-US3) in priority order.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: User story label (`[US1]`, `[US2]`, `[US3]`)
- Every task includes an exact file path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish routing/testing/highlighting primitives and feature file scaffolding.

- [x] T001 Add learning feature implementation notes section in specs/006-interactive-learning-starter/plan.md
- [x] T002 Create lesson route page scaffold in app/src/pages/LearningPage.tsx
- [x] T003 Add lesson data module scaffold in app/src/data/lessons.ts
- [x] T004 [P] Create lessons component folder with starter file stubs in app/src/components/lessons/LessonStarter.tsx
- [x] T005 [P] Add code block visual baseline styles for lesson snippets in app/src/App.css
- [x] T006 Add Vitest + Testing Library scripts/config dependencies in app/package.json
- [x] T007 Create test setup file for DOM matchers in app/src/test/setup.ts
- [x] T008 Create Vite/Vitest test config in app/vite.config.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement shared architecture required by all user stories.

**⚠️ CRITICAL**: Complete this phase before starting user-story implementation.

- [x] T009 Define and export Lesson, Control, ExplanationContent, and LessonIndex interfaces in app/src/data/lessons.ts
- [x] T010 Implement lesson registry helpers (getCurrentLesson/getLessonById/getAllLessons) in app/src/data/lessons.ts
- [x] T011 [P] Implement reusable lesson explanation renderer skeleton in app/src/components/lessons/LessonExplanation.tsx
- [x] T012 [P] Implement reusable syntax-highlighted snippet renderer skeleton in app/src/components/lessons/CodeSnippet.tsx
- [x] T013 [P] Implement reusable interactive output wrapper skeleton in app/src/components/lessons/InteractiveOutput.tsx
- [x] T014 Add React Router root setup and route outlet wiring in app/src/main.tsx
- [x] T015 Define route map with / and /learn paths in app/src/App.tsx

**Checkpoint**: Routing and lesson primitives are ready; all user stories can now proceed.

---

## Phase 3: User Story 1 - Try The Starter Interaction (Priority: P1) 🎯 MVP

**Goal**: Deliver one beginner-friendly, in-page interactive lesson with default/reset behavior.

**Independent Test**: Visit /learn, use the primary control to change visible output, then reset to default without leaving the page.

### Tests for User Story 1

- [x] T016 [P] [US1] Add page-level interaction test for first render and basic control visibility in app/src/pages/__tests__/LearningPage.us1.test.tsx
- [x] T017 [P] [US1] Add component test for badge variant change and repeated interaction stability in app/src/components/lessons/__tests__/BadgeToggleLesson.us1.test.tsx
- [x] T018 [US1] Add component test for reset-to-default behavior in app/src/components/lessons/__tests__/BadgeToggleReset.us1.test.tsx

### Implementation for User Story 1

- [x] T019 [US1] Implement Badge toggle lesson state and controls using useState in app/src/components/lessons/BadgeToggleLesson.tsx
- [x] T020 [US1] Implement default state initialization and reset action in app/src/components/lessons/BadgeToggleLesson.tsx
- [x] T021 [US1] Populate starter lesson metadata/content entry in app/src/data/lessons.ts
- [x] T022 [US1] Compose lesson wrapper to render title, goal, interactive output, and controls in app/src/components/lessons/LessonStarter.tsx
- [x] T023 [US1] Render lesson wrapper on /learn page in app/src/pages/LearningPage.tsx
- [x] T024 [US1] Add navigation affordance to reach /learn from home flow in app/src/pages/HomePage.tsx

**Checkpoint**: US1 is independently functional and testable from /learn.

---

## Phase 4: User Story 2 - Connect Interaction To Code And Concepts (Priority: P2)

**Goal**: Teach component/state/re-render through four-part explanations and matching code snippet.

**Independent Test**: On /learn, verify component name, syntax-highlighted code, and four explanation sections clearly map to interaction behavior.

### Tests for User Story 2

- [x] T025 [P] [US2] Add test for component name and lesson goal visibility in app/src/components/lessons/__tests__/LessonExplanation.us2.test.tsx
- [x] T026 [P] [US2] Add test for required four-part explanation sections in app/src/components/lessons/__tests__/LessonExplanationSections.us2.test.tsx
- [x] T027 [US2] Add test for code snippet content/language/file label rendering in app/src/components/lessons/__tests__/CodeSnippet.us2.test.tsx

### Implementation for User Story 2

- [x] T028 [US2] Implement four-part explanation UI (component/state/re-render/action-result) in app/src/components/lessons/LessonExplanation.tsx
- [x] T029 [US2] Implement syntax-highlighted, read-only code display with language and filename chrome in app/src/components/lessons/CodeSnippet.tsx
- [x] T030 [US2] Add starter lesson code snippet content matching Badge toggle behavior in app/src/data/lessons.ts
- [x] T031 [US2] Integrate explanation and code snippet panels into lesson layout in app/src/components/lessons/LessonStarter.tsx

**Checkpoint**: US2 content is independently readable and maps directly to the live interaction.

---

## Phase 5: User Story 3 - Learn Comfortably On Mobile And With Assistive Tech (Priority: P3)

**Goal**: Ensure keyboard accessibility, screen-reader clarity, and mobile readability.

**Independent Test**: At 375px width and keyboard-only navigation, all controls are reachable with visible focus and updates remain understandable.

### Tests for User Story 3

- [x] T032 [P] [US3] Add keyboard navigation/focus-order test for lesson controls in app/src/components/lessons/__tests__/LessonKeyboard.us3.test.tsx
- [x] T033 [P] [US3] Add accessibility semantics test for labels/roles/live-region text in app/src/components/lessons/__tests__/LessonA11y.us3.test.tsx
- [x] T034 [US3] Add responsive layout test for stacked mobile and expanded desktop structure in app/src/components/lessons/__tests__/LessonResponsive.us3.test.tsx

### Implementation for User Story 3

- [x] T035 [US3] Add keyboard support semantics (button labeling, focus states, logical tab flow) in app/src/components/lessons/BadgeToggleLesson.tsx
- [x] T036 [US3] Add accessible descriptive text and announcement region for state/result updates in app/src/components/lessons/InteractiveOutput.tsx
- [x] T037 [US3] Implement mobile-first responsive layout for interaction/explanation/code sections in app/src/components/lessons/LessonStarter.tsx
- [x] T038 [US3] Add responsive utility styles for code overflow and readable spacing in app/src/App.css

**Checkpoint**: US3 is independently testable for keyboard and mobile usage.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Lock extensibility path, documentation, and deploy confidence.

- [x] T039 [P] Implement extensibility pattern by adding a second lesson scaffold (Color Picker placeholder) in app/src/data/lessons.ts
- [x] T040 [P] Add reusable lesson switch plumbing for future multi-lesson support in app/src/components/lessons/LessonStarter.tsx
- [x] T041 Update contract details to reflect implemented lesson interfaces and extension approach in specs/006-interactive-learning-starter/contracts/lesson-interface.md
- [x] T042 Update quickstart usage, test commands, and second-lesson add flow in specs/006-interactive-learning-starter/quickstart.md
- [x] T043 Run production build verification for learning route and capture expected outcome notes in specs/006-interactive-learning-starter/plan.md
- [x] T044 Verify deployment readiness against existing Vercel flow and record checklist evidence in specs/006-interactive-learning-starter/checklists/requirements.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies.
- **Phase 2 (Foundational)**: Depends on Phase 1; blocks all user stories.
- **Phase 3 (US1)**: Depends on Phase 2.
- **Phase 4 (US2)**: Depends on Phase 2 and integrates with US1 lesson shell.
- **Phase 5 (US3)**: Depends on Phase 2 and validates US1/US2 UI behavior.
- **Phase 6 (Polish)**: Depends on completion of desired user stories.

### User Story Dependencies

- **US1 (P1)**: First shippable MVP once complete.
- **US2 (P2)**: Requires US1 interactive lesson context but remains independently testable via content checks.
- **US3 (P3)**: Validates accessibility/responsiveness of the existing lesson; independently testable through viewport/keyboard criteria.

### Within Each User Story

- Story tests first (or in parallel where marked [P])
- Core component/data implementation next
- Page integration and flow completion last

---

## Parallel Opportunities

- **Setup**: T004, T005, T006 can run concurrently after T001-T003.
- **Foundational**: T011, T012, T013 can run concurrently after T009/T010.
- **US1**: T016 and T017 can run in parallel before T019-T024.
- **US2**: T025 and T026 can run in parallel before T028-T031.
- **US3**: T032 and T033 can run in parallel before T035-T038.
- **Polish**: T039 and T040 can run in parallel before docs verification tasks.

---

## Parallel Example: User Story 1

- Run T016 and T017 together because they touch different test files.
- Run T019 and T021 in parallel after tests are drafted (component logic vs lesson data entry).

## Parallel Example: User Story 2

- Run T025 and T026 together for explanation coverage.
- Run T029 and T030 in parallel (renderer implementation vs lesson snippet source).

## Parallel Example: User Story 3

- Run T032 and T033 together (keyboard and a11y semantics checks).
- Run T037 and T038 together (component layout and shared styles).

---

## Implementation Strategy

### MVP First (US1)

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1).
3. Validate /learn interaction loop and reset behavior.
4. Ship MVP if stable.

### Incremental Delivery

1. Add US2 learning explanation and code literacy layer.
2. Add US3 accessibility/mobile hardening.
3. Finish Polish phase for extensibility and deployment confidence.

### Validation Gates

- **Gate A (After US1)**: Interaction works, reset works, /learn route reachable.
- **Gate B (After US2)**: Four-part explanation + syntax-highlighted snippet accurate.
- **Gate C (After US3)**: Keyboard and mobile criteria satisfied.
- **Gate D (Final)**: Build and deployment verification completed/documented.
