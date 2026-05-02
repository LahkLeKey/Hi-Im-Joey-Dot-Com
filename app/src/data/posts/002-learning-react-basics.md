---
title: "Learning React Basics"
date: "2026-05-02"
slug: "learning-react-basics"
excerpt: "A simple walkthrough of component, state, and re-render."
---

# Learning React Basics

Today I practiced the core React loop:

1. Build a component
2. Store values in state
3. Change state with an event
4. Watch the UI update

## Tiny example

```tsx
const [count, setCount] = useState(0)

return <button onClick={() => setCount((n) => n + 1)}>Count: {count}</button>
```

When state changes, React re-renders the component with fresh values.
