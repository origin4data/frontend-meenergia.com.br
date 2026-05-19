import type { ReactNode } from "react";

type Tone = "primary" | "accent" | "light" | "muted";

const TONE_COLOR: Record<Tone, string> = {
  primary: "#00529B",                  // azul primário (sobre fundo claro)
  accent:  "#6FB8EE",                  // azul claro (sobre fundo escuro)
  light:   "rgba(255,255,255,0.85)",   // branco (sobre gradient verde→azul)
  muted:   "#7A7565",                  // marrom acinzentado (Sobre)
};

export function Eyebrow({
  children,
  tone = "primary",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        fontFamily: "var(--font-hanken, sans-serif)",
        fontWeight: 700,
        fontSize: "11px",
        color: TONE_COLOR[tone],
        letterSpacing: "0.25em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}
