import React from "react";

/**
 * Pill-style audience/segment tabs (Kids / Teens / Adults / Athletes).
 * Controlled if `value`+`onChange` given, otherwise self-manages.
 */
export function Tabs({ items = [], value, onChange, defaultValue }) {
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.id);
  const active = value !== undefined ? value : internal;
  const select = (id) => {
    if (value === undefined) setInternal(id);
    onChange && onChange(id);
  };
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {items.map((it) => {
        const on = it.id === active;
        return (
          <button
            key={it.id}
            onClick={() => select(it.id)}
            style={{
              fontFamily: "var(--font-subhead)",
              fontWeight: "var(--fw-semibold)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              fontSize: "14px",
              padding: "9px 20px",
              borderRadius: "var(--r-pill)",
              cursor: "pointer",
              transition: "all var(--dur-base) var(--ease-out)",
              border: on ? "2px solid var(--navy-700)" : "2px solid var(--line-strong)",
              background: on ? "var(--navy-700)" : "transparent",
              color: on ? "var(--text-on-dark)" : "var(--text-muted)",
            }}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
