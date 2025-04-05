import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { Link } from "react-router-dom";

const ImgSlider = () => {
  const { movies, loading, error } = useContext(Context);
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImg((prevImg) => (prevImg + 1) % movies.length);
    }, 12000);

    return () => clearInterval(interval);
  }, [movies.length]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const currentMovie = movies[currentImg] || {};

  return (
    <div
      className="relative w-screen mt-10 overflow-x-hidden"
      style={{
        height: window.innerWidth < 768 ? "400px" : "90vh",
      }}
    >
      <div className="absolute inset-0 z-0">
        {movies.length > 0 && currentMovie.poster_path && (
          <img
            className="absolute right-0 bg-no-repeat h-full object-fill w-full md:w-5/6"
            key={currentMovie.id}
            src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
            alt={currentMovie.title || currentMovie.name || "Movie Poster"}
          />
        )}

        <div
          style={{ left: "-68%" }}
          className="absolute inset-0 bg-gradient-to-r from-black via-black to-transparent"
        ></div>
      </div>
      {movies.length > 0 && (
        <div className="absolute bottom-10 left-0 md:w-1/3 w-3/4 p-4 ml-1">
          <h1 className="text-white line-clamp-3 font-bold md:text-5xl text-2xl">
            {currentMovie.title || currentMovie.name || "Untitled"}
          </h1>
          <span className="flex items-center gap-3 mt-3">
            <h1 className="bg-white font-semibold inline-block rounded-lg px-2">
              {currentMovie.media_type || "Unknown"}
            </h1>
            <h1 className="text-white font-semibold">
              📅{" "}
              {new Date(
                currentMovie.release_date ||
                  currentMovie.first_air_date ||
                  Date.now()
              ).getFullYear()}
            </h1>
            <h1 className="text-white">
              ⭐
              {typeof currentMovie.vote_average === "number"
                ? currentMovie.vote_average.toFixed(1)
                : "N/A"}
            </h1>
          </span>
          <p
            className="text-white text-xs md:text-lg font-semibold overflow-hidden mb-3"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
            }}
          >
            {currentMovie.overview || "No description available."}
          </p>
          <Link
            to={{
              pathname: `/video/${currentMovie.id}/${currentMovie.media_type}/`,
            }}
            key={currentMovie.id}
            className="bg-white p-1 cursor-pointer md:px-1 text-center rounded-xl transition duration-300 ease-in-out hover:bg-red-500"
          >
            ▶️watch
          </Link>
        </div>
      )}
    </div>
  );
};

export default ImgSlider;
