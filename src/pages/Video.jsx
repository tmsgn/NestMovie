import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import {
  getMovieDetails,
  getGenre,
  getCasts,
  getRecommendedMovies,
  topRatedMovies as fetchTopRatedMovies,
  getEpsoides,
  getSeasons,
  getRecommendedTVShows,
  topRatedTVShows as fetchTopRatedTVShows, // Import the correct function
} from '../services/api';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';

const Video = () => {
  const { id, mediaType } = useParams();
  const location = useLocation();
  const [media, setMedia] = useState(location.state?.movie || null);
  const [loading, setLoading] = useState(!media);
  const [casts, setCasts] = useState([]);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [relatedTVShows, setRelatedTVShows] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [topTVShows, setTopTVShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentSeason, setCurrentSeason] = useState(1);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [seasons, setSeasons] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [iframeUrl, setIframeUrl] = useState('');
  const [tvIframeUrl, setTvIframeUrl] = useState('');
  const genreId = media?.genres?.[0]?.id || null;

  useEffect(() => {
    if (media) {
      setIframeUrl(`https://player.autoembed.cc/embed/movie/${media.id}`);
      setTvIframeUrl(`https://player.autoembed.cc/embed/tv/${media.id}/${currentSeason}/${currentEpisode}`);
    }
  }, [media]);

  useEffect(() => {
    const fetchEpsoides = async () => {
      try {
        const data = await getEpsoides(id, selectedSeason);
        setCurrentEpisode(data[0]?.episode_number || 1);
        setEpisodes(data);
      } catch (error) {
        console.error('Error fetching episodes:', error);
      }
    };
    fetchEpsoides();
  }, [id, selectedSeason]);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const data = await getSeasons(id);
        setSelectedSeason(data[0]?.season_number || 1);
        setSeasons(data);
      } catch (error) {
        console.error('Error fetching seasons:', error);
      }
    };
    fetchSeasons();
  }, [id]);

  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(id, mediaType);
        setMedia(data);
      } catch (error) {
        console.error('Error fetching media data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMediaData();
  }, [id, mediaType]);

  useEffect(() => {
    if (genreId) {
      const fetchRelatedMovies = async () => {
        try {
          const data = await getRecommendedMovies(genreId);
          const filteredMovies = data.filter((movie) => movie.id !== media.id);
          setRelatedMovies(filteredMovies);
        } catch (error) {
          console.error('Error fetching related movies:', error);
        }
      };
      fetchRelatedMovies();
    }
  }, [genreId, media]);

  useEffect(() => {
    if (genreId) {
      const fetchRelatedTvshows = async () => {
        try {
          const data = await getRecommendedTVShows(genreId);
          const filteredShows = data.filter((show) => show.id !== media.id);
          setRelatedTVShows(filteredShows);
        } catch (error) {
          console.error('Error fetching related TV shows:', error);
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
        console.error('Error fetching genres:', error);
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
        console.error('Error fetching casts:', error);
      }
    };
    fetchCasts();
  }, [id, mediaType]);

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const data = await fetchTopRatedMovies();
        setTopMovies(data);
      } catch (error) {
        console.error('Error fetching top-rated movies:', error);
      }
    };
    fetchTopMovies();
  }, []);

  useEffect(() => {
    const fetchTopTVShows = async () => {
      try {
        const data = await fetchTopRatedTVShows(); 
        setTopTVShows(data);
      } catch (error) {
        console.error('Error fetching top-rated TV shows:', error);
      }
    };
    fetchTopTVShows();
  }, []);

  const getGenreName = (genreIds) => {
    if (!genreIds || genreIds.length === 0) return '';
    return genreIds.map((id) => genres.find((genre) => genre.id === id)?.name || '').join(', ');
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="flex justify-center items-center h-screen">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </>
    );
  }

  if (!media) {
    return null;
  }

  if (mediaType === 'movie') {
    return (
      <div className="flex flex-col">
        <NavBar />
        <div className="flex mt-14 relative w-full">
          <div className="w-full flex flex-wrap">
            <iframe
              className="w-full h-full rounded-xl mx-3"
              src={iframeUrl}
              style={{ border: 'none' }}
              title="Movie Player"
              referrerPolicy="no-referrer"
            ></iframe>
            <div className="flex justify-center gap-5 items-center w-full mt-5">
              <span
                onClick={() => setIframeUrl(`https://flicky.host/embed/movie/?id=${media.id}`)}
                className="text-lg bg-red-300 p-2 px-3 rounded-3xl cursor-pointer hover:bg-red-400"
              >
                Flicky
              </span>
              <span
                onClick={() => setIframeUrl(`https://player.autoembed.cc/embed/movie/${media.id}`)}
                className="text-lg bg-red-300 p-2 px-3 rounded-3xl cursor-pointer hover:bg-red-400"
              >
                Vidsrc
              </span>
            </div>
          </div>
          <div className="rounded-lg w-1/3 bg-gray-400 p-3">
            <h2 className="text-xl font-bold mb-1">You may also like</h2>
            <div className="flex flex-col">
              {relatedMovies.slice(0, 7).map((movie) => (
                <Link
                  to={`/video/${movie.id}/${mediaType}/${movie.title || movie.name}`}
                  key={movie.id}
                  className="flex hover:bg-gray-600 rounded-lg cursor-pointer transform transition-all duration-150"
                >
                  <img
                    className="w-12 rounded-lg p-1"
                    src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <div>
                    <h1 className="text-md font-semibold line-clamp-1">{movie.title}</h1>
                    <h1 className="text-xs bg-white inline p-1 rounded-xl font-semibold">
                      {getGenreName([movie.genre_ids[0]])}
                    </h1>
                    <h1 className="text-xs font-semibold mx-2">
                      {movie.vote_average ? `${movie.vote_average.toFixed(1)} ⭐` : ''}
                    </h1>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="text-white mt-20 flex w-full">
          <img
            className="w-56 rounded-xl m-2"
            src={`http://image.tmdb.org/t/p/w500${media.poster_path}`}
            alt={media.title}
          />
          <div className="flex m-3 flex-col gap-4">
            <div className="flex gap-5">
              <div className="flex gap-5">
                <h1 className="text-black bg-white p-1 rounded-xl font-semibold">{mediaType}</h1>
                <h1 className="text-2xl font-semibold">{media.title}</h1>
              </div>
            </div>
            <h1>{media.vote_average} ⭐</h1>
            <h1>{media.overview}</h1>
            <span className="flex gap-3 text-gray-500">
              Country: <h1 className="text-white">{media.production_countries?.[0]?.name}</h1>
            </span>
            <span className="flex gap-3 text-gray-500">
              Genre: <h1 className="text-white">{media.genres?.[0]?.name}</h1>
            </span>
            <span className="flex gap-3 text-gray-500">
              Cast: <h1 className="text-white">{casts.map((cast) => cast.name).join(', ')}</h1>
            </span>
          </div>
        </div>

        <div className="text-white p-5">
          <h1 className="text-3xl font-bold mb-4">Recommended Movies</h1>
          {relatedMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {relatedMovies.slice(7, 100).map(
                (movie) => movie.poster_path && <MovieCard key={movie.id} movies={[movie]} mediaType="movie" />
              )}
            </div>
          ) : (
            <p>No recommended movies available.</p>
          )}

          <h1 className="text-3xl font-bold mt-8 mb-4">Top Rated Movies</h1>
          {topMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {topMovies.map(
                (movie) => movie.poster_path && <MovieCard key={movie.id} movies={[movie]} mediaType="movie" />
              )}
            </div>
          ) : (
            <p>No top-rated movies available.</p>
          )}
        </div>
        <Footer />
      </div>
    );
  }
  if (mediaType === 'tv') {
    return (
      <div className="flex flex-col">
        <NavBar />
        <div className="flex mt-14 relative w-full">
          <div className="w-full flex flex-wrap">
            <iframe
              className="w-full h-full rounded-xl mx-3"
              src={tvIframeUrl}
              style={{ border: 'none' }}
              title="TV Show Player"
              sandbox="allow-same-origin allow-scripts"
            ></iframe>
            <div className="flex justify-center gap-5 items-center w-full mt-5">
              <span
                onClick={() => setTvIframeUrl(`https://flicky.host/embed/tv/?id=${media.id}&s=${currentSeason}&e=${currentEpisode}`)}
                className="text-lg bg-red-300 p-2 px-3 rounded-3xl cursor-pointer hover:bg-red-400"
              >
                Flicky
              </span>
              <span
                onClick={() => setTvIframeUrl(`https://player.autoembed.cc/embed/tv/${media.id}/${currentSeason}/${currentEpisode}`)}
                className="text-lg bg-red-300 p-2 px-3 rounded-3xl cursor-pointer hover:bg-red-400"
              >
                Vidsrc
              </span>
            </div>
          </div>
          <div style={{ height: '80vh' }} className="rounded-lg w-1/3 overflow-y-auto bg-gray-400 p-3">
            <h2 className="text-xl font-bold mb-1">Seasons & Episodes</h2>
            <select
              className="bg-gray-600 text-white p-1 rounded-lg outline-none cursor-pointer mb-3"
              name="season"
              id="season"
              value={selectedSeason}
              onChange={(e) => {
                const seasonNumber = Number(e.target.value);
                setSelectedSeason(seasonNumber);
              }}
            >
              {seasons.map((season) => (
                <option
                  className="bg-gray-600 thin-scrollbar text-white cursor-pointer hover:bg-gray-700"
                  key={season.id}
                  value={season.season_number}
                >
                  Season {season.season_number}
                </option>
              ))}
            </select>
            <div className="flex flex-col">
              {episodes.map((episode, index) => (
                <Link
                  to={`/video/${media.id}/tv/${media.name}`}
                  key={index}
                  className="flex hover:bg-gray-600 rounded-lg cursor-pointer transform transition-all duration-150"
                  onClick={() => {
                    setCurrentEpisode(episode.episode_number);
                    setCurrentSeason(selectedSeason);
                    setTvIframeUrl(`https://player.autoembed.cc/embed/tv/${media.id}/${selectedSeason}/${episode.episode_number}`);
                  }}
                >
                  {episode.still_path && (
                    <img
                      className="w-12 h-14 rounded-lg p-1 object-cover"
                      src={`http://image.tmdb.org/t/p/w500${episode.still_path}`}
                      alt={episode.name}
                    />
                  )}
                  <div>
                    <h1 className="text-md font-semibold line-clamp-1">Episode {index + 1}: {episode.name}</h1>
                    <h1 className="text-xs font-semibold mx-2">
                      {episode.vote_average ? `${episode.vote_average.toFixed(1)} ⭐` : ''}
                    </h1>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="text-white mt-20 flex w-full">
          <img
            className="w-56 rounded-xl m-2"
            src={`http://image.tmdb.org/t/p/w500${media.poster_path}`}
            alt={media.title}
          />
          <div className="flex m-3 flex-col gap-4">
            <div className="flex gap-5">
              <div className="flex gap-5">
                <h1 className="text-black bg-white p-1 rounded-xl font-semibold">{mediaType}</h1>
                <h1 className="text-2xl font-semibold">{media.name}</h1>
              </div>
            </div>
            <h1>{media.vote_average} ⭐</h1>
            <h1>{media.overview}</h1>
            <span className="flex gap-3 text-gray-500">
              Country: <h1 className="text-white">{media.production_countries?.[0]?.name}</h1>
            </span>
            <span className="flex gap-3 text-gray-500">
              Genre: <h1 className="text-white">{media.genres?.[0]?.name}</h1>
            </span>
            <span className="flex gap-3 text-gray-500">
              Cast: <h1 className="text-white">{casts.map((cast) => cast.name).join(', ')}</h1>
            </span>
            <span className="flex gap-3 text-gray-500">
              Released on: <h1 className="text-white">{media.first_air_date}</h1>
            </span>
          </div>
        </div>

        <div className="text-white p-5">
          <h1 className="text-3xl font-bold mb-4">Recommended TV Shows</h1>
          {relatedTVShows.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {relatedTVShows.map(
                (show) => show.poster_path && <MovieCard key={show.id} movies={[show]} mediaType="tv" />
              )}
            </div>
          ) : (
            <p>No recommended TV shows available.</p>
          )}

          <h1 className="text-3xl font-bold mt-8 mb-4">Top Rated TV Shows</h1>
          {topTVShows.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {topTVShows.map(
                (show) => show.poster_path && <MovieCard key={show.id} movies={[show]} mediaType="tv" />
              )}
            </div>
          ) : (
            <p>No top-rated TV shows available.</p>
          )}
        </div>
        <Footer />
      </div>
    );
  }
  return null;
};

export default Video;