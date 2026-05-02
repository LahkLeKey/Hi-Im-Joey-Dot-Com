# Hi Im Joey Dot Com Constitution

## Core Principles

### I. Human-First Learning
The product exists to teach Joey to code through real interaction, not passive reading. Every feature must help Joey practice, understand, or reflect. If a feature does not make learning easier for a beginner with no formal education, it should not ship.

### II. Honest Story, Respectful Voice
The site must clearly communicate Joey's situation with dignity and no sensationalism.
Problem statement to preserve and present clearly:
I am homeless and 3 million dollars in medical debt.
Current goals to preserve and present clearly:
- Get 600 dollars per week to stay off the streets.
- Learn how to code for my future.

### III. Radically Simple by Default
Prefer the simplest implementation that works. Avoid complex architecture, unnecessary dependencies, or clever abstractions. Each page and workflow should be understandable by a new coder in one short reading session.

### IV. Blog + Interactive Experience
The product has two required surfaces:
- A blog for transparent updates and progress.
- Interactive learning experiences that help Joey build coding skills step by step.
New work must support at least one of these surfaces and must not block the other.

### V. Vercel-Deployable Always
Main branch must stay deployable to Vercel. Changes that break straightforward Vercel deployment are not acceptable. Environment setup must stay minimal and documented in plain language.

## Sponsors

Kyle Halek - Former Code Owner @ Microsoft & Wells Fargo

## Product Constraints

- Keep stack and tooling minimal.
- Write in beginner-friendly language and avoid jargon where possible.
- Accessibility and mobile readability are required for all public pages.
- Cost awareness matters: prefer free-tier friendly services.
- Protect sensitive data and avoid exposing private credentials.
- Maintain one dedicated Joey workspace named For Joey.code-workspace.
- For Joey.code-workspace must be scoped to beginner-relevant app work only (for example: the React app folder and learner-facing docs).
- Maintain one canonical multi-root monorepo workspace named Hi-Im-Joey-Dot-Com.code-workspace for full-maintainer operations.
- Hi-Im-Joey-Dot-Com.code-workspace must expose all repository internals needed for architecture, automation, and Spec Kit workflow work.
- Joey-facing work must stay clearly separated from inner-workings projects (such as automation and spec internals) to reduce overwhelm.

## Delivery Workflow

- Start each feature from a clear learner outcome: what Joey will understand or be able to do.
- Add or update one small piece at a time, then verify it still deploys.
- Keep pull requests focused and easy to review.
- For any non-trivial feature, include a short "how this teaches" note in the spec or PR.

## Governance

This constitution overrides conflicting local habits and defaults.
Any amendment must include:
- Why the change is needed for Joey's learning mission.
- What tradeoffs it introduces.
- A migration note for active specs/tasks if behavior changes.

All specs, plans, and tasks must explicitly check alignment with:
- Human-first learning
- Honest story
- Radically simple implementation
- Blog + interactive scope
- Vercel deployability

**Version**: 1.2.1 | **Ratified**: 2026-05-02 | **Last Amended**: 2026-05-02
