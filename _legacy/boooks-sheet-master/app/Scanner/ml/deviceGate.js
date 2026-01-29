// /ml/deviceGate.js
export function shouldUseManualFirst() {
  const mem = navigator.deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 4;
  const saveData = navigator.connection?.saveData;

  // conservative v1 heuristic
  if (saveData) return true;
  if (mem <= 2) return true;
  if (cores <= 4) return true;

  return false;
}
