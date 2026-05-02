# Feature Specification: Web Project Scaffold

**Feature Branch**: `001-web-project-scaffold`  
**Created**: 2026-05-02  
**Status**: Draft  
**Input**: User description: "Initialize the web project using Bun with React, TypeScript, and shadcn/ui configured, deployable to Vercel."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Developer Runs the Project Locally (Priority: P1)

Joey clones the repository and wants to see the project running on their machine with a single command. They open a terminal, run the start command, and see the default starter page in their browser — confirming the entire local environment is wired up correctly.

**Why this priority**: Without a working local dev server, no further development is possible. This is the foundational check that everything is configured correctly.

**Independent Test**: Can be fully tested by running the dev start command and navigating to `localhost` in a browser. Delivers a visible running application as proof of setup.

**Acceptance Scenarios**:

1. **Given** the repository is cloned and dependencies are installed, **When** Joey runs the dev start command, **Then** the application opens in a browser and shows a styled starter page with no errors.
2. **Given** the application is running locally, **When** Joey inspects the page, **Then** at least one shadcn/ui component (such as a Button) is visible and correctly styled.
3. **Given** the application is running, **When** Joey edits a component file, **Then** the browser refreshes automatically and reflects the change.

---

### User Story 2 - Developer Deploys to Vercel (Priority: P2)

Joey connects the repository to Vercel and deploys the project. They want to share a live URL with others without any manual server configuration — just connect the repo and it works.

**Why this priority**: Vercel deployability is a stated day-one requirement. A broken build pipeline blocks the ability to share or iterate publicly.

**Independent Test**: Can be tested by triggering a Vercel deployment (via the Vercel dashboard or CLI) and confirming the deployment succeeds and the live URL loads the starter page.

**Acceptance Scenarios**:

1. **Given** the repository is connected to Vercel, **When** a deployment is triggered from the main branch, **Then** the build completes without errors and a live URL is produced.
2. **Given** the live URL is opened in a browser, **When** the page loads, **Then** the same styled starter page visible locally is displayed correctly.
3. **Given** a new commit is pushed to the main branch, **When** Vercel auto-deploys, **Then** the updated site is live within a few minutes without manual intervention.

---

### User Story 3 - Developer Adds a New shadcn/ui Component (Priority: P3)

Joey follows the shadcn/ui documentation and adds a new component to the project. This validates that the component library is properly integrated and that Joey can extend the UI without modifying any configuration files.

**Why this priority**: Confirming the component library is usable end-to-end ensures the scaffold is not just present but functional as a starting point for real feature work.

**Independent Test**: Can be tested by following the shadcn/ui add-component command and importing the component into an existing page — no config changes should be needed.

**Acceptance Scenarios**:

1. **Given** the project is set up, **When** Joey runs the shadcn/ui component add command, **Then** the component files are created in the correct folder.
2. **Given** the new component files exist, **When** Joey imports and renders the component in a page, **Then** it displays correctly with proper styles in the browser.
3. **Given** the component is rendered, **When** the project is deployed to Vercel, **Then** the component appears correctly on the live site.

---

### Edge Cases

- What happens when dependencies are installed with a package manager other than Bun? The project should clearly document that Bun is required, and running the start command with another package manager may fail.
- What happens if the Vercel build encounters a TypeScript type error? The build should fail with a clear error message pointing Joey to the problem line.
- What if a shadcn/ui component is added but its required dependency is missing? The component add command should automatically install any required peer packages.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The project MUST use Bun as the package manager and runtime for all local development commands.
- **FR-002**: The project MUST be scaffolded as a Vite application with React and TypeScript enabled (using the `react-ts` template).
- **FR-003**: The project MUST include shadcn/ui installed and configured with at least one example component visible on the starter page.
- **FR-004**: The project MUST include a working local development server that supports hot module replacement (page updates without a full reload when files are changed).
- **FR-005**: The project MUST be deployable to Vercel without any manual build configuration changes — Vercel auto-detects Vite and sets the output directory to `dist` automatically.
- **FR-006**: The project MUST pass a TypeScript check with no errors on the initial scaffold.
- **FR-007**: The project MUST include a `.gitignore` that excludes generated folders, dependency directories, and local environment files from version control.
- **FR-008**: The project README MUST include beginner-friendly instructions for: installing dependencies, starting the local dev server, and deploying to Vercel.
- **FR-009**: The shadcn/ui component library MUST be configured with a default theme so components are visually styled out of the box.
- **FR-010**: The project structure MUST keep configuration files at the root and source files in a clearly named source folder, making it easy for Joey to find where to write code.

### Key Entities

- **Project Root**: The top-level directory containing configuration files (`package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, shadcn config) and the source folder.
- **Source Folder**: The directory where Joey writes all application code — pages, components, and styles.
- **shadcn/ui Components Folder**: A dedicated subfolder within the source folder where shadcn/ui component files are stored and can be customized.
- **Starter Page**: The default landing page shown when the dev server starts, demonstrating at least one working shadcn/ui component.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Joey can go from a fresh clone to a running local dev server in under 5 minutes by following the README instructions alone, with no prior setup knowledge required.
- **SC-002**: The first Vercel deployment succeeds without any manual configuration changes, producing a live URL within 5 minutes of connecting the repository.
- **SC-003**: Adding a new shadcn/ui component takes under 2 minutes following the documented command, with no manual configuration edits required.
- **SC-004**: The initial project passes TypeScript type-checking with zero errors and zero warnings.
- **SC-005**: The starter page loads in a browser in under 3 seconds on a standard home internet connection.
- **SC-006**: 100% of the setup steps in the README are executable by someone with no formal coding education, confirmed by Joey being able to complete them independently.

## Assumptions

- Joey is working on a Mac, Windows, or Linux machine with Bun installed globally before starting.
- The project uses Vite as the build tool and dev server because it is transparent and beginner-friendly — Joey can see exactly what each file does with no hidden framework conventions.
- The default shadcn/ui theme (neutral color palette, standard border radius) is acceptable for the initial scaffold — theme customization is a future concern.
- Tailwind CSS is included as a dependency because shadcn/ui requires it; no additional styling system is needed.
- The starter page is intentionally minimal — its only purpose is to confirm the stack works, not to represent any real application UI.
- No authentication, database, routing beyond a single page, or external APIs are in scope for this scaffold.
- Environment variable handling (`.env.local`) is out of scope for this scaffold; no secrets or runtime config are needed at this stage.
- The Vercel deployment uses the free Hobby tier, which is sufficient for this project at this stage.

## Follow-Up Work *(not in scope here)*

Once the React application is runnable, the VS Code workspace configuration should be revised as a dedicated follow-up spec (`002-workspace-setup`):

- **For Joey**: A simplified `For Joey.code-workspace` scoped to only the files Joey needs to read and edit — primarily the React app source and learner-facing docs. Internal tooling, spec internals, and automation should not be visible.
- **For Kyle**: A consolidated `Hi-Im-Joey-Dot-Com.code-workspace` that is a true full monorepo view — all folders including `.specify`, `.github`, and the React app source.

This split cannot be done meaningfully until the React app folder exists as a real workspace root.
