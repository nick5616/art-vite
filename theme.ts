import { useEffect, useState } from "react";
import { HslColor, RgbColor, RgbComponentValue, Theme, Vibe } from "./models";
import { getThemeFromVibe } from "./utils/theme_utils";

interface ThemeProps {
    vibe: Vibe;
}

export function useTheme(props: { vibe: Vibe }) {
    const [theme, setTheme] = useState<Theme>();
    setTheme(getThemeFromVibe(props.vibe));
    return theme;
}
