import * as React from "react";
import { ArtTitle } from "./ArtTitle";
import { ExpandableDescription } from "./ExpandableDescription";

export function ArtInfoCard(props: {
    index: number;
    onUpClicked: (index: number) => void;
    onDownClicked: (index: number) => void;

    title: string;
    description: string;
    onCollapseToggled: () => void;

    date?: string;
    selected: boolean;
}) {
    return (
        <div style={{ display: "flex" }}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    paddingRight: "10px",
                }}
            >
                {/* <div>
                    <div onClick={() => props.onUpClicked(props.index)}>Up</div>
                    <div onClick={() => props.onDownClicked(props.index)}>
                        Down
                    </div>
                </div> */}
            </div>
            <ArtTitle title={props.title}></ArtTitle>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <div style={{}}>
                    <ExpandableDescription
                        description={props.description}
                        expandRequested={() => {
                            props.onCollapseToggled();
                        }}
                        selected={props.selected}
                    ></ExpandableDescription>
                </div>
                <div style={{ float: "right" }}>
                    {props.date ? <p>Created on {props.date}</p> : <></>}
                </div>
            </div>
        </div>
    );
}
