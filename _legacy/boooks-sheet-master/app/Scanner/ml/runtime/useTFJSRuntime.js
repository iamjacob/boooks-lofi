// /ml/runtime/useTFJSRuntime.js
import { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { createFrameBudget } from "./frameBudget";

export function useTFJSRuntime({ videoRef, enabled, targetFps = 12 }) {
  const [ready, setReady] = useState(false);
  const rafRef = useRef(null);
  const budgetRef = useRef(createFrameBudget(targetFps));

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    async function init() {
      // WebGL is usually best for TFJS CV on mobile
      // Fallback to this if no webGPU
      await tf.setBackend("webgl");
      await tf.ready();
      if (cancelled) return;
      setReady(true);
    }

    init();

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  function startLoop(onFrame) {
    stopLoop();

    const loop = async (t) => {
      const video = videoRef.current;
      if (!video || video.readyState < 2 || !budgetRef.current.shouldRun(t)) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      // Everything inside tidy gets disposed unless returned
      tf.tidy(() => {
        const frame = tf.browser.fromPixels(video); // [h,w,3]
        onFrame(frame, { now: t, width: video.videoWidth, height: video.videoHeight });
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
  }

  function stopLoop() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }

  useEffect(() => {
    return () => {
      stopLoop();
      // Don’t be too aggressive; but disposing variables helps on route changes
      tf.disposeVariables();
    };
  }, []);

  return { tf, ready, startLoop, stopLoop };
}
