import { createContext, useEffect, useState } from "react";

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
