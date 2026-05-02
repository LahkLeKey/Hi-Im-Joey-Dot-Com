import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
    { label: "Home", to: "/" },
    { label: "Blog", to: "/blog" },
    { label: "Learn", to: "/learn" },
] as const;

function NavLink({
    to,
    label,
    currentPath,
    onClick,
}: {
    to: string;
    label: string;
    currentPath: string;
    onClick?: () => void;
}) {
    const isActive =
        to === "/" ? currentPath === "/" : currentPath.startsWith(to);

    return (
        <Button
            variant={isActive ? "secondary" : "ghost"}
            size="sm"
            render={<Link to={to} onClick={onClick} />}
        >
            {label}
        </Button>
    );
}

export default function SiteNav() {
    const { pathname } = useLocation();
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Site name */}
                <Link
                    to="/"
                    className="text-sm font-semibold tracking-tight text-foreground hover:text-foreground/80 transition-colors"
                >
                    Hi, I'm Joey
                </Link>

                {/* Desktop nav */}
                <nav
                    aria-label="Site navigation"
                    className="hidden items-center gap-1 sm:flex"
                >
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            label={link.label}
                            currentPath={pathname}
                        />
                    ))}
                </nav>

                {/* Mobile hamburger */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger
                        render={
                            <Button
                                variant="ghost"
                                size="sm"
                                className="sm:hidden"
                                aria-label="Open navigation menu"
                            />
                        }
                    >
                        <span className="flex h-5 w-5 flex-col justify-between py-0.5" aria-hidden>
                            <span className="block h-0.5 w-full bg-foreground rounded" />
                            <span className="block h-0.5 w-full bg-foreground rounded" />
                            <span className="block h-0.5 w-full bg-foreground rounded" />
                        </span>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-56">
                        <SheetHeader>
                            <SheetTitle className="text-left text-sm">Menu</SheetTitle>
                        </SheetHeader>
                        <nav
                            aria-label="Mobile site navigation"
                            className="mt-4 flex flex-col gap-1"
                        >
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    label={link.label}
                                    currentPath={pathname}
                                    onClick={() => setOpen(false)}
                                />
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
