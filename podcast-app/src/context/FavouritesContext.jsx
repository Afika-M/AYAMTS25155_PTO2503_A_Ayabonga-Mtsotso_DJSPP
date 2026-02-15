import { createContext, useEffect, useState } from "react";
/**
 * React context for managing user's favourite episodes.
 * - Stores an array of favourite episodes in state.
 * - Provides functions to add, remove, and check if an episode is a favourite.
 * - Persists favourites to localStorage to maintain state across page reloads.
 * @typedef {Object} Episode
 * @property {string} episodeId - Unique identifier for the episode.
 * @property {string} episodeTitle - Title of the episode.
 * @property {string} showTitle - Title of the podcast show the episode belongs to.
 * @property {string} url - URL of the episode's audio file.
 * @property {string} [addedAt] - ISO string of when the episode was added to favourites (optional).
 * @typedef {Object} FavouritesContextValue
 * @property {Episode[]} favourites - Array of favourited episodes.
 * @property {function(Episode): void} addFavourite - Function to add an episode to favourites.
 * @param {function(string): void} removeFavourite - Function to remove an episode from favourites by its ID.
 * @property {function(string): boolean} isFavourite - Function to check if an episode is currently favourited by its ID.
 */

export const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  function addFavourite(episode) {
    setFavourites((prev) => {
      if (prev.some((ep) => ep.episodeId === episode.episodeId)) {
        return prev;
      }
      return [...prev, { ...episode, addedAt: new Date().toISOString() }];
    });
  }

  function removeFavourite(episodeId) {
    setFavourites((prev) => prev.filter((ep) => ep.episodeId !== episodeId));
  }

  function isFavourite(episodeId) {
    return favourites.some((ep) => ep.episodeId === episodeId);
  }

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite, isFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}
