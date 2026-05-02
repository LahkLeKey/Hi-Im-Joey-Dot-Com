import { format } from "date-fns";
import { Link } from "react-router-dom";

import type { Post } from "@/data/blog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PostCardProps = {
    post: Post;
};

export default function PostCard({ post }: PostCardProps) {
    return (
        <Card className="h-full border-border/70 shadow-sm transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-ring">
            <CardHeader className="space-y-2 pb-2">
                <CardTitle className="text-xl leading-tight sm:text-2xl">
                    <Link
                        to={`/blog/${post.slug}`}
                        className="rounded-sm underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:underline"
                    >
                        {post.title}
                    </Link>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    <time dateTime={post.date.toISOString()}>{format(post.date, "MMMM d, yyyy")}</time>
                </p>
            </CardHeader>
            {post.excerpt ? (
                <CardContent className="pt-0 text-sm leading-7 text-foreground/85 sm:text-base">
                    {post.excerpt}
                </CardContent>
            ) : null}
        </Card>
    );
}
