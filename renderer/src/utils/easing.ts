export const easing = Object.freeze({
  __proto__: null,

  lenear: (t) => t,

  quadIn: (t) => t * t,
  quadOut: (t) => t * (2 - t),
  quadInOut: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),

  cubicIn: (t) => t * t * t,
  cubicOut: (t) => --t * t * t + 1,
  cubicInOut: (t) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,

  quartIn: (t) => t * t * t * t,
  qauartOut: (t) => 1 - --t * t * t * t,
  quartInOut: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),

  quintIn: (t) => t * t * t * t * t,
  quintOut: (t) => 1 + --t * t * t * t * t,
  quintInOut: (t) =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
})
