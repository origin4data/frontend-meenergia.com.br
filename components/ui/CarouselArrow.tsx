type Direction = "prev" | "next";

export function CarouselArrow({
  direction,
  onClick,
  size = 48,
  ariaLabel,
}: {
  direction: Direction;
  onClick: () => void;
  size?: number;
  ariaLabel?: string;
}) {
  const path =
    direction === "prev"
      ? "M19 12H5M11 18l-6-6 6-6"
      : "M5 12h14M13 18l6-6-6-6";
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel ?? (direction === "prev" ? "Anterior" : "Próximo")}
      className="flex items-center justify-center transition-all duration-300"
      style={{
        width: size,
        height: size,
        border: "2px solid #141410",
        color: "#141410",
        background: "transparent",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#00529B";
        e.currentTarget.style.borderColor = "#00529B";
        e.currentTarget.style.color = "#fff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.borderColor = "#141410";
        e.currentTarget.style.color = "#141410";
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path d={path} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
