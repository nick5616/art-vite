import * as React from "react";
import { Vibe } from "../models";
import { generateRandomNumberExcluding, getThemeFromVibe } from "../theme";

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
    // let backgroundColor = props.selected ? theme.palette[0].color : "inherit";
    // let color = props.selected ? theme.palette[0].backgroundColor : "inherit";
    // if (!isMonochromatic) {
    let backgroundColor = props.selected
        ? theme.palette[randomPaletteIndex].colorPair.backgroundColor
        : "inherit";
    let color = props.selected
        ? theme.palette[randomPaletteIndex].colorPair.color
        : "inherit";
    // }
    console.log("bg c", backgroundColor, color);

    return (
        <div
            className="pookie"
            style={{
                color: backgroundColor,
                // backgroundColor: color,
                padding: "10px",
                margin: "auto",
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
                        // borderRight: "1px solid" + color,
                        marginLeft: 0,
                        textAlign: "start",
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
                            // background: "red",
                            textAlign: "start",
                        }}
                    >
                        {props.description}
                    </div>
                    <div style={{ float: "right" }}>
                        {props.date ? <p>Created on {props.date}</p> : <></>}
                    </div>
                    <div
                        style={{
                            margin: "0 auto",
                            transition: "color 0.5s ease",
                        }}
                        onClick={() => {
                            props.onCollapseToggled();
                        }}
                    >
                        <strong>hide</strong>
                    </div>
                </div>
            </div>
        </div>
    );
}
