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

    const isMonochromatic = theme.palette.length === 1;

    const randomPaletteIndex = isMonochromatic
        ? 0
        : generateRandomNumberExcluding(
              [props.paletteIndex],
              theme.palette.length,
          );

    const backgroundColor = props.selected
        ? theme.palette[randomPaletteIndex].colorPair.backgroundColor
        : "inherit";

    return (
        <div
            style={{
                color: backgroundColor,
                padding: "10px",
                margin: "auto",
                borderRadius: "10px",
                width: "100%",
            }}
            onClick={() => {
                props.onCardClicked(props.index);
            }}
        >
            <div
                style={{
                    alignItems: "center",
                }}
            ></div>
            <div
                style={{
                    whiteSpace: "nowrap",
                }}
            >
                <h1
                    style={{
                        fontSize: "20pt",
                        marginLeft: 0,
                        marginBottom: "10px",
                        textAlign: "start",
                    }}
                >
                    {props.title}
                </h1>
            </div>
            <div>
                <div>
                    <div
                        style={{
                            alignItems: "center",
                            textAlign: "start",
                        }}
                    >
                        {props.description}
                    </div>
                    <div style={{ float: "right" }}>
                        {props.date ? <p>Created on {props.date}</p> : <></>}
                    </div>
                    {/* <div
                        style={{
                            textAlign: "start",
                            marginTop: "5px",
                        }}
                        onClick={() => {
                            props.onCollapseToggled();
                        }}
                    >
                        <strong>hide</strong>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
