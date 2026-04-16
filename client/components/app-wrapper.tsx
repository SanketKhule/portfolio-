"use client";

import { ThemeProvider } from "./theme-provider";

export function AppWrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
