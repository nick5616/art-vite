import * as React from "react";
import { ArtEntry } from "../models";
import { generateRandomNumberExcluding, getThemeFromVibe } from "../theme";
import { ArtInfoCard } from "./ArtInfoCard";

export function ArtDisplay(props: { entries: ArtEntry[] }) {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    // const mediaBackgroundColor = getRandomBackgroundColorFromPalette(
    //     getThemeFromVibe(props.entries[selectedIndex].vibe).palette,
    // );
    // const foreground = getRandomColorFromPalette(
    //     getThemeFromVibe(props.entries[selectedIndex].vibe).palette,
    // );
    const paletteIndex = generateRandomNumberExcluding(
        [],
        getThemeFromVibe(props.entries[selectedIndex].vibe).palette.length,
    );
    const mediaBackgroundColor = getThemeFromVibe(
        props.entries[selectedIndex].vibe,
    ).palette[paletteIndex].backgroundColor;
    const foreground = getThemeFromVibe(props.entries[selectedIndex].vibe)
        .palette[paletteIndex].color;
    console.log("mediaBackgroundColor", mediaBackgroundColor);
    console.log("selectedIndex", selectedIndex);
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                maxHeight: "95vh",
                backgroundColor: "#ddddff",
            }}
        >
            <>
                <div
                    style={{
                        border: "1px solid red",
                        width: "50%",
                        overflow: "auto",
                        backgroundColor: mediaBackgroundColor,
                        color: foreground,
                    }}
                >
                    {props.entries.map((entry, key) => {
                        console.log("entry!!", entry);
                        return (
                            <ArtInfoCard
                                title={entry.title}
                                description={entry.description}
                                index={entry.index}
                                onClick={(index: number) =>
                                    setSelectedIndex(index)
                                }
                                selected={selectedIndex === entry.index}
                                vibe={entry.vibe}
                                key={key}
                                paletteIndex={paletteIndex}
                            ></ArtInfoCard>
                        );
                    })}
                </div>
                <div
                    style={{
                        border: "1px solid green",
                        width: "50%",
                        backgroundColor: mediaBackgroundColor,
                        color: foreground,
                    }}
                >
                    <img
                        style={{ maxWidth: "100%", maxHeight: "93vh" }}
                        src={`../../art/${props.entries[selectedIndex].mediaName}`}
                    ></img>
                </div>
            </>
        </div>
    );
}
