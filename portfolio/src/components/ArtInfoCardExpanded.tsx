import * as e from "express";
import * as React from "react";
import { ColorScheme, Vibe } from "../models";
import {
    generateRandomNumberExcluding,
    getNumberOfColorsInScheme,
    getThemeFromVibe,
} from "../theme";

export function ArtInfoCardExpanded(props: {
    title: string;
    description: string;
    index: number;
    selected: boolean;
    vibe: Vibe;
    paletteIndex: number;
    date: string | undefined;
    onCardClicked: (index: number) => void;

    onCollapseToggled: () => void;
}) {
    const theme = getThemeFromVibe(props.vibe);
    console.log("🐽 I smell a truffle theme!!", theme);
    // const randomPaletteIndex = generateRandomNumberExcluding(
    //     [props.paletteIndex],
    //     theme.palette.length - 1,
    // );
    const isMonochromatic = theme.palette.length === 1;

    const randomPaletteIndex = isMonochromatic
        ? 0
        : generateRandomNumberExcluding(
              [props.paletteIndex],
              theme.palette.length,
          );
    console.log("PALETTE INDEX", randomPaletteIndex);
    let backgroundColor = props.selected ? theme.palette[0].color : "inherit";
    let color = props.selected ? theme.palette[0].backgroundColor : "inherit";
    if (!isMonochromatic) {
        backgroundColor = props.selected
            ? theme.palette[randomPaletteIndex].backgroundColor
            : "inherit";
        color = props.selected
            ? theme.palette[randomPaletteIndex].color
            : "inherit";
    }
    console.log("bg c", backgroundColor, color);
    const border = props.selected ? "1px solid " + color : "none";

    return (
        <div
            style={{
                backgroundColor,
                color,
                padding: "10px",
                border,
                margin: "0 10px",
                borderRadius: "10px",
                // display: "flex",
            }}
            onClick={() => {
                props.onCardClicked(props.index);
            }}
        >
            <div
                style={{
                    // display: "flex",
                    alignItems: "center",
                }}
            ></div>
            <div
                style={{
                    // display: "flex",
                    whiteSpace: "nowrap",
                }}
            >
                <h1
                    style={{
                        fontSize: "20pt",
                        // display: "flex",
                        alignItems: "center",
                        // borderRight: "1px solid" + color,
                    }}
                >
                    {props.title}
                </h1>
            </div>
            <div
                style={{
                    // display: "flex",
                    paddingLeft: "10px",
                }}
            >
                <div>
                    <div
                        style={{
                            alignItems: "center",
                            background: "red",
                            textAlign: "start",
                        }}
                    >
                        {props.description}
                    </div>
                    <div style={{ float: "right" }}>
                        {props.date ? (
                            <p>(Expanded) Created on {props.date}</p>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div
                        style={{ display: "flex", alignContent: "center" }}
                        onClick={() => {
                            props.onCollapseToggled();
                        }}
                    >
                        hide
                    </div>
                </div>
            </div>
        </div>
    );
}
