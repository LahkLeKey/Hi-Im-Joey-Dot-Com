import LessonStarter from "@/components/lessons/LessonStarter";
import { getCurrentLesson } from "@/data/lessons";

export default function LearningPage() {
    const currentLesson = getCurrentLesson();

    return (
        <main className="min-h-screen bg-muted/20 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-6xl">
                <LessonStarter lessonId={currentLesson.id} />
            </div>
        </main>
    );
}
