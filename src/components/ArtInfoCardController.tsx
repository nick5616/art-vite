import * as React from "react";
import { Vibe } from "../models";
import { generateRandomNumberExcluding, getThemeFromVibe } from "../theme";
import { ArtInfoCard } from "./ArtInfoCard";
import { ArtInfoCardExpanded } from "./ArtInfoCardExpanded";

export function ArtInfoCardController(props: {
    title: string;
    description: string;
    index: number;
    selected: boolean;
    vibe: Vibe;
    paletteIndex: number;
    date: string | undefined;
    onCardClicked: (index: number) => void;
}) {
    const [descriptionExpanded, setDescriptionExpanded] = React.useState(false);
    const [descriptionOverflowed, setDescriptionOverflowed] =
        React.useState(false);

    const theme = getThemeFromVibe(props.vibe);

    const isMonochromatic = theme.palette.length === 1;

    const randomPaletteIndex = isMonochromatic
        ? 0
        : generateRandomNumberExcluding(
              [props.paletteIndex],
              theme.palette.length,
          );

    const backgroundColor = props.selected
        ? theme.palette[randomPaletteIndex].colorPair.color
        : "inherit";
    const color = props.selected
        ? theme.palette[randomPaletteIndex].colorPair.backgroundColor
        : "inherit";

    return (
        <div
            style={{
                color,
                backgroundColor,
                padding: "20px",
                margin: "0 10px",
                marginLeft: "50px",

                borderRadius: "50px",
                display: "flex",
            }}
            onClick={() => {
                if (
                    !descriptionExpanded &&
                    props.selected &&
                    descriptionOverflowed
                ) {
                    setDescriptionExpanded(true);
                }
                props.onCardClicked(props.index);
            }}
        >
            {!props.selected ? (
                <ArtInfoCard
                    title={props.title}
                    onCollapseToggled={() => {
                        setDescriptionExpanded(!descriptionExpanded);
                    }}
                    description={props.description}
                    index={props.index}
                    date={props.date}
                    selected={props.selected}
                    onInfoCardClicked={() => {
                        setDescriptionExpanded(
                            (descriptionExpanded) => !descriptionExpanded,
                        );
                    }}
                    descriptionOverflowed={() => {
                        setDescriptionOverflowed(true);
                    }}
                ></ArtInfoCard>
            ) : (
                <ArtInfoCardExpanded
                    title={props.title}
                    onCollapseToggled={() => {
                        setDescriptionExpanded(!descriptionExpanded);
                    }}
                    description={props.description}
                    index={props.index}
                    selected={props.selected}
                    vibe={props.vibe}
                    paletteIndex={props.paletteIndex}
                    date={props.date}
                    onCardClicked={() => {
                        setDescriptionExpanded(
                            (descriptionExpanded) => !descriptionExpanded,
                        );

                        return props.onCardClicked;
                    }}
                ></ArtInfoCardExpanded>
            )}
        </div>
    );
}
