import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [watchedToggle, setWatchedToggle] = useState("All");
  useEffect(() => {
    setWatched(new Array(movies.length).fill(false));
  }, [movies]);
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSubmit = (e) => {
    fetch("http://localhost:8080/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: e.target[0].value }),
    }).catch((err) => alert(err));
  };
  const handleDelete = (id) => {
    fetch(`http://localhost:8080/movies/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.reload(false);
  };
  const handleWatched = (pos) => {
    const updatedWatched = watched.map((val, idx) =>
      idx === pos ? !val : val
    );
    setWatched(updatedWatched);
  };
  const handleWatchedToggle = (e) => {
    setWatchedToggle(e.target.value);
  };
  useEffect(() => {
    fetch("http://localhost:8080/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);
  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search Movies"
        onChange={(e) => handleChange(e)}
      />
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" placeholder="Add Movie" />
        <input type="submit" />
      </form>
      <div onChange={(e) => handleWatchedToggle(e)}>
        <input type="radio" value="All" name="watched" /> All
        <input type="radio" value="Watched" name="watched" /> Watched
        <input type="radio" value="To watch" name="watched" /> To watch
      </div>
      <ul className="allMovies">
        {movies
          .filter((movie) =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((movie, idx) => (
            <li key={movie.id}>
              {movie.title}
              <button onClick={() => handleDelete(movie.id)}>DELETE</button>
              <label>
                <input
                  type="checkbox"
                  id={movie.id}
                  value={movie.title}
                  checked={watched[idx] || 0}
                  onChange={() => handleWatched(idx)}
                />
                WATCHED
              </label>
            </li>
          ))}
      </ul>
      <ul className="watchedMovies">
        Watched
        {watched
          .filter((val) => val === true)
          .map((movie, idx) => (
            <li key={movie.id}>
              {movie.title}
              <button onClick={() => handleDelete(movie.id)}>DELETE</button>
              <label>
                <input
                  type="checkbox"
                  id={movie.id}
                  value={movie.title}
                  checked={watched[idx] || 0}
                  onChange={() => handleWatched(idx)}
                />
                WATCHED
              </label>
            </li>
          ))}
      </ul>
      <ul className="toWatchMovies">
        To watch
        {watched
          .filter((val) => val === false)
          .map((movie, idx) => (
            <li key={movie.id}>
              {movie.title}
              <button onClick={() => handleDelete(movie.id)}>DELETE</button>
              <label>
                <input
                  type="checkbox"
                  id={movie.id}
                  value={movie.title}
                  checked={watched[idx] || 0}
                  onChange={() => handleWatched(idx)}
                />
                WATCHED
              </label>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
