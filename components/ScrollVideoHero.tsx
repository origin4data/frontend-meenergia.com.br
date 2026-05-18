"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";
import SimulationModal from "./SimulationModal";

const cards = [
  {
    image: "/card/sol-pilha-verde.png",
    text: "Economize em até 95% na sua conta de energia.",
  },
  {
    image: "/card/tomada.card.png",
    text: "Tenha liberdade e independência energética.",
  },
  {
    image: "/card/casa-planta-verde.png",
    text: "Valorize seu imóvel, tornando-o sustentável.",
  },
  {
    image: "/card/painel-solar-verde.png",
    text: "Tecnologia WEG com até 25 anos de garantia.",
  },
];

export default function ScrollVideoHero() {
  const [modalOpen, setModalOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);
  const targetTimeRef = useRef<number>(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const contentY = useTransform(scrollYProgress, [0.75, 0.9], [40, 0]);

  // frase de impacto inicial — desaparece quando o usuário começa a rolar
  const introOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.06], [0, -30]);
  const introScale = useTransform(scrollYProgress, [0, 0.06], [1, 0.95]);

  // filtro do vídeo — blur no início (frase visível) e no final (conteúdo)
  const videoFilter = useTransform(scrollYProgress, (p) => {
    if (p < 0.08) {
      const t = p / 0.08;
      const blur = 8 * (1 - t);
      const brightness = 0.55 + 0.45 * t;
      return `blur(${blur}px) brightness(${brightness})`;
    }
    if (p > 0.7) {
      const t = Math.min((p - 0.7) / 0.15, 1);
      const blur = 12 * t;
      const brightness = 1 - 0.6 * t;
      return `blur(${blur}px) brightness(${brightness})`;
    }
    return "none";
  });

  const videoScale = useTransform(scrollYProgress, (p) => {
    if (p < 0.08) return 1.04 - 0.04 * (p / 0.08);
    if (p > 0.7) return 1 + 0.05 * Math.min((p - 0.7) / 0.15, 1);
    return 1;
  });

  const updateVideoTime = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const current = video.currentTime;
    const target = targetTimeRef.current;
    const diff = target - current;

    if (Math.abs(diff) < 0.01) return;

    video.currentTime = current + diff * 0.3;
    rafRef.current = requestAnimationFrame(updateVideoTime);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    targetTimeRef.current = progress * video.duration;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateVideoTime);

    setShowContent(progress > 0.75);
    setShowIntro(progress < 0.1);
  });

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative"
      style={{ height: "300vh", background: "#0A1F38" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Vídeo — blur no início (frase) e no final (conteúdo) */}
        <motion.video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            filter: videoFilter,
            scale: videoScale,
          }}
          src="/video-sol-scrub.mp4"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />

        {/* Frase de impacto — visível no time 0 do vídeo */}
        {showIntro && (
        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
          style={{ opacity: introOpacity, y: introY, scale: introScale }}
        >
          {/* Logo watermark atrás do texto */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: -1 }}
          >
            <Image
              src="/logo-mundo-eletrico.png"
              alt=""
              width={1400}
              height={420}
              priority
              className="object-contain w-[90vw] max-w-[1400px] h-auto"
              style={{
                opacity: 0.05,
                filter: "brightness(0) invert(1)",
              }}
            />
          </div>

          {/* Eyebrow masthead */}
          <div className="flex items-center gap-3 mb-8">
            <span
              className="text-[10px] uppercase tracking-[0.32em]"
              style={{
                color: "rgba(255,255,255,0.65)",
                fontFamily: "var(--font-mono, monospace)",
                textShadow: "0 2px 12px rgba(0,0,0,0.5)",
                fontWeight: 500,
              }}
            >
              ME · Energia Solar
            </span>
            <div className="h-px w-12" style={{ background: "rgba(255,255,255,0.45)" }} />
            <span
              className="text-[10px] uppercase tracking-[0.32em]"
              style={{
                color: "rgba(255,255,255,0.65)",
                fontFamily: "var(--font-mono, monospace)",
                textShadow: "0 2px 12px rgba(0,0,0,0.5)",
                fontWeight: 500,
              }}
            >
              Desde 1991
            </span>
          </div>

          {/* Headline — direta, peso máximo */}
          <h2
            className="mb-6"
            style={{
              fontFamily: "var(--font-hero, sans-serif)",
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              fontSize: "clamp(3.5rem, 11vw, 9.5rem)",
              color: "#ffffff",
              textShadow: "0 6px 48px rgba(0,0,0,0.6)",
              textTransform: "uppercase",
            }}
          >
            O sol é{" "}
            <span
              style={{
                background: "#6FB8EE",
                color: "#0A1F38",
                padding: "0 0.25em",
                display: "inline-block",
                lineHeight: 1,
                textShadow: "none",
              }}
            >
              seu.
            </span>
          </h2>

          {/* Subtitle */}
          <p
            className="max-w-[36rem]"
            style={{
              fontFamily: "var(--font-jakarta, sans-serif)",
              fontWeight: 500,
              fontSize: "clamp(1.05rem, 1.6vw, 1.4rem)",
              lineHeight: 1.45,
              color: "rgba(255,255,255,0.88)",
              textShadow: "0 2px 16px rgba(0,0,0,0.6)",
              letterSpacing: "0",
            }}
          >
            Transforme cada raio em independência energética.
          </p>
        </motion.div>
        )}

        {/* Badge WEG + indicador de scroll — direita centro vertical (oculto no mobile) */}
        <div
          className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-5 transition-opacity duration-700"
          style={{ opacity: showContent ? 0 : 1, pointerEvents: showContent ? "none" : "auto" }}
        >
          {/* WEG logo limpo */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="rounded-full overflow-hidden"
              style={{
                width: 64,
                height: 64,
                boxShadow: "0 8px 24px rgba(0,0,0,0.35), 0 0 0 2px rgba(255,255,255,0.18)",
              }}
            >
              <Image
                src="/weglogo.png"
                alt="Integrador WEG"
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>
            <span
              className="text-[10px] uppercase tracking-[0.28em] text-center whitespace-nowrap"
              style={{
                color: "rgba(255,255,255,0.85)",
                fontFamily: "var(--font-mono, monospace)",
                fontWeight: 600,
                textShadow: "0 2px 12px rgba(0,0,0,0.6)",
              }}
            >
              Integrador<br />Oficial
            </span>
          </div>

          {/* Divisor vertical */}
          <div
            className="w-px h-10"
            style={{ background: "rgba(255,255,255,0.30)" }}
          />

          {/* Indicador scroll — Archivo bold */}
          <div className="flex flex-col items-center gap-3">
            <span
              className="whitespace-nowrap"
              style={{
                fontFamily: "var(--font-hero, sans-serif)",
                fontWeight: 900,
                fontSize: "0.875rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#ffffff",
                textShadow: "0 2px 12px rgba(0,0,0,0.6)",
              }}
            >
              Role
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5 animate-bounce"
              style={{
                color: "#6FB8EE",
                filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))",
              }}
            >
              <path
                d="M12 5v14M6 13l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Overlay escuro — reforça o foco no texto */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background: "linear-gradient(to bottom, rgba(8,20,4,0.75) 0%, rgba(8,20,4,0.40) 35%, rgba(8,20,4,0.70) 70%, rgba(8,20,4,0.95) 100%)",
            opacity: showContent ? 1 : 0,
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(61,122,0,0.18) 0%, transparent 70%)",
            opacity: showContent ? 1 : 0,
          }}
        />

        {/* Conteúdo — texto, CTAs, cards */}
        <motion.div
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pt-20 pb-4 lg:pt-32 lg:pb-8 transition-opacity duration-700"
          style={{ opacity: showContent ? 1 : 0, y: contentY, pointerEvents: showContent ? "auto" : "none" }}
        >
          <div className="flex flex-col items-center gap-4 lg:gap-7 max-w-4xl w-full">
            {/* Eyebrow masthead */}
            <div className="flex items-center gap-3">
              <span
                className="text-[10px] uppercase tracking-[0.32em]"
                style={{
                  color: "rgba(168,216,78,0.85)",
                  fontFamily: "var(--font-mono, monospace)",
                  fontWeight: 600,
                }}
              >
                Cap. 00 · Convite
              </span>
              <div className="h-px w-10" style={{ background: "rgba(168,216,78,0.45)" }} />
            </div>

            {/* Headline — Two-tier: pre-title + palavra gigante */}
            <div className="text-center">
              <div
                className="mb-2"
                style={{
                  fontFamily: "var(--font-hero, sans-serif)",
                  fontWeight: 600,
                  fontSize: "clamp(1.125rem, 2.2vw, 1.75rem)",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.82)",
                  textShadow: "0 2px 16px rgba(0,0,0,0.5)",
                }}
              >
                Que tal gerar sua
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-hero, sans-serif)",
                  fontWeight: 900,
                  lineHeight: 0.85,
                  letterSpacing: "-0.05em",
                  fontSize: "clamp(3.5rem, 11vw, 9rem)",
                  textTransform: "uppercase",
                  textShadow: "0 6px 48px rgba(0,0,0,0.5)",
                  color: "#ffffff",
                  margin: 0,
                }}
              >
                Própria
                <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #2E8DD6 0%, #2E8DD6 48%, #00529B 52%, #00529B 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    display: "inline-block",
                  }}
                >
                  Energia?
                </span>
              </h1>
            </div>

            {/* Subheading */}
            <p
              style={{
                fontFamily: "var(--font-jakarta, sans-serif)",
                fontWeight: 500,
                fontSize: "clamp(1.05rem, 1.6vw, 1.4rem)",
                lineHeight: 1.45,
                color: "rgba(255,255,255,0.85)",
                maxWidth: "620px",
                textAlign: "center",
                letterSpacing: "0",
              }}
            >
              Economize <span style={{ color: "#6FB8EE", fontWeight: 700 }}>até 95%</span> na conta de luz com soluções para residências, empresas e indústrias.
            </p>

            {/* CTAs editorial */}
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 pt-2">
              <button
                onClick={() => setModalOpen(true)}
                className="group inline-flex items-center gap-3 transition-all duration-300"
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "11px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  fontWeight: 600,
                }}
              >
                <span style={{ borderBottom: "1px solid #ffffff", paddingBottom: "4px" }}>
                  Iniciar Simulação
                </span>
                <span
                  className="inline-flex items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1"
                  style={{ width: 36, height: 36, background: "#6FB8EE", color: "#0A1F38" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>

              <Link
                href="#sobre"
                className="group inline-flex items-center gap-2 transition-all duration-300"
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "11px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.65)",
                  fontWeight: 500,
                }}
              >
                <span style={{ borderBottom: "1px dotted rgba(255,255,255,0.45)", paddingBottom: "3px" }}>
                  Conheça nosso trabalho
                </span>
              </Link>
            </div>
          </div>

          {/* Cards — editorial */}
          <div className="w-full max-w-5xl mx-auto px-6 lg:px-10 mt-5 lg:mt-14">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-5">
              {cards.map((card, i) => (
                <div
                  key={i}
                  className="group flex flex-col items-start gap-2 lg:gap-3 px-3 py-3 lg:px-5 lg:py-6 transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    borderRadius: "2px",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}
                >
                  <div className="flex items-baseline gap-2.5 w-full">
                    <span
                      className="italic"
                      style={{
                        fontFamily: "var(--font-serif, serif)",
                        fontStyle: "italic",
                        fontWeight: 400,
                        fontSize: "1.5rem",
                        color: "#6FB8EE",
                        lineHeight: 1,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Image
                      src={card.image}
                      alt=""
                      width={36}
                      height={36}
                      className="object-contain ml-auto opacity-90 transition-transform duration-300 group-hover:scale-110 w-7 h-7 lg:w-9 lg:h-9"
                    />
                  </div>
                  <div
                    className="w-full h-px"
                    style={{ background: "rgba(255,255,255,0.12)" }}
                  />
                  <p
                    className="text-[11px] lg:text-[13px] leading-snug text-left"
                    style={{
                      color: "rgba(255,255,255,0.85)",
                      fontFamily: "var(--font-jakarta, sans-serif)",
                      fontWeight: 400,
                    }}
                  >
                    {card.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <SimulationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
