import { BodyNode, el, View } from "@commonmodule/app";
import { NFTAttributeEditor } from "nft-attribute-editor";
import GodDisplay from "../components/GodDisplay.js";
import fireManParts from "../parts-jsons/thegods/fire-man-parts.json" with {
  type: "json",
};
import fireWomanParts from "../parts-jsons/thegods/fire-woman-parts.json" with {
  type: "json",
};
import stoneManParts from "../parts-jsons/thegods/stone-man-parts.json" with {
  type: "json",
};
import stoneWomanParts from "../parts-jsons/thegods/stone-woman-parts.json" with {
  type: "json",
};
import waterManParts from "../parts-jsons/thegods/water-man-parts.json" with {
  type: "json",
};
import waterWomanParts from "../parts-jsons/thegods/water-woman-parts.json" with {
  type: "json",
};
import keyToFrame from "../spritesheets/thegods/key-to-frame.json" with {
  type: "json",
};
import spritesheet from "../spritesheets/thegods/spritesheet.json" with {
  type: "json",
};

export default class TheGodsView extends View {
  private godDisplay: GodDisplay;
  private editor: NFTAttributeEditor;

  constructor() {
    super();

    const showcaseData: {
      traits: { Type: "Stone" | "Fire" | "Water"; Gender: "Man" | "Woman" };
      parts: { [partName: string]: string };
    } = {
      traits: {
        Type: "Water",
        Gender: "Woman",
      },
      parts: {
        Eye: "Gold Deep",
        Body: "Light",
        Hair: "Black Bob",
        Mouth: "Blue Serious",
        Outer: "White Pallium",
        Onepiece: "Black Top",
        Accessory: "Hair Chain",
        "Back Hair": "Black Water",
        Background: "BlueMarble4",
      },
    };

    this.container = el(
      ".thegods-view",
      this.godDisplay = new GodDisplay({
        type: showcaseData.traits.Type,
        gender: showcaseData.traits.Gender,
        parts: showcaseData.parts,
      }),
      this.editor = new NFTAttributeEditor({
        traitOptions: {
          Type: ["Stone", "Fire", "Water"],
          Gender: ["Man", "Woman"],
        },
        partOptions: {
          Stone: {
            Man: stoneManParts,
            Woman: stoneWomanParts,
          },
          Fire: {
            Man: fireManParts,
            Woman: fireWomanParts,
          },
          Water: {
            Man: waterManParts,
            Woman: waterWomanParts,
          },
        },
        baseData: showcaseData,
        keyToFrame,
        spritesheet,
        spritesheetImagePath: "https://api.gaia.cc/spritesheet/spritesheet.png",
      }),
    ).appendTo(BodyNode);

    this.editor.on("dataChanged", (data) => {
      this.godDisplay.setData({
        type: data.traits!.Type as any,
        gender: data.traits!.Gender as any,
        parts: data.parts,
      });
    });
  }
}
