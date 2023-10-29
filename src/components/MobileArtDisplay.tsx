import * as React from "react";
import { firstNCharacters } from "../../utils/strings";
import useWindowDimensions from "../hooks/useWindowDimenstions";
import { ArtEntry, Theme } from "../models";
import { IndexOrbs } from "./IndexOrbs";

export function MobileArtDisplay(props: {
    paletteIndex: number;
    descriptionExpanded: boolean;
    primaryForegroundColor: string;
    entries: ArtEntry[];
    theme: Theme;
    selectedIndex: number;
    primaryBackgroundColor: string;
    secondaryBackgroundColor: string;
    imagePathArray: string[];
    onSelectedIndexChanged: (index: number) => void;
}) {
    const [touchStart, setTouchStart] = React.useState<{
        x: number;
        y: number;
    } | null>(null);
    const [touchEnd, setTouchEnd] = React.useState<{
        x: number;
        y: number;
    } | null>(null);
    const minSwipeDistance = 50;

    const onTouchStart = (e: any) => {
        setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
        setTouchStart({
            x: e.targetTouches[0].clientX as number,
            y: e.targetTouches[0].clientY as number,
        });
    };

    const onTouchMove = (e: any) =>
        setTouchEnd({
            x: e.targetTouches[0].clientX as number,
            y: e.targetTouches[0].clientY as number,
        });

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distanceX = touchStart.x - touchEnd.x;
        const distanceY = touchStart.y - touchEnd.y;

        const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

        const isLeftSwipe = distanceX > minSwipeDistance && isHorizontalSwipe;
        const isRightSwipe = distanceX < -minSwipeDistance && isHorizontalSwipe;

        const old = props.selectedIndex;
        if (isRightSwipe) {
            const rightIndex = old === 0 ? props.entries.length - 1 : old - 1;
            props.onSelectedIndexChanged(rightIndex);
        }
        if (isLeftSwipe) {
            const leftIndex = old === props.entries.length - 1 ? 0 : old + 1;
            props.onSelectedIndexChanged(leftIndex);
        }
    };
    const descriptionMaxCharacterLimit = 34;
    const { width, height } = useWindowDimensions();
    const [descriptionExpanded, setDescriptionExpanded] = React.useState(false);
    return (
        <div
            style={{
                height: `${height}px`,
                width: `${width}px`,
                position: "relative",
                backgroundColor: props.primaryBackgroundColor,
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: props.secondaryBackgroundColor,

                    marginBottom: "10px",
                }}
            >
                <div style={{ marginLeft: (2.5 / 100) * height }}>
                    <h1
                        style={{
                            fontSize: "20pt",
                            padding: 0,
                            display: "flex",
                            textAlign: "start",
                            marginBottom: "0",
                        }}
                    >
                        {props.entries[props.selectedIndex].title}
                    </h1>

                    {props.entries[props.selectedIndex].date ? (
                        <h2
                            style={{
                                fontSize: "12pt",
                                marginTop: "0",
                                padding: 0,
                            }}
                        >
                            <strong>Created on </strong>
                            {props.entries[props.selectedIndex].date}
                        </h2>
                    ) : (
                        <>
                            <h2
                                style={{
                                    fontSize: "12pt",
                                    marginTop: "0",
                                    padding: 0,
                                }}
                            >
                                Date of creation unknown
                                {props.entries[props.selectedIndex].date}
                            </h2>
                        </>
                    )}
                </div>
                <IndexOrbs
                    index={props.selectedIndex}
                    length={props.entries.length}
                    theme={props.theme}
                    paletteIndex={props.paletteIndex}
                    onSelectedIndexChanged={(requestedIndex: number) => {
                        props.onSelectedIndexChanged(requestedIndex);
                    }}
                ></IndexOrbs>
            </div>
            {props.entries[props.selectedIndex].hidden ? (
                <h1
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        fontSize: "20pt",
                    }}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                    onTouchMove={onTouchMove}
                >
                    🚧 UNDER CONSTRUCTION 🚧
                </h1>
            ) : (
                <div
                    style={{
                        width: 0.9 * width,
                        height: (84 / 100) * height,
                        display: "flex",
                        alignItems: "center",
                        margin: "auto",
                        justifyContent: "center",
                    }}
                >
                    <img
                        src={`${props.imagePathArray[props.selectedIndex]}`}
                        onTouchStart={onTouchStart}
                        onTouchEnd={onTouchEnd}
                        onTouchMove={onTouchMove}
                        style={{
                            maxWidth: 0.9 * width,
                            maxHeight: (80 / 100) * height,
                        }}
                    ></img>
                </div>
            )}

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "auto",
                    position: "absolute",
                    bottom: 0,
                }}
            >
                <div
                    style={{
                        backgroundColor: props.primaryForegroundColor,
                        color: props.primaryBackgroundColor,
                        padding: "10px",
                        borderRadius: "10px 10px 0 0",
                        display: "flex",
                        alignItems: "center",
                        margin: "0 auto",
                        fontSize: "12pt",
                    }}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                    onTouchMove={onTouchMove}
                >
                    <div
                        style={{
                            display: "flex",
                        }}
                    >
                        {descriptionExpanded ||
                        props.entries[props.selectedIndex].description.length <
                            descriptionMaxCharacterLimit ? (
                            <div>
                                {props.entries[props.selectedIndex].description
                                    .length < descriptionMaxCharacterLimit ? (
                                    <div style={{ width: width - 20 + "px" }}>
                                        {
                                            props.entries[props.selectedIndex]
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
                                        style={{ width: width - 20 + "px" }}
                                    >
                                        {
                                            props.entries[props.selectedIndex]
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
                                    setDescriptionExpanded((old) => !old);
                                }}
                                style={{
                                    display: "flex",
                                    width: width - 20 + "px",
                                }}
                            >
                                {firstNCharacters(
                                    descriptionMaxCharacterLimit,
                                    props.entries[props.selectedIndex]
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
    );
}
