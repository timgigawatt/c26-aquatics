import React from "react";

/**
 * Big numeric stat for the athletic stats band. Condensed, oversized figure
 * over an uppercase label.
 */
export function StatBlock({ value, label, tone = "dark", align = "center" }) {
  const onDark = tone === "dark";
  return (
    <div style={{ textAlign: align, display: "flex", flexDirection: "column", gap: "4px" }}>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: "var(--fw-black)",
          fontSize: "clamp(40px, 6vw, 64px)",
          lineHeight: 0.9,
          letterSpacing: "var(--ls-tight)",
          color: onDark ? "var(--teal-400)" : "var(--navy-700)",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "var(--font-subhead)",
          fontWeight: "var(--fw-semibold)",
          fontSize: "13px",
          textTransform: "uppercase",
          letterSpacing: "var(--ls-eyebrow)",
          color: onDark ? "var(--text-on-dark-muted)" : "var(--text-muted)",
        }}
      >
        {label}
      </div>
    </div>
  );
}
