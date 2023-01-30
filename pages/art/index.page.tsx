import React from "react";
import { Entry } from "../../components/Entry";
import { Introduction } from "../../components/Introduction";
import "./code.css";

export { Page };

function Page() {
  return (
    <>
      <h1>Welcome to my Art portfolio</h1>
      <h2>I hope you like my art.</h2>
      <Introduction></Introduction>
      <Entry
        description='This is a drawing of a character from a popular video game called "League of Legends". Drawn on iPad 2018 apple pencil generation 1'
        mediaName="angrybird.png"
      ></Entry>
      <Entry
        description="
        Angry burd "
        mediaName="angrybird.png"
      ></Entry>
    </>
  );
}
