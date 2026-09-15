import { useEffect, useRef } from "react";
import { Map as MapLibreMap, Marker, NavigationControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useReducedMotion } from "framer-motion";

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
            maxzoom: 19,
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
        },
        layers: [{ id: "satellite", type: "raster", source: "satellite" }],
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
      zoom: reduceMotion ? 16.2 : 13.5,
      pitch: 60,
      bearing: -25,
      maxPitch: 75,
      attributionControl: { compact: true },
      // A page-embedded map must not hijack the scroll wheel.
      cooperativeGestures: true,
    });

    map.addControl(new NavigationControl({ visualizePitch: true }), "top-right");

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
        zoom: 16.2,
        pitch: 62,
        bearing: -15,
        duration: 3200,
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
