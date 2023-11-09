import * as React from "react";

interface ScrollCueProps {
    primaryColor: string;
    secondaryColor: string;
}

export function ScrollCue({ primaryColor, secondaryColor }: ScrollCueProps) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "40px",
            }}
        >
            <a
                href="#"
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div id="mouse-scroll">
                    <div
                        className="mouse"
                        style={{
                            border: `2px solid ${primaryColor}`,
                        }}
                    >
                        <div
                            className="mouse-in"
                            style={{
                                background: secondaryColor,
                            }}
                        ></div>
                    </div>
                    <div>
                        <span
                            className="down-arrow-1"
                            style={{
                                borderColor: secondaryColor,
                            }}
                        ></span>
                        <span
                            className="down-arrow-2"
                            style={{
                                borderColor: secondaryColor,
                            }}
                        ></span>
                        <span
                            className="down-arrow-3"
                            style={{
                                borderColor: secondaryColor,
                            }}
                        ></span>
                    </div>
                </div>
            </a>
        </div>
    );
}
