import { createContext, useEffect, useRef, useState } from "react";

/**
 * React context for managing audio playback state across the app.
 * Provides functions to play, pause, resume, toggle, and seek episodes, as well as state for the current episode, playback status, and timing.
 *
 * @typedef {Object} Episode
 * @property {string} url - The URL of the audio file.
 * @property {string} episodeId - The unique identifier for the episode.
 * @property {number} episodeNumber - The number of the episode within its season.
 * @property {string} episodeTitle - The title of the episode.
 * @property {string} episodeDescription - A description of the episode.
 * @property {string} showId - The unique identifier for the podcast show.
 * @property {string} showTitle - The title of the podcast show.
 * @property {string} seasonTitle - The title of the season.
 * @property {string} seasonImage - The URL of the season's cover image.
 *
 * @typedef {Object} AudioPlayerContextValue
 * @property {Episode|null} currentEpisode - The currently playing episode, or null if no episode is selected.
 * @property {boolean} isPlaying - Whether the audio is currently playing.
 * @property {number} currentTime - The current playback time in seconds.
 * @property {number} duration - The total duration of the current episode in seconds.
 * @property {function(Episode): void} playEpisode - Function to start playing a given episode.
 * @property {function(): void} pauseEpisode - Function to pause the currently playing episode.
 * @property {function(): void} resumeEpisode - Function to resume playback of the currently paused episode.
 * @property {function(): void} toggle - Function to toggle between play and pause states.
 * @property {function(number): void} seek - Function to seek to a specific time in the current episode.
 */

export const AudioPlayerContext = createContext(null);

export function AudioPlayerProvider({ children }) {
  // State to hold the currently playing episode
  const [currentEpisode, setCurrentEpisode] = useState(null);
  // Ref to hold the audio element for the app
  const audioRef = useRef(new Audio());
  // playback state
  const [isPlaying, setIsPlaying] = useState(false);
  // time state for progress bar
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Whenever the current episode changes, update the audio source and reset time
  useEffect(() => {
    const audio = audioRef.current;
    if (!currentEpisode || !currentEpisode.url) return;

    audio.src = currentEpisode.url;
    audio.load();

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        setIsPlaying(false);
        alert("Failed to play the episode. Please try again.");
      });
  }, [currentEpisode]);

  // Set up event listeners for the audio element to track playback and time

  useEffect(() => {
    const audio = audioRef.current;

    function handleLoadedMetadata() {
      setDuration(audio.duration || 0);
    }
    function handleTimeUpdate() {
      setCurrentTime(audio.currentTime);
    }

    function handlePause() {
      setIsPlaying(false);
    }

    function handlePlay() {
      setIsPlaying(true);
    }

    function handleEnded() {
      setIsPlaying(false);
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    function handleBeforeUnload(e) {
      if (!isPlaying) return;
      e.preventDefault();
      e.returnValue = "";
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isPlaying]);

  function playEpisode(episode) {
    setCurrentEpisode(episode);
  }

  function pauseEpisode() {
    audioRef.current.pause();
    setIsPlaying(false);
  }

  function resumeEpisode() {
    audioRef.current.play();
    setIsPlaying(true);
  }

  function toggle() {
    if (isPlaying) pauseEpisode();
    else resumeEpisode();
  }

  function seek(time) {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }

  const value = {
    currentEpisode,
    isPlaying,
    currentTime,
    duration,
    playEpisode,
    pauseEpisode,
    resumeEpisode,
    toggle,
    seek,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
}
