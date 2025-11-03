import { Land } from "./classes/Land.js";
import { Water } from "./classes/Water.js";
import { distance, clamp } from "./utils.js";

export class Grid {
  constructor(width, height, containerEl) {
    this.width = width;
    this.height = height;
    this.containerEl = containerEl;
    this.cells = [];

    this._build();
  }

  _build() {
    this.containerEl.innerHTML = "";
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const cell = new Land(x, y);
        const el = document.createElement("div");
        el.className = "cell land";
        el.dataset.x = String(x);
        el.dataset.y = String(y);
        cell.attachElement(el);
        this.containerEl.appendChild(el);
        this.cells.push(cell);
      }
    }
  }

  getCell(x, y) {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return null;
    return this.cells[y * this.width + x];
  }

  toCoords(el) {
    const x = Number(el.dataset.x);
    const y = Number(el.dataset.y);
    return { x, y };
  }

  makeWater(x, y) {
    const idx = y * this.width + x;
    const old = this.cells[idx];
    if (old.isWater()) return;

    const water = new Water(x, y);
    water.attachElement(old.el);
    this.cells[idx] = water;
    this.recomputeMoisture();
  }

  makeLand(x, y) {
    const idx = y * this.width + x;
    const old = this.cells[idx];
    if (old.isLand()) return;

    const land = new Land(x, y);
    land.attachElement(old.el);
    this.cells[idx] = land;
    this.recomputeMoisture();
  }

  /* влажность земли = сумма вкладов ближайших водных клеток,
   вклад ~ 1 / (1 + k * distance), нормирован и ограничен [0..1] */
  recomputeMoisture() {
    const waters = this.cells.filter((c) => c.isWater());
    const k = 1.2; // коэффициент затухания по расстоянию

    for (const cell of this.cells) {
      if (cell.isLand()) {
        let m = 0;
        for (const w of waters) {
          const d = distance(cell, w);
          m += 1 / (1 + k * d);
        }
        // мягкая нормализация: чем больше воды рядом, тем выше м, но не больше 1
        cell.setMoisture(clamp(m, 0, 1));
      }
    }
  }

  /* обновляет рост всех растений на земле */
  tickPlants() {
    for (const cell of this.cells) {
      if (cell.isLand() && cell.plant) {
        cell.plant.update(cell.moisture);
      }
    }
  }
}
