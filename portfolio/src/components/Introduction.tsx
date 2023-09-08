import * as React from "react";
import { useEffect, useRef, useState } from "react";
import "./styles/introduction.css";
export function Introduction(props: {
    introductionHeight: (height: number) => void;
}): React.ReactElement {
    const [height, setHeight] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const elementHeight = ref?.current?.clientHeight;
        setHeight(elementHeight ?? 0);
        props.introductionHeight(elementHeight ?? 0);
    });

    return (
        <div className="page-view" ref={ref}>
            <div className="introduction-container">
                <h1 className="serif heading">
                    Hi! I'm Nick, but you can call me iPad baby
                </h1>
                <h2 className="serif">
                    I hope you enjoy my art. I sure do enjoy drawing it 👼🏼📲
                </h2>
            </div>
        </div>
    );
}
