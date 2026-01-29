"use client";

import React, { useState, useEffect } from "react";
import {
  Info as InfoIcon,
  X,
  MapPin,
  Camera,
  Compass,
  MapPinned,
} from "lucide-react";
import { useMap } from "react-map-gl/maplibre";
import { useLiveLocation } from "../store/useLiveLocation";
import { useDeviceHeading } from "../components/useDeviceHeading";

const Info = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { geo } = useLiveLocation();
  const deviceHeading = useDeviceHeading();
  const { current: mapRef } = useMap();

  const [camera, setCamera] = useState({
    zoom: 0,
    pitch: 0,
    bearing: 0,
  });

  /* ---------- MAP CAMERA STATE ---------- */
  useEffect(() => {
    const map = mapRef?.getMap();
    if (!map) return;

    const update = () => {
      setCamera({
        zoom: map.getZoom(),
        pitch: map.getPitch(),
        bearing: map.getBearing(),
      });
    };

    map.on("move", update);
    map.on("zoom", update);
    map.on("rotate", update);
    map.on("pitch", update);

    update();

    return () => {
      map.off("move", update);
      map.off("zoom", update);
      map.off("rotate", update);
      map.off("pitch", update);
    };
  }, [mapRef]);

  /* ---------- FORMAT HELPERS ---------- */
  const fmt = (n?: number, d = 2) =>
    typeof n === "number" ? n.toFixed(d) : "—";

  return (
    <div>
      {/* Info Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-black/10 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-gray-700" />
        ) : (
          <InfoIcon className="text-gray-700" />
        )}
      </button>

      {/* Info Panel */}
      {isOpen && (
        <div className="fixed touch-auto overflow-y-auto h-[80vh] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-80 bg-white/50 backdrop-blur rounded-2xl shadow-2xl border border-gray-200 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-5 space-y-4">

            {/* NAVIGATION */}
            <Section icon={<Compass className="w-4 h-4" />} title="Navigation">
              <Row label="Heading">
                {fmt(geo.heading ?? deviceHeading, 0)}°
              </Row>
              <Row label="Speed">
                {geo.speed != null
                  ? `${fmt(geo.speed * 3.6, 1)} km/h`
                  : "—"}
              </Row>
            </Section>

            {/* GPS */}
            <Section icon={<MapPin className="w-4 h-4" />} title="GPS Position">
              <Row label="Latitude">{fmt(geo.lat, 5)}°</Row>
              <Row label="Longitude">{fmt(geo.lng, 5)}°</Row>
              <Row label="Accuracy">
                {geo.accuracy != null ? `±${fmt(geo.accuracy, 1)} m` : "—"}
              </Row>
            </Section>

            {/* CAMERA */}
            <Section icon={<Camera className="w-4 h-4" />} title="Camera View">
              <Row label="Zoom">{fmt(camera.zoom, 2)}x</Row>
              <Row label="Pitch">{fmt(camera.pitch, 1)}°</Row>
              <Row label="Bearing">{fmt(camera.bearing, 1)}°</Row>
            </Section>

            {/* DATA (placeholder but real-ready) */}
            <Section icon={<MapPinned className="w-4 h-4" />} title="Data">
              <Row label="Live Tracking">
                {geo.lat && geo.lng ? "Active" : "Inactive"}
              </Row>
              <Row label="Sensors">
                {deviceHeading != null ? "GPS + Compass" : "GPS"}
              </Row>
            </Section>

            {/* FOOTER */}
            <div className="pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Map Mode: Live 3D</span>
                <span>© Boooks</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------- UI helpers ---------- */

const Section = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2 text-gray-700 font-medium mb-2">
      {icon}
      <span className="text-sm">{title}</span>
    </div>
    <div className="bg-gray-600/10 rounded-lg p-3 space-y-1.5">
      {children}
    </div>
  </div>
);

const Row = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-600">{label}:</span>
    <span className="font-mono text-gray-900">{children}</span>
  </div>
);

export default Info;
