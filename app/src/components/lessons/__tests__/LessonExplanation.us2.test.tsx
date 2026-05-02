import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import LessonStarter from "@/components/lessons/LessonStarter";

describe("Lesson explanation content US2", () => {
    it("shows the lesson goal and component name", () => {
        render(<LessonStarter />);

        expect(screen.getByText(/Use one click interaction to see how state changes/i)).toBeInTheDocument();
        expect(screen.getByText(/Component: Badge/i)).toBeInTheDocument();
    });
});
