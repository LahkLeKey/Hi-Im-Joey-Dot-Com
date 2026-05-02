import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
    return (
        <section className="mx-auto flex w-full max-w-2xl flex-col gap-4 p-6">
            <h2 className="text-2xl font-semibold">About This Scaffold</h2>
            <p className="text-muted-foreground">
                This page shows the beginner pattern: pages compose reusable UI primitives.
            </p>
            <div className="flex items-center gap-3">
                <Badge variant="outline">Composed in src/pages</Badge>
                <Button variant="secondary">Built from src/components/ui</Button>
            </div>
        </section>
    );
}
