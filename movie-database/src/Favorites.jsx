import React, { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "./favorites.js";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleRemove = (id) => {
    removeFavorite(id);
    setFavorites(getFavorites());
  };

  return (
    <div style={{ padding: "1rem" }}>
      <Link to="/" style={{ textDecoration: "underline" }}>
        ← Back to Home
      </Link>
      <h2>Your Favorite Movies</h2>

      <div style={styles.grid}>
        {favorites.length === 0 ? (
          <p>No favorites yet.</p>
        ) : (
          favorites.map((movie) => (
            <div key={movie.id} style={styles.card}>
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: "100%" }}
                />
                <h3>{movie.title}</h3>
              </Link>
              <button
                onClick={() => handleRemove(movie.id)}
                style={styles.removeBtn}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    marginTop: "1rem",
  },
  card: {
    width: "200px",
    background: "#fff",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  removeBtn: {
    marginTop: "0.5rem",
    background: "red",
    color: "#fff",
    border: "none",
    padding: "0.3rem 0.6rem",
    cursor: "pointer",
  },
};

export default Favorites;
