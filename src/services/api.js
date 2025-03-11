const BaseURl = 'https://api.themoviedb.org/3';
const APIKey = 'b6a27c41bfadea6397dcd72c3877cac1';

export const getPopularMovies = async () => {
    const response = await fetch(`${BaseURl}/trending/movie/week?api_key=${APIKey}`);
    const data = await response.json(); 
    return data;
};

export const getPopularTVShows = async () => {
    const response = await fetch(`${BaseURl}/trending/tv/week?api_key=${APIKey}`);
    const data = await response.json();
    return data;
};

export const searchMedia = async (query) => {
    const responseMovies = await fetch(`${BaseURl}/search/movie?api_key=${APIKey}&query=${query}`);
    const responseTV = await fetch(`${BaseURl}/search/tv?api_key=${APIKey}&query=${query}`);

    const dataMovies = await responseMovies.json();
    const dataTV = await responseTV.json();

    return {
        movies: dataMovies.results,
        tvShows: dataTV.results
    };
};

export const getMovieDetails = async (id, mediaType) => {
    const response = await fetch(`${BaseURl}/${mediaType}/${id}?api_key=${APIKey}`);
    const data = await response.json();
    return data;
};

export const getGenre = async () => {
    const movieGenres = await fetch(`${BaseURl}/genre/movie/list?api_key=${APIKey}`);
    const tvGenres = await fetch(`${BaseURl}/genre/tv/list?api_key=${APIKey}`);

    const movieData = await movieGenres.json();
    const tvData = await tvGenres.json();

    return [...movieData.genres, ...tvData.genres]; 
}; 
export const getCasts = async (id, mediaType) => {
    const response = await fetch(`${BaseURl}/${mediaType}/${id}/credits?api_key=${APIKey}`);
    const data = await response.json();
    return data.cast;
}

export const getRecommendedMovies = async (genreId) => {
    const response = await fetch(`${BaseURl}/discover/movie?api_key=${APIKey}&with_genres=${genreId}`);
    const data = await response.json();
    return data.results;
};

export const getRecommendedTVShows = async (genreId) => {
    const response = await fetch(`${BaseURl}/discover/tv?api_key=${APIKey}&with_genres=${genreId}&sort_by=popularity.desc&vote_average.gte=8`);
    const data = await response.json();
    return data.results;
}

export const topRatedMovies = async ()=> {
    const response = await fetch(`${BaseURl}/movie/top_rated?api_key=${APIKey}`);
    const data = await response.json();
    return data.results;
}
export const topRatedTVShows = async ()=> {
    const response = await fetch(`${BaseURl}/tv/top_rated?api_key=${APIKey}`);
    const data = await response.json();
    return data.results;
}
export const getEpsoides = async (id, seasonNumber) => {
    const response = await fetch(`${BaseURl}/tv/${id}/season/${seasonNumber}?api_key=${APIKey}`);
    const data = await response.json();
    return data.episodes;
};
export const getSeasons = async (id) => {
    const response = await fetch(`${BaseURl}/tv/${id}?api_key=${APIKey}`);
    const data = await response.json();
    return data.seasons;
}