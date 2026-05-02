export default function EmptyBlogState() {
    return (
        <section
            aria-label="Empty blog state"
            className="rounded-xl border border-dashed border-border bg-muted/30 px-6 py-14 text-center"
        >
            <h2 className="text-2xl font-semibold tracking-tight">No posts yet</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                No posts yet. Check back soon. I am adding new updates as I keep learning.
            </p>
        </section>
    );
}
