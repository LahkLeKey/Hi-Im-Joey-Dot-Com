import type { ExplanationContent } from "@/data/lessons";

interface LessonExplanationProps {
    explanations: ExplanationContent;
}

export default function LessonExplanation({ explanations }: LessonExplanationProps) {
    return (
        <section aria-labelledby="lesson-explanations-title" className="space-y-4">
            <h2 id="lesson-explanations-title" className="text-lg font-semibold">
                Why This Works
            </h2>
            <div className="grid gap-3">
                <article className="rounded-lg border border-border bg-card p-4">
                    <h3 className="text-sm font-semibold text-foreground">1. Component</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{explanations.componentConcept}</p>
                </article>
                <article className="rounded-lg border border-border bg-card p-4">
                    <h3 className="text-sm font-semibold text-foreground">2. State</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{explanations.stateConcept}</p>
                </article>
                <article className="rounded-lg border border-border bg-card p-4">
                    <h3 className="text-sm font-semibold text-foreground">3. Re-render</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{explanations.reRenderConcept}</p>
                </article>
                <article className="rounded-lg border border-border bg-card p-4">
                    <h3 className="text-sm font-semibold text-foreground">4. Action to Result</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{explanations.actionToResult}</p>
                </article>
            </div>
        </section>
    );
}
