"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import Map from "react-map-gl/maplibre";
import { Canvas } from "react-three-map/maplibre";
import { useRef, useState, useEffect } from "react";

import CleanMapStyle from "./../../../maps/components/CleanMapStyle";
// import MapUI from "./../../../maps/ui/MapUI";
// import SyncUrl from "./../../../maps/components/SyncUrl";
// import Progress from "./../../../maps/ui/Progress";
// import DraftPins from "./../../../maps/components/DraftPins";
// import ConfirmedPins from "./../../../maps/components/ConfirmedPins";
// import LiveTornado from "./../../../maps/components/LiveTornado";

// import { usePlacementStore } from "./../../../maps/store/usePlacementStore";
// import { useLiveLocation } from "./../../../maps/store/useLiveLocation";

// import type {
//   MapLayerMouseEvent,
//   MapLayerTouchEvent,
// } from "react-map-gl/maplibre";

const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

export function StoryMaplibre({
  latitude,
  longitude,
  zoom = 14,
  canvas,
  children,
  mapChildren,
  maplibreChildren,
  onMapReady,
  storyActive,
  onArrive, 
}: any) {
  // const startPointRef = useRef<{ x: number; y: number } | null>(null);
  // const lastLngLatRef = useRef<{ lat: number; lng: number } | null>(null);

  const mapRef = useRef<any>(null);
  const [mapReady, setMapReady] = useState(false);

  const DEFAULT_VIEW = {
    latitude: 55.707813,
    longitude: 9.55368,
    zoom: 13.5,
    pitch: 68,
    bearing: -16,
  };

  useEffect(() => {
  if (!storyActive) return;
  if (!mapReady) return;
  if (!mapRef.current) return;

  // reset to wide context
  mapRef.current.jumpTo({
    center: [longitude, latitude],
    zoom: 4,
    pitch: 0,
    bearing: 0,
  });

  const t = setTimeout(() => {
    mapRef.current.flyTo({
      center: [longitude, latitude],
      zoom: 14,
      pitch: 54,
      bearing: -64,
      speed: 1.1,
      curve: 1.6,
      essential: true,
    });

    mapRef.current.once("moveend", () => {
    onArrive?.();
  });
  }, 350);

  return () => clearTimeout(t);
}, [storyActive, mapReady, latitude, longitude]);


  return (
    <div className="relative h-[127px]">
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
        onLoad={(e) => {
          mapRef.current = e.target;
          setMapReady(true);
          onMapReady?.(e.target);
        }}
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
        {mapChildren}
        {maplibreChildren}

        <Canvas latitude={latitude} longitude={longitude} {...canvas}>
          {children}

          {/* {follow && geo.lat && geo.lng && (
            <LiveTornado
              latitude={geo.lat}
              longitude={geo.lng}
              showLabel={true}
              speed={geo.speed}
            />
          )} */}
        </Canvas>
      </Map>
    </div>
  );
}
