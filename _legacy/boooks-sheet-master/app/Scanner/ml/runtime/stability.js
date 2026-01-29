// /ml/runtime/stability.js
export function createStabilityGate() {
  let lastSample = null;
  let stableScore = 0;

  // Super cheap “motion proxy”: sample a few pixels and compare
  function sampleTiny(frameTensor) {
    // frameTensor: [h,w,3]
    // Downsample to 16x16 and take mean; cheap signal
    // NOTE: must be called inside tf.tidy context
    const tiny = frameTensor
      .resizeBilinear([16, 16])
      .mean(2) // grayscale-ish
      .dataSync(); // 256 values
    return tiny;
  }

  function diff(a, b) {
    let s = 0;
    for (let i = 0; i < a.length; i++) s += Math.abs(a[i] - b[i]);
    return s / a.length;
  }

  return {
    update(frameTensor) {
      const cur = sampleTiny(frameTensor);

      if (!lastSample) {
        lastSample = cur;
        stableScore = 0;
        return { isStable: false, stability: 0 };
      }

      const d = diff(cur, lastSample);
      lastSample = cur;

      // smaller diff => more stable
      const instant = Math.max(0, 1 - d / 20); // tune divisor
      stableScore = stableScore * 0.8 + instant * 0.2;

      return { isStable: stableScore > 0.75, stability: stableScore };
    },
  };
}
