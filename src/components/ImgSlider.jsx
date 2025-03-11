import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../context/Context';
import { Link } from 'react-router-dom';

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

    return (
        <div className="relative w-full  overflow-x-hidden" style={{ height: '90vh'}}>
            <div className="absolute inset-0 z-0">
                {movies.length > 0 && (
                    <img
                    className="absolute right-0 bg-no-repeat h-full object-fill w-full md:w-5/6"
                        key={movies[currentImg].id}
                        src={`https://image.tmdb.org/t/p/w500${movies[currentImg].poster_path}`}
                        alt={movies[currentImg].title || movies[currentImg].name}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div style={{left: '-68%'}} className="absolute inset-0 md:bg-gradient-to-r from-black via-black to-transparent"></div>
            </div>
            {movies.length > 0 && (
                <div className="absolute bottom-10 left-0 md:w-1/3 w-full  p-4 ml-1">
                    <h1 className="text-white font-bold md:text-5xl text-2xl">{movies[currentImg].title || movies[currentImg].name}</h1>
                    <span className="flex items-center gap-3 mt-3">
                        <h1 className="bg-white font-semibold inline-block rounded-lg px-2">{movies[currentImg].media_type}</h1>
                        <h1 className="text-white font-semibold">
                            📅 {new Date(movies[currentImg].release_date || movies[currentImg].first_air_date).getFullYear()}
                        </h1>
                        <h1 className="text-white">⭐{movies[currentImg].vote_average.toFixed(1)}</h1>
                    </span>
                    <p className="text-white text-xs md:text-lg font-semibold overflow-hidden mb-3"
                        style={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 3,
                        }}>
                        {movies[currentImg].overview}
                    </p>
                    <Link
                       to={{
                        pathname: `/video/${movies[currentImg].id}/${movies[currentImg].media_type}/${movies[currentImg].title || movies[currentImg].name}`, 
                      }}  
                        key={movies[currentImg].id}
                        className="bg-white p-1 cursor-pointer md:px-2 text-center rounded-xl transition duration-300 ease-in-out hover:bg-red-500"
                    >
                        ▶️watch
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ImgSlider;