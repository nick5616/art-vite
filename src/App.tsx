import { useState } from "react";
import "./App.css";
import { ThemedPage } from "./components/ThemedPage";
import * as React from "react";
import { Theme, Vibe } from "./models";
import {
    getRandomBackgroundColorFromPalette,
    getRandomBackgroundColorPairFromPalette,
    getRandomColorFromPalette,
    getThemeFromVibe,
} from "./theme";

function App() {
    const [pageTheme, setPageTheme] = useState<Theme>(
        getThemeFromVibe(Vibe.VANILLA),
    );

    const pair = getRandomBackgroundColorPairFromPalette(pageTheme.palette);

    return (
        <div
            style={{
                width: "100vw",
                background: pair.backgroundColor,
                color: pair.color,
                display: "flex",
                alignItems: "center",
            }}
        >
            <ThemedPage
                onPageThemeDetermined={(theme: Theme) => {
                    console.log("page theme determined", theme);
                    setPageTheme(theme);
                }}
            ></ThemedPage>
        </div>
    );
}

export default App;
