import React from "react";

/**
 * Select dropdown, styled to match Input.
 */
export function Select({ label, options = [], id, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const selId = id || (label ? `sel-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {label && (
        <label
          htmlFor={selId}
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
      <div style={{ position: "relative" }}>
        <select
          id={selId}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            fontFamily: "var(--font-body)",
            fontSize: "15px",
            color: "var(--text-strong)",
            padding: "11px 38px 11px 14px",
            borderRadius: "var(--r-sm)",
            background: "var(--surface)",
            border: `2px solid ${focus ? "var(--teal-500)" : "var(--line)"}`,
            boxShadow: focus ? "var(--focus-shadow)" : "none",
            outline: "none",
            width: "100%",
            boxSizing: "border-box",
            cursor: "pointer",
          }}
          {...rest}
        >
          {options.map((o) => {
            const val = typeof o === "string" ? o : o.value;
            const lbl = typeof o === "string" ? o : o.label;
            return <option key={val} value={val}>{lbl}</option>;
          })}
        </select>
        <span
          style={{
            position: "absolute",
            right: "14px",
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            color: "var(--text-muted)",
            fontSize: "12px",
          }}
        >
          ▾
        </span>
      </div>
    </div>
  );
}
