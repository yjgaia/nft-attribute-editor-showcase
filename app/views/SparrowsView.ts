import { BodyNode, el, View } from "@commonmodule/app";

export default class SparrowsView extends View {
  constructor() {
    super();
    this.container = el("#sparrows").appendTo(BodyNode);
  }
}
