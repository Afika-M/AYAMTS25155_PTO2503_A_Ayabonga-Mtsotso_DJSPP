import { createContext, use, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  },[theme]);

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

    return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
