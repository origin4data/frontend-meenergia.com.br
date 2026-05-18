use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

type Project = {
  id: number;
  num: string;
  title: string;
  city: string;
  state: string;
  kwp: string;
  geracao: string;
  modulos: string;
  economia: string;
  image: string;
};

const PROJECTS: Project[] = [
  { id: 1, num: "01", title: "Alcides Guisolfi", city: "SÃ£o Mateus", state: "ES", kwp: "59,84", geracao: "7.230", modulos: "146", economia: "5.277", image: "/Projetos/alcidesguisolfi.jpg" },
  { id: 2, num: "02", title: "Escola Master", city: "SÃ£o Mateus", state: "ES", kwp: "139,00", geracao: "17.000", modulos: "403", economia: "13.770", image: "/Projetos/escolamaster.jpg" },
  { id: 3, num: "03", title: "Proteinorte", city: "Linhares", state: "ES", kwp: "399,84", geracao: "47.980", modulos: "784", economia: "35.000", image: "/Projetos/proteinorte.jpg" },
  { id: 4, num: "04", title: "Renato CÃ©sar Pimenta Maia", city: "Nova VenÃ©cia", state: "ES", kwp: "41,31", geracao: "4.900", modulos: "81", economia: "3.577", image: "/Projetos/renatocesar.jpg" },
  { id: 5, num: "05", title: "Hotel Ibis Styles", city: "SÃ£o Mateus", state: "ES", kwp: "140,80", geracao: "17.230", modulos: "408", economia: "13.959", image: "/Projetos/hotelibis.jpg" },
  { id: 6, num: "06", title: "Brasigran", city: "Serra", state: "ES", kwp: "466,56", geracao: "55.987", modulos: "1.296", economia: "31.700", image: "/Projetos/brasigran.jpg" },
  { id: 7, num: "07", title: "Vila Cizinho", city: "ConceiÃ§Ã£o da Barra", state: "ES", kwp: "10,20", geracao: "1.258", modulos: "20", economia: "1.045", image: "/Projetos/vilacizino.jpg" },
  { id: 8, num: "08", title: "Posto Flecha", city: "Itamaraju", state: "BA", kwp: "140,14", geracao: "16.625", modulos: "308", economia: "13.466", image: "/Projetos/postoflecha.jpg" },
  { id: 9, num: "09", title: "Rally Pneus", city: "Linhares", state: "ES", kwp: "105,60", geracao: "12.618", modulos: "207", economia: "10.220", image: "/Projetos/rallypenus.jpg" },
  { id: 10, num: "10", title: "FrigorÃ­fico Montanha", city: "Montanha", state: "ES", kwp: "141,90", geracao: "17.000", modulos: "258", economia: "13.700", image: "/Projetos/frigorificomontanha.jpg" },
];

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
    const idx = Math.round(el.scrollLeft / (cardWidth + gap));
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

        {/* â”€â”€ Header â”€â”€ */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-8 mb-12 lg:mb-16 items-end">
          <div className="col-span-12 lg:col-span-8">
            <div
              className="mb-3"
              style={{
                fontFamily: "var(--font-hanken, sans-serif)",
                fontWeight: 700,
                fontSize: "11px",
                color: "#00529B",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              â€” PortfÃ³lio
            </div>
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
              Cada projeto Ã© dimensionado para o porte, consumo e topografia do cliente â€” engenharia desenhada na ME.
            </p>
          </div>
        </div>

        {/* â”€â”€ Controls bar â”€â”€ */}
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
            <button
              onClick={() => scrollByDir(-1)}
              aria-label="Anterior"
              className="flex items-center justify-center transition-all duration-300 hover:bg-[#141410] hover:text-white"
              style={{
                width: 48,
                height: 48,
                border: "2px solid #141410",
                color: "#141410",
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => scrollByDir(1)}
              aria-label="PrÃ³ximo"
              className="flex items-center justify-center transition-all duration-300 hover:bg-[#141410] hover:text-white"
              style={{
                width: 48,
                height: 48,
                border: "2px solid #141410",
                color: "#141410",
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M5 12h14M13 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* â”€â”€ Carousel track â”€â”€ */}
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
                {p.city} â€” {p.state}
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
                <Stat label="PotÃªncia" value={p.kwp} unit="kWp" />
                <Stat label="GeraÃ§Ã£o" value={p.geracao} unit="kWh" />
                <Stat label="MÃ³dulos" value={p.modulos} unit="" />
                <Stat label="Economia/mÃªs" value={`R$ ${p.economia}`} unit="" highlight />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* â”€â”€ Progress indicator â”€â”€ */}
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
}: {
  label: string;
  value: string;
  unit: string;
  highlight?: boolean;
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
          color: highlight ? "#00529B" : "#141410",
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
