# Research: React Scaffold Completion

## Decision 1: Keep a strict two-folder beginner mental model
- Decision: Use `app/src/pages` for page-level orchestration and `app/src/components/ui` for reusable visual units.
- Rationale: New contributors can decide file placement quickly with one simple rule: page composes, UI reuses.
- Alternatives considered: Feature-sliced folders and colocated page+component folders were rejected because they add naming and ownership ambiguity for beginners.

## Decision 2: Use one minimal composition pattern
- Decision: Standardize a simple page pattern where each page imports reusable UI components and composes them directly in one exported React component.
- Rationale: It is easy to teach, easy to copy, and has minimal abstraction overhead.
- Alternatives considered: Shared page layout factories and higher-order composition utilities were rejected because they hide basic React composition from learners.

## Decision 3: Keep local validation command flow explicit and directory-scoped
- Decision: Document run/build from the `app/` directory only, with `bun run dev` and `bun run build` as required checks.
- Rationale: Beginners commonly fail by running commands from the repo root; explicit directory callouts remove that confusion.
- Alternatives considered: Root-level wrapper scripts were rejected for now to avoid additional tooling surface and preserve radical simplicity.

## Decision 4: Treat workspace files as a synchronized pair
- Decision: Maintain `For Joey.code-workspace` as the focused learner view and `Hi-Im-Joey-Dot-Com.code-workspace` as the full maintainer view, and update both together whenever UI/pages scope changes.
- Rationale: This preserves focused learning and maintainability without repeated manual folder filtering.
- Alternatives considered: A single universal workspace was rejected because it either overwhelms beginners or hides critical maintainer internals.

## Decision 5: Preserve deployability by avoiding runtime changes
- Decision: Limit this feature to source organization guidance, docs, and workspace configuration, with no new runtime dependencies.
- Rationale: This is the lowest-risk path for Vercel safety.
- Alternatives considered: Introducing routing or new build plugins was rejected because those are outside this feature scope and add deployment risk.
