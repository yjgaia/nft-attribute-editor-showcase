import { BodyNode, el, View } from "@commonmodule/app";

export default class TheGodsView extends View {
  constructor() {
    super();
    this.container = el("#thegods").appendTo(BodyNode);
  }
}
