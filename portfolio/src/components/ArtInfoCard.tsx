import * as e from "express";
import * as React from "react";
import { ColorScheme, Vibe } from "../models";
import {
    generateRandomNumberExcluding,
    getNumberOfColorsInScheme,
    getThemeFromVibe,
} from "../theme";

export function ArtInfoCard(props: {
    title: string;
    description: string;
    index: number;
    selected: boolean;
    vibe: Vibe;
    paletteIndex: number;
    onClick: (index: number) => void;
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
    return (
        <div
            style={{
                backgroundColor,
                color,
            }}
            onClick={() => {
                props.onClick(props.index);
            }}
        >
            <h1>{props.title}</h1>
            <p>{props.description}</p>
        </div>
    );
}
