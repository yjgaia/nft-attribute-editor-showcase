import { DomNode } from "@commonmodule/app";

export default class BabypingDisplay extends DomNode {
  constructor(parts: { [partName: string]: string }) {
    super(".babyping-display");
  }
}
