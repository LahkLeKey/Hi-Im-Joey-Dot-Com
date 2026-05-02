# Data Model: Homepage

## Entity: Homepage Story Card
- Description: The primary content block that introduces Joey and explains his situation and goals in calm, factual language.
- Required fields:
  - `heading`: Joey's name as the main heading.
  - `situationLabel`: Short badge label that frames the page honestly.
  - `storySummary`: Plain-language description that Joey is homeless and about `$3 million` in medical debt.
  - `goalOne`: Statement about needing `$600/week` to stay off the streets.
  - `goalTwo`: Statement about learning to code for Joey's future.
- Validation rules:
  - All required facts from FR-001 through FR-003 must appear above the fold on a standard mobile layout.
  - Tone must remain direct and respectful.
  - Content must be authored through shadcn/ui page primitives, not raw content containers.

## Entity: Support Call To Action
- Description: A focused section that tells visitors what support target matters right now and provides one primary action.
- Required fields:
  - `supportGoalLabel`: Clear `$600/week` support target.
  - `ctaText`: Primary button text.
  - `acknowledgmentMessage`: Small confirmation or thank-you state shown after activation.
- State transitions:
  - `idle` -> `acknowledged` when the visitor activates the button.
- Validation rules:
  - The button must remain easy to tap on narrow mobile screens.
  - Activation must not navigate away or throw an error.
  - The acknowledgment must be understandable without extra context.

## Entity: Component Learning Anchor
- Description: A visible beginner-facing legend that maps the rendered page to the shadcn/ui components Joey used.
- Required fields:
  - `introLabel`: Short explanation of why the section exists.
  - `componentEntries`: List of component names and one-sentence descriptions.
- Validation rules:
  - The list must cover every visible shadcn/ui component family used on the page.
  - The wording must be simple enough for Joey to repeat back after editing the file.
  - The section must stay visible on mobile without hidden dependency on hover.

## Entity: Homepage Layout Flow
- Description: The reading order of the page from first impression to learning anchor.
- Ordered steps:
  1. Joey identity and honest story.
  2. Immediate goals and support need.
  3. Primary support action with graceful acknowledgment.
  4. Beginner learning anchor explaining the components.
- Validation rules:
  - Screen readers must encounter the same logical order.
  - No section should require backend data, routing context, or asynchronous loading.