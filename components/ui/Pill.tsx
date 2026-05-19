import type { ReactNode } from "react";

export function Pill({
  active = false,
  onClick,
  children,
  className,
  type = "button",
}: {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-5 py-2.5 text-sm transition-all duration-200 ${className ?? ""}`}
      style={{
        fontFamily: "var(--font-hanken, sans-serif)",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        fontSize: "11px",
        border: `1.5px solid ${active ? "#00529B" : "#C9C2B4"}`,
        background: active ? "#00529B" : "transparent",
        color: active ? "#fff" : "#141410",
        borderRadius: "999px",
      }}
    >
      {children}
    </button>
  );
}
