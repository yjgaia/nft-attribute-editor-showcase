import { DomNode, el } from "@commonmodule/app";
import { MaterialLoadingSpinner } from "@commonmodule/material-loading-spinner";
import { GameScreen } from "@gaiaengine/2d";
import { Spine } from "@gaiaengine/2d-spine";
import { PartCategory, PartItem } from "nft-attribute-editor";
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

interface GodDisplayData {
  type: "Stone" | "Fire" | "Water";
  gender: "Man" | "Woman";
  parts: { [partName: string]: string };
}

const allGodsPartOptions: Record<string, Record<string, PartCategory[]>> = {
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
};

export default class GodDisplay extends DomNode {
  private screen: GameScreen;
  private spineObject?: Spine;

  private data!: GodDisplayData;

  constructor(data: GodDisplayData) {
    super(".god-display");

    this.screen = new GameScreen({ width: 1024, height: 1024 }).appendTo(this);
    this.on("visible", () => this.updateLayout());
    this.onWindow("resize", () => this.updateLayout());

    this.setData(data);
  }

  private updateLayout() {
    const rect = this.calculateRect();

    const widthRatio = rect.width / 1024;
    const heightRatio = rect.width / 1024;
    const ratio = Math.min(widthRatio, heightRatio);

    this.screen.resize(1024, 1024, ratio);

    this.style({ height: `${rect.width}px` });
  }

  public setData(data: GodDisplayData) {
    this.data = data;
    this.render();
  }

  public render() {
    this.screen.root.clear();

    const partOptions = allGodsPartOptions[this.data.type][this.data.gender];
    const selectedParts: { [partName: string]: PartItem } = {};

    for (const partOption of partOptions) {
      const availableParts = partOption.parts.filter((part) => {
        if (!part.condition) {
          return true;
        }

        let partValue: string | undefined;

        if (part.condition.trait === "Type") {
          partValue = this.data.type;
        } else if (part.condition.trait === "Gender") {
          partValue = this.data.gender;
        } else {
          partValue = this.data.parts[part.condition.trait];
        }

        if (!partValue) {
          return false;
        }

        return part.condition.values.includes(partValue);
      });
      const selectedPartName = this.data.parts[partOption.name];
      const selectedPart = availableParts.find((part) =>
        part.name === selectedPartName
      );
      if (selectedPart) selectedParts[partOption.name] = selectedPart;
    }

    const skins: string[] = [];

    for (const [traitName, part] of Object.entries(selectedParts)) {
      skins.push(`${traitName}/${part.name}`);
    }

    const typeLowerCase = this.data.type.toLowerCase();
    const genderLowerCase = this.data.gender.toLowerCase();

    const path =
      `https://api.gaia.cc/spine-files/god-${typeLowerCase}-${genderLowerCase}`;

    const loading = el(
      ".loading-spinner-container",
      new MaterialLoadingSpinner(),
    ).appendTo(this);

    this.spineObject = new Spine(0, 0, {
      json: `${path}.json`,
      atlas: `${path}.atlas`,
      texture: this.data.type === "Water"
        ? {
          [`water-${genderLowerCase}.png`]: `${path}.png`,
          [`water-${genderLowerCase}_2.png`]: `${path}-2.png`,
          [`water-${genderLowerCase}_3.png`]: `${path}-3.png`,
        }
        : `${path}.png`,
      skins,
      animation: "animation",
      onLoad: () => loading.remove(),
      onAnimationEnd: () => {
        if (this.spineObject) this.spineObject.animation = "animation";
      },
    }).appendTo(this.screen.root);

    this.screen.style({ cursor: "pointer" });
    this.screen.onDom("click", () => this.touch());
  }

  public touch() {
    if (this.spineObject) this.spineObject.animation = "touched";
  }
}
