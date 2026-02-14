import { useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FavouritesContext } from "../context/FavouritesContext";
import { formatDate } from "../utils/formatDate";
import styles from "./Favourites.module.css";

export default function Favourites() {
  const { favourites, removeFavourite } = useContext(FavouritesContext);
  const navigate = useNavigate();

  // group favourites by showTitle
  const grouped = useMemo(() => {
    const groups = {};

    for (let i = 0; i < favourites.length; i++) {
      const fav = favourites[i];
      const key = fav.showTitle || "Unknown Show";

      if (!groups[key]) {
        groups[key] = [];
      }

      groups[key].push(fav);
    }

    return groups;
  }, [favourites]);

  const showTitles = Object.keys(grouped);

  if (favourites.length === 0) {
    return (
      <main className={styles.page}>
        <h2 className={styles.title}>Favourite Episodes</h2>
        <p className={styles.empty}>
          No favourites yet. Go favourite an episode ❤️
        </p>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      {/* Back Button */}
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2 className={styles.title}>Favourite Episodes</h2>

      {showTitles.map((showTitle) => {
        const episodes = grouped[showTitle];

        return (
          <section key={showTitle} className={styles.group}>
            <h3 className={styles.groupTitle}>
              {showTitle}{" "}
              <span className={styles.count}>({episodes.length})</span>
            </h3>

            <div className={styles.episodeList}>
              {episodes.map((ep) => (
                <div key={ep.episodeId} className={styles.episodeCard}>
                  <img className={styles.seasonCover} src={ep.seasonImage} />

                  <div className={styles.episodeCardTop}>
                    <p className={styles.epTitle}>{ep.episodeTitle}</p>

                    <p className={styles.meta}>Episode {ep.episodeNumber}</p>
                    <p className={styles.episodeDesc}>
                      {ep.episodeDescription}
                    </p>

                    <p className={styles.added}>
                      Added {formatDate(ep.addedAt)}
                    </p>
                  </div>

                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => removeFavourite(ep.episodeId)}
                    aria-label="Remove favourite"
                  >
                    ❤️
                  </button>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
