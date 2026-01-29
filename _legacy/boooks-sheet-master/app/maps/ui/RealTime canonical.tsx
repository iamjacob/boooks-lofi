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

/* ---------- Map ready helper (CRITICAL) ---------- */
function waitForMapReady(map: any) {
  return new Promise<void>((resolve) => {
    if (map.isStyleLoaded()) {
      resolve();
    } else {
      map.once("load", () => resolve());
    }
  });
}

export default function RealTime() {
  const { follow, toggleFollow, setGeo } = useLiveLocation();
  const { current: mapRef } = useMap();

  const deviceHeading = useDeviceHeading();
  const [orientationAllowed, setOrientationAllowed] = useState(false);

  const watchId = useRef<number | null>(null);
  const lastFixRef = useRef<LatLng | null>(null);
  const hasFlownRef = useRef(false);

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
    } catch {
      setOrientationAllowed(false);
    }
  }

  /* ---------- START GPS (MUST BE CALLED IN TAP) ---------- */
  function startTracking() {
    console.log("[GPS] init");

    if (!("geolocation" in navigator)) {
      console.warn("Geolocation not available");
      return;
    }

    // warm up (helps iOS cold start)
    navigator.geolocation.getCurrentPosition(
      () => {},
      () => {},
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    // clear any previous watch
    if (watchId.current != null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }

    watchId.current = navigator.geolocation.watchPosition(
      async (pos) => {
        console.log("[GPS] fix");

        const { latitude, longitude, heading, speed } = pos.coords;
        const current: LatLng = { lat: latitude, lng: longitude };
        const distance = distanceMeters(lastFixRef.current, current);

        setGeo({ lat: latitude, lng: longitude, heading, speed });

        const map = mapRef?.getMap();
        if (!map) return;

        console.log("[MAP] waiting for style");
        await waitForMapReady(map);
        console.log("[MAP] ready");

        const zoom = 17;

        /* ----- heading blend ----- */
        const gpsHeading =
          speed != null && speed > 0.7 && heading != null ? heading : null;

        const blendedHeading =
          gpsHeading != null && deviceHeading != null
            ? gpsHeading * 0.7 + deviceHeading * 0.3
            : gpsHeading ?? (orientationAllowed ? deviceHeading : null);

        /* ----- first fix / big jump ----- */
        if (!hasFlownRef.current || distance > 500) {
          map.flyTo({
            center: [longitude, latitude],
            zoom,
            pitch: 68,
            bearing: blendedHeading ?? map.getBearing(),
            speed: distance > 5000 ? 1.2 : 1.6,
            curve: 1.6,
            essential: true,
          });

          hasFlownRef.current = true;
          lastFixRef.current = current;
          return;
        }

        /* ----- normal follow ----- */
        map.easeTo({
          center: [longitude, latitude],
          zoom,
          bearing: blendedHeading ?? map.getBearing(),
          duration: 300,
          essential: true,
        });

        lastFixRef.current = current;
      },
      (err) => {
        console.warn("[GPS] error", err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 20000, // IMPORTANT: not Infinity
      }
    );
  }

  /* ---------- STOP GPS ---------- */
  function stopTracking() {
    console.log("[GPS] stop");
    if (watchId.current != null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  }

  /* ---------- cleanup on unmount ---------- */
  useEffect(() => {
    return () => stopTracking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- if follow turned off elsewhere ---------- */
  useEffect(() => {
    if (!follow) stopTracking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [follow]);

  /* ---------- UI ---------- */
  return (
    <div className="realtime">
      <div className="relative">
        <button
          onClick={async () => {
            console.log("[UI] tap");

            hasFlownRef.current = false;
            lastFixRef.current = null;

            // orientation permission is fine to await
            await requestOrientationPermission();

            // toggle UI state
            toggleFollow();

            // IMPORTANT: start GPS immediately in gesture
            if (!follow) startTracking();
            else stopTracking();
          }}
          className={`
            relative z-10 rounded-full p-2
            transition-all duration-300 ease-out
            ${
              follow
                ? "scale-110 bg-white/90 shadow-xl"
                : "scale-90 bg-white/60 opacity-70"
            }
          `}
        >
          {follow ? (
            <Locate className="text-green-500 animate-[pulse_6s_ease-in-out_infinite]" />
          ) : (
            <LocateOff className="text-gray-700" />
          )}
        </button>

        {follow && (
          <span className="pointer-events-none absolute inset-0 rounded-full border border-green-400/90 animate-ping" />
        )}
      </div>
    </div>
  );
}
