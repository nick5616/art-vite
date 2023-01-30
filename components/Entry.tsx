import React from "react";
import "./styles/entry.css";

export function Entry(props: {
  description: string;
  mediaName: string;
}): JSX.Element {
  return (
    <div className="entryContainer">
      <div className="descriptionText">{props.description}</div>
    </div>
  );
}
