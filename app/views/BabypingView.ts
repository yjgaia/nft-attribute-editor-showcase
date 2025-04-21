import { BodyNode, el, View } from "@commonmodule/app";

export default class BabypingView extends View {
  constructor() {
    super();
    this.container = el("#babyping").appendTo(BodyNode);
  }
}
