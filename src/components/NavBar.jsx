import React, { useEffect, useState } from 'react';
import { searchMedia } from '../services/api';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [menu, setMenu] = useState(false);

  const toogleMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (search.length === 0) return;
      const data = await searchMedia(search);

      const mergedResults = [
        ...data.movies.map((movie) => ({ ...movie, type: 'movie' })),
        ...data.tvShows.map((show) => ({ ...show, type: 'tv' }))
      ];

      setSearchResults(mergedResults);
    };

    fetchData();
  }, [search]);

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <nav className="fixed w-full md:rounded-b-full rounded-b-3xl glass2 text-white z-20">
      <ul className={`${!menu ? 'flex ' : ''} justify-between md:mx-10   border-none p-1`}>
        <div className={`${menu ? 'glass' : 'flex justify-between w-full mr-10'} gap-5 p-1 rounded-xl`}>
          <li
            onClick={toogleMenu}
            className="text-lg inline md:hidden font-bold cursor-pointer transition duration-300 ease-in-out hover:text-red-500"
          >
            {!menu ? (
              <span className="material-symbols-outlined">menu</span>
            ) : (
              <span className="material-symbols-outlined">close</span>
            )}
          </li>
          <li
            className={`${!menu ? 'hidden' : 'flex'} text-lg inline md:flex font-bold cursor-pointer transition duration-300 ease-in-out hover:text-red-500`}
          >
            <Link to="//">
              <span className="text-2xl text-blue-400 hover:text-blue-900  p-1 font-extrabold text-gradient bg-clip-text text-transparent">
              MovieNest🎬
              </span>
            </Link>
          </li>
          <li className={`${!menu ? 'hidden' : 'flex'} text-lg inline md:flex font-bold cursor-pointer transition duration-300 ease-in-out hover:text-red-500`}>
            <Link to="/movies">Movies</Link>
          </li>
          <li className={`${!menu ? 'hidden' : 'flex'} text-lg inline md:flex font-bold cursor-pointer transition duration-300 ease-in-out hover:text-red-500`}>
            <Link to="/tvshows">TV Shows</Link>
          </li>
        </div>
        <li className="relative">
          <input
            id="1"
            value={search}
            onChange={handleInputChange}
            className={`${menu ? 'hidden' : 'flex'} bg-transparent border w-64 outline-none rounded-full py-2 px-2`}
            type="text"
            placeholder="Search movies..."
          />
          {search && (
            <div className="absolute z-10 w-full rounded-lg">
              {searchResults.length > 0 ? (
                <ul className="max-h-80 p-2 w-64 overflow-y-auto no-scrollbar bg-gray-500 z-40 rounded-xl mt-2">
                  {window.addEventListener('click', () => setSearch(''))}
                  {searchResults.map(
                    (item) =>
                      item.poster_path && (
                        <Link
                          to={{
                            pathname: `/video/${item.id}/${item.type}/${encodeURIComponent(
                              item.title || item.name
                            )}`
                          }}
                          key={item.id}
                        >
                          <li className="flex gap-5 my-2 relative w-full cursor-pointer hover:bg-gray-400 p-1 rounded-xl transform transition duration-300 ease-in-out hover:text-black">
                            <img
                              className="h-16 rounded-md"
                              src={`http://image.tmdb.org/t/p/w500${item.poster_path}`}
                              alt=""
                            />
                            <div className="w-full truncate">
                              <h1 className="overflow-hidden truncate mb-2">
                                {item.title ? item.title : item.name}
                              </h1>
                              <div className="flex">
                                <span className="bg-white font-semibold text-black text-sm h-6 rounded-xl p-1">
                                  {item.type === 'movie' ? 'Movie' : 'TV'}
                                </span>
                                <span className="mx-1">
                                  📅
                                  {item.release_date
                                    ? new Date(item.release_date).getFullYear()
                                    : item.first_air_date
                                    ? new Date(item.first_air_date).getFullYear()
                                    : ''}
                                </span>
                                <h1 className="">{item.vote_average ? `${item.vote_average.toFixed(1)} ⭐` : ''}</h1>
                              </div>
                            </div>
                          </li>
                        </Link>
                      )
                  )}
                </ul>
              ) : (
                <p className="p-2 text-center">No results found</p>
              )}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
