export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function distance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/* плавная интерполяция цвета земли от желтого к темно-коричневому по влажности [0..1] */
export function moistureToColor(m) {
  const t = clamp(m, 0, 1);
  // от #d0b200 (желтый) к #3b2716 (темно-коричневый)
  const from = { r: 208, g: 178, b: 0 };
  const to = { r: 59, g: 39, b: 22 };
  const r = Math.round(lerp(from.r, to.r, t));
  const g = Math.round(lerp(from.g, to.g, t));
  const b = Math.round(lerp(from.b, to.b, t));
  return `rgb(${r}, ${g}, ${b})`;
}
