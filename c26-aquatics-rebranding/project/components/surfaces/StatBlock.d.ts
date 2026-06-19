import React from "react";

export interface StatBlockProps {
  /** The headline figure, e.g. "≤4", "20+", "365". */
  value: React.ReactNode;
  /** Uppercase caption beneath, e.g. "per class". */
  label: string;
  tone?: "dark" | "light";
  align?: "center" | "left";
}

/**
 * Oversized condensed stat for the athletic proof band (navy section).
 * Teal figure on dark, navy figure on light.
 */
export function StatBlock(props: StatBlockProps): JSX.Element;
