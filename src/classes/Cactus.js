import { Plant } from "./Plant.js";

export class Cactus extends Plant {
  constructor() {
    // кактус — низкая влажность
    super("Кактус", "./assets/cactus.png", 0.0, 0.35, 0.02);
  }
}
