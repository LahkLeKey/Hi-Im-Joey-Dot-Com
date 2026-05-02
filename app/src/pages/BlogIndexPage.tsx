import EmptyBlogState from "@/components/blog/EmptyBlogState";
import PostCard from "@/components/blog/PostCard";
import { getBlogIndex } from "@/data/blog";

export default function BlogIndexPage() {
    const index = getBlogIndex();

    return (
        <main className="min-h-screen bg-muted/20 px-4 py-8 text-foreground sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-6xl space-y-8">
                <header className="space-y-3">
                    <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Joey updates</p>
                    <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">Blog</h1>
                    <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                        Notes from what I am building and learning, in plain language.
                    </p>
                </header>

                {index.totalCount === 0 ? (
                    <EmptyBlogState />
                ) : (
                    <section aria-label="Blog posts" className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {index.posts.map((post) => (
                            <PostCard key={post.slug} post={post} />
                        ))}
                    </section>
                )}
            </div>
        </main>
    );
}
