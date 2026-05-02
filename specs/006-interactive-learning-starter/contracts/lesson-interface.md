# Contract: Interactive Lesson Public Interface

**Feature**: 006-interactive-learning-starter  
**Date**: 2026-05-02  
**Type**: TypeScript/Component Interface Contract

This document defines the public interface of the interactive lesson system — the types, functions, and components that consumers should rely on.

## Implemented Snapshot

The implementation currently exports these primary interfaces from `app/src/data/lessons.ts`:

- `LessonStateValue` (`key`, `value`) for control actions
- `Control` (`id`, `label`, optional `description`/`ariaLabel`, and `action`)
- `ExplanationContent` (four-part explanation payload)
- `LessonCodeSnippet` (`code`, `language`, `fileName`)
- `Lesson` (metadata, explanation, snippet, state defaults, controls, renderer, availability)
- `LessonIndex` (lessons list, current lesson, total count)

Extensibility pattern:

- `LESSON_INDEX.lessons` contains both active and scaffolded lessons.
- `available: false` marks scaffold lessons not yet interactive.
- `LessonStarter` uses `getAllLessons()` and `getLessonById()` to switch lessons without changing page structure.

---

## Module: `app/src/data/lessons`

**Location**: `app/src/data/lessons.ts`  
**Consumers**: `LessonStarter.tsx`, `LearningPage.tsx`

### Exported Types

```typescript
// ============================================================================
// Lesson Control
// ============================================================================

/**
 * A single interactive control (button) that changes lesson state.
 *
 * @property label - Display text on button (e.g., "Secondary")
 * @property action - Function called when clicked; updates state
 * @property ariaLabel - Optional accessibility label for screen readers
 */
export interface Control {
  label: string;
  action: (setState: (key: string, value: any) => void) => void;
  ariaLabel?: string;
}

// ============================================================================
// Lesson Explanation Content
// ============================================================================

/**
 * Plain-language teaching content paired with interactive component.
 *
 * @property componentConcept - Explanation of "What is a component?"
 * @property stateConcept - Explanation of "What is state?"
 * @property reRenderConcept - Explanation of "Why does the component update?"
 * @property actionToResult - Explanation connecting user action to visual result
 */
export interface ExplanationContent {
  componentConcept: string;
  stateConcept: string;
  reRenderConcept: string;
  actionToResult: string;
}

// ============================================================================
// Code Snippet
// ============================================================================

/**
 * Code example displayed alongside interactive component.
 *
 * @property code - Full source code (TypeScript/JSX), read-only for v1
 * @property language - Language identifier ("typescript", "jsx", "javascript")
 * @property fileName - File name hint for Joey (e.g., "BadgeLesson.tsx")
 */
export interface CodeSnippet {
  code: string;
  language: string;
  fileName: string;
}

// ============================================================================
// Interactive Lesson
// ============================================================================

/**
 * A single interactive learning experience.
 *
 * @property id - Unique identifier (lowercase with hyphens)
 * @property title - Lesson title displayed to user
 * @property learningGoal - What Joey will understand after this lesson (1–2 sentences)
 * @property explanation - Four plain-language explanations
 * @property codeSnippet - Code example to display
 * @property initialState - Default state values
 * @property controls - Buttons or inputs to change state
 * @property renderComponent - Function to render interactive component
 * @property componentLibrary - Name of the component being taught (e.g., "Badge")
 */
export interface Lesson {
  id: string;
  title: string;
  learningGoal: string;

  explanation: ExplanationContent;
  codeSnippet: CodeSnippet;

  initialState: Record<string, any>;
  controls: Control[];

  renderComponent: (state: Record<string, any>) => React.ReactNode;
  componentLibrary: string;
}

// ============================================================================
// Lesson Index
// ============================================================================

/**
 * Collection and metadata about available lessons.
 *
 * @property lessons - All available lessons
 * @property current - The currently active/displayed lesson
 * @property totalCount - Number of lessons in index
 */
export interface LessonIndex {
  lessons: Lesson[];
  current: Lesson;
  totalCount: number;
}
```

### Exported Functions

#### `getCurrentLesson(): Lesson`

**Purpose**: Retrieve the currently active lesson.

**Returns**:
- `Lesson` object

**Usage**:
```typescript
import { getCurrentLesson } from '../data/lessons';

export function LearningPage() {
  const lesson = getCurrentLesson();
  return <LessonStarter lesson={lesson} />;
}
```

**Behavior**:
- Returns the lesson specified in `LESSON_INDEX.current`
- Does not throw error (always returns valid Lesson)

**Performance**: O(1) — direct lookup

---

#### `getLessonById(id: string): Lesson | undefined`

**Purpose**: Retrieve a specific lesson by its ID.

**Parameters**:
- `id` (string) — Unique lesson identifier, e.g., `"badge-toggle-v1"`

**Returns**:
- `Lesson` object if found
- `undefined` if not found

**Usage**:
```typescript
import { getLessonById } from '../data/lessons';

// In routing (future feature)
const lesson = getLessonById("color-picker-v1");
if (lesson) {
  return <LessonStarter lesson={lesson} />;
}
```

**Behavior**:
- Case-sensitive ID matching
- Returns first exact match
- Does not throw error (returns undefined gracefully)

**Performance**: O(n) where n = number of lessons; consider caching if >100 lessons

---

#### `getAllLessons(): Lesson[]`

**Purpose**: Get all available lessons.

**Returns**:
- Array of all lessons in the index

**Usage**:
```typescript
import { getAllLessons } from '../data/lessons';

// Future: Render lesson menu
const lessons = getAllLessons();
lessons.forEach(lesson => {
  console.log(lesson.title);
});
```

**Behavior**:
- Returns array in order (as defined in `LESSON_INDEX`)
- Empty array if no lessons defined

**Performance**: O(n)

---

## Component: `LessonStarter`

**Location**: `app/src/components/lessons/LessonStarter.tsx`

**Purpose**: Main lesson wrapper; renders the complete interactive learning experience.

### Props

```typescript
interface LessonStarterProps {
  lesson: Lesson;  // The lesson to display (from app/src/data/lessons.ts)
}
```

### Behavior

1. Receives a `Lesson` object
2. Creates React state from `lesson.initialState`
3. Renders interactive component via `lesson.renderComponent(state)`
4. Renders code snippet via `CodeSnippet` child component
5. Renders explanations via `LessonExplanation` child component
6. Renders controls (buttons) via `LessonControls` child component
7. Handles state updates when user clicks controls
8. Handles reset to initial state

### Example Usage

```typescript
import { getCurrentLesson } from '../data/lessons';
import { LessonStarter } from '../components/lessons/LessonStarter';

export function LearningPage() {
  const lesson = getCurrentLesson();
  return <LessonStarter lesson={lesson} />;
}
```

### Layout

```
┌─────────────────────────────────────────────────────┐
│                  Lesson Title                       │
│               (e.g., "Meet the Badge")              │
└─────────────────────────────────────────────────────┘

┌──────────────────┐  ┌──────────────────────────────┐
│  Interactive     │  │  Explanations & Code         │
│  Component       │  │                              │
│  (Badge)         │  │  • What is a component?      │
│                  │  │  • What is state?            │
│  [Buttons]       │  │  • Why re-render?            │
│                  │  │  • Your action → Result      │
│                  │  │                              │
│                  │  │  Code:                       │
│                  │  │  ```typescript               │
│                  │  │  const [variant, ...] = ...  │
│                  │  │  ```                         │
└──────────────────┘  └──────────────────────────────┘
```

### Accessibility Requirements

- All interactive elements keyboard-navigable
- Focus visible on buttons
- Buttons have accessible labels (button text or `aria-label`)
- Screen reader announces when component updates (`aria-live="polite"`)
- Semantic HTML (buttons are `<button>`, not `<div>`)
- High contrast between text and background
- Explanations in plain language; >12px font size

---

## Child Components

### `InteractiveOutput`

**Purpose**: Renders the interactive component based on current state.

**Props**:
```typescript
interface InteractiveOutputProps {
  component: React.ReactNode;  // From lesson.renderComponent(state)
  componentName: string;       // Display name (e.g., "Badge")
}
```

**Behavior**:
- Renders passed component
- Wraps in accessible region (`role="region"`, `aria-live="polite"`)
- Announces updates to screen readers

---

### `CodeSnippet`

**Purpose**: Displays syntax-highlighted code example.

**Props**:
```typescript
interface CodeSnippetProps {
  snippet: CodeSnippet;  // From lesson.codeSnippet
}
```

**Behavior**:
- Renders code with syntax highlighting (e.g., Prism or highlight.js)
- Displays language tag and file name
- Read-only (no editing in v1)
- Scrollable on small screens

---

### `LessonExplanation`

**Purpose**: Displays the four plain-language explanations.

**Props**:
```typescript
interface LessonExplanationProps {
  explanations: ExplanationContent;  // From lesson.explanation
}
```

**Behavior**:
- Renders four sections (component concept, state, re-render, action-to-result)
- Clear headings for each section
- Beginner-friendly typography

---

### `LessonControls`

**Purpose**: Renders interactive buttons for state changes.

**Props**:
```typescript
interface LessonControlsProps {
  controls: Control[];
  onStateChange: (key: string, value: any) => void;
}
```

**Behavior**:
- Renders each control as a button
- Calls `onStateChange` when button clicked
- Focus visible on all buttons
- Accessible labels (button text or `aria-label`)

---

## Route Contract

### Learning Page Route

**Path**: `/learn`  
**Component**: `LearningPage.tsx`  
**Responsibility**: Display the current interactive lesson

**Input**: None (derived from `getCurrentLesson()`)  
**Output**: Full lesson page with interactive component, code, explanations

**Behavior**:
1. Load current lesson via `getCurrentLesson()`
2. Render `LessonStarter` with lesson
3. Display layout on any viewport size
4. Allow full keyboard navigation

**Example URL**: `https://hi-im-joey.vercel.app/learn`

**Mobile Behavior**: Content stacks vertically; all controls tappable; no horizontal scroll

---

## Lesson Definition Contract

### Required Fields for a Valid Lesson

Every lesson object **must** include:
- `id` (unique, lowercase with hyphens)
- `title` (1–100 characters)
- `learningGoal` (1–300 characters)
- `explanation.componentConcept` (non-empty)
- `explanation.stateConcept` (non-empty)
- `explanation.reRenderConcept` (non-empty)
- `explanation.actionToResult` (non-empty)
- `codeSnippet.code` (valid TypeScript/JSX)
- `codeSnippet.language` ("typescript", "jsx", or "javascript")
- `codeSnippet.fileName` (descriptive name)
- `initialState` (object with 1+ key-value pairs)
- `controls` (array with 1+ Control objects)
- `renderComponent` (function that returns React.ReactNode)
- `componentLibrary` (string naming the component)

### Example: Valid Badge Toggle Lesson

```typescript
export const BadgeToggleLesson: Lesson = {
  id: "badge-toggle-v1",
  title: "Meet the Badge Component",
  learningGoal: "Understand component, state, and re-render by toggling a Badge variant.",

  explanation: {
    componentConcept: "A component is...",
    stateConcept: "State is...",
    reRenderConcept: "When state changes...",
    actionToResult: "You clicked 'Secondary'...",
  },

  codeSnippet: {
    code: `import { Badge } from "@/components/ui/badge";\nconst [variant, setVariant] = useState("default");...`,
    language: "typescript",
    fileName: "BadgeLesson.tsx",
  },

  initialState: { variant: "default" },

  controls: [
    { label: "Secondary", action: (setState) => setState("variant", "secondary") },
    { label: "Reset", action: (setState) => setState("variant", "default") },
  ],

  renderComponent: (state) => <Badge variant={state.variant}>Try me!</Badge>,

  componentLibrary: "Badge",
};
```

---

## UI/UX Contract

### Lesson Page Requirements

- **Display**: Title, interactive component, explanations, code snippet, buttons
- **Interaction**: Click buttons to change state; instant visual update
- **Reset**: Clear button to return to initial state
- **Mobile**: Readable and usable at 375px; no horizontal scroll
- **Accessibility**: Keyboard-navigable; screen reader compatible; high contrast
- **Performance**: Instant state updates (<50ms); no loading states
- **Explanation**: Plain language; beginner-friendly; actionable
- **Code**: Syntax-highlighted; readable at any viewport size

---

## Error & Edge Cases Contract

### Behavior When Lesson Missing

```typescript
const lesson = getLessonById('non-existent');
// Returns: undefined
// Consumer responsibility: Render fallback or error page

if (!lesson) {
  return <div>Lesson not found.</div>;
}
```

### Behavior When No Lessons Exist

```typescript
const lessons = getAllLessons();
// Returns: []
// Consumer responsibility: Render "coming soon" message
```

### Behavior With Invalid State Update

```typescript
// If setState receives invalid key or value:
try {
  setState("invalidKey", "value");  // Key not in initialState
} catch (e) {
  console.error("State key not found");
  // Component continues to render with current state (no crash)
}
```

---

## Testing Contract

### Minimum Test Coverage

- [ ] Lesson renders without error
- [ ] All four explanations visible and readable
- [ ] Code snippet displayed and syntax-highlighted
- [ ] Button clicks update state correctly
- [ ] Component re-renders with new state
- [ ] Reset button returns to initial state
- [ ] Mobile (375px) readable; no horizontal scroll
- [ ] Keyboard navigation works (Tab through all buttons)
- [ ] Screen reader announces component updates
- [ ] High contrast meets AA standard (Lighthouse audit ≥90)

---

## Versioning & Breaking Changes

**Current Version**: 1.0

**Stability**: Stable; single lesson hardcoded.

**If Schema Changes** (e.g., add `difficulty` field):
- Add field to `Lesson` interface
- Update lesson definitions to include new field
- Treat old definitions without field as valid (use default value)
- No breaking change for existing lessons

---

## Sign-Off

**Defined by**: Planning workflow  
**Reviewed**: Architecture aligns with Constitution (accessible, beginner-focused, no external services)  
**Status**: Ready for implementation

**Next Steps**: 
1. Implement `app/src/data/lessons.ts` with BadgeToggleLesson
2. Create `LessonStarter.tsx` and child components
3. Add `/learn` route to LearningPage
4. Manual testing: interaction, state, accessibility
5. Verify against contract with manual tests
