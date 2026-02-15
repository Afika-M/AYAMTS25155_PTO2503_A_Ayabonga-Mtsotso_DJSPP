import { createContext, useEffect, useRef, useState } from "react";

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
