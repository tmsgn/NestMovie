import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { topRatedMovies as fetchTopRatedMovies,
  getLatestMovies as fetchLatestMovies
 } from '../services/api'
import { useState, useEffect, useContext } from 'react'
import MovieCard from '../components/MovieCard'
import { Context } from '../context/Context'

const Movies = () => {
  const { movies, loading} = useContext(Context);  
  const [topMovies, setTopMovies] = useState([])
  const [latestMovies, setLatestMovies] = useState([])

  useEffect(() => {
    const getLatest = async () => {
      try {
        const data = await fetchLatestMovies();
        setLatestMovies(data);
      } catch (error) {
        console.error('Error fetching latest movies:', error);
      }
    }
    getLatest()
  }, [])
  
  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const data = await fetchTopRatedMovies();
        setTopMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }
    fetchTopMovies()
  }, [])

  if (loading) {
    return (
      <div className='flex flex-col h-screen'>
        <div className='flex space-x-2 justify-center items-center bg-[rgba(0, 0, 0, 0.897)] h-screen dark:invert'>
          <span className='sr-only'>Loading...</span>
          <div className='h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
          <div className='h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
          <div className='h-8 w-8 bg-white rounded-full animate-bounce'></div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='text-white mt-16 flex-grow'>
        <div>
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
        <div>
          <h1 className="text-3xl font-bold mt-8 mb-4">Trending Movies</h1>
          {movies && movies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {movies.map(
                (movie) => movie.poster_path && <MovieCard key={movie.id} movies={[movie]} mediaType="movie" />
              )}
            </div>
          ) : (
            <p>No trending movies available.</p>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold mt-8 mb-4">Latest Movies</h1>
          {latestMovies && latestMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {latestMovies.map(
                (movie) => movie.poster_path && <MovieCard key={movie.id} movies={[movie]} mediaType="movie" />
              )}
            </div>
          ) : (
            <p>No latest movies available.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Movies