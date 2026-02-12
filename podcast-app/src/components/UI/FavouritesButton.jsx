import { useContext } from "react";
import { FavouritesContext } from "../../context/FavouritesContext";
import styles from "./FavouritesButton.module.css";

/**
 * FavouriteButton component to toggle an episode as a favourite.
 *
 * @param {Object} props
 * @param {Object} episode - The episode object to be favourited or unfavourited.
 * @returns {JSX.Element} A button that toggles the favourite status of an episode.
 * This component uses the FavouritesContext to determine if the episode is currently
 * favourited and to add or remove it from the favourites list when clicked. The button displays a filled heart if the episode is favourited and an empty heart if it is not.
 */

export default function FavouritesButton({ episode }) {
  const { addFavourite, removeFavourite, isFavourite } =
    useContext(FavouritesContext);

  const favourited = isFavourite(episode.episodeId);

  function toggleFavourite() {
    if (favourited) {
      removeFavourite(episode.episodeId);
    } else {
      addFavourite(episode);
    }
  }

  return (
    <button
      className={`${styles.button} ${favourited ? styles.active : ""}`}
      onClick={toggleFavourite}
      aria-label="Toggle favourite"
      type="button"
    >
      {favourited ? "❤️" : "🤍"}
    </button>
  );
}
