import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import MovieDetail from "./MovieDetail";
import Favorites from "./Favorites.jsx";
import { addFavorite, isFavorite, removeFavorite } from "./favorites.js";
import axios from "axios";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPopularMovies();
    setFavorites(getFavoritesFromStorage());
  }, [page]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular`,
        {
          params: {
            api_key: API_KEY,
            language: "en-US",
            page,
          },
        }
      );
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearchResults = (results) => {
    setMovies(results);
    setPage(1);
    setTotalPages(1);
    navigate("/");
  };

  const goHome = () => {
    fetchPopularMovies();
    setPage(1);
    navigate("/");
  };

  const getFavoritesFromStorage = () => {
    try {
      const favs = JSON.parse(localStorage.getItem("favorites"));
      return favs || [];
    } catch {
      return [];
    }
  };

  const toggleFavorite = (movie) => {
    const isFav = favorites.find((fav) => fav.id === movie.id);
    let updatedFavorites;

    if (isFav) {
      updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
      removeFavorite(movie.id);
    } else {
      updatedFavorites = [...favorites, movie];
      addFavorite(movie);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isMovieFavorite = (id) => favorites.some((fav) => fav.id === id);

  const playTrailer = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        {
          params: {
            api_key: API_KEY,
            language: "en-US",
          },
        }
      );
      const videos = response.data.results;
      const trailer =
        videos.find(
          (video) =>
            video.type === "Trailer" &&
            video.site === "YouTube" &&
            video.official === true
        ) ||
        videos.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
      if (trailer) {
        window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
      } else {
        alert("Trailer not available.");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      alert("Failed to load trailer.");
    }
  };

  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
      <nav style={styles.nav}>
        <div style={styles.navHeader}>
          <h2 style={{ color: "red", cursor: "pointer" }} onClick={goHome}>
            ALX FLIX
          </h2>
          {windowWidth <= 768 && (
            <button style={styles.menuButtonVisible} onClick={toggleMenu}>
              ☰
            </button>
          )}
        </div>
        <div
          style={{
            ...styles.navLinks,
            maxHeight: windowWidth <= 768 ? (menuOpen ? "300px" : "0") : "none",
            opacity: windowWidth <= 768 && !menuOpen ? 0 : 1,
            transition: "all 0.3s ease-in-out",
            overflow: "hidden",
            display: windowWidth > 768 || menuOpen ? "flex" : "none",
            flexDirection: windowWidth <= 768 ? "column" : "row",
            alignItems: windowWidth <= 768 ? "flex-start" : "center",
          }}
        >
          <button
            onClick={goHome}
            style={styles.link}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#555")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            Home
          </button>
          <Link
            to="/favorites"
            style={styles.link}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#555")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            Favorites
          </Link>
          <Link
            to="/signup"
            style={styles.link}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#555")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            style={styles.link}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#555")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            Login
          </Link>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1 style={{ textAlign: "center" }}>Movie Database</h1>
              <Search onResults={handleSearchResults} />
              {movies.length === 0 ? (
                <p style={{ textAlign: "center", padding: "1rem" }}>
                  No movies found.
                </p>
              ) : (
                <div style={styles.grid}>
                  {movies.map((movie) => (
                    <div
                      key={movie.id}
                      style={styles.card}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.boxShadow =
                          "0 8px 20px rgba(0,0,0,0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow =
                          "0 2px 8px rgba(0,0,0,0.1)";
                      }}
                    >
                      <Link
                        to={`/movie/${movie.id}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {movie.poster_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title}
                            style={{ width: "100%", borderRadius: "4px" }}
                          />
                        ) : (
                          <div style={styles.placeholder}>No Image</div>
                        )}
                        <h3>{movie.title}</h3>
                      </Link>

                      <button
                        onClick={() => toggleFavorite(movie)}
                        style={{
                          ...styles.heartBtn,
                          color: isMovieFavorite(movie.id) ? "red" : "black",
                        }}
                        title="Add to Favorites"
                      >
                        {isMovieFavorite(movie.id) ? "❤️" : "🤍"}
                      </button>

                      <button
                        onClick={() => playTrailer(movie.id)}
                        style={{
                          ...styles.trailerBtn,
                        }}
                        title="Play Trailer"
                      >
                        ▶ Play Trailer
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {totalPages > 1 && (
                <div style={styles.pagination}>
                  <button
                    disabled={page === 1}
                    onClick={() => {
                      setPage((prev) => Math.max(prev - 1, 1));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    ◀ Prev
                  </button>
                  <span style={{ margin: "0 1rem" }}>
                    Page {page} of {totalPages}
                  </span>
                  <button
                    disabled={page === totalPages}
                    onClick={() => {
                      setPage((prev) => Math.min(prev + 1, totalPages));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Next ▶
                  </button>
                </div>
              )}
            </div>
          }
        />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

const styles = {
  nav: {
    padding: "1rem",
    backgroundColor: "#333",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  navHeader: {
    width: "100%",
    maxWidth: "1200px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuButtonVisible: {
    fontSize: "1.5rem",
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },
  navLinks: {
    width: "100%",
    maxWidth: "1200px",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "1rem",
    paddingTop: "1rem",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "1rem",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    transition: "background 0.3s",
    background: "transparent",
    border: "none",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
    padding: "1rem",
  },
  card: {
    background: "#fff",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    position: "relative",
  },
  placeholder: {
    height: "300px",
    backgroundColor: "#ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  heartBtn: {
    marginTop: "0.5rem",
    fontSize: "1.5rem",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  trailerBtn: {
    marginTop: "0.5rem",
    fontSize: "1rem",
    backgroundColor: "#2196F3",
    border: "none",
    borderRadius: "4px",
    padding: "0.5rem 1rem",
    color: "white",
    cursor: "pointer",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
    gap: "1rem",
  },
};

export default App;
