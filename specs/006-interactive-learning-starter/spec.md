# Feature Specification: Interactive Learning Starter

**Feature Branch**: `006-interactive-learning-starter`  
**Created**: 2026-05-02  
**Status**: Draft  
**Input**: User description: "Create the first interactive learning lesson on the site: a radically simple in-page beginner challenge where visitors can interact with a small component, see the related code snippet nearby, and learn component, state, and re-render basics while the experience stays accessible, mobile-readable, and compatible with the current deployment flow."

---

## How This Teaches

> _Per Constitution delivery workflow: each non-trivial feature includes a short "how this teaches" note._

This feature teaches Joey three core beginner ideas through direct interaction instead of passive reading:

1. **What a component is**: The lesson presents one small named UI building block so Joey can connect the idea of a component to something visible and reusable on the page.
2. **How state changes behavior**: Joey changes a value through a simple control and immediately sees the interface update, building the mental model that state is remembered data that drives what appears on screen.
3. **Why re-renders happen**: The lesson explains that when the value changes, the component runs again and produces a new view. Joey sees cause and effect in one place: input, state change, and updated output.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Try the starter interaction (Priority: P1)

A visitor opens the learning section and can immediately interact with a small beginner-friendly challenge on the page. Their action produces a clear visible change without leaving the site or needing setup.

**Why this priority**: The interactive lesson itself is the feature. Without a working in-page interaction, there is no learning surface.

**Independent Test**: Can be fully tested by loading the lesson, using the provided control, and confirming the output visibly changes in response.

**Acceptance Scenarios**:

1. **Given** a visitor opens the learning section, **When** the page loads, **Then** one starter challenge is visible without requiring sign-in, downloads, or navigation to another site.
2. **Given** the starter challenge is visible, **When** the visitor uses the primary control, **Then** the displayed component changes immediately in a way that is easy to notice.
3. **Given** the visitor changes the control more than once, **When** they continue interacting, **Then** each new interaction updates the output consistently rather than freezing or stacking confusing states.
4. **Given** the visitor wants to begin again, **When** they choose the reset or starting option, **Then** the lesson returns to its default state.

---

### User Story 2 — Connect the interaction to code and concepts (Priority: P2)

After trying the interaction, a visitor can see the component name, a short code example, and a plain-language explanation of what just happened.

**Why this priority**: The site is meant to teach, not just entertain. The nearby explanation is what turns interaction into a beginner learning experience.

**Independent Test**: Can be fully tested by opening the lesson and confirming the component name, code snippet, and explanations for component, state, and re-render are all visible and understandable on their own.

**Acceptance Scenarios**:

1. **Given** the lesson is visible, **When** the visitor looks near the interactive element, **Then** they can see the name of the component being demonstrated.
2. **Given** the lesson is visible, **When** the visitor reads the supporting content, **Then** they can see a short code snippet that matches the lesson's visible behavior.
3. **Given** the visitor has interacted with the lesson, **When** they read the explanation, **Then** the page clearly explains in beginner-friendly language what a component is, what state is, and why the interface updated.
4. **Given** the visitor is new to coding, **When** they read the explanation, **Then** the wording avoids unnecessary jargon and focuses on one mental model at a time.

---

### User Story 3 — Learn comfortably on mobile and with assistive technology (Priority: P3)

A visitor can use and read the lesson on a phone or with keyboard and screen reader support, without the learning experience becoming cramped or confusing.

**Why this priority**: Constitution constraints require accessibility and mobile readability for all public pages. If the teaching surface only works on desktop or only for pointer users, it fails its audience.

**Independent Test**: Can be tested by viewing the lesson on a narrow viewport, navigating by keyboard, and confirming that controls, explanations, and code remain usable and readable.

**Acceptance Scenarios**:

1. **Given** the lesson is opened on a mobile-sized screen, **When** the visitor reads and interacts with it, **Then** the content remains readable without layout breakage or clipped controls.
2. **Given** the visitor navigates with a keyboard, **When** they move through the lesson, **Then** all interactive elements are reachable in a logical order and show a visible focus state.
3. **Given** the visitor uses assistive technology, **When** the lesson updates after an interaction, **Then** the controls and resulting output remain understandable from their labels and surrounding context.

---

### Edge Cases

- What happens when a visitor interacts rapidly or repeatedly? The lesson must continue showing one clear current result rather than producing overlapping or ambiguous states.
- What happens when the code snippet is longer than the mobile viewport? The snippet must remain readable without breaking the page layout.
- What happens when scripting is unavailable or delayed? The page should still present the learning explanation and starter code context, even if the live interaction cannot run yet.
- What happens when a visitor does not understand the result immediately? The explanation must connect the action to the visual change in plain language rather than assuming prior knowledge.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST include one beginner-friendly in-page interactive learning lesson as the first learning experience.
- **FR-002**: The lesson MUST present exactly one primary interaction pattern at launch so the experience stays focused and beginner-readable.
- **FR-003**: The lesson MUST allow a visitor to change one visible aspect of a small UI element through direct interaction on the page.
- **FR-004**: The lesson MUST update the visible output immediately after each interaction so the visitor can connect action to result.
- **FR-005**: The lesson MUST provide a clear default state and a way to return to that state.
- **FR-006**: The lesson MUST display the name of the component being demonstrated.
- **FR-007**: The lesson MUST display a short code snippet near the interactive example so visitors can compare the visible behavior with the underlying structure.
- **FR-008**: The lesson MUST explain, in beginner-friendly language, what a component is within the context of this lesson.
- **FR-009**: The lesson MUST explain, in beginner-friendly language, that state is remembered information that can change what the visitor sees.
- **FR-010**: The lesson MUST explain, in beginner-friendly language, that changing the state causes the component to render an updated view.
- **FR-011**: The lesson MUST explicitly connect the visitor's action to the visible update so the cause-and-effect loop is easy to follow.
- **FR-012**: The lesson MUST stay entirely on the site and MUST NOT require an external sandbox, embedded third-party editor, or off-site interaction flow.
- **FR-013**: The lesson MUST remain radically simple: no scoring, no code execution evaluator, no account requirement, and no multi-step setup.
- **FR-014**: The lesson MUST be accessible to keyboard users and understandable with assistive technology.
- **FR-015**: The lesson MUST remain readable and usable on mobile-sized screens.
- **FR-016**: The lesson MUST use the site's existing UI component patterns rather than introducing a separate design system for this page.
- **FR-017**: The feature MUST remain deployable through the site's current Vercel workflow without requiring new paid services, secrets, or operational steps.
- **FR-018**: The lesson MUST support Constitution Principle I by helping Joey practice, understand, or reflect within the same page visit.

### Key Entities *(include if feature involves data)*

- **Interactive Lesson**: The single beginner learning experience shown on the page. Key attributes: lesson title, learning goal, interactive control, visible output, code example, and explanation text.
- **Challenge State**: The current value changed by the visitor's interaction. Key attributes: default value, current value, and resulting visible output.
- **Learning Explanation**: The plain-language teaching content paired with the interaction. Key attributes: component name, code snippet, explanation of component, explanation of state, explanation of re-render, and action-to-result guidance.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can complete the starter interaction and observe the visible change within 30 seconds of landing on the lesson.
- **SC-002**: At least 80% of first-time test readers can correctly answer these three checks after using the lesson once: what the component is called, what changed, and why the screen updated.
- **SC-003**: The full lesson remains readable and usable at a 375px-wide viewport without blocking the primary interaction or hiding the explanation.
- **SC-004**: The lesson can be completed from start to reset using keyboard-only navigation with no unreachable controls.
- **SC-005**: The feature adds zero required external services, zero account steps, and zero new paid dependencies.
- **SC-006**: The main branch remains deployable through the existing Vercel setup after the lesson is added.

---

## Assumptions

- The first release includes a single starter lesson only; multiple lessons, quizzes, or progression systems are intentionally out of scope.
- The lesson is embedded directly into an existing site page or learning section rather than launching a separate application surface.
- The code snippet is instructional and read-only for the first release; editable in-browser coding is not required for this starter experience.
- The project's current UI library and styling patterns are sufficient for the lesson without adding a new component source.
- The current site deployment path to Vercel already exists and remains the deployment target for this feature.
- Joey's learning need is best served by one tightly scoped example that demonstrates component, state, and re-render together rather than several smaller disconnected examples.