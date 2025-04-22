import { BodyNode, el, View } from "@commonmodule/app";
import { NFTAttributeEditor } from "nft-attribute-editor";
import SparrowDisplay from "../components/SparrowDisplay.js";
import sparrowParts from "../parts-jsons/sparrow-parts.json" with {
  type: "json",
};

export default class SparrowsView extends View {
  constructor() {
    super();

    const showcaseData: {
      traits: { style: "Illustration" | "Pixel Art" };
      parts: { [partName: string]: string };
    } = {
      traits: {
        style: "Illustration",
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
        style: showcaseData.traits.style,
        parts: showcaseData.parts,
      }),
      new NFTAttributeEditor({
        options: {
          traits: {
            style: ["Illustration", "Pixel Art"],
          },
          parts: {
            Illustration: sparrowParts,
            "Pixel Art": sparrowParts,
          },
        },
        data: showcaseData,
      }),
    ).appendTo(BodyNode);
  }
}
