import { useState, createContext, useEffect, ReactNode } from "react";

type ThemeProviderDto = {
  children?: ReactNode;
  defaultTheme?: "light";
  localStorageKey?: "theme";
};

type ThemeContextProviderDto = {
  theme: string | "system" | "light" | "dark";
  setTheme: (theme: string) => void;
};

const StateTheme: ThemeContextProviderDto = {
  theme: "system",
  setTheme: () => null,
};

export const ThemeProviderContext = createContext(StateTheme);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  localStorageKey = "theme",
  ...props
}: ThemeProviderDto) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(localStorageKey) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value: ThemeContextProviderDto = {
    theme,
    setTheme: (theme) => {
      const localTheme = theme === "light" ? "dark" : "light";
      localStorage.setItem(localStorageKey, localTheme);
      setTheme(localTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
