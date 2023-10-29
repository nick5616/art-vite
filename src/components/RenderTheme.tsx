import * as React from "react";
import { AccessibleColorPair, Theme } from "../models";

export function RenderTheme(props: { pageTheme: Theme; devMode: boolean }) {
    return (
        <div
            style={{
                display: "flex",
                margin: "auto",
            }}
        >
            {props.pageTheme.palette.map(
                (accessibleColorPair: AccessibleColorPair, index: number) => {
                    return (
                        <div key={index}>
                            <div
                                style={{
                                    background:
                                        accessibleColorPair.colorPair
                                            .backgroundColor,
                                    color: accessibleColorPair.colorPair.color,
                                    width: "fit-content",
                                    minWidth: "25px",
                                    height: "25px",
                                    border: "1px",
                                    borderStyle: "solid",
                                    borderColor:
                                        accessibleColorPair.colorPair.color,
                                }}
                            >
                                {props.devMode ? (
                                    <div>
                                        {accessibleColorPair.colorPair.color}
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div
                                style={{
                                    background:
                                        accessibleColorPair.colorPair.color,
                                    color: accessibleColorPair.colorPair
                                        .backgroundColor,
                                    width: "fit-content",
                                    minWidth: "25px",
                                    height: "25px",
                                    border:
                                        "1px solid" +
                                        accessibleColorPair.colorPair
                                            .backgroundColor,
                                }}
                            >
                                {props.devMode ? (
                                    <div>
                                        {
                                            accessibleColorPair.colorPair
                                                .backgroundColor
                                        }
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    );
                },
            )}
        </div>
    );
}
