export class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.type = "land"; // land | water
    this.moisture = 0; // [0..1], только для земли
    this.plant = null; // экземпляр Plant или null
    this.el = null; // DOM-элемент
  }

  /* привязка DOM‑элемента к клетке */
  attachElement(el) {
    this.el = el;
    this.render();
  }

  isLand() {
    return this.type === "land";
  }

  isWater() {
    return this.type === "water";
  }

  setType(type) {
    this.type = type;
    if (type === "water") {
      this.moisture = 1;
      this.plant = null; // вода не содержит растение
    }
    this.render();
  }

  setMoisture(value) {
    this.moisture = value;
    this.render();
  }

  setPlant(plant) {
    this.plant = plant;
    this.render();
  }

  clearPlant() {
    this.plant = null;
    this.render();
  }

  render() {
    if (!this.el) return;
    this.el.className = `cell ${this.type}`;
  }
}
