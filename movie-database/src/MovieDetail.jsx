import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: API_KEY,
              language: "en-US",
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <p style={styles.loading}>Loading...</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          style={styles.poster}
        />
        <div style={styles.info}>
          <h2>{movie.title}</h2>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}
          </p>
          <p>
            <strong>Overview:</strong> {movie.overview}
          </p>
          {movie.genres && (
            <p>
              <strong>Genres:</strong>{" "}
              {movie.genres.map((g) => g.name).join(", ")}
            </p>
          )}
          {movie.runtime && (
            <p>
              <strong>Runtime:</strong> {movie.runtime} minutes
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  loading: {
    textAlign: "center",
    padding: "2rem",
  },
  container: {
    padding: "2rem",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "1rem",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    maxWidth: "1000px",
    width: "100%",
    gap: "1.5rem",
  },
  poster: {
    width: "300px",
    borderRadius: "8px",
    objectFit: "cover",
  },
  info: {
    flex: 1,
  },
};

export default MovieDetail;
