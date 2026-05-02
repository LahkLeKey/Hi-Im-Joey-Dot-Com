import { format } from "date-fns";

import type { Post } from "@/data/blog";

type PostHeaderProps = {
    post: Post;
};

export default function PostHeader({ post }: PostHeaderProps) {
    return (
        <header className="space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Blog post</p>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{post.title}</h1>
            <p className="text-sm text-muted-foreground">
                <time dateTime={post.date.toISOString()}>{format(post.date, "MMMM d, yyyy")}</time>
            </p>
        </header>
    );
}
