import * as React from "react";
import { reducer } from "../hooks/useTheme";
import { ArtEntry, Vibe } from "../models";
import { generateRandomNumberExcluding, getThemeFromVibe } from "../theme";
import { ArtInfoCardController } from "./ArtInfoCardController";

export function ArtDisplay(props: {
    entries: ArtEntry[];
    onArtChanged: (vibe: Vibe, paletteIndex: number) => void;
}) {
    const [selectedIndex, setSelectedIndex] = React.useState(
        Math.floor(Math.random() * props.entries.length),
    );
    // const mediaBackgroundColor = getRandomBackgroundColorFromPalette(
    //     getThemeFromVibe(props.entries[selectedIndex].vibe).palette,
    // );
    // const foreground = getRandomColorFromPalette(
    //     getThemeFromVibe(props.entries[selectedIndex].vibe).palette,
    // );

    React.useEffect(() => {
        const vibe = props.entries[selectedIndex].vibe;
        props.onArtChanged(vibe, paletteIndex);
        dispatch({ newVibe: vibe });
    }, [selectedIndex, setSelectedIndex]);
    console.log("call from art display");
    const theme = getThemeFromVibe(props.entries[selectedIndex].vibe);
    const [state, dispatch] = React.useReducer(reducer, theme);
    console.log("state", state);
    const paletteIndex = generateRandomNumberExcluding(
        [],
        theme.palette.length,
    );
    const mediaBackgroundColor = getThemeFromVibe(
        props.entries[selectedIndex].vibe,
    ).palette[paletteIndex].backgroundColor;
    const foreground = getThemeFromVibe(props.entries[selectedIndex].vibe)
        .palette[paletteIndex].color;

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "auto",
                maxHeight: "100vh",
                backgroundColor: mediaBackgroundColor,
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
                                onUpClicked={(index: number) => {
                                    console.log(
                                        "up clicked",
                                        selectedIndex,
                                        index,
                                    );
                                    setSelectedIndex(selectedIndex - 1);
                                }}
                                onDownClicked={(index: number) => {
                                    console.log("down clikced", index);
                                    setSelectedIndex(index + 1);
                                    console.log("selectedIndex", selectedIndex);
                                }}
                                selected={selectedIndex === entry.index}
                                vibe={props.entries[selectedIndex].vibe}
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
