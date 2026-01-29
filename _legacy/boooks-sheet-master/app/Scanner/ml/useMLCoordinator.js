// /ml/useMLCoordinator.js
import { useEffect, useMemo, useRef, useState } from "react";
import { useTFJSRuntime } from "./runtime/useTFJSRuntime";
import { createModelRegistry } from "./models/registry";
import { createStabilityGate } from "./runtime/stability";
import { drawOverlay } from "./overlay/draw";

export function useMLCoordinator({ videoRef, overlayRef, enabled }) {
  const registry = useMemo(() => createModelRegistry(), []);
  const stability = useMemo(() => createStabilityGate(), []);

  const [mlState, setMlState] = useState({
    tfReady: false,
    mode: "detect", // "detect" | "align" | "ready" | "captured"
    stability: 0,
    bookPresent: false,
    lastResult: null,
  });

  const stateRef = useRef(mlState);
  useEffect(() => void (stateRef.current = mlState), [mlState]);

  const runtime = useTFJSRuntime({ videoRef, enabled, targetFps: 12 });

  // Start runtime loop when TF is ready
  useEffect(() => {
    if (!enabled) return;
    if (!runtime.ready) return;

    setMlState((s) => ({ ...s, tfReady: true }));

    runtime.startLoop(async (frameTensor, meta) => {
      const st = stability.update(frameTensor);

      // Always update stability for UI
      let next = { ...stateRef.current, stability: st.stability };

      // If not stable, only draw guides + return
      if (!st.isStable) {
        next.mode = "align";
        setMlState(next);
        drawOverlay(overlayRef.current, { meta, mode: "align", stability: st.stability });
        return;
      }

      // Stable → run routing logic
      // Stage 1: presence
      if (!next.bookPresent) {
        const model = await registry.get("bookPresence");
        const input = frameTensor.expandDims(0).toFloat().div(255);

        const out = model.execute(input); // depends on your model outputs
        // Placeholder: treat as single scalar probability
        const prob = Array.isArray(out) ? out[0].dataSync()[0] : out.dataSync()[0];

        next.bookPresent = prob > 0.6;
        next.lastResult = { type: "presence", prob };
        next.mode = next.bookPresent ? "detect" : "align";

        setMlState(next);
        drawOverlay(overlayRef.current, { meta, mode: next.mode, presence: prob, stability: st.stability });
        return;
      }

      // Stage 2: detect spine polygons / OBB
      const spineModel = await registry.get("spineOBB");
      const input = frameTensor.expandDims(0).toFloat().div(255);

      const out = spineModel.execute(input);
      // Placeholder: parse to polygons (you’ll implement parse for your model format)
      const polygons = parseSpineOutput(out);

      next.lastResult = { type: "spine", polygons };
      next.mode = polygons?.length ? "ready" : "detect";

      setMlState(next);
      drawOverlay(overlayRef.current, { meta, mode: next.mode, polygons, stability: st.stability });
    });

    return () => runtime.stopLoop();
  }, [enabled, runtime.ready]);

  return {
    mlState,
    // expose for shutter/capture
    async captureHighRes() {
      // You’ll call /ml/capture/captureFrame.js here
      // Then run heavier OCR/barcode/warp in a one-shot pipeline
    },
  };
}

// --- Placeholder parser (replace with your model format)
function parseSpineOutput(out) {
  // Return something like: [{ points: [[x,y],...], score }]
  // For now: no output
  return [];
}
