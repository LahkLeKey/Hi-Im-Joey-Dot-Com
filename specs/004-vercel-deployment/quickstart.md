# Quickstart: Vercel Deployment

## Goal

Connect the existing app in `app/` to Vercel, publish the first live site, and confirm later pushes to `main` deploy automatically.

## Before You Start

1. Make sure the GitHub repository is pushed and accessible from the Vercel account you will use.
2. Make sure Bun is installed locally.
3. From `app/`, run `bun install` if dependencies are not already installed.
4. From `app/`, run `bun run build` and confirm it succeeds before opening Vercel.

## First-Time Vercel Setup

1. Open `https://vercel.com/new`.
2. Sign in with the GitHub account that can access this repository.
3. Choose this repository from the import list.
4. In the project configuration screen, set or confirm these values:
   - Framework Preset: `Vite`
   - Root Directory: `app`
   - Build Command: `bun run build`
   - Output Directory: `dist`
   - Install Command: leave the detected default if Bun is recognized; otherwise set `bun install`
   - Production Branch: `main`
5. Do not add any environment variables.
6. Click **Deploy**.

## Verify the First Deployment

1. Wait for the Vercel deployment status to change to `Ready`.
2. Open the generated `*.vercel.app` URL.
3. Confirm the homepage loads fully and assets are not broken.
4. Open browser devtools and confirm there are no obvious console errors on page load.

## Verify Automatic Deploys on `main`

1. Make a small visible change in the app, such as editing homepage text.
2. Push that change to `main`.
3. Open the Vercel dashboard and confirm a new production deployment starts automatically.
4. Wait for the deployment to finish with status `Ready`.
5. Refresh the live URL and confirm the visible change appears.

## If Something Goes Wrong

1. If Vercel builds from the wrong folder, re-open project settings and confirm Root Directory is `app`.
2. If Vercel serves a blank or broken site, confirm Output Directory is `dist`.
3. If Bun is not detected automatically, set Install Command to `bun install` and Build Command to `bun run build`.
4. If a production build fails after a push, confirm the older live deployment still works while you fix the failing commit.