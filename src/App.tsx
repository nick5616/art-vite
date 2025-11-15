import { useState, useEffect } from "react";
import "./App.css";
import { ThemedPage } from "./components/ThemedPage";
import * as React from "react";
import { Theme, Vibe } from "./models";
import {
    getRandomBackgroundColorPairFromPalette,
    getThemeFromVibe,
} from "./theme";
import { DebugWindowWidth } from "./components/DebugWindowWidth";
import PianoKeyboard from "./components/PianoKeyboard";

function App() {
    const [pathname, setPathname] = useState(window.location.pathname);
    const [pageTheme, setPageTheme] = useState<Theme>(
        getThemeFromVibe(Vibe.VANILLA),
    );

    useEffect(() => {
        const handleLocationChange = () => {
            setPathname(window.location.pathname);
        };
        window.addEventListener("popstate", handleLocationChange);
        return () =>
            window.removeEventListener("popstate", handleLocationChange);
    }, []);

    // Intercept link clicks for client-side navigation
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest("a");
            if (
                link &&
                link.href.startsWith(window.location.origin) &&
                !link.target
            ) {
                e.preventDefault();
                window.history.pushState({}, "", link.href);
                setPathname(link.pathname);
            }
        };
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    const pair = getRandomBackgroundColorPairFromPalette(pageTheme.palette);

    if (pathname === "/piano") {
        return (
            <div
                style={{
                    width: "100vw",
                    margin: 0,
                    padding: 0,
                    overflowX: "hidden",
                }}
            >
                <PianoKeyboard />
            </div>
        );
    }

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
            />
            <DebugWindowWidth devMode={false} />
        </div>
    );
}

export default App;
