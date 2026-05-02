# Research: Vercel Deployment

## Decision 1: Use Vercel's GitHub import flow with `app/` as the root directory

- **Decision**: Import the repository through Vercel and set the project Root Directory to `app/`.
- **Rationale**: The actual Vite app already lives in `app/`. Pointing Vercel at that folder avoids monorepo wrappers, duplicate package manifests, or extra build scripts.
- **Alternatives considered**:
  - Deploy from the repository root: rejected because the root does not contain the runnable frontend package.
  - Restructure the repo so the app lives at root: rejected because it adds unnecessary churn unrelated to deployment.

## Decision 2: Prefer dashboard-managed settings over a committed `vercel.json`

- **Decision**: Configure the first deployment in the Vercel dashboard and document the exact values: Framework Preset `Vite`, Root Directory `app`, Build Command `bun run build`, Output Directory `dist`, Production Branch `main`.
- **Rationale**: This is the simplest beginner path and matches the feature requirement to explain how a new Vercel user can complete setup from scratch. The repo currently has no `vercel.json`, and one is not required for a single static Vite app.
- **Alternatives considered**:
  - Add `vercel.json` immediately: rejected because it hides important beginner learning inside config and duplicates settings already managed by Vercel.
  - Use zero explicit settings and trust full auto-detection: rejected because the monorepo subfolder layout makes `app/` and `dist` important enough to document precisely.

## Decision 3: Treat Bun as the expected package manager, but document manual command fallback

- **Decision**: Assume Vercel can infer Bun from `app/bun.lock`; if it does not, enter `bun install` as the Install Command and `bun run build` as the Build Command during setup.
- **Rationale**: The app is already managed with Bun locally, and the lockfile exists in the deployment root. A documented fallback keeps the plan robust without forcing extra repo config.
- **Alternatives considered**:
  - Switch deployment to npm for Vercel only: rejected because it introduces needless tool divergence for beginners.
  - Commit a package-manager override before testing dashboard defaults: rejected because the simpler path should be tried first.

## Decision 4: Verification must cover both the first deploy and future push-triggered deploys

- **Decision**: Validate with four checks: local `bun run build`, first Vercel deploy status `Ready`, live `*.vercel.app` smoke test, and a follow-up push to `main` that triggers and publishes an automatic production deploy.
- **Rationale**: The spec requires proof that the site works now and stays automatically deployable later.
- **Alternatives considered**:
  - Verify only the first deploy: rejected because it does not prove automatic deploys.
  - Verify only dashboard logs: rejected because the live URL still needs an end-user smoke test.

## Decision 5: Repository-side changes should focus on README clarity, not new runtime code

- **Decision**: Update the main `README.md` with a beginner-friendly deployment section that includes the Vercel import path, required settings, expected live URL outcome, and how to confirm auto-deploys on `main`.
- **Rationale**: Documentation is a direct spec requirement and the lowest-risk way to make the setup repeatable.
- **Alternatives considered**:
  - Document deployment only inside spec files: rejected because contributors need the instructions in the main repo README.
  - Add runtime banners or in-app deployment status UI: rejected because it does not help with initial project setup.