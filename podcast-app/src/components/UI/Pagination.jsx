import { useContext } from "react";
import { PodcastContext } from "../../context/PodcastContext";
import styles from "./Pagination.module.css";

/**
 * Numeric pagination bar.
 * - Uses PodcastContext to get current page, total pages, and setPage function.
 * - Renders a button for each page, highlighting the active one.
 * - Clicking a button updates the current page in context, triggering data fetch for that page.
 *
 * @returns {JSX.Element|null} A pagination bar with buttons for each page, or null if only one page exists.
 *
 */
export default function Pagination() {
  const { page, setPage, totalPages } = useContext(PodcastContext);

  if (totalPages <= 1) return null;

  /**
   * Build page list.
   */
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.paginationWrapper}>
      {pages.map((p) => (
        <button
          key={p}
          className={`${styles.pageButton} ${p === page ? styles.active : ""}`}
          onClick={() => setPage(p)}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
