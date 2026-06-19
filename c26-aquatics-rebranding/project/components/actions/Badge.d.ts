import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "navy" | "teal" | "orange" | "outline" | "outline-light";
  size?: "sm" | "md";
  children?: React.ReactNode;
}

/**
 * Uppercase pill label for stat units, location tags, and eyebrow markers.
 * Use `outline-light` / `outline` on dark backgrounds.
 */
export function Badge(props: BadgeProps): JSX.Element;
