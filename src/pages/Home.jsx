import React, { useContext } from 'react';  
import ImgSlider from '../components/ImgSlider';  
import NavBar from '../components/NavBar';  
import { Context } from '../context/Context';  
import MovieCard from '../components/MovieCard';  
import Footer from '../components/Footer';
const Home = () => {  
  const { movies, tvShows, loading, error } = useContext(Context);  

  if (loading) {  
    return  <div className="flex justify-center items-center h-screen">
    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
  </div>  
  }  

  if (error) {  
    return <div>Error: {error.message}</div>; 
  }  

  return (  
    <div className='w-full overflow-x-hidden'>  
      <NavBar />  
      <div className=''>
      <ImgSlider />  
      <div className='text-white p-5'>  
        <h1 className='text-3xl font-bold mb-4'>Trending Movies</h1>  
        <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3'>  
          <MovieCard movies={movies} mediaType="movie"/>  
        </div>  
        <h1 className='text-3xl font-bold mb-4 mt-10 '>Trending TV Shows</h1>  
        <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3'>  
          <MovieCard movies={tvShows} mediaType="tv"/>  
        </div>   
      </div>  
      </div>
      <Footer />
    </div>  
  );  
};  

export default Home;