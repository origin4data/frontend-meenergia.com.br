"use client";

import { useState } from "react";
import Image from "next/image";
import SimulationModal from "./SimulationModal";

const stats = [
  { kicker: "Fundação", value: "1991", caption: "três décadas de campo" },
  { kicker: "Sedes", value: "03", caption: "São Mateus, Linhares, Tx. de Freitas" },
  { kicker: "Cobertura", value: "ES + BA", caption: "todo o Sudeste" },
  { kicker: "Integrador", value: "WEG", caption: "maior do Espírito Santo" },
];

const principios = [
  { numero: "I", titulo: "Suporte técnico", texto: "Engenheiros e eletrotécnicos próprios para projetos completos." },
  { numero: "II", titulo: "Multi-segmento", texto: "Casas, comércios, indústrias e o agronegócio." },
  { numero: "III", titulo: "Acessibilidade", texto: "Condições diferenciadas para cada porte de cliente." },
];

export default function Sobre() {
  const [modalOpen, setModalOpen] = useState(false);
  const [videoActive, setVideoActive] = useState(false);

  return (
    <section
      id="sobre"
      className="relative py-28 lg:py-40 overflow-hidden"
      style={{
        background: "#F4EFE6",
        color: "#1A1A14",
      }}
    >
      {/* Grain noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-12">

        {/* ── Top masthead ── */}
        <div className="flex items-end justify-between mb-16 lg:mb-24 gap-6">
          <div className="flex items-baseline gap-4 lg:gap-6">
            <span
              className="text-[10px] lg:text-[11px] uppercase tracking-[0.32em] font-medium"
              style={{
                color: "#7A7565",
                fontFamily: "var(--font-mono, monospace)",
              }}
            >
              Cap. 01
            </span>
            <div className="h-px w-12 lg:w-20" style={{ background: "#1A1A14" }} />
            <span
              className="text-[10px] lg:text-[11px] uppercase tracking-[0.32em] font-medium"
              style={{
                color: "#1A1A14",
                fontFamily: "var(--font-mono, monospace)",
              }}
            >
              Sobre a ME Energia
            </span>
          </div>
          <span
            className="hidden md:inline text-[10px] uppercase tracking-[0.32em]"
            style={{
              color: "#7A7565",
              fontFamily: "var(--font-mono, monospace)",
            }}
          >
            Edição Especial · Solar
          </span>
        </div>

        {/* ── Hero editorial: ano massivo + headline ── */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 mb-20 lg:mb-28">

          {/* Year — coluna 1-5 */}
          <div className="col-span-12 md:col-span-5 lg:col-span-5 relative">
            <div className="relative">
              <span
                className="block leading-[0.8]"
                style={{
                  fontFamily: "var(--font-serif, serif)",
                  fontWeight: 300,
                  fontSize: "clamp(5.5rem, 18vw, 16rem)",
                  letterSpacing: "-0.04em",
                  color: "#1A1A14",
                  fontFeatureSettings: "'ss01', 'ss02'",
                }}
              >
                1991
              </span>
              <span
                className="hidden md:inline absolute top-2 -right-1 lg:right-4 text-[10px] uppercase tracking-[0.3em] rotate-90 origin-top-right"
                style={{
                  color: "#7A7565",
                  fontFamily: "var(--font-mono, monospace)",
                }}
              >
                Anno Solis
              </span>
            </div>
            <p
              className="mt-2 italic text-base lg:text-lg max-w-[18rem]"
              style={{
                fontFamily: "var(--font-serif, serif)",
                fontWeight: 400,
                color: "#3A3530",
                lineHeight: 1.4,
              }}
            >
              o ano em que decidimos transformar luz em independência.
            </p>
          </div>

          {/* Headline — coluna 6-12 */}
          <div className="col-span-12 md:col-span-7 lg:col-span-7 flex flex-col justify-end">
            <h2
              style={{
                fontFamily: "var(--font-serif, serif)",
                fontWeight: 400,
                fontSize: "clamp(2.6rem, 5.5vw, 5.5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
                color: "#1A1A14",
              }}
            >
              A maior empresa
              <br />
              de energia solar
              <br />
              do{" "}
              <em
                style={{
                  fontFamily: "var(--font-serif, serif)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  background: "linear-gradient(135deg, #2D5A00, #68AF25)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Sudeste.
              </em>
            </h2>
          </div>
        </div>

        {/* ── Corpo editorial: 2 colunas asimétricas ── */}
        <div className="grid grid-cols-12 gap-x-6 lg:gap-x-12 gap-y-16 mb-24 lg:mb-32">

          {/* Coluna texto — 7 cols */}
          <div className="col-span-12 lg:col-span-7">
            {/* Drop cap paragraph */}
            <p
              className="text-lg lg:text-xl leading-[1.55] mb-6"
              style={{
                fontFamily: "var(--font-jakarta, sans-serif)",
                fontWeight: 400,
                color: "#1A1A14",
              }}
            >
              <span
                className="float-left mr-3 mt-1"
                style={{
                  fontFamily: "var(--font-serif, serif)",
                  fontWeight: 700,
                  fontSize: "clamp(3.5rem, 7vw, 6rem)",
                  lineHeight: 0.85,
                  color: "#2D5A00",
                  marginTop: "0.05em",
                }}
              >
                T
              </span>
              rabalhando no setor de energia solar desde 1991, a ME atende clientes de todos os portes com eficiência, competitividade, qualidade e segurança. Da residência ao agronegócio, do telhado ao terreno — uma operação completa, feita por gente que entende de sol.
            </p>

            <p
              className="text-base lg:text-lg leading-[1.7] mb-8"
              style={{
                fontFamily: "var(--font-jakarta, sans-serif)",
                fontWeight: 300,
                color: "#3A3530",
              }}
            >
              Com sede em <strong style={{ fontWeight: 600, color: "#1A1A14" }}>São Mateus (ES)</strong> e filiais em <strong style={{ fontWeight: 600, color: "#1A1A14" }}>Linhares (ES)</strong> e <strong style={{ fontWeight: 600, color: "#1A1A14" }}>Teixeira de Freitas (BA)</strong>, cobrimos todo o Espírito Santo e o sul da Bahia com a mais moderna linha fotovoltaica do mercado.
            </p>

            {/* Pull quote */}
            <blockquote
              className="relative pl-6 lg:pl-8 my-10 border-l-2"
              style={{ borderColor: "#2D5A00" }}
            >
              <p
                className="italic text-xl lg:text-2xl leading-snug"
                style={{
                  fontFamily: "var(--font-serif, serif)",
                  fontWeight: 400,
                  color: "#1A1A14",
                  letterSpacing: "-0.01em",
                }}
              >
                &ldquo;Mais que economia. Construímos um futuro com energia limpa para as próximas gerações.&rdquo;
              </p>
              <footer
                className="mt-3 text-[11px] uppercase tracking-[0.22em]"
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  color: "#7A7565",
                }}
              >
                — Princípio Fundador
              </footer>
            </blockquote>

            {/* CTA editorial */}
            <button
              onClick={() => setModalOpen(true)}
              className="group inline-flex items-center gap-3 mt-2 transition-all duration-300"
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "11px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#1A1A14",
                fontWeight: 600,
              }}
            >
              <span
                className="relative pb-1"
                style={{
                  borderBottom: "1px solid #1A1A14",
                }}
              >
                Iniciar Simulação
              </span>
              <span
                className="inline-flex items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1"
                style={{
                  width: 32,
                  height: 32,
                  background: "#1A1A14",
                  color: "#F4EFE6",
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </div>

          {/* Coluna imagem/vídeo — 5 cols, com offset */}
          <div className="col-span-12 lg:col-span-5 lg:pt-24">
            <figure className="relative">
              <div
                className="relative overflow-hidden aspect-[4/5]"
                style={{
                  borderRadius: "2px",
                }}
              >
                {!videoActive ? (
                  <>
                    <Image
                      src="/servicos/placa-solar-pousada-mundo-eletrico-site-2023.jpg"
                      alt="Painéis solares fotovoltaicos instalados pela ME Energia"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                      style={{ filter: "saturate(0.85) contrast(1.05)" }}
                    />

                    <button
                      onClick={() => setVideoActive(true)}
                      className="absolute inset-0 flex items-center justify-center group"
                      style={{ background: "rgba(26,26,20,0.18)" }}
                      aria-label="Reproduzir vídeo"
                    >
                      <div
                        className="flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          width: 96,
                          height: 96,
                          borderRadius: "50%",
                          background: "#F4EFE6",
                          boxShadow: "0 0 0 1px rgba(26,26,20,0.10), 0 18px 50px rgba(26,26,20,0.4)",
                        }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 ml-1">
                          <path d="M8 5v14l11-7z" fill="#1A1A14" />
                        </svg>
                      </div>
                    </button>

                    {/* Frame number */}
                    <div
                      className="absolute top-4 left-4 px-2 py-1 text-[10px] uppercase tracking-[0.25em]"
                      style={{
                        fontFamily: "var(--font-mono, monospace)",
                        color: "#F4EFE6",
                        background: "rgba(26,26,20,0.55)",
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      Frame 01 · Painéis
                    </div>
                  </>
                ) : (
                  <video
                    src="/placa.mp4"
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    controls
                    playsInline
                    preload="auto"
                  />
                )}
              </div>

              {/* Caption italic — magazine style */}
              <figcaption className="mt-4 flex items-start gap-3">
                <span
                  className="text-[10px] uppercase tracking-[0.3em] mt-1 shrink-0"
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    color: "#7A7565",
                  }}
                >
                  Fig. 01
                </span>
                <p
                  className="italic text-sm leading-relaxed"
                  style={{
                    fontFamily: "var(--font-serif, serif)",
                    fontWeight: 400,
                    color: "#3A3530",
                  }}
                >
                  Painéis solares fotovoltaicos WEG em instalação real. Toque para reproduzir o vídeo.
                </p>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* ── Stats strip — masthead horizontal ── */}
        <div
          className="border-t border-b py-10 lg:py-14 mb-24 lg:mb-32"
          style={{ borderColor: "#1A1A14" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 lg:divide-x" style={{ borderColor: "#C9C2B4" }}>
            {stats.map((s, i) => (
              <div
                key={s.kicker}
                className={`px-0 ${i > 0 ? "lg:pl-10" : ""} ${i < stats.length - 1 ? "lg:pr-10" : ""}`}
                style={i > 0 ? { borderLeft: "1px solid #C9C2B4" } : {}}
              >
                <div
                  className="text-[10px] uppercase tracking-[0.32em] mb-3"
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    color: "#7A7565",
                  }}
                >
                  {s.kicker}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-serif, serif)",
                    fontWeight: 400,
                    fontSize: "clamp(2.5rem, 4.5vw, 3.75rem)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.025em",
                    color: "#1A1A14",
                  }}
                >
                  {s.value}
                </div>
                <div
                  className="text-xs mt-2 italic"
                  style={{
                    fontFamily: "var(--font-serif, serif)",
                    color: "#5A5448",
                  }}
                >
                  {s.caption}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bloco WEG: tratamento diferente, fundo escuro ── */}
        <div
          className="relative overflow-hidden p-8 md:p-12 lg:p-16"
          style={{
            background: "#1A1A14",
            color: "#F4EFE6",
            borderRadius: "2px",
          }}
        >
          {/* Decoração */}
          <div
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(168,216,78,0.10) 0%, transparent 70%)",
            }}
          />

          <div className="relative grid grid-cols-12 gap-x-6 gap-y-10">
            {/* Eyebrow + Lockup logos */}
            <div className="col-span-12 lg:col-span-3">
              <div
                className="text-[10px] uppercase tracking-[0.32em] mb-5"
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  color: "#A8D84E",
                }}
              >
                Cap. 02 · Parceria
              </div>

              {/* Logos lockup: ME × WEG */}
              <div className="flex items-center gap-4 mb-5">
                {/* ME logo */}
                <div className="shrink-0">
                  <Image
                    src="/logo-mundo-eletrico.png"
                    alt="ME Energia Solar"
                    width={120}
                    height={40}
                    className="h-10 w-auto object-contain brightness-0 invert"
                  />
                </div>

                {/* × separator */}
                <span
                  style={{
                    fontFamily: "var(--font-serif, serif)",
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "2rem",
                    color: "#A8D84E",
                    lineHeight: 1,
                  }}
                >
                  ×
                </span>

                {/* WEG logo */}
                <div
                  className="shrink-0 rounded-full overflow-hidden flex items-center justify-center"
                  style={{
                    width: 56,
                    height: 56,
                    background: "#fff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                  }}
                >
                  <Image
                    src="/weglogo.png"
                    alt="WEG"
                    width={56}
                    height={56}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <div
                className="text-[11px] uppercase tracking-[0.22em]"
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  color: "rgba(244,239,230,0.55)",
                  fontWeight: 600,
                }}
              >
                Integrador<br />Oficial
              </div>
            </div>

            {/* Texto */}
            <div className="col-span-12 lg:col-span-6">
              <p
                className="text-base lg:text-lg leading-relaxed mb-5"
                style={{
                  fontFamily: "var(--font-jakarta, sans-serif)",
                  fontWeight: 300,
                  color: "rgba(244,239,230,0.92)",
                }}
              >
                Em parceria com a <strong style={{ fontWeight: 600, color: "#fff" }}>WEG S.A.</strong>, somos hoje o <strong style={{ fontWeight: 600, color: "#fff" }}>maior integrador WEG do Espírito Santo</strong> e um dos maiores do Brasil. Equipe formada por engenheiros e eletrotécnicos com experiência em sistemas <em style={{ fontFamily: "var(--font-serif, serif)" }}>On-Grid</em> e <em style={{ fontFamily: "var(--font-serif, serif)" }}>Off-Grid</em> — residenciais, comerciais e industriais.
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{
                  fontFamily: "var(--font-jakarta, sans-serif)",
                  fontWeight: 300,
                  color: "rgba(244,239,230,0.65)",
                }}
              >
                Trabalhamos dentro das normas de segurança do trabalho, engenharia elétrica e civil — princípios éticos antes de qualquer entrega.
              </p>
            </div>

            {/* Princípios numerados */}
            <div className="col-span-12 lg:col-span-3">
              <div
                className="text-[10px] uppercase tracking-[0.32em] mb-5"
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  color: "rgba(244,239,230,0.55)",
                }}
              >
                Princípios
              </div>
              <ul className="space-y-5">
                {principios.map((p) => (
                  <li key={p.numero} className="flex gap-4">
                    <span
                      style={{
                        fontFamily: "var(--font-serif, serif)",
                        fontStyle: "italic",
                        fontSize: "20px",
                        color: "#A8D84E",
                        lineHeight: 1,
                        fontWeight: 400,
                        minWidth: "1.5rem",
                      }}
                    >
                      {p.numero}
                    </span>
                    <div>
                      <div
                        className="text-sm font-semibold mb-0.5"
                        style={{
                          fontFamily: "var(--font-jakarta, sans-serif)",
                          color: "#fff",
                        }}
                      >
                        {p.titulo}
                      </div>
                      <div
                        className="text-xs leading-relaxed"
                        style={{
                          fontFamily: "var(--font-jakarta, sans-serif)",
                          color: "rgba(244,239,230,0.55)",
                          fontWeight: 300,
                        }}
                      >
                        {p.texto}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <SimulationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
