# Contract: Beginner Scaffold Structure and Workspace Views

## Status
Draft for feature 002-react-scaffold-completion.

## Purpose
Define the externally visible project contract for contributors so structure and workflows stay consistent.

## Contract 1: Source Structure
- `app/src/pages` is reserved for page modules.
- `app/src/components/ui` is reserved for reusable UI component modules.
- Contributors must not place page modules in `app/src/components/ui`.
- Contributors must not place reusable UI primitives in `app/src/pages`.

## Contract 2: Minimal Page Composition Pattern
- A page module composes UI components by importing from `app/src/components/ui`.
- The pattern must remain copy-paste friendly for beginners.
- No extra framework setup is required to add a page following this pattern.

## Contract 3: Local Validation Commands
- Commands are run from `app/`.
- Required validation commands:
  - `bun run dev`
  - `bun run build`
- README guidance must continue to call out the `app/` directory requirement explicitly.

## Contract 4: Workspace View Consistency
- `For Joey.code-workspace` must expose only Joey-focused UI/pages folders.
- `Hi-Im-Joey-Dot-Com.code-workspace` must expose full monorepo context and include Joey-focused folders.
- Any workspace folder-scope update must be reflected in both workspace files in the same change.

## Contract 5: Deployability Guardrail
- This feature must not introduce build or runtime changes that break Vercel deployment compatibility.
