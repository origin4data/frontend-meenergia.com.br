import Link from "next/link";
import type { CSSProperties, MouseEventHandler, ReactNode } from "react";

export type ButtonVariant = "whatsapp" | "primary" | "secondary" | "ghost" | "outline-light";
export type ButtonSize = "sm" | "md" | "lg";

const SIZE: Record<ButtonSize, { padding: string; fontSize: string; gap: string }> = {
  sm: { padding: "0.5rem 1.25rem",   fontSize: "11px",   gap: "0.5rem" },
  md: { padding: "0.625rem 1.5rem",  fontSize: "12px",   gap: "0.625rem" },
  lg: { padding: "0.875rem 2rem",    fontSize: "12px",   gap: "0.75rem" },
};

const VARIANT: Record<ButtonVariant, CSSProperties> = {
  whatsapp: {
    background: "#68AF25",
    color: "#fff",
    borderRadius: "999px",
    boxShadow: "0 4px 16px rgba(61,122,0,0.40)",
    fontWeight: 700,
    border: "none",
  },
  primary: {
    background: "linear-gradient(135deg, #0066BD, #2E8DD6)",
    color: "#fff",
    borderRadius: "2rem",
    boxShadow: "0 8px 32px rgba(0,102,189,0.55)",
    fontWeight: 700,
    border: "none",
  },
  secondary: {
    background: "transparent",
    color: "#141410",
    border: "1.5px solid #141410",
    borderRadius: "999px",
    fontWeight: 700,
  },
  ghost: {
    background: "transparent",
    color: "#141410",
    border: "none",
    fontWeight: 600,
  },
  "outline-light": {
    background: "#fff",
    color: "#00529B",
    borderRadius: "999px",
    boxShadow: "0 12px 32px rgba(10,31,56,0.30)",
    fontWeight: 800,
    border: "none",
  },
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  fullWidth?: boolean;
};

type ButtonAsButton = CommonProps & {
  as?: "button";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  href?: never;
  target?: never;
  rel?: never;
};

type ButtonAsLink = CommonProps & {
  as: "link";
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  type?: never;
  disabled?: never;
  target?: string;
  rel?: string;
};

type ButtonAsAnchor = CommonProps & {
  as: "a";
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  type?: never;
  disabled?: never;
  target?: string;
  rel?: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    iconLeft,
    iconRight,
    children,
    className,
    style,
    fullWidth,
  } = props;

  const sz = SIZE[size];
  const baseStyle: CSSProperties = {
    fontFamily: "var(--font-hanken, sans-serif)",
    fontSize: sz.fontSize,
    padding: sz.padding,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: sz.gap,
    cursor: "pointer",
    transition: "all 0.2s ease",
    width: fullWidth ? "100%" : "auto",
    ...VARIANT[variant],
    ...style,
  };

  const baseClass = `transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 ${className ?? ""}`;

  const content = (
    <>
      {iconLeft}
      {children}
      {iconRight}
    </>
  );

  if (props.as === "link") {
    return (
      <Link
        href={props.href}
        onClick={props.onClick}
        target={props.target}
        rel={props.rel}
        className={baseClass}
        style={baseStyle}
      >
        {content}
      </Link>
    );
  }

  if (props.as === "a") {
    return (
      <a
        href={props.href}
        onClick={props.onClick}
        target={props.target}
        rel={props.rel}
        className={baseClass}
        style={baseStyle}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={baseClass}
      style={baseStyle}
    >
      {content}
    </button>
  );
}
