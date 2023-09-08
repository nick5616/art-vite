import * as React from "react";
import { ArtEntry, Vibe } from "../models";
import { generateRandomNumberExcluding, getThemeFromVibe } from "../theme";
import { ArtInfoCardController } from "./ArtInfoCardController";

export function ArtDisplay(props: {
    entries: ArtEntry[];
    onArtChanged: (vibe: Vibe, selectedIndex: number) => void;
}) {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    // const mediaBackgroundColor = getRandomBackgroundColorFromPalette(
    //     getThemeFromVibe(props.entries[selectedIndex].vibe).palette,
    // );
    // const foreground = getRandomColorFromPalette(
    //     getThemeFromVibe(props.entries[selectedIndex].vibe).palette,
    // );

    React.useEffect(() => {
        const vibe = props.entries[selectedIndex].vibe;
        props.onArtChanged(vibe, paletteIndex);
    }, [selectedIndex, setSelectedIndex]);
    const theme = getThemeFromVibe(props.entries[selectedIndex].vibe);
    const paletteIndex = generateRandomNumberExcluding(
        [],
        theme.palette.length,
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
                width: "auto",
                maxHeight: "95vh",
                backgroundColor: mediaBackgroundColor,
                borderRadius: "10px",
            }}
        >
            <>
                <div
                    style={{
                        width: "50%",
                        overflow: "auto",
                        backgroundColor: mediaBackgroundColor,
                        color: foreground,
                    }}
                >
                    {props.entries.map((entry, key) => {
                        console.log("entry!!", entry);
                        return (
                            <ArtInfoCardController
                                title={entry.title}
                                description={entry.description}
                                index={entry.index}
                                onCardClicked={(index: number) =>
                                    setSelectedIndex(index)
                                }
                                onUpClicked={(index: number) =>
                                    setSelectedIndex(index - 1)
                                }
                                onDownClicked={(index: number) => {
                                    setSelectedIndex(index + 1);
                                }}
                                selected={selectedIndex === entry.index}
                                vibe={entry.vibe}
                                key={key}
                                paletteIndex={paletteIndex}
                                date={entry.date}
                            ></ArtInfoCardController>
                        );
                    })}
                </div>
                <div
                    style={{
                        width: "50%",
                        backgroundColor: mediaBackgroundColor,
                        color: foreground,
                        borderRadius: "10px",
                        // padding: "5px",
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
