import { useEffect, useRef, useState } from "react";
import PodcastCard from "../Podcasts/PodcastCard";
import styles from "./RecommendedCarousel.module.css";
/**
 * RecommendedCarousel component to display recommended podcasts.
 *
 * @param {Object} props
 * @param {Object[]} podcasts - full list of podcasts from context
 * @returns {JSX.Element} A horizontal carousel of recommended podcast cards.
 *
 * This component renders a horizontal carousel of podcast cards, allowing users
 * to scroll through recommended podcasts. Each card displays the podcast's image,
 * title, publisher, and genres. Clicking on a card navigates to the podcast's
 * detail page.
 */
export default function RecommendedCarousel({ podcasts }) {
  const carouselRef = useRef(null);

  // State to hold the subset of podcasts currently visible in the carousel
  const [recommended, setRecommended] = useState([]);

  //pick 12 random podcasts from the list to show as recommended
  useEffect(() => {
    if (!podcasts || podcasts.length === 0) return;

    const saved = localStorage.getItem("recommendedPodcasts");
    if (saved) {
      const savedRecommended = JSON.parse(saved);
      setRecommended(savedRecommended);
      return;
    }

    const copy = [...podcasts];
    copy.sort(() => Math.random() - 0.5); // Shuffle the array
    const picked = copy.slice(0, 12);

    setRecommended(picked); // Take the first 12 items
    localStorage.setItem("recommendedPodcasts", JSON.stringify(picked));
  }, [podcasts]);

  // scroll the carousel left or right when the respective button is clicked
  function scrollCarousel(direction) {
    const el = carouselRef.current;
    if (!el) return;

    const scrollAmount = el.offsetWidth * 0.8;
    const maxScroll = el.scrollWidth - el.clientWidth;

    if (direction === "right") {
      if (el.scrollLeft >= maxScroll) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }

    if (direction === "left") {
      if (el.scrollLeft <= 0) {
        el.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        el.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  }

  return (
    <section className={styles.carouselContainer}>
      <h2>Recommended for You</h2>
      <div className={styles.carousel} ref={carouselRef}>
        {recommended.map((podcast) => (
          <div key={podcast.id} className={styles.carouselItem}>
            <PodcastCard podcast={podcast} />
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
    </section>
  );
}
