import { Grid } from "./grid.js";
import { ToolsController } from "./tools.js";

const gridEl = document.getElementById("grid");
const statusEl = document.getElementById("status-text");
const seedSelect = document.getElementById("seed-select");

const grid = new Grid(12, 8, gridEl);
const tools = new ToolsController(grid, statusEl);

// события панели инструментов
document.querySelectorAll("[data-tool]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const tool = btn.dataset.tool;
    tools.setTool(tool);
  });
});

seedSelect.addEventListener("change", (e) => {
  tools.setSeed(e.target.value);
});

// клики по клеткам
gridEl.addEventListener("click", (e) => {
  const el = e.target.closest(".cell");
  if (!el) return;
  tools.handleClick(el);
});

// задать начальные островки воды
grid.makeWater(2, 2);
grid.makeWater(9, 5);
grid.recomputeMoisture();

// игровой цикл: рост раз в 300мс
setInterval(() => {
  grid.tickPlants();
}, 300);
