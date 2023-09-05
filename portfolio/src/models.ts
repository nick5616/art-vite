export interface ArtEntry {
    description: string;
    mediaName: string;
    title: string;
    date?: string;
    primary?: string;
    vibe: Vibe;
    index: number;
}

export interface EntryDisplayProps {
    description: string;
    mediaName: string;
    title: string;
    date?: string;
    primary?: string;
    vibe: Vibe;
    verticalOffsetPx: number;
}

export enum Vibe {
    DARK_RED,
    ITS_CORN,
    EARTH_DAY_2017,
    BABY_BLUE,
    PRUSSIAN_BLUE,
    DEEP_PURPLE,
    VANILLA,
}

export interface RgbColor {
    red: number;
    green: number;
    blue: number;
}

export interface HslColor {
    hue: number;
    saturation: number;
    lightness: number;
}

// type RgbColorPigment = RgbComponentValue;

export enum ColorScheme {
    MONOCHROMATIC = "MONOCHROMATIC",
    ANALOGOUS = "ANALOGOUS",
    COMPLEMENTARY = "COMPLEMENTARY",
    SPLIT_COMPLEMENTARY = "SPLIT-COMPLEMENTARY",
    TRIADIC = "TRIADIC",
    SQUARE = "SQUARE",
    TETRADIC = "TETRADIC",
}

export interface ColorPair {
    backgroundColor: string;
    color: string;
}

export interface Theme {
    scheme: ColorScheme;
    border?: string;
    palette: ColorPair[];
}

// export interface MonochromaticTheme extends Theme {
//     type: ThemeType.MONOCHROMATIC;
// }

// export interface AnalogousTheme extends Theme {
//     type: ThemeType.ANALOGOUS;
// }

// export interface ComplementaryTheme extends Theme {
//     type: ThemeType.COMPLEMTENTARY;
// }

// export interface SplitComplementaryTheme extends Theme {
//     type: ThemeType.SPLIT_COMPLEMENTARY;
// }

// export interface TriadicComplementaryTheme extends Theme {
//     type: ThemeType.TRIADIC;
// }

// export interface SquareComplementaryTheme extends Theme {
//     type: ThemeType.SQUARE;
// }

// export interface RectangularComplementaryTheme extends Theme {
//     type: ThemeType.RECTANGLE;
// }

/***********===========+++++++++++++++---------------*************================++++++++++++++++---------------*******
 * ====================================================================================================================*
 *
 *
 *
 *
 *
 *
 *
 *                                    E
 *                          T                     R      T   Y      Z     O  N E
 *                              H      D   I
 *
 *
 *
 *
 *
 *
 *        /
 *       (
 *        )
 *       /
 *      (
 *        \
 *         \
 *
 *          )
 *         /
 *        (
 *         )
 *       /
 *   \   |  /
 *     \ | /
 *      \|/
 * = =     = = = = =   = = = = = =  = = = = =     = = = = = =      = = = = = = =   = = = = =     = = = = = = = =     = =
 */

export type RgbComponentValue =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31
    | 32
    | 33
    | 34
    | 35
    | 36
    | 37
    | 38
    | 39
    | 40
    | 41
    | 42
    | 43
    | 44
    | 45
    | 46
    | 47
    | 48
    | 49
    | 50
    | 51
    | 52
    | 53
    | 54
    | 55
    | 56
    | 57
    | 58
    | 59
    | 60
    | 61
    | 62
    | 63
    | 64
    | 65
    | 66
    | 67
    | 68
    | 69
    | 70
    | 71
    | 72
    | 73
    | 74
    | 75
    | 76
    | 77
    | 78
    | 79
    | 80
    | 81
    | 82
    | 83
    | 84
    | 85
    | 86
    | 87
    | 88
    | 89
    | 90
    | 91
    | 92
    | 93
    | 94
    | 95
    | 96
    | 97
    | 98
    | 99
    | 100
    | 101
    | 102
    | 103
    | 104
    | 105
    | 106
    | 107
    | 108
    | 109
    | 110
    | 111
    | 112
    | 113
    | 114
    | 115
    | 116
    | 117
    | 118
    | 119
    | 120
    | 121
    | 122
    | 123
    | 124
    | 125
    | 126
    | 127
    | 128
    | 129
    | 130
    | 131
    | 132
    | 133
    | 134
    | 135
    | 136
    | 137
    | 138
    | 139
    | 140
    | 141
    | 142
    | 143
    | 144
    | 145
    | 146
    | 147
    | 148
    | 149
    | 150
    | 151
    | 152
    | 153
    | 154
    | 155
    | 156
    | 157
    | 158
    | 159
    | 160
    | 161
    | 162
    | 163
    | 164
    | 165
    | 166
    | 167
    | 168
    | 169
    | 170
    | 171
    | 172
    | 173
    | 174
    | 175
    | 176
    | 177
    | 178
    | 179
    | 180
    | 181
    | 182
    | 183
    | 184
    | 185
    | 186
    | 187
    | 188
    | 189
    | 190
    | 191
    | 192
    | 193
    | 194
    | 195
    | 196
    | 197
    | 198
    | 199
    | 200
    | 200
    | 201
    | 202
    | 203
    | 204
    | 205
    | 206
    | 217
    | 218
    | 219
    | 210
    | 211
    | 212
    | 213
    | 214
    | 215
    | 216
    | 217
    | 218
    | 219
    | 220
    | 221
    | 222
    | 223
    | 224
    | 225
    | 226
    | 227
    | 228
    | 229
    | 230
    | 231
    | 232
    | 233
    | 234
    | 235
    | 236
    | 237
    | 238
    | 239
    | 240
    | 241
    | 242
    | 243
    | 244
    | 245
    | 246
    | 247
    | 248
    | 249
    | 250
    | 251
    | 252
    | 253
    | 254
    | 255;

export const MAX_RGB_COMPONENT_VALUE: RgbComponentValue = 255;

export function getIntegerNumberFromRgbInputValue(
    num: string,
): RgbComponentValue {
    const int = parseInt(num);
    if (int >= 0 && int <= MAX_RGB_COMPONENT_VALUE) {
        return int as RgbComponentValue;
    } else {
        throw new Error("value from input is not an acceptable RGB value;");
    }
}

export function handleRgbComponentInput(num: string): RgbComponentValue {
    return getIntegerNumberFromRgbInputValue(num);
}

export interface RgbColor {
    red: number;
    green: number;
    blue: number;
}

export interface HslColor {
    hue: number;
    saturation: number;
    lightness: number;
}

// type RgbColorPigment = RgbComponentValue;

export interface ColorPair {
    backgroundColor: string;
    color: string;
}

export interface Theme {
    scheme: ColorScheme;
    border?: string;
    palette: ColorPair[];
}

// export interface MonochromaticTheme extends Theme {
//     type: ThemeType.MONOCHROMATIC;
// }

// export interface AnalogousTheme extends Theme {
//     type: ThemeType.ANALOGOUS;
// }

// export interface ComplementaryTheme extends Theme {
//     type: ThemeType.COMPLEMTENTARY;
// }

// export interface SplitComplementaryTheme extends Theme {
//     type: ThemeType.SPLIT_COMPLEMENTARY;
// }

// export interface TriadicComplementaryTheme extends Theme {
//     type: ThemeType.TRIADIC;
// }

// export interface SquareComplementaryTheme extends Theme {
//     type: ThemeType.SQUARE;
// }

// export interface RectangularComplementaryTheme extends Theme {
//     type: ThemeType.RECTANGLE;
// }
