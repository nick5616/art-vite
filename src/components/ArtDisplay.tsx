import * as React from "react";
import { ArtEntry, Vibe } from "../models";
import { generateRandomNumberExcluding, getThemeFromVibe } from "../theme";
import { ArtInfoCardController } from "./ArtInfoCardController";
import imgUrl from "../../art/Untitled_Artwork5.jpg";
import imgUrl2 from "../../art/Untitled_Artwork8.jpg";
import imgUrl3 from "../../art/Untitled_Artwork11.jpeg";
import imgUrl4 from "../../art/Untitled_Artwork2.jpg";
import imgUrl5 from "../../art/Untitled_Artwork3.jpg";
import imgUrl6 from "../../art/Untitled_Artwork10.jpg";
import imgUrl8 from "../../art/Untitled-Artwork.jpg";
// import imgUrl7 from "../../art/Untitled-Artwork 1.jpg";

import { useMediaQuery } from "@react-hook/media-query";
import { MobileArtDisplay } from "./MobileArtDisplay";
import useWindowDimensions from "../hooks/useWindowDimenstions";

export function ArtDisplay(props: {
    entries: ArtEntry[];
    onArtChanged: (vibe: Vibe, paletteIndex: number) => void;
}) {
    const [selectedIndex, setSelectedIndex] = React.useState(
        Math.floor(Math.random() * props.entries.length),
    );

    const theme = getThemeFromVibe(props.entries[selectedIndex].vibe);
    const paletteIndex = generateRandomNumberExcluding(
        [],
        theme.palette.length,
    );

    React.useEffect(() => {
        const vibe = props.entries[selectedIndex].vibe;
        props.onArtChanged(vibe, paletteIndex);
    }, [selectedIndex, setSelectedIndex, props, paletteIndex]);

    const { width, height } = useWindowDimensions();

    const imagePathArray = [
        imgUrl,
        imgUrl2,
        imgUrl3,
        imgUrl4,
        imgUrl5,
        imgUrl6,
        // imgUrl7,
        imgUrl8,
    ];

    const secondIndex =
        theme.palette.length === 1
            ? paletteIndex
            : generateRandomNumberExcluding(
                  [paletteIndex],
                  theme.palette.length,
              );

    const mediaBackgroundColor =
        theme.palette[paletteIndex].colorPair.backgroundColor;
    const primaryForegroundColor = theme.palette[paletteIndex].colorPair.color;
    const deviceIsBigWidth = useMediaQuery(
        "only screen and (min-width: 1200px)",
    );
    const primaryBackgroundColor =
        theme.palette[paletteIndex].colorPair.backgroundColor;
    const secondaryBackgroundColor =
        theme.palette[secondIndex].colorPair.backgroundColor;
    return (
        <div>
            {deviceIsBigWidth ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "auto",
                        maxHeight: 100 * height,
                        backgroundColor: mediaBackgroundColor,
                    }}
                >
                    <>
                        <div
                            style={{
                                width: "50%",
                                backgroundColor: mediaBackgroundColor,
                                color: primaryForegroundColor,
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                            }}
                        >
                            {props.entries.map((entry, key) => {
                                return (
                                    <ArtInfoCardController
                                        title={entry.title}
                                        description={entry.description}
                                        index={entry.index}
                                        onCardClicked={(index: number) =>
                                            setSelectedIndex(index)
                                        }
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
                                height: height - 50,
                                backgroundColor: mediaBackgroundColor,
                                color: primaryForegroundColor,
                                borderRadius: "10px",
                                padding: "5px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {props.entries[selectedIndex].hidden ? (
                                <h1
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "100%",
                                        fontSize: "20pt",
                                    }}
                                >
                                    🚧 UNDER CONSTRUCTION 🚧
                                </h1>
                            ) : (
                                <img
                                    style={{
                                        maxWidth: width / 2 - 20,
                                        maxHeight: height - 70,
                                    }}
                                    src={`${imagePathArray[selectedIndex]}`}
                                ></img>
                            )}
                        </div>
                    </>
                </div>
            ) : (
                <MobileArtDisplay
                    onSelectedIndexChanged={(index: number) =>
                        setSelectedIndex(index)
                    }
                    entries={props.entries}
                    theme={theme}
                    selectedIndex={selectedIndex}
                    descriptionExpanded={false}
                    primaryForegroundColor={primaryForegroundColor}
                    primaryBackgroundColor={primaryBackgroundColor}
                    secondaryBackgroundColor={secondaryBackgroundColor}
                    imagePathArray={imagePathArray}
                    paletteIndex={paletteIndex}
                ></MobileArtDisplay>
            )}
        </div>
    );
}
