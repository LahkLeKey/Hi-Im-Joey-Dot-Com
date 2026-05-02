import { Link, useParams } from "react-router-dom";

import PostContent from "@/components/blog/PostContent";
import PostHeader from "@/components/blog/PostHeader";
import BlogNotFoundPage from "@/pages/BlogNotFoundPage";
import { getPostBySlug } from "@/data/blog";

export default function BlogPostPage() {
    const { slug = "" } = useParams();
    const post = getPostBySlug(slug);

    if (!post) {
        return <BlogNotFoundPage />;
    }

    return (
        <main className="min-h-screen bg-muted/20 px-4 py-8 text-foreground sm:px-6 lg:px-8">
            <article className="mx-auto w-full max-w-3xl space-y-8 rounded-xl border border-border bg-background px-5 py-8 shadow-sm sm:px-8">
                <Link
                    to="/blog"
                    className="inline-flex rounded-sm text-sm font-medium text-muted-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                    Back to blog index
                </Link>
                <PostHeader post={post} />
                <PostContent post={post} />
            </article>
        </main>
    );
}
