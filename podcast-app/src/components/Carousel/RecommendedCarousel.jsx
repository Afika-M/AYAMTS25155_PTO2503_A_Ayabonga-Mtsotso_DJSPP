import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenreTags from "../UI/GenreTags";
import styles from "./RecommendedCarousel.module.css";
/**
 * RecommendedCarousel component to display recommended podcasts.
 *
Props:
 * @param {Object[]} podcasts - full list of podcasts from context
 *
 * This component renders a horizontal carousel of podcast cards, allowing users
 * to scroll through recommended podcasts. Each card displays the podcast's image,
 * title, publisher, and genres. Clicking on a card navigates to the podcast's
 * detail page.
 */
export default function RecommendedCarousel({ podcasts }) {
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  // State to hold the subset of podcasts currently visible in the carousel
  const [recommended, setRecommended] = useState([]);

  //pick 12 random podcasts from the list to show as recommended
  useEffect(() => {
    if (!podcasts || podcasts.length === 0) return;

    const copy = [...podcasts];
    copy.sort(() => Math.random() - 0.5); // Shuffle the array
    setRecommended(copy.slice(0, 12)); // Take the first 12 items
  }, [podcasts]);

  // scroll the carousel left or right when the respective button is clicked
  function scrollCarousel(direction) {
    const el = carouselRef.current;
    if (!el) return;
    const scrollAmount = el.offsetWidth * 0.8;
    const maxScroll = el.scrollWidth - el.clientWidth;

    if (direction === "right" && el.scrollLeft >= maxScroll - 5) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }

    if (direction === "left" && el.scrollLeft <= 0) {
      el.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      el.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  }

  return (
    <div className={styles.carouselContainer}>
      <h2>Recommended for You</h2>
      <div className={styles.carousel} ref={carouselRef}>
        {recommended.map((podcast) => (
          <div
            key={podcast.id}
            className={styles.card}
            onClick={() => navigate(`/show/${podcast.id}`)}
          >
            <img
              src={podcast.image}
              alt={podcast.title}
              className={styles.image}
            />

            <h3 className={styles.title}>{podcast.title}</h3>
            <GenreTags genres={podcast.genres} />
          </div>
        ))}
      </div>
      <button
        className={`${styles.navButton} ${styles.left}`}
        onClick={() => scrollCarousel("left")}
      >
        &#8249;
      </button>
      <button
        className={`${styles.navButton} ${styles.right}`}
        onClick={() => scrollCarousel("right")}
      >
        &#8250;
      </button>
    </div>
  );
}
