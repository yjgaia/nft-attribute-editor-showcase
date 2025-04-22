import { BodyNode, el, View } from "@commonmodule/app";
import { NFTAttributeEditor } from "nft-attribute-editor";
import KCDKongDisplay from "../components/KCDKongDisplay.js";
import kcdKongzParts from "../parts-jsons/kcd-kongz-parts.json" with {
  type: "json",
};
import keyToFrame from "../spritesheets/kcd-kongz/key-to-frame.json" with {
  type: "json",
};
import spritesheet from "../spritesheets/kcd-kongz/spritesheet.json" with {
  type: "json",
};

export default class KCDKongzView extends View {
  constructor() {
    super();

    const showcaseData: {
      traits?: { [traitName: string]: string };
      parts: { [partName: string]: string };
    } = {
      parts: {
        backgrounds: "purple",
        character: "character",
        outfits: "indian clothes",
        eyes: "closed eyes",
        eyewears: "red glasses",
        accesories: "necklace",
        headwears: "baseball hat",
        mouths: "teeth mouth",
      },
    };

    this.container = el(
      ".kcd-kongz-view",
      new KCDKongDisplay(showcaseData.parts),
      new NFTAttributeEditor({
        partOptions: kcdKongzParts,
        baseData: showcaseData,
        keyToFrame,
        spritesheet,
        spritesheetImagePath:
          "https://api.matedevdao.workers.dev/kingcrowndao-kongz/spritesheet/spritesheet.png",
      }),
    ).appendTo(BodyNode);
  }
}
