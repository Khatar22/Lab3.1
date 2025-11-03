// src/classes/Plant.js
export class Plant {
  constructor(name, imageUrl, minMoisture, maxMoisture, growthRate = 0.02) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.minMoisture = minMoisture;
    this.maxMoisture = maxMoisture;
    this.growth = 0; // [0..1]
    this.alive = true;
    this.el = null; // DOM элемент растения в клетке
    this.growthRate = growthRate;
  }

  /* универсальная логика роста и гибели: наследники задают только диапазоны/картинку */
  update(moisture) {
    if (!this.alive) return;
    if (moisture < this.minMoisture || moisture > this.maxMoisture) {
      this.alive = false;
      this.growth = 0;
      this.render();
      return;
    }
    this.growth = Math.min(1, this.growth + this.growthRate);
    this.render();
  }

  attachElement(containerEl) {
    // создать/обновить DOM узел растения
    if (!this.el) {
      this.el = document.createElement("div");
      this.el.className = "plant";
      this.el.style.backgroundImage = `url(${this.imageUrl})`;
      containerEl.appendChild(this.el);
    }
    this.render();
  }

  render() {
    if (!this.el) return;

    if (!this.alive) {
      this.el.classList.add("dead");
      this.el.title = `${this.name}: погибло`;
    }
    else {
      this.el.classList.remove("dead");
      const scale = 0.4 + 0.6 * this.growth;
      this.el.style.transform = `scale(${scale})`;
      this.el.style.opacity = "1";
      this.el.title = `${this.name}: рост ${(this.growth * 100).toFixed(0)}%`;
    }
  }
}
