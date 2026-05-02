# Implementation Plan: Vercel Deployment

**Branch**: `004-vercel-deployment` | **Date**: 2026-05-02 | **Spec**: `/specs/004-vercel-deployment/spec.md`
**Input**: Feature specification from `/specs/004-vercel-deployment/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Connect the existing Vite React app in `app/` to Vercel using `app/` as the project root, `dist` as the output directory, and `main` as the production branch, while keeping repository changes minimal and documenting the full setup in beginner-friendly language. The implementation should favor Vercel dashboard configuration first, backed by small repo-side documentation updates and optional fallback config only if dashboard defaults fail to reproduce the required build.

## Technical Context

**Language/Version**: TypeScript `~6.0`, React `19`  
**Primary Dependencies**: Vite `8`, `@vitejs/plugin-react`, Tailwind CSS `4`, Bun lockfile for package manager detection  
**Storage**: N/A  
**Testing**: Local `bun run build`, manual Vercel dashboard verification, live URL smoke test in browser, push-to-`main` auto-deploy verification  
**Target Platform**: Vercel static hosting for a browser-based frontend  
**Project Type**: Single-page frontend web application in `app/`  
**Performance Goals**: Homepage should load successfully from the public `*.vercel.app` URL within the spec target of 5 seconds on a normal connection  
**Constraints**: Beginner-friendly setup, free Hobby tier only, no environment variables, no custom domain, `app/` must remain the Vercel root, keep main branch straightforward to deploy  
**Scale/Scope**: One Vercel project, one production branch (`main`), one static site build, one README deployment guide

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Human-First Learning**: PASS. The plan centers step-by-step documentation and keeps deployment mechanics understandable for a first-time Vercel user.
- **Honest Story, Respectful Voice**: PASS. Deployment work does not alter the site narrative and supports reliable publishing of Joey's story.
- **Radically Simple by Default**: PASS. The preferred approach uses Vercel's existing GitHub import flow with minimal repo changes.
- **Blog + Interactive Experience**: PASS. Reliable deployment supports both public site surfaces without changing their content model.
- **Vercel-Deployable Always**: PASS. The feature directly improves Vercel deployability and adds explicit verification steps.

No constitution violations identified.

## Project Structure

### Documentation (this feature)

```text
specs/004-vercel-deployment/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── vercel-deployment-contract.md
└── tasks.md             # Created later by /speckit.tasks
```

### Source Code (repository root)

```text
README.md

app/
├── bun.lock
├── package.json
├── vite.config.ts
└── dist/

.github/
└── copilot-instructions.md
```

**Structure Decision**: Keep runtime code changes minimal. The main repository work for this feature is documentation in `README.md` plus optional deployment metadata only if Vercel dashboard settings prove insufficient. Existing build inputs live in `app/package.json`, `app/bun.lock`, and `app/vite.config.ts`; the feature artifacts under `specs/004-vercel-deployment/` document the exact Vercel setup, verification flow, and manual operator steps.

## Post-Design Constitution Check

- **Human-First Learning**: PASS. The quickstart and contract break deployment into small, reproducible steps with plain-language verification.
- **Honest Story, Respectful Voice**: PASS. The design only changes delivery mechanics and avoids any pressure-driven monetization or messaging changes.
- **Radically Simple by Default**: PASS. The design prefers dashboard settings and README guidance over adding extra deployment tooling.
- **Blog + Interactive Experience**: PASS. No surface is blocked; deployment applies to the whole existing frontend.
- **Vercel-Deployable Always**: PASS. The plan explicitly verifies local build parity, Vercel readiness, and failed-build rollback behavior.

No post-design gate violations.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |