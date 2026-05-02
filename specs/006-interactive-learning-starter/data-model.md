# Data Model: Interactive Learning Starter

**Date**: 2026-05-02  
**Feature**: 006-interactive-learning-starter  
**Status**: Defined

This document specifies the structure, state management, and entity relationships for the interactive lesson system.

---

## Entity: Interactive Lesson

The fundamental unit of interactive learning content. Each lesson is a React component with an interactive demo, code example, and explanations.

### Schema

```typescript
interface Lesson {
  // Metadata
  id: string;              // Unique identifier, e.g., "badge-toggle-v1"
  title: string;           // Lesson title, e.g., "Meet the Badge Component"
  learningGoal: string;    // What Joey will understand after this lesson (1–2 sentences)

  // Content
  explanation: {
    componentConcept: string;     // "What is a component?" explanation
    stateConcept: string;         // "What is state?" explanation
    reRenderConcept: string;      // "Why re-renders happen?" explanation
    actionToResult: string;       // "Connect your action to what you see" explanation
  };

  codeSnippet: {
    code: string;           // Full TypeScript/JSX code example (read-only)
    language: string;       // "typescript" or "jsx"
    fileName: string;       // "BadgeLesson.tsx"
  };

  // Interactive State
  initialState: Record<string, any>;  // Default state values, e.g., { variant: "default" }
  currentState: Record<string, any>;  // Current state (mutable during session)

  // Interaction
  controls: Control[];    // Buttons or inputs to change state
  resetFn: () => void;    // Function to reset to initialState

  // Rendering
  renderComponent: (state: Record<string, any>) => React.ReactNode;  // Function to render the interactive component based on state
  componentLibrary: string;  // "Badge" or custom component name
}

interface Control {
  label: string;          // Button label, e.g., "Secondary"
  action: (setState: (key: string, value: any) => void) => void;  // What happens when clicked
  ariaLabel?: string;     // Optional accessibility label
}

interface LessonIndex {
  lessons: Lesson[];
  current: Lesson;        // The currently active lesson
  totalCount: number;     // Number of lessons available
}
```

### Validation Rules

| Field | Rule | Error Message |
|-------|------|---------------|
| `id` | Unique, lowercase with hyphens, no spaces | "Lesson ID must be unique" |
| `title` | Non-empty, 1–100 characters | "Title must be 1–100 characters" |
| `learningGoal` | Non-empty, 1–300 characters | "Learning goal must be clear and brief" |
| `explanations` | All four keys present, each >0 chars | "All four explanations required" |
| `codeSnippet` | Valid TypeScript/JSX, syntax-error-free | "Code snippet must be valid" |
| `initialState` | Object with at least one key | "Initial state required" |
| `controls` | Array with 1+ controls | "At least one control required" |

### State Transitions

- **Loaded** → **Interacting**: User interacts with control; state updates
- **Interacting** → **Reset**: User clicks Reset button; state returns to initialState
- **Any state** → **New Lesson**: User navigates to different lesson (future feature)

---

## Entity: Lesson State

The runtime mutable state of the current lesson. Managed by React `useState` hook within the lesson component.

### Schema

```typescript
interface LessonState {
  // Current values
  values: Record<string, any>;        // Current state values, e.g., { variant: "default" }
  
  // Metadata
  lastUpdated: Date;                  // Timestamp of last state change
  interactionCount: number;           // How many times user has interacted
  
  // History (optional, future feature)
  // history: StateSnapshot[];         // Previous states (for undo/redo)
}

interface StateSnapshot {
  values: Record<string, any>;
  timestamp: Date;
  interactionLabel: string;           // What user did
}
```

### Derivation Rules

1. **Initial State**: Set from `lesson.initialState` when component mounts
2. **Current State**: Updated immediately when user interacts
3. **Last Updated**: Timestamp captured on each `setState` call
4. **Interaction Count**: Incremented on each user action

### Example: Badge Toggle Lesson

```typescript
// Initial state
const initialState = {
  variant: "default"  // Show Badge with "default" styling
};

// User clicks "Secondary" button
// State updates to:
const currentState = {
  variant: "secondary"  // Show Badge with "secondary" (blue) styling
};

// User clicks "Destructive" button
// State updates to:
const currentState = {
  variant: "destructive"  // Show Badge with "destructive" (red) styling
};

// User clicks "Reset" button
// State returns to:
const currentState = {
  variant: "default"  // Back to start
};
```

---

## Entity: Explanation Content

Plain-language teaching text paired with the interactive component.

### Schema

```typescript
interface ExplanationContent {
  componentConcept: string;     // "What is a component?"
  stateConcept: string;         // "What is state?"
  reRenderConcept: string;      // "Why do components re-render?"
  actionToResult: string;       // "How does your action change the screen?"
}

// Example for Badge lesson
const badgeExplanations: ExplanationContent = {
  componentConcept: `
    "A component is a piece of your interface that is reusable. 
     The Badge above is a component. It's a small building block 
     you can use in many places on your site. Components are like 
     functions in JavaScript — you give them inputs, and they 
     produce output (what you see on screen)."
  `,
  
  stateConcept: `
    "State is remembered information. Right now, this lesson 
     remembers which variant you picked ('default', 'secondary', etc.). 
     That's state. State lives inside the component and can change 
     when something happens (like when you click a button)."
  `,
  
  reRenderConcept: `
    "When you clicked the button, two things happened: (1) the 
     state changed (the 'variant' value updated), and (2) the 
     component ran again and produced a new view using the new state. 
     That's a re-render. It's how React keeps the screen up to date."
  `,
  
  actionToResult: `
    "You clicked 'Secondary'. State changed to 'secondary'. The 
     component re-rendered. The Badge is now blue instead of gray. 
     That's the full loop: action → state change → update → new screen."
  `
};
```

### Validation Rules

- Each explanation must be:
  - Non-empty (>0 characters)
  - Beginner-friendly (avoid jargon; <200 words)
  - Actionable (connects Joey's action to concept)
  - Self-contained (reads independently)

### Accessibility Considerations

- Plain language; max 8th-grade reading level
- Short paragraphs; generous whitespace
- No all-caps; limited emphasis
- Links highlighted; visited state distinct

---

## File Organization

### Lesson Definitions

```
app/src/data/lessons.ts

// Define lessons as JavaScript objects
export const BadgeToggleLesson: Lesson = {
  id: "badge-toggle-v1",
  title: "Meet the Badge Component",
  learningGoal: "Understand what a component is, how state changes behavior, and why the interface updates when state changes.",
  
  explanation: { /* explanations above */ },
  codeSnippet: { /* code example */ },
  initialState: { variant: "default" },
  controls: [
    { label: "Secondary", action: (setState) => setState("variant", "secondary") },
    { label: "Destructive", action: (setState) => setState("variant", "destructive") },
    { label: "Reset", action: (setState) => setState("variant", "default") },
  ],
  renderComponent: (state) => <Badge variant={state.variant}>Try me!</Badge>,
};

// Export index
export const LESSON_INDEX: LessonIndex = {
  lessons: [BadgeToggleLesson],
  current: BadgeToggleLesson,
  totalCount: 1,
};

// Export query functions
export function getLessonById(id: string): Lesson | undefined {
  return LESSON_INDEX.lessons.find(l => l.id === id);
}

export function getCurrentLesson(): Lesson {
  return LESSON_INDEX.current;
}
```

### Lesson Component

```
app/src/components/lessons/

├── LessonStarter.tsx          # Main lesson component (receives Lesson object)
├── InteractiveOutput.tsx      # Renders the component based on state
├── CodeSnippet.tsx            # Displays syntax-highlighted code
├── LessonExplanation.tsx      # Renders four explanations
└── LessonControls.tsx         # Renders buttons for state changes
```

### Route

```
app/src/pages/LearningPage.tsx

// Route: /learn
// Loads current lesson from app/src/data/lessons.ts
// Renders LessonStarter component
```

---

## Relationships

### Lesson ↔ LessonState

- **1:1** — One lesson has one active state session
- **Lifecycle**: State is created when lesson mounts, destroyed when component unmounts
- **Mutability**: LessonState is mutable (via setState); Lesson definition is immutable

### Lesson ↔ Explanation Content

- **1:many** — One lesson contains four explanations
- **Display**: All four explanations shown together on one page
- **Order**: 1. Component concept, 2. State concept, 3. Re-render concept, 4. Action-to-result

### Lesson ↔ Controls

- **1:many** — One lesson can have 1+ interactive controls (buttons)
- **Action**: Each control can trigger state change or reset
- **Rendering**: Controls rendered below or beside interactive component

### Lesson ↔ Code Snippet

- **1:1** — One lesson displays one code example
- **Purpose**: Joey sees code that produces the interactive behavior
- **Connection**: Code snippet is the "source of truth" — should match implementation

### Route ↔ Lesson

- **1:1** — One URL (`/learn`) loads one lesson at a time
- **Extensibility**: Future lessons could have separate routes (`/learn/2`, `/learn/3`) or be selectable from menu

---

## Edge Cases & Handling

### No Lessons Available

**Scenario**: `LESSON_INDEX.lessons` is empty

**Handling**:
- LearningPage shows message: "Learning content coming soon. Check back later!"
- No crash or error
- Joey understands feature is under development

### State Update Fails

**Scenario**: Button click doesn't update state (unlikely with React, but possible with async logic)

**Handling**:
- Check React DevTools to debug
- Button click handler logs error to console
- UI doesn't update; user knows something's wrong (not silent failure)

### Code Snippet Too Large

**Scenario**: Lesson code is >50 lines

**Handling**:
- Code viewer allows horizontal scroll (not ideal on mobile, acceptable)
- Alternatively: Show simplified snippet; link to full code in comments

### Explanation Text Too Long

**Scenario**: Explanation exceeds reasonable length

**Handling**:
- Enforce max ~300 characters per explanation (guideline)
- If needed, split into two explanations or paragraphs
- Use `aria-label` for screen reader clarity

### Accessibility Issue: State Change Not Announced

**Scenario**: Screen reader user doesn't hear that state changed

**Handling**:
- Add `role="region"` with `aria-live="polite"` to output area
- When state updates, region is announced (screen reader says "Component preview updated")

---

## Testing Scenarios

### Scenario 1: Initial lesson loads
- **Setup**: LearningPage component mounts
- **Action**: Page renders
- **Expected**: Lesson title, explanations, interactive component visible
- **Assertion**: `lesson.title` appears in DOM; all four explanations visible

### Scenario 2: State updates on control click
- **Setup**: LessonStarter component with Badge lesson
- **Action**: Click "Secondary" button
- **Expected**: State updates; Badge variant changes to blue
- **Assertion**: `currentState.variant === "secondary"` and Badge renders with blue styling

### Scenario 3: Reset button works
- **Setup**: State is `{ variant: "secondary" }`
- **Action**: Click "Reset" button
- **Expected**: State returns to initial state
- **Assertion**: `currentState.variant === "default"` and Badge renders with default styling

### Scenario 4: Multiple interactions
- **Setup**: LessonStarter component
- **Action**: Click "Destructive", then "Secondary", then "Reset"
- **Expected**: State follows each action correctly
- **Assertion**: Badge styling matches each click

### Scenario 5: Code snippet visible
- **Setup**: LessonStarter component
- **Action**: Page renders
- **Expected**: Code snippet visible, syntax highlighted
- **Assertion**: Code matches `lesson.codeSnippet.code` and is readable

### Scenario 6: Screen reader announces state change
- **Setup**: Screen reader enabled (NVDA/JAWS)
- **Action**: Click button to change state
- **Expected**: Screen reader announces "Component preview updated" or similar
- **Assertion**: `aria-live` region is announced

---

## Versioning & Extensibility

**Version**: 1.0 (Single lesson; extensible for multiple lessons)

**Future Extensibility** (out of scope for v1):
- Add second lesson: Create `ColorPickerLesson` in `lessons.ts`, add to `LESSON_INDEX`
- Add lesson menu: Create `LessonSelector.tsx` component to choose between lessons
- Track progress: Add `lessonHistory` to localStorage (Joey's personal tracking)
- Difficulty levels: `Lesson.difficulty: "beginner" | "intermediate"` field

**Current Assumption**: One lesson is sufficient for v1. Joey learns Badge + state + re-render deeply before additional complexity.

---

## Public API

### Exported Functions (from `app/src/data/lessons.ts`)

```typescript
export function getCurrentLesson(): Lesson;
export function getLessonById(id: string): Lesson | undefined;
export function getAllLessons(): Lesson[];
export type Lesson = Lesson;
export type LessonState = LessonState;
```

### Exported Component (from `app/src/components/lessons/LessonStarter.tsx`)

```typescript
export function LessonStarter({ lesson }: { lesson: Lesson }): React.ReactNode;
```

### Usage in LearningPage

```typescript
import { getCurrentLesson } from '../data/lessons';
import { LessonStarter } from '../components/lessons/LessonStarter';

export function LearningPage() {
  const lesson = getCurrentLesson();
  return <LessonStarter lesson={lesson} />;
}
```

---

## Sign-Off

**Defined by**: Planning workflow  
**Reviewed**: Structure aligns with Constitution (radically simple, accessible, beginner-friendly)  
**Status**: Ready for implementation

**Next Steps**: 
1. Create `app/src/data/lessons.ts` with BadgeToggleLesson definition
2. Implement `LessonStarter.tsx` and child components
3. Add `/learn` route to LearningPage
4. Manual testing: interaction, state changes, accessibility
5. Verify against contract with manual tests
