import * as React from "react";

export function ArtTitle(props: { title: string }) {
    return (
        <div
            style={{
                display: "flex",
                whiteSpace: "nowrap",
            }}
        >
            <h1
                style={{
                    fontSize: "20pt",
                    display: "flex",
                    alignItems: "center",
                    paddingRight: "20px",
                }}
            >
                {props.title}
            </h1>
        </div>
    );
}
