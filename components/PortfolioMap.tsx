"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";
import "leaflet/dist/leaflet.css";

export type MapProject = {
  id: number;
  num: string;
  title: string;
  city: string;
  state: string;
  segment: string;
  kwp: string;
  modulos: string;
  economia: string;
  image: string;
  lat: number;
  lng: number;
};

interface Props {
  projects: MapProject[];
  activeId: number | null;
  onActiveChange: (id: number) => void;
}

export default function PortfolioMap({ projects, activeId, onActiveChange }: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Map<number, LeafletMarker>>(new Map());
  const [hoverProject, setHoverProject] = useState<MapProject | null>(null);
  const [popupPos, setPopupPos] = useState<{ x: number; y: number } | null>(null);

  // Refs para callbacks atuais (evita stale closure nos handlers de marker)
  const onActiveChangeRef = useRef(onActiveChange);
  const projectsRef = useRef(projects);
  const activeIdRef = useRef(activeId);

  useEffect(() => { onActiveChangeRef.current = onActiveChange; }, [onActiveChange]);
  useEffect(() => { projectsRef.current = projects; }, [projects]);
  useEffect(() => { activeIdRef.current = activeId; }, [activeId]);

  // Inicializa o mapa apenas uma vez
  useEffect(() => {
    let mounted = true;
    let mapInstance: LeafletMap | null = null;

    const init = async () => {
      if (!mapContainerRef.current || !mounted) return;

      const L = await import("leaflet");
      if (!mounted || !mapContainerRef.current) return;

      mapInstance = L.map(mapContainerRef.current, {
        zoomControl: true,
        scrollWheelZoom: false,
        doubleClickZoom: true,
        touchZoom: true,
        boxZoom: false,
        keyboard: false,
        dragging: true,
      }).setView([-18.7, -40.0], 7);

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: "© OpenStreetMap · CartoDB",
        subdomains: "abcd",
        maxZoom: 18,
      }).addTo(mapInstance);

      mapRef.current = mapInstance;
    };

    init();

    return () => {
      mounted = false;
      // Cleanup defensivo
      try {
        markersRef.current.forEach((m) => {
          try { m.remove(); } catch { /* ignore */ }
        });
        markersRef.current.clear();
      } catch { /* ignore */ }

      try {
        if (mapRef.current) {
          mapRef.current.remove();
        } else if (mapInstance) {
          mapInstance.remove();
        }
      } catch { /* ignore */ }

      mapRef.current = null;
      mapInstance = null;
    };
  }, []);

  // Sincroniza marcadores com a lista de projetos filtrada
  useEffect(() => {
    let mounted = true;

    const syncMarkers = async () => {
      if (!mapRef.current || !mounted) return;
      const L = await import("leaflet");
      if (!mapRef.current || !mounted) return;

      const visibleIds = new Set(projects.map((p) => p.id));

      // Remove marcadores que saíram do filtro
      markersRef.current.forEach((marker, id) => {
        if (!visibleIds.has(id)) {
          try { marker.remove(); } catch { /* ignore */ }
          markersRef.current.delete(id);
        }
      });

      // Atualiza ou adiciona marcadores
      projects.forEach((p) => {
        const isActive = p.id === activeId;
        const icon = L.divIcon({
          className: "me-marker",
          html: `<div class="me-marker-inner${isActive ? " active" : ""}">${p.num}</div>`,
          iconSize: isActive ? [44, 44] : [32, 32],
          iconAnchor: isActive ? [22, 22] : [16, 16],
        });

        const existing = markersRef.current.get(p.id);
        if (existing) {
          existing.setIcon(icon);
          return;
        }

        if (!mapRef.current) return;
        const marker = L.marker([p.lat, p.lng], { icon }).addTo(mapRef.current);

        marker.on("mouseover", () => {
          if (!mapRef.current) return;
          onActiveChangeRef.current(p.id);
          setHoverProject(p);
          try {
            const point = mapRef.current.latLngToContainerPoint([p.lat, p.lng]);
            setPopupPos({ x: point.x, y: point.y });
          } catch { /* ignore */ }
        });
        marker.on("mouseout", () => {
          setHoverProject(null);
          setPopupPos(null);
        });
        marker.on("click", () => {
          onActiveChangeRef.current(p.id);
        });

        markersRef.current.set(p.id, marker);
      });
    };

    syncMarkers();

    return () => {
      mounted = false;
    };
  }, [projects, activeId]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full" style={{ minHeight: "100%" }} />

      {/* Hover popup */}
      {hoverProject && popupPos && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: popupPos.x,
            top: popupPos.y,
            transform: "translate(-50%, calc(-100% - 32px))",
            zIndex: 1000,
          }}
        >
          <div
            className="grid grid-cols-[80px_minmax(0,1fr)] gap-3 p-3 w-[280px]"
            style={{
              background: "#fff",
              border: "1.5px solid #141410",
              boxShadow: "0 16px 40px rgba(20,20,16,0.25)",
            }}
          >
            <div className="relative aspect-3/2 overflow-hidden">
              <Image
                src={hoverProject.image}
                alt={hoverProject.title}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <div
                className="mb-0.5"
                style={{
                  fontFamily: "var(--font-hanken, sans-serif)",
                  fontWeight: 900,
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  color: "#00529B",
                }}
              >
                P-{hoverProject.num} · {hoverProject.segment}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-hanken, sans-serif)",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  letterSpacing: "-0.025em",
                  color: "#141410",
                  lineHeight: 1.1,
                }}
              >
                {hoverProject.title}
              </div>
              <div
                className="text-xs mt-0.5"
                style={{
                  fontFamily: "var(--font-hanken, sans-serif)",
                  fontWeight: 600,
                  color: "#6A6A60",
                }}
              >
                {hoverProject.city} — {hoverProject.state}
              </div>
              <div
                className="flex items-baseline gap-1.5 mt-1.5 pt-1.5"
                style={{ borderTop: "1px solid #EEEEE8" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-hanken, sans-serif)",
                    fontWeight: 900,
                    fontSize: "0.875rem",
                    color: "#00529B",
                  }}
                >
                  R$ {hoverProject.economia}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-hanken, sans-serif)",
                    fontWeight: 600,
                    fontSize: "10px",
                    color: "#6A6A60",
                  }}
                >
                  /mês · {hoverProject.kwp} kWp
                </span>
              </div>
            </div>
          </div>
          {/* Arrow */}
          <div
            className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-full w-0 h-0"
            style={{
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "10px solid #141410",
            }}
          />
        </div>
      )}

      {/* Marker styles */}
      <style jsx global>{`
        .me-marker {
          background: transparent !important;
          border: none !important;
        }
        .me-marker-inner {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #00529B;
          color: #00529B;
          font-family: var(--font-hanken, sans-serif);
          font-weight: 900;
          font-size: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.20);
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .me-marker-inner.active {
          width: 44px;
          height: 44px;
          background: #0A1F38;
          border: 2px solid #6FB8EE;
          color: #6FB8EE;
          font-size: 13px;
          box-shadow: 0 12px 32px rgba(10,31,56,0.40), 0 0 0 6px rgba(168,216,78,0.18);
        }
        .me-marker-inner:hover {
          transform: scale(1.1);
        }
        .leaflet-container {
          background: #FAFAF7 !important;
          font-family: var(--font-hanken, sans-serif);
        }
        .leaflet-control-attribution {
          background: rgba(255,255,255,0.85) !important;
          font-family: var(--font-hanken, sans-serif) !important;
          font-size: 10px !important;
          padding: 2px 6px !important;
        }
      `}</style>
    </div>
  );
}
