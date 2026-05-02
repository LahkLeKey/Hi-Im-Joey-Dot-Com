import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import LessonStarter from "@/components/lessons/LessonStarter";

describe("Lesson responsive structure US3", () => {
    it("renders mobile-first shell classes that scale to desktop layout", () => {
        const { container } = render(<LessonStarter />);

        expect(container.querySelector(".lesson-shell")).toBeTruthy();
        expect(container.querySelector(".lesson-grid")).toBeTruthy();
        expect(container.querySelector(".lesson-code-block")).toBeTruthy();
    });
});
