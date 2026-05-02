import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
    const [hasAcknowledgedSupport, setHasAcknowledgedSupport] = useState(false);

    return (
        <main className="min-h-screen bg-muted/30 px-4 py-8 text-foreground sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 sm:gap-5">
                <section aria-labelledby="joey-story-heading">
                    <Card className="border-none shadow-sm ring-1 ring-foreground/10">
                        <CardHeader className="gap-3">
                            <Badge variant="secondary" className="w-fit">
                                Joey&apos;s story
                            </Badge>
                            <CardTitle
                                id="joey-story-heading"
                                className="text-3xl leading-tight sm:text-4xl"
                            >
                                Hi, I&apos;m Joey.
                            </CardTitle>
                            <CardDescription className="max-w-2xl text-base leading-7 text-foreground/80">
                                I&apos;m homeless, carrying about $3 million in medical debt,
                                and trying to build a future that is calmer and more stable
                                than what life looks like right now.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-1">
                            <div className="rounded-lg border border-border bg-background/80 p-4">
                                <CardTitle className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                                    What I need right now
                                </CardTitle>
                                <CardDescription className="mt-2 text-base leading-7 text-foreground/80">
                                    I need $600 each week so I can stay off the streets and keep
                                    moving toward something steady.
                                </CardDescription>
                            </div>
                            <div className="rounded-lg border border-border bg-background/80 p-4">
                                <CardTitle className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                                    What I&apos;m building toward
                                </CardTitle>
                                <CardDescription className="mt-2 text-base leading-7 text-foreground/80">
                                    I&apos;m learning to code so I can support myself with real skills
                                    and keep building this site in public.
                                </CardDescription>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                <section aria-labelledby="support-heading">
                    <Card className="border-none shadow-sm ring-1 ring-foreground/10">
                        <CardHeader className="gap-3">
                            <Badge variant="outline" className="w-fit">
                                $600 a week
                            </Badge>
                            <CardTitle id="support-heading" className="text-2xl leading-tight">
                                One simple way to help me stay steady
                            </CardTitle>
                            <CardDescription className="text-base leading-7 text-foreground/80">
                                That weekly amount covers the immediate basics that keep me from
                                falling further behind while I keep learning and applying for work.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-1">
                            <Button
                                type="button"
                                className="w-full sm:w-auto"
                                onClick={() => setHasAcknowledgedSupport(true)}
                            >
                                I can help with Joey&apos;s $600/week goal
                            </Button>
                            {hasAcknowledgedSupport ? (
                                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm leading-6 text-foreground">
                                    Thank you for taking a moment here. Even noticing the goal and
                                    being willing to help means I&apos;m not carrying this alone.
                                </div>
                            ) : (
                                <CardDescription className="text-sm leading-6">
                                    The button stays on this page and simply acknowledges your
                                    support, so the site remains easy to understand and safe to
                                    deploy.
                                </CardDescription>
                            )}
                        </CardContent>
                    </Card>
                </section>

                <section aria-labelledby="learning-anchor-heading">
                    <Card className="border-none shadow-sm ring-1 ring-foreground/10">
                        <CardHeader className="gap-3">
                            <Badge variant="secondary" className="w-fit">
                                Learning anchor
                            </Badge>
                            <CardTitle
                                id="learning-anchor-heading"
                                className="text-2xl leading-tight"
                            >
                                These are the components I edited to build this page
                            </CardTitle>
                            <CardDescription className="text-base leading-7 text-foreground/80">
                                I left this section visible so I can point at the page, name each
                                part, and connect what I see in the browser to what I changed in
                                the code.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-1">
                            <div className="space-y-3">
                                <div>
                                    <CardTitle className="text-base">Card</CardTitle>
                                    <CardDescription className="mt-1 leading-6">
                                        Cards hold each section so the story, support ask, and
                                        learning notes stay grouped together.
                                    </CardDescription>
                                </div>
                                <Separator />
                                <div>
                                    <CardTitle className="text-base">Badge</CardTitle>
                                    <CardDescription className="mt-1 leading-6">
                                        Badges add short labels that tell you what each section is
                                        about before you read the full copy.
                                    </CardDescription>
                                </div>
                                <Separator />
                                <div>
                                    <CardTitle className="text-base">Button</CardTitle>
                                    <CardDescription className="mt-1 leading-6">
                                        The button is the one interactive piece on the page and it
                                        triggers the support acknowledgment.
                                    </CardDescription>
                                </div>
                                <Separator />
                                <div>
                                    <CardTitle className="text-base">Separator</CardTitle>
                                    <CardDescription className="mt-1 leading-6">
                                        Separators break the learning list into small steps so it is
                                        easier to scan on a phone.
                                    </CardDescription>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </main>
    );
}