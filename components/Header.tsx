"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Sobre", href: "/#sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Portfólio", href: "/portfolio" },
  { label: "Orçamento", href: "/orcamento" },
];

const PHONE = "+55 27 99721-9703";
const PHONE_HREF = "tel:+5527997219703";
const WHATSAPP_HREF = "https://wa.me/5527997219703";
const EMAIL = "Contato@Meenergia.com.br";
const EMAIL_HREF = "mailto:Contato@Meenergia.com.br";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const HEADER_HEIGHT = 80;
    let mounted = true;
    let rafId = 0;

    const onScroll = () => {
      if (!mounted) return;
      if (window.scrollY < 30) {
        setScrolled(false);
        return;
      }
      const heroEl = document.getElementById("home");
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        setScrolled(rect.bottom < HEADER_HEIGHT);
      } else {
        setScrolled(true);
      }
    };

    onScroll();
    rafId = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      mounted = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const textColor = scrolled ? "#141410" : "rgba(255,255,255,0.92)";
  const mutedColor = scrolled ? "#6A6A60" : "rgba(255,255,255,0.70)";
  const dividerColor = scrolled ? "#DEDED6" : "rgba(255,255,255,0.20)";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(250,250,247,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px) saturate(140%)" : "none",
        borderBottom: scrolled ? "1px solid #EEEEE8" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 gap-6">

          {/* ── Logo ── */}
          <Link href="/#home" className="shrink-0">
            <Image
              src="/logo-mundo-eletrico.png"
              alt="ME Energia Solar"
              width={180}
              height={54}
              className="h-8 md:h-9 lg:h-10 laptop:h-11 w-auto object-contain transition-all duration-300"
              style={{ filter: scrolled ? "brightness(0) saturate(100%)" : "none" }}
              priority
            />
          </Link>

          {/* ── Desktop Navigation ── */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium tracking-wide whitespace-nowrap rounded-lg transition-all duration-200"
                style={{ color: textColor, fontFamily: "var(--font-jakarta, sans-serif)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = scrolled ? "#00529B" : "rgba(255,255,255,0.10)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = textColor;
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Right: Contacts + CTA ── */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">

            <a
              href={PHONE_HREF}
              className="flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: mutedColor, fontFamily: "var(--font-jakarta, sans-serif)" }}
            >
              <PhoneIcon />
              {PHONE}
            </a>

            <div className="hidden xl:block h-4 w-px" style={{ background: dividerColor }} />

            <a
              href={EMAIL_HREF}
              className="hidden xl:flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: mutedColor, fontFamily: "var(--font-jakarta, sans-serif)" }}
            >
              <MailIcon />
              {EMAIL}
            </a>

            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-px whitespace-nowrap ml-1"
              style={{
                background: "#68AF25",
                borderRadius: "2rem",
                boxShadow: "0 4px 16px rgba(61,122,0,0.40)",
                fontFamily: "var(--font-jakarta, sans-serif)",
              }}
            >
              <WhatsappIcon />
              WhatsApp
            </a>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg transition-colors"
            style={{ background: menuOpen ? (scrolled ? "#F2F2ED" : "rgba(255,255,255,0.10)") : "transparent" }}
            aria-label="Abrir menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-5 h-0.5 transition-all duration-300 origin-center"
                style={{
                  background: scrolled ? "#141410" : "#fff",
                  transform:
                    i === 0 && menuOpen ? "rotate(45deg) translateY(8px)"
                    : i === 1 && menuOpen ? "scaleX(0)"
                    : i === 2 && menuOpen ? "rotate(-45deg) translateY(-8px)"
                    : "none",
                  opacity: i === 1 && menuOpen ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? "460px" : "0px",
          opacity: menuOpen ? 1 : 0,
          background: "rgba(250,250,247,0.98)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid #DEDED6",
        }}
      >
        <nav className="flex flex-col px-6 pb-6 pt-2 gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-3 text-sm font-medium rounded-lg transition-colors"
              style={{ color: "#3A3A34" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#00529B";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#3A3A34";
              }}
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-4 pt-4 flex flex-col gap-3" style={{ borderTop: "1px solid #DEDED6" }}>
            <a href={PHONE_HREF} className="flex items-center gap-2 text-sm" style={{ color: "#6A6A60" }}>
              <PhoneIcon /> {PHONE}
            </a>
            <a href={EMAIL_HREF} className="flex items-center gap-2 text-sm" style={{ color: "#6A6A60" }}>
              <MailIcon /> {EMAIL}
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white mt-1 rounded-full transition-opacity hover:opacity-90"
              style={{ background: "#68AF25" }}
            >
              <WhatsappIcon />
              Chamar no WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 15, height: 15 }} className="shrink-0">
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 15, height: 15 }} className="shrink-0">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 15, height: 15 }} className="shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
