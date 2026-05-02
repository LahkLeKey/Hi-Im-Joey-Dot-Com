import {Badge} from '@/components/ui/badge';
import {createElement, type ReactNode} from 'react';

export interface LessonStateValue {
  key: string;
  value: string;
}

export interface Control {
  id: string;
  label: string;
  description?: string;
  ariaLabel?: string;
  action: LessonStateValue;
}

export interface ExplanationContent {
  componentConcept: string;
  stateConcept: string;
  reRenderConcept: string;
  actionToResult: string;
}

export interface LessonCodeSnippet {
  code: string;
  language: 'typescript'|'javascript'|'tsx';
  fileName: string;
}

export interface Lesson {
  id: string;
  title: string;
  learningGoal: string;
  componentLibrary: string;
  explanation: ExplanationContent;
  codeSnippet: LessonCodeSnippet;
  initialState: Record<string, string>;
  controls: Control[];
  renderComponent: (state: Record<string, string>) => ReactNode;
  available: boolean;
}

export interface LessonIndex {
  lessons: Lesson[];
  current: Lesson;
  totalCount: number;
}

const badgeToggleLesson: Lesson = {
  id: 'badge-toggle-v1',
  title: 'Badge Variant Toggle',
  learningGoal:
      'Use one click interaction to see how state changes a component and triggers a re-render.',
  componentLibrary: 'Badge',
  explanation: {
    componentConcept:
        'A component is a reusable UI block. The badge preview is a component that can appear in many places with different styles.',
    stateConcept:
        'State is remembered data inside a component. Here, the state stores which badge variant should be displayed.',
    reRenderConcept:
        'When state changes, React runs the component again with the new value, then updates the screen to match.',
    actionToResult:
        'Your button click changes the variant in state. React re-renders, and you immediately see a different badge style.',
  },
  codeSnippet: {
    fileName: 'BadgeToggleLesson.tsx',
    language: 'tsx',
    code: `import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export function BadgeToggleLesson() {
  const [variant, setVariant] = useState("default");

  return (
    <>
      <Badge variant={variant}>Current variant: {variant}</Badge>
      <button onClick={() => setVariant("secondary")}>Secondary</button>
      <button onClick={() => setVariant("destructive")}>Destructive</button>
      <button onClick={() => setVariant("default")}>Reset</button>
    </>
  );
}`,
  },
  initialState: {variant: 'default'},
  controls: [
    {
      id: 'secondary',
      label: 'Secondary',
      ariaLabel: 'Set badge to secondary variant',
      action: {key: 'variant', value: 'secondary'},
    },
    {
      id: 'destructive',
      label: 'Destructive',
      ariaLabel: 'Set badge to destructive variant',
      action: {key: 'variant', value: 'destructive'},
    },
  ],
  renderComponent: (state) => createElement(
      Badge,
      {
        variant: ((state.variant as 'default' | 'secondary' | 'destructive') ??
                  'default') as
            | 'default' | 'secondary' | 'destructive',
      },
      `Current variant: ${state.variant ?? 'default'}`,
      ),
  available: true,
};

const colorPickerLessonPlaceholder: Lesson = {
  id: 'color-picker-v1',
  title: 'Color Picker (Coming Next)',
  learningGoal:
      'Preview a second lesson slot so new lessons can be added without changing the page layout.',
  componentLibrary: 'Custom Box',
  explanation: {
    componentConcept:
        'This second lesson slot proves the lesson architecture is extensible and can host additional concepts.',
    stateConcept:
        'Future state will track a selected color value and update the preview box.',
    reRenderConcept:
        'When the selected color state changes, React will re-render the preview with a new background color.',
    actionToResult:
        'In a follow-up lesson, selecting a color will update state and immediately repaint the preview component.',
  },
  codeSnippet: {
    fileName: 'ColorPickerLesson.tsx',
    language: 'tsx',
    code: `// Placeholder for lesson two scaffold
const [color, setColor] = useState("#1D4ED8");

return <div style={{ background: color }} />;`,
  },
  initialState: {color: '#1D4ED8'},
  controls: [],
  renderComponent: () => createElement(
      'div',
      {
        className:
            'rounded-lg border border-dashed border-muted-foreground/50 px-3 py-2 text-sm text-muted-foreground',
      },
      'Lesson 2 scaffold: color picker interaction coming next.',
      ),
  available: false,
};

const lessons: Lesson[] = [badgeToggleLesson, colorPickerLessonPlaceholder];

export const LESSON_INDEX: LessonIndex = {
  lessons,
  current: lessons[0],
  totalCount: lessons.length,
};

export function getCurrentLesson(): Lesson {
  return LESSON_INDEX.current;
}

export function getLessonById(id: string): Lesson|undefined {
  return LESSON_INDEX.lessons.find((lesson) => lesson.id === id);
}

export function getAllLessons(): Lesson[] {
  return [...LESSON_INDEX.lessons];
}
