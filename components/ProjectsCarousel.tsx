"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { PROJECTS } from "@/lib/projects";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CarouselArrow } from "@/components/ui/CarouselArrow";

export default function ProjectsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollByDir = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth ?? 0;
    const gap = 24;
    el.scrollBy({ left: (cardWidth + gap) * dir, behavior: "smooth" });
  };

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth ?? 0;
    const gap = 24;
    // Quando a track chega na borda direita, sempre reportar o último projeto —
    // caso contrário o índice trava no primeiro card visível à esquerda (ex.: 08/10).
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
    const idx = atEnd
      ? PROJECTS.length - 1
      : Math.round(el.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(Math.max(idx, 0), PROJECTS.length - 1));
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="portfolio"
      className="relative w-full py-24 lg:py-32 overflow-hidden"
      style={{ background: "#FAFAF7", color: "#141410" }}
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Header ── */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-8 mb-12 lg:mb-16 items-end">
          <div className="col-span-12 lg:col-span-8">
            <Eyebrow tone="primary" className="mb-3">— Portfólio</Eyebrow>
            <h2
              style={{
                fontFamily: "var(--font-hanken, sans-serif)",
                fontWeight: 900,
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.05em",
                color: "#141410",
              }}
            >
              Projetos<br />
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 900,
                  color: "#00529B",
                }}
              >
                executados.
              </em>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:pb-2">
            <p
              className="text-base leading-[1.55]"
              style={{
                fontFamily: "var(--font-hanken, sans-serif)",
                fontWeight: 500,
                color: "#3A3A34",
              }}
            >
              Cada projeto é dimensionado para o porte, consumo e topografia do cliente — engenharia desenhada na ME.
            </p>
          </div>
        </div>

        {/* ── Controls bar ── */}
        <div className="flex items-end justify-between mb-6 lg:mb-8">
          <div className="flex items-baseline gap-3">
            <span
              style={{
                fontFamily: "var(--font-hanken, sans-serif)",
                fontWeight: 900,
                fontSize: "3rem",
                color: "#00529B",
                lineHeight: 0.9,
                letterSpacing: "-0.05em",
              }}
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span
              style={{
                fontFamily: "var(--font-hanken, sans-serif)",
                fontWeight: 700,
                fontSize: "11px",
                color: "#6A6A60",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              / {String(PROJECTS.length).padStart(2, "0")} Projetos
            </span>
          </div>

          <div className="flex items-center gap-2">
            <CarouselArrow direction="prev" onClick={() => scrollByDir(-1)} />
            <CarouselArrow direction="next" onClick={() => scrollByDir(1)} />
          </div>
        </div>
      </div>

      {/* ── Carousel track ── */}
      <div
        ref={trackRef}
        className="relative flex gap-6 overflow-x-auto pb-6 scroll-smooth no-scrollbar"
        style={{
          scrollSnapType: "x mandatory",
          scrollPaddingLeft: "max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))",
          paddingLeft: "max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))",
          paddingRight: "max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))",
        }}
      >
        {PROJECTS.map((p) => (
          <article
            key={p.id}
            className="shrink-0 w-[80vw] sm:w-[55vw] md:w-[42vw] lg:w-95"
            style={{ scrollSnapAlign: "start" }}
          >
            {/* Image */}
            <div className="relative aspect-3/2 overflow-hidden mb-5" style={{ borderRadius: "6px" }}>
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(max-width: 1024px) 80vw, 380px"
                className="object-cover"
              />
              <div
                className="absolute top-3 left-3 px-2.5 py-1"
                style={{
                  fontFamily: "var(--font-hanken, sans-serif)",
                  fontWeight: 800,
                  fontSize: "10px",
                  color: "#fff",
                  background: "rgba(20,20,16,0.55)",
                  backdropFilter: "blur(4px)",
                  WebkitBackdropFilter: "blur(4px)",
                  borderRadius: "4px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Projeto {p.num}
              </div>
            </div>

            {/* Content */}
            <div className="px-1">
              <div
                className="mb-2"
                style={{
                  fontFamily: "var(--font-hanken, sans-serif)",
                  fontWeight: 700,
                  fontSize: "11px",
                  color: "#6A6A60",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                {p.city} — {p.state}
              </div>

              <h3
                className="mb-5"
                style={{
                  fontFamily: "var(--font-hanken, sans-serif)",
                  fontWeight: 800,
                  fontSize: "clamp(1.375rem, 1.8vw, 1.75rem)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.03em",
                  color: "#141410",
                }}
              >
                {p.title}
              </h3>

              {/* Stats */}
              <div
                className="flex flex-wrap pt-4"
                style={{ borderTop: "2px solid #141410", gap: "0 24px" }}
              >
                <Stat label="Potência" value={p.kwp} unit="kWp" />
                <Stat label="Geração" value={p.geracao} unit="kWh" accent />
                <Stat label="Módulos" value={p.modulos} unit="" />
                <Stat label="Economia/mês" value={`R$ ${p.economia}`} unit="" highlight />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ── Progress indicator ── */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 mt-8 lg:mt-12">
        <div className="flex items-center gap-1.5">
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => {
                const el = trackRef.current;
                if (!el) return;
                const cardWidth = el.firstElementChild?.clientWidth ?? 0;
                const gap = 24;
                el.scrollTo({ left: (cardWidth + gap) * i, behavior: "smooth" });
              }}
              aria-label={`Ir para projeto ${p.num}`}
              className="h-1 transition-all duration-300"
              style={{
                width: i === activeIndex ? 40 : 16,
                background: i === activeIndex ? "#141410" : "#C9C2B4",
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

function Stat({
  label,
  value,
  unit,
  highlight,
  accent,
}: {
  label: string;
  value: string;
  unit: string;
  highlight?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex-1 min-w-[calc(50%-12px)] mb-3">
      <div
        style={{
          fontFamily: "var(--font-hanken, sans-serif)",
          fontWeight: 700,
          fontSize: "10px",
          color: "#6A6A60",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: "4px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-hanken, sans-serif)",
          fontWeight: 900,
          fontSize: "1.5rem",
          color: highlight ? "#00529B" : accent ? "#68AF25" : "#141410",
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        {value}
        {unit && (
          <span
            style={{
              fontWeight: 700,
              fontSize: "12px",
              color: "#6A6A60",
              marginLeft: "4px",
            }}
          >
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
