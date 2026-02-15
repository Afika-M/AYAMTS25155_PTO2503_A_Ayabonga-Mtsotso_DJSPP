import { useState, useEffect, useContext } from "react";
import { PodcastContext } from "../../context/PodcastContext";
import styles from "./SearchBar.module.css";

/**
 * Search input with debounced update.
 * - Manages local input state for immediate responsiveness.
 * - Updates global search state in PodcastContext after a 300ms delay.
 * - Prevents excessive re-renders while typing.
 *
 * @returns {JSX.Element} A search input field for filtering podcasts by title or description.
 */
export default function SearchBar() {
  const { search, setSearch } = useContext(PodcastContext);
  const [value, setValue] = useState(search);

  // Debounce input (300ms) to avoid rapid updates.
  useEffect(() => {
    const id = setTimeout(() => setSearch(value), 300);
    return () => clearTimeout(id);
  }, [value]);

  return (
    <input
      type="search"
      placeholder="Search podcasts…"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={styles.searchInput}
    />
  );
}
