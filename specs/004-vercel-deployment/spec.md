# Feature Specification: Vercel Deployment

**Feature Branch**: `004-vercel-deployment`
**Created**: 2026-05-02
**Status**: Draft
**Input**: User description: "Connect the GitHub repo to Vercel, configure the Vercel project to use app/ as the root directory (Vite project, output dir dist/), verify the live deployment URL works, set up automatic deploys on push to main, and document the deployment process in beginner-friendly language in the README. No environment variables. Free Hobby tier. No custom domain yet."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - First-Time Vercel Deployment (Priority: P1)

A developer (or the site owner) connects the GitHub repository to Vercel for the first time and confirms the site is live at a public URL. This establishes the deployment pipeline and proves the build works end-to-end in a real hosting environment.

**Why this priority**: The site has never been deployed publicly. Until this story is complete, the project has no live presence and Constitution Principle V (main branch always deployable) cannot be verified.

**Independent Test**: Can be fully tested by visiting the Vercel-assigned URL after the first deploy and confirming the homepage loads correctly. Delivers a publicly accessible live site.

**Acceptance Scenarios**:

1. **Given** the GitHub repository is connected to Vercel with `app/` as the root and `dist` as the output directory, **When** Vercel runs its first production build, **Then** the build completes without errors and the site is reachable at the Vercel-provided URL.
2. **Given** the site is deployed, **When** a visitor opens the Vercel URL in a browser, **Then** the homepage renders completely with no broken assets, blank pages, or console errors.
3. **Given** the first deploy succeeds, **When** the deploy is viewed in the Vercel dashboard, **Then** the deployment status shows as "Ready" (not "Error" or "Building").

---

### User Story 2 - Automatic Deploys on Push to Main (Priority: P2)

After the initial connection is established, every push to the `main` branch automatically triggers a new Vercel production deployment without any manual steps.

**Why this priority**: Manual re-deploys after every code change are error-prone and unsustainable. Automatic deploys are required for Constitution Principle V compliance — the live site must always reflect the latest passing main-branch state.

**Independent Test**: Can be fully tested by pushing a small visible change (e.g., updating a heading) to `main` and confirming the live URL reflects the change within a few minutes.

**Acceptance Scenarios**:

1. **Given** the Vercel project is connected to the GitHub repo, **When** a commit is pushed to `main`, **Then** a new production deployment is automatically triggered in the Vercel dashboard.
2. **Given** a push-triggered deployment runs, **When** it completes successfully, **Then** the live site reflects the change without any manual action in the Vercel dashboard.
3. **Given** a push triggers a build, **When** the build fails (e.g., due to a TypeScript error), **Then** the previous deployment remains live and is not replaced by the failed build.

---

### User Story 3 - Beginner-Friendly Deployment Documentation (Priority: P3)

A developer who has never used Vercel before can read the project README and independently reproduce the full deployment setup from scratch, including connecting the repo and verifying the live URL.

**Why this priority**: Without documentation, the deployment setup exists only as institutional knowledge. Capturing it in the README ensures any contributor (including the site owner) can re-create or audit the deployment at any time.

**Independent Test**: Can be fully tested by following the README instructions in a fresh context (e.g., a different browser/account) and arriving at a working deployed site.

**Acceptance Scenarios**:

1. **Given** the README contains a Deployment section, **When** a reader with no Vercel experience follows it step by step, **Then** they can successfully connect the repo and trigger a first deploy without outside help.
2. **Given** the README deployment section exists, **When** a reader reviews it, **Then** it contains: the Vercel import URL or navigation path, the correct root directory (`app/`), the correct output directory (`dist`), and how to confirm the deployment succeeded.
3. **Given** the README is updated, **When** it is viewed on GitHub, **Then** the deployment section renders correctly with clear headings, steps, and no broken formatting.

---

### Edge Cases

- What happens when a push to `main` contains a build-breaking change? The previous deployment must remain live; the broken build must not replace it.
- What happens if the Vercel build uses a different Node.js version than local development? The build should succeed or the README should note the expected Node version.
- What happens if someone visits the site before the first deploy is complete? Vercel shows a generic "deploying" or 404 page — this is acceptable for the initial setup.
- What happens if the `dist/` output directory is accidentally misconfigured in Vercel? The build would succeed but the site would serve a blank or incorrect page — verified by the acceptance test of Story 1.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The Vercel project MUST be configured with `app/` as the root directory so that Vercel's build process runs inside the correct monorepo subfolder.
- **FR-002**: The Vercel project MUST be configured with `dist` as the output directory so that Vercel serves the correct Vite build artifacts.
- **FR-003**: The Vercel project MUST be linked to the GitHub repository so that Vercel can detect pushes and trigger builds.
- **FR-004**: The Vercel project MUST be configured to automatically deploy the `main` branch to the production environment.
- **FR-005**: The live deployment URL MUST successfully serve the site after the first deploy, with no broken assets or blank pages.
- **FR-006**: No environment variables are required for the initial deployment; the build MUST succeed with no additional configuration beyond root and output directory.
- **FR-007**: The project README MUST include a Deployment section written in plain, beginner-friendly language that documents how to connect the repo to Vercel and verify a successful deployment.
- **FR-008**: The deployment configuration MUST use the Vercel Free Hobby tier with no paid plan required.
- **FR-009**: No custom domain is required; the Vercel-assigned `*.vercel.app` URL is the accepted live URL for this feature.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The site is reachable at a public Vercel-assigned URL and the homepage loads completely within 5 seconds on a standard connection.
- **SC-002**: A push to `main` results in an updated live deployment within 5 minutes, verified by a visible content change appearing at the live URL without any manual steps.
- **SC-003**: The previous production deployment remains live if a build fails — the site is never replaced by a broken build.
- **SC-004**: A developer with no prior Vercel experience can follow the README and complete the deployment setup in under 15 minutes.
- **SC-005**: The Vercel dashboard shows the production deployment status as "Ready" after every successful push to `main`.

## Assumptions

- The GitHub repository is public or the site owner has a Vercel account that can be connected to a private repository on the Free Hobby tier.
- The Vite build (`bun run build` inside `app/`) completes successfully locally before attempting the Vercel deployment — this has already been confirmed.
- Vercel's Free Hobby tier supports automatic GitHub deploys without any paid upgrade.
- The build command is `bun run build` (or `vite build`) executed from within the `app/` root directory; no additional install step configuration is needed beyond what Vercel auto-detects for Node/Bun projects.
- Preview deployments for pull requests (a Vercel default) are acceptable as a bonus behavior; they do not need to be explicitly configured or disabled.
- No server-side rendering, serverless functions, or API routes are required — this is a purely static site deployment.
- The `dist/` output directory name has not been customized in `vite.config.ts` and remains the Vite default.
