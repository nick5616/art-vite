import * as React from "react";
import { useIsOverflow } from "../hooks/useIsOverflow";
import useWindowDimensions from "../hooks/useWindowDimenstions";

export function ExpandableDescription(props: {
    description: string;
    selected: boolean;
    expandRequested: (expanded: boolean) => void;
    descriptionOverflowed: () => void;
}) {
    const [expanded, setExpanded] = React.useState(true);
    const { width } = useWindowDimensions();

    if (expanded) {
        setExpanded(false);
    }
    const descriptionRef = React.createRef<HTMLDivElement>();
    const descriptionOverflowed: boolean =
        useIsOverflow(descriptionRef, () => {}) ?? false;
    if (descriptionOverflowed) {
        props.descriptionOverflowed();
    }
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
        </div>
    );
}
