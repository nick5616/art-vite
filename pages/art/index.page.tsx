import React from "react";
import { Entry } from "../../components/Entry";
import { Introduction } from "../../components/Introduction";
import "./code.css";

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
          background="linear-gradient(35deg, rgba(0,0,0,1) 0%, rgba(12,45,0,1) 35%, rgba(130,2,12,1) 100%)"
          color="rgb(100, 270, 180)"
        ></Entry>
        <Entry
          title="Angry Bird in real life"
          description="
        Angry bird. I didn't draw this. It's actually a real bird. You know, they say art imitates life. This is demonstrating the converse"
          mediaName="angrybird.png"
        ></Entry>
        <Entry
          title="This bird is scribbled. He has angry bird energy"
          description="scribble bird"
          mediaName="Untitled_Artwork4.jpg"
          background="hsl(3, 95%, 60%)"
          color="hsl(35, 28%, 95%)"
        ></Entry>
        <Entry
          title="Airbush sunset painting"
          description="sunset"
          mediaName="Untitled_Artwork3.jpg"
          background="radial-gradient(circle, rgba(251,178,63,1) 0%, rgba(70,213,252,1) 100%)"
          color="white"
        ></Entry>
        <Entry
          title="The bite of '87"
          description="glitchy forest"
          mediaName="Untitled_Artwork2.jpg"
        ></Entry>
        <Entry
          title="OnePlus 5T"
          description="mackbook"
          mediaName="Untitled_Artwork8.jpg"
        ></Entry>
        <Entry
          title="Zelda"
          description="Portrait of a Character from The Legend of Zelda. Zelda is the weilder of the sword that seals darkness. The one on his back. "
          mediaName="Untitled_Artwork9.jpg"
          date="July, 2022"
        ></Entry>
        <Entry
          title="another bird?"
          description="bird"
          mediaName="Untitled_Artwork6.jpg"
        ></Entry>
      </div>
    </>
  );
}
