import type { LessonCodeSnippet } from "@/data/lessons";

interface CodeSnippetProps {
    snippet: LessonCodeSnippet;
}

export default function CodeSnippet({ snippet }: CodeSnippetProps) {
    return (
        <section aria-labelledby="code-snippet-title" className="space-y-3">
            <div className="lesson-code-meta">
                <h2 id="code-snippet-title" className="text-lg font-semibold">
                    Code View
                </h2>
                <div className="lesson-code-chrome" aria-label="Code metadata">
                    <span className="lesson-code-file">{snippet.fileName}</span>
                    <span className="lesson-code-language">{snippet.language}</span>
                </div>
            </div>
            <pre className="lesson-code-block" aria-label={`${snippet.fileName} code snippet`}>
                <code>{snippet.code}</code>
            </pre>
        </section>
    );
}
