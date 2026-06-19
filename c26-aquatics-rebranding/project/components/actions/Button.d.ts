import React from "react";

export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual style. `primary` = orange drive, `secondary` = teal, `dark` = navy. */
  variant?: "primary" | "secondary" | "dark" | "outline" | "outline-light" | "ghost";
  size?: "sm" | "md" | "lg";
  /** Stretch to fill container width. */
  full?: boolean;
  disabled?: boolean;
  /** Render as a different element, e.g. "a" for a link CTA. */
  as?: "button" | "a";
  children?: React.ReactNode;
}

/**
 * The C26 call-to-action. Uppercase condensed type, squared corners, athletic.
 * Use `primary` (orange) for the single most important action on a view;
 * `secondary` (teal) and `dark` (navy) for supporting actions.
 */
export function Button(props: ButtonProps): JSX.Element;
