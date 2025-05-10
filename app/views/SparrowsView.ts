import { AppRoot, el, View } from "@commonmodule/app";
import { NFTAttributeEditor } from "nft-attribute-editor";
import SparrowDisplay from "../components/SparrowDisplay.js";
import sparrowParts from "../parts-jsons/sparrow-parts.json" with {
  type: "json"
};
import keyToFrame from "../spritesheets/sparrows/key-to-frame.json" with {
  type: "json"
};
import spritesheet from "../spritesheets/sparrows/spritesheet.json" with {
  type: "json"
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
        dialogue:
          "본문 텍스트의 줄 길이는 일반적으로 40-60자(공백 및 기호포함) 사이가 일반적이나, 데스크탑과 같이 줄 길이가 더 긴 영역에서는 최대 120자 까지 가능합니다.",
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
    ).appendTo(AppRoot);
  }
}
