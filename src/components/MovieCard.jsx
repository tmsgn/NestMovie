import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getGenre } from "../services/api";
import { FavContext } from "../context/FavContext";

const MovieCard = ({ movies, mediaType }) => {
  const [genres, setGenres] = useState([]);
  const { favorites, addFavorite, removeFavorite } = useContext(FavContext);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresData = await getGenre();
        setGenres(genresData);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const getGenreName = (genreIds) => {
    if (!genreIds || !genres.length) return "Unknown";

    const genre = genres.find((g) => genreIds.includes(g.id));
    return genre ? genre.name : "Unknown";
  };

  return (
    <>
      {movies.map((movie) => (
        <Link
          to={{
            pathname: `/video/${movie.id}/${mediaType}/`,
          }}
          key={movie.id}
          className="w-auto rounded-lg cursor-pointer"
        >
          <div className="hover:bg-gray-400 box group relative hover:text-black p-1 rounded-xl transform transition-all duration-300 hover:scale-105">
            <img
              className="rounded-lg w-full"
              src={`http://image.tmdb.org/t/p/w780${movie.poster_path}`}
              alt={movie.title || movie.name || "Movie Poster"}
            />
            <div className="py-1 inline">
              <h1 className="truncate font-semibold text-xs sm:text-base group-hover:text-black">
                {movie.title || movie.name}
              </h1>
              <div className="flex gap-5 items-center relative">
                <h1 className="text-gray-300 text-xs lg:text-base group-hover:text-black">
                  {new Date(
                    movie.release_date || movie.first_air_date
                  ).getFullYear()}
                </h1>
                <div className="relative add-hover">
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      if (favorites.some((fav) => fav.id === movie.id)) {
                        removeFavorite(movie.id);
                      } else {
                        addFavorite(movie);
                      }
                      e.preventDefault();
                    }}
                    className="p-1 add rounded-full top-4 right-4  cursor-pointer"
                  >
                    {favorites.some((fav) => fav.id === movie.id) ? "❤️" : "🤍"}
                  </span>
                </div>
              </div>
              <div className="flex flex-row justify-between flex-wrap relative">
                <div className="flex flex-row flex-wrap gap-x-3">
                  <h1 className="inline text-gray-400 group-hover:text-black text-xs md:text-sm">
                    {getGenreName(movie.genre_ids)}
                  </h1>
                  <h1 className="text-xs lg:text-sm font-semibold">
                    {typeof movie.vote_average === "number"
                      ? `${movie.vote_average.toFixed(1)} ⭐`
                      : ""}
                  </h1>
                </div>
                <h1 className="right-1 text-xs lg:text-sm group-hover:text-black text-gray-300 border group-hover:border-black px-1 text-center rounded-lg">
                  {mediaType}
                </h1>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default MovieCard;
