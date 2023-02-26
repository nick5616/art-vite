import React from "react";
import { Theme, Vibe } from "../models";
import { getThemeFromVibe } from "../utils/theme";
import "./styles/entry.css";

interface EntryProps {
    description: string;
    mediaName: string;
    title: string;
    date?: string;
    primary?: string;
    vibe: Vibe;
}

export function Entry({
    description,
    mediaName,
    title,
    date,
    primary,
    vibe,
}: EntryProps): JSX.Element {
    const defaultTheme: Theme = {
        backgroundColor: "inherit",
        color: "inherit",
        border: "1px solid",
    };
    const vibeTheme: Theme = getThemeFromVibe(vibe);
    console.log("vibe theme", vibeTheme);
    return (
        <div
            className="entryContainer"
            style={{
                backgroundColor: vibeTheme.backgroundColor,
                border: vibeTheme.border,
            }}
        >
            <h1 className="entryTitle serif" style={{ color: vibeTheme.color }}>
                {title}
            </h1>
            <img style={{ width: "65vw" }} src={`/art/${mediaName}`}></img>
            <div className="description">
                <div
                    className="descriptionText"
                    style={{
                        color: vibeTheme.color,
                        maxWidth: "65vw",
                    }}
                >
                    <h2 className="descriptionLabel">Description</h2>
                    {description}
                </div>
            </div>
            <hr></hr>
            {date && (
                <div className="entryDate" style={{ color: vibeTheme.color }}>
                    Finished: {date}
                </div>
            )}
        </div>
    );
}
