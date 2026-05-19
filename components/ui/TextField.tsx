import type { CSSProperties, InputHTMLAttributes } from "react";

type Tone = "dark" | "light";

const TONE_STYLES: Record<Tone, { color: string; border: string; labelColor: string }> = {
  dark: {
    color: "#141410",
    border: "1.5px solid #141410",
    labelColor: "#6A6A60",
  },
  light: {
    color: "#fff",
    border: "1.5px solid rgba(255,255,255,0.45)",
    labelColor: "rgba(255,255,255,0.85)",
  },
};

export function TextField({
  id,
  label,
  tone = "dark",
  className,
  style,
  ...inputProps
}: {
  id: string;
  label: string;
  tone?: Tone;
  className?: string;
  style?: CSSProperties;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "style">) {
  const t = TONE_STYLES[tone];
  return (
    <div className={className}>
      <label
        htmlFor={id}
        style={{
          fontFamily: "var(--font-hanken, sans-serif)",
          fontWeight: 700,
          fontSize: "11px",
          color: t.labelColor,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          marginBottom: "6px",
          display: "block",
        }}
      >
        {label}
      </label>
      <input
        id={id}
        {...inputProps}
        style={{
          fontFamily: "var(--font-hanken, sans-serif)",
          fontWeight: 600,
          fontSize: "1rem",
          color: t.color,
          background: "transparent",
          borderBottom: t.border,
          padding: "10px 0",
          width: "100%",
          outline: "none",
          ...style,
        }}
      />
    </div>
  );
}
