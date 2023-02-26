import { Vibe } from "../models";
import { getThemeFromVibe } from "./theme";

describe("getThemeFromVibe", () => {
    it("should return a theme object when given dark red vibe", () => {
        const theme = getThemeFromVibe(Vibe.DARK_RED);
        console.log("theme", theme);
        expect(theme).not.toBe(undefined);
    });
});
