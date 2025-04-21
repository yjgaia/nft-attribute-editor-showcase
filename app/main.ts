import { Router, SPAInitializer } from "@commonmodule/app";
import BabypingView from "./views/BabypingView.js";
import IndexView from "./views/IndexView.js";
import KCDKongzView from "./views/KCDKongzView.js";
import SparrowsView from "./views/SparrowsView.js";
import TheGodsView from "./views/TheGodsView.js";

SPAInitializer.init();

if (location.pathname.includes("/nft-attribute-editor-showcase")) {
  Router.prefix = "/nft-attribute-editor-showcase";
}

Router
  .add("/", IndexView)
  .add("/thegods", TheGodsView)
  .add("/sparrows", SparrowsView)
  .add("/kcdkongz", KCDKongzView)
  .add("/babyping", BabypingView);
