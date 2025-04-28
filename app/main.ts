import { Router, SPAInitializer } from "@commonmodule/app";
import { initWasm } from "@resvg/resvg-wasm";
import wasmUrl from "@resvg/resvg-wasm/index_bg.wasm";
import BabypingView from "./views/BabypingView.js";
import IndexView from "./views/IndexView.js";
import KCDKongzView from "./views/KCDKongzView.js";
import SparrowsView from "./views/SparrowsView.js";
import TheGodsView from "./views/TheGodsView.js";

await initWasm(wasmUrl);

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
