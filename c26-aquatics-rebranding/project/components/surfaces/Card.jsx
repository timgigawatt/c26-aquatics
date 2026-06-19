import React from "react";

/**
 * Content card. `media` slot renders an image area on top; `interactive`
 * lifts on hover for clickable program/age cards.
 */
export function Card({
  children,
  media,
  mediaHeight = 180,
  interactive = false,
  padding = "20px",
  tone = "light",
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const tones = {
    light: { background: "var(--surface)", color: "var(--text-body)", border: "1px solid var(--line)" },
    dark:  { background: "var(--navy-700)", color: "var(--text-on-dark)", border: "1px solid rgba(255,255,255,.08)" },
  };
  return (
    <div
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "var(--r-lg)",
        overflow: "hidden",
        boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-sm)",
        transform: hover ? "translateY(-3px)" : "none",
        transition: "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
        cursor: interactive ? "pointer" : "default",
        ...tones[tone],
      }}
      {...rest}
    >
      {media !== undefined && (
        <div
          style={{
            height: mediaHeight,
            background: typeof media === "string" ? undefined : "var(--mist)",
            backgroundImage: typeof media === "string" ? `url(${media})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            flex: "none",
          }}
        >
          {typeof media !== "string" ? media : null}
        </div>
      )}
      <div style={{ padding, display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
        {children}
      </div>
    </div>
  );
}
