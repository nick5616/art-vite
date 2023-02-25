import React from "react";
import { Entry } from "../../components/Entry";
import "./code.css";

import { Introduction } from "../../components/Introduction";
import { Vibe } from "../../models";

export { Page };

function Page() {
  return (
    <>
      <div className="page">
        <Introduction></Introduction>
        <Entry
          title="Furry guy in Bliss"
          description='This is a drawing of a character from a popular video game called "League of Legends". Drawn on iPad 2018 apple pencil generation 1'
          mediaName="Untitled_Artwork5.jpg"
          vibe={Vibe.EARTH_DAY_2017}
        ></Entry>
        <Entry
          title="Angry Bird in real life"
          description="
        Angry bird. I didn't draw this. It's actually a real bird. You know, they say art imitates life. This is demonstrating the converse"
          mediaName="angrybird.png"
          vibe={Vibe.BABY_BLUE}
        ></Entry>
        <Entry
          title="This bird is scribbled. He has angry bird energy"
          description="scribble bird"
          mediaName="Untitled_Artwork4.jpg"
          vibe={Vibe.DARK_RED}
        ></Entry>
        <Entry
          title="Airbush sunset painting"
          description="sunset"
          mediaName="Untitled_Artwork3.jpg"
          vibe={Vibe.PRUSSIAN_BLUE}
        ></Entry>
        <Entry
          title="The bite of '87"
          description="glitchy forest"
          mediaName="Untitled_Artwork2.jpg"
          vibe={Vibe.ITS_CORN}
        ></Entry>
        <Entry
          title="OnePlus 5T"
          description="mackbook"
          mediaName="Untitled_Artwork8.jpg"
          vibe={Vibe.EARTH_DAY_2017}
        ></Entry>
        <Entry
          title="Zelda"
          description="Portrait of a Character from The Legend of Zelda. Zelda is the wielder of the sword that seals darkness. The one on his back. "
          mediaName="Untitled_Artwork9.jpg"
          date="July, 2022"
          vibe={Vibe.DEEP_PURPLE}
        ></Entry>
        <Entry
          title="another bird?"
          description="bird"
          mediaName="Untitled_Artwork6.jpg"
          vibe={Vibe.BABY_BLUE}
        ></Entry>
      </div>
    </>
  );
}
