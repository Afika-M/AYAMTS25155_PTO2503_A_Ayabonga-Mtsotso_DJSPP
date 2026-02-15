import { useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FavouritesContext } from "../context/FavouritesContext";
import { AudioPlayerContext } from "../context/AudioPlayerContext";
import { formatDate } from "../utils/formatDate";
import styles from "./Favourites.module.css";

export default function Favourites() {
  const { favourites, removeFavourite } = useContext(FavouritesContext);
  const navigate = useNavigate();
  const [sortKey, setSortKey] = useState("date-desc");
  const { playEpisode, toggle, currentEpisode, isPlaying } =
    useContext(AudioPlayerContext);

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

  const showTitles = Object.keys(grouped).sort();

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

      {/* Sort dropdown ) */}
      <div className={styles.sortEpisodes}>
        <label className={styles.sortLabel}>
          Sort by:
          <select
            className={styles.sortSelect}
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
          >
            <option value="date-desc">Newest Added</option>
            <option value="date-asc">Oldest Added</option>
            <option value="title-asc">Title A → Z</option>
            <option value="title-desc">Title Z → A</option>
          </select>
        </label>
      </div>

      {showTitles.map((showTitle) => {
        const episodes = [...grouped[showTitle]];

        // Sort episodes based on sortKey

        if (sortKey === "date-desc") {
          episodes.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
        } else if (sortKey === "date-asc") {
          episodes.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
        } else if (sortKey === "title-asc") {
          episodes.sort((a, b) => a.episodeTitle.localeCompare(b.episodeTitle));
        } else if (sortKey === "title-desc") {
          episodes.sort((a, b) => b.episodeTitle.localeCompare(a.episodeTitle));
        }

        return (
          <section key={showTitle} className={styles.group}>
            <h3 className={styles.groupTitle}>
              {showTitle}{" "}
              <span className={styles.count}>({episodes.length})</span>
            </h3>

            <div className={styles.episodeList}>
              {episodes.map((ep) => (
                <div key={ep.episodeId} className={styles.episodeCard}>
                  <img
                    className={styles.seasonCover}
                    src={ep.seasonImage}
                    alt={`${ep.showTitle} cover`}
                  />

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
                  <button
                    className={styles.playBtn}
                    type="button"
                    onClick={() => {
                      if (currentEpisode?.episodeId === ep.episodeId) {
                        toggle(); // Toggle play/pause if the same episode is clicked
                      } else {
                        playEpisode(ep);
                      }
                    }}
                  >
                    {currentEpisode?.episodeId === ep.episodeId && isPlaying
                      ? "⏸"
                      : "▶️"}
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
