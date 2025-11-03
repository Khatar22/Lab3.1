import { Plant } from "./Plant.js";

export class Potato extends Plant {
  constructor() {
    // картошка — средняя влажность
    super("Картошка", "./assets/potato.png", 0.35, 0.75, 0.025);
  }
}
