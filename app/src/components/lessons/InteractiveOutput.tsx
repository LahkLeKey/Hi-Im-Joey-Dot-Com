import type { ReactNode } from "react";

interface InteractiveOutputProps {
    componentName: string;
    statusMessage: string;
    children: ReactNode;
}

export default function InteractiveOutput({ componentName, statusMessage, children }: InteractiveOutputProps) {
    return (
        <section className="space-y-3" aria-labelledby="interactive-output-title">
            <div className="space-y-1">
                <h2 id="interactive-output-title" className="text-lg font-semibold">
                    Live Output
                </h2>
                <p className="text-sm text-muted-foreground">Component: {componentName}</p>
            </div>
            <div
                role="region"
                aria-live="polite"
                aria-label="Interactive component preview"
                className="rounded-lg border border-border bg-card p-4"
            >
                <p className="sr-only" data-testid="live-status-message">
                    {statusMessage}
                </p>
                {children}
            </div>
        </section>
    );
}
