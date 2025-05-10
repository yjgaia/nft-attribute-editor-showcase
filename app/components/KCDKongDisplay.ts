import { Dom } from "@commonmodule/app";

export default class KCDKongDisplay extends Dom {
  constructor(parts: { [partName: string]: string }) {
    super(".kcd-kong-display");
  }
}
