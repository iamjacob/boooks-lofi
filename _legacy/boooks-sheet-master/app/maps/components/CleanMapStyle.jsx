"use client";

import { useEffect } from "react";
import { useMap } from "react-map-gl/maplibre";

const ROAD_COLORS = {
  motorway: "#E6D8B8",
  primary: "#E9E2C8",
  secondary: "#EEE8D5",
  tertiary: "#F2EEDD",
  street: "#F4F2ED",
  service: "#F6F4EF",
  path: "#DDD3B2",
};

const WORLD_MODE = {
  land: "#FFF5F5", // warm white
  water: "#FFD6D6", // soft love red
  road: "#E10600", // deep red lines
  building: "#E10600", // same red mass
};

function isRoadLayer(layer) {
  return (
    layer.type === "line" &&
    (layer.id.includes("road") ||
      layer.id.includes("street") ||
      layer.id.includes("motorway") ||
      layer.id.includes("bridge") ||
      layer.id.includes("tunnel"))
  );
}

export default function CleanMapStyle({ hideLabels = true }) {
  const { current: mapRef } = useMap();

  useEffect(() => {
    const map = mapRef?.getMap();
    if (!map) return;

    const apply = () => {
      const style = map.getStyle();
      if (!style?.layers) return;

      // 1. SET THE LIGHTING (The reddish 3D glow)
      // We do this inside apply() to ensure the style is ready
      map.setLight({
        anchor: "viewport",
        color: "#D91B24", // Light red glow on building faces
        intensity: 1, // Increase to 0.7 for a stronger effect
      });

      /* SET FOG COULD BE DOPE - Have tried Need more grind */

      style.layers.forEach((layer) => {
        // 1. HIDE LABELS & ICONS
        const id = layer.id.toLowerCase();
        console.log(id);
        

       if (layer.type === "symbol") {
  // default: hide everything first
  map.setLayoutProperty(layer.id, "visibility", "none");

  // ---- COUNTRY ----
  if (id.includes("label_country")) {
    map.setLayoutProperty(layer.id, "visibility", "visible");
    map.setPaintProperty(layer.id, "text-color", "#2b1d1d"); // warm near-black
    map.setPaintProperty(layer.id, "text-halo-color", "#ffffff");
    map.setPaintProperty(layer.id, "text-halo-width", 1.8);
    map.setPaintProperty(layer.id, "text-opacity", 0.95);
  }

  // ---- CITY ----
  else if (id.includes("label_city")) {
    map.setLayoutProperty(layer.id, "visibility", "visible");
    map.setPaintProperty(layer.id, "text-color", "#3a2323"); // warm dark ink
    map.setPaintProperty(layer.id, "text-halo-color", "#ffffff");
    map.setPaintProperty(layer.id, "text-halo-width", 1.4);
    map.setPaintProperty(layer.id, "text-opacity", 0.9);
  }

  // ---- TOWN ----
  else if (id.includes("label_town")) {
    map.setLayoutProperty(layer.id, "visibility", "visible");
    map.setPaintProperty(layer.id, "text-color", "#4a2f2f");
    map.setPaintProperty(layer.id, "text-halo-color", "#f0f0f0");
    map.setPaintProperty(layer.id, "text-halo-width", 1.1);
    map.setPaintProperty(layer.id, "text-opacity", 0.85);
  }

  // ---- VILLAGE ----
  else if (id.includes("label_village")) {
    map.setLayoutProperty(layer.id, "visibility", "visible");
    map.setPaintProperty(layer.id, "text-color", "#5a3a3a");
    map.setPaintProperty(layer.id, "text-halo-color", "#eeeeee");
    map.setPaintProperty(layer.id, "text-halo-width", 0.9);
    map.setPaintProperty(layer.id, "text-opacity", 0.8);
  }
}


        if (layer.type === "line" && layer.id.includes("boundary")) {
          map.setPaintProperty(layer.id, "line-color", [
            "interpolate",
            ["linear"],
            ["zoom"],
            3,
            "rgba(255,255,255,0.15)",
            7,
            "rgba(255,255,255,0.4)",
            10,
            "rgba(0,0,0,0.4)",
          ]);
        }

        if (layer.type === "background") {
          map.setPaintProperty(layer.id, "background-color", [
            "interpolate",
            ["linear"],
            ["zoom"],
            3,
            WORLD_MODE.land,
            7,
            "#EAF4FF", // your current sky/ground transition
            10,
            "#AFC7A1",
          ]);
        }

        if (layer.type === "fill" && layer.id.includes("water")) {
          map.setPaintProperty(layer.id, "fill-color", [
            "interpolate",
            ["linear"],
            ["zoom"],
            3,
            WORLD_MODE.water,
            7,
            "#FFD6D6",
            10,
            "#A7C7E7",
          ]);
        }

        if (isRoadLayer(layer)) {
          if (layer.id.includes("outline")) {
            map.setPaintProperty(layer.id, "line-opacity", 0);
            return;
          }

          map.setPaintProperty(layer.id, "line-color", "#E9E2C8");

          map.setPaintProperty(layer.id, "line-width", [
            "interpolate",
            ["linear"],
            ["zoom"],
            10,
            0.5,
            14,
            2,
            18,
            6,
          ]);

          map.setPaintProperty(layer.id, "line-opacity", 0.85);

          map.setLayoutProperty(layer.id, "line-cap", "round");
          map.setLayoutProperty(layer.id, "line-join", "round");

          if (layer.id.includes("path")) {
            map.setPaintProperty(layer.id, "line-opacity", 0.6);
            map.setPaintProperty(layer.id, "line-dasharray", [1, 2]);
          }

          if (layer.id.includes("motorway")) {
            map.setPaintProperty(layer.id, "line-color", "#E0CFA8");
            map.setPaintProperty(layer.id, "line-width", [
              "interpolate",
              ["linear"],
              ["zoom"],
              10,
              0.7,
              14,
              2.5,
              18,
              7,
            ]);
          }

          let color = ROAD_COLORS.street;

          if (layer.id.includes("motorway")) color = ROAD_COLORS.motorway;
          else if (layer.id.includes("primary")) color = ROAD_COLORS.primary;
          else if (layer.id.includes("secondary"))
            color = ROAD_COLORS.secondary;
          else if (layer.id.includes("tertiary")) color = ROAD_COLORS.tertiary;
          else if (layer.id.includes("service")) color = ROAD_COLORS.service;
          else if (layer.id.includes("path")) color = ROAD_COLORS.path;

          map.setPaintProperty(layer.id, "line-color", color);

          map.setPaintProperty(layer.id, "line-opacity", [
            "interpolate",
            ["exponential", 1.2],
            ["zoom"],
            9,
            0.25,
            12,
            0.5,
            14,
            0.85,
          ]);

          if (layer.id.includes("service")) {
            map.setPaintProperty(layer.id, "line-opacity", 0.6);
          }

          if (layer.id.includes("bridge") || layer.id.includes("tunnel")) {
            map.setPaintProperty(layer.id, "line-opacity", 0.7);
          }
        }
      });
    };

    if (map.isStyleLoaded()) {
      apply();
    } else {
      map.once("style.load", apply);
    }
  }, [mapRef, hideLabels]);

  return null;
}
