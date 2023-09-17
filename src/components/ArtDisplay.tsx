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
// import imgUrl7 from "../../art/angrybird.png";
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
    // const mediaBackgroundColor = getRandomBackgroundColorFromPalette(
    //     getThemeFromVibe(props.entries[selectedIndex].vibe).palette,
    // );
    // const foreground = getRandomColorFromPalette(
    //     getThemeFromVibe(props.entries[selectedIndex].vibe).palette,
    // );

    React.useEffect(() => {
        const vibe = props.entries[selectedIndex].vibe;
        props.onArtChanged(vibe, paletteIndex);
        // dispatch({ newVibe: vibe });
    }, [selectedIndex, setSelectedIndex]);
    // console.log("call from art display");
    const theme = getThemeFromVibe(props.entries[selectedIndex].vibe);
    const { height } = useWindowDimensions();
    // const [state, dispatch] = React.useReducer(reducer, theme);
    // console.log("state", state);
    const imagePathArray = [
        imgUrl,
        imgUrl2,
        imgUrl3,
        imgUrl4,
        imgUrl5,
        imgUrl6,
        // imgUrl7,
    ];
    const paletteIndex = generateRandomNumberExcluding(
        [],
        theme.palette.length,
    );

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
        "only screen and (min-width: 1057px)",
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
                        // padding: "20px 0",
                    }}
                >
                    <>
                        <div
                            style={{
                                width: "50%",
                                backgroundColor: mediaBackgroundColor,
                                color: primaryForegroundColor,
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
                                            console.log(
                                                "selectedIndex",
                                                selectedIndex,
                                            );
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
                                color: primaryForegroundColor,
                                borderRadius: "10px",
                                padding: "5px",
                            }}
                        >
                            {props.entries[selectedIndex].hidden ? (
                                <>🚧 UNDER CONSTRUCTION 🚧</>
                            ) : (
                                <img
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: height - 10,
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
