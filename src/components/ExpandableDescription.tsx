import * as React from "react";
import { useIsOverflow } from "../hooks/useIsOverflow";
import useWindowDimensions from "../hooks/useWindowDimenstions";

export function ExpandableDescription(props: {
    description: string;
    selected: boolean;
    expandRequested: (expanded: boolean) => void;
}) {
    // const collapseThreshold = 50;
    const [expanded, setExpanded] = React.useState(true);
    // const minifiedDescription = props.description.slice(0, collapseThreshold);
    const { width } = useWindowDimensions();
    if (!props.selected) {
        // minifiedDescription += "...";
    }
    if (expanded) {
        // console.log("MIN", minifiedDescription);
        setExpanded(false);
    }
    const descriptionRef = React.createRef<HTMLDivElement>();
    const descriptionOverflowed: boolean =
        useIsOverflow(descriptionRef, () => {
            console.log("description overflowed");
        }) ?? false;
    return expanded ? (
        <div
            style={{
                textAlign: "start",
            }}
        >
            {props.description}
        </div>
    ) : (
        <div style={{ display: "flex" }}>
            <div
                style={{
                    whiteSpace: "nowrap",
                    alignItems: "center",
                    textAlign: "start",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: width / 6,
                }}
                ref={descriptionRef}
            >
                {props.description}{" "}
            </div>
            {props.selected && descriptionOverflowed ? (
                <span
                    onClick={() => {
                        props.expandRequested(expanded);
                    }}
                >
                    <strong>see more</strong>
                </span>
            ) : (
                <></>
            )}
        </div>
    );
}
