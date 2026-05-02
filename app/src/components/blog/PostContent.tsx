import Markdown from "markdown-to-jsx";

import type { Post } from "@/data/blog";

type PostContentProps = {
    post: Post;
};

export default function PostContent({ post }: PostContentProps) {
    return (
        <div className="space-y-4 text-base leading-8 text-foreground/95">
            <Markdown
                options={{
                    disableParsingRawHTML: true,
                    overrides: {
                        h2: {
                            props: {
                                className: "mt-10 text-2xl font-semibold leading-tight tracking-tight",
                            },
                        },
                        h3: {
                            props: {
                                className: "mt-8 text-xl font-semibold leading-tight tracking-tight",
                            },
                        },
                        p: {
                            props: {
                                className: "text-base leading-8 text-foreground/90",
                            },
                        },
                        ul: {
                            props: {
                                className: "list-disc pl-6",
                            },
                        },
                        ol: {
                            props: {
                                className: "list-decimal pl-6",
                            },
                        },
                        a: {
                            props: {
                                className: "text-foreground underline underline-offset-4",
                            },
                        },
                        code: {
                            props: {
                                className:
                                    "rounded bg-muted px-1.5 py-0.5 text-[0.9em] leading-none break-words",
                            },
                        },
                        pre: {
                            props: {
                                className:
                                    "overflow-x-auto rounded-lg border border-border bg-muted/30 p-4 text-sm",
                            },
                        },
                    },
                }}
            >
                {post.bodyHtml}
            </Markdown>
        </div>
    );
}
