import React from "react";
import { Vibe } from "../../models";
import { useTheme } from "../../theme";
import { Counter } from "./Counter";

export { Page };

function Page() {
    const theme = useTheme({ vibe: Vibe.EARTH_DAY_2017 });
    console.log("theme", theme);
    return (
        <div
            style={{
                backgroundColor: theme?.backgroundColor,
                color: theme?.color,
                border: theme?.border,
            }}
        >
            <h1>Welcome</h1>
            This page is:
            <ul>
                <li>Rendered to HTML.</li>
                <li>
                    Interactive. <Counter />
                </li>
            </ul>
        </div>
    );
}
