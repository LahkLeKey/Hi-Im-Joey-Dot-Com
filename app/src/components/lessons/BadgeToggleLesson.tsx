import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import type { Lesson } from "@/data/lessons";

interface BadgeToggleLessonProps {
    lesson: Lesson;
    onStateChange: (nextState: Record<string, string>) => void;
}

export default function BadgeToggleLesson({ lesson, onStateChange }: BadgeToggleLessonProps) {
    const [state, setState] = useState<Record<string, string>>(lesson.initialState);

    const variant = useMemo(() => state.variant ?? "default", [state.variant]);

    function applyControl(key: string, value: string) {
        const nextState = { ...state, [key]: value };
        setState(nextState);
        onStateChange(nextState);
    }

    function resetToDefault() {
        setState(lesson.initialState);
        onStateChange(lesson.initialState);
    }

    return (
        <div className="space-y-4">
            <div className="flex min-h-20 items-center justify-center rounded-lg bg-muted/40 p-4">
                {lesson.renderComponent({ ...state, variant })}
            </div>
            <div className="flex flex-wrap gap-2" aria-label="Lesson controls">
                {lesson.controls.map((control) => (
                    <Button
                        key={control.id}
                        type="button"
                        variant="secondary"
                        className="min-h-11 min-w-24"
                        aria-label={control.ariaLabel ?? control.label}
                        onClick={() => applyControl(control.action.key, control.action.value)}
                    >
                        {control.label}
                    </Button>
                ))}
                <Button
                    type="button"
                    variant="outline"
                    className="min-h-11 min-w-24"
                    aria-label="Reset lesson to default state"
                    onClick={resetToDefault}
                >
                    Reset
                </Button>
            </div>
            <p className="text-sm text-muted-foreground">Current state: variant = {variant}</p>
        </div>
    );
}
