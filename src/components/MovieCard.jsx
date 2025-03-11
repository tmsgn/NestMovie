import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getGenre } from '../services/api';

const MovieCard = ({ movies, mediaType }) => {
  const [genres, setGenres] = useState([]);

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

  const getGenreName = (genreIds) => {
    if (!genres.length) return ''; 
  
    const genre = genres.find((g) => genreIds.includes(g.id));
    return genre ? genre.name : 'Unknown'; 
  };
  
  return (
    <>
      {movies.map((movie) => (
        <Link 
          to={{
            pathname: `/video/${movie.id}/${mediaType}/${movie.title || movie.name}`, 
          }}  
          key={movie.id} 
          className='w-auto rounded-lg cursor-pointer'
        >
          <div className='hover:bg-gray-400 min-w-64 box group hover:text-black p-1 rounded-xl transform transition-all duration-300 hover:scale-105'>  
            <img className='rounded-lg max-h-64 w-full' src={`http://image.tmdb.org/t/p/w780${movie.poster_path}`} alt={movie.title || movie.name} />  
            <div className='py-1'>  
              <h1 className='truncate font-semibold text-xs sm:text-base group-hover:text-black'>{movie.title || movie.name}</h1>  
              <h1 className='text-gray-300 text-xs md:text-lg group-hover:text-black '>{new Date(movie.release_date || movie.first_air_date).getFullYear()}</h1>  
              <span className='flex items-center'>
              <h1 className='bg-white inline font-bold text-black p-1 text-xs md:text-sm rounded-lg'>{getGenreName(movie.genre_ids)}</h1>
              <h1 className='text-sm font-semibold mx-2'>{typeof movie.vote_average === 'number' ? `${movie.vote_average.toFixed(1)} ⭐` : ''}</h1></span>
            </div>  
          </div>  
        </Link>
      ))}
    </>
  );
};

export default MovieCard;
