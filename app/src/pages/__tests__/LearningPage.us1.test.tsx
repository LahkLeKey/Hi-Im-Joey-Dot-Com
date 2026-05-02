import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import LearningPage from "@/pages/LearningPage";

describe("LearningPage US1", () => {
    it("renders the first lesson with primary controls", () => {
        render(<LearningPage />);

        expect(screen.getByRole("heading", { name: "Badge Variant Toggle" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Set badge to secondary variant/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Set badge to destructive variant/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Reset lesson to default state/i })).toBeInTheDocument();
    });
});
