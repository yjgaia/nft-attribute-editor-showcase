import { DomNode, el } from "@commonmodule/app";
import { Resvg } from "@resvg/resvg-wasm";
import UPNG from "upng-js";
import fontUrl from "./fonts/neodgm.woff2";

interface SparrowDisplayData {
  style: "Illustration" | "Pixel Art";
  parts: { [partName: string]: string };
  dialogue: string;
}

function blendPixel(
  bgR: number,
  bgG: number,
  bgB: number,
  bgA: number,
  fgR: number,
  fgG: number,
  fgB: number,
  fgA: number,
): [number, number, number, number] {
  const alphaF = fgA / 255;
  const alphaB = bgA / 255;
  const outA = alphaF + alphaB * (1 - alphaF);
  if (outA < 1e-6) return [0, 0, 0, 0];

  const outR = Math.round((fgR * alphaF + bgR * alphaB * (1 - alphaF)) / outA);
  const outG = Math.round((fgG * alphaF + bgG * alphaB * (1 - alphaF)) / outA);
  const outB = Math.round((fgB * alphaF + bgB * alphaB * (1 - alphaF)) / outA);
  const outAlpha = Math.round(outA * 255);
  return [outR, outG, outB, outAlpha];
}

function blendImage(base: Uint8Array, overlay: Uint8Array) {
  for (let i = 0; i < base.length; i += 4) {
    const [bgR, bgG, bgB, bgA] = [
      base[i],
      base[i + 1],
      base[i + 2],
      base[i + 3],
    ];
    const [fgR, fgG, fgB, fgA] = [
      overlay[i],
      overlay[i + 1],
      overlay[i + 2],
      overlay[i + 3],
    ];
    const [r, g, b, a] = blendPixel(bgR, bgG, bgB, bgA, fgR, fgG, fgB, fgA);
    base[i] = r;
    base[i + 1] = g;
    base[i + 2] = b;
    base[i + 3] = a;
  }
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

    const pngBg = UPNG.decode(imgBgBuf);
    const rgbaBg = UPNG.toRGBA8(pngBg)[0];
    const width = pngBg.width, height = pngBg.height;

    const text = "안녕하세요, Workers 👋";

    const base64String = fontUrl.split(",")[1];
    const binaryString = atob(base64String);

    const len = binaryString.length;
    const fontBytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      fontBytes[i] = binaryString.charCodeAt(i);
    }

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <style>
    @font-face {
      font-family: "neodgm";
      src: url('data:font/woff;base64,${
      btoa(String.fromCharCode(...fontBytes))
    }') format("woff");
    }
    text { font-family:"neodgm"; font-size:64px; fill:#000; }
  </style>
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle">${text}</text>
</svg>`.trim();

    const resvg = new Resvg(
      svg,
      {
        fitTo: { mode: "width", value: width },
        font: {
          fontBuffers: [fontBytes],
          defaultFontFamily: "neodgm",
          loadSystemFonts: false,
        },
      },
    );
    const imgTextBuf = resvg.render().asPng();
    const pngText = UPNG.decode(imgTextBuf);
    const rgbaText = UPNG.toRGBA8(pngText)[0];

    const composite = new Uint8Array(rgbaBg);

    blendImage(composite, new Uint8Array(rgbaText));

    const outBuffer = UPNG.encode([composite.buffer], width, height, 0);

    const blob = new Blob([outBuffer], { type: "image/png" });
    const url = URL.createObjectURL(blob);

    this.append(el("img", { src: url }));
  }
}
