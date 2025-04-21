import { BodyNode, el, Router, View } from "@commonmodule/app";
import { Button, ButtonGroup, ButtonType } from "@commonmodule/app-components";

export default class IndexView extends View {
  constructor() {
    super();
    this.container = el(
      "#index",
      new ButtonGroup(
        new Button({
          type: ButtonType.Outlined,
          title: "The Gods",
          onClick: () => Router.go("/thegods"),
        }),
        new Button({
          type: ButtonType.Outlined,
          title: "Sparrows",
          onClick: () => Router.go("/sparrows"),
        }),
        new Button({
          type: ButtonType.Outlined,
          title: "KCD Kongz",
          onClick: () => Router.go("/kcdkongz"),
        }),
        new Button({
          type: ButtonType.Outlined,
          title: "Babyping",
          onClick: () => Router.go("/babyping"),
        }),
      ),
    ).appendTo(BodyNode);
  }
}
