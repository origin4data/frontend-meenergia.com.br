use client";

import { useState, useMemo, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import SimulationModal from "./SimulationModal";

const PortfolioMap = dynamic(() => import("./PortfolioMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center" style={{ background: "#FAFAF7" }}>
      <span style={{ fontFamily: "var(--font-hanken, sans-serif)", color: "#9A9A90", fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700 }}>
        Carregando mapa...
      </span>
    </div>
  ),
});

type Project = {
  id: number;
  num: string;
  title: string;
  city: string;
  state: "ES" | "BA";
  segment: "Residencial" | "Comercial" | "Industrial" | "Hotelaria";
  kwp: string;
  geracao: string;
  modulos: string;
  economia: string;
  image: string;
  lat: number;
  lng: number;
};

const PROJECTS: Project[] = [
  { id: 1, num: "01", title: "Alcides Guisolfi", city: "SÃ£o Mateus", state: "ES", segment: "Residencial", kwp: "59,84", geracao: "7.230", modulos: "146", economia: "5.277", image: "/Projetos/alcidesguisolfi.jpg", lat: -18.7160, lng: -39.8587 },
  { id: 2, num: "02", title: "Escola Master", city: "SÃ£o Mateus", state: "ES", segment: "Comercial", kwp: "139,00", geracao: "17.000", modulos: "403", economia: "13.770", image: "/Projetos/escolamaster.jpg", lat: -18.7100, lng: -39.8650 },
  { id: 3, num: "03", title: "Proteinorte", city: "Linhares", state: "ES", segment: "Industrial", kwp: "399,84", geracao: "47.980", modulos: "784", economia: "35.000", image: "/Projetos/proteinorte.jpg", lat: -19.3919, lng: -40.0719 },
  { id: 4, num: "04", title: "Renato CÃ©sar Pimenta Maia", city: "Nova VenÃ©cia", state: "ES", segment: "Residencial", kwp: "41,31", geracao: "4.900", modulos: "81", economia: "3.577", image: "/Projetos/renatocesar.jpg", lat: -18.7106, lng: -40.4014 },
  { id: 5, num: "05", title: "Hotel Ibis Styles", city: "SÃ£o Mateus", state: "ES", segment: "Hotelaria", kwp: "140,80", geracao: "17.230", modulos: "408", economia: "13.959", image: "/Projetos/hotelibis.jpg", lat: -18.7240, lng: -39.8540 },
  { id: 6, num: "06", title: "Brasigran", city: "Serra", state: "ES", segment: "Industrial", kwp: "466,56", geracao: "55.987", modulos: "1.296", economia: "31.700", image: "/Projetos/brasigran.jpg", lat: -20.1289, lng: -40.3074 },
  { id: 7, num: "07", title: "Vila Cizinho", city: "ConceiÃ§Ã£o da Barra", state: "ES", segment: "Residencial", kwp: "10,20", geracao: "1.258", modulos: "20", economia: "1.045", image: "/Projetos/vilacizino.jpg", lat: -18.5856, lng: -39.7339 },
  { id: 8, num: "08", title: "Posto Flecha", city: "Itamaraju", state: "BA", segment: "Comercial", kwp: "140,14", geracao: "16.625", modulos: "308", economia: "13.466", image: "/Projetos/postoflecha.jpg", lat: -17.0387, lng: -39.5295 },
  { id: 9, num: "09", title: "Rally Pneus", city: "Linhares", state: "ES", segment: "Comercial", kwp: "105,60", geracao: "12.618", modulos: "207", economia: "10.220", image: "/Projetos/rallypenus.jpg", lat: -19.4000, lng: -40.0650 },
  { id: 10, num: "10", title: "FrigorÃ­fico Montanha", city: "Montanha", state: "ES", segment: "Industrial", kwp: "141,90", geracao: "17.000", modulos: "258", economia: "13.700", image: "/Projetos/frigorificomontanha.jpg", lat: -18.1283, lng: -40.3697 },
];

const FILTERS = [
  { value: "all", label: "Todos" },
  { value: "ES", label: "EspÃ­rito Santo" },
  { value: "BA", label: "Bahia" },
  { value: "Residencial", label: "Residencial" },
  { value: "Comercial", label: "Comercial" },
  { value: "Industrial", label: "Industrial" },
  { value: "Hotelaria", label: "Hotelaria" },
];

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   FADE IN HOOK
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.10 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FadeIn({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   COMPONENT
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export default function Portfolio() {
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [activeId, setActiveId] = useState<number>(3); // Proteinorte como destaque inicial

  const filtered = useMemo(() => {
    if (filter === "all") return PROJECTS;
    if (filter === "ES" || filter === "BA") return PROJECTS.filter((p) => p.state === filter);
    return PROJECTS.filter((p) => p.segment === filter);
  }, [filter]);

  // Aggregate stats
  const totalKwp = PROJECTS.reduce((acc, p) => acc + parseFloat(p.kwp.replace(",", ".")), 0);
  const totalModulos = PROJECTS.reduce((acc, p) => acc + parseInt(p.modulos.replace(/\./g, "")), 0);

  return (
    <>
      <section id="portfolio">

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            HERO
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <div className="relative min-h-[70vh] flex items-end overflow-hidden">
          <Image
            src="/painelportifolio.jpg"
            alt="Portfolio ME Energia Solar"
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, #0A1F38 0%, rgba(10,31,56,0.85) 30%, rgba(10,31,56,0.30) 60%, rgba(10,31,56,0.40) 100%)",
            }}
          />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-20 md:pb-24">
            <FadeIn>
              <div
                className="mb-5"
                style={{
                  fontFamily: "var(--font-hanken, sans-serif)",
                  fontWeight: 700,
                  fontSize: "11px",
                  color: "#6FB8EE",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                }}
              >
                â€” PortfÃ³lio
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1
                style={{
                  fontFamily: "var(--font-hanken, sans-serif)",
                  fontWeight: 900,
                  fontSize: "clamp(2.75rem, 7vw, 6.5rem)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.05em",
                  color: "#fff",
                  margin: 0,
                  marginBottom: "24px",
                }}
              >
                Projetos<br />
                <em
                  style={{
                    fontStyle: "italic",
                    fontWeight: 900,
                    color: "#fff",
                  }}
                >
                  pelo mapa.
                </em>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p
                className="text-base md:text-lg leading-relaxed max-w-2xl"
                style={{
                  fontFamily: "var(--font-hanken, sans-serif)",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.80)",
                }}
              >
                Cada instalaÃ§Ã£o Ã© dimensionada para o porte, consumo e topografia do cliente â€” engenharia desenhada na ME, executada em todo EspÃ­rito Santo e sul da Bahia.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            STATS BAR
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <div className="border-y-2" style={{ background: "#fff", borderColor: "#141410" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 lg:py-14">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8">
              {[
                { value: PROJECTS.length.toString().padStart(2, "0"), label: "Projetos executados" },
                { value: `${Math.round(totalKwp)}+`, unit: "kWp", label: "PotÃªncia instalada" },
                { value: totalModulos.toLocaleString("pt-BR"), label: "MÃ³dulos instalados" },
                { value: "ES + BA", label: "Estados atendidos" },
              ].map((s, i) => (
                <FadeIn key={s.label} delay={i * 0.05}>
                  <div className={i > 0 ? "md:pl-8 md:border-l" : ""} style={{ borderColor: "#C9C2B4" }}>
                    <div
                      className="mb-2"
                      style={{
                        fontFamily: "var(--font-hanken, sans-serif)",
                        fontWeight: 900,
                        fontSize: "clamp(2.5rem, 4vw, 3.75rem)",
                        color: "#141410",
                        letterSpacing: "-0.04em",
                        lineHeight: 1,
                      }}
                    >
                      {s.value}
                      {s.unit && (
                        <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#6A6A60", marginLeft: "6px" }}>
                          {s.unit}
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-hanken, sans-serif)",
                        fontWeight: 700,
                        fontSize: "11px",
                        color: "#6A6A60",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            FILTERS + MAP + LIST
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <div style={{ background: "#FAFAF7" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">

            {/* Filters */}
            <FadeIn>
              <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
                <div>
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
                    â€” Explore
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {FILTERS.map((f) => {
                      const active = filter === f.value;
                      return (
                        <button
                          key={f.value}
                          onClick={() => setFilter(f.value)}
                          className="px-4 py-2 transition-all duration-200"
                          style={{
                            border: `1.5px solid ${active ? "#141410" : "#C9C2B4"}`,
                            background: active ? "#141410" : "transparent",
                            color: active ? "#fff" : "#141410",
                            fontFamily: "var(--font-hanken, sans-serif)",
                            fontWeight: 700,
                            fontSize: "12px",
                            letterSpacing: "0.05em",
                            borderRadius: "999px",
                          }}
                        >
                          {f.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-hanken, sans-serif)",
                    fontWeight: 700,
                    fontSize: "11px",
                    color: "#6A6A60",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  {filtered.length} {filtered.length === 1 ? "projeto" : "projetos"}
                </span>
              </div>
            </FadeIn>

            {/* Map + List */}
            <FadeIn delay={0.1}>
              <div
                className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]"
                style={{
                  border: "1.5px solid #141410",
                  background: "#fff",
                }}
              >
                {/* List â€” segundo no mobile, primeiro no desktop */}
                <div
                  className="overflow-y-auto max-h-[400px] lg:max-h-[640px] lg:border-r order-2 lg:order-1 border-t lg:border-t-0"
                  style={{ borderColor: "#141410" }}
                >
                  {filtered.length === 0 && (
                    <div
                      className="p-10 text-center"
                      style={{
                        fontFamily: "var(--font-hanken, sans-serif)",
                        fontWeight: 600,
                        color: "#6A6A60",
                      }}
                    >
                      Nenhum projeto para este filtro.
                    </div>
                  )}

                  {filtered.map((p) => {
                    const isActive = p.id === activeId;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setActiveId(p.id)}
                        onMouseEnter={() => setActiveId(p.id)}
                        className="w-full text-left p-5 lg:p-6 transition-all duration-200 cursor-pointer block border-b"
                        style={{
                          background: isActive ? "#0A1F38" : "transparent",
                          borderColor: "#EEEEE8",
                        }}
                      >
                        <div className="flex items-baseline justify-between gap-3 mb-1">
                          <span
                            style={{
                              fontFamily: "var(--font-hanken, sans-serif)",
                              fontWeight: 900,
                              fontSize: "11px",
                              letterSpacing: "0.18em",
                              color: isActive ? "#6FB8EE" : "#00529B",
                            }}
                          >
                            P-{p.num} Â· {p.segment}
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--font-hanken, sans-serif)",
                              fontWeight: 700,
                              fontSize: "10px",
                              letterSpacing: "0.18em",
                              color: isActive ? "rgba(244,239,230,0.55)" : "#6A6A60",
                              textTransform: "uppercase",
                            }}
                          >
                            {p.state}
                          </span>
                        </div>

                        <h3
                          className="mb-2"
                          style={{
                            fontFamily: "var(--font-hanken, sans-serif)",
                            fontWeight: 800,
                            fontSize: "1.25rem",
                            letterSpacing: "-0.025em",
                            color: isActive ? "#fff" : "#141410",
                            lineHeight: 1.1,
                            margin: 0,
                          }}
                        >
                          {p.title}
                        </h3>

                        <div
                          className="flex items-center gap-1.5"
                          style={{
                            fontFamily: "var(--font-hanken, sans-serif)",
                            fontSize: "12px",
                            color: isActive ? "rgba(244,239,230,0.65)" : "#6A6A60",
                          }}
                        >
                          <MapPin size={11} strokeWidth={2.5} />
                          <span>{p.city}</span>
                          <span className="opacity-50">Â·</span>
                          <span style={{ fontWeight: 700 }}>{p.kwp} kWp</span>
                          <span className="opacity-50">Â·</span>
                          <span style={{ color: isActive ? "#6FB8EE" : "#00529B", fontWeight: 800 }}>
                            R$ {p.economia}/mÃªs
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Map â€” Leaflet real (primeiro no mobile, segundo no desktop) */}
                <div className="relative lg:max-h-[640px] h-[420px] lg:h-auto lg:min-h-[640px] order-1 lg:order-2">
                  <PortfolioMap
                    projects={filtered}
                    activeId={activeId}
                    onActiveChange={setActiveId}
                  />
                </div>
              </div>
            </FadeIn>

            <p
              className="mt-4 text-xs text-center"
              style={{
                fontFamily: "var(--font-hanken, sans-serif)",
                fontWeight: 600,
                color: "#9A9A90",
                letterSpacing: "0.05em",
              }}
            >
              Posicionamento esquemÃ¡tico Â· Passe o mouse ou clique nos pinos para explorar
            </p>
          </div>
        </div>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            FINAL CTA â€” verde brand sÃ³lido, distinto da cream e do footer
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <div className="relative overflow-hidden" style={{ background: "#00529B" }}>
          <div
            className="pointer-events-none absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(168,216,78,0.18) 0%, transparent 70%)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(0,82,155,0.15) 0%, transparent 70%)" }}
          />

          <div className="relative max-w-5xl mx-auto px-6 lg:px-12 py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <FadeIn>
                  <div
                    className="mb-4"
                    style={{
                      fontFamily: "var(--font-hanken, sans-serif)",
                      fontWeight: 700,
                      fontSize: "11px",
                      color: "#6FB8EE",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                    }}
                  >
                    â€” PrÃ³ximo passo
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font-hanken, sans-serif)",
                      fontWeight: 900,
                      fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                      lineHeight: 0.95,
                      letterSpacing: "-0.04em",
                      color: "#fff",
                      margin: 0,
                      marginBottom: "16px",
                    }}
                  >
                    Seu projeto pode ser o<br />
                    <em
                      style={{
                        fontStyle: "italic",
                        fontWeight: 900,
                        color: "#6FB8EE",
                      }}
                    >
                      prÃ³ximo no mapa.
                    </em>
                  </h2>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <p
                    className="text-base lg:text-lg max-w-xl"
                    style={{
                      fontFamily: "var(--font-hanken, sans-serif)",
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.85)",
                    }}
                  >
                    FaÃ§a uma simulaÃ§Ã£o gratuita e veja o potencial solar do seu imÃ³vel.
                  </p>
                </FadeIn>
              </div>

              <div className="lg:col-span-4 flex lg:justify-end">
                <FadeIn delay={0.15}>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center gap-3 px-8 py-4 text-sm rounded-full transition-all duration-300 hover:-translate-y-0.5 group"
                    style={{
                      background: "#fff",
                      color: "#00529B",
                      fontFamily: "var(--font-hanken, sans-serif)",
                      fontWeight: 800,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      boxShadow: "0 12px 32px rgba(10,31,56,0.30)",
                    }}
                  >
                    Iniciar simulaÃ§Ã£o
                    <ArrowRight size={15} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SimulationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
