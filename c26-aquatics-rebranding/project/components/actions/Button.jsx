import React from "react";

const SIZES = {
  sm: { padding: "8px 16px", fontSize: "13px" },
  md: { padding: "12px 24px", fontSize: "15px" },
  lg: { padding: "16px 36px", fontSize: "18px" },
};

/**
 * C26 primary action. Squared, condensed, uppercase — athletic energy.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  full = false,
  disabled = false,
  as = "button",
  ...rest
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    width: full ? "100%" : "auto",
    fontFamily: "var(--font-display)",
    fontWeight: "var(--fw-bold)",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    borderRadius: "var(--r-xs)",
    border: "2px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "transform var(--dur-fast) var(--ease-out), background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
    textDecoration: "none",
    lineHeight: 1,
    ...SIZES[size],
  };

  const variants = {
    primary: {
      background: "var(--action)",
      color: "var(--action-ink)",
      boxShadow: "var(--shadow-action)",
    },
    secondary: {
      background: "var(--teal-500)",
      color: "#04302d",
    },
    dark: {
      background: "var(--navy-700)",
      color: "var(--text-on-dark)",
    },
    outline: {
      background: "transparent",
      color: "var(--navy-700)",
      borderColor: "var(--navy-700)",
    },
    "outline-light": {
      background: "transparent",
      color: "var(--text-on-dark)",
      borderColor: "rgba(255,255,255,.5)",
    },
    ghost: {
      background: "transparent",
      color: "var(--navy-700)",
    },
  };

  const Tag = as;
  return (
    <Tag
      style={{ ...base, ...variants[variant] }}
      disabled={as === "button" ? disabled : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
