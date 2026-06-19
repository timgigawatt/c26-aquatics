import React from "react";

/**
 * Small label chip — stat units, location tags, eyebrow markers.
 */
export function Badge({ children, tone = "neutral", size = "md", ...rest }) {
  const sizes = {
    sm: { fontSize: "11px", padding: "3px 9px" },
    md: { fontSize: "12px", padding: "5px 12px" },
  };
  const tones = {
    neutral:  { background: "var(--mist)", color: "var(--text-body)", border: "1px solid var(--line)" },
    navy:     { background: "var(--navy-700)", color: "var(--text-on-dark)" },
    teal:     { background: "var(--teal-100)", color: "var(--teal-700)" },
    orange:   { background: "var(--orange-100)", color: "var(--orange-700)" },
    outline:  { background: "transparent", color: "var(--text-muted)", border: "1px solid var(--line-strong)" },
    "outline-light": { background: "transparent", color: "var(--text-on-dark-muted)", border: "1px solid var(--border-on-dark)" },
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontFamily: "var(--font-subhead)",
        fontWeight: "var(--fw-semibold)",
        textTransform: "uppercase",
        letterSpacing: "var(--ls-eyebrow)",
        borderRadius: "var(--r-pill)",
        whiteSpace: "nowrap",
        ...sizes[size],
        ...tones[tone],
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
