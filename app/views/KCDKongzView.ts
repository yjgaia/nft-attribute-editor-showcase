import { BodyNode, el, View } from "@commonmodule/app";
import { NFTAttributeEditor } from "nft-attribute-editor";
import kcdKongzParts from "../parts-jsons/kcd-kongz-parts.json" with {
  type: "json",
};
import KCDKongDisplay from "../components/KCDKongDisplay.js";
import keyToSprite from "../spritesheets/kcd-kongz/key-to-sprite.json" with {
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
      ".kcdkongz-view",
      new KCDKongDisplay(showcaseData.parts),
      new NFTAttributeEditor({
        options: {
          parts: kcdKongzParts,
        },
        data: showcaseData,
        keyToSprite,
        spritesheet,
        spritesheetImagePath:
          "https://api.matedevdao.workers.dev/kingcrowndao-kongz/spritesheet/spritesheet.png",
      }),
    ).appendTo(BodyNode);
  }
}
