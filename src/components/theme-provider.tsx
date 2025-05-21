"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, attribute = "class", ...props }: ThemeProviderProps) {
  return <NextThemesProvider attribute={attribute} {...props}>{children}</NextThemesProvider>;
} 