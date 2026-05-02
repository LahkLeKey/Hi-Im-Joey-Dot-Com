# Data Model: Vercel Deployment

## Entity: DeploymentConfiguration

- **Purpose**: Captures the Vercel settings that must match the existing app structure.
- **Fields**:
  - `projectName`: human-readable Vercel project name
  - `repository`: GitHub repository connected to Vercel
  - `rootDirectory`: must equal `app`
  - `frameworkPreset`: expected to be `Vite`
  - `installCommand`: expected `bun install` when manual override is needed
  - `buildCommand`: expected `bun run build`
  - `outputDirectory`: must equal `dist`
  - `productionBranch`: must equal `main`
  - `environmentVariablesRequired`: boolean, must remain `false`
- **Validation Rules**:
  - `rootDirectory` must point to the folder that contains `package.json` and `bun.lock`.
  - `outputDirectory` must match the Vite production output folder.
  - `productionBranch` must be `main` to satisfy automatic production deploy requirements.
  - `environmentVariablesRequired` must stay `false` for this feature.

## Entity: DeploymentRun

- **Purpose**: Represents a single Vercel deployment attempt.
- **Fields**:
  - `trigger`: `initial-import` or `push-to-main`
  - `status`: `building`, `ready`, or `error`
  - `commitRef`: Git commit or branch ref associated with the deploy
  - `deploymentUrl`: Vercel-provided `*.vercel.app` URL
  - `startedAt`: timestamp
  - `completedAt`: timestamp
- **Validation Rules**:
  - Successful runs must end with `status = ready`.
  - Failed runs must not replace the previously ready production deployment.
  - `deploymentUrl` must resolve publicly for successful production runs.
- **State Transitions**:
  - `building -> ready`
  - `building -> error`

## Entity: DeploymentGuide

- **Purpose**: Represents the beginner-facing instructions stored in the repository documentation.
- **Fields**:
  - `location`: README section path
  - `audience`: beginner contributor or site owner
  - `steps`: ordered deployment setup instructions
  - `verificationChecklist`: ordered checks after setup
  - `fallbackNotes`: optional notes for Bun command overrides or failed builds
- **Validation Rules**:
  - Must mention `vercel.com/new` or equivalent import navigation.
  - Must mention `app/` as root and `dist` as output.
  - Must explain how to verify both initial deployment and future pushes to `main`.
  - Must remain plain-language and jargon-light.