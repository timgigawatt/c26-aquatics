import React from "react";

/**
 * Text input with C26 styling. Teal focus ring.
 */
export function Input({ label, hint, id, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? `in-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontFamily: "var(--font-subhead)",
            fontWeight: "var(--fw-semibold)",
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "var(--ls-eyebrow)",
            color: "var(--text-muted)",
          }}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "15px",
          color: "var(--text-strong)",
          padding: "11px 14px",
          borderRadius: "var(--r-sm)",
          background: "var(--surface)",
          border: `2px solid ${focus ? "var(--teal-500)" : "var(--line)"}`,
          boxShadow: focus ? "var(--focus-shadow)" : "none",
          outline: "none",
          transition: "border var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)",
          width: "100%",
          boxSizing: "border-box",
        }}
        {...rest}
      />
      {hint && (
        <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-muted)" }}>
          {hint}
        </span>
      )}
    </div>
  );
}
