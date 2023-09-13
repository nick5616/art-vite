import {
    AccessibleColorPair,
    AccessibleHslColor,
    ColorPair,
    ColorScheme,
    HslColor,
    RgbColor,
    RgbComponentValue,
    Theme,
    Vibe,
} from "./models";

const PIGMENT_MODIFICATION_AMOUNT = 2;

export function rgbAsString(color: RgbColor): string {
    return "rgb(" + color.red + "," + color.green + "," + color.blue + ")";
}
/*  
                getThemeFromVibe(vibe)
                        |
                        (scheme, border, palette)
        \                     |               |
            \                 / _____________/              
                \          /
                 \      /
                  |    |
                (vibe, n)
              /     |     \
            /       |       \
          /         |          \
         /          |              \
        /           |                \
       /            |                 \
      /             |                   \              
getHueValue + getSaturationValue + getLightnessValue

*/
/**
 *
 * @param vibe
 * @param n
 * @returns
 */
function getHueValue(vibe: Vibe, hueShiftAmount: number): number {
    switch (vibe) {
        case Vibe.DARK_RED:
            return 0 + hueShiftAmount;
        case Vibe.ITS_CORN:
            return 60 + hueShiftAmount;
        case Vibe.EARTH_DAY_2017:
            return 120 + hueShiftAmount;
        case Vibe.BABY_BLUE:
            return 180 + hueShiftAmount;
        case Vibe.PRUSSIAN_BLUE:
            return 240 + hueShiftAmount;
        case Vibe.DEEP_PURPLE:
            return 295 + hueShiftAmount;
        default:
            return 0 + hueShiftAmount;
    }
}

export function accessibleContrastRatio(color1: RgbColor, color2: RgbColor) {
    return (
        contrastRatio(relativeLuminance(color1), relativeLuminance(color2)) >=
        7.0
    );
}

export function contrastRatio(lum1: number, lum2: number) {
    let l1 = Math.max(lum1, lum2);
    let l2 = Math.min(lum1, lum2);
    let cr = (l1 + 0.05) / (l2 + 0.05);
    return cr;
}

export function rgbToHsl(rgb: RgbColor): HslColor {
    let r = rgb.red;
    let g = rgb.green;
    let b = rgb.blue;
    r /= 255;
    g /= 255;
    b /= 255;

    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
    if (delta == 0) {
        h = 0;
    } else if (cmax == r) {
        h = ((g - b) / delta) % 6;
    } else if (cmax == g) {
        h = (b - r) / delta + 2;
    } else {
        h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);

    if (h < 0) h += 360;
    l = (cmax + cmin) / 2;

    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return {
        hue: Math.floor(h),
        saturation: Math.floor(s),
        lightness: Math.floor(l),
    };
}

export function hslToRgb(hsl: HslColor): RgbColor {
    const s = hsl.saturation / 100;
    const l = hsl.lightness / 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs(((hsl.hue / 60) % 2) - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;
    if (0 <= hsl.hue && hsl.hue < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (60 <= hsl.hue && hsl.hue < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (120 <= hsl.hue && hsl.hue < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (180 <= hsl.hue && hsl.hue < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (240 <= hsl.hue && hsl.hue < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (300 <= hsl.hue && hsl.hue < 360) {
        r = c;
        g = 0;
        b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    return {
        red: r as RgbComponentValue,
        green: g as RgbComponentValue,
        blue: b as RgbComponentValue,
    };
}

export function hslToHex(hsl: HslColor): string {
    const { hue: h, saturation: s, lightness: l }: HslColor = { ...hsl };
    const hDecimal = l / 100;
    const a = (s * Math.min(hDecimal, 1 - hDecimal)) / 100;
    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = hDecimal - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color)
            .toString(16)
            .padStart(2, "0");
    };
    const hex = `#${f(0)}${f(8)}${f(4)}`;
    return hex;
}

function transformPigment(pigment: number) {
    if (pigment <= 0.04045) {
        return pigment / 12.92;
    } else {
        return Math.pow((pigment + 0.055) / 1.055, 2.4);
    }
}

function normalizePigment(pigment: number) {
    return pigment / 255;
}

function relativeLuminance(color: RgbColor) {
    return (
        0.2126 * transformPigment(normalizePigment(color.red)) +
        0.7152 * transformPigment(normalizePigment(color.green)) +
        0.0722 * transformPigment(normalizePigment(color.blue))
    );
}

export function lightenColor(color: HslColor): HslColor {
    const lightenedLightness = color.lightness + PIGMENT_MODIFICATION_AMOUNT;
    console.log("new lightness", lightenedLightness);

    if (lightenedLightness > 100) {
        return {
            hue: color.hue,
            saturation: color.saturation,
            lightness: 0,
        };
    }
    return {
        hue: color.hue,
        saturation: color.saturation,
        lightness: lightenedLightness,
    };
}

export function darkenColor(color: HslColor): HslColor {
    const darkenedLightness = color.lightness - PIGMENT_MODIFICATION_AMOUNT;

    if (darkenedLightness < 0) {
        return {
            hue: color.hue,
            saturation: color.saturation,
            lightness: 100,
        };
    }

    return {
        hue: color.hue,
        saturation: color.saturation,
        lightness: darkenedLightness,
    };
}

function addContrastToForeground(
    backgroundColor: HslColor,
    color = { ...backgroundColor },
): HslColor {
    const newColor =
        backgroundColor.lightness > 50
            ? darkenColor(color)
            : lightenColor(color);
    return newColor;
}

export function getAnalogousColor(hsl: HslColor): HslColor {
    let newHue;
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
    return {
        hue: newHue,
        saturation: hsl.saturation,
        lightness: hsl.lightness,
    };
}

function pickBackgroundColor(vibe: Vibe, n: number): HslColor {
    const hueShiftAmount = getHueShiftAmount(getColorSchemeFromVibe(vibe), n);
    const hue = getHueValue(vibe, hueShiftAmount);
    switch (vibe) {
        case Vibe.DARK_RED:
            return { hue, saturation: 70, lightness: 20 };
        case Vibe.ITS_CORN:
            return { hue, saturation: 70, lightness: 90 };
        case Vibe.EARTH_DAY_2017:
            return { hue, saturation: 70, lightness: 90 };
        case Vibe.BABY_BLUE:
            return { hue, saturation: 80, lightness: 80 };
        case Vibe.PRUSSIAN_BLUE:
            return { hue, saturation: 70, lightness: 20 };
        case Vibe.DEEP_PURPLE:
            return { hue, saturation: 85, lightness: 10 };
        default:
            return { hue, saturation: 70, lightness: 20 };
    }
}
function getHueShiftAmount(
    colorScheme: ColorScheme,
    timesShifted: number,
): number {
    switch (colorScheme) {
        case ColorScheme.ANALOGOUS:
            return timesShifted === 0 ? 0 : 30;
        case ColorScheme.COMPLEMENTARY:
            return timesShifted * 180;
        case ColorScheme.SPLIT_COMPLEMENTARY:
            return timesShifted === 0 ? 150 : 60;
        case ColorScheme.SQUARE:
            return timesShifted * 90;
        case ColorScheme.TETRADIC:
            if (timesShifted === 0) {
                return 60;
            } else if (timesShifted === 1) {
                return 60 + 120;
            } else if (timesShifted === 2) {
                return 60 + 120 + 60;
            }

            return timesShifted % 2 === 0 ? 60 : 120;
        case ColorScheme.TRIADIC:
            return timesShifted * 120;
        default:
            console.log("default");
            return 0;
    }
}

export function generateRandomNumberExcluding(exclude: number[], max: number) {
    let chosenNumber = Math.floor(Math.random() * max);
    while (exclude.includes(chosenNumber)) {
        chosenNumber = Math.floor(Math.random() * max);
    }
    return chosenNumber;
}

function satisfactoryContrastRatio(
    rgbColor1: RgbColor,
    rgbColor2: RgbColor,
): boolean {
    // const y1 = relativeLuminance(rgbColor1);
    // const y2 = relativeLuminance(rgbColor2);
    return (
        contrastRatio(
            relativeLuminance(rgbColor1),
            relativeLuminance(rgbColor2),
        ) >= 7
    );
}

export function generateAccessibleColorFromBackground(
    backgroundColor: HslColor,
): AccessibleHslColor {
    let color = addContrastToForeground(backgroundColor);
    let accessible = true;
    const contrastRatioAcceptable = satisfactoryContrastRatio(
        hslToRgb(color),
        hslToRgb(backgroundColor),
    );
    console.log("contrast ratio acceptable", contrastRatioAcceptable);
    while (
        !satisfactoryContrastRatio(hslToRgb(color), hslToRgb(backgroundColor))
    ) {
        if (backgroundColor.lightness < 50) {
            if (color.lightness <= 90) {
                color = lightenColor(color);
            } else {
                color.lightness = 100;
                let cr = contrastRatio(
                    relativeLuminance(hslToRgb(color)),
                    relativeLuminance(hslToRgb(backgroundColor)),
                );
                if (cr < 4.5) {
                    console.log(
                        "🚨the final color combo was found to be inaccessible",
                    );
                    accessible = true;
                }
                break;
            }
        } else {
            if (color.lightness > PIGMENT_MODIFICATION_AMOUNT) {
                color = darkenColor(color);
            } else {
                color.lightness = 0;
                // let cr = contrastRatio(
                //     relativeLuminance(hslToRgb(color)),
                //     relativeLuminance(hslToRgb(backgroundColor)),
                // );
                // if (cr < 4.5) {
                //     console.log(
                //         "🚨the final color combo was found to be inaccessible",
                //     );
                //     accessible = true;
                // }
                break;
            }
        }
    }
    const contrastRatioAcceptableAfterLoop = satisfactoryContrastRatio(
        hslToRgb(color),
        hslToRgb(backgroundColor),
    );
    console.log(
        "contrast ratio acceptable after while loop",
        contrastRatioAcceptableAfterLoop,
    );
    let cr = contrastRatio(
        relativeLuminance(hslToRgb(color)),
        relativeLuminance(hslToRgb(backgroundColor)),
    );

    if (!accessible) {
        throw new Error("could not generate an accessible color scheme");
    }
    return {
        color,
        isAccessible: contrastRatioAcceptableAfterLoop,
        contrastRatio: cr,
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
export function generateColorPalette(
    vibe: Vibe,
    scheme: ColorScheme,
): AccessibleColorPair[] {
    const numColors = getNumberOfColorsInScheme(scheme);
    const colorPairs: AccessibleColorPair[] = [];
    for (let n = 0; n < numColors; n++) {
        const backgroundColor = pickBackgroundColor(vibe, n);
        console.log("picked backgroundColor", backgroundColor);
        const accessibleColor =
            generateAccessibleColorFromBackground(backgroundColor);
        colorPairs.push({
            colorPair: {
                color: hslToHex(accessibleColor.color),
                backgroundColor: hslToHex(backgroundColor),
            },
            isAccessible: accessibleColor.isAccessible,
        });
    }
    return colorPairs;
}

export function getRandomBackgroundColorFromPalette(palette: ColorPair[]) {
    const randomPaletteIndex = Math.floor(Math.random() * palette.length);
    return palette[randomPaletteIndex].backgroundColor;
}

export function getRandomColorFromPalette(palette: ColorPair[]) {
    const randomPaletteIndex = Math.floor(Math.random() * palette.length);
    return palette[randomPaletteIndex].color;
}

export function getRandomBackgroundColorPairFromPalette(
    palette: AccessibleColorPair[],
) {
    let randomPaletteIndex = Math.floor(Math.random() * palette.length);
    const indecesAccessibilityChecked: number[] = [];
    while (!palette[randomPaletteIndex].isAccessible) {
        indecesAccessibilityChecked.push(randomPaletteIndex);
        randomPaletteIndex = generateRandomNumberExcluding(
            indecesAccessibilityChecked,
            palette.length,
        );
    }
    return palette[randomPaletteIndex];
}

export function getNumberOfColorsInScheme(scheme: ColorScheme): number {
    switch (scheme) {
        case ColorScheme.MONOCHROMATIC:
            return 1;
        case ColorScheme.ANALOGOUS:
            return 2;
        case ColorScheme.COMPLEMENTARY:
            return 2;
        case ColorScheme.SPLIT_COMPLEMENTARY:
            return 2;
        case ColorScheme.TRIADIC:
            return 3;
        case ColorScheme.SQUARE:
            return 4;
        case ColorScheme.TETRADIC:
            return 4;
        default:
            return 1;
    }
}

export function getColorSchemeFromVibe(vibe: Vibe): ColorScheme {
    switch (vibe) {
        case Vibe.DARK_RED:
            return ColorScheme.MONOCHROMATIC;
        case Vibe.ITS_CORN:
            return ColorScheme.TRIADIC;
        case Vibe.EARTH_DAY_2017:
            return ColorScheme.TETRADIC;
        case Vibe.BABY_BLUE:
            return ColorScheme.TETRADIC;
        case Vibe.PRUSSIAN_BLUE:
            return ColorScheme.SQUARE;
        case Vibe.DEEP_PURPLE:
            return ColorScheme.TRIADIC;
        default:
            return ColorScheme.MONOCHROMATIC;
    }
}

export function getThemeFromVibe(vibe: Vibe): Theme {
    if (vibe === Vibe.EARTH_DAY_2017) console.log("this is when it happens!");
    if (vibe === Vibe.VANILLA) {
        return {
            scheme: ColorScheme.MONOCHROMATIC,
            palette: [
                {
                    colorPair: { backgroundColor: "inherit", color: "inherit" },
                    isAccessible: true,
                },
            ],
            vibe,
        };
    }
    const scheme = getColorSchemeFromVibe(vibe);

    const palette = generateColorPalette(vibe, scheme);
    console.log("palette", palette);
    const theme: Theme = {
        scheme,
        palette,
        vibe,
    };

    return theme;
}

export interface ThemeAction {
    newVibe: Vibe;
}
