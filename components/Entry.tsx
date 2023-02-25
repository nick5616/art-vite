import React from "react";
import { Theme, Vibe } from "../models";
import "./styles/entry.css";

export function Entry(props: {
    description: string;
    mediaName: string;
    title: string;
    date?: string;
    primary?: string;
    vibe: Vibe;
}): JSX.Element {
    const defaultTheme: Theme = {
        backgroundColor: "inherit",
        color: "inherit",
        border: "1px solid",
    };
    return (
        <div
            className="entryContainer"
            style={{
                backgroundColor: defaultTheme.backgroundColor,
                border: defaultTheme.border,
            }}
        >
            <h1
                className="entryTitle serif"
                style={{ color: defaultTheme.color }}
            >
                "{props.title}"
            </h1>
            <img
                style={{ width: "65vw" }}
                src={`/art/${props.mediaName}`}
            ></img>
            <div className="description">
                <div
                    className="descriptionText"
                    style={{
                        color: defaultTheme.color,
                        maxWidth: "65vw",
                    }}
                >
                    <h2 className="descriptionLabel">Description</h2>
                    {props.description}
                </div>
            </div>
            <hr></hr>
            {props?.date && (
                <div
                    className="entryDate"
                    style={{ color: defaultTheme.color }}
                >
                    Finished: {props.date}
                </div>
            )}
        </div>
    );
}
