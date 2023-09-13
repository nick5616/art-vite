import * as React from "react";
import { ColorPair, Theme } from "../models";

export function RenderTheme(props: { pageTheme: Theme }) {
    return (
        <div
            style={{
                display: "flex",
                margin: "auto",
            }}
        >
            {props.pageTheme.palette.map(
                (colorPair: ColorPair, index: number, array) => {
                    console.log("color pair", colorPair);
                    console.log("whole thing", array);
                    return (
                        <div key={index}>
                            <div
                                style={{
                                    background: colorPair.backgroundColor,
                                    color: colorPair.color,
                                    width: "fit-content",
                                    minWidth: "25px",
                                    height: "25px",
                                    border: "1px",
                                    borderStyle: "solid",
                                    borderColor: colorPair.color,
                                }}
                            >
                                {colorPair.backgroundColor}
                            </div>
                            <div
                                style={{
                                    background: colorPair.color,
                                    color: colorPair.backgroundColor,
                                    width: "fit-content",
                                    minWidth: "25px",
                                    height: "25px",
                                    border:
                                        "1px solid" + colorPair.backgroundColor,
                                }}
                            >
                                {colorPair.color}
                            </div>
                        </div>
                    );
                },
            )}
        </div>
    );
}
