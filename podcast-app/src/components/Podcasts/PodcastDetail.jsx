import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PodcastDetail.module.css";
import { formatDate } from "../../utils/formatDate";
import GenreTags from "../UI/GenreTags";
import FavouritesButton from "../UI/FavouritesButton";
import { AudioPlayerContext } from "../../context/AudioPlayerContext";
/**
 * Displays detailed information about a single podcast, including its seasons and episodes.
 *
 * Props:
 * - podcast: The podcast data object containing details like title, description, image, genres, seasons, etc.
 * - genres: An array of genre objects to map genre IDs to their titles for display.
 *
 * Features:
 * - Shows podcast cover image, title, description, genres, last updated date, total seasons and episodes.
 * - Allows selecting different seasons from a dropdown to view their episodes.
 * - Each episode card includes a play button to start streaming and a favourites button to save it.
 * - A back button at the top allows returning to the previous page.
 *
 * @param {Object} props
 * @param {Object} props.podcast - The podcast data object to display.
 * @param {Array<Object>} props.genres - Array of genre objects for mapping IDs to titles.
 *
 * @returns {JSX.Element} The rendered podcast detail component.
 */

// Helper function to format the last updated date in a human-readable format
export default function PodcastDetail({ podcast, genres }) {
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);
  const season = podcast.seasons[selectedSeasonIndex];
  const navigate = useNavigate(); // ← hook for navigation

  const { playEpisode } = useContext(AudioPlayerContext);

  return (
    <div className={styles.container}>
      {/* Back Button */}
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>
      {/* Header */}
      <div className={styles.header}>
        <img src={podcast.image} alt="Podcast Cover" className={styles.cover} />
        <div>
          <h1 className={styles.title}>{podcast.title}</h1>
          <p className={styles.description}>{podcast.description}</p>

          <div className={styles.metaInfo}>
            <div className={styles.seasonInfo}>
              <div>
                <p>Genres</p>
                <GenreTags genres={genres} />
              </div>

              <div>
                <p>Last Updated:</p>
                <strong>{formatDate(podcast.updated)}</strong>
              </div>

              <div>
                <p>Total Seasons:</p>
                <strong>{podcast.seasons.length} Seasons</strong>
              </div>

              <div>
                <p>Total Episodes:</p>
                <strong>
                  {podcast.seasons.reduce(
                    (acc, s) => acc + s.episodes.length,
                    0,
                  )}{" "}
                  Episodes
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Season Details */}
      <div className={styles.seasonDetails}>
        <div className={styles.seasonIntro}>
          <div className={styles.left}>
            <img className={styles.seasonCover} src={season.image} />
            <div>
              <h3>
                Season {selectedSeasonIndex + 1}: {season.title}
              </h3>
              <p>{season.description}</p>
              <p className={styles.releaseInfo}>
                {season.episodes.length} Episodes
              </p>
            </div>
          </div>
          <select
            value={selectedSeasonIndex}
            onChange={(e) => setSelectedSeasonIndex(Number(e.target.value))}
            className={styles.dropdown}
          >
            {podcast.seasons.map((s, i) => (
              <option key={i} value={i}>
                Season {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.episodeList}>
          {season.episodes.map((ep, index) => {
            const episodeNumber = index + 1;
            const episodeKey = `${podcast.id}-S${selectedSeasonIndex + 1}-E${episodeNumber}`;
            return (
              <div key={episodeKey} className={styles.episodeCard}>
                <img
                  className={styles.episodeCover}
                  src={season.image}
                  alt=""
                />
                <div className={styles.episodeInfo}>
                  <p className={styles.episodeTitle}>
                    Episode {episodeNumber}: {ep.title}
                  </p>
                  <p className={styles.episodeDesc}>{ep.description}</p>
                </div>

                {/* Favourites Button */}
                <FavouritesButton
                  episode={{
                    url: ep.file,
                    episodeId: episodeKey,
                    episodeNumber,
                    episodeTitle: ep.title,
                    episodeDescription: ep.description,
                    showId: podcast.id,
                    showTitle: podcast.title,
                    seasonTitle: season.title,
                    seasonImage: season.image,
                  }}
                />

                {/* Play Button */}
                <button
                  className={styles.playBtn}
                  onClick={() =>
                    playEpisode({
                      url: ep.file,
                      episodeId: episodeKey,
                      episodeNumber,
                      episodeTitle: ep.title,
                      episodeDescription: ep.description,
                      showId: podcast.id,
                      showTitle: podcast.title,
                      seasonTitle: season.title,
                      seasonImage: season.image,
                    })
                  }
                >
                  ▶️
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
