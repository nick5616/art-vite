import * as React from "react";
import { Theme } from "../models";
import "./styles/entry.css";

interface EntryProps {
    description: string;
    mediaName: string;
    title: string;
    date?: string;
    theme: Theme;
}

export function MonochromaticEntry({
    description,
    mediaName,
    title,
    date,
    theme,
}: EntryProps): JSX.Element {
    return (
        <div
            className="entryContainer"
            style={{
                backgroundColor: theme.palette[0].backgroundColor,
                border: theme.border,
                height: "80vh",
            }}
        >
            <h1
                className="entryTitle serif"
                style={{ color: theme.palette[0].color }}
            >
                {title}
            </h1>
            <div>
                <img
                    style={{ height: "40vh" }}
                    src={`../../art/${mediaName}`}
                ></img>
            </div>
            <div className="description">
                <div
                    className="descriptionText"
                    style={{
                        color: theme.palette[0].color,
                        // maxWidth: "65vw",
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
