import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import LessonStarter from "@/components/lessons/LessonStarter";

describe("Lesson accessibility semantics US3", () => {
    it("exposes labeled controls and a polite live region", () => {
        render(<LessonStarter />);

        expect(screen.getByRole("region", { name: /Interactive component preview/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Set badge to secondary variant/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Set badge to destructive variant/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Reset lesson to default state/i })).toBeInTheDocument();
        expect(screen.getByTestId("live-status-message")).toHaveTextContent(/Preview updated/i);
    });
});
