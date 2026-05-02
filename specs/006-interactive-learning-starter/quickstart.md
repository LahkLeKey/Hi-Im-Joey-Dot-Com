# Quickstart: Interactive Learning Starter Development & Deployment

**Feature**: 006-interactive-learning-starter  
**Date**: 2026-05-02

Get the interactive lesson running locally and learn how to add more lessons.

---

## Local Development Setup

### Prerequisites

- Node.js 18+ and `bun` installed
- Repository cloned locally
- VS Code or your preferred editor

### Step 1: Install Dependencies

From the `app/` directory:

```bash
cd app
bun install
```

### Step 2: Start Dev Server

```bash
bun run dev
```

Output:
```
VITE vX.X.X  ready in XXX ms

➜  Local:   http://localhost:5173/
```

Visit `http://localhost:5173/learn` in your browser. You should see the interactive lesson.

### Step 3: Try the Lesson

1. Open the lesson at `/learn`
2. Click the "Secondary" button — the Badge changes to secondary styling
3. Click "Destructive" — the Badge changes to destructive styling
4. Click "Reset" — the Badge returns to the default variant
5. Read the four explanation sections and compare them to the live output and code panel

### Step 4: Validate Tests and Build

From `app/` run:

```bash
bun run test
bun run build
```

Expected result:

- `vitest`: 9 tests pass for US1-US3 coverage
- `build`: TypeScript + Vite production build succeeds

---

## How the Lesson Works (For Your Understanding)

### The Three Parts

**1. Interactive Component**
```
┌─────────────────────┐
│  [Try me!] (Badge)  │
│                     │
│ [Secondary] [Destructive] [Reset] │
└─────────────────────┘
```
Joey clicks buttons; the Badge changes. State updates; component re-renders.

**2. Code Snippet**
```typescript
const [variant, setVariant] = useState("default");
<Badge variant={variant}>Try me!</Badge>
```
Joey sees the code that produces the behavior. One state value (`variant`) drives what appears on screen.

**3. Explanations**
- "What is a component?"
- "What is state?"
- "Why did the screen update?"
- "Your action → State change → New screen"

Joey reads and connects the interaction to concepts.

---

## How to Add a Second Lesson (Future)

When you're ready to add another interactive lesson, follow this pattern.

### Step 1: Define the Lesson Data

**File**: `app/src/data/lessons.ts`

Add a new lesson object alongside `BadgeToggleLesson`:

```typescript
// Example: Color Picker Lesson
export const ColorPickerLesson: Lesson = {
  id: "color-picker-v1",
  title: "Pick a Color",
  learningGoal: "Practice changing state and see the component update instantly.",

  explanation: {
    componentConcept: "This is a simple component that shows a preview box...",
    stateConcept: "The 'color' value is state. When you pick a color...",
    reRenderConcept: "Picking a new color updates the state...",
    actionToResult: "You clicked red. State changed to red. The box is now red.",
  },

  codeSnippet: {
    code: `
const [color, setColor] = useState("#FF0000");

return (
  <div style={{ background: color }} />
);
    `,
    language: "typescript",
    fileName: "ColorPickerLesson.tsx",
  },

  initialState: { color: "#FF0000" },

  controls: [
    { label: "🔴 Red", action: (setState) => setState("color", "#FF0000") },
    { label: "🔵 Blue", action: (setState) => setState("color", "#0000FF") },
    { label: "🟢 Green", action: (setState) => setState("color", "#00FF00") },
  ],

  renderComponent: (state) => (
    <div
      style={{
        width: "100px",
        height: "100px",
        background: state.color,
        borderRadius: "8px",
      }}
    />
  ),
};
```

### Step 2: Add to Lesson Index

In the same file (`app/src/data/lessons.ts`), update the `LESSON_INDEX`:

```typescript
export const LESSON_INDEX: LessonIndex = {
  lessons: [BadgeToggleLesson, ColorPickerLesson],  // Add new lesson
  current: BadgeToggleLesson,  // Or change to ColorPickerLesson to make it default
  totalCount: 2,
};
```

### Step 3: Update LessonStarter (If Needed)

`LessonStarter.tsx` already includes lesson switch plumbing using `getAllLessons()` and `getLessonById()`.

1. Add the new lesson object in `lessons.ts`
2. Add it to `LESSON_INDEX.lessons`
3. Set `available: true` when interaction is fully implemented
4. Confirm the lesson appears in the switcher on `/learn`

### Step 4: Test

1. Click all buttons; state updates correctly
2. Click Reset; returns to initial state
3. Mobile (375px): Readable and tappable
4. Keyboard: Tab through all buttons; all reachable
5. Screen reader: Explanations readable

### Step 5: Deploy

```bash
git add app/src/data/lessons.ts
git commit -m "learn: add color picker lesson"
git push origin main
```

Vercel builds and deploys automatically.

---

## File Locations

### Lesson Data

**File**: `app/src/data/lessons.ts`  
**What**: Defines lessons as JavaScript objects (title, explanations, code, state, controls)

### Lesson Components

```
app/src/components/lessons/
├── LessonStarter.tsx          # Main lesson container
├── InteractiveOutput.tsx      # Shows the component (Badge, color preview, etc.)
├── CodeSnippet.tsx            # Displays and highlights the code
├── LessonExplanation.tsx      # Shows the four explanations
└── LessonControls.tsx         # Shows the buttons (Secondary, Destructive, Reset)
```

### Learning Page

**File**: `app/src/pages/LearningPage.tsx`  
**What**: Route at `/learn`; loads the current lesson and renders it

---

## Troubleshooting

### Lesson doesn't appear

**Check**:
1. LearningPage route is registered in `App.tsx` ✓
2. Lesson is in `LESSON_INDEX.lessons` ✓
3. Dev server is running ✓

**Fix**:
- Check browser console (F12) for error messages
- Restart dev server (`bun run dev`)

### Buttons don't work

**Check**:
1. Button `onClick` handler is defined ✓
2. `setVariant` or state setter is called ✓
3. Component re-renders after state change ✓

**Fix**:
- Open React DevTools (Chrome extension) → Components tab
- Select lesson component; inspect state
- Check that state changes when button clicked

### Code snippet doesn't syntax-highlight

**Check**:
1. `CodeSnippet.tsx` is rendering the code ✓
2. Syntax highlighter library is imported ✓

**Fix**:
- Manually inspect code in DevTools
- Verify HTML output is correct

### Accessibility issue: Screen reader doesn't announce changes

**Check**:
1. `InteractiveOutput` has `role="region"` and `aria-live="polite"` ✓
2. Screen reader is on and listening ✓

**Fix**:
- Test with NVDA (Windows) or VoiceOver (Mac)
- Adjust `aria-live` region if needed

---

## What Happens Behind the Scenes

1. **You start dev server**: `bun run dev`
2. **Vite serves the app**: Browser loads `/learn`
3. **LearningPage renders**: Calls `getCurrentLesson()` from `lessons.ts`
4. **LessonStarter mounts**: Receives lesson object; creates React state
5. **You click a button**: `onClick` handler calls `setState("variant", "secondary")`
6. **Component re-renders**: Badge updates to new variant; explanations stay the same
7. **You see the change**: Instant (browser-only, no network delay)

**On Vercel Deploy**:
1. You push to main branch
2. Vercel webhook triggers: runs `bun run build`
3. Vite bundles app, including new lesson data
4. Output deployed to `https://hi-im-joey.vercel.app/learn`
5. Your new lesson is live

---

## Learning Goals per Lesson

### Badge Toggle Lesson (Starter, v1)

**Joey will understand:**
1. What a component is (a reusable piece of the interface)
2. What state is (remembered information that can change)
3. Why the interface updates when state changes (re-rendering)

**How Joey learns:** By interacting with the Badge, changing its variant, and reading explanations that connect each action to the concept.

---

## Next Steps

- **Try the lesson**: Click buttons, read explanations, understand the loop
- **Explore the code**: Open `app/src/data/lessons.ts` and `app/src/components/lessons/LessonStarter.tsx`
- **Plan your second lesson**: Think about what concept you want to teach next (e.g., form inputs, event handling)
- **Deploy**: Push your changes and visit the live site

---

## Getting Help

- **Questions about concepts?** Re-read the explanations in the lesson
- **Stuck on code?** Check [data-model.md](./data-model.md) for types and structure
- **Debugging React state?** Use [React DevTools](https://react-devtools-tutorial.vercel.app/) browser extension
- **Accessibility questions?** Read [research.md](./research.md) section "Accessibility Design"
- **Want to deploy?** See [main README.md](../../README.md) for git and deployment guide
