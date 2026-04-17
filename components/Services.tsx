"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import SimulationModal from "./SimulationModal";

/* ────────────────────────────────────────────────────────────
   DATA
   ──────────────────────────────────────────────────────────── */

const segments = ["Casa", "Agro", "Comércio", "Indústria"];

type Service = {
  num: string;
  title: string;
  paragraphs: string[];
};

const services: Service[] = [
  {
    num: "01",
    title: "Projetos Otimizados",
    paragraphs: [
      "Temos engenheiros especializados em energia solar para realizar o seu projeto com qualidade. Assim você pode ter tranquilidade no investimento que está fazendo.",
      "Nossa equipe fará o levantamento detalhado das suas instalações atuais ou do projeto do imóvel que você está construindo. Também é realizada uma análise estatística da radiação solar no local da sua instalação e consideradas possíveis perdas, como outros prédios mais altos, árvores e efeitos da temperatura local.",
      "Ao final será emitida uma ART junto ao CREA para te dar ainda mais segurança. Também faremos todo o procedimento burocrático com a concessionária de energia local para a liberação de funcionamento do seu sistema de energia solar.",
    ],
  },
  {
    num: "02",
    title: "Instalação Personalizada",
    paragraphs: [
      "Trabalhamos com instalações de energia solar residencial, comercial, industrial e para seu agronegócio. A instalação pode ser feita sobre qualquer tipo de telha, laje ou fixadas diretamente no solo. Também podemos utilizar as próprias placas fotovoltaicas como cobertura para veículos.",
      "A equipe que vai executar a instalação do seu sistema é altamente treinada e capacitada para esse tipo de serviço. Além disso, antes de iniciarmos a instalação, um de nossos engenheiros será designado para supervisionar o serviço. Assim, garantimos uma instalação de qualidade para que o seu sistema dure todos os longos anos que você espera.",
    ],
  },
  {
    num: "03",
    title: "Equipamentos Certificados",
    paragraphs: [
      "Os equipamentos utilizados pela ME Energia Solar são cuidadosamente escolhidos para terem a durabilidade desejada.",
      "Só utilizamos módulos, inversores e estruturas de marcas de qualidade comprovada da marca WEG.",
      "Em parceria com a WEG S.A., a ME é hoje o maior integrador WEG do estado do Espírito Santo e um dos maiores do Brasil.",
    ],
  },
];

const monitoringIntro = [
  "Entregamos uma plataforma de monitoramento exclusiva, que permite acompanhar em tempo real a performance e funcionamento do sistema de energia solar.",
  "Temos também uma equipe de suporte dedicada para esclarecer dúvidas, garantindo que nenhum detalhe importante fique para trás.",
];

const monitoringFeatures = [
  {
    num: "I",
    title: "Geração de Energia",
    text: "Conheça todos os detalhes das suas usinas fotovoltaicas como produção, status e eventos.",
  },
  {
    num: "II",
    title: "Consumo de Energia",
    text: "Acompanhe o consumo de energia das unidades consumidoras e o perfil de consumo dos seus clientes.",
  },
  {
    num: "III",
    title: "Consumo e injeção na rede",
    text: "Saiba a quantidade de energia consumida da rede e injetada na rede e a medição líquida antes de a fatura de energia chegar.",
  },
  {
    num: "IV",
    title: "Manutenção otimizada",
    text: "Realize diagnósticos de forma remota. Desloque a equipe de manutenção somente quando for necessário.",
  },
];

/* ────────────────────────────────────────────────────────────
   FADE IN HOOK
   ──────────────────────────────────────────────────────────── */

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

/* ────────────────────────────────────────────────────────────
   COMPONENT
   ──────────────────────────────────────────────────────────── */

export default function Services() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section id="servicos">

        {/* ════════════════════════════════════════════
            HERO simples
            ════════════════════════════════════════════ */}
        <div id="home" className="relative min-h-[60vh] flex items-end overflow-hidden">
          <Image
            src="/servico.jpeg"
            alt="ME Energia Solar — Serviços"
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, #0A1A08 0%, rgba(10,26,8,0.85) 30%, rgba(10,26,8,0.30) 60%, rgba(10,26,8,0.40) 100%)",
            }}
          />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-16 md:pb-20">
            <FadeIn>
              <div
                className="mb-4"
                style={{
                  fontFamily: "var(--font-hanken, sans-serif)",
                  fontWeight: 700,
                  fontSize: "11px",
                  color: "#A8D84E",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                }}
              >
                — Serviços
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1
                style={{
                  fontFamily: "var(--font-hanken, sans-serif)",
                  fontWeight: 900,
                  fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.04em",
                  color: "#fff",
                  margin: 0,
                  maxWidth: "880px",
                }}
              >
                Temos a solução completa em <em style={{ fontStyle: "italic", color: "#A8D84E" }}>energia solar</em> fotovoltaica.
              </h1>
            </FadeIn>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            SEGMENTS BAR
            ════════════════════════════════════════════ */}
        <div className="border-y" style={{ background: "#fff", borderColor: "#141410", borderTopWidth: "1.5px", borderBottomWidth: "1.5px" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-7">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:gap-x-12">
              {segments.map((s, i) => (
                <div key={s} className="flex items-center gap-6 lg:gap-12">
                  <span
                    style={{
                      fontFamily: "var(--font-hanken, sans-serif)",
                      fontWeight: 800,
                      fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)",
                      color: "#141410",
                      letterSpacing: "-0.02em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s}
                  </span>
                  {i < segments.length - 1 && (
                    <span style={{ color: "#C9C2B4", fontSize: "1.25rem", fontWeight: 300 }}>|</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            SERVIÇOS — texto editorial
            ════════════════════════════════════════════ */}
        <div style={{ background: "#FAFAF7" }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20 md:py-28">

            {services.map((svc, i) => (
              <FadeIn key={svc.num}>
                <article
                  className={`${i > 0 ? "pt-16 lg:pt-20 mt-16 lg:mt-20 border-t" : ""}`}
                  style={i > 0 ? { borderColor: "#C9C2B4" } : {}}
                >
                  <div className="flex items-baseline gap-5 mb-6">
                    <span
                      style={{
                        fontFamily: "var(--font-hanken, sans-serif)",
                        fontWeight: 900,
                        fontSize: "clamp(3rem, 5vw, 4.5rem)",
                        color: "#2D5A00",
                        lineHeight: 0.85,
                        letterSpacing: "-0.05em",
                      }}
                    >
                      {svc.num}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-hanken, sans-serif)",
                        fontWeight: 700,
                        fontSize: "11px",
                        color: "#6A6A60",
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                      }}
                    >
                      Serviço
                    </span>
                  </div>

                  <h2
                    className="mb-8"
                    style={{
                      fontFamily: "var(--font-hanken, sans-serif)",
                      fontWeight: 900,
                      fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                      color: "#141410",
                      letterSpacing: "-0.035em",
                      lineHeight: 1.0,
                      margin: 0,
                    }}
                  >
                    {svc.title}
                  </h2>

                  <div className="space-y-5">
                    {svc.paragraphs.map((p, idx) => (
                      <p
                        key={idx}
                        style={{
                          fontFamily: "var(--font-hanken, sans-serif)",
                          fontWeight: 400,
                          fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
                          color: "#3A3A34",
                          lineHeight: 1.7,
                          margin: 0,
                        }}
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════
            MONITORAMENTO E SUPORTE
            ════════════════════════════════════════════ */}
        <div style={{ background: "#fff" }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20 md:py-28">
            <FadeIn>
              <div className="flex items-baseline gap-5 mb-6">
                <span
                  style={{
                    fontFamily: "var(--font-hanken, sans-serif)",
                    fontWeight: 900,
                    fontSize: "clamp(3rem, 5vw, 4.5rem)",
                    color: "#2D5A00",
                    lineHeight: 0.85,
                    letterSpacing: "-0.05em",
                  }}
                >
                  04
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-hanken, sans-serif)",
                    fontWeight: 700,
                    fontSize: "11px",
                    color: "#6A6A60",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                  }}
                >
                  Serviço
                </span>
              </div>

              <h2
                className="mb-8"
                style={{
                  fontFamily: "var(--font-hanken, sans-serif)",
                  fontWeight: 900,
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                  color: "#141410",
                  letterSpacing: "-0.035em",
                  lineHeight: 1.0,
                  margin: 0,
                }}
              >
                Monitoramento e Suporte em tempo real
              </h2>

              <div className="space-y-5 mb-12">
                {monitoringIntro.map((p, idx) => (
                  <p
                    key={idx}
                    style={{
                      fontFamily: "var(--font-hanken, sans-serif)",
                      fontWeight: 400,
                      fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
                      color: "#3A3A34",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </FadeIn>

            {/* 4 sub-features — lista numerada simples */}
            <div className="space-y-8 lg:space-y-10 pt-8 border-t" style={{ borderColor: "#C9C2B4" }}>
              {monitoringFeatures.map((f, i) => (
                <FadeIn key={f.num} delay={i * 0.04}>
                  <div className="flex gap-5 lg:gap-7">
                    <span
                      className="shrink-0"
                      style={{
                        fontFamily: "var(--font-hanken, sans-serif)",
                        fontWeight: 900,
                        fontStyle: "italic",
                        fontSize: "1.5rem",
                        color: "#2D5A00",
                        lineHeight: 1,
                        minWidth: "3rem",
                      }}
                    >
                      {f.num}
                    </span>
                    <div>
                      <h3
                        className="mb-2"
                        style={{
                          fontFamily: "var(--font-hanken, sans-serif)",
                          fontWeight: 800,
                          fontSize: "clamp(1.125rem, 1.5vw, 1.375rem)",
                          color: "#141410",
                          letterSpacing: "-0.02em",
                          lineHeight: 1.15,
                          margin: 0,
                        }}
                      >
                        {f.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "var(--font-hanken, sans-serif)",
                          fontWeight: 400,
                          fontSize: "1rem",
                          color: "#3A3A34",
                          lineHeight: 1.65,
                          margin: 0,
                        }}
                      >
                        {f.text}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            FINAL CTA — verde brand
            ════════════════════════════════════════════ */}
        <div className="relative overflow-hidden" style={{ background: "#2D5A00" }}>
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
                      color: "#A8D84E",
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
                    Pronto para gerar a sua{" "}
                    <em style={{ fontStyle: "italic", color: "#A8D84E" }}>própria energia?</em>
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
                    Faça uma simulação gratuita e descubra quanto você pode economizar com energia solar.
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
                      color: "#2D5A00",
                      fontFamily: "var(--font-hanken, sans-serif)",
                      fontWeight: 800,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      boxShadow: "0 12px 32px rgba(10,26,8,0.30)",
                    }}
                  >
                    Iniciar simulação
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
