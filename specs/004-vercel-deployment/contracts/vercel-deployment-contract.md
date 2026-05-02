# Contract: Vercel Deployment

## Purpose

Define the exact deployment settings and operator steps required to keep the existing `app/` Vite project deployable on Vercel.

## Repository Inputs

- App root: `app/`
- Package manifest: `app/package.json`
- Package manager lockfile: `app/bun.lock`
- Build output: `app/dist/`
- Frontend build config: `app/vite.config.ts`
- Main documentation target: `README.md`

## Required Vercel Settings

| Setting | Required Value | Notes |
|---------|----------------|-------|
| Git Provider | GitHub | Repository must be connected through Vercel import flow |
| Framework Preset | `Vite` | Accept detected preset if it matches |
| Root Directory | `app` | Mandatory because the frontend is not at repo root |
| Install Command | `bun install` when needed | Optional override if Bun is not auto-detected |
| Build Command | `bun run build` | Runs `tsc -b && vite build` via package scripts |
| Output Directory | `dist` | Relative to `app/` |
| Production Branch | `main` | Required for automatic production deploys |
| Environment Variables | none | This feature must deploy with zero env vars |
| Plan Tier | Hobby | No paid plan required |

## Deployment Guarantees

1. The first successful production deployment must end in Vercel status `Ready`.
2. The site must be reachable at a Vercel-assigned `*.vercel.app` URL.
3. Every push to `main` must trigger a new production deployment automatically.
4. A failed production build must not replace the previously live deployment.

## Documentation Guarantees

1. `README.md` must explain how to import the repo in Vercel.
2. `README.md` must explicitly name `app/` as the root directory.
3. `README.md` must explicitly name `dist` as the output directory.
4. `README.md` must explain how to verify the first live URL and a later auto-deploy.

## Acceptance Checklist

1. Local `bun run build` succeeds from `app/`.
2. Vercel project imports successfully with the required settings.
3. The first production deploy reaches `Ready`.
4. The live URL loads the homepage without broken assets.
5. A later push to `main` automatically publishes a new production deployment.