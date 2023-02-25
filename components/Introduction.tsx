import React from "react";
import "./styles/introduction.css";
export function Introduction(): JSX.Element {
    return (
        <div className="page-view">
            <div className="horizontal-stack">
                <div className="vertical-stack">
                    <div className="introduction-container">
                        <h1 className="serif heading">
                            Hi! I'm Nick, but you can call me iPad baby
                        </h1>
                        <h2 className="serif">
                            I hope you enjoy my art. I sure do enjoy drawing it
                            👼🏼📲
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
