import * as e from "express";
import * as React from "react";
import { ColorScheme, Vibe } from "../models";
import {
    generateRandomNumberExcluding,
    getNumberOfColorsInScheme,
    getThemeFromVibe,
} from "../theme";
import { ArtInfoCard } from "./ArtInfoCard";
import { ArtInfoCardExpanded } from "./ArtInfoCardExpanded";
import { ArtTitle } from "./ArtTitle";
import { ExpandableDescription } from "./ExpandableDescription";

export function ArtInfoCardController(props: {
    title: string;
    description: string;
    index: number;
    selected: boolean;
    vibe: Vibe;
    paletteIndex: number;
    date: string | undefined;
    onCardClicked: (index: number) => void;
    onUpClicked: (index: number) => void;
    onDownClicked: (index: number) => void;
}) {
    const [descriptionExpanded, setDescriptionExpanded] = React.useState(true);
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
                display: "flex",
                overflow: "visible",
            }}
            onClick={() => {
                props.onCardClicked(props.index);
            }}
        >
            {descriptionExpanded ? (
                <ArtInfoCard
                    title={props.title}
                    onCollapseToggled={() => {
                        console.log(
                            "collapse toggled, old:",
                            descriptionExpanded,
                        );
                        setDescriptionExpanded(!descriptionExpanded);
                    }}
                    description={props.description}
                    index={0}
                    date={props.date}
                    onUpClicked={props.onDownClicked}
                    onDownClicked={props.onDownClicked}
                    selected={props.selected}
                ></ArtInfoCard>
            ) : (
                <ArtInfoCardExpanded
                    title={props.title}
                    onCollapseToggled={() => {
                        console.log(
                            "collapse toggled, old:",
                            descriptionExpanded,
                        );
                        setDescriptionExpanded(!descriptionExpanded);
                    }}
                    description={props.description}
                    index={props.index}
                    selected={props.selected}
                    vibe={props.vibe}
                    paletteIndex={props.paletteIndex}
                    date={props.date}
                    onCardClicked={props.onCardClicked}
                ></ArtInfoCardExpanded>
            )}
        </div>
    );
}
