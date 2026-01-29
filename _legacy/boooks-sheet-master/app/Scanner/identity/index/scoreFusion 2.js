// /identity/index/scoreFusion.js
export function fuseSignals(signals) {
  // v1: pick best by score
  const flat = signals.flatMap((s) => s?.candidates || []);
  flat.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

  const best = flat[0] || null;
  const confidence = best?.score ? clamp01(best.score) : 0;

  return { best, confidence };
}

function clamp01(n) {
  return Math.max(0, Math.min(1, n));
}
