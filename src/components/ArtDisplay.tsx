import * as React from "react";
import { reducer } from "../hooks/useTheme";
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
import { firstNCharacters } from "../../utils/strings";
import { IndexOrbs } from "./IndexOrbs";
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
        dispatch({ newVibe: vibe });
    }, [selectedIndex, setSelectedIndex]);
    console.log("call from art display");
    const theme = getThemeFromVibe(props.entries[selectedIndex].vibe);
    const { width } = useWindowDimensions();
    const [descriptionExpanded, setDescriptionExpanded] = React.useState(false);
    const [state, dispatch] = React.useReducer(reducer, theme);
    console.log("state", state);
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
    const foreground = theme.palette[paletteIndex].colorPair.color;
    const deviceIsBigWidth = useMediaQuery(
        "only screen and (min-width: 1057px)",
    );
    const [touchStart, setTouchStart] = React.useState<{
        x: number;
        y: number;
    } | null>(null);
    const [touchEnd, setTouchEnd] = React.useState<{
        x: number;
        y: number;
    } | null>(null);

    const descriptionMaxCharacterLimit = 34;
    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 50;

    const onTouchStart = (e: any) => {
        setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
        setTouchStart({
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY,
        });
    };

    const onTouchMove = (e: any) =>
        setTouchEnd({
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY,
        });

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distanceX = touchStart.x - touchEnd.x;
        const distanceY = touchStart.y - touchEnd.y;

        const isHorizontalSwipe = distanceX > distanceY;
        const isLeftSwipe = distanceX > minSwipeDistance && isHorizontalSwipe;
        const isRightSwipe = distanceX < -minSwipeDistance && isHorizontalSwipe;
        if (isLeftSwipe || isRightSwipe)
            console.log("swipe", isLeftSwipe ? "left" : "right");
        // add your conditional logic here
        if (isRightSwipe) {
            setSelectedIndex((old) => {
                return old === 0 ? props.entries.length - 1 : old - 1;
            });
        }
        if (isLeftSwipe) {
            setSelectedIndex((old) => {
                return old === props.entries.length - 1 ? 0 : old + 1;
            });
        }
    };
    console.log("device is big width!");
    return (
        <div>
            {deviceIsBigWidth ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "auto",
                        maxHeight: "100vh",
                        backgroundColor: mediaBackgroundColor,
                        // padding: "20px 0",
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
                                color: foreground,
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
                                        maxHeight: "93vh",
                                    }}
                                    src={`${imagePathArray[selectedIndex]}`}
                                ></img>
                            )}
                        </div>
                    </>
                </div>
            ) : (
                <div style={{}}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            backgroundColor:
                                theme.palette[secondIndex].colorPair
                                    .backgroundColor,
                            marginBottom: "10px",
                        }}
                    >
                        <h1
                            style={{
                                fontSize: "20pt",
                                padding: 0,
                                display: "flex",
                                textAlign: "start",
                                marginLeft: "5vw",
                            }}
                        >
                            {props.entries[selectedIndex].title}
                        </h1>
                        <IndexOrbs
                            index={selectedIndex}
                            length={props.entries.length}
                            theme={theme}
                            paletteIndex={paletteIndex}
                            onSelectedIndexChanged={(
                                requestedIndex: number,
                            ) => {
                                setSelectedIndex(requestedIndex);
                            }}
                        ></IndexOrbs>
                    </div>
                    {props.entries[selectedIndex].hidden ? (
                        <>🚧 UNDER CONSTRUCTION 🚧</>
                    ) : (
                        <img
                            style={{
                                maxWidth: "95vw",
                                maxHeight: "80vh",
                                backgroundColor: "blue",
                            }}
                            src={`${imagePathArray[selectedIndex]}`}
                            onTouchStart={onTouchStart}
                            onTouchEnd={onTouchEnd}
                            onTouchMove={onTouchMove}
                        ></img>
                    )}

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            margin: "0 auto",
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: foreground,
                                color: mediaBackgroundColor,
                                padding: "10px",
                                borderRadius: "10px 10px 0 0",
                                display: "flex",
                                alignItems: "center",
                                margin: "0 auto",
                                width: width - 20 + "px",
                                fontSize: "12pt",
                            }}
                            onTouchStart={onTouchStart}
                            onTouchEnd={onTouchEnd}
                            onTouchMove={onTouchMove}
                        >
                            <div style={{ display: "flex" }}>
                                {descriptionExpanded ||
                                props.entries[selectedIndex].description
                                    .length < descriptionMaxCharacterLimit ? (
                                    <div>
                                        {props.entries[selectedIndex]
                                            .description.length <
                                        descriptionMaxCharacterLimit ? (
                                            <div>
                                                {
                                                    props.entries[selectedIndex]
                                                        .description
                                                }
                                            </div>
                                        ) : (
                                            <div
                                                onClick={() => {
                                                    setDescriptionExpanded(
                                                        (old) => !old,
                                                    );
                                                }}
                                                style={{}}
                                            >
                                                {
                                                    props.entries[selectedIndex]
                                                        .description
                                                }

                                                <div>
                                                    <strong> hide</strong>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => {
                                            setDescriptionExpanded(
                                                (old) => !old,
                                            );
                                        }}
                                        style={{ display: "flex" }}
                                    >
                                        {firstNCharacters(
                                            descriptionMaxCharacterLimit,
                                            props.entries[selectedIndex]
                                                .description,
                                        )}
                                        {"... "}
                                        <div>
                                            <strong> see more</strong>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
