import { DomNode } from "@commonmodule/app";

export default class SparrowDisplay extends DomNode {
  constructor(data: {
    style: "Illustration" | "Pixel Art";
    parts: { [partName: string]: string };
  }) {
    super(".sparrow-display");
  }
}
