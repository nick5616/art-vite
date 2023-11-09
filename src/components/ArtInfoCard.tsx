import * as React from "react";
import { ArtTitle } from "./ArtTitle";
import { ExpandableDescription } from "./ExpandableDescription";

export function ArtInfoCard(props: {
    index: number;

    title: string;
    description: string;
    onCollapseToggled: () => void;
    onInfoCardClicked: () => void;
    descriptionOverflowed: () => void;
    date?: string;
    selected: boolean;
}) {
    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                borderRadius: "50px",
            }}
            onClick={() => props.onInfoCardClicked}
        >
            <ArtTitle title={props.title}></ArtTitle>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    gap: "10px",
                }}
            >
                <div>
                    <ExpandableDescription
                        description={props.description}
                        expandRequested={() => {
                            props.onCollapseToggled();
                        }}
                        selected={props.selected}
                        descriptionOverflowed={props.descriptionOverflowed}
                    ></ExpandableDescription>
                </div>
                <div style={{ margin: "0 0 0 auto" }}>
                    {props.date ? <p>Created on {props.date}</p> : <></>}
                </div>
            </div>
        </div>
    );
}
