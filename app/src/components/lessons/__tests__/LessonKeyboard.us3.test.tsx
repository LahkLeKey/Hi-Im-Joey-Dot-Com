import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import LessonStarter from "@/components/lessons/LessonStarter";

describe("Lesson keyboard flow US3", () => {
    it("supports keyboard navigation through lesson controls", async () => {
        const user = userEvent.setup();

        render(<LessonStarter />);

        await user.tab();
        expect(screen.getByRole("button", { name: "Open lesson Badge Variant Toggle" })).toHaveFocus();

        await user.tab();
        expect(screen.getByRole("button", { name: "Open lesson Color Picker (Coming Next)" })).toHaveFocus();

        await user.tab();
        expect(screen.getByRole("button", { name: "Set badge to secondary variant" })).toHaveFocus();

        await user.tab();
        expect(screen.getByRole("button", { name: "Set badge to destructive variant" })).toHaveFocus();

        await user.tab();
        expect(screen.getByRole("button", { name: "Reset lesson to default state" })).toHaveFocus();
    });
});
