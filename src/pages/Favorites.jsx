import React from "react";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext } from "react";
import { FavContext } from "../context/FavContext";
const Favorites = () => {
  const { favorites, clearFavorites } = useContext(FavContext);
  return (
    <div className="w-screen overflow-x-hidden">
      <Navbar />
      <div className="mt-14">
        <div className="text-white md:p-5 p-1">
          <h1 className="text-3xl font-bold mb-4">Your Favorite movies</h1>
            <button
                className="bg-red-500 text-white hover:bg-red-400 px-4 py-2 rounded-md mb-4"
                onClick={clearFavorites}
            >
                Clear All Favorites
            </button>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 md:gap-3 gap-1">
            {favorites.length > 0 ? (
              favorites.map(
                (movie) =>
                  movie.poster_path && (
                    <MovieCard
                      key={movie.id}
                      movies={[movie]}
                      mediaType={movie.media_type}
                    />
                  )
              )
            ) : (
              <p className="text-center text-white">
                No favorite movies found.
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Favorites;
