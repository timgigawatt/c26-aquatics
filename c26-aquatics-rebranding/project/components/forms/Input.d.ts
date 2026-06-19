import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
}

/**
 * Labelled text input with teal focus ring. Used across booking and contact
 * forms. Uppercase condensed label sits above the field.
 */
export function Input(props: InputProps): JSX.Element;
