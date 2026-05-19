import Link from "next/link";
import Image from "next/image";

const cards = [
  {
    image: "/Home/img/card/sol-pilha-verde.png",
    text: "Economize em até 95% na sua conta de energia.",
  },
  {
    image: "/Home/img/card/tomada.card.png",
    text: "Tenha liberdade e independência energética.",
  },
  {
    image: "/Home/img/card/casa-planta-verde.png",
    text: "Valorize seu imóvel, tornando-o sustentável.",
  },
  {
    image: "/Home/img/card/painel-solar-verde.png",
    text: "Tecnologia WEG com até 25 anos de garantia.",
  },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#0A1F38" }}
    >
      {/* ── Video ── */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/Home/img/mevideo.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{ filter: "blur(2px)", transform: "scale(1.05)" }}
      />

      {/* ── Layered Overlays ── */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(to bottom, rgba(8,18,40,0.75) 0%, rgba(8,18,40,0.40) 35%, rgba(8,18,40,0.70) 70%, rgba(8,18,40,0.95) 100%)"
      }} />
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,102,189,0.18) 0%, transparent 70%)"
      }} />

      {/* ── Content ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-32 pb-8">
        <div className="flex flex-col items-center gap-5 max-w-4xl w-full">

          {/* Headline */}
          <div className="flex flex-col items-center" style={{ gap: "0.05em" }}>
            <h1
              style={{
                fontFamily: "var(--font-display, sans-serif)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#ffffff",
                fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
              }}
            >
              Que tal gerar sua
            </h1>
            <h1
              style={{
                fontFamily: "var(--font-display, sans-serif)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
                background: "linear-gradient(135deg, #68AF25 0%, #A8D84E 60%, #68AF25 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              própria energia?
            </h1>
          </div>

          {/* Subheading */}
          <p
            style={{
              fontFamily: "var(--font-jakarta, sans-serif)",
              fontWeight: 400,
              fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.72)",
              maxWidth: "560px",
            }}
          >
            Economize{" "}
            <span style={{ color: "#5BAEEA", fontWeight: 600 }}>até 95%</span>{" "}
            na conta de luz com soluções de energia solar para{" "}
            <span style={{ color: "rgba(255,255,255,0.90)" }}>residências</span>,{" "}
            <span style={{ color: "rgba(255,255,255,0.90)" }}>empresas</span> e{" "}
            <span style={{ color: "rgba(255,255,255,0.90)" }}>indústrias</span>.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
            <Link
              href="/orcamento"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #0066BD, #2E8DD6)",
                borderRadius: "2rem",
                boxShadow: "0 8px 32px rgba(0,102,189,0.55)",
                fontFamily: "var(--font-jakarta, sans-serif)",
                letterSpacing: "0.01em",
              }}
            >
              Simulação gratuita
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="#sobre"
              className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:opacity-100 px-4 py-3.5"
              style={{
                color: "rgba(255,255,255,0.55)",
                fontFamily: "var(--font-jakarta, sans-serif)",
              }}
            >
              Conheça nosso trabalho
            </Link>
          </div>
        </div>
      </div>

      {/* ── Cards ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-10 pb-14 lg:pb-24 laptop:pb-32">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-4 rounded-2xl px-5 py-6 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.20)",
              }}
            >
              <Image
                src={card.image}
                alt=""
                width={52}
                height={52}
                className="object-contain"
              />
              <p
                className="text-sm font-semibold leading-snug"
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: "var(--font-jakarta, sans-serif)",
                }}
              >
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
