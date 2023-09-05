import * as React from "react";
import { ColorScheme, Theme, Vibe } from "../models";
import { getNumberOfColorsInScheme, getThemeFromVibe } from "../theme";
import { BichromaticEntry } from "./BichromaticEntry";
import { MonochromaticEntry } from "./MonochromaticEntry";
import "./styles/entry.css";

export interface EntryProps {
    description: string;
    mediaName: string;
    title: string;
    date?: string;
    primary?: string;
    vibe: Vibe;
    verticalOffsetPx?: number;
    debugScrollPosition?: number;
}

export function Entry({
    description,
    mediaName,
    title,
    date,
    vibe,
    debugScrollPosition,
}: EntryProps) {
    const theme = getThemeFromVibe(vibe);
    const numColors = getNumberOfColorsInScheme(theme.scheme);
    console.log("determined the best number of colors is ");
    if (numColors === 1) {
        return (
            <div>
                <MonochromaticEntry
                    description={description}
                    mediaName={mediaName}
                    title={title}
                    date={date}
                    theme={theme}
                ></MonochromaticEntry>
            </div>
        );
    } else if (numColors === 2) {
        return (
            <>
                <BichromaticEntry
                    description={description}
                    mediaName={mediaName}
                    title={title}
                    date={date}
                    theme={theme}
                ></BichromaticEntry>
                {debugScrollPosition}
            </>
        );
    } else if (numColors === 3) {
        return (
            <BichromaticEntry
                description={description}
                mediaName={mediaName}
                title={title}
                date={date}
                theme={theme}
            ></BichromaticEntry>
        );
    } else if (numColors === 4) {
        return (
            <BichromaticEntry
                description={description}
                mediaName={mediaName}
                title={title}
                date={date}
                theme={theme}
            ></BichromaticEntry>
        );
    } else {
        throw new Error("Unexpected number of colors");
    }
}
