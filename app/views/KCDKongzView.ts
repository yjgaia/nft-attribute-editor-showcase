import { BodyNode, el, View } from "@commonmodule/app";
import { NFTAttributeEditor } from "nft-attribute-editor";
import kcdKongzParts from "../parts-jsons/kcd-kongz-parts.json" with {
  type: "json",
};
import KCDKongDisplay from "../components/KCDKongDisplay.js";

export default class KCDKongzView extends View {
  constructor() {
    super();

    const showcaseData: {
      traits?: { [traitName: string]: string };
      parts: { [partName: string]: string };
    } = {
      parts: {
        Backgrounds: "purple",
        Character: "character",
        Outfits: "indian clothes",
        Eyes: "closed eyes",
        Eyewears: "red glasses",
        Accesories: "necklace",
        Headwears: "baseball hat",
        Mouths: "teeth mouth",
      },
    };

    this.container = el(
      "#kcdkongz",
      new KCDKongDisplay(showcaseData.parts),
      new NFTAttributeEditor({
        options: {
          parts: kcdKongzParts,
        },
        data: showcaseData,
      }),
    ).appendTo(BodyNode);
  }
}
