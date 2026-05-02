import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import LessonStarter from "@/components/lessons/LessonStarter";

describe("Lesson explanation sections US2", () => {
    it("renders four required explanation sections", () => {
        render(<LessonStarter />);

        expect(screen.getByRole("heading", { name: "1. Component" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "2. State" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "3. Re-render" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "4. Action to Result" })).toBeInTheDocument();
    });
});
