import { useMemo, useState } from "react";

import BadgeToggleLesson from "@/components/lessons/BadgeToggleLesson";
import CodeSnippet from "@/components/lessons/CodeSnippet";
import InteractiveOutput from "@/components/lessons/InteractiveOutput";
import LessonExplanation from "@/components/lessons/LessonExplanation";
import { Button } from "@/components/ui/button";
import { getAllLessons, getCurrentLesson, getLessonById } from "@/data/lessons";

interface LessonStarterProps {
    lessonId?: string;
}

export default function LessonStarter({ lessonId }: LessonStarterProps) {
    const allLessons = useMemo(() => getAllLessons(), []);
    const defaultLesson = useMemo(() => {
        if (lessonId) {
            return getLessonById(lessonId) ?? getCurrentLesson();
        }

        return getCurrentLesson();
    }, [lessonId]);

    const [activeLessonId, setActiveLessonId] = useState(defaultLesson.id);
    const [liveState, setLiveState] = useState(defaultLesson.initialState);

    const lesson = useMemo(() => {
        return getLessonById(activeLessonId) ?? defaultLesson;
    }, [activeLessonId, defaultLesson]);

    const statusMessage = `Preview updated. Active lesson: ${lesson.title}. State: ${JSON.stringify(liveState)}.`;

    return (
        <article className="lesson-shell">
            <header className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Interactive Lesson {allLessons.length > 1 ? `(${allLessons.length} planned)` : ""}
                </p>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{lesson.title}</h1>
                <p className="max-w-3xl text-base leading-7 text-muted-foreground">{lesson.learningGoal}</p>
                <div className="flex flex-wrap gap-2" aria-label="Lesson switcher">
                    {allLessons.map((candidate) => (
                        <Button
                            key={candidate.id}
                            type="button"
                            variant={candidate.id === lesson.id ? "default" : "outline"}
                            onClick={() => {
                                setActiveLessonId(candidate.id);
                                setLiveState(candidate.initialState);
                            }}
                            aria-label={`Open lesson ${candidate.title}`}
                        >
                            {candidate.title}
                        </Button>
                    ))}
                </div>
            </header>

            <div className="lesson-grid">
                <section className="space-y-4">
                    <InteractiveOutput componentName={lesson.componentLibrary} statusMessage={statusMessage}>
                        {lesson.id === "badge-toggle-v1" ? (
                            <BadgeToggleLesson lesson={lesson} onStateChange={setLiveState} />
                        ) : (
                            <div className="space-y-3">
                                {lesson.renderComponent(lesson.initialState)}
                                <p className="text-sm leading-6 text-muted-foreground">
                                    This lesson is scaffolded for extension work and intentionally read-only for now.
                                </p>
                            </div>
                        )}
                    </InteractiveOutput>
                </section>

                <section className="space-y-4">
                    <LessonExplanation explanations={lesson.explanation} />
                    <CodeSnippet snippet={lesson.codeSnippet} />
                </section>
            </div>
        </article>
    );
}
