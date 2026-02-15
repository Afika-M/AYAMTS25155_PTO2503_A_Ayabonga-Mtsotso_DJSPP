import { createContext, useEffect, useState } from "react";

/**
 * React context for managing the application's theme (light/dark mode).
 * - Stores the current theme in state and persists it to localStorage.
 * - Provides a function to toggle between light and dark themes, which updates the document's data attribute for CSS styling.
 *
 * @typedef {Object} ThemeContextValue
 * @property {string} theme - The current theme, either "light" or "dark".
 * @property {function(): void} toggleTheme - Function to toggle between light and dark themes.
 */

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
