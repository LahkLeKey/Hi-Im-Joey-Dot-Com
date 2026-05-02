# Research: Homepage

## Decision 1: Keep the feature entirely inside `HomePage.tsx`
- Decision: Implement the homepage as one self-contained page in `app/src/pages/HomePage.tsx` with no new route files, helper modules, or service layers.
- Rationale: The spec explicitly requires self-containment, and one file is the easiest format for Joey to read top-to-bottom and understand.
- Alternatives considered: Splitting the page into feature-specific child components was rejected because it adds file-hopping overhead before Joey has a stable beginner mental model.

## Decision 2: Use a tiny existing shadcn/ui component set
- Decision: Build the visible page from the existing `Card`, `Badge`, `Button`, and `Separator` primitives, using `CardHeader`, `CardTitle`, `CardDescription`, and `CardContent` as part of the same card family.
- Rationale: These components are already installed, visually recognizable, and keep the distinct component count under the spec's learnability limit.
- Alternatives considered: Adding dialogs, drawers, toasts, or popovers was rejected because they introduce extra concepts and are unnecessary for a first public page.

## Decision 3: Use one local acknowledgment interaction instead of external wiring
- Decision: The support button should trigger a small in-page acknowledgment state change rather than navigation or payment integration.
- Rationale: This satisfies the graceful interaction requirement while keeping the feature Vercel-safe and beginner-friendly.
- Alternatives considered: Linking to an external donation service or opening a modal was rejected because those add scope, configuration risk, and cognitive load.

## Decision 4: Make the learning anchor visible, not hidden
- Decision: Include a visible beginner-facing section on the page that lists the component names Joey used and what each one does.
- Rationale: A visible legend supports Constitution Principle I more directly than hiding the learning help behind a tooltip or secondary interaction.
- Alternatives considered: A tooltip-only explanation was rejected because it is easier to miss on mobile and harder to discover for first-time learners.

## Decision 5: Validate with existing build flow plus manual accessibility checks
- Decision: Keep validation to the existing `app/` workflow: run `bun run build`, optionally `bun run lint`, and manually verify mobile readability, focus order, and CTA behavior.
- Rationale: The app already has a clear Vite build path, and this feature does not justify new test tooling.
- Alternatives considered: Adding automated UI or Lighthouse test infrastructure was rejected because it expands tooling instead of the page itself.