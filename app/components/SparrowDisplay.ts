import { DomNode } from "@commonmodule/app";

interface SparrowDisplayData {
  style: "Illustration" | "Pixel Art";
  parts: { [partName: string]: string };
}

export default class SparrowDisplay extends DomNode {
  constructor(data: SparrowDisplayData) {
    super(".sparrow-display");
  }
}
