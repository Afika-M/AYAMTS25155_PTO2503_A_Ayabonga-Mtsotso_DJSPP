import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={styles.appHeader}>
      <h1>
        <Link to="/">🎙️ SpeakEasy</Link>
      </h1>

      <button onClick={toggleTheme} className={styles.themeToggle}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </header>
  );
}
