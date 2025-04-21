import { BodyNode, el, View } from "@commonmodule/app";

export default class KCDKongzView extends View {
  constructor() {
    super();
    this.container = el("#kcdkongz").appendTo(BodyNode);
  }
}
