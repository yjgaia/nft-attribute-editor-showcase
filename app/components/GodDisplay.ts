import { DomNode } from "@commonmodule/app";

export default class GodDisplay extends DomNode {
  constructor(data: {
    type: "Stone" | "Fire" | "Water";
    gender: "Man" | "Woman";
    parts: { [partName: string]: string };
  }) {
    super(".god-display");
  }
}
