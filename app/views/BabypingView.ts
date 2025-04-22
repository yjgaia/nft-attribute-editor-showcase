import { BodyNode, el, View } from "@commonmodule/app";
import { NFTAttributeEditor } from "nft-attribute-editor";
import BabypingDisplay from "../components/BabypingDisplay.js";
import babypingParts from "../parts-jsons/babyping-parts.json" with {
  type: "json",
};
import keyToFrame from "../spritesheets/babyping/key-to-frame.json" with {
  type: "json",
};
import spritesheet from "../spritesheets/babyping/spritesheet.json" with {
  type: "json",
};

export default class BabypingView extends View {
  constructor() {
    super();

    const showcaseData: {
      traits?: { [traitName: string]: string };
      parts: { [partName: string]: string };
    } = {
      parts: {
        Backgrounds: "Hills",
        Character: "Kiki Leafmonkey",
        Eyes: "Eye Shadow R",
        Cheeks: "None",
        Mouths: "Pink Grin",
        Headwears: "Snail Hairband 3",
        "Neck Accesories": "None",
        Bags: "Gu Ping 3",
        Shoes: "Leather Shoes",
        "Wrist Accesories": "Flower Beads",
        Items: "Blue Umbrella",
      },
    };

    this.container = el(
      ".babyping-view",
      new BabypingDisplay(showcaseData.parts),
      new NFTAttributeEditor({
        options: { parts: babypingParts },
        data: showcaseData,
        keyToFrame: keyToFrame,
        spritesheet,
        spritesheetImagePath:
          "https://api.matedevdao.workers.dev/babyping/spritesheet/spritesheet.png",
      }),
    ).appendTo(BodyNode);
  }
}
