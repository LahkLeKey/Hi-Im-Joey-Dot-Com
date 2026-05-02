import { Link } from "react-router-dom";

export default function BlogNotFoundPage() {
    return (
        <main className="min-h-screen bg-muted/20 px-4 py-10 text-foreground sm:px-6 lg:px-8">
            <section className="mx-auto flex w-full max-w-2xl flex-col items-center rounded-xl border border-border bg-background px-6 py-12 text-center shadow-sm">
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Post not found</h1>
                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                    That post does not exist yet, or the URL is not correct.
                </p>
                <Link
                    to="/blog"
                    className="mt-6 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                    Back to blog index
                </Link>
            </section>
        </main>
    );
}
