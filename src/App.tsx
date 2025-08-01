import { useState } from "react";
import "./App.css";
import { ThemedPage } from "./components/ThemedPage";
import * as React from "react";
import { Theme, Vibe } from "./models";
import {
    getRandomBackgroundColorPairFromPalette,
    getThemeFromVibe,
} from "./theme";
import { DebugWindowWidth } from "./components/DebugWindowWidth";

function App() {
    const [pageTheme, setPageTheme] = useState<Theme>(
        getThemeFromVibe(Vibe.VANILLA),
    );

    const pair = getRandomBackgroundColorPairFromPalette(pageTheme.palette);

    return (
        <div
            style={{
                background: pair.colorPair.backgroundColor,
                color: pair.colorPair.color,
                display: "flex",
                alignItems: "center",
                width: "100vw",
            }}
        >
            <ThemedPage
                onPageThemeDetermined={(theme: Theme) => {
                    setPageTheme(theme);
                }}
            ></ThemedPage>
            <DebugWindowWidth devMode={false}></DebugWindowWidth>
        </div>
    );
}

export default App;
