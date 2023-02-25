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
    const theme: Theme = {
        backgroundColor: "inherit",
        color: "inherit",
        border: "1px solid",
    };
    return (
        <div
            className="entryContainer"
            style={{
                backgroundColor: theme.backgroundColor,
                border: theme.border,
            }}
        >
            <h1 className="entryTitle serif" style={{ color: theme.color }}>
                {props.title}
            </h1>
            <img
                style={{ maxWidth: "65vw" }}
                src={`/art/${props.mediaName}`}
            ></img>
            <div className="description">
                <div
                    className="descriptionText"
                    style={{
                        color: theme.color,
                        maxWidth: "65vw",
                    }}
                >
                    <h2 className="descriptionLabel">Description</h2>
                    {props.description}
                </div>
            </div>
            <hr></hr>
            {props?.date && (
                <div className="entryDate" style={{ color: theme.color }}>
                    Finished: {props.date}
                </div>
            )}
        </div>
    );
}
