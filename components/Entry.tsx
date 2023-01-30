import React from "react";
import "./styles/entry.css";

export function Entry(props: {
  description: string;
  mediaName: string;
}): JSX.Element {
  return (
    <div className="entryContainer">
      <img src={`/art/${props.mediaName}`}></img>
      <div className="description">
        <div className="descriptionText">
          {" "}
          <span className="descriptionLabel">Description</span>{" "}
          {props.description}
        </div>
      </div>
    </div>
  );
}
