"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import Map from "react-map-gl/maplibre";
import { Canvas } from "react-three-map/maplibre";
import { useRef, useState } from "react";

import CleanMapStyle from "./components/CleanMapStyle";
import MapUI from "./ui/MapUI";
import SyncUrl from "./components/SyncUrl";
import Progress from "./ui/Progress";
import DraftPins from "./components/DraftPins";
import ConfirmedPins from "./components/ConfirmedPins";
import LiveTornado from "./components/LiveTornado";

import { usePlacementStore } from "./store/usePlacementStore";
import { useLiveLocation } from "./store/useLiveLocation";

import type {
  MapLayerMouseEvent,
  MapLayerTouchEvent,
} from "react-map-gl/maplibre";

const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

export function StoryMaplibre({
  latitude,
  longitude,
  zoom = 14,
  canvas,
  children,
  mapChildren,
  maplibreChildren,
}: any) {
  const startPointRef = useRef<{ x: number; y: number } | null>(null);
  const lastLngLatRef = useRef<{ lat: number; lng: number } | null>(null);

  const [holding, setHolding] = useState(false);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);

  const { follow, geo } = useLiveLocation();

  const addDraft = usePlacementStore((s) => s.addDraft);

  function startHold(e: MapLayerMouseEvent | MapLayerTouchEvent) {
    startPointRef.current = e.point;
    lastLngLatRef.current = {
      lat: e.lngLat.lat,
      lng: e.lngLat.lng,
    };

    setPointer({ x: e.point.x, y: e.point.y });
    setHolding(true);
  }

  function moveHold(e: MapLayerMouseEvent | MapLayerTouchEvent) {
    const start = startPointRef.current;
    if (!start) return;

    setPointer({ x: e.point.x, y: e.point.y });

    const dx = Math.abs(e.point.x - start.x);
    const dy = Math.abs(e.point.y - start.y);

    if (dx > 5 || dy > 5) {
      cancelHold();
    }
  }

  function cancelHold() {
    startPointRef.current = null;
    lastLngLatRef.current = null;
    setHolding(false);
    setPointer(null);
  }

  function onHoldComplete() {
    const loc = lastLngLatRef.current;
    if (!loc) return;

    addDraft(loc.lat, loc.lng);
    navigator.vibrate?.(30);
    cancelHold();
  }

  const DEFAULT_VIEW = {
    latitude: 55.707813,
    longitude: 9.55368,
    zoom: 13.5,
    pitch: 68,
    bearing: -16,
  };

  return (
    <div className="relative h-screen">
      {/* SKY */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          //Magical
          //background: "linear-gradient(to top, #F7FAFF, #EAF2FF, #D6E8FF)"
          //Warmer / golden
          //background: "linear-gradient(to top, #EAF4FF, #CFE6FF, #B7D8FF)"
          //Calm heaven (recommended)
          background: "linear-gradient(to top, #EAF4FF, #CFE6FF, #B7D8FF)",
        }}
      />
      {/* SKY ATMOSPHERIC FADE */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.06), rgba(0,0,0,0.03) 25vh, rgba(0,0,0,0) 55vh)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden md:block"
        style={{
          background: `
      linear-gradient(to top,
        rgba(0,0,0,0.06),
        rgba(0,0,0,0.03) 22vh,
        rgba(0,0,0,0) 50vh
      )
    `,
        }}
      />

      <Map
        initialViewState={{
          ...DEFAULT_VIEW,
          latitude: latitude ?? DEFAULT_VIEW.latitude,
          longitude: longitude ?? DEFAULT_VIEW.longitude,
          zoom: zoom ?? DEFAULT_VIEW.zoom,
        }}
        mapStyle={MAP_STYLE}
        maxPitch={75}
        dragRotate
        touchZoomRotate
        interactiveLayerIds={[]}
        onMouseDown={startHold}
        onMouseMove={moveHold}
        onMouseUp={cancelHold}
        onTouchStart={startHold}
        onTouchMove={moveHold}
        onTouchEnd={cancelHold}
      >
        {/* Should this be a payed future?
const [interactive, setInteractive] = useState(false)

<Map
  dragPan={interactive}
  dragRotate={interactive}
  scrollZoom={interactive}
  touchZoomRotate={interactive}
/> */}

        <CleanMapStyle hideLabels />
        <SyncUrl />
        <MapUI />
        <DraftPins />
        <ConfirmedPins />

        {holding && pointer && (
          <div
            data-holding="true"
            className="fixed z-9999 pointer-events-none flex justify-center items-center"
            style={{
              left: pointer.x - 44,
              top: pointer.y - 44,
            }}
          >
            <Progress onComplete={onHoldComplete}>I love you!</Progress>
          </div>
        )}

        {mapChildren}
        {maplibreChildren}

        <Canvas latitude={latitude} longitude={longitude} {...canvas}>
          {children}

          {follow && geo.lat && geo.lng && (
            <LiveTornado
              latitude={geo.lat}
              longitude={geo.lng}
              showLabel={true}
              speed={geo.speed}
            />
          )}
        </Canvas>
      </Map>
    </div>
  );
}
