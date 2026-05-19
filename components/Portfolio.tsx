"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";

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

import { PROJECTS } from "@/lib/projects";

const FILTERS = [
  { value: "all", label: "Todos" },
  { value: "ES", label: "Espírito Santo" },
  { value: "BA", label: "Bahia" },
  { value: "Residencial", label: "Residencial" },
  { value: "Comercial", label: "Comercial" },
  { value: "Industrial", label: "Industrial" },
  { value: "Hotelaria", label: "Hotelaria" },
];


export default function Portfolio() {
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

        {/* ════════════════════════════════════════════
            HERO
            ════════════════════════════════════════════ */}
        <div className="relative min-h-[70vh] flex items-end overflow-hidden">
          <Image
            src="/Portfolio/img/painelportifolio.jpg"
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
                — Portfólio
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
                Cada instalação é dimensionada para o porte, consumo e topografia do cliente — engenharia desenhada na ME, executada em todo Espírito Santo e sul da Bahia.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            STATS BAR
            ════════════════════════════════════════════ */}
        <div className="border-y-2" style={{ background: "#fff", borderColor: "#141410" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 lg:py-14">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8">
              {[
                { value: PROJECTS.length.toString().padStart(2, "0"), label: "Projetos executados" },
                { value: `${Math.round(totalKwp)}+`, unit: "kWp", label: "Potência instalada" },
                { value: totalModulos.toLocaleString("pt-BR"), label: "Módulos instalados" },
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

        {/* ════════════════════════════════════════════
            FILTERS + MAP + LIST
            ════════════════════════════════════════════ */}
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
                    — Explore
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
                className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]"
                style={{
                  border: "1.5px solid #141410",
                  background: "#fff",
                }}
              >
                {/* List — segundo no mobile, primeiro no desktop */}
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
                            P-{p.num} · {p.segment}
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
                          <span className="opacity-50">·</span>
                          <span style={{ fontWeight: 700 }}>{p.kwp} kWp</span>
                          <span className="opacity-50">·</span>
                          <span style={{ color: isActive ? "#6FB8EE" : "#00529B", fontWeight: 800 }}>
                            R$ {p.economia}/mês
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Map — Leaflet real (primeiro no mobile, segundo no desktop) */}
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
              Posicionamento esquemático · Passe o mouse ou clique nos pinos para explorar
            </p>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            FINAL CTA — verde brand sólido, distinto da cream e do footer
            ════════════════════════════════════════════ */}
        <div className="relative overflow-hidden" style={{ background: "linear-gradient(90deg, #68AF25 0%, #00529B 100%)" }}>
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
                    — Próximo passo
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
                    Seu projeto pode ser<br />
                    <em style={{ fontStyle: "italic", fontWeight: 900, color: "#fff" }}>
                      o próximo no mapa.
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
                    Faça uma simulação gratuita e veja o potencial solar do seu imóvel.
                  </p>
                </FadeIn>
              </div>

              <div className="lg:col-span-4 flex lg:justify-end">
                <FadeIn delay={0.15}>
                  <Button
                    as="link"
                    href="/orcamento"
                    variant="outline-light"
                    size="lg"
                    iconRight={<ArrowRight size={15} strokeWidth={2.5} />}
                  >
                    Iniciar simulação
                  </Button>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
