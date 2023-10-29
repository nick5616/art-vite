import * as React from "react";
import { ArtTitle } from "./ArtTitle";
import { ExpandableDescription } from "./ExpandableDescription";

export function ArtInfoCard(props: {
    index: number;

    title: string;
    description: string;
    onCollapseToggled: () => void;

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
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    paddingRight: "10px",
                }}
            ></div>
            <ArtTitle title={props.title}></ArtTitle>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <div>
                    <ExpandableDescription
                        description={props.description}
                        expandRequested={() => {
                            props.onCollapseToggled();
                        }}
                        selected={props.selected}
                    ></ExpandableDescription>
                </div>
                <div style={{ margin: "0 0 0 auto" }}>
                    {props.date ? <p>Created on {props.date}</p> : <></>}
                </div>
            </div>
        </div>
    );
}
