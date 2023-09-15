import * as React from "react";
import useWindowDimensions from "../hooks/useWindowDimenstions";

export function DebugWindowWidth(props: { devMode: boolean }) {
    const { width, height } = useWindowDimensions();
    return <>{props.devMode ? <div>{width}</div> : <></>}</>;
}
