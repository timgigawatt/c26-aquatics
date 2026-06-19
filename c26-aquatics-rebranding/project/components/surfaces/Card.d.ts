import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image URL (string) or a custom node rendered in the media slot. */
  media?: string | React.ReactNode;
  mediaHeight?: number;
  /** Lift + shadow on hover, for clickable program/age cards. */
  interactive?: boolean;
  padding?: string;
  tone?: "light" | "dark";
  children?: React.ReactNode;
}

/**
 * Rounded content card with an optional top media area. The workhorse surface
 * for program tiles, age-group cards, pricing tiers, and testimonials.
 */
export function Card(props: CardProps): JSX.Element;
