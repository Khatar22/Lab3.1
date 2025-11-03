import { BogPlant } from "./classes/BogPlant.js";
import { Potato } from "./classes/Potato.js";
import { Cactus } from "./classes/Cactus.js";

export class ToolsController {
  constructor(grid, statusEl) {
    this.grid = grid;
    this.statusEl = statusEl;
    this.currentTool = "shovel"; // shovel | bucket-fill | bucket-take | seed
    this.currentSeed = "none"; // bog | potato | cactus | none
  }

  setTool(tool) {
    this.currentTool = tool;

    // визуальная подсветка
    document.querySelectorAll("[data-tool]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tool === tool);
    });

    this._updateStatus();
  }

  setSeed(seed) {
    this.currentSeed = seed;
    this._updateStatus();
  }

  _updateStatus() {
    const seedText =
      this.currentTool === "seed"
        ? `, семена: ${this.currentSeed}`
        : "";
    this.statusEl.textContent = `Инструмент: ${this.currentTool}${seedText}`;
  }

  handleClick(el) {
    const { x, y } = this.grid.toCoords(el);
    const cell = this.grid.getCell(x, y);
    if (!cell) return;

    switch (this.currentTool) {
      case "shovel":
        // лопата удаляет растение
        if (cell.isLand() && cell.plant) {
          cell.clearPlant();
        }
        break;

      case "bucket-fill":
        // превращаем клетку в воду
        if (cell.isLand()) {
          cell.clearPlant();
          this.grid.makeWater(x, y);
        }
        break;

      case "bucket-take":
        // превращаем воду в землю
        if (cell.isWater()) {
          this.grid.makeLand(x, y);
        }
        break;

      case "seed":
        if (!cell.isLand()) return;
        if (this.currentSeed === "none") return;
        // если уже есть растение — заменим
        let plant = null;
        if (this.currentSeed === "bog") plant = new BogPlant();
        if (this.currentSeed === "potato") plant = new Potato();
        if (this.currentSeed === "cactus") plant = new Cactus();
        if (plant) {
          cell.setPlant(plant);
          // мгновенная проверка условий
          plant.update(cell.moisture);
        }
        break;
    }

    // перерасчет влажности после изменений воды
    this.grid.recomputeMoisture();
  }
}
