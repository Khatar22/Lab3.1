import { Cell } from "./Cell.js";

export class Water extends Cell {
  constructor(x, y) {
    super(x, y);
    this.type = "water";
    this.moisture = 1;
  }

  render() {
    super.render();
    if (!this.el) return;
    // вода: фон уже задан в CSS через класс .water
    const p = this.el.querySelector(".plant");
    if (p) p.remove(); // в воде растения не растут
  }
}
