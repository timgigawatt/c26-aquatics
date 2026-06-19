import React from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  /** Strings or {value,label} objects. */
  options: (string | SelectOption)[];
}

/**
 * Styled select dropdown matching Input. Used in booking widgets
 * (program, age group, location).
 */
export function Select(props: SelectProps): JSX.Element;
