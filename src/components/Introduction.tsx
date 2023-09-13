import * as React from "react";
import { useRef } from "react";
import { Theme } from "../models";
import { generateRandomNumberExcluding } from "../theme";
import { RenderTheme } from "./RenderTheme";
import "./styles/introduction.css";
export function Introduction(props: {
    pageTheme: Theme;
    chosenPaletteIndex: number;
}): React.ReactElement {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div
            className="page-view"
            ref={ref}
            style={{
                backgroundColor:
                    props.pageTheme.palette[
                        generateRandomNumberExcluding(
                            [props.pageTheme.palette.length],
                            props.pageTheme.palette.length,
                        )
                    ].colorPair.backgroundColor,
                color: props.pageTheme.palette[
                    generateRandomNumberExcluding(
                        [props.pageTheme.palette.length],
                        props.pageTheme.palette.length,
                    )
                ].colorPair.color,
            }}
        >
            <div
                className="introduction-container"
                style={{
                    margin: "auto",
                }}
            >
                <div>
                    <h1 className="serif heading">Hi! I'm Nick,</h1>
                    <h2 className="serif">
                        I hope you enjoy my art. I sure do enjoy drawing it 👼🏼📲
                    </h2>
                    <RenderTheme pageTheme={props.pageTheme}></RenderTheme>
                </div>
            </div>
        </div>
    );
}
