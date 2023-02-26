import { HslColor, Theme, Vibe } from "../models";

// function asHsl(color: RgbColor): string {
//     return "rgb(" + color.red + "," + color.green + "," + color.blue + ")";
// }

function getHueValue(vibe: Vibe): number {
    switch (vibe) {
        case Vibe.DARK_RED:
            return 0;
        case Vibe.ITS_CORN:
            return 60;
        case Vibe.EARTH_DAY_2017:
            return 120;
        case Vibe.BABY_BLUE:
            return 180;
        case Vibe.PRUSSIAN_BLUE:
            return 240;
        case Vibe.DEEP_PURPLE:
            return 300;
        default:
            return 0;
    }
}
// function accessibleContrastRatio(color1: RgbColor, color2: RgbColor) {
//     return (
//         contrastRatio(relativeLuminance(color1), relativeLuminance(color2)) >=
//         7.0
//     );
// }

// function contrastRatio(lum1: number, lum2: number) {
//     let l1 = Math.max(lum1, lum2);
//     let l2 = Math.min(lum1, lum2);
//     let cr = (l1 + 0.05) / (l2 + 0.05);
//     return cr;
// }

// function rgbToHsl(rgb: RgbColor): HslColor {
//     let r = rgb.red;
//     let g = rgb.green;
//     let b = rgb.blue;
//     r /= 255;
//     g /= 255;
//     b /= 255;

//     let cmin = Math.min(r, g, b),
//         cmax = Math.max(r, g, b),
//         delta = cmax - cmin,
//         h = 0,
//         s = 0,
//         l = 0;
//     if (delta == 0) {
//         h = 0;
//     } else if (cmax == r) {
//         h = ((g - b) / delta) % 6;
//     } else if (cmax == g) {
//         h = (b - r) / delta + 2;
//     } else {
//         h = (r - g) / delta + 4;
//     }

//     h = Math.round(h * 60);

//     if (h < 0) h += 360;
//     l = (cmax + cmin) / 2;

//     s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

//     s = +(s * 100).toFixed(1);
//     l = +(l * 100).toFixed(1);

//     return { hue: h, saturation: s, lightness: l };
// }

// function hslToRgb(hsl: HslColor): RgbColor {
//     hsl.saturation /= 100;
//     hsl.lightness /= 100;

//     let c = (1 - Math.abs(2 * hsl.lightness - 1)) * hsl.saturation,
//         x = c * (1 - Math.abs(((hsl.hue / 60) % 2) - 1)),
//         m = hsl.lightness - c / 2,
//         r = 0,
//         g = 0,
//         b = 0;
//     if (0 <= hsl.hue && hsl.hue < 60) {
//         r = c;
//         g = x;
//         b = 0;
//     } else if (60 <= hsl.hue && hsl.hue < 120) {
//         r = x;
//         g = c;
//         b = 0;
//     } else if (120 <= hsl.hue && hsl.hue < 180) {
//         r = 0;
//         g = c;
//         b = x;
//     } else if (180 <= hsl.hue && hsl.hue < 240) {
//         r = 0;
//         g = x;
//         b = c;
//     } else if (240 <= hsl.hue && hsl.hue < 300) {
//         r = x;
//         g = 0;
//         b = c;
//     } else if (300 <= hsl.hue && hsl.hue < 360) {
//         r = c;
//         g = 0;
//         b = x;
//     }

//     r = Math.round((r + m) * 255);
//     g = Math.round((g + m) * 255);
//     b = Math.round((b + m) * 255);

//     return {
//         red: r as RgbComponentValue,
//         green: g as RgbComponentValue,
//         blue: b as RgbComponentValue,
//     };
// }

export function hslToHex(hsl: HslColor): string {
    hsl.lightness /= 100;
    const a =
        (hsl.saturation * Math.min(hsl.lightness, 1 - hsl.lightness)) / 100;
    const f = (n: any) => {
        const k = (n + hsl.hue / 30) % 12;
        const color =
            hsl.lightness - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color)
            .toString(16)
            .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

// function transformPigment(pigment: number) {
//     if (pigment <= 0.03928) {
//         return pigment / 12.92;
//     } else {
//         return Math.pow((pigment + 0.055) / 1.055, 2.4);
//     }
// }

// function normalizePigment(pigment: number) {
//     return pigment / 255;
// }

// function relativeLuminance(color: RgbColor) {
//     return (
//         0.2126 * transformPigment(normalizePigment(color.red)) +
//         0.7152 * transformPigment(normalizePigment(color.green)) +
//         0.0722 * transformPigment(normalizePigment(color.blue))
//     );
// }

// function satisfactoryContrastRatio(rgbColor1: RgbColor, rgbColor2: RgbColor) {
//     return (
//         contrastRatio(
//             relativeLuminance(rgbColor1),
//             relativeLuminance(rgbColor2),
//         ) >= 7
//     );
// }

// function lightenColor(color: HslColor): HslColor {
//     color.lightness += 10;
//     if (color.lightness > 100) {
//         color.lightness = 100;
//     }
//     return color;
// }

// function darkenColor(color: HslColor): HslColor {
//     color.lightness -= 10;
//     if (color.lightness < 0) {
//         color.lightness = 0;
//     }
//     return color;
// }

function getAnalogousColor(hsl: HslColor): HslColor {
    let newHue;
    console.log("old hue", hsl.hue);
    if (hsl.hue < 30) {
        newHue = hsl.hue + 30;
    } else if (hsl.hue > 330) {
        newHue = hsl.hue - 30;
    } else {
        const coinFlip = Math.round(Math.random());
        if (coinFlip == 0) {
            newHue = hsl.hue + 30;
            if (hsl.hue > 360) {
                hsl.hue -= 360;
            }
        } else {
            newHue = hsl.hue - 30;
            if (hsl.hue > 360) {
                hsl.hue -= 360;
            }
        }
    }
    console.log("new", newHue);
    return {
        hue: newHue,
        saturation: hsl.saturation,
        lightness: hsl.lightness,
    };
}

/**
 * TODO: Generalize this function to `generateColorScheme`
 * Then provide the configuration scheme as an optional argument.
 * @param backgroundColor
 * @param **Future:** Color scheme
 * (Monochromatic, Analogous, Complementary, Split-complementary, Triadic, Square, Rectangle)
 * @returns
 */
function generateAnalogousColorScheme(
    backgroundColor: HslColor,
): [HslColor, HslColor] {
    let accessible = true;
    let analogousColor = getAnalogousColor(backgroundColor);
    // while (
    //     !satisfactoryContrastRatio(
    //         hslToRgb(analogousColor),
    //         hslToRgb(backgroundColor),
    //     )
    // ) {
    //     if (backgroundColor.lightness < 50) {
    //         if (analogousColor.lightness <= 90)
    //             analogousColor = lightenColor(analogousColor);
    //         else {
    //             analogousColor.lightness = 100;
    //             let cr = contrastRatio(
    //                 relativeLuminance(hslToRgb(analogousColor)),
    //                 relativeLuminance(hslToRgb(backgroundColor)),
    //             );
    //             if (cr < 4.5) accessible = false;
    //             break;
    //         }
    //     } else {
    //         if (analogousColor.lightness > 10)
    //             analogousColor = darkenColor(analogousColor);
    //         else {
    //             analogousColor.lightness = 0;
    //             let cr = contrastRatio(
    //                 relativeLuminance(hslToRgb(analogousColor)),
    //                 relativeLuminance(hslToRgb(backgroundColor)),
    //             );
    //             if (cr < 4.5) accessible = false;
    //             break;
    //         }
    //     }
    // }
    if (!accessible) {
        throw new Error("could not generate an accessible color scheme");
    }
    return [analogousColor, backgroundColor];
}

export function getThemeFromVibe(vibe: Vibe): Theme {
    const backgroundColor = {
        hue: getHueValue(vibe),
        saturation: 70,
        lightness: 70,
    };

    const [colorHsl, backgroundColorHsl] =
        generateAnalogousColorScheme(backgroundColor);

    const theme: Theme = {
        backgroundColor: hslToHex(backgroundColorHsl),
        color: hslToHex(colorHsl),
        border: "4px solid white",
    };

    return theme;
}
