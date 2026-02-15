const STORAGE_KEY = "listeningProgress";

export function getAllProgress() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}

export function getProgress(episodeKey) {
  const all = getAllProgress();
  return all[episodeKey]; // could be undefined
}

export function saveProgress(episodeKey, data) {
  const all = getAllProgress();
  all[episodeKey] = data;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function clearAllProgress() {
  localStorage.removeItem(STORAGE_KEY);
}
