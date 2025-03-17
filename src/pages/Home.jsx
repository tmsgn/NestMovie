import React, { useContext } from 'react';  
import ImgSlider from '../components/ImgSlider';  
import NavBar from '../components/NavBar';  
import { Context } from '../context/Context';  
import MovieCard from '../components/MovieCard';  
import Footer from '../components/Footer';

const Home = () => {  
  const { movies, tvShows, loading, error } = useContext(Context);  

  if (loading) {  
    return (
      <div className='flex space-x-2 justify-center items-center bg-[rgba(0, 0, 0, 0.897)] h-screen dark:invert'>
        <span className='sr-only'>Loading...</span>
        <div className='h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
        <div className='h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
        <div className='h-8 w-8 bg-white rounded-full animate-bounce'></div>
      </div>
    );
  }  

  if (error) {  
    return <div className='text-white text-xl'>Error: {error.message}</div>; 
  }  

  return (  
    <div className='w-full overflow-x-hidden'>  
      <NavBar />  
      <div className=''>
        <ImgSlider />  
        <div className='text-white p-5'>  
          <h1 className='text-3xl font-bold mb-4'>Trending Movies</h1>  
          <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 md:gap-3 '>  
            <MovieCard movies={movies} mediaType="movie"/>  
          </div>  
          <h1 className='text-3xl font-bold mb-4 mt-10 '>Trending TV Shows</h1>  
          <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 md:gap-3'>  
            <MovieCard movies={tvShows} mediaType="tv"/>  
          </div>   
        </div>  
      </div>
      <Footer />
    </div>  
  );  
};  

export default Home;