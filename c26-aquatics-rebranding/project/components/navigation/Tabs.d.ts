import React from "react";

export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps {
  items: TabItem[];
  /** Controlled active id. Omit to let the component self-manage. */
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
}

/**
 * Pill segment control for audience/age selectors
 * (Kids / Teens / Adults / Athletes). Active pill fills navy.
 */
export function Tabs(props: TabsProps): JSX.Element;
