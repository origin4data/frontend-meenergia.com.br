"use client";

import Image from "next/image";

const PHONE = "+55 27 99721-8703";
const WHATSAPP_HREF = "https://wa.me/5527997218703";
const EMAIL = "contato@MEenergia.com.br";
const EMAIL_HREF = "mailto:contato@MEenergia.com.br";

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const socials = [
  { label: "Instagram", Icon: InstagramIcon, href: "https://www.instagram.com/meenergia/" },
  { label: "Facebook", Icon: FacebookIcon, href: "https://www.facebook.com/meenergiasolar/" },
  { label: "YouTube", Icon: YoutubeIcon, href: "https://www.youtube.com/@meenergiasolar" },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#0A1F38", color: "#F4EFE6" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Main row ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 py-7 lg:py-8">

          {/* Logo */}
          <Image
            src="/logo-mundo-eletrico.png"
            alt="ME Energia Solar"
            width={120}
            height={36}
            className="brightness-0 invert opacity-95 h-9 w-auto"
          />

          {/* Contato + Social */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors duration-200"
              style={{ color: "rgba(244,239,230,0.80)", fontFamily: "var(--font-jakarta, sans-serif)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#6FB8EE"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(244,239,230,0.80)"; }}
            >
              {PHONE}
            </a>
            <a
              href={EMAIL_HREF}
              className="text-sm transition-colors duration-200"
              style={{ color: "rgba(244,239,230,0.80)", fontFamily: "var(--font-jakarta, sans-serif)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#6FB8EE"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(244,239,230,0.80)"; }}
            >
              {EMAIL}
            </a>

            {/* Divider */}
            <span className="hidden md:inline-block h-4 w-px" style={{ background: "rgba(244,239,230,0.18)" }} />

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socials.map((s) => {
                const Icon = s.Icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="transition-colors duration-200"
                    style={{ color: "rgba(244,239,230,0.65)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#6FB8EE"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(244,239,230,0.65)"; }}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-1 py-3 border-t text-[11px]"
          style={{
            borderColor: "rgba(244,239,230,0.08)",
            color: "rgba(244,239,230,0.40)",
            fontFamily: "var(--font-jakarta, sans-serif)",
          }}
        >
          <p>© {new Date().getFullYear()} ME Energia Solar.</p>
          <p>
            Desenvolvido por{" "}
            <a
              href="https://origindata.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-[#6FB8EE]"
            >
              Origindata
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
