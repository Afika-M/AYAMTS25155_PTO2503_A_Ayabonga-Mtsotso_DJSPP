import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={styles.appHeader}>
      <h1 className={styles.logo}>
        <Link to="/">🎙️ SpeakEasy</Link>
      </h1>
      <nav className={styles.nav}>
        <Link to="/favourites" className={styles.favouritesLink}>
          ❤️
        </Link>

        <button
          onClick={toggleTheme}
          className={styles.themeToggle}
          type="button"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </nav>
    </header>
  );
}
