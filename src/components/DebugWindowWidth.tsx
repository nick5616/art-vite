import * as React from "react";
import useWindowDimensions from "../hooks/useWindowDimenstions";

export function DebugWindowWidth(props: { devMode: boolean }) {
    const { width } = useWindowDimensions();
    return <>{props.devMode ? <div>{width}</div> : <></>}</>;
}
