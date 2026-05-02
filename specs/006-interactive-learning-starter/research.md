# Research: Interactive Learning Starter Technical Decisions

**Date**: 2026-05-02  
**Feature**: 006-interactive-learning-starter  
**Status**: Complete

This document consolidates design research and decisions made during Phase 0 planning.

---

## Lesson Scope & Content Selection

**Decision**: Start with one simple interactive starter — Badge variant toggle or color picker

**Example Challenge 1 (Badge Toggle)**:
- Component: shadcn/ui Badge
- Interaction: Toggle between "default", "secondary", "destructive" variants
- State: Current variant as string
- Code: Simple `const [variant, setVariant] = useState('default')`
- Teaching: "Clicking the button changes which Badge variant is shown. The component re-renders with new styling."

**Example Challenge 2 (Color Picker)**:
- Component: Custom color preview box + input or buttons to pick colors
- Interaction: Select color (red, blue, green, etc.)
- State: Current color as hex string
- Code: `const [color, setColor] = useState('#FF0000')`
- Teaching: "Pick a color; the preview updates. That's state changing what you see."

**Rationale**:
- Both are small enough to fit on mobile
- Both demonstrate core pattern: interaction → state change → re-render
- Both use existing shadcn/ui (Badge, Button) or simple custom element
- Both can be completed in <30 seconds
- No edge cases or hidden complexity

**Alternatives Considered**:
- Todo list: Too complex for first lesson; multiple items, add/remove logic
- Form with multiple inputs: Teaches too many concepts at once
- Game (e.g., click counter): Fun but doesn't directly teach React patterns
- Code editor challenge: Requires evaluation; out of scope for v1

**Chosen**: Badge variant toggle — ships with v1. Color picker added in future spec if Joey wants.

---

## Component Architecture

**Decision**: Single-file lesson wrapper with embedded interactive component and explanations

```typescript
// LessonStarter.tsx (one file containing everything)
export function LessonStarter() {
  const [variant, setVariant] = useState('default');

  return (
    <div className="lesson-container">
      {/* Left: Interactive component */}
      <div className="lesson-demo">
        <Badge variant={variant}>Try me!</Badge>
        <button onClick={() => setVariant('secondary')}>Secondary</button>
        <button onClick={() => setVariant('destructive')}>Destructive</button>
        <button onClick={() => setVariant('default')}>Reset</button>
      </div>

      {/* Right: Explanation + code */}
      <div className="lesson-content">
        <h2>Meet the Badge Component</h2>
        <CodeSnippet code={codeExample} />
        <p>This is a component...</p>
        <p>State is...</p>
        <p>When you click, state changes...</p>
      </div>
    </div>
  );
}
```

**Rationale**:
- No complexity of dynamic lesson registry or plugin system
- Joey can read one file and understand the entire lesson
- Easy to add similar lessons by copying and modifying
- Constitution Principle III: radically simple

**Alternatives Considered**:
- Lesson framework with data-driven structure: Adds abstraction; makes first lesson harder to understand
- Separate components for each lesson part: Over-engineered for one lesson
- Hardcoded inline in LearningPage: Works but couples content to page

**Chosen**: Single-file LessonStarter component; easy to copy for second lesson.

---

## State Management

**Decision**: React `useState` hook; local component state only (no Redux, no Context)

```typescript
const [variant, setVariant] = useState('default');
```

**Rationale**:
- Teaches Joey how `useState` works: hook returns state and setter
- Minimal boilerplate; code is readable for a beginner
- Perfect for single-page lesson; no shared state needed
- Shows cause and effect immediately

**Alternatives Considered**:
- useReducer: More complex; overkill for one value
- Context API: Over-architecture for component-local state
- Zustand or Jotai: External library; adds learning burden
- No state (static page): Doesn't teach anything

**Chosen**: `useState` — the most beginner-friendly way to learn state.

---

## Code Display Strategy

**Decision**: Read-only syntax-highlighted code snippet; no execution, no editing

```typescript
const codeExample = `
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export function BadgeLesson() {
  const [variant, setVariant] = useState("default");

  return (
    <div>
      <Badge variant={variant}>Try me!</Badge>
      <button onClick={() => setVariant("secondary")}>Change</button>
    </div>
  );
}
`;
```

**Display**: Syntax-highlighted with line numbers; read-only.

**Rationale**:
- Joey sees the code that powers what's happening
- No execution environment needed (no Sandbox, CodePen, etc.)
- Static HTML works on Vercel; no backend
- Begins teaching code literacy (reading code, not just running it)

**Alternatives Considered**:
- Embedded CodeSandbox or StackBlitz: Requires iframe; adds complexity; potential privacy concerns
- Editable in-browser code with evaluation: Requires runtime; error handling complex
- No code shown: Defeats the teaching goal; Joey can't connect behavior to code
- Code in separate file: Joey has to navigate away; breaks focus

**Chosen**: Read-only syntax-highlighted snippet — Joey sees code, copy-friendly.

---

## Teaching Narrative

**Decision**: Three plain-language explanations paired with the interactive component

### Explanation 1: What is a Component?

**Plain Language** (for Joey):
> "A component is a piece of your interface that is reusable. The Badge above is a component. It's a small building block you can use in many places on your site. Components are like functions in JavaScript — you give them inputs, and they produce output (what you see on screen)."

**Why this works**:
- Uses analogy (function → output)
- Concrete example (Badge on screen)
- Beginner vocabulary
- Not overwhelming with React-specific jargon

### Explanation 2: What is State?

**Plain Language**:
> "State is remembered information. Right now, this lesson remembers which variant you picked ('default', 'secondary', etc.). That's state. State lives inside the component and can change when something happens (like when you click a button)."

**Why this works**:
- Concrete metaphor (remembers)
- Direct connection to what Joey just did (picked a variant)
- Simple definition without technical jargon

### Explanation 3: Why Did the Component Re-Render?

**Plain Language**:
> "When you clicked the button, two things happened: (1) the state changed (the 'variant' value updated), and (2) the component ran again and produced a new view using the new state. That's a re-render. It's how React keeps the screen up to date."

**Why this works**:
- Cause → effect chain (click → state change → new view)
- Explains why the screen updated (not magic)
- "Re-render" is introduced but in context

### Explanation 4: Connect Your Action to What You See

**Plain Language**:
> "You clicked 'Secondary'. State changed to 'secondary'. The component re-rendered. The Badge is now blue instead of gray. That's the full loop: action → state change → update → new screen."

**Why this works**:
- Joey's specific action is named
- Each step is traced
- Connection between code and visual result is explicit

**Rationale**: Four short, focused paragraphs are better than one long block. Each builds on the last. Joey can read at their own pace.

**Alternatives Considered**:
- Video explanation: Requires hosting; more complex
- Interactive quiz: Out of scope for v1; adds complexity
- No explanation: Joey only plays, doesn't learn
- Very technical explanation: Too jargon-heavy; loses Joey

**Chosen**: Four short plain-language explanations paired with the interactive demo.

---

## Accessibility Design

**Decision**: Semantic HTML, keyboard navigation, ARIA labels, high contrast

### Keyboard Navigation

- Tab moves focus through buttons and controls
- Enter or Space activates buttons
- Focus visible on all interactive elements (outline, background highlight, etc.)
- Logical tab order: Main control first, then reset button

### Semantics

```html
<!-- Good: Semantic elements -->
<button onClick={...}>Secondary</button>
<label htmlFor="variant-label">Current variant:</label>

<!-- Accessible heading -->
<h2>Meet the Badge Component</h2>
```

### ARIA Labels

```html
<!-- Describe output for screen readers -->
<div role="region" aria-live="polite" aria-label="Component preview">
  <Badge variant={variant}>Try me!</Badge>
</div>
```

**Why aria-live**: When state changes (Badge updates), screen reader announces "The preview has updated" so Joey knows something happened.

### Color Contrast

- All text uses shadcn/ui default colors (meets WCAG AA)
- Badge variants are distinguishable by more than color (optional: add icons/patterns)
- Code snippet uses readable monospace font (14–16px)

### Testing

- Keyboard: Navigate with Tab, activate with Enter/Space
- Screen reader (NVDA/JAWS): Read lesson title, button labels, explanations
- Lighthouse Accessibility audit: Score ≥90

**Rationale**: Accessibility is not a feature; it's a requirement (Constitution Principle V).

**Alternatives Considered**:
- Minimal accessibility (focus on visuals first): Excludes users; violates Constitution
- Over-engineered (excessive ARIA): Confusing for screen reader users

**Chosen**: Semantic HTML + keyboard nav + ARIA live regions + color contrast — balanced approach.

---

## Mobile & Responsive Design

**Decision**: Mobile-first single column; stack demo above explanations on narrow screens; side-by-side on desktop

### Layout Breakpoints

```css
/* Mobile (<640px) */
.lesson-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.lesson-demo {
  /* Demo section on top */
  padding: 1rem;
}

.lesson-content {
  /* Explanations below demo */
  padding: 1rem;
  font-size: 1rem;
}

/* Tablet (640px–1024px) */
@media (min-width: 640px) {
  .lesson-container {
    flex-direction: row;
    gap: 2rem;
  }
}

/* Desktop (>1024px) */
@media (min-width: 1024px) {
  .lesson-container {
    flex-direction: row;
    gap: 2rem;
    padding: 2rem;
  }
}
```

**Rationale**:
- Joey learns on phone, tablet, or desktop
- Content is never cramped
- Buttons are large enough to tap (min 44x44px)
- Code snippet scrolls horizontally on small screens if needed (not ideal but acceptable)

**Testing**: Rendered at 375px, 768px, 1280px; no horizontal scroll on content; buttons tappable.

**Alternatives Considered**:
- Desktop-first: Joey's phone experience suffers
- No responsive design: Unusable on mobile

**Chosen**: Mobile-first flex layout with media queries.

---

## Reset Button & Default State

**Decision**: Prominent "Reset" button that returns state to default

```typescript
<button 
  onClick={() => setVariant('default')}
  className="button-secondary"
>
  Reset
</button>
```

**Rationale**:
- Joey can explore, then reset and start fresh
- Teaches that state is mutable (can change and revert)
- Clear visual indicator of "back to start"
- Accessibility: Keyboard-navigable reset

**Alternatives Considered**:
- Reload page (browser back/refresh): Defeats the purpose; Joey loses control
- No reset: Joey can't undo once they pick a color

**Chosen**: Reset button — Joey has agency to explore and return.

---

## Performance & Metrics

**Decision**: Instant state update (<50ms); no loading states needed

**Why <50ms is important**: Human perception — changes faster than 50ms feel instant. Joey clicks, sees result, connects action to effect.

**Implementation**: Direct `setVariant()` call; no API, no network delay.

**Future optimization** (not v1): Lazy-load code syntax highlighter if bundle size becomes concern.

**Rationale**: Lesson must feel responsive; latency breaks the teaching moment.

---

## Testing Strategy

**Decision**: Manual testing first (no e2e automated yet); focus on user scenarios

### Manual Checklist
- [ ] Click each button; state updates and Badge visual changes
- [ ] Click Reset; state returns to default
- [ ] Tab through buttons; all reachable, focus visible
- [ ] Read explanations; clear and understandable
- [ ] Code snippet visible; syntax highlighting readable
- [ ] Mobile (375px): No horizontal scroll, buttons tappable
- [ ] Screen reader (NVDA): Reads lesson title, button labels, explanations, announces when Badge updates

### Accessibility Audit
- [ ] Lighthouse Accessibility score ≥90
- [ ] WAVE tool: No WCAG errors
- [ ] Color contrast: All text meets AA standard

**Rationale**: Manual testing sufficient for v1 (single lesson, simple interactions).

**Future** (Phase 2 or later):
- React Testing Library tests for state changes
- Playwright E2E for full flow
- Continuous accessibility audit in CI/CD

**Chosen**: Manual checklists; document and iterate.

---

## Lesson Extensibility (Out of Scope for v1)

Intentionally deferred to future specs:
- ~~Multiple lesson tracks (Beginner, Intermediate, Advanced)~~ — One starter only
- ~~Scoring or progress tracking~~ — No accounts; Joey's learning is their own
- ~~Interactive code editing~~ — Read-only code only
- ~~Embedded REPL or sandbox~~ — Not needed; Joey learns concepts first
- ~~Multimedia (video, animation)~~ — Static content; Joey reads and interacts
- ~~AI tutor or auto-evaluation~~ — Not in scope; Joey learns at their pace

**Why limited scope**: Constitution Principle III — radically simple by default.

---

## Learning Outcome Validation

**Success**: Joey completes the lesson and understands:
1. **What a component is**: "A reusable piece of the interface"
2. **What state is**: "Remembered information that can change"
3. **Why re-renders happen**: "When state changes, the component runs again and produces a new view"

**Measurement Method** (per spec SC-002):
- Ask Joey three questions after lesson (informal, not automated)
- 80% of readers should answer correctly
- If <80%, iterate explanations and test again

**Test Script** (Joey's first exposure):
1. Joey opens `/learn`
2. Joey reads introduction
3. Joey clicks buttons and plays with Badge
4. Joey reads explanations
5. Joey clicks Reset and tries again
6. (Optional) Ask Joey: "What happened when you clicked that button?"

---

## Decision Record

| Decision | Chosen | Tradeoff |
|----------|--------|----------|
| Starter lesson | Badge toggle | Limited to one interaction (color picker added later) |
| State management | React useState | No server sync (not needed for lesson) |
| Code display | Read-only syntax highlighting | No execution environment (Joey learns to read code first) |
| Teaching method | Plain-language + interactive demo | No video or interactive quiz (simpler to maintain) |
| Accessibility | Semantic HTML + keyboard nav + ARIA | Some assistive tech features deferred (live region might need refinement) |
| Responsiveness | Mobile-first flex layout | Side-by-side layout on mobile not ideal (works for Joey's use case) |
| Performance | Instant updates (<50ms) | No loading states (not needed; always instant) |

---

## Sign-Off

**Reviewed by**: Planning workflow  
**Status**: Complete — all NEEDS CLARIFICATION resolved. Ready for Phase 1 (data-model.md, contracts, quickstart).
