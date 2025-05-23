import { AppRoot, el, View } from "@commonmodule/app";
import { NFTAttributeEditor } from "nft-attribute-editor";
import BabypingDisplay from "../components/BabypingDisplay.js";
import babypingParts from "../parts-jsons/babyping-parts.json" with {
  type: "json"
};
import keyToFrame from "../spritesheets/babyping/key-to-frame.json" with {
  type: "json"
};
import spritesheet from "../spritesheets/babyping/spritesheet.json" with {
  type: "json"
};

export default class BabypingView extends View {
  constructor() {
    super();

    const showcaseData: {
      traits?: { [traitName: string]: string };
      parts: { [partName: string]: string };
    } = {
      parts: {
        Background: "Hills",
        Body: "Kiki Leafmonkey",
        Eye: "Eye Shadow R",
        Cheek: "None",
        Mouth: "Pink Grin",
        Headwear: "Snail Hairband 3",
        "Neck Accesorie": "None",
        Bag: "Gu Ping 3",
        Shoe: "Leather Shoes",
        "Wrist Accesorie": "Flower Beads",
        Item: "Blue Umbrella",
      },
    };

    this.container = el(
      ".babyping-view",
      new BabypingDisplay(showcaseData.parts),
      new NFTAttributeEditor({
        partOptions: babypingParts,
        baseData: showcaseData,
        keyToFrame: keyToFrame,
        spritesheet,
        spritesheetImagePath:
          "https://api.matedevdao.workers.dev/babyping/spritesheet/spritesheet.png",
      }),
    ).appendTo(AppRoot);
  }
}
