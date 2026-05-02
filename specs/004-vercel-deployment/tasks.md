# Tasks: Vercel Deployment

**Input**: Design documents from `/specs/004-vercel-deployment/`
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `quickstart.md`, `contracts/vercel-deployment-contract.md`

**Tests**: Automated tests are not required for this feature. Validation is the local `bun run build` check in `app/`, manual Vercel dashboard verification, live URL smoke testing, and a push-to-`main` deployment check.

**Organization**: Tasks are grouped by user story so the first deploy, automatic deploys, and documentation can each be completed and verified in order.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no incomplete-task dependency)
- **[Story]**: Which user story this task belongs to (for example `US1`, `US2`, `US3`)
- Every task includes an exact file path or working location reference

## Path Conventions

- Repo-side deployment guidance lives in `README.md`
- Build inputs and deploy assumptions live in `app/package.json`, `app/bun.lock`, and `app/vite.config.ts`
- A visible auto-deploy smoke change should use `app/src/pages/HomePage.tsx`
- Manual operator checks come from `specs/004-vercel-deployment/quickstart.md` and `specs/004-vercel-deployment/contracts/vercel-deployment-contract.md`
- Any committed Vercel fallback config must stay minimal and live in `app/vercel.json`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the feature scope, current app assumptions, and baseline local build before touching Vercel.

- [ ] T001 Review `specs/004-vercel-deployment/spec.md`, `specs/004-vercel-deployment/plan.md`, `specs/004-vercel-deployment/research.md`, `specs/004-vercel-deployment/quickstart.md`, and `specs/004-vercel-deployment/contracts/vercel-deployment-contract.md`
- [ ] T002 Inspect the current deployment guidance in `README.md` and note every place it must change to match `app/package.json`, `app/bun.lock`, and `app/vite.config.ts`
- [ ] T003 [P] Install dependencies from `app/package.json` by running `bun install` in `app/`
- [ ] T004 [P] Verify the baseline production build from `app/package.json` by running `bun run build` in `app/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the canonical deployment source of truth and the boundary between repo-side work and manual Vercel steps.

**⚠️ CRITICAL**: Finish this phase before manual Vercel setup so the operator instructions and fallback rules are stable.

- [ ] T005 Confirm `app/package.json`, `app/bun.lock`, and `app/vite.config.ts` already support the required Vercel build with no environment variables and no custom domain assumptions
- [ ] T006 Replace the generic deployment section in `README.md` with a deployment outline that reserves space for prerequisites, dashboard settings, first-deploy verification, auto-deploy verification, and troubleshooting
- [ ] T007 Define the config boundary in `README.md`: prefer Vercel dashboard settings first and only add `app/vercel.json` if the dashboard flow cannot reproduce a stable build

**Checkpoint**: The repo now has one clear source of truth for what will be done in code versus manually in Vercel.

---

## Phase 3: User Story 1 - First-Time Vercel Deployment (Priority: P1) 🎯 MVP

**Goal**: Connect the repo to Vercel for the first time and get a working public production URL.

**Independent Test**: Import the repo into Vercel, complete the first production deploy, and confirm the generated `*.vercel.app` URL loads the homepage correctly.

### Implementation for User Story 1

#### Repo-side preparation

- [ ] T008 [US1] Update the setup portion of `README.md` with the exact required Vercel values from `specs/004-vercel-deployment/contracts/vercel-deployment-contract.md` before the first manual deploy

#### Manual Vercel dashboard steps

- [ ] T009 [US1] Manual Vercel dashboard: import the GitHub repository at `vercel.com/new` using `app/package.json` and `app/bun.lock`, then confirm the project root is set to `app/`
- [ ] T010 [US1] Manual Vercel dashboard: confirm Framework Preset `Vite`, Build Command `bun run build`, Output Directory `dist`, Production Branch `main`, and set Install Command `bun install` only if `app/bun.lock` is not auto-detected
- [ ] T011 [US1] Manual Vercel dashboard: run the first production deployment, wait for status `Ready`, and capture the assigned `*.vercel.app` URL for later documentation in `README.md`
- [ ] T012 [US1] Manual browser verification: open the production URL and confirm the homepage from `app/src/pages/HomePage.tsx` loads without blank content, broken assets, or obvious console errors by following `specs/004-vercel-deployment/quickstart.md`
- [ ] T013 [US1] Conditional repo-side fallback: if the first deploy cannot be reproduced with dashboard settings alone, add the smallest possible override in `app/vercel.json` and explain the reason in `README.md`

**Checkpoint**: The site is live on Vercel and User Story 1 can be validated independently.

---

## Phase 4: User Story 2 - Automatic Deploys on Push to Main (Priority: P2)

**Goal**: Prove that pushing to `main` triggers a new production deployment without manual dashboard actions.

**Independent Test**: Push a small visible change to `main`, watch Vercel create a new production deploy automatically, and confirm the live URL updates.

### Implementation for User Story 2

#### Repo-side preparation

- [ ] T014 [US2] Add a small visible verification change in `app/src/pages/HomePage.tsx` that is safe to push to `main` and easy to remove after deployment proof

#### Manual GitHub + Vercel verification

- [ ] T015 [US2] Manual GitHub and Vercel flow: push the `app/src/pages/HomePage.tsx` verification change to `main` and confirm the Vercel dashboard starts a new production deployment automatically
- [ ] T016 [US2] Manual browser verification: wait for the new production deploy to reach `Ready`, then refresh the live `*.vercel.app` URL and confirm the visible change from `app/src/pages/HomePage.tsx` appears
- [ ] T017 [US2] Repo-side cleanup: revert or replace the temporary verification marker in `app/src/pages/HomePage.tsx` once automatic production deployment behavior is confirmed
- [ ] T018 [US2] Manual rollback verification: if a production build fails during this feature or a deliberate safe test is performed, confirm in Vercel that the previous `Ready` deployment remains live and record the observed fallback behavior in `README.md`

**Checkpoint**: Automatic production deploys on `main` are proven and the live site updates without manual redeploys.

---

## Phase 5: User Story 3 - Beginner-Friendly Deployment Documentation (Priority: P3)

**Goal**: Make the README good enough that a first-time Vercel user can repeat the setup without outside help.

**Independent Test**: Follow the README deployment section from a fresh context and confirm it describes the complete setup and verification flow accurately.

### Implementation for User Story 3

- [ ] T019 [US3] Rewrite the Deployment section in `README.md` with plain-language steps for `vercel.com/new`, repository import, Root Directory `app`, Output Directory `dist`, Build Command `bun run build`, optional Install Command `bun install`, and Production Branch `main`
- [ ] T020 [US3] Add a beginner-friendly verification checklist and troubleshooting notes in `README.md` for first deploy `Ready` status, live URL smoke testing, automatic deploys on `main`, failed-build fallback, Hobby tier usage, and no custom domain
- [ ] T021 [US3] Review `README.md` in rendered Markdown form and fix headings, list order, and code formatting so the deployment instructions are easy to follow on GitHub

**Checkpoint**: Documentation alone is sufficient for a new contributor to reproduce the deployment flow.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Finish final validation and confirm the committed instructions still match the verified deployment.

- [ ] T022 Run the final production build from `app/package.json` with `bun run build` in `app/` after any repo-side changes to `README.md` or `app/vercel.json`
- [ ] T023 [P] Re-run the acceptance checklist in `specs/004-vercel-deployment/quickstart.md` against `README.md`, `app/package.json`, `app/vite.config.ts`, and the live Vercel project
- [ ] T024 [P] Compare `README.md` with `specs/004-vercel-deployment/contracts/vercel-deployment-contract.md` and `specs/004-vercel-deployment/spec.md` to confirm the final instructions still match the verified dashboard configuration

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Starts immediately and establishes local build confidence
- **Foundational (Phase 2)**: Depends on Setup and blocks manual Vercel work until repo-side guidance is aligned
- **User Story 1 (Phase 3)**: Depends on Foundational and delivers the MVP live deployment
- **User Story 2 (Phase 4)**: Depends on User Story 1 because automatic deploys require an existing connected Vercel project
- **User Story 3 (Phase 5)**: Depends on User Story 1 and should finish after User Story 2 so the README can document both first deploy and push-to-`main` verification accurately
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **US1**: First deliverable after the deployment source of truth is established
- **US2**: Requires the connected Vercel project and production URL from US1
- **US3**: Can draft after US1, but final wording should wait until US2 proves the automatic deploy flow

### Within Each User Story

- Repo-side guidance before manual dashboard work
- First deploy before live URL verification
- Visible smoke change before push-to-`main` validation
- Verified behavior before final README wording

### Parallel Opportunities

- `T003` and `T004` can run in parallel while preparing the local `app/` workspace
- `T023` and `T024` can run in parallel after the README and any fallback config are complete
- Most story tasks are intentionally sequential because this feature depends on one real Vercel project state

---

## Parallel Example: Local Setup And Final Validation

```bash
# Local preparation
Task: "Install dependencies from app/package.json by running bun install in app/"
Task: "Verify the baseline production build from app/package.json by running bun run build in app/"

# Final validation
Task: "Re-run the acceptance checklist in specs/004-vercel-deployment/quickstart.md against README.md, app/package.json, app/vite.config.ts, and the live Vercel project"
Task: "Compare README.md with specs/004-vercel-deployment/contracts/vercel-deployment-contract.md and specs/004-vercel-deployment/spec.md to confirm the final instructions still match the verified dashboard configuration"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational alignment
3. Complete Phase 3: User Story 1
4. Stop and verify the first live `*.vercel.app` deployment before touching auto-deploy proof or final docs

### Incremental Delivery

1. Establish the repo-side deployment source of truth in `README.md`
2. Connect and verify the first Vercel production deployment
3. Prove push-to-`main` auto-deploy behavior with a controlled visible change
4. Finalize beginner-facing documentation only after the flow is verified end to end
5. Finish with build and checklist validation

### Manual-First Vercel Strategy

1. Use the Vercel dashboard as the primary configuration surface
2. Keep repo changes focused on `README.md` unless the dashboard path fails
3. Add `app/vercel.json` only as a minimal fallback for reproducibility

---

## Notes

- Manual operator steps are explicitly labeled `Manual Vercel dashboard`, `Manual GitHub and Vercel flow`, or `Manual browser verification`
- Repo-side tasks are separated so contributors can see which work happens in files versus in the Vercel UI
- This feature intentionally avoids new runtime code outside the temporary smoke-check change in `app/src/pages/HomePage.tsx`
- The prerequisite helper resolved a different active feature from branch context, so this task list is intentionally generated from the explicit `specs/004-vercel-deployment/` documents requested by the user