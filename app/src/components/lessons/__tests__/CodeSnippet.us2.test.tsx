import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import LessonStarter from "@/components/lessons/LessonStarter";

describe("Code snippet panel US2", () => {
    it("renders file name, language, and code snippet content", () => {
        render(<LessonStarter />);

        expect(screen.getByText("BadgeToggleLesson.tsx")).toBeInTheDocument();
        expect(screen.getByText("tsx")).toBeInTheDocument();
        expect(screen.getByLabelText(/BadgeToggleLesson.tsx code snippet/i)).toHaveTextContent("useState");
    });
});
