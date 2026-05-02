import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import LessonStarter from "@/components/lessons/LessonStarter";

describe("Badge toggle reset US1", () => {
    it("returns to default state when reset is clicked", async () => {
        const user = userEvent.setup();

        render(<LessonStarter />);

        await user.click(screen.getByRole("button", { name: "Set badge to destructive variant" }));
        expect(screen.getByText(/variant = destructive/i)).toBeInTheDocument();

        await user.click(screen.getByRole("button", { name: "Reset lesson to default state" }));
        expect(screen.getByText(/variant = default/i)).toBeInTheDocument();
    });
});
