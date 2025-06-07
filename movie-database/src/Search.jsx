import React, { useState } from "react";
import { searchMovies } from "./api.js";

const Search = ({ onResults }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    const results = await searchMovies(query);
    onResults(results);
  };

  return (
    <form onSubmit={handleSearch} style={styles.form}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Search
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    justifyContent: "center",
    margin: "2rem 0",
  },
  input: {
    padding: "0.5rem",
    fontSize: "16px",
    width: "300px",
  },
  button: {
    padding: "0.5rem 1rem",
    marginLeft: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default Search;
