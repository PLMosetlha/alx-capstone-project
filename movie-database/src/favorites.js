// src/utils/favorites.js

const FAVORITES_KEY = 'favoriteMovies';

export function getFavorites() {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addFavorite(movie) {
  const favorites = getFavorites();
  if (!favorites.some((m) => m.id === movie.id)) {
    favorites.push(movie);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function isFavorite(movieId) {
  const favorites = getFavorites();
  return favorites.some((m) => m.id === movieId);
}

export function removeFavorite(movieId) {
  const favorites = getFavorites();
  const updated = favorites.filter((m) => m.id !== movieId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
}
