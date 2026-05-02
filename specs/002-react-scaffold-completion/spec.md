# Feature Specification: React Scaffold Completion

**Feature Branch**: `002-react-scaffold-completion`  
**Created**: 2026-05-02  
**Status**: Draft  
**Input**: User description: "Complete the beginner-friendly React app scaffold after 001 by defining clear pages/ui structure, a minimal page composition pattern, local run/build acceptance scenarios, beginner README updates, Vercel-safe deployability, and two audience-specific VS Code workspace views."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Build Features with a Clear Beginner Structure (Priority: P1)

Joey wants the existing app scaffold to feel understandable and usable for daily progress. Joey should be able to add a new page and reuse UI components without guessing where files belong.

**Why this priority**: A clear structure is the core value of this phase. Without it, beginners hesitate to make changes and the project slows down.

**Independent Test**: A beginner can open the app source, identify where pages and reusable UI live, add one new page file, and render it using the documented pattern without changing project configuration.

**Acceptance Scenarios**:

1. **Given** the repository contains the phase-2 scaffold, **When** Joey opens the app source folders, **Then** Joey can clearly distinguish page-level files from reusable UI files by location and naming.
2. **Given** a new page is needed, **When** Joey creates it using the documented pattern, **Then** the page composes existing UI components in a predictable, repeatable way.
3. **Given** Joey wants to reuse a visual element across pages, **When** Joey checks the UI component folder, **Then** Joey can add or update shared UI there without changing unrelated page files.

---

### User Story 2 - Verify Local Development and Build Basics (Priority: P1)

Joey needs confidence that the scaffold is healthy before adding more features. Joey should be able to run and build the app using straightforward commands.

**Why this priority**: If local run and build are unreliable, every future step is blocked.

**Independent Test**: From a fresh local environment with dependencies installed, Joey runs the documented development and build commands and confirms both complete successfully.

**Acceptance Scenarios**:

1. **Given** dependencies are installed, **When** Joey runs `bun run dev`, **Then** the app starts locally and displays the expected starter experience without setup errors.
2. **Given** the app source follows the documented structure, **When** Joey runs `bun run build`, **Then** the build completes successfully and produces deployable output.
3. **Given** Joey modifies a page using the composition pattern, **When** Joey reruns `bun run build`, **Then** the build still succeeds if the pattern is followed correctly.

---

### User Story 3 - Follow Beginner-Friendly Project Instructions (Priority: P2)

Joey needs README guidance that explains where to work, which commands to run, and how to extend the scaffold safely.

**Why this priority**: Strong beginner documentation reduces confusion and prevents accidental project drift.

**Independent Test**: A new contributor with basic terminal knowledge can follow README steps and complete local run/build plus a simple page edit without external help.

**Acceptance Scenarios**:

1. **Given** a new contributor opens the repository README, **When** they follow the setup and run steps, **Then** they can start the project successfully.
2. **Given** the contributor wants to create or edit a page, **When** they use the README’s structure guidance, **Then** they place files in the correct folders and use the documented composition pattern.
3. **Given** the contributor wants to verify their change before sharing, **When** they follow the README validation steps, **Then** they run both local dev and build checks successfully.

---

### User Story 4 - Work in Audience-Specific VS Code Views (Priority: P2)

The project maintainers need two workspace views: one simplified view for Joey focused on UI/page work, and one complete monorepo view for broader maintenance.

**Why this priority**: Audience-specific visibility keeps Joey focused while preserving full control for maintainers.

**Independent Test**: Opening each workspace file presents the intended folder visibility and helps the target audience complete their tasks without unnecessary clutter.

**Acceptance Scenarios**:

1. **Given** the file `For Joey.code-workspace` is opened, **When** the explorer loads, **Then** only UI and Pages-focused folders are shown for day-to-day Joey work.
2. **Given** the file `Hi-Im-Joey-Dot-Com.code-workspace` is opened, **When** the explorer loads, **Then** the full monorepo structure is visible including Joey-oriented folders.
3. **Given** both workspace files are available, **When** the user switches between them, **Then** each view consistently reflects its intended audience without manual folder toggling.

---

### Edge Cases

- What happens if a page file is accidentally placed in the UI component folder? The structure guidance should make the error obvious and direct the user to move it to the pages folder.
- What happens if a reusable UI component contains page-specific logic? The pattern should clarify that page orchestration belongs in pages while UI components remain reusable.
- What happens if README steps are followed but the contributor runs commands from the wrong directory? The documentation should explicitly state where commands must be executed.
- What happens if one workspace file is updated but the other becomes outdated? The phase should define that both workspace views are maintained together during this feature.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The project MUST continue using Vite, React, TypeScript, and shadcn/ui as the established scaffold foundation.
- **FR-002**: The app source MUST use a clear structure where page-level code is organized under `src/pages` and reusable UI components are organized under `src/components/ui`.
- **FR-003**: The project MUST define a minimal page composition pattern that beginners can follow to assemble pages from reusable UI components.
- **FR-004**: The page composition pattern MUST be documented in beginner-friendly language with concrete guidance on where to place new page files and shared UI files.
- **FR-005**: The feature MUST include acceptance coverage for successful local development startup via `bun run dev`.
- **FR-006**: The feature MUST include acceptance coverage for successful production build via `bun run build`.
- **FR-007**: Repository documentation MUST be updated with beginner-friendly instructions for running, building, and extending the page/UI structure safely.
- **FR-008**: The feature MUST preserve Vercel deployability of the app after structure and documentation updates.
- **FR-009**: The project MUST provide and maintain two audience-specific workspace files: `For Joey.code-workspace` and `Hi-Im-Joey-Dot-Com.code-workspace`.
- **FR-010**: `For Joey.code-workspace` MUST present a simplified explorer focused on UI and Pages work only.
- **FR-011**: `Hi-Im-Joey-Dot-Com.code-workspace` MUST present the full monorepo view, including Joey-oriented folders.
- **FR-012**: Scope for this feature MUST remain incremental and limited to structure, pattern, workspace view behavior, and beginner documentation improvements.

### Key Entities

- **Page Module**: A page-level unit in `src/pages` that owns page composition and arranges reusable UI elements.
- **UI Component Module**: A reusable visual unit in `src/components/ui` intended for cross-page usage.
- **Page Composition Pattern**: The documented beginner workflow for assembling a page from reusable UI components.
- **Beginner README Guidance**: Setup and validation instructions that help users run, build, and extend the scaffold safely.
- **Joey Workspace View**: The simplified VS Code workspace intended for focused UI/page work.
- **Full Workspace View**: The complete VS Code workspace intended for full-project maintenance.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A beginner can correctly identify where to create a page versus a reusable UI component within 60 seconds of opening the app source.
- **SC-002**: At least 95% of first-time contributors following README guidance can complete local startup (`bun run dev`) without additional help.
- **SC-003**: At least 95% of first-time contributors following README guidance can complete a successful build (`bun run build`) on their first attempt.
- **SC-004**: Contributors can add one new page using the documented composition pattern in under 10 minutes without modifying project configuration.
- **SC-005**: Both workspace files open with their intended audience-specific scope and require zero manual folder filtering to reach the desired view.
- **SC-006**: Post-update deployment behavior remains unchanged, with successful Vercel deployment from the main project configuration.

## Assumptions

- The existing Vite + React + TypeScript + shadcn/ui setup from feature 001 remains functional and is not being replaced.
- This phase does not introduce advanced routing, authentication, backend integration, or design-system expansion.
- Beginner guidance focuses on common local workflows and does not attempt to teach all framework concepts.
- Workspace-view updates are configuration-level changes intended to improve focus and maintainability, not alter application runtime behavior.
- Vercel deployment settings already in use remain the deployment baseline for this phase.
