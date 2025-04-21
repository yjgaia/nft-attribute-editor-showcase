import { DomNode } from "@commonmodule/app";

export default class KCDKongDisplay extends DomNode {
  constructor(parts: { [partName: string]: string }) {
    super(".kcd-kong-display");
  }
}
