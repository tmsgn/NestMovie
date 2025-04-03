import React, { createContext, useContext, useState, useEffect } from "react";
import { getPopularMovies, getPopularTVShows, getMovieDetails, getGenre } from "../services/api";

export const Context = createContext();

export default function ContextProvider({ children }) {
    const [movies, setMovies] = useState([]);
    const [tvShows, setTVShows] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const [moviesData, tvShowsData] = await Promise.all([
                getPopularMovies(),
                getPopularTVShows()
            ]);
    
            setMovies(moviesData.results); 
            setTVShows(tvShowsData.results); 
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchMovieDetails = async (movieId) => {
        setLoading(true);
        try {
            const movieDetails = await getMovieDetails(movieId);
            return movieDetails;
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true)
        const fetchGenres = async () => {
            try {
                const genres = await getGenre();
                setGenres(genres);
            } catch (error) {
                setError(error);
            }
        };

        fetchGenres();
        setLoading(false)
    }, []);

    return (
        <Context.Provider value={{ movies, setMovies, tvShows, setTVShows, loading, setLoading, error, setError, fetchMovieDetails }}>
            {children}
        </Context.Provider>
    );
}

export const useMovieContext = () => useContext(Context);