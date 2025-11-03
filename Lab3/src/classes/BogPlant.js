import { Plant } from "./Plant.js";

export class BogPlant extends Plant {
  constructor() {
    // болотник любит высокую влажность
    super("Болотник", "./assets/bog.png", 0.6, 1.0, 0.03);
  }
}
