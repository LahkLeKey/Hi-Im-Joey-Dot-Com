import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import LessonStarter from "@/components/lessons/LessonStarter";

describe("Badge toggle lesson US1", () => {
    it("changes badge state and remains stable over repeated interactions", async () => {
        const user = userEvent.setup();

        render(<LessonStarter />);

        await user.click(screen.getByRole("button", { name: "Set badge to secondary variant" }));
        expect(screen.getByText(/Current state: variant = secondary/i)).toBeInTheDocument();

        await user.click(screen.getByRole("button", { name: "Set badge to destructive variant" }));
        expect(screen.getByText(/Current state: variant = destructive/i)).toBeInTheDocument();

        await user.click(screen.getByRole("button", { name: "Set badge to secondary variant" }));
        expect(screen.getByText(/Current state: variant = secondary/i)).toBeInTheDocument();
    });
});
