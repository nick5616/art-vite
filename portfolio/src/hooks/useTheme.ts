import { useState } from "react";
import { ColorScheme, Theme, Vibe } from "../models";
import { getColorSchemeFromVibe } from "../theme";

function getThemeFromVibe(vibe: Vibe): Theme {
    if (vibe === Vibe.VANILLA) {
        return {
            scheme: ColorScheme.MONOCHROMATIC,
            palette: [{ backgroundColor: "inherit", color: "inherit" }],
            border: "1px solid black",
        };
    }
    const scheme = getColorSchemeFromVibe(vibe);

    const palette = generateColorPalette(vibe, scheme);

    const theme: Theme = {
        scheme,
        palette,
        border: "4px solid white",
    };

    return theme;
}

export default function useTheme(vibe: Vibe) {
    const [theme, setTheme] = useState(getThemeFromVibe(vibe));

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getThemeFromVibe(vibe));
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}
