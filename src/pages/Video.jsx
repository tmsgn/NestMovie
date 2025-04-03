import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import {
  getMovieDetails,
  getGenre,
  getCasts,
  getRecommendedMovies,
  topRatedMovies as fetchTopRatedMovies,
  getEpsoides,
  getSeasons,
  getRecommendedTVShows,
  topRatedTVShows as fetchTopRatedTVShows,
} from "../services/api";
import EpsoideCard from "../components/EpsoideCard";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import MovieCard from "../components/MovieCard";
import { FavContext } from "../context/FavContext";

const Video = () => {
  const { id, mediaType } = useParams();
  const location = useLocation();
  const [media, setMedia] = useState(location.state?.movie || null);
  const [loading, setLoading] = useState(!media);
  const [casts, setCasts] = useState([]);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [relatedTVShows, setRelatedTVShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentSeason, setCurrentSeason] = useState(1);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [seasons, setSeasons] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [iframeUrl, setIframeUrl] = useState("");
  const [tvIframeUrl, setTvIframeUrl] = useState("");
  const [isSeasonListOpen, setIsSeasonListOpen] = useState("hidden");
  const genreId = media?.genres?.[0]?.id || null;

  const { favorites, addFavorite, removeFavorite } = useContext(FavContext);

  useEffect(() => {
    if (media) {
      setLoading(true);
      setIframeUrl(`https://vidfast.pro/movie/${media.id}`);
      setTvIframeUrl(
        `https://vidfast.pro/tv/${media.id}/${currentSeason}/${currentEpisode}`
      );
      setLoading(false);
    }
  }, [media]);

  useEffect(() => {
    setLoading(true);
    setTvIframeUrl(
      `https://vidfast.pro/tv/${media.id}/${currentSeason}/${currentEpisode}`
    );
    setLoading(false);
  }, [currentSeason, currentEpisode, media]);

  useEffect(() => {
    setLoading(true);
    const fetchEpsoides = async () => {
      try {
        const data = await getEpsoides(id, selectedSeason);
        if (!data || data.length === 0) {
          console.warn("No episodes found for the selected season.");
          setEpisodes([]);
          setCurrentEpisode(1);
          return;
        }
        setCurrentEpisode(data[0]?.episode_number || 1);
        setEpisodes(data);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    };
    fetchEpsoides();
    setLoading(false);
  }, [id, selectedSeason]);

  useEffect(() => {
    setLoading(true);
    const fetchSeasons = async () => {
      try {
        const data = await getSeasons(id);
        if (!data || data.length === 0) {
          console.warn("No seasons found for the given ID.");
          setSeasons([]);
          setSelectedSeason(1);
          return;
        }
        const filteredSeasons = data.filter(
          (season) => season.season_number !== 0
        );
        setSelectedSeason(filteredSeasons[0]?.season_number || 1);
        setSeasons(filteredSeasons);
      } catch (error) {
        console.error("Error fetching seasons:", error);
      }
    };
    fetchSeasons();
    setLoading(false);
  }, [id]);
  useEffect(() => {
    setLoading(true);
    const fetchMediaData = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(id, mediaType);
        setMedia(data);
      } catch (error) {
        console.error("Error fetching media data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMediaData();
    setLoading(false);
  }, [id, mediaType]);

  useEffect(() => {
    setLoading(true);
    if (genreId) {
      const fetchRelatedMovies = async () => {
        try {
          const data = await getRecommendedMovies(genreId);
          const filteredMovies = data.filter((movie) => movie.id !== media.id);
          setRelatedMovies(filteredMovies);
        } catch (error) {
          console.error("Error fetching related movies:", error);
        }
      };
      fetchRelatedMovies();
    }
    setLoading(false);
  }, [genreId, media]);

  useEffect(() => {
    if (genreId) {
      const fetchRelatedTvshows = async () => {
        try {
          const data = await getRecommendedTVShows(genreId);
          const filteredShows = data.filter((show) => show.id !== media.id);
          setRelatedTVShows(filteredShows);
        } catch (error) {
          console.error("Error fetching related TV shows:", error);
        }
      };
      fetchRelatedTvshows();
    }
  }, [genreId, media]);

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

  useEffect(() => {
    const fetchCasts = async () => {
      try {
        const data = await getCasts(id, mediaType);
        setCasts(data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching casts:", error);
      }
    };
    fetchCasts();
  }, [id, mediaType]);

  if (loading) {
    return (
      <div>
        <NavBar />
        <div className="flex justify-center items-center gap-2 bg-[rgba(0, 0, 0, 0.897)] h-screen dark:invert">
          <div
            className="h-8 w-8 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="h-8 w-8 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="h-8 w-8 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    );
  }

  if (!media) {
    return (
      <div>
        <NavBar />
        <div className="text-center absolute top-20 text-white">
          check your connection
        </div>
      </div>
    );
  }

  if (mediaType === "movie") {
    return (
      <div className="overflow-x-hidden   w-screen flex flex-col">
        <NavBar />
        <div className="w-screen h-screen">
          <div className="md:ml-4   p-2  gap-2 overflow-hidden text-white flex flex-col  mt-14 ">
            <div className="flex  w-full   flex-col lg:flex-row">
              {iframeUrl && (
                <iframe
                  src={iframeUrl}
                  title="Media Player"
                  className="lg:w-2/3 w-full lg:h-auto h-64 sm:h-96 rounded-lg"
                  allowFullScreen
                ></iframe>
              )}

              <div className="flex mr-3  min-h-full flex-col   rounded-lg  p-2 lg:w-1/3 w-full">
                <div className="flex justify-around  md:mb-2 md:py-2">
                  <span
                    onClick={() => {
                      setLoading(true);
                      setIframeUrl(`https://vidfast.pro/movie/${media.id}`);
                      setTimeout(() => {
                        setLoading(false);
                      }, 600);
                    }}
                    className="bg-gray-700 md:p-2 p-1 h-8 md:h-auto md:rounded-xl  rounded-lg md:text-lg  text-purple-400 hover:bg-gray-600 cursor-pointer"
                  >
                    server 1
                  </span>
                  <span
                    onClick={() => {
                      setLoading(true);
                      setIframeUrl(
                        `https://vidsrc.xyz/embed/movie/${media.id}`
                      );
                      setTimeout(() => {
                        setLoading(false);
                      }, 600);
                    }}
                    className="bg-gray-700 md:p-2 p-1 h-8 md:h-auto md:rounded-xl  rounded-lg md:text-lg  text-purple-400 hover:bg-gray-600 cursor-pointer"
                  >
                    server 2
                  </span>
                  <span
                    onClick={() => {
                      setLoading(true);
                      setIframeUrl(`https://embed.su/embed/movie/${media.id}`);
                      setTimeout(() => {
                        setLoading(false);
                      }, 600);
                    }}
                    className="bg-gray-700 md:p-2 p-1 h-8 md:h-auto md:rounded-xl  rounded-lg md:text-lg  text-purple-400 hover:bg-gray-600 cursor-pointer"
                  >
                    server 3
                  </span>
                </div>
                <div className="flex flex-col  h-fit  w-full">
                  <div className="flex flex-col mb-3 ">
                    <h1 className="text-2xl  font-bold">{media.title}</h1>
                  </div>

                  <div className="w-full flex h-fit ">
                    <img
                      src={
                        media.poster_path
                          ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
                          : ""
                      }
                      alt={media.title || media.name}
                      className="w-32 h-40 md:w-40 md:h-auto rounded-xl"
                    />

                    <div className="flex flex-col  text-sm md:text-base text-gray-400 ">
                      <div className="flex w-full m-3 lg:m-0  lg:justify-around gap-5">
                        <h1 className="rounded-lg">{media.runtime} min</h1>
                        <h1 className="font-semibold">
                          {media.vote_average
                            ? `${media.vote_average.toFixed(1)} ⭐`
                            : ""}
                        </h1>
                        <h1>
                          {new Date(
                            media.release_date || media.first_air_date
                          ).getFullYear()}
                        </h1>
                      </div>
                      <div className="ml-5 mt-5">
                        <span className="flex gap-3 mb-2">
                          Country:
                          <h1 className="text-white line-clamp-3">
                            {media.production_countries?.[0]?.name || ""}
                          </h1>
                        </span>
                        <span className="flex gap-3 mb-2">
                          Genre:
                          <h1 className="text-white line-clamp-3">
                            {media.genres?.[0]?.name || ""}
                          </h1>
                        </span>
                        <span className="flex gap-3 mb-2">
                          Casts:
                          <h1 className="text-white line-clamp-4">
                            {casts.length > 0
                              ? casts.map((cast) => cast.name).join(", ")
                              : ""}
                          </h1>
                        </span>
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            if (favorites.some((fav) => fav.id === media.id)) {
                              removeFavorite(media.id);
                            } else {
                              addFavorite(media);
                            }
                            e.preventDefault();
                          }}
                          className="p-1 text-purple-400 rounded-full top-4 right-4  cursor-pointer"
                        >
                          {favorites.some((fav) => fav.id === media.id)
                            ? "❤️ added to favorite"
                            : "🤍  click to add to favorite"}  
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h1 className="text-2xl font-bold">Overview</h1>
                  <p className="text-gray-400 line-clamp-3">{media.overview}</p>
                </div>
              </div>
            </div>

            <div>
              <div>
                <h1 className="text-2xl font-bold mt-5">Recomended for you</h1>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 md:gap-3 gap-1">
                  {relatedMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movies={[movie]}
                      mediaType="movie"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  if (mediaType === "tv") {
    return (
      <div className="overflow-x-hidden   w-screen flex flex-col">
        <NavBar />
        <div className="w-screen h-screen">
          <div className="md:ml-4   p-2  gap-2 overflow-hidden text-white flex flex-col  mt-14 ">
            <div className="flex  w-full   flex-col lg:flex-row">
              {tvIframeUrl && (
                <iframe
                  src={tvIframeUrl}
                  title="Media Player"
                  className="lg:w-2/3 w-full lg:h-auto h-64 sm:h-96 rounded-lg"
                  allowFullScreen
                ></iframe>
              )}

              <div className="flex mr-3  min-h-full flex-col   rounded-lg  p-2 lg:w-1/3 w-full">
                <div className="flex justify-around  md:mb-2 md:py-2">
                  <span
                    onClick={() => {
                      setLoading(true);
                      setTvIframeUrl(
                        `https://vidfast.pro/tv/${media.id}/${currentSeason}/${currentEpisode}`
                      );
                      setTimeout(() => {
                        setLoading(false);
                      }, 600);
                    }}
                    className="bg-gray-700 md:p-2 p-1 h-8 md:h-auto md:rounded-xl  rounded-lg md:text-lg  text-purple-400 hover:bg-gray-600 cursor-pointer"
                  >
                    server 1
                  </span>
                  <span
                    onClick={() => {
                      setLoading(true);
                      setTvIframeUrl(
                        `https://player.autoembed.cc/embed/tv/${media.id}/${currentSeason}/${currentEpisode}`
                      );
                      setTimeout(() => {
                        setLoading(false);
                      }, 600);
                    }}
                    className="bg-gray-700 md:p-2 p-1 h-8 md:h-auto md:rounded-xl  rounded-lg md:text-lg  text-purple-400 hover:bg-gray-600 cursor-pointer"
                  >
                    server 2
                  </span>
                  <span
                    onClick={() => {
                      setLoading(true);
                      setTvIframeUrl(
                        `https://embed.su/embed/tv/${media.id}/${currentSeason}/${currentEpisode}`
                      );
                      setTimeout(() => {
                        setLoading(false);
                      }, 600);
                    }}
                    className="bg-gray-700 md:p-2 p-1 h-8 md:h-auto md:rounded-xl  rounded-lg md:text-lg  text-purple-400 hover:bg-gray-600 cursor-pointer"
                  >
                    server 3
                  </span>
                </div>
                <div className="flex flex-col  h-fit  w-full">
                  <div className="flex flex-col mb-3 ">
                    <h1 className="text-2xl  font-bold">{media.name}</h1>
                  </div>
                  <div className="w-full flex h-fit ">
                    <img
                      src={
                        media.poster_path
                          ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
                          : ""
                      }
                      alt={media.name || media.title}
                      className="w-32 h-40 md:w-40 md:h-auto rounded-xl"
                    />

                    <div className="flex flex-col  text-sm md:text-base text-gray-400 ">
                      <div>
                        <div className="flex w-full m-3 lg:m-0  lg:justify-around gap-5">
                          <span>
                            S{currentSeason} E{currentEpisode}
                          </span>
                          <h1 className="font-semibold">
                            {media.vote_average
                              ? `${media.vote_average.toFixed(1)} ⭐`
                              : ""}
                          </h1>
                          <h1>
                            {new Date(
                              media.release_date || media.first_air_date
                            ).getFullYear()}
                          </h1>
                        </div>
                        <h1>{currentEpisode.name}</h1>
                      </div>
                      <div className="ml-5 mt-5">
                        <span className="flex gap-3 mb-2">
                          Country:
                          <h1 className="text-white line-clamp-3">
                            {media.production_countries?.[0]?.name || ""}
                          </h1>
                        </span>
                        <span className="flex gap-3 mb-2">
                          Genre:
                          <h1 className="text-white line-clamp-3">
                            {media.genres?.[0]?.name || ""}
                          </h1>
                        </span>
                        <span className="flex gap-3 mb-2">
                          Casts:
                          <h1 className="text-white line-clamp-4">
                            {casts.length > 0
                              ? casts.map((cast) => cast.name).join(", ")
                              : ""}
                          </h1>
                        </span>
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            if (favorites.some((fav) => fav.id === media.id)) {
                              removeFavorite(media.id);
                            } else {
                              addFavorite(media);
                            }
                            e.preventDefault();
                          }}
                          className="p-1 text-purple-400 rounded-full top-4 right-4  cursor-pointer"
                        >
                          {favorites.some((fav) => fav.id === media.id)
                            ? "❤️ added to favorite"
                            : "🤍  click to add to favorite"}  
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 h-24">
                  <h1 className="text-2xl font-bold">Overview</h1>
                  <p className="text-gray-400 line-clamp-3">
                    {episodes[currentEpisode]?.overview || ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full relative h-fit">
              <button
                onClick={() =>
                  setIsSeasonListOpen(
                    isSeasonListOpen === "hidden" ? "block" : "hidden"
                  )
                }
                className="text-md hover:bg-gray-700 items-center flex font-semibold mb-2 border rounded-lg p-1  outline-none"
              >
                Season {selectedSeason}{" "}
                <span className="material-symbols-outlined items-center">
                  arrow_drop_down
                </span>
              </button>
              <div
                className={`absolute rounded-lg overflow-y-auto h-44 w-48 text-gray-600 thin-scrollbar bg-black shadow-lg z-10 ${isSeasonListOpen}`}
              >
                {seasons.map((season) => (
                  <div
                    key={season.season_number}
                    className="p-2 hover:text-gray-500 font-semibold cursor-pointer"
                    onClick={() => {
                      setSelectedSeason(season.season_number);
                      setIsSeasonListOpen("hidden");
                    }}
                  >
                    Season {season.season_number}
                  </div>
                ))}
              </div>
              <div className="grid md:grid-cols-6 border-b lg:grid-cols-7 grid-cols-4 gap-3 mr-4">
                {episodes.map((episode, index) => (
                  <Link
                    to={`/video/${media.id}/${mediaType}/`}
                    key={index}
                    className="flex flex-wrap mb-2"
                    onClick={() => {
                      setLoading(true);
                      setCurrentEpisode(episode.episode_number);
                      setCurrentSeason(selectedSeason);
                      setTvIframeUrl(
                        `https://embed.su/embed/tv/${media.id}/${selectedSeason}/${episode.episode_number}`
                      );
                      setTimeout(() => {
                        setLoading(false);
                      }, 600);
                    }}
                  >
                    <EpsoideCard
                      episode={episode}
                      seasonNumber={selectedSeason}
                    />
                  </Link>
                ))}
              </div>
              <div>
                <h1 className="text-2xl font-bold mt-5">Recomended for you</h1>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 md:gap-3 gap-1">
                  {relatedTVShows.map((movie) => (
                    <MovieCard key={movie.id} movies={[movie]} mediaType="tv" />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
};

export default Video;
