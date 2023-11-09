import * as React from "react";
import { ColorScheme, Theme } from "../models";
import { generateRandomNumberExcluding } from "../theme";
import { RenderTheme } from "./RenderTheme";
import { ScrollCue } from "./ScrollCue";

import "./styles/introduction.css";

export function AboveFold(props: {
    pageTheme: Theme;
    chosenPaletteIndex: number;
}): React.ReactElement {
    const isMonochromatic =
        props.pageTheme.scheme === ColorScheme.MONOCHROMATIC;
    const exclude = isMonochromatic ? [] : [props.chosenPaletteIndex];

    const highlightColorIndex = generateRandomNumberExcluding(
        exclude,
        props.pageTheme.palette.length,
    );

    const secondaryColorIndex = isMonochromatic
        ? highlightColorIndex
        : generateRandomNumberExcluding(
              [highlightColorIndex],
              props.pageTheme.palette.length,
          );

    const highlightColor = isMonochromatic
        ? props.pageTheme.palette[0].colorPair.color
        : props.pageTheme.palette[highlightColorIndex].colorPair.color;

    const secondaryColor = isMonochromatic
        ? highlightColor
        : props.pageTheme.palette[secondaryColorIndex].colorPair.color;

    return (
        <div
            className="page-view"
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor:
                    props.pageTheme.palette[
                        generateRandomNumberExcluding(
                            exclude,
                            props.pageTheme.palette.length,
                        )
                    ].colorPair.backgroundColor,
                color: props.pageTheme.palette[
                    generateRandomNumberExcluding(
                        exclude,
                        props.pageTheme.palette.length,
                    )
                ].colorPair.color,
            }}
        >
            <div
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    display: "flex",
                    height: "100%",
                }}
            >
                <div
                    className="introduction-container"
                    style={{
                        margin: "auto",
                    }}
                >
                    <div>
                        <h1 className="serif heading">
                            Hi! I'm{" "}
                            <a
                                style={{ color: secondaryColor }}
                                href="https://github.com/nick5616"
                                target="_blank"
                            >
                                <u>Nick</u>
                            </a>
                            ,
                        </h1>
                        <h2 className="serif">
                            I hope you enjoy my art. I sure do enjoy drawing it
                            👼🏼📲
                        </h2>
                        <div
                            style={{
                                paddingTop: "20px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <RenderTheme
                                pageTheme={props.pageTheme}
                                devMode={false}
                            ></RenderTheme>
                        </div>
                    </div>
                </div>
            </div>
            <ScrollCue
                primaryColor={highlightColor}
                secondaryColor={secondaryColor}
            ></ScrollCue>
        </div>
    );
}
