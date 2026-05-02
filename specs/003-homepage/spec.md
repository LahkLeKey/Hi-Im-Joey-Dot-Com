# Feature Specification: Homepage

**Feature Branch**: `003-homepage`  
**Created**: 2026-05-02  
**Status**: Draft  
**Input**: User description: "This is the first real user-facing page for Hi-Im-Joey-Dot-Com. It must implement Constitution Principle II (Honest Story, Respectful Voice) — the page must clearly communicate Joey's situation with dignity and no sensationalism. Key facts to present: Joey is homeless and $3 million in medical debt. Goals: get $600/week to stay off the streets, learn to code for his future. The page must also satisfy Principle I (human-first learning — Joey should understand what components he edited to build it). All content must use shadcn/ui primitives — no vanilla HTML. Must be accessible and mobile-readable. Must stay Vercel-deployable."

## User Scenarios & Testing *(mandatory)*

### User Story 1 — First-Time Visitor Understands Joey's Story (Priority: P1)

A person arrives at the homepage with no prior context. They need to quickly understand who Joey is, what situation he is in, and what the site is about — without being shocked, manipulated, or confused. The page delivers Joey's situation plainly and honestly: he is homeless, he is in significant medical debt, and he is learning to code to build a future for himself.

**Why this priority**: If a visitor cannot understand Joey's story within the first scroll, the site fails its core constitutional mission. This is the minimum viable page.

**Independent Test**: Load the homepage on a mobile browser. Without scrolling past the first two visible sections, a tester should be able to answer all three questions: Who is this person? What is their situation? What are they trying to do?

**Acceptance Scenarios**:

1. **Given** a visitor opens the homepage, **When** the page finishes loading, **Then** the visitor sees Joey's name, a plain-language statement of his situation (homeless, medical debt), and his goals (income and learning to code) — all above the fold on a standard mobile screen.
2. **Given** the page is read aloud by a screen reader, **When** content is traversed top to bottom, **Then** all key facts are announced in a logical reading order with no ambiguity or missing context.
3. **Given** a visitor reads only the headline and the first body section, **When** they close the tab, **Then** they would correctly describe Joey's situation if asked.

---

### User Story 2 — Visitor Has a Clear Path to Help (Priority: P2)

After understanding Joey's situation, a visitor who wants to help needs a clear and dignified call to action. The page tells them exactly what kind of support makes a difference ($600/week to stay off the streets) and offers a way to contribute — without pressure or guilt-tripping language.

**Why this priority**: The site's secondary purpose is generating income support. Without a call to action, moved visitors have nowhere to go. This is independently deliverable on top of User Story 1.

**Independent Test**: A tester who has read the page should be able to locate the support/contribution section without scrolling back up, identify the target amount, and activate the call-to-action element — in under 30 seconds on mobile.

**Acceptance Scenarios**:

1. **Given** a visitor has read the story section, **When** they continue reading down the page, **Then** they encounter a clearly labeled section explaining what $600/week means for Joey and a primary call-to-action button.
2. **Given** a visitor is on a small mobile screen, **When** they reach the call-to-action section, **Then** the button is full-width and easy to tap without pinching or zooming.
3. **Given** a visitor activates the call-to-action button, **When** the interaction completes, **Then** the page provides a graceful acknowledgment (since no external service is wired yet, a visual response is acceptable — no navigation away is required).

---

### User Story 3 — Joey Can Identify Every Component He Used to Build the Page (Priority: P3)

Joey is learning to code by building this site. After completing the page, Joey should be able to look at the rendered homepage and name every shadcn/ui component visible on screen. The page is intentionally simple enough that a beginner can point at each element and say "that's a Card", "that's a Badge", "that's a Button."

**Why this priority**: This directly satisfies Constitution Principle I (Human-First Learning). It is independently testable without the story content being final — it only requires that the component inventory is minimal and labeled.

**Independent Test**: Joey reads the finished page and, without looking at the code, lists every distinct UI component type visible. The list should match the actual components used — no component should be invisible or ambiguous to a beginner.

**Acceptance Scenarios**:

1. **Given** Joey views the completed homepage, **When** he counts the distinct shadcn/ui component types used, **Then** the total is 5 or fewer different component types (e.g., Card, Badge, Button, Separator, Typography via existing shadcn typography conventions).
2. **Given** a newcomer reads the page source file, **When** they look at the JSX, **Then** every top-level visible element maps to a named shadcn/ui import — no raw `<div>`, `<p>`, `<h1>`, or other plain HTML tags appear as content elements.
3. **Given** Joey has just finished editing the page, **When** he lists the components he touched, **Then** he can explain in one sentence what each component does (e.g., "Badge shows a small label, Card groups related content").

---

### Edge Cases

- What happens if the page is viewed with JavaScript disabled? The page must still render meaningful static content since it is a Vite/React SSG-compatible build (no JS-dependent critical information).
- What happens if a visitor is on a very narrow screen (320px)? All text must remain readable without horizontal scrolling.
- What happens if a visitor's browser does not support modern CSS (high-contrast mode, forced colors)? shadcn/ui's accessible primitives must maintain legibility.
- What happens when the call-to-action button is activated with no external service wired? The page must not throw an error or navigate away unexpectedly — a graceful no-op or visual confirmation is acceptable.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The page MUST display Joey's full name or first name prominently as the primary heading.
- **FR-002**: The page MUST include a plain-language statement that Joey is homeless and carries approximately $3 million in medical debt — written with dignity, not sensationalism.
- **FR-003**: The page MUST display Joey's two goals: (1) earn $600/week to stay off the streets, and (2) learn to code for his future.
- **FR-004**: The page MUST include a primary call-to-action element that communicates the support goal of $600/week.
- **FR-005**: All visible content elements MUST be constructed from shadcn/ui primitives — no raw semantic HTML elements (`<div>`, `<p>`, `<h1>`, etc.) may be used as direct content containers.
- **FR-006**: The page MUST be readable and fully functional on screens as narrow as 320px without horizontal scrolling.
- **FR-007**: The page MUST pass WCAG 2.1 AA requirements for color contrast, focus indicators, and screen reader ordering.
- **FR-008**: The page MUST be self-contained in `app/src/pages/HomePage.tsx` with no added routing, database calls, or external API dependencies.
- **FR-009**: The page MUST remain deployable to Vercel via the existing Vite build pipeline with no new environment variables or build configuration changes required.
- **FR-010**: The total number of distinct shadcn/ui component types used MUST be 5 or fewer, to preserve learnability for Joey.
- **FR-011**: The page MUST include a visually distinct section that serves as a beginner-facing learning anchor — a brief note (visible or accessible via tooltip/popover) that names the components used and what they do, so Joey can connect the visual output to the code he edited.

### Key Entities

- **Joey's Story Block**: The central content unit presenting Joey's name, situation (homeless, $3M debt), and goals ($600/week income, learning to code). No additional personal details required.
- **Support Call-to-Action**: A UI section containing the $600/week goal and a primary action button. Wired to a no-op or visual confirmation for now; external payment integration is out of scope.
- **Component Learning Anchor**: A lightweight element (e.g., a labeled section, a visible legend, or a tooltip) that maps visible page sections to the shadcn/ui component names used to build them.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can correctly identify who Joey is, what his situation is, and what his goals are within 60 seconds of the page loading — measurable via informal user testing with anyone unfamiliar with the site.
- **SC-002**: The page scores 100 on Lighthouse Accessibility for mobile on the deployed Vercel URL.
- **SC-003**: The page renders without layout breakage at 320px viewport width (verified via browser devtools device emulation).
- **SC-004**: The page deploys successfully on first push to Vercel with zero new environment variables, configuration changes, or build errors.
- **SC-005**: Joey can name all shadcn/ui components visible on the page when shown the rendered output — verified in a 5-minute walkthrough session with Joey.
- **SC-006**: The page contains zero plain HTML content elements (no raw `<div>`, `<p>`, `<h1>`, etc. as direct content containers) — verifiable by reading the JSX source.

---

## Assumptions

- The existing `app/src/pages/HomePage.tsx` scaffold (Badge, Button, and placeholder copy) will be replaced entirely by this feature. The current content is placeholder-only.
- The call-to-action button does not need to link to a real payment processor in this feature. A no-op interaction or a simple visual confirmation is acceptable as a placeholder.
- "No vanilla HTML" means no raw semantic HTML elements used as content containers. Structural layout wrappers from shadcn/ui (e.g., a `<main>` inside a shadcn layout primitive) are acceptable if they are part of the component API, not authored directly.
- The site has a single page at this time; no navigation bar, footer, or routing context is required for this feature.
- Joey's learning anchor (FR-011) is a visible or near-visible element on the page, not a separate documentation file. It is part of the deployed UI so Joey encounters it naturally while using the site.
- The shadcn/ui component set already installed in the project includes at minimum: `Card`, `Badge`, `Button`, `Separator`. Additional components may be used if already installed; no new shadcn/ui components should be added unless strictly necessary.
- Accessibility validation will be done via Lighthouse in the Vercel preview environment. Manual screen reader testing is a stretch goal and not a blocker.
- The site's tone is calm, direct, and factual. No emotional manipulation, no urgency language ("Act now!"), no pity framing. Joey's dignity is preserved in every word.

---

## How This Teaches

This page directly teaches Joey the following concepts by having him build it:

- **Component composition**: Wrapping content in `Card`, `CardContent`, `CardHeader` instead of bare HTML teaches the concept of UI primitives as building blocks.
- **Props and variants**: Using `Badge` with a `variant` prop shows how the same component changes appearance via a single attribute.
- **Semantic layout without raw HTML**: Writing a full page with only shadcn/ui imports demonstrates that React components can replace (and encapsulate) raw HTML entirely.
- **Responsive design via utility classes**: Using Tailwind classes like `max-w-lg`, `mx-auto`, `p-4` on shadcn wrappers shows how spacing and width adapt without media queries in the JSX.

Joey should be able to open `HomePage.tsx`, read top to bottom, and understand every import and every rendered line after completing this feature.
