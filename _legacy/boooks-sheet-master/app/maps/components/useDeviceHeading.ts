// useDeviceHeading.ts
import { useEffect, useRef, useState } from "react";

export function useDeviceHeading() {
  const [heading, setHeading] = useState<number | null>(null);
  const lastRef = useRef<number | null>(null);

  useEffect(() => {
    function onOrientation(e: DeviceOrientationEvent) {
      if (e.alpha == null) return;

      // alpha = 0..360 (compass)
      let raw = 360 - e.alpha; // flip so north feels correct

      // smooth it
      if (lastRef.current != null) {
        raw = lastRef.current * 0.85 + raw * 0.15;
      }

      lastRef.current = raw;
      setHeading(raw);
    }

    window.addEventListener("deviceorientation", onOrientation, true);
    return () => window.removeEventListener("deviceorientation", onOrientation);
  }, []);

  return heading;
}
