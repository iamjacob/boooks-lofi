"use client";

import { Locate, LocateOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useMap } from "react-map-gl/maplibre";
import { useLiveLocation } from "../store/useLiveLocation";
import { useDeviceHeading } from "../components/useDeviceHeading";

/* ---------- Types ---------- */
type LatLng = { lat: number; lng: number };

/* ---------- Distance helper ---------- */
function distanceMeters(a: LatLng | null, b: LatLng | null) {
  if (!a || !b) return Infinity;
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/* ---------- Map ready helper ---------- */
function waitForMapReady(map: any) {
  return new Promise<void>((resolve) => {
    if (map.isStyleLoaded()) resolve();
    else map.once("load", () => resolve());
  });
}

/* ---------- Angle helpers ---------- */
function lerpAngle(a: number, b: number, t: number) {
  const diff = ((b - a + 540) % 360) - 180;
  return (a + diff * t + 360) % 360;
}

/* ---------- Time-based damping (THE FIX) ---------- */
function damp(
  current: number,
  target: number,
  lambda: number,
  dt: number
) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}

/* ---------- Compass correction ---------- */
function applyCompassCorrection(
  current: number,
  compass: number,
  strength = 0.04
) {
  const diff = ((compass - current + 540) % 360) - 180;
  return (current + diff * strength + 360) % 360;
}

/* ---------- Wake Lock ---------- */
let wakeLock: WakeLockSentinel | null = null;

async function enableWakeLock() {
  try {
    if ("wakeLock" in navigator) {
      wakeLock = await navigator.wakeLock.request("screen");
    }
  } catch {}
}

function disableWakeLock() {
  wakeLock?.release();
  wakeLock = null;
}

export default function RealTime() {
  const { follow, toggleFollow, setGeo } = useLiveLocation();
  const { current: mapRef } = useMap();

  const deviceHeading = useDeviceHeading();
  const [orientationAllowed, setOrientationAllowed] = useState(false);

  const watchId = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);

  /* ---------- TARGET STATE ---------- */
  const targetPos = useRef<LatLng | null>(null);
  const targetBearing = useRef<number | null>(null);

  /* ---------- RENDER STATE ---------- */
  const renderPos = useRef<LatLng | null>(null);
  const renderBearing = useRef<number>(0);

  /* ---------- Orientation permission ---------- */
  async function requestOrientationPermission() {
    try {
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof (DeviceOrientationEvent as any).requestPermission === "function"
      ) {
        const res = await (DeviceOrientationEvent as any).requestPermission();
        if (res === "granted") setOrientationAllowed(true);
      } else {
        setOrientationAllowed(true);
      }
    } catch {}
  }

  /* ---------- Render loop (continuous, smooth) ---------- */
  async function startRenderLoop() {
    const map = mapRef?.getMap();
    if (!map) return;

    await waitForMapReady(map);

    let lastTime = performance.now();

    const tick = () => {
      if (!targetPos.current) {
        rafId.current = requestAnimationFrame(tick);
        return;
      }

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (!renderPos.current) {
        renderPos.current = targetPos.current;
      }

      renderPos.current = {
        lat: damp(renderPos.current.lat, targetPos.current.lat, 6, dt),
        lng: damp(renderPos.current.lng, targetPos.current.lng, 6, dt),
      };

      if (targetBearing.current != null) {
        renderBearing.current = lerpAngle(
          renderBearing.current,
          targetBearing.current,
          0.15
        );
      }

      map.jumpTo({
        center: [renderPos.current.lng, renderPos.current.lat],
        bearing: renderBearing.current,
        zoom: 17,
        pitch: 68,
      });

      rafId.current = requestAnimationFrame(tick);
    };

    tick();
  }

  function stopRenderLoop() {
    if (rafId.current != null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  }

  /* ---------- START GPS ---------- */
  function startTracking() {
    enableWakeLock();
    startRenderLoop();

    watchId.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, speed } = pos.coords;
        const isMoving = speed != null && speed > 0.3;

        setGeo({ lat: latitude, lng: longitude });
        targetPos.current = { lat: latitude, lng: longitude };

        if (orientationAllowed && deviceHeading != null) {
          targetBearing.current =
            targetBearing.current == null
              ? deviceHeading
              : isMoving
              ? applyCompassCorrection(
                  targetBearing.current,
                  deviceHeading
                )
              : deviceHeading;
        }
      },
      console.warn,
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 20000,
      }
    );
  }

  /* ---------- STOP ---------- */
  function stopTracking() {
    disableWakeLock();
    stopRenderLoop();

    if (watchId.current != null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  }

  /* ---------- cleanup ---------- */
  useEffect(() => stopTracking, []);
  useEffect(() => {
    if (!follow) stopTracking();
  }, [follow]);

  /* ---------- UI ---------- */
  return (
    <div className="realtime">
      <button
        onClick={async () => {
          await requestOrientationPermission();
          toggleFollow();
          !follow ? startTracking() : stopTracking();
        }}
        className={`
          rounded-full p-2 transition-all
          ${follow ? "scale-110 bg-white/90" : "scale-90 bg-white/60"}
        `}
      >
        {follow ? (
          <Locate className="text-red-500" />
        ) : (
          <LocateOff className="text-gray-700" />
        )}
      </button>
    </div>
  );
}
