import * as React from "react";
import { ColorScheme, Theme } from "../models";
import { generateRandomNumberExcluding } from "../theme";
import { ThemedPage } from "./ThemedPage";

export function IndexOrbs(props: {
    index: number;
    length: number;
    theme: Theme;
    paletteIndex: number;
    onSelectedIndexChanged: (requestedIndex: number) => void;
}) {
    let paletteIndex = 0;
    const isMonochromatic = props.theme.scheme === ColorScheme.MONOCHROMATIC;
    if (!isMonochromatic) {
        paletteIndex = generateRandomNumberExcluding(
            [paletteIndex],
            props.theme.palette.length,
        );
    }
    const arrayOfLength = new Array(props.length).fill({
        gorp: 1,
        jorp: "Off the charts",
    });
    console.log("array of length", arrayOfLength);
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "auto",
                paddingRight: "5vw",
            }}
        >
            {arrayOfLength.map((_, index) => {
                console.log("index, index");
                const endContent =
                    arrayOfLength.length - 1 === index ? (
                        <div></div>
                    ) : (
                        <div style={{ width: "5px" }}></div>
                    );
                return (
                    <div
                        onClick={() => {
                            props.onSelectedIndexChanged(index);
                        }}
                        style={{
                            display: "flex",
                            marginLeft: "auto",
                        }}
                    >
                        <div
                            style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "10px",
                                paddingRight: "5px",
                                backgroundColor:
                                    index === props.index
                                        ? props.theme.palette[paletteIndex]
                                              .colorPair.backgroundColor
                                        : props.theme.palette[paletteIndex]
                                              .colorPair.color,
                                border:
                                    index === props.index
                                        ? `1px solid ${props.theme.palette[paletteIndex].colorPair.color}`
                                        : "none",
                            }}
                        ></div>
                        {endContent}
                    </div>
                );
            })}
        </div>
    );
}
