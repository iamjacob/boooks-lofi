// /ml/runtime/frameBudget.js
export function createFrameBudget(targetFps = 12) {
  const minDelta = 1000 / targetFps;
  let last = 0;

  return {
    shouldRun(now) {
      if (now - last < minDelta) return false;
      last = now;
      return true;
    },
    setFps(fps) {
      targetFps = fps;
    },
  };
}
