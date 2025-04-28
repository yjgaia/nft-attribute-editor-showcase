import { DomNode, el } from "@commonmodule/app";
import { ImageCombiner } from "@commonmodule/image-combiner";
import fontUrl from "./fonts/neodgm.woff2";

interface SparrowDisplayData {
  style: "Illustration" | "Pixel Art";
  parts: { [partName: string]: string };
  dialogue: string;
}

export default class SparrowDisplay extends DomNode {
  constructor(data: SparrowDisplayData) {
    super(".sparrow-display");
    this.test();
  }

  private async test() {
    const response = await fetch(
      "https://api.matedevdao.workers.dev/sigor-sparrows/parts-images/normal/1.BG/IJM beige.png",
    );

    const [imgBgBuf] = await Promise.all([
      response.arrayBuffer(),
    ]);

    const base64String = fontUrl.split(",")[1];
    const binaryString = atob(base64String);

    const len = binaryString.length;
    const fontBytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      fontBytes[i] = binaryString.charCodeAt(i);
    }

    const combined = ImageCombiner.combine(1000, 1000, [imgBgBuf], {
      fontBytes,
      x: 500,
      y: 500,
      text: "안녕하세요, Workers 👋",
      fontSize: 64,
      color: "#000",
    });

    const blob = new Blob([combined], { type: "image/png" });
    const url = URL.createObjectURL(blob);

    this.append(el("img", { src: url }));
  }
}
