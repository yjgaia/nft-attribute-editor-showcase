import { Dom } from "@commonmodule/app";

export default class BabypingDisplay extends Dom {
  constructor(parts: { [partName: string]: string }) {
    super(".babyping-display");
  }
}
