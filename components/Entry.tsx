import React from "react";
import "./styles/entry.css";

export function Entry(props: {
  description: string;
  mediaName: string;
  title: string;
  date?: string;
  primary?: string;
  background?: string;
  color?: string;
}): JSX.Element {
  return (
    <div
      className="entryContainer"
      style={{ backgroundColor: props.background, border: props.color }}
    >
      <h1 className="entryTitle" style={{ color: props.color }}>
        {props.title}
      </h1>
      <img src={`/art/${props.mediaName}`}></img>
      <div className="description">
        <div className="descriptionText" style={{ color: props.color }}>
          {" "}
          <span className="descriptionLabel">Description</span>{" "}
          {props.description}
        </div>
      </div>
      <br></br>
      {props?.date && (
        <div className="entryDate" style={{ color: props.color }}>
          Finished: {props.date}
        </div>
      )}
    </div>
  );
}
