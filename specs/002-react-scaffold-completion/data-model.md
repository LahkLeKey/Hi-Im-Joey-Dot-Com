# Data Model: React Scaffold Completion

## Entity: Page Module
- Description: A page-level React module under `app/src/pages`.
- Required fields:
  - `name`: PascalCase component name ending in `Page` for clarity (example: `HomePage`).
  - `filePath`: Must be under `app/src/pages`.
  - `exportsDefault`: Boolean, defaults to `true` for beginner consistency.
  - `composesUiComponents`: List of imported modules from `app/src/components/ui`.
- Validation rules:
  - File MUST live in `app/src/pages`.
  - Module SHOULD focus on composition, not reusable primitive definitions.

## Entity: UI Component Module
- Description: Reusable visual component under `app/src/components/ui`.
- Required fields:
  - `name`: PascalCase component name (example: `Button`, `Badge`).
  - `filePath`: Must be under `app/src/components/ui`.
  - `reusabilityScope`: Expected cross-page use.
- Validation rules:
  - File MUST live in `app/src/components/ui`.
  - Module MUST avoid page-specific orchestration concerns.

## Entity: Page Composition Pattern
- Description: Beginner workflow that assembles a page from reusable UI modules.
- Steps:
  1. Create or edit a page file in `app/src/pages`.
  2. Import reusable components from `app/src/components/ui`.
  3. Return JSX that composes those pieces.
- Validation rules:
  - Pattern MUST be simple enough to copy into a new page without config changes.

## Entity: Beginner README Guidance
- Description: Short instructions that tell contributors where to run commands and where to place files.
- Required fields:
  - `workingDirectory`: `app/`
  - `devCommand`: `bun run dev`
  - `buildCommand`: `bun run build`
  - `placementRules`: page vs UI folder rules
- Validation rules:
  - Instructions MUST explicitly mention command directory.
  - Instructions MUST include run/build validation expectation.

## Entity: Workspace View Configuration
- Description: VS Code workspace definitions for learner and maintainer audiences.
- Sub-entities:
  - `JoeyWorkspaceView`: `For Joey.code-workspace`
  - `FullWorkspaceView`: `Hi-Im-Joey-Dot-Com.code-workspace`
- Validation rules:
  - Joey view MUST include only UI/pages-focused work folders.
  - Full view MUST include monorepo root plus Joey-focused folders and internals.
  - Both workspace files MUST be updated together when view scope changes.
