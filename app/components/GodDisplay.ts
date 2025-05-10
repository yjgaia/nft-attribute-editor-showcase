import { AppRoot, Dom, el } from "@commonmodule/app";
import { MaterialLoadingSpinner } from "@commonmodule/material-loading-spinner";
import { GameScreen } from "@gaiaengine/2d";
import { Spine } from "@gaiaengine/2d-spine";

interface GodDisplayData {
  type: "Stone" | "Fire" | "Water";
  gender: "Man" | "Woman";
  parts: { [partName: string]: string | number };
}

export default class GodDisplay extends Dom {
  private screen: GameScreen;
  private spineObject?: Spine;

  private data!: GodDisplayData;

  constructor(data: GodDisplayData) {
    super(".god-display");

    this.screen = new GameScreen({ width: 1024, height: 1024 }).appendTo(this);
    this.on("visible", () => this.updateLayout());
    AppRoot.bind(this, "resize", () => this.updateLayout());

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

    const skins: string[] = [];
    for (const [partName, part] of Object.entries(this.data.parts)) {
      skins.push(`${partName}/${part}`);
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
    this.screen.on("click", () => this.touch());
  }

  public touch() {
    if (this.spineObject) this.spineObject.animation = "touched";
  }
}
