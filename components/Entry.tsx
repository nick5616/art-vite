import React from "react";
import "./styles/entry.css";

export enum Vibe {
  DARK_RED,
  ITS_CORN,
  EARTH_DAY_2017,
  BABY_BLUE,
  PRUSSIAN_BLUE,
  DEEP_PURPLE,
}

function getHueValue(vibe: Vibe | undefined): number | undefined {
  switch (vibe) {
    case Vibe.DARK_RED:
      return 0;
    case Vibe.ITS_CORN:
      return 60;
    case Vibe.EARTH_DAY_2017:
      return 120;
    case Vibe.BABY_BLUE:
      return 180;
    case Vibe.PRUSSIAN_BLUE:
      return 240;
    case Vibe.DEEP_PURPLE:
      return 300;
    default:
      return undefined;
  }
}

function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function Entry(props: {
  description: string;
  mediaName: string;
  title: string;
  date?: string;
  primary?: string;
  background?: string;
  color?: string;
  vibe?: Vibe;
}): JSX.Element {
  const hue = getHueValue(props.vibe);

  console.log("hue", hue);

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
