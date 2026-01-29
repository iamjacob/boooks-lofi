// useTFJS.js
import { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";

export default function useTFJS(videoRef, enabled) {
  const modelRef = useRef(null);
  const rafRef = useRef(null);

  const [tfReady, setTfReady] = useState(false);

  // Load TFJS only when enabled
  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    async function initTF() {
      await tf.setBackend("webgl");
      await tf.ready();

      if (cancelled) return;

      console.log("TFJS backend:", tf.getBackend());
      setTfReady(true);
    }

    initTF();

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  // Inference loop
  useEffect(() => {
    if (!tfReady || !videoRef.current) return;

    const video = videoRef.current;

    const loop = async () => {
      if (video.readyState >= 2) {
        const tensor = tf.browser.fromPixels(video);

        // 🔮 model inference goes here later
        // const prediction = await modelRef.current.predict(tensor.expandDims(0));

        // Camera Feed
        //    ↓
        // Coordinator (cheap, fast)
        //    ↓ decides
        // Specialist Model (only when needed)

        tensor.dispose();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [tfReady]);

  // Cleanup
  useEffect(() => {
    return () => {
      tf.disposeVariables();
    };
  }, []);

  return {
    tfReady,
    modelRef,
  };
}
