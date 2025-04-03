import React from 'react';
import Home from './pages/Home';
import ContextProvider from './context/Context';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Movies from './pages/Movies';
import Tvshows from './pages/Tvshows';
import Video from './pages/Video';
import { FavProvider } from './context/FavContext';
import Favorites from './pages/Favorites';

function App() {
  return (
    <ContextProvider>
      <FavProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/video/:id/:mediaType/" element={<Video />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tvshows" element={<Tvshows />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Router>
      </FavProvider>
    </ContextProvider>
  );
}

export default App;