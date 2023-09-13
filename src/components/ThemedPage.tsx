import * as React from "react";
import { useEffect, useState } from "react";
import { Theme, Vibe } from "../models";
import { ArtEntry } from "../models";
import { getThemeFromVibe } from "../theme";
import { ArtDisplay } from "./ArtDisplay";
import { Introduction } from "./Introduction";

function fetchEntriesFromJSONMock(): ArtEntry[] {
    const data = [
        {
            title: "Furry guy in bliss",
            description:
                "This is a furry guy from the game League of Legends. This is a furry guy from the game League of Legends. This is a furry guy from the game League of Legends. This is a furry guy from the game League of Legends. This is a furry guy from the game League of Legends. This is a furry guy from the game League of Legends",
            mediaName: "Untitled_Artwork5.jpg",
            vibe: Vibe.DARK_RED,
            index: 0,
            date: "01/04/2023",
        },
        {
            title: "Picknick",
            description:
                "Mackbook. Mackbook. Mackbook. Mk Mackbook ckbook. Mackbo",
            mediaName: "Untitled_Artwork8.jpg",
            vibe: Vibe.BABY_BLUE,
            index: 1,
            date: "10/20/2022",
        },
        {
            title: "Link",
            description: 'This is Link from the game "Breath of the Wild"',
            mediaName: "Untitled_Artwork9.jpg",
            vibe: Vibe.DEEP_PURPLE,
            index: 2,
            date: "08/12/2022",
        },
        {
            title: "The Bite of '87",
            description: "This is what I think about sometimes.",
            mediaName: "Untitled_Artwork2.jpg",
            vibe: Vibe.ITS_CORN,
            index: 3,
        },
        {
            title: "Sunset",
            description: "Airbrushed sunset painting",
            mediaName: "Untitled_Artwork3.jpg",
            vibe: Vibe.EARTH_DAY_2017,
            index: 4,
        },
    ];

    return data;
}

export function ThemedPage(props: {
    onPageThemeDetermined: (theme: Theme) => void;
}): JSX.Element {
    const [entries] = useState<ArtEntry[]>(fetchEntriesFromJSONMock());
    const [pageVibe, setPageVibe] = useState(Vibe.VANILLA);
    const [chosenPaletteIndex, setChosenPaletteIndex] = useState<number>(0);
    const pageTheme = getThemeFromVibe(pageVibe);
    useEffect(() => {
        props.onPageThemeDetermined(pageTheme);
    }, [pageVibe, setPageVibe]);
    // const chosenIndex = generateRandomNumberExcluding(
    //     [],
    //     pageTheme.palette.length,
    // );
    console.log("page vibe", pageVibe);
    // const isMonochromatic = pageTheme.palette.length === 1;
    // const backgroundColor = isMonochromatic
    //     ? pageTheme.palette[0].color
    //     : pageTheme.palette[chosenPaletteIndex].backgroundColor;
    // const foreground = isMonochromatic
    //     ? pageTheme.palette[0].backgroundColor
    //     : pageTheme.palette[chosenPaletteIndex].color;

    return (
        <div
            style={
                {
                    // background: "red",
                    // color: foreground,
                }
            }
        >
            <Introduction
                pageTheme={pageTheme}
                chosenPaletteIndex={chosenPaletteIndex}
            ></Introduction>
            <ArtDisplay
                entries={entries}
                onArtChanged={(vibe, paletteIndex) => {
                    console.log(
                        "art changed. vibe paletteIndex",
                        vibe,
                        paletteIndex,
                    );
                    setPageVibe(vibe);
                    setChosenPaletteIndex(paletteIndex);
                    console.log("CHOSEN PALETTE", chosenPaletteIndex);
                }}
            ></ArtDisplay>
        </div>
    );
}
