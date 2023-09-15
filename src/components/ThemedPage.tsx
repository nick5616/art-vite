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
                "This is a furry guy from the game League of Legends. I drew him from a very popular pose for this little guy! Leave it to the folks at Tencent to design this character! MY FRIEND is a fan of this character so I drew it for him.. game League of Legends",
            mediaName: "Untitled_Artwork5.jpg",
            vibe: Vibe.DARK_RED,
            index: 0,
            date: "01/04/2023",
            hidden: false,
        },
        {
            title: "Picknick",
            description:
                "Mackbook. Mackbook. Mackbook. Mk Mackbook ckbook. Mackbo",
            mediaName: "Untitled_Artwork8.jpg",
            vibe: Vibe.BABY_BLUE,
            index: 1,
            date: "10/20/2022",
            hidden: false,
        },
        {
            title: "Link",
            description: 'This is Link from the game "Breath of the Wild"',
            mediaName: "Untitled_Artwork11.jpg",
            vibe: Vibe.DEEP_PURPLE,
            index: 2,
            date: "08/12/2022",
            hidden: false,
        },
        {
            title: "The Bite of '87",
            description: "This is what I think about sometimes.",
            mediaName: "Untitled_Artwork2.jpg",
            vibe: Vibe.PRUSSIAN_BLUE,
            index: 3,
            hidden: false,
        },
        {
            title: "Sunset",
            description:
                "Airbrushed sunset painting. Messing about with different presets, made this. I think it could be a lot better and I'm sure how to make it better. I had a lot of fun making this, so even though it's not great, I leave it as a reminder to try new things.",
            mediaName: "Untitled_Artwork3.jpg",
            vibe: Vibe.EARTH_DAY_2017,
            index: 4,
            hidden: false,
        },
        {
            title: "Duck",
            description:
                "I sketched a duck. Is this what ducks look like? I just pictured one and tried to draw it. I feel like repeatedly doing this, without real-world reference, will create some discrepancies between the sketches and the depictions over time",
            mediaName: "Untitled_Artwork10.jpg",
            vibe: Vibe.EARTH_DAY_2017,
            index: 5,
            hidden: false,
        },
        // {
        //     title: "New post",
        //     description: "I stupidasss bee, hates mondays",
        //     mediaName: "not used",
        //     vibe: Vibe.ITS_CORN,
        //     index: 6,
        //     hidden: false,
        // },
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
    // console.log("page vibe", pageVibe);
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
                    // console.log(
                    //     "art changed. vibe paletteIndex",
                    //     vibe,
                    //     paletteIndex,
                    // );
                    setPageVibe(vibe);
                    setChosenPaletteIndex(paletteIndex);
                    // console.log("CHOSEN PALETTE", chosenPaletteIndex);
                }}
            ></ArtDisplay>
        </div>
    );
}
