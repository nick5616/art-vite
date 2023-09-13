import React from "react";
import { Theme } from "../models";
import "./styles/entry.css";

interface EntryProps {
    description: string;
    mediaName: string;
    title: string;
    date?: string;
    theme: Theme;
}

export function BichromaticEntry({
    description,
    mediaName,
    title,
    date,
    theme,
}: EntryProps) {
    return (
        <div
            className="container"
            style={{
                backgroundColor: theme.palette[0].backgroundColor,
                border: theme.border,
            }}
        >
            <h1
                className="entryTitle serif"
                style={{ color: theme.palette[0].color }}
            >
                {title}
            </h1>
            <img style={{ width: "65vw" }} src={`/art/${mediaName}`}></img>
            <div className="description">
                <div
                    className="descriptionText"
                    style={{
                        color: theme.palette[0].color,
                        maxWidth: "65vw",
                    }}
                >
                    <h2 className="descriptionLabel">Description</h2>
                    {description}
                </div>
            </div>
            <hr></hr>
            {date && (
                <div
                    className="entryDate"
                    style={{ color: theme.palette[0].color }}
                >
                    Finished: {date}
                </div>
            )}
        </div>
    );
}
