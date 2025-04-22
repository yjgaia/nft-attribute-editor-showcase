import { BodyNode, el, View } from "@commonmodule/app";
import { NFTAttributeEditor } from "nft-attribute-editor";
import GodDisplay from "../components/GodDisplay.js";
import fireManParts from "../parts-jsons/thegods/fire-man-parts.json" with {
  type: "json"
};
import fireWomanParts from "../parts-jsons/thegods/fire-woman-parts.json" with {
  type: "json"
};
import stoneManParts from "../parts-jsons/thegods/stone-man-parts.json" with {
  type: "json"
};
import stoneWomanParts from "../parts-jsons/thegods/stone-woman-parts.json" with {
  type: "json"
};
import waterManParts from "../parts-jsons/thegods/water-man-parts.json" with {
  type: "json"
};
import waterWomanParts from "../parts-jsons/thegods/water-woman-parts.json" with {
  type: "json"
};
import keyToSprite from "../spritesheets/thegods/key-to-sprite.json" with {
  type: "json"
};
import spritesheet from "../spritesheets/thegods/spritesheet.json" with {
  type: "json"
};

export default class TheGodsView extends View {
  constructor() {
    super();

    const showcaseData: {
      traits: { type: "Stone" | "Fire" | "Water"; gender: "Man" | "Woman" };
      parts: { [partName: string]: string };
    } = {
      traits: {
        type: "Water",
        gender: "Woman",
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
      new GodDisplay({
        type: showcaseData.traits.type,
        gender: showcaseData.traits.gender,
        parts: showcaseData.parts,
      }),
      new NFTAttributeEditor({
        options: {
          traits: {
            type: ["Stone", "Fire", "Water"],
            gender: ["Man", "Woman"],
          },
          parts: {
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
        },
        data: showcaseData,
        keyToSprite,
        spritesheet,
        spritesheetImagePath: "https://api.gaic.cc/spritesheet/spritesheet.png",
      }),
    ).appendTo(
      BodyNode,
    );
  }
}
