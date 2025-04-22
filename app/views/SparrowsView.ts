import { BodyNode, el, View } from "@commonmodule/app";
import { NFTAttributeEditor } from "nft-attribute-editor";
import SparrowDisplay from "../components/SparrowDisplay.js";
import sparrowParts from "../parts-jsons/sparrow-parts.json" with {
  type: "json",
};
import keyToFrame from "../spritesheets/sparrows/key-to-frame.json" with {
  type: "json",
};
import spritesheet from "../spritesheets/sparrows/spritesheet.json" with {
  type: "json",
};

export default class SparrowsView extends View {
  constructor() {
    super();

    const showcaseData: {
      traits: { Style: "Illustration" | "Pixel Art" };
      parts: { [partName: string]: string };
    } = {
      traits: {
        Style: "Illustration",
      },
      parts: {
        Background: "Light green",
        Tail: "Phoenix",
        Body: "Dark brown without cheek",
        Back: "None",
        Eye: "Cock",
        Beak: "Penguin",
        Shoes: "Rubber shoe B",
        "Text Balloon": "Innermost feelings",
        Wings: "Fighting",
      },
    };

    this.container = el(
      ".sparrows-view",
      new SparrowDisplay({
        style: showcaseData.traits.Style,
        parts: showcaseData.parts,
      }),
      new NFTAttributeEditor({
        traitOptions: {
          Style: ["Illustration", "Pixel Art"],
        },
        partOptions: {
          Illustration: sparrowParts,
          "Pixel Art": sparrowParts,
        },
        baseData: showcaseData,
        keyToFrame,
        spritesheet,
        spritesheetImagePath:
          "https://api.matedevdao.workers.dev/sigor-sparrows/spritesheet/spritesheet.png",
      }),
    ).appendTo(BodyNode);
  }
}
