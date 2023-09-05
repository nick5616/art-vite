import {
    generateAccessibleColorFromBackground,
    hslToHex,
    hslToRgb,
    rgbToHsl,
} from "../portfolio/src/theme";

// describe("getThemeFromVibe", () => {
//     it("should return a theme object when given dark red vibe", () => {
//         const theme = getThemeFromVibe(Vibe.DARK_RED);
//         console.log("theme", theme);
//         expect(theme).not.toBe(undefined);
//     });
// });

describe("Hsl and Rgb conversions", () => {
    it("should correctly convert an HSL color into an RGB one", () => {
        const hsl = { hue: 0, saturation: 70, lightness: 20 };
        expect(hslToRgb(hsl)).toStrictEqual({ red: 87, green: 15, blue: 15 });
    });
    it("should correctly convert an RGB color into an HSL one", () => {
        const rgb = { red: 87, green: 15, blue: 15 };
        expect(rgbToHsl(rgb)).toStrictEqual({
            hue: 0,
            saturation: 70,
            lightness: 20,
        });
    });
    it("should convert rgb to hsl to hex", () => {
        const rgb = { red: 87, green: 15, blue: 15 };
        const hsl = rgbToHsl(rgb);
        const hex = hslToHex(hsl);
        expect(hex).toBe("#570f0f");
    });
    it("should do something", () => {
        expect(hslToHex({ hue: 90, saturation: 30, lightness: 50 })).toBe(
            "#80a659",
        );
    });
    it("should generate an acceptable color pairing from background color", () => {
        expect(
            generateAccessibleColorFromBackground({
                hue: 70,
                saturation: 70,
                lightness: 70,
            }).lightness,
        ).toBeGreaterThan(1);
    });
});
