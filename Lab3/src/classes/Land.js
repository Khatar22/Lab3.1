import { Cell } from "./Cell.js";
import { moistureToColor } from "../utils.js";

export class Land extends Cell {
  constructor(x, y) {
    super(x, y);
    this.type = "land";
  }

  render() {
    super.render();
    if (!this.el) return;
    this.el.style.backgroundColor = moistureToColor(this.moisture);
    // отобразить растение, если есть
    if (this.plant) {
      this.plant.attachElement(this.el);
    }
    else {
      // удалить следы растения
      const p = this.el.querySelector(".plant");
      if (p) p.remove();
    }
  }
}
