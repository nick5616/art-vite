import * as React from "react";

export function ExpandableDescription(props: {
    description: string;
    selected: boolean;
    expandRequested: (expanded: boolean) => void;
}) {
    const collapseThreshold = 40;
    const [expanded, setExpanded] = React.useState(true);
    let minifiedDescription = props.description.slice(0, collapseThreshold);
    if (!props.selected) {
        minifiedDescription += "...";
    }
    if (props.description.length > collapseThreshold && expanded) {
        // console.log("MIN", minifiedDescription);
        setExpanded(false);
    }
    return expanded ? (
        <div
            style={{
                alignItems: "center",
                textAlign: "start",
            }}
        >
            {props.description}
        </div>
    ) : (
        <div
            style={{
                alignItems: "center",
                textAlign: "start",
            }}
        >
            {minifiedDescription}{" "}
            {props.selected ? (
                <div
                    onClick={() => {
                        props.expandRequested(expanded);
                    }}
                    style={{ transition: "color 0.5s ease" }}
                >
                    <strong>see more</strong>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
