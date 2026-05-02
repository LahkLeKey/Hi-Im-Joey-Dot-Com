import type { LessonCodeSnippet } from "@/data/lessons";

interface CodeSnippetProps {
    snippet: LessonCodeSnippet;
}

function tokenize(code: string): string {
    const escaped = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    return escaped
        .replace(
            /(\b(?:const|let|return|import|from|export|function|useState)\b)/g,
            '<span class="token keyword">$1</span>',
        )
        .replace(/("[^"]*")/g, '<span class="token string">$1</span>')
        .replace(/(\{|\}|\(|\)|\[|\])/g, '<span class="token punctuation">$1</span>');
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
                <code dangerouslySetInnerHTML={{ __html: tokenize(snippet.code) }} />
            </pre>
        </section>
    );
}
