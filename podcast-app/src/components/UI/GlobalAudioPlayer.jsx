import { useContext } from "react";
import { AudioPlayerContext } from "../../context/AudioPlayerContext";
import styles from "./GlobalAudioPlayer.module.css";

/**
 * GlobalAudioPlayer component that provides a persistent audio player across the app.
 * - Displays the currently playing episode with controls to play/pause and skip.
 * - Uses the AudioPlayerContext to manage playback state and control the audio element.
 * - Shows the episode title and a progress bar indicating playback progress.
 *
 * @returns {JSX.Element} The global audio player UI with episode info and controls.
 * This component is designed to be included at a high level in the app (e.g., in App.jsx) so that it remains visible and functional across all pages.
 * It listens to the AudioPlayerContext for changes in the current episode and playback state, allowing users to control audio playback from anywhere in the app.
 */

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export default function GlobalAudioPlayer() {
  const { currentEpisode, isPlaying, toggle, currentTime, duration, seek } =
    useContext(AudioPlayerContext);

  if (!currentEpisode) return null; // Don't render the player if no episode is selected

  return (
    <div className={styles.player}>
      <div className={styles.left}>
        <button className={styles.playBtn} onClick={toggle} type="button">
          {isPlaying ? "⏸" : "▶️"}
        </button>

        <div className={styles.meta}>
          <p className={styles.title}>{currentEpisode.episodeTitle}</p>
          <p className={styles.subtitle}>
            {currentEpisode.showTitle} • {currentEpisode.seasonTitle} • Episode{" "}
            {currentEpisode.episodeNumber}
          </p>
        </div>
      </div>

      <div className={styles.right}>
        <span className={styles.time}>{formatTime(currentTime)}</span>

        <input
          className={styles.slider}
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={(e) => seek(Number(e.target.value))}
        />

        <span className={styles.time}>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
