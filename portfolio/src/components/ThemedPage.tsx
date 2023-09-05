import * as React from "react";
import { useEffect, useState } from "react";
import { Vibe } from "../models";
import useWindowDimensions from "../hooks/useWindowDimenstions";
import { ArtEntry } from "../models";
import { getThemeFromVibe } from "../theme";
import { ArtDisplay } from "./ArtDisplay";
import { Entry } from "./Entry";
import { Introduction } from "./Introduction";

function fetchEntriesFromJSONMock(): ArtEntry[] {
    const data = [
        {
            title: "Furry guy in bliss",
            description: "This is a furry guy from the game League of Legends",
            mediaName: "Untitled_Artwork5.jpg",
            vibe: Vibe.DARK_RED,
            index: 0,
        },
        {
            title: "Picknick",
            description: "Mackbook",
            mediaName: "Untitled_Artwork8.jpg",
            vibe: Vibe.BABY_BLUE,
            index: 1,
        },
        {
            title: "Link",
            description: 'This is Link from the game "Breath of the Wild"',
            mediaName: "Untitled_Artwork9.jpg",
            vibe: Vibe.DEEP_PURPLE,
            index: 2,
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
            vibe: Vibe.PRUSSIAN_BLUE,
            index: 4,
        },
    ];

    return data;
}

export function ThemedPage(): JSX.Element {
    const [entries, setEntries] = useState<ArtEntry[]>(
        fetchEntriesFromJSONMock(),
    );
    const { height, width } = useWindowDimensions();
    const [introHeight, setIntroHeight] = useState(0);
    let pageVibe = Vibe.VANILLA;
    console.log("introHeight", introHeight);
    console.log(height, width);
    //const [scrollPosition, setScrollPosition] = React.useState(0);
    // React.useEffect(() => {
    //     const handleScroll = () => {
    //         setScrollPosition(window.scrollY);
    //     };
    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, []);

    // const pageScrollPosition = 60 + introHeight + scrollPosition;
    // console.log("pageScrollPosition", pageScrollPosition);
    // const numberForPageTheme = Math.floor(
    //     scrollPosition / (0.8 * height) - 0.3,
    // );
    // console.log("number for page theme", numberForPageTheme);

    // if (numberForPageTheme >= 0 && numberForPageTheme < entries.length) {
    //     console.log("setting page vibe", entries[numberForPageTheme].vibe);
    //     pageVibe = entries[numberForPageTheme].vibe;
    // }

    const pageTheme = getThemeFromVibe(pageVibe);
    console.log("page vibe", pageVibe);
    return (
        <div
            style={{
                borderLeft: "2px solid green",
                background: pageTheme.palette[0].backgroundColor,
            }}
        >
            {/* <div style={{ position: "sticky", top: "20px" }}>
                {scrollPosition}
            </div> */}
            <Introduction introductionHeight={setIntroHeight}></Introduction>
            <ArtDisplay entries={entries}></ArtDisplay>
            <div>
                {entries.map((entry: ArtEntry, key) => {
                    // console.log("entry", entry);
                    let offset = 0;
                    return (
                        <Entry
                            title={entry.title}
                            description={entry.description}
                            mediaName={entry.mediaName}
                            vibe={entry.vibe}
                            verticalOffsetPx={(offset += 50)}
                            key={key}
                        ></Entry>
                    );
                })}
            </div>

            {/* <Entry
                title="Angry Bird in real life"
                description="Angry bird. I didn't draw this. It's actually a real bird. You know, they say art imitates life. This is demonstrating the converse"
                mediaName="angrybird.png"
                vibe={Vibe.DARK_RED}
            ></Entry>
            <Entry
                title="This bird is scribbled. He has angry bird energy"
                description="scribble bird"
                mediaName="Untitled_Artwork4.jpg"
                vibe={Vibe.DARK_RED}
            ></Entry>
            <Entry
                title="Airbush sunset painting"
                description="sunset"
                mediaName="Untitled_Artwork3.jpg"
                vibe={Vibe.DARK_RED}
            ></Entry>
            <Entry
                title="The bite of '87"
                description="glitchy forest"
                mediaName="Untitled_Artwork2.jpg"
                vibe={Vibe.DARK_RED}
            ></Entry>
            <Entry
                title="OnePlus 5T"
                description="mackbook"
                mediaName="Untitled_Artwork8.jpg"
                vibe={Vibe.DARK_RED}
            ></Entry>
            <Entry
                title="Zelda"
                description="Portrait of a Character from The Legend of Zelda. Zelda is the wielder of the sword that seals darkness. The one on his back. "
                mediaName="Untitled_Artwork9.jpg"
                date="July, 2022"
                vibe={Vibe.DARK_RED}
            ></Entry>
            <Entry
                title="another bird?"
                description="bird"
                mediaName="Untitled_Artwork6.jpg"
                vibe={Vibe.DARK_RED}
            ></Entry> */}
        </div>
    );
}
