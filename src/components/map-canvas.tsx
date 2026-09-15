import { useEffect, useRef } from "react";
import {
  Map as MapLibreMap,
  Marker,
  NavigationControl,
  setWorkerUrl,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
// MapLibre resolves its worker relative to its own module URL, which breaks
// once Vite bundles it. Let Vite bundle the worker and hand over the URL.
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import { useReducedMotion } from "framer-motion";

setWorkerUrl(maplibreWorkerUrl);

/**
 * A tilted 3D satellite view of one location. Loaded lazily by SiteMap.
 *
 * Imagery and elevation come from keyless public tile services:
 * Esri World Imagery (satellite) and AWS Terrain Tiles (elevation).
 */
export default function MapCanvas({
  lat,
  lng,
  label,
}: {
  lat: number;
  lng: number;
  label: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!container.current) return;

    const map = new MapLibreMap({
      container: container.current,
      style: {
        version: 8,
        sources: {
          satellite: {
            type: "raster",
            tiles: [
              "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            ],
            tileSize: 256,
            // Esri's imagery for Bida stops at 17; overzoom rather than
            // show "data not available" tiles.
            maxzoom: 17,
            attribution:
              "Imagery © Esri, Maxar, Earthstar Geographics · Terrain © AWS / Mapzen",
          },
          terrain: {
            type: "raster-dem",
            tiles: [
              "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
            ],
            tileSize: 256,
            encoding: "terrarium",
            maxzoom: 15,
          },
          // OpenStreetMap building footprints (Bida is well mapped: ~15k
          // buildings within 2 km of the site), served keyless by OpenFreeMap.
          openmaptiles: {
            type: "vector",
            url: "https://tiles.openfreemap.org/planet",
            attribution: "Buildings © OpenStreetMap contributors · OpenFreeMap",
          },
        },
        layers: [
          { id: "satellite", type: "raster", source: "satellite" },
          {
            id: "buildings-3d",
            type: "fill-extrusion",
            source: "openmaptiles",
            "source-layer": "building",
            minzoom: 14,
            paint: {
              "fill-extrusion-color": "#d9cdb9",
              // OSM rarely records heights here; 5 m reads as a single storey.
              "fill-extrusion-height": [
                "coalesce",
                ["get", "render_height"],
                5,
              ],
              "fill-extrusion-base": [
                "coalesce",
                ["get", "render_min_height"],
                0,
              ],
              "fill-extrusion-opacity": 0.9,
              "fill-extrusion-vertical-gradient": true,
            },
          },
        ],
        terrain: { source: "terrain", exaggeration: 1.4 },
        sky: {
          "sky-color": "#bfd3e6",
          "horizon-color": "#e9e3d8",
          "fog-color": "#e9e3d8",
          "sky-horizon-blend": 0.6,
          "horizon-fog-blend": 0.6,
          "fog-ground-blend": 0.85,
        },
      },
      center: [lng, lat],
      zoom: reduceMotion ? 18 : 14,
      pitch: reduceMotion ? 68 : 60,
      bearing: -25,
      maxPitch: 80,
      attributionControl: { compact: true },
      // A page-embedded map must not hijack the scroll wheel.
      cooperativeGestures: true,
    });

    map.addControl(new NavigationControl({ visualizePitch: true }), "top-right");
    // Handle for tests and the browser console (e.g. queryRenderedFeatures).
    (container.current as HTMLDivElement & { __map?: MapLibreMap }).__map = map;

    const pin = document.createElement("div");
    pin.className = "site-pin";
    const dot = document.createElement("span");
    dot.className = "site-pin__dot";
    const text = document.createElement("span");
    text.className = "site-pin__label";
    text.textContent = label;
    pin.append(text, dot);
    new Marker({ element: pin, anchor: "bottom" })
      .setLngLat([lng, lat])
      .addTo(map);

    // Fly in, then drift slowly around the site until the visitor takes over.
    let drifting = false;
    let frame = 0;
    const drift = () => {
      if (!drifting) return;
      map.setBearing(map.getBearing() + 0.04);
      frame = requestAnimationFrame(drift);
    };
    const stopDrift = () => {
      drifting = false;
      cancelAnimationFrame(frame);
    };
    map.on("mousedown", stopDrift);
    map.on("touchstart", stopDrift);
    map.on("wheel", stopDrift);

    map.once("load", () => {
      if (reduceMotion) return;
      map.flyTo({
        zoom: 18,
        pitch: 68,
        bearing: -15,
        duration: 3600,
        essential: true,
      });
      map.once("moveend", () => {
        drifting = true;
        drift();
      });
    });

    return () => {
      stopDrift();
      map.remove();
    };
  }, [lat, lng, label, reduceMotion]);

  return <div ref={container} className="h-full w-full" />;
}
